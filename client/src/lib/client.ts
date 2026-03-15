import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/types/hono";
// import type { AppType } from "../../../backend/src/types/hono";

export const client = hc<AppType>("https://vin-todo.up.railway.app", {
	init: {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	},
});
