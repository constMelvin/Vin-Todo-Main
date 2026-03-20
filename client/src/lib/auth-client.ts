import { createAuthClient } from "better-auth/react";

console.log(import.meta.env.VITE_API_URL);
export const authClient = createAuthClient({
	baseURL: "https://vin-todo.vercel.app", // ✅ proxy — same domain
	fetchOptions: {
		credentials: "include",
	},
});

export const { signIn, signUp, signOut, useSession } = authClient;
