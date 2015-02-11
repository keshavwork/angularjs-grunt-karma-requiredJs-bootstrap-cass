define([
	'angular',
	'angular-mocks',
	'common/directives/progress-bar'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "progress-bar" ', function() {
		var $compile, $rootScope, $scope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.ProgressBar');

			mocks.inject(function(_$compile_, _$rootScope_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = _$rootScope_.$new();
			});
		});

		it('Should check if directive have procesed element', function() {
			// given
			var html = $compile('<progress-bar value="35" />')($scope);

			// when
			$scope.$digest();

			// then
			expect(html).not.toBe(null);
			expect(html.length).not.toEqual(0);
			expect(html.prop('tagName').toLowerCase()).not.toMatch('progress-bar');
		});

		it('Should test if element contains proper structure', function() {
			// given
			var percent = 78,
				html    = $compile('<progress-bar value="'+percent+'" />')($scope),
				valueEl = html.children();

			// when
			$scope.$digest();

			//  then
			expect(html.attr('class')).toMatch('progress-bar');
			expect(valueEl.attr('class')).toMatch('value');
			expect(valueEl.attr('data-value')).toMatch(percent);
		});
	});
});