import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getAllTodoListController } from "./get-all-todo-list.js";
import { createTodoController } from "./create-todo.js";
import { updateTodoController } from "./update-todo.js";
import { deleteTodoController } from "./delete-todo.js";
import { authMiddleware } from "@middlewares/authMiddleware.js";
import { CreateValueSchema, UpdateValueSchema } from "@db/typeSchema.js";

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
