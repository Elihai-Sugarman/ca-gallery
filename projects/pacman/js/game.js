'use strict'

const WALL = '#'
const FOOD = '.'
const POWER_FOOD = '🍪'
const EMPTY = ' '
const SIZE = 10
const MAX_SCORE = 59
const VICTORIOUS = 'Well Done!'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
}
var gBoard
var gIntervalCherries

function init() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true

    var elGameOverDiv = document.querySelector('.game-over')
    elGameOverDiv.style.display = 'none'

    gIntervalCherries = setInterval(addCherry, 15000)
}

function buildBoard() {
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (
                i === 0 ||
                i === SIZE - 1 ||
                j === 0 ||
                j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)
            ) {
                board[i][j] = WALL
            } else if (
                (i === 1 && j === 1) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)
            )
                board[i][j] = POWER_FOOD
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    var emptyLocations = findEmptyLocations()
    if (emptyLocations.length === MAX_SCORE) gameOver(VICTORIOUS)
}

function addCherry() {
    var location = findEmptyLocation()
    gBoard[location.i][location.j] = CHERRY

    var locationClass = '.cell-' + location.i + '-' + location.j
    var elLocation = document.querySelector(locationClass)
    elLocation.style = ''
    elLocation.innerText = CHERRY
}

function findEmptyLocation() {
    var emptyLocations = findEmptyLocations()
    return emptyLocations[getRandomIntInclusive(0, emptyLocations.length - 1)]
}

function findEmptyLocations() {
    var emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (
                gBoard[i][j] === EMPTY ||
                (gBoard[i][j] === GHOST && checkGhostLocations())
            ) {
                emptyLocations.push({ i, j })
            }
        }
    }
    return emptyLocations
}

function checkGhostLocations() {
    var fullnessOpts = [FOOD, POWER_FOOD, CHERRY]
    for (var i = 0; i < gGhosts.length; i++) {
        if (fullnessOpts.includes(gGhosts[i].currCellContent)) return false
    }
    return true
}

function gameOver(text) {
    var elGameOverDiv = document.querySelector('.game-over')
    var elGameOverText = elGameOverDiv.querySelector('h1')
    elGameOverText.innerText = text
    elGameOverDiv.style.display = 'block'

    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherries)
}
