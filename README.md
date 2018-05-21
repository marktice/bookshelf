# Bootshelf - 21/5/2018
An exercise in using a javascript front-end with a rails back-end.

## Goal
Without leaving the current page:
- Add all books from out backend database below form
- Add a new book from the completed form to our backend rails database
- Prepend new book to booklist below form, 

JavaScript Process:
1. fetchBooks async function
2. addBooksToList(books) function
3. add a submit event listener to form
4. capture form data
5. postBook async function
6. prepend new book to bookList

```javascript
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

// 3. add a submit event listener to form
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
  
  const response = await fetch(url, options)
  const newBook = await response.json()
  
  // 6. prepend new book to bookList
  bookList.prepend(createBookItem(newBook))
}
```