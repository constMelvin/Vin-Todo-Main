import { db } from "@db/database.js";
import { auth } from "@lib/auth.js";


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

