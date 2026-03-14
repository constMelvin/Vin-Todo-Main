import { z } from "zod";

export const UpdateValueSchema = z.object({
	task_name: z.string().optional(),
	description: z.string().optional(),
	status: z.boolean().optional(),
});
export const CreateValueSchema = z.object({
	task_name: z.string().min(1),
	description: z.string().min(1),
});

export type UpdateTodoInput = z.infer<typeof UpdateValueSchema>;
export type CreateTodoInput = z.infer<typeof CreateValueSchema>;
