define([
	'angular',
	'common/config',
	'common/states'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Routes', [
		'TT-UI.Common.Config',
		'TT-UI.Common.States'
	])

	.config(['$stateProvider', '$urlRouterProvider', 'CONFIG', function($stateProvider, $urlRouterProvider, CONFIG) {
		var viewUrl = CONFIG.BASE_URL+'views/';

		$stateProvider
			.state('error', {
				url: '/error/',
				views: {
					'main@': {
						templateUrl: viewUrl+'error.tpl.html'
					}
				},
				label: 'Error'
			})

			.state('index', {
				url: '/',
				label: 'Home'
			})

			.state('redirect', {
				url: '',
				resolve: {
					redirect: ['$state', '$timeout', function($state, $timeout) {
						$timeout(function() {
							$state.go(CONFIG.INDEX_STATE);
						}, 0);
					}]
				}
			})
			;
	}])
	;
});