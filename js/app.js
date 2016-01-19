'use strict';

var app = angular.module('quizApp', [
									'ui.router',
									'ngResource',
									'ui.bootstrap',
									'ngDialog',
									'ui-rangeSlider',
									'ngAnimate',
									'rzModule',
									'lvl.directives.dragdrop',
									'brantwills.paging',
									'ngAria'])
      .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
		$stateProvider
		.state('instructions', {
		    url: '/',
		    templateUrl: 'templates/quiz/instructions.html?ts='+new Date().getTime(),
		    controller: 'quizController'
		})
		.state('content', {
			url: '/content',
			templateUrl: 'templates/quiz/content.html?ts='+new Date().getTime(),
			controller: 'quizController'
		})
		.state('questions', {
		    url: '/questions',
		    templateUrl: 'templates/questions.html?ts='+new Date().getTime(),
		    controller: 'questionsController'
		});

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
      }]);