define([
	'angular',
	'angular-mocks',
	'common/services/not-json-parser'
], function(angular, mocks) {
	'use strict';

	describe('Service: NotJSonParser', function() {
		// instantiate service
		var NotJsonParser;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.NotJsonParser');

			mocks.inject(function(_NotJsonParser_) {
				NotJsonParser = _NotJsonParser_;
			});
		});

		it('should check if NotJsonParser module exists', function() {
			expect(!!NotJsonParser).toBe(true);
			expect(NotJsonParser).toEqual(jasmine.any(Object));
		});

		it('should expose parse method', function() {
			expect(NotJsonParser.parse).toBeDefined();
		});
	});
});