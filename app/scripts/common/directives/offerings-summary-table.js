define([
	'angular',
	'common/config'
], function(angular) {
	'use strict';

	angular.module('TT-UI.Common.Directives.OfferingsSummaryTable', [
		'TT-UI.Common.Config'
	])

	.directive('offeringsSummaryTable', ['CONFIG', function(CONFIG) {

		var DIRECTIVE_URL = CONFIG.BASE_URL+'views/directives/';

		return {
			require: '?ngModel',
			restrict: 'E',
			scope: {
				offeringInfos: '=',
				onRemove: '&',
				readonly: '=',
				selectable: '=',
				selectedItem: '='
			},
			link: function(scope) {
				scope.onetimeTotal = 0;
				scope.monthlyTotal = 0;

				scope.selectItem = function(item) {
					if (scope.selectable) {
						scope.selectedItem = item;
					}
				};

				var refreshTotals = function() {
					scope.onetimeTotal = 0;
					scope.monthlyTotal = 0;

					angular.forEach(scope.offeringInfos, function(offeringInfo) {

						var count = offeringInfo.count || 1;

						scope.onetimeTotal += offeringInfo.offering.charges.sumOfOTC * count;
						scope.monthlyTotal += offeringInfo.offering.charges.sumOfRC * count;
					});
				};

				var unbind = scope.$watch('offeringInfos', function() {
					refreshTotals();
				}, true);

				scope.$on('$destroy', unbind);
			},
			replace: true,
			templateUrl: DIRECTIVE_URL + 'offerings-summary-table.tpl.html'
		};
	}])
	;
});
