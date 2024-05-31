// script.js
document.addEventListener('DOMContentLoaded', () => {
    const themes = {
        cats: [
            { name: '1', img: 'images/cats/img1.jpg' },
            { name: '1', img: 'images/cats/img1.jpg' },
            { name: '2', img: 'images/cats/img2.jpg' },
            { name: '2', img: 'images/cats/img2.jpg' },
            { name: '3', img: 'images/cats/img3.jpg' },
            { name: '3', img: 'images/cats/img3.jpg' },
            { name: '4', img: 'images/cats/img4.png' },
            { name: '4', img: 'images/cats/img4.png' },
            { name: '5', img: 'images/cats/img5.jpg' },
            { name: '5', img: 'images/cats/img5.jpg' },
            { name: '6', img: 'images/cats/img6.jpg' },
            { name: '6', img: 'images/cats/img6.jpg' }
        ],
        dogs: [
            { name: '1', img: 'images/dogs/img1.jpg' },
            { name: '1', img: 'images/dogs/img1.jpg' },
            { name: '2', img: 'images/dogs/img2.webp' },
            { name: '2', img: 'images/dogs/img2.webp' },
            { name: '3', img: 'images/dogs/img3.jpg' },
            { name: '3', img: 'images/dogs/img3.jpg' },
            { name: '4', img: 'images/dogs/img4.webp' },
            { name: '4', img: 'images/dogs/img4.webp' },
            { name: '5', img: 'images/dogs/img5.webp' },
            { name: '5', img: 'images/dogs/img5.webp' },
            { name: '6', img: 'images/dogs/img6.webp' },
            { name: '6', img: 'images/dogs/img6.webp' }
        ],
        birds: [
            { name: '1', img: 'images/birds/img1.jpg' },
            { name: '1', img: 'images/birds/img1.jpg' },
            { name: '2', img: 'images/birds/img2.jpg' },
            { name: '2', img: 'images/birds/img2.jpg' },
            { name: '3', img: 'images/birds/img3.jpg' },
            { name: '3', img: 'images/birds/img3.jpg' },
            { name: '4', img: 'images/birds/img4.webp' },
            { name: '4', img: 'images/birds/img4.webp' },
            { name: '5', img: 'images/birds/img5.jpg' },
            { name: '5', img: 'images/birds/img5.jpg' },
            { name: '6', img: 'images/birds/img6.webp' },
            { name: '6', img: 'images/birds/img6.webp' }
        ]
    };

    let selectedTheme = themes.cats;

    const gameBoard = document.getElementById('game-board');
    const shuffleButton = document.getElementById('shuffle-button');
    const themeSelector = document.getElementById('theme-selector');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        gameBoard.innerHTML = '';
        selectedTheme.sort(() => 0.5 - Math.random());
        selectedTheme.forEach((item, index) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-id', index);

            const front = document.createElement('div');
            front.setAttribute('class', 'front');
            front.style.backgroundImage = `url(${item.img})`;

            const back = document.createElement('div');
            back.setAttribute('class', 'back');
            back.style.backgroundImage = "url('./images/fundo.jpg')"; 

            card.appendChild(front);
            card.appendChild(back);
            card.addEventListener('click', flipCard);

            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(selectedTheme[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add('flip');
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].classList.add('matched');
            cards[optionTwoId].classList.add('matched');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            setTimeout(() => {
                cards[optionOneId].classList.remove('flip');
                cards[optionTwoId].classList.remove('flip');
            }, 500);
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === selectedTheme.length / 2) {
            alert('Parabéns! ');
        }
    }

    function shuffleGame() {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        createBoard();
    }

    themeSelector.addEventListener('change', (e) => {
        selectedTheme = themes[e.target.value];
        shuffleGame();
    });

    shuffleButton.addEventListener('click', shuffleGame);

    createBoard();
});
