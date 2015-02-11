define([
	'angular',
	'angular-sanitize',
	'angular-ui-router',
	'common/app',
	'new-project/app'
], function(angular) {
	'use strict';

	return angular.module('NewProjectApp', [
		'ngSanitize',
		'ui.router',

		'TT-UI.Common.App',
		'NewProject.App'
	])
	;
});