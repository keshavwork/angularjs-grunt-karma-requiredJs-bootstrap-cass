define([
	'angular',
	'common/routes',
	'new-project/config',
	'new-project/controllers/dummy-controller'
], function(angular) {
	'use strict';

	return angular.module('NewProject.App', [
		'TT-UI.Common.Routes',
		'NewProject.Config',
		'NewProject.Controller.DummyController'
	])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('np',{
				parent: 'index',
				url: 'new-project/',
				abstract : true,
				template: '<ui-view/>'
			})
			;
	}])
	;
});