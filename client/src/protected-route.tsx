import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { data: session, isPending } = useSession();
	const [sessionData, setSessionData] = useState<any>(null);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const checkSession = async () => {
			const { data } = await authClient.getSession({
				fetchOptions: {
					credentials: "include",
				},
			});
			console.log("Session check:", data); // ✅ makikita sa console
			setSessionData(data);
			setDone(true);
		};
		checkSession();
	}, []);

	if (isPending || !done) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin" />
			</div>
		);
	}

	// ✅ Pansamantala — para makita natin kung may session
	if (done && !sessionData) {
		return (
			<div className="flex justify-center items-center h-screen flex-col gap-4">
				<p className="text-red-500">Session is NULL</p>
				<pre className="text-xs bg-gray-100 p-4 rounded max-w-lg overflow-auto">
					{JSON.stringify(sessionData, null, 2)}
				</pre>
				<Navigate to="/sign-in" replace />
			</div>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
