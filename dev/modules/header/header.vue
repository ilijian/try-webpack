<template>
  <header>
    <h1>This is the header</h1>
    <choose-store></choose-store>
  </header>
</template>

<script>
  module.exports = {
    components: {
      'choose-store': require('./choose-store.vue')
    }
  }
</script>