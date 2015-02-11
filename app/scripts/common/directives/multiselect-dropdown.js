define([
	'angular', 'jquery'
], function(angular, $){
	'use strict';

	var template = '<div class="btn-group ui-multiselect-dropdown" ng-class="{open: open}" ng-init="open=false" data-role="multiselect">'+
						'<div class="ui-multiselect-dropdown-description">{{selectedDescription || "Select"}}</div>'+
						'<ul class="dropdown-menu" autofocus="autofocus">' +
							'<li ng-click="selectAll()" class="ui-multiselect-dropdown-option" data-role="option" data-value="select-all">Check All</li>' +
							'<li ng-click="deselectAll();" class="ui-multiselect-dropdown-option" data-role="option" data-value="unselect-all">Uncheck All</li>' +
							'<li class="divider"></li>' +
							'<li ng-repeat="option in options" ng-click="setSelectedItem(option)" class="ui-multiselect-dropdown-option" ng-class="{selected: keyBoardPointer(option.name)}" data-role="option" ng-attr-data-value="{{::option.value}}" ng-attr-data-checked="{{isChecked(option.name) ? 1 : 0}}">' +
								'{{::option.value}}' +
								'<span ng-class="{\'glyphicon glyphicon-ok pull-right\': isChecked(option.name)}"></span>' +
							'</li>' +
						'</ul>' +
					'</div>';

	angular.module('TT-UI.Common.Directives.MultiselectDropdown', [])
	.directive('multiselectDropdown', function(){
		return {
			require: '?ngModel',
			restrict: 'E',
			scope: {
				options: '=',
				preselected: '='
			},
			replace: true,
			link: function(scope, element, attributes, ngModel){
				// General multiselect-dropdown functionality
				var el = element[0];
				var currentSelectedOption = '';

				scope.selectedDescription = '';
				scope.model = scope.preselected || [];
				changeModel();
				
				function changeModel() {
					var model = scope.model;
					var len = model.length;
					var newModelValue = model.join('.').split('.');
					var description = '';

					ngModel.$setViewValue(newModelValue);

					description = len > 4 ? len + ' items selected' : model.join(', ');

					scope.selectedDescription = description;
				}

				$(el).click(function(event){
					var el = $(event.target);
					if (el.hasClass('ui-multiselect-dropdown-option') || attributes.disabled){ // one of the options is being clicked
						return;
					}

					scope.open = !scope.open;
					scope.$digest();
				});

				scope.selectAll = function(){
					scope.model = pluck(scope.options, 'name');
					changeModel();
				};

				scope.deselectAll = function(){
					scope.model.length = 0;
					changeModel();
				};

				scope.setSelectedItem = function(option){
					var name = option.name;
					if (contains(scope.model, name)){
						scope.model = without(scope.model, name);
					}
					else {
						scope.model.push(name);
					}
					currentSelectedOption = name;
					changeModel();
					return false;
				};

				scope.isChecked = function(name){
					return contains(scope.model, name);
				};

				scope.keyBoardPointer = function(name){
					return currentSelectedOption === name;
				};

				// Keyboard events handling section

				var keys = {
					32: {name: 'space', preventDefault: true},
					13: {name: 'space', preventDefault: true},
					38: {name: 'arrowUp', preventDefault: true},
					40: {name: 'arrowDown', preventDefault: true},
					27: {name: 'escape', preventDefault: false}
				};

				function arrowCallback(direction){ // arrows handler
					return function (){
						if (!scope.open){
							scope.open = true;
						}

						var opts = pluck(scope.options, 'name');
						if (currentSelectedOption === '') { // for the first dropdown opening set current select as first one
							currentSelectedOption = opts[0];
							return;
						}

						var index = opts.indexOf(currentSelectedOption);
						if (index + direction > opts.length - 1){
							currentSelectedOption = opts[0];
						}
						else if (index + direction < 0){
							currentSelectedOption = opts[opts.length - 1];
						}
						else {
							currentSelectedOption = opts[index + direction];
						}
					};
				}

				var keyDownCallbacks = { //keyboard callbacks bindings
					space: function(){ // space button handler
						if (!scope.open || currentSelectedOption === ''){
							scope.open = true;
						}
						else if (currentSelectedOption !== '') {
							scope.setSelectedItem({name:currentSelectedOption}); // probably not the best solution
						}
					},
					arrowUp: arrowCallback(-1),
					arrowDown: arrowCallback(1),
					escape: function(){ // escape button handler. Close dropdown
						scope.open = false;
						currentSelectedOption = '';
						scope.$digest();
					}
				};

				$(el).keydown(function(event){
					if(attributes.disabled){
						return;
					}

					var key = keys[event.keyCode];

					if (key){
						if (key.preventDefault){
							event.preventDefault(); // prevent default actions for binded keys
						}
						keyDownCallbacks[key.name](); // if we got handler - execute it and update the scope
						scope.$digest();
					}
				});

				// close list on focus out

				$(el).focusout(function(){
					keyDownCallbacks.escape(); //close dropdown
				});

				// Those three below are substitures for pluck, contains and without functions of underscore.js

				function pluck(obj, field){
					var ret = [];
					var p;

					for (p in obj){
						if (obj.hasOwnProperty(p) && obj[p][field] !== undefined){
							ret.push(obj[p][field]);
						}
					}
					return ret;
				}

				function contains(array, name){
					return array.indexOf(name) !== -1;
				}

				function without(array, name){
					var index = array.indexOf(name);
					if (index !== -1){
						array.splice(index, 1);
					}
					return array;
				}

			},
			template: template
		};
	});
});