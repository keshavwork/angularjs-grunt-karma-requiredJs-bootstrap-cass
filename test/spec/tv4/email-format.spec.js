/* global tv4 */

define([
	'tv4'
], function() {
	'use strict';

	describe('tv4: Email format validation', function() {

		// Test schema
		var schema = {
			'type': 'string',
			'format': 'clm-email'
		};

		it('Should allow common email format', function() {
			var data = 'name@site.com';

			var result = tv4.validate(data, schema);

			expect(result).toBe(true);
			expect(tv4.error).toBe(null);
		});

		it('Should not allow special characters', function() {
			var data = '&%¤@site.com';

			var result = tv4.validate(data, schema);

			expect(result).toBe(false);
			expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
		});

		it('Should not allow name without domain', function() {
			var data = 'firstname.lastname';

			var result = tv4.validate(data, schema);

			expect(result).toBe(false);
			expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
		});

		it('Should not allow duplicate at-characters', function() {
			var data = 'name@@site.com';

			var result = tv4.validate(data, schema);

			expect(result).toBe(false);
			expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
		});

		it('Should allow multiple dots in name', function() {
			var data = 'a.b.c.d.e@site.com';

			var result = tv4.validate(data, schema);

			expect(result).toBe(true);
			expect(tv4.error).toBe(null);
		});

		it('Should allow multiple dots in domain name', function() {
			var data = 'name@my.site.co.uk';

			var result = tv4.validate(data, schema);

			expect(result).toBe(true);
			expect(tv4.error).toBe(null);
		});

		it('Should not allow sequential dots in domain name', function() {
			var data = 'name@site..com';

			var result = tv4.validate(data, schema);

			expect(result).toBe(false);
			expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
		});

		it('Should not allow domain name ending with a dot', function() {
			var data = 'name@site.';

			var result = tv4.validate(data, schema);

			expect(result).toBe(false);
			expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
		});
	});
});
