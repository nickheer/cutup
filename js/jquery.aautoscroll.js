/// <reference path="jquery-1.4.2.min.js"/>
/// <reference path="jquery.timers.js"/>
/*
@author Dan Gidman (danatcofo at gmail dot com)
released under GNU General Public License v3
http://www.gnu.org/licenses/gpl.html
version 2.1
September 20, 2010
requires jQuery.timers
http://plugins.jquery.com/project/timers
*/
(function ($) {

    // #region Constants

    // data key
    var key = "$autoscroll";

    // angle enum
    var angles = { up: 90.0, left: 180.0, right: 0.0, upleft: 135.0, upright: 45.0, downleft: 225.0, downright: 315.0, down: 270.0 };

    // #endregion

    // #region Methods
    
    // available methods defaults to init
    var methods = {
        init: function (s) {
            return this.each(function () {
                if ($(this).data(key)) {
                    $(this).data(key, validate($.extend($(this).data(key), s)));
                }
                else {
                    $(this).data(key, validate($.extend({ e: false }, $.fn.autoscroll.defaults.settings, s)));
                    $(this).hover(function () {
                        var c = $(this).data(key);
                        if (c) {
                            if (c.scroll) $(this).stop(true);
                            c.e = true;
                        }
                    }, function () {
                        var c = $(this).data(key);
                        if (c && c.e) {
                            c.e = false;
                        }
                    });
                    $(this).everyTime(50, key, function () {
                        var c = $(this).data(key);
                        if (c && c.scroll && !c.e)
                            $(this).stop(true).animate(getStep(c.step, c.direction), 1000, "linear");
                    });
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                if ($(this).data(key)) { $(this).stop(true); $.timer.remove(this, key); $(this).data(key, null); }
            });
        },
        delay: function (time) {
            return this.each(function () {
                var c = $(this).data(key);
                if (c && c.scroll) {
                    c.scoll = false;
                    $(this).oneTime(time || $.fn.autoscroll.defaults.delay, key, function () {
                        $(this).data(key).scroll = true;
                    });
                }
            });
        },
        fastforward: function (s) {
            return ffrw(this, "ff", s);
        },
        rewind: function (s) {
            return ffrw(this, "rw", s);
        },
        pause: function () {
            return this.each(function () {
                var c = $(this).data(key);
                if (c && c.scroll) { c.scroll = false; $(this).stop(false); }
            });
        },
        resume: function () {
            return this.each(function () {
                var c = $(this).data(key);
                if (c) { c.scroll = true; }
            });
        },
        reverse: function () {
            return this.each(function () {
                var c = $(this).data(key);
                if (c && (c.direction += 180.0) > 360.0) c.direction -= 360.0;
            });
        },
        toggle: function () {
            return this.each(function () {
                var c = $(this).data(key);
                if (c) { c.scroll = !c.scroll; if (!c.scroll) $(this).stop(false); }
            })
        },
        get: function () {
            return this.each(function () {
                if ($(this).data(key)) return $(this).data(key);
            });
        },
        addpausesource: function (e) {
            if (typeof e == "undefined") return this;
            if (!(e instanceof jQuery)) 
                if (typeof e == "string" || e instanceof HTMLHtmlElement)
                    e = $(e);
                else return this;
            
            var s = this.selector;
            e.each(function () {
                $(this).hover(function () {
                    $(s).each(function () {
                        var c = $(this).data(key);
                        if (c) {
                            if (c.scroll) $(this).stop(true);
                            c.e = true;
                        }
                    });
                }, function () {
                    $(s).each(function () {
                        var c = $(this).data(key);
                        if (c && c.e) c.e = false;
                    });
                });
            });
            return this;
        }
    };
    
    // #endregion

    // #region Utilities

    // ff and rw handler
    var ffrw = function (a, dir, s) {
        cfg = validate($.extend($.fn.autoscroll.defaults.ffrw, s));
        return a.each(function () {
            var c = $(this).data(key);
            if (c) {
                var scroll = c.scroll,
                    d = c.direction;
                c.scroll = false;
                if (dir == "rw" && (d += 180.0) > 360.0) d -= 360.0;
                $(this).stop(true).animate(getStep(cfg.step, d), cfg.speed, "swing", function () { if (scroll) $(this).data(key).scroll = true; });
            }
        });
    };

    // validation
    var validate = function (s) {
        if ($.inArray(typeof s.scroll, ["undefined", "boolean"]) < 0)
            $.error("scroll is not a boolean");
        if ($.inArray(typeof s.step, ["undefined", "number"]) < 0 && isNaN(Number(s.step)))
            $.error("step is not a valid number");
        if (s.direction) s.direction = getAngle(s.direction);
        return s;
    };

    // conversions
    var deg2rad = function (a) { return a * Math.PI / 180; };
    var rad2deg = function (a) { return a * 180 / Math.PI; };


    // angle handler
    var getAngle = function (a) {
        if (typeof a === "string" && isNaN(Number(a))) {
            if (angles[a]) a = angles[a];
            else if (a.indexOf("rad") == a.length - 3 &&
                    !isNaN(a = Number(a.substring(0, a.length - 3)))) {
                a = rad2deg(a);
            }
        }
        if (isNaN(a = Number(a))) $.error("Invalid direction on jQuery.autoscroll");
        while (a < 0.0) a += 360.0;
        return a;
    }

    // step handler
    var getStep = function (step, a) {
        a = deg2rad(a);
        var x = Math.round(step * Math.cos(a)),
            y = Math.round(step * Math.sin(a));
        return { scrollTop: ((y < 0) ? "+=" : "-=") + Math.abs(y), scrollLeft: ((x < 0) ? "-=" : "+=") + Math.abs(x) };
    };

    // #endregion

    // #region Public

    // main
    $.fn.autoscroll = function (a, b) {
        /// <summary>Autoscroll scrollable elements.</summary>
        if (methods[a]) return methods[a].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof a === 'object' || !a) return methods.init.apply(this, arguments);
        else $.error('Method ' + a + ' does not exist on jQuery.autoscroll');
    };

    // defaults
    $.fn.autoscroll.defaults = {
        settings: {
            step: 50,
            scroll: true,
            direction: "down"
        },
        delay: 5000,
        ffrw: { speed: "fast", step: 100 }
    };

    // #endregion

})(jQuery);
