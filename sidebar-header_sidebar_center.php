<div id="sidebar1" class="sidebar-header m-all t-all d-all last-col cf" role="complementary">

    <?php if (is_active_sidebar('header_sidebar_center')) : ?>

        <?php dynamic_sidebar('header_sidebar_center'); ?>

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
