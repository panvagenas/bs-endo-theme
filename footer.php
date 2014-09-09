			<footer class="footer" role="contentinfo">
				<div id="inner-footer" class="wrap cf">
                                    
                                    <article class="d-1of4 t-1of4 m-all">
                                        <?php get_sidebar('footer_sidebar_left'); ?>
                                    </article>
                                    <article class="d-1of4 t-1of4 m-all">
                                        <?php get_sidebar('footer_sidebar_center'); ?>
                                    </article>
                                    <article class="d-1of4 t-1of4 m-all last-col">
                                        <?php get_sidebar('footer_sidebar_right'); ?>
                                    </article>
                                    <article class="d-1of4 t-1of4 m-all last-col">
                                        <?php get_sidebar('footer_sidebar_right_1'); ?>
                                    </article>

                                    <p class="source-org copyright"><?php bloginfo( 'name' ); ?> &copy; 2008 - <?php echo date('Y'); ?></p>

				</div>

			</footer>

		</div>

		<?php // all js scripts are loaded in library/bones.php ?>
		<?php wp_footer(); ?>

	</body>

</html> <!-- end of site. what a ride! -->
