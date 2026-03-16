import { Hono, type Context } from "hono";
import { auth } from "./lib/auth";
import { rootRoutes } from "./controllers/routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import type { HonoEnv } from "./types/hono";
import { envConfig } from "./env";

const app = new Hono<HonoEnv>()
	.use(logger())
	.onError(errorHandlerMiddleware)
	.use(
		"/api/*",
		cors({
			origin: envConfig.FRONTEND_URL,
			credentials: true,
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		})
	)
	.get("/ok", (c: Context) => {
		return c.text("Backend Api ok.");
	})
	.on(["POST"], "/api/auth/**", async (c: Context) => {
		const res = await auth.handler(c.req.raw); // returns Response

		// Parse JSON body
		const data = await res.json(); // data may have token/session

		// Set cookie if Better Auth returns a token
		if (data.token) {
			c.header(
				"Set-Cookie",
				`session=${data.token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=86400`
			);
		}

		// Return the original response
		return c.json(data);
	});

const router = app.route("/api", rootRoutes);

console.log(envConfig.FRONTEND_URL);

/* All Routes here */

// routes.forEach((route) => {
// 	app = app.route("/api", route);
// });

export type AppType = typeof router;
export default app;
