var rr = rr ? rr : {};
(function($) {
	$.extend(rr, {
		pageReadyClass: function() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		},
		scrollClass: function() {
			var self = this;

			if (self.settings.$window.scrollTop() > 0) {
				self.settings.$html.addClass('scrolled');
				self.settings.$html.addClass('has-scrolled');
			}
			else {
				self.settings.$html.removeClass('scrolled');
			}
		}
	});
	$.subscribe('pageReady', function() {
		rr.pageReadyClass();
	});
	$.subscribe('pageLoaded', function() {
		rr.pageLoadedClass();
	});
	$.subscribe('scroll pageReady', function() {
		// rr.scrollClass();
	});
}(jQuery));
