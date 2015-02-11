define([
	'angular'
], function(angular) {
	'use strict';

	return angular.module('NewProject.Config', [])

	.constant('NP_CONFIG', {
		BASE_URL: 'scripts/new-project/' // Slash at the end
	})
	;
});