define([
	'angular',
	'angular-mocks',
	'angular-ui-router',
	'common/angular-strap'
], function(angular, mocks) {
	'use strict';

	describe('Application AngularStrap:', function() {
		var $compile, $rootScope, $scope, $filter, $dateFilter;

		beforeEach(function() {
			mocks.module('TT-UI.Common.AngularStrap');

			mocks.inject(function(_$compile_, _$rootScope_, _$filter_) {
				$compile    = _$compile_;
				$rootScope  = _$rootScope_;
				$scope      = $rootScope.$new();
				$filter     = _$filter_;
				$dateFilter = $filter('date');
			});
		});

		it('should not trigger an error when resolving state successed', function() {
			// given
			var year = 2015;
			var month = 10;
			var day = 28;
			var hour = 22;
			var minutes = 58;

			var date = new Date(year, month -1, day, hour, minutes, 0, 0);

			var fooDate = [
				[day, month, year].join('/'),
				[hour, minutes].join(':')
			].join(' ');
			var format = 'dd/MM/yyyy HH:mm';
			var isoDate = date.toISOString();

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="'+format+'" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(fooDate);
			$scope.$digest();

			// then
			expect(fooDate).toEqual('28/10/2015 22:58');
			expect(ngModelCtrl.$viewValue).toEqual(fooDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});
	});
});
