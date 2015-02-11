define([
	'angular',
	'angular-ui-router',
	'common/services/flash-message'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Errors', [
		'ui.router',
		'TT-UI.Common.Services.FlashMessage'
	])

	.run(['$rootScope', '$log', '$state', 'FlashMessage', function($rootScope, $log, $state, FlashMessage) {
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			$log.error(error);

			if ($state.current === 'error') {
				return;
			}

			FlashMessage.show('Error', error.stack ? error.stack : error, 'danger');
		});
	}])
	;
});