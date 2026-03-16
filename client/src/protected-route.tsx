import { useSession } from "@/lib/auth-client";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { data: session, isPending, refetch } = useSession();
	const [checked, setChecked] = useState(false); // ensures we attempt fetch

	useEffect(() => {
		if (!session) {
			// just call refetch, then mark checked manually
			refetch?.();
		}
		setChecked(true);
	}, [session, refetch]);

	if (isPending || !checked) {
		// Loading spinner while checking session
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin" />
			</div>
		);
	}

	if (!session) {
		// Still no session → redirect
		return <Navigate to="/sign-in" replace />;
	}

	return children; // Session exists → render children
};

export default ProtectedRoute;
