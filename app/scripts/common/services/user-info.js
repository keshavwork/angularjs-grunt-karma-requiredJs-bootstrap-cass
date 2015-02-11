define([
	'angular',
	'angular-resource',
	'common/config'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services.UserInfo', [
		'ngResource',
		'TT-UI.Common.Config'
	])

	.factory('UserInfoConfig',['CONFIG', function(CONFIG){
		return  {
			apiUrl : CONFIG.USER_SERVICE_API_URL,
			method : 'GET'
		};
	}])

	.factory('UserInfoServiceApi', ['$resource', 'UserInfoConfig', function($resource, config) {
		return $resource(
			config.apiUrl, {}, {
				fetch: {
					method: config.method
				}
			}
		);
	}])

	.factory('UserInfoService', function() {
		var user;

		return {
			populateData: function(response) {
				user = response;
			},

			clearData: function() {
				user = null;
			},

			getUserName: function() {
				return user ? user.name : null;
			},

			getUserPhoto: function() {
				return user ? user.picture : null;
			}
		};
	})

	.run(['$rootScope', 'UserInfoService', 'UserInfoServiceApi', function($rootScope, UserInfoService, UserInfoServiceApi) {
		var service = new UserInfoServiceApi();

		UserInfoService.clearData();

		$rootScope.User = UserInfoService;

		$rootScope.$watch('userAuthorized', function(userAuthorized) {
			if (!userAuthorized) {
				UserInfoService.clearData();
				return;
			}

			service.$fetch()
				.then(UserInfoService.populateData)
				.catch(UserInfoService.clearData);
		});
	}])
	;
});