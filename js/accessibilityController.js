app.controller('accessibilityController', ['$scope', '$rootScope', 'ngDialog', function($scope, $rootScope, ngDialog) {
	if ($rootScope.selectedBodyClass == '') {
		$rootScope.selectedBodyClass = 'silver-blue';
	}

	if ($rootScope.fontSize === undefined) {
		$rootScope.fontSize = 2;
	}

	$scope.availableFontSize = ['Smallest', 'Small', 'Medium', 'Large', 'Largest'];
	if ($rootScope.volumePercentage === undefined) {
		$rootScope.volumePercentage = 75;
	}

	$scope.fontTranslate = function(value) {
		$scope.fontSize = value;
		return $scope.availableFontSize[value];
	};

	$scope.bodyClasses = [{
		name: 'Silver Blue',
		class: 'silver-blue'
	}, {
		name: 'Inverted',
		class: 'inverted'
	}];
	$scope.selectedBodyClass = $rootScope.selectedBodyClass;

	$scope.fontSize = $rootScope.fontSize;

	$scope.volumePercentage = {
		max: $rootScope.volumePercentage
	};


	$scope.$watch('selectedBodyClass', function(value) {
		$scope.selectedBodyClass = value;
	});

	$scope.cancelChanges = function() {
		ngDialog.close();
	};

	$scope.applyChanges = function() {
		ngDialog.close();
		$rootScope.selectedBodyClass = $scope.selectedBodyClass;
		$rootScope.fontSize = $scope.fontSize;
		$rootScope.volumePercentage = $scope.volumePercentage.max;
	};
}]);