define([
	'angular',
	'angular-mocks',
	'common/services/confirmation-dialog'
], function(angular, mocks) {
	'use strict';

	describe('Service: ConfirmationDialog', function() {
		// instantiate service
		var $rootScope, $scope, $q, $modal, ConfirmationDialog, ConfirmationDialogCtrl, CONFIG, CONFIRMATION_DIALOG;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.ConfirmationDialog');

			mocks.module(function(_CONFIG_, _CONFIRMATION_DIALOG_) {
				CONFIG = _CONFIG_;
				CONFIRMATION_DIALOG = _CONFIRMATION_DIALOG_;
			});

			mocks.inject(function(_$controller_, _$rootScope_, _$q_, _$modal_, _ConfirmationDialog_) {
				$rootScope = _$rootScope_;
				$scope = $rootScope.$new();
				$q = _$q_;
				$modal = _$modal_;
				ConfirmationDialog = _ConfirmationDialog_;

				ConfirmationDialogCtrl = _$controller_('ConfirmationDialogCtrl', {
					$scope: $scope
				});
			});
		});

		describe('Confirmation Dialog Service:', function() {
			it('should check if ConfirmationDialogCtrl module exists', function() {
				expect(!!ConfirmationDialog).toBe(true);
				expect(ConfirmationDialog).toEqual(jasmine.any(Object));
			});

			it('should expose confirm method', function() {
				expect(ConfirmationDialog.confirm).toBeDefined();
			});

			it('should expose confirm method', function() {
				expect(ConfirmationDialog.hide).toBeDefined();
			});
		});

		describe('Confirmation Dialog Controller:', function() {
			it('should check if ConfirmationDialog controller exists', function() {
				expect(!!ConfirmationDialogCtrl).toBe(true);
				expect(ConfirmationDialogCtrl).toEqual(jasmine.any(Object));
			});

			it('should expose confirm method', function() {
				expect(ConfirmationDialogCtrl.confirm).toBeDefined();
			});

			it('should expose cancel method', function() {
				expect(ConfirmationDialogCtrl.cancel).toBeDefined();
			});

			it('should expose ok method', function() {
				expect(ConfirmationDialogCtrl.ok).toBeDefined();
			});

			it('should expose getConfim method', function() {
				expect($scope.getConfim).toBeDefined();
			});
		});
	});
});