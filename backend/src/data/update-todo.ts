import { db } from "db/database.js";
import { todos } from "db/schema.js";
import { UpdateTodoInput, UpdateValueSchema } from "db/typeSchema.js";
import { eq, sql } from "drizzle-orm";
import { NotFoundError } from "utils/errors.js";


export type UpdateTodoArgs = {
	dbClient: typeof db;
	todoId: string;
	values: UpdateTodoInput;
};

export const updateTodoData = async ({
	dbClient,
	todoId,
	values,
}: UpdateTodoArgs) => {
	const parsedValues = UpdateValueSchema.parse(values);

	const existingTodo = await dbClient
		.select()
		.from(todos)
		.where(eq(todos.id, todoId));

	if (!existingTodo) throw new NotFoundError(`Not found todoId: ${todoId}`);

	const filterValues = Object.fromEntries(
		Object.entries(parsedValues).filter(([_, v]) => v !== undefined)
	);

	const updatedData = await dbClient
		.update(todos)
		.set({
			...filterValues,
			updated_at: sql`Now()`,
			// ...(description !== undefined && { description }),
			// ...(task_name !== undefined && { task_name }),
		})
		.where(eq(todos.id, todoId))
		.returning();

	return updatedData;
};
