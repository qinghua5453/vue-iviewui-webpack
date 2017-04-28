// main.js
import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from './router/index'
import '../static/css/style'
import 'iview/dist/styles/iview'
// import store from './store/index'
// import { sync } from 'vuex-router-sync'

Vue.use(iView)

// sync(store, router)
const app = new Vue({
	router, 
	render: h => h(App),
})
app.$mount('#xym')
