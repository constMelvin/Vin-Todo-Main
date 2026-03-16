import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			const { data } = await authClient.getSession();
			if (data?.session) {
				navigate("/", { replace: true });
			} else {
				navigate("/sign-in", { replace: true });
			}
		};
		checkSession();
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin" />
		</div>
	);
};

export default AuthCallback;
