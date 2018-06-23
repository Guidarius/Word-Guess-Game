
var cartoonsAndHeresies = ["SPONGEBOB SQUAREPANTS", "JOHNNY BRAVO", "TOMMY PICKLES", "POWERPUFF GIRLS", "HOMER SIMPSON", "DARIA MORGENDORFFER", "ARNOLD", "DEXTER", "APPOLLINARISM", "ARIANISM", "MONOPHYSITISM", "NESTORIANISM", "MANICHAEISM"];
var answerLetters = [];
var hiddenSpaces = [];
var hiddenAnswer;
var guesses = 5;
var alreadyPicked = "";


//Updates the answer, filling in the spaces.
function refreshText() {
    $("#answerBox").text(hiddenAnswer);

}

//Something ripped from github that helps to replace those _ things.
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


//Starts the game, randomizes the string to guess.
function initiateGame(answerList) {
    var randomIndex = Math.floor(Math.random() * answerList.length);
    var guessThis = answerList[randomIndex];
    var hiddenLetters = [];

    for (var i = 0; i < guessThis.length; i++) {
        if (guessThis[i] === " ") {
            answerLetters.push(" ");
            hiddenLetters.push(" ")
            console.log(i);
        }

        else {
            answerLetters.push(guessThis[i]);
            hiddenLetters.push("_");
        }

    }

    hiddenAnswer = hiddenLetters.join("");
    console.log(hiddenAnswer);
    refreshText();
}

function gameOver() {
    $("#mainText").text("Game Over");
}

function checkAnswer(answer) {

    //Checks if the answer is correct or not and goes to the proper other function.
    if (answerLetters.includes(answer)) {
        correctAnswer(answer);
    }

    else {
        incorrectAnswer(answer);
    }

    //The part that updates the already picked stuff.
    if (alreadyPicked.includes(answer)) {

    }

    else {
        alreadyPicked += answer;
        $("#alreadyPickedBox").text(alreadyPicked);
    }


}

//Stuff that happens when its a correct answer.
function correctAnswer(answer) {
    for (var i = 0; i < answerLetters.length; i++) {
        if (answerLetters[i] == answer) {
            hiddenAnswer = replaceAt(hiddenAnswer, i, answerLetters[i]);
            refreshText();
            console.log(answerLetters);
        }
    }
}

//Stuff that happens when an incorrect answer happens. 
function incorrectAnswer(answer) {
    guesses -= 1;


    if (guesses == 0) {
        gameOver();
    }



}

//Stores the keys.
document.onkeyup = function (event) {
    var guess = event.key.toUpperCase();
    checkAnswer(guess);
    refreshText();

}

initiateGame(cartoonsAndHeresies);




