//@description deck holds the deck of cards
const deck = document.getElementById('deck')

//@description the cards are stored in the cards array
let card = document.getElementsByClassName('card');
let cards = [...card];

//@description array to store the number of cards opened
let flippedCards = [];
let noOfFlippedCards = 0;

//@description variables for counting moves and stars
let count = 0;
let moves = document.getElementById('moves')
let star = document.querySelectorAll('.fa-star');
let stars = [...star];

//@description variables for the timer
let seconds = 1,
    minutes = 0,
    time = 0;
let clicks = 0;

//@description Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//@description function newGame restarts the game
function newGame() {
    cards = shuffle(cards);
    let length = cards.length;

    //@description adds the tiles/cards to the board
    for (let i = 0; i < length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(tile) {
            deck.appendChild(tile);
        });
        cards[i].setAttribute('id', `card${i}`);
        cards[i].classList.remove("open", "show", "match")
    }

    clicks = 0;
    clearInterval(time);
    document.getElementById('timer').innerHTML = `minutes 0 seconds 0`;
}


//@description function playGame starts flipping the cards
function playGame() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", showCard);
        cards[i].addEventListener("click", flipCard);
    }
}


//@description flips the card
function showCard() {
    this.classList.add("open", "show");
}


function flipCard() {
    flippedCards.push(this);
    noOfFlippedCards++;
    if (noOfFlippedCards === 2) {
        countMoves();
        if (flippedCards[0].type === flippedCards[1].type) {
            cardMatched();
        } else {
            cardUnmatched();
        }
    }
}


function cardMatched() {
    flippedCards[0].classList.add("match");
    flippedCards[1].classList.add("match");
    flippedCards = [];
    noOfFlippedCards = 0;
}

function cardUnmatched() {

}


function countMoves() {
    count++;
    moves.innerHTML = count;
}

/**
 * @description Timer function to keep track of time
 */
function timer() {
    time = setInterval(function() {
        document.getElementById('timer').innerHTML = `minutes ${minutes} seconds ${seconds}`;
        seconds++;
        if (seconds % 60 === 0) {
            minutes++;
            seconds = 0;
        }
    }, 1000)
}


/**
 * @description This block of code is used to start the timer the first time any card on the deck is flipped
 */
document.querySelector('#deck').addEventListener('click', function(evt) {
    if (evt.target.nodeName === 'LI') {
        clicks++;
        if (clicks === 1) {
            timer();
        }
    }
});


//@description called to create a new board whenever page reloads
window.addEventListener('load', function() {
    newGame();
    playGame();
});

//@description restart button
document.getElementById('restart').addEventListener('click', function() {
    newGame();
    playGame();
});