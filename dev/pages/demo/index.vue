<template>
  <div class="main-section">
    <div class="margin-medium"></div>
    <a is="one-button" href="" class="one-button btn-red btn-lg" retry="hello">Button Demo What</a>
    <div class="margin-medium"></div>
    <p>{{msg}}</p>
    <div class="image-demo"></div>
  </div>
</template>
<script>

  var OneButton = require('widgets/button/button.vue');

  module.exports = {
    name: 'main-section',
    data:
      function(){
        return {
          msg: 'Hello, there!'
        }
      },
    components: {
      'one-button': OneButton
    }
  }
</script>