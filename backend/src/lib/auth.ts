import { betterAuth } from "better-auth";
import { oAuthProxy, openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { envConfig } from "../env.js";
import { db } from "../db/database.js";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	emailAndPassword: { enabled: true },
	plugins: [
		openAPI(),
		// oAuthProxy({ productionURL: envConfig.BETTER_AUTH_URL }),
	],
	trustedOrigins: [envConfig.FRONTEND_URL],
	baseURL: envConfig.BETTER_AUTH_URL,
	account: {
		encryptOAuthTokens: true,
	},
	advanced: {
		useSecureCookies: true,
		crossSubDomainCookies: {
			enabled: false,
		},
		defaultCookieAttributes: {
			secure: true,
			sameSite: "none",
			httpOnly: true,
			path: "/",
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: envConfig.GOOGLE_CLIENT_ID,
			clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
			redirectURI: "https://vin-todo.vercel.app/api/auth/callback/google",
		},
	},
});
