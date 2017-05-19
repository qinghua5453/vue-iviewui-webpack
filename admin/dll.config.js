// dll.config.js
var webpack = require('webpack')
var path    = require('path')

var vendors =[
   'vue',
   'vue-router',
   'vuex',
   'iview'  // iview 依赖比较大 占据整个打包文件的75%大小
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
	resolve:{
      alias: {
            'vue': 'vue/dist/vue.js'
      }
    },
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