app.controller('quizController', ['$scope', '$http', 'helperService', '$rootScope', 'ngDialog', 'ActivityService', function ($scope, $http, helper, $rootScope, ngDialog, ActivityService) {
	$scope.open = function () {
		ngDialog.open({
			template: 'templates/modal/accessibility.html',
			controller:'accessibilityController',
			className: 'ngdialog-theme-default ngdialog-theme-custom'
		});

		$scope.$on('ngDialog.opened', function (e, $dialog) {

		});
	};

	$rootScope.version  = '0.2';
	$scope.animateClass = '';


	$scope.changeAnimateClass = function (value) {
		if (value !== undefined) {
			$scope.animateClass = value;
		} else {
			$scope.animateClass = '';
		}

		console.log($scope.animateClass);
	};

    $scope.objective1  = [
        {
            objEn : 'Pronounce the English alphabet',
            objFr : 'Prononcer l’alphabet'
        },
        {
            objEn : 'Use cardinal numbers',
            objFr : 'Utiliser les nombres cardinaux'
        },
        {
            objEn : 'Greet and take leave from someone',
            objFr : 'Saluer et prendre congé de quelqu’un'
        },
        {
            objEn : 'Introduce yourself and another person',
            objFr : 'Se présenter et présenter quelqu’un'
        },
        {
            objEn : 'Give and ask basic personal information',
            objFr : 'Donner et demander des informations personnelles'
        },
        {
            objEn : 'Express and respond to thanks',
            objFr : 'Exprimer et répondre aux remerciements'
        }
    ];

    $scope.objective2 = [
        {
            objEn : 'The verb "to be"',
            objFr : 'Le verbe « to be »'
        },
        {
            objEn : 'The personal subject pronouns',
            objFr : 'Les pronoms personnels sujets'
        },
        {
            objEn : 'The present tense in the affirmative form',
            objFr : 'Le présent à la forme affirmative'
        },
        {
            objEn : 'Possessive adjectives',
            objFr : 'Les adjectifs possessifs'
        },
        {
            objEn : 'Articles: the, a',
            objFr : 'Les articles : the, a'
        },
        {
            objEn : 'Conjunctions: and, but',
            objFr : 'Les conjonctions : and, but'
        }
    ];

    $scope.step1 = true;
    $scope.step2 = true;

    $scope.step2 = function() {
        $scope.step1 = false;
        $scope.step2 = false;
    };

    /* Dialogue Content */
    $scope.dialogue = [
        {
            className : 'gray',
            diaName : 'Full Video'
        },
        {
            className : 'gray',
            diaName : 'Scene1'
        },
        {
            className : 'gray',
            diaName : 'Scene2'
        },
        {
            className : 'gray',
            diaName : 'Scene3'
        },
        {
            className : 'gray',
            diaName : 'Scene4'
        }
    ];

    $scope.status = [
        {
            className : 'completed',
            statusName : 'Completed'
        },
        {
            className : 'attempted',
            statusName : 'Attempted'
        },
        {
            className : 'notAttempted',
            statusName : 'Not Attempted'
        },
        {
            className : 'mandatory',
            statusName : 'Mandatory'
        },
        {
            className : 'nonMandatory',
            statusName : 'Non Mandatory'
        }
    ];

    $scope.activityDataList = ActivityService.getActivityList();

    $scope.setActivityId = function(activityId) {
        ActivityService.setSelectedActivity(activityId);
    };

}]);