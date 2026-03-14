import { Hono } from "hono";
import todoRoutes from "./todo-list/routes";

export const rootRoutes = new Hono().route("/", todoRoutes);

// export const routes = [todoRoutes] as const;
// export type AppRoutes = (typeof routes)[number];
