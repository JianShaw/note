

工作许久，尤其在我厂折腾了这么久。

工作中最耗精力的反而是接口的调整。不知何时就发生了调整与变动。经常发生的情况如下

- 字段名修改
- 字段的类型调整 可能是number，也可能是string
- 字端的空值，原本是对象，无数据给变成了null
- code相应的改动。

时间的开销还有一部分在于前端人员等待接口的时间上。可能手头的静态页面成功，后台的接口还未正式提供。

还有老生常谈的跨域问题，我不愿意，也不想帮每个同事反复修正这些问题，大好的时光何必做如此反复low逼的事情


## 分层 ##


###  路由 ###

暂时项目的路由都是后端管理。暂时不管里路由，只处理对应的数据

### 数据 ###

通过启动一个服务js

暂时期望他有如下的功能

-  默认支持跨域

-  支持两个模式，可以用自己的mock数据和后端提供的测试数据进行处理
模拟数据的生成处理计划使用[mockjs](https://github.com/nuysoft/Mock/tree/refactoring)

接口处理，需要将api开头的接口返回对应的mock数据处理

```
app.use('/api',apiMock);
```

-  支持自动打开浏览器，热更新
这里需要两个库来支持，下边的代码来自redux-saga提供的demo下的server.js

```
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

 ```

