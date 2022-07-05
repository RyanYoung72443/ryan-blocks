import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import { changeMediaAttribute } from "../../utilities";
import { Spinner, withNotices } from "@wordpress/components";

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { name, bio, id, alt, url } = attributes;
	const { createErrorNotice, removeAllNotices } = noticeOperations;

	return (
		<div {...useBlockProps()}>
			{url && (
				<div
					className={`wp-block-create-block-team-member-img${
						isBlobURL(url) ? " is-loading" : ""
					}`}
				>
					<img src={url} alt={alt} />
					{isBlobURL(url) && <Spinner />}
				</div>
			)}
			<MediaPlaceholder
				icon="admin-users"
				onSelect={(value) => changeMediaAttribute(setAttributes, value)}
				onSelectURL={(value) =>
					changeMediaAttribute(setAttributes, { url: value })
				}
				onError={(err) => {
					removeAllNotices();
					createErrorNotice(err);
				}}
				// accept="image/*"
				allowedTypes={["image"]}
				disableMediaButtons={url}
				notices={noticeUI}
			/>
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

export default withNotices(Edit);
