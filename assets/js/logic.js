var score = 0;
var startScreen = document.querySelector('#start-screen');
var startButton = document.querySelector('#start');

var currentQuestionIndex = 0; // Keeping track of the question number

var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesOutput = document.querySelector("#choices");

var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');

// The time limit for the quiz is 60 seconds
var timeRemaining = 60;

// This variable preserves the final score when finished on time
// The timer in the countdown() continues until down to zero in
// the background, so we cannot capture the score directly
// from the timer, hence this variable.
// When we record the final scoire, we test for this variable
// being zero or not, zero meaning we ran out of time.
// If not zero, the quiz finished before the time was up and
// we capture its value as the final score
var finishedOnTimeScore = 0;

var timerEl = document.getElementById('time');
    
timerEl.textContent = `${timeRemaining}`;

// Add an event listener to the quiz start button
startButton.addEventListener('click', launch);

// This function actually checks whether the answer is correct 

function checkAnswer(event) {
    var el = event.target;

    if (el.dataset.correct == 'true') {
        var soundCorrect = new Audio('./assets/sfx/correct.wav');
        soundCorrect.play();
        // alert('you got it right');
        // Show feedback
        feedback.classList.remove('hide');
        feedback.innerText = 'Correct answer';
    } else {
        // wrong answer, penalize the timer by 10 seconds
        
        timeRemaining = timerEl.textContent;
        timeRemaining -= 10;
        timerEl.textContent = `${timeRemaining}`;

        var soundIncorrect = new Audio('./assets/sfx/incorrect.wav');
        soundIncorrect.play();
        // Show feedback
        feedback.classList.remove('hide');
        feedback.innerText = 'Incorrect answer';
    }

    // Keep the feedback on display for 1 second then hide it
    setTimeout(function(){
        feedback.classList.add('hide');
    }, 1000);

    // Move on to the next question
    askQuestion();
}


function gameOver() {
    console.log('Game Over!');
    score = timeRemaining;
    console.log('Your score is: '+score);
    choicesOutput.innerHTML = '';

    if (finishedOnTimeScore > 0) {
        // finished on time, capture the score
        finalScore.innerText = finishedOnTimeScore;
    } else {
        // Ran out of time, score is 0
        finalScore.innerText = 0;
    }
    questionWrap.classList.add('hide');
    endScreen.classList.remove('hide');
        
}

// Function to count down the timer
function countdown() {

    //Using the `setInterval()` method to call a function every 1000 milliseconds

    var timeInterval = setInterval(function () {

        timeRemaining--;

        if (timeRemaining > 0) {
          // There is still time left
          // timerEl.textContent = timeRemaining;
          timerEl.textContent = `${timeRemaining}`;
        } else {
          // Game Over
          // Time counter could be negative, zero it out
          timeRemaining = 0;
          // timerEl.textContent = timeRemaining;
          timerEl.textContent = `${timeRemaining}`;
          clearInterval(timeInterval);

          // We ran out of time
          gameOver();
        };
    
      }, 1000);
}

function askQuestion() {
    
    // Before asking another question we need to clear out
    // the questions title and choices for another round 
    questionTitle.innerHTML = '';
    choicesOutput.innerHTML = '';

    if (currentQuestionIndex < questions_array.length) {
        var currentQuestion = questions_array[currentQuestionIndex];

        questionTitle.innerText = currentQuestion.title;

        var choices = currentQuestion.choices;

        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i];
            var isCorrect = (currentQuestion.answer === choice);

            //Using custom attribute "data-correct" to track which choice 
            // is the correct or incorrect 
            choicesOutput.insertAdjacentHTML('beforeend',
            `<button data-correct=${isCorrect}>${choice}</button>`
            );
        }
        currentQuestionIndex++;


        questionWrap.classList.remove('hide');


        // Add an event listener to the questions wrapper to take advantage
        // of event bubbling. The wrapper remains, the multiple-choice
        // questions are created and removed which would remove the 
        // event listeners on the questions

        questionWrap.addEventListener('click', checkAnswer);
    } else {
        if (timeRemaining > 0) {
            // finished on time
            finishedOnTimeScore = timeRemaining;
        } else {
            // Ran out of time, the score is always 0
            score = 0;
        }

        gameOver();
    }
}

function launch() {

    countdown();

    // hide the start screen after pressing the start button

    // Slavish way would be to manually set all the classes
    // startScreen.setAttribute("class", "start, hide");

    // But we can use a classList.add/remove method instead
    startScreen.classList.add('hide');
    console.log("launched");


    askQuestion();

}




