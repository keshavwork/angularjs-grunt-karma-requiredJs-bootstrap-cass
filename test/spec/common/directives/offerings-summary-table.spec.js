define([
	'angular',
	'angular-mocks',
	'common/directives/offerings-summary-table'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "offerings-summary-table" ', function() {
		var $compile, $rootScope, $scope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.OfferingsSummaryTable');

			mocks.inject(function(_$compile_, _$rootScope_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
			});
		});

		it('Should check if directive have procesed element', function() {
			// given
			var html = $compile(
				'<offerings-summary-table></offerings-summary-table>'
			)($scope);

			// when
			$scope.$digest();

			// then
			expect(html).not.toBe(null);
			expect(html.length).not.toEqual(0);
			expect(html.prop('tagName').toLowerCase()).not.toMatch('wizard');
		});

		it('Should test if element contains proper structure', function() {
			// given
			var html = $compile(
				'<offerings-summary-table></offerings-summary-table>'
			)($scope);

			// when
			$scope.$digest();

			// then
			expect(html.find('table').length).toEqual(1);
		});

	});
});