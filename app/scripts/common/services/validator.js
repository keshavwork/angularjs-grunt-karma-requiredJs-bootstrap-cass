define([
	'angular'
], function(angular) {
	'use strict';

	return angular.module('TT-UI.Common.Services.Validator', [])

	.factory('Validator', ['$parse', function($parse) {
		var Validator = function(ruleName, name, inline) {
			this._ruleName = ruleName;
			this._name = name || ruleName;
			this._inline = !!inline;

			this._schema =  [];
			this._formModel = null;
			this._model = null;
		};

		Validator.prototype.getRuleName = function() {
			return this._ruleName;
		};

		Validator.prototype.getName = function() {
			return this._name;
		};

		Validator.prototype.isInline = function() {
			return this._inline;
		};

		Validator.prototype.setSchema = function(schema) {
			this._schema = schema;

			return this;
		};

		Validator.prototype.getSchema = function() {
			return this._schema;
		};

		Validator.prototype.setForm = function(formModel) {
			this._formModel = formModel;

			return this;
		};

		Validator.prototype.getForm = function() {
			return this._formModel;
		};

		Validator.prototype.setModel = function(model) {
			this._model = model;

			return this;
		};

		Validator.prototype.getModel = function() {
			return this._model;
		};

		Validator.prototype.collectData = function(locals) {
			var model = this.getModel();
			var requestData = {};
			var valueGetter, valueSetter, value;

			locals = locals || {};

			angular.forEach(this.getSchema(), function(formPath, requestPath) {
				value = '';

				if (formPath) {
					valueGetter = $parse(formPath);
					value = valueGetter(model, locals);
				}

				valueSetter = $parse(requestPath);
				valueSetter.assign(requestData, value ? value.toString() : '');
			});

			return requestData;
		};

		Validator.prototype.collectArrayData = function(index, locals) {
			var model = this.getModel();
			var requestData = {};
			var valueGetter, valueSetter,value;
			var regExp = /\[\]/g;

			locals = locals || {};

			angular.forEach(this.getSchema(), function(formPath, requestPath) {
				value = '';

				if (formPath) {
					// TODO: Add support for nested arrays
					valueGetter = $parse(formPath.replace(regExp, function() {
						return '['+index+']';
					}));

					value = valueGetter(model, locals);
				}

				valueSetter = $parse(requestPath);
				valueSetter.assign(requestData, value ? value.toString() : '');
			});

			return requestData;
		};

		Validator.prototype.hasValues = function(requestData) {
			var value;
			var hasValues = Object.keys(requestData).every(function(key) {
				value = requestData[key];

				return angular.isObject(value) ? this.hasValues(value) : value;
			}, this);

			return hasValues;
		};

		Validator.prototype.getMissingValues = function(requestData) {
			var value;
			var missingValues = [];

			Object.keys(requestData).forEach(function(key) {
				value = requestData[key];

				if (angular.isObject(value)) {
					missingValues.push.apply(missingValues, this.getMissingValues(value));
				}
				else if (!value) {
					missingValues.push(key);
				}
			}, this);

			return missingValues;
		};

		Validator.prototype.validate = function() {
			throw new Error('Validate method was not implmented yet');
		};


		return Validator;
	}])
	;
});