import { Button } from "@/components/ui/button";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon, MoonIcon, LogOut, Settings, User, Plus } from "lucide-react";
import { useTheme } from "../theme-provider";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userTodoStore } from "@/store/user";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

import EditProfile from "./Edit-Profile";
import CreateTask from "./Create-Task";

const Navbar = () => {
	const { theme, setTheme } = useTheme();
	const { signOutUser, setUser, user } = userTodoStore();
	const navigate = useNavigate();

	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
		} else {
			setUser(null);
		}
	}, [session, setUser]);

	if (!user) return null;
	return (
		<nav className="h-16 bg-background border-b">
			<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-8">
					<span className="font-bold text-3xl">
						<span className="text-blue-600">Vin</span>
						<span className="dark:text-white">Todo</span>
					</span>

					{/* <Button className="border-0 cursor-pointer bg-[#1587e5] hover:bg-[#1587e5]/90 hidden md:flex">
						<Plus />
						<span className="text-white">Create Task</span>
					</Button> */}
					<div className="hidden md:flex">
						<CreateTask />
					</div>
				</div>

				<div className="flex items-center gap-3 hover:cursor-pointer">
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="rounded-full cursor-pointer">
								<div className="flex gap-3">
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
									<div className="flex flex-col">
										<span className="text-sm font-semibold text-[#004770] dark:text-blue-500">
											{user.name || "Guest"}
										</span>
										<span className="text-sm leading-none text-blue-500 dark:text-blue-400">
											@{user.email.split("@")[0]}
										</span>
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<EditProfile />
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="h-4 w-4" /> Settings
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive"
									onClick={() => {
										signOutUser();
										navigate("/sign-in");
									}}
								>
									<LogOut className="h-4 w-4" /> Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Link to={"/sign-in"}>
								<Button
									variant="outline"
									className="hidden sm:inline-flex"
								>
									Sign In
								</Button>
							</Link>
							<Link to={"/sign-up"}>
								<Button>Sign Up</Button>
							</Link>
						</>
					)}

					{theme === "light" && (
						<Button
							className="cursor-pointer"
							size="icon"
							variant="outline"
							onClick={() => setTheme("dark")}
						>
							<MoonIcon />
						</Button>
					)}
					{theme === "dark" && (
						<Button
							className="cursor-pointer"
							size="icon"
							variant="outline"
							onClick={() => setTheme("light")}
						>
							<SunIcon />
						</Button>
					)}

					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
