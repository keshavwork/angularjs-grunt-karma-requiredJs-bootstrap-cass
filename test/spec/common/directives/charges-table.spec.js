define([
	'angular',
	'angular-mocks',
	'common/directives/charges-table'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "charges-table" ', function() {
		var $compile, $rootScope, $scope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.ChargesTable');

			mocks.inject(function(_$compile_, _$rootScope_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
			});
		});

		it('Should check if directive have procesed element', function() {
			// given
			var html = $compile(
				'<charges-table></charges-table>'
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
				'<charges-table></charges-table>'
			)($scope);

			// when
			$scope.$digest();

			// then
			expect(html.find('table').length).toEqual(1);
		});

	});
});