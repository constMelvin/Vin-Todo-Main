import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
	HeartIcon,
	Quote,
	CheckIcon,
	SquarePen,
	Trash2,
	CircleAlertIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, type ChangeEvent } from "react";
import { useTodoStore } from "@/store/todo";
import { useSession } from "@/lib/auth-client";
import { userTodoStore } from "@/store/user";
import type { TodoTypes } from "@/types/todo";
import { toast } from "sonner";

const Home = () => {
	const { todos, getTodo, deleteTodo, updateTodo } = useTodoStore();
	const { user } = userTodoStore();
	const { data: session } = useSession();
	const [updateData, setUpdateData] = useState({ description: "" });
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState({
		id: "",
		task_name: "",
		description: "",
	});
	const [done, setDone] = useState(false);
	const handleSubmit = async () => {
		const data = await updateTodo(selectedTodo.id, { status: done });
		getTodo();
		toast.success(`${data.task_name} Done!`, {
			icon: <CircleAlertIcon className="text-current" />,
			position: "top-right",
			duration: 1500,
		});
		setDone(false);
	};
	const handleSubmitEdit = async () => {
		try {
			const data = await updateTodo(selectedTodo.id, updateData);
			getTodo();
			setUpdateData({ description: "" });
			setIsOpen(false);

			toast.success(`Updated Todo ID: ${data.task_name} Successfully!`, {
				icon: <CircleAlertIcon className="text-current" />,
				position: "top-right",
				duration: 1500,
			});
		} catch (error) {
			console.error("Error deleting todo:", error);
			toast.error("Failed to Update task");
		}
	};
	const handleDelete = async (todo: any) => {
		try {
			await deleteTodo(todo.id);
			getTodo();

			toast.error(`Deleted ${todo.task_name}`, {
				icon: <CircleAlertIcon className="text-current" />,
				position: "top-right",
				duration: 1500,
			});
		} catch (error) {
			console.error("Error deleting todo:", error);
			toast.error("Failed to delete task");
		}
	};

	useEffect(() => {
		if (session) {
			getTodo();
		}
	}, [session]);

	return (
		<Tabs defaultValue="tab-1">
			<TabsList className="flex mx-auto md:mx-10 h-auto rounded-none border-b bg-transparent p-0 mb-5">
				<TabsTrigger
					value="tab-1"
					className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-2xl cursor-pointer"
				>
					All Task
				</TabsTrigger>
				<TabsTrigger
					value="tab-2"
					className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-2xl cursor-pointer"
				>
					Tasks
				</TabsTrigger>
				<TabsTrigger
					value="tab-3"
					className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-2xl cursor-pointer"
				>
					Completed Tasks
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value="tab-1"
				className="flex flex-wrap justify-center gap-5 mx-auto w-full"
			>
				{todos && todos.length > 0 ? (
					todos.map((todo: TodoTypes) => (
						<Card
							className="relative w-full max-w-sm
							bg-gradient-to-br from-white/80 to-blue-50/60 
							dark:from-slate-800/80 dark:to-slate-900/60 
							backdrop-blur-sm rounded-xl shadow-lg 
							border border-blue-100 dark:border-slate-700
							transition-colors duration-300"
							key={todo.id}
						>
							<Quote
								className="absolute top-3 right-2 h-12 w-12 text-foreground/10 stroke-[1.5px]"
								color="#93C5FD"
							/>
							<CardHeader>
								<div className="flex items-center gap-3">
									<Avatar className="h-10 w-10 ring-2 ring-blue-600">
										<AvatarImage src={user.image || ""} />
										<AvatarFallback className="flex items-center justify-center bg-white text-blue-600 text-lg font-semibold">
											{(
												user.name[0] ||
												user.name[0] +
													user.name.split(" ")[1] ||
												"VT"
											).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col gap-1">
										<span className="text-sm font-semibold text-[#004770]">
											{user.name || "Guest"}
										</span>
										<span className="text-sm leading-none text-blue-500">
											@{user.email.split("@")[0]}
										</span>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<CardTitle className="mb-3 text-lg">
									{todo.task_name}
								</CardTitle>
								<p className="text-sm text-[#337499] leading-relaxed">
									{todo.description}
								</p>
							</CardContent>
							<Separator />
							{todo.status !== true ? (
								<CardFooter className="flex justify-between items-center mx-auto gap-4">
									<div className="grid grid-cols-2 gap-2">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													className="text-blue-400 hover:text-blue-500 cursor-pointer bg-transparent hover:bg-transparent shadow-none"
													onClick={() => {
														setDone(true);
														setSelectedTodo(todo);
													}}
												>
													<HeartIcon />{" "}
													<span className="hidden sm:inline">
														Mark as done
													</span>
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure?
													</AlertDialogTitle>
													<AlertDialogDescription className="text-[15px]">
														You're done to submit
														this task. Please
														confirm to proceed.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>
														Cancel
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={handleSubmit}
													>
														Confirm
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>

										<div className="grid grid-cols-2 gap-4">
											<Dialog
												open={isOpen}
												onOpenChange={setIsOpen}
											>
												<DialogTrigger asChild>
													<Button
														className="text-muted-foreground hover:text-black cursor-pointer bg-transparent hover:bg-transparent dark:hover:text-white shadow-none"
														onClick={() => {
															setUpdateData({
																description:
																	todo.description,
															});
															setSelectedTodo(
																todo
															);
															setIsOpen(true);
														}}
													>
														<SquarePen />
														<span className="hidden sm:inline">
															Edit
														</span>
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>
															Update a Task
														</DialogTitle>
														<DialogDescription className="text-[15px]">
															Make changes to your
															task below. When
															you're done, click
															<strong>
																{" "}
																Update
															</strong>{" "}
															to save your
															changes.
														</DialogDescription>
													</DialogHeader>

													<form
														className="space-y-5"
														onSubmit={async (e) => {
															e.preventDefault();
															// ✨ your update logic here
															handleSubmitEdit();
														}}
													>
														<Textarea
															id="feedback"
															value={
																updateData.description
															}
															onChange={(
																e: ChangeEvent<HTMLTextAreaElement>
															) => {
																setUpdateData({
																	description:
																		e.target
																			.value,
																});
															}}
															aria-label="Update task description"
														/>

														<div className="flex flex-col sm:flex-row sm:justify-end">
															<Button
																type="submit"
																className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md cursor-pointer"
															>
																Update
															</Button>
														</div>
													</form>
												</DialogContent>
											</Dialog>

											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button className="text-red-500/80 hover:text-red-500 cursor-pointer bg-transparent hover:bg-transparent shadow-none">
														<Trash2 />
														<span className="hidden sm:inline">
															Delete
														</span>
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
														<div
															className="flex size-9 shrink-0 items-center justify-center rounded-full border"
															aria-hidden="true"
														>
															<CircleAlertIcon
																className="opacity-80"
																color="red"
																size={16}
															/>
														</div>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Are you sure?
															</AlertDialogTitle>
															<AlertDialogDescription>
																Are you sure you
																want to delete
																your{" "}
																{todo.task_name}
																?
															</AlertDialogDescription>
														</AlertDialogHeader>
													</div>
													<AlertDialogFooter>
														<AlertDialogCancel className="cursor-pointer hover: opacity-70">
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															className="bg-blue-500 text-white cursor-pointer hover:bg-blue-500/70"
															onClick={() =>
																handleDelete(
																	todo
																)
															}
														>
															Confirm
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
									<Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
										<div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />{" "}
										Not Done
									</Badge>
								</CardFooter>
							) : (
								<CardFooter className="grid grid-cols-2">
									<div className="flex justify-center w-full">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													variant="ghost"
													disabled={todo.status}
													className="w-full text-blue-400 hover:text-blue-500 cursor-pointer"
												>
													<HeartIcon
														fill={
															todo.status
																? "#60A5FA"
																: "none"
														}
														stroke={
															todo.status
																? "#60A5FA"
																: "currentColor"
														}
													/>
													<span className="hidden sm:inline">
														Mark as done
													</span>
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure?
													</AlertDialogTitle>
													<AlertDialogDescription className="text-[15px]">
														You're about to submit
														this task. Please
														confirm to proceed.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>
														Cancel
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={handleSubmit}
													>
														Confirm
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>

									<div className="flex justify-center w-full">
										<Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
											<CheckIcon
												className="text-emerald-500"
												size={12}
												aria-hidden="true"
											/>
											Done
										</Badge>
									</div>
								</CardFooter>
							)}
						</Card>
					))
				) : (
					<div className="w-full mx-5 border-2 border-dashed rounded-lg p-2 text-center text-muted-foreground">
						No Task
					</div>
				)}
			</TabsContent>
			<TabsContent
				value="tab-2"
				className="flex flex-wrap justify-center gap-5 mx-auto w-full"
			>
				{todos?.filter((todo: TodoTypes) => todo.status !== true)
					.length > 0 ? (
					todos.map((todo: TodoTypes) => (
						<>
							{todo.status !== true && (
								<Card
									className="relative w-full max-w-sm 
									bg-gradient-to-br from-white/80 to-blue-50/60 
									dark:from-slate-800/80 dark:to-slate-900/60 
									backdrop-blur-sm rounded-xl shadow-lg 
									border border-blue-100 dark:border-slate-700
									transition-colors duration-300"
									key={todo.id}
								>
									<Quote
										className="absolute top-3 right-2 h-12 w-12 text-foreground/10 stroke-[1.5px]"
										color="#93C5FD"
									/>
									<CardHeader>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10 ring-2 ring-blue-600">
												<AvatarImage
													src={user.image || ""}
												/>
												<AvatarFallback className="flex items-center justify-center bg-white text-blue-600 text-lg font-semibold">
													{(
														user.name[0] ||
														user.name[0] +
															user.name.split(
																" "
															)[1] ||
														"VT"
													).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col gap-1">
												<span className="text-sm font-semibold text-[#004770]">
													{user.name || "Guest"}
												</span>
												<span className="text-sm leading-none text-blue-500">
													@{user.email.split("@")[0]}
												</span>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<CardTitle className="mb-3 text-lg">
											{todo.task_name}
										</CardTitle>
										<p className="text-sm text-[#337499] leading-relaxed">
											{todo.description}
										</p>
									</CardContent>
									<Separator />
									<CardFooter className="flex justify-between items-center mx-auto gap-4">
										<div className="grid grid-cols-2 gap-2">
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														className="text-blue-400 hover:text-blue-500 cursor-pointer bg-transparent hover:bg-transparent shadow-none"
														onClick={() => {
															setDone(true);
															setSelectedTodo(
																todo
															);
														}}
													>
														<HeartIcon />{" "}
														<span className="hidden sm:inline">
															Mark as done
														</span>
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Are you absolutely
															sure?
														</AlertDialogTitle>
														<AlertDialogDescription className="text-[15px]">
															You're done to
															submit this task.
															Please confirm to
															proceed.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={
																handleSubmit
															}
														>
															Confirm
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>

											<div className="grid grid-cols-2 gap-4">
												<Dialog
													open={isOpen}
													onOpenChange={setIsOpen}
												>
													<DialogTrigger asChild>
														<Button
															className="text-muted-foreground hover:text-black cursor-pointer bg-transparent hover:bg-transparent dark:hover:text-white shadow-none"
															onClick={() => {
																setUpdateData({
																	description:
																		todo.description,
																});
																setSelectedTodo(
																	todo
																);
																setIsOpen(true);
															}}
														>
															<SquarePen />
															<span className="hidden sm:inline">
																Edit
															</span>
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>
																Update a Task
															</DialogTitle>
															<DialogDescription className="text-[15px]">
																Make changes to
																your task below.
																When you're
																done, click
																<strong>
																	{" "}
																	Update
																</strong>{" "}
																to save your
																changes.
															</DialogDescription>
														</DialogHeader>

														<form
															className="space-y-5"
															onSubmit={async (
																e
															) => {
																e.preventDefault();
																// ✨ your update logic here
																handleSubmitEdit();
															}}
														>
															<Textarea
																id="feedback"
																value={
																	updateData.description
																}
																onChange={(
																	e: ChangeEvent<HTMLTextAreaElement>
																) => {
																	setUpdateData(
																		{
																			description:
																				e
																					.target
																					.value,
																		}
																	);
																}}
																aria-label="Update task description"
															/>

															<div className="flex flex-col sm:flex-row sm:justify-end">
																<Button
																	type="submit"
																	className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md cursor-pointer"
																>
																	Update
																</Button>
															</div>
														</form>
													</DialogContent>
												</Dialog>

												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button className="text-red-500/80 hover:text-red-500 cursor-pointer bg-transparent hover:bg-transparent shadow-none">
															<Trash2 />
															<span className="hidden sm:inline">
																Delete
															</span>
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
															<div
																className="flex size-9 shrink-0 items-center justify-center rounded-full border"
																aria-hidden="true"
															>
																<CircleAlertIcon
																	className="opacity-80"
																	color="red"
																	size={16}
																/>
															</div>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Are you
																	sure?
																</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure
																	you want to
																	delete your{" "}
																	{
																		todo.task_name
																	}
																	?
																</AlertDialogDescription>
															</AlertDialogHeader>
														</div>
														<AlertDialogFooter>
															<AlertDialogCancel className="cursor-pointer hover: opacity-70">
																Cancel
															</AlertDialogCancel>
															<AlertDialogAction
																className="bg-blue-500 text-white cursor-pointer hover:bg-blue-500/70"
																onClick={() =>
																	handleDelete(
																		todo
																	)
																}
															>
																Confirm
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
										</div>
										<Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
											<div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />{" "}
											Not Done
										</Badge>
									</CardFooter>
								</Card>
							)}
						</>
					))
				) : (
					<div className="w-full mx-5 border-2 border-dashed rounded-lg p-2 text-center text-muted-foreground">
						No Pending Task
					</div>
				)}
			</TabsContent>
			<TabsContent
				value="tab-3"
				className="flex flex-wrap justify-center gap-5 mx-auto w-full"
			>
				{todos?.filter((todo: TodoTypes) => todo.status === true)
					.length > 0 ? (
					todos
						?.filter((todo: TodoTypes) => todo.status == true)
						.map((todo: TodoTypes) => (
							<Card
								className="relative w-full max-w-sm 
								bg-gradient-to-br from-white/80 to-blue-50/60 
								dark:from-slate-800/80 dark:to-slate-900/60 
								backdrop-blur-sm rounded-xl shadow-lg 
								border border-blue-100 dark:border-slate-700
								transition-colors duration-300"
								key={todo.id}
							>
								<Quote
									className="absolute top-3 right-2 h-12 w-12 text-foreground/10 stroke-[1.5px]"
									color="#93C5FD"
								/>
								<CardHeader>
									<div className="flex items-center gap-3">
										<Avatar className="h-10 w-10 ring-2 ring-blue-600">
											<AvatarImage
												src={user.image || ""}
											/>
											<AvatarFallback className="flex items-center justify-center bg-white text-blue-600 text-lg font-semibold">
												{(
													user.name[0] ||
													user.name[0] +
														user.name.split(
															" "
														)[1] ||
													"VT"
												).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col gap-1">
											<span className="text-sm font-semibold text-[#004770]">
												{user.name || "Guest"}
											</span>
											<span className="text-sm leading-none text-blue-500">
												@{user.email.split("@")[0]}
											</span>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<CardTitle className="mb-3 text-lg">
										{todo.task_name}
									</CardTitle>
									<p className="text-sm text-[#337499] leading-relaxed">
										{todo.description}
									</p>
								</CardContent>
								<Separator />
								<CardFooter className="grid grid-cols-2">
									<div className="flex justify-center w-full">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													variant="ghost"
													disabled={todo.status}
													className="w-full text-blue-400 hover:text-blue-500 cursor-pointer"
												>
													<HeartIcon
														fill={
															todo.status
																? "#60A5FA"
																: "none"
														}
														stroke={
															todo.status
																? "#60A5FA"
																: "currentColor"
														}
													/>
													<span className="hidden sm:inline">
														Mark as done
													</span>
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure?
													</AlertDialogTitle>
													<AlertDialogDescription className="text-[15px]">
														You're about to submit
														this task. Please
														confirm to proceed.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>
														Cancel
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={handleSubmit}
													>
														Confirm
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>

									<div className="flex justify-center w-full">
										<Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
											<CheckIcon
												className="text-emerald-500"
												size={12}
												aria-hidden="true"
											/>
											Done
										</Badge>
									</div>
								</CardFooter>
							</Card>
						))
				) : (
					<div className="w-full mx-5 border-2 border-dashed rounded-lg p-2 text-center text-muted-foreground">
						No Completed Task
					</div>
				)}
			</TabsContent>
		</Tabs>
	);
};

export default Home;
