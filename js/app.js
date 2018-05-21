//@description deck holds the deck of cards
const deck = document.getElementById('deck');

//@description the cards are stored in the cards array
let card = document.getElementsByClassName('card');
let cards = [...card];

//@description variables to store the number of cards opened
let flippedCards = [];
let noOfFlippedCards = 0;
let totalFlippedCards = 0;

//@description variables for counting moves and stars
let count = 0;
let moves = document.getElementById('moves');
let star = document.querySelectorAll('.fa-star');
let stars = [...star];
let noOfStars = 3;


//@description variables for the timer
let seconds = 1,
    minutes = 0,
    time = 0;
let clicks = 0;

//@description variables for the modal
let modal = document.getElementById('modal');
let modalBody = document.getElementsByClassName('modal-body')[0];
let playAgain = document.getElementById('play-again-button');
let closeButton = document.getElementById('close');

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
        cards[i].classList.remove("open", "show", "match", "freeze");
    }

    //reset timer
    clicks = 0;
    clearInterval(time);
    document.getElementById('timer').innerHTML = `minutes 0 seconds 0`;

    //reset moves and stars
    count = 0;
    moves.innerHTML = count;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#ffdd02";
    }

    //reset variables containing the cards flipped
    noOfCardsFlipped = 0;
    totalFlippedCards = 0;
}


//@description function playGame starts flipping the cards
function playGame() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", showCard);
        cards[i].addEventListener("click", flipCard);
    }
}


//@description shows the card
function showCard() {
    this.classList.add("open", "show", "freeze");
}


function flipCard() {
    flippedCards.push(this);
    noOfFlippedCards++;
    if (noOfFlippedCards === 2) {
        countMoves();
        if (flippedCards[0].type === flippedCards[1].type) {
            cardMatched();
        } else {
            setTimeout(cardUnmatched, 700);
        }
    }
}


function cardMatched() {
    flippedCards[0].classList.add("match", "freeze");
    flippedCards[1].classList.add("match", "freeze");
    flippedCards = [];
    noOfFlippedCards = 0;

    totalFlippedCards += 2;
    if (totalFlippedCards === cards.length) {
        clearInterval(time);
        openModal();
    }
}


function cardUnmatched() {
    flippedCards[0].classList.remove("open", "show", "match", "freeze");
    flippedCards[1].classList.remove("open", "show", "match", "freeze");
    flippedCards = [];
    noOfFlippedCards = 0;
}


function countMoves() {
    count++;
    moves.innerHTML = count;

    if (count >= 0 && count <= 16) {
        for (let i = 0; i < stars.length; i++) {
            stars[i].style.color = "#ffdd02";
        }
        noOfStars = 3;
    } else if (count > 16 && count <= 24) {
        stars[2].style.color = "#4a4747";
        noOfStars = 2;
    } else if (count > 24 && count <= 32) {
        stars[2].style.color = "#4a4747";
        stars[1].style.color = "#4a4747";
        noOfStars = 1;
    } else {
        for (let i = 0; i < stars.length; i++) {
            stars[i].style.color = "#4a4747";
        }
        noOfStars = 0;
    }
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
    }, 1000);
}


//@description to open modal
function openModal() {
    let totalTimeTaken = document.getElementsByClassName('timer')[0].innerHTML;
    let starsLeft = document.querySelector('.stars').innerHTML;
    let movesTaken = document.getElementById('moves').innerHTML;

    modalBody.innerHTML = `<p>You finished in ${movesTaken} moves.
    Time taken: ${totalTimeTaken}
    Star Rating: ${noOfStars} ${starsLeft}</p>`;

    modal.style.display = "block";
}

/*


//@description to close modal
document.getElementById('close').addEventListener('click', function() {
    modal.classList.remove("show");
    newGame();
});

//@description to play again
document.getElementById('play-again-button').addEventListener('click', function() {
    modal.classList.remove("show");
    newGame();
});*/




























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