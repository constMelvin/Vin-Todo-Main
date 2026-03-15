import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const EditProfile = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				className="flex items-center gap-2 ml-2"
				onClick={() => setIsOpen(true)}
			>
				<User className="h-4 w-4" /> Profile
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Make changes to your profile here. You can change your photo
					and set a username.
				</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button">Save changes</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfile;
