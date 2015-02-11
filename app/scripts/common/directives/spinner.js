define([
	'angular',
	'angular-ui-router'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Directives.Spinner', [
		'ui.router'
	])

	.directive('spinner', function($rootScope) {
		return {
			restrict: 'A',

			link: function($scope, element, attr) {
				var className = attr.spinner,
					addClass  = function() {
						element.addClass(className);
					},
					removeClass = function() {
						element.removeClass(className);
					},
					unboundEvents = [];

				unboundEvents.push($rootScope.$on('$stateChangeStart',   addClass));
				unboundEvents.push($rootScope.$on('$viewContentLoading', addClass));

				unboundEvents.push($rootScope.$on('$stateChangeSuccess', removeClass));
				unboundEvents.push($rootScope.$on('$viewContentLoaded',  removeClass));

				$scope.$on('$destroy', function() {
					unboundEvents.forEach(function(unboundEvent) {
						unboundEvent();
					});
				});
			}
		};
	})
	;
});