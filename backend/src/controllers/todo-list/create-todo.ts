import type { Context } from "hono";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { BadRequestError, InternalServerError } from "@/utils/errors";
import { createTodoData } from "@/data/create-todo";
import { db } from "@/db/database";
import { CreateValueSchema, type CreateTodoInput } from "@/db/typeSchema";

// const valuesSchema = z.object({
// 	description: z.string().min(1),
// 	task_name: z.string().min(1),
// });

// type BodyTypes = z.infer<typeof valuesSchema>;

export const createTodoController = async (
	c: Context,
	body: CreateTodoInput
) => {
	try {
		console.log("line 21:", body);
		const user = c.get("user");
		const taskId = uuidv4();
		const validation = CreateValueSchema.safeParse(body);

		if (!validation.success) {
			throw new BadRequestError("No data found from the body.");
		}
		const values = {
			id: taskId,
			userId: user.id,
			description: validation.data.description,
			task_name: validation.data.task_name,
		};

		const createTodo = await createTodoData({
			dbCLient: db,
			values,
		});

		return c.json(createTodo, 201);
	} catch (error) {
		console.log(error);
		throw new InternalServerError("Internal Server Error.");
	}
};
