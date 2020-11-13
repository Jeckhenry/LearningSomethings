let Vue;

class LRouter {
    constructor(options) {
        this.$options = options;

        // 设置响应式数据
        // Vue.util.defineReactive(this, 'current', '/');
        // this.path = new Vue({
        //     data: {
        //         current: '/',
        //     }
        // });
        // this.routerMap = {};
        // Object.keys(options.routes).forEach((r) => {
        //     this.routerMap[options.routes[r].path] = options.routes[r].component;
        // })

        this.current = window.location.hash.slice(1) || '/';

        Vue.util.defineReactive(this, 'matched', []);
        // match可以递归匹配组件
        this.match();

        this.onHashChange = this.onHashChange.bind(this);
        window.addEventListener('load', this.onHashChange);
        window.addEventListener('hashchange', this.onHashChange);
    }

    match(routes) {
        routes = routes || this.$options.routes;
        // 递归遍历
        for (let route of routes) {
            if (route.path === '/' && this.current === '/') {
                // 认为首页不会嵌套子页面
                this.matched.push(route);
                return;
            }
            if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children);
                }
                return;
            }
        }
    }

    onHashChange() {
        this.current = window.location.hash.slice(1) || '/';
        this.matched = [];
        this.match();
        // let hash = window.location.hash;
        // this.path.current = hash ? (hash.indexOf('?') < 0 ? hash.slice(1) : hash.slice(1, hash.indexOf('?'))) : '/';
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
            // 标记当前router-view深度
            this.$vnode.data.routerView = true;
            let depth = 0;
            let parent = this.$parent;
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data;
                if (vnodeData) {
                    if (vnodeData.routerView) {
                        // 说明当前parent是routerView
                        depth += 1;
                    }
                }
                parent = parent.$parent;
            }
            let component = null;
            // component = this.$router.routerMap[this.$router.path.current];
            const route = this.$router.matched[depth];
            if (route) {
                component = route.component;
            }
            return h(component);
        }
    });
}

export default LRouter;