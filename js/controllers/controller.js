var MovieTheaterApp = angular.module('MovieTheaterApp', []);

MovieTheaterApp.controller('MovieTheaterCtrl', function ($scope) {

	$scope.total = 0.0;

  $scope.cart = {};

  $scope.sellables = [
		{ 'name': 'popcorn', 'price': 3.0 },
		{ 'name': 'snickers', 'price': 4.0 },
		{ 'name': 'soda', 'price': 2.0 }
  ];

  // Initialize cart items:
  $scope.sellables.forEach(function(x) {
		$scope.cart[x.name] = 0;
	});

	$scope.addToCart = function(name) {
		if ($scope.cart[name] !== 'undefined') {
			$scope.cart[name] += 1;
		}
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
		// have been added, multiply the price by the number added, and sum the
		// total.
		$scope.total = $scope.sellables.map(function(x) {
			return x.price * $scope.cart[x.name];
		}).reduce(function(x,y) {
			return x+y;
		});
	};
});
