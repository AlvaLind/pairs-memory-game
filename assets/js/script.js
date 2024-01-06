/**
 * Creates an array of pairs to be shown on the cards.
 */
const cards = ["lightning.png", "lightning.png", "cat.png", "cat.png", "bat.png", "bat.png", "paw.png", "paw.png", "cake.png", "cake.png", "plane.png", "plane.png", "skiing.png", "skiing.png", "heart.png", "heart.png"];
/**
 * Tracking of players score or number of pairs, 
 * total number of moves, 
 */
let score = 0;
let moves = 0;
//To be used as a pause time between moves
let timeoutValue = 600;

/** 
 * The below function takes the cards array, shuffles its contents 
 * and returns the shuffled array in a random order.
 */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {            //A for loop that runs through for each element in the array
        const x = Math.floor(Math.random() * (i + 1));      //Create x and assign it a random value to index between 0 and the current index
        [array[i], array[x]] = [array[x], array[i]];        //Swap the elements at index i and x in the array
    }
    return array;                                //returns the shuffled array
}

const shuffled_cards = shuffleCards(cards);     //Shuffle the cards array via the shuffleCards function


/**
 * Function to increment user score everytime they get a pair
 */
function updateScore() {
    score++;
    document.getElementById('score').innerText = score;
}

/**
 * Function to increment users total number of moves each time they select two cards
 */
function updateMoves() {
    moves++;
    document.getElementById('moves').innerText = moves;
}

/**
 * Function to reset the users score and moves to 0 if they restart the game
 */
function resetTallies() {
    score = 0;
    moves = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('moves').innerText = moves;
}

/**
 * Function that resets the game and the users score 
 * and moves tally - to be run when the restart button is clicked
 */
function restartGame() {
    resetTallies();
    window.location.reload();
}


/**
 * For loop to create a div (card) for each of the array values
 */ 
for (var i = 0; i < shuffled_cards.length; i++) {
    let card = document.createElement('div');
    card.className = 'card_box';

    let cardImage = document.createElement('img');
    cardImage.src = 'assets/images/' + shuffled_cards[i];
    card.appendChild(cardImage);

    card.onclick = function () {            //When a card is clicked run the below
        if (!this.classList.contains('Match')) { // Check if the card is not already matched
            this.classList.add('revealCard');
            setTimeout(function () {
                const revealedCards = document.querySelectorAll('.revealCard');

                if (revealedCards.length > 1) {
                    const firstCardContent = revealedCards[0].innerHTML;
                    const secondCardContent = revealedCards[1].innerHTML;

                    // If the cards two cards revealed or selected are a match 
                    if (firstCardContent === secondCardContent) {
                        revealedCards[0].classList.add('Match');
                        revealedCards[1].classList.add('Match');

                        revealedCards[0].classList.remove('revealCard');
                        revealedCards[1].classList.remove('revealCard');

                        updateScore();
                        updateMoves();

                        if (document.querySelectorAll('.Match').length === cards.length) {
                            alert(`CONGRATULATIONS YOU WON! You got all pairs in ${moves} moves!:D`);
                        }
                    } else {
                        // If cards do not match, remove 'revealCard' class
                        revealedCards[0].classList.remove('revealCard');
                        revealedCards[1].classList.remove('revealCard');
                        updateMoves();
                    }
                }
            }, timeoutValue); // Adjust the timeout value as needed
        }
    };

    document.querySelector('.game-board').appendChild(card);
}