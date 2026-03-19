import { betterAuth } from "better-auth";
import { oAuthProxy, openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/database.js";
import { envConfig } from "@/env.js";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	emailAndPassword: { enabled: true },
	plugins: [openAPI(), oAuthProxy()],
	trustedOrigins: [envConfig.FRONTEND_URL],
	baseURL: envConfig.BETTER_AUTH_URL,
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60,
		},
	},

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
