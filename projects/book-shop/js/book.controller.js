'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    // renderTitlesInFilter()
}

function renderTitlesInFilter() {
    const titles = getTitles()

    const strHTMLs = titles.map((title) => `<option>${title}</option>`)
    strHTMLs.unshift('<option value="">Select title</option>')

    const elSelect = document.querySelector('.filter-title-select')
    elSelect.innerHTML = strHTMLs.join('')
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(
        (book) => `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="onReadBook('${book.id}')">Read</button>
                <button onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="btn-remove" onclick="onDeleteBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `
    )
    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
}

function onAddBook() {
    var title = prompt('Title?')
    if (title) {
        const book = addBook(title)
        renderBooks()
        flashMsg(`Book Added (id: ${book.id})`)
    }
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Price?', book.price)
    if (newPrice && book.price !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }
}

function onReadBook(bookId) {
    updateCurrBook(bookId)
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rate').innerText = book.rate
    elModal.classList.add('open')
}

function onPlusRate() {
    plusRate()
    updateRate()
}

function onMinusRate() {
    minusRate()
    updateRate()
}

function updateRate() {
    const book = getCurrBook()
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.rate').innerText = book.rate
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?title=${filterBy.title}&maxPrice=${filterBy.maxPrice}`
    const newUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 0,
    }

    if (!filterBy.maxPrice) return

    // document.querySelector('.filter-title-select').value = filterBy.title
    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    setBookFilter(filterBy)
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    // const sortBy = {}
    // sortBy[prop] = (isDesc)? -1 : 1

    // Shorter Syntax:
    const sortBy = {
        [prop]: isDesc ? -1 : 1,
    }

    setBookSort(sortBy)
    renderBooks()
}

function onNextPage() {
    nextPage()
    renderBooks()
}
