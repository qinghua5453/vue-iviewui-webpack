// server.js
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