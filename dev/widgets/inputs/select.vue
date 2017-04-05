<style lang="sass" scoped>
  @import "assets/styles/essentials";
  @import "field";

  .field-pack .field select.input {
    -webkit-appearance: none !important;
    // -webkit-border-radius: 0px;
    // background-color: $text-white;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+);
    background-position: 100% center;
    background-repeat: no-repeat;
    // border-radius: 0;
    &:disabled, &.disabled {
      background-image: none;
    }
  }
</style>
<template>
  <div :class="['field-pack',{'invalid': !valid, 'hidden': !visible, 'has-warning': warning}]" @click="focus">
    <label :for="id" class="field-label">{{label}}</label>
      <div class="field">

        <select ref="field" v-model="value"
          :class="['input']" 
          :name="name" 
          :id="id" 
          :readonly="readonly"
          :required="required"
          :disabled="disabled"
          :placeholder="placeholder">
            <option :value="-1">{{placeholder}}</option>
            <option v-for="option in options" :value="option.value">{{option.text}}</option>
        </select>

        <span :class="['get-help',{'linger':linger}]"></span>
        <div class="help">
          <span class="arrow"></span>
          <p class="text-red">{{hint}}</p>
        </div>
      </div>

  </div>  
</template>

<!-- <option :value="-1" :selected="selected===-1">{{placeholder}}</option>
            <option v-for="option in options" :value="option.value" :selected="selected===option.value">{{option.text}}</option> -->

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
        // select控件的选择属性，默认情况下选中第一个选项，展示Placeholder
        selected: {
          type: [String,Number],
          default: -1
        },
        placeholder: String,
        label: String,
        // 表单验证出错提示
        hint: String,
        options: Array,
        // 可见
        visible: {
          type: Boolean,
          default: true
        }
      },
    data: function() {
      return {
        // 标识：表示此组件为控件
        isField:true,
        // 表示此组件为select控件
        isSelect: true,
        valid: true,
        warning: false,
        value: this.selected,
        linger: false
        // opts: this.options,
        // visible: true
      }
    },
    components: {
      
    },
    computed: {
      // 选中项的text
      text: {
        cache: false,
        get: function() {
          // 这种写法在value改变时，不能及时生效所以改变value然后即时取是不行的
          // return this.$refs.field.options[this.$refs.field.selectedIndex].innerHTML;
          for(var i=0; i<this.options.length; i++) {
            var option = this.options[i];
            if(option.value === this.value) {
              return option.text;
            }
          }
          return '';
        }
      },
      // 组件的值相对于初始化值是否发生了变化
      changed:
        function() {
          return this.value !== this.selected;
        }
    },
    mounted: function() {
      this.$refs.field.value = this.selected;
    },
    watch: {
      value:
        function() {
          this.validate();
          this.$emit('change', this);
        },
      // 当传入的props selected发生改变时，组件的值跟随变化
      selected:
        function() {
          // 当传入的selected值发生变化时，组件值value跟随变化
          this.value = this.selected;
        },
      warning:
        function() {
          if(this.warning) {
            this.linger = true;
            var self = this;
            setTimeout(function() {
              self.linger = false;
            },3000);
          }
        }
    },

    methods: {
      focus:
        function() {
          this.$refs.field.focus()
        },
      validate:
        function () {
          
          // 单个form表单元素的验证

          if(this.required) {
            this.valid = this.value !== -1;
          }else {
            this.valid = true;
          }

          return this.valid;
        }
    }
  }
</script>
