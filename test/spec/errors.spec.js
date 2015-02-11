define([
	'angular',
	'angular-mocks',
	'angular-ui-router',
	'common/errors'
], function(angular, mocks) {
	'use strict';

	describe('Application Error:', function() {
		var $rootScope, $log, $q, $stateProvider, $state;

		var FlashMessage = jasmine.createSpyObj('FlashMessage', ['show']);

		var deferred;
		var dependencyResolver = function() {
			return deferred.promise;
		};

		beforeEach(function() {
			mocks.module('TT-UI.Common.Errors');

			mocks.module(function(_$stateProvider_, $provide) {
				$stateProvider = _$stateProvider_;

				$provide.value('FlashMessage', FlashMessage);
			});

			mocks.inject(function(_$rootScope_, _$log_, _$q_, _$state_) {
				$rootScope   = _$rootScope_;
				$log         = _$log_;
				$q           = _$q_;
				$state       = _$state_;
			});
		});

		beforeEach(function() {
			$stateProvider
				.state('a', {
					url:   '/a',
					label: 'Foo A',
					resolve: {
						dependency: dependencyResolver
					}
				});
		});

		it('should not trigger an error when resolving state successed', function() {
			// given
			deferred = $q.defer();

			// when
			$state.go('a');
			deferred.resolve();
			$rootScope.$digest();

			// then
			expect(FlashMessage.show).not.toHaveBeenCalled();
		});

		it('should trigger an error when resolving state failed', function() {
			// given
			var error = 'Some error';
			deferred = $q.defer();

			// when
			$state.go('a');
			deferred.reject(error);
			$rootScope.$digest();

			// then
			expect(FlashMessage.show).toHaveBeenCalledWith(
				jasmine.any(String),
				error,
				jasmine.any(String)
			);
		});
	});
});