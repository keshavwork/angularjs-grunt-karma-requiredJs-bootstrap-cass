(function() {
	'use strict';

	var tests = Object.keys(window.__karma__.files).filter(function(file) {
		if (/(?:\.spec\.js)|(?:\.tpl\.html\.js)$/.test(file)) {
			return file;
		}
	});

	require.config({
		baseUrl: '/base/dist/',

		paths: {
			'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
			'jasmine-jquery': 'bower_components/jasmine-jquery/lib/jasmine-jquery',
			'init-jasmine': '../test/init-jasmine',
			'jquery-window': 'scripts/jquery-window'
		},
		shim: {
			'jquery-window': {
				'deps': [
					'jquery',
					'window'
				],
				exports: 'window'
			},
			'jasmine-jquery': {
				desp: [
					'jquery',
					'jquery-window'
				],
				exports: 'window'
			},
			'angular-mocks': {
				deps: [
					'angular'
				],
				exports: 'angular.mock'
			}
		},

		deps: ['init-jasmine'],

		callback: function() {
			require(tests, function() {
				window.__karma__.start();
			});
		}
	});
})();