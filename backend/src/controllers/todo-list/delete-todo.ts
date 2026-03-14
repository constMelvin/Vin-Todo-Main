import { deleteTodoData } from "@/data/delete-todo";
import type { Context } from "hono";

export const deleteTodoController = async (c: Context) => {
	const todoId = c.req.param("id");
	const dbClient = c.get("dbClient");

	const deleteData = await deleteTodoData({
		dbCLient: dbClient,
		todoId: todoId,
	});

	return c.json(deleteData, 200);
};
