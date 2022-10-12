'use strict'

var gProjects

function getProjects() {
    gProjects = [
        {
            id: 'touch-num',
            name: 'Touch Num',
            title: 'Click on the numbers in ascending order',
            desc: 'Click on the numbers in ascending order',
            url: 'projects/touch-num/index.html',
            publishedAt: Date.now(),
            labels: ['Matrixes', 'Numbers'],
        },
        {
            id: 'ball-board',
            name: 'Ball Board',
            title: 'Collect the balls ASAP',
            desc: 'Collect the balls ASAP',
            url: 'projects/ball-board/index.html',
            publishedAt: Date.now(),
            labels: ['Matrixes', 'Keyboard events'],
        },
        {
            id: 'mister-chess',
            name: 'Mister Chess',
            title: 'Play Chess',
            desc: 'Play Chess',
            url: 'projects/mister-chess/index.html',
            publishedAt: Date.now(),
            labels: ['Matrixes', 'Chess'],
        },
        {
            id: 'pacman',
            name: 'Pacman',
            title: 'Play Pacman',
            desc: 'Play Pacman',
            url: 'projects/pacman/index.html',
            publishedAt: Date.now(),
            labels: ['Matrixes', 'Pacman'],
        },
        {
            id: 'mine-sweeper',
            name: 'Mine Sweeper',
            title: 'Play Mine Sweeper',
            desc: 'Play Mine Sweeper',
            url: 'projects/mine-sweeper/index.html',
            publishedAt: Date.now(),
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
