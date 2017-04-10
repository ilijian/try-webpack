举个例子，例如欧洲商城需要有业务A，印度商城业务B，其他商城业务C，那么对应于项目开发就只是呈现三种业务模式，与商城无关

```
${{#Business_A}}
Code for business A
${{/Business_A}}

${{#Business_B}}
Code for business B
${{/Business_B}}

${{#Business_C}}
Code for business C
${{/Business_C}}
```

这样在CMS中会产生3个变量：Business_A、Business_B、Business_C，其中Business_A仅在欧洲商城有值，Business_B仅在印度商城有值，Business_C仅在其他商城有值


## 辅助命令 - 使用 svg 自动生成 icon font

本构建工具支持将svg格式的图片直接转化为字体文件，并自动生成对应样式文件，请严格按照如下指导使用。

假定你要为某个页面x生成字体名为y的字体文件

1. 在`dev/assets/fonts/svgs`路径下新建文件夹`y`

2. 将svg文件（注意svg文件必须为一笔绘成）放置到文件夹`y`中

3. 在根目录下执行命令`npm run makefont`

命令执行完毕后，项目会发生这么几个变化：

1. 在目录`dev/assest/fonts`下自动生成了文件夹`y`，其中存放了名为`y.eot`，`y.ttf`，`y.woff`的三个字体文件

2. 自动生成了样式文件`dev/assest/styles/fonts/_y.scss`

3. 在你的样式文件中自行引用`_y.scss`即可

4. 记得将自动生成的各个文件也要提交 git commit

## 辅助命令 - 使用 png 图片自动生成 sprite