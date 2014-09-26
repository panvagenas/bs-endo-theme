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
                    'value' => 'true'
                )
            ),
            'posts_per_page' => 5
        );
        $posts = get_posts($args);
        ?>
        <!-- Jssor Slider Begin -->
        <!-- You can move inline styles to css file or css block. -->
        <div id="slider1_container" class="d-all m-all t-all">
            <!-- Loading Screen -->
            <div class="loading" u="loading">
                <div></div>
                <div></div>
            </div>
            <?php if (!empty($posts)) { ?> 
                <div class="items-container" u="slides">
                    <?php /* @var $post WP_Post */ ?>
                    <?php foreach ($posts as $post) { ?>

                        <div class="item-container">
                            <?php echo get_the_post_thumbnail($post->ID, 'large', array('u' => 'image')); ?>"
                            <div class="thumb-container" u="thumb">
                                <?php echo get_the_post_thumbnail($post->ID, 'post-thumbnail', array('class' => 'i')); ?>"
                                <div class="t">Image Gallery</div>
                                <div class="c">Image gallery with thumbnail navigation</div>
                            </div>
                        </div>

                    <?php } ?>
                </div>
            <?php } else { ?>
                <?php // TODO No posts to display ?>
            <?php } ?>
            <!-- ThumbnailNavigator Skin Begin -->
            <div u="thumbnavigator" class="jssort11" style="">
                <!-- Thumbnail Item Skin Begin -->
                <div u="slides" style="cursor: move;">
                    <div u="prototype" class="p" style="">
                        <thumbnailtemplate></thumbnailtemplate>
                    </div>
                </div>
                <!-- Thumbnail Item Skin End -->
            </div>
            <!-- ThumbnailNavigator Skin End -->
            <a style="display: none" href="http://www.jssor.com">javascript</a>
        </div>
        <!-- Jssor Slider End -->
    </article>
    <article id="home-sidebar" class="d-4of12 t-4of12 m-1of3">
        <?php get_sidebar('home_sidebar'); ?>
    </article>
    <article id="home-banners" class="d-8of12 t-8of12 m-2of3">
        <?php get_sidebar('home_banners'); ?>
    </article>
</section>