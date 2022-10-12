'use strict'

// const PACMAN = '😷'
const PACMAN = 'ᗧ'

var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5,
        },
        isSuper: false,
        rotation: 0,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    else if (nextCell === CHERRY) updateScore(10)
    else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        updateScore(1)
        activatePower()
    } else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver(GAME_OVER)
            renderCell(gPacman.location, EMPTY)
            return
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function activatePower() {
    gPacman.isSuper = true
    updateGhosts()

    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts.push(...gDeadGhosts)
        updateGhosts()
    }, 5000)
}

function updateGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostHTML = getGhostHTML(gGhosts[i])
        renderCell(gGhosts[i].location, currGhostHTML)
    }
}

function killGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (compareLocations(currGhost.location, nextLocation)) {
            gDeadGhosts.push(...gGhosts.splice(i, 1))
            return
        }
    }
}

function compareLocations(location1, location2) {
    return location1.i === location2.i && location1.j === location2.j
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            rotatePacman(-90)
            nextLocation.i--
            break
        case 'ArrowDown':
            rotatePacman(90)
            nextLocation.i++
            break
        case 'ArrowLeft':
            rotatePacman(180)
            nextLocation.j--
            break
        case 'ArrowRight':
            rotatePacman(0)
            nextLocation.j++
            break
        default:
            return null
    }
    return nextLocation
}

function rotatePacman(degrees) {
    gPacman.rotation = degrees
    renderCell(gPacman.location, PACMAN)
}
