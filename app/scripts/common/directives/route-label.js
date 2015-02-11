define([
	'angular',
	'angular-ui-router'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Directives.RouteLabel', [
		'ui.router'
	])

	.directive('routeLabel', function() {
		return {
			restrict: 'A',
			transclude: true,

			controller: ['$scope', '$state', function($scope, $state) {
				$scope.currentState = {
					label: ''
				};

				var unbound = $scope.$on('$stateChangeSuccess', function() {
					var state = $state.$current,
						currentState;

					while (state) {
						if (state.label && state.url) {
							currentState = state;
							break;
						}

						state = state.parent;
					}

					$scope.currentState = currentState;
				});

				$scope.$on('$destroy', unbound);
			}],

			link: function($scope, element) {
				$scope.$watch(function() {
					return ($scope.currentState && $scope.currentState.label) ? $scope.currentState.label : null;
				}, function() {
					element.text($scope.currentState.label);
				});
			}
		};
	})
	;
});