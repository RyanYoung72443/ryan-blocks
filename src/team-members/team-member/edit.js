import { useEffect, useState, useRef } from "@wordpress/element";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	Toolbar,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Button,
	Tooltip,
} from "@wordpress/components";
import { usePrevious } from "@wordpress/compose";
import { useSelect } from "@wordpress/data";
import { changeMediaAttribute } from "../../utilities";

function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
	isSelected,
}) {
	const { name, bio, id, alt, url, socialLinks } = attributes;
	const { createErrorNotice, removeAllNotices } = noticeOperations;
	const [blobURL, setBlobURL] = useState();

	const titleRef = useRef();
	const prevURL = usePrevious(url);

	const themeSizes = useSelect((select) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		themeSizes.forEach((size) => {
			if (imageObject.media_details.sizes[size.slug]) {
				options.push({
					label: size.name,
					value: imageObject.media_details.sizes[size.slug].source_url,
				});
			}
		});
		return options;
	};

	const addNewSocialItem = () => {};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({ url: undefined, alt: "" });
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);

	useEffect(() => {
		if (url && !prevURL) {
			titleRef.current.focus();
		}
	}, [url, prevURL]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "team-members")}>
					{id && (
						<SelectControl
							label={__("Image Size", "team-members")}
							options={getImageSizeOptions()}
							value={url}
							onChange={(newURL) => setAttributes({ url: newURL })}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt Text", "team-members")}
							value={alt}
							onChange={(newAlt) => setAttributes({ alt: newAlt })}
							help={__(
								"Alternative text that describes your image to people whom can't see it. Add a short description with it's key details.",
								"team-members"
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && !isBlobURL(url) && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "team-members")}
						onSelect={(value) => changeMediaAttribute(setAttributes, value)}
						onSelectURL={(value) =>
							changeMediaAttribute(setAttributes, { url: value })
						}
						onError={(err) => {
							removeAllNotices();
							createErrorNotice(err);
						}}
						accept="image/*"
						allowedTypes={["image"]}
						mediaId={id}
						mediaURL={url}
					/>
					<Toolbar
						onClick={() => {
							setAttributes({ url: undefined, id: undefined, alt: "" });
						}}
						className="wp-block-create-block-team-member-remove-image-button"
					>
						{__("Remove Image", "team-members")}
					</Toolbar>
				</BlockControls>
			)}
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
					accept="image/*"
					allowedTypes={["image"]}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<RichText
					ref={titleRef}
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
				<div className="wp-block-create-block-team-member-social-links">
					<ul>
						{socialLinks &&
							socialLinks.map((link, i) => {
								return (
									<li key={i}>
										<Button
											aria-label={__("Edit Social Link", "team-members")}
											icon={link.icon}
										/>
									</li>
								);
							})}
						{isSelected && (
							<li className="wp-block-create-block-team-member-add-icon-li">
								<Tooltip text={__("Add Social Link", "team-members")}>
									<Button
										aria-label={__("Add Social Link", "team-members")}
										icon="plus"
										onClick={addNewSocialItem}
									/>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
			</div>
		</>
	);
}

export default withNotices(Edit);
