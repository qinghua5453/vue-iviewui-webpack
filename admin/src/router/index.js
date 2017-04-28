// index.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// home
const Home = resolve => require(['../components/layout/index.vue'], resolve)

const router = new Router({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},

	routes: [
	    // home
		{ 
			path: '/admin/home/', 
			component: Home, 
		},
		{ path: '*', component: Home}
	]
})

export default router