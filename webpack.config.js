var path = require('path');
var glob = require('glob');
var webpack = require('webpack');

var HbsToHtmlPlugin = require('./plugins/HbsToHtml.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var _ = {
  // 公共js文件的chunk name
  vendor: 'assets/scripts/vendor.js'
};

var entries = getEntry();

module.exports = {
  // entry:  __dirname + "/dev/entry.js",//单一入口文件，也可以以传入对象或者数组的方式配置成多入口文件
  entry: entries,
  output: {
    //打包后的文件存放的根目录
    path: path.join(__dirname, 'build'),
    // filename: "entry.built.js"//打包后输出文件的文件名
    // filename: '[name].[chunkhash:8].js',  //注意：chunkhash通常都只在生产环境中使用，因此在webpack世界设定中，chunkhash配置项会与webpack-dev-server中 --hot 配置项冲突，不可同时使用
    filename: '[name]',
    // webpack output serve 地址，当设定后，访问地址为 [例]localhost:6789/views/demo/index.html
    publicPath: '/views/'
  },

  // 设置js文件中require和import的解析规则
  resolve: {
    // 设置优先于node模块的查找路径
    modules: [path.resolve(__dirname, "dev"), "node_modules"]
  },

  module: {
    rules: [
      {
        // require vue 文件
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            // postcss选项
            // 目前已经支持使用postcss.config.s | .postcssrc | postcss field in package.json等方式
            postcss: [require('postcss-cssnext')()],  // 数组参数，接受一组POSTCSS插件作为输入
            // 对象参数，接受对象形式的配置(http://vue-loader.vuejs.org/en/features/postcss.html)
            // postcss: {
            //   plugins: [],
            //   options: {
            //     parser: sugarss
            //   }
            // },
            // loaders: {
            //   'sass': 'vue-style-loader!css-loader!sass-loader',  //解析sass语法的loader
            //   'scss': 'vue-style-loader!css-loader!sass-loader?indentedSyntax', //解析scss语法
            // }
            loaders: {
              // 针对产生的css使用ExtractTextPlugin插件提取
              sass: ExtractTextPlugin.extract({
                // 注意：loader的参数可以通过JSON.stringify(OptionObject)这种形式传入
                use: 'css-loader!sass-loader?' + JSON.stringify({includePaths: path.resolve(__dirname, 'dev')}),
                fallback: 'vue-style-loader'
              }),
              // vue-style-loader 的作用是将生成的css代码inline（创建style标签的方式）到页面中
              // sass: 'vue-style-loader!css-loader!sass-loader?includePaths=' + path.resolve(__dirname, 'dev'),  //解析sass语法的loader
            }
          }
        }
      },
      // {
      //   test: /\.hbs$/,
      //   use: {
      //     loader: 'handlebars-loader'
      //   }
      // },
      // 图片处理：可以处理CSS中的图片，但是记得在sass url中要么使用相对sass文件的相对路径，要么可以使用 ~ 号
      // 例如: background-image: url(~/assets/)
      // [参考链接](https://github.com/bholloway/resolve-url-loader/issues/5)
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',  //另外还有一个 url-loader 可以设定，当图片小于某个情况时，可以以base64的形式嵌入到样式文件中
          options: {
            context: path.resolve(__dirname, 'dev'),  // 指定图片路径所相对的根路径，如果未设定此值，那么 name 中path所保存的路径将会从项目根目录开始
            name: '[path][name][sha512:hash:base64:7].[ext]'
          }
        }
      },
      {
        test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
        use: 'json-loader', //具体loader的名称
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // 定制化Plugin，用于将定制化的hbs文件渲染成合法的html
    new HbsToHtmlPlugin(),
    // 将所有入口文件的公共部分提取出来，形成一个单独的js文件，chunk name 为 common/vendor.js
    new  webpack.optimize.CommonsChunkPlugin({name: _.vendor}),
    // 对于多入口的配置，ExtractTextPlugin会为每个入口分别提取出css，并且只需要new一个实例即可
    new ExtractTextPlugin({
      //Name of the result file. May contain [name], [id] and [contenthash]
      filename: function(getPath) {
        
        // return path.join(path.dirname(getPath('[name].css')), 'style.css');
        // 对于多入口文件，必须使用 contenthash、name等变量性质的配置，并且因为name中有可能包含路径信息，所以最好不要省略name（如本配置中）
        return getPath('[name].css').replace(/\.js.css$/, '.css');
      }, 
      allChunks: true
    })

  ].concat(configHtmlPlugins()),

  // webpack默认的本地开发服务器，但是仍然需要手动下载webpack-dev-server模块
  // webpack-dev-server启动了一个使用 express 的 Http服务器，用来伺服资源文件，服务器 和 client 使用了 websocket 协议通讯，
  // 原始文件作出改动后， webpack-dev-server 会触发webpack的实时编译，但是编译后的文件并没有输出到目标文件夹，而是暂存到内存中
  // 此时浏览器访问的资源文件都来自于内存，而不是来自于目标文件夹下的编译文件
  devServer: {
    //注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    contentBase: path.join(__dirname, 'dev'), //服务器指向的本地硬盘目录，除非想要serve静态文件（也就是不经webpack编译的文件），否则不必使用此项，并且publicPath设定的路由优先级更高
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
      // hash: true,
      // template: 指定用于输出html文件的模板html或者种子html
      template: hbs,
      // chunks: 指定将会插入哪些打包后的文件
      chunks: [_.vendor, entry]
    }));

  }

  return plugins;
}

// 将所有入口文件自动整理成 [路径名：文件路径] 键值对
function getEntry() {
  var files = glob.sync(path.join(__dirname, 'dev/pages/**/entry.js'));
  var entries = {},
    entry, chunkname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    chunkname = path.relative(path.resolve(__dirname,'dev/pages'),entry)
    // chunkname的形式为'demo/entry.js'，其中包含了入口文件的路径信息和文件后缀信息，这样打包后的文件会按照指定路径直接写入到output指定文件夹下
    // 因为包含了后缀信息，所以在output配置中filename项不再需要指定后缀
    entries[chunkname] = entry;  //此配置中只有允许有一个入口文件
  }

  return entries;
}

