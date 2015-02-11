define([
	'angular',
	'angular-animate',
	'angular-strap',
	'angular-strap.tpl',
	'common/config'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.AngularStrap', [
		'ngAnimate',
		'mgcrea.ngStrap.alert',
		'mgcrea.ngStrap.modal',
		'mgcrea.ngStrap.datepicker',
		'TT-UI.Common.Config'
	])

	.config([
		'$modalProvider', '$alertProvider', '$datepickerProvider', 'CONFIG',
		function($modalProvider, $alertProvider, $datepickerProvider, CONFIG
	) {
		angular.extend($alertProvider.defaults, {
			animation: 'am-fade-and-slide-top',
			dismissable: false,
			duration: 5,
			keyboard: false
		});

		angular.extend($modalProvider.defaults, {
			animation: 'am-fade-and-scale',
			placement: 'center',
			container: 'body',
			backdrop: 'static',
			keyboard: false
		});

		angular.extend($datepickerProvider.defaults, {
			dateFormat: CONFIG.DATE_FORMAT,
			dateType: CONFIG.MODEL_DATE_TYPE,
			startWeek: 1
		});
	}])
	;
});