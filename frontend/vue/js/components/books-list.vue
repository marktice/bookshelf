<template>
  <div class="row">
    <book-card 
      v-for="(book) in books"
      :book="book"
      :key="book.id"
      :delete-book="deleteBook"
    />
</div>
</template>

<script>
module.exports = {
  props: ['books', 'delete-book']
}
</script>
