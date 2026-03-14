import { authMiddleware } from "@/middlewares/authMiddleware";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createTodoController } from "./create-todo";
import { getAllTodoListController } from "./get-all-todo-list";
import { updateTodoController } from "./update-todo";
import { deleteTodoController } from "./delete-todo";
import z from "zod";
import { CreateValueSchema, UpdateValueSchema } from "@/db/typeSchema";
import type { HonoEnv } from "@/types/hono";

// const UpdateValueSchema = z.object({
// 	task_name: z.string().optional(),
// 	description: z.string().optional(),
// 	status: z.boolean().optional(),
// });

const todoRoutes = new Hono()
	.use(authMiddleware)
	.get("/all-todos", getAllTodoListController)
	.post("/add-todo", zValidator("json", CreateValueSchema), (c) =>
		createTodoController(c, c.req.valid("json"))
	)
	.put("/todo/:id", zValidator("json", UpdateValueSchema), (c) =>
		updateTodoController(c, c.req.valid("json"))
	)
	.delete("/todo/:id", deleteTodoController);

export default todoRoutes;
