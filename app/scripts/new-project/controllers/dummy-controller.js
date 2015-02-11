define([
	'angular',
	'angular-ui-router',
	'common/routes',
	'new-project/config'
], function (angular) {
	'use strict';

	return angular.module('NewProject.Controller.DummyController', [
		'ui.router',
		'TT-UI.Common.Routes',
		'NewProject.Config'
	])

	.config(['$stateProvider', 'CONFIG', 'NP_CONFIG', function($stateProvider, CONFIG, MODULE_CONFIG) {
		var moduleViewUrl = MODULE_CONFIG.BASE_URL+'views/';

		$stateProvider.state('dummy', {
			parent: 'np',
			url: 'dummy/',
			views: {
				'main@': {
					templateUrl: moduleViewUrl+'dummy-template.tpl.html',
					controller: 'DummyController'
				}

			},
			label: 'Dummy'
		});
	}])

	.controller('DummyController', ['$scope', function DummyController($scope) {
		$scope.foo = [
			'bar',
			'test',
			'value'
		];
	}])
;
});