app.directive("answerSet", function ($compile, $http) {
	var linker = function (scope, element, attrs, questionCtrl) {
		var templateType = getTemplate(attrs.class);
		$http.get('templates/directives/' + templateType + '.html?ts='+new Date().getTime()).success(function(data){
			element.html(data);
			$compile(element.contents())(scope);
		}).error(function(){
			alert("Error finding template");
		});
	};

	var getTemplate = function(templateName) {
		var template = '';

		switch(templateName){
			case 'multiplechoice':
				template = "setMultipleChoice";
				break;
			case 'button':
				template = "setButton";
				break;
			case 'dropdown':
				template = "setDropDown";
				break;
			case 'drop_down_single':
				template = "setDropDownSingle";
				break;
			case 'input':
				template = "setInput";
				break;
			case 'drag_and_drop':
				template = "setDragDrop";
				break;
			case 'drag_drop_single':
				template = "setDragDropSingle";
				break;
		}

		return template;
	};

	return {
		replace: true,
		restrict: 'E',
		require: '^question',
		link: linker
	};
});