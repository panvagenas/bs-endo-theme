
/*!
    SlickNav Responsive Mobile Menu v1.0.1
    (c) 2014 Josh Cope
    licensed under MIT
*/
;(function(e,t,n){function o(t,n){this.element=t;this.settings=e.extend({},r,n);this._defaults=r;this._name=i;this.init()}var r={label:"MENU",duplicate:true,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",parentTag:"a",closeOnClick:false,allowParentLinks:false,nestedParentLinks:true,showChildren:false,init:function(){},open:function(){},close:function(){}},i="slicknav",s="slicknav";o.prototype.init=function(){var n=this,r=e(this.element),i=this.settings,o,u;if(i.duplicate){n.mobileNav=r.clone();n.mobileNav.removeAttr("id");n.mobileNav.find("*").each(function(t,n){e(n).removeAttr("id")})}else{n.mobileNav=r}o=s+"_icon";if(i.label===""){o+=" "+s+"_no-text"}if(i.parentTag=="a"){i.parentTag='a href="#"'}n.mobileNav.attr("class",s+"_nav");u=e('<div class="'+s+'_menu"></div>');n.btn=e(["<"+i.parentTag+' aria-haspopup="true" tabindex="0" class="'+s+"_btn "+s+'_collapsed">','<span class="'+s+'_menutxt">'+i.label+"</span>",'<span class="'+o+'">','<span class="'+s+'_icon-bar"></span>','<span class="'+s+'_icon-bar"></span>','<span class="'+s+'_icon-bar"></span>',"</span>","</"+i.parentTag+">"].join(""));e(u).append(n.btn);e(i.prependTo).prepend(u);u.append(n.mobileNav);var a=n.mobileNav.find("li");e(a).each(function(){var t=e(this),r={};r.children=t.children("ul").attr("role","menu");t.data("menu",r);if(r.children.length>0){var o=t.contents(),u=false;nodes=[];e(o).each(function(){if(!e(this).is("ul")){nodes.push(this)}else{return false}if(e(this).is("a")){u=true}});var a=e("<"+i.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+s+'_item"/>');if(!i.allowParentLinks||i.nestedParentLinks||!u){var f=e(nodes).wrapAll(a).parent();f.addClass(s+"_row")}else e(nodes).wrapAll('<span class="'+s+"_parent-link "+s+'_row"/>').parent();t.addClass(s+"_collapsed");t.addClass(s+"_parent");var l=e('<span class="'+s+'_arrow">'+i.closedSymbol+"</span>");if(i.allowParentLinks&&!i.nestedParentLinks&&u)l=l.wrap(a).parent();e(nodes).last().after(l)}else if(t.children().length===0){t.addClass(s+"_txtnode")}t.children("a").attr("role","menuitem").click(function(t){if(i.closeOnClick&&!e(t.target).parent().closest("li").hasClass(s+"_parent")){e(n.btn).click()}});if(i.closeOnClick&&i.allowParentLinks){t.children("a").children("a").click(function(t){e(n.btn).click()});t.find("."+s+"_parent-link a:not(."+s+"_item)").click(function(t){e(n.btn).click()})}});e(a).each(function(){var t=e(this).data("menu");if(!i.showChildren){n._visibilityToggle(t.children,null,false,null,true)}});n._visibilityToggle(n.mobileNav,null,false,"init",true);n.mobileNav.attr("role","menu");e(t).mousedown(function(){n._outlines(false)});e(t).keyup(function(){n._outlines(true)});e(n.btn).click(function(e){e.preventDefault();n._menuToggle()});n.mobileNav.on("click","."+s+"_item",function(t){t.preventDefault();n._itemClick(e(this))});e(n.btn).keydown(function(e){var t=e||event;if(t.keyCode==13){e.preventDefault();n._menuToggle()}});n.mobileNav.on("keydown","."+s+"_item",function(t){var r=t||event;if(r.keyCode==13){t.preventDefault();n._itemClick(e(t.target))}});if(i.allowParentLinks&&i.nestedParentLinks){e("."+s+"_item a").click(function(e){e.stopImmediatePropagation()})}};o.prototype._menuToggle=function(e){var t=this;var n=t.btn;var r=t.mobileNav;if(n.hasClass(s+"_collapsed")){n.removeClass(s+"_collapsed");n.addClass(s+"_open")}else{n.removeClass(s+"_open");n.addClass(s+"_collapsed")}n.addClass(s+"_animating");t._visibilityToggle(r,n.parent(),true,n)};o.prototype._itemClick=function(e){var t=this;var n=t.settings;var r=e.data("menu");if(!r){r={};r.arrow=e.children("."+s+"_arrow");r.ul=e.next("ul");r.parent=e.parent();if(r.parent.hasClass(s+"_parent-link")){r.parent=e.parent().parent();r.ul=e.parent().next("ul")}e.data("menu",r)}if(r.parent.hasClass(s+"_collapsed")){r.arrow.html(n.openedSymbol);r.parent.removeClass(s+"_collapsed");r.parent.addClass(s+"_open");r.parent.addClass(s+"_animating");t._visibilityToggle(r.ul,r.parent,true,e)}else{r.arrow.html(n.closedSymbol);r.parent.addClass(s+"_collapsed");r.parent.removeClass(s+"_open");r.parent.addClass(s+"_animating");t._visibilityToggle(r.ul,r.parent,true,e)}};o.prototype._visibilityToggle=function(t,n,r,i,o){var u=this;var a=u.settings;var f=u._getActionItems(t);var l=0;if(r){l=a.duration}if(t.hasClass(s+"_hidden")){t.removeClass(s+"_hidden");t.slideDown(l,a.easingOpen,function(){e(i).removeClass(s+"_animating");e(n).removeClass(s+"_animating");if(!o){a.open(i)}});t.attr("aria-hidden","false");f.attr("tabindex","0");u._setVisAttr(t,false)}else{t.addClass(s+"_hidden");t.slideUp(l,this.settings.easingClose,function(){t.attr("aria-hidden","true");f.attr("tabindex","-1");u._setVisAttr(t,true);t.hide();e(i).removeClass(s+"_animating");e(n).removeClass(s+"_animating");if(!o){a.close(i)}else if(i=="init"){a.init()}})}};o.prototype._setVisAttr=function(t,n){var r=this;var i=t.children("li").children("ul").not("."+s+"_hidden");if(!n){i.each(function(){var t=e(this);t.attr("aria-hidden","false");var i=r._getActionItems(t);i.attr("tabindex","0");r._setVisAttr(t,n)})}else{i.each(function(){var t=e(this);t.attr("aria-hidden","true");var i=r._getActionItems(t);i.attr("tabindex","-1");r._setVisAttr(t,n)})}};o.prototype._getActionItems=function(e){var t=e.data("menu");if(!t){t={};var n=e.children("li");var r=n.find("a");t.links=r.add(n.find("."+s+"_item"));e.data("menu",t)}return t.links};o.prototype._outlines=function(t){if(!t){e("."+s+"_item, ."+s+"_btn").css("outline","none")}else{e("."+s+"_item, ."+s+"_btn").css("outline","")}};o.prototype.toggle=function(){var e=this;e._menuToggle()};o.prototype.open=function(){var e=this;if(e.btn.hasClass(s+"_collapsed")){e._menuToggle()}};o.prototype.close=function(){var e=this;if(e.btn.hasClass(s+"_open")){e._menuToggle()}};e.fn[i]=function(t){var n=arguments;if(t===undefined||typeof t==="object"){return this.each(function(){if(!e.data(this,"plugin_"+i)){e.data(this,"plugin_"+i,new o(this,t))}})}else if(typeof t==="string"&&t[0]!=="_"&&t!=="init"){var r;this.each(function(){var s=e.data(this,"plugin_"+i);if(s instanceof o&&typeof s[t]==="function"){r=s[t].apply(s,Array.prototype.slice.call(n,1))}});return r!==undefined?r:this}}})(jQuery,document,window)

/*!
    Jssor slider
*/
/*
* Jssor.Core 16.0
* http://www.jssor.com/
* 
* TERMS OF USE - Jssor.Core
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*! Jssor */
$Jssor$ = window.$Jssor$ = window.$Jssor$ || {};


//$JssorDebug$
var $JssorDebug$ = new function () {

    this.$DebugMode = true;

    // Methods

    this.$Log = function (msg, important) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        } else if (debug && important) {
            alert(msg);
        }
    };

    this.$Error = function (msg, e) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.error) {
            console.error(msg);
        } else if (debug) {
            alert(msg);
        }

        if (debug) {
            // since we're debugging, fail fast by crashing
            throw e || new Error(msg);
        }
    };

    this.$Fail = function (msg) {
        throw new Error(msg);
    };

    this.$Assert = function (value, msg) {
        var debug = this.$DebugMode;
        if (debug) {
            if (!value)
                throw new Error("Assert failed " + msg || "");
        }
    };

    this.$Trace = function (msg) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        }
    };

    this.$Execute = function (func) {
        var debug = this.$DebugMode;
        if (debug)
            func();
    };

    this.$LiveStamp = function (obj, id) {
        var stamp = document.createElement("DIV");
        stamp.setAttribute("id", id);

        obj.$Live = stamp;
    };
};


//$JssorEventManager$
var $JssorEventManager$ = function () {
    var self = this;
    // Fields

    var listeners = {}; // dictionary of eventName --> array of handlers

    // Methods

    self.$On = self.addEventListener = function (eventName, handler) {
        if (typeof (handler) != "function") {
            return;
        }

        if (!listeners[eventName]) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(handler);
    };

    self.$Off = self.removeEventListener = function (eventName, handler) {
        var handlers = listeners[eventName];

        if (typeof (handler) != "function") {
            return;
        } else if (!handlers) {
            return;
        }

        for (var i = 0; i < handlers.length; i++) {
            if (handler == handlers[i]) {
                handlers.splice(i, 1);
                return;
            }
        }
    };

    self.$ClearEventListeners = function (eventName) {
        if (listeners[eventName]) {
            delete listeners[eventName];
        }
    };

    self.$TriggerEvent = function (eventName) {
        var handlers = listeners[eventName];
        var args = [];

        if (!handlers) {
            return;
        }

        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        for (var i = 0; i < handlers.length; i++) {
            try {
                handlers[i].apply(window, args);
            } catch (e) {
                // handler threw an error, ignore, go on to next one
                $JssorDebug$.$Error(e.name + " while executing " + eventName +
                        " handler: " + e.message, e);
            }
        }
    };
};

/// <reference path="Jssor.Core.js" />

/*
* Jssor.Utils 17.0
* http://www.jssor.com/
* 
* TERMS OF USE - Jssor.Utils
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//$JssorPoint$
var $JssorPoint$;

(function () {

    $JssorPoint$ = function (x, y) {

        // Properties

        this.x = typeof (x) == "number" ? x : 0;
        this.y = typeof (y) == "number" ? y : 0;

    };

    // Methods

    var SDPointPrototype = $JssorPoint$.prototype;

    SDPointPrototype.$Plus = function (point) {
        return new $JssorPoint$(this.x + point.x, this.y + point.y);
    };

    SDPointPrototype.$Minus = function (point) {
        return new $JssorPoint$(this.x - point.x, this.y - point.y);
    };

    SDPointPrototype.$Times = function (factor) {
        return new $JssorPoint$(this.x * factor, this.y * factor);
    };

    SDPointPrototype.$Divide = function (factor) {
        return new $JssorPoint$(this.x / factor, this.y / factor);
    };

    SDPointPrototype.$Negate = function () {
        return new $JssorPoint$(-this.x, -this.y);
    };

    SDPointPrototype.$DistanceTo = function (point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) +
                        Math.pow(this.y - point.y, 2));
    };

    SDPointPrototype.$Apply = function (func) {
        return new $JssorPoint$(func(this.x), func(this.y));
    };

    SDPointPrototype.$Equals = function (point) {
        return (point instanceof $JssorPoint$) &&
                (this.x === point.x) && (this.y === point.y);
    };

    SDPointPrototype.$ToString = function () {
        return "(" + this.x + "," + this.y + ")";
    };

})();

//$JssorEasing$
var $JssorEasing$ = window.$JssorEasing$ = {
    $EaseLinear: function (t) {
        return t;
    },
    $EaseGoBack: function (t) {
        return 1 - Math.abs((t *= 2) - 1);
    },
    $EaseSwing: function (t) {
        return -Math.cos(t * Math.PI) / 2 + .5;
    },
    $EaseInQuad: function (t) {
        return t * t;
    },
    $EaseOutQuad: function (t) {
        return -t * (t - 2);
    },
    $EaseInOutQuad: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);
    },
    $EaseInCubic: function (t) {
        return t * t * t;
    },
    $EaseOutCubic: function (t) {
        return (t -= 1) * t * t + 1;
    },
    $EaseInOutCubic: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);
    },
    $EaseInQuart: function (t) {
        return t * t * t * t;
    },
    $EaseOutQuart: function (t) {
        return -((t -= 1) * t * t * t - 1);
    },
    $EaseInOutQuart: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t : -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    $EaseInQuint: function (t) {
        return t * t * t * t * t;
    },
    $EaseOutQuint: function (t) {
        return (t -= 1) * t * t * t * t + 1;
    },
    $EaseInOutQuint: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t * t : 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    $EaseInSine: function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    },
    $EaseOutSine: function (t) {
        return Math.sin(t * Math.PI / 2);
    },
    $EaseInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
    },
    $EaseInExpo: function (t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    $EaseOutExpo: function (t) {
        return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    $EaseInOutExpo: function (t) {
        return t == 0 || t == 1 ? t : (t *= 2) < 1 ? 1 / 2 * Math.pow(2, 10 * (t - 1)) : 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    $EaseInCirc: function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    },
    $EaseOutCirc: function (t) {
        return Math.sqrt(1 - (t -= 1) * t);
    },
    $EaseInOutCirc: function (t) {
        return (t *= 2) < 1 ? -1 / 2 * (Math.sqrt(1 - t * t) - 1) : 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    $EaseInElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p));
    },
    $EaseOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * 2 * Math.PI / p) + 1;
    },
    $EaseInOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .45, s = .1125;
        return (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) : Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) * .5 + 1;
    },
    $EaseInBack: function (t) {
        var s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    $EaseOutBack: function (t) {
        var s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    $EaseInOutBack: function (t) {
        var s = 1.70158;
        return (t *= 2) < 1 ? 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s) : 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    $EaseInBounce: function (t) {
        return 1 - $JssorEasing$.$EaseOutBounce(1 - t)
    },
    $EaseOutBounce: function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    },
    $EaseInOutBounce: function (t) {
        return t < 1 / 2 ? $JssorEasing$.$EaseInBounce(t * 2) * .5 : $JssorEasing$.$EaseOutBounce(t * 2 - 1) * .5 + .5;
    },
    $EaseInWave: function (t) {
        return 1 - Math.cos(t * Math.PI * 2)
    },
    $EaseOutWave: function (t) {
        return Math.sin(t * Math.PI * 2);
    },
    $EaseOutJump: function (t) {
        return 1 - (((t *= 2) < 1) ? (t = 1 - t) * t * t : (t -= 1) * t * t);
    },
    $EaseInJump: function (t) {
        return ((t *= 2) < 1) ? t * t * t : (t = 2 - t) * t * t;
    }
};

var $JssorDirection$ = window.$JssorDirection$ = {
    $TO_LEFT: 0x0001,
    $TO_RIGHT: 0x0002,
    $TO_TOP: 0x0004,
    $TO_BOTTOM: 0x0008,
    $HORIZONTAL: 0x0003,
    $VERTICAL: 0x000C,
    $LEFTRIGHT: 0x0003,
    $TOPBOTOM: 0x000C,
    $TOPLEFT: 0x0005,
    $TOPRIGHT: 0x0006,
    $BOTTOMLEFT: 0x0009,
    $BOTTOMRIGHT: 0x000A,
    $AROUND: 0x000F,

    $GetDirectionHorizontal: function (direction) {
        return direction & 0x0003;
    },
    $GetDirectionVertical: function (direction) {
        return direction & 0x000C;
    },
    $ChessHorizontal: function (direction) {
        return (~direction & 0x0003) + (direction & 0x000C);
    },
    $ChessVertical: function (direction) {
        return (~direction & 0x000C) + (direction & 0x0003);
    },
    $IsToLeft: function (direction) {
        return (direction & 0x0003) == 0x0001;
    },
    $IsToRight: function (direction) {
        return (direction & 0x0003) == 0x0002;
    },
    $IsToTop: function (direction) {
        return (direction & 0x000C) == 0x0004;
    },
    $IsToBottom: function (direction) {
        return (direction & 0x000C) == 0x0008;
    },
    $IsHorizontal: function (direction) {
        return (direction & 0x0003) > 0;
    },
    $IsVertical: function (direction) {
        return (direction & 0x000C) > 0;
    }
};

var $JssorKeyCode$ = {
    $BACKSPACE: 8,
    $COMMA: 188,
    $DELETE: 46,
    $DOWN: 40,
    $END: 35,
    $ENTER: 13,
    $ESCAPE: 27,
    $HOME: 36,
    $LEFT: 37,
    $NUMPAD_ADD: 107,
    $NUMPAD_DECIMAL: 110,
    $NUMPAD_DIVIDE: 111,
    $NUMPAD_ENTER: 108,
    $NUMPAD_MULTIPLY: 106,
    $NUMPAD_SUBTRACT: 109,
    $PAGE_DOWN: 34,
    $PAGE_UP: 33,
    $PERIOD: 190,
    $RIGHT: 39,
    $SPACE: 32,
    $TAB: 9,
    $UP: 38
};

var $JssorAlignment$ = {
    $TopLeft: 0x11,
    $TopCenter: 0x12,
    $TopRight: 0x14,
    $MiddleLeft: 0x21,
    $MiddleCenter: 0x22,
    $MiddleRight: 0x24,
    $BottomLeft: 0x41,
    $BottomCenter: 0x42,
    $BottomRight: 0x44,

    $IsTop: function (aligment) {
        return aligment & 0x10 > 0;
    },
    $IsMiddle: function (alignment) {
        return alignment & 0x20 > 0;
    },
    $IsBottom: function (alignment) {
        return alignment & 0x40 > 0;
    },
    $IsLeft: function (alignment) {
        return alignment & 0x01 > 0;
    },
    $IsCenter: function (alignment) {
        return alignment & 0x02 > 0;
    },
    $IsRight: function (alignment) {
        return alignment & 0x04 > 0;
    }
};

var $JssorMatrix$;

var $JssorBrowser$ = {
    $UNKNOWN: 0,
    $IE: 1,
    $FIREFOX: 2,
    $SAFARI: 3,
    $CHROME: 4,
    $OPERA: 5
};

var $ROWSER_UNKNOWN$ = 0;
var $ROWSER_IE$ = 1;
var $ROWSER_FIREFOX$ = 2;
var $ROWSER_SAFARI$ = 3;
var $ROWSER_CHROME$ = 4;
var $ROWSER_OPERA$ = 5;

var $JssorAnimator$;

// $JssorUtils$ is a static class, so make it singleton instance
var $JssorUtils$ = window.$JssorUtils$ = new function () {

    // Fields

    var self = this;

    var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];
    var supportedImageFormats = {
        "bmp": false,
        "jpeg": true,
        "jpg": true,
        "png": true,
        "tif": false,
        "wdp": false
    };

    var browser = $JssorBrowser$.$UNKNOWN;
    var browserRuntimeVersion = 0;
    var browserEngineVersion = 0;
    var browserJavascriptVersion = 0;
    var webkitVersion = 0;

    var app = navigator.appName;
    var ver = navigator.appVersion;
    var ua = navigator.userAgent;

    var urlParams = {};

    function DetectBrowser() {
        if (!browser) {
            if (app == "Microsoft Internet Explorer" &&
                !!window.attachEvent && !!window.ActiveXObject) {

                var ieOffset = ua.indexOf("MSIE");
                browser = $JssorBrowser$.$IE;
                browserEngineVersion = parseFloat(ua.substring(ieOffset + 5, ua.indexOf(";", ieOffset)));

                //check IE javascript version
                /*@cc_on
                browserJavascriptVersion = @_jscript_version;
                @*/

                // update: for intranet sites and compat view list sites, IE sends
                // an IE7 User-Agent to the server to be interoperable, and even if
                // the page requests a later IE version, IE will still report the
                // IE7 UA to JS. we should be robust to self.
                //var docMode = document.documentMode;
                //if (typeof docMode !== "undefined") {
                //    browserRuntimeVersion = docMode;
                //}

                browserRuntimeVersion = document.documentMode || browserEngineVersion;

            }
            else if (app == "Netscape" && !!window.addEventListener) {

                var ffOffset = ua.indexOf("Firefox");
                var saOffset = ua.indexOf("Safari");
                var chOffset = ua.indexOf("Chrome");
                var webkitOffset = ua.indexOf("AppleWebKit");

                if (ffOffset >= 0) {
                    browser = $JssorBrowser$.$FIREFOX;
                    browserRuntimeVersion = parseFloat(ua.substring(ffOffset + 8));
                }
                else if (saOffset >= 0) {
                    var slash = ua.substring(0, saOffset).lastIndexOf("/");
                    browser = (chOffset >= 0) ? $JssorBrowser$.$CHROME : $JssorBrowser$.$SAFARI;
                    browserRuntimeVersion = parseFloat(ua.substring(slash + 1, saOffset));
                }

                if (webkitOffset >= 0)
                    webkitVersion = parseFloat(ua.substring(webkitOffset + 12));
            }
            else {
                var match = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(ua);
                if (match) {
                    browser = $JssorBrowser$.$OPERA;
                    browserRuntimeVersion = parseFloat(match[2]);
                }
            }
        }
    }

    function IsBrowserIE() {
        DetectBrowser();
        return browser == $ROWSER_IE$;
    }

    function IsBrowserIeQuirks() {

        return IsBrowserIE() && (browserRuntimeVersion < 6 || document.compatMode == "BackCompat");   //Composite to "CSS1Compat"
    }

    function IsBrowserFireFox() {
        DetectBrowser();
        return browser == $ROWSER_FIREFOX$;
    }

    function IsBrowserSafari() {
        DetectBrowser();
        return browser == $ROWSER_SAFARI$;
    }

    function IsBrowserChrome() {
        DetectBrowser();
        return browser == $ROWSER_CHROME$;
    }

    function IsBrowserOpera() {
        DetectBrowser();
        return browser == $ROWSER_OPERA$;
    }

    function IsBrowserBadTransform() {
        return IsBrowserSafari() && (webkitVersion > 534) && (webkitVersion < 535);
    }

    function IsBrowserSafeHWA() {
        return IsBrowserSafari() && (webkitVersion < 535);
    }

    function IsBrowserIe9Earlier() {

        //IE 8- and chrome 1 won't fade well
        return IsBrowserIE() && browserRuntimeVersion < 9; // || (IsBrowserChrome() && browserRuntimeVersion < 2);
    }

    var _TransformProperty;
    function GetTransformProperty(elmt) {

        if (!_TransformProperty) {
            // Note that in some versions of IE9 it is critical that
            // msTransform appear in this list before MozTransform

            each(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'], function (property) {
                if (!self.$IsUndefined(elmt.style[property])) {
                    _TransformProperty = property;
                    return true;
                }
            });

            _TransformProperty = _TransformProperty || "transform";
        }

        return _TransformProperty;
    }

    // Constructor
    {
        //Ignore urlParams
        //        // Url parameters

        //        var query = window.location.search.substring(1);    // ignore '?'
        //        var parts = query.split('&');

        //        for (var i = 0; i < parts.length; i++) {
        //            var part = parts[i];
        //            var sep = part.indexOf('=');

        //            if (sep > 0) {
        //                urlParams[part.substring(0, sep)] =
        //                        decodeURIComponent(part.substring(sep + 1));
        //            }
        //        }

        // Browser behaviors

    }

    // Helpers
    function getOffsetParent(elmt, isFixed) {
        // IE and Opera "fixed" position elements don't have offset parents.
        // regardless, if it's fixed, its offset parent is the body.
        if (isFixed && elmt != document.body) {
            return document.body;
        } else {
            return elmt.offsetParent;
        }
    }

    function toString(obj) {
        return Object.prototype.toString.call(obj);
    }

    // [[Class]] -> type pairs
    var class2type;

    function each(object, callback) {
        if (toString(object) == "[object Array]") {
            for (var i = 0; i < object.length; i++) {
                if (callback(object[i], i, object)) {
                    break;
                }
            }
        } else {
            for (var name in object) {
                if (callback(object[name], name, object)) {
                    break;
                }
            }
        }
    }

    function GetClass2Type() {
        if (!class2type) {
            class2type = {};
            each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (name) {
                class2type["[object " + name + "]"] = name.toLowerCase();
            });
        }

        return class2type;
    }

    function type(obj) {
        return obj == null ? String(obj) : GetClass2Type()[toString(obj)] || "object";
    }

    function isPlainObject(obj) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || type(obj) !== "object" || obj.nodeType || self.$IsWindow(obj)) {
            return false;
        }

        var hasOwn = Object.prototype.hasOwnProperty;

        try {
            // Not own constructor property must be Object
            if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for (key in obj) { }

        return key === undefined || hasOwn.call(obj, key);
    }

    function Delay(code, delay) {
        setTimeout(code, delay || 0);
    }

    function RemoveByReg(str, reg) {
        var m = reg.exec(str);

        if (m) {
            var header = str.substr(0, m.index);
            var tailer = str.substr(m.lastIndex + 1, str.length - (m.lastIndex + 1));
            str = header + tailer;
        }

        return str;
    }

    function BuildNewCss(oldCss, removeRegs, replaceValue) {
        var css = (!oldCss || oldCss == "inherit") ? "" : oldCss;

        each(removeRegs, function (removeReg) {
            var m = removeReg.exec(css);

            if (m) {
                var header = css.substr(0, m.index);
                var tailer = css.substr(m.lastIndex + 1, css.length - (m.lastIndex + 1));
                css = header + tailer;
            }
        });

        css = replaceValue + (css.indexOf(" ") != 0 ? " " : "") + css;

        return css;
    }

    function SetStyleFilterIE(elmt, value) {
        if (browserRuntimeVersion < 9) {
            elmt.style.filter = value;
        }
    }

    function SetStyleMatrixIE(elmt, matrix, offset) {
        //matrix is not for ie9+ running in ie8- mode
        if (browserJavascriptVersion < 9) {
            var oldFilterValue = elmt.style.filter;
            var matrixReg = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g);
            var matrixValue = matrix ? "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + matrix[0][0] + ", M12=" + matrix[0][1] + ", M21=" + matrix[1][0] + ", M22=" + matrix[1][1] + ", SizingMethod='auto expand')" : "";

            var newFilterValue = BuildNewCss(oldFilterValue, [matrixReg], matrixValue);

            SetStyleFilterIE(elmt, newFilterValue);

            self.$CssMarginTop(elmt, offset.y);
            self.$CssMarginLeft(elmt, offset.x);
        }
    }

    // Methods

    self.$IsBrowserIE = IsBrowserIE;

    self.$IsBrowserIeQuirks = IsBrowserIeQuirks;

    self.$IsBrowserFireFox = IsBrowserFireFox;

    self.$IsBrowserSafari = IsBrowserSafari;

    self.$IsBrowserChrome = IsBrowserChrome;

    self.$IsBrowserOpera = IsBrowserOpera;

    self.$IsBrowserBadTransform = IsBrowserBadTransform;

    self.$IsBrowserSafeHWA = IsBrowserSafeHWA;

    self.$IsBrowserIe9Earlier = IsBrowserIe9Earlier;

    self.$GetBrowserVersion = function () {
        return browserRuntimeVersion;
    };

    self.$GetBrowserEngineVersion = function () {
        return browserEngineVersion || browserRuntimeVersion;
    };

    self.$GetWebKitVersion = function () {
        return webkitVersion;
    };

    self.$Delay = Delay;

    self.$GetElement = function (elmt) {
        if (self.$IsString(elmt)) {
            elmt = document.getElementById(elmt);
        }

        return elmt;
    };

    self.$GetElementPosition = function (elmt) {
        elmt = self.$GetElement(elmt);
        var result = new $JssorPoint$();

        // technique from:
        // http://www.quirksmode.org/js/findpos.html
        // with special check for "fixed" elements.

        while (elmt) {
            result.x += elmt.offsetLeft;
            result.y += elmt.offsetTop;

            var isFixed = self.$GetElementStyle(elmt).position == "fixed";

            if (isFixed) {
                result = result.$Plus(self.$GetPageScroll(window));
            }

            elmt = getOffsetParent(elmt, isFixed);
        }

        return result;
    };

    self.$GetElementSize = function (elmt) {
        elmt = self.$GetElement(elmt);
        return new $JssorPoint$(elmt.clientWidth, elmt.clientHeight);
    };

    self.$GetEvent = function (event) {
        return event ? event : window.event;
    };

    self.$GetEventSrcElement = function (event) {
        event = self.$GetEvent(event);
        return event.target || event.srcElement || document;
    };

    self.$GetEventDstElement = function (event) {
        event = self.$GetEvent(event);
        return event.relatedTarget || event.toElement;
    };

    self.$GetMousePosition = function (event) {
        event = self.$GetEvent(event);
        var result = new $JssorPoint$();

        // technique from:
        // http://www.quirksmode.org/js/events_properties.html

        if (event.type == "DOMMouseScroll" &&
                IsBrowserFireFox() && browserRuntimeVersion < 3) {
            // hack for FF2 which reports incorrect position for mouse scroll
            result.x = event.screenX;
            result.y = event.screenY;
        } else if (typeof (event.pageX) == "number") {
            result.x = event.pageX;
            result.y = event.pageY;
        } else if (typeof (event.clientX) == "number") {
            result.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            result.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        } else {
            $JssorDebug$.$Fail("Unknown event mouse position, no known technique.");
        }

        return result;
    };

    self.$GetMouseScroll = function (event) {
        event = self.$GetEvent(event);
        var delta = 0; // default value

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/10/31/javascript-tutorial-the-scroll-wheel/

        if (typeof (event.wheelDelta) == "number") {
            delta = event.wheelDelta;
        } else if (typeof (event.detail) == "number") {
            delta = event.detail * -1;
        } else {
            $JssorDebug$.$Fail("Unknown event mouse scroll, no known technique.");
        }

        // normalize value to [-1, 1]
        return delta ? delta / Math.abs(delta) : 0;
    };

    self.$GetPageScroll = function (window) {
        var result = new $JssorPoint$();
        var docElmt = window.document.documentElement || {};
        var body = window.document.body || {};

        // technique from:
        // http://www.howtocreate.co.uk/tutorials/javascript/browserwindow

        if (typeof (window.pageXOffset) == "number") {
            // most browsers
            result.x = window.pageXOffset;
            result.y = window.pageYOffset;
        } else if (body.scrollLeft || body.scrollTop) {
            // W3C spec, IE6+ in quirks mode
            result.x = body.scrollLeft;
            result.y = body.scrollTop;
        } else if (docElmt.scrollLeft || docElmt.scrollTop) {
            // IE6+ in standards mode
            result.x = docElmt.scrollLeft;
            result.y = docElmt.scrollTop;
        }

        // note: we specifically aren't testing for typeof here, because IE sets
        // the appropriate variables undefined instead of 0 under certain
        // conditions. self means we also shouldn't fail if none of the three
        // cases are hit; we'll just assume the page scroll is 0.

        return result;
    };

    self.$GetWindowSize = function (window) {
        var result = new $JssorPoint$();

        // technique from:
        // http://www.howtocreate.co.uk/tutorials/javascript/browserwindow

        //jQuery way to get window size, but support ie quirks mode
        var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);

        result.x = checkElement.clientWidth;
        result.y = checkElement.clientHeight;

        return result;
    };

    //self.$MakeAjaxRequest = function (url, callback) {
    //    var async = typeof (callback) == "function";
    //    var req = null;

    //    if (async) {
    //        var actual = callback;
    //        var callback = function () {
    //            Delay($JssorUtils$.$CreateCallback(null, actual, req), 1);
    //        };
    //    }

    //    if (window.ActiveXObject) {
    //        for (var i = 0; i < arrActiveX.length; i++) {
    //            try {
    //                req = new ActiveXObject(arrActiveX[i]);
    //                break;
    //            } catch (e) {
    //                continue;
    //            }
    //        }
    //    } else if (window.XMLHttpRequest) {
    //        req = new XMLHttpRequest();
    //    }

    //    if (!req) {
    //        $JssorDebug$.$Fail("Browser doesn't support XMLHttpRequest.");
    //    }

    //    if (async) {
    //        req.onreadystatechange = function () {
    //            if (req.readyState == 4) {
    //                // prevent memory leaks by breaking circular reference now
    //                req.onreadystatechange = new Function();
    //                callback();
    //            }
    //        };
    //    }

    //    try {
    //        req.open("GET", url, async);
    //        req.send(null);
    //    } catch (e) {
    //        $JssorDebug$.$Log(e.name + " while making AJAX request: " + e.message);

    //        req.onreadystatechange = null;
    //        req = null;

    //        if (async) {
    //            callback();
    //        }
    //    }

    //    return async ? null : req;
    //};

    //self.$ParseXml = function (string) {
    //    var xmlDoc = null;

    //    if (window.ActiveXObject) {
    //        try {
    //            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //            xmlDoc.async = false;
    //            xmlDoc.loadXML(string);
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (ActiveX): " + e.message);
    //        }
    //    } else if (window.DOMParser) {
    //        try {
    //            var parser = new DOMParser();
    //            xmlDoc = parser.parseFromString(string, "text/xml");
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (DOMParser): " + e.message);
    //        }
    //    } else {
    //        $JssorDebug$.$Fail("Browser doesn't support XML DOM.");
    //    }

    //    return xmlDoc;
    //};

    function Css(elmt, name, value) {
        ///	<summary>
        ///		access css
        ///     $JssorUtils$.$Css(elmt, name);         //get css value
        ///     $JssorUtils$.$Css(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            elmt.style[name] = value;
        }
        else {
            var style = elmt.currentStyle || elmt.style;
            value = style[name];

            if(value == "" && window.getComputedStyle) {
                style = elmt.ownerDocument.defaultView.getComputedStyle(elmt, null);

                style && (value = style.getPropertyValue(name) || style[name]);
            }

            return value;
        }
    }

    function CssN(elmt, name, value, isDimensional) {
        ///	<summary>
        ///		access css as numeric
        ///     $JssorUtils$.$CssN(elmt, name);         //get css value
        ///     $JssorUtils$.$CssN(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            isDimensional && (value += "px");
            Css(elmt, name, value);
        }
        else {
            return parseFloat(Css(elmt, name));
        }
    }

    function CssP(elmt, name, value) {
        ///	<summary>
        ///		access css in pixel as numeric, like 'top', 'left', 'width', 'height'
        ///     $JssorUtils$.$CssP(elmt, name);         //get css value
        ///     $JssorUtils$.$CssP(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        return CssN(elmt, name, value, true);
    }

    function CssProxy(name, numericOrDimension) {
        ///	<summary>
        ///		create proxy to access css, CssProxy(name[, numericOrDimension]);
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="numericOrDimension" type="Number" optional="true">
        ///		not set: access original css, 1: access css as numeric, 2: access css in pixel as numeric
        ///	</param>
        var isDimensional = numericOrDimension & 2;
        var cssAccessor = numericOrDimension ? CssN : Css;
        return function (elmt, value) {
            return cssAccessor(elmt, name, value, isDimensional);
        };
    }

    function GetStyleOpacity(elmt) {
        if (IsBrowserIE() && browserEngineVersion < 9) {
            var match = /opacity=([^)]*)/.exec(elmt.style.filter || "");
            return match ? (parseFloat(match[1]) / 100) : 1;
        }
        else
            return parseFloat(elmt.style.opacity || "1");
    }

    function SetStyleOpacity(elmt, opacity, ie9EarlierForce) {

        if (IsBrowserIE() && browserEngineVersion < 9) {
            //var filterName = "filter"; // browserEngineVersion < 8 ? "filter" : "-ms-filter";
            var finalFilter = elmt.style.filter || "";

            // for CSS filter browsers (IE), remove alpha filter if it's unnecessary.
            // update: doing self always since IE9 beta seems to have broken the
            // behavior if we rely on the programmatic filters collection.
            var alphaReg = new RegExp(/[\s]*alpha\([^\)]*\)/g);

            // important: note the lazy star! self protects against
            // multiple filters; we don't want to delete the other ones.
            // update: also trimming extra whitespace around filter.

            var ieOpacity = Math.round(100 * opacity);
            var alphaFilter = "";
            if (ieOpacity < 100 || ie9EarlierForce) {
                alphaFilter = "alpha(opacity=" + ieOpacity + ") ";
                //elmt.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + ieOpacity + ") ";
            }

            var newFilterValue = BuildNewCss(finalFilter, [alphaReg], alphaFilter);

            SetStyleFilterIE(elmt, newFilterValue);
        }

            //if (!IsBrowserIE() || browserEngineVersion >= 9) 
        else {
            elmt.style.opacity = opacity == 1 ? "" : Math.round(opacity * 100) / 100;
        }
    }

    function SetStyleTransformInternal(elmt, transform) {
        var rotate = transform.$Rotate || 0;
        var scale = transform.$Scale == undefined ? 1 : transform.$Scale;

        if (IsBrowserIe9Earlier()) {
            var matrix = self.$CreateMatrix(rotate / 180 * Math.PI, scale, scale);
            SetStyleMatrixIE(elmt, (!rotate && scale == 1) ? null : matrix, self.$GetMatrixOffset(matrix, transform.$OriginalWidth, transform.$OriginalHeight));
        }
        else {
            //rotate(15deg) scale(.5) translateZ(0)
            var transformProperty = GetTransformProperty(elmt);
            if (transformProperty) {
                var transformValue = "rotate(" + rotate % 360 + "deg) scale(" + scale + ")";
                if ($JssorUtils$.$IsBrowserChrome() && webkitVersion > 535)
                    transformValue += " perspective(2000px)";

                elmt.style[transformProperty] = transformValue;
            }
        }
    }

    self.$SetStyleTransform = function (elmt, transform) {
        if (IsBrowserBadTransform()) {
            Delay(self.$CreateCallback(null, SetStyleTransformInternal, elmt, transform));
        }
        else {
            SetStyleTransformInternal(elmt, transform);
        }
    };

    self.$SetStyleTransformOrigin = function (elmt, transformOrigin) {
        var transformProperty = GetTransformProperty(elmt);

        if (transformProperty)
            elmt.style[transformProperty + "Origin"] = transformOrigin;
    };

    self.$SetStyleScale = function (elmt, scale) {

        if (IsBrowserIE() && browserEngineVersion < 9 || (browserEngineVersion < 10 && IsBrowserIeQuirks())) {
            elmt.style.zoom = (scale == 1) ? "" : scale;
        }
        else {
            var transformProperty = GetTransformProperty(elmt);

            if (transformProperty) {
                //rotate(15deg) scale(.5)
                var transformValue = "scale(" + scale + ")";

                var oldTransformValue = elmt.style[transformProperty];
                var scaleReg = new RegExp(/[\s]*scale\(.*?\)/g);

                var newTransformValue = BuildNewCss(oldTransformValue, [scaleReg], transformValue);

                elmt.style[transformProperty] = newTransformValue;
            }
        }
    };

    self.$EnableHWA = function (elmt) {
        if (!elmt.style[GetTransformProperty(elmt)] || elmt.style[GetTransformProperty(elmt)] == "none")
            elmt.style[GetTransformProperty(elmt)] = "perspective(2000px)";
    };

    self.$DisableHWA = function (elmt) {
        //if (force || elmt.style[GetTransformProperty(elmt)] == "perspective(2000px)")
        elmt.style[GetTransformProperty(elmt)] = "none";
    };

    var ie8OffsetWidth = 0;
    var ie8OffsetHeight = 0;
    var ie8WindowResizeCallbackHandlers;
    //var ie8LastVerticalScrollbar;
    //var toggleInfo = "";

    function Ie8WindowResizeFilter(window) {

        var trigger = true;

        var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);
        if (checkElement) {
            //check vertical bar
            //var hasVerticalBar = checkElement.scrollHeight > checkElement.clientHeight;
            //var verticalBarToggle = hasVerticalBar != ie8LastVerticalScrollbar;
            //ie8LastVerticalScrollbar = hasVerticalBar;

            var widthChange = checkElement.offsetWidth - ie8OffsetWidth;
            var heightChange = checkElement.offsetHeight - ie8OffsetHeight;
            if (widthChange || heightChange) {

                ie8OffsetWidth += widthChange;
                ie8OffsetHeight += heightChange;
            }
            else
                trigger = false;
        }

        trigger && each(ie8WindowResizeCallbackHandlers, function (handler) {
            handler();
        });
    }

    self.$OnWindowResize = function (window, handler) {

        if (IsBrowserIE() && browserEngineVersion < 9) {
            if (!ie8WindowResizeCallbackHandlers) {
                ie8WindowResizeCallbackHandlers = [handler];
                handler = self.$CreateCallback(null, Ie8WindowResizeFilter, window);
            }
            else {
                ie8WindowResizeCallbackHandlers.push(handler);
                return;
            }
        }

        self.$AddEvent(window, "resize", handler);
    };

    self.$MouseOverOutFilter = function (handler, target) {
        return function (event) {
            event = self.$GetEvent(event);

            var eventName = event.type;
            var related = event.relatedTarget || (eventName == "mouseout" ? event.toElement : event.fromElement);

            if (!related || (related !== target && !self.$IsChild(target, related))) {
                handler(event);
            }
        };
    };

    self.$AddEvent = function (elmt, eventName, handler, useCapture) {
        elmt = self.$GetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.addEventListener) {
            if (eventName == "mousewheel") {
                elmt.addEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to add the mousewheel -- not a mistake!
            // self is for opera, since it uses onmousewheel but needs addEventListener.
            elmt.addEventListener(eventName, handler, useCapture);
        }
        else if (elmt.attachEvent) {
            elmt.attachEvent("on" + eventName, handler);
            if (useCapture && elmt.setCapture) {
                elmt.setCapture();
            }
        }

        $JssorDebug$.$Execute(function () {
            if (!elmt.addEventListener && !elmt.attachEvent) {
                $JssorDebug$.$Fail("Unable to attach event handler, no known technique.");
            }
        });

    };

    self.$RemoveEvent = function (elmt, eventName, handler, useCapture) {
        elmt = self.$GetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.removeEventListener) {
            if (eventName == "mousewheel") {
                elmt.removeEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to remove the mousewheel -- not a mistake!
            // self is for opera, since it uses onmousewheel but needs removeEventListener.
            elmt.removeEventListener(eventName, handler, useCapture);
        }
        else if (elmt.detachEvent) {
            elmt.detachEvent("on" + eventName, handler);
            if (useCapture && elmt.releaseCapture) {
                elmt.releaseCapture();
            }
        }

        $JssorDebug$.$Execute(function () {
            if (!elmt.removeEventListener && !elmt.detachEvent) {
                $JssorDebug$.$Fail("Unable to detach event handler, no known technique.");
            }
        });
    };

    self.$FireEvent = function (elmt, eventName) {
        //var document = elmt.document;

        $JssorDebug$.$Execute(function () {
            if (!document.createEvent && !document.createEventObject) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }

            if (!elmt.dispatchEvent && !elmt.fireEvent) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }
        });

        var evento;

        if (document.createEvent) {
            evento = document.createEvent("HTMLEvents");
            evento.initEvent(eventName, false, false);
            elmt.dispatchEvent(evento);
        }
        else {
            var ieEventName = "on" + eventName;
            evento = document.createEventObject();
            //event.eventType = ieEventName;
            //event.eventName = ieEventName;

            elmt.fireEvent(ieEventName, evento);
        }
    };

    self.$AddEventBrowserMouseUp = function (handler, userCapture) {
        self.$AddEvent((IsBrowserIe9Earlier()) ? document : window, "mouseup", handler, userCapture);
    };

    self.$RemoveEventBrowserMouseUp = function (handler, userCapture) {
        self.$RemoveEvent((IsBrowserIe9Earlier()) ? document : window, "mouseup", handler, userCapture);
    };

    self.$AddEventBrowserMouseDown = function (handler, userCapture) {
        self.$AddEvent((IsBrowserIe9Earlier()) ? document : window, "mousedown", handler, userCapture);
    };

    self.$RemoveEventBrowserMouseDown = function (handler, userCapture) {
        self.$RemoveEvent((IsBrowserIe9Earlier()) ? document : window, "mousedown", handler, userCapture);
    };

    self.$CancelEvent = function (event) {
        event = self.$GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.preventDefault) {
            event.preventDefault();     // W3C for preventing default
        }

        event.cancel = true;            // legacy for preventing default
        event.returnValue = false;      // IE for preventing default
    };

    self.$StopEvent = function (event) {
        event = self.$GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.stopPropagation) {
            event.stopPropagation();    // W3C for stopping propagation
        }

        event.cancelBubble = true;      // IE for stopping propagation
    };

    self.$CreateCallback = function (object, method) {
        // create callback args
        var initialArgs = [];
        for (var i = 2; i < arguments.length; i++) {
            initialArgs.push(arguments[i]);
        }

        // create closure to apply method
        var callback = function () {
            // concatenate new args, but make a copy of initialArgs first
            var args = initialArgs.concat([]);
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            return method.apply(object, args);
        };

        //$JssorDebug$.$LiveStamp(callback, "callback_" +($JssorUtils$.$GetNow() & 0xFFFF));

        return callback;
    };

    var _Freeer;
    self.$FreeElement = function (elmt) {
        if (!_Freeer)
            _Freeer = self.$CreateDivElement();

        if (elmt) {
            $JssorUtils$.$AppendChild(_Freeer, elmt);
            $JssorUtils$.$ClearInnerHtml(_Freeer);
        }
    };

    self.$SetInnerText = function (elmt, text) {
        var textNode = document.createTextNode(text);
        self.$ClearInnerHtml(elmt);
        elmt.appendChild(textNode);
    };

    self.$GetInnerText = function (elmt) {
        return elmt.textContent || elmt.innerText;
    };

    self.$GetInnerHtml = function (elmt) {
        return elmt.innerHTML;
    };

    self.$SetInnerHtml = function (elmt, html) {
        elmt.innerHTML = html;
    };

    self.$ClearInnerHtml = function (elmt) {
        elmt.innerHTML = "";
    };

    self.$EncodeHtml = function (text) {
        var div = self.$CreateDivElement();
        self.$SetInnerText(div, text);
        return self.$GetInnerHtml(div);
    };

    self.$DecodeHtml = function (html) {
        var div = self.$CreateDivElement();
        self.$SetInnerHtml(div, html);
        return self.$GetInnerText(div);
    };

    self.$SelectElement = function (elmt) {
        var userSelection;
        if (window.getSelection) {
            //W3C default
            userSelection = window.getSelection();
        }
        var theRange = null;
        if (document.createRange) {
            theRange = document.createRange();
            theRange.selectNode(elmt);
        }
        else {
            theRange = document.body.createTextRange();
            theRange.moveToElementText(elmt);
            theRange.select();
        }
        //set user selection
        if (userSelection)
            userSelection.addRange(theRange);
    };

    self.$DeselectElements = function () {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    };

    self.$GetChildren = function (elmt) {
        var children = [];

        for (var tmpEl = elmt.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
            if (tmpEl.nodeType == 1) {
                children.push(tmpEl);
            }
        }

        return children;
    };

    function FindFirstChildByAttribute(elmt, attrValue, attrName, deep) {
        if (!attrName)
            attrName = "u";

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (self.$GetAttributeEx(elmt, attrName) == attrValue)
                    return elmt;

                if (deep) {
                    var childRet = FindFirstChildByAttribute(elmt, attrValue, attrName, deep);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    self.$FindFirstChildByAttribute = FindFirstChildByAttribute;

    function FindChildrenByAttribute(elmt, attrValue, attrName, deep) {
        if (!attrName)
            attrName = "u";

        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (self.$GetAttributeEx(elmt, attrName) == attrValue)
                    ret.push(elmt);

                if (deep) {
                    var childRet = FindChildrenByAttribute(elmt, attrValue, attrName, deep);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    self.$FindChildrenByAttribute = FindChildrenByAttribute;

    function FindFirstChildByTag(elmt, tagName, deep) {

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (elmt.tagName == tagName)
                    return elmt;

                if (deep) {
                    var childRet = FindFirstChildByTag(elmt, tagName, deep);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    self.$FindFirstChildByTag = FindFirstChildByTag;

    function FindChildrenByTag(elmt, tagName, deep) {
        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (!tagName || elmt.tagName == tagName)
                    ret.push(elmt);

                if (deep) {
                    var childRet = FindChildrenByTag(elmt, tagName, true);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    self.$FindChildrenByTag = FindChildrenByTag;

    self.$GetElementsByTagName = function (elmt, tagName) {
        return elmt.getElementsByTagName(tagName);
    };

    self.$Extend = function (target) {
        for (var i = 1; i < arguments.length; i++) {

            var options = arguments[i];

            // Only deal with non-null/undefined values
            if (options) {
                // Extend the base object
                for (var name in options) {
                    target[name] = options[name];
                }
            }
        }

        // Return the modified object
        return target;
    };

    self.$Unextend = function (target, options) {
        $JssorDebug$.$Assert(options);

        var unextended = {};

        // Extend the base object
        for (var name in target) {
            if (target[name] != options[name]) {
                unextended[name] = target[name];
            }
        }

        // Return the modified object
        return unextended;
    };

    self.$IsUndefined = function (obj) {
        return type(obj) == "undefined";
    };

    self.$IsFunction = function (obj) {
        return type(obj) == "function";
    };

    self.$IsArray = Array.isArray || function (obj) {
        return type(obj) == "array";
    };

    self.$IsString = function (obj) {
        return type(obj) == "string";
    };

    self.$IsNumeric = function (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    };

    self.$IsWindow = function (obj) {
        return obj != null && obj == obj.window;
    };

    self.$Type = type;

    // args is for internal usage only
    self.$Each = each;

    self.$IsPlainObject = isPlainObject;

    self.$CreateDivElement = function (doc) {
        return self.$CreateElement("DIV", doc);
    };

    self.$CreateSpanElement = function (doc) {
        return self.$CreateElement("SPAN", doc);
    };

    self.$CreateElement = function (tagName, doc) {
        doc = doc || document;
        return doc.createElement(tagName);
    };

    self.$EmptyFunction = function () { };

    self.$GetAttribute = function (elmt, name) {
        return elmt.getAttribute(name);
    };

    self.$GetAttributeEx = function (elmt, name) {
        return self.$GetAttribute(elmt, name) || self.$GetAttribute(elmt, "data-" + name);
    };

    self.$SetAttribute = function (elmt, name, value) {
        elmt.setAttribute(name, value);
    };

    self.$GetClassName = function (elmt) {
        return elmt.className;
    };

    self.$SetClassName = function (elmt, className) {
        elmt.className = className || "";
    };

    self.$GetParentNode = function (elmt) {
        return elmt.parentNode;
    };

    self.$HideElement = function (elmt) {
        self.$CssDisplay(elmt, "none");
    };

    self.$HideElements = function (elmts) {
        for (var i = 0; i < elmts.length; i++) {
            self.$HideElement(elmts[i]);
        }
    };

    self.$ShowElement = function (elmt, show) {
        self.$CssDisplay(elmt, show == false ? "none" : "");
    };

    self.$ShowElements = function (elmts) {
        for (var i = 0; i < elmts.length; i++) {
            self.$ShowElement(elmts[i]);
        }
    };

    self.$RemoveAttribute = function (elmt, attrbuteName) {
        elmt.removeAttribute(attrbuteName);
    };

    self.$CanClearClip = function () {
        //return !IsBrowserIE() || browserEngineVersion > 9 || (browserRuntimeVersion > 7 && !IsBrowserIeQuirks());
        return IsBrowserIE() && browserRuntimeVersion < 10;
    };

    self.$SetStyleClip = function (elmt, clip) {
        if (clip) {
            elmt.style.clip = "rect(" + Math.round(clip.$Top) + "px " + Math.round(clip.$Right) + "px " + Math.round(clip.$Bottom) + "px " + Math.round(clip.$Left) + "px)";
        }
        else {
            var cssText = elmt.style.cssText;
            var clipRegs = [
                new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),
                new RegExp(/[\s]*cliptop: .*?[;]?/i),
                new RegExp(/[\s]*clipright: .*?[;]?/i),
                new RegExp(/[\s]*clipbottom: .*?[;]?/i),
                new RegExp(/[\s]*clipleft: .*?[;]?/i)
            ];

            var newCssText = BuildNewCss(cssText, clipRegs, "");

            $JssorUtils$.$CssCssText(elmt, newCssText);
        }
    };

    self.$GetNow = function () {
        return new Date().getTime();
    };

    self.$AppendChild = function (elmt, child) {
        elmt.appendChild(child);
    };

    self.$AppendChildren = function (elmt, children) {
        each(children, function (child) {
            self.$AppendChild(elmt, child);
        });
    };

    self.$InsertBefore = function (elmt, child, refObject) {
        elmt.insertBefore(child, refObject);
    };

    self.$InsertAdjacentHtml = function (elmt, where, text) {
        elmt.insertAdjacentHTML(where, text);
    };

    self.$RemoveChild = function (elmt, child) {
        elmt.removeChild(child);
    };

    self.$RemoveChildren = function (elmt, children) {
        each(children, function (child) {
            self.$RemoveChild(elmt, child);
        });
    };

    self.$ClearChildren = function (elmt) {
        self.$RemoveChildren(elmt, self.$GetChildren(elmt));
    };

    self.$ParseInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    self.$ParseFloat = function (str) {
        return parseFloat(str);
    };

    self.$IsChild = function (elmtA, elmtB) {
        var body = document.body;
        while (elmtB && elmtA != elmtB && body != elmtB) {
            try {
                elmtB = elmtB.parentNode;
            } catch (e) {
                // Firefox sometimes fires events for XUL elements, which throws
                // a "permission denied" error. so this is not a child.
                return false;
            }
        }
        return elmtA == elmtB;
    };

    self.$ToLowerCase = function (value) {
        if (value)
            value = value.toLowerCase();

        return value;
    };

    self.$CloneNode = function (elmt, deep) {
        return elmt.cloneNode(deep);
    };

    function TranslateTransition(transition) {
        if (transition) {
            var flyDirection = transition.$FlyDirection;

            if (flyDirection & 1) {
                transition.x = transition.$ScaleHorizontal || 1;
            }
            if (flyDirection & 2) {
                transition.x = -transition.$ScaleHorizontal || -1;
            }
            if (flyDirection & 4) {
                transition.y = transition.$ScaleVertical || 1;
            }
            if (flyDirection & 8) {
                transition.y = -transition.$ScaleVertical || -1;
            }

            TranslateTransition(transition.$Brother);
        }
    }

    self.$TranslateTransitions = function (transitions) {
        ///	<summary>
        ///		For backward compatibility only.
        ///	</summary>
        if (transitions) {
            for (var i = 0; i < transitions.length; i++) {
                TranslateTransition(transitions[i]);
            }
            for (var name in transitions) {
                TranslateTransition(transitions[name]);
            }
        }
    };

    function LoadImageCallback(callback, image, abort) {
        image.onload = null;
        image.abort = null;

        if (callback)
            callback(image, abort);
    }

    self.$LoadImage = function (src, callback) {
        if (self.$IsBrowserOpera() && browserRuntimeVersion < 11.6 || !src) {
            LoadImageCallback(callback, null);
        }
        else {
            var image = new Image();
            image.onload = self.$CreateCallback(null, LoadImageCallback, callback, image);
            image.onabort = self.$CreateCallback(null, LoadImageCallback, callback, image, true);
            image.src = src;
        }
    };

    self.$LoadImages = function (imageElmts, mainImageElmt, callback) {

        var _ImageLoading = imageElmts.length + 1;

        function LoadImageCompleteEventHandler(image, abort) {
            _ImageLoading--;
            if (mainImageElmt && image && image.src == mainImageElmt.src)
                mainImageElmt = image;
            !_ImageLoading && callback && callback(mainImageElmt);
        }

        $JssorUtils$.$Each(imageElmts, function (imageElmt) {
            $JssorUtils$.$LoadImage(imageElmt.src, LoadImageCompleteEventHandler);
        });

        LoadImageCompleteEventHandler();
    };

    self.$BuildElement = function (template, tagName, replacer, createCopy) {
        if (createCopy)
            template = $JssorUtils$.$CloneNode(template, true);

        var templateHolders = $JssorUtils$.$GetElementsByTagName(template, tagName);
        for (var j = templateHolders.length - 1; j > -1; j--) {
            var templateHolder = templateHolders[j];
            var replaceItem = $JssorUtils$.$CloneNode(replacer, true);
            $JssorUtils$.$SetClassName(replaceItem, $JssorUtils$.$GetClassName(templateHolder));
            $JssorUtils$.$CssCssText(replaceItem, templateHolder.style.cssText);

            var thumbnailPlaceHolderParent = $JssorUtils$.$GetParentNode(templateHolder);
            $JssorUtils$.$InsertBefore(thumbnailPlaceHolderParent, replaceItem, templateHolder);
            $JssorUtils$.$RemoveChild(thumbnailPlaceHolderParent, templateHolder);
        }

        return template;
    };

    var _MouseDownButtons;
    function JssorButtonEx(elmt) {
        var _Self = this;

        var _OriginClassName;

        var _IsMouseDown;   //class name 'dn'
        var _IsActive;      //class name 'av'
        var _IsDisabled;    //class name 'ds'

        function Highlight() {
            var className = _OriginClassName;

            if (_IsDisabled) {
                className += 'ds';
            }
            else if (_IsMouseDown) {
                className += 'dn';
            }
            else if (_IsActive) {
                className += "av";
            }

            $JssorUtils$.$SetClassName(elmt, className);
        }

        function OnMouseDown(event) {
            if (_IsDisabled) {
                self.$CancelEvent(event);
            }
            else {
                _MouseDownButtons.push(_Self);

                _IsMouseDown = true;

                Highlight();
            }
        }

        _Self.$MouseUp = function () {
            ///	<summary>
            ///		Internal member function, do not use it.
            ///	</summary>
            ///	<private />

            _IsMouseDown = false;

            Highlight();
        };

        _Self.$Activate = function (activate) {
            if (activate != undefined) {
                _IsActive = activate;

                Highlight();
            }
            else {
                return _IsActive;
            }
        };

        _Self.$Enable = function (enable) {
            if (enable != undefined) {
                _IsDisabled = !enable;

                Highlight();
            }
            else {
                return !_IsDisabled;
            }
        };

        //JssorButtonEx Constructor
        {
            elmt = self.$GetElement(elmt);

            if (!_MouseDownButtons) {
                self.$AddEventBrowserMouseUp(function () {
                    var oldMouseDownButtons = _MouseDownButtons;
                    _MouseDownButtons = [];

                    each(oldMouseDownButtons, function (button) {
                        button.$MouseUp();
                    });
                });

                _MouseDownButtons = [];
            }

            _OriginClassName = self.$GetClassName(elmt);

            $JssorUtils$.$AddEvent(elmt, "mousedown", OnMouseDown);
        }
    }

    self.$Buttonize = function (elmt) {
        return new JssorButtonEx(elmt);
    };

    self.$Css = Css;
    self.$CssN = CssN;
    self.$CssP = CssP;

    self.$CssOverflow = CssProxy("overflow");

    self.$CssTop = CssProxy("top", 2);
    self.$CssLeft = CssProxy("left", 2);
    self.$CssWidth = CssProxy("width", 2);
    self.$CssHeight = CssProxy("height", 2);
    self.$CssMarginLeft = CssProxy("marginLeft", 2);
    self.$CssMarginTop = CssProxy("marginTop", 2);
    self.$CssPosition = CssProxy("position");
    self.$CssDisplay = CssProxy("display");
    self.$CssZIndex = CssProxy("zIndex", 1);
    self.$CssFloat = function (elmt, float) {
        return Css(elmt, IsBrowserIE() ? "styleFloat" : "cssFloat", float);
    };
    self.$CssOpacity = function (elmt, opacity, ie9EarlierForce) {
        if (opacity != undefined) {
            SetStyleOpacity(elmt, opacity, ie9EarlierForce);
        }
        else {
            return GetStyleOpacity(elmt);
        }
    };
    self.$CssCssText = function (elmt, text) {
        if (text != undefined) {
            elmt.style.cssText = text;
        }
        else {
            return elmt.style.cssText;
        }
    };

    var _StyleGetter = {
        $Opacity: self.$CssOpacity,
        $Top: self.$CssTop,
        $Left: self.$CssLeft,
        $Width: self.$CssWidth,
        $Height: self.$CssHeight,
        $Position: self.$CssPosition,
        $Display: self.$CssDisplay,
        $ZIndex: self.$CssZIndex
    };

    //var _StyleGetter = {
    //    $Opacity: self.$GetStyleOpacity,
    //    $Top: self.$GetStyleTop,
    //    $Left: self.$GetStyleLeft,
    //    $Width: self.$GetStyleWidth,
    //    $Height: self.$GetStyleHeight,
    //    $Position: self.$GetStylePosition,
    //    $Display: self.$GetStyleDisplay,
    //    $ZIndex: self.$GetStyleZIndex
    //};

    var _StyleSetterReserved;

    //var _StyleSetterReserved = {
    //    $Opacity: self.$SetStyleOpacity,
    //    $Top: self.$SetStyleTop,
    //    $Left: self.$SetStyleLeft,
    //    $Width: self.$SetStyleWidth,
    //    $Height: self.$SetStyleHeight,
    //    $Display: self.$SetStyleDisplay,
    //    $Clip: self.$SetStyleClip,
    //    $MarginLeft: self.$SetStyleMarginLeft,
    //    $MarginTop: self.$SetStyleMarginTop,
    //    $Transform: self.$SetStyleTransform,
    //    $Position: self.$SetStylePosition,
    //    $ZIndex: self.$SetStyleZIndex
    //};

    function GetStyleSetter() {
        if (!_StyleSetterReserved) {
            _StyleSetterReserved = self.$Extend({
                $MarginTop: self.$CssMarginTop,
                $MarginLeft: self.$CssMarginLeft,
                $Clip: self.$SetStyleClip,
                $Transform: self.$SetStyleTransform
            }, _StyleGetter);
        }
        return _StyleSetterReserved;
    }

    function GetStyleSetterEx() {
        GetStyleSetter();

        //For Compression Only
        _StyleSetterReserved.$Transform = _StyleSetterReserved.$Transform;

        return _StyleSetterReserved;
    }

    self.$GetStyleSetter = GetStyleSetter;

    self.$GetStyleSetterEx = GetStyleSetterEx;

    self.$GetStyles = function (elmt, originStyles) {
        GetStyleSetter();

        var styles = {};

        each(originStyles, function (value, key) {
            if (_StyleGetter[key]) {
                styles[key] = _StyleGetter[key](elmt);
            }
        });

        return styles;
    };

    self.$SetStyles = function (elmt, styles) {
        var styleSetter = GetStyleSetter();

        each(styles, function (value, key) {
            styleSetter[key] && styleSetter[key](elmt, value);
        });
    };

    self.$SetStylesEx = function (elmt, styles) {
        GetStyleSetterEx();

        self.$SetStyles(elmt, styles);
    };

    $JssorMatrix$ = new function () {
        var _This = this;

        function Multiply(ma, mb) {
            var acs = ma[0].length;
            var rows = ma.length;
            var cols = mb[0].length;

            var matrix = [];

            for (var r = 0; r < rows; r++) {
                var row = matrix[r] = [];
                for (var c = 0; c < cols; c++) {
                    var unitValue = 0;

                    for (var ac = 0; ac < acs; ac++) {
                        unitValue += ma[r][ac] * mb[ac][c];
                    }

                    row[c] = unitValue;
                }
            }

            return matrix;
        }

        _This.$ScaleX = function (matrix, sx) {
            return _This.$ScaleXY(matrix, sx, 0);
        };

        _This.$ScaleY = function (matrix, sy) {
            return _This.$ScaleXY(matrix, 0, sy);
        };

        _This.$ScaleXY = function (matrix, sx, sy) {
            return Multiply(matrix, [[sx, 0], [0, sy]]);
        };

        _This.$TransformPoint = function (matrix, p) {
            var pMatrix = Multiply(matrix, [[p.x], [p.y]]);

            return new $JssorPoint$(pMatrix[0][0], pMatrix[1][0]);
        };
    };

    self.$CreateMatrix = function (alpha, scaleX, scaleY) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        //var r11 = cos;
        //var r21 = sin;
        //var r12 = -sin;
        //var r22 = cos;

        //var m11 = cos * scaleX;
        //var m12 = -sin * scaleY;
        //var m21 = sin * scaleX;
        //var m22 = cos * scaleY;

        return [[cos * scaleX, -sin * scaleY], [sin * scaleX, cos * scaleY]];
    };

    self.$GetMatrixOffset = function (matrix, width, height) {
        var p1 = $JssorMatrix$.$TransformPoint(matrix, new $JssorPoint$(-width / 2, -height / 2));
        var p2 = $JssorMatrix$.$TransformPoint(matrix, new $JssorPoint$(width / 2, -height / 2));
        var p3 = $JssorMatrix$.$TransformPoint(matrix, new $JssorPoint$(width / 2, height / 2));
        var p4 = $JssorMatrix$.$TransformPoint(matrix, new $JssorPoint$(-width / 2, height / 2));

        return new $JssorPoint$(Math.min(p1.x, p2.x, p3.x, p4.x) + width / 2, Math.min(p1.y, p2.y, p3.y, p4.y) + height / 2);
    };
};

$JssorAnimator$ = function (delay, duration, options, elmt, fromStyles, toStyles) {
    delay = delay || 0;

    var _This = this;
    var _AutoPlay;
    var _Hiden;
    var _CombineMode;
    var _PlayToPosition;
    var _PlayDirection;
    var _NoStop;
    var _TimeStampLastFrame = 0;

    var _SubEasings;
    var _SubRounds;
    var _SubDurings;
    var _Callback;

    var _Position_Current = 0;
    var _Position_Display = 0;
    var _Hooked;

    var _Position_InnerBegin = delay;
    var _Position_InnerEnd = delay + duration;
    var _Position_OuterBegin;
    var _Position_OuterEnd;
    var _LoopLength;

    var _NestedAnimators = [];
    var _StyleSetter;

    function GetPositionRange(position, begin, end) {
        var range = 0;

        if (position < begin)
            range = -1;

        else if (position > end)
            range = 1;

        return range;
    }

    function GetInnerPositionRange(position) {
        return GetPositionRange(position, _Position_InnerBegin, _Position_InnerEnd);
    }

    function GetOuterPositionRange(position) {
        return GetPositionRange(position, _Position_OuterBegin, _Position_OuterEnd);
    }

    function Shift(offset) {
        _Position_OuterBegin += offset;
        _Position_OuterEnd += offset;
        _Position_InnerBegin += offset;
        _Position_InnerEnd += offset;

        _Position_Current += offset;
        _Position_Display += offset;

        $JssorUtils$.$Each(_NestedAnimators, function (animator) {
            animator, animator.$Shift(offset);
        });
    }

    function Locate(position, relative) {
        var offset = position - _Position_OuterBegin + delay * relative;

        Shift(offset);

        //$JssorDebug$.$Execute(function () {
        //    _This.$Position_InnerBegin = _Position_InnerBegin;
        //    _This.$Position_InnerEnd = _Position_InnerEnd;
        //    _This.$Position_OuterBegin = _Position_OuterBegin;
        //    _This.$Position_OuterEnd = _Position_OuterEnd;
        //});

        return _Position_OuterEnd;
    }

    function GoToPosition(positionOuter, force) {
        var trimedPositionOuter = positionOuter;

        if (_LoopLength && (trimedPositionOuter >= _Position_OuterEnd || trimedPositionOuter <= _Position_OuterBegin)) {
            trimedPositionOuter = ((trimedPositionOuter - _Position_OuterBegin) % _LoopLength + _LoopLength) % _LoopLength + _Position_OuterBegin;
        }

        if (!_Hooked || _NoStop || force || _Position_Current != trimedPositionOuter) {

            var positionToDisplay = Math.min(trimedPositionOuter, _Position_OuterEnd);
            positionToDisplay = Math.max(positionToDisplay, _Position_OuterBegin);

            if (!_Hooked || _NoStop || force || positionToDisplay != _Position_Display) {
                if (toStyles) {
                    var currentStyles = toStyles;

                    if (fromStyles) {
                        var interPosition = (positionToDisplay - _Position_InnerBegin) / (duration || 1);
                        if (options.$Optimize && $JssorUtils$.$IsBrowserChrome() && duration) {
                            interPosition = Math.round(interPosition / 16 * duration) * 16 / duration;
                        }

                        if (options.$Reverse)
                            interPosition = 1 - interPosition;

                        currentStyles = {};

                        for (var key in toStyles) {
                            var round = _SubRounds[key] || 1;
                            var during = _SubDurings[key] || [0, 1];
                            var propertyInterPosition = (interPosition - during[0]) / during[1];
                            propertyInterPosition = Math.min(Math.max(propertyInterPosition, 0), 1);
                            propertyInterPosition = propertyInterPosition * round;
                            var floorPosition = Math.floor(propertyInterPosition);
                            if (propertyInterPosition != floorPosition)
                                propertyInterPosition -= floorPosition;

                            var easing = _SubEasings[key] || _SubEasings.$Default;
                            var easingValue = easing(propertyInterPosition);
                            var currentPropertyValue;
                            var value = fromStyles[key];
                            var toValue = toStyles[key];

                            if ($JssorUtils$.$IsNumeric(toValue)) {
                                currentPropertyValue = value + (toValue - value) * easingValue;
                            }
                            else {
                                currentPropertyValue = $JssorUtils$.$Extend({ $Offset: {} }, fromStyles[key]);

                                $JssorUtils$.$Each(toValue.$Offset, function (rectX, n) {
                                    var offsetValue = rectX * easingValue;
                                    currentPropertyValue.$Offset[n] = offsetValue;
                                    currentPropertyValue[n] += offsetValue;
                                });
                            }
                            currentStyles[key] = currentPropertyValue;
                        }
                    }

                    if (fromStyles.$Zoom) {
                        currentStyles.$Transform = { $Rotate: currentStyles.$Rotate || 0, $Scale: currentStyles.$Zoom, $OriginalWidth: options.$OriginalWidth, $OriginalHeight: options.$OriginalHeight };
                    }

                    if (toStyles.$Clip && options.$Move) {
                        var styleFrameNClipOffset = currentStyles.$Clip.$Offset;

                        var offsetY = (styleFrameNClipOffset.$Top || 0) + (styleFrameNClipOffset.$Bottom || 0);
                        var offsetX = (styleFrameNClipOffset.$Left || 0) + (styleFrameNClipOffset.$Right || 0);

                        currentStyles.$Left = (currentStyles.$Left || 0) + offsetX;
                        currentStyles.$Top = (currentStyles.$Top || 0) + offsetY;
                        currentStyles.$Clip.$Left -= offsetX;
                        currentStyles.$Clip.$Right -= offsetX;
                        currentStyles.$Clip.$Top -= offsetY;
                        currentStyles.$Clip.$Bottom -= offsetY;
                    }

                    if (currentStyles.$Clip && $JssorUtils$.$CanClearClip() && !currentStyles.$Clip.$Top && !currentStyles.$Clip.$Left && (currentStyles.$Clip.$Right == options.$OriginalWidth) && (currentStyles.$Clip.$Bottom == options.$OriginalHeight))
                        currentStyles.$Clip = null;

                    $JssorUtils$.$Each(currentStyles, function (value, key) {
                        _StyleSetter[key] && _StyleSetter[key](elmt, value);
                    });
                }

                _This.$OnInnerOffsetChange(_Position_Display - _Position_InnerBegin, positionToDisplay - _Position_InnerBegin);
            }

            _Position_Display = positionToDisplay;

            $JssorUtils$.$Each(_NestedAnimators, function (animator, i) {
                var nestedAnimator = positionOuter < _Position_Current ? _NestedAnimators[_NestedAnimators.length - i - 1] : animator;
                nestedAnimator.$GoToPosition(positionOuter, force);
            });

            var positionOld = _Position_Current;
            var positionNew = positionOuter;

            _Position_Current = trimedPositionOuter;
            _Hooked = true;

            _This.$OnPositionChange(positionOld, positionNew);
        }
    }

    function Join(animator, combineMode) {
        ///	<summary>
        ///		Combine another animator as nested animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        ///	<param name="combineMode" type="int">
        ///		0: parallel - place the animator parallel to this animator.
        ///		1: chain - chain the animator at the _Position_InnerEnd of this animator.
        ///	</param>
        $JssorDebug$.$Execute(function () {
            if (combineMode !== 0 && combineMode !== 1)
                $JssorDebug$.$Fail("Argument out of range, the value of 'combineMode' should be either 0 or 1.");
        });

        if (combineMode)
            animator.$Locate(_Position_OuterEnd, 1);

        _Position_OuterEnd = Math.max(_Position_OuterEnd, animator.$GetPosition_OuterEnd());
        _NestedAnimators.push(animator);
    }

    function PlayFrame() {
        if (_AutoPlay) {
            var now = $JssorUtils$.$GetNow();
            //var timeOffset = Math.min(now - _TimeStampLastFrame, $JssorUtils$.$IsBrowserOpera() ? 80 : 20);
            var timeOffset = Math.min(now - _TimeStampLastFrame, 80);
            var timePosition = _Position_Current + timeOffset * _PlayDirection;
            _TimeStampLastFrame = now;

            if (timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection)
                timePosition = _PlayToPosition;

            GoToPosition(timePosition);

            if (!_NoStop && timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection) {
                Stop(_Callback);
            }
            else {
                $JssorUtils$.$Delay(PlayFrame, options.$Interval);
            }
        }
    }

    function PlayToPosition(toPosition, callback, noStop) {
        if (!_AutoPlay) {
            _AutoPlay = true;
            _NoStop = noStop
            _Callback = callback;
            toPosition = Math.max(toPosition, _Position_OuterBegin);
            toPosition = Math.min(toPosition, _Position_OuterEnd);
            _PlayToPosition = toPosition;
            _PlayDirection = _PlayToPosition < _Position_Current ? -1 : 1;
            _This.$OnStart();
            _TimeStampLastFrame = $JssorUtils$.$GetNow();
            PlayFrame();
        }
    }

    function Stop(callback) {
        if (_AutoPlay) {
            _NoStop = _AutoPlay = _Callback = false;
            _This.$OnStop();

            if (callback)
                callback();
        }
    }

    _This.$Play = function (positionLength, callback, noStop) {
        PlayToPosition(positionLength ? _Position_Current + positionLength : _Position_OuterEnd, callback, noStop);
    };

    _This.$PlayToPosition = function (position, callback, noStop) {
        PlayToPosition(position, callback, noStop);
    };

    _This.$PlayToBegin = function (callback, noStop) {
        PlayToPosition(_Position_OuterBegin, callback, noStop);
    };

    _This.$PlayToEnd = function (callback, noStop) {
        PlayToPosition(_Position_OuterEnd, callback, noStop);
    };

    _This.$Stop = function () {
        Stop();
    };

    _This.$Continue = function (toPosition) {
        PlayToPosition(toPosition);
    };

    _This.$GetPosition = function () {
        return _Position_Current;
    };

    _This.$GetPlayToPosition = function () {
        return _PlayToPosition;
    };

    _This.$GetPosition_Display = function () {
        return _Position_Display;
    };

    _This.$GoToPosition = GoToPosition;

    _This.$GoToBegin = function () {
        GoToPosition(_Position_OuterBegin, true);
    };

    _This.$GoToEnd = function () {
        GoToPosition(_Position_OuterEnd, true);
    };

    _This.$Move = function (offset) {
        GoToPosition(_Position_Current + offset);
    };

    _This.$CombineMode = function () {
        return _CombineMode;
    };

    _This.$GetDuration = function () {
        return duration;
    };

    _This.$IsPlaying = function () {
        return _AutoPlay;
    };

    _This.$IsOnTheWay = function () {
        return _Position_Current > _Position_InnerBegin && _Position_Current <= _Position_InnerEnd;
    };

    _This.$SetLoopLength = function (length) {
        _LoopLength = length;
    };

    _This.$Locate = Locate;

    _This.$Shift = Shift;

    _This.$Join = Join;

    _This.$Combine = function (animator) {
        ///	<summary>
        ///		Combine another animator parallel to this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 0);
    };

    _This.$Chain = function (animator) {
        ///	<summary>
        ///		Chain another animator at the _Position_InnerEnd of this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 1);
    };

    _This.$GetPosition_InnerBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerBegin;
    };

    _This.$GetPosition_InnerEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerEnd;
    };

    _This.$GetPosition_OuterBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterBegin;
    };

    _This.$GetPosition_OuterEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterEnd;
    };

    _This.$OnPositionChange = $JssorUtils$.$EmptyFunction;
    _This.$OnStart = $JssorUtils$.$EmptyFunction;
    _This.$OnStop = $JssorUtils$.$EmptyFunction;
    _This.$OnInnerOffsetChange = $JssorUtils$.$EmptyFunction;
    _This.$Version = $JssorUtils$.$GetNow();

    //Constructor`  1
    {
        options = $JssorUtils$.$Extend({
            $Interval: 16
        }, options);

        //Sodo statement, for development time intellisence only
        $JssorDebug$.$Execute(function () {
            options = $JssorUtils$.$Extend({
                $LoopLength: undefined,
                $Setter: undefined,
                $Easing: undefined
            }, options);
        });

        _LoopLength = options.$LoopLength;

        _StyleSetter = $JssorUtils$.$Extend({}, $JssorUtils$.$GetStyleSetter(), options.$Setter);

        _Position_OuterBegin = _Position_InnerBegin = delay;
        _Position_OuterEnd = _Position_InnerEnd = delay + duration;

        var _SubRounds = options.$Round || {};
        var _SubDurings = options.$During || {};
        _SubEasings = $JssorUtils$.$Extend({ $Default: $JssorUtils$.$IsFunction(options.$Easing) && options.$Easing || $JssorEasing$.$EaseSwing }, options.$Easing);
    }
};

function $JssorPlayerClass$() {

    var _SelfPlayer = this;
    var _PlayerControllers = [];

    function PlayerController(playerElement) {
        var _SelfPlayerController = this;
        var _PlayerInstance;
        var _PlayerInstantces = [];

        function OnPlayerInstanceDataAvailable(event) {
            var srcElement = $JssorUtils$.$GetEventSrcElement(event);
            _PlayerInstance = srcElement.pInstance;

            $JssorUtils$.$RemoveEvent(srcElement, "dataavailable", OnPlayerInstanceDataAvailable);
            $JssorUtils$.$Each(_PlayerInstantces, function (playerInstance) {
                if (playerInstance != _PlayerInstance) {
                    playerInstance.$Remove();
                }
            });

            playerElement.pTagName = _PlayerInstance.tagName;
            _PlayerInstantces = null;
        }

        function HandlePlayerInstance(playerInstanceElement) {
            var playerHandler;

            if (!playerInstanceElement.pInstance) {
                var playerHandlerAttribute = $JssorUtils$.$GetAttributeEx(playerInstanceElement, "pHandler");

                if ($JssorPlayer$[playerHandlerAttribute]) {
                    $JssorUtils$.$AddEvent(playerInstanceElement, "dataavailable", OnPlayerInstanceDataAvailable);
                    playerHandler = new $JssorPlayer$[playerHandlerAttribute](playerElement, playerInstanceElement);
                    _PlayerInstantces.push(playerHandler);

                    $JssorDebug$.$Execute(function () {
                        if ($JssorUtils$.$Type(playerHandler.$Remove) != "function") {
                            $JssorDebug$.$Fail("'pRemove' interface not implemented for player handler '" + playerHandlerAttribute + "'.");
                        }
                    });
                }
            }

            return playerHandler;
        }

        _SelfPlayerController.$InitPlayerController = function () {
            if (!playerElement.pInstance && !HandlePlayerInstance(playerElement)) {

                var playerInstanceElements = $JssorUtils$.$GetChildren(playerElement);

                $JssorUtils$.$Each(playerInstanceElements, function (playerInstanceElement) {
                    HandlePlayerInstance(playerInstanceElement);
                });
            }
        };
    }

    _SelfPlayer.$EVT_SWITCH = 21;

    _SelfPlayer.$FetchPlayers = function (elmt) {
        elmt = elmt || document.body;

        var playerElements = $JssorUtils$.$FindChildrenByAttribute(elmt, "player", null, true);

        $JssorUtils$.$Each(playerElements, function (playerElement) {
            if (!_PlayerControllers[playerElement.pId]) {
                playerElement.pId = _PlayerControllers.length;
                _PlayerControllers.push(new PlayerController(playerElement));
            }
            var playerController = _PlayerControllers[playerElement.pId];
            playerController.$InitPlayerController();
        });
    };
}


/// <reference path="Jssor.Core.js" />
/// <reference path="Jssor.Utils.js" />

/*
* Jssor.Slider 17.0
* http://www.jssor.com/
* 
* TERMS OF USE - Jssor.Slider
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var $JssorSlider$;
var $JssorSlideshowFormations$ = window.$JssorSlideshowFormations$ = {};
var $JssorSlideshowRunner$;

new function () {
    //Constants +++++++

    var COLUMN_INCREASE = 0;
    var COLUMN_DECREASE = 1;
    var ROW_INCREASE = 2;
    var ROW_DECREASE = 3;

    var DIRECTION_HORIZONTAL = 0x0003;
    var DIRECTION_VERTICAL = 0x000C;

    var TO_LEFT = 0x0001;
    var TO_RIGHT = 0x0002;
    var TO_TOP = 0x0004;
    var TO_BOTTOM = 0x0008;

    var FROM_LEFT = 0x0100;
    var FROM_TOP = 0x0200;
    var FROM_RIGHT = 0x0400;
    var FROM_BOTTOM = 0x0800;

    var ASSEMBLY_BOTTOM_LEFT = FROM_BOTTOM + TO_LEFT;
    var ASSEMBLY_BOTTOM_RIGHT = FROM_BOTTOM + TO_RIGHT;
    var ASSEMBLY_TOP_LEFT = FROM_TOP + TO_LEFT;
    var ASSEMBLY_TOP_RIGHT = FROM_TOP + TO_RIGHT;
    var ASSEMBLY_LEFT_TOP = FROM_LEFT + TO_TOP;
    var ASSEMBLY_LEFT_BOTTOM = FROM_LEFT + TO_BOTTOM;
    var ASSEMBLY_RIGHT_TOP = FROM_RIGHT + TO_TOP;
    var ASSEMBLY_RIGHT_BOTTOM = FROM_RIGHT + TO_BOTTOM;

    //Constants -------

    //Formation Definition +++++++
    function isToLeft(roadValue) {
        return (roadValue & TO_LEFT) == TO_LEFT;
    }

    function isToRight(roadValue) {
        return (roadValue & TO_RIGHT) == TO_RIGHT;
    }

    function isToTop(roadValue) {
        return (roadValue & TO_TOP) == TO_TOP;
    }

    function isToBottom(roadValue) {
        return (roadValue & TO_BOTTOM) == TO_BOTTOM;
    }

    function PushFormationOrder(arr, order, formationItem) {
        formationItem.push(order);
        arr[order] = arr[order] || [];
        arr[order].push(formationItem);
    }

    $JssorSlideshowFormations$.$FormationStraight = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var order;
        for (r = 0; r < rows; r++) {
            for (col = 0; col < cols; col++) {
                cr = r + ',' + col;
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                        order = il - (col * rows + (rl - r));
                        break;
                    case ASSEMBLY_RIGHT_TOP:
                        order = il - (r * cols + (cl - col));
                        break;
                    case ASSEMBLY_TOP_LEFT:
                        order = il - (col * rows + r);
                    case ASSEMBLY_LEFT_TOP:
                        order = il - (r * cols + col);
                        break;
                    case ASSEMBLY_BOTTOM_RIGHT:
                        order = col * rows + r;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                        order = r * cols + (cl - col);
                        break;
                    case ASSEMBLY_TOP_RIGHT:
                        order = col * rows + (rl - r);
                        break;
                    default:
                        order = r * cols + col;
                        break; //ASSEMBLY_RIGHT_BOTTOM
                }
                PushFormationOrder(a, order, [r, col]);
            }
        }

        return a;
    };

    $JssorSlideshowFormations$.$FormationSwirl = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var hit = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && !hit[cr]) {
                //a[cr] = i++;
                hit[cr] = true;
                PushFormationOrder(a, i++, [r, col]);
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
            }

            switch (courses[course % courses.length]) {
                case COLUMN_INCREASE:
                    col++;
                    break;
                case ROW_INCREASE:
                    r++;
                    break;
                case COLUMN_DECREASE:
                    col--;
                    break;
                case ROW_DECREASE:
                    r--;
                    break;
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationZigZag = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_INCREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && typeof (a[cr]) == 'undefined') {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
                switch (courses[course % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationStraightStairs = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
            case ASSEMBLY_TOP_RIGHT:
            case ASSEMBLY_TOP_LEFT:
            case ASSEMBLY_BOTTOM_RIGHT:
                var C = 0;
                var R = 0;
                break;
            case ASSEMBLY_LEFT_BOTTOM:
            case ASSEMBLY_RIGHT_TOP:
            case ASSEMBLY_LEFT_TOP:
            case ASSEMBLY_RIGHT_BOTTOM:
                var C = cl;
                var R = 0;
                break;
            default:
                formationDirection = ASSEMBLY_RIGHT_BOTTOM;
                var C = cl;
                var R = 0;
                break;
        }
        col = C;
        r = R;
        while (i < count) {
            cr = r + ',' + col;
            if (isToTop(formationDirection) || isToRight(formationDirection)) {
                PushFormationOrder(a, il - i++, [r, col]);
                //a[cr] = il - i++;
            }
            else {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
            }
            switch (formationDirection) {
                case ASSEMBLY_BOTTOM_LEFT:
                case ASSEMBLY_TOP_RIGHT:
                    col--;
                    r++;
                    break;
                case ASSEMBLY_TOP_LEFT:
                case ASSEMBLY_BOTTOM_RIGHT:
                    col++;
                    r--;
                    break;
                case ASSEMBLY_LEFT_BOTTOM:
                case ASSEMBLY_RIGHT_TOP:
                    col--;
                    r--;
                    break;
                case ASSEMBLY_RIGHT_BOTTOM:
                case ASSEMBLY_LEFT_TOP:
                default:
                    col++;
                    r++;
                    break;
            }
            if (col < 0 || r < 0 || col > cl || r > rl) {
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                    case ASSEMBLY_TOP_RIGHT:
                        C++;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                    case ASSEMBLY_RIGHT_TOP:
                    case ASSEMBLY_TOP_LEFT:
                    case ASSEMBLY_BOTTOM_RIGHT:
                        R++;
                        break;
                    case ASSEMBLY_RIGHT_BOTTOM:
                    case ASSEMBLY_LEFT_TOP:
                    default:
                        C--;
                        break;
                }
                if (C < 0 || R < 0 || C > cl || R > rl) {
                    switch (formationDirection) {
                        case ASSEMBLY_BOTTOM_LEFT:
                        case ASSEMBLY_TOP_RIGHT:
                            C = cl;
                            R++;
                            break;
                        case ASSEMBLY_TOP_LEFT:
                        case ASSEMBLY_BOTTOM_RIGHT:
                            R = rl;
                            C++;
                            break;
                        case ASSEMBLY_LEFT_BOTTOM:
                        case ASSEMBLY_RIGHT_TOP: R = rl; C--;
                            break;
                        case ASSEMBLY_RIGHT_BOTTOM:
                        case ASSEMBLY_LEFT_TOP:
                        default:
                            C = 0;
                            R++;
                            break;
                    }
                    if (R > rl)
                        R = rl;
                    else if (R < 0)
                        R = 0;
                    else if (C > cl)
                        C = cl;
                    else if (C < 0)
                        C = 0;
                }
                r = R;
                col = C;
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationSquare = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var dc;
        var dr;
        var cr;
        dc = cols < rows ? (rows - cols) / 2 : 0;
        dr = cols > rows ? (cols - rows) / 2 : 0;
        cr = Math.round(Math.max(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1 + dc, r + 1 + dr, cols - col + dc, rows - r + dr), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRectangle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var cr;
        cr = Math.round(Math.min(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1, r + 1, cols - col, rows - r), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRandom = function (transition) {
        var a = [];
        var r, col, i;
        for (r = 0; r < transition.$Rows; r++) {
            for (col = 0; col < transition.$Cols; col++)
                PushFormationOrder(a, Math.ceil(100000 * Math.random()) % 13, [r, col]);
        }

        return a;
    };

    $JssorSlideshowFormations$.$FormationCircle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.sqrt(Math.pow(col - hc, 2) + Math.pow(r - hr, 2))), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.min(Math.abs(col - hc), Math.abs(r - hr))), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRectangleCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        var cr = Math.max(hc, hr) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(cr - Math.max(hc - Math.abs(col - hc), hr - Math.abs(r - hr))) - 1, [r, col]);
        }
        return arr;
    };

    function GetFormation(transition) {

        var formationInstance = transition.$Formation(transition);

        return transition.$Reverse ? formationInstance.reverse() : formationInstance;

    } //GetFormation

    //var _PrototypeTransitions = [];
    function EnsureTransitionInstance(options, slideshowInterval) {

        var _SlideshowTransition = {
            $Interval: slideshowInterval,  //Delay to play next frame
            $Duration: 1, //Duration to finish the entire transition
            $Delay: 0,  //Delay to assembly blocks
            $Cols: 1,   //Number of columns
            $Rows: 1,   //Number of rows
            $Opacity: 0,   //Fade block or not
            $Zoom: 0,   //Zoom block or not
            $Clip: 0,   //Clip block or not
            $Move: false,   //Move block or not
            $SlideOut: false,   //Slide the previous slide out to display next slide instead
            //$FlyDirection: 0,   //Specify fly transform with direction
            $Reverse: false,    //Reverse the assembly or not
            $Formation: $JssorSlideshowFormations$.$FormationRandom,    //Shape that assembly blocks as
            $Assembly: ASSEMBLY_RIGHT_BOTTOM,   //The way to assembly blocks
            $ChessMode: { $Column: 0, $Row: 0 },    //Chess move or fly direction
            $Easing: $JssorEasing$.$EaseSwing,  //Specify variation of speed during transition
            $Round: {},
            $Blocks: [],
            $During: {}
        };

        $JssorUtils$.$Extend(_SlideshowTransition, options);

        _SlideshowTransition.$Count = _SlideshowTransition.$Cols * _SlideshowTransition.$Rows;
        if ($JssorUtils$.$IsFunction(_SlideshowTransition.$Easing))
            _SlideshowTransition.$Easing = { $Default: _SlideshowTransition.$Easing };

        _SlideshowTransition.$FramesCount = Math.ceil(_SlideshowTransition.$Duration / _SlideshowTransition.$Interval);
        _SlideshowTransition.$EasingInstance = GetEasing(_SlideshowTransition);

        _SlideshowTransition.$GetBlocks = function (width, height) {
            width /= _SlideshowTransition.$Cols;
            height /= _SlideshowTransition.$Rows;
            var wh = width + 'x' + height;
            if (!_SlideshowTransition.$Blocks[wh]) {
                _SlideshowTransition.$Blocks[wh] = { $Width: width, $Height: height };
                for (var col = 0; col < _SlideshowTransition.$Cols; col++) {
                    for (var r = 0; r < _SlideshowTransition.$Rows; r++)
                        _SlideshowTransition.$Blocks[wh][r + ',' + col] = { $Top: r * height, $Right: col * width + width, $Bottom: r * height + height, $Left: col * width };
                }
            }

            return _SlideshowTransition.$Blocks[wh];
        };

        if (_SlideshowTransition.$Brother) {
            _SlideshowTransition.$Brother = EnsureTransitionInstance(_SlideshowTransition.$Brother, slideshowInterval);
            _SlideshowTransition.$SlideOut = true;
        }

        return _SlideshowTransition;
    }

    function GetEasing(transition) {
        var easing = transition.$Easing;
        if (!easing.$Default)
            easing.$Default = $JssorEasing$.$EaseSwing;

        var duration = transition.$FramesCount;

        var cache = easing.$Cache;
        if (!cache) {
            var enumerator = $JssorUtils$.$Extend({}, transition.$Easing, transition.$Round);
            cache = easing.$Cache = {};

            $JssorUtils$.$Each(enumerator, function (v, easingName) {
                var easingFunction = easing[easingName] || easing.$Default;
                var round = transition.$Round[easingName] || 1;

                if (!$JssorUtils$.$IsArray(easingFunction.$Cache))
                    easingFunction.$Cache = [];

                var easingFunctionCache = easingFunction.$Cache[duration] = easingFunction.$Cache[duration] || [];

                if (!easingFunctionCache[round]) {
                    easingFunctionCache[round] = [0];
                    for (var t = 1; t <= duration; t++) {
                        var tRound = t / duration * round;
                        var tRoundFloor = Math.floor(tRound);
                        if (tRound != tRoundFloor)
                            tRound -= tRoundFloor;
                        easingFunctionCache[round][t] = easingFunction(tRound);
                    }
                }

                cache[easingName] = easingFunctionCache;

            });
        }

        return cache;
    } //GetEasing

    //Formation Definition -------

    function JssorSlideshowPlayer(slideContainer, slideElement, slideTransition, beginTime, slideContainerWidth, slideContainerHeight) {
        var _Self = this;

        var _Block;
        var _StartStylesArr = {};
        var _AnimationStylesArrs = {};
        var _AnimationBlockItems = [];
        var _StyleStart;
        var _StyleEnd;
        var _StyleDif;
        var _ChessModeColumn = slideTransition.$ChessMode.$Column || 0;
        var _ChessModeRow = slideTransition.$ChessMode.$Row || 0;

        var _Blocks = slideTransition.$GetBlocks(slideContainerWidth, slideContainerHeight);
        var _FormationInstance = GetFormation(slideTransition);
        var _MaxOrder = _FormationInstance.length - 1;
        var _Period = slideTransition.$Duration + slideTransition.$Delay * _MaxOrder;
        var _EndTime = beginTime + _Period;

        var _SlideOut = slideTransition.$SlideOut;
        var _IsIn;

        _EndTime += $JssorUtils$.$IsBrowserChrome() ? 260 : 50;

        _Self.$EndTime = _EndTime;

        _Self.$ShowFrame = function (time) {
            time -= beginTime;

            var isIn = time < _Period;

            if (isIn || _IsIn) {
                _IsIn = isIn;

                if (!_SlideOut)
                    time = _Period - time;

                var frameIndex = Math.ceil(time / slideTransition.$Interval);

                $JssorUtils$.$Each(_AnimationStylesArrs, function (value, index) {

                    var itemFrameIndex = Math.max(frameIndex, value.$Min);
                    itemFrameIndex = Math.min(itemFrameIndex, value.length - 1);

                    if (value.$LastFrameIndex != itemFrameIndex) {
                        if (!value.$LastFrameIndex && !_SlideOut) {
                            $JssorUtils$.$ShowElement(_AnimationBlockItems[index]);
                        }
                        else if (itemFrameIndex == value.$Max && _SlideOut) {
                            $JssorUtils$.$HideElement(_AnimationBlockItems[index]);
                        }
                        value.$LastFrameIndex = itemFrameIndex;
                        $JssorUtils$.$SetStylesEx(_AnimationBlockItems[index], value[itemFrameIndex]);
                    }
                });
            }
        };

        function DisableHWA(elmt) {
            $JssorUtils$.$DisableHWA(elmt);

            var children = $JssorUtils$.$GetChildren(elmt);

            $JssorUtils$.$Each(children, function (child) {
                DisableHWA(child);
            });
        }

        //constructor
        {
            slideElement = $JssorUtils$.$CloneNode(slideElement, true);
            DisableHWA(slideElement);
            if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                var hasImage = !slideElement["no-image"];
                var slideChildElements = $JssorUtils$.$FindChildrenByTag(slideElement, null, true);
                $JssorUtils$.$Each(slideChildElements, function (slideChildElement) {
                    if (hasImage || slideChildElement["jssor-slider"])
                        $JssorUtils$.$CssOpacity(slideChildElement, $JssorUtils$.$CssOpacity(slideChildElement), true);
                });
            }

            $JssorUtils$.$Each(_FormationInstance, function (formationItems, order) {
                $JssorUtils$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];
                    {
                        var columnRow = row + ',' + col;

                        var chessHorizontal = false;
                        var chessVertical = false;
                        var chessRotate = false;

                        if (_ChessModeColumn && col % 2) {
                            if ($JssorDirection$.$IsHorizontal(_ChessModeColumn)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if ($JssorDirection$.$IsVertical(_ChessModeColumn)) {
                                chessVertical = !chessVertical;
                            }

                            if (_ChessModeColumn & 16)
                                chessRotate = !chessRotate;
                        }

                        if (_ChessModeRow && row % 2) {
                            if ($JssorDirection$.$IsHorizontal(_ChessModeRow)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if ($JssorDirection$.$IsVertical(_ChessModeRow)) {
                                chessVertical = !chessVertical;
                            }
                            if (_ChessModeRow & 16)
                                chessRotate = !chessRotate;
                        }

                        slideTransition.$Top = slideTransition.$Top || (slideTransition.$Clip & 4);
                        slideTransition.$Bottom = slideTransition.$Bottom || (slideTransition.$Clip & 8);
                        slideTransition.$Left = slideTransition.$Left || (slideTransition.$Clip & 1);
                        slideTransition.$Right = slideTransition.$Right || (slideTransition.$Clip & 2);

                        var topBenchmark = chessVertical ? slideTransition.$Bottom : slideTransition.$Top;
                        var bottomBenchmark = chessVertical ? slideTransition.$Top : slideTransition.$Bottom;
                        var leftBenchmark = chessHorizontal ? slideTransition.$Right : slideTransition.$Left;
                        var rightBenchmark = chessHorizontal ? slideTransition.$Left : slideTransition.$Right;

                        //$JssorDebug$.$Execute(function () {
                        //    topBenchmark = bottomBenchmark = leftBenchmark = rightBenchmark = false;
                        //});

                        slideTransition.$Clip = topBenchmark || bottomBenchmark || leftBenchmark || rightBenchmark;

                        _StyleDif = {};
                        _StyleEnd = { $Top: 0, $Left: 0, $Opacity: 1, $Width: slideContainerWidth, $Height: slideContainerHeight };
                        _StyleStart = $JssorUtils$.$Extend({}, _StyleEnd);
                        _Block = $JssorUtils$.$Extend({}, _Blocks[columnRow]);

                        if (slideTransition.$Opacity) {
                            _StyleEnd.$Opacity = 2 - slideTransition.$Opacity;
                        }

                        if (slideTransition.$ZIndex) {
                            _StyleEnd.$ZIndex = slideTransition.$ZIndex;
                            _StyleStart.$ZIndex = 0;
                        }

                        var allowClip = slideTransition.$Cols * slideTransition.$Rows > 1 || slideTransition.$Clip;

                        if (slideTransition.$Zoom || slideTransition.$Rotate) {
                            var allowRotate = true;
                            if ($JssorUtils$.$IsBrowserIE() && $JssorUtils$.$GetBrowserEngineVersion() < 9) {
                                if (slideTransition.$Cols * slideTransition.$Rows > 1)
                                    allowRotate = false;
                                else
                                    allowClip = false;
                            }

                            if (allowRotate) {
                                _StyleEnd.$Zoom = slideTransition.$Zoom ? slideTransition.$Zoom - 1 : 1;
                                _StyleStart.$Zoom = 1;

                                if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera())
                                    _StyleEnd.$Zoom = Math.min(_StyleEnd.$Zoom, 2);

                                var rotate = slideTransition.$Rotate;
                                if (rotate == true)
                                    rotate = 1;

                                _StyleEnd.$Rotate = rotate * 360 * ((chessRotate) ? -1 : 1);
                                _StyleStart.$Rotate = 0;
                            }
                        }

                        if (allowClip) {
                            if (slideTransition.$Clip) {
                                var clipScale = slideTransition.$ScaleClip || 1;
                                var blockOffset = _Block.$Offset = {};
                                if (topBenchmark && bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height / 2 * clipScale;
                                    blockOffset.$Bottom = -blockOffset.$Top;
                                }
                                else if (topBenchmark) {
                                    blockOffset.$Bottom = -_Blocks.$Height * clipScale;
                                }
                                else if (bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height * clipScale;
                                }

                                if (leftBenchmark && rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width / 2 * clipScale;
                                    blockOffset.$Right = -blockOffset.$Left;
                                }
                                else if (leftBenchmark) {
                                    blockOffset.$Right = -_Blocks.$Width * clipScale;
                                }
                                else if (rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width * clipScale;
                                }
                            }

                            _StyleDif.$Clip = _Block;
                            _StyleStart.$Clip = _Blocks[columnRow];
                        }

                        //fly
                        {
                            var chessHor = chessHorizontal ? 1 : -1;
                            var chessVer = chessVertical ? 1 : -1;

                            if (slideTransition.x)
                                _StyleEnd.$Left += slideContainerWidth * slideTransition.x * chessHor;

                            if (slideTransition.y)
                                _StyleEnd.$Top += slideContainerHeight * slideTransition.y * chessVer;
                        }

                        $JssorUtils$.$Each(_StyleEnd, function (propertyEnd, property) {
                            if ($JssorUtils$.$IsNumeric(propertyEnd)) {
                                if (propertyEnd != _StyleStart[property]) {
                                    _StyleDif[property] = propertyEnd - _StyleStart[property];
                                }
                            }
                        });

                        _StartStylesArr[columnRow] = _SlideOut ? _StyleStart : _StyleEnd;

                        var animationStylesArr = [];
                        var virtualFrameCount = Math.round(order * slideTransition.$Delay / slideTransition.$Interval);
                        _AnimationStylesArrs[columnRow] = new Array(virtualFrameCount);
                        _AnimationStylesArrs[columnRow].$Min = virtualFrameCount;

                        var framesCount = slideTransition.$FramesCount;
                        for (var frameN = 0; frameN <= framesCount; frameN++) {
                            var styleFrameN = {};

                            $JssorUtils$.$Each(_StyleDif, function (propertyDiff, property) {
                                var propertyEasings = slideTransition.$EasingInstance[property] || slideTransition.$EasingInstance.$Default;
                                var propertyEasingArray = propertyEasings[slideTransition.$Round[property] || 1];

                                var propertyDuring = slideTransition.$During[property] || [0, 1];
                                var propertyFrameN = (frameN / framesCount - propertyDuring[0]) / propertyDuring[1] * framesCount;
                                propertyFrameN = Math.round(Math.min(framesCount, Math.max(propertyFrameN, 0)));

                                var propertyEasingValue = propertyEasingArray[propertyFrameN];

                                if ($JssorUtils$.$IsNumeric(propertyDiff)) {
                                    styleFrameN[property] = _StyleStart[property] + propertyDiff * propertyEasingValue;
                                }
                                else {
                                    var value = styleFrameN[property] = $JssorUtils$.$Extend({}, _StyleStart[property]);
                                    value.$Offset = [];
                                    $JssorUtils$.$Each(propertyDiff.$Offset, function (rectX, n) {
                                        var offsetValue = rectX * propertyEasingValue;
                                        value.$Offset[n] = offsetValue;
                                        value[n] += offsetValue;
                                    });
                                }
                            });

                            if (_StyleStart.$Zoom) {
                                styleFrameN.$Transform = { $Rotate: styleFrameN.$Rotate || 0, $Scale: styleFrameN.$Zoom, $OriginalWidth: slideContainerWidth, $OriginalHeight: slideContainerHeight };
                            }
                            if (styleFrameN.$Clip && slideTransition.$Move) {
                                var styleFrameNClipOffset = styleFrameN.$Clip.$Offset;
                                var offsetY = (styleFrameNClipOffset.$Top || 0) + (styleFrameNClipOffset.$Bottom || 0);
                                var offsetX = (styleFrameNClipOffset.$Left || 0) + (styleFrameNClipOffset.$Right || 0);

                                styleFrameN.$Left = (styleFrameN.$Left || 0) + offsetX;
                                styleFrameN.$Top = (styleFrameN.$Top || 0) + offsetY;
                                styleFrameN.$Clip.$Left -= offsetX;
                                styleFrameN.$Clip.$Right -= offsetX;
                                styleFrameN.$Clip.$Top -= offsetY;
                                styleFrameN.$Clip.$Bottom -= offsetY;
                            }

                            styleFrameN.$ZIndex = styleFrameN.$ZIndex || 1;

                            _AnimationStylesArrs[columnRow].push(styleFrameN);
                        }

                    } //for
                });
            });

            _FormationInstance.reverse();
            $JssorUtils$.$Each(_FormationInstance, function (formationItems) {
                $JssorUtils$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];

                    var columnRow = row + ',' + col;

                    var image = slideElement;
                    if (col || row)
                        image = $JssorUtils$.$CloneNode(slideElement, true);

                    $JssorUtils$.$SetStyles(image, _StartStylesArr[columnRow]);
                    $JssorUtils$.$CssOverflow(image, "hidden");

                    $JssorUtils$.$CssPosition(image, "absolute");
                    slideContainer.$AddClipElement(image);
                    _AnimationBlockItems[columnRow] = image;
                    $JssorUtils$.$ShowElement(image, _SlideOut);
                });
            });
        }
    }

    //JssorSlideshowRunner++++++++
    var _SlideshowRunnerCount = 1;
    $JssorSlideshowRunner$ = window.$JssorSlideshowRunner$ = function (slideContainer, slideContainerWidth, slideContainerHeight, slideshowOptions, handleTouchEventOnly) {

        var _SelfSlideshowRunner = this;

        //var _State = 0; //-1 fullfill, 0 clean, 1 initializing, 2 stay, 3 playing
        var _EndTime;

        var _SliderFrameCount;

        var _SlideshowPlayerBelow;
        var _SlideshowPlayerAbove;

        var _PrevItem;
        var _SlideItem;

        var _TransitionIndex = 0;
        var _TransitionsOrder = slideshowOptions.$TransitionsOrder;

        var _SlideshowTransition;

        var _SlideshowPerformance = 16;

        function SlideshowProcessor() {
            var _SelfSlideshowProcessor = this;
            var _CurrentTime = 0;

            $JssorAnimator$.call(_SelfSlideshowProcessor, 0, _EndTime);

            _SelfSlideshowProcessor.$OnPositionChange = function (oldPosition, newPosition) {
                if ((newPosition - _CurrentTime) > _SlideshowPerformance) {
                    _CurrentTime = newPosition;

                    _SlideshowPlayerAbove && _SlideshowPlayerAbove.$ShowFrame(newPosition);
                    _SlideshowPlayerBelow && _SlideshowPlayerBelow.$ShowFrame(newPosition);
                }
            };

            _SelfSlideshowProcessor.$Transition = _SlideshowTransition;
        }

        //member functions
        _SelfSlideshowRunner.$GetTransition = function (slideCount) {
            var n = 0;

            var transitions = slideshowOptions.$Transitions;

            var transitionCount = transitions.length;

            if (_TransitionsOrder) { /*Sequence*/
                if (transitionCount > slideCount && ($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserSafari() || $JssorUtils$.$IsBrowserFireFox())) {
                    transitionCount -= transitionCount % slideCount;
                }
                n = _TransitionIndex++ % transitionCount;
            }
            else { /*Random*/
                n = Math.floor(Math.random() * transitionCount);
            }

            transitions[n] && (transitions[n].$Index = n);

            return transitions[n];
        };

        _SelfSlideshowRunner.$Initialize = function (slideIndex, prevIndex, slideItem, prevItem, slideshowTransition) {
            $JssorDebug$.$Execute(function () {
                if (_SlideshowPlayerBelow) {
                    $JssorDebug$.$Fail("slideshow runner has not been cleared.");
                }
            });

            _SlideshowTransition = slideshowTransition;

            slideshowTransition = EnsureTransitionInstance(slideshowTransition, _SlideshowPerformance);

            _SlideItem = slideItem;
            _PrevItem = prevItem;

            var prevSlideElement = prevItem.$Item;
            var currentSlideElement = slideItem.$Item;
            prevSlideElement["no-image"] = !prevItem.$Image;
            currentSlideElement["no-image"] = !slideItem.$Image;

            var slideElementAbove = prevSlideElement;
            var slideElementBelow = currentSlideElement;

            var slideTransitionAbove = slideshowTransition;
            var slideTransitionBelow = slideshowTransition.$Brother || EnsureTransitionInstance({}, _SlideshowPerformance);

            if (!slideshowTransition.$SlideOut) {
                slideElementAbove = currentSlideElement;
                slideElementBelow = prevSlideElement;
            }

            var shift = slideTransitionBelow.$Shift || 0;

            _SlideshowPlayerBelow = new JssorSlideshowPlayer(slideContainer, slideElementBelow, slideTransitionBelow, Math.max(shift - slideTransitionBelow.$Interval, 0), slideContainerWidth, slideContainerHeight);
            _SlideshowPlayerAbove = new JssorSlideshowPlayer(slideContainer, slideElementAbove, slideTransitionAbove, Math.max(slideTransitionBelow.$Interval - shift, 0), slideContainerWidth, slideContainerHeight);

            _SlideshowPlayerBelow.$ShowFrame(0);
            _SlideshowPlayerAbove.$ShowFrame(0);

            _EndTime = Math.max(_SlideshowPlayerBelow.$EndTime, _SlideshowPlayerAbove.$EndTime);

            _SelfSlideshowRunner.$Index = slideIndex;
        };

        _SelfSlideshowRunner.$Clear = function () {
            slideContainer.$Clear();
            _SlideshowPlayerBelow = null;
            _SlideshowPlayerAbove = null;
        };

        _SelfSlideshowRunner.$GetProcessor = function () {
            var slideshowProcessor = null;

            if (_SlideshowPlayerAbove)
                slideshowProcessor = new SlideshowProcessor();

            return slideshowProcessor;
        };

        //Constructor
        {
            if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera() || (handleTouchEventOnly && $JssorUtils$.$GetWebKitVersion < 537)) {
                _SlideshowPerformance = 32;
            }

            $JssorEventManager$.call(_SelfSlideshowRunner);
            $JssorAnimator$.call(_SelfSlideshowRunner, -10000000, 10000000);

            $JssorDebug$.$LiveStamp(_SelfSlideshowRunner, "slideshow_runner_" + _SlideshowRunnerCount++);
        }
    };
    //JssorSlideshowRunner--------

    //JssorSlider
    function JssorSlider(elmt, options) {
        var _SelfSlider = this;

        //private classes
        function Conveyor() {
            var _SelfConveyor = this;
            $JssorAnimator$.call(_SelfConveyor, -100000000, 200000000);

            _SelfConveyor.$GetCurrentSlideInfo = function () {
                var positionDisplay = _SelfConveyor.$GetPosition_Display();
                var virtualIndex = Math.floor(positionDisplay);
                var slideIndex = GetRealIndex(virtualIndex);
                var slidePosition = positionDisplay - Math.floor(positionDisplay);

                return { $Index: slideIndex, $VirtualIndex: virtualIndex, $Position: slidePosition };
            };

            _SelfConveyor.$OnPositionChange = function (oldPosition, newPosition) {

                var index = Math.floor(newPosition);
                if (index != newPosition && newPosition > oldPosition)
                    index++;

                ResetNavigator(index, true);

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_POSITION_CHANGE, GetRealIndex(newPosition), GetRealIndex(oldPosition), newPosition, oldPosition);
            };
        }

        //Carousel
        function Carousel() {
            var _SelfCarousel = this;

            $JssorAnimator$.call(_SelfCarousel, 0, 0, { $LoopLength: _SlideCount });

            //Carousel Constructor
            {
                $JssorUtils$.$Each(_SlideItems, function (slideItem) {
                    (_Loop & 1) && slideItem.$SetLoopLength(_SlideCount);
                    _SelfCarousel.$Chain(slideItem);
                    slideItem.$Shift(_ParkingPosition / _StepLength);
                });
            }
        }
        //Carousel

        //Slideshow
        function Slideshow() {
            var _SelfSlideshow = this;
            var _Wrapper = _SlideContainer.$Elmt;

            $JssorAnimator$.call(_SelfSlideshow, -1, 2, { $Easing: $JssorEasing$.$EaseLinear, $Setter: { $Position: SetPosition }, $LoopLength: _SlideCount }, _Wrapper, { $Position: 1 }, { $Position: -1 });

            _SelfSlideshow.$Wrapper = _Wrapper;

            //Slideshow Constructor
            {
                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_SlideContainer.$Elmt, "debug-id", "slide_container");
                });
            }
        }
        //Slideshow

        //CarouselPlayer
        function CarouselPlayer(carousel, slideshow) {
            var _SelfCarouselPlayer = this;
            var _FromPosition;
            var _ToPosition;
            var _Duration;
            var _StandBy;
            var _StandByPosition;

            $JssorAnimator$.call(_SelfCarouselPlayer, -100000000, 200000000);

            _SelfCarouselPlayer.$OnStart = function () {
                _IsSliding = true;
                _LoadingTicket = null;

                //EVT_SWIPE_START
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SWIPE_START, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());
            };

            _SelfCarouselPlayer.$OnStop = function () {

                _IsSliding = false;
                _StandBy = false;

                var currentSlideInfo = _Conveyor.$GetCurrentSlideInfo();

                //EVT_SWIPE_END
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SWIPE_END, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());

                if (!currentSlideInfo.$Position) {
                    OnPark(currentSlideInfo.$VirtualIndex, _CurrentSlideIndex);
                }
            };

            _SelfCarouselPlayer.$OnPositionChange = function (oldPosition, newPosition) {

                var toPosition;

                if (_StandBy)
                    toPosition = _StandByPosition;
                else {
                    toPosition = _ToPosition;

                    if (_Duration) {
                        var interPosition = newPosition / _Duration;
                        if ($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserFireFox()) {
                            Math.round(interPosition * 16 / _Duration) / 16 * _Duration;
                            interPosition = parseFloat(interPosition.toFixed(4));
                        }
                        toPosition = _Options.$SlideEasing(interPosition) * (_ToPosition - _FromPosition) + _FromPosition;
                    }
                }

                _Conveyor.$GoToPosition(toPosition);
            };

            _SelfCarouselPlayer.$PlayCarousel = function (fromPosition, toPosition, duration, callback) {
                $JssorDebug$.$Execute(function () {
                    if (_SelfCarouselPlayer.$IsPlaying())
                        $JssorDebug$.$Fail("The carousel is already playing.");
                });

                _FromPosition = fromPosition;
                _ToPosition = toPosition;
                _Duration = duration;

                _Conveyor.$GoToPosition(fromPosition);
                _SelfCarouselPlayer.$GoToPosition(0);

                _SelfCarouselPlayer.$PlayToPosition(duration, callback);
            };

            _SelfCarouselPlayer.$StandBy = function (standByPosition) {
                _StandBy = true;
                _StandByPosition = standByPosition;
                _SelfCarouselPlayer.$Play(standByPosition, null, true);
            };

            _SelfCarouselPlayer.$SetStandByPosition = function (standByPosition) {
                _StandByPosition = standByPosition;
            };

            _SelfCarouselPlayer.$MoveCarouselTo = function (position) {
                _Conveyor.$GoToPosition(position);
            };

            //CarouselPlayer Constructor
            {
                _Conveyor = new Conveyor();

                _Conveyor.$Combine(carousel);
                _Conveyor.$Combine(slideshow);
            }
        }
        //CarouselPlayer

        //SlideContainer
        function SlideContainer() {
            var _Self = this;
            var elmt = CreatePanel();

            $JssorUtils$.$CssZIndex(elmt, 0);

            _Self.$Elmt = elmt;

            _Self.$AddClipElement = function (clipElement) {
                $JssorUtils$.$AppendChild(elmt, clipElement);
                $JssorUtils$.$ShowElement(elmt);
            };

            _Self.$Clear = function () {
                $JssorUtils$.$HideElement(elmt);
                $JssorUtils$.$ClearInnerHtml(elmt);
            };
        }
        //SlideContainer

        //SlideItem
        function SlideItem(slideElmt, slideIndex) {

            var _SelfSlideItem = this;

            var _CaptionSliderIn;
            var _CaptionSliderOut;
            var _CaptionSliderCurrent;
            var _IsCaptionSliderPlayingWhenDragStart;

            var _Wrapper;
            var _BaseElement = slideElmt;

            var _LoadingScreen;

            var _ImageItem;
            var _ImageElmts = [];
            var _LinkItemOrigin;
            var _LinkItem;
            var _ImageLoading;
            var _ImageLoaded;
            var _ImageLazyLoading;
            var _ContentRefreshed;

            var _Processor;

            var _PlayerInstanceElement;
            var _PlayerInstance;

            var _SequenceNumber;    //for debug only

            $JssorAnimator$.call(_SelfSlideItem, -_DisplayPieces, _DisplayPieces + 1, { $SlideItemAnimator: true });

            function ResetCaptionSlider(fresh) {
                _CaptionSliderOut && _CaptionSliderOut.$Revert();
                _CaptionSliderIn && _CaptionSliderIn.$Revert();

                RefreshContent(slideElmt, fresh);
                _ContentRefreshed = true;

                _CaptionSliderIn = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions, 1);
                $JssorDebug$.$LiveStamp(_CaptionSliderIn, "caption_slider_" + _CaptionSliderCount + "_in");
                _CaptionSliderOut = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions);
                $JssorDebug$.$LiveStamp(_CaptionSliderOut, "caption_slider_" + _CaptionSliderCount + "_out");

                $JssorDebug$.$Execute(function () {
                    _CaptionSliderCount++;
                });

                _CaptionSliderOut.$GoToBegin();
                _CaptionSliderIn.$GoToBegin();
            }

            function EnsureCaptionSliderVersion() {
                if (_CaptionSliderIn.$Version < _CaptionSliderOptions.$Version) {
                    ResetCaptionSlider();
                }
            }

            //event handling begin
            function LoadImageCompleteEventHandler(completeCallback, loadingScreen, image) {
                if (!_ImageLoaded) {
                    _ImageLoaded = true;

                    if (_ImageItem && image) {
                        var imageWidth = image.width;
                        var imageHeight = image.height;
                        var fillWidth = imageWidth;
                        var fillHeight = imageHeight;

                        if (imageWidth && imageHeight && _Options.$FillMode) {

                            //0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                            if (_Options.$FillMode & 3 && (!(_Options.$FillMode & 4) || imageWidth > _SlideWidth || imageHeight > _SlideHeight)) {
                                var fitHeight = false;
                                var ratio = _SlideWidth / _SlideHeight * imageHeight / imageWidth;

                                if (_Options.$FillMode & 1) {
                                    fitHeight = (ratio > 1);
                                }
                                else if (_Options.$FillMode & 2) {
                                    fitHeight = (ratio < 1);
                                }
                                fillWidth = fitHeight ? imageWidth * _SlideHeight / imageHeight : _SlideWidth;
                                fillHeight = fitHeight ? _SlideHeight : imageHeight * _SlideWidth / imageWidth;
                            }

                            $JssorUtils$.$CssWidth(_ImageItem, fillWidth);
                            $JssorUtils$.$CssHeight(_ImageItem, fillHeight);
                            $JssorUtils$.$CssTop(_ImageItem, (_SlideHeight - fillHeight) / 2);
                            $JssorUtils$.$CssLeft(_ImageItem, (_SlideWidth - fillWidth) / 2);
                        }

                        $JssorUtils$.$CssPosition(_ImageItem, "absolute");

                        _SelfSlider.$TriggerEvent(JssorSlider.$EVT_LOAD_END, slideItem);
                    }
                }

                $JssorUtils$.$HideElement(loadingScreen);
                completeCallback && completeCallback(_SelfSlideItem);
            }

            function LoadSlideshowImageCompleteEventHandler(nextIndex, nextItem, slideshowTransition, loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex && _AutoPlay) {
                    if (!_Frozen) {
                        var nextRealIndex = GetRealIndex(nextIndex);
                        _SlideshowRunner.$Initialize(nextRealIndex, slideIndex, nextItem, _SelfSlideItem, slideshowTransition);
                        nextItem.$HideContentForSlideshow();
                        _Slideshow.$Locate(nextRealIndex, 1);
                        _Slideshow.$GoToPosition(nextRealIndex);
                        _CarouselPlayer.$PlayCarousel(nextIndex, nextIndex, 0);
                    }
                }
            }

            function SlideReadyEventHandler(loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex) {

                    if (!_Processor) {
                        var slideshowProcessor = null;
                        if (_SlideshowRunner) {
                            if (_SlideshowRunner.$Index == slideIndex)
                                slideshowProcessor = _SlideshowRunner.$GetProcessor();
                            else
                                _SlideshowRunner.$Clear();
                        }

                        EnsureCaptionSliderVersion();

                        _Processor = new Processor(slideIndex, slideshowProcessor, _SelfSlideItem.$GetCaptionSliderIn(), _SelfSlideItem.$GetCaptionSliderOut());
                        _Processor.$SetPlayer(_PlayerInstance);
                    }

                    !_Processor.$IsPlaying() && _Processor.$Replay();
                }
            }

            function ParkEventHandler(currentIndex, previousIndex) {
                if (currentIndex == slideIndex) {

                    if (currentIndex != previousIndex)
                        _SlideItems[previousIndex] && _SlideItems[previousIndex].$ParkOut();
                    else
                        _Processor && _Processor.$AdjustIdleOnPark();

                    _PlayerInstance && _PlayerInstance.$Enable();

                    //park in
                    var loadingTicket = _LoadingTicket = $JssorUtils$.$GetNow();
                    _SelfSlideItem.$LoadImage($JssorUtils$.$CreateCallback(null, SlideReadyEventHandler, loadingTicket));
                }
                else {
                    var distance = Math.abs(slideIndex - currentIndex);
                    var loadRange = _DisplayPieces + _Options.$LazyLoading;
                    if (!_ImageLazyLoading || distance <= loadRange || _SlideCount - distance <= loadRange) {
                        _SelfSlideItem.$LoadImage();
                    }
                }
            }

            function SwipeStartEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.$Stop();
                    _PlayerInstance && _PlayerInstance.$Quit();
                    _PlayerInstance && _PlayerInstance.$Disable();
                    _Processor.$OpenSlideshowPanel();
                }
            }

            function FreezeEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.$Stop();
                }
            }

            function LinkClickEventHandler(event) {
                if (_LastDragSucceded) {
                    $JssorUtils$.$CancelEvent(event);
                }
                else {
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_CLICK, slideIndex, event);
                }
            }

            function PlayerAvailableEventHandler() {
                _PlayerInstance = _PlayerInstanceElement.pInstance;
                _Processor && _Processor.$SetPlayer(_PlayerInstance);
            }

            _SelfSlideItem.$LoadImage = function (completeCallback, loadingScreen) {
                loadingScreen = loadingScreen || _LoadingScreen;

                if (_ImageElmts.length && !_ImageLoaded) {

                    $JssorUtils$.$ShowElement(loadingScreen);

                    if (!_ImageLoading) {
                        _ImageLoading = true;
                        _SelfSlider.$TriggerEvent(JssorSlider.$EVT_LOAD_START);

                        $JssorUtils$.$Each(_ImageElmts, function (imageElmt) {

                            if (!imageElmt.src) {
                                imageElmt.src = $JssorUtils$.$GetAttributeEx(imageElmt, "src2");
                                $JssorUtils$.$CssDisplay(imageElmt, imageElmt["display-origin"]);
                            }
                        });
                    }
                    $JssorUtils$.$LoadImages(_ImageElmts, _ImageItem, $JssorUtils$.$CreateCallback(null, LoadImageCompleteEventHandler, completeCallback, loadingScreen));
                }
                else {
                    LoadImageCompleteEventHandler(completeCallback, loadingScreen);
                }
            };

            _SelfSlideItem.$GoForNextSlide = function () {
                if (_SlideshowRunner) {
                    var slideshowTransition = _SlideshowRunner.$GetTransition(_SlideCount);

                    if (slideshowTransition) {
                        var loadingTicket = _LoadingTicket = $JssorUtils$.$GetNow();

                        var nextIndex = slideIndex + _PlayReverse;
                        var nextItem = _SlideItems[GetRealIndex(nextIndex)];
                        return nextItem.$LoadImage($JssorUtils$.$CreateCallback(null, LoadSlideshowImageCompleteEventHandler, nextIndex, nextItem, slideshowTransition, loadingTicket), _LoadingScreen);
                    }
                }

                PlayTo(_CurrentSlideIndex + _Options.$AutoPlaySteps * _PlayReverse);
            };

            _SelfSlideItem.$TryActivate = function () {
                ParkEventHandler(slideIndex, slideIndex);
            };

            _SelfSlideItem.$ParkOut = function () {
                //park out
                _PlayerInstance && _PlayerInstance.$Quit();
                _PlayerInstance && _PlayerInstance.$Disable();
                _SelfSlideItem.$UnhideContentForSlideshow();
                _Processor && _Processor.$Abort();
                _Processor = null;
                ResetCaptionSlider();
            };

            //for debug only
            _SelfSlideItem.$StampSlideItemElements = function (stamp) {
                stamp = _SequenceNumber + "_" + stamp;

                $JssorDebug$.$Execute(function () {
                    if (_ImageItem)
                        $JssorUtils$.$SetAttribute(_ImageItem, "debug-id", stamp + "_slide_item_image_id");

                    $JssorUtils$.$SetAttribute(slideElmt, "debug-id", stamp + "_slide_item_item_id");
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_Wrapper, "debug-id", stamp + "_slide_item_wrapper_id");
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_LoadingScreen, "debug-id", stamp + "_loading_container_id");
                });
            };

            _SelfSlideItem.$HideContentForSlideshow = function () {
                $JssorUtils$.$HideElement(slideElmt);
            };

            _SelfSlideItem.$UnhideContentForSlideshow = function () {
                $JssorUtils$.$ShowElement(slideElmt);
            };

            _SelfSlideItem.$EnablePlayer = function () {
                _PlayerInstance && _PlayerInstance.$Enable();
            };

            function RefreshContent(elmt, fresh, level) {
                if (elmt["jssor-slider"])
                    return;

                level = level || 0;

                if (!_ContentRefreshed) {
                    if (elmt.tagName == "IMG") {
                        _ImageElmts.push(elmt);

                        if (!elmt.src) {
                            _ImageLazyLoading = true;
                            elmt["display-origin"] = $JssorUtils$.$CssDisplay(elmt);
                            $JssorUtils$.$HideElement(elmt);
                        }
                    }
                    if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                        $JssorUtils$.$CssZIndex(elmt, ($JssorUtils$.$CssZIndex(elmt) || 0) + 1);
                    }
                    if (_Options.$HWA && $JssorUtils$.$GetWebKitVersion() > 0) {
                        //if ((_HandleTouchEventOnly && ($JssorUtils$.$GetWebKitVersion() < 534 || !_SlideshowEnabled)) || (!_HandleTouchEventOnly && $JssorUtils$.$GetWebKitVersion() < 535)) {
                        //    $JssorUtils$.$EnableHWA(elmt);
                        //}
                        if (!_HandleTouchEventOnly || ($JssorUtils$.$GetWebKitVersion() < 534 || !_SlideshowEnabled)) {
                            $JssorUtils$.$EnableHWA(elmt);
                        }
                    }
                }

                var childElements = $JssorUtils$.$GetChildren(elmt);

                $JssorUtils$.$Each(childElements, function (childElement, i) {

                    var uAttribute = $JssorUtils$.$GetAttributeEx(childElement, "u");
                    if (uAttribute == "player" && !_PlayerInstanceElement) {
                        _PlayerInstanceElement = childElement;
                        if (_PlayerInstanceElement.pInstance) {
                            PlayerAvailableEventHandler();
                        }
                        else {
                            $JssorUtils$.$AddEvent(_PlayerInstanceElement, "dataavailable", PlayerAvailableEventHandler);
                        }
                    }

                    if (uAttribute == "caption") {
                        if (!$JssorUtils$.$IsBrowserIE() && !fresh) {
                            var captionElement = $JssorUtils$.$CloneNode(childElement, true);
                            $JssorUtils$.$InsertBefore(elmt, captionElement, childElement);
                            $JssorUtils$.$RemoveChild(elmt, childElement);
                            childElement = captionElement;

                            fresh = true;
                        }
                    }
                    else if (!_ContentRefreshed && !level && !_ImageItem && $JssorUtils$.$GetAttributeEx(childElement, "u") == "image") {
                        _ImageItem = childElement;

                        if (_ImageItem) {
                            if (_ImageItem.tagName == "A") {
                                _LinkItemOrigin = _ImageItem;
                                $JssorUtils$.$SetStyles(_LinkItemOrigin, _StyleDef);

                                _LinkItem = $JssorUtils$.$CloneNode(_ImageItem, false);
                                //cancel click event on <A> element when a drag of slide succeeded
                                $JssorUtils$.$AddEvent(_LinkItem, "click", LinkClickEventHandler);

                                $JssorUtils$.$SetStyles(_LinkItem, _StyleDef);
                                $JssorUtils$.$CssDisplay(_LinkItem, "block");
                                $JssorUtils$.$CssOpacity(_LinkItem, 0);
                                $JssorUtils$.$Css(_LinkItem, "backgroundColor", "#000");

                                _ImageItem = $JssorUtils$.$FindFirstChildByTag(_ImageItem, "IMG");

                                $JssorDebug$.$Execute(function () {
                                    if (!_ImageItem) {
                                        $JssorDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n" + elmt.outerHTML);
                                    }
                                });
                            }
                            _ImageItem.border = 0;

                            $JssorUtils$.$SetStyles(_ImageItem, _StyleDef);
                        }
                    }

                    RefreshContent(childElement, fresh, level + 1);
                });
            }

            _SelfSlideItem.$OnInnerOffsetChange = function (oldOffset, newOffset) {
                var slidePosition = _DisplayPieces - newOffset;

                SetPosition(_Wrapper, slidePosition);

                //following lines are for future usage, not ready yet
                //if (!_IsDragging || !_IsCaptionSliderPlayingWhenDragStart) {
                //    var _DealWithParallax;
                //    if (IsCurrentSlideIndex(slideIndex)) {
                //        if (_CaptionSliderOptions.$PlayOutMode == 2)
                //            _DealWithParallax = true;
                //    }
                //    else {
                //        if (!_CaptionSliderOptions.$PlayInMode) {
                //            //PlayInMode: 0 none
                //            _CaptionSliderIn.$GoToEnd();
                //        }
                //        //else if (_CaptionSliderOptions.$PlayInMode == 1) {
                //        //    //PlayInMode: 1 chain
                //        //    _CaptionSliderIn.$GoToBegin();
                //        //}
                //        else if (_CaptionSliderOptions.$PlayInMode == 2) {
                //            //PlayInMode: 2 parallel
                //            _DealWithParallax = true;
                //        }
                //    }

                //    if (_DealWithParallax) {
                //        _CaptionSliderIn.$GoToPosition((_CaptionSliderIn.$GetPosition_OuterEnd() - _CaptionSliderIn.$GetPosition_OuterBegin()) * Math.abs(newOffset - 1) * .8 + _CaptionSliderIn.$GetPosition_OuterBegin());
                //    }
                //}
            };

            _SelfSlideItem.$GetCaptionSliderIn = function () {
                return _CaptionSliderIn;
            };

            _SelfSlideItem.$GetCaptionSliderOut = function () {
                return _CaptionSliderOut;
            };

            _SelfSlideItem.$Index = slideIndex;

            $JssorEventManager$.call(_SelfSlideItem);

            //SlideItem Constructor
            {

                var thumb = $JssorUtils$.$FindFirstChildByAttribute(slideElmt, "thumb");
                if (thumb) {
                    _SelfSlideItem.$Thumb = $JssorUtils$.$CloneNode(thumb, true);
                    $JssorUtils$.$RemoveAttribute(thumb, "id");
                    $JssorUtils$.$HideElement(thumb);
                }
                $JssorUtils$.$ShowElement(slideElmt);

                _LoadingScreen = $JssorUtils$.$CloneNode(_LoadingContainer, true);
                $JssorUtils$.$CssZIndex(_LoadingScreen, 1000);

                //cancel click event on <A> element when a drag of slide succeeded
                $JssorUtils$.$AddEvent(slideElmt, "click", LinkClickEventHandler);

                ResetCaptionSlider(true);

                _SelfSlideItem.$Image = _ImageItem;
                _SelfSlideItem.$Link = _LinkItem;

                _SelfSlideItem.$Item = slideElmt;

                _SelfSlideItem.$Wrapper = _Wrapper = slideElmt;
                $JssorUtils$.$AppendChild(_Wrapper, _LoadingScreen);

                _SelfSlider.$On(203, ParkEventHandler);
                _SelfSlider.$On(28, FreezeEventHandler);
                _SelfSlider.$On(24, SwipeStartEventHandler);

                $JssorDebug$.$Execute(function () {
                    _SequenceNumber = _SlideItemCreatedCount++;
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_Wrapper, "debug-id", "slide-" + slideIndex);
                });
            }
        }
        //SlideItem

        //Processor
        function Processor(slideIndex, slideshowProcessor, captionSliderIn, captionSliderOut) {

            var _SelfProcessor = this;

            var _ProgressBegin = 0;
            var _SlideshowBegin = 0;
            var _SlideshowEnd;
            var _CaptionInBegin;
            var _IdleBegin;
            var _IdleEnd;
            var _ProgressEnd;

            var _IsSlideshowRunning;
            var _IsRollingBack;

            var _PlayerInstance;
            var _IsPlayerOnService;

            var slideItem = _SlideItems[slideIndex];

            $JssorAnimator$.call(_SelfProcessor, 0, 0);

            function UpdateLink() {

                $JssorUtils$.$ClearChildren(_LinkContainer);

                if (_ShowLink && _IsSlideshowRunning && slideItem.$Link) {
                    $JssorUtils$.$AppendChild(_LinkContainer, slideItem.$Link);
                }

                $JssorUtils$.$ShowElement(_LinkContainer, _IsSlideshowRunning || !slideItem.$Image);
            }

            function ProcessCompleteEventHandler() {

                if (_IsRollingBack) {
                    _IsRollingBack = false;
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_ROLLBACK_END, slideIndex, _IdleEnd, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                    _SelfProcessor.$GoToPosition(_IdleBegin);
                }

                _SelfProcessor.$Replay();
            }

            function PlayerSwitchEventHandler(isOnService) {
                _IsPlayerOnService = isOnService;

                _SelfProcessor.$Stop();
                _SelfProcessor.$Replay();
            }

            _SelfProcessor.$Replay = function () {

                var currentPosition = _SelfProcessor.$GetPosition_Display();

                if (!_IsDragging && !_IsSliding && !_IsPlayerOnService && _CurrentSlideIndex == slideIndex) {

                    if (!currentPosition) {
                        if (_SlideshowEnd && !_IsSlideshowRunning) {
                            _IsSlideshowRunning = true;

                            _SelfProcessor.$OpenSlideshowPanel(true);

                            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SLIDESHOW_START, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                        }

                        UpdateLink();
                    }

                    var toPosition;
                    var stateEvent = JssorSlider.$EVT_STATE_CHANGE;

                    if (currentPosition != _ProgressEnd) {
                        if (currentPosition == _IdleEnd) {
                            toPosition = _ProgressEnd;
                        }
                        else if (currentPosition == _IdleBegin) {
                            toPosition = _IdleEnd;
                        }
                        else if (!currentPosition) {
                            toPosition = _IdleBegin;
                        }
                        else if (currentPosition > _IdleEnd) {
                            _IsRollingBack = true;
                            toPosition = _IdleEnd;
                            stateEvent = JssorSlider.$EVT_ROLLBACK_START;
                        }
                        else {
                            //continue from break (by drag or lock)
                            toPosition = _SelfProcessor.$GetPlayToPosition();
                        }
                    }

                    _SelfSlider.$TriggerEvent(stateEvent, slideIndex, currentPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);

                    var allowAutoPlay = _AutoPlay && (!_HoverToPause || _HoverStatus);

                    if (currentPosition == _ProgressEnd) {
                        allowAutoPlay && slideItem.$GoForNextSlide();
                    }
                    else if (allowAutoPlay || currentPosition != _IdleEnd) {
                        _SelfProcessor.$PlayToPosition(toPosition, ProcessCompleteEventHandler);
                    }
                }
            };

            _SelfProcessor.$AdjustIdleOnPark = function () {
                if (_IdleEnd == _ProgressEnd && _IdleEnd == _SelfProcessor.$GetPosition_Display())
                    _SelfProcessor.$GoToPosition(_IdleBegin);
            };

            _SelfProcessor.$Abort = function () {
                _SlideshowRunner && _SlideshowRunner.$Index == slideIndex && _SlideshowRunner.$Clear();

                var currentPosition = _SelfProcessor.$GetPosition_Display();
                if (currentPosition < _ProgressEnd) {
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_STATE_CHANGE, slideIndex, -currentPosition -1, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                }
            };

            _SelfProcessor.$OpenSlideshowPanel = function (open) {
                if (slideshowProcessor) {
                    $JssorUtils$.$CssOverflow(_SlideshowPanel, open && slideshowProcessor.$Transition.$Outside ? "" : "hidden");
                }
            };

            _SelfProcessor.$OnInnerOffsetChange = function (oldPosition, newPosition) {

                if (_IsSlideshowRunning && newPosition >= _SlideshowEnd) {
                    _IsSlideshowRunning = false;
                    UpdateLink();
                    slideItem.$UnhideContentForSlideshow();
                    _SlideshowRunner.$Clear();

                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SLIDESHOW_END, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                }

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_PROGRESS_CHANGE, slideIndex, newPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
            };

            _SelfProcessor.$SetPlayer = function (playerInstance) {
                if (playerInstance && !_PlayerInstance) {
                    _PlayerInstance = playerInstance;

                    playerInstance.$On($JssorPlayer$.$EVT_SWITCH, PlayerSwitchEventHandler);
                }
            };

            //Processor Constructor
            {
                if (slideshowProcessor) {
                    _SelfProcessor.$Chain(slideshowProcessor);
                }

                _SlideshowEnd = _SelfProcessor.$GetPosition_OuterEnd();
                _CaptionInBegin = _SelfProcessor.$GetPosition_OuterEnd();
                _SelfProcessor.$Chain(captionSliderIn);
                _IdleBegin = captionSliderIn.$GetPosition_OuterEnd();
                _IdleEnd = _IdleBegin + _Options.$AutoPlayInterval;

                captionSliderOut.$Shift(_IdleEnd);
                _SelfProcessor.$Combine(captionSliderOut);
                _ProgressEnd = _SelfProcessor.$GetPosition_OuterEnd();
            }
        }
        //Processor
        //private classes

        function SetPosition(elmt, position) {
            var orientation = _DragOrientation > 0 ? _DragOrientation : _PlayOrientation;
            var x = _StepLengthX * position * (orientation & 1);
            var y = _StepLengthY * position * ((orientation >> 1) & 1);

            if ($JssorUtils$.$IsBrowserChrome()) {
                x = x.toFixed(3);
                y = y.toFixed(3);
            }
            else {
                x = Math.round(x);
                y = Math.round(y);
            }

            if ($JssorUtils$.$IsBrowserIE() && $JssorUtils$.$GetBrowserVersion() >= 10 && $JssorUtils$.$GetBrowserVersion() < 11) {
                elmt.style.msTransform = "translate(" + x + "px, " + y + "px)";
            }
            else if ($JssorUtils$.$IsBrowserChrome() && $JssorUtils$.$GetBrowserVersion() >= 30 && $JssorUtils$.$GetBrowserVersion() < 34) {
                elmt.style.WebkitTransition = "transform 0s";
                elmt.style.WebkitTransform = "translate3d(" + x + "px, " + y + "px, 0px) perspective(2000px)";
            }
            else {
                $JssorUtils$.$CssLeft(elmt, x);
                $JssorUtils$.$CssTop(elmt, y);
            }
        }

        //Event handling begin

        function OnMouseDown(event) {
            var tagName = $JssorUtils$.$GetEventSrcElement(event).tagName;
            if (!_DragOrientationRegistered && tagName != "INPUT" && tagName != "TEXTAREA" && RegisterDrag()) {
                OnDragStart(event);
            }
        }

        function Freeze() {

            _CarouselPlaying_OnFreeze = _IsSliding;
            _PlayToPosition_OnFreeze = _CarouselPlayer.$GetPlayToPosition();
            _Position_OnFreeze = _Conveyor.$GetPosition();

            if (_IsDragging || !_HoverStatus && (_HoverToPause & 12)) {
                _CarouselPlayer.$Stop();

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_FREEZE);
            }
        }

        function Unfreeze(byDrag) {

            if (!_IsDragging && (_HoverStatus || !(_HoverToPause & 12)) && !_CarouselPlayer.$IsPlaying()) {

                var currentPosition = _Conveyor.$GetPosition();
                var toPosition = Math.ceil(_Position_OnFreeze);

                if (byDrag && Math.abs(_DragOffsetTotal) >= _Options.$MinDragOffsetToSlide) {
                    toPosition = Math.ceil(currentPosition);
                    toPosition += _DragIndexAdjust;
                }

                if (!(_Loop & 1)) {
                    toPosition = Math.min(_SlideCount - _DisplayPieces, Math.max(toPosition, 0));
                }

                var t = Math.abs(toPosition - currentPosition);
                t = 1 - Math.pow(1 - t, 5);

                if (!_LastDragSucceded && _CarouselPlaying_OnFreeze) {
                    _CarouselPlayer.$Continue(_PlayToPosition_OnFreeze);
                }
                else if (currentPosition == toPosition) {
                    _CurrentSlideItem.$EnablePlayer();
                    _CurrentSlideItem.$TryActivate();
                }
                else {

                    _CarouselPlayer.$PlayCarousel(currentPosition, toPosition, t * _SlideDuration);
                }
            }
        }

        function OnDragStart(event) {

            _IsDragging = true;
            _DragInvalid = false;
            _LoadingTicket = null;

            $JssorUtils$.$AddEvent(document, _MoveEvent, OnDragMove);

            _LastTimeMoveByDrag = $JssorUtils$.$GetNow() - 50;

            _LastDragSucceded = 0;
            Freeze();

            if (!_CarouselPlaying_OnFreeze)
                _DragOrientation = 0;

            if (_HandleTouchEventOnly) {
                var touchPoint = event.touches[0];
                _DragStartMouseX = touchPoint.clientX;
                _DragStartMouseY = touchPoint.clientY;
            }
            else {
                var mousePoint = $JssorUtils$.$GetMousePosition(event);

                _DragStartMouseX = mousePoint.x;
                _DragStartMouseY = mousePoint.y;

                $JssorUtils$.$CancelEvent(event);
            }

            _DragOffsetTotal = 0;
            _DragOffsetLastTime = 0;
            _DragIndexAdjust = 0;

            //Trigger EVT_DRAGSTART
            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_DRAG_START, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);
        }

        function OnDragMove(event) {
            if (_IsDragging && (!$JssorUtils$.$IsBrowserIe9Earlier() || event.button)) {
                var actionPoint;

                if (_HandleTouchEventOnly) {
                    var touches = event.touches;
                    if (touches && touches.length > 0) {
                        actionPoint = new $JssorPoint$(touches[0].clientX, touches[0].clientY);
                    }
                }
                else {
                    actionPoint = $JssorUtils$.$GetMousePosition(event);
                }

                if (actionPoint) {
                    var distanceX = actionPoint.x - _DragStartMouseX;
                    var distanceY = actionPoint.y - _DragStartMouseY;


                    if (Math.floor(_Position_OnFreeze) != _Position_OnFreeze)
                        _DragOrientation = _DragOrientation || (_PlayOrientation & _DragOrientationRegistered);

                    if ((distanceX || distanceY) && !_DragOrientation) {
                        if (_DragOrientationRegistered == 3) {
                            if (Math.abs(distanceY) > Math.abs(distanceX)) {
                                _DragOrientation = 2;
                            }
                            else
                                _DragOrientation = 1;
                        }
                        else {
                            _DragOrientation = _DragOrientationRegistered;
                        }

                        if (_HandleTouchEventOnly && _DragOrientation == 1 && Math.abs(distanceY) - Math.abs(distanceX) > 3) {
                            _DragInvalid = true;
                        }
                    }

                    if (_DragOrientation) {
                        var distance = distanceY;
                        var stepLength = _StepLengthY;

                        if (_DragOrientation == 1) {
                            distance = distanceX;
                            stepLength = _StepLengthX;
                        }

                        if (!(_Loop & 1)) {
                            if (distance > 0) {
                                var normalDistance = stepLength * _CurrentSlideIndex;
                                var sqrtDistance = distance - normalDistance;
                                if (sqrtDistance > 0) {
                                    distance = normalDistance + Math.sqrt(sqrtDistance) * 5;
                                }
                            }

                            if (distance < 0) {
                                var normalDistance = stepLength * (_SlideCount - _DisplayPieces - _CurrentSlideIndex);
                                var sqrtDistance = -distance - normalDistance;

                                if (sqrtDistance > 0) {
                                    distance = -normalDistance - Math.sqrt(sqrtDistance) * 5;
                                }
                            }
                        }

                        if (_DragOffsetTotal - _DragOffsetLastTime < -2) {
                            _DragIndexAdjust = 0;
                        }
                        else if (_DragOffsetTotal - _DragOffsetLastTime > 2) {
                            _DragIndexAdjust = -1;
                        }

                        _DragOffsetLastTime = _DragOffsetTotal;
                        _DragOffsetTotal = distance;
                        _PositionToGoByDrag = _Position_OnFreeze - _DragOffsetTotal / stepLength / (_ScaleRatio || 1);

                        if (_DragOffsetTotal && _DragOrientation && !_DragInvalid) {
                            $JssorUtils$.$CancelEvent(event);
                            if (!_IsSliding) {
                                _CarouselPlayer.$StandBy(_PositionToGoByDrag);
                            }
                            else
                                _CarouselPlayer.$SetStandByPosition(_PositionToGoByDrag);
                        }
                        else if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                            $JssorUtils$.$CancelEvent(event);
                        }
                    }
                }
            }
            else {
                OnDragEnd(event);
            }
        }

        function OnDragEnd(event) {
            UnregisterDrag();

            if (_IsDragging) {

                _IsDragging = false;

                _LastTimeMoveByDrag = $JssorUtils$.$GetNow();

                $JssorUtils$.$RemoveEvent(document, _MoveEvent, OnDragMove);

                _LastDragSucceded = _DragOffsetTotal;

                _LastDragSucceded && $JssorUtils$.$CancelEvent(event);

                _CarouselPlayer.$Stop();

                var currentPosition = _Conveyor.$GetPosition();

                //Trigger EVT_DRAG_END
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_DRAG_END, GetRealIndex(currentPosition), currentPosition, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);

                Unfreeze(true);

                Freeze();
            }
        }
        //Event handling end

        function SetCurrentSlideIndex(index) {
            _PrevSlideItem = _SlideItems[_CurrentSlideIndex];
            _PreviousSlideIndex = _CurrentSlideIndex;
            _CurrentSlideIndex = GetRealIndex(index);
            _CurrentSlideItem = _SlideItems[_CurrentSlideIndex];
            ResetNavigator(index);
            return _CurrentSlideIndex;
        }

        function OnPark(slideIndex, prevIndex) {
            _DragOrientation = 0;

            SetCurrentSlideIndex(slideIndex);

            //Trigger EVT_PARK
            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_PARK, GetRealIndex(slideIndex), prevIndex);
        }

        function ResetNavigator(index, temp) {
            _TempSlideIndex = index;
            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$SetCurrentIndex(GetRealIndex(index), index, temp);
            });
        }

        function RegisterDrag() {
            var dragRegistry = JssorSlider.$DragRegistry || 0;
            var dragOrientation = _DragEnabled;
            if (_HandleTouchEventOnly)
                (dragOrientation & 1) && (dragOrientation &= 1);
            JssorSlider.$DragRegistry |= dragOrientation;

            return (_DragOrientationRegistered = dragOrientation & ~dragRegistry);
        }

        function UnregisterDrag() {
            if (_DragOrientationRegistered) {
                JssorSlider.$DragRegistry &= ~_DragEnabled;
                _DragOrientationRegistered = 0;
            }
        }

        function CreatePanel() {
            var div = $JssorUtils$.$CreateDivElement();

            $JssorUtils$.$SetStyles(div, _StyleDef);
            $JssorUtils$.$CssPosition(div, "absolute");

            return div;
        }

        function GetRealIndex(index) {
            return (index % _SlideCount + _SlideCount) % _SlideCount;
        }

        function IsCurrentSlideIndex(index) {
            return GetRealIndex(index) == _CurrentSlideIndex;
        }

        function IsPreviousSlideIndex(index) {
            return GetRealIndex(index) == _PreviousSlideIndex;
        }

        //Navigation Request Handler
        function NavigationClickHandler(index, relative) {
            if (relative) {
                if (!_Loop) {
                    //Stop at threshold
                    index = Math.min(Math.max(index + _TempSlideIndex, 0), _SlideCount - _DisplayPieces);
                    relative = false;
                }
                else if (_Loop & 2) {
                    //Rewind
                    index = GetRealIndex(index + _TempSlideIndex);
                    relative = false;
                }
            }
            PlayTo(index, _Options.$SlideDuration, relative);
        }

        function ShowNavigators() {
            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Show(navigator.$Options.$ChanceToShow > _HoverStatus);
            });
        }

        function MainContainerMouseLeaveEventHandler() {
            if (!_HoverStatus) {

                //$JssorDebug$.$Log("mouseleave");

                _HoverStatus = 1;

                ShowNavigators();

                if (!_IsDragging) {
                    (_HoverToPause & 12) && Unfreeze();
                    (_HoverToPause & 3) && _SlideItems[_CurrentSlideIndex].$TryActivate();
                }
            }
        }

        function MainContainerMouseEnterEventHandler() {

            if (_HoverStatus) {

                //$JssorDebug$.$Log("mouseenter");

                _HoverStatus = 0;

                ShowNavigators();

                _IsDragging || !(_HoverToPause & 12) || Freeze();
            }
        }

        function AdjustSlidesContainerSize() {
            _StyleDef = { $Width: _SlideWidth, $Height: _SlideHeight, $Top: 0, $Left: 0 };

            $JssorUtils$.$Each(_SlideElmts, function (slideElmt, i) {

                $JssorUtils$.$SetStyles(slideElmt, _StyleDef);
                $JssorUtils$.$CssPosition(slideElmt, "absolute");
                $JssorUtils$.$CssOverflow(slideElmt, "hidden");

                $JssorUtils$.$HideElement(slideElmt);
            });

            $JssorUtils$.$SetStyles(_LoadingContainer, _StyleDef);
        }

        function PlayToOffset(offset, slideDuration) {
            PlayTo(offset, slideDuration, true);
        }

        function PlayTo(slideIndex, slideDuration, relative) {
            ///	<summary>
            ///		PlayTo( slideIndex [, slideDuration] ); //Play slider to position 'slideIndex' within a period calculated base on 'slideDuration'.
            ///	</summary>
            ///	<param name="slideIndex" type="Number">
            ///		slide slideIndex or position will be playing to
            ///	</param>
            ///	<param name="slideDuration" type="Number" optional="true">
            ///		base slide duration in milliseconds to calculate the whole duration to complete this play request.
            ///	    default value is '$SlideDuration' value which is specified when initialize the slider.
            ///	</param>
            /// http://msdn.microsoft.com/en-us/library/vstudio/bb385682.aspx
            /// http://msdn.microsoft.com/en-us/library/vstudio/hh542720.aspx
            if (_CarouselEnabled && (!_IsDragging || _Options.$NaviQuitDrag)) {
                _IsSliding = true;
                _IsDragging = false;
                _CarouselPlayer.$Stop();

                {
                    //Slide Duration
                    if ($JssorUtils$.$IsUndefined(slideDuration))
                        slideDuration = _SlideDuration;

                    var positionDisplay = _Carousel.$GetPosition_Display();
                    var positionTo = slideIndex;
                    if (relative) {
                        positionTo = positionDisplay + slideIndex;
                        if (slideIndex > 0)
                            positionTo = Math.ceil(positionTo);
                        else
                            positionTo = Math.floor(positionTo);
                    }


                    if (!(_Loop & 1)) {
                        positionTo = GetRealIndex(positionTo);
                        positionTo = Math.max(0, Math.min(positionTo, _SlideCount - _DisplayPieces));
                    }

                    var positionOffset = (positionTo - positionDisplay) % _SlideCount;
                    positionTo = positionDisplay + positionOffset;

                    var duration = positionDisplay == positionTo ? 0 : slideDuration * Math.abs(positionOffset);
                    duration = Math.min(duration, slideDuration * _DisplayPieces * 1.5);

                    _CarouselPlayer.$PlayCarousel(positionDisplay, positionTo, duration || 1);
                }
            }
        }

        //private functions

        //member functions

        _SelfSlider.$PlayTo = PlayTo;

        _SelfSlider.$GoTo = function (slideIndex) {
            ///	<summary>
            ///		instance.$GoTo( slideIndex );   //Go to the specifed slide immediately with no play.
            ///	</summary>
            PlayTo(slideIndex, 1);
        };

        _SelfSlider.$Next = function () {
            ///	<summary>
            ///		instance.$Next();   //Play the slider to next slide.
            ///	</summary>
            PlayToOffset(1);
        };

        _SelfSlider.$Prev = function () {
            ///	<summary>
            ///		instance.$Prev();   //Play the slider to previous slide.
            ///	</summary>
            PlayToOffset(-1);
        };

        _SelfSlider.$Pause = function () {
            ///	<summary>
            ///		instance.$Pause();   //Pause the slider, prevent it from auto playing.
            ///	</summary>
            _AutoPlay = false;
        };

        _SelfSlider.$Play = function () {
            ///	<summary>
            ///		instance.$Play();   //Start auto play if the slider is currently paused.
            ///	</summary>
            if (!_AutoPlay) {
                _AutoPlay = true;
                _SlideItems[_CurrentSlideIndex] && _SlideItems[_CurrentSlideIndex].$TryActivate();
            }
        };

        _SelfSlider.$SetSlideshowTransitions = function (transitions) {
            ///	<summary>
            ///		instance.$SetSlideshowTransitions( transitions );   //Reset slideshow transitions for the slider.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!transitions || !transitions.length) {
                    $JssorDebug$.$Error("Can not set slideshow transitions, no transitions specified.");
                }
            });

            $JssorUtils$.$TranslateTransitions(transitions);    //for old transition compatibility
            _Options.$SlideshowOptions.$Transitions = transitions;
        };

        _SelfSlider.$SetCaptionTransitions = function (transitions) {
            ///	<summary>
            ///		instance.$SetCaptionTransitions( transitions );   //Reset caption transitions for the slider.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!transitions || !transitions.length) {
                    $JssorDebug$.$Error("Can not set caption transitions, no transitions specified");
                }
            });

            $JssorUtils$.$TranslateTransitions(transitions);    //for old transition compatibility
            _CaptionSliderOptions.$CaptionTransitions = transitions;
            _CaptionSliderOptions.$Version = $JssorUtils$.$GetNow();
        };

        _SelfSlider.$SlidesCount = function () {
            ///	<summary>
            ///		instance.$SlidesCount();   //Retrieve slides count of the slider.
            ///	</summary>
            return _SlideElmts.length;
        };

        _SelfSlider.$CurrentIndex = function () {
            ///	<summary>
            ///		instance.$CurrentIndex();   //Retrieve current slide index of the slider.
            ///	</summary>
            return _CurrentSlideIndex;
        };

        _SelfSlider.$IsAutoPlaying = function () {
            ///	<summary>
            ///		instance.$IsAutoPlaying();   //Retrieve auto play status of the slider.
            ///	</summary>
            return _AutoPlay;
        };

        _SelfSlider.$IsDragging = function () {
            ///	<summary>
            ///		instance.$IsDragging();   //Retrieve drag status of the slider.
            ///	</summary>
            return _IsDragging;
        };

        _SelfSlider.$IsSliding = function () {
            ///	<summary>
            ///		instance.$IsSliding();   //Retrieve right<-->left sliding status of the slider.
            ///	</summary>
            return _IsSliding;
        };

        _SelfSlider.$IsMouseOver = function () {
            ///	<summary>
            ///		instance.$IsMouseOver();   //Retrieve mouse over status of the slider.
            ///	</summary>
            return !_HoverStatus;
        };

        _SelfSlider.$LastDragSucceded = function () {
            ///	<summary>
            ///		instance.$IsLastDragSucceded();   //Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
            ///	</summary>
            return _LastDragSucceded;
        };

        _SelfSlider.$GetOriginalWidth = function () {
            ///	<summary>
            ///		instance.$GetOriginalWidth();   //Retrieve original width of the slider.
            ///	</summary>
            return $JssorUtils$.$CssWidth(_ScaleWrapper || elmt);
        };

        _SelfSlider.$GetOriginalHeight = function () {
            ///	<summary>
            ///		instance.$GetOriginalWidth();   //Retrieve original height of the slider.
            ///	</summary>
            return $JssorUtils$.$CssHeight(_ScaleWrapper || elmt);
        };

        _SelfSlider.$GetScaleWidth = function () {
            ///	<summary>
            ///		instance.$GetScaleWidth();   //Retrieve scaled width the slider currently displays.
            ///	</summary>
            return $JssorUtils$.$CssWidth(elmt);
        };

        _SelfSlider.$GetScaleHeight = function () {
            ///	<summary>
            ///		instance.$GetScaleHeight();   //Retrieve scaled height the slider currently displays.
            ///	</summary>
            return $JssorUtils$.$CssHeight(elmt);
        };

        _SelfSlider.$SetScaleWidth = function (width) {
            ///	<summary>
            ///		instance.$SetScaleWidth( width );   //Scale the slider to new width and keep aspect ratio.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!width || width < 0) {
                    $JssorDebug$.$Fail("'$SetScaleWidth' error, 'width' should be positive value.");
                }
            });

            if (!_ScaleWrapper) {
                $JssorDebug$.$Execute(function () {
                    var originalWidthStr = $JssorUtils$.$Css(elmt, "width");
                    var originalHeightStr = $JssorUtils$.$Css(elmt, "height");
                    var originalWidth = $JssorUtils$.$CssP(elmt, "width");
                    var originalHeight = $JssorUtils$.$CssP(elmt, "height");

                    if (!originalWidthStr) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                    }

                    if (!originalHeightStr) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (originalWidthStr.indexOf('%') != -1) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                    }

                    if (originalHeightStr.indexOf('%') != -1) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (!originalWidth) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");
                    }

                    if (!originalHeight) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'");
                    }
                });

                //var innerWrapper = $JssorUtils$.$CloneNode(elmt, false);
                //$JssorUtils$.$RemoveAttribute(innerWrapper, "id");
                var innerWrapper = $JssorUtils$.$CreateDivElement(document);
                $JssorUtils$.$CssCssText(innerWrapper, $JssorUtils$.$CssCssText(elmt));
                $JssorUtils$.$SetClassName(innerWrapper, $JssorUtils$.$GetClassName(elmt));

                $JssorUtils$.$CssPosition(innerWrapper, "relative");
                $JssorUtils$.$CssTop(innerWrapper, 0);
                $JssorUtils$.$CssLeft(innerWrapper, 0);
                $JssorUtils$.$CssOverflow(innerWrapper, "visible");

                //_ScaleWrapper = $JssorUtils$.$CloneNode(elmt, false);
                //$JssorUtils$.$RemoveAttribute(_ScaleWrapper, "id");
                //$JssorUtils$.$CssCssText(_ScaleWrapper, "");
                _ScaleWrapper = $JssorUtils$.$CreateDivElement(document);

                $JssorUtils$.$CssPosition(_ScaleWrapper, "absolute");
                $JssorUtils$.$CssTop(_ScaleWrapper, 0);
                $JssorUtils$.$CssLeft(_ScaleWrapper, 0);
                $JssorUtils$.$CssWidth(_ScaleWrapper, $JssorUtils$.$CssWidth(elmt));
                $JssorUtils$.$CssHeight(_ScaleWrapper, $JssorUtils$.$CssHeight(elmt));
                $JssorUtils$.$SetStyleTransformOrigin(_ScaleWrapper, "0 0");

                $JssorUtils$.$AppendChild(_ScaleWrapper, innerWrapper);

                var children = $JssorUtils$.$GetChildren(elmt);
                $JssorUtils$.$AppendChild(elmt, _ScaleWrapper);

                $JssorUtils$.$Css(elmt, "backgroundImage", "");

                var noMoveElmts = {
                    "navigator": _BulletNavigatorOptions && _BulletNavigatorOptions.$Scale == false,
                    "arrowleft": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
                    "arrowright": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
                    "thumbnavigator": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false,
                    "thumbwrapper": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false
                };

                $JssorUtils$.$Each(children, function (child) {
                    $JssorUtils$.$AppendChild(noMoveElmts[$JssorUtils$.$GetAttributeEx(child, "u")] ? elmt : innerWrapper, child);
                });

                $JssorUtils$.$ShowElement(innerWrapper);
                $JssorUtils$.$ShowElement(_ScaleWrapper);
            }

            $JssorDebug$.$Execute(function () {
                if (!_InitialScrollWidth) {
                    _InitialScrollWidth = _SelfSlider.$Elmt.scrollWidth;
                }
            });

            _ScaleRatio = width / $JssorUtils$.$CssWidth(_ScaleWrapper);
            $JssorUtils$.$SetStyleScale(_ScaleWrapper, _ScaleRatio);

            $JssorUtils$.$CssWidth(elmt, width);
            $JssorUtils$.$CssHeight(elmt, _ScaleRatio * $JssorUtils$.$CssHeight(_ScaleWrapper));

            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Relocate();
            });
        };

        _SelfSlider.$GetVirtualIndex = function (index) {
            var parkingIndex = Math.ceil(GetRealIndex(_ParkingPosition / _StepLength));
            var displayIndex = GetRealIndex(index - _CurrentSlideIndex + parkingIndex);

            if (displayIndex > _DisplayPieces) {
                if (index - _CurrentSlideIndex > _SlideCount / 2)
                    index -= _SlideCount;
                else if (index - _CurrentSlideIndex <= -_SlideCount / 2)
                    index += _SlideCount;
            }
            else {
                index = _CurrentSlideIndex + displayIndex - parkingIndex;
            }

            return index;
        };

        //member functions

        //Inherit $JssorEventManager$
        $JssorEventManager$.call(this);

        //initialize member variables
        _SelfSlider.$Elmt = elmt = $JssorUtils$.$GetElement(elmt);
        //initialize member variables

        var _InitialScrollWidth;    //for debug only
        var _CaptionSliderCount = 1;    //for debug only

        $JssorDebug$.$Execute(function () {
            var outerContainerElmt = $JssorUtils$.$GetElement(elmt);
            if (!outerContainerElmt)
                $JssorDebug$.$Fail("Outer container '" + elmt + "' not found.");
        });

        var _Options = $JssorUtils$.$Extend({
            $FillMode: 0,                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            $LazyLoading: 1,                //[Optional] For image with  lazy loading format (<IMG src2="url" .../>), by default it will be loaded only when the slide comes.
            //But an integer value (maybe 0, 1, 2 or 3) indicates that how far of nearby slides should be loaded immediately as well, default value is 1.
            $StartIndex: 0,                 //[Optional] Index of slide to display when initialize, default value is 0
            $AutoPlay: false,               //[Optional] Whether to auto play, default value is false
            $Loop: 1,                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
            $HWA: true,                     //[Optional] Enable hardware acceleration or not, default value is true
            $NaviQuitDrag: true,
            $AutoPlaySteps: 1,              //[Optional] Steps to go of every play (this options applys only when slideshow disabled), default value is 1
            $AutoPlayInterval: 3000,        //[Optional] Interval to play next slide since the previous stopped if a slideshow is auto playing, default value is 3000
            $PauseOnHover: 1,               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $SlideDuration: 500,            //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 400
            $SlideEasing: $JssorEasing$.$EaseOutQuad,   //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
            $MinDragOffsetToSlide: 20,      //[Optional] Minimum drag offset that trigger slide, default value is 20
            $SlideSpacing: 0, 				//[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 1,              //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), default value is 1
            $ParkingPosition: 0,            //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1,               //[Optional] The way (0 parellel, 1 recursive, default value is recursive) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc.
            $PlayOrientation: 1,            //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1             //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 both, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $ArrowKeyNavigation: undefined,
                $SlideWidth: undefined,
                $SlideHeight: undefined,
                $SlideshowOptions: undefined,
                $CaptionSliderOptions: undefined,
                $BulletNavigatorOptions: undefined,
                $ArrowNavigatorOptions: undefined,
                $ThumbnailNavigatorOptions: undefined
            },
            _Options);
        });

        var _PlayOrientation = _Options.$PlayOrientation & 3;
        var _PlayReverse = (_Options.$PlayOrientation & 4) / -4 || 1;

        var _SlideshowOptions = _Options.$SlideshowOptions;
        var _CaptionSliderOptions = $JssorUtils$.$Extend({ $Class: $JssorCaptionSliderBase$, $PlayInMode: 1, $PlayOutMode: 1 }, _Options.$CaptionSliderOptions);
        $JssorUtils$.$TranslateTransitions(_CaptionSliderOptions.$CaptionTransitions); //for old transition compatibility
        var _BulletNavigatorOptions = _Options.$BulletNavigatorOptions;
        var _ArrowNavigatorOptions = _Options.$ArrowNavigatorOptions;
        var _ThumbnailNavigatorOptions = _Options.$ThumbnailNavigatorOptions;

        $JssorDebug$.$Execute(function () {
            if (_SlideshowOptions && !_SlideshowOptions.$Class) {
                $JssorDebug$.$Fail("Option $SlideshowOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_Options.$CaptionSliderOptions && !_Options.$CaptionSliderOptions.$Class) {
                $JssorDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_BulletNavigatorOptions && !_BulletNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_ArrowNavigatorOptions && !_ArrowNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.");
            }
        });

        var _UISearchMode = _Options.$UISearchMode;
        var _ScaleWrapper;
        var _SlidesContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "slides", null, _UISearchMode);
        var _LoadingContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "loading", null, _UISearchMode) || $JssorUtils$.$CreateDivElement(document);

        var _BulletNavigatorContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "navigator", null, _UISearchMode);

        var _ArrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, _UISearchMode);
        var _ArrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, _UISearchMode);

        var _ThumbnailNavigatorContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "thumbnavigator", null, _UISearchMode);

        $JssorDebug$.$Execute(function () {
            //if (_BulletNavigatorOptions && !_BulletNavigatorContainer) {
            //    throw new Error("$BulletNavigatorOptions specified but bullet navigator container (<div u=\"navigator\" ...) not defined.");
            //}
            if (_BulletNavigatorContainer && !_BulletNavigatorOptions) {
                throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");
            }

            //if (_ArrowNavigatorOptions) {
            //    if (!_ArrowLeft) {
            //        throw new Error("$ArrowNavigatorOptions specified, but arrowleft (<span u=\"arrowleft\" ...) not defined.");
            //    }

            //    if (!_ArrowRight) {
            //        throw new Error("$ArrowNavigatorOptions specified, but arrowright (<span u=\"arrowright\" ...) not defined.");
            //    }
            //}

            if ((_ArrowLeft || _ArrowRight) && !_ArrowNavigatorOptions) {
                throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");
            }

            //if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorContainer) {
            //    throw new Error("$ThumbnailNavigatorOptions specified, but thumbnail navigator container (<div u=\"thumbnavigator\" ...) not defined.");
            //}

            if (_ThumbnailNavigatorContainer && !_ThumbnailNavigatorOptions) {
                throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");
            }
        });

        var _SlidesContainerWidth = $JssorUtils$.$CssWidth(_SlidesContainer);
        var _SlidesContainerHeight = $JssorUtils$.$CssHeight(_SlidesContainer);

        $JssorDebug$.$Execute(function () {
            if (isNaN(_SlidesContainerWidth))
                $JssorDebug$.$Fail("Width of slides container wrong specification, it should be specified by inline style in pixels (like style='width: 600px;').");

            if ($JssorUtils$.$IsUndefined(_SlidesContainerWidth))
                $JssorDebug$.$Fail("Width of slides container not specified, it should be specified by inline style in pixels (like style='width: 600px;').");

            if (isNaN(_SlidesContainerHeight))
                $JssorDebug$.$Fail("Height of slides container wrong specification, it should be specified by inline style in pixels (like style='height: 300px;').");

            if ($JssorUtils$.$IsUndefined(_SlidesContainerHeight))
                $JssorDebug$.$Fail("Height of slides container not specified, it should be specified by inline style in pixels (like style='height: 300px;').");

            var slidesContainerOverflow = $JssorUtils$.$CssOverflow(_SlidesContainer);
            var slidesContainerOverflowX = $JssorUtils$.$Css(_SlidesContainer, "overflowX");
            var slidesContainerOverflowY = $JssorUtils$.$Css(_SlidesContainer, "overflowY");
            if (slidesContainerOverflow != "hidden" && (slidesContainerOverflowX != "hidden" || slidesContainerOverflowY != "hidden"))
                $JssorDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').");

            //var slidesContainerTop = $JssorUtils$.$CssTop(_SlidesContainer);
            //var slidesContainerLeft = $JssorUtils$.$CssLeft(_SlidesContainer);

            //if (isNaN(slidesContainerTop))
            //    $JssorDebug$.$Fail("Top of slides container wrong specification, it should be specified by inline style in pixels (like style='top: 0px;').");

            //if ($JssorUtils$.$IsUndefined(slidesContainerTop))
            //    $JssorDebug$.$Fail("Top of slides container not specified, it should be specified by inline style in pixels (like style='top: 0px;').");

            //if (isNaN(slidesContainerLeft))
            //    $JssorDebug$.$Fail("Left of slides container wrong specification, it should be specified by inline style in pixels (like style='left: 0px;').");

            //if ($JssorUtils$.$IsUndefined(slidesContainerLeft))
            //    $JssorDebug$.$Fail("Left of slides container not specified, it should be specified by inline style in pixels (like style='left: 0px;').");
        });

        $JssorDebug$.$Execute(function () {
            if (!$JssorUtils$.$IsNumeric(_Options.$DisplayPieces))
                $JssorDebug$.$Fail("Option $DisplayPieces error, it should be a numeric value and greater than or equal to 1.");

            if (_Options.$DisplayPieces < 1)
                $JssorDebug$.$Fail("Option $DisplayPieces error, it should be greater than or equal to 1.");

            if (_Options.$DisplayPieces > 1 && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
                $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $DisplayPieces is greater than 1.");

            if (!$JssorUtils$.$IsNumeric(_Options.$ParkingPosition))
                $JssorDebug$.$Fail("Option $ParkingPosition error, it should be a numeric value.");

            if (_Options.$ParkingPosition && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
                $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $ParkingPosition is not equal to 0.");
        });

        var _StyleDef;

        var _SlideElmts = [];

        {
            var slideElmts = $JssorUtils$.$GetChildren(_SlidesContainer);
            $JssorUtils$.$Each(slideElmts, function (slideElmt) {
                if (slideElmt.tagName == "DIV" && !$JssorUtils$.$GetAttributeEx(slideElmt, "u")) {
                    _SlideElmts.push(slideElmt);
                }
            });
        }

        $JssorDebug$.$Execute(function () {
            if (_SlideElmts.length < 1) {
                $JssorDebug$.$Error("Slides html code definition error, there must be at least 1 slide to initialize a slider.");
            }
        });

        var _SlideItemCreatedCount = 0; //for debug only
        var _SlideItemReleasedCount = 0;    //for debug only

        var _PreviousSlideIndex;
        var _CurrentSlideIndex = -1;
        var _TempSlideIndex;
        var _PrevSlideItem;
        var _CurrentSlideItem;
        var _SlideCount = _SlideElmts.length;

        var _SlideWidth = _Options.$SlideWidth || _SlidesContainerWidth;
        var _SlideHeight = _Options.$SlideHeight || _SlidesContainerHeight;

        var _SlideSpacing = _Options.$SlideSpacing;
        var _StepLengthX = _SlideWidth + _SlideSpacing;
        var _StepLengthY = _SlideHeight + _SlideSpacing;
        var _StepLength = (_PlayOrientation & 1) ? _StepLengthX : _StepLengthY;
        var _DisplayPieces = Math.min(_Options.$DisplayPieces, _SlideCount);

        var _SlideshowPanel;
        var _CurrentBoardIndex = 0;
        var _DragOrientation;
        var _DragOrientationRegistered;
        var _DragInvalid;

        var _HandleTouchEventOnly;

        var _Navigators = [];
        var _BulletNavigator;
        var _ArrowNavigator;
        var _ThumbnailNavigator;

        var _ShowLink;

        var _Frozen;
        var _AutoPlay;
        var _AutoPlaySteps = _Options.$AutoPlaySteps;
        var _HoverToPause = _Options.$PauseOnHover;
        var _AutoPlayInterval = _Options.$AutoPlayInterval;
        var _SlideDuration = _Options.$SlideDuration;

        var _SlideshowRunnerClass;
        var _TransitionsOrder;

        var _SlideshowEnabled;
        var _ParkingPosition;
        var _CarouselEnabled = _DisplayPieces < _SlideCount;
        var _Loop = _CarouselEnabled ? _Options.$Loop : 0;

        var _DragEnabled;
        var _LastDragSucceded;

        var _HoverStatus = 1;   //0 Hovering, 1 Not hovering

        //Variable Definition
        var _IsSliding;
        var _IsDragging;
        var _LoadingTicket;

        //The X position of mouse/touch when a drag start
        var _DragStartMouseX = 0;
        //The Y position of mouse/touch when a drag start
        var _DragStartMouseY = 0;
        var _DragOffsetTotal;
        var _DragOffsetLastTime;
        var _DragIndexAdjust;

        var _Carousel;
        var _Conveyor;
        var _Slideshow;
        var _CarouselPlayer;
        var _SlideContainer = new SlideContainer();
        var _ScaleRatio;

        //$JssorSlider$ Constructor
        {
            _AutoPlay = _Options.$AutoPlay;
            _SelfSlider.$Options = options;

            AdjustSlidesContainerSize();

            elmt["jssor-slider"] = true;

            //_SlideshowPanel = CreatePanel();
            //$JssorUtils$.$CssZIndex(elmt, $JssorUtils$.$CssZIndex(elmt));
            //$JssorUtils$.$CssLeft(_SlideshowPanel, $JssorUtils$.$CssLeft(_SlidesContainer));
            //$JssorUtils$.$CssZIndex(_SlidesContainer, $JssorUtils$.$CssZIndex(_SlidesContainer));
            //$JssorUtils$.$CssTop(_SlideshowPanel, $JssorUtils$.$CssTop(_SlidesContainer));
            $JssorUtils$.$CssZIndex(_SlidesContainer, $JssorUtils$.$CssZIndex(_SlidesContainer) || 0);
            $JssorUtils$.$CssPosition(_SlidesContainer, "absolute");
            _SlideshowPanel = $JssorUtils$.$CloneNode(_SlidesContainer);
            $JssorUtils$.$InsertBefore($JssorUtils$.$GetParentNode(_SlidesContainer), _SlideshowPanel, _SlidesContainer);

            if (_SlideshowOptions) {
                _ShowLink = _SlideshowOptions.$ShowLink;
                _SlideshowRunnerClass = _SlideshowOptions.$Class;

                $JssorDebug$.$Execute(function () {
                    if (!_SlideshowOptions.$Transitions || !_SlideshowOptions.$Transitions.length) {
                        $JssorDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.");
                    }
                });

                $JssorUtils$.$TranslateTransitions(_SlideshowOptions.$Transitions); //for old transition compatibility

                _SlideshowEnabled = _DisplayPieces == 1 && _SlideCount > 1 && _SlideshowRunnerClass && (!$JssorUtils$.$IsBrowserIE() || $JssorUtils$.$GetBrowserVersion() >= 8);
            }

            _ParkingPosition = (_SlideshowEnabled || _DisplayPieces >= _SlideCount || !(_Loop & 1)) ? 0 : _Options.$ParkingPosition;

            _DragEnabled = ((_DisplayPieces > 1 || _ParkingPosition) ? _PlayOrientation : -1) & _Options.$DragOrientation;

            //SlideBoard
            var _SlideboardElmt = _SlidesContainer;
            var _SlideItems = [];

            var _SlideshowRunner;
            var _LinkContainer;

            var _DownEvent = "mousedown";
            var _MoveEvent = "mousemove";
            var _UpEvent = "mouseup";
            var _CancelEvent;

            var _LastTimeMoveByDrag;
            var _Position_OnFreeze;
            var _CarouselPlaying_OnFreeze;
            var _PlayToPosition_OnFreeze;
            var _PositionToGoByDrag;

            //SlideBoard Constructor
            {

                if (window.navigator.msPointerEnabled) {

                    _DownEvent = "MSPointerDown";
                    _MoveEvent = "MSPointerMove";
                    _UpEvent = "MSPointerUp";
                    _CancelEvent = "MSPointerCancel";

                    if (_DragEnabled) {
                        var touchAction = "none";
                        if (_DragEnabled == 1) {
                            touchAction = "pan-y";
                        }
                        else if (_DragEnabled == 2) {
                            touchAction = "pan-x";
                        }

                        $JssorUtils$.$SetAttribute(_SlideboardElmt.style, "-ms-touch-action", touchAction);
                    }
                }
                else if ("ontouchstart" in window || "createTouch" in document) {
                    _HandleTouchEventOnly = true;

                    _DownEvent = "touchstart";
                    _MoveEvent = "touchmove";
                    _UpEvent = "touchend";
                    _CancelEvent = "touchcancel";
                }

                _Slideshow = new Slideshow();

                if (_SlideshowEnabled)
                    _SlideshowRunner = new _SlideshowRunnerClass(_SlideContainer, _SlideWidth, _SlideHeight, _SlideshowOptions, _HandleTouchEventOnly);

                $JssorUtils$.$AppendChild(_SlideshowPanel, _Slideshow.$Wrapper);
                $JssorUtils$.$CssOverflow(_SlidesContainer, "hidden");

                //link container
                {
                    _LinkContainer = CreatePanel();
                    $JssorUtils$.$Css(_LinkContainer, "backgroundColor", "#000");
                    $JssorUtils$.$CssOpacity(_LinkContainer, 0);
                    $JssorUtils$.$InsertBefore(_SlideboardElmt, _LinkContainer, _SlideboardElmt.firstChild);
                }

                for (var i = 0; i < _SlideElmts.length; i++) {
                    var slideElmt = _SlideElmts[i];
                    var slideItem = new SlideItem(slideElmt, i);
                    _SlideItems.push(slideItem);
                }

                $JssorUtils$.$HideElement(_LoadingContainer);

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_LoadingContainer, "debug-id", "loading-container");
                });

                _Carousel = new Carousel()
                _CarouselPlayer = new CarouselPlayer(_Carousel, _Slideshow);

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_SlideboardElmt, "debug-id", "slide-board");
                });

                if (_DragEnabled) {
                    $JssorUtils$.$AddEvent(_SlidesContainer, _DownEvent, OnMouseDown);
                    $JssorUtils$.$AddEvent(document, _UpEvent, OnDragEnd);
                    _CancelEvent && $JssorUtils$.$AddEvent(document, _CancelEvent, OnDragEnd);
                }
            }
            //SlideBoard

            _HoverToPause &= (_HandleTouchEventOnly ? 10 : 5);

            //Bullet Navigator
            if (_BulletNavigatorContainer && _BulletNavigatorOptions) {
                _BulletNavigator = new _BulletNavigatorOptions.$Class(_BulletNavigatorContainer, _BulletNavigatorOptions);
                _Navigators.push(_BulletNavigator);
            }

            //Arrow Navigator
            if (_ArrowNavigatorOptions && _ArrowLeft && _ArrowRight) {
                _ArrowNavigator = new _ArrowNavigatorOptions.$Class(_ArrowLeft, _ArrowRight, _ArrowNavigatorOptions);
                _Navigators.push(_ArrowNavigator);
            }

            //Thumbnail Navigator
            if (_ThumbnailNavigatorContainer && _ThumbnailNavigatorOptions) {
                _ThumbnailNavigatorOptions.$StartIndex = _Options.$StartIndex;
                _ThumbnailNavigator = new _ThumbnailNavigatorOptions.$Class(_ThumbnailNavigatorContainer, _ThumbnailNavigatorOptions);
                _Navigators.push(_ThumbnailNavigator);
            }

            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Reset(_SlideCount, _SlideItems, _LoadingContainer);
                navigator.$On($JssorNavigatorEvents$.$NAVIGATIONREQUEST, NavigationClickHandler);
            });

            _SelfSlider.$SetScaleWidth(_SelfSlider.$GetOriginalWidth());

            $JssorUtils$.$AddEvent(elmt, "mouseout", $JssorUtils$.$MouseOverOutFilter(MainContainerMouseLeaveEventHandler, elmt));
            $JssorUtils$.$AddEvent(elmt, "mouseover", $JssorUtils$.$MouseOverOutFilter(MainContainerMouseEnterEventHandler, elmt));

            ShowNavigators();

            //Keyboard Navigation
            if (_Options.$ArrowKeyNavigation) {
                $JssorUtils$.$AddEvent(document, "keydown", function (e) {
                    if (e.keyCode == $JssorKeyCode$.$LEFT) {
                        //Arrow Left
                        PlayToOffset(-1);
                    }
                    else if (e.keyCode == $JssorKeyCode$.$RIGHT) {
                        //Arrow Right
                        PlayToOffset(1);
                    }
                });
            }

            var startPosition = _Options.$StartIndex;
            if (!(_Loop & 1)) {
                startPosition = Math.max(0, Math.min(startPosition, _SlideCount - _DisplayPieces));
            }
            _CarouselPlayer.$PlayCarousel(startPosition, startPosition, 0);
        }
    }
    //Jssor Slider

    //JssorSlider.$ASSEMBLY_BOTTOM_LEFT = ASSEMBLY_BOTTOM_LEFT;
    //JssorSlider.$ASSEMBLY_BOTTOM_RIGHT = ASSEMBLY_BOTTOM_RIGHT;
    //JssorSlider.$ASSEMBLY_TOP_LEFT = ASSEMBLY_TOP_LEFT;
    //JssorSlider.$ASSEMBLY_TOP_RIGHT = ASSEMBLY_TOP_RIGHT;
    //JssorSlider.$ASSEMBLY_LEFT_TOP = ASSEMBLY_LEFT_TOP;
    //JssorSlider.$ASSEMBLY_LEFT_BOTTOM = ASSEMBLY_LEFT_BOTTOM;
    //JssorSlider.$ASSEMBLY_RIGHT_TOP = ASSEMBLY_RIGHT_TOP;
    //JssorSlider.$ASSEMBLY_RIGHT_BOTTOM = ASSEMBLY_RIGHT_BOTTOM;

    JssorSlider.$EVT_CLICK = 21;
    JssorSlider.$EVT_DRAG_START = 22;
    JssorSlider.$EVT_DRAG_END = 23;
    JssorSlider.$EVT_SWIPE_START = 24;
    JssorSlider.$EVT_SWIPE_END = 25;

    JssorSlider.$EVT_LOAD_START = 26;
    JssorSlider.$EVT_LOAD_END = 27;
    JssorSlider.$EVT_FREEZE = 28;

    JssorSlider.$EVT_POSITION_CHANGE = 202;
    JssorSlider.$EVT_PARK = 203;

    JssorSlider.$EVT_SLIDESHOW_START = 206;
    JssorSlider.$EVT_SLIDESHOW_END = 207;

    JssorSlider.$EVT_PROGRESS_CHANGE = 208;
    JssorSlider.$EVT_STATE_CHANGE = 209;
    JssorSlider.$EVT_ROLLBACK_START = 210;
    JssorSlider.$EVT_ROLLBACK_END = 211;

    window.$JssorSlider$ = $JssorSlider$ = JssorSlider;

    //(function ($) {
    //    jQuery.fn.jssorSlider = function (options) {
    //        return this.each(function () {
    //            return $(this).data('jssorSlider') || $(this).data('jssorSlider', new JssorSlider(this, options));
    //        });
    //    };
    //})(jQuery);

    //window.jQuery && (jQuery.fn.jssorSlider = function (options) {
    //    return this.each(function () {
    //        return jQuery(this).data('jssorSlider') || jQuery(this).data('jssorSlider', new JssorSlider(this, options));
    //    });
    //});
};

//$JssorBulletNavigator$
var $JssorNavigatorEvents$ = {
    $NAVIGATIONREQUEST: 1,
    $INDEXCHANGE: 2,
    $RESET: 3
};

var $JssorBulletNavigator$ = window.$JssorBulletNavigator$ = function (elmt, options) {
    var self = this;
    $JssorEventManager$.call(self);

    elmt = $JssorUtils$.$GetElement(elmt);

    var _Count;
    var _Length;
    var _Width;
    var _Height;
    var _CurrentIndex;
    var _CurrentInnerIndex = 0;
    var _Options;
    var _Steps;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _Orientation;
    var _ItemPrototype;
    var _PrototypeWidth;
    var _PrototypeHeight;

    var _ButtonElements = [];
    var _Buttons = [];

    function Highlight(index) {
        if (index != -1)
            _Buttons[index].$Activate(index == _CurrentInnerIndex);
    }

    function OnNavigationRequest(index) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, index * _Steps);
    }

    self.$Elmt = elmt;
    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index) {
        if (index != _CurrentIndex) {
            var lastInnerIndex = _CurrentInnerIndex;
            var innerIndex = Math.floor(index / _Steps);
            _CurrentInnerIndex = innerIndex;
            _CurrentIndex = index;

            Highlight(lastInnerIndex);
            Highlight(innerIndex);

            //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
        }
    };

    self.$Show = function (show) {
        $JssorUtils$.$ShowElement(elmt, show);
    };

    var _Located;
    self.$Relocate = function (force) {
        if (!_Located || _Options.$Scale == false) {
            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(elmt, ($JssorUtils$.$CssWidth($JssorUtils$.$GetParentNode(elmt)) - _Width) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(elmt, ($JssorUtils$.$CssHeight($JssorUtils$.$GetParentNode(elmt)) - _Height) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(length / _Steps);
            _CurrentInnerIndex = 0;

            var itemOffsetX = _PrototypeWidth + _SpacingX;
            var itemOffsetY = _PrototypeHeight + _SpacingY;

            var maxIndex = Math.ceil(_Count / _Lanes) - 1;

            _Width = _PrototypeWidth + itemOffsetX * (!_Orientation ? maxIndex : _Lanes - 1);
            _Height = _PrototypeHeight + itemOffsetY * (_Orientation ? maxIndex : _Lanes - 1);

            $JssorUtils$.$CssWidth(elmt, _Width);
            $JssorUtils$.$CssHeight(elmt, _Height);

            //self.$Relocate(true);

            for (var buttonIndex = 0; buttonIndex < _Count; buttonIndex++) {

                var numberDiv = $JssorUtils$.$CreateSpanElement();
                $JssorUtils$.$SetInnerText(numberDiv, buttonIndex + 1);

                var div = $JssorUtils$.$BuildElement(_ItemPrototype, "NumberTemplate", numberDiv, true);
                $JssorUtils$.$CssPosition(div, "absolute");

                var columnIndex = buttonIndex % (maxIndex + 1);
                $JssorUtils$.$CssLeft(div, !_Orientation ? itemOffsetX * columnIndex : buttonIndex % _Lanes * itemOffsetX);
                $JssorUtils$.$CssTop(div, _Orientation ? itemOffsetY * columnIndex : Math.floor(buttonIndex / (maxIndex + 1)) * itemOffsetY);

                $JssorUtils$.$AppendChild(elmt, div);
                _ButtonElements[buttonIndex] = div;

                if (_Options.$ActionMode & 1)
                    $JssorUtils$.$AddEvent(div, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                if (_Options.$ActionMode & 2)
                    $JssorUtils$.$AddEvent(div, "mouseover", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                _Buttons[buttonIndex] = $JssorUtils$.$Buttonize(div);
            }

            //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
            _Initialized = true;
        }
    };

    //JssorBulletNavigator Constructor
    {
        self.$Options = _Options = $JssorUtils$.$Extend({
            $SpacingX: 0,
            $SpacingY: 0,
            $Orientation: 1,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $Steps: undefined,
                $Lanes: undefined
            }, _Options);
        });

        _ItemPrototype = $JssorUtils$.$FindFirstChildByAttribute(elmt, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ItemPrototype)
                $JssorDebug$.$Fail("Navigator item prototype not defined.");

            if (isNaN($JssorUtils$.$CssWidth(_ItemPrototype))) {
                $JssorDebug$.$Fail("Width of 'navigator item prototype' not specified.");
            }

            if (isNaN($JssorUtils$.$CssHeight(_ItemPrototype))) {
                $JssorDebug$.$Fail("Height of 'navigator item prototype' not specified.");
            }
        });

        _PrototypeWidth = $JssorUtils$.$CssWidth(_ItemPrototype);
        _PrototypeHeight = $JssorUtils$.$CssHeight(_ItemPrototype);

        $JssorUtils$.$RemoveChild(elmt, _ItemPrototype);

        _Steps = _Options.$Steps || 1;
        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _Orientation = _Options.$Orientation - 1;
    }
};

var $JssorArrowNavigator$ = window.$JssorArrowNavigator$ = function (arrowLeft, arrowRight, options) {
    var self = this;
    $JssorEventManager$.call(self);

    $JssorDebug$.$Execute(function () {
        //var arrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, uiSearchMode);
        //var arrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, uiSearchMode);

        if (!arrowLeft)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (!arrowRight)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (isNaN($JssorUtils$.$CssWidth(arrowLeft))) {
            $JssorDebug$.$Fail("Width of 'arrow left' not specified.");
        }

        if (isNaN($JssorUtils$.$CssWidth(arrowRight))) {
            $JssorDebug$.$Fail("Width of 'arrow right' not specified.");
        }

        if (isNaN($JssorUtils$.$CssHeight(arrowLeft))) {
            $JssorDebug$.$Fail("Height of 'arrow left' not specified.");
        }

        if (isNaN($JssorUtils$.$CssHeight(arrowRight))) {
            $JssorDebug$.$Fail("Height of 'arrow right' not specified.");
        }
    });

    //var arrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, uiSearchMode);
    //var arrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, uiSearchMode);
    var _Length;
    var _CurrentIndex;
    var _Options;
    var _Steps;
    var _ParentNode = $JssorUtils$.$GetParentNode(arrowLeft);
    var _ArrowWidth = $JssorUtils$.$CssWidth(arrowLeft);
    var _ArrowHeight = $JssorUtils$.$CssHeight(arrowLeft);

    function OnNavigationRequest(steps) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, steps, true);
    }

    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        if (temp) {
            _CurrentIndex = virtualIndex;
        }
        else {
            _CurrentIndex = index;
        }
        //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
    };

    self.$Show = function (show) {
        $JssorUtils$.$ShowElement(arrowLeft, show);
        $JssorUtils$.$ShowElement(arrowRight, show);
    };

    var _Located;
    self.$Relocate = function (force) {
        if (!_Located || _Options.$Scale == false) {

            var containerWidth = $JssorUtils$.$CssWidth(_ParentNode);
            var containerHeight = $JssorUtils$.$CssHeight(_ParentNode);

            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(arrowLeft, (containerWidth - _ArrowWidth) / 2);
                $JssorUtils$.$CssLeft(arrowRight, (containerWidth - _ArrowWidth) / 2);
            }

            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(arrowLeft, (containerHeight - _ArrowHeight) / 2);
                $JssorUtils$.$CssTop(arrowRight, (containerHeight - _ArrowHeight) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        _Length = length;
        _CurrentIndex = 0;

        if (!_Initialized) {

            //self.$Relocate(true);

            $JssorUtils$.$AddEvent(arrowLeft, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, -_Steps));
            $JssorUtils$.$AddEvent(arrowRight, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, _Steps));

            $JssorUtils$.$Buttonize(arrowLeft);
            $JssorUtils$.$Buttonize(arrowRight);

            _Initialized = true;
        }

        //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorArrowNavigator Constructor
    {
        self.$Options = _Options = $JssorUtils$.$Extend({
            $Steps: 1
        }, options);

        _Steps = _Options.$Steps;
    }
};

//$JssorThumbnailNavigator$
var $JssorThumbnailNavigator$ = window.$JssorThumbnailNavigator$ = function (elmt, options) {
    var _Self = this;
    var _Length;
    var _Count;
    var _CurrentIndex;
    var _Options;
    var _NavigationItems = [];

    var _Width;
    var _Height;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _PrototypeWidth;
    var _PrototypeHeight;
    var _DisplayPieces;

    var _Slider;
    var _CurrentMouseOverIndex = -1;

    var _SlidesContainer;
    var _ThumbnailPrototype;

    $JssorEventManager$.call(_Self);
    elmt = $JssorUtils$.$GetElement(elmt);

    function NavigationItem(item, index) {
        var self = this;
        var _Wrapper;
        var _Button;
        var _Thumbnail;

        function Highlight(mouseStatus) {
            _Button.$Activate(_CurrentIndex == index);
        }

        function OnNavigationRequest(event) {
            if (!_Slider.$LastDragSucceded()) {
                var tail = _Lanes - index % _Lanes;
                var slideVirtualIndex = _Slider.$GetVirtualIndex((index + tail) / _Lanes - 1);
                var itemVirtualIndex = slideVirtualIndex * _Lanes + _Lanes - tail;
                _Self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, itemVirtualIndex);
            }
        }

        $JssorDebug$.$Execute(function () {
            self.$Wrapper = undefined;
        });

        self.$Index = index;

        self.$Highlight = Highlight;

        //NavigationItem Constructor
        {
            _Thumbnail = item.$Thumb || item.$Image || $JssorUtils$.$CreateDivElement();
            self.$Wrapper = _Wrapper = $JssorUtils$.$BuildElement(_ThumbnailPrototype, "ThumbnailTemplate", _Thumbnail, true);

            _Button = $JssorUtils$.$Buttonize(_Wrapper);
            if (_Options.$ActionMode & 1)
                $JssorUtils$.$AddEvent(_Wrapper, "click", OnNavigationRequest);
            if (_Options.$ActionMode & 2)
                $JssorUtils$.$AddEvent(_Wrapper, "mouseover", OnNavigationRequest);
        }
    }

    _Self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    _Self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        var oldIndex = _CurrentIndex;
        _CurrentIndex = index;
        if (oldIndex != -1)
            _NavigationItems[oldIndex].$Highlight();
        _NavigationItems[index].$Highlight();

        if (!temp) {
            _Slider.$PlayTo(_Slider.$GetVirtualIndex(Math.floor(virtualIndex / _Lanes)));
        }
    };

    _Self.$Show = function (show) {
        $JssorUtils$.$ShowElement(elmt, show);
    };

    _Self.$Relocate = $JssorUtils$.$EmptyFunction;

    var _Initialized;
    _Self.$Reset = function (length, items, loadingContainer) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(_Length / _Lanes);
            _CurrentIndex = -1;
            _DisplayPieces = Math.min(_DisplayPieces, items.length);

            var horizontal = _Options.$Orientation & 1;

            var slideWidth = _PrototypeWidth + (_PrototypeWidth + _SpacingX) * (_Lanes - 1) * (1 - horizontal);
            var slideHeight = _PrototypeHeight + (_PrototypeHeight + _SpacingY) * (_Lanes - 1) * horizontal;

            var slidesContainerWidth = slideWidth + (slideWidth + _SpacingX) * (_DisplayPieces - 1) * horizontal;
            var slidesContainerHeight = slideHeight + (slideHeight + _SpacingY) * (_DisplayPieces - 1) * (1 - horizontal);

            $JssorUtils$.$CssPosition(_SlidesContainer, "absolute");
            $JssorUtils$.$CssOverflow(_SlidesContainer, "hidden");
            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(_SlidesContainer, (_Width - slidesContainerWidth) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(_SlidesContainer, (_Height - slidesContainerHeight) / 2);
            }
            //$JssorDebug$.$Execute(function () {
            //    if (!_Options.$AutoCenter) {
            //        var slidesContainerTop = $JssorUtils$.$CssTop(_SlidesContainer);
            //        var slidesContainerLeft = $JssorUtils$.$CssLeft(_SlidesContainer);

            //        if (isNaN(slidesContainerTop)) {
            //            $JssorDebug$.$Fail("Position 'top' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified by inline style in pixels (like <div u=\"slides\" style=\"top: 0px;\">)");
            //        }

            //        if (isNaN(slidesContainerLeft)) {
            //            $JssorDebug$.$Fail("Position 'left' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified by inline style in pixels (like <div u=\"slides\" style=\"left: 0px;\">)");
            //        }
            //    }
            //});
            $JssorUtils$.$CssWidth(_SlidesContainer, slidesContainerWidth);
            $JssorUtils$.$CssHeight(_SlidesContainer, slidesContainerHeight);

            var slideItemElmts = [];
            $JssorUtils$.$Each(items, function (item, index) {
                var navigationItem = new NavigationItem(item, index);
                var navigationItemWrapper = navigationItem.$Wrapper;

                var columnIndex = Math.floor(index / _Lanes);
                var laneIndex = index % _Lanes;

                $JssorUtils$.$CssLeft(navigationItemWrapper, (_PrototypeWidth + _SpacingX) * laneIndex * (1 - horizontal));
                $JssorUtils$.$CssTop(navigationItemWrapper, (_PrototypeHeight + _SpacingY) * laneIndex * horizontal);

                if (!slideItemElmts[columnIndex]) {
                    slideItemElmts[columnIndex] = $JssorUtils$.$CreateDivElement();
                    $JssorUtils$.$AppendChild(_SlidesContainer, slideItemElmts[columnIndex]);
                }

                $JssorUtils$.$AppendChild(slideItemElmts[columnIndex], navigationItemWrapper);

                _NavigationItems.push(navigationItem);
            });

            var thumbnailSliderOptions = $JssorUtils$.$Extend({
                $AutoPlay: false,
                $NaviQuitDrag: false,
                $SlideWidth: slideWidth,
                $SlideHeight: slideHeight,
                $SlideSpacing: _SpacingX * horizontal + _SpacingY * (1 - horizontal),
                $MinDragOffsetToSlide: 12,
                $SlideDuration: 200,
                $PauseOnHover: 1,
                $PlayOrientation: _Options.$Orientation,
                $DragOrientation: _Options.$DisableDrag ? 0 : _Options.$Orientation
            }, _Options);

            _Slider = new $JssorSlider$(elmt, thumbnailSliderOptions);

            _Initialized = true;
        }

        //_Self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorThumbnailNavigator Constructor
    {
        _Self.$Options = _Options = $JssorUtils$.$Extend({
            $SpacingX: 3,
            $SpacingY: 3,
            $DisplayPieces: 1,
            $Orientation: 1,
            $AutoCenter: 3,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $Lanes: undefined,
                $Width: undefined,
                $Height: undefined
            }, _Options);
        });

        _Width = $JssorUtils$.$CssWidth(elmt);
        _Height = $JssorUtils$.$CssHeight(elmt);

        $JssorDebug$.$Execute(function () {
            if (!_Width)
                $JssorDebug$.$Fail("width of 'thumbnavigator' container not specified.");
            if (!_Height)
                $JssorDebug$.$Fail("height of 'thumbnavigator' container not specified.");
        });

        _SlidesContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "slides");
        _ThumbnailPrototype = $JssorUtils$.$FindFirstChildByAttribute(_SlidesContainer, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ThumbnailPrototype)
                $JssorDebug$.$Fail("prototype of 'thumbnavigator' not defined.");
        });

        _PrototypeWidth = $JssorUtils$.$CssWidth(_ThumbnailPrototype);
        _PrototypeHeight = $JssorUtils$.$CssHeight(_ThumbnailPrototype);

        $JssorUtils$.$RemoveChild(_SlidesContainer, _ThumbnailPrototype);

        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _DisplayPieces = _Options.$DisplayPieces;
    }
};

//$JssorCaptionSlider$
function $JssorCaptionSliderBase$() {
    $JssorAnimator$.call(this, 0, 0);
    this.$Revert = $JssorUtils$.$EmptyFunction;
}

var $JssorCaptionSlider$ = window.$JssorCaptionSlider$ = function (container, captionSlideOptions, playIn) {
    $JssorDebug$.$Execute(function () {
        if (!captionSlideOptions.$CaptionTransitions) {
            $JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' not specified.");
        }
        //else if (!$JssorUtils$.$IsArray(captionSlideOptions.$CaptionTransitions)) {
        //    $JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' is not an array.");
        //}
    });

    var _Self = this;
    var _ImmediateOutCaptionHanger;
    var _PlayMode = playIn ? captionSlideOptions.$PlayInMode : captionSlideOptions.$PlayOutMode;

    var _CaptionTransitions = captionSlideOptions.$CaptionTransitions;
    var _CaptionTuningFetcher = { $Transition: "t", $Delay: "d", $Duration: "du", x: "x", y: "y", $Rotate: "r", $Zoom: "z", $Opacity: "f", $BeginTime: "b" };
    var _CaptionTuningTransfer = {
        $Default: function (value, tuningValue) {
            if (!isNaN(tuningValue.$Value))
                value = tuningValue.$Value;
            else
                value *= tuningValue.$Percent;

            return value;
        },
        $Opacity: function (value, tuningValue) {
            return this.$Default(value - 1, tuningValue);
        }
    };
    _CaptionTuningTransfer.$Zoom = _CaptionTuningTransfer.$Opacity;

    $JssorAnimator$.call(_Self, 0, 0);

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];
        var lastTransitionName;
        var namedTransitions = [];
        var namedTransitionOrders = [];

        //$JssorDebug$.$Execute(function () {

        //    var debugInfoElement = $JssorUtils$.$GetElement("debugInfo");

        //    if (debugInfoElement && playIn) {

        //        var text = $JssorUtils$.$GetInnerHtml(debugInfoElement) + "<br>";

        //        $JssorUtils$.$SetInnerHtml(debugInfoElement, text);
        //    }
        //});

        function FetchRawTransition(captionElmt, index) {
            var rawTransition = {};

            $JssorUtils$.$Each(_CaptionTuningFetcher, function (fetchAttribute, fetchProperty) {
                var attributeValue = $JssorUtils$.$GetAttributeEx(captionElmt, fetchAttribute + (index || ""));
                if (attributeValue) {
                    var propertyValue = {};

                    if (fetchAttribute == "t") {
                        //if (($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserSafari() || $JssorUtils$.$IsBrowserFireFox()) && attributeValue == "*") {
                        //    attributeValue = Math.floor(Math.random() * captionSlideOptions.$CaptionTransitions.length);
                        //    $JssorUtils$.$SetAttribute(captionElmt, fetchAttribute + (index || ""), attributeValue);
                        //}

                        propertyValue.$Value = attributeValue;
                    }
                    else if (attributeValue.indexOf("%") + 1)
                        propertyValue.$Percent = $JssorUtils$.$ParseFloat(attributeValue) / 100;
                    else
                        propertyValue.$Value = $JssorUtils$.$ParseFloat(attributeValue);

                    rawTransition[fetchProperty] = propertyValue;
                }
            });

            return rawTransition;
        }

        function GetRandomTransition() {
            //return _CaptionTransitions.length && _CaptionTransitions[Math.floor(Math.random() * 42737 / (i + 1)) % _CaptionTransitions.length];
            return _CaptionTransitions[Math.floor(Math.random() * _CaptionTransitions.length)];
        }

        function EvaluateCaptionTransition(transitionName) {

            var transition;

            if (transitionName == "*") {
                transition = GetRandomTransition();
            }
            else if (transitionName) {

                //indexed transition allowed, just the same as named transition
                var tempTransition = _CaptionTransitions[$JssorUtils$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                if ($JssorUtils$.$IsArray(tempTransition)) {
                    if (transitionName != lastTransitionName) {
                        lastTransitionName = transitionName;
                        namedTransitionOrders[transitionName] = 0;

                        namedTransitions[transitionName] = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                    }
                    else {
                        namedTransitionOrders[transitionName]++;
                    }

                    tempTransition = namedTransitions[transitionName];

                    if ($JssorUtils$.$IsArray(tempTransition)) {
                        tempTransition = tempTransition.length && tempTransition[namedTransitionOrders[transitionName] % tempTransition.length];

                        if ($JssorUtils$.$IsArray(tempTransition)) {
                            //got transition from array level 3, random for all captions
                            tempTransition = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                        }
                        //else {
                        //    //got transition from array level 2, in sequence for all adjacent captions with same name specified
                        //    transition = tempTransition;
                        //}
                    }
                    //else {
                    //    //got transition from array level 1, random but same for all adjacent captions with same name specified
                    //    transition = tempTransition;
                    //}
                }
                //else {
                //    //got transition directly from a simple transition object
                //    transition = tempTransition;
                //}

                transition = tempTransition;

                if ($JssorUtils$.$IsString(transition))
                    transition = EvaluateCaptionTransition(transition);
            }

            return transition;
        }

        var captionElmts = $JssorUtils$.$GetChildren(element);
        $JssorUtils$.$Each(captionElmts, function (captionElmt, i) {

            var transitionsWithTuning = [];
            transitionsWithTuning.$Elmt = captionElmt;
            var isCaption = $JssorUtils$.$GetAttributeEx(captionElmt, "u") == "caption";

            $JssorUtils$.$Each(playIn ? [0, 3] : [2], function (j, k) {

                if (isCaption) {
                    var transition;
                    var rawTransition;

                    if (j != 2 || !$JssorUtils$.$GetAttributeEx(captionElmt, "t3")) {
                        rawTransition = FetchRawTransition(captionElmt, j);

                        if (j == 2 && !rawTransition.$Transition) {
                            rawTransition.$Delay = rawTransition.$Delay || { $Value: 0 };
                            rawTransition = $JssorUtils$.$Extend(FetchRawTransition(captionElmt, 0), rawTransition);
                        }
                    }

                    if (rawTransition && rawTransition.$Transition) {

                        transition = EvaluateCaptionTransition(rawTransition.$Transition.$Value);

                        if (transition) {

                            //var transitionWithTuning = $JssorUtils$.$Extend({ $Delay: 0, $ScaleHorizontal: 1, $ScaleVertical: 1 }, transition);
                            var transitionWithTuning = $JssorUtils$.$Extend({ $Delay: 0 }, transition);

                            $JssorUtils$.$Each(rawTransition, function (rawPropertyValue, propertyName) {
                                var tuningPropertyValue = (_CaptionTuningTransfer[propertyName] || _CaptionTuningTransfer.$Default).apply(_CaptionTuningTransfer, [transitionWithTuning[propertyName], rawTransition[propertyName]]);
                                if (!isNaN(tuningPropertyValue))
                                    transitionWithTuning[propertyName] = tuningPropertyValue;
                            });

                            if (!k) {
                                if (rawTransition.$BeginTime)
                                    transitionWithTuning.$BeginTime = rawTransition.$BeginTime.$Value || 0;
                                else if ((_PlayMode) & 2)
                                    transitionWithTuning.$BeginTime = 0;
                            }
                        }
                    }

                    transitionsWithTuning.push(transitionWithTuning);
                }

                if ((level % 2) && !k) {
                    //transitionsWithTuning.$Children = GetCaptionItems(captionElmt, lastTransitionName, [].concat(namedTransitions), [].concat(namedTransitionOrders), level + 1);
                    transitionsWithTuning.$Children = GetCaptionItems(captionElmt, level + 1);
                }
            });

            itemsToPlay.push(transitionsWithTuning);
        });

        return itemsToPlay;
    }

    function CreateAnimator(item, transition, immediateOut) {

        var animatorOptions = {
            $Easing: transition.$Easing,
            $Round: transition.$Round,
            $During: transition.$During,
            $Reverse: playIn && !immediateOut,
            $Optimize: true
        };

        $JssorDebug$.$Execute(function () {
            animatorOptions.$CaptionAnimator = true;
        });

        var captionItem = item;
        var captionParent = $JssorUtils$.$GetParentNode(item);

        var captionItemWidth = $JssorUtils$.$CssWidth(captionItem);
        var captionItemHeight = $JssorUtils$.$CssHeight(captionItem);
        var captionParentWidth = $JssorUtils$.$CssWidth(captionParent);
        var captionParentHeight = $JssorUtils$.$CssHeight(captionParent);

        var toStyles = {};
        var fromStyles = {};
        var scaleClip = transition.$ScaleClip || 1;

        //Opacity
        if (transition.$Opacity) {
            toStyles.$Opacity = 2 - transition.$Opacity;
        }

        animatorOptions.$OriginalWidth = captionItemWidth;
        animatorOptions.$OriginalHeight = captionItemHeight;

        //Transform
        if (transition.$Zoom || transition.$Rotate) {
            toStyles.$Zoom = transition.$Zoom ? transition.$Zoom - 1 : 1;

            if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera())
                toStyles.$Zoom = Math.min(toStyles.$Zoom, 2);

            fromStyles.$Zoom = 1;

            var rotate = transition.$Rotate || 0;

            toStyles.$Rotate = rotate * 360;
            fromStyles.$Rotate = 0;
        }
            //Clip
        else if (transition.$Clip) {
            var fromStyleClip = { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 };
            var toStyleClip = $JssorUtils$.$Extend({}, fromStyleClip);

            var blockOffset = toStyleClip.$Offset = {};

            var topBenchmark = transition.$Clip & 4;
            var bottomBenchmark = transition.$Clip & 8;
            var leftBenchmark = transition.$Clip & 1;
            var rightBenchmark = transition.$Clip & 2;

            if (topBenchmark && bottomBenchmark) {
                blockOffset.$Top = captionItemHeight / 2 * scaleClip;
                blockOffset.$Bottom = -blockOffset.$Top;
            }
            else if (topBenchmark)
                blockOffset.$Bottom = -captionItemHeight * scaleClip;
            else if (bottomBenchmark)
                blockOffset.$Top = captionItemHeight * scaleClip;

            if (leftBenchmark && rightBenchmark) {
                blockOffset.$Left = captionItemWidth / 2 * scaleClip;
                blockOffset.$Right = -blockOffset.$Left;
            }
            else if (leftBenchmark)
                blockOffset.$Right = -captionItemWidth * scaleClip;
            else if (rightBenchmark)
                blockOffset.$Left = captionItemWidth * scaleClip;

            animatorOptions.$Move = transition.$Move;
            toStyles.$Clip = toStyleClip;
            fromStyles.$Clip = fromStyleClip;
        }

        //Fly
        {
            var toLeft = 0;
            var toTop = 0;

            if (transition.x)
                toLeft -= captionParentWidth * transition.x;

            if (transition.y)
                toTop -= captionParentHeight * transition.y;

            if (toLeft || toTop || animatorOptions.$Move) {
                toStyles.$Left = toLeft + $JssorUtils$.$CssLeft(captionItem);
                toStyles.$Top = toTop + $JssorUtils$.$CssTop(captionItem);
            }
        }

        //duration
        var duration = transition.$Duration;

        fromStyles = $JssorUtils$.$Extend(fromStyles, $JssorUtils$.$GetStyles(captionItem, toStyles));

        animatorOptions.$Setter = $JssorUtils$.$GetStyleSetterEx();

        return new $JssorAnimator$(transition.$Delay, duration, animatorOptions, captionItem, fromStyles, toStyles);
    }

    function CreateAnimators(streamLineLength, captionItems) {

        $JssorUtils$.$Each(captionItems, function (captionItem, i) {

            $JssorDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $JssorUtils$.$CssTop(captionItem.$Elmt);
                    var left = $JssorUtils$.$CssLeft(captionItem.$Elmt);
                    var width = $JssorUtils$.$CssWidth(captionItem.$Elmt);
                    var height = $JssorUtils$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(left))
                        error = "Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(width))
                        error = "Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(height))
                        error = "Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";

                    if (error)
                        $JssorDebug$.$Error("Caption " + (i + 1) + " definition error, \r\n" + error + "\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var animator;
            var captionElmt = captionItem.$Elmt;
            var transition = captionItem[0];
            var transition3 = captionItem[1];

            if (transition) {

                animator = CreateAnimator(captionElmt, transition);
                streamLineLength = animator.$Locate($JssorUtils$.$IsUndefined(transition.$BeginTime) ? streamLineLength : transition.$BeginTime, 1);
            }

            streamLineLength = CreateAnimators(streamLineLength, captionItem.$Children);

            if (transition3) {
                var animator3 = CreateAnimator(captionElmt, transition3, 1);
                animator3.$Locate(streamLineLength, 1);
                _Self.$Combine(animator3);
                _ImmediateOutCaptionHanger.$Combine(animator3);
            }

            if (animator)
                _Self.$Combine(animator);
        });

        return streamLineLength;
    }

    _Self.$Revert = function () {
        _Self.$GoToPosition(_Self.$GetPosition_OuterEnd() * (playIn || 0));
        _ImmediateOutCaptionHanger.$GoToBegin();
    };

    //Constructor
    {
        _ImmediateOutCaptionHanger = new $JssorAnimator$(0, 0);

        //var streamLineLength = 0;
        //var captionItems = GetCaptionItems(container, null, [], [], 1);

        CreateAnimators(0, _PlayMode ? GetCaptionItems(container, 1) : []);
    }
};

//Event Table

//$EVT_CLICK = 21;			    function(slideIndex[, event])
//$EVT_DRAG_START = 22;		    function(position[, virtualPosition, event])
//$EVT_DRAG_END = 23;		    function(position, startPosition[, virtualPosition, virtualStartPosition, event])
//$EVT_SWIPE_START = 24;		function(position[, virtualPosition])
//$EVT_SWIPE_END = 25;		    function(position[, virtualPosition])

//$EVT_LOAD_START = 26;			function(slideIndex)
//$EVT_LOAD_END = 27;			function(slideIndex)

//$EVT_POSITION_CHANGE = 202;	function(position, fromPosition[, virtualPosition, virtualFromPosition])
//$EVT_PARK = 203;			    function(slideIndex, fromIndex)

//$EVT_PROGRESS_CHANGE = 208;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_STATE_CHANGE = 209;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_ROLLBACK_START = 210;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_ROLLBACK_END = 211;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_SLIDESHOW_START = 206;   function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])
//$EVT_SLIDESHOW_END = 207;     function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])

//http://www.jssor.com/development/reference-api.html
