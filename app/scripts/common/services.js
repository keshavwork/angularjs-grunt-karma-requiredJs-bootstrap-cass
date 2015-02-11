define([
	'angular',
	'common/services/api',
	'common/services/confirmation-dialog',
	'common/services/flash-message',
	'common/services/form-validator',
	'common/services/not-json-parser',
	'common/services/user-info',
	'common/services/resource'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services', [
		'TT-UI.Common.Services.Api',
		'TT-UI.Common.Services.ConfirmationDialog',
		'TT-UI.Common.Services.FlashMessage',
		'TT-UI.Common.Services.FormValidator',
		'TT-UI.Common.Services.NotJsonParser',
		'TT-UI.Common.Services.UserInfo',
		'TT-UI.Common.Services.Resource'
	]);
});