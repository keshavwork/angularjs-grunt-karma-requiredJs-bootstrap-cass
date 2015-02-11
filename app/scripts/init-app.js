(function(require) {
	'use strict';

	var isProduction = require.toUrl('') === './';

	if (isProduction) {
		require.config({
			urlArgs: Date.now(),
			paths: {
				'common/config': 'scripts/common/config'
			}
		});
	}

	require(['window', 'angular', 'app'], function(window, angular, app) {
		angular.element(window.document).ready(function() {
			angular.bootstrap(window.document, [app.name]);
		});
	});
})(require);
