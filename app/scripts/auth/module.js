define([
    'angular',
    'angular-ui-router',
    'common/config',
    'common/services/flash-message',
    'auth/services/oauth',
    'auth/controllers/login'

], function (angular) {
    'use strict';

    return angular.module('TT-UI.Auth.Module', [
        'ui.router',

        'TT-UI.Common.Config',
        'TT-UI.Common.Services.FlashMessage',
        'TT-UI.Auth.Controllers.Login',
        'TT-UI.Auth.Services.OAuth'
    ])
    .run([
        '$rootScope', '$state', 'FlashMessage', 'AUTH', 'Auth',
        function ($rootScope, $state, FlashMessage, AUTH, Auth) {

            var redirectToLogin = function () {
                $rootScope.userAuthorized = false;
                $state.go('login');
            };

            var authorizationError = function () {
                FlashMessage.show('Error', 'Authorization failed. Please login into system.', 'danger', true);
                redirectToLogin();
            };

            $rootScope.userAuthorized = false;

            $rootScope.$on('oauth:authorized', function () {
                $rootScope.userAuthorized = true;
            });

            $rootScope.$on('oauth:logout', redirectToLogin);
            $rootScope.$on('oauth:loggedOut', redirectToLogin);
            $rootScope.$on('oauth:denied', authorizationError);

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (Auth.isAuthenticationRequired(toState) && !Auth.isAuthorized()) {
                    event.preventDefault();
                    redirectToLogin();
                }
            });

            $rootScope.logout = function () {
                Auth.logout();
            };
        }])
    ;

});
