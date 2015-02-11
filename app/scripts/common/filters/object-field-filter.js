define([
	'angular'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Filters.ObjectFieldFilter', [])

	.filter('objectFieldFilter', [function() {
		return function(input, pattern, sourceField) {

			var filtered = [];

			pattern = (pattern || '').toLowerCase();

			angular.forEach(input, function(item) {
				var value = item[sourceField];

				if (value) {
					value = ('' + value).toLowerCase();

					if(value.indexOf(pattern) >= 0) {
						filtered.push(item);
					}
				}
			});

			return filtered;
		};
	}])
	;
});
