var Vue = require('vue');

// var OneInput = require('widgets/inputs/input.vue');
var OneButton = require('widgets/button/button.vue');
// var Checkset = require('widgets/inputs/checkset.vue');

var OneText = require('widgets/inputs/text.vue');
// var ChooseFile = require('widgets/inputs/choose-file.vue') ;
// var OneSelect = require('widgets/inputs/select.vue');
// var Check = require('widgets/inputs/checkbox.vue');

// Vue.component('one-input', OneInput);
Vue.component('one-button', OneButton);
Vue.component('checkset', Checkset);

Vue.component('checkbox', Check);
Vue.component('one-text', OneText);
Vue.component('choose-file', ChooseFile);
Vue.component('one-select', OneSelect);

window.vm = new Vue({
  el: '.container-text',
  data: {
    deliveryAddr: {
      firstname: 'Michael',
      lastname: 'L',
      country: 'us',
      street1: '7 Diamond Street',
      street2: '',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94114',
      phone: '5624347378'
    }
  },
  methods: {
    onSubmit:
      function() {
        console.log('submitting')
      }
  }
});