define([
    'angular',
    'angular-mocks',
    'auth/module'
], function (angular, mocks) {
    'use strict';

    describe('Module: Auth ', function () {

        // instantiate service
        var $rootScope, $state, FlashMessage, AUTH, Auth;

        beforeEach(function () {
            mocks.module('TT-UI.Auth.Module');

            mocks.module(function (_AUTH_) {
                AUTH = _AUTH_;
            });
            mocks.inject(function (_$rootScope_, _$state_, _FlashMessage_, _AUTH_, _Auth_) {
                $rootScope = _$rootScope_;
                $state = _$state_;
                Auth = _Auth_;
                AUTH = _AUTH_;
                FlashMessage = _FlashMessage_;
            });
        });

        it('Should check if Auth module exists', function () {
            expect(!!Auth).toBe(true);
            expect(typeof Auth).toEqual('object');
        });

        describe('auth events: ', function () {
            beforeEach(function () {
                spyOn($state, 'go');
            });

            it('should set userAuthorized to true when triggering auth event', function () {
                // given

                // when
                expect($rootScope.userAuthorized).toBe(false);
                $rootScope.$emit('oauth:authorized');

                // then
                expect($rootScope.userAuthorized).toBe(true);
            });

            it('should set userAuthorized to false when triggering logout event', function () {
                // given
                $rootScope.userAuthorized = true;

                // when
                $rootScope.$emit('oauth:logout');

                // then
                expect($rootScope.userAuthorized).toBe(false);
            });

            it('should set userAuthorized to false when triggering loggedOut event', function () {
                // given
                $rootScope.userAuthorized = true;

                // when
                $rootScope.$emit('oauth:loggedOut');

                // then
                expect($rootScope.userAuthorized).toBe(false);
            });

            it('should set userAuthorized to false when triggering denied event', function () {
                // given
                $rootScope.userAuthorized = true;

                // when
                $rootScope.$emit('oauth:denied');

                // then
                expect($rootScope.userAuthorized).toBe(false);
            });


            it('should check authorization requirement for each state change', function () {
                // given
                var mockState = {
                    name: 'TestAllowedState'
                };
                spyOn(Auth, 'isAuthenticationRequired');

                // when
                $rootScope.$emit('$stateChangeStart', mockState);
                $rootScope.$apply();

                // then
                expect(Auth.isAuthenticationRequired).toHaveBeenCalled();
            });

            it('should not check authorization when it is not required', function () {
                // given
                var mockState = {
                    name: 'TestAllowedState'
                };
                spyOn(Auth, 'isAuthenticationRequired').andReturn(false);
                spyOn(Auth, 'isAuthorized');

                // when
                $rootScope.$emit('$stateChangeStart', mockState);
                $rootScope.$apply();

                // then
                expect(Auth.isAuthorized).not.toHaveBeenCalled();
            });

            it('should check authorization when it is required', function () {
                // given
                var mockState = {
                    name: 'TestAllowedState'
                };
                spyOn(Auth, 'isAuthenticationRequired').andReturn(true);
                spyOn(Auth, 'isAuthorized').andReturn(true);

                // when
                $rootScope.$emit('$stateChangeStart', mockState);
                $rootScope.$apply();

                // then
                expect(Auth.isAuthorized).toHaveBeenCalled();
            });

            it('should go directly to allowed state', function () {
                // given
                var mockState = {
                    name: 'TestAllowedState',
                    data: {
                        authenticatedAccess: false
                    }
                };

                // when
                $rootScope.$emit('$stateChangeStart', mockState);
                $rootScope.$apply();

                // then
                expect($state.go).not.toHaveBeenCalled();
            });
        });
    });

});