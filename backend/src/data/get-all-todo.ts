import { eq } from "drizzle-orm";
import { todos } from "../db/schema.js";
import { InternalServerError } from "../utils/errors.js";
import { db } from "../db/database.js";


export type GetTodoDataArgs = {
	dbClient: typeof db;
	userId: string;
};

export const getAllTodoData = async ({ dbClient, userId }: GetTodoDataArgs) => {
	try {
		const todo = await dbClient
			.select()
			.from(todos)
			.where(eq(todos.userId, userId))
			.orderBy(todos.id);

		return todo;
	} catch (error) {
		throw new InternalServerError("Error retrieving todo data.");
	}
};
