//@description deck holds the deck of cards
const deck = document.getElementById('deck')

//@description the cards are stored in the cards array
let card = document.getElementsByClassName('card');
let cards = [...card];

//@description array to store the number of cards opened
let flippedCards = [];

//@description variables for counting moves
let moves = 0;

//@description variables for the timer
let seconds = 1,
    minutes = 0,
    time = 0;

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
    tilesFlipped = 0;

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
    timer();
    flippedCards.push(this);
    let lenght = flippedCards.length;
    if (lenght === 2) {
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
}

function cardUnmatched() {

}


function countMoves() {

}


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