// Add an event listener to the quiz start button

var startScreen = document.querySelector('#start-screen');
var startButton = document.querySelector('#start');

startButton.addEventListener('click', launch);


function countdown() {

    // The time limit for the quiz is 60 seconds
    var timerEl = document.getElementById('time');
    var timeRemaining = 60;

    timerEl.textContent = `${timeRemaining}`;

    //Using the `setInterval()` method to call a function 'ask' every 1000 milliseconds

    var timeInterval = setInterval(function () {

        timeRemaining--;
        if (timeRemaining > 0) {
          // There is still time left
          timerEl.textContent = `${timeRemaining}`;
        } else {
          // Game Over
          timerEl.textContent = `${timeRemaining}`;
          clearInterval(timeInterval);
          // displayEndScreen();
        };
    
      }, 1000);

}


function launch() {
// hide the start screen after pressing the start button
    startScreen.setAttribute("class", "start, hide");
    console.log("launched");

    countdown();

}


// Adding an event listener to the "wrapper" class to take
// advantage of event bubbling.
// The questions elements will get created and destroyed and
// their event listeners would be removed with them,
// but the wrapper will remain

