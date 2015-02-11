(function(require) {
	'use strict';

	// Selectors for selecting fixed header and footer elements
	var headerSelector = '.navbar-fixed-top';
	var footerSelector = '.navbar-fixed-bottom';

	var debounceTimeoutMs = 100;


	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate){
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow){
				func.apply(context, args);
			}
		};
	}


	require(['window', 'jquery'], function(window, $) {

		var paddings = null;

		var getPaddings = function(refresh) {

			if (!refresh && paddings) {
				return paddings;
			}

			paddings = {
				top: 0,
				bottom: 0
			};

			$(headerSelector).each(function() {
				paddings.top += this.getBoundingClientRect().height;
			});
			$(footerSelector).each(function() {
				paddings.bottom += this.getBoundingClientRect().height;
			});

			return paddings;
		};


		var scrollToElement = function(element, refreshPaddings) {
			if (element && element.getBoundingClientRect) {
				var wnd = $(window);
				var rect = element.getBoundingClientRect();

				var pad = getPaddings(refreshPaddings); 

				var scrollOffset = 0;
				if (rect.top < pad.top) {
					scrollOffset = rect.top - pad.top;
				}
				if (rect.bottom > wnd.height() - pad.bottom) {
					scrollOffset = rect.bottom - (wnd.height() - pad.bottom);
				}

				if (scrollOffset !== 0) {
					window.scrollTo(wnd.scrollLeft(), wnd.scrollTop() + scrollOffset);
				}
			}
		};

		var scrollToElementDebounce = debounce(scrollToElement, debounceTimeoutMs);

		window.addEventListener('focus', function(e) {
			scrollToElement(e.target);
		}, true);

		window.addEventListener('resize', function() {
			scrollToElementDebounce(document.activeElement, true);
		});
	});
})(require);
