define([
	'angular',
	'angular-mocks'
], function(angular, mocks) {
	'use strict';

	describe('Application Bootsrap (run):', function() {

		var $rootScope;

		beforeEach(mocks.inject(function(_$rootScope_) {
			$rootScope = _$rootScope_;
		}));

		it('should check if $rootScope exists', function() {
			expect(!!$rootScope).toBe(true);
			expect($rootScope).toEqual(jasmine.any(Object));
		});
	});
});