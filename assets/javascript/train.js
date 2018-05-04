var config = {
    apiKey: "AIzaSyCtLw4aygkGmFsg7qEIttOKRKku5r6Ey6M",
    authDomain: "trainapp-60e68.firebaseapp.com",
    databaseURL: "https://trainapp-60e68.firebaseio.com",
    projectId: "trainapp-60e68",
    storageBucket: "trainapp-60e68.appspot.com",
    messagingSenderId: "780865836584"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event){
    event.preventDefault();

    var name = $("#trainName-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var time = $("#trainTime-input").val().trim();
    var freq = $("#freq-input").val().trim();

    var newTrain = {
        Name: name,
        Destination: dest,
        Time: time,
        Frequency: freq
    };

    database.ref().push(newTrain);

    //console.log(newTrain.Name);
    //console.log(newTrain.Destination);
    //console.log(newTrain.Time);
    //console.log(newTrain.Frequency);

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#trainTime-input").val("");
    $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().Name;
    var trainDest = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trainFreq = childSnapshot.val().Frequency;    

    //console.log("Train Name: ", trainName);
    //console.log("Train Dest: ", trainDest);
    //console.log("Train Time: ", trainTime);
    //console.log("Train Freq: ", trainFreq);

//Train Conversion
var freq = parseInt(freq);
var timeNow = moment();
//console.log("Current time in HH:MM: " + timeNow.format("HH:MM"));

var Converted = moment(trainTime, 'HH:mm').subtract(1, 'years');
var tTime = moment(Converted).format('HH:mm');

var timeConverstion = moment(tTime, 'HH:mm').subtract(1, 'years');

var timeDif = moment().diff(moment(timeConverstion), "minutes");
//console.log("diff in time: " + timeDif);

var tRemain = timeDif % trainFreq;
console.log(tRemain);

var minTillTrain = trainFreq - tRemain;
//console.log("min until train: " + minTillTrain);

var nextTrain = moment().add(minTillTrain, "minutes");
//console.log("arrival time: " + moment(nextTrain).format("hh:mm"));


//Add Data to Table
$("tbody").append(
                "<tr><td>" + trainName + "</td>" +
                "<td>" + trainDest + "</td>" +
                "<td>" + trainFreq + "</td>" + 
                "<td>" + moment(nextTrain).format("HH:mm") + "</td>" +
                "<td>" + minTillTrain + "</td></tr>"
);
});

