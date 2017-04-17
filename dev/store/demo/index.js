'use strict';

require('assets/scripts/base.js');
require('assets/styles/fonts.css');

var Vue = require('vue');

// console.log(__('OnePlus 3T'));

new Vue({
  el: '#page-root',
  // template: '<layout-base><main-section/></layout-base>',
  components: {
    'main-section': require('./main.vue'),
    'one-header': require('modules/header/header.vue'),
    'one-footer': require('modules/footer/footer.vue')
  }
})