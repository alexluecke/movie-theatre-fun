var MovieTheaterApp = angular.module('MovieTheaterApp', ['snackFilters']);

MovieTheaterApp.controller('SnackCtrl', function ($scope) {

	var self = this;

	$scope.inputs = { 'name': '', 'cost': '' };
	$scope.total = 0.0;
	$scope.cart = {};
	$scope.sellables = [
		{ 'name': 'popcorn'  , 'cost': 3.0 },
		{ 'name': 'snickers' , 'cost': 4.0 },
		{ 'name': 'soda'     , 'cost': 2.0 }
	];

	/*
	 * Initialize cart items based on available sellables.
	 */
	$scope.sellables.forEach(function(x) {
		$scope.cart[x.name] = 0;
	});

	var defaultCostFunc = function(x) {
		return x.cost * $scope.cart[x.name];
	};

	/*
	 * Object containing cost functions per snack. Certain sellable items have
	 * specials for particular quantities, use store the function as an object
	 * with the sellable name as the hash. If there is no specials, use the
	 * defaultCostFunc when saving new sellables.
	 */
	var costFunctions = {
		'snickers': function(x) {
			return x.cost * (
				3 * Math.floor($scope.cart[x.name]/5) + $scope.cart[x.name]%5
			);
		},
		'popcorn': defaultCostFunc,
		'soda': defaultCostFunc,
	};

	/*
	 * Data supplied by the form should be retrieved from this function.
	 */
	self.getSanitizedInputData = function() {
		return {
			'name': $scope.inputs.name.trim(),
			'cost': Number.parseFloat($scope.inputs.cost)
		};
	};

	/*
	 * Used for form validation and should be called before saving the newly
	 * supplied snack.
	 */
	self.validates = function() {
		var data = self.getSanitizedInputData();
		if (!data.name) {
			alert('Supply a sellable name.');
			return false;
		}
		if (isNaN(data.cost) || data.cost <= 0.0) {
			alert('Supply a sellable cost greater than 0.');
			return false;
		}
		return true;
	};

	self.resetInputs = function() {
		for (var prop in $scope.inputs)
			$scope.inputs[prop] = '';
	};

	$scope.addToCart = function(name) {
		$scope.cart[name] += 1;
		$scope.updateTotal();
	};

	$scope.removeFromCart = function(name) {
		$scope.cart[name] = ($scope.cart[name] === 0) ?
			0 : $scope.cart[name] - 1;
		$scope.updateTotal();
	};

	/*
	 * Use the costFunctions to determine the total value attributed by each
	 * item, then sum up each contribution for the shopping cart total.
	 */
	$scope.updateTotal = function() {
		$scope.total = $scope.sellables.map(function(x) {
			return costFunctions[x.name](x);
		}).reduce(function(x,y) {
			return x+y;
		});
	};

	/*
	 * This function handles the form data, validation, sanitization, and adds
	 * new sellable.
	 */
	$scope.addSellable = function() {
		if (self.validates()) {
			var data = self.getSanitizedInputData();
			$scope.sellables.push(data);
			costFunctions[data.name] = defaultCostFunc;
			$scope.cart[data.name] = 0;
			self.resetInputs();
		}
	};
});
