(function() {
	'use strict';

	define('jquery-window', ['window', 'jquery'], function(window, jQuery) {
		return window.jQuery = jQuery;
	});
})();