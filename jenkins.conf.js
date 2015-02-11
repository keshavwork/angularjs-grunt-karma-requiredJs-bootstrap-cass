// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
	'use strict';

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine', 'requirejs'],

		// list of files / patterns to load in the browser
		files: [
			'dist/scripts/*.scripts.js',

			'test/test-jenkins-main.js',

			{pattern: 'dist/scripts/**/*.tpl.html',  included: false},
			{pattern: 'dist/scripts/common/config.js', included: false},

			{pattern: 'dist/scripts/jquery-window.js', included: false},
			{pattern: 'dist/bower_components/angular-mocks/angular-mocks.js', included: false},
			{pattern: 'dist/bower_components/jasmine-jquery/lib/jasmine-jquery.js', included: false},

			{pattern: 'test/init-jasmine.js', included: false},
			{pattern: 'test/spec/**/*.spec.js', included: false},
			{pattern: 'test/spec/**/*.data.js', included: false, served: true },

			{pattern: 'dist/data/locale-*.json', watched: true, included: false, served: true}
		],

		preprocessors: {
			'dist/scripts/**/*.tpl.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: 'dist/',
			moduleName: 'html2js'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots'],

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8081,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};