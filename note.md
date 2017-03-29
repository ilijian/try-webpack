

## webpack 入口文件

webpack入口文件在webpack配置文件的entry项中配置


## webpack 的输出路径

webpack打包文件和代码分离的输出路径在配置文件中的output项中配置，但是output项只提供了输出顶层文件夹的配置，不会根据源文件的路径将打包或者拆包后的文件输出到相应的路径中去（当然不一定要这么做，但有的时候需要），如果要满足这样的需求，需要在配置entry时，携带入口文件的路径信息，如`entry: {'/path/to/file/entry.js': './path/to/file/entry.js'}`，这样这个entry.js编译后就会编译到编译文件夹下的对应路径中。