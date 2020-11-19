const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default class Deck {
    constructor(cards = freshSet()) {
        this.cards = cards
    }

    get noOfCards() {
        return this.cards.length;
    }

    get midPoint() {
        return Math.ceil(this.noOfCards / 2);
    }

    shuffle() {
        for (let i = this.noOfCards - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const tempCard = this.cards[i];
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = tempCard;
        }
        return this.cards;
    }
}

export class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit == "♠" || this.suit == "♣" ? "black" : "red";
    }

    
}

const freshSet = () => {
    return SUITS.flatMap(suit => VALUES.map(value => new Card(suit, value)));
}