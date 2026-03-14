import { db } from "@/db/database";
import { todos } from "@/db/schema";
import { BadRequestError } from "@/utils/errors";
import type { InferInsertModel } from "drizzle-orm";

export type CreateTodoArgs = {
	dbCLient: typeof db;
	values: InferInsertModel<typeof todos>;
};

export const createTodoData = async ({ dbCLient, values }: CreateTodoArgs) => {
	if (!values) throw new BadRequestError("All fields are required");

	const todoCreated = await dbCLient.insert(todos).values(values).returning();
	return todoCreated;
};
