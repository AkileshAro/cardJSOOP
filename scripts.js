import Deck from './deck.js';
import { Card } from './deck.js';

const CARD_WEIGHTS = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14 }

let playerDeck, computerDeck, gameOver, gameStarted;

const playerCardSlot = document.querySelector(".player-card-slot");
const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCount = document.querySelector(".player-count");
const computerCount = document.querySelector(".computer-count");

document.querySelector(".game").style.display = "none";

const startGame = () => {
    gameStarted = true;
    gameOver = false;

    document.querySelector(".game").style.display = "flex";

    let deck = new Deck();
    deck.shuffle();

    playerDeck = new Deck(deck.cards.slice(0, deck.midPoint));
    computerDeck = new Deck(deck.cards.slice(deck.midPoint, deck.noOfCards));

    const playerCard = playerDeck.cards[25];
    const computerCard = computerDeck.cards[25];

    playerCardSlot.appendChild(playerCard.setHTML());
    computerCardSlot.appendChild(computerCard.setHTML());

    updateCount();
}


const flipCards = (e) => {
    if (!gameOver) {
        const playerCard = playerDeck.cards.pop();
        const computerCard = computerDeck.cards.pop();

        playerCardSlot.appendChild(playerCard.setHTML());
        computerCardSlot.appendChild(computerCard.setHTML());

        if (playerDeck.noOfCards == 0 || computerDeck.noOfCards == 0) {
            gameOver = true;
            gameStarted = false;
            if (playerDeck.noOfCards == 0) {
                document.body.style.backgroundColor = "#e94c4c";
                document.querySelector('.message').innerText = "Luck is not an excuse. Click anywhere to restart"
            } else if (computerDeck.noOfCards == 0) {
                document.body.style.backgroundColor = "#6dda49";
                document.querySelector('.message').innerText = "You got lucky. Click anywhere to restart"
            }

        } else {
            if (CARD_WEIGHTS[playerCard.value] > CARD_WEIGHTS[computerCard.value]) {
                playerDeck.cards.unshift(playerCard);
                playerDeck.cards.unshift(computerCard);
                clickAnimation(e, "plus");
            } else if (CARD_WEIGHTS[playerCard.value] < CARD_WEIGHTS[computerCard.value]) {
                computerDeck.cards.unshift(playerCard);
                computerDeck.cards.unshift(computerCard);
                clickAnimation(e, "minus");
            } else {
                computerDeck.cards.unshift(computerCard);
                playerDeck.cards.unshift(playerCard);
                clickAnimation(e, "draw");
            }
        }
    } else {
        reset();
        startGame();
    }

    playerCount.innerText = playerDeck.noOfCards;
    computerCount.innerText = computerDeck.noOfCards;

}

const reset = () => {
    document.querySelector(".message").innerText = "Click anywhere on the screen"
    document.body.style.backgroundColor = "#6a83ff"
}

const updateCount = () => {
    playerCount.innerText = playerDeck.noOfCards;
    computerCount.innerText = computerDeck.noOfCards;
}

const clickAnimation = (e, status) => {
    const block = document.createElement('div');
    if (status == "plus") {
        block.style.color = '#35b335';
        block.innerText = "You win"
    } else if (status == "minus") {
        block.style.color = '#e05f5f';
        block.innerText = "Computer wins"
    } else {
        block.style.color = '#f4c55c';
        block.innerText = "It's a tie"
    }
    block.classList.add('block');
    block.style.top = `${e.clientY - 2}px`;
    block.style.left = `${e.clientX - 2}px`;
    document.body.appendChild(block);
    setTimeout(() => {
        document.querySelector('.block').remove();
    }, 1000)
}


document.addEventListener('click', (e) => flipCards(e));


startGame();