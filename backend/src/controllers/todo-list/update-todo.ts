import { updateTodoData } from "data/update-todo.js";
import type { UpdateTodoInput } from "db/typeSchema.js";
import { NotFoundError } from "utils/errors.js";
import type { Context } from "hono";

export const updateTodoController = async (
	c: Context,
	values: UpdateTodoInput
) => {
	const todoId = c.req.param("id");
	if (!todoId) throw new NotFoundError("Not found todo id params");
	const dbClient = c.get("dbClient");

	const updateData = await updateTodoData({ dbClient, todoId, values });

	return c.json(updateData, 200);
};
