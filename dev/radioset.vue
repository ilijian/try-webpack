<style></style>

<template>
  <div class="radio-set">
    <div v-for="(item,index) in items" class="set-item">
      <input class="ctrler" type="radio" :name="setName" :id="setName + '-' + index">
      <label for="setName + '-' + index" class="puppet"></label>
    </div>
  </div>
  
</template>

<script>
  module.exports = {
    props: {

    }
  }
</script>