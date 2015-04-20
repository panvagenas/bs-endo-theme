<?php
/*
Author: Eddie Machado
URL: htp://themble.com/bones/

This is where you can drop your custom functions or
just edit things like thumbnail sizes, header images,
sidebars, comments, ect.
*/

// LOAD BONES CORE (if you remove this, the theme will break)
require_once('library/bones.php');

// USE THIS TEMPLATE TO CREATE CUSTOM POST TYPES EASILY
require_once('library/custom-post-type.php');

// CUSTOMIZE THE WORDPRESS ADMIN (off by default)
// require_once( 'library/admin.php' );

/*********************
 * LAUNCH BONES
 * Let's get everything up and running.
 *********************/

function bones_ahoy()
{

	//Allow editor style.
//  add_editor_style();

	// let's get language support going, if you need it
	load_theme_textdomain('bonestheme', get_template_directory().'/library/translation');

	// launching operation cleanup
	add_action('init', 'bones_head_cleanup');
	// A better title
	add_filter('wp_title', 'rw_title', 10, 3);
	// remove WP version from RSS
	add_filter('the_generator', 'bones_rss_version');
	// remove pesky injected css for recent comments widget
	add_filter('wp_head', 'bones_remove_wp_widget_recent_comments_style', 1);
	// clean up comment styles in the head
	add_action('wp_head', 'bones_remove_recent_comments_style', 1);
	// clean up gallery output in wp
	add_filter('gallery_style', 'bones_gallery_style');

	// enqueue base scripts and styles
	add_action('wp_enqueue_scripts', 'bones_scripts_and_styles', 999);
	// ie conditional wrapper

	// launching this stuff after theme setup
	bones_theme_support();

	// adding sidebars to Wordpress (these are created in functions.php)
	add_action('widgets_init', 'bones_register_sidebars');

	// cleaning up random code around images
	add_filter('the_content', 'bones_filter_ptags_on_images');
	// cleaning up excerpt
	add_filter('excerpt_more', 'bones_excerpt_more');
	add_filter('get_the_excerpt', 'bones_get_the_excerpt');
	add_shortcode('gallery', 'bones_gallery_shortcode');
} /* end bones ahoy */

// let's get this party started
add_action('after_setup_theme', 'bones_ahoy');


/************* OEMBED SIZE OPTIONS *************/

if (!isset($content_width)) {
	$content_width = 820;
}

/************* THUMBNAIL SIZE OPTIONS *************/

// Thumbnail sizes
add_image_size('large', 820, 510, true);
add_image_size('bones-thumb-600', 600, 150, true);
add_image_size('bones-thumb-300', 300, 100, true);

/*
to add more sizes, simply copy a line from above
and change the dimensions & name. As long as you
upload a "featured image" as large as the biggest
set width or height, all the other sizes will be
auto-cropped.

To call a different size, simply change the text
inside the thumbnail function.

For example, to call the 300 x 100 sized image,
we would use the function:
<?php the_post_thumbnail( 'bones-thumb-300' ); ?>
for the 600 x 150 image:
<?php the_post_thumbnail( 'bones-thumb-600' ); ?>

You can change the names and dimensions to whatever
you like. Enjoy!
*/

add_filter('image_size_names_choose', 'bones_custom_image_sizes');

function bones_custom_image_sizes($sizes)
{
	return array_merge($sizes, array(
		'large'           => __('820px by 510px'),
		'bones-thumb-600' => __('600px by 150px'),
		'bones-thumb-300' => __('300px by 100px'),
	));
}

/*
The function above adds the ability to use the dropdown menu to select
the new images sizes you have just created from within the media manager
when you add media to your content blocks. If you add more image sizes,
duplicate one of the lines in the array and name it according to your
new image size.
*/

/************* ACTIVE SIDEBARS ********************/

// Sidebars & Widgetizes Areas
function bones_register_sidebars()
{
	register_sidebar(array(
		'id'            => 'sidebar1',
		'name'          => __('Main Sidebar', 'bonestheme'),
		'description'   => __('The first (primary) sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'home_sidebar',
		'name'          => __('Home Mainbar', 'bonestheme'),
		'description'   => __('The home sidebar that displayed in main content area.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'footer_sidebar_left',
		'name'          => __('Footer Left Sidebar |*|_|_|', 'bonestheme'),
		'description'   => __('The footer left sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'footer_sidebar_center',
		'name'          => __('Footer Center Sidebar |_|*|_|', 'bonestheme'),
		'description'   => __('The footer center sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'footer_sidebar_right',
		'name'          => __('Footer Right Sidebar |_|_|*|', 'bonestheme'),
		'description'   => __('The footer right sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));
	register_sidebar(array(
		'id'            => 'footer_sidebar_right_1',
		'name'          => __('Footer Right Sidebar |_|_|_|*|', 'bonestheme'),
		'description'   => __('The footer right sidebar 2.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'header_sidebar_center',
		'name'          => __('Header Center Sidebar', 'bonestheme'),
		'description'   => __('The header center sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'header_sidebar_right',
		'name'          => __('Header Right Sidebar', 'bonestheme'),
		'description'   => __('The header right sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'home_banners',
		'name'          => __('Home Banners Area', 'bonestheme'),
		'description'   => __('Main banner area.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'under_home_banners_left',
		'name'          => __('Bellow Home Banners Area Left', 'bonestheme'),
		'description'   => __('Bellow Home Banners Area Left', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'under_home_banners_right',
		'name'          => __('Bellow Home Banners Area Right', 'bonestheme'),
		'description'   => __('Bellow Home Banners Area Right', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'under_home_banners_left_under',
		'name'          => __('Bellow Home Banners Area Left Under', 'bonestheme'),
		'description'   => __('Bellow Home Banners Area Left Under', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'under_home_banners_right_under',
		'name'          => __('Bellow Home Banners Area Right Under', 'bonestheme'),
		'description'   => __('Bellow Home Banners Area Right Under', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'adv1_sidebar',
		'name'          => __('Adv 1 Sidebar', 'bonestheme'),
		'description'   => __('Sidebar advertisement position 1.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'adv2_sidebar',
		'name'          => __('Adv 2 Sidebar', 'bonestheme'),
		'description'   => __('Sidebar advertisement position 2.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'post_top_sidebar',
		'name'          => __('Post Top Area', 'bonestheme'),
		'description'   => __('Above posts in single page', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'post_bottom_sidebar',
		'name'          => __('Below Posts Area', 'bonestheme'),
		'description'   => __('Bellow posts in single page', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	register_sidebar(array(
		'id'            => 'home_under_slider',
		'name'          => __('Below Home Slider', 'bonestheme'),
		'description'   => __('Bellow slider in home page', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	));

	/*
	to add more sidebars or widgetized areas, just copy
	and edit the above sidebar code. In order to call
	your new sidebar just use the following code:

	Just change the name to whatever your new
	sidebar's id is, for example:

	register_sidebar(array(
		'id' => 'sidebar2',
		'name' => __( 'Sidebar 2', 'bonestheme' ),
		'description' => __( 'The second (secondary) sidebar.', 'bonestheme' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	To call the sidebar in your template, you can just copy
	the sidebar.php file and rename it to your sidebar's name.
	So using the above example, it would be:
	sidebar-sidebar2.php

	*/
} // don't remove this bracket!


/************* COMMENT LAYOUT *********************/

// Comment Layout
function bones_comments($comment, $args, $depth) {
$GLOBALS['comment'] = $comment; ?>
<div id="comment-<?php comment_ID(); ?>" <?php comment_class('cf'); ?>>
	<article class="cf">
		<header class="comment-author vcard">
			<?php
			/*
			  this is the new responsive optimized comment image. It used the new HTML5 data-attribute to display comment gravatars on larger screens only. What this means is that on larger posts, mobile sites don't have a ton of requests for comment images. This makes load time incredibly fast! If you'd like to change it back, just replace it with the regular wordpress gravatar call:
			  echo get_avatar($comment,$size='32',$default='<path_to_url>' );
			*/
			?>
			<?php // custom gravatar call ?>
			<?php
			// create variable
			$bgauthemail = get_comment_author_email();
			?>
			<img data-gravatar="http://www.gravatar.com/avatar/<?php echo md5($bgauthemail); ?>?s=40"
			     class="load-gravatar avatar avatar-48 photo" height="40" width="40"
			     src="<?php echo get_template_directory_uri(); ?>/library/images/nothing.gif"/>
			<?php // end custom gravatar call ?>
			<?php printf(__('<cite class="fn">%1$s</cite> %2$s', 'bonestheme'), get_comment_author_link(), edit_comment_link(__('(Edit)', 'bonestheme'), '  ', '')) ?>
			<time datetime="<?php echo comment_time('Y-m-j'); ?>"><a
					href="<?php echo htmlspecialchars(get_comment_link($comment->comment_ID)) ?>"><?php comment_time(__('F jS, Y', 'bonestheme')); ?> </a>
			</time>

		</header>
		<?php if ($comment->comment_approved == '0') : ?>
			<div class="alert alert-info">
				<p><?php _e('Your comment is awaiting moderation.', 'bonestheme') ?></p>
			</div>
		<?php endif; ?>
		<section class="comment_content cf">
			<?php comment_text() ?>
		</section>
		<?php comment_reply_link(array_merge($args, array(
			'depth'     => $depth,
			'max_depth' => $args['max_depth']
		))) ?>
	</article>
	<?php // </li> is added by WordPress automatically ?>
	<?php
	} // don't remove this bracket!


	/*
	This is a modification of a function found in the
	twentythirteen theme where we can declare some
	external fonts. If you're using Google Fonts, you
	can replace these fonts, change it in your scss files
	and be up and running in seconds.
	*/
	function bones_fonts()
	{
//		wp_register_style( 'googleFontsBones', 'http://fonts.googleapis.com/css?family=Open+Sans|GFS+Didot|Ubuntu+Mono&subset=latin,greek' );
//		wp_enqueue_style( 'googleFontsBones' );
	}

	add_action('wp_print_styles', 'bones_fonts');
/***********************************************
* Post edit screen metabox
***********************************************/
/**
 * Adds a box to the main column on the Post and Page edit screens.
 */
function bs_endo_add_meta_box() {

	$screens = array( 'post', 'page' );

	foreach ( $screens as $screen ) {

		add_meta_box(
			'bs_endo_sectionid',
			__( 'Home Page Slider', 'bs_endo_textdomain' ),
			'bs_endo_meta_box_callback',
			$screen,
			'side'
		);
	}
}
add_action( 'add_meta_boxes', 'bs_endo_add_meta_box' );
/**
 * Prints the box content.
 *
 * @param WP_Post $post The object for the current post/page.
 */
function bs_endo_meta_box_callback( $post ) {

	// Add an nonce field so we can check for it later.
	wp_nonce_field( 'bs_endo_meta_box', 'bs_endo_meta_box_nonce' );

	/*
	 * Use get_post_meta() to retrieve an existing value
	 * from the database and use the value for the form.
	 */
	$value = get_post_meta( $post->ID, 'slider', true );

	echo '<label for="bs_endo_slider">';
	_e( 'Include in home page slider: ', 'bs_endo_textdomain' );
	echo '</label> ';
	echo '<input type="checkbox" id="bs_endo_slider" name="slider" value="1" '.checked($value,'1', false).'>';
}

/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */
function bs_endo_save_meta_box_data( $post_id ) {

	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */

	// Check if our nonce is set.
	if ( ! isset( $_POST['bs_endo_meta_box_nonce'] ) ) {
		return;
	}

	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['bs_endo_meta_box_nonce'], 'bs_endo_meta_box' ) ) {
		return;
	}

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	} else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	/* OK, it's safe for us to save the data now. */

	// Make sure that it is set.
	if ( ! isset( $_POST['slider'] ) ) {
		update_post_meta( $post_id, 'slider', '0' );
	} else {
		update_post_meta( $post_id, 'slider', '1' );
	}
}
add_action( 'save_post', 'bs_endo_save_meta_box_data' );

	/* DON'T DELETE THIS CLOSING TAG */
?>
