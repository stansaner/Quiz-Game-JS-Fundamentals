var score = 0;
var startScreen = document.querySelector('#start-screen');
var startButton = document.querySelector('#start');

var currentQuestionIndex = 0; // Keeping track of the question number



// The time limit for the quiz is 60 seconds
var timeRemaining = 60;

// tracking whether to penalize in countdown for wrong answers;
var penalty = false;

var timerEl = document.getElementById('time');
    
timerEl.textContent = `${timeRemaining}`;

// Add an event listener to the quiz start button
startButton.addEventListener('click', launch);


// Function to count down the timer
function countdown() {

    if (penalty) {
        //penalize wrong answer by 10 seconds
        timeRemaining -= 10;
        penalty = false;
    }

    //Using the `setInterval()` method to call a function every 1000 milliseconds

    var timeInterval = setInterval(function () {

        timeRemaining--;

        if (timeRemaining > 0) {
          // There is still time left
          timerEl.textContent = `${timeRemaining}`;
          // timerEl.textContent = timeRemaining;
        } else {
          // Game Over
          // Time counter could be negative, zero it out
          timeRemaining = 0;
          timerEl.textContent = `${timeRemaining}`;
          // timerEl.textContent = timeRemaining;
          clearInterval(timeInterval);

          // We ran out of time
          gameOver();
        };
    
      }, 1000);
}

function gameOver() {
    console.log('Game Over!');
}

function launch() {

    countdown();

    // hide the start screen after pressing the start button

    // Slavish way would be to manually set all the classes
    // startScreen.setAttribute("class", "start, hide");

    // But we can use a classList.add/remove method instead
    startScreen.classList.add('hide');
    console.log("launched");

    var currentQuestion = questions_array[currentQuestionIndex];


    // Posting the first question

    var questionWrap = document.querySelector("#questions");
    var questionTitle = document.querySelector("#question-title");

    questionTitle.innerText = currentQuestion.title;

    var choicesOutput = document.querySelector("#choices");
    var choices = currentQuestion.choices;

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var isCorrect = (currentQuestion.answer === choice);

        //Using custom attribute data-correct to track which choice 
        // is the correct or incorrect 
        choicesOutput.insertAdjacentHTML('beforeend',
            `<button data-correct=${isCorrect}>${choice}</button>`
        );
    }

    questionWrap.classList.remove('hide');

    // This function actually checks whether the answer is correct 

    function checkAnswer(event) {
        var el = event.target;

        if (el.dataset.correct == 'true') {
            var soundCorrect = new Audio('./assets/sfx/correct.wav');
            soundCorrect.play();
            // Just in case we forgot to reset the penalty
            penalty = false;
            // alert('you got it right');
        } else {
            // wrong answer, penalize the timer by 10 seconds
            var soundIncorrect = new Audio('./assets/sfx/incorrect.wav');
            soundIncorrect.play();
            penalty = true;
            countdown();
        }
    }

    // Add an event listener to the questions wrapper to take advantage
    // of event bubbling. The wrapper remains, the multiple-choice
    // questions are created and removed which would remove the 
    // event listeners on the questions

    questionWrap.addEventListener('click', checkAnswer);

    
    // Before asking another question we need to clear out
    // the questions wrapper for another round 

    // choicesOutput.innerHTML = '';

}




