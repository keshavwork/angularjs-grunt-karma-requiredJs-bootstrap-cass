define([
	'angular',
	'angular-ui-router',
	'angular-strap',
	'angular-strap.tpl',
	'common/directives'
], function(angular){
	'use strict';

	return angular.module('TT-UI.Common.Services.ConfirmationDialog', [
		'ui.router',
		'mgcrea.ngStrap.modal',
		'TT-UI.Common.Directives'
	])

	.constant('CONFIRMATION_DIALOG', {
		EVENT_PREFIX: '$confirmationModal'
	})

	.controller('ConfirmationDialogCtrl', ['$scope', function ConfirmationDialogCtrl($scope) {
		this.confirm = function() {
			$scope.$cancel.resolve();
			$scope.$hide();
		};

		this.cancel = function() {
			$scope.$cancel.reject();
			$scope.$hide();
		};

		this.ok = function() {
			$scope.$cancel.resolve();
			$scope.$hide();
		};

		$scope.getConfim = function() {
			return $scope.dialogType;
		};
	}])

	.service(
		'ConfirmationDialog',
		['$rootScope', '$q', '$modal', 'CONFIG', 'CONFIRMATION_DIALOG',
		function ConfirmationDialogService($rootScope, $q, $modal, CONFIG, CONFIRMATION_DIALOG
	) {


		var options = {
			prefixEvent: CONFIRMATION_DIALOG.EVENT_PREFIX,
			title: 'Confirmation request',
			content: 'Please confirm',
			template: CONFIG.BASE_URL+'views/confirmation-modal.tpl.html',
			show: false
		};

		var modal = $modal(options);
		var persistent = false;

		$rootScope.$on('$stateChangeStart', function() {
			if (persistent) {
				persistent = false;
				return;
			}

			modal.hide();
		});

		modal.$scope.$on(CONFIRMATION_DIALOG.EVENT_PREFIX+'.hide', function() {
			modal.$scope.$cancel.reject();
		});

		this.confirm = function(message,title,dialogType, persist) {
			angular.extend(modal.$options, {
				content: message || options.content,
				title: title || options.title
			});

			if (dialogType) {
				$rootScope.dialogType=dialogType;
			} else {
				$rootScope.dialogType = 'confirm';
			}

			persistent = !!persist;

			angular.extend(modal.$scope, modal.$options);

			modal.$promise.then(modal.show);

			var deferred = $q.defer();

			modal.$scope.$cancel = deferred;

			return deferred.promise;
		};


		this.hide = function() {
			modal.hide();
		};
	}])
	;
});