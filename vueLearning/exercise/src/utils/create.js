import Vue from 'vue';
import notice from './Notice'
// function create(Component, props) {
function create(options) {
    // const vm = new Vue({
    //     render: h => h(Component, { props })
    // }).$mount() // $mount()不指定宿主元素，会创建真是DOM，但是不会追加
    // document.body.appendChild(vm.$el);// vm.$el获取真是DOM
    // const comp = vm.$children[0];
    // comp.remove = () => {
    // document.body.removeChild(vm.$el);
    // vm.$destroy();
    // }
    // return comp;

    const Component = Vue.extend(notice);
    const vm = new Component({
        el: document.createElement('div'),
        propsData: {
            title: options.title,
            msg: options.msg,
            duration: options.duration,
        }
    })
    vm.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    document.body.appendChild(vm.$el);// vm.$el获取真是DOM

    return vm;
}

export default {
    install(Vue) {
        Vue.prototype.$notice = (options) => {
            return create(options);
        };
    }
};