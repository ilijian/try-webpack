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
    <legend v-if="title">{{title}}</legend>
    <div class="field-group">
      
      <checkbox v-for="(field,i) in fields" ref="fields"
        @change="onChange"
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

<script>

  var Checkbox = require('widgets/inputs/checkbox.vue');

  module.exports =
    {
      props: 
        {
          // 样式属性，控件的label是堆叠还是与控件水平
          stack: {
            type: Boolean,
            default: false
          },
          // Checkbox 组的组名
          title: String,
          // 组件的id
          id: {
            type: String,
            required: true
          },
          // Checkbox组的name
          name: {
            type: String,
            required: true
          },
          // 组件的值
          value: Array,
          required: Boolean,
          readonly: Boolean,
          disabled: Boolean,
          // 渲染Checkbox所需的数据
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
            isCheckset: true,
            valid: true,
            // 控件是否可见
            visible: true
          }
        },
      computed: {
        // 选择的值
        // value: {
        //   cache: false,
        //   get: 
        //     function() {
        //       var value = [];
        //       for(var i=0; i<this.$children.length; i++) {
        //         var $child = this.$children[i];
        //         $child.$refs.field.checked && value.push($child.value);
        //       }
        //       if(this.type === 'radio') {
        //         return value && value[0];
        //       } else {
        //         return value
        //       }
        //     },
        //   set: function(value) {
        //     if(!value instanceof Array) {
        //       value = new Array(value);
        //     }

        //     for(var i=0; i<this.$children.length; i++) {
        //       var $child = this.$children[i];
        //       if(value.indexOf($child.value) !== -1) {
        //         $child.$refs.field.checked = true;
        //       }else {
        //         $child.$refs.field.checked = false;
        //       }
        //     }
        //   }
        // }

      },
      watch:
        {
          // value:
          //   function() {
          //     console.log('asgsdg')
          //     validate();
          //   }
        },
      components:
        {
          'checkbox': Checkbox
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
            },
          onChange:
            function() {
              // 校验
              this.validate();
              // 触发input事件，并且将组件的value传过去
              var value = [];
              for(var i=0; i<this.$refs.fields; i++) {
                var field = this.$refs.fields[i];
                value.push(field.value);
              }
              this.$emit('input',value);
            }
        }
    }
</script>