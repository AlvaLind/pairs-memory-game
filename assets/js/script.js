//cards in the game
let cards = ["lightning.png", "lightning.png", "cat.png", "cat.png", "bat.png", "bat.png", "paw.png", "paw.png", "cake.png", "cake.png", "plane.png", "plane.png", "skiing.png", "skiing.png", "heart.png", "heart.png"];

let pairs = 0;
let moves = 0;

//pause time between moves in game play
let timeoutValue = 500;

/**
 * shuffles the cards and returns the shuffled array in a random order.
 */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}

let shuffled_cards = shuffleCards(cards);

/**
 * Check if the user has found all the pairs 
 */
function checkIfGameComplete() {
    let totalPairs = shuffled_cards.length / 2;
    if (pairs === totalPairs) {

        //Onces all pairs found pause 0.5seconds and then show alert and display Play Again Button
        setTimeout(function () {
            alert('Congratulations! You found all the pairs!');
            document.getElementById('playAgainButton').style.display = 'block';
        }, 500);
    }
}

/** 
 * Increment pairs in code and display on screen and check if the game has been completed
*/
function updatePairs() {
    pairs++;
    document.getElementById('pairs').innerText = pairs;
    checkIfGameComplete();
}

/**
 *Increment moves in code and display on screen
 */
function updateMoves() {
    moves++;
    document.getElementById('moves').innerText = moves;
}

/**
 * loop to analyse the selected cards to check if they're a match, 
 * and to ensure a card is completely revealed,before another can be selected. 
 */
function handleCardClick(event) {
    let clickedCard = event.currentTarget;
    //variable isAnimating set to false when card rotation/animation is not happening. so start as false
    let isAnimating = false;

    //
    if (!isAnimating && !clickedCard.classList.contains('match') && !clickedCard.classList.contains('revealCard')) {
        isAnimating = true; // Set to true as it is in animation. the card is rotating. 

        clickedCard.classList.
            add('revealCard');

        setTimeout(function () {
            const revealedCards = document.querySelectorAll('.revealCard');

            if (revealedCards.length === 2) {
                const firstCardContent = revealedCards[0].querySelector('img').src;
                const secondCardContent = revealedCards[1].querySelector('img').src;

                if (firstCardContent === secondCardContent) {
                    revealedCards.forEach(function (card) {
                        card.classList.add('match');
                        card.classList.remove('revealCard');
                    });

                    updatePairs();
                    updateMoves();
                } else {
                    revealedCards.forEach(function (card) {
                        card.classList.remove('revealCard');
                    });

                    updateMoves();
                }
            }

            isAnimating = false; // Set isAnimating back to false after animation
        }, timeoutValue);
    }
}

/**
 * loop to create a div (card) for each of the array values
 */
function gamePlay() {
    for (let i = 0; i < shuffled_cards.length; i++) {
        let card = document.createElement('div');
        card.className = 'cardBox';

        let cardImage = document.createElement('img');
        cardImage.src = 'assets/images/' + shuffled_cards[i];
        cardImage.alt = 'Card image' + (i + 1);

        card.appendChild(cardImage);

        //card.addEventListener('click', handleCardClick);
        card.addEventListener('click', function (event) {
            event.preventDefault();
            const revealedCards = document.querySelectorAll('.revealCard');
            if (revealedCards.length === 2 || revealedCards.length > 2) {
                return;
            } else {
                handleCardClick(event);
            }
        });

        document.querySelector('.gameBoard').appendChild(card);
    }
}

/**
 * reset pairs & moves tallies and play again button is disabled again, 
 * remove the current cards in gameBoard, reshuffle the cards array, and run the game again. 
 */
function restartGame() {
    pairs = 0;
    moves = 0;
    document.getElementById('pairs').innerText = pairs;
    document.getElementById('moves').innerText = moves;
    document.getElementById('playAgainButton').style.display = 'none';
    shuffled_cards = shuffleCards(cards);
    document.querySelector('.gameBoard').innerHTML = '';
    gamePlay();

}

//Event Listener for the play again button to reset the game board.  
document.getElementById('playAgainButton').addEventListener('click', function () {
    restartGame();
});

gamePlay();