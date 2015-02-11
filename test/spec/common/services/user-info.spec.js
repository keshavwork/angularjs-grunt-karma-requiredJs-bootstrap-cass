define([
	'angular',
	'angular-mocks',
	'common/services/user-info'
], function(angular, mocks) {
	'use strict';

	var UserInfoService, UserInfoServiceApi;

	describe('Service: UserInfo ', function() {
		beforeEach(function() {
			mocks.module('TT-UI.Common.Services.UserInfo');

			mocks.inject(function(_UserInfoService_, _UserInfoServiceApi_) {
				UserInfoService = _UserInfoService_;
				UserInfoServiceApi = _UserInfoServiceApi_;
			});
		});

		it('Should check if UserInfoService service exists', function() {
			expect(!!UserInfoService).toBe(true);
			expect(UserInfoService).toEqual(jasmine.any(Object));
		});

		it('Should check if UserInfoServiceApi service exists', function() {
			expect(!!UserInfoServiceApi).toBe(true);
			expect(typeof UserInfoServiceApi).toEqual('function');
		});

		it('Should populate user data', function() {
			// given
			var userName  = 'Foo User';
			var userPhoto = 'Foo img';

			// when
			UserInfoService.populateData({
				name: userName,
				picture: userPhoto
			});

			// then
			expect(UserInfoService.getUserName()).toEqual(userName);
			expect(UserInfoService.getUserPhoto()).toEqual(userPhoto);
		});

		it('Should populate user data', function() {
			// given
			var userName  = 'Foo User';
			var userPhoto = 'Foo img';

			// when
			UserInfoService.populateData({
				name: userName,
				picture: userPhoto
			});
			UserInfoService.clearData();

			// then
			expect(UserInfoService.getUserName()).not.toEqual(userName);
			expect(UserInfoService.getUserPhoto()).not.toEqual(userPhoto);
		});
	});
});
