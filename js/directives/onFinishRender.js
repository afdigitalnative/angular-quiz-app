app.directive('onFinishRender', function($timeout, $compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			scope.shuffle = function(o) {

				for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

				return o;
			};

			$timeout(function() {
				if (scope.$first === true) {
					if (element.hasClass("DragAndDrop")) {
						angular.element(".dragdropanswers3").empty();
					}
				}

				if (scope.$last === true) {

					if (angular.element(".dragdropanswers").length) {
						shuffle = scope.shuffle(angular.element(".dragdropanswers .llist"));

						angular.element(".dragdropanswers2").html(shuffle);

					} else {
						if (element.hasClass("DragAndDrop")) {
							shuffle = scope.shuffle(angular.element(".singlelist"));

							angular.element(".dragdropanswers3").html(shuffle);
						}
					}
				}
			}, 1000);
		}
	}
});