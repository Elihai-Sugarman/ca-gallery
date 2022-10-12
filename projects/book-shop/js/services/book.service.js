'use strict'
const STORAGE_KEY = 'bookDB'
const gTitles = [
    'In search of Lost Time',
    'Ulysses',
    'Don Quixote',
    'One hundred Years of Solitude',
    'The Great Gatsby',
    'Moby Dick',
    'War and Peace',
    'Hamlet',
    'The Odyssey',
    'Madame Bovary',
    'The Divine Comedy',
    'Lolita',
    'The brothers Karamazov',
    'Crime and Punishment',
    'Wuthering heights',
    'The Catcher in the Rye',
    'Pride and Prejudice',
    'The Adventures of Huckleberry',
    'Anna Karenina',
    `Alice's Adventures in Wonderland`,
    'The Iliad',
]
const PAGE_SIZE = 5

var gPageIdx = 0
var gBooks
var gFilterBy = { title: '', maxPrice: 0 }
var gCurrBookId

function getTitles() {
    return gTitles
}

_createBooks()

function getBooks() {
    // Filtering:
    var books = gBooks.filter((book) => book.price <= gFilterBy.maxPrice)
    console.log(books.length)
    // var books = gBooks

    // Paging:
    // const startIdx = gPageIdx * PAGE_SIZE
    // books = books.slice(startIdx, startIdx + PAGE_SIZE)
    // gBooks = books
    return books
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(title) {
    const book = _createBook(title)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find((book) => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function updateCurrBook(bookId) {
    gCurrBookId = bookId
}

function getCurrBook() {
    return getBookById(gCurrBookId)
}

function plusRate() {
    const book = getCurrBook()
    if (book.rate === 10) return
    book.rate++
}

function minusRate() {
    const book = getCurrBook()
    if (book.rate === 0) return
    book.rate--
}

function _createBook(title) {
    return {
        id: makeId(),
        title,
        price: getRandomIntInclusive(50, 250),
        desc: makeLorem(),
        rate: 0,
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // books = []
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 21; i++) {
            var title = gTitles[i]
            books.push(_createBook(title))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function setBookFilter(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    return gFilterBy
}

function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((c1, c2) => (c1.price - c2.price) * sortBy.price)
    } else if (sortBy.title !== undefined) {
        gBooks.sort((c1, c2) => c1.title.localeCompare(c2.title) * sortBy.title)
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
