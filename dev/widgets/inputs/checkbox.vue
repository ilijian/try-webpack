<style lang="sass">
  @import "public/styles/essentials";
  @import "field";
  @import "pick";

</style>

<template>
  <div :class="['field-pack',{'invalid': !valid, 'hidden': !visible}]" @click="focus">

    <input class="input-checkbox" ref="field"
      @change="onChange"
      type="checkbox" 
      :id="id"
      :name="name" 
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      :value="value">
    <label class="checkbox-puppet" 
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
        // checkbox初始选中状态
        active: Boolean,
        // placeholder: String,
        label: String,
        // 组件的值
        value: [String,Number]
      },
    data: function() {
      return {
        // 标识：表示此组件为控件
        isCheckbox:true,
        valid: true,
        // 控件是否可见
        visible: true
      }
    },
    computed: {
      // checkbox组件的选中状态，注意，不可以在render中引用
      checked: {
        cache: false,
        get: function() {
          return this.$refs.field.checked;
        },
        set: function(checked) {
          // 当设定值与当前值不同时，触发change事件
          // (this.$refs.field.checked !== checked) && this.onChange() && this.$emit('change');
          this.$refs.field.checked = checked;
          this.validate();
          // console.log('set as checked: ' + checked);
        }
      },
      // 组件的值相对于初始化值是否发生了变化
      changed:
        function() {
          return this.checked !== this.active;
        }
    },
    mounted: function() {
      // 在DOM渲染后设定初始值
      this.checked = this.active;
    },
    watch: {
      active:
        function() {
          // 当传入的初始值发生变化时，重新设定checked状态
          this.checked = this.active;
          // console.log('set as active: ' + this.active);
        }
    },

    methods: {
      onChange:
        function() {
          // console.log('changed to :' + this.checked);
          this.$emit('change');
        },
      focus:
        function() {
          this.$refs.field.focus()
        },
      // 校验
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