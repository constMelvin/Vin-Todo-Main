import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CreateTask from "../Create-Task";

export const NavigationSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="items-center">
					<span className="font-bold text-3xl">
						<span className="text-blue-600">Vin</span>
						<span className="dark:text-white">Todo</span>
					</span>
				</SheetHeader>

				<div className="px-4">
					<CreateTask />
				</div>
			</SheetContent>
		</Sheet>
	);
};
