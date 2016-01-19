/**
 * Activity list service
 * In future it will read from manifest file
 */
app.factory('ActivityService', function(){
	var selectedActivity = undefined;
	var activityList = [
		{
			filename: "M01-A12",
			title: "Match The Mix-Up",
			type : "DragAndDrop",
			meta : "Drag and Drop",
			feedback: true
		},
		{
			filename: "M02-A08",
			title: "Remember The Davidson\'s?",
			type : "DragAndDrop",
			meta : "Drag and Drop"
		},
		{
			filename: "M04-A06",
			title: "Are You Feeling Negative?",
			type : "DragAndDrop",
			meta : "Drag and Drop"
		},
		{
			filename: "M07-A23",
			title: "Who’s Who In Early Canadian Exploration",
			type : "DragAndDrop",
			meta : "Drag and Drop"
		},
		{
			filename: "M11-A24",
			title: "From Astral to Zodiac (Part 1)",
			type : "FillInTheBlank",
			meta : "Fill in the blank"
		},
		{
			filename: "M11-A31",
			title: "Do You Know What ‘Did’ Does?",
			type : "FillInTheBlank",
			meta : "Fill in the blank",
			singlequestion_multianswer:true,
			feedback:true
		},
		{
			filename: "M11-A19",
			title: "Regularly Verbal Contextually",
			type : "FillInTheBlank",
			meta : "Fill in the blank",
			singlequestion_multianswer:true
		},
		{
			filename: "M14-A24",
			title: "Seniors Are Worth A Fortune",
			type : "FillInTheBlank",
			meta : "Fill in the blank",
			singlequestion_multianswer:true
		},
		{
			filename: "M02-A01",
			title: "More Than One",
			type : "FillInTheBlank",
			meta : "Fill in the blank",
			singlequestion_multianswer:true
		},
		{
			filename: "M15-A16",
			title: "The Right Tool For The Job",
			type : "FillInTheBlank",
			meta : "Fill in the blank",
			singlequestion_multianswer:true
		},
		//{
		//	filename: "M11-A23",
		//	title: "No Fewer Guests Than Invitations!",
		//	type : "FillInTheBlank",
		//	meta : "Fill in the blank"
		//},
		{
			filename: "M01-A01",
			title: "What\'s Your Address?",
			type : "MultipleChoice",
			meta : "Multiple Choice"
		},
		{
			filename: "M04-A01",
			title: "What Time Is It?",
			type : "MultipleChoice",
			meta : "Multiple Choice"
		},
		{
			filename: "M04-A02",
			title: "Quelle heure est-il ?",
			type : "MultipleChoice",
			meta : "Multiple Choice"
		},
		{
			filename: "M09-A09",
			title: "Encore aux verbes pronominaux...",
			type : "MultipleChoice",
			meta : "Multiple Choice"
		},
		{
			filename: "M11-A26",
			title: "The World's Easiest Quiz",
			type : "MultipleChoice",
			meta : "Multiple Choice"
		},
		{
			filename: "M13-A15",
			title: "Who Governs Canada?",
			type : "MultipleChoice",
			meta : "Multiple Choice",
			feedback:true
		}
	];

	return {
		getActivityList : function() {
			return activityList;
		},
		setSelectedActivity : function(activityId) {
			selectedActivity =  activityId;
		},
		getSelectedActivity : function() {
			return selectedActivity;
		}
	}
});
