import { Context } from "hono";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoInput, CreateValueSchema } from "../../db/typeSchema.js";
import { BadRequestError, InternalServerError } from "../../utils/errors.js";
import { createTodoData } from "../../data/create-todo.js";
import { db } from "../../db/database.js";


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
