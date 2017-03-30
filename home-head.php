<?php
/**
 * @author Panagiotis Vagenas <pan.vagenas@gmail.com>
 * @since 1.0.0
 * @copyright (c) 2014, Panagiotis Vagenas
 */
?>
<section id="main-head" class="d-all t-all m-all cf">
    <article id="slider-container" class="d-all t-all m-all">
        <?php echo do_shortcode('[recent_post_slider limit="6" design="design-20" show_author="false" show_category_name="false" show_content="true" show_date="true" dots="true" arrows="true" autoplay="true" autoplay_interval="5000" speed="1000" content_words_limit="20"]'); ?>

    </article>
	<article id="slider-container" class="d-all t-all m-all">
		<?php get_sidebar('home_under_slider'); ?>
	</article>
    <div id="home-sidebar-for-mob" class="d-4of12 t-4of12 m-hidden">
        <?php get_sidebar('home_sidebar'); ?>
    </div>
	<div class="d-8of12 t-8of12 m-all">
		<article id="home-banners" class="d-all t-all m-hidden">
			<?php get_sidebar('home_banners'); ?>
		</article>
		<article class="under-home-banners d-all t-all m-hidden">
			<?php get_sidebar('under_home_banners_left'); ?>
			<?php get_sidebar('under_home_banners_right'); ?>
		</article>
		<article class="under-home-banners-under d-all t-all m-hidden">
			<?php get_sidebar('under_home_banners_left_under'); ?>
			<?php get_sidebar('under_home_banners_right_under'); ?>
		</article>
	</div>
</section>
