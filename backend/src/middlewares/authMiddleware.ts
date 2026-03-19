
import { auth } from "../lib/auth.js";
import type { HonoEnv } from "../types/hono.js";

import type { Context, MiddlewareHandler, Next } from "hono";
import { UnauthorizedError } from "../utils/errors.js";
import { db } from "../db/database.js";

export const authMiddleware: MiddlewareHandler = async (
	c: Context<HonoEnv>,
	next: Next
) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		throw new UnauthorizedError("Unauthorized");
	}

	c.set("session", session.session);
	c.set("user", session.user);
	c.set("dbClient", db);

	return await next();
};
