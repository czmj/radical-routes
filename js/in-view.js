var rr = rr ? rr : {};
(function($) {
	$.extend(rr, {
		inView: {
			// jQuery DOM caching
			$items: null,
			// CSS selectors
			itemSelector: '.in-view-container',
			// Classes
			activeClass: 'in-view-active',
			singleUseClass: 'in-view-single-use',
			// Misc
			windowHeight: 0,

			init: function() {
				var self = this;

				self.$items = $(self.itemSelector);

				if (self.$items.length < 1) {
					return;
				}

				self.windowHeight = rr.settings.$window.innerHeight();

				self.$items.each(function() {
					var $item = $(this);
					self.calculatePostion($item);
				});
			},

			// calculate position of $item relative to document
			calculatePostion: function($item) {
				var self = this;

				if (!$item) {
					return;
				}

				var height = $item.outerHeight(),
					offset = $item.offset().top,
					inViewPercentage = $item.data('in-view-percentage') ? $item.data('in-view-percentage') : 50,
					offsetAdjusted = offset - (height / 2) + (height * inViewPercentage / 100);
					inViewPos = parseInt(offsetAdjusted, 10);

				$item.attr('data-inview-pos-top', inViewPos);

				self.checkScroll();
			},

			// bind functions to scroll event
			checkScroll: function() {
				var self = this;

				if (self.$items.length < 1) {
					return;
				}

				var scrollTop = rr.settings.$window.scrollTop();

				self.$items.each(function() {
					var $item = $(this);

					self.checkInView($item, scrollTop);
				});
			},
			// calculate position of $item relative to window and add class
			checkInView: function($item, scrollTop) {
				var self = this;

				if ($item.attr('data-inview-pos-top') < scrollTop + self.windowHeight) {
					$item.addClass(self.activeClass);
				}
				// hide elements again when scrolling up
				// else if (!$item.hasClass(self.singleUseClass)){
				// 	$item.removeClass(self.activeClass);
				// }
			}
		}
	});
	$.subscribe('pageReady', function() {
		rr.inView.init();
	});
	$.subscribe('scroll', function() {
		rr.inView.checkScroll();
	});
}(jQuery));
