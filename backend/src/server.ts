import { serve } from "@hono/node-server";
import app from "./index";
import { envConfig } from "./env";

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
