import { Hono, type Context } from "hono";
import { auth } from "./lib/auth";
import { rootRoutes } from "./controllers/routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import type { HonoEnv } from "./types/hono";
import { envConfig } from "./env";

const app = new Hono<HonoEnv>();

app.use(logger())
	.onError(errorHandlerMiddleware)
	.use(
		"/api/auth/*",
		cors({
			origin: envConfig.FRONTEND_URL,
			credentials: true,
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
			exposeHeaders: ["Set-Cookie"], // ✅ expose Set-Cookie
		})
	)
	.use(
		"*",
		cors({
			origin: envConfig.FRONTEND_URL,
			credentials: true,
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		})
	)
	.get("/ok", (c: Context) => c.text("Backend Api ok."))
	.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

// your other routes
const router = app.route("/api", rootRoutes);

export type AppType = typeof router;
export default app;
