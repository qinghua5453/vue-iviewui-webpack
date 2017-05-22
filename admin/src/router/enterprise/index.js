// index.js
'use strict'

let enterpriseRouter = [
   { 
		path: '/admin/', 
		component: resolve => require(['../../components/common/index.vue'], resolve),
		children:[
		     {
		     	path:'enterprise/list',
		     	component: resolve => require(['../../components/enterprise/list.vue'], resolve)
		     },
		     {
		     	path:'enterprise/detail',
		     	component: resolve => require(['../../components/enterprise/detail.vue'], resolve)
		     }
		]
   }
]

export default enterpriseRouter