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
//To be used as a pause time between moves//
let timeoutValue = 600;

/** 
 * The below function takes the cards array, shuffles its contents 
 * and returns the shuffled array in a random order.
 */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {                  //A for loop that runs through for each element in the array//
        let x = Math.floor(Math.random() * (i + 1));            //Create x and assign it a random value to index between 0 and the current index//
        [array[i], array[x]] = [array[x], array[i]];            //Swap the elements at index i and x in the array//
    }
    return array;                                               //returns the shuffled array// 
}

//Shuffle the cards array via the shuffleCards function//
let shuffled_cards = shuffleCards(cards);

//Function that resets the game when the restart button is clicked//
function restartGame() {
    window.location.reload();
}

//For loop to create a div (card) for each of the array values// 
for (var i = 0; i < shuffled_cards.length; i++) {
    let card = document.createElement('div');
    card.className = 'card_box';

    let cardImage = document.createElement('img');
    cardImage.src = 'images/' + shuffled_cards[i];
    card.appendChild(cardImage);


    card.onclick = function () {            //When a card is clicked run the below//
        if (!this.classList.contains('Match')) { // Check if the card is not already matched//
            this.classList.add('revealCard');
            setTimeout(function () {
                const revealedCards = document.querySelectorAll('.revealCard');

                //identify the users selected two cards from the array//
                if (revealedCards.length > 1) {
                    const firstCardContent = revealedCards[0].innerHTML;
                    const secondCardContent = revealedCards[1].innerHTML;

                    // If the cards two cards revealed or selected are a match leave them revealed and remove from cards array // 
                    if (firstCardContent === secondCardContent) {
                        revealedCards[0].classList.add('Match');
                        revealedCards[1].classList.add('Match');

                        revealedCards[0].classList.remove('revealCard');
                        revealedCards[1].classList.remove('revealCard');

                        //If all the cards are matched display the winner alert//
                        if (document.querySelectorAll('.Match').length === cards.length) {
                            alert('Winner!');
                        }
                    } else {
                        // If cards do not match, turn the cards back around//
                        revealedCards[0].classList.remove('revealCard');
                        revealedCards[1].classList.remove('revealCard');
                    }
                }
            }, timeoutValue); // Adjust the timeout value as needed
        }
    };

    document.querySelector('.game-board').appendChild(card);
}