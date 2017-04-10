require('assets/scripts/base.js');
require('assets/styles/fonts.css');

var Vue = require('vue/dist/vue.common.js');

new Vue({
  el: '#page-root',
  // template: '<layout-base><main-section/></layout-base>',
  components: {
    'main-section': require('./index.vue'),
    'layout-base': require('layouts/layout-base.vue')
  }
})