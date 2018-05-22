const bookList = document.querySelector('ul')
const form = document.querySelector('form')

function createBookItem({id, title, description, isbn}) {
  const li = document.createElement('li')
  const paraTitle = document.createElement('p')
  const paraDescription = document.createElement('p')
  const paraisbn = document.createElement('p')

  li.classList.add('collection-item')
  li.dataset.id = id
  
  paraTitle.textContent = title
  paraDescription.textContent = description
  paraisbn.textContent = isbn

  li.appendChild(paraTitle)
  li.appendChild(paraDescription)
  li.appendChild(paraisbn)

  return li
}

fetchBooks()
  .then(addToBookList)
  .catch(err => console.log(err.message))
 
// 1. fetchBooks async function
// fetches all books in the database
async function fetchBooks() {
  const response = await fetch('http://localhost:3000/books')
  const books = await response.json()
  return books
}

// 2. addBooksToList(books) function
// adds all books in database to ul(booklist) in html
function addToBookList(books) {
  books.forEach( book => {
    bookList.appendChild(createBookItem(book))    
  })
}

// 3. add a submit event listener to form //another tip: don’t submit data if any form field is empty
form.addEventListener('submit', submitForm)

// 4. capture form data
function submitForm(e) {
  e.preventDefault()
  const formElements = e.target.elements
  const title = formElements.title.value
  const description = formElements.description.value
  const isbn = formElements.isbn.value

  const book = {
    title: title,
    description: description,
    isbn: isbn
  }

  postBook(book)
    .then(book => {
      e.target.reset() // reset form
      return createBookItem(book)
    })
    .then(el => bookList.prepend(el))
    .catch(err => console.error(err))
}

// 5. postBook async function
async function postBook(book) {
  const url = 'http://localhost:3000/books'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  }
  const response = await fetch(url, options)
  const newBook = await response.json()
  return newBook
}