define([
	'angular',
	'schema-form',
	'common/services/validator'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services.FormValidator', [
		'schemaForm',
		'TT-UI.Common.Services.Validator'
	])

	.constant('VALIDATION_EVENTS', {
		VALIDATE:    'schemaFormValidate',
		STATUS:      '$validation',
		IN_PROGRESS: '$validation.inProgress',
		VALID:       '$validation.valid',
		INVALID:     '$validation.invalid'
	})

	.factory('PathName', ['sfPath', function PathName(Path) {
		return {
			get:  function(path) {
				var parts = Path.parse(Path.normalize(path));
				var name  = parts.shift();

				name += Path.stringify(parts);

				return name;
			}
		};
	}])

	.directive('schemaName', ['PathName', function(PathName) {
		return {
			restrict: 'A',
			replace: false,
			scope: false,
			priority: 1000,
			require: '^ngModel',
			link: function(scope, element, attrs, ngModel) {
				var name = PathName.get(scope.form.key);

				element.attr('name', name);
				scope.formCtrl.$$renameControl(ngModel, name);
			}
		};
	}])

	.provider('FormValidator', [function FormValidatorProvider() {
		var validators = {};
		var fieldCache = {};
		var formModel;

		this.$get = ['$injector', '$rootScope', '$q', 'Validator', 'VALIDATION_EVENTS',
		function FormValidator($injector, $rootScope, $q, Validator, VALIDATION_EVENTS
		) {
			var triggerFieldValidator = function(val, field) {
				var validator;
				field.$validators.forEach(function(serviceName) {
					validator = validators[serviceName];

					this._runValidation(validator, field);
				}, this);
			};

			return {
				registerValidators: function($scope, formName, model, validatorsJson) {
					var unwatch = $scope.$watch(formName, function(form) {
						unwatch();

						formModel = form;

						angular.forEach(validators, function(validator) {
							validator.setForm(form);
						});
					});

					validatorsJson.forEach(function(metaData) {
						this.registerValidator(
							metaData.validator,
							metaData.name,
							metaData.schema,
							metaData.inline,
							model
						);
					}, this);
				},

				unregisterAllValidators: function() {
					Object.keys(validators).forEach(function(serviceName) {
						this.unregisterValidator(serviceName);
					}, this);
				},

				unregisterValidators: function(validatorsJson) {
					validatorsJson.forEach(function(metaData) {
						this.unregisterValidator(metaData.validator);
					}, this);
				},

				registerValidator: function(serviceName, name, schema, inline, model) {
					var service = $injector.get(serviceName);

					if (!(service.prototype instanceof Validator)) {
						throw new Error('Given service name "'+serviceName+'" is not a Validator instance');
					}

					var validator = new service(serviceName, name, inline);

					validator
						.setSchema(schema)
						.setModel(model);

					angular.forEach(validator.getSchema(), function(formPath) {
						if (!fieldCache.hasOwnProperty(formPath)) {
							fieldCache[formPath] = [];
						}

						fieldCache[formPath].push(serviceName);
					});

					validators[serviceName] = validator;

					return validator;
				},

				unregisterValidator: function(serviceName) {
					if (!validators.hasOwnProperty(serviceName)) {
						throw new Error('Given validator name "'+serviceName+'" is not registered');
					}

					var validator = validators[serviceName];

					delete validators[serviceName];

					angular.forEach(validator.getSchema(), function(formPath) {
						if (!fieldCache.hasOwnProperty(formPath)) {
							return;
						}

						var fieldValidators = fieldCache[formPath];
						var index = fieldValidators.indexOf(serviceName);

						fieldValidators.splice(index, 1);
					});
				},

				registerField: function(field) {
					var fieldName = field.key.reduce(function(name, part, i) {
						return name + (!part ? '[]' : (i ? '.'+part : part));
					});

					if (!fieldCache.hasOwnProperty(fieldName)) {
						return;
					}

					if (!field.hasOwnProperty('onChange')) {
						field.$validators = fieldCache[fieldName];
						field.onChange    = angular.bind(this, triggerFieldValidator);
					}
				},

				validateForm: function(formModel, skipInvalidForm) {
					var isValid = this.isFormValid(formModel);
					var deferred = $q.defer();

					if (!isValid && skipInvalidForm) {
						deferred.reject();
					}

					var queue = [];

					angular.forEach(validators, function(validator) {
						if (validator.isInline()) {
							return;
						}

						queue.push(this._runValidation(validator));
					}, this);

					$q.all(queue).then(function(results) {
						angular.forEach(results, function(response) {
							isValid &= response.status;
						});

						isValid ? deferred.resolve() : deferred.reject();
					});

					return deferred.promise;
				},

				isFormValid: function(formModel) {
					return formModel.$valid;
				},

				_runValidation: function(validator, field) {
					var form     = validator.getForm();
					var formName = form;
					var ruleName = validator.getRuleName();
					var fieldIndex;

					if (validator.setFormValidity) {
						form.$setValidity(ruleName, false);
					}

					if (field) {
						// TODO: Add support for nested arrays
						field.key.some(function(part) {
							if (angular.isNumber(part)) {
								fieldIndex = part;
							}

							return fieldIndex;
						});
					}

					$rootScope.$emit(VALIDATION_EVENTS.IN_PROGRESS, formName, validator, fieldIndex);

					return validator.validate(fieldIndex).then(function(response) {
						var isValid = response.status;
						var message = response.message || null;

						if (validator.setFormValidity) {
							form.$setValidity(ruleName, isValid);
						}

						$rootScope.$emit(VALIDATION_EVENTS.STATUS, formName, validator, isValid, message, fieldIndex);

						if (isValid === true) {
							$rootScope.$emit(VALIDATION_EVENTS.VALID+'.'+validator.getRuleName(), formName, validator, isValid, message, fieldIndex);
						}
						else if (isValid === false) {
							$rootScope.$emit(VALIDATION_EVENTS.INVALID+'.'+validator.getRuleName(), formName, validator, isValid, message, fieldIndex);
						}

						return response;
					}).catch(function() {
						var isValid = false;
						var message = 'Validation failed';

						if (validator.setFormValidity) {
							form.$setValidity(ruleName, isValid);
						}

						$rootScope.$emit(VALIDATION_EVENTS.STATUS, formName, validator, isValid, message, fieldIndex);
						$rootScope.$emit(VALIDATION_EVENTS.INVALID+'.'+validator.getRuleName(), formName, validator, isValid, message, fieldIndex);
					});
				}
			};
		}];
	}]);
});
