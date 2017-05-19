// webpack.config.js
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
      alias: {
            'vue': 'vue/dist/vue.js'
      },
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