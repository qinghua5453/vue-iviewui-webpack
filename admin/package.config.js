// package.config.js
module.exports = {
	entryRoots:'./src/main.js',
	build:{
	   publicPath:'/assets/src/',
       filename:'main.[chunkhash:7].bundle.js',
       imagesLoaderName:'images/[name].[hash:7].[ext]',
       fontsLoaderName :'fonts/[name].[hash:7].[ext]',
       cssFilename     :'styles.[hash:7].css'
	},
	dev  :{
	   publicPath:'/assets/src/',
       filename:'main.bundle.js',
       imagesLoaderName:'images/[name].[ext]',
       fontsLoaderName :'fonts/[name].[ext]',
       cssFilename     :'styles.css'
	}
}