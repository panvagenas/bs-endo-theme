<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

    <head>
        <meta charset="utf-8">

        <?php // force Internet Explorer to use the latest rendering engine available ?>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title><?php wp_title(''); ?></title>
        <?php // mobile meta (hooray!) ?>
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic|GFS+Didot|Ubuntu+Mono:400,400italic,700,700italic&subset=latin,greek' rel='stylesheet' type='text/css'>
        <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-icon-touch.png">
        <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
        <!--[if IE]>
                <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
        <![endif]-->
        <?php // or, set /favicon.ico for IE10 win ?>
        <meta name="msapplication-TileColor" content="#f01d4f">
        <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">

        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

        <?php // wordpress head functions ?>
        <?php wp_head(); ?>
        <?php // end of wordpress head ?>

        <?php // drop Google Analytics Here ?>
        <?php // end analytics ?>

    </head>

    <body <?php body_class(); ?>>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-32135869-1', 'auto');
          ga('send', 'pageview');

        </script>

        <div id="container">

            <header class="header wrap" role="banner">
                
            <i class="fa fa-chevron-circle-up scroll-to-top-icon"></i>
            
                <div id="inner-header" class="wrap cf">

                    <?php // to use a image just replace the bloginfo('name') with your img src and remove the surrounding <p> ?>
                    <div id="inner-header-head" class="wrap cf">
                        <div id="logo" class="d-2of12 t-2of12 m-all">
                            <a href="<?php echo home_url(); ?>" rel="nofollow"><img class="logo" alt="bikerspirit.net" src="<?php echo get_template_directory_uri(); ?>/library/images/logo.png"></a>
                        </div>
                        <div id="gif" class="d-5of12 t-5of12 m-all">
                            <?php get_sidebar('header_sidebar_center'); ?>
                        </div>
                        <div id="advertise" class="d-5of12 t-5of12 m-all last-col">
                            <?php get_sidebar('header_sidebar_right'); ?>
                        </div>
                    </div>
                    <?php // if you'd like to use the site description you can un-comment it below ?>
                    <?php // bloginfo('description'); ?>


                    <nav role="navigation" class="responsive-this">
                        <?php
                        wp_nav_menu(array(
                            'container' => false, // remove nav container
                            'container_class' => 'menu cf', // class of container (should you choose to use it)
                            'menu' => __('The Main Menu', 'bonestheme'), // nav name
                            'menu_class' => 'nav top-nav cf', // adding custom nav class
                            'theme_location' => 'main-nav', // where it's located in the theme
                            'before' => '', // before the menu
                            'after' => '', // after the menu
                            'link_before' => '', // before each link
                            'link_after' => '', // after each link
                            'depth' => 0, // limit the depth of the nav
                            'fallback_cb' => '',                             // fallback function (if there is one)
                        ));
                    ?>    
                    </nav>
                    <nav role="navigation" class="float-menu d-hidden m-hidden t-hidden">
                    <?php
                        wp_nav_menu(array(
                            'container' => false, // remove nav container
                            'container_class' => 'menu cf', // class of container (should you choose to use it)
                            'menu' => __('The Main Menu', 'bonestheme'), // nav name
                            'menu_class' => 'nav top-nav cf', // adding custom nav class
                            'theme_location' => 'main-nav', // where it's located in the theme
                            'before' => '', // before the menu
                            'after' => '', // after the menu
                            'link_before' => '', // before each link
                            'link_after' => '', // after each link
                            'depth' => 0, // limit the depth of the nav
                            'fallback_cb' => '',                             // fallback function (if there is one)
                        ));
                        ?>

                    </nav>

                </div>

            </header>
