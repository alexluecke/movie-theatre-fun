'use strict';

describe('SnackCtrl', function() {
	beforeEach(module('MovieTheaterApp'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('$scope.total', function() {
		it('Should be 0.0 initially.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			expect($scope.total).toEqual(0.0);
		});
	});

	describe('$scope.cart', function() {
		it('Each cart item should be empty initially', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			for (var prop in $scope.cart) {
				expect($scope.cart[prop]).toEqual(0);
			}
		});
	});

	describe('$scope.total', function() {
		it('Expect total of certain set of items (v1).', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.cart = {
				'popcorn': 3,
				'snickers': 5,
				'soda': 1,
			};
			$scope.updateTotal();
			expect($scope.total).toEqual(23.0);
		});

		it('Expect total of certain set of items (v2).', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.cart = {
				'popcorn': 4,
				'snickers': 11,
				'soda': 2,
			};
			$scope.updateTotal();
			expect($scope.total).toEqual(44.0);
		});
	});

	describe('$scope.validates', function() {
		it('Form should not validate empty name.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.inputs.name = '  ';
			$scope.inputs.cost = '2.0';
			expect(controller.validates()).toBe(false);
		});

		it('Form should not validate negative cost.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.inputs.name = 'test';
			$scope.inputs.cost = '-2.0';
			expect(controller.validates()).toBe(false);
		});

		it('Form should validate proper name and cost.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.inputs.name = 'test';
			$scope.inputs.cost = '2.0';
			expect(controller.validates()).toBe(true);
		});
	});

	describe('controller.resetInputs', function() {
		it('Form fields should be empty on input reset.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			$scope.inputs.name = "Test";
			$scope.inputs.cost = "3.0";
			controller.resetInputs();
			expect($scope.inputs.name).toBe('');
			expect($scope.inputs.cost).toBe('');
		});
	});

	describe('$scope.addSellable', function() {
		it('Add sellable function should update sellable items.', function() {
			var $scope = {};
			var controller = $controller('SnackCtrl', { $scope: $scope });
			var o_len = $scope.sellables.length;
			$scope.inputs.name = 'Test';
			$scope.inputs.cost = '3.0';
			$scope.addSellable();
			expect($scope.sellables.length).toEqual(o_len+1);
			var new_sellable = $scope.sellables.filter(function(x) {
				return x.name ===  'Test';
			});
			expect(new_sellable.length).toEqual(1);
			expect(new_sellable[0].cost).toBe(3.0);
			expect(typeof new_sellable[0].cost).toBe('number');
		});
	});
});
