/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hooks that are used to function text and media elements.
 * It provides all the necessary props.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#richtext
 */
 import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { testimonialText, testimonialName, testimonialImage },
}) {
	return (
		<div className="testimonial-block">
			<blockquote>
				<RichText.Content value={testimonialText} />
			</blockquote>
			<div class="testimonial-info">
				<img src={testimonialImage} />
				<p>
					<RichText.Content value={testimonialName} />
				</p>
			</div>
		</div>
	);
}
