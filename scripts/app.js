//Someone things of a word and we keep it secret from the other play
// we will displau a series of underscores depending on the length of the word
//Each turn the player will guess 1 letter from the word
// if guess is correc we will display the letter in the blank word
// if incorrect we draw a piece of the hangman or tell the user they have x amount of guess left.
// add incorrect guess to a div.

//start btn
//replay btn
// secretword
// wrong guesses/
// hangman
// user guesses


//ID's
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangman = document.getElementById("hangman");
let userInput = document.getElementById("userInput");
//Variables
//random word is generated from a API
//wrond guess will be the user;s incorrect guess
// displaedword will be for their correct input
let randomword = "";
let wrongGuess = "";
let displayedWord = []; 
let guesses = 0;

let guess = "";
let maxguess = 5;

startBtn.addEventListener('click',function(){
    APIcall();
})

restartBtn.addEventListener('click', function(){
    resetGame();
})


function resetGame(){
    randomword = "";
    wrongGuess = "";
    displayedWord = [];
    guess = 0;
    wrongGuesses.textContent = "";
    userInput = "";
    secretWord.textContent = "[secrect word]";
    wrongGuess.textContent = "";
    hangman.textContent = `Guesses Left 0 / ${maxguess}`
    userInput.readOnly = true;
    userInput = "";

}

function APIcall(){
    fetch('https://random-word-api.herokuapp.com/word')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data[0]);
            startGame(data[0])
        })
}

function startGame(word){
    displayedWord = [];
    randomword = word;
    for(let i = 0; i < randomword.length; i++){
        displayedWord[i] = "_";
    }
    updateGameState();
    userInput.readOnly = false;
}

function updateGameState(){
    secretWord.textContent = displayedWord.join(" ");
    hangman.textContent = `Guesses Left ${guesses} / ${maxguess}`
}

userInput.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        let guess = userInput.value.toLowerCase();
        if(randomword.includes(guess)){
            for(let i = 0; i < randomword.length; i++){
                if(randomword[i] === guess){
                    displayedWord[i] = guess;
                }
            }
        }
        else{
            wrongGuess += guess;
            wrongGuesses.textContent = wrongGuess; 
            guesses++;
        }
    }


    updateGameState();
    userInput.value = "";
    gameEnd();
})

function gameEnd(){
    if(guesses === maxguess){
        alert(`YOU LOSE, the word was ${randomword}`);
        resetGame();
    }
    else if (displayedWord.join("") === randomword){
        alert("YOU WIN");
        resetGame();
    }
}
