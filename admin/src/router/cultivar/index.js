// index.js
'use strict'

let cultivarRouter = [
   { 
		path: '/admin/', 
		component: resolve => require(['../../components/common/index.vue'], resolve),
		children:[
		     {
		     	path:'cultivar/list',
		     	component: resolve => require(['../../components/cultivar/list.vue'], resolve)
		     },
		     {
		     	path:'cultivar/detail',
		     	component: resolve => require(['../../components/cultivar/detail.vue'], resolve)
		     }
		]
   }
]

export default cultivarRouter