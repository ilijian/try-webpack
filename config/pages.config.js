/* 工程的页面配置文件，每一个html文件都对应于唯一的一个入口js文件，新建一个页面将在此配置文件下新增一条记录 */

var path = require('path');

var pagesdir = path.join(__dirname, '..', 'dev', 'pages');

module.exports = {
  'main': path.join(pagesdir, '..', 'entry.js'),
  'home': path.join(pagesdir, 'home', 'main.vue.js')
};