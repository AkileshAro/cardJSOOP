import Deck from './deck.js';

const CARD_WEIGHTS = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

let playerDeck, computerDeck;

const playerCardElement = document.querySelector(".player-card");
const computerCardElement = document.querySelector(".computer-card");
const playerDeckElement = document.querySelector(".player-deck");
const computerDeckElement = document.querySelector(".computer-deck")
const deck = new Deck();
deck.shuffle();


playerCardElement.addEventListener('click', () => flipCards());

const startGame = () => {
    let deck = new Deck();
    deck.shuffle();
    playerDeck = new Deck(deck.cards.slice(0, deck.midPoint));
    computerDeck = new Deck(deck.cards.slice(deck.midPoint, deck.noOfCards));
}

const flipCards = () => {
    const playerCard = playerDeck.cards.pop();
    const computerCard = computerDeck.cards.pop();
    if (CARD_WEIGHTS[playerCard.value] > CARD_WEIGHTS[computerCard.value]) {
        playerDeck.cards.push(playerCard);
        playerDeck.cards.push(computerCard);
        console.log(playerDeck, computerDeck);
    } else {
        computerDeck.cards.push(playerCard);
        computerDeck.cards.push(computerCard);
        console.log(playerDeck, computerDeck);
    }

}

startGame();

console.log(deck);