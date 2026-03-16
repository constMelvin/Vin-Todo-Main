import { authClient } from "@/lib/auth-client";
import { create } from "zustand";

type UserData = {
	email: string;
	password: string;
	rememberMe: boolean;
};

type SignResult = {
	data?: any;
	error?: any;
};

type UserStoreArgs = {
	error: any;
	signInUser: (userData: UserData) => Promise<SignResult>;
	signUpUser: (newUserData: any) => Promise<void>;
	signOutUser: () => Promise<void>;
	signInWithSocial: () => Promise<void>;
};

// ✅ Walang persist — better-auth ang bahala sa session
export const userTodoStore = create<UserStoreArgs>((set) => ({
	error: null,

	signInUser: async (userData: UserData) => {
		try {
			set({ error: null });
			if (!userData.email || !userData.password) {
				throw new Error("Email and password are required");
			}
			const { data, error } = await authClient.signIn.email({
				email: userData.email,
				password: userData.password,
				rememberMe: userData.rememberMe,
			});
			set({ error });
			return { data, error };
		} catch (error: any) {
			set({ error: error.message || "An error occurred" });
			return { error };
		}
	},

	signUpUser: async () => {},

	signOutUser: async () => {
		await authClient.signOut();
	},

	signInWithSocial: async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "https://vin-todo.vercel.app",
		});
	},
}));
