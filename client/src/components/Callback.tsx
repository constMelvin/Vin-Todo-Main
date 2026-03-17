import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authClient } from "@/lib/auth-client";
import { userTodoStore } from "@/store/user";

export default function Callback() {
	const setUser = userTodoStore((s) => s.setUser);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSession = async () => {
			const { data } = await authClient.getSession();
			if (data?.user) setUser(data.user);
			navigate("/"); // redirect to home
		};
		fetchSession();
	}, []);

	return <div>Loading...</div>;
}
