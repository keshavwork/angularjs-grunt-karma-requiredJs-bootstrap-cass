define([
	'angular',
	'angular-sanitize',
	'angular-ui-router',
	'angular-strap',
	'angular-strap.tpl'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services.FlashMessage', [
		'ngSanitize',
		'ui.router',
		'mgcrea.ngStrap.alert'
	])

	.service('FlashMessage', ['$rootScope', '$alert', function FlashMessageService($rootScope, $alert) {
		var options = {
			title: '',
			content: '',
			type: 'info',
			placement: 'top',
			container: 'body',
			show: false
		};
		var alert = $alert(options);
		var persistent = false;

		$rootScope.$on('$stateChangeStart', function() {
			if (persistent) {
				persistent = false;
				return;
			}

			alert.hide();
		});

		this.show = function(title, content, type, persist) {
			angular.extend(alert.$options, {
				title:   title,
				content: content,
				type:    type
			});

			persistent = !!persist;

			angular.extend(alert.$scope, alert.$options);

			alert.$promise.then(alert.show);
		};

		this.hide = function() {
			alert.hide();
		};
	}])
	;
});