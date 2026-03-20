import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { envConfig } from "../env.js";
import { db } from "../db/database.js";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	emailAndPassword: { enabled: true },
	plugins: [openAPI()],
	trustedOrigins: [envConfig.FRONTEND_URL],
	baseURL: envConfig.BETTER_AUTH_URL,
	account: {
		encryptOAuthTokens: true,
	},
	advanced: {
		useSecureCookies: true,
		crossSubDomainCookies: {
			enabled: false, // ✅ removed wrong domain
		},
		defaultCookieAttributes: {
			secure: true,
			sameSite: "none",
			http: true,
			path: "/",
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
