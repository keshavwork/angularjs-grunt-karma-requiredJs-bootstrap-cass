define([
	'window',
	'angular',
	'angular-ui-router',
	'angular-cookies',
	'angular-translate',
	'angular-translate-loader-static-files',
	'angular-translate-storage-local',
	'common/config'
], function(window, angular) {
	'use strict';

	return angular.module('TT-UI.Common.Translate', [
		'ui.router',
		'ngCookies',
		'pascalprecht.translate',
		'TT-UI.Common.Config'
	])

	.constant('TRANSLATE', {
		URI_REG_EXP: /(?:\?|\&)locale=([a-z]{2})/i
	})

	.factory('$translateTtStorage', ['$translateLocalStorage', 'TRANSLATE',
		function $translateTtStorage($translateLocalStorage, TRANSLATE
	) {
		var location = window.location;

		return {
			get: function(name) {
				var forceLocale, tmp;

				// Force locale based on URI param
				if (location.search && (tmp = location.search.match(TRANSLATE.URI_REG_EXP))) {
					forceLocale = tmp.pop();
				}

				return forceLocale || $translateLocalStorage.get(name);
			},

			set: $translateLocalStorage.set
		};
	}])

	.factory('missingTranslationLog', ['$log', function missingTranslationLog($log) {
		return function(translationId) {
			$log.error('Missing translation: "'+translationId+'"');
		};
	}])

	// Detect available locales
	.config(['$translateProvider', '$stateProvider', 'CONFIG', function($translateProvider, $stateProvider, CONFIG) {
		$translateProvider.useStaticFilesLoader({
			prefix: CONFIG.LOCALE_PATH+CONFIG.LOCALE_PREFIX,
			suffix: CONFIG.LOCALE_SUFFIX
		});

		$translateProvider.useStorage('$translateTtStorage');

		$translateProvider.determinePreferredLanguage(function() {
			var localeList = CONFIG.LOCALE_LIST,
				langKey    = CONFIG.LOCALE_DEFAULT,
				navigator  = window.navigator,
				languages  = navigator.hasOwnProperty('languages') ? navigator.languages : [navigator.language];

			languages.some(function(lang) {
				lang = lang.split('-')[0];

				if (-1 !== localeList.indexOf(lang)) {
					langKey = lang;

					return true;
				}
			});

			return langKey;
		});

		$translateProvider.useMissingTranslationHandler('missingTranslationLog');

		// Set states for changing locales
		var changeLang = ['$translate', '$q', function($translate, $q) {
			$translate.use(this.locale);

			var deffered = $q.defer();
			deffered.reject();

			return deffered.promise;
		}];

		CONFIG.LOCALE_LIST.forEach(function(locale) {
			var stateName = 'lang-'+locale;

			$stateProvider.state(stateName, {
				parent: 'index',
				url:    '',

				aside:      true,
				label:     'Change language',
				className: 'icon-locale icon-'+locale,
				locale:     locale,

				data: {
					action: 'change-locle',
					role:    locale
				},

				resolve: {
					changeLang: changeLang
				}
			});
		});
	}])

	// Translate each label for all of states
	.run(['$rootScope', '$state',  '$translate', function($rootScope, $state,  $translate) {
		var iterateState = function(state) {
			var statesNum, children, label;

			if ((children = state.children)) {
				for (statesNum = children.length; statesNum--;) {
					iterateState(children[statesNum]);
				}
			}

			if (state.label) {
				label = state.orgLabel ? state.orgLabel : state.label;
				state.orgLabel = label;

				$translate(label).then(function(label) {
					state.label = label;
				});
			}
		}, rootState;

		rootState = $state.$current;

		while (rootState.parent) {
			rootState = rootState.parent;
		}

		$rootScope.$on('$translateChangeSuccess', function() {
			iterateState(rootState);
		});
	}])
	;
});