import type { db } from "@/db/database";
import { todos } from "@/db/schema";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

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
