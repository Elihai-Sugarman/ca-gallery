'use strict'

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            if (cell === GHOST) {
                for (var i = 0; i < gGhosts.length; i++) {
                    var currGhost = gGhosts[i]
                    if (compareLocations(currGhost.location, { i, j })) {
                        cell = getGhostHTML(currGhost)
                        break
                    }
                }
            }
            const className = 'cell cell-' + i + '-' + j
            if (cell === PACMAN) {
                strHTML += `<td class="${className}" style="rotate(${gPacman.rotation}deg"><span class="pacman">${PACMAN}</span></td>`
            } else strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function compareLocations(location1, location2) {
    return location1.i === location2.i && location1.j === location2.j
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    if (value === PACMAN) {
        elCell.style.transform = `rotate(${gPacman.rotation}deg)`
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
