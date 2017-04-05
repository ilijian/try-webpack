<style lang="sass">
  @import "assets/styles/essentials";
  @import "field";

  .field-pack .filed textarea.input {
    height: auto;
  }
</style>

<template>
  <div :class="['field-pack',{'invalid': !valid, 'hidden': !visible, 'has-warning': warning}]" @click="focus">

    <label :for="id" class="field-label">{{label}}</label>
    <div class="field">

      <textarea v-if="type === 'textarea'" ref="field" v-model="value" 
        @focus="focus" @keyup.delete="onDelete"
        class="input" 
        :cols="cols"
        :rows="rows"
        :id="id"
        :name="name"
        :readonly="readonly"
        :required="required"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :test="test">
      </textarea>

      <input v-else class="input" ref="field" v-model="value" @focus="focus" @keyup.delete="onDelete"
        :id="id"
        :name="name"
        type="text"
        :readonly="readonly"
        :required="required"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :test="test"
        :pattern="pattern">

      <span :class="['get-help',{'linger':linger}]"></span>
      <div class="help">
        <span class="arrow"></span>
        <p class="text-red">{{hint || help}}</p>
      </div>
    </div>  

  </div>
</template>

<script>

  var validator = require('assets/scripts/validator');

  module.exports = {
    props: 
      {
        // 输入控件的类型，可能的值为 textarea | text | select | 其他
        type: {
          type: String,
          default: 'text'
        },
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        text: {
          type: String,
          default: ''
        },
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean,
        placeholder: String,
        label: String,
        // value: String,
        maxlength: Number,
        // textarea的属性
        cols: Number,
        rows: {
          type: Number,
          default: 3
        },
        hint: String,
        options: Array,
        // 表单验证的验证规则，据此规则在validator.js中查找
        test: String,
        // 表单验证的正则表达式，优先级高于test，用于个性化验证
        pattern: [String,Function],
        prefix: {
          type: String,
          default: ''
        },
        visible: {
          type: Boolean,
          default: true
        }
      },
    data: function() {
      return {
        // 标识：表示此组件为控件
        isField:true,
        valid: true,
        warning: false,
        // value的初始值由props text决定
        value: this.text || '',
        // 由验证器输出的验证规则help
        help: '',
        // help弹窗是否需要逗留一段时间
        linger: false,
        // 控件是否可见
        // visible: true
      }
    },
    components: {
      
    },
    computed: {
      changed:
        function() {
          return this.value !== this.text;
        }
    },
    watch: {
      value:
        function() {
          this.validate();
          this.$emit('change', this);
        },
      text:
        function() {
          this.value = this.text || '';
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
      // valid: 
      //   function() {
      //     // 验证成功后触发成功事件
      //     this.valid && this.$emit('validated', this.value);
      //   }

    },

    methods: {
      focus: 
        function() {
          this.$refs.field.focus();
          if(this.prefix && this.value.indexOf(this.prefix) === -1) {
            this.value = this.prefix + this.value || '';  
          }
        },
      onDelete:
        function() {
          if(!this.value) {
            this.value = this.prefix || '';
          }
        },
      validate: 
        function() {
          
          // 单个form表单元素的验证
          // 其余输入都视为字符串输入，根据验证规则进行验证
          var empty = !this.value;
          // 如果指定了个性化的pattern，那么优先采用pattern来验证
          // pattern可以是验证函数，也可以是一个正则表达式
          if(this.pattern) {
            if(this.required || !empty) {
              if (this.pattern instanceof Function) {
                this.valid = this.pattern(this.value) 
              }
              if (typeof this.pattern === 'string') {
                var regex = new RegExp(this.pattern)
                this.valid = regex.test(this.value)
              }  
            }else {
              this.valid = true;
            }
            
            return this.valid;
          }

          // 如果没有指定pattern，那么使用test规则进行验证
          // 如果元素是required，那么要进行验证，如果元素不是required但是设定了验证规则，在用户填入值后仍然需要进行验证
          if(this.required && typeof this.test === 'string' || !empty && typeof this.test === 'string') {
            this.valid = validator.validate(this.value || '',this.test);
            this.help = validator.hint(this.test);
          }else if(this.required && !this.value) {
            // 如果没有test，但是是required，那么当值为空时验证不通过
            this.valid = false;
          }else {
            this.valid = true;
          }   

          return this.valid;
        }
    }
  }
</script>