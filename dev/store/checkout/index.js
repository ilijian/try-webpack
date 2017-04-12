var Vue = require('vue/dist/vue.common.js');

var OneCheckbox = require('widgets/inputs/checkbox.vue');

// var img = require('assets/images/demo/large2x.png');

new Vue({
  el: '#page-root',
  data: {
    msg: 'Hello Webpack Multi pages'
  },
  components: {
    'one-checkbox': OneCheckbox
  }
});