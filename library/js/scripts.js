/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
 */


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
    return {width: x, height: y}
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
  $(window).resize(function () {
 
     // if we're on the home page, we wait the set amount (in function above) then fire the function
     if( is_home ) { waitForFinalEvent( function() {
 
       // if we're above or equal to 768 fire this off
       if( viewport.width >= 768 ) {
         console.log('On home page and window sized to 768 width or more.');
       } else {
         // otherwise, let's do this instead
         console.log('Not on home page, or window sized to less than 768.');
       }
 
     }, timeToWaitForLast, "your-function-identifier-string"); }
  });

 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
 */

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
 */
function loadGravatars() {
    // set the viewport using the function above
    viewport = updateViewportDimensions();
    // if the viewport is tablet or larger, we load in the gravatars
    if (viewport.width >= 768) {
        jQuery('.comment img[data-gravatar]').each(function () {
            jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
        });
    }
} // end function


/*
 * Put all your regular jQuery in here.
 */
jQuery(document).ready(function ($) {
$('header .responsive-this').slicknav();
    /*
     * Let's fire off the gravatar function
     * You can remove this if you don't need it
     */
    loadGravatars();

//    if (viewport.width >= 768) {
//        var headerHeight = $('.header').height();
//        $(window).scroll(function () {
//            if ($(this).scrollTop() > headerHeight) {
//                $('.scroll-to-top-icon').fadeIn();
//                $('.float-menu').fadeIn();
//            } else {
//                $('.scroll-to-top-icon').fadeOut();
//                $('.float-menu').fadeOut();
//            }
//        });
//
//        $('.scroll-to-top-icon').click(function () {
//            $('html, body').animate({scrollTop: 0, easing: 'easeInOutCubic'}, 800);
//            return false;
//        });
//    } else {
//        $('.scroll-to-top-icon').hide();
//    }

    $(window).resize(function () {
        waitForFinalEvent(function () {
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var showFloatMenu = w >= 1240;

            console.log(w);
            
            if (w >= 768) {
                var icWidth = jQuery('#inner-content').width();
                var cWidth = jQuery('#content').width();
                var r = cWidth + Math.floor((icWidth - cWidth) / 2) + 50;
                var windowWidth = $(window).width();
                
                if(r + 100 > windowWidth){
                    r = windowWidth - 100;
                }

                $('.scroll-to-top-icon').animate({left: r}, 400);
                
                /**
                 * 
                 * @type @call;scripts_L112.$@call;height
                 */
                var headerHeight = $('.header').height();
                $(window).unbind('scroll').scroll(function () {
                    if ($(this).scrollTop() > headerHeight) {
                        $('.scroll-to-top-icon').fadeIn();
                        showFloatMenu && $('.float-menu').fadeIn();
                    } else {
                        $('.scroll-to-top-icon').fadeOut();
                        $('.float-menu').fadeOut();
                    }
                });

                $('.scroll-to-top-icon').click(function () {
                    $('html, body').animate({scrollTop: 0}, 500);
                    return false;
                });
                /**
                 * 
                 */
            } else {
                $('.scroll-to-top-icon').hide();
                $(window).unbind('scroll');
            }
        }, 500, 'calc-scroll-pos');
    });

    $(window).trigger('resize');
    
    /**
     * slider
     */
    
    var options = {
        $AutoPlay: true, //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
        $AutoPlaySteps: 1, //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
        $AutoPlayInterval: 4000, //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
        $PauseOnHover: 1, //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

        $ArrowKeyNavigation: true, //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
        $SlideDuration: 500, //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
        $MinDragOffsetToSlide: 20, //[Optional] Minimum drag offset to trigger slide , default value is 20
        //$SlideWidth: 600, //[Optional] Width of every slide in pixels, default value is width of 'slides' container
        //$SlideHeight: 300, //[Optional] Height of every slide in pixels, default value is height of 'slides' container
        $SlideSpacing: 5, //[Optional] Space between each slide in pixels, default value is 0
        $DisplayPieces: 1, //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
        $ParkingPosition: 0, //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
        $UISearchMode: 1, //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
        $PlayOrientation: 1, //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
        $DragOrientation: 3, //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

        $ThumbnailNavigatorOptions: {
            $Class: $JssorThumbnailNavigator$, //[Required] Class to create thumbnail navigator instance
            $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always

            $Loop: 2, //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
            $AutoCenter: 3, //[Optional] Auto center thumbnail items in the thumbnail navigator container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 3
            $Lanes: 1, //[Optional] Specify lanes to arrange thumbnails, default value is 1
            $SpacingX: 4, //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
            $SpacingY: 4, //[Optional] Vertical space between each thumbnail in pixel, default value is 0
            $DisplayPieces: 4, //[Optional] Number of pieces to display, default value is 1
            $ParkingPosition: 0, //[Optional] The offset position to park thumbnail
            $Orientation: 2, //[Optional] Orientation to arrange thumbnails, 1 horizental, 2 vertical, default value is 1
            $DisableDrag: false //[Optional] Disable drag or not, default value is false
        }
    };

    var jssor_slider1 = new $JssorSlider$("slider1_container", options);

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    function ScaleSlider() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth) {
            var sliderWidth = parentWidth;

            //keep the slider width no more than 810
            sliderWidth = Math.min(sliderWidth, 879);

            jssor_slider1.$SetScaleWidth(sliderWidth);
        }
        else
            window.setTimeout(ScaleSlider, 30);
    }

    ScaleSlider();

    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
        $(window).bind('resize', ScaleSlider);
    }


    //if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
    //    $(window).bind("orientationchange", ScaleSlider);
    //}
    //responsive code end

}); /* end of as page load scripts */