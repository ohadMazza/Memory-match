'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}