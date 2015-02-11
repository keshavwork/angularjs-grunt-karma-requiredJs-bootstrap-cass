define([
	'angular',
	'angular-mocks',
	'common/directives/forms'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "forms" ', function() {
		var $compile, $rootScope, $scope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.Forms');

			mocks.inject(function(_$compile_, _$rootScope_, _$location_, _$state_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
			});
		});

		var todo = [
			'autoTabForm',
			'autoTabField',
			'autoTabSubmit',
			'autofocus',
			'validationStatus',
			'reloadOptions'
		];

	});
});