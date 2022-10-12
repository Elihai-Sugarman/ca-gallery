'use strict'

// Pieces Types
const PAWN_BLACK = '♟'
const ROOK_BLACK = '♜'
const KNIGHT_BLACK = '♞'
const BISHOP_BLACK = '♝'
const QUEEN_BLACK = '♛'
const KING_BLACK = '♚'

const PAWN_WHITE = '♙'
const ROOK_WHITE = '♖'
const KNIGHT_WHITE = '♘'
const BISHOP_WHITE = '♗'
const QUEEN_WHITE = '♕'
const KING_WHITE = '♔'

// The Chess Board
var gBoard
var gSelectedElCell = null

function restartGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    var board = []

    // TODO: build the board 8 * 8
    for (var i = 0; i < 8; i++) {
        board[i] = []
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
            if (i === 1) board[i][j] = PAWN_BLACK
            if (i === 6) board[i][j] = PAWN_WHITE
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK
    board[0][1] = board[0][6] = KNIGHT_BLACK
    board[0][2] = board[0][5] = BISHOP_BLACK
    board[0][3] = QUEEN_BLACK
    board[0][4] = KING_BLACK

    board[7][0] = board[7][7] = ROOK_WHITE
    board[7][1] = board[7][6] = KNIGHT_WHITE
    board[7][2] = board[7][5] = BISHOP_WHITE
    board[7][3] = QUEEN_WHITE
    board[7][4] = KING_WHITE

    console.table(board)
    return board
}

function renderBoard(board) {
    var strHtml = ''

    for (var i = 0; i < board.length; i++) {
        var row = board[i]
        strHtml += '\n<tr>\n'
        for (var j = 0; j < row.length; j++) {
            var cell = row[j]
            // TODO: figure class name
            var className = (i + j) % 2 === 0 ? 'white' : 'black'
            var tdId = `cell-${i}-${j}`
            strHtml += `\t<td id="${tdId}" onclick="cellClicked(this)" class="${className}">${cell}</td>\n`
        }
        strHtml += '\n</tr>'
    }
    // console.log(strHtml);
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHtml
}

function cellClicked(elCell) {
    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell)
        cleanBoard()
        return
    }
    cleanBoard()

    elCell.classList.add('selected')
    gSelectedElCell = elCell

    // console.log('elCell.id: ', elCell.id)
    var cellCoord = getCellCoord(elCell.id)
    // console.log('cellCoord: ', cellCoord)
    var piece = gBoard[cellCoord.i][cellCoord.j]

    var possibleCoords = []
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord)
            break
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord)
            break
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord)
            break
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(
                cellCoord,
                piece === PAWN_WHITE
            )
            break
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord)
            break
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord)
            break
    }
    markCells(possibleCoords)
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece

    var coord = getCellCoord(elFromCell.id)
    var piece = gBoard[coord.i][coord.j]

    // update the MODEl, update the DOM
    // Model
    gBoard[coord.i][coord.j] = ''

    // DOM
    elFromCell.innerText = ''

    // Model
    coord = getCellCoord(elToCell.id)
    gBoard[coord.i][coord.j] = piece

    // DOM
    elToCell.innerText = piece
}

function markCells(coords) {
    // TODO: query select them one by one and add mark
    for (var i = 0; i < coords.length; i++) {
        // #cell-3-2
        var selector = getSelector(coords[i])
        var elCell = document.querySelector(selector)
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {}
    var parts = strCellId.split('-')
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected')
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected')
    }
}

function getSelector(coord) {
    return `#cell-${coord.i}-${coord.j}`
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = []
    // TODO: handle PAWN use isEmptyCell()

    var diff = isWhite ? -1 : 1
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }

    if (!isEmptyCell(nextCoord)) return res
    res.push(nextCoord)

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        nextCoord = { i: pieceCoord.i + diff * 2, j: pieceCoord.j }
        if (!isEmptyCell(nextCoord)) return res
        res.push(nextCoord)
    }
    console.log('res: ', res)
    return res
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = []
    var i = pieceCoord.i + 1
    var j = pieceCoord.j
    while (i < gBoard.length) {
        var nextCoord = { i: i, j: j }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else i = gBoard.length
        i++
    }
    i = pieceCoord.i - 1
    while (i >= 0) {
        var nextCoord = { i: i, j: j }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else i = 0
        i--
    }
    i = pieceCoord.i
    j = pieceCoord.j + 1
    while (j < gBoard[i].length) {
        var nextCoord = { i: i, j: j }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else j = gBoard[i].length
        j++
    }
    j = pieceCoord.j - 1
    while (j >= 0) {
        var nextCoord = { i: i, j: j }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else j = 0
        j--
    }
    return res
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = []
    var diff = 1
    var i = pieceCoord.i
    var j = pieceCoord.j
    while (i + diff < gBoard.length && j + diff < gBoard[i].length) {
        var nextCoord = { i: i + diff, j: j + diff }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else diff = gBoard.length
        diff++
    }
    diff = -1
    while (i + diff >= 0 && j + diff >= 0) {
        var nextCoord = { i: i + diff, j: j + diff }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else diff = -i
        diff--
    }
    diff = -1
    while (i + diff >= 0 && j - diff < gBoard[i].length) {
        var nextCoord = { i: i + diff, j: j - diff }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else diff = -i
        diff--
    }
    diff = -1
    while (i - diff < gBoard.length && j + diff >= 0) {
        var nextCoord = { i: i - diff, j: j + diff }
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
        else diff = -j
        diff--
    }
    return res
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = []
    var rowIdx = pieceCoord.i
    var colIdx = pieceCoord.j
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            else if (i === rowIdx && j === colIdx) continue
            else if (isEmptyCell({ i, j })) res.push({ i, j })
        }
    }
    return res
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = getAllPossibleCoordsRook(pieceCoord)
    res.push(...getAllPossibleCoordsBishop(pieceCoord))
    return res
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = []
    var rowIdx = pieceCoord.i
    var colIdx = pieceCoord.j
    for (var i = rowIdx - 2; i <= rowIdx + 2; i += 2) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            else if (i === rowIdx || j === colIdx) continue
            else if (isEmptyCell({ i, j })) res.push({ i, j })
        }
    }
    for (var j = colIdx - 2; j <= colIdx + 2; j += 2) {
        if (j < 0 || j >= gBoard[0].length) continue
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
            else if (i === rowIdx || j === colIdx) continue
            else if (isEmptyCell({ i, j })) res.push({ i, j })
        }
    }
    return res
}
