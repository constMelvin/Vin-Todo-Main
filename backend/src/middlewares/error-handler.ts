
import type { Context } from "hono";
import { makeError } from "../utils/errors.js";

export async function errorHandlerMiddleware(err: Error, c: Context) {
	const { error, statusCode } = makeError(err);
	return c.json(error, { status: statusCode } as any);
}
