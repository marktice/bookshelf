<template>
      <div v-if="books.length > 0">
        <slot></slot>
      </div>
      <div v-else>
        <h2>Loading...</h2>
      </div>
</template>

<script>
module.exports = {
  props: ['books']
}
</script>

