import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import save from "./save";

registerBlockType("create-block/team-member", {
	title: "Team Member",
	parent: ["create-block/team-members"],
	icon: "admin-users",
	description: "A team member profile",
	supports: {
		html: false,
		reusable: false,
	},
	textdomain: "team-member",
	edit: Edit,
	save,
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4",
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p",
		},
	},
});
