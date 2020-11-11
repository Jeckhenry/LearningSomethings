let Vue;

class LRouter {
    constructor(options) {
        this.$options = options;

        // 设置响应式数据
        // Vue.util.defineReactive(this, 'current', '/');
        this.path = new Vue({
            data: {
                current: '/',
            }
        });
        this.routerMap = {};
        Object.keys(options.routes).forEach((r) => {
            this.routerMap[options.routes[r].path] = options.routes[r].component;
        })

        this.onHashChange = this.onHashChange.bind(this);
        window.addEventListener('load', this.onHashChange);
        window.addEventListener('hashchange', this.onHashChange);
    }

    onHashChange() {
        let hash = window.location.hash;
        this.path.current = hash ? (hash.indexOf('?') < 0 ? hash.slice(1) : hash.slice(1, hash.indexOf('?'))) : '/';
    }
}

LRouter.install = function (_vue) {
    Vue = _vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    });

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: `#${this.to}`,
                }
            }, this.$slots.default);
        }
    });

    Vue.component('router-view', {
        render(h) {
            let component = null;
            component = this.$router.routerMap[this.$router.path.current];
            return h(component);
        }
    });
}

export default LRouter;