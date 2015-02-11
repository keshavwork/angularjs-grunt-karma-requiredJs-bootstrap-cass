(function() {
	'use strict';

	define('tv4-global', ['window', 'tv4', 'tv4-config'], function(window, tv4, config) {

		var formats = config.formats || {};

		// Register custom formats defined in config
		Object.keys(formats).forEach(function(key) {

			var pattern = new RegExp(formats[key]);

			tv4.addFormat(key, function(data) {
				if(data && !pattern.test(data)) {
					return 'Format error';
				}
			});
		});

		return window.tv4 = tv4;
	});
})();