
function createBookItem({id, title, description, isbn}) {
  const li = document.createElement('li')
  li.dataset.id = id
  li.classList.add('collection-item')
  
  const paraTitle = document.createElement('p')
  const paraDescription = document.createElement('p')
  const paraisbn = document.createElement('p')
  
  paraTitle.textContent = title
  paraDescription.textContent = description
  paraisbn.textContent = isbn

  li.appendChild(paraTitle)
  li.appendChild(paraDescription)
  li.appendChild(paraisbn)

  return li
}

const bookList = document.querySelector('ul')

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
const form = document.querySelector('form')

form.addEventListener('submit', captureForm)

// 4. capture form data
function captureForm(event) {
  event.preventDefault()
  
  const inputTitle = document.querySelector('#title')
  const inputDescription = document.querySelector('#description')
  const inputIsbn = document.querySelector('#isbn')

  const title = inputTitle.value
  const description = inputDescription.value
  const isbn = inputIsbn.value
  const book = {
    title: title,
    description: description,
    isbn: isbn
  }
  
  // tip: reset form if successfull - how do i findout if successful??
  form.reset();

  postBook(book)
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
  console.dir(options)
  
  const response = await fetch(url, options)
  // console.dir(response.body)
  const newBook = await response.json()
  // console.dir(newBook)
  
  // 6. prepend new book to bookList
  bookList.prepend(createBookItem(newBook))
}