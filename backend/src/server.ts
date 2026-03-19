import { serve } from "@hono/node-server";
import { envConfig } from "./env.js";
import app from "./index.js";

const server = app;

serve(
	{
		fetch: server.fetch,
		port: envConfig.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
