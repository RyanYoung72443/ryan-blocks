import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const {
		numberOfPosts,
		displayFeaturedImage,
		selectedPostType,
		postTaxonomies,
	} = attributes;
	const categories = {};
	const postTypes = useSelect((select) => {
		const { getPostTypes, getEntityRecords } = select("core");
		const postTypes = getPostTypes();
		if (postTypes) {
			const options = [];
			for (const key in postTypes) {
				if (postTypes[key].visibility["show_in_nav_menus"]) {
					const { name, slug, taxonomies } = postTypes[key];
					if (taxonomies) {
						const listTax = taxonomies.reduce((result, taxonomy) => {
							const category = getEntityRecords("taxonomy", taxonomy);
							if (taxonomy && category) {
								result[taxonomy] = category;
							}
							return result;
						}, {});
						categories[slug] = listTax;
					}
					options.push({
						label: name,
						value: slug,
					});
				}
			}
			console.log(categories);
			return options;
		}
	}, []);

	const posts = useSelect(
		(select) => {
			return select("core").getEntityRecords("postType", selectedPostType, {
				per_page: -1,
				_embed: true,
				categories: [],
			});
		},
		[selectedPostType]
	);

	const postTypeSelected = (newPostType) => {
		setAttributes({ selectedPostType: newPostType });
		console.log("categories['postType']: ", categories[newPostType]);
		const newPostTaxonomies = categories[newPostType];
		setAttributes({ postTaxonomies: newPostTaxonomies });
	};

	console.log("posts: ", posts);
	console.log("postTaxonomies: ", postTaxonomies);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Post Settings", "list-posts")}>
					{postTypes && (
						<SelectControl
							style={{ height: "auto" }}
							label={__("Post Type", "list-posts")}
							options={[
								{
									label: "",
									value: "",
								},
								...postTypes,
							]}
							value={selectedPostType}
							onChange={postTypeSelected}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<p>Dummy Text</p>
			</div>
		</>
	);
}
