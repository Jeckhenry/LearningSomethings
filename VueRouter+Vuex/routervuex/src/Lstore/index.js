import Vue from 'vue';
import Vuex from './Lstore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 1,
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        }
    },
    mutations: {
        add(state) {
            state.count += 1;
        }
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 2000);
        }
    },
})
