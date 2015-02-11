define([
	'angular',
	'common/config',
	'common/routes',
	'common/states',
	'common/errors',
	'common/directives',
	'common/services',
	'common/translate',
	'common/angular-strap',
	'common/spread',

	'angular-strap',
	'angular-strap.tpl'

], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.App', [
		'TT-UI.Common.Config',
		'TT-UI.Common.States',
		'TT-UI.Common.Errors',
		'TT-UI.Common.Routes',
		'TT-UI.Common.Directives',
		'TT-UI.Common.Services',
		'TT-UI.Common.Translate',
		'TT-UI.Common.AngularStrap',
		'TT-UI.Common.Spread',

		'mgcrea.ngStrap.affix'
	])
	;
});
