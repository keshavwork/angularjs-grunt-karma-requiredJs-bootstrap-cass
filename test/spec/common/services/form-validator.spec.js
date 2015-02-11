define([
	'angular',
	'angular-mocks',
	'common/services/form-validator'
], function(angular, mocks) {
	'use strict';

	describe('Service: FormValidator', function() {
		// instantiate service
		var $compile, $rootScope, $scope, $injector, $provide, FormValidator, PathName, Validator;

		var formCtrl = jasmine.createSpyObj('formCtrl', ['$$renameControl']);

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.FormValidator');

			mocks.module(function(_$injector_, _$provide_) {
				$injector = _$injector_;
				$provide  = _$provide_;
			});

			mocks.inject(function(_$rootScope_, _$compile_, _Validator_, _FormValidator_, _PathName_) {
				$rootScope = _$rootScope_;
				$rootScope = _$rootScope_;
				$scope = $rootScope.$new();
				$compile = _$compile_;
				FormValidator = _FormValidator_;
				Validator = _Validator_;
				PathName = _PathName_;
			});
		});

		it('should check if FormValidator provider exists', function() {
			expect(!!FormValidator).toBe(true);
			expect(FormValidator).toEqual(jasmine.any(Object));
		});

		it('should check if PathName service exists', function() {
			expect(!!PathName).toBe(true);
			expect(PathName).toEqual(jasmine.any(Object));
		});

		it('should rename field name using "schema-name" directive', function() {
			// given
			$scope.form = {
				key: 'foo.bar'
			};
			$scope.formCtrl = formCtrl;

			var html = $compile('<input ng-model="foo" schema schema-name>')($scope);

			// when
			$scope.$digest();

			// then
			expect(html.attr('name')).toEqual("foo['bar']");
		});

		describe('FormValidator service', function() {
			var validatorName, FooValidator;

			beforeEach(function() {
				validatorName = 'FooValidator';
				FooValidator = function() {};
				FooValidator.prototype = Object.create(Validator.prototype);
				FooValidator.prototype.constructor = FooValidator;
			});

			it('should try register a new validator without exception', function() {
				// given
				$provide.value(validatorName, FooValidator);

				// when
				var fn = function() {
					FormValidator.registerValidator(validatorName);
				};

				// then
				expect(fn).not.toThrow();
			});

			it('should not register a function and throw an exception', function() {
				// given
				$provide.value(validatorName, function() {

				});

				// when
				var fn = function() {
					FormValidator.registerValidator(validatorName);
				};

				// then
				expect(fn).toThrow();
			});


			it('should register new validator and return instance', function() {
				// given
				$provide.value(validatorName, FooValidator);

				// when
				var validator = FormValidator.registerValidator(validatorName);

				// then
				expect(validator).toBeInstanceOf(Validator);
			});

			it('should unregister a validator without exception', function() {
				// given
				$provide.value(validatorName, FooValidator);
				FormValidator.registerValidator(validatorName);

				// when
				var fn = function() {
					FormValidator.unregisterValidator(validatorName);
				};

				// then
				expect(fn).not.toThrow();
			});

			it('should not unregister missing validator and throw exception', function() {
				// given

				// when
				var fn = function() {
					FormValidator.unregisterValidator(validatorName);
				};

				// then
				expect(fn).toThrow();
			});
		});
	});
});