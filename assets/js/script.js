/**
 * Creates an array of pairs to be shown on the cards.
 */
const cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];
/**
 * Tracking of players score or number of pairs, 
 * total number of moves, 
 */
let score = 0; 
let moves = 0;   


/** 
 * The below function takes the cards array, shuffles its contents 
 * and returns the shuffled array in a random order.
 */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {                  //A for loop that runs through for each element in the array//
        const x = Math.floor(Math.random() * (i + 1));          //Create x and assign it a random value to index between 0 and the current index//
        [array[i], array[x]] = [array[x], array[i]];            //Swap the elements at index i and x in the array//
    }
    return array;                                               //returns the shuffled array// 
}

const shuffled_cards = shuffleCards(cards);     //Shuffle the cards array via the shuffleCards function// 