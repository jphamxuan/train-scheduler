$(document).ready(function(){
	//firebase
    var config = {
        apiKey: "AIzaSyADRooAuLLCJXnYVm0R37A_U73R7ouuuuc",
        authDomain: "train-scheduler-77585.firebaseapp.com",
        databaseURL: "https://train-scheduler-77585.firebaseio.com",
        projectId: "train-scheduler-77585",
        storageBucket: "train-scheduler-77585.appspot.com",
        messagingSenderId: "824842312888"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
    


	//submit button
	$("#addTrainBtn").on("click", function(){

    //grabs user input and pushes into firebase
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();


		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		};
        database.ref().push(newTrain);
        
    //logs to conosole
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);

	//clears forms without refreshing page
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;
		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
	

		// Appends values from firebase to table
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
    
    
});