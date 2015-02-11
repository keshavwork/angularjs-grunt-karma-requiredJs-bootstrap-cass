define([
	'angular',
	'window'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Config', [])

	.constant('CONFIG', {
		API_URL:       '@@apiUrl',
		MOCK_API_URL:  '@@mockApiUrl',
		API_VERSION:   '@@apiVersion',
		API_VERSION_ALTERNATE:   '@@apiVersionAlternate',
		API_TENANT_ID: '@@tenantId',
		UPC_API_URL:   '@@upcApiUrl',
        CLM_360_URL:   '@@clm360Url',
		CLM_360_API_URL:   '@@clm360ApiUrl',

		VERSION:     '@@version',
		INDEX_STATE: 'dummy',

		DATE_FORMAT:       'dd/MM/yyyy',
		DATETIME_FORMAT:   'dd/MM/yyyy HH:mm:ss',

		MODEL_DATE_TYPE: 'iso', // AngularStrap Datepicker

		BASE_URL: 'scripts/common/', // Slash at the end

		LOCALE_PATH:   'data/', // Slash at the end
		LOCALE_PREFIX: 'locale-',
		LOCALE_SUFFIX: '.json',
		LOCALE_DEFAULT: 'en',
		LOCALE_LIST:    ['en', 'pl'],

		// SSO/OAuth 2.0
		SSO_OAUTH_URI: '@@oauthUri',
		SSO_OAUTH_URI_PATH: '@@oauthPathUri',
		SSO_OAUTH_CLIENT_ID: '@@oauthClientId',
		SSO_OAUTH_REDIRECT_URI: '@@oauthRedirectUri',
		SSO_OAUTH_SCOPE: '@@oauthScope',
		SSO_OAUTH_STATE: '@@ouathState',
		SSO_PROFILE_URI: '@@oauthProfileUri',
		USER_SERVICE_API_URL: '@@userServiceApiUrl'
	})
	;
});