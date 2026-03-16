import { createAuthClient } from "better-auth/react";

console.log(import.meta.env.VITE_API_URL);
export const authClient = createAuthClient({
	baseURL: "https://vin-todo.vercel.app",
	fetchOptions: {
		credentials: "include",
		onSuccess: (ctx) => {
			console.log("Auth Data: ", ctx);
		},
	},
});

export const { signIn, signUp, signOut, useSession } = authClient;
