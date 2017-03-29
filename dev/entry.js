var Vue = require('vue/dist/vue.common.js');
// var Vuex = require('vuex');

var Circles = require('./circles.vue');
var Counter = require('./counter.vue')

Vue.component('circles', Circles);
Vue.component('counter', Counter);

window.inst = new Vue({

  el: '#page-root',
  data: {
    greetings: 'Hello, webpack',
    score: 0
  },
  components:
    {
      'counter': Counter
    },
  methods: {
    startGame:
      function () {
        this.$refs.circles.render();
        this.$refs.counter.start();
      },
    gameOver:
      function() {
        this.$refs.circles.reset();
        this.score = this.$refs.circles.hits * 10;
      }
  }

});