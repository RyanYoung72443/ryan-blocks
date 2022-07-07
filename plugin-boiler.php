<?php
// Markup for what wordpress will show on the plugins section of the admin panel
/**
 * Plugin Name:       Ryan's Blocks
 * Description:       Example of custom blocks I've built.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ryan Young
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       create-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_block_render_list_posts_block($attributes){
  $args = array(
		'post_per_page' => $attributes['numberOfPosts'],
		'post_status' => 'publish',
	);
	 $recent_posts = get_posts($args);
	 $posts = '<ul '. get_block_wrapper_attributes() .' >';
	 foreach($recent_posts as $post) {
		$title = get_the_title( $post );
		$title = $title ? $title : __('(Not title)', 'latest-post');
		$permalink = get_permalink( $post );
		$excerpt = get_the_excerpt( $post );
		$posts .= '<li>';
		
		if($attributes["displayFeaturedImage"] && has_post_thumbnail( $post )) {
			$posts .= get_the_post_thumbnail( $post, 'large' );
		}
		$posts .= '<h5><a href="'. esc_url( $permalink ) .'">'. $title .'</a></h5>';
		$posts .= '<time datetime="' . esc_attr( get_the_date('c', $post) ) . '">' . esc_html( get_the_date('', $post) ) .'</>';
		if(!empty($excerpt)) {
			$posts .= '<p>'. $excerpt .'</p>';
		}

		$posts .= '</li>';
	 }
	 $posts .= '</ul>';
	 return $posts;
}

function create_block_plugin_boiler_block_init() {
	//register each block by folder name
	register_block_type( __DIR__ . '/build/team-members' );
	register_block_type( __DIR__ . '/build/text-box' );
  register_block_type_from_metadata( __DIR__ . '/build/dynamic-posts', array('render_callback' => 'create_block_render_list_posts_block') );
}
add_action( 'init', 'create_block_plugin_boiler_block_init' );

//Set new Category for all blocks in plugin
add_filter( 'block_categories', 'new_gutenberg_category', 10, 2 );
function new_gutenberg_category( $categories, $post ) {
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'advanced-blocks',
        'title' => 'Advanced Blocks',
        'icon' => 'awards'
      ),
    )
  );
}
