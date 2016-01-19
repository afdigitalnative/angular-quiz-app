app.directive("question", ['$sce', '$compile', function($sce, $compile) {
        return {
            restrict: "E",
            transclude: true,
            scope: {
                csection: '='
            },
            controller: function($scope, $element, $attrs) {

            },
            templateUrl: "templates/directives/questions.html",
            link: function(scope, element, attr) {
                scope.showResult = false;
                scope.meta = {};
                var checkFilled = [];
                var questions = '';
                var index_no = '';
                var p_no = 0;
                var p_q_no = 0;
                var p_sub_q_no = 0;


                var aggregateScore = function() {
                    var score = 0;
                    for (var k in scope.meta) {
                        (scope.meta[k].score) ? score += scope.meta[k].score : null;
                    }

                    scope.$parent.score = score;
                    scope.$parent.meta = scope.meta;
                    scope.$parent.check_all_questions_covered();
                };

                scope.getAssetsPath = function(audioName) {
                    if (audioName['#text'] !== undefined) {
                        audioName = audioName['#text'];
                    }

                    return 'data/assets/' + scope.$parent.selectedActivity.filename + '/audio/' + audioName;
                };

                scope.getImageAssetsPath = function(imageName) {
                    return 'data/assets/' + scope.$parent.selectedActivity.filename + '/image/' + imageName;
                };

                scope.displayAsText = function(text) {

                    if (text === undefined)
                        return false;

                    if (typeof text !== 'string')
                    {
                        txt = '';

                        angular.forEach(text.TEXT, function(v, k) {
                            txt += v;
                        });

                        text.TEXT = txt;
                    }

                    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(text.TEXT) === true) {
                        return '<img src="' + "data/assets/" + scope.$parent.selectedActivity.filename + '/image/' + text.TEXT + '" class="q-img" alt="Learning Image">';
                    } else if ((/\.(mp3)$/i).test(text.TEXT) === true) {
                        return '<audio src="' + scope.$parent.selectedActivity.filename + '/audio/' + text.TEXT + '" controls="controls">';
                    } else if (text.TEXT === '{0}') {
                        return '';
                    } else {
                        return "   " + text.TEXT;
                    }
                };

                scope.getImagePath = function(imageName) {
                    return 'images/' + imageName;
                };

                scope.getControlType = function(question) {
                	
                    var controlType = undefined;

                    if (question !== undefined) {
                        if (question.ANSWERSET !== undefined && question.ANSWERSET.length > 1) {
                            controlType = question.ANSWERSET[0]['@controlType'];
                        } else if (question.ANSWERSET !== undefined && question.ANSWERSET['@controlType'] !== undefined) {
                            controlType = question.ANSWERSET['@controlType'];
                        } else {
                            controlType = 'multiplechoice';
                        }
                    } else {
                        controlType = 'multiplechoice';
                    }

                    return controlType.toLowerCase();
                };

                scope.getAnswerText = function(answers){
                    var answerTexts = [];
                    if(Array.isArray(answers)){
                            for(var i=0;i<answers.length;i++){
                                var answer = answers[i];
                                if(answer['@CORRECT']  == "TRUE" || answer['@correct'] == "TRUE" ) {
                                    var answerText = answer.TEXT;
                                    answerTexts.push(answerText);
                                }
                            }
                        }
                    else{
                        if(answers['@CORRECT'] == "TRUE" || answers['@correct']== "TRUE") {
                            var answerText = answers.TEXT;
                            answerTexts.push(answerText);
                        }
                    }

                    return answerTexts;
                };

                scope.compareAnswers =function(selected,values){
                    if(values && Array.isArray(values)){
                        for(var i=0;i<values.length;i++){
                            if(selected == values[i]){
                                return true;
                            }
                        }
                    }

                    return false;
                };

                scope.validate = function(selected, question_id, max_attempt, values, questionType) {

                    if (scope.$parent.currentSectionType == "multipleque") {

                        questions = question_id.split("_");
                        p_no = questions[1];   

                        if (questionType !== undefined && 
                            (questionType == 'setMulti_Drop_down_single' || questionType == 'setMulti_Input')) {                                                     

                            if (checkFilled.indexOf(p_no) == -1) {
                                checkFilled.push(p_no);
                            }
                            
                            scope.$parent.answered_questions = checkFilled.length;

                        } else if (questionType !== undefined && questionType == 'setMulti_Drop_down') {
                            p_q_no = questions[3];
                            index_no = p_no + "_" + p_q_no;

                            if (checkFilled.indexOf(index_no) == -1) {
                                checkFilled.push(index_no);
                            }

                            scope.$parent.answered_questions = checkFilled.length;
                        } else {
                            p_q_no = questions[3];
                            p_sub_q_no = questions[4];

                            if (p_sub_q_no !== undefined)
                                index_no = p_no + "_" + p_q_no + "_" + p_sub_q_no;
                            else
                                index_no = p_no + "_" + p_q_no;

                            if (checkFilled.indexOf(index_no) == -1) {
                                checkFilled.push(index_no);
                            }

                            scope.getControlType(scope.$parent.currentSection);
                            scope.$parent.answered_questions ++;
                        }
                    }
                    if (scope.$parent.currentSectionType == "singleque") {
                       
                        scope.$parent.answered_questions = checkFilled.length;
                    }                    


                    if (questionType == 'input' && (selected == undefined || selected.trim() == '')) {
                        return false;
                    }

                    scope.meta[question_id]['showResult'] = true;

                    if (scope.meta[question_id].attempts != undefined) {
                        scope.meta[question_id].attempts++;
                    } else {
                        scope.meta[question_id].attempts = 1;
                    }

                    if (questionType == 'input')
                        scope.meta[question_id]['input_text'] = selected;

                    if ((questionType == 'input' && scope.compareAnswers(selected,values) || (selected == 'TRUE' && questionType != 'input')||( scope.compareAnswers(selected,values)))) {
                        scope.meta[question_id]['isTrue'] = "correct.png";
                        scope.meta[question_id]['ansClass'] = "txt-green";
                        scope.meta[question_id]['score'] = 1;
                    } else {
                        scope.meta[question_id]['isTrue'] = "wrong.png";
                        scope.meta[question_id]['ansClass'] = "txt-red";
                        scope.meta[question_id]['score'] = 0;
                    }

                    if (values != undefined) {
                        scope.meta[question_id]['selected'] = values;
                    }

                    aggregateScore();

                    if (scope.meta[question_id].attempts >= max_attempt) {
                        scope.meta[question_id].disabled = true;
                    }

                };

                scope.play_audio = function(src) {
                    angular.element('#load_audio').attr("src", scope.getAssetsPath(src));
                    audio = angular.element('#load_audio');
                    audio[0].play();
                };

                scope.get_drop_down_text_array = function(txt) {
	                var breakRegex = /<br\s*[\/]?>/gi;
                    if (txt === undefined || txt == false)
                        return {};

                    var data = txt.split(/\{\d\}/g);
                    var rv = {};
                    for (var i = 0; i < data.length; ++i)
                        rv[i] = data[i].replace(breakRegex, '');

                    return rv;
                };

	            scope.get_drop_down_text_array_count = function(questData) {
		            console.log(questData);
		            console.log(Object.keys(questData).length);
		            return Object.keys(questData).length;
	            };

                scope.chk_is_array = function(arr) {
                    return Array.isArray(arr);
                };

                scope.set_lastest_number = function(number) {
                    scope.$parent.lastest_number = number;
                    return number;
                };

                scope.get_current_number = function(pagenumber)  {

                    if (scope.$parent.lastest_number == 0)
                        scope.$parent.lastest_number = 1;

                    return scope.$parent.lastest_number + pagenumber - 1;                    
                };

                scope.get_class = function(arr) {
                    console.log(arr);
                };

                scope.get_correct_answer = function(answer) {
                    return answer['@CORRECT'] != undefined ? answer['@CORRECT'] : answer['@correct'];
                };

                scope.selected_words = [];

                scope.check_already_selected_dragdrop = function(sel, pageno) {
                    if (scope.selected_words['page_' + pageno] === undefined)
                        return false;

                    if (scope.selected_words['page_' + pageno].indexOf(sel) == -1)
                        return false;
                    else
                        return true;
                };

                scope.dropped = function(dest_text, pageno) {

                    if (checkFilled.indexOf(pageno) == -1) {
                        checkFilled.push(pageno);
                    }


                    //this is application logic, for the demo we just want to color the grid squares
                    //the directive provides a native dom object, wrap with jqlite
                    dest = angular.element(dropEl);
                    src = angular.element(dragEl);

                    src_question = src.data("question-id");
                    dest_question = dest.data("question-id");

                    src_text = src.text();
                    //dest_text = dest.data("correct-text");

                    if (dest.text())
                        return false;

                    if (pageno !== undefined)
                    {
                        if (scope.selected_words[pageno] === undefined)
                            scope.selected_words[pageno] = [];

                        scope.selected_words[pageno].push(src.text());
                    }

                    if (src_text == dest_text)
                    {
                        dest.text(src.text());

                        scope.$apply(function() {
                            scope.validate('TRUE', dest_question, src.data("maxattempt"), src.text());
                        });

                        //src.hide();
                    }
                    else
                    {
                        dest.text(src.text());

                        scope.$apply(function() {
                            scope.validate('FALSE', dest_question, src.data("maxattempt"), src.text());
                        });

                        //src.hide();
                    }
                }
            }
        }
    }]);