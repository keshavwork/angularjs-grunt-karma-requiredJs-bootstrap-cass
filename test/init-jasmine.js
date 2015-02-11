define([
	'jquery',
	'angular',
	'angular-mocks',
	'angular-translate',
	'jquery-window',
	'jasmine-jquery'
], function($, angular, mocks) {
	'use strict';


	beforeEach(function() {
		// Dissable bootstraping application
		spyOn(angular, 'bootstrap');

		mocks.module('html2js');
		mocks.module('pascalprecht.translate');

		mocks.module(function($translateProvider, $provide) {
			spyOn($translateProvider, 'useStaticFilesLoader');
			spyOn($translateProvider, 'determinePreferredLanguage').andReturn('en');

			$translateProvider.translations('en', {});
			$translateProvider.preferredLanguage('en');
			$translateProvider.use('en');
		});
	});


	beforeEach(function() {
		this.addMatchers({
			toBeInstanceOf: function(expectedInstance) {
				var actual = this.actual;
				var notText = this.isNot ? ' not' : '';

				this.message = function() {
					return 'Expected ' + actual.constructor.name + notText + ' is instance of ' + expectedInstance.name;
				};

				return actual instanceof expectedInstance;
			}
		});
	});

	return jasmine;
});