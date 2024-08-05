'use strict'

let gFirstCardChosenIdx = ''
let gIsCardsOpen = false
let gGameCards = []
let gPairsCount = ''
let gPairsCollected = 0
let gOrientation
let gFrontCardIdx
let gIntevarlFlicker

const cards = [
    {
        id: 0,
        cardName: 'cat',
        isInGame: true
    },
    {
        id: 1,
        cardName: 'cow',
        isInGame: true
    },
    {
        id: 2,
        cardName: 'crocodile',
        isInGame: true
    },
    {
        id: 3,
        cardName: 'deer',
        isInGame: true
    },
    {
        id: 4,
        cardName: 'dino',
        isInGame: true
    },
    {
        id: 5,
        cardName: 'dog',
        isInGame: true
    },
    {
        id: 6,
        cardName: 'elephant',
        isInGame: true
    },
    {
        id: 7,
        cardName: 'fairy',
        isInGame: true
    },
    {
        id: 8,
        cardName: 'frog',
        isInGame: true
    },
    {
        id: 9,
        cardName: 'giraffe',
        isInGame: true
    },
    {
        id: 10,
        cardName: 'girl',
        isInGame: true
    },
    {
        id: 11,
        cardName: 'mermaid',
        isInGame: true
    },
    {
        id: 12,
        cardName: 'penguin',
        isInGame: true
    },
    {
        id: 13,
        cardName: 'pirate',
        isInGame: true
    },
    {
        id: 14,
        cardName: 'princess',
        isInGame: true
    },
    {
        id: 15,
        cardName: 'supergirl',
        isInGame: true
    },
    {
        id: 16,
        cardName: 'unicorn',
        isInGame: true
    },
]

const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        const node = document.querySelector(element)

        node.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            node.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true })
    })

function onSetGameLevel(itemsInRow, rows) {
    gPairsCount = (itemsInRow * rows) / 2

    const root = document.documentElement
    root.style.setProperty('--rows', rows)
    root.style.setProperty('--itemsInRow', itemsInRow)


    animateCSS('.level-container', 'fadeOut').then(() => {
        document.querySelector('.level-container').style.display = 'none'
        document.querySelector('.game-container').style.display = 'flex'
        gFrontCardIdx = getRandomIntInclusive(1, 8)
        initGame()

    })
}

function initGame() {
    for (let i = 0; i < gPairsCount; i++) {
        const cardIdx = getRandomIntInclusive(0, cards.length - 1)
        const currCard = { ...cards[cardIdx] }

        if (!gGameCards.some(item => item.id === currCard.id)) {
            gGameCards.push(currCard)
        }
        else i--
    }
    gGameCards = [...gGameCards, ...gGameCards]

    shuffleArray(gGameCards)
    renderCards()
}

function renderCards() {
    let strHTML = ''
    for (let i = 0; i < gGameCards.length; i++) {
        strHTML += `<div class="card-container card-${i} animate__animated" onclick="onCardClick(${i})">
        <div class="card" >
        <div class="front">
        <img src="img/back/${gFrontCardIdx}.jpg" alt="">
        </div>
        <div class="back">
        <img src="img/cards/${gGameCards[i].cardName}.jpg" alt="Image">
        </div>
        </div>
        </div>`
    }
    const elCards = document.querySelector(".grid")
    elCards.innerHTML = strHTML
}

function onCardClick(i) {
    if (gIsCardsOpen || !gGameCards[i].isInGame) return

    if (gFirstCardChosenIdx === '') {
        gFirstCardChosenIdx = i
        document.querySelector(`.card-${i} .card`).classList.add('flip')

    } else {
        if (i === gFirstCardChosenIdx) return
        document.querySelector(`.card-${i} .card`).classList.add('flip')
        gIsCardsOpen = true
        if (gGameCards[gFirstCardChosenIdx].id === gGameCards[i].id) {
            gPairsCollected++

            gGameCards[gFirstCardChosenIdx].isInGame = false
            gGameCards[i].isInGame = false

            setTimeout(() => {
                document.querySelector(`.card-${i} .back`).classList.add('match-cards')
                document.querySelector(`.card-${gFirstCardChosenIdx} .back`).classList.add('match-cards')
            }, 500)

            setTimeout(() => {
                gIsCardsOpen = false
                gFirstCardChosenIdx = ''
            }, 1000)

            if (gPairsCount === gPairsCollected) {
                gameOver()
            }

        } else {
            setTimeout(() => {
                animateCSS(`.card-${i}`, 'headShake');
                animateCSS(`.card-${gFirstCardChosenIdx}`, 'headShake');
            }, 700)

            setTimeout(() => {
                document.querySelector(`.card-${i} .card`).classList.remove('flip')
                document.querySelector(`.card-${gFirstCardChosenIdx} .card`).classList.remove('flip')
            }, 1300)

            setTimeout(() => {
                gIsCardsOpen = false
                gFirstCardChosenIdx = ''
            }, 1500)
        }
    }
}

function gameOver() {
    setTimeout(() => {
        document.querySelector('.grid').style.display = 'none'
        document.querySelector('.confeti').style.display = 'block'
        document.querySelector('.game-over').style.display = 'flex'
        animateCSS('.play-again', 'zoomInDown')
    }, 1100)

    setTimeout(() => {
        animateCSS('.confeti', 'fadeOut').then(() => {
            document.querySelector('.confeti').style.display = 'none'
        })
    }, 2700)

    gIntevarlFlicker = setInterval(() => {
        document.querySelector(`.play-again`).classList.add('flick')
        setTimeout(() => {
            document.querySelector(`.play-again`).classList.remove('flick')
        }, 400)
    }, 800)
}

function onClickPlayAgian() {
    clearInterval(gIntevarlFlicker)

    document.querySelector('.game-over').style.display = 'none'
    document.querySelector('.grid').style.display = 'grid'

    gFirstCardChosenIdx = ''
    gIsCardsOpen = false
    gGameCards = []
    gPairsCollected = 0

    initGame()
}

function onClickHomePage() {
    clearInterval(gIntevarlFlicker)
    document.querySelector('.game-over').style.display = 'none'
    document.querySelector('.game-container').style.display = 'none'
    document.querySelector('.grid').style.display = 'grid'
    document.querySelector('.level-container').style.display = 'flex'
    document.querySelector('.header-text').style.display = 'block'

    gFirstCardChosenIdx = ''
    gIsCardsOpen = false
    gGameCards = []
    gPairsCollected = 0
}
