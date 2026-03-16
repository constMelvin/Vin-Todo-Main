import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/database";
import { envConfig } from "@/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
	}),
	emailAndPassword: { enabled: true },
	plugins: [openAPI()],
	trustedOrigins: ["http://localhost:5173", envConfig.FRONTEND_URL],
	baseURL: envConfig.BETTER_AUTH_URL,
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: envConfig.GOOGLE_CLIENT_ID,
			clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
		},
	},
});
