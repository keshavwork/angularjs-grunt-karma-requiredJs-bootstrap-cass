define([
	'angular',
	'angular-mocks',
	'common/directives/wizard'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "wizard" ', function() {
		var $compile, $rootScope, $scope, $stateProvider, $state, $location;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.Wizard');

			mocks.module(function(_$stateProvider_) {
				$stateProvider = _$stateProvider_;
			});

			mocks.inject(function(_$compile_, _$rootScope_, _$location_, _$state_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
				$location  = _$location_;
				$state     = _$state_;
			});

			$stateProvider
				.state('a', {
					url:   '/a',
					label: 'Foo A'
				})
				.state('b', {
					parent: 'a',
					url:   '/b',
					label: 'Foo AB'
				})
				.state('c', {
					parent: 'a',
					url:   '/c',
					label: 'Foo AC'
				})
			;
		});

		it('Should check if directive have procesed element', function() {
			// given
			var html = $compile(
				'<wizard>'
					+'<wizard-step state="a"></wizard-step>'
					+'<wizard-step state="c"></wizard-step>'
				+'</wizard>'
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
				'<wizard>'
					+'<wizard-step state="a"></wizard-step>'
					+'<wizard-step state="c"></wizard-step>'
				+'</wizard>'
			)($scope);

			// when
			$scope.$digest();

			// then
			var states = $state.$current.children;
			expect(html.children().length).toEqual(states.length);
		});

	});
});