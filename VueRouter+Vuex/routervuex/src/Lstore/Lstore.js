let Vue;

class Store {
    constructor(options) {
        const {
            mutations, actions, state, getters,
        } = options;
        this._mutations = mutations;
        this._actions = actions;
        this.getters = {};

        this.state = new Vue({
            data: state,
        });

        let computed = {};
        Object.keys(getters).forEach((key) => {
            computed[key] = this.partial(getters[key], this.state);
            Object.defineProperty(this.getters, key, {
                get: () => this.getters[key]
            })
        })
        this.getters = new Vue({
            computed,
        });
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    partial(fn, arg) {
        return function () {
            return fn(arg);
        }
    }

    commit(type, payload) {
        let entry = this._mutations[type];
        if (entry) {
            entry(this.state, payload);
        }
    }

    dispatch(type, payload) {
        let entry = this._actions[type];
        if (entry) {
            entry(this, payload);
        }
    }
}

function install(_vue) {
    Vue = _vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
}

export default {
    Store,
    install
}