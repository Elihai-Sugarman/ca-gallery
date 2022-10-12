'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

const BALL = 'BALL'
const GAMER = 'GAMER'
const STUCK_GAMER = 'STUCK_GAMER'
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'
const STUCK_GAMER_IMG = '<img src="img/gamer-purple.png">'
const GLUE_IMG = '<img src="img/candy.png">'

const PASSAGE_COL = 5
const PASSAGE_ROW = 5

// Model:
var gBoard
var gGamerPos
var gScore
var gBallCount
var gBallInterval
var gGlueInterval
var gIsGlued

function initGame() {
    // Model
    gGamerPos = { i: 2, j: 9 }
    gScore = 0
    gBallCount = 2
    gIsGlued = false
    gBoard = buildBoard()

    // Init intervals
    gBallInterval = setInterval(addNewBall, 1500)
    gGlueInterval = setInterval(addGlueInterval, 5000)

    // DOM
    var elCollectedBallsNum = document.querySelector('.collected-balls')
    var elGameOver = document.querySelector('.game-over')
    elGameOver.style.display = 'none'
    elCollectedBallsNum.innerText = gScore
    renderBoard(gBoard)
}

function buildBoard() {
    // TODO: Create the Matrix 10 * 12
    const board = createMat(10, 12)

    // TODO: Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (
                (i === 0 && j !== PASSAGE_COL) ||
                (i === board.length - 1 && j !== PASSAGE_COL) ||
                (j === 0 && i !== PASSAGE_ROW) ||
                (j === board[i].length - 1 && i !== PASSAGE_ROW)
            ) {
                board[i][j] = { type: WALL, gameElement: null }
            } else {
                board[i][j] = { type: FLOOR, gameElement: null }
            }
        }
    }
    // TODO: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[4][6].gameElement = BALL
    board[6][3].gameElement = BALL

    return board
}

// Render the board to an HTML table
function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML +=
                '\t<td class="cell ' +
                cellClass +
                '"  onclick="moveTo(' +
                i +
                ',' +
                j +
                ')" >\n'

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}

function addNewBall() {
    var currPosition = getEmtyCell()
    if (!currPosition) return
    var i = currPosition.i
    var j = currPosition.j
    gBoard[i][j].gameElement = BALL
    gBallCount++
    renderCell({ i, j }, BALL_IMG)
}

function addGlueInterval() {
    var currPosition = getEmtyCell()
    if (!currPosition) return
    var i = currPosition.i
    var j = currPosition.j
    gBoard[i][j].gameElement = GLUE
    renderCell({ i, j }, GLUE_IMG)
    setTimeout(removeGlue, 3000, i, j)
}

function getEmtyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (
                gBoard[i][j].gameElement === null &&
                gBoard[i][j].type !== WALL
            ) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells[getRandomInt(0, emptyCells.length)]
}

function removeGlue(i, j) {
    if (gBoard[i][j].gameElement === GLUE) {
        gBoard[i][j].gameElement = null
        renderCell({ i, j }, '')
    }
}

// Move the player to a specific location
function moveTo(i, j) {
    if (gIsGlued === true) return

    // Calculate distance to make sure we are moving to a neighbor cell
    const iAbsDiff = Math.abs(i - gGamerPos.i)
    const jAbsDiff = Math.abs(j - gGamerPos.j)

    // If the clicked Cell is one of the four allowed
    if (iAbsDiff + jAbsDiff === 1) {
        // Handling passages
        if (i === -1) i = gBoard.length - 1
        else if (j === -1) j = gBoard[i].length - 1
        else if (i === gBoard.length) i = 0
        else if (j === gBoard[i].length) j = 0

        // Handling hitting a wall
        const targetCell = gBoard[i][j]
        if (targetCell.type === WALL) return

        if (targetCell.gameElement === BALL) {
            // Model
            gScore++

            // DOM
            var collectAudio = new Audio('audio/collect-sound.mp3')
            collectAudio.play()
            var elCollectedBallsNum = document.querySelector('.collected-balls')
            elCollectedBallsNum.innerText = gScore

            // Winning
            if (gScore === gBallCount) {
                clearInterval(gBallInterval)
                clearInterval(gGlueInterval)
                var elGameOver = document.querySelector('.game-over')
                elGameOver.style.display = 'block'
            }
        }

        // TODO: Move the gamer
        // Model
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null

        // DOM
        var selectorStr = getClassName(gGamerPos)
        var elCell = document.querySelector('.' + selectorStr)
        elCell.innerHTML = ''

        if (targetCell.gameElement === GLUE) {
            // Model
            gBoard[i][j].gameElement = STUCK_GAMER
            gGamerPos = { i, j }
            gIsGlued = true

            setTimeout(() => {
                gIsGlued = false
            }, 3000)

            // DOM
            selectorStr = getClassName(gGamerPos)
            elCell = document.querySelector('.' + selectorStr)
            elCell.innerHTML = STUCK_GAMER_IMG

            return
        }

        // Model
        gBoard[i][j].gameElement = GAMER
        gGamerPos = { i, j }

        // DOM
        selectorStr = getClassName(gGamerPos)
        elCell = document.querySelector('.' + selectorStr)
        elCell.innerHTML = GAMER_IMG
    } else console.log('Bad Move', iAbsDiff, jAbsDiff)
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// Move the player by keyboard arrows
function handleKey(event) {
    const i = gGamerPos.i
    const j = gGamerPos.j

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case 'ArrowUp':
            moveTo(i - 1, j)
            break
        case 'ArrowDown':
            moveTo(i + 1, j)
            break
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
