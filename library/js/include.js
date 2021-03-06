/*!
 SlickNav Responsive Mobile Menu v1.0.1
 (c) 2014 Josh Cope
 licensed under MIT
 */
;
(function (e, t, n) {
    function o(t, n) {
        this.element = t;
        this.settings = e.extend({}, r, n);
        this._defaults = r;
        this._name = i;
        this.init()
    }

    var r = {
        label: "MENU",
        duplicate: true,
        duration: 200,
        easingOpen: "swing",
        easingClose: "swing",
        closedSymbol: "&#9658;",
        openedSymbol: "&#9660;",
        prependTo: "body",
        parentTag: "a",
        closeOnClick: false,
        allowParentLinks: false,
        nestedParentLinks: true,
        showChildren: false,
        init: function () {
        },
        open: function () {
        },
        close: function () {
        }
    }, i = "slicknav", s = "slicknav";
    o.prototype.init = function () {
        var n = this, r = e(this.element), i = this.settings, o, u;
        if (i.duplicate) {
            n.mobileNav = r.clone();
            n.mobileNav.removeAttr("id");
            n.mobileNav.find("*").each(function (t, n) {
                e(n).removeAttr("id")
            })
        } else {
            n.mobileNav = r
        }
        o = s + "_icon";
        if (i.label === "") {
            o += " " + s + "_no-text"
        }
        if (i.parentTag == "a") {
            i.parentTag = 'a href="#"'
        }
        n.mobileNav.attr("class", s + "_nav");
        u = e('<div class="' + s + '_menu"></div>');
        n.btn = e(["<" + i.parentTag + ' aria-haspopup="true" tabindex="0" class="' + s + "_btn " + s + '_collapsed">', '<span class="' + s + '_menutxt">' + i.label + "</span>", '<span class="' + o + '">', '<span class="' + s + '_icon-bar"></span>', '<span class="' + s + '_icon-bar"></span>', '<span class="' + s + '_icon-bar"></span>', "</span>", "</" + i.parentTag + ">"].join(""));
        e(u).append(n.btn);
        e(i.prependTo).prepend(u);
        u.append(n.mobileNav);
        var a = n.mobileNav.find("li");
        e(a).each(function () {
            var t = e(this), r = {};
            r.children = t.children("ul").attr("role", "menu");
            t.data("menu", r);
            if (r.children.length > 0) {
                var o = t.contents(), u = false;
                nodes = [];
                e(o).each(function () {
                    if (!e(this).is("ul")) {
                        nodes.push(this)
                    } else {
                        return false
                    }
                    if (e(this).is("a")) {
                        u = true
                    }
                });
                var a = e("<" + i.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + s + '_item"/>');
                if (!i.allowParentLinks || i.nestedParentLinks || !u) {
                    var f = e(nodes).wrapAll(a).parent();
                    f.addClass(s + "_row")
                } else e(nodes).wrapAll('<span class="' + s + "_parent-link " + s + '_row"/>').parent();
                t.addClass(s + "_collapsed");
                t.addClass(s + "_parent");
                var l = e('<span class="' + s + '_arrow">' + i.closedSymbol + "</span>");
                if (i.allowParentLinks && !i.nestedParentLinks && u)l = l.wrap(a).parent();
                e(nodes).last().after(l)
            } else if (t.children().length === 0) {
                t.addClass(s + "_txtnode")
            }
            t.children("a").attr("role", "menuitem").click(function (t) {
                if (i.closeOnClick && !e(t.target).parent().closest("li").hasClass(s + "_parent")) {
                    e(n.btn).click()
                }
            });
            if (i.closeOnClick && i.allowParentLinks) {
                t.children("a").children("a").click(function (t) {
                    e(n.btn).click()
                });
                t.find("." + s + "_parent-link a:not(." + s + "_item)").click(function (t) {
                    e(n.btn).click()
                })
            }
        });
        e(a).each(function () {
            var t = e(this).data("menu");
            if (!i.showChildren) {
                n._visibilityToggle(t.children, null, false, null, true)
            }
        });
        n._visibilityToggle(n.mobileNav, null, false, "init", true);
        n.mobileNav.attr("role", "menu");
        e(t).mousedown(function () {
            n._outlines(false)
        });
        e(t).keyup(function () {
            n._outlines(true)
        });
        e(n.btn).click(function (e) {
            e.preventDefault();
            n._menuToggle()
        });
        n.mobileNav.on("click", "." + s + "_item", function (t) {
            t.preventDefault();
            n._itemClick(e(this))
        });
        e(n.btn).keydown(function (e) {
            var t = e || event;
            if (t.keyCode == 13) {
                e.preventDefault();
                n._menuToggle()
            }
        });
        n.mobileNav.on("keydown", "." + s + "_item", function (t) {
            var r = t || event;
            if (r.keyCode == 13) {
                t.preventDefault();
                n._itemClick(e(t.target))
            }
        });
        if (i.allowParentLinks && i.nestedParentLinks) {
            e("." + s + "_item a").click(function (e) {
                e.stopImmediatePropagation()
            })
        }
    };
    o.prototype._menuToggle = function (e) {
        var t = this;
        var n = t.btn;
        var r = t.mobileNav;
        if (n.hasClass(s + "_collapsed")) {
            n.removeClass(s + "_collapsed");
            n.addClass(s + "_open")
        } else {
            n.removeClass(s + "_open");
            n.addClass(s + "_collapsed")
        }
        n.addClass(s + "_animating");
        t._visibilityToggle(r, n.parent(), true, n)
    };
    o.prototype._itemClick = function (e) {
        var t = this;
        var n = t.settings;
        var r = e.data("menu");
        if (!r) {
            r = {};
            r.arrow = e.children("." + s + "_arrow");
            r.ul = e.next("ul");
            r.parent = e.parent();
            if (r.parent.hasClass(s + "_parent-link")) {
                r.parent = e.parent().parent();
                r.ul = e.parent().next("ul")
            }
            e.data("menu", r)
        }
        if (r.parent.hasClass(s + "_collapsed")) {
            r.arrow.html(n.openedSymbol);
            r.parent.removeClass(s + "_collapsed");
            r.parent.addClass(s + "_open");
            r.parent.addClass(s + "_animating");
            t._visibilityToggle(r.ul, r.parent, true, e)
        } else {
            r.arrow.html(n.closedSymbol);
            r.parent.addClass(s + "_collapsed");
            r.parent.removeClass(s + "_open");
            r.parent.addClass(s + "_animating");
            t._visibilityToggle(r.ul, r.parent, true, e)
        }
    };
    o.prototype._visibilityToggle = function (t, n, r, i, o) {
        var u = this;
        var a = u.settings;
        var f = u._getActionItems(t);
        var l = 0;
        if (r) {
            l = a.duration
        }
        if (t.hasClass(s + "_hidden")) {
            t.removeClass(s + "_hidden");
            t.slideDown(l, a.easingOpen, function () {
                e(i).removeClass(s + "_animating");
                e(n).removeClass(s + "_animating");
                if (!o) {
                    a.open(i)
                }
            });
            t.attr("aria-hidden", "false");
            f.attr("tabindex", "0");
            u._setVisAttr(t, false)
        } else {
            t.addClass(s + "_hidden");
            t.slideUp(l, this.settings.easingClose, function () {
                t.attr("aria-hidden", "true");
                f.attr("tabindex", "-1");
                u._setVisAttr(t, true);
                t.hide();
                e(i).removeClass(s + "_animating");
                e(n).removeClass(s + "_animating");
                if (!o) {
                    a.close(i)
                } else if (i == "init") {
                    a.init()
                }
            })
        }
    };
    o.prototype._setVisAttr = function (t, n) {
        var r = this;
        var i = t.children("li").children("ul").not("." + s + "_hidden");
        if (!n) {
            i.each(function () {
                var t = e(this);
                t.attr("aria-hidden", "false");
                var i = r._getActionItems(t);
                i.attr("tabindex", "0");
                r._setVisAttr(t, n)
            })
        } else {
            i.each(function () {
                var t = e(this);
                t.attr("aria-hidden", "true");
                var i = r._getActionItems(t);
                i.attr("tabindex", "-1");
                r._setVisAttr(t, n)
            })
        }
    };
    o.prototype._getActionItems = function (e) {
        var t = e.data("menu");
        if (!t) {
            t = {};
            var n = e.children("li");
            var r = n.find("a");
            t.links = r.add(n.find("." + s + "_item"));
            e.data("menu", t)
        }
        return t.links
    };
    o.prototype._outlines = function (t) {
        if (!t) {
            e("." + s + "_item, ." + s + "_btn").css("outline", "none")
        } else {
            e("." + s + "_item, ." + s + "_btn").css("outline", "")
        }
    };
    o.prototype.toggle = function () {
        var e = this;
        e._menuToggle()
    };
    o.prototype.open = function () {
        var e = this;
        if (e.btn.hasClass(s + "_collapsed")) {
            e._menuToggle()
        }
    };
    o.prototype.close = function () {
        var e = this;
        if (e.btn.hasClass(s + "_open")) {
            e._menuToggle()
        }
    };
    e.fn[i] = function (t) {
        var n = arguments;
        if (t === undefined || typeof t === "object") {
            return this.each(function () {
                if (!e.data(this, "plugin_" + i)) {
                    e.data(this, "plugin_" + i, new o(this, t))
                }
            })
        } else if (typeof t === "string" && t[0] !== "_" && t !== "init") {
            var r;
            this.each(function () {
                var s = e.data(this, "plugin_" + i);
                if (s instanceof o && typeof s[t] === "function") {
                    r = s[t].apply(s, Array.prototype.slice.call(n, 1))
                }
            });
            return r !== undefined ? r : this
        }
    }
})(jQuery, document, window)

    /*!
     * Slider
     */

    /*!
     * PgwSlider - Version 2.3
     *
     * Copyright 2014, Jonathan M. Piat
     * http://pgwjs.com - http://pagawa.com
     *
     * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
     */
;
(function ($) {
    $.fn.pgwSlider = function (options) {

        var defaults = {
            mainClassName: 'pgwSlider',
            listPosition: 'right',
            selectionMode: 'click',
            transitionEffect: 'fading',
            autoSlide: true,
            displayList: true,
            displayControls: false,
            touchControls: true,
            verticalCentering: false,
            adaptiveHeight: false,
            maxHeight: null,
            beforeSlide: null,
            afterSlide: null,
            adaptiveDuration: 200,
            transitionDuration: 500,
            intervalDuration: 3000
        };

        if (this.length == 0) {
            return this;
        } else if (this.length > 1) {
            this.each(function () {
                $(this).pgwSlider(options);
            });
            return this;
        }

        var pgwSlider = this;
        pgwSlider.plugin = this;
        pgwSlider.data = [];
        pgwSlider.config = {};
        pgwSlider.currentSlide = 0;
        pgwSlider.slideCount = 0;
        pgwSlider.resizeEvent = null;
        pgwSlider.intervalEvent = null;
        pgwSlider.touchFirstPosition = null;
        pgwSlider.transitionInProgress = false;
        pgwSlider.window = $(window);

        // Init
        var init = function () {

            // Merge user options with the default configuration
            pgwSlider.config = $.extend({}, defaults, options);

            // Setup
            setup();

            // Activate interval
            if (pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Get element
        var getElement = function (obj) {
            var element = {};

            // Get link
            var elementLink = obj.find('a').attr('href');
            if ((typeof elementLink != 'undefined') && (elementLink != '')) {
                element.link = elementLink;
                var elementLinkTarget = obj.find('a').attr('target');
                if ((typeof elementLinkTarget != 'undefined') && (elementLinkTarget != '')) {
                    element.linkTarget = elementLinkTarget;
                }
            }

            // Get image 
            var elementThumbnail = obj.find('img').attr('src');
            if ((typeof elementThumbnail != 'undefined') && (elementThumbnail != '')) {
                element.thumbnail = elementThumbnail;
            }

            var elementImage = obj.find('img').attr('data-large-src');
            if ((typeof elementImage != 'undefined') && (elementImage != '')) {
                element.image = elementImage;
            }

            // Get title 
            var elementSpan = obj.find('span').text();
            if ((typeof elementSpan != 'undefined') && (elementSpan != '') && (elementSpan != null)) {
                element.title = elementSpan;
            } else {
                var elementTitle = obj.find('img').attr('alt');
                if ((typeof elementTitle != 'undefined') && (elementTitle != '')) {
                    element.title = elementTitle;
                }
            }

            // Get description
            var elementDescription = obj.find('img').attr('data-description');
            if ((typeof elementDescription != 'undefined') && (elementDescription != '')) {
                element.description = elementDescription;
            }

            return element;
        };

        // Update the current height
        var updateHeight = function (height, animate) {

            // Check maxHeight
            if (pgwSlider.config.maxHeight) {
                if (pgwSlider.plugin.width() > 480 && height > pgwSlider.config.maxHeight) {
                    height = pgwSlider.config.maxHeight;
                } else if (pgwSlider.plugin.width() <= 480) {
                    if (height + pgwSlider.plugin.find('.ps-list').height() > pgwSlider.config.maxHeight) {
                        height = pgwSlider.config.maxHeight - pgwSlider.plugin.find('.ps-list').height();
                    }
                }
            }

            // Prevents multiple calculations in a short time
            clearTimeout(pgwSlider.resizeEvent);
            pgwSlider.resizeEvent = setTimeout(function () {

                // Adjust right list
                var elementHeight = ((height - ((pgwSlider.slideCount - 1) * 6)) / pgwSlider.slideCount);
                var elementWidth = (100 / pgwSlider.slideCount);
                pgwSlider.plugin.find('.ps-list > li').css({width: elementWidth + '%'});

                // Adjust main container
                if (typeof animate != 'undefined' && animate && pgwSlider.config.maxHeight == null) {

                    if (typeof pgwSlider.plugin.find('.ps-current').animate == 'function') {
                        pgwSlider.plugin.find('.ps-current').animate({
                            height: height
                        }, pgwSlider.config.adaptiveDuration, function () {
                            pgwSlider.plugin.find('.ps-list > li').animate({height: elementHeight}, pgwSlider.config.adaptiveDuration);
                        });
                    } else {
                        pgwSlider.plugin.find('.ps-current').css('height', height);
                        pgwSlider.plugin.find('.ps-list > li').css('height', elementHeight);
                    }

                } else {
                    pgwSlider.plugin.find('.ps-current').css('height', height);
                    pgwSlider.plugin.find('.ps-list > li').css('height', elementHeight);
                }

                // Vertical alignement
                if (pgwSlider.config.verticalCentering) {

                    // List elements
                    pgwSlider.plugin.find('.ps-list > li').each(function () {
                        if ((elementHeight > 50) && ($(this).find('img').height() > elementHeight)) {
                            var imageMargin = Math.round(($(this).find('img').height() - elementHeight) / 2);
                            $(this).find('img').css('margin-top', -imageMargin);

                        } else if ($(this).find('img').height() < elementHeight) {
                            var imageMargin = Math.round((elementHeight - $(this).find('img').height()) / 2);
                            $(this).find('img').css('margin-top', imageMargin);

                        } else {
                            $(this).find('img').css('margin-top', '');
                        }
                    });

                    // Current elements
                    pgwSlider.plugin.find('.ps-current > ul > li').each(function () {
                        var isVisible = ($(this).css('display') == 'none') ? false : true;

                        if (!isVisible) {
                            $(this).show();
                        }

                        if ($(this).show().find('img').height() > height) {
                            var imageMargin = Math.round(($(this).find('img').height() - height) / 2);
                            $(this).find('img').css('margin-top', -imageMargin);

                        } else if ($(this).show().find('img').height() < height) {
                            var imageMargin = Math.round((height - $(this).find('img').height()) / 2);
                            $(this).find('img').css('margin-top', imageMargin);

                        } else {
                            $(this).find('img').css('margin-top', '');
                        }

                        if (!isVisible) {
                            $(this).hide();
                        }
                    });
                }

            }, 100);

            return true;
        };

        // Set size class
        var setSizeClass = function () {

            if (pgwSlider.plugin.width() <= 480) {
                pgwSlider.plugin.addClass('narrow').removeClass('wide');
            } else {
                pgwSlider.plugin.addClass('wide').removeClass('narrow');
            }

            return true;
        };

        // Setup
        var setup = function () {

            // Create container
            pgwSlider.plugin.removeClass(pgwSlider.config.mainClassName).addClass('ps-list');
            pgwSlider.plugin.wrap('<div class="' + pgwSlider.config.mainClassName + '"></div>');
            pgwSlider.plugin = pgwSlider.plugin.parent();
            pgwSlider.plugin.prepend('<div class="ps-current"><ul></ul><span class="ps-caption"></span></div>');
            pgwSlider.slideCount = pgwSlider.plugin.find('.ps-list > li').length;

            if (pgwSlider.slideCount == 0) {
                throw new Error('PgwSlider - No slider item has been found');
                return false;
            }

            // Add controls
            if (pgwSlider.config.displayControls && pgwSlider.slideCount > 1) {
                pgwSlider.plugin.find('.ps-current').prepend('<span class="ps-prev"><span class="ps-prevIcon"></span></span>');
                pgwSlider.plugin.find('.ps-current').append('<span class="ps-next"><span class="ps-nextIcon"></span></span>');
                pgwSlider.plugin.find('.ps-current .ps-prev').click(function () {
                    pgwSlider.previousSlide();
                });
                pgwSlider.plugin.find('.ps-current .ps-next').click(function () {
                    pgwSlider.nextSlide();
                });
            }

            // Disable list
            if (!pgwSlider.config.displayList) {
                pgwSlider.plugin.find('.ps-current').css('width', '100%');
                pgwSlider.plugin.find('.ps-list').hide();
            }

            // Get slider elements
            var elementId = 1;
            pgwSlider.plugin.find('.ps-list > li').each(function () {
                var element = getElement($(this));
                element.id = elementId;
                pgwSlider.data.push(element);

                $(this).addClass('elt_' + element.id);

                // Check element title
                if (element.title) {
                    if ($(this).find('span').length == 1) {
                        if ($(this).find('span').text() == '') {
                            $(this).find('span').text(element.title);
                        }
                    } else {
                        $(this).find('img').after('<span>' + element.title + '</span>');
                    }
                }

                // Set element in the current list
                var currentElement = $('<li class="elt_' + elementId + '"></li>');

                if (element.image) {
                    currentElement.html('<img src="' + element.image + '" alt="' + (element.title ? element.title : '') + '">');
                } else if (element.thumbnail) {
                    currentElement.html('<img src="' + element.thumbnail + '" alt="' + (element.title ? element.title : '') + '">');
                }

                if (element.link) {
                    currentElement.html('<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + currentElement.html() + '</a>');
                }

                pgwSlider.plugin.find('.ps-current > ul').append(currentElement);

                // Set selection mode
                if ((pgwSlider.config.selectionMode == 'mouseOver') && (pgwSlider.config.transitionEffect == 'fading')) {
                    $(this).css('cursor', 'pointer').click(function (event) {
                        event.preventDefault();
                    }).bind('mouseenter', function (event) {
                        displayElement(element.id);
                    });
                    $(this).find('a').css('cursor', 'pointer');
                } else {
                    $(this).css('cursor', 'pointer').click(function (event) {
                        event.preventDefault();
                        displayElement(element.id);
                    });
                }

                elementId++;
            });

            // Set list position
            if (pgwSlider.config.listPosition == 'left') {
                pgwSlider.plugin.addClass('listOnTheLeft');
            }

            // Attach slide events
            if (pgwSlider.config.autoSlide) {
                pgwSlider.plugin.on('mouseenter', function () {
                    clearInterval(pgwSlider.intervalEvent);
                    pgwSlider.intervalEvent = null;
                }).on('mouseleave', function () {
                    activateInterval();
                });
            }

            // Display the first element
            displayElement(1);

            // Set the first height
            pgwSlider.plugin.find('.ps-current > ul > li.elt_1 img').on('load', function () {
                setSizeClass();

                var maxHeight = pgwSlider.plugin.find('.ps-current > ul > li.elt_1 img').height();
                updateHeight(maxHeight);

                pgwSlider.window.resize(function () {
                    // The new class must be set before the recalculation of the height.
                    setSizeClass();

                    var maxHeight = pgwSlider.plugin.find('.ps-current > ul > li.elt_' + pgwSlider.currentSlide + ' img').height();
                    updateHeight(maxHeight, pgwSlider.config.adaptiveHeight);
                });
            });

            // Touch controls for current image
            if (pgwSlider.config.touchControls && pgwSlider.slideCount > 1) {

                pgwSlider.plugin.find('.ps-current').on('touchstart', function (e) {
                    try {
                        if (e.originalEvent.touches[0].clientX && pgwSlider.touchFirstPosition == null) {
                            pgwSlider.touchFirstPosition = e.originalEvent.touches[0].clientX;
                        }
                    } catch (e) {
                        pgwSlider.touchFirstPosition = null;
                    }
                });

                pgwSlider.plugin.find('.ps-current').on('touchmove', function (e) {
                    try {
                        if (e.originalEvent.touches[0].clientX && pgwSlider.touchFirstPosition != null) {
                            if (e.originalEvent.touches[0].clientX > (pgwSlider.touchFirstPosition + 50)) {
                                pgwSlider.touchFirstPosition = null;
                                pgwSlider.previousSlide();
                            } else if (e.originalEvent.touches[0].clientX < (pgwSlider.touchFirstPosition - 50)) {
                                pgwSlider.touchFirstPosition = null;
                                pgwSlider.nextSlide();
                            }
                        }
                    } catch (e) {
                        pgwSlider.touchFirstPosition = null;
                    }
                });

                pgwSlider.plugin.find('.ps-current').on('touchend', function (e) {
                    pgwSlider.touchFirstPosition = null;
                });
            }

            return true;
        };

        // Finish element
        var finishElement = function (element) {

            // Element caption
            var elementText = '';
            if (element.title) {
                elementText += '<b>' + element.title + '</b>';
            }

            if (element.description) {
                if (elementText != '') elementText += '<br>';
                elementText += element.description;
            }

            if (elementText != '') {
                if (element.link) {
                    elementText = '<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + elementText + '</a>';
                }

                if (typeof pgwSlider.plugin.find('.ps-caption').fadeIn == 'function') {
                    pgwSlider.plugin.find('.ps-caption').html(elementText);
                    pgwSlider.plugin.find('.ps-caption').fadeIn(pgwSlider.config.transitionDuration / 2);
                } else {
                    pgwSlider.plugin.find('.ps-caption').html(elementText);
                    pgwSlider.plugin.find('.ps-caption').show();
                }
            }

            // Slider controls
            if (pgwSlider.config.displayControls) {
                if (typeof pgwSlider.plugin.find('.ps-current > .ps-prev').fadeIn == 'function') {
                    pgwSlider.plugin.find('.ps-current > .ps-prev, .ps-current > .ps-next').fadeIn(pgwSlider.config.transitionDuration / 2);
                } else {
                    pgwSlider.plugin.find('.ps-current > .ps-prev, .ps-current > .ps-next').show();
                }
            }

            // After slide
            if (typeof pgwSlider.config.afterSlide == 'function') {
                pgwSlider.config.afterSlide(element.id);
            }

            // Set the container height
            if (pgwSlider.config.adaptiveHeight) {
                var maxHeight = pgwSlider.plugin.find('.ps-current .elt_' + element.id + ' img').height();
                updateHeight(maxHeight, true);
            }

            return true;
        }

        // Fade an element
        var fadeElement = function (element) {
            var elementContainer = pgwSlider.plugin.find('.ps-current > ul');

            // Update list items
            pgwSlider.plugin.find('.ps-list > li').css('font-weight', 'normal');
            pgwSlider.plugin.find('.ps-list > li.elt_' + element.id).css('font-weight', 'bold');

            elementContainer.find('li').not('.elt_' + pgwSlider.currentSlide).not('.elt_' + element.id).each(function () {
                if (typeof $(this).stop == 'function') {
                    $(this).stop();
                }
                $(this).css('position', '').css('z-index', 1).hide();
            });

            // Current element
            if (pgwSlider.currentSlide > 0) {
                var currentElement = elementContainer.find('.elt_' + pgwSlider.currentSlide);

                if (typeof currentElement.animate != 'function') {
                    currentElement.animate = function (css, duration, callback) {
                        currentElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                if (typeof currentElement.stop == 'function') {
                    currentElement.stop();
                }

                currentElement.css('position', 'absolute').animate({
                    opacity: 0,
                }, pgwSlider.config.transitionDuration, function () {
                    currentElement.css('position', '').css('z-index', 1).hide();
                });
            }

            // Update current id
            pgwSlider.currentSlide = element.id;

            // Next element
            var nextElement = elementContainer.find('.elt_' + element.id);

            if (typeof nextElement.animate != 'function') {
                nextElement.animate = function (css, duration, callback) {
                    nextElement.css(css);
                    if (callback) {
                        callback();
                    }
                };
            }

            if (typeof nextElement.stop == 'function') {
                nextElement.stop();
            }

            nextElement.css('position', 'absolute').show().animate({
                opacity: 1,
            }, pgwSlider.config.transitionDuration, function () {
                nextElement.css('position', '').css('z-index', 2).show();
                finishElement(element);
            });

            return true;
        }

        // Slide an element
        var slideElement = function (element, direction) {
            var elementContainer = pgwSlider.plugin.find('.ps-current > ul');

            if (typeof direction == 'undefined') {
                direction = 'left';
            }

            if (pgwSlider.currentSlide == 0) {
                elementContainer.find('.elt_1').css({
                    position: '',
                    left: '',
                    opacity: 1,
                    'z-index': 2
                }).show();
                pgwSlider.plugin.find('.ps-list > li.elt_1').css('opacity', '1');
                finishElement(element);

            } else {

                if (pgwSlider.transitionInProgress) {
                    return false;
                }

                pgwSlider.transitionInProgress = true;

                // Get direction details
                var elementWidth = elementContainer.width();

                if (direction == 'left') {
                    var elementDest = -elementWidth;
                    var nextOrigin = elementWidth;
                } else {
                    var elementDest = elementWidth;
                    var nextOrigin = -elementWidth;
                }

                var currentElement = elementContainer.find('.elt_' + pgwSlider.currentSlide);

                if (typeof currentElement.animate != 'function') {
                    currentElement.animate = function (css, duration, callback) {
                        currentElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                currentElement.css('position', 'absolute').animate({
                    left: elementDest,
                }, pgwSlider.config.transitionDuration, function () {
                    currentElement.css('position', '').css('z-index', 1).css('left', '').css('opacity', 0).hide();
                });

                // Next element
                var nextElement = elementContainer.find('.elt_' + element.id);

                if (typeof nextElement.animate != 'function') {
                    nextElement.animate = function (css, duration, callback) {
                        nextElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                nextElement.css('position', 'absolute').css('left', nextOrigin).css('opacity', 1).show().animate({
                    left: 0,
                }, pgwSlider.config.transitionDuration, function () {
                    nextElement.css('position', '').css('left', '').css('z-index', 2).show();
                    pgwSlider.transitionInProgress = false;

                    // Display new element
                    pgwSlider.plugin.find('.ps-list > li').css('opacity', '0.6');
                    pgwSlider.plugin.find('.ps-list > li.elt_' + element.id).css('opacity', '1');

                    finishElement(element);
                });
            }

            // Update current id
            pgwSlider.currentSlide = element.id;

            return true;
        }

        // Display the current element
        var displayElement = function (elementId, apiController, direction) {

            if (elementId == pgwSlider.currentSlide) {
                return false;
            }

            var element = pgwSlider.data[elementId - 1];

            if (typeof element == 'undefined') {
                throw new Error('PgwSlider - The element ' + elementId + ' is undefined');
                return false;
            }

            if (typeof direction == 'undefined') {
                direction = 'left';
            }

            // Before slide
            if (typeof pgwSlider.config.beforeSlide == 'function') {
                pgwSlider.config.beforeSlide(elementId);
            }

            if (typeof pgwSlider.plugin.find('.ps-caption').fadeOut == 'function') {
                pgwSlider.plugin.find('.ps-caption, .ps-prev, .ps-next').fadeOut(pgwSlider.config.transitionDuration / 2);
            } else {
                pgwSlider.plugin.find('.ps-caption, .ps-prev, .ps-next').hide();
            }

            // Choose the transition effect
            if (pgwSlider.config.transitionEffect == 'sliding') {
                slideElement(element, direction);
            } else {
                fadeElement(element);
            }

            // Reset interval to avoid a half interval after an API control
            if (typeof apiController != 'undefined' && pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Activate interval
        var activateInterval = function () {
            clearInterval(pgwSlider.intervalEvent);

            if (pgwSlider.slideCount > 1 && pgwSlider.config.autoSlide) {
                pgwSlider.intervalEvent = setInterval(function () {
                    if (pgwSlider.currentSlide + 1 <= pgwSlider.slideCount) {
                        var nextItem = pgwSlider.currentSlide + 1;
                    } else {
                        var nextItem = 1;
                    }
                    displayElement(nextItem);
                }, pgwSlider.config.intervalDuration);
            }

            return true;
        };

        // Start auto slide
        pgwSlider.startSlide = function () {
            pgwSlider.config.autoSlide = true;
            activateInterval();
            return true;
        };

        // Stop auto slide
        pgwSlider.stopSlide = function () {
            pgwSlider.config.autoSlide = false;
            clearInterval(pgwSlider.intervalEvent);
            return true;
        };

        // Get current slide
        pgwSlider.getCurrentSlide = function () {
            return pgwSlider.currentSlide;
        };

        // Get slide count
        pgwSlider.getSlideCount = function () {
            return pgwSlider.slideCount;
        };

        // Display slide
        pgwSlider.displaySlide = function (itemId) {
            displayElement(itemId, true);
            return true;
        };

        // Next slide
        pgwSlider.nextSlide = function () {
            if (pgwSlider.currentSlide + 1 <= pgwSlider.slideCount) {
                var nextItem = pgwSlider.currentSlide + 1;
            } else {
                var nextItem = 1;
            }
            displayElement(nextItem, true, 'left');
            return true;
        };

        // Previous slide
        pgwSlider.previousSlide = function () {
            if (pgwSlider.currentSlide - 1 >= 1) {
                var previousItem = pgwSlider.currentSlide - 1;
            } else {
                var previousItem = pgwSlider.slideCount;
            }
            displayElement(previousItem, true, 'right');
            return true;
        };

        // Destroy slider
        pgwSlider.destroy = function (soft) {
            clearInterval(pgwSlider.intervalEvent);

            if (typeof soft != 'undefined') {
                pgwSlider.plugin.find('.ps-list > li').each(function () {
                    $(this).attr('style', null).removeClass().css('cursor', '').unbind('click').unbind('mouseenter');
                    $(this).find('a').css('cursor', '');
                    $(this).find('img').attr('style', null);
                });

                pgwSlider.plugin.find('.ps-list').addClass(pgwSlider.config.mainClassName).removeClass('ps-list');
                pgwSlider.plugin.find('.ps-current').unwrap().remove();
                pgwSlider.hide();

            } else {
                pgwSlider.parent().remove();
            }

            pgwSlider.plugin = null;
            pgwSlider.data = [];
            pgwSlider.config = {};
            pgwSlider.currentSlide = 0;
            pgwSlider.slideCount = 0;
            pgwSlider.resizeEvent = null;
            pgwSlider.intervalEvent = null;
            pgwSlider.touchFirstPosition = null;
            pgwSlider.transitionInProgress = false;
            pgwSlider.window = null;

            return true;
        };

        // Reload slider
        pgwSlider.reload = function (newOptions) {
            pgwSlider.destroy(true);

            pgwSlider = this;
            pgwSlider.plugin = this;
            pgwSlider.window = $(window);
            pgwSlider.plugin.show();

            // Merge new options with the default configuration
            pgwSlider.config = $.extend({}, defaults, newOptions);

            // Setup
            setup();

            // Activate interval
            if (pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Slider initialization
        init();

        return this;
    }
})(window.Zepto || window.jQuery);
