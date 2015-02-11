define([
	'angular',
	'angular-mocks',
	'common/services/resource'
], function(angular, mocks) {
	'use strict';

	describe('Service: Resource', function() {
		// instantiate service
		var ResourceFactory, CONFIG, Api, AlternateApiVersionResourceFactory;

		var $resource = jasmine.createSpy('$resource');
		var $resourceService = jasmine.createSpy('$resource');
		var $resourceProvider = function() {
			this.$get = $resourceService;
		};
		$resourceService.andReturn($resource);

		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.Resource');

			mocks.module(function(_CONFIG_, $provide) {
				CONFIG = _CONFIG_;
				$provide.provider('$resource', $resourceProvider);
			});

			mocks.inject(function(_ResourceFactory_, _Api_, _AlternateApiVersionResourceFactory_) {
				Api = _Api_;
				ResourceFactory = _ResourceFactory_;
				AlternateApiVersionResourceFactory = _AlternateApiVersionResourceFactory_;
			});
		});

		it('should check if Resource module exists', function() {
			expect(!!ResourceFactory).toBe(true);
			expect(typeof ResourceFactory).toEqual('function');
			expect(typeof AlternateApiVersionResourceFactory).toEqual('function');
		});

		it('ResourceFactory should factorize a simple resource', function() {
			// given
			var uriHost = 'barUrl';
			var uriPath = 'fooPath';
			var method = 'fooMethod';
			spyOn(Api, 'getUrl').andReturn(uriHost);

			// when
			var service = ResourceFactory(uriHost, uriPath, method);

			// then
			expect($resource).toHaveBeenCalledWith(uriHost+uriPath, jasmine.any(Object), jasmine.any(Object));
		});

		it('AlternateApiVersionResourceFactory should factorize a simple resource', function() {
			// given
			var uriHost = 'barUrl';
			var uriPath = 'fooPath';
			var method = 'fooMethod';
			spyOn(Api, 'getUrl').andReturn(uriHost);

			// when
			var service = AlternateApiVersionResourceFactory(uriHost, uriPath, method);

			// then
			expect($resource).toHaveBeenCalledWith(uriHost+uriPath, jasmine.any(Object), jasmine.any(Object));
		});
	});
});