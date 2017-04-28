此项目做用技术栈是webpack2.0+iviewui+vue2.0,重点讲解webpack的配置吧。或许你会问为啥没有vue-router和vuex。最后我会解释的。


## webpack 打包主入口文件 

```bash
// main.js
import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from './router/index'
import '../static/css/style'
import 'iview/dist/styles/iview'

Vue.use(iView)

const app = new Vue({
	router, 
	render: h => h(App),
})
app.$mount('#xym')

```
## webpack公共代码分开打包

```bash
  // 新建一个dll.config.js 在打包以前先执行此文件，会生产一个打包文件，
  // 由于vue、vue-router等公共的依赖基本不会变，所以其打包文件可以不用区分开发
  // 和生产环境

var webpack = require('webpack')
var path    = require('path')
var vendors =[
   'vue',
   'vue-router',
   'vuex',
   'iview'
]
var plugins = [
    new webpack.DllPlugin({
	   	 path: path.join(__dirname, 'dist', '[name]-manifest.json'),
         name: '[name]',
         context: __dirname
	}),
	new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
]

module.exports = {
	entry:{
		 vendors:vendors
	},
	output:{
		 path: path.join(__dirname, 'dist'),
		 filename :'[name].bundle.js',
		 library  :'[name]'
	},
	plugins:plugins
}
```
## webpack.config.js

```bash
   
 // webpack.config.js
 // 我用的是webpack2.x，如果你用的webpack1.x版本的话 部分配置会不一样
 // 根据打包的报错基本都能调试出来
 // extract-text-webpack-plugin 这个分离css的插件很重要
 // assets-webpack-plugin  这个插件打包的时候会生成一个json文件
 // 我在index.html文件里面采用ajax获取json，然后动态js的形式加载
 // <script> 和<link>,避免手动修改开发和生产环境其静态资源引入的问题

'use strict'
var webpack = require('webpack')
var path    = require('path')
var fs      = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')    //分离css
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //min Css
var AssetsPlugin = require('assets-webpack-plugin')
var config  = require('./package.config')
// 本地调试跨域端口
var hostName ='http://localhost:3000'

var isProd  = process.env.NODE_ENV === 'prod'  
// 设置为true——生产环境 
var isTest = process.env.NODE_ENV === 'test'
// 设置为true——测试环境

var plugins = [
   new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':  JSON.stringify((isProd  || isTest) ? 'prodTest' : 'dev'),
        'HOST_NAME': JSON.stringify((isProd  || isTest) ? '' : hostName)
      }
   }),
   new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendors-manifest.json'),
    }),
   new webpack.optimize.OccurrenceOrderPlugin(), //模块使用率较高给较小id和优先打包
   new webpack.NoEmitOnErrorsPlugin(), //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
   new AssetsPlugin(),
   new ExtractTextPlugin((isProd  || isTest) ? config.build.cssFilename : config.dev.cssFilename),
   
]
// 压缩 js 和css
if(isProd  || isTest){
  plugins.push(
     new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
  plugins.push(
    new OptimizeCssAssetsPlugin()
  )
}
module.exports = {
  devtool: (isProd || isTest) ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
	entry:{
      app:[config.entryRoots]
  },
  output: {
	    path: path.join(__dirname, 'build'),
	    filename: (isProd || isTest) ? config.build.filename : config.dev.filename,
	    publicPath: config.dev.publicPath,
  },
  resolve:{
      extensions:['.js','.json','.css','.jpg','.png']
  },
  module: {
      rules :[
        {
          test: /\.js$/,
          loader : 'babel-loader'
        },
        {
         test: /\.vue$/,
         loader : 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        // images loader
        //图片资源在小于10k时自动处理为base64图片的加载器
        //减少http请求
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader : 'url-loader',
          options:{
            limit: 10000,
            name: (isProd  || isTest) ? config.build.imagesLoaderName : config.dev.imagesLoaderName
          }
        },
        //fonts loader
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: (isProd  || isTest) ? config.build.fontsLoaderName : config.dev.fontsLoaderName
          }
        }
      ]
  },
  plugins:plugins
}

```
## server.js

```bash
  
  // server.js
  // publicPath 配置很重要，这里的配置要跟webpack.config.js 的output的publicPath 配置一致
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require("./webpack.config.js")
var compiler = webpack(config)
var server = new WebpackDevServer(compiler,{
	contentBase: "./",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    hot: true,
    inline: true,//实时刷新
	publicPath: "/assets/src/"
})
server.listen(3000,function(err){
	if(err) return
	console.log('server is runing port 3000')
})

```
## 运行

开发环境
先执行dll.config.js
命令：webpack --config dll.config.js
再执行: npm start

测试环境
npm run test

生产环境
npm run build

说说为何我这次不采用vue-router和vuex。大家都知道前后端分离如果没有这两个依赖
根本说不上正在的前后端分离，因为这次我们项目是pc端后台页面，不是webapp的H5页面，其逻和
页面相对会比较多，而vuex是通过actions来管理state的，这两个对象下面的所有变量其实质
都是windows下的全局变量，如果项目很庞大，势必会污染全局变量，并在维护上也增加了困难。
而之所以采用vue是因为mvvm模型，减少频繁的dom操作，增加开发效率，也减少了渲染时间。

这是我和我同事的理解，不知道有没有公司在构建大型项目的时候采用vue-router和vuex，如果真是因为
这个原因而这两个依赖不用，那其实最主要的功能就减少了。它所存在的问题是项目越大，全局变量越多，
就算新建不同的actions和getter其实质还是全局变量。