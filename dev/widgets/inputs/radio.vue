<style lang="sass" scoped>
  @import "assets/styles/essentials";
  @import "field";
  @import "pick";
  
</style>

<template>
  <div :class="['field-pack',{'invalid': !valid, 'hidden': !visible}]" @click="focus">

    <input class="input-radio" ref="field" v-model="picked"
      type="radio" 
      :id="id"
      :name="name" 
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      :value="value">
    <label class="radio-puppet" 
      :for="id">{{label}}</label>

  </div>
</template>

<script>

  module.exports = {
    props: 
      {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean,
        // checkbox或者radio button的初始选中状态
        active: Boolean,
        // placeholder: String,
        label: String,
        value: String
      },
    data: function() {
      return {
        // 标识：表示此组件为控件
        isRadio:true,
        valid: true,
        // picked: this.active,
        // 控件是否可见
        visible: true
      }
    },
    computed: {
      checked: {
          cache: false,
          get: function() {
            return this.$refs.field.checked;
          },
          set: function(checked) {
            // 当由选中到非选中状态时，发出change事件
            // !this.$refs.field.checked && checked && this.onChange() && this.$emit('change');
            this.$refs.field.checked = checked;
            this.validate();
          }
        },
      },
    watch: {
      active:
        function() {
          this.checked = this.active;
        }
    },
    mounted:
      function() {
        this.checked = this.active;
      },

    methods: {
      onChange:
        function() {
          // console.log('changed');
          this.$emit('change');
        },
      focus:
        function() {
          this.$refs.field.focus()
        },
      validate:
        function () {
          
          if(this.required) {
            this.valid = this.checked;
          }else {
            this.valid = true;
          }

          return this.valid;
        }
    }
  }
</script>