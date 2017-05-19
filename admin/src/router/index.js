// index.js
import Vue from 'vue'
import Router from 'vue-router'
import cultivarRouter from './cultivar/index'
import enterpriseRouter from './enterprise/index'
import recycleRouter    from './recycle/index'
Vue.use(Router)

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
		// cultivarRouter
		...cultivarRouter,
		// enterpriseRouter
		...enterpriseRouter,
		// recycleRouter
		...recycleRouter
	]
})

export default router