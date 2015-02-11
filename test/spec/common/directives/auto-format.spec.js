define([
	'angular',
	'angular-mocks',
	'common/directives/action-links'
], function(angular, mocks) {
	'use strict';

	describe('Directive: "auto-format" ', function() {
		var $compile, $rootScope, $scope, $timeout, CONFIG;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.AutoFormat');

			mocks.module(function(_CONFIG_) {
				CONFIG =_CONFIG_;
			});

			mocks.inject(function(_$compile_, _$rootScope_, _$timeout_) {
				$compile   = _$compile_;
				$rootScope = _$rootScope_;
				$scope     = $rootScope.$new();
				$timeout   = _$timeout_;
			});
		});

		it('Should check if directive have procesed element', function() {
			// given
			CONFIG['test'] = 'dd-mm-yyyy';
			var html = $compile('<input type="text" auto-format="test">')($scope);

			// when
			html.val('12');
			html.triggerHandler('keypress');
			$scope.$digest();
			$timeout.flush();

			// then
			expect(html.val()).toEqual('12-');
		});
	});
});