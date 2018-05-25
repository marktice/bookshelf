window.addEventListener('DOMContentLoaded', main) //because ie:9 and before dont know script defer

function main() {

  ////////// moved to seperate components folder
  // Vue.component('book-card', {
  //   props: ['book', 'delete-book'],
  //   template: `<div class="col s12 m6">
  //               <div class="card blue-grey darken-1">
  //                 <div class="card-content white-text">
  //                   <span class="card-title"> {{ book.title }} </span>
  //                   <p><strong>Description: </strong>{{ book.description }}</p>
  //                   <p>isbn: {{ book.isbn }}</p>
  //                 </div>
  //                 <div class="card-action">
  //                   <a on:click.prevent="deleteBook(book.id)">delete book</a>
  //                 </div>
  //               </div>
  //             </div>`
  // })

  // Vue.component('loader', {
  //   props: ['books'],
  //   template: `
  //     <div v-if="books.length > 0">
  //       <slot></slot>
  //     </div>
  //     <div v-else>
  //       <h2>Loading...</h2>
  //     </div>
  //   `
  // })

  // Vue.component('books-list', {
  //   props: ['books', 'delete-book'],
  //   template: `
  //     <div class="row">
  //       <book-card 
  //         v-for="(book) in books"
  //         :book="book"
  //         :key="book.id"
  //         :delete-book="deleteBook"
  //       />
  //     </div>
  //   `
  // })

  httpVueLoader.register(Vue, './js/components/book-card.vue'); // had to make global because its used in the list

  new Vue({
    el: '#app',
    data() {
      return {
        books: []
      }
    },
    created() {
      this.fetchBooks()
    },
    components: {
      'loader': httpVueLoader('./js/components/loader.vue'),
      'books-list': httpVueLoader('./js/components/books-list.vue'),
      'book-card': httpVueLoader('./js/components/book-card.vue')
  },
    methods: {
      async fetchBooks() {
        try {
          const response = await fetch('http://localhost:3000/books')
          const books = await response.json()
          this.books = books
        } catch(err) {
          console.error(err)
        }
      },
      postBook(book) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
        }
        fetch('http://localhost:3000/books', options)
          .then( response => response.json() )
          .then( book => {
            this.books = this.books.concat(book)
          })
      },
      deleteBook(id) {
        const url = `http://localhost:3000/books${id}`
        const options = {
          method: 'DELETE'
        }
        fetch(url, options)
          .then(response => response.json())
          .then(book => {
            this.books = this.books.filter(b => b.id != book.id)
          })
          .catch(err => console.error(err))
      }
    }
  })
}