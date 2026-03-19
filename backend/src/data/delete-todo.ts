import { eq } from "drizzle-orm";
import { db } from "../db/database.js";
import { todos } from "../db/schema.js";
import { NotFoundError } from "../utils/errors.js";



export type UpdateTodoArgs = {
	dbCLient: typeof db;
	todoId: string;
};

export const deleteTodoData = async ({ dbCLient, todoId }: UpdateTodoArgs) => {
	const existingTodo = await dbCLient
		.select()
		.from(todos)
		.where(eq(todos.id, todoId));

	if (!existingTodo)
		throw new NotFoundError(`Not found todoId: ${todoId} to delete task.`);

	const deletedData = await dbCLient
		.delete(todos)
		.where(eq(todos.id, todoId))
		.returning();

	return deletedData;
};
