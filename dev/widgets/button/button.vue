<template>

  <a
    :href="href" 
    :class="['one-button',{'handling': loading, 'retrying': tried}]" 
    @click.prevent="onclick" 
    :disabled="disabled">
    <slot></slot>
  </a>

</template>

<script>
  module.exports = {
    props: {
      // 是否允许用户多次点击，默认启用，并且阻断时长为2000ms
      block: {
        type: [Number,Boolean],
        default: 2000
      },
      href: {
        type: String,
        default: "#"
      },
      type: String,
      retry: String,
      warning: String
    },
    data: function() {
      return {
        loading: false,
        disabled: false,
        base: [5,10,25,25,35,50,60],
        tried: 0
      };
    },
    methods: {
      onclick: function() {
        this.$emit('btn-click');
        this.debuzz();
        this.tryAgain();
      },
      debuzz: function() {
        // @Desc: 防止多次点击，默认启用，当属性值block为false时禁用
        // 默认阻断时间为两秒，可以在属性值block中指定阻断时间，单位为毫秒
        
        if(this.block === false || this.retry) {
          // 当主动禁用block时，或者启用retry时，不予处理
          return;
        }

        var that = this;
        this.disabled = true;
        this.loading = true;
        
        var blockTime = this.block;

        setTimeout(function() {
          that.disabled = false;
          that.loading = false;
        },blockTime);
      },
      tryAgain: function() {
        if(!this.retry) {
          // 如果没有设定retry属性，不启用retry
          return;
        }

        // button进入retry状态，显示限流信息，并且会每隔3到10秒重新触发一次click事件，通常会导致请求的重新发送
        var that = this;

        that.disabled = true;
        that.tried += 1;
        that.$emit('btn-retry-start', that.warning);

        var tryInXms = Math.random() * 10000 - 5000 + that.base[that.tried] * 1000;
        
        that.retrieve = setTimeout(function(){

          that.tried += 1;
          if(that.tried >= that.base.length) {
            // 尝试多次仍未成功后停止尝试
            that.tried = 0;
            that.disabled = false;
            that.$emit('btn-retry-end');
            return;
          }
          that.disabled = false;
          // 本次尝试开始，触发按钮的click事件
          that.onclick();
          that.disabled = true;
        }, tryInXms);

      }
    }
  }
</script>

<style lang="sass">

  @import "public/styles/essentials";

  $border-radius-base: 2px;
  $btn-border-width: 1px;

  @mixin make-color($bg-color: $text-red) {
    background-color: $bg-color;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0 - $btn-border-width;
      left: 0 - $btn-border-width;
      z-index: -1;
      width: 0;
      height: 100%;
      height: calc(100% + #{2 * $btn-border-width});
      @include transition($overall-transition-duration);
      background-color: $bg-color;
      border-radius: $border-radius-base;
    }
    
    @if(lightness($bg-color) > 50%) {
      color: $text-black;  
      &:hover,
      &:focus,
      &.focus,
      &.retrying:after {
        color: $text-black;
      }
    }@else {
      color: $text-white;  
      &:hover,
      &:focus,
      &.focus 
      &.retrying:after {
        color: $text-white;
      }
    }

    &:hover,
    &:focus,
    &.focus {
      
      &:before {
        background-color: darken($bg-color, 10%);
        width: 100%;
        width: calc(100% + #{2 * $btn-border-width});
        @include viewport-xs {
          visibility: none;
        }
      }
    }

    &.retrying {
      &,
      &:hover,
      &:focus,
      &.foucs,
      &:active, &:active {
        color: transparent !important;
        &:after {
          content: attr(data-retry);
          display: block;
          width: 100%;
          position: absolute;
          top: 50%;
          left:50%;
          transform: translate(-50%, -50%);
          text-align: center;
          @if(lightness($bg-color) > 50%) {
            color: $text-black;  
          }@else {
            color: $text-white;  
          }
        }
      }
    }

  }

  @mixin make-size ($font-size: $text-base) {
    font-size: $font-size * 100 / 1920px * 1vw;
    @include viewport-narrower-than(12px / $font-size * 1920px ) {
      font-size: 12px;
    }
    line-height: 2.5;
    padding: 0 2em;
  }

  @mixin make-ghost-color($border-color: $text-red) {
    $darken-border: darken($border-color,10%);
    background-color: transparent;
    border-color: $border-color;
    color: $border-color;
    @include transition($overall-transition-duration);

    &:before {
      content: '';
      // background-color: darken($border-color, 10%);
      background-color: $darken-border;
    }

    &:hover,
    &:focus,
    &.focus {
      @if(lightness($darken-border) > 50%) {
        color: $text-black;  
      }@else {
        color: $text-white;
      }
      
    }
  }

  .one-button {
    display: inline-block;
    margin-bottom: 0; // For input.btn
    font-weight: $text-normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
    border: 1px solid transparent;
    white-space: nowrap;
    @include make-size($font-size-base);
    border: 1px solid transparent;
    @include user-select(none);
    text-decoration: none;
    position: relative;
    z-index: 1;
    border-radius: $border-radius-base;

    &,
    &:active,
    &.active {
      &:focus,
      &.focus {
        @include tab-focus;
        
      }
    }

    &:hover,
    &:focus,
    &.focus {
      color: $btn-default-color;
      text-decoration: none;
      outline: 0;
      @extend %box-shadow-base;
    }

    &:active,
    &.active {
      outline: 0;
      background-image: none;
      @include box-shadow(inset 0 3px 5px rgba(0,0,0,.125));
    }

    &.disabled,
    &[disabled],
    fieldset[disabled] & {
      cursor: $cursor-disabled;
      @include opacity(.65);
      @include box-shadow(none);
    }

    // 添加loading动画
    &.handling {
      &,
      &:hover,
      &:focus,
      &.focus {
        color: transparent !important; 
        &:after {
          content: '';
          display: block;
          width: 1em;
          height: 1em;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          // background-image: url("/assets/images/misc/loading.gif");
          background-image: url(data:image/gif;base64,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);
          background-repeat: no-repeat;
          background-size: contain;
        } 
      }
    }

    // 去掉shadow效果
    &.no-shadow, &.shadow-clean {
      &,
      &:hover,
      &:focus,
      &.focus,
      &:active,
      &.active {
        box-shadow: none;
      }
    }

  }

  // Color System
  .btn-red {
    @include make-color();
  }

  .btn-black {
    @include make-color($bg-color: $text-black);
  }

  .btn-white {
    @include make-color($bg-color: $text-white);
  }

  // Ghost buttons
  .btn-ghost {
    
    &.btn-red {
      @include make-ghost-color();
    }

    &.btn-white {
      @include make-ghost-color($border-color: $text-white);
    }

    &.btn-black {
      @include make-ghost-color($border-color: $text-black);
    }
    
  }

  // Size system

  .btn-xl {
    @include make-size($text-base-xl);
  }

  .btn-lg {
    @include make-size($text-base-lg);
  }
  .btn-sm {
    @include make-size($text-sm);
  }
  .btn-xs {
    @include make-size($text-min); 
  }
</style>