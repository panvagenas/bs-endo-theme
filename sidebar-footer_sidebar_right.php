<div id="" class="no-border sidebar m-all t-all d-all cf last-col" role="complementary">

    <?php if (is_active_sidebar('footer_sidebar_right')) : ?>

        <?php dynamic_sidebar('footer_sidebar_right'); ?>

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
