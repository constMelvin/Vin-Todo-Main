import { auth } from "@/lib/auth";
import { db } from "@/db/database";
import type { AppType } from "..";

type Session = typeof auth.$Infer.Session.session | null;

type User = typeof auth.$Infer.Session.user | null;

export type HonoEnv = {
	Variables: {
		session: Session;
		user: User;
		dbClient: typeof db;
	};
	Validations: {
		json: any;
	};
};

export type { AppType };
