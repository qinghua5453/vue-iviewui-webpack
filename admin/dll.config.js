// dll.config.js
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