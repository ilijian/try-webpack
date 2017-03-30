var path = require('path');
var glob = require('glob');
var HbsToHtmlPlugin = require('./plugins/HbsToHtml.js');

var entries = getEntry();

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry:  __dirname + "/dev/entry.js",//单一入口文件，也可以以传入对象或者数组的方式配置成多入口文件
  entry: entries,
  output: {
    //打包后的文件存放的根目录
    path: path.join(__dirname, 'build'),
    // filename: "entry.built.js"//打包后输出文件的文件名
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        // require vue 文件
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': 'vue-style-loader!css-loader!sass-loader',  //解析scss语法的loader
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax', //解析sass语法
            }
          }
        }
      },
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader'
        }
      },
      {
        test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
        use: 'json-loader', //具体loader的名称
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style!css?modules', //感叹号用户分割针对同一个test的不同loader，这样不同loader可以同时使用；?modules表示将css私有化，这样不用模块之间就户不会出现污染
      //   exclude: /node_modules/
      // }
    ]
  },

  plugins: [
    // 定制化Plugin，用于将定制化的hbs文件渲染成合法的html
    new HbsToHtmlPlugin()
  ].concat(configHtmlPlugins()),

  // webpack默认的本地开发服务器，但是仍然需要手动下载webpack-dev-server模块
  devServer: {
    contentBase: path.join(__dirname, 'build'), //服务器指向的本地目录
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true,  //源码改变实时刷新,
    port: 6789, //服务器所用的端口
  }
};

function configHtmlPlugins() {

  var hbses = glob.sync(path.join(__dirname, 'dev/pages/**/index.hbs'));

  var plugins = [];

  for(var entry in entries) {
    var html = path.join(path.dirname(entries[entry]), 'index.html');
    var hbs = path.join(path.dirname(entries[entry]), 'index.hbs');
    // 如果入口文件的文件夹下不存在index.hbs，那么使用指定的默认模板
    hbs = hbses.indexOf(hbs) === -1 ? path.join(__dirname, 'dev/templates/page.hbs') : hbs;
    //注意:同一个插件可以 new 多次, 每次可以进行不同的配置
    plugins.push(new HtmlWebpackPlugin({
      // filename: 输出html的文件名，如果包含路径信息，那么将会输出到指定路径下（相对路径，相对于output.path），没有文件夹则会创建文件夹
      filename: path.relative(path.join(__dirname,'dev/pages'), html),
      // 是否将入口文件打包产生的输出文件插入到html文件中
      inject: true,
      // 是否加上在引用处加上webpack此次打包产生的hash，格式为（src="built.js?[hash]"）
      hash: true,
      // template: 指定用于输出html文件的模板html或者种子html
      template: hbs,
      // chunks: 指定将会插入哪些打包后的文件
      chunks: [entry]
    }));
  }

  return plugins;
}

// 将所有入口文件自动整理成 [路径名：文件路径] 键值对
function getEntry() {
  var files = glob.sync(path.join(__dirname, 'dev/pages/**/entry.js'));
  var entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    // pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    // pathname带有路径信息，这样打包后的js文件会也会被编译到输出文件夹中的对应路径中
    pathname = pathname.replace(new RegExp('^' + path.join(__dirname, 'dev/pages')), '');
    entries[pathname] = entry;  //默认只有一个入口文件
  }
  return entries;
}