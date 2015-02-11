define([
	'angular',
	'angular-ui-router',
	'oauth-ng',
	'common/config'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Auth.Services.OAuth', [
		'ui.router',
		'oauth',
		'TT-UI.Common.Config'
	])

	.constant('AUTH', {
		ERROR_NOT_AUTH: '$auth.notAuthorized'
	})

	.constant('OAUTH_AUTH', {
		HTTP_HEADER_NAME:  'Authorization',
		HTTP_HEADER_VALUE: 'Bearer {{accessToken}}',

		HTTP_BAD_REQUEST_CODE:  400,
		HTTP_UNAUTHORIZED_CODE: 401
	})

	.config(['CONFIG', '$stateProvider', '$urlRouterProvider', function(CONFIG, $stateProvider, $urlRouterProvider) {
		var fetchToken = ['$location', '$state', 'AccessToken', function($location, $state, AccessToken) {

			var hash =  $location.url().replace(/^[\#\/]/, '');
			AccessToken.setTokenFromString(hash);

			$state.go(CONFIG.INDEX_STATE);
		}];

		$stateProvider.state('oauth-token', {
			url: '/access_token={accessToken}',
			onEnter: fetchToken,
			data : {
				authenticatedAccess : false
			}
		});

		$stateProvider.state('google-oauth-token', {
			url: '/state={accessToken}',
			onEnter: fetchToken,
			data : {
				authenticatedAccess : false
			}
		});

		$urlRouterProvider.otherwise('/login/');
	}])

	.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('ApiInterceptor');
    }])

	.factory('ApiResponse', ['OAUTH_AUTH', function(OAUTH_AUTH) {
		return {
			isAuthorized: function(response) {
				var reqHasAuthHeader = response.config.headers.hasOwnProperty(OAUTH_AUTH.HTTP_HEADER_NAME);
				var statusCode = response.status;

				if (!reqHasAuthHeader) {
					return true;
				}

				return (
					statusCode !== OAUTH_AUTH.HTTP_UNAUTHORIZED_CODE &&
					statusCode !== OAUTH_AUTH.HTTP_BAD_REQUEST_CODE);
			}
		};
	}])

	.factory('ApiInterceptor', [
		'OAUTH_AUTH', '$rootScope', '$q', 'AccessToken', 'ApiResponse',
		function(OAUTH_AUTH, $rootScope, $q, AccessToken, ApiResponse
	) {
		var token;

		var events = [
			'oauth:authorized',
			'oauth:login',
			'oauth:logout',
			'oauth:loggedOut',
			'oauth:denied',
			'oauth:expired'
		];

		var updateToken = function() {
			token = AccessToken.get();
		};

		events.forEach(function(eventName) {
			$rootScope.$on(eventName, updateToken);
		});

		return {
			request: function(config) {
				if (token && token.access_token) {
					var headerValue = OAUTH_AUTH.HTTP_HEADER_VALUE.replace('{{accessToken}}', token.access_token);

					config.headers[OAUTH_AUTH.HTTP_HEADER_NAME] = headerValue;
				}

				return config;
			},

			responseError: function(response) {
				if (!ApiResponse.isAuthorized(response)) {
					AccessToken.destroy();

					$rootScope.$emit('oauth:denied');
				}

				return $q.reject(response);
			}
		};
	}])

	.factory('Auth', [
		'$rootScope','AccessToken',
		function($rootScope, AccessToken
	) {
		return {
			logout : function(){
				AccessToken.destroy();

				$rootScope.$emit('oauth:logout');
				$rootScope.$emit('oauth:loggedOut');
			},

			isAuthenticationRequired : function(state){

				var isFlagDefined = typeof state !== 'undefined' && typeof state.data !== 'undefined' && typeof state.data.authenticatedAccess !== 'undefined';
				return isFlagDefined ? state.data.authenticatedAccess : true;
			},

			isAuthorized: function() {
				var token = AccessToken.set();
				if ( token && token.access_token ) {
					$rootScope.$emit('oauth:authorized', token);
					return true;
				}
				return false;
			}
		};
	}]);

});
