<template>
  <span>{{time}}</span>
</template>

<script>
  module.exports = {
    data:
      function() {
        return {
          time: 10,
          counting: undefined
        }
      },
    methods: {
      start:
        function() {
          var that = this;
          that.time = 10;
          clearInterval(that.counting);
          that.counting = 
            setInterval(function(){
              
              that.time -= 1;
              if(that.time <=0) {
                clearInterval(that.counting);
                that.$emit('time-up');
                that.time = 10;
              }
            }, 1000);
        }
    }
  };
</script>