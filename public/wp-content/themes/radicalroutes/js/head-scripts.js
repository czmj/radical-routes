Modernizr&&(Modernizr.addTest("ipad",function(){return!!navigator.userAgent.match(/iPad/i)}),Modernizr.addTest("iphone",function(){return!!navigator.userAgent.match(/iPhone/i)}),Modernizr.addTest("ipod",function(){return!!navigator.userAgent.match(/iPod/i)}),Modernizr.addTest("ios",function(){return Modernizr.ipad||Modernizr.ipod||Modernizr.iphone}),Modernizr.addTest("ie10",function(){var r=!!navigator.userAgent.match(/Trident\/6.0/),n=!!navigator.userAgent.match(/MSIE 10/);return r&&n}),Modernizr.addTest("ie11",function(){var r=!!navigator.userAgent.match(/Trident\/7.0/),n=!!navigator.userAgent.match(/.NET4.0C/);return r&&n}),Modernizr.addTest("edge",function(){return!!navigator.userAgent.match(/Edge\/\d+/)}),Modernizr.addTest("safari",function(){var r=!!navigator.userAgent.match(/Safari\//),n=!!navigator.userAgent.match(/Chrome\//);return r&&!n}),Modernizr.addTest("windowsphone",function(){return!!navigator.userAgent.match(/(Windows Phone)/)}),Modernizr.addTest("android",function(){return!!navigator.userAgent.match(/(Android)/)}),Modernizr.addTest("macos",function(){return!!navigator.userAgent.match(/(Mac OS)/)}),Modernizr.addTest("firefox",function(){return!!navigator.userAgent.match(/firefox/i)}));