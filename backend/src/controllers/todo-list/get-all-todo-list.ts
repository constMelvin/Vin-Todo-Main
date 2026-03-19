import { getAllTodoData } from "@data/get-all-todo.js";
import { NotFoundError } from "@utils/errors.js";
import type { Context } from "hono";



export const getAllTodoListController = async (c: Context) => {
	const user = c.get("user");
	const dbCLient = c.get("dbClient");

	const todoData = await getAllTodoData({
		dbClient: dbCLient,
		userId: user.id,
	});

	if (todoData.length === 0) {
		throw new NotFoundError("No todo task found.");
	}
	return c.json(todoData, 200);
};
