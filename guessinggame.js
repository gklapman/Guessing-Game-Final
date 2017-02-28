function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $('#main-header').text(output);
}


$(document).ready(function() {


    var game = new Game();

    $('#submit').click(function(e) {
        makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if (event.which == 13) {
            makeAGuess(game);
        }
    })


    // function submitAGuess() {
    //     var guess = $('#player-input').val();
    //     $('#player-input').val("");
    //     var output = game.playersGuessSubmission(parseInt(guess, 10));
    //     console.log(output);
    // };


    // $('#submit').click(function(event) {
    //     submitAGuess(game);
    // })
    // $('#player-input').keypress(function(event) {
    //     if (event.which === 13) {
    //         submitAGuess(game);
    //     }
    // })

    $('#reset').click(function(e) {
        game = new Game();
        $('#main-header').text("Play the Guessing Game!");
        $('#instructions').text('Guess a number between 1-100!');
        $('.guess').text('#'); // Is this replacing the input box to '#'?
        $('#hint', '#submit').prop('disabled', false);
    })

    $('#hint').click(function(e) {
        var hint = game.provideHint();
        $('#main-header').text("The winning number is one of the following: " + hint);
    })


})





function generateWinningNumber() {
    var randomNum = Math.floor(Math.random() * 100);
    return randomNum + 1;
}

function shuffle(arr) {
    var m = arr.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);

        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}


function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    if (this.playersGuess > this.winningNumber) {
        return true;
    } else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(num) {
    if (1 <= num && num <= 100) {
        this.playersGuess = num;
    } else {
        throw "That is an invalid guess.";
    }
    return this.checkGuess();
};

Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        $('#hint', '#submit').prop('disabled', true); //is disabled a built in feature?
        $('#instructions').text("Press the Reset button to play again");
        $("#main-header").text('You Win!');
        return "You Win!"
    } else if (this.pastGuesses.includes(this.playersGuess)) {
        $('#instructions').text("Guess a different number");
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
        if (this.isLower()) {
            $('#instructions').text("Guess Lower");
            console.log(this.winningNumber);
        } else {
            $('#instructions').text("Guess Higher");
            console.log(this.winningNumber);
        }
    }
    if (this.pastGuesses.length === 5) {
        $('#hint', '#submit').prop('disabled', true);
        $('#instructions').text("Press the Reset button to play again");
        $("#main-header").text('You Win!');
        return "You Lose.";
    } else if (this.difference() < 10) {
        return "You\'re burning up!";
    } else if (this.difference() < 25) {
        return "You\'re lukewarm.";
    } else if (this.difference() < 50) {
        return "You\'re a bit chilly.";
    } else {
        return "You\'re ice cold!";
    }
}

function newGame() {
    return new Game();
}

Game.prototype.provideHint = function() {
    var hintArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    shuffle(hintArr);
    return hintArr;
}
