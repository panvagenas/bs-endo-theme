function updateViewportDimensions(){var b=window,h=document,f=h.documentElement,c=h.getElementsByTagName("body")[0],a=b.innerWidth||f.clientWidth||c.clientWidth,i=b.innerHeight||f.clientHeight||c.clientHeight;return{width:a,height:i}}var viewport=updateViewportDimensions();var waitForFinalEvent=(function(){var a={};return function(d,b,c){if(!c){c="Don't call this twice without a uniqueId"}if(a[c]){clearTimeout(a[c])}a[c]=setTimeout(d,b)}})();var timeToWaitForLast=100;function loadGravatars(){viewport=updateViewportDimensions();if(viewport.width>=768){jQuery(".comment img[data-gravatar]").each(function(){jQuery(this).attr("src",jQuery(this).attr("data-gravatar"))})}}jQuery(document).ready(function(a){a("header .responsive-this").slicknav();loadGravatars();a(window).resize(function(){waitForFinalEvent(function(){var d=Math.max(document.documentElement.clientWidth,window.innerWidth||0);var f=d>=1240;if(d>=768){var c=jQuery("#inner-content").width();var e=jQuery("#content").width();var h=e+Math.floor((c-e)/2)+50;var g=a(window).width();if(h+100>g){h=g-100}a(".scroll-to-top-icon").animate({left:h},400);var b=a(".header").height();a(window).unbind("scroll").scroll(function(){if(a(this).scrollTop()>b){a(".scroll-to-top-icon").fadeIn();f&&a(".float-menu").fadeIn().css("display","flex")}else{a(".scroll-to-top-icon").fadeOut();a(".float-menu").fadeOut()}});a(".scroll-to-top-icon").click(function(){a("html, body").animate({scrollTop:0},500);return false})}else{a(".scroll-to-top-icon").hide();a(window).unbind("scroll")}},500,"calc-scroll-pos")});a(window).trigger("resize");a(".pgwSlider").pgwSlider({selectionMode:"mouseOver",autoSlide:true});a(".ps-list li").click(function(){window.location=a(this).children("a").attr("href")})});
