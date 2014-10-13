<div id="" class="sidebar no-border m-1of2 t-1of2 d-1of2 cf" role="complementary">

    <?php if (is_active_sidebar('under_home_banners_left')) : ?>

        <?php dynamic_sidebar('under_home_banners_left'); ?>

    <?php else : ?>

        <?php
        /*
         * This content shows up if there are no widgets defined in the backend.
         */
        ?>

        <div class="no-widgets">
            <p><?php _e('This is a widget ready area. Add some and they will appear here.', 'bonestheme'); ?></p>
        </div>

    <?php endif; ?>

</div>
