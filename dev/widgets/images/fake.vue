<style lang="sass">
  @import "public/styles/essentials";

  @mixin render-responsive-images($image-path,$image-type:'jpg') {
    //background-size: contain;
    background-size: cover;//changed by amos
    background-repeat: no-repeat;
    // 最大屏幕的图片
    @include viewport-wider-than(1398px) {
      background-image: url($image-path + '/large.'+$image-type);
      @include image-set(url($image-path + '/large.'+$image-type),url($image-path + '/large2x.'+$image-type));
      // padding-bottom: percentage(image-height($image-path + '/large.'+$image-type) / image-width($image-path + '/large.'+$image-type));
      padding-bottom: percentage(769.5 / 1368);
    }

    // 默认情况下的图片
    // @include image-set(url($image-path + '/medium.jpg'),url($image-path + '/medium.jpg'));
    background-image: url($image-path + '/medium.'+$image-type);
    // padding-bottom: percentage(image-height($image-path + '/medium.'+$image-type) / image-width($image-path + '/medium.'+$image-type));
    padding-bottom: percentage(769.5 / 1368);

    // 小屏幕的图片，通常是pad
    @include viewport-narrower-than(1068px) {
      background-image: url($image-path + '/small.'+$image-type);
      @include image-set(url($image-path + '/small.'+$image-type),url($image-path + '/small2x.'+$image-type));
      // padding-bottom: percentage(image-height($image-path + '/small.'+$image-type) / image-width($image-path + '/small.'+$image-type));
      padding-bottom: percentage(769.5 / 1368);
    }

    // 最小屏幕的图片，通常是mobile
    @include viewport-narrower-than(736px) {
      background-image: url($image-path + '/xsmall2x.'+$image-type);
      @include image-set(url($image-path + '/xsmall2x.'+$image-type),url($image-path + '/xsmall2x.'+$image-type));
      // padding-bottom: percentage(image-height($image-path + '/xsmall.'+$image-type) / image-width($image-path + '/xsmall.'+$image-type));
      padding-bottom: percentage(680 / 408);
    }

    @include viewport-narrower-than(480px) {
      background-image: url($image-path + '/xsmall.'+$image-type);
      @include image-set(url($image-path + '/xsmall.'+$image-type),url($image-path + '/xsmall2x.'+$image-type));
      // padding-bottom: percentage(image-height($image-path + '/xsmall.'+$image-type) / image-width($image-path + '/xsmall.'+$image-type)); 
      padding-bottom: percentage(680 / 408);
    }
  }

  .image-demo {
    @include render-responsive-images('/assets/images/demo', 'png');
  }
</style>