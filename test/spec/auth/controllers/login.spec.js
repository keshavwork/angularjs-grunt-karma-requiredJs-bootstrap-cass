define([
	'angular',
	'angular-mocks',
	'auth/controllers/login'
], function(angular, mocks) {
	'use strict';

	describe('Controller: LoginCtrl ', function() {
		var LoginCtrl, $rootScope, $scope, $state, CONFIG;

		var viewUrl = '';

		// Initialize the controller and a mock scope
		beforeEach(function() {
			mocks.module('TT-UI.Auth.Controllers.Login');

			mocks.module(function(_CONFIG_) {
				CONFIG = _CONFIG_;
			});

			mocks.inject(function(_$controller_, _$rootScope_, _$state_) {
				$rootScope	= _$rootScope_;
				$scope		= $rootScope.$new();
				$state		= _$state_;

				LoginCtrl = _$controller_('LoginCtrl', {
					$scope:  $scope,
					CONFIG:  CONFIG,
					viewUrl: viewUrl
				});
			});
		});

		describe('state setup:', function(){
			var state;

			beforeEach(function(){
				state = 'login';
				$state.go(state);
				$rootScope.$digest();
			});
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/login/');
			});

			it('should define label for state', function() {
				expect($state.current.label).toEqual('Login');
			});

			it('should allow for an unauthenticated access ', function() {
				expect($state.current.data.authenticatedAccess).toEqual(false);
			});

			it('should provide controller for main view LoginCtrl ', function() {
				expect($state.current.views['main@'].controller).toEqual('LoginCtrl');
			});

			it('should provide template for main view ', function() {
				expect($state.current.views['main@'].templateUrl).toMatch(/login\.tpl\.html$/);
			});

		});

		it('should check if Login module exists', function() {
			expect(!!LoginCtrl).toBe(true);
			expect(LoginCtrl).toEqual(jasmine.any(Object));
		});

		it('should expose getSsoUri method', function() {
			expect($scope.getSsoUri).toBeDefined();
		});

		it('should expose getSsoUriPath method', function() {
			expect($scope.getSsoUriPath).toBeDefined();
		});

		it('should expose getSsoClientId method', function() {
			expect($scope.getSsoClientId).toBeDefined();
		});

		it('should expose getSsoRedirectUri method', function() {
			expect($scope.getSsoRedirectUri).toBeDefined();
		});

		it('should expose getSsoScope method', function() {
			expect($scope.getSsoScope).toBeDefined();
		});

		it('should expose getSsoState method', function() {
			expect($scope.getSsoState).toBeDefined();
		});

		it('should expose getSsoProfileUri method', function() {
			expect($scope.getSsoProfileUri).toBeDefined();
		});

		it('should expose getSsoTemplate method', function() {
			expect($scope.getSsoTemplate).toBeDefined();
		});

	});
});
