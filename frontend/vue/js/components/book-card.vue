<template>
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title"> {{ book.title }} </span>
        <p><strong>Description: </strong>{{ book.description }}</p>
        <p>isbn: {{ book.isbn }}</p>
      </div>
      <div class="card-action">
        <a on:click.prevent="deleteBook(book.id)">delete book</a>
      </div>
    </div>
  </div>  
</template>

<script>
module.exports = {
  name: 'name-card',
  props: ['book', 'delete-book']
}
</script>
