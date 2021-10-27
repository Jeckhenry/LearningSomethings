import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $notice from './utils/create'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
// Vue.prototype.$create = create;
Vue.use($notice);

router.beforeEach((to, from, next) => {
    next();
})

router.afterEach((to, from) => {

})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')