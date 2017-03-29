<style lang="scss">
  .circles {
    display: block;
    padding: 0;
    list-style: none;
    width: 100%;
    max-width: 500px;
    &:before, &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>

<template>
  <ul class="circles">
    <li v-for="visible in visibles" class="circle-wrapper">
      <one-circle :debut="visible" @circle-hit="count"></one-circle>
    </li>
  </ul>
</template>

<script>
  module.exports = {
    data:
      function  () {
        return {
          visibles: new Array(100),
          hits: 0
        }
      },
    methods:{
      render:
        function() {
          this.hits = 0;
          for(i=0;i<100;i++) {
            Math.random() * 10 > 5 ? this.visibles.splice(i,1,true) : this.visibles.splice(i,1,false);
          }
        },
      count:
        function() {
          this.hits ++;
        },
      reset:
        function() {
          for(i=0;i<100;i++) {
            this.visibles = new Array(100);
          }
        }
    },
    components: {
      'one-circle': require('./circle.vue')
    }
  };
</script>