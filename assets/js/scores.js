// Display High Scores of users

var highScores = JSON.parse(localStorage.getItem('high_scores'));

var scoresDisplay = document.querySelector('#highscores');


// If the array is empty, don't bother
if (highScores){
    for (i = 0; i < highScores.length; i++ ) {  
        scoresDisplay.insertAdjacentHTML('beforeend', `
        <li>${highScores[i].initials}: ${highScores[i].score}</li>
        `);
    }
}


// Clear High Scores from the localStorage
// when the "Clear High Scores" button is clicked

var wipe = document.querySelector('#clear');

wipe.addEventListener('click', function() {
    localStorage.clear();
    scoresDisplay.innerHTML = '';
})