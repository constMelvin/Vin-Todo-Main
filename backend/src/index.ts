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
		"*", // ✅ apply to ALL routes (important for OAuth)
		cors({
			origin: envConfig.FRONTEND_URL, // ✅ string only
			credentials: true,
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
		})
	)
	.get("/ok", (c: Context) => {
		return c.text("Backend Api ok.");
	})
	.on(["POST", "GET"], "/api/auth/**", (c) => {
		return auth.handler(c.req.raw);
	});

// your other routes
const router = app.route("/api", rootRoutes);

export type AppType = typeof router;
export default app;
