'use strict'

var gProjects

function getProjects() {
    gProjects = [
        {
            id: 'touch-num',
            name: 'Touch Num',
            title: 'Click on the numbers in ascending order',
            desc: `A sweet little game, in which you have to click on the numbers on the game board in ascending order.
            Be careful, the moment you press on 1, the clock starts running... Goodluck!`,
            url: 'projects/touch-num/index.html',
            publishedAt: new Date('09/20/2022'),
            labels: ['Matrixes', 'Numbers'],
        },
        {
            id: 'ball-board',
            name: 'Ball Board',
            title: 'Collect the balls ASAP',
            desc: `In this game, you can move your player on the board by clicking on one of the neighbour cells, or by using the keyboard (up, down, left, right).
            You can use the passage tunnels on the sides, but you need to move fast and catch all the balls on the board. The longer you'll wait, the more balls you'll have to run after.
            And careful, don't run into a sticky cell if you can help it...`,
            url: 'projects/ball-board/index.html',
            publishedAt: new Date('09/24/2022'),
            labels: ['Matrixes', 'Keyboard events'],
        },
        {
            id: 'mister-chess',
            name: 'Mister Chess',
            title: 'Play Chess',
            desc: `A game like chess needs no introduction, right?
            Goodluck :)`,
            url: 'projects/mister-chess/index.html',
            publishedAt: new Date('09/25/2022'),
            labels: ['Matrixes', 'Chess'],
        },
        {
            id: 'pacman',
            name: 'Pacman',
            title: 'Play Pacman',
            desc: `Now you have the chance to play the old but beloved game - Pacman!
            Be careful from the ghost, unless you just ate one of the magic cookies on the corners of the border...
            Goodluck!`,
            url: 'projects/pacman/index.html',
            publishedAt: new Date('09/28/2022'),
            labels: ['Matrixes', 'Pacman'],
        },
        {
            id: 'mine-sweeper',
            name: 'Mine Sweeper',
            title: 'Play Mine Sweeper',
            desc: `One of the most beloved computer games of all times comes to you in a brand new version with three different difficulty levels, three lives, three hints and safe click.
            Notice, in order to see the hint, press on one of the lightbulb and than on the cell which you would like to see, along with its neighbours.`,
            url: 'projects/mine-sweeper/index.html',
            publishedAt: new Date('10/01/2022'),
            labels: ['Matrixes', 'Mine Sweeper'],
        },
        // {
        //     id: 'book-shop',
        //     name: 'Book Shop',
        //     title: 'Buy a book on our new digital book shoop',
        //     desc: 'Buy a book on our new digital book shoop',
        //     url: 'projects/book-shop/index.html',
        //     publishedAt: Date.now(),
        //     labels: ['Matrixes', 'Book Shop'],
        // },
    ]
    return gProjects
}
