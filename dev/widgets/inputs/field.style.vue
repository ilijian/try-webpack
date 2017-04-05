<style lang="sass">
  @import "./assets/styles/essentials";
  $bg-gray: #f3f3f3;
  $bg-invalid: #fed9d9;
  $bg-warning: #fff9df;

  .field-pack {
    font-size: $font-size-base;
    margin-bottom: 15px;

    .field-label {
      display: none;
    }

    .field {
      position: relative;

      .input {
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: $input-height-base; // Make inputs at least the height of their button counterpart (base line-height + padding + border)
        padding: 8px 16px;
        font-size: $font-size-base;
        // line-height: $input-height-base;
        line-height: $input-height-base - 2 * 8px;
        color: $text-black;
        background-color: $bg-gray;
        background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
        border: 1px solid transparent;
        border-radius: $border-radius-base;
        // @include box-shadow(inset 0 1px 1px rgba(0,0,0,.075));
        @include transition(border-color ease-in-out .15s, box-shadow ease-in-out .15s);
        box-shadow: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        // Customize the `:focus` state to imitate native WebKit styles.
        // @include form-control-focus;

        // Placeholder
        @include placeholder;

        // Unstyle the caret on `<select>`s in IE10+.
        &::-ms-expand {
          border: 0;
          background-color: transparent;
        }

        // Disabled and read-only inputs
        //
        // HTML5 says that controls under a fieldset > legend:first-child won't be
        // disabled if the fieldset is disabled. Due to implementation difficulty, we
        // don't honor that edge case; we style them as disabled anyway.
        &[disabled],
        &[readonly],
        fieldset[disabled] & {
          background-color: $input-bg-disabled;
          opacity: 1; // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655
        }

        &[disabled],
        fieldset[disabled] & {
          cursor: $cursor-disabled;
        }
        
        &:hover,
        &:focus {
          outline: none;
          @extend %box-shadow-base;
        }
      }
    }

    &.has-warning {
      .field {
        .input {
          border-color: $bg-warning;
          background-color: $bg-warning; 
        }
      }
      .get-help {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAsVBMVEUQGCD////d3uCdoKMVHSQWHSVESlB/g4ckKzKtsLMaIio7Qkjz8/Rvc3gmLTTQ0tNuc3cjKjFARk1tcnf4+Pj09PXc3d/39/cYICg9Q0re3+Ctr7JxdXolLDMZISksMzpDSU9wdHmbnqH29vYXHiYUHCM1O0JQVltscXbb3d7T1NY8Q0nFx8l0eX6srrGNkJSMkJN+goYtNDvp6epRV1ymqaxfZGny8vN1en6AhIj///8WvdlvAAAAO3RSTlP/////////////////////////////////////////////////////////////////////////////AKHEOx4AAAEGSURBVHgBjdNncoMwEIbhb2UhEBgbg417d3rvie5/sDghQYsGSJ7f74xmtLswpZFeqOXhsFQLPTKlMhBJiFKYCCcYfnio8PwhD2ZTwDUVNuj3UKPX/w1EgFqBKILxFRpE4+/Ah7VO0zUs/yuYSVgdog4sKY5BguYAmUE3bAvCLjTaAmjE7UEMBW5HtAOnMAB3R3QPbgAP3DvRDTjPCZ6JzpxgAG6SphPnCYVWCjFaxdDgTm9fHsFp56svia7BrLowGZgnogtnWEZIWOf7t1dYMncXBt4JmIdi5SI0iPZ/Le0/1/5I1LwSicrp+RIVkp1eIU9WbGZZbn7w859vN4GUwWY7Z+f/CaNzMdXaZ24kAAAAAElFTkSuQmCC");
      }
    }
    &.invalid, &.invalid.has-warning {
      .field {
        .input {
          // border-color: lighten($text-red,30%);
          border-color: $bg-invalid;
          background-color: $bg-invalid;
        }
      }
      .get-help {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAmVBMVEUQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAQGCAgJy8wNz5ARk1QVltgZWpwdHmAhIiPk5efo6avsrW/wcTP0dLf4OHv8PD////yBrtvAAAAI3RSTlMACAkKDA0jJCUyV1iIiYqYmZqbnMjJz9DR6Onq6/T19vj5+nYITrIAAAEVSURBVHgBhdLrcqpQDAXg4MGDYqly0aKIlb1A6wWLef+H61A7wYAM3781O5MEJtSw3Xm02e830dy1qcsJUog0cEiz3jIomWfRk/8rdKwcEtM1XlhPZXyCl5K/HqMP9IhHVPPQy/td0EgurhVX5QHC1EMCiQfme3ljPkGERONUUsWXHDgyNz3SMbkSjvyN2pXPEC75TUH56H3iC4RPEdpu/AUR0RYtF65yiC1lnfd7gUbWLjjrd2StEfldv2PbWvLIVygR+Sqf+AzFJ1ePKHIorvzqh+KgV9iNiUL9kSWehUTkmP4CMxk4mHeqjWL0iP8NH+3A2QsnRkfs0BPLM1CMZ5E2CXYQn+GEuuzZYpkYkywXM5vEDxjqb0sLOU3xAAAAAElFTkSuQmCC");
      }
    }
  }

  .get-help {
    visibility: hidden;
    position: absolute;
    width: 0.4 * $input-height-base;
    height: 0.4 * $input-height-base;
    right: 0.3 * $input-height-base;
    // background-color: $text-black;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0.3 * $input-height-base;
    border-radius: 50%;
    cursor: pointer;
    transition: $overall-transition-duration;
    // &:hover {
    //   background-color: black;
    // }
  }

  .help {
    display: none;
    @extend %box-shadow-base;
    background-color: $text-white;
    $border-color: rgba(0,0,0,.2);
    padding: 10px 16px 12px 16px;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    position: absolute;
    // left: 0;
    max-width: 100%;
    right: 0;
    top: $input-height-base + 5px;
    z-index: 9;

    .arrow {
      position: absolute;
      top: -10px;
      right: 10px;
      height: 10px;
      width: 20px;
      overflow: hidden;
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        background-color: $text-white;
        border: 1px solid $border-color;
        transform: rotate(45deg);
        position: absolute;
        top: 5px;
        left: 1px;
      }  
    }
    
  }

  .invalid, .has-warning {
    
    .get-help {
      visibility: visible;

      &:hover + .help {
        display: block;
      }
    }

    .field.focus, .field:focus {
      .help {
        display: block;
      }
    }
  }
</style>