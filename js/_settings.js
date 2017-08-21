var rr = rr ? rr : {};
(function($) {
	$.extend(rr, {
		settings: {
			// cache some common variables
			$window: $(window),
			$html: $('html'),
			$body: $('body'),
			$htmlbody: $('html,body'),
			// breakpoint variables (should match _variables.scss)
			breakpoint_s: 480,
			breakpoint_md: 860,
			breakpoint_lg: 1200,
			breakpoint_xl: 1400,
			breakpoint_xxl: 1920
		}
	});
}(jQuery));
