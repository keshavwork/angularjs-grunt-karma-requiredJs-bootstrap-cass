define(function() {
	'use strict';

	return {
		'formats': {
			'clm-phone-number':  '^(\\+\\d{1,4}[ -]?)?[\\d- ]{6,12}$',
			'clm-email': '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
		}
	};
});
