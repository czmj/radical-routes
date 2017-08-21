var rr = rr ? rr : {};
(function($) {
    $.extend(rr, {
        navigation: {
            // jQuery DOM caching
            $navigation: null,
            // CSS selectors
            navigationSelector: '.navigation',
            navigationItemSelector: '.navigation__item',
            // Classes
            activeClass: 'navigation__item--active',
            // Misc

            init: function() {
                var self = this;

                self.$navigationItems = $(self.navigationItemSelector);

                if (rr.monitorMq.currentBreakpoint > rr.settings.breakpoint_lg) {
                    return;
                }

                if (self.$navigationItems.length < 1) {
                    return;
                }

                self.$navigationItems.removeClass(self.activeClass);

                self.bindEvents();
            },
            bindEvents: function() {
                var self = this;

                self.$navigationItems.on('click', function(e){
                    var $item = $(this),
                        active = false;

                    if ($item.hasClass(self.activeClass)) {
                        active = true;
                    }

                    self.$navigationItems.removeClass(self.activeClass);

                    if (!active) {
                        $item.addClass(self.activeClass);
                    }

                });

            }
        }
    });
    $.subscribe('pageReady viewportResizeEnd', function() {
        rr.navigation.init();
    });
}(jQuery));
