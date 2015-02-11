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
			'test/test-karma-main.js',

			{pattern: 'app/scripts/**/*.tpl.html',  included: false},

			{pattern: 'app/bower_components/**/*.js', included: false},
			{pattern: 'app/scripts/**/*.js', included: false},
			{pattern: 'test/init-jasmine.js',  included: false},

			{pattern: 'test/spec/**/*.spec.js', included: false},
			{pattern: 'test/spec/**/*.data.js', included: false, served: true },

			{pattern: 'app/data/locale-*.json', watched: true, included: false, served: true}
		],

		// list of files / patterns to exclude
		exclude: [
			'app/scripts/main.js'
		],

		preprocessors: {
			'app/scripts/**/*.js': ['coverage'],
			'app/scripts/**/*.tpl.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: 'app/',
			moduleName: 'html2js'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['junit', 'coverage', 'progress', 'growl'],
		junitReporter: {
			outputFile: 'test-results.xml'
		},

		// optionally, configure the reporter
		coverageReporter: {
			reporters:[
				{type: 'html', dir: 'docs/reports/js-coverage/'},
				{type: 'cobertura', dir: 'docs/reports/js-cobertura-coverage/'}
			]
		},


		// web server port
		port: 8081,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

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
		singleRun: false
	});
};