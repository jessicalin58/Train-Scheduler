    $(document).ready(function(){
      $('.slider').slider();
    });


    var config = {
    apiKey: "AIzaSyAKKt3qHeRtDBgZxSJyj3Ppalp_J63lbxY",
    authDomain: "train-tracker-27a0c.firebaseapp.com",
    databaseURL: "https://train-tracker-27a0c.firebaseio.com",
    projectId: "train-tracker-27a0c",
    storageBucket: "train-tracker-27a0c.appspot.com",
    messagingSenderId: "511992931990"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){

  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#train-destination-input").val().trim();
  	var trainTime = $("#train-time-input").val().trim();
  	var trainFrequency = $("#train-frequency-input").val().trim();
  

  	//Moment JS

  	var convertedTime = moment(trainTime);

  	console.log(moment(convertedTime).format('LTS'))
  	console.log(moment(trainTime).startOf('day').toNow());

  	var newTrain = {

  		name: trainName,
  		destination: trainDestination,
  		time: trainTime,
  		frequency: trainFrequency
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.time);
  	console.log(newTrain.frequency);

  	alert("New Train Info added");

  	$("#train-name-input").val("");
  	$("#train-destination-input").val("");
  	$("#train-time-input").val("");
  	$("train-frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){


  	console.log(childSnapshot.val());

  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainTime = childSnapshot.val().time;
  	var trainFrequency = childSnapshot.val().frequency;

  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainTime);
  	console.log(trainFrequency);

  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td>" + "<td>" + trainDestination + "</td>" + "<td>" + trainFrequency + "</td>"+"</tr>");
  });