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

let guess = 0;
let maxguess = 5;

startBtn.addEventListener('click',function(){
    APIcall();
})

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
    randomword = word;
    for(let i = 0; i < randomword.length; i++){
        displayedWord[i] = "_";
    }
    updateGameState();
}

function updateGameState(){
    secretWord.textContent = displayedWord.join(" ");
    hangman.textContent = `Guesses Left ${guess} / ${maxguess}`

}



