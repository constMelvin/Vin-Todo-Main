import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/database";
import { envConfig } from "@/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	emailAndPassword: { enabled: true },

	plugins: [openAPI()],
	trustedOrigins: [envConfig.FRONTEND_URL],
	baseURL: envConfig.BETTER_AUTH_URL,
	advanced: {
		useSecureCookies: true,
		crossSubDomainCookies: {
			enabled: false, // ✅ removed wrong domain
		},
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true, // ✅ add this
			partitioned: true,
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: envConfig.GOOGLE_CLIENT_ID,
			clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
		},
	},
});
