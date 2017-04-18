var path = require('path');
var fs = require('fs');
var gulp = require('gulp');

var _ =
  {
    // 开发目录
    DEV: path.resolve(__dirname, 'dev'),
    // 临时目录
    TMP: path.resolve(__dirname, '.tmp'),
    // 临时目录
    CACHE: path.resolve(__dirname, '.cache'),
    // 发布目录
    DIST: path.resolve(__dirname, 'build'),
    // UI组件、css、html或者js组件
    WIDGET: path.resolve(__dirname, 'dev/widgets'),
    // 网站页面
    PAGE: path.resolve(__dirname, 'dev/pages'),
    // 业务模块组件
    MODULE: path.resolve(__dirname, 'dev/modules'),
    ROOT: path.resolve(__dirname)
  };


// 使用SVG生成 icon font
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

gulp.task('makefont', function(){

  var dirs = fs.readdirSync(path.join(_.DEV, 'assets/fonts/svgs'));

  for(var i=0; i<dirs.length; i++) {
    var dir = dirs[i];
    var dest = path.join(_.DEV, 'assets/fonts', dir);
    var stylePath = path.join(_.DEV, 'assets/styles/fonts', '_' + dir + '.scss');

    gulp.src([path.join(_.DEV, 'assets/fonts/svgs', dir, '*.svg')])
      .pipe(iconfontCss({
        fontName: dir,
        // path: path.join(_.DEV, 'assets/styles/fonts', '_' + dir + '.scss'),
        // 指定样式文件的存放地址
        targetPath: path.relative(dest,stylePath),
        // 样式文件中指向的字体文件地址
        fontPath: path.join('~assets/fonts',dir, '/'),
        cssClass: 'ico'
      }))
      .pipe(iconfont({
        normalize:true,
        fontHeight: 1001,
        fontName: dir, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
        // timestamp: runTimestamp, // recommended to get consistent builds when watching files
      }))
        .on('glyphs', function(glyphs, options) {
          // CSS templating, e.g.
          console.log(glyphs, options);
        })
      .pipe(gulp.dest(dest));
  }

  
});

// 生成雪碧图

var spritesmith = require('gulp.spritesmith');
var glob = require('glob');
// gutil = require('gulp-util');

gulp.task('makesprite', function () {
  var dirs = glob.sync(path.join(_.DEV, 'assets/images/**/sprites'));
  var imagePath = path.join(_.DEV, 'assets/images');

  for(var i=0; i<dirs.length; i++) {
    var dir = dirs[i];

    var name = path.relative(imagePath, dir).replace(new RegExp(path.sep,'g'), '-');

    var spriteData = 
      gulp.src(path.relative(__dirname,path.join(dir, '*.png')))
        .pipe(spritesmith({
          imgPath: path.join('~assets/images/$sprites',name + '.png'),
          retinaImgPath: path.join('~assets/images/$sprites',name + '2x.png'),
          imgName: name + '.png',
          cssName: '_' + name + '.scss',
          retinaSrcFilter: path.relative(__dirname,path.join(dir, '*@2x.png')),
          retinaImgName: name + '2x.png'
        }));

    var imgStream = spriteData.img
      .pipe(gulp.dest(path.join(_.DEV, 'assets/images/$sprites')));

    var cssStream = spriteData.css
      .pipe(gulp.dest(path.join(_.DEV, 'assets/styles/sprites')));

  }

});