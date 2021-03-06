define([
	'angular',
	'angular-mocks',
	'common/directives/route-label'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "route-label" ', function() {
		var $compile, $rootScope, $scope, $stateProvider, $urlRouterProvider, $state, $location;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.RouteLabel');

			mocks.module(function(_$stateProvider_, _$urlRouterProvider_) {
				$stateProvider      = _$stateProvider_;
				$urlRouterProvider = _$urlRouterProvider_;
			});

			mocks.inject(function(_$compile_, _$rootScope_, _$location_, _$state_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
				$location  = _$location_;
				$state     = _$state_;

				$urlRouterProvider.otherwise('');
			});
		});

		it('Should check if directive have procesed element', function() {
			// given
			var $scope     = $rootScope.$new(),
				html       = $compile('<span route-label></span>')($scope),
				stateName  = 'test',
				stateLabel = 'Foo Label',
				stateUrl   = '/test';

			$stateProvider.state(stateName, {
				url:   stateUrl,
				label: stateLabel
			});

			// when
			$location.path(stateUrl);
			$scope.$emit('$locationChangeSuccess');
			$scope.$apply();

			// then
			expect(html).not.toBe(null);
			expect(html.text()).toMatch(stateLabel);
		});


		it('Should test if label is missing', function() {
			// given
			var $scope = $rootScope.$new(),
				html   = $compile('<span route-label></span>')($scope);

			// when
			$location.path('/foo');
			$scope.$emit('$locationChangeSuccess');
			$scope.$apply();

			// then
			expect(html.text()).toMatch('');
		});
	});
});