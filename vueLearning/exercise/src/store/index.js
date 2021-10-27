import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persist from './persist'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    plugins: [persist],
})
