import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/types/hono";

export const client = hc<AppType>("/", {
	init: {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	},
});
