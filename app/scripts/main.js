(function(require) {
	'use strict';

	require.config({
		baseUrl: 'scripts',
		paths: {
			angular: '../bower_components/angular/angular',
			'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
			'angular-resource': '../bower_components/angular-resource/angular-resource',
			'angular-route': '../bower_components/angular-route/angular-route',
			'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
			'angular-translate': '../bower_components/angular-translate/angular-translate',
			'angular-translate-loader-static-files': '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
			'angular-translate-loader-url': '../bower_components/angular-translate-loader-url/angular-translate-loader-url',
			'angular-translate-storage-local': '../bower_components/angular-translate-storage-local/angular-translate-storage-local',
			'angular-translate-storage-cookie': '../bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie',
			'angular-ui-date': '../bower_components/angular-ui-date/src/date',
			'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
			jquery: '../bower_components/jquery/jquery',
			'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
			'jasmine-jquery': '../bower_components/jasmine-jquery/lib/jasmine-jquery',
			'schema-form': '../bower_components/angular-schema-form/dist/schema-form.min',
			'bootstrap-decorator': '../bower_components/angular-schema-form/dist/bootstrap-decorator.min',
			objectpath: '../bower_components/objectpath/lib/ObjectPath',
			tv4: '../bower_components/tv4/tv4',
			'angular-strap': '../bower_components/angular-strap/dist/angular-strap',
			'angular-strap.tpl': '../bower_components/angular-strap/dist/angular-strap.tpl',
			'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
			affix: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
			alert: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
			button: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
			carousel: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
			collapse: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
			dropdown: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
			tab: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
			transition: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
			scrollspy: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
			modal: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
			tooltip: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
			popover: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
			'angular-animate': '../bower_components/angular-animate/angular-animate',
			'angular-storage': '../bower_components/a0-angular-storage/dist/angular-storage',
			'a0-angular-storage': '../bower_components/a0-angular-storage/dist/angular-storage',
			'angular-smart-table': '../bower_components/angular-smart-table/dist/smart-table.min',
			'tecnotree-ui-library': '../bower_components/tecnotree-ui-library/dist/scripts/*',
			'ng-storage': '../bower_components/ngstorage/ngStorage',
			'oauth-ng': '../bower_components/oauth-ng/dist/oauth-ng'
		},
		shim: {
			angular: {
				exports: 'angular'
			},
			'angular-cookies': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-resource': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-route': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-sanitize': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-ui-date': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-ui-router': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-translate': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-translate-loader-static-files': {
				deps: [
					'angular',
					'angular-translate'
				],
				exports: 'angular'
			},
			'angular-translate-loader-url': {
				deps: [
					'angular',
					'angular-translate'
				],
				exports: 'angular'
			},
			'angular-translate-storage-cookie': {
				deps: [
					'angular',
					'angular-translate'
				],
				exports: 'angular'
			},
			'angular-translate-storage-local': {
				deps: [
					'angular',
					'angular-translate',
					'angular-translate-storage-cookie'
				],
				exports: 'angular'
			},
			'angular-mocks': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			jquery: {
				exports: 'jquery'
			},
			'jasmine-jquery': {
				desp: [
					'jquery'
				],
				exports: 'jquery'
			},
			'objectpath-angular': {
				deps: [
					'objectpath'
				],
				exports: 'angular'
			},
			'schema-form': {
				deps: [
					'angular',
					'objectpath-angular',
					'tv4',
					'tv4-global'
				],
				exports: 'angular'
			},
			'angular-bootstrap': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			tv4: {
				exports: 'tv4'
			},
			'tv4-global': {
				deps: [
					'tv4'
				],
				exports: 'tv4'
			},
			'angular-animate': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-strap': {
				deps: [
					'angular-animate',
					'angular'
				],
				exports: 'angular'
			},
			'angular-strap.tpl': {
				deps: [
					'angular',
					'angular-strap'
				],
				exports: 'angular'
			},
			'angular-storage': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'angular-smart-table': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'ng-storage': {
				deps: [
					'angular'
				],
				exports: 'angular'
			},
			'oauth-ng': {
				deps: [
					'angular',
					'ng-storage'
				],
				exports: 'angular'
			}
		},
		deps: [
			'app',
			'init-app',
			'onfocus-scroll'
		],
		packages: [
	
		]
	});
})(require);
