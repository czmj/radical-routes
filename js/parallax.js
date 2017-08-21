var rr = rr ? rr : {};
(function($) {
    $.extend(rr, {
        parallax: {
            parallaxSelector: '.parallax',
            $parallax: null,
			// Misc
            speed: 0.8,
			windowHeight: 0,

            init: function() {
                var self = this;

                self.$parallax = $(self.parallaxSelector);

				if (self.$parallax.length < 1) {
					return;
				}

                self.windowHeight = rr.settings.$window.innerHeight();

                self.checkScroll();
            },
            checkScroll: function() {
                var self = this;

				if (self.$parallax.length < 1) {
					return;
				}

                // turn off parallax effect on IE & Safari
                if (Modernizr.ie10 || Modernizr.ie11 || Modernizr.edge || Modernizr.safari) {
                    return;
                }

                var scrollTop = rr.settings.$window.scrollTop();

                self.$parallax.each(function() {
                    var $item = $(this),
                        height = $item.outerHeight(),
                        position = scrollTop * self.speed;

                    $item.css('top', position);
                });
            }
        }
    });
    $.subscribe('pageReady', function() {
        rr.parallax.init();
    });
    $.subscribe('scroll', function() {
        rr.parallax.checkScroll();
    });
}(jQuery));
