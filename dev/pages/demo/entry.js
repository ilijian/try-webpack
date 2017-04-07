require('assets/scripts/base.js');

var Vue = require('vue/dist/vue.common.js');

var OneButton = require('widgets/button/button.vue');

// var FakeImage = require('widgets/images/fake.vue');

require('pages/demo/inline.inline.js');
require('pages/demo/inline.inline.scss');

require('assets/styles/fonts.css');

new Vue({
  el: '#page-root',
  data: {
    msg: 'Hello Webpack Multi pages'
  },
  components: {
    'one-button': OneButton
  }
});