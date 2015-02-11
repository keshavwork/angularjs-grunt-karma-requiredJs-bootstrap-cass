define([
	'angular',
	'angular-ui-router',
	'oauth-ng',
	'common/config',
	'common/translate'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Auth.Controllers.Login', [
		'ui.router',
		'oauth',
		'pascalprecht.translate',
		'TT-UI.Common.Config'
	])

	.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state('login', {
			url: '/login/',
			views: {
				'main@': {
					controller: 'LoginCtrl',
					templateUrl: 'scripts/auth/views/login.tpl.html'
				}
			},
			data : {
				authenticatedAccess : false
			},
			label: 'Login'
		});
	}])

	.controller('LoginCtrl', ['$scope', 'CONFIG', function($scope, CONFIG) {

		$scope.getSsoUri = function() {
			return CONFIG.SSO_OAUTH_URI;
		};

		$scope.getSsoUriPath = function() {
			return CONFIG.SSO_OAUTH_URI_PATH;
		};

		$scope.getSsoClientId = function() {
			return CONFIG.SSO_OAUTH_CLIENT_ID;
		};

		$scope.getSsoRedirectUri = function() {
			return CONFIG.SSO_OAUTH_REDIRECT_URI;
		};

		$scope.getSsoScope = function() {
			return CONFIG.SSO_OAUTH_SCOPE;
		};

		$scope.getSsoState = function() {
			return CONFIG.SSO_OAUTH_STATE;
		};

		$scope.getSsoProfileUri = function() {
			return CONFIG.SSO_PROFILE_URI;
		};

		$scope.getSsoTemplate = function() {
			return 'scripts/auth/views/login-oauth.tpl.html';
		};
	}])
	;
});
