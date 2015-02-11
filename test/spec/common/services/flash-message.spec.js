define([
	'angular',
	'angular-mocks',
	'common/services/api',
	'common/services/flash-message'
], function(angular, mocks) {
	'use strict';

	describe('Service: FlashMessage', function() {
		// instantiate service
		var FlashMessage;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.FlashMessage');

			mocks.inject(function(_FlashMessage_) {
				FlashMessage = _FlashMessage_;
			});
		});

		it('should check if FlashMessage module exists', function() {
			expect(!!FlashMessage).toBe(true);
			expect(FlashMessage).toEqual(jasmine.any(Object));
		});

		it('should expose show method', function() {
			expect(FlashMessage.show).toBeDefined();
		});

		it('should expose hide method', function() {
			expect(FlashMessage.show).toBeDefined();
		});
	});
});