import router from '../router'

export default {
    namespaced: true,// 设置独立命名空间，避免冲突
    state: {
        isLogin: false,
        users: '',
    },
    mutations: {
        login(state, username, hasLogin) {
            state.isLogin = true;
            state.users = username;
            if (!hasLogin) {
                router.addRoutes([
                    {
                        path: "/admin",
                        name: "admin",
                        component: () => import("../views/Admin.vue"),
                    },
                ]);
            }
        },
        logout(state) {
            state.isLogin = false;
            state.users = '';
        },
    },
    actions: {
        login({ commit }, username) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login', username);
                        resolve();
                    } else {
                        reject();
                    }

                }, 1000);
            })
        },
        logout({ commit }) {
            commit('logout');
        }
    }
}