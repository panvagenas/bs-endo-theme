<div id="" class="sidebar no-border m-1of2 t-1of2 d-1of2 cf" role="complementary">

    <?php if (is_active_sidebar('under_home_banners_left_under')) : ?>

        <?php dynamic_sidebar('under_home_banners_left_under'); ?>

    <?php else : ?>

        <?php
        /*
         * This content shows up if there are no widgets defined in the backend.
         */
        ?>

    <?php endif; ?>

</div>
