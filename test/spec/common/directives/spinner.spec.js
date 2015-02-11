define([
	'angular',
	'angular-mocks',
	'common/directives/spinner'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "spinner" ', function() {
		var $compile, $scope, $rootScope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.Spinner');

			mocks.inject(function(_$compile_, _$rootScope_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
			});
		});

		var tpl = '<div spinner="loading"></div>'
		;

		it('Should check if directive have procesed element', function() {
			// given
			var html = $compile(tpl)($scope);

			// when
			$scope.$digest();

			// then
			expect(html).not.toBe(null);
			expect(html.length).not.toEqual(0);
		});

		it('Should set loading class when state change starts', function() {
			// given
			var html = $compile(tpl)($scope);

			// when
			$rootScope.$emit('$stateChangeStart');

			//  then
			expect(html.attr('class')).toMatch('loading');
		});

		it('Should remove loading class when state change ends', function() {
			// given
			var html = $compile(tpl)($scope);

			// when
			$rootScope.$emit('$stateChangeStart');
			$rootScope.$emit('$stateChangeSuccess');

			//  then
			expect(html.attr('class')).not.toMatch('loading');
		});

		it('Should check if events where removed when destroying scope of Spinner', function() {
			// given
			var html = $compile(tpl)($scope);

			// when
			$scope.$destroy();
			$rootScope.$broadcast('$stateChangeStart');

			// then
			expect(html.hasClass('loading')).toBe(false);
		});
	});
});