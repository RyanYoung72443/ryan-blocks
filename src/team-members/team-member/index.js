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
		id: {
			type: "number",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: "",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
		socialLinks: {
			type: "array",
			default: [
				{
					link: "https:facbook.com",
					icon: "facebook",
				},
				{
					link: "https:instagram.com",
					icon: "instagram",
				},
			],
		},
	},
	edit: Edit,
	save,
});
