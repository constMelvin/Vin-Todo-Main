import { useMemo, useState, type ChangeEvent, type MouseEvent } from "react";
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
import { Input } from "./ui/input";
import {
	CheckIcon,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
	XIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
	email: z.email({ message: "Please enter a valid email address." }),
	name: z.string().min(1, "Name is required"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignUpFormFields = z.infer<typeof SignUpSchema>;

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormFields>({
		resolver: zodResolver(SignUpSchema),
	});
	const [password, setPassword] = useState("");
	const [value, setValue] = useState({
		email: "",
		name: "",
		password: "",
	});

	const [email, setEmail] = useState("");
	const isValidEmail =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
			value.email.trim()
		);

	const [confirmPassword, setConfirmPassword] = useState("");

	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);

	const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log(data);
		} catch (error) {}
	};

	const submitForm = (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValue((prev) => ({
			...prev,
			password: confirmPassword,
		}));

		if (!value.email || !value.password || !confirmPassword) {
			alert("Please fill in all fields.");
			return;
		}

		if (!isValidEmail || strengthScore < 5) {
			alert("Please enter a valid email and a strong password.");
			return;
		}

		if (password !== value.password) {
			alert("Passwords do not match.");
			return;
		}
		if (password === value.password && isValidEmail) {
			console.log("Form submitted with values:", value);
		}
	};

	const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsVisible((prevState) => !prevState);
	};
	const toggleConfirmVisibility = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsConfirmVisible((prevState) => !prevState);
	};
	const checkStrength = (pass: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: "At least 8 characters" },
			{ regex: /[0-9]/, text: "At least 1 number" },
			{ regex: /[a-z]/, text: "At least 1 lowercase letter" },
			{ regex: /[A-Z]/, text: "At least 1 uppercase letter" },
			{ regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
		];

		return requirements.map((req) => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(password);

	const strengthScore = useMemo(() => {
		return strength.filter((req) => req.met).length;
	}, [strength]);

	const getStrengthColor = (score: number) => {
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-red-500";
		if (score <= 3) return "bg-orange-500";
		if (score === 4) return "bg-amber-500";
		return "bg-emerald-500";
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return "Enter a password";
		if (score <= 3) return "Weak password";
		if (score === 4) return "Medium password";
		return "Strong password";
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
									isValidEmail && "border-emerald-500"
								)}
							>
								<MailIcon className="h-5 w-5 text-muted-foreground" />
								<Input
									type="email"
									placeholder="Email"
									className="border-0 focus-visible:ring-0 shadow-none"
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setValue({
											...value,
											email: e.target.value,
										})
									}
									value={value.email}
								/>
							</div>
							<div
								className={clsx(
									"relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2",
									strengthScore > 4 && "border-emerald-500"
								)}
							>
								<LockIcon className="h-5 w-5 text-muted-foreground" />
								<Input
									type={isVisible ? "text" : "password"}
									placeholder="Password"
									className="border-0 focus-visible:ring-0 shadow-none"
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										setPassword(e.target.value);
									}}
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
							{password.length > 0 && strengthScore < 5 && (
								<div className="flex flex-col gap-2 mt-2">
									<div
										className="bg-border h-1 w-full overflow-hidden rounded-full"
										role="progressbar"
										aria-valuenow={strengthScore}
										aria-valuemin={0}
										aria-valuemax={4}
										aria-label="Password strength"
									>
										<div
											className={`h-full ${getStrengthColor(
												strengthScore
											)} transition-all duration-500 ease-out`}
											style={{
												width: `${
													(strengthScore / 5) * 100
												}%`,
											}}
										></div>
									</div>

									{/* Password strength description */}
									<p className="text-foreground text-sm font-medium">
										{getStrengthText(strengthScore)}. Must
										contain:
									</p>

									{/* Password requirements list */}
									<ul
										className="space-y-1"
										aria-label="Password requirements"
									>
										{strength.map((req, index) => (
											<li
												key={index}
												className="flex items-center gap-2"
											>
												{req.met ? (
													<CheckIcon
														size={16}
														className="text-emerald-500"
														aria-hidden="true"
													/>
												) : (
													<XIcon
														size={16}
														className="text-muted-foreground/80"
														aria-hidden="true"
													/>
												)}
												<span
													className={`text-xs ${
														req.met
															? "text-emerald-600"
															: "text-muted-foreground"
													}`}
												>
													{req.text}
													<span className="sr-only">
														{req.met
															? " - Requirement met"
															: " - Requirement not met"}
													</span>
												</span>
											</li>
										))}
									</ul>
								</div>
							)}

							<div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
								<LockIcon className="h-5 w-5 text-muted-foreground" />
								<Input
									value={confirmPassword}
									type={
										isConfirmVisible ? "text" : "password"
									}
									placeholder="Confirm Password"
									className="border-0 focus-visible:ring-0 shadow-none"
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => setConfirmPassword(e.target.value)}
								/>
								<button
									onClick={toggleConfirmVisibility}
									className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
								>
									{isConfirmVisible ? (
										<EyeOffIcon className="h-5 w-5" />
									) : (
										<EyeIcon className="h-5 w-5" />
									)}
								</button>
							</div>

							{confirmPassword && (
								<p
									className={`mt-1 text-sm ${
										confirmPassword === password
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{confirmPassword === password
										? "Passwords match"
										: "Passwords do not match"}
								</p>
							)}
						</div>
						<Button
							type="submit"
							className="w-full mt-3 cursor-pointer"
						>
							Register
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
					>
						<FcGoogle />
						Continue with Google
					</Button>
					<div>
						<p className="text-sm text-center">
							Already have an account?
							<Link
								to="/sign-in"
								className="ml-1 underline text-muted-foreground"
							>
								Log in
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignUp;
