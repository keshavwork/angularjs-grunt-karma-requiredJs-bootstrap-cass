define([
	'angular',
	'angular-mocks',
	'common/services/validator'
], function(angular, mocks) {
	'use strict';

	describe('Service: Validator', function() {
		// instantiate service
		var Validator;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.Validator');

			mocks.inject(function(_Validator_) {
				Validator = _Validator_;
			});
		});

		it('should check if Validator module exists', function() {
			expect(!!Validator).toBe(true);
			expect(typeof Validator).toEqual('function');
		});

		it('should return validator rule name', function() {
			// given
			var ruleName = 'FooValidator';
			var validator = new Validator(ruleName);

			// when
			var results = validator.getRuleName();

			// then
			expect(results).toEqual(ruleName);
		});

		it('should return validator name', function() {
			// given
			var ruleName = 'FooValidator';
			var name = 'Foo Checker';
			var validator = new Validator(ruleName, name);

			// when
			var results = validator.getName();

			// then
			expect(results).toEqual(name);
		});

		it('should check if validator is inline', function() {
			// given
			var ruleName = 'FooValidator';
			var name = 'Foo Checker';
			var inline = false;
			var validator = new Validator(ruleName, name, inline);

			// when
			var results = validator.isInline();

			// then
			expect(results).toEqual(inline);
		});

		describe('initialize', function() {
			var validator;
			beforeEach(function() {
				validator = new Validator();
			});

			it('should check setting and getting schema', function() {
				// given
				var schema = {
					foo: 'bar'
				};

				// when
				var results = validator.setSchema(schema);

				// then
				expect(results).toBe(validator);
				expect(validator.getSchema()).toBe(schema);
			});

			it('should check setting and getting form', function() {
				// given
				var form = {
					foo: 'bar'
				};

				// when
				var results = validator.setForm(form);

				// then
				expect(results).toBe(validator);
				expect(validator.getForm()).toBe(form);
			});

			it('should check setting and getting model', function() {
				// given
				var model = {
					foo: 'bar'
				};

				// when
				var results = validator.setModel(model);

				// then
				expect(results).toBe(validator);
				expect(validator.getModel()).toBe(model);
			});

			describe('collect from flat list', function() {
				it('should collect data from model', function() {
					// given
					var value = 'some value';
					var model = {
						foo: {
							bar: value
						}
					};
					var schema = {
						'reqFooBarVal': 'foo.bar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectData();

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.reqFooBarVal).toBeDefined();
					expect(results.reqFooBarVal).toEqual(value);
				});

				it('should collect data from model and locals', function() {
					// given
					var localValue = 'local foo value';
					var value = 'bar value';
					var model = {modelBar: value};
					var locals = {localFoo: localValue};
					var schema = {
						'reqLocalFoo':  'localFoo',
						'reqFooBarVal': 'modelBar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectData(locals);

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.reqFooBarVal).toBeDefined();
					expect(results.reqLocalFoo).toBeDefined();
					expect(results.reqFooBarVal).toEqual(value);
					expect(results.reqLocalFoo).toEqual(localValue);
				});

				it('should collect missing data as empty strings', function() {
					// given
					var model = {};
					var schema = {
						'req.foo': 'model.foo',
						'req.bar':  'model.bar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectData();

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.req).toBeDefined();
					expect(results.req.foo).toBeDefined();
					expect(results.req.bar).toBeDefined();

					expect(results.req.foo).toEqual('');
					expect(results.req.bar).toEqual('');
				});
			});

			describe('collect from array list', function() {
				it('should collect data from array model', function() {
					// given
					var index = 2;
					var value = 'some value';
					var model = {
						foo: [
							{},
							{},
							{
								bar: value
							}
						]
					};
					var schema = {
						'reqFooBarVal': 'foo[].bar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectArrayData(index);

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.reqFooBarVal).toBeDefined();
					expect(results.reqFooBarVal).toEqual(value);
				});

				it('should collect data from array model and locals', function() {
					// given
					var index = 1;
					var localValue = 'local foo value';
					var value = 'bar value';
					var model = {modelList: [{}, {bar: value}]};
					var locals = {localFoo: localValue};
					var schema = {
						'reqLocalFoo':  'localFoo',
						'reqFooBarVal': 'modelList[1].bar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectArrayData(index, locals);

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.reqFooBarVal).toBeDefined();
					expect(results.reqLocalFoo).toBeDefined();
					expect(results.reqFooBarVal).toEqual(value);
					expect(results.reqLocalFoo).toEqual(localValue);
				});

				it('should collect missing data as empty strings', function() {
					// given
					var index = 4;
					var model = {};
					var schema = {
						'req.foo': 'model[].foo',
						'req.bar':  'model[].bar'
					};
					spyOn(validator, 'getModel').andReturn(model);
					spyOn(validator, 'getSchema').andReturn(schema);

					// when
					var results = validator.collectArrayData(index);

					// then
					expect(results).toEqual(jasmine.any(Object));
					expect(results.req).toBeDefined();
					expect(results.req.foo).toBeDefined();
					expect(results.req.bar).toBeDefined();

					expect(results.req.foo).toEqual('');
					expect(results.req.bar).toEqual('');
				});
			});

			it('should check if request data has all values', function() {
				// given
				var values = {
					foo: 'bar',
					list: [
						{
							key: 'key value'
						},
						{
							key: 'key value'
						}
					]
				};

				// when
				var results = validator.hasValues(values);

				// then
				expect(results).toBe(true);
			});

			it('should check if request has at least one empty value', function() {
				// given
				var values = {
					foo: 'bar',
					list: [
						{
							key: 'key value'
						},
						{
							key: ''
						},
						{
							key: 'key value'
						}
					]
				};

				// when
				var results = validator.hasValues(values);

				// then
				expect(results).toBe(false);
			});

			it('should return name of missing value', function() {
				// given
				var values = {
					foo: {
						bar: ''
					}
				};

				// when
				var results = validator.getMissingValues(values);

				// then
				expect(results.length).toEqual(1);
				expect(results).toContain('bar');
			});

			it('should return names of all missing value', function() {
				// given
				var values = {
					foo: {
						bar: '',
						filled: 'test',
						empty: ''
					}
				};

				// when
				var results = validator.getMissingValues(values);

				// then
				expect(results.length).toEqual(2);
				expect(results).toContain('bar');
				expect(results).toContain('empty');
			});

			it('should throw error for not implemented method', function() {
				expect(validator.validate).toThrow();
			});
		});
	});
});