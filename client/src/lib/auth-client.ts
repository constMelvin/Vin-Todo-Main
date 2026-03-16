import { createAuthClient } from "better-auth/react";

console.log(import.meta.env.VITE_API_URL);
export const authClient = createAuthClient({
	baseURL: "",
});

export const { signIn, signUp, signOut, useSession } = authClient;
