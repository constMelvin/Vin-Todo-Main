import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/types/hono";
// import type { AppType } from "../../../backend/src/types/hono";
const api = process.env.VITE_API_URL;

export const client = hc<AppType>(api!, {
	init: {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	},
});
