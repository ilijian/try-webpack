<template>
  <div class="margin-anti choose-store">
    <h2 class="padding-set">Choose your country or region</h2>
    <p class="padding-set">Products may have different prices and availability based on country/region.</p>
    <dl>
      <template v-for="region in regions">
        <dt class="padding-set">{{region.group}}</dt>
        <dd>
          <ul class="list-unstyled padding-set clearfix row">
            <li class="row col-xs-12 col-sm-6" v-for="store in region.stores">
              <a 
                class="col-xs-6 link" 
                :href="store.link" 
                :data-name="store.name" 
                :data-code="store.code" 
                :data-lang="store.lang" 
                :data-cur="store.cur" 
                :data-value="store.value">
                <i :class="[store.code.replace('_','-')]"></i>
                {{store.name}}
              </a>
              <span class="col-xs-3">{{store.lang}}</span>
              <span class="col-xs-3">{{store.cur}}</span>
            </li>
          </ul>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
  var regions = require('./regions.json');

  module.exports = {
    data: function() {
      return {
        regions: regions
      }
    }
  }
</script>

<style lang="sass">
  @import "assets/styles/essentials";
  @import "assets/styles/sprites/header-stores-sprites";

  .choose-store{
    padding:30px 0 20px 0;
    background:#fff;
    border-radius: 5px;

    @include sprites($spritesheet-sprites);
    @include retina-sprites($retina-groups);

    .padding-set{
      padding:0 40px;
      @include viewport-narrower-than (600px) {
        padding:0 20px;
      }
      @include viewport-narrower-than (400px) {
        padding:0 10px;
      }
    }

    h2{
      font-size:18px;
      color:#000;
      margin-bottom:10px;
    }

    p{
      margin-bottom:10px;
    }

    dl{
      dt{
        height:30px;
        line-height:30px;
        background:#efefef;
        color:#000;
        margin-bottom:15px;
      }
      dd{
        li{
          margin-bottom:10px;
          white-space: nowrap;
          a{
            color:#0099cc;
            &:hover{
              color:#eb0028;
            }
            i{
              width:31px;
              height:21px;
              display:block;
              float:left;
              margin-right:15px;
            }
          }
        }
      }
    }

    @include viewport-narrower-than (500px) {
      dl{
        font-size:12px;
        dd{
          li{
            a{
              i{
                margin-right:6px;
              }
            }
          }
        }
      }
    }
  }
</style>