import { Hono, type Context } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import type { HonoEnv } from "./types/hono.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { envConfig } from "./env.js";
import { auth } from "./lib/auth.js";
import { rootRoutes } from "./controllers/routes.js";

const app = new Hono<HonoEnv>();

const welcomeString = ["Backend API", "API Working properly"];

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
	.get("/", (c: Context) => {
		return c.text(welcomeString.join("\n\n"));
	})
	.get("/ok", (c: Context) => c.text("Backend Api ok."))
	.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

// your other routes
const router = app.route("/api", rootRoutes);

export type AppType = typeof router;
export default app;
