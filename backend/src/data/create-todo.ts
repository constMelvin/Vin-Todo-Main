
import { db } from "db/database.js";
import { todos } from "db/schema.js";
import type { InferInsertModel } from "drizzle-orm";
import { BadRequestError } from "utils/errors.js";


export type CreateTodoArgs = {
	dbCLient: typeof db;
	values: InferInsertModel<typeof todos>;
};

export const createTodoData = async ({ dbCLient, values }: CreateTodoArgs) => {
	if (!values) throw new BadRequestError("All fields are required");

	const todoCreated = await dbCLient.insert(todos).values(values).returning();
	return todoCreated;
};
