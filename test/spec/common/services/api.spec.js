define([
	'angular',
	'angular-mocks',
	'common/services/api'
], function(angular, mocks) {
	'use strict';

	describe('Service: Api', function() {
		// instantiate service
		var CONFIG, Api;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.Api');

			mocks.module(function(_CONFIG_) {
				CONFIG = _CONFIG_;
			});

			mocks.inject(function(_Api_) {
				Api = _Api_;
			});
		});

		it('should check if Api module exists', function() {
			expect(!!Api).toBe(true);
			expect(Api).toEqual(jasmine.any(Object));
		});

		it('should expose getUrl method', function() {
			expect(Api.getUrl).toBeDefined();
		});

		it('should expose getMockUrl method', function() {
			expect(Api.getMockUrl).toBeDefined();
		});

		it('should expose getUpcUrl method', function() {
			expect(Api.getUpcUrl).toBeDefined();
		});

		it('should expose getClm360Url method', function() {
			expect(Api.getClm360Url).toBeDefined();
		});

		it('should expose getClm360ApiUrl method', function() {
			expect(Api.getClm360ApiUrl).toBeDefined();
		});
	});
});