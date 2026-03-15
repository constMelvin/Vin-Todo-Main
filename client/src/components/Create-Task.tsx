import { CheckCircle2Icon, LoaderIcon, Plus } from "lucide-react";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoStore } from "@/store/todo";
import { toast } from "sonner";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const TaskSchema = z.object({
	task_name: z.string().min(1, "Task name are required."),
	description: z.string().min(1, "Task description are required."),
});

type TaskFormFields = z.infer<typeof TaskSchema>;

const CreateTask = () => {
	const { createTodo, getTodo } = useTodoStore();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<TaskFormFields>({ resolver: zodResolver(TaskSchema) });

	const taskSubmit: SubmitHandler<TaskFormFields> = async (data) => {
		await createTodo(data);
		getTodo();
		toast.success("Successfully added new task.", {
			icon: <CheckCircle2Icon className="text-current" />,
			position: "top-center",
			duration: 1500,
		});
		reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="border-0 cursor-pointer bg-[#1587e5] hover:bg-[#1587e5]/90 w-full">
					<Plus color="white" />
					<span className="text-white">Create Task</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<form onSubmit={handleSubmit(taskSubmit)}>
					<DialogHeader>
						<DialogTitle>Create a Task</DialogTitle>
						<DialogDescription>
							Fill in the details for your new task below. Once
							you're done, click
							<strong> Create Task</strong> to add it to your
							list.
						</DialogDescription>
					</DialogHeader>
					<Separator className="my-5" />
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Task Name</Label>
							<Input
								{...register("task_name")}
								placeholder="Task name"
							/>
							{errors.task_name && (
								<p className="text-red-500 text-sm">
									{errors.task_name.message}
								</p>
							)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="username-1">Task Description</Label>
							<Textarea {...register("description")} />
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description.message}
								</p>
							)}
						</div>
					</div>

					<DialogFooter className="!flex-col mt-5">
						<Button
							type="submit"
							className="border-0 cursor-pointer bg-[#1587e5] hover:bg-[#1587e5]/90 w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<span className="flex items-center text-black dark:text-white">
									<LoaderIcon className="animate-spin mr-2" />
									Creating Task...
								</span>
							) : (
								<span className="flex items-center text-black dark:text-white">
									Create Task
								</span>
							)}
						</Button>
						<DialogClose asChild>
							<Button
								variant="outline"
								className="cursor-pointer w-full"
							>
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTask;
