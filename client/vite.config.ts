import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { env } from "process";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"backend/*": path.resolve(__dirname, "../backend/src/*"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: env.BACKEND_URL,
				changeOrigin: true,
			},
		},
	},
});
