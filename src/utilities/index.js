export const changeMediaAttribute = (setAttributes, image, size = "") => {
	let { url, id, alt } = image;
	if (!image || !image.url) {
		setAttributes({ url: undefined, id: undefined, alt: "" });
		return;
	}
	if (size !== "") {
		url = change.sizes[size]
			? change.sizes[size].url
			: change.sizes["full"].url;
	}
	return setAttributes({ url: url, id: id, alt: alt });
};

export const removeAttribute = (attributes, oldAttribute) => {
	const attr = {};
	for (const prop in attributes) {
		if (prop !== oldAttribute) attr[prop] = attributes[prop];
	}
	return attr;
};
