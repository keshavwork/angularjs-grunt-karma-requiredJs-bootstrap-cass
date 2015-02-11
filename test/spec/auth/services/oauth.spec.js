define([
	'angular',
	'angular-mocks',
	'auth/services/oauth'
], function(angular, mocks) {
	'use strict';

	describe('Service: OAuth ', function() {

		// instantiate service
		var $rootScope, $q, $state, deferred, AccessToken, Auth, AUTH, ApiResponse;

		beforeEach(function() {
			mocks.module('TT-UI.Auth.Services.OAuth');

			mocks.module(function(_AUTH_) {
				AUTH = _AUTH_;
			});

			mocks.inject(function(_$rootScope_, _$q_, _$state_, _Auth_, _AccessToken_, _ApiResponse_) {
				$rootScope  = _$rootScope_;
				$q          = _$q_;
				$state      = _$state_;
				Auth        = _Auth_;
				AccessToken = _AccessToken_;
				ApiResponse = _ApiResponse_;
			});

			deferred = $q.defer();
		});

		it('Should check if OAuth module exists', function() {
			expect(!!Auth).toBe(true);
			expect(typeof Auth).toEqual('object');
		});

		it('Should not be authorized when token not exist', function() {
			// given
			spyOn(AccessToken, 'set').andReturn(null);

			// when
			var isAuthorized = Auth.isAuthorized();

			// then
			expect(isAuthorized).toBe(false);
		});

		it('should emit authorization event when token exists', function() {
			// given
			/*jshint camelcase: false */
			var token = {access_token: Date.now().toString(32)};
			spyOn(AccessToken, 'set').andReturn(token);
			spyOn($rootScope, '$emit');

			// when
			Auth.isAuthorized();
			$rootScope.$apply();

			// then
			expect(AccessToken.set).toHaveBeenCalled();
			expect($rootScope.$emit).toHaveBeenCalledWith('oauth:authorized', token);
		});

		it('should require authorization when authenticatedAccess flag does not exist', function() {
			// given
			var state = {
				name : 'TestState'
			};
			// when & then
			expect(Auth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should not require authorization only if authenticatedAccess flag is set to false', function() {
			// given
			var state = {
				name : 'TestState',
				data : {
					authenticatedAccess : false
				}
			};
			// when & then
			expect(Auth.isAuthenticationRequired(state)).toBeFalsy();
		});

		it('should require authorization when state has authenticatedAccess flag set to true', function() {
			// given
			var state = {
				name : 'TestState',
				data : {
					authenticatedAccess : true
				}
			};
			// when & then
			expect(Auth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should require authorization when state has authenticatedAccess flag is undefined', function() {
			// given
			var state = {
				name : 'TestState',
				data : {
					authenticatedAccess : undefined
				}
			};
			// when & then
			expect(Auth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should not emit authorization event when token dont exists', function() {
			// given
			var token = null;
			spyOn(AccessToken, 'set').andReturn(token);
			spyOn($rootScope, '$emit');

			// when
			Auth.isAuthorized();
			$rootScope.$apply();

			// then
			expect(AccessToken.set).toHaveBeenCalled();
			expect($rootScope.$emit).not.toHaveBeenCalled();
		});

		it('Do logout method should call AccessToken service', function() {
			// given
			spyOn(AccessToken, 'destroy');
			spyOn($rootScope, '$emit');

			// when
			Auth.logout();

			// then
			expect(AccessToken.destroy).toHaveBeenCalled();
			expect($rootScope.$emit).toHaveBeenCalledWith('oauth:logout');
			expect($rootScope.$emit).toHaveBeenCalledWith('oauth:loggedOut');
		});

		describe('ApiResponse service', function() {
			it('should return true for aunthorized (ex. 200) response', function() {
				// given
				var response = {
					config: {
						headers: {
							'Authorization': 'abc'
						}
					},

					status: 200
				};

				// when
				var results = ApiResponse.isAuthorized(response);

				// then
				expect(results).toBe(true);
			});

			it('should return false for aunthorized (401) response ', function() {
				// given
				var response = {
					config: {
						headers: {
							'Authorization': 'abc'
						}
					},

					status: 401
				};

				// when
				var results = ApiResponse.isAuthorized(response);

				// then
				expect(results).toBe(false);
			});

			it('should return false for aunthorized (400) response ', function() {
				// given
				var response = {
					config: {
						headers: {
							'Authorization': 'abc'
						}
					},

					status: 400
				};

				// when
				var results = ApiResponse.isAuthorized(response);

				// then
				expect(results).toBe(false);
			});
		});
    });
});
