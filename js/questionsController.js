app.controller('questionsController', ['$scope', '$http', 'helperService', 'ActivityService', '$sce', function($scope, $http, helper, ActivityService, $sce) {
        $scope.currentPage = 1;

        var activityId = ActivityService.getSelectedActivity();
        $scope.activityList = ActivityService.getActivityList();
        $scope.selectedActivity = $scope.activityList[activityId];
        $scope.$parent.selectedActivity = $scope.activityList[activityId];

        $scope.activityType = $scope.$parent.selectedActivity.type;

        $scope.descriptionTest = function() {
            $scope.landPanel = true;
            $scope.instPanel = true;
        };

        $http.get('data/' + $scope.selectedActivity.filename + '.xml').then(function(response) {
            function parseXml(xml) {
                var dom = null;
                if (window.DOMParser) {
                    try {
                        dom = (new DOMParser()).parseFromString(xml, "text/xml");
                    }
                    catch (e) {
                        dom = null;
                    }
                }
                else
                    alert("cannot parse xml string!");
                return dom;
            }

            var findStart = "\\<!\\[CDATA\\[";
            var findEnd = "\\]\\]\\>";

            findStart = new RegExp(findStart, 'g');
            findEnd = new RegExp(findEnd, 'g');

            var cleanData = response.data.replace(findStart, "")
                    .replace(findEnd, "")
                    .replace("<?xml version=\"1.0\"?>", "")
                    .replace(/(\n)/g, "")
                    .replace(/&nbsp;/g, "")
                    .replace(/(\s+)/g, " ");
            var dom = parseXml(cleanData);
            var json = xml2json(dom);
            json = json.replace('undefined', '');

            var js = JSON.parse(json);

            $scope.activityObj = js.ACTIVITY;
            $scope.landingObj = $scope.activityObj.LANDING;
            $scope.landRowObj = $scope.landingObj.ROW;
            var newColumn = [];

            if ($scope.landRowObj.COL === undefined) {
                var keys = Object.keys($scope.landRowObj).length;
                for (var i = 0; i < keys; i++) {
                    var tmpObj = $scope.landRowObj[i];
                    if (tmpObj !== undefined) {
                        var okeys = Object.keys(tmpObj.COL).length;
                        if (okeys > 1) {
                            for (var key in tmpObj.COL) {
                                newColumn.push(tmpObj.COL[key]);
                            }
                        }
                    }
                }

                $scope.landRowObj = {};
                $scope.landRowObj.COL = newColumn;
            }

            $scope.instructionObj = $scope.activityObj.INSTRUCTIONS;
            $scope.instRowObj = $scope.instructionObj.ROW;
            $scope.landPanel = true;
            $scope.instPanel = true;
            $scope.sectionsObj = $scope.activityObj.SECTIONS;
            $scope.sectionObj = $scope.activityObj.SECTIONS.SECTION;
            $scope.currentSection = $scope.sectionObj;

            var pageNum = [];
            var totalQuestions = 0;

            //check current section type
            if (Array.isArray($scope.sectionObj[0].QUESTIONS.QUESTION)) {
                $scope.currentSectionType = "multipleque";
            } else {
                $scope.currentSectionType = "singleque";
            }

            //Get total number of questions in the section
            for (i = 0; i < $scope.sectionObj.length; i++) {
                if (Array.isArray($scope.sectionObj[i].QUESTIONS.QUESTION)) {
                    totalQuestions += $scope.sectionObj[i].QUESTIONS.QUESTION.length;
                } else {
                    totalQuestions++;
                }
            }

            $scope.totalPageNum = $scope.sectionObj.length;
            $scope.answers = [];

            for (i = 0; i < $scope.totalPageNum; i++) {
                pageNum.push(i + 1);
            }

            $scope.pageNum = pageNum;
            $scope.totalQuestions = totalQuestions;

        });

        $scope.meta = [];

        // current Page
        $scope.currentPageNum = 1;
        $scope.pagination = function(number) {
            $scope.currentPageNum = number;
            $scope.currentSection = $scope.sectionObj[number - 1];
        };

        $scope.check_all_page_covered = function() {
            for (i = 1; i <= $scope.totalPageNum; i++) {
                if ($scope.meta['page_' + i + '_question_0'] === undefined && $scope.meta['page_' + i + '_question_0_0'] === undefined)
                    return false;
            }

            return true;
        };

        $scope.answered_questions = 0;
        $scope.attend_questions = 0;
        $scope.total_questions = 0;  
        $scope.lastest_number = 0;
        
        $scope.score_percentage = function() {                      
                 
            if ($scope.check_all_page_covered()) {              
                percentage = ($scope.correct_questions / $scope.total_questions) * 100;

                return percentage.toFixed(2);
            }
            else
                return 0;
        };

        $scope.check_all_questions_covered = function() {
            $scope.total_questions = 0;
            $scope.attend_questions = 0;
            $scope.correct_questions = 0;

            if ($scope.check_all_page_covered()) {
                angular.forEach($scope.meta, function(v, k) {
                    if (k != 'undefined') {
                        $scope.total_questions++;
                        if (v.showResult !== undefined) {
                            $scope.attend_questions++;
                            
                            if (v.score)
                                $scope.correct_questions++
                        }
                    }
                });
            }

        };

        $scope.isCorrect = function(obj, ans) {
            obj.disabled = true;
            ans.show = true;
            if (ans['@CORRECT']) {
                $scope.score++;
            } else {

            }

            $scope.clickable++;
        };

        $scope.score = 0;
        $scope.clickable = 0;
        $scope.showScore = false;

        $scope.startTest = function() {
            $scope.landPanel = false;
            $scope.instPanel = false;
            $scope.currentSection = $scope.sectionObj[0];
        };

        $scope.$watch('clickable', function(nval, oval) {
            if (nval == 5) {
                $scope.showScore = true;
            }
        });

        $scope.startingQuestionIndex = 1;

        $scope.preSection = function(sectionNum) {
            if (sectionNum - 1) {
                $scope.currentSection = $scope.sectionObj[sectionNum - 2];
                $scope.currentPageNum -= 1;
            }
        };

        $scope.nextSection = function(sectionNum, lastQuestionIndex) {
            if ((sectionNum + 1 <= $scope.totalPageNum)) {
                $scope.currentSection = $scope.sectionObj[sectionNum];
                $scope.currentPageNum += 1;
                $scope.startingQuestionIndex = lastQuestionIndex + 1;
            }
        };

        $scope.goToPage = function(pageNum) {
            $scope.currentSection = $scope.sectionObj[pageNum - 1];
            $scope.currentPageNum = pageNum;
        };

        $scope.returnAsHtml = function(text) {
            return $sce.trustAsHtml(text.toString());
        };

    }]);
