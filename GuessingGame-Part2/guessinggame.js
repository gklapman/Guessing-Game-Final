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
    if (this.playersGuess < this.winningNumber) {
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
        return "You Win!"
    } else if (this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess);
    }
    if (this.pastGuesses.length === 5) {
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
