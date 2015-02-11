define([
  'angular',
  'common/config'
 ], function (angular) {
 'use strict';

 return angular.module('TT-UI.Common.Services.Api', [
   'TT-UI.Common.Config'
  ])

 .factory('Api', ['CONFIG', function (CONFIG) {
    var truncateUrlRegExp = /[\/]?$/;

    var baseUrl = CONFIG.API_URL.replace(truncateUrlRegExp, '') + '/';
    var mockBaseUrl = CONFIG.MOCK_API_URL.replace(truncateUrlRegExp, '') + '/';
    var upcUrl = CONFIG.UPC_API_URL.replace(truncateUrlRegExp, '') + '/';
    var clm360Url = CONFIG.CLM_360_URL.replace(truncateUrlRegExp, '') + '/';
	var clm360ApiUrl = CONFIG.CLM_360_API_URL.replace(truncateUrlRegExp, '') + '/';

    return {
     getUrl : function () {
      return baseUrl;
     },

     getMockUrl : function () {
      return mockBaseUrl;
     },

     getUpcUrl : function () {
      return upcUrl;
     },

     getClm360Url : function () {
      return clm360Url;
     },

	 getClm360ApiUrl : function () {
      return clm360ApiUrl;
     }
    };
   }
  ]);
});