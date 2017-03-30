// HbsToHtml.js
var fm = require('front-matter');
var Hogan = require('hogan.js');
var fs = require('fs');
var path = require('path');

function HbsToHtml(options) {
  // Configure your plugin with options...
}

HbsToHtml.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      

      var contents = htmlPluginData.html;
      var frontMatter = fm(contents);
      var layout = undefined;
      try {
        layout = fs.readFileSync(path.join(__dirname, '../', 'dev/layouts', frontMatter.attributes.layout));  
        layout = layout.toString();
      } catch(ex) {
        layout = fs.readFileSync(path.join(__dirname, '../', 'dev/layouts', 'page.hbs'));
        layout = layout.toString();
      }

      var data = frontMatter.attributes;
      // var config = JSON5.parse(siteConfig.config);

      // if(data.domain && data.url) {
      //   data.alternatives = [];
      //   for(var i=0; i<config.regions.length; i++) {
      //     var stores = config.regions[i]['stores'];
      //     for(var j=0; j<stores.length; j++) {
      //       data.alternatives.push({url: path.join(data.domain,stores[j].code,data.url), lang: stores[j].lang});
      //     }
      //   }
      // }

      var template = Hogan.compile(layout, {delimiters: '${{ }}'});
      htmlPluginData.html = template.render(data,{content: frontMatter.body});

      callback(null, htmlPluginData);
    });
  });

};

module.exports = HbsToHtml;