(function() {
	'use strict';

	define('objectpath-angular', ['angular', 'objectpath'], function(angular, ObjectPath) {
		return angular.module('ObjectPath', []).provider('ObjectPath', function() {
			this.parse = ObjectPath.parse;
			this.stringify = ObjectPath.stringify;
			this.normalize = ObjectPath.normalize;

			this.$get = function(){
				return ObjectPath;
			};
		});
	});
})(window);