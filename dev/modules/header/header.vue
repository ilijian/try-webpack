<template>
  <header>
    <h1>__("OnePlus 3T")</h1>
    <a href="__("https://oneplus.net")">Home</a>
    <div>__("OnePlus 3T<p>xxx</p>")</div>
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