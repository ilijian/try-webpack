<style lang="sass">
  @import "assets/styles/essentials";
  @import "field";
  $input-file-size: 100px;

  .input[type^=file]::-webkit-file-upload-button {
    width: 0;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    border: none;
    outline: none;
  }

  .input[type=file] {
    cursor: pointer;
    &:after {
      content: attr(btn-text);
      @include inline-block;
      border-radius: $border-radius-base;
      width: $input-file-size;
      height: $input-height-base;
      line-height: $input-height-base;
      text-align: center;
      background: $text-red;
      color: $text-white;
      position: absolute;
      right: 0;
      top: 0;
      margin-left: 20px;
      -webkit-appearance: none;
      &:hover,&:focus {
        @extend %box-shadow-base;
      }
    }
  }

  .choose-file {
    padding-right: $input-file-size + 20px;
    .get-help {
      right: $input-file-size + 20px + 12px;
    }
    .help {
      right: $input-file-size + 20px;
    }
  }
</style>

<template>
  <div :class="['field-pack',{'invalid': !valid}]" @click="focus">
    <label :for="id" class="field-label">{{label}}</label>
    <div class="field choose-file">
      
      <input class="input" ref="field" v-model="value"
        @change="onChange"
        :path="path"
        :id="id"
        :name="name"
        type="file"
        :readonly="readonly"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        :btn-text="btnText"
      />

      <span class="get-help"></span>
      <div class="help">
        <span class="arrow"></span>
        <p class="text-red">{{hint}}</p>
      </div>
    </div>
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
        // 所选文件的路径，然而并没有什么用，这个控件不能赋初值
        path: String,
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean,
        placeholder: String,
        label: String,
        // choose file控件的按钮文字
        btnText: {
          type: String,
          default: 'Browse'
        },
        // 表单验证出错提示
        hint: String
      },
    data: function() {
      return {
        // 标识：表示此组件为控件
        isField:true,
        valid: true,
        value: ''
      }
    },
    // components: {
      
    // },
    computed: {
      // value: {
      //   cache: false,
      //   get:
      //     function() {
      //       return this.$refs.field.value;
      //     },
      //   set:
      //     function(value) {
      //       this.$refs.field.value = value;
      //     }
      // }
    },
    watch: {
      value:
        function() {
          this.validate();
        }
    },

    methods: {
      focus:
        function () {
          this.$refs.field.focus();
        },
      // 因为Vue中没有默认处理choose-file的控件的value值绑定，所以，只能在change事件中进行赋值
      onChange:
        function() {
          this.value = this.$refs.field.value;
        },

      validate:
        function () {
          
          // 是否填入了内容
          var empty = !this.value;

          if(this.required || !empty) {
            this.valid = !!this.value;
          }else {
            this.valid = true;
          }

          return this.valid;
        }
    }
  }
</script>