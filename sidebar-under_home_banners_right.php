<div id="" class="sidebar no-border d-all cf" role="complementary">

    <?php if (is_active_sidebar('under_home_banners_right')) : ?>

        <?php dynamic_sidebar('under_home_banners_right'); ?>

    <?php else : ?>

        <?php
        /*
         * This content shows up if there are no widgets defined in the backend.
         */
        ?>



    <?php endif; ?>

</div>
