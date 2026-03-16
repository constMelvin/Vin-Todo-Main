import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	// load env variables for the current mode
	const env = loadEnv(mode, process.cwd());

	console.log("Backend URL:", env.VITE_API_URL); // optional debug

	return {
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
					target: env.VITE_API_URL, // <-- use env here
					changeOrigin: true,
				},
			},
		},
	};
});
