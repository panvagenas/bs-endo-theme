<?php
/**
 * @author Panagiotis Vagenas <pan.vagenas@gmail.com>
 * @since 1.0.0
 * @copyright (c) 2014, Panagiotis Vagenas
 */
?>
<section id="main-head" class="d-all t-all m-all cf">
    <article id="slider-container" class="d-all t-all m-all">
        <?php do_shortcode('[bs_home_slider]'); ?>

    </article>
	<article id="slider-container" class="d-all t-all m-all">
		<?php get_sidebar('home_under_slider'); ?>
	</article>
    <div id="home-sidebar-for-mob" class="d-4of12 t-4of12 m-hidden">
        <?php get_sidebar('home_sidebar'); ?>
    </div>
	<div class="d-8of12 t-8of12 m-all">
		<article id="home-banners" class="d-all t-all m-all">
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
