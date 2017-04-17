<template>
  <header>
    <div class="container-infinite overflow-visible top-header">
      <nav class="nav container-text">
        <ul class="list-inline nav-left">
          <li class="brand">
            <a href=""><span class="ico ico-brand"></span></a>
          </li>
          <li class="icon show-menu">
            <a class="btn-collapsed as-show-menu" href="" data-target=".js-off-canvas.js-menu" id="store-nav"></a>
          </li>
        </ul>
        <ul class="list-inline nav-pages">
          <li class="brand"><a href="https://oneplus.net/ca_fr" id="home-link-xs"><span class="i-logo"></span></a></li>  
          <li class="page"><a href="https://oneplus.net/ca_fr/3t" track-key="5c69d033cf897d3942c0f0688f6c35b82" et-attached="1" without-text-key="def6a86d85a6af4ee10ff4b3a6a0c0d3">OnePlus 3T</a></li>
          <li class="page"><a href="https://oneplus.net/ca_fr/3" track-key="8f6d2be34f581f370a01ad169da5f76a2" et-attached="1" without-text-key="75aaab8fb345b45b27a8d203fde00a6e">OnePlus 3</a></li>
          <li class="page"><a class="family-show-trigger" data-target=".family-show" href="https://oneplus.net/ca_fr/store" track-key="f0c6600c5927861384aeeebc0e62aaa2" et-attached="1" without-text-key="ec9e2d2e8c5498b1507c8cda604cbd55">Store</a></li>
          <li class="page"><a href="https://oneplus.net/ca_fr/support" track-key="5332fc8fa960b926b9e6d65b8729ef712" et-attached="1" without-text-key="4125832bb7f84678ed980f60bb807e24">Support</a></li>
          <li class="page"><a href="//forums.oneplus.net/" track-key="0049b33800a1a5831ce3b706900fdaa2" et-attached="1" without-text-key="db8f85f27f9055676d9e83b96d109da2">Community</a></li>
        </ul>
        <ul class="list-inline nav-right">
          <li class="icon choose-store">
            <a href="javascript:;" class="as-choose-store" id="choose-store"><span class="country-icon country-icon-ca_fr"></span></a>
          </li>
          <li class="icon shop-basket">
            <a class="js-cart as-show-user-info" id="show-user-info" href="javascript:;"><i class="ico ico-bag show-number" data-quantity="0"></i></a>
          </li>

          <!-- <li class="icon top-header-account">
            <a class="logined" href="/customer/info" id="my-account"><i class="icon-account"></i></a>
            <div style="display: none;" class="user-info-menu">
              <a class="first" href="https://oneplus.net/ca_fr/customer/info" track-key="f50b123d78be8d21bc46e16614f93347" et-attached="1" without-text-key="6a00a6ed5d97e3ffa4007c7ccbfbd5e3">My account</a>
              <a href="https://oneplus.net/ca_fr/sales/order/history" track-key="3f425a9004a564bd88f574bc0c6d7d17" et-attached="1" without-text-key="90d26248272ed03078e55a32e856b846">My orders</a>
              <a href="https://oneplus.net/ca_fr/customer/address" track-key="1a52267b5568958254caf78cf6df3420" et-attached="1" without-text-key="5d595e790fc74074af61d5eb561ea959">My addresses</a>
              <a href="https://account.oneplus.net/onepluslogout" id="logOutBtn" track-key="b21c94fa82b9bbe7bd7c1667f7f18949" et-attached="1" without-text-key="b459bdfba96454562489b25013a5d453">Log out</a>
            </div>
          </li> -->
        </ul>
      </nav>
    </div>
    <choose-store></choose-store>
  </header>
</template>

<script>
  module.exports = {
    components: {
      'choose-store': require('./choose-store.vue')
    }
  }
</script>

<style lang="sass">
  @import "assets/styles/essentials";
  @import "assets/styles/fonts/one";

  $header-top: 40px;
  $header-height: 60px;
  $header-height-xs: 50px;
  $brand-left-padding: 30px;
  $brand-left-padding-xs: 10px;
  $page-left-padding: 35px;
  $icon-left-padding: 15px;
  $header-bottom: $header-top + $header-height;

  body.has-hint-bar {
    position: relative;
    top: $header-height-xs;
  }

  .promo-hint-bar {
    line-height: $header-height-xs;
    padding: 0 30px;
    position: absolute;
    top: 0 - $header-height-xs;
    left: 0;
    right: 0;
    z-index: 10;
    // background-color: #d3d4d4;
    color: $text-white;
    // background-image: image-url('events/christmas-2015/christmas-count-bg.jpg');
    background-color: $text-red;
    font-size: $text-base;

    .btn-remove-hint {
      line-height: 24px;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      margin-top: ($header-height-xs - 24px) * 0.5;
      background-color: $text-white;
      position: absolute;
      top: 0;
      right: 30px;
      @include viewport-xs {
        right: 20px;
      }

      &:after, &:before {
        content: '';
        display: block;
        border-top: 1px solid $text-gray;
        border-bottom: 1px solid $text-gray;
        height: 0;
        width: 16px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -1px;
        margin-left: -8px;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  /* .item-icon {
    @extend .icon-brand;
  } */


  $icon-size: 22px;
  $after-size: $icon-size * 0.8;

  header {
    height: $header-height;
    position: relative;
    z-index: $z-index-max - 3;
    background: $text-white;
    max-width: 100%;
    // 不可以使用 overflow: hidden，使用后store的下拉菜单不能出来
    // overflow: hidden;

    @include viewport-narrower-than ($header-breakpoint) {
      height: $header-height-xs;
      left: 0;
      right: 0;
      top: 0;
    }

    .nav {
      white-space: nowrap;
      text-align: center;
    }

    .nav>ul {
      margin: 0;
      list-style: none;
      text-align: center;
      height: $header-height;
      display: inline-block;
      vertical-align: middle;
      vertical-align: top;
      @include viewport-narrower-than ($header-breakpoint) {
        position: relative;
        height: $header-height-xs;
        padding-right: 0;
      }

      font-size: 0;

      &.nav-left {
        float: left;

        .brand {
          @include viewport-narrower-than($header-breakpoint) {
            display: none;
          }
        }
      }

      &.nav-right {
        float: right;

        .choose-store {
          @include viewport-narrower-than ($header-breakpoint) {
            display: none;
          }
        }
      }

      &.nav-pages {
        // position: absolute;
        // top: 0;
        // left: 50%;
        // @include translate(-50%);

        .brand {
          display: none;
          @include viewport-narrower-than ($header-breakpoint) {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }

      >li {
        font-size: $text-base;
        padding: 0;
        margin: 0;
        &, &>a {
          display: inline-block;
          vertical-align: middle;
          vertical-align: top;
          line-height: $header-height;
          height: $header-height;
          min-width: $header-height;
          margin-right:-1px; //resolve white line between li elements
          @include viewport-narrower-than ($header-breakpoint) {
            min-width: $header-height-xs;
            line-height: $header-height-xs;
            height: $header-height-xs;
          }
        }

        &.brand {
          padding: 0;
          width: $header-height;
          @include viewport-narrower-than ($header-breakpoint) {
            width: $header-height-xs;
          }

          // .i-logo {
          //   background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNFQjAwMjkiIGQ9Ik03LjMsMTguOHYtMi4xaDIuMXYtNi4ySDcuM1Y4LjNoNC4ydjguM2gyLjF2Mi4xSDcuM3ogTTIwLjksMjRWMTAuNGgtMi4xdjExLjVIMi4xVjUuMmgxMS41VjMuMUgwVjI0SDIwLjl6DQoJIE0yMC45LDguM1Y1LjJIMjRWMy4xaC0zLjFWMGgtMi4xdjMuMWgtMy4xdjIuMWgzLjF2My4xSDIwLjl6Ii8+DQo8L3N2Zz4NCg==') no-repeat;
          //   display: inline-block;
          //   vertical-align: middle;
          //   width: 32px;
          //   height: 32px;
          //   background-position: center center;
          //   position: relative;
          //   top: -2px;
          //   @include viewport-narrower-than ($header-breakpoint) {
          //     width: 25px;
          //     height: 25px;
          //   }
          // }

        }

        &.page {
          @include viewport-narrower-than ($header-breakpoint) {
            display: none;
          }

          & > a {
            padding: 0 2.5em;
            color: $text-gray;
            text-decoration: none;
            transition: $overall-transition-duration;

            &:hover, &.active, &.expanded {
              color: $text-white;
              background: $text-red;
            }

            &.family-show-trigger {
              &:after {
                content: '';
                display: inline-block;
                vertical-align: middle;
                height: 0;
                margin-top: -0.1em;
                margin-left: 0.4em;
                border-top: $text-gray 0.6em solid;
                border-left: 0.45em transparent solid;
                border-right: 0.45em transparent solid;
                transition: $overall-transition-duration;
              }

              &.expanded {
                &:after {
                  transform: rotate(180deg);
                }
              }

              &:hover, &.active, &.expanded {
                &:after {
                  border-top-color: $text-white;
                }
              }

            }

          }
        }


        &.icon {
          // float: right;
          position:relative;
          >a {
            // padding: 0 $icon-left-padding;
            // padding: 0 $brand-left-padding-xs;
            text-decoration: none;
            cursor: pointer;
            font-size: 18px;
            color: #828282;
            transition: $overall-transition-duration;
            width: $header-height;
            @include viewport-narrower-than ($header-breakpoint) {
              width: $header-height-xs;
            }

            .icon-account, .icon-cart {
              position: relative;
              top: -2px;
            }
            .icon-account {
              vertical-align: middle;
            }

            .icon-cart {
              vertical-align: middle;
              &.not-empty:after {
                display: none;
                content: attr(data-quantity);
                position: absolute;
                width: $after-size;
                height: $after-size;
                top: 0 - $after-size * 0.5;
                right: 0 - $after-size * 0.5;
                color: $text-white;
                background: $text-red;
                line-height: $after-size;
                border-radius: 50%;
                text-align: center;
                font-size: 10px;
                font-family: Lato,"Lato Latin","Helvetica Neue", Helvetica, Arial, sans-serif;
              }
            }

            .country-icon{
                width: 31px;
                height: 21px;
                display: block;
                margin: auto;
                position: relative;
                top: 50%;
                margin-top: -10px;
                transform: scale(0.6);
            }

            &:hover {
              color: $text-black;
              cursor: pointer;
            }
          }

          .user-info-menu{
            display:none;
            position:absolute;
            left: 0;
            top: 100%;
            padding:10px;
            background-color:#f8f8f8;
            font-size:14px;
            opacity:0.85;
            width:136px;
            @include viewport-narrower-than (1050px) {
              width:148px;
            }

            a{
              padding:0 5px;
              height:32px;
              line-height:32px;
              display:block;
              text-align:left;
              white-space: nowrap;
              &:hover{
                background-color:#ddd;
              }
            }
            .first{
              display:none;
              @include viewport-narrower-than ($header-breakpoint) {
                display: block;
              }
            }
          }
          &.top-header-account.m-show{
            .user-info-menu .first{ display:block;}
          }
          @include viewport-narrower-than ($header-breakpoint) {
            //ipad and mobile
            &:nth-child(7){
              float: left;
            }
            &:nth-child(8){
              display: none
            }
            &:nth-child(9){
              float: right;
            }
            &:nth-child(10){
              display: none;
            }
            //float: right;
            //border-left: 1px solid $text-paper-gray;
          }
        }

        $link-margin-top: 0px;
        $bar-width: 22px;
        $bar-margin: 18px;

        &.show-menu {
          text-align: left;
          .btn-collapsed {
            display: none;
            margin-top: $link-margin-top;
            line-height: $header-height - $link-margin-top * 2;
            height: $header-height - $link-margin-top * 2;
            width: $header-height-xs;
            position: relative;
            transition: $overall-transition-duration;

            @include viewport-narrower-than ($header-breakpoint) {
              line-height: $header-height-xs - $link-margin-top * 2;
              height: $header-height-xs - $link-margin-top * 2;
            }

            &:before, &:after {
              content: "";
              display: block;
              width: $bar-width;
              position: absolute;
              left: 50%;
              margin-left: 0 - $bar-width / 2;
              transition: $overall-transition-duration;
            }

            &:before {
              height: $header-height - $link-margin-top * 2 - $bar-margin * 2;
              top: $bar-margin;
              border-top: 3px solid #666;
              border-bottom: 3px solid #666;
              @include viewport-narrower-than ($header-breakpoint) {
                height: $header-height-xs - $link-margin-top * 2 - $bar-margin * 2 + 3;
              }
            }

            &:after {
              top: 50%;
              height: 3px;
              background: #666;
            }

            &:hover {
              background: $text-red;
              &:before{
                border-color: $text-white;
              }
              &:after {
                background-color: $text-white;
              }
            }

            @include viewport-narrower-than ($header-breakpoint){
              display: inline-block;
              vertical-align: middle;
              vertical-align: baseline;
            }
          }
        }

      }
    }

    .family-show {
      // display: none;
      position: absolute;
      left: 0;
      width: 100%;
      background: $text-white;
      box-shadow: 0px 12px 10px -12px #aaa inset;
      text-align: center;
      .family-houses {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        max-width: 900px;
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: left;
        margin-bottom: 50px;

        @include make-row(0);

        .house {
          &.oneplus-2, &.oneplus-one, &.oneplus-x, &.phone {
            @include make-sm-column(2,0);
            h4{
              text-align:center;
            }

            figure {
              img{
                display: block;
                margin: 0 auto !important;
                float: none !important;
              }
              .item-icon {
                width: 75px;
                height: 95px;
                margin-right: 10px;
                float: left;
              }
            }
          }

          &.accessories {
            @include make-sm-column(6,0);
            padding-left:20px;

            .family-items {
              .item-icon {
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
                width: 20px;
              }
            }
          }

          h4 {
            margin-top: 50px;
            margin-bottom: 30px;
            line-height: 1;
          }

          .item-link {
            margin-top: 10px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
            &.active, &:hover {
              color: $text-red;
            }
          }

        }
      }
    }
  }

  body.bar-choose-store {

  }

  .top-header{
    overflow:visible;
    height: $header-height;
    @include viewport-narrower-than ($header-breakpoint) {
      height: $header-height-xs;
    }
  }
  header.special-top-header{
    height:auto;
    background:#fff;
    position:relative;
    top:0;
    left:0;
    right:0;
    width:100%;
    .top-header{
      position:relative;
      box-shadow: 0px -2px 10px #aaa;
    }
  }

  .header-placeholder {
    display: block;
    height: $header-bottom;
    @include clearfix;
    @include viewport-narrower-than ($header-breakpoint) {
      height: $header-height-xs;
    }
  }

  // .header-height-padding {
  //   padding-top: $header-bottom !important;
  //   @include viewport-narrower-than ($header-breakpoint) {
  //     padding-top: $header-height-xs !important;
  //   }
  // }

  .header-height-padding {
    padding-top: 0;
    @include viewport-narrower-than ($header-breakpoint) {
      padding-top: 0;
    }
  }

  .header-height-margin {
    margin-top: $header-bottom !important;
    @include viewport-narrower-than ($header-breakpoint) {
      margin-top: $header-height-xs !important;
    }
  }

  .header-padding {
    padding-left: $content-side-padding;
    padding-right: $content-side-padding;
    @include viewport-narrower-than ($header-breakpoint) {
      padding-left: 0;
      padding-right: 0;
    }
  }

</style>