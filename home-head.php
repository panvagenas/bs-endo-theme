<?php
/**
 * @author Panagiotis Vagenas <pan.vagenas@gmail.com>
 * @since 1.0.0
 * @copyright (c) 2014, Panagiotis Vagenas
 */
?>
<section id="main-head" class="d-all t-all m-all cf">
    <article id="slider-container" class="d-all t-all m-all">
        <?php get_sidebar('home_slider'); ?>
    </article>
    <article id="home-sidebar" class="d-4of12 t-4of12 m-1of3">
        <?php get_sidebar('home_sidebar'); ?>
    </article>
    <article id="home-banners" class="d-8of12 t-8of12 m-2of3">
        <?php get_sidebar('home_banners'); ?>
    </article>
</section>