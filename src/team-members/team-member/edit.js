import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
	const { name, bio } = attributes;

	return (
		<div {...useBlockProps()}>
			<RichText
				placeholder={__("Member Name", "team-member")}
				tagName="h4"
				onChange={(newName) => {
					setAttributes({ name: newName });
				}}
				value={name}
				allowedFormats={[]}
			/>
			<RichText
				placeholder={__("Member Bio", "team-member")}
				tagName="p"
				onChange={(newBio) => {
					setAttributes({ bio: newBio });
				}}
				value={bio}
				allowedFormats={[]}
			/>
		</div>
	);
}
