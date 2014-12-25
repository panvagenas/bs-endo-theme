<?php
/**
 * @author Panagiotis Vagenas <pan.vagenas@gmail.com>
 * @since 1.0.0
 * @copyright (c) 2014, Panagiotis Vagenas
 */
?>
<section id="main-head" class="d-all t-all m-all cf">
    <article id="slider-container" class="d-all t-all m-all">
        <?php // get_sidebar('home_slider'); ?>
        <?php
        $args = array(
            'meta_query' => array(
                array(
                    'key' => 'slider',
                    'value' => '1'
                )
            ),
            'posts_per_page' => 5
        );
        $args ['post_status'] = 'publish';
        $args ['perm'] = 'readable';
        $args ['post_visibility'] = 'public';
        $args ['ignore_sticky_posts'] = 1;

        $wq = new WP_Query($args);
        wp_reset_postdata();
        ?>
            <?php if ($wq->have_posts()) { ?> 
                <ul class="pgwSlider">
                    <?php /* @var $post WP_Post */ ?>
                    <?php while ($wq->have_posts()) { $wq->the_post(); ?>
                    
                            <li>
                                <a href="<?php echo get_permalink($wq->post->ID); ?>">
                                    <?php echo get_the_post_thumbnail(get_the_ID(), 'large'); ?>
                                    <span><?php echo $wq->post->post_title; ?></span>
                                </a>
                            </li>
                        
                    <?php } ?>
                </ul>
            <?php } else { ?>

            <?php } 
        wp_reset_postdata();?>

    </article>
    <div id="home-sidebar-for-mob" class="d-4of12 t-4of12 m-all">
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
