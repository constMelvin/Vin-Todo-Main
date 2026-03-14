import { useState, type MouseEvent } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
	CheckCircle2Icon,
	EyeIcon,
	EyeOffIcon,
	LoaderIcon,
	LockIcon,
	MailIcon,
	OctagonAlertIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { userTodoStore } from "@/store/user";
import { toast } from "sonner";

const SignInSchema = z.object({
	email: z.email("Invalid Email Address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean(),
});

type SignInFormFields = z.infer<typeof SignInSchema>;

const SignIn = () => {
	const { signInUser, signInWithSocial } = userTodoStore((state) => state);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const navigate = useNavigate();

	const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsVisible((prevState) => !prevState);
	};

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormFields>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			rememberMe: false,
		},
	});

	const rememberMeValue = watch("rememberMe");

	const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
		try {
			const res = await signInUser(data);

			if (res.error) {
				toast.error(res.error.message, {
					icon: <OctagonAlertIcon />,
					className: "gap-5",
					position: "top-center",
				});
				return;
			}
			toast.success("Login successful!", {
				icon: <CheckCircle2Icon className="text-current" />,
				position: "top-center",
				duration: 1500,
			});

			setTimeout(() => {
				navigate("/", { replace: true });
			}, 2000);
		} catch (error) {
			console.error("Error signing in:", error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-sm px-3">
				<CardHeader>
					<div className="flex justify-center items-center mb-5">
						<span className="font-bold text-3xl">
							<span className="text-blue-600">Vin</span>
							<span className="dark:text-white">Todo</span>
						</span>
					</div>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-3">
							<div
								className={clsx(
									"relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2",
									errors.email && " border-red-500"
								)}
							>
								<MailIcon className="h-5 w-5 text-muted-foreground" />
								<Input
									{...register("email")}
									type="email"
									placeholder="Email"
									className={
										"ml-1 border-0 focus-visible:ring-0 shadow-none"
									}
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-sm">
									{errors.email.message}
								</p>
							)}
							<div
								className={clsx(
									"relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2",
									errors.password && " border-red-500"
								)}
							>
								<LockIcon className="h-5 w-5 text-muted-foreground" />
								<Input
									{...register("password")}
									type={isVisible ? "text" : "password"}
									placeholder="Password"
									className="ml-1 border-0 focus-visible:ring-0 shadow-none"
								/>
								<button
									onClick={toggleVisibility}
									className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
								>
									{isVisible ? (
										<EyeOffIcon className="h-5 w-5" />
									) : (
										<EyeIcon className="h-5 w-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}

							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<input
										type="hidden"
										{...register("rememberMe")}
									/>
									<Checkbox
										checked={rememberMeValue}
										onCheckedChange={(checked) =>
											setValue(
												"rememberMe",
												checked === true
											)
										}
									/>
									<Label className="text-muted-foreground font-normal cursor-pointer">
										Remember me
									</Label>
								</div>
								<a
									className="text-sm underline hover:no-underline cursor-pointer"
									href="#"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full mt-3 cursor-pointer"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<LoaderIcon className="animate-spin" />
							) : (
								"Login"
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-3">
					<div className="w-full flex items-center justify-center overflow-hidden">
						<Separator />
						<span className="text-xs text-muted-foreground px-2">
							OR
						</span>
						<Separator />
					</div>

					<Button
						variant={"outline"}
						className="w-full gap-3 cursor-pointer"
						onClick={async () => {
							await signInWithSocial();
						}}
					>
						<FcGoogle />
						Continue with Google
					</Button>
					<div>
						<p className="text-sm text-center">
							Don't have an account?
							<Link
								to="/sign-up"
								className="ml-1 underline text-muted-foreground"
							>
								Create account
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignIn;
