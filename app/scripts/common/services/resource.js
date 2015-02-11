define([
	'angular',
	'angular-resource',
	'common/config',
	'common/services/api'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services.Resource', [
		'ngResource',
		'TT-UI.Common.Config',
		'TT-UI.Common.Services.Api'
	])

	.factory('ResourceFactory', ['$resource', 'CONFIG', function($resource, CONFIG) {
		return function(uriHost, uriPath, method, isArray) {
			return $resource(
				uriHost + uriPath, {
					tenantId:   CONFIG.API_TENANT_ID,
					apiVersion: CONFIG.API_VERSION
				}, {
					fetch: {
						method: method,
						isArray: !!isArray
					}
				}
			);
		};
	}])

	.factory('AlternateApiVersionResourceFactory', ['$resource', 'CONFIG', function($resource, CONFIG) {
		return function(uriHost, uriPath, method, isArray) {
			return $resource(
				uriHost + uriPath, {
					tenantId:   CONFIG.API_TENANT_ID,
					apiVersion: CONFIG.API_VERSION_ALTERNATE
				}, {
					fetch: {
						method: method,
						isArray: !!isArray
					}
				}
			);
		};
	}])
	;
});