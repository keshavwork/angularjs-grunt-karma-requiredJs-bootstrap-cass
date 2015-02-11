define([
	'angular',
	'angular-route',
	'angular-ui-router'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.States', [
		'ngRoute',
		'ui.router'
	])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.decorator('parent', function($state, parent) {
			var _parent = parent($state);

			if (!_parent.children) {
				_parent.children = [];
			}

			_parent.children.push($state);

			return _parent;
		});
	}])
	;
});