'use strict'

// const GHOST = '&#9781;'
const GHOST = 'ᗣ'
const GAME_OVER = 'Game Over'

var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    gDeadGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    var j = gGhosts[0].color
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3,
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) gameOver(GAME_OVER)
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1:
            return { i: 0, j: 1 }
        case 2:
            return { i: 1, j: 0 }
        case 3:
            return { i: 0, j: -1 }
        case 4:
            return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var ghostColor = gPacman.isSuper ? 'darkblue' : ghost.color
    return `<span class="ghost" style="color:${ghostColor}">${GHOST}</span>`
}
