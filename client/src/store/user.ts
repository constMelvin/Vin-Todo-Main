import { authClient } from "@/lib/auth-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
	user: any;
	userInfo: any;
	error: any;
	signInUser: (userData: UserData) => Promise<SignResult>;
	signUpUser: (newUserData: any) => Promise<void>;
	signOutUser: () => Promise<void>;
	getUserInfo: (userId: any) => Promise<void>;
	signInWithSocial: () => Promise<void>;
	setUser: (user: any) => any;
};

export const userTodoStore = create(
	persist<UserStoreArgs>(
		(set) => ({
			user: null,
			userInfo: null,
			error: null,
			setUser: (user) => set({ user }),
			signInUser: async (userData: UserData) => {
				try {
					set({ error: null, user: null });
					if (!userData.email || !userData.password) {
						throw new Error("Email and password are required");
					}

					const { data, error } = await authClient.signIn.email({
						email: userData.email,
						password: userData.password,
						rememberMe: userData.rememberMe,
						callbackURL: "",
					});

					set({ user: data?.user, error: error });
					return { data, error };
				} catch (error: any) {
					set({
						error: error.message || "An error occurred",
						user: null,
					});
					return { error };
				}
			},
			signUpUser: async () => {},
			signOutUser: async () => {
				await authClient.signOut();
				set({ user: null, error: null });
			},
			getUserInfo: async (userId: string) => {
				const res = await authClient.accountInfo({
					accountId: userId,
				});
				console.log(res.data);

				set({ userInfo: res.data, error: res.error });
			},
			signInWithSocial: async () => {
				await authClient.signIn.social({
					provider: "google",
					callbackURL: window.location.origin, // ✅ back to Vercel
					errorCallbackURL: window.location.origin + "/login",
				});
			},
		}),
		{ name: "user-todo-store" }
	)
);
