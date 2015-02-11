define([
	'angular',
	'angular-mocks',
	'common/directives/multiselect-dropdown'
], function(angular, mocks) {
	'use strict';

	// TODO: Remove jQuery dependency in this test sepc ex. use "triggerHandler" isnread of "trigger"

	describe('Directive: "multiselect-dropdown" ', function() {
		var $compile, $scope, $rootScope;

		beforeEach(function() {
			mocks.module('TT-UI.Common.Directives.MultiselectDropdown');

			mocks.inject(function(_$compile_, _$rootScope_){
				$compile = _$compile_;
				$rootScope = _$rootScope_;
				$scope = $rootScope.$new();
			});
		});

		var tpl =
			'<multiselect-dropdown ' +
				'ng-model="$$value$$" ' +
				'options="[{\'name\':\'Foo\', \'value\':\'Foo\'},' +
					'{\'name\':\'Boo\', \'value\':\'Boo\'}]"' +
			'></multiselect-dropdown>';

		// HTML stucture tests

		it('Should check if directive have procesed element.', function() {
			// given
			var html = $compile(tpl)($scope);

			// when
			$scope.$digest();

			// then
			expect(html).not.toBe(null);
			expect(html.length).not.toEqual(0);
		});

		it('Should test if element contains proper structure.', function() {
			// given
			var html = $compile(tpl)($scope),
				description = html.find('div'),
				dropDownMenu = html.find('ul'),
				options = dropDownMenu.find('li');

			// when
			$scope.$digest();

			//  then
			expect(html.hasClass('ui-multiselect-dropdown')).toBe(true); // element to exist
			expect(description.hasClass('ui-multiselect-dropdown-description')).toBe(true); // element to have description div
			expect(dropDownMenu.hasClass('dropdown-menu')).toBe(true); // element to have dropdown menu
			expect(options.length).toBeGreaterThan(1); // dropdown menu has at least to options - 'check all' and 'uncheck all'
		});

		// functionality tests

		it('Should test if element options were provided and check if their structure is okay.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				selectedItemName = 'Foo',
				selectedItemValue = 'Foo';

			// when
			$scope.$digest();

			//  then
			expect(scope.options).not.toBe(undefined);
			expect(scope.options.length).toBeGreaterThan(0);
			expect(scope.options[0].name).toBe(selectedItemName); // checking first option
			expect(scope.options[0].value).toBe(selectedItemValue);
		});

		it('Should try selecting one element. And then check if it is selected.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				selectedItem = {name: 'Boo', value: 'Boo'};

			// when
			$scope.$digest();
			scope.setSelectedItem(selectedItem);

			//  then
			expect(scope.model.length).toBe(1);
			expect(scope.model[0]).toBe(selectedItem.name);
		});

		it('Should try deselecting element after only it was selected. And then check if scope.model is empty.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				selectedItem = {name: 'Boo', value: 'Boo'};

			// when
			$scope.$digest();
			scope.setSelectedItem(selectedItem);
			scope.setSelectedItem(selectedItem); // for deselection we just select element twice

			//  then
			expect(scope.model.length).toBe(0);
		});

		it('Should try selecting all elements. And then check if scope.model length is 2', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail;

			// when
			$scope.$digest();
			scope.selectAll();

			//  then
			expect(scope.model.length).toBe(2);
		});

		it('Should try deselecting all elements. And then check if scope.model length is 0', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail;

			// when
			$scope.$digest();
			scope.selectAll();
			scope.deselectAll();

			//  then
			expect(scope.model.length).toBe(0);
		});

		// html-ui events tests

		it('Should test if clicked element is checked', function(){
			// given
			var html = $compile(tpl)($scope),
				option = html.find('li')[3], // considering that previous tests passed, we are for sure have 5 <li> elements, last two of them are options
				scope = $scope.$$childTail,
				selectedValue = 'Foo';

			// when
			$scope.$digest();
			angular.element(option).triggerHandler('click');

			//  then
			expect(scope.model.length).toBe(1);
			expect(scope.model[0]).toBe(selectedValue);
		});

		it('Should test if all elements are selected after clicking "Check All"', function(){
			// given
			var html = $compile(tpl)($scope),
				option = html.find('li')[0], // 1st <li> is a "Check All" button
				scope = $scope.$$childTail,
				futureModel = '["Foo","Boo"]';

			// when

			$scope.$digest();
			angular.element(option).triggerHandler('click');

			//  then
			expect(scope.model.length).toBe(2);
			expect(JSON.stringify(scope.model)).toBe(futureModel);
		});

		it('Should test if dropdown opens on click.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail;
			// when
			$scope.$digest();
			$(html).click();

			//  then
			expect(scope.open).toBe(true);
		});

		it('Should test if dropdown closes on second click.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail;

			// when
			$scope.$digest();
			$(html).click();
			$(html).click();

			//  then
			expect(scope.open).toBe(false);
		});

		it('Should test if pressing "Enter" key on the keyboard opens dropdown.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				keyDownEvent = jQuery.Event("keydown");

			// when
			$scope.$digest();
			keyDownEvent.keyCode = 13; // "Enter" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.open).toBe(true);
		});

		it('Should test if pressing "Esc" key on the keyboard closes dropdown.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				keyDownEvent = jQuery.Event("keydown");

			// when
			$scope.$digest();
			keyDownEvent.keyCode = 13; // "Enter" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 27; // "Esc" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.open).toBe(false);
		});

		it('Should test if pressing "Arrow" keys on the keyboard navigates through dropdown options.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				keyDownEvent = jQuery.Event("keydown");

			// when
			$scope.$digest();
			keyDownEvent.keyCode = 40; // "Down Arrow" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 38; // "Up Arrow" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.keyBoardPointer('Boo')).toBe(true);
		});

		it('Should test if pressing "Space" key on the keyboard selects one option.', function(){
			// given
			var html = $compile(tpl)($scope),
				scope = $scope.$$childTail,
				keyDownEvent = jQuery.Event("keydown");

			// when
			$scope.$digest();
			keyDownEvent.keyCode = 40; // "Down Arrow" key code
			$(html).trigger(keyDownEvent);
			keyDownEvent.keyCode = 32; // "Space" key code
			$(html).trigger(keyDownEvent);

			//  then
			expect(scope.model.length).toBeGreaterThan(0);
			expect(scope.model[0]).toBe("Foo");
		});
	});
});