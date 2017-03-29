<style lang="scss">
  .set-item {
    .puppet {
      margin: 0;
      padding: 10px;
      background-color: #000;
      border: 1px solid #000;
      color: #fff;
    }
    
    .ctrler {
      display: none;
      &:checked + .puppet {
        border: 1px solid #eb0028;
      }
    }

  }
</style>

<template>
  <div class="set-item">
    <input class="ctrler" type="radio" :name="name" :id="id">
    <label :for="id" class="puppet">
      <slot></slot>
    </label>
  </div>
</template>

<script>
  module.exports = {
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },

    data:
      function  () {
        return {

        }
      }
  };
</script>