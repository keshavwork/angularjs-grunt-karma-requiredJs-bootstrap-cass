define([
	'angular',
	'common/config',
	'common/directives/action-links',
	'common/directives/breadcrumbs',
	'common/directives/forms',
	'common/directives/nav-menu',
	'common/directives/multiselect-dropdown',
	'common/directives/pagination',
	'common/directives/post-message',
	'common/directives/progress-bar',
	'common/directives/route-label',
	'common/directives/select',
	'common/directives/sortable',
	'common/directives/spinner',
	'common/directives/tabs',
	'common/directives/toggle',
	'common/directives/wizard',
	'common/directives/auto-format'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Directives', [
		'TT-UI.Common.Config',
		'TT-UI.Common.Directives.ActionLinks',
		'TT-UI.Common.Directives.Breadcrumbs',
		'TT-UI.Common.Directives.Forms',
		'TT-UI.Common.Directives.NavMenu',
		'TT-UI.Common.Directives.MultiselectDropdown',
		'TT-UI.Common.Directives.Pagination',
		'TT-UI.Common.Directives.PostMessage',
		'TT-UI.Common.Directives.ProgressBar',
		'TT-UI.Common.Directives.RouteLabel',
		'TT-UI.Common.Directives.Select',
		'TT-UI.Common.Directives.Sortable',
		'TT-UI.Common.Directives.Spinner',
		'TT-UI.Common.Directives.Tabs',
		'TT-UI.Common.Directives.Toggle',
		'TT-UI.Common.Directives.Wizard',
		'TT-UI.Common.Directives.AutoFormat'
	])

	.value('VIEW_CONFIG', ['CONFIG', function(CONFIG) {
		return {
			URL: CONFIG.BASE_URL+'/views/',
			DIRECTIVE_URL: CONFIG.BASE_URL+'/views/directives/'
		};
	}]);
});