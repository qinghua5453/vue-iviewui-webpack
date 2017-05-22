// index.js
'use strict'

let recycleRouter = [
   { 
		path: '/admin/', 
		component: resolve => require(['../../components/common/index.vue'], resolve),
		children:[
		     {
		     	path:'recycle/cultivar/list',
		     	component: resolve => require(['../../components/recycle/cultivar_list.vue'], resolve)
		     },
		     {
		     	path:'recycle/enterprise/list',
		     	component: resolve => require(['../../components/recycle/enterprise_list.vue'], resolve)
		     }
		]
   }
]

export default recycleRouter