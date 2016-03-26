var MovieTheaterApp = angular.module('MovieTheaterApp', []);

MovieTheaterApp.controller('MovieTheaterCtrl', function ($scope) {

	// Model data
	$scope.inputs = { 'name': '', 'cost': '' };
	$scope.total = 0.0;
	$scope.cart = {};
	$scope.sellables = [
		{ 'name': 'popcorn', 'cost': 3.0 },
		{ 'name': 'snickers', 'cost': 4.0 },
		{ 'name': 'soda', 'cost': 2.0 }
	];

	// Initialize cart items:
	$scope.sellables.forEach(function(x) {
		$scope.cart[x.name] = 0;
	});

	var defaultCostFunc = function(x) {
		return x.cost * $scope.cart[x.name];
	};

	var costFunctions = {
		'snickers': function(x) {
			return x.cost * (
				3 * Math.floor($scope.cart[x.name]/5) + $scope.cart[x.name]%5
			);
		},
		'popcorn': defaultCostFunc,
		'soda': defaultCostFunc,
	};

	$scope.addToCart = function(name) {
		if ($scope.cart[name] !== 'undefined')
			$scope.cart[name] += 1;
		$scope.updateTotal();
	};

	$scope.removeFromCart = function(name) {
		if ($scope.cart[name] !== 'undefined') {
			$scope.cart[name] = ($scope.cart[name] === 0) ?
				0 : $scope.cart[name] - 1;
		}
		$scope.updateTotal();
	};

	$scope.updateTotal = function() {
		// Take each sellable item, do a lookup in the cart to see how many items
		// have been added, multiply the cost by the number added, and sum the
		// total.
		$scope.total = $scope.sellables.map(function(x) {
			// There are specials on particular
			return costFunctions[x.name](x);
		}).reduce(function(x,y) {
			return x+y;
		});
	};

	$scope.addSellable = function() {
		if ($scope.inputs.name.trim() && Number.parseFloat($scope.inputs.cost)) {
			$scope.sellables.push({
				'name': $scope.inputs.name,
				'cost': Number.parseFloat($scope.inputs.cost),
			});
			costFunctions[$scope.inputs.name] = defaultCostFunc;
			$scope.cart[$scope.inputs.name] = 0;
			$scope.inputs = { 'name': '', 'cost': '' };
		}
	};
});
