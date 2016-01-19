app.filter("sanitize", ['$sce', function($sce) {
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
}]);

app.filter('debug', function() {
	return function(input) {
		if (input === '') return 'empty string';
		return input ? input : ('' + input);
	};
});