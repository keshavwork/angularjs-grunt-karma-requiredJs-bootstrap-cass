define([
	'angular',
	'angular-strap',
	'angular-smart-table'
], function(angular) {
	'use strict';

	var template =
		'<div>' +
			'<table class="table table-striped">' +
				'<thead>' +
					'<tr>' +
						'<th translate="Description">Description</th>' +
						'<th translate="Type">Type</th>' +
						'<th translate="Periodicity">Periodicity</th>' +
						'<th translate="Tax">Tax</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +

					'<tr ng-repeat="payment in monthlyPayments">' +
						'<td>{{ payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>Monthly</td>' +
						'<td>{{ payment.taxRate | currency }}</td>' +
						'<td>{{ payment.amount | currency}}</td>' +
						'<td>' +
							'<strong>{{ payment.netAmount | currency }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
					'</tr>' +
					'<tr ng-repeat="payment in oneTimePayments">' +
						'<td>{{ payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>One Time</td>' +
						'<td>{{ payment.taxRate | currency}}</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
						'<td>{{ payment.amount | currency}}</td>' +
						'<td>' +
							'<strong>{{ payment.netAmount | currency }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td>' +
							'<strong translate="TOTAL">TOTAL</strong><br>' +
							'<small>{{totalTax}}%</small>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong>{{totalNetMounthly | currency}}</strong><br>' +
							'<small>{{totalTaxedNetMounthly | currency}}</small>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong>{{totalNetOnetime | currency}}</strong><br>' +
							'<small>{{totalTaxedNetOnetime | currency}}</small>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td>' +
							'<strong translate="TOTAL inc. TAX">TOTAL inc. TAX</strong><br>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong>{{totalNetMounthlyIncTax | currency}}</strong><br>' +
							'<small translate="Monthly Charge">Monthly Charge</small>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong>{{totalNetOnetimeIncTax | currency}}</strong><br>' +
							'<small translate="Pay Upfront">Pay Upfront</small>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>' +
		'</div>';

	angular.module('TT-UI.Common.Directives.ChargesTable',[
		'smart-table'
	])
	.directive('chargesTable', function() {
		function agregatePayments(scope){

			var payments = angular.copy(scope.payments);
			var totalNetMonthly = 0;
			var totalNetOnetime = 0;

			if(!angular.isArray(payments)){ // if this is not an array of payments
				payments = [payments];
			}

			scope.monthlyPayments = [];
			scope.oneTimePayments = [];

			angular.forEach(payments, function(payment){
				scope.monthlyPayments.push(payment.getMonthlyPayments());
				scope.oneTimePayments.push(payment.getOneTimePayments());
				totalNetMonthly += payment.getTotalNetMonthly();
				totalNetOnetime += payment.getTotalNetOnetime();
			});


			scope.monthlyPayments = [].concat.apply([], scope.monthlyPayments);
			scope.oneTimePayments = [].concat.apply([], scope.oneTimePayments);
			scope.totalNetMounthly = Math.round(totalNetMonthly * 100) / 100;
			scope.totalNetOnetime = Math.round(totalNetOnetime * 100) / 100;


			angular.forEach(scope.monthlyPayments.concat(scope.oneTimePayments), function(c){
				c.amount = Math.round(c.amount * 100)/100;
				c.netAmount = Math.round(c.netAmount * 100)/100;
			});

			//dummy mock values here
			scope.totalTax = 20;
			scope.totalTaxedNetMounthly = scope.totalNetMounthly * scope.totalTax / 100;
			scope.totalTaxedNetOnetime = scope.totalNetOnetime * scope.totalTax / 100;

			scope.totalNetMounthlyIncTax = scope.totalNetMounthly + scope.totalTaxedNetMounthly;
			scope.totalNetOnetimeIncTax = scope.totalNetOnetime + scope.totalTaxedNetOnetime;
		}
		return {
			require: '?ngModel',
			restrict: 'E',
			scope: {
				payments: '='
			},
			link: function(scope){
				if( !scope.payments ){
					return;
				}

				scope.$watch('payments', function(){
					agregatePayments(scope);
				});
			},
			replace: true,
			template: template
		};
	})
	;
});