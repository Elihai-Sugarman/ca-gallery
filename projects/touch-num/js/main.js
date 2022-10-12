'use strict'

const EASY_NUM = 16
const HARD_NUM = 25
const EXTREME_NUM = 36
var gCurrLevel = EASY_NUM

var gNums = []

var gCurrNum = 1

var gStartTime
var gInterval

function resetNums() {
    gNums = []
    for (var i = 1; i <= gCurrLevel; i++) {
        gNums.push(i)
    }
}

function initGame() {
    resetNums()
    gCurrNum = 0
    var elbutons = document.querySelector('.buttons')
    elbutons.innerHTML = `<button class="button" onclick="restartGame(${EASY_NUM})">Easy</button>
    <button class="button" onclick="restartGame(${HARD_NUM})">Hard</button>
    <button class="button" onclick="restartGame(${EXTREME_NUM})">Extreme</button>`
    updateNextNumber()
    renderTable()
}

function renderTable() {
    var strHTML = ''
    for (var i = 0; i < Math.sqrt(gCurrLevel); i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < Math.sqrt(gCurrLevel); j++) {
            var num = drawNum()
            strHTML += `\t<td class="td" onclick="cellClicked(this,${num})">${num}</td>\n`
        }
        strHTML += `</tr>\n`
    }
    var eltable = document.querySelector('table')
    eltable.innerHTML = strHTML
}

function cellClicked(elCell, clickedNum) {
    if (clickedNum !== gCurrNum) return
    if (gCurrNum === 1) {
        gStartTime = Date.now()
        gInterval = setInterval(updateTime, 113)
        var elLevelButtons = document.querySelectorAll('.button')
        for (var i = 0; i < elLevelButtons.length; i++) {
            elLevelButtons[i].style.opacity = 0
        }
    }
    elCell.style.backgroundColor = 'rgba(183, 196, 207)'
    if (gCurrNum < gCurrLevel) updateNextNumber()
    else victory()
}

function updateTime() {
    const endTime = Date.now()
    var elDivTime = document.querySelector('.time')
    elDivTime.innerText = (endTime - gStartTime) / 1000
}

function updateNextNumber() {
    gCurrNum++
    var elDivNextNumber = document.querySelector('.next-number')
    elDivNextNumber.innerText = `Next Number: ${gCurrNum}`
}

function victory() {
    clearInterval(gInterval)
    var body = document.querySelector('body')

    body.innerHTML += `<h2 class="delete-at-restart">Well Done!</h2>\n
    <button onclick="restartGame(${EASY_NUM})" class="delete-at-restart">Click here to restart</button>`
}

function restartGame(level) {
    var elLevelButtons = document.querySelectorAll('.button')
    for (var i = 0; i < elLevelButtons.length; i++) {
        elLevelButtons[i].style.display = 'inline'
    }
    var elRestartItems = document.querySelectorAll('.delete-at-restart')
    for (var j = 0; j < elRestartItems.length; j++) {
        elRestartItems[j].style.display = 'none'
    }
    var elTime = document.querySelector('.time')
    elTime.innerText = ''
    gCurrLevel = level
    initGame()
}

function drawNum() {
    var currNum = gNums.splice(getRandomInt(0, gNums.length), 1)[0]
    return currNum
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
