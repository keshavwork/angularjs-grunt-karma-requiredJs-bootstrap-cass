define([
	'angular',
	'angular-ui-router',
	'angular-translate',
	'common/config',
	'common/states'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Directives.Wizard', [
		'ui.router',
		'pascalprecht.translate',
		'TT-UI.Common.Config',
		'TT-UI.Common.States'
	])

	.directive('wizard', ['CONFIG', function(CONFIG) {
		var DIRECTIVE_URL = CONFIG.BASE_URL+'views/directives/';

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {},

			controller: ['$scope', '$state', function($scope, $state) {
				$scope.steps = [];

				var steps      = $scope.steps;
				var controller = this;
				var stateName;

				this.selectStep = function(step) {
					steps.forEach(function(step) {
						step.selected = false;
					});

					stateName = step.state.name;
					step.selected = true;

					$state.go(stateName);
				};

				this.addStep = function(step) {
					if (!steps.length) {
						controller.selectStep(step);
					}

					steps.push(step);
				};


				/*
				var ubound = $scope.$on('$stateChangeSuccess', function(e, state, params, newState) {
					// Reload state
					var foundStep;

					steps.some(function(step) {
						if (step.state === state.name) {
							foundStep = step;
							return true;
						}
					});

					controller.selectTab(foundStep || steps[0]);
				});

				$scope.$on('$destroy', ubound);
				*/
			}],

			templateUrl: DIRECTIVE_URL+'wizard.tpl.html'

		};
	}])

	.directive('wizardStep', ['CONFIG', '$state', function(CONFIG, $state) {
		var DIRECTIVE_URL = CONFIG.BASE_URL+'views/directives/';

		return {
			restrict: 'E',
			replace: true,
			require: '^wizard',

			scope: true,

			link: function(scope, element, attrs, wizardController) {
				scope.state = $state.get(attrs.state);

				wizardController.addStep(scope);

				scope.select = function() {
					wizardController.selectStep(scope);
				};

				scope.isStepSelected = function() {
					return $state.current.name === scope.state.name;
				};
			},

			templateUrl: DIRECTIVE_URL+'wizard-step.tpl.html'
		};
	}])
	;
});