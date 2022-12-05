var score = 0;
var startScreen = document.querySelector('#start-screen');
var startButton = document.querySelector('#start');

var currentQuestionIndex = 0; // Keeping track of the question number

// Add an event listener to the quiz start button
startButton.addEventListener('click', launch);


function countdown() {

    // The time limit for the quiz is 60 seconds
    var timeRemaining = 60;

    var timerEl = document.getElementById('time');
    
    timerEl.textContent = `${timeRemaining}`;

    //Using the `setInterval()` method to call a function 'ask' every 1000 milliseconds

    var timeInterval = setInterval(function () {

        timeRemaining--;
        if (timeRemaining > 0) {
          // There is still time left
          timerEl.textContent = `${timeRemaining}`;
        } else {
          // Game Over
          timeRemaining = 0;
          timerEl.textContent = `${timeRemaining}`;
          clearInterval(timeInterval);
          // displayEndScreen();
        };
    
      }, 1000);

    return timeRemaining;

}


function launch() {

    // The time limit for the quiz is 60 seconds
    var timeRemaining = 60;

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

        if (el.dataset.correct) {
            //  alert('you got it right');
        } else {
            // wrong answer, penalize the timer by 10 seconds
            timeRemaining -= 10;
        }
    }

    // Add an event listener to the questions wrapper to take advantage
    // of event bubbling. The wrapper remains, the multiple-choice
    // questions are created and removed which would remove the 
    // event listeners on the questions

    questionWrap.addEventListener('click', checkAnswer);

    score = countdown();

    // Before asking another question we need to clear out
    // the questions wrapper for another round 

    // choicesOutput.innerHTML = '';

}




