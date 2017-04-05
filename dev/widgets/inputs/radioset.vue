<style lang="sass" scoped>
  @import "assets/styles/essentials";
  @import "field";
  @import "pickset";
</style>

<template>
  <fieldset 
    @change="validate"
    :class="['check-set',{'stack': stack, 'invalid': !valid, 'hidden': !visible}]"
    :required="required"
    :readonly="readonly"
    :disabled="disabled"
    >
    <legend >{{title}}</legend>
    <div class="field-group">
      
      <checkbox v-for="(field,i) in fields"
        :type="type"
        :id="field.id || id + '-' + i"
        :name="name || field.name"
        :label="field.label"
        :required="field.required"
        :readonly="readonly || field.readonly"
        :disabled="disabled || field.disabled"
        :checked="field.checked"
        :value="field.value"
        ></checkbox>

      <span class="get-help"></span>
      <div class="help">
        <span class="arrow"></span>
        <p class="text-red">{{hint}}</p>
      </div>
      
    </div>
  </fieldset>
</template>

<!-- <div :class="['field-pack',{'invalid': !valid}]" v-for="(field,i) in fields">
        <input class="input-checkbox" ref="field" v-model="value"
          :type="type"
          :id="field.id || id + '-' + i"
          :name="name || field.name"
          :required="field.required"
          :readonly="readonly || field.readonly"
          :disabled="disabled || field.disabled"
          :checked="field.checked">
        <label class="checkbox-puppet" 
          :for="field.id || id + '-' + i">{{field.label}}</label>
      </div> -->



<script>

  var Radio = require('widgets/inputs/radio.vue');

  module.exports =
    {
      props: 
        {
          // 样式属性，控件的label是堆叠还是与控件水平
          stack: {
            type: Boolean,
            default: false
          },
          // 一组checkbox的名称
          title: String,
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
          // 用于生成checkbox列表的数组
          // [
          //   {
          //     label: 'A',
          //     value: 'a'
          //   },
          //   {
          //     label: 'B',
          //     value: 'b',
          //     required: true
          //   }
          // ]
          fields: {
            type: Array,
            required: true
          },
          // 表单组验证出错提示
          hint: String
        },
      data:
        function() {
          return {
            isRadioset: true,
            valid: true,
            // 控件是否可见
            visible: true
          }
        },
      computed: {
        // 选择的值
        value: {
          cache: false,
          get: 
            function() {
              var value = [];
              for(var i=0; i<this.$children.length; i++) {
                var $child = this.$children[i];
                $child.$refs.field.checked && value.push($child.value);
              }
              if(this.type === 'radio') {
                return value && value[0];
              } else {
                return value
              }
            },
          set: function(value) {
            if(!value instanceof Array) {
              value = new Array(value);
            }

            for(var i=0; i<this.$children.length; i++) {
              var $child = this.$children[i];
              if(value.indexOf($child.value) !== -1) {
                $child.$refs.field.checked = true;
              }else {
                $child.$refs.field.checked = false;
              }
            }
          }
        }

      },
      watch:
        {
          value:
            function() {
              console.log('asgsdg')
              validate();
            }
        },
      components:
        {
          'radio': Radio
        },
      methods:
        {
          validate: 
            function() {

              this.valid = true;
              var hasChecked = false;
              for(var i=0; i<this.$children.length; i++) {
                var $child = this.$children[i];
                this.valid = this.valid && $child.valid;
                if($child.checked) {
                  hasChecked = true;
                }
              }

              // 如果一个都没选，并且是必须的，那么验证结果为失败
              if(!hasChecked && this.required) {
                this.valid = false
              }

              return this.valid;
            }
        }
    }
</script>