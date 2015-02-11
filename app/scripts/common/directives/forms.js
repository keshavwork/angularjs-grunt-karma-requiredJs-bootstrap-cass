define([
	'angular',
	'angular-bootstrap',
	'schema-form',
	'angular-strap',
	'angular-strap.tpl',
	'common/config',
	'common/services/form-validator'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Directives.Forms', [
		'schemaForm',
		'ui.bootstrap.tpls',
		'ui.bootstrap.accordion',
		'ui.bootstrap.typeahead',
		'ngAnimate',
		'mgcrea.ngStrap.datepicker',
		'mgcrea.ngStrap.alert',
		'TT-UI.Common.Config',
		'TT-UI.Common.Services.FormValidator'
	])

	.config(['$provide', function($provide) {
		$provide.decorator('sfPath', ['$delegate', function($delegate) {
			var parse = $delegate.parse;

			var numberRegExp = /^[0-9]+$/;

			$delegate.parse = function() {
				var parts = parse.apply($delegate, arguments);

				parts.map(function(part) {
					return angular.isString(part) && part.match(numberRegExp) ? +part : part;
				});

				return parts;
			};

			return $delegate;
		}]);
	}])

	.config([
		'schemaFormDecoratorsProvider', 'schemaFormProvider', 'sfPathProvider', 'FormValidatorProvider', 'CONFIG',
		function(decoratorsProvider, schemaFormProvider, PathProvider, FormValidatorProvider, CONFIG
	) {
		var DIRECTIVE_URL = CONFIG.BASE_URL+'views/directives/';
		var FORMS_URL     = DIRECTIVE_URL + 'forms/';

		schemaFormProvider.addComplexDirective('columns');
		schemaFormProvider.addComplexDirective('accordion');

		var datepicker = function(name, schema, options) {
			if ((schema.type === 'string' || schema.type === 'number') && (schema.format === 'date' || schema.format === 'date-time')) {
				var f = schemaFormProvider.createStandardForm(name, schema, options);

				f.key = options.path;
				f.type = schema.format === 'date' ? 'datepicker' : 'datetimepicker';
				f.dateType = schema.dateType;

				options.lookup[PathProvider.stringify(options.path)] = f;

				return f;
			}
		};

		// Set dropdown titleMap when enum is object type
		var enumObjectToTitleMap = function(schema) {
			schema.masterData = schema['enum'];

			var enm = schema['enum'] = [];
			var enumNames = schema.enumNames = {};
			var titleMap = [];

			schema.masterData.forEach(function(opt) {
				titleMap.push({
					name:  opt.name,
					value: opt.code
				});

				enm.push(opt.code);
				enumNames[opt.code] =  opt.name;
			});

			return titleMap;
		};

		var dropdown = function(name, schema, options) {
			if (schema.type === 'string' && angular.isArray(schema['enum']) && angular.isObject(schema['enum'][0])) {
				var f = schemaFormProvider.createStandardForm(name, schema, options);

				f.key  = options.path;
				f.type = 'select';

				if (!f.titleMap) {
					f.titleMap = enumObjectToTitleMap(schema);
				}

				options.lookup[PathProvider.stringify(options.path)] = f;

				return f;
			}
		};

		var checkboxes = function(name, schema, options) {
			if (schema.type === 'array' && schema.items && angular.isArray(schema.items['enum']) && angular.isObject(schema.items['enum'][0])) {
				var f = schemaFormProvider.createStandardForm(name, schema, options);

				f.key = options.path;
				f.type = 'checkboxes';

				if (!f.titleMap) {
					f.titleMap = enumObjectToTitleMap(schema.items);
				}

				options.lookup[PathProvider.stringify(options.path)] = f;

				return f;
			}
		};

		schemaFormProvider.defaults.string.unshift(datepicker, dropdown);
		schemaFormProvider.defaults.number.unshift(datepicker);
		schemaFormProvider.defaults.array.unshift(checkboxes);

		schemaFormProvider.postProcess(function(form) {
			//  Little magic happens here... We need to have access into initialized service inside provider
			var $document = angular.injector(['ng']).get('$document');
			var FormValidator = $document.injector().get('FormValidator');

			form.forEach(function(field) {
				if (field.key) {
					FormValidator.registerField(field);
				}
			});

			return form;
		});

		decoratorsProvider.createDecorator('ttuiDecorator', {
			textarea: FORMS_URL + 'tmp.tpl.html',
			fieldset: FORMS_URL + 'tmp.tpl.html',
			array: FORMS_URL + 'array.tpl.html',
			tabarray: FORMS_URL + 'tmp.tpl.html',
			tabs: FORMS_URL + 'tmp.tpl.html',
			section: FORMS_URL + 'section.tpl.html',
			conditional: FORMS_URL + 'section.tpl.html',
			actions: FORMS_URL + 'tmp.tpl.html',
			select: FORMS_URL + 'select.tpl.html',
			checkbox: FORMS_URL + 'tmp.tpl.html',
			checkboxes: FORMS_URL + 'checkboxes.tpl.html',
			number: FORMS_URL + 'default.tpl.html',
			password: FORMS_URL + 'default.tpl.html',
			submit: FORMS_URL + 'submit.tpl.html',
			button: FORMS_URL + 'tmp.tpl.html',
			radios: FORMS_URL + 'radios.tpl.html',
			'radios-inline': FORMS_URL + 'radios-inline.tpl.html',
			radiobuttons: FORMS_URL + 'tmp.tpl.html',
			help: FORMS_URL + 'help.tpl.html',
			'default': FORMS_URL + 'default.tpl.html',
			columns: FORMS_URL + 'columns.tpl.html',
			accordion: FORMS_URL + 'accordion.tpl.html',
			'break': FORMS_URL + 'break.tpl.html',
			multiselect: FORMS_URL+ 'multiselect.tpl.html',
			datepicker: FORMS_URL+ 'datepicker.tpl.html',
			'validation-status': FORMS_URL+ 'validation-status.tpl.html',
			'multiselect-dropdown': FORMS_URL+ 'multiselect-dropdown.tpl.html',
			typeahead: FORMS_URL+ 'typeahead.tpl.html',
			'suggestion-box': FORMS_URL+ 'suggestion-box.tpl.html'
		}, [
			// TODO: ???
		]);

		//manual use directives
		decoratorsProvider.createDirectives({
			textarea: FORMS_URL + 'tmp.tpl.html',
			select: FORMS_URL + 'select.tpl.html',
			checkbox: FORMS_URL + 'tmp.tpl.html',
			checkboxes: FORMS_URL + 'checkboxes.tpl.html',
			number: FORMS_URL + 'default.tpl.html',
			submit: FORMS_URL + 'submit.tpl.html',
			button: FORMS_URL + 'tmp.tpl.html',
			text: FORMS_URL + 'default.tpl.html',
			date: FORMS_URL + 'default.tpl.html',
			password: FORMS_URL + 'default.tpl.html',
			input: FORMS_URL + 'default.tpl.html',
			radios: FORMS_URL + 'tmp.tpl.html',
			'radios-inline': FORMS_URL + 'tmp.tpl.html',
			radiobuttons: FORMS_URL + 'tmp.tpl.html',
			multiselect: FORMS_URL+ 'multiselect.tpl.html',
			datepicker: FORMS_URL+ 'datepicker.tpl.html',
			'multiselect-dropdown': FORMS_URL+ 'multiselect-dropdown.tpl.html',
			typeahead: FORMS_URL+ 'typeahead.tpl.html'
		});
	}])

	.directive('autoTabForm', function() {
		return {
			restrict: 'A',
			replace: false,
			scope: false,
			require: '^form',
			controller: ['$scope', function($scope) {
				var counter = this.counter = {
					fields:  0,
					buttons: 0
				};

				$scope.$on('$destroy', function() {
					counter.fields  = 0;
					counter.buttons = 0;
				});
			}]
		};
	})

	.directive('autoTabField', function() {
		return {
			restrict: 'A',
			replace: false,
			scope: false,
			require: '^autoTabForm',
			link: function(scope, element, attr, ctrl) {
				if (!scope.form.required) {
					return;
				}

				element.attr('tabindex', ++ctrl.counter.fields);
			}
		};
	})

	.directive('autoTabSubmit', function() {
		return {
			restrict: 'A',
			replace: false,
			scope: false,
			require: '^autoTabForm',
			link: function(scope, element, attr, ctrl) {
				var buttonCounter = ctrl.counter.buttons++;

				scope.$watch(function() {
					return ctrl.counter.fields;
				}, function() {
					element.attr('tabindex', ctrl.counter.fields + buttonCounter);
				});
			}
		};
	})

	.directive('autofocus', ['$timeout', function($timeout) {
		return {
			restict: 'A',
			replace: false,
			scope: false,
			compile: function() {
				return {
					post: function(scope, el, attr) {
						if (!attr.autofocus) {
							return;
						}

						$timeout(function() {
							el[0].focus();
						}, 0);
					}
				};
			}
		};
	}])

	.directive(
		'validationStatus',
		['$injector', '$rootScope', '$alert', 'VALIDATION_EVENTS',
		function($injector, $rootScope, $alert, VALIDATION_EVENTS
	) {
		return {
			restrict: 'E',
			replace: false,
			scope: false,
			require: '^sfSchema',
			link: function(scope, element, attr) {
				var validatorName = attr.validator;
				var index = scope.arrayIndex;
				var validatorService = $injector.get(validatorName);

				var options = {
					container: element,
					title: '',
					content: '',
					type: 'danger',
					show: false
				};
				var notification = $alert(options);

				var unbounds = [];

				unbounds.push($rootScope.$on(VALIDATION_EVENTS.STATUS, function(e, formName, validator, isValid, status, fieldIndex) {
					if (!(validator instanceof validatorService) || !validator.isInline() || fieldIndex !== index) {
						return;
					}

					if (isValid || isValid === null) {
						notification.hide();
						return;
					}

					var resultsMsg = [];

					if (angular.isArray(status)) {
						status.forEach(function(msg) {
							angular.forEach(msg, function(val) {
								resultsMsg.push(val);
							});
						});
					}
					else if (angular.isString(status)) {
						resultsMsg.push(status);
					}

					angular.extend(notification.$options, {
						title: resultsMsg.join('<br>')
					});

					angular.extend(notification.$scope, notification.$options);

					notification.show();
				}));

				unbounds.push($rootScope.$on(VALIDATION_EVENTS.IN_PROGRESS, function(e, formName, validator, fieldIndex) {
					if (!(validator instanceof validatorService) || !validator.isInline() || fieldIndex !== index) {
						return;
					}

					notification.hide();
				}));

				scope.$on('$destroy', function() {
					notification.hide();

					unbounds.forEach(function(unbound) {
						unbound();
					});
				});
			}
		};
	}])

	.directive('reloadOptions', ['$injector', '$parse', function($injector, $parse) {
		return {
			require: 'ngModel',
			restrict: 'AC',
			scope: false,
			link: function(scope, element, attrs, ctrl) {
				var form = scope.$eval(attrs.reloadOptions);

				if (!form || !form.reload) {
					return;
				}

				var watchGroup = [];
				var values = {};

				form.reload.key.forEach(function(schemaKeyExp) {
					var valueGetter = $parse(schemaKeyExp);

					watchGroup.push(function() {
						var value = valueGetter(scope.model, {
							arrayIndex: scope.arrayIndex
						});

						values[schemaKeyExp] = value;

						return value;
					});
				});

				var serviceName = form.reload.service;
				var service = $injector.get(serviceName);

				var reloadOptions = function() {
					form.readonly = true;

					service.load(scope.model, values).then(function(response) {
						if (form.type === 'text' || form.type === 'number') {
							var value = service.updateValue(scope.model, response);
							ctrl.$setViewValue(value);
							ctrl.$validate();
						}
						else {
							service.updateValues(form, response);
							var hasValue = form.titleMap.some(function(opt) {
								return opt.value === ctrl.$viewValue;
							});

							// Workaround for problem with Angular not updating model when options list have changed
							if (!hasValue) {
								ctrl.$setViewValue('');

								// Update model but don't trigger validation
								if (ctrl.$$lastCommittedViewValue !== ctrl.$viewValue) {
									ctrl.$modelValue = void(0);
									ctrl.$$writeModelToScope();
								}
							}
							// Trigger re-validation when field seems to have proper value
							else if (ctrl.$invalid) {
								ctrl.$validate();
							}
						}

						if (form.type === 'text' || form.type === 'number') {
							form.readonly = false;
						}
						else {
							form.readonly = form.titleMap.length ? false : true;
						}
					});
				};

				var unbound = scope.$watchGroup(watchGroup, reloadOptions);

				scope.$on('$destroy', unbound);
			}
		};
	}])
	;
});