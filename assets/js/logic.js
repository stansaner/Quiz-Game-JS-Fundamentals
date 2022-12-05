// Setting up a timer before launching the quiz
// The time limit is 60 seconds

var time = 60;

// Add an event listener to the quiz start button

var startScreen = document.querySelector('#start-screen');
var startButton = document.querySelector('#start');

startButton.addEventListener('click', launch);


function launch() {
// hide the start screen after pressing the start button
    startScreen.setAttribute("class", "start, hide");
    console.log("launched");
}


// Adding an event listener to the "wrapper" class to take
// advantage of event bubbling.
// The questions elements will get created and destroyed and
// their event listeners would be removed with them,
// but the wrapper will remain

