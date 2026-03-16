import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_URL,
	fetchOptions: {
		credentials: "include",
		onSuccess: (ctx) => {
			console.log("Auth success: ", ctx);
		},
	},
});

export const { signIn, signUp, signOut, useSession } = authClient;
