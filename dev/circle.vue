<style lang="scss">
  .circle {
    border-radius: 50%;
    width: 10%;
    float: left;
    background-color: #ccc;
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
  }
</style>
<template>
  <div class="circle" :class="{'visible': visible}" @click="onClick"></div>
</template>

<script>
  module.exports = {
    props: ['debut'],
    data:
      function() {
        return {
          visible: this.debut,
          hit: false
        }
      },
    watch: {
      debut:
        function() {
          this.visible = this.debut;
        }
    },
    methods: {
      onClick:
        function() {
          if(this.visible) {
            this.visible = false;
            this.hit = true;
            this.$emit('circle-hit');
          }
        }
    }
  };
</script>