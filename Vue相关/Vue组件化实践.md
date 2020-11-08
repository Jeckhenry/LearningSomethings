## 组件通信

1、props：props: { msg: { type: '', default: '' } }

2、自定义事件： 子组件中this.$emit(自定义事件名, data);

3、eventBus

    Vue.prototype.$bus = new Vue();
    $bus.$on('test', () => {});
    $bus.$emit('test');

4、$parent/$root

5、$children
    不能保证子元素的顺序，因为会存在异步组件。

6、$refs

7、$attrs/$listeners

    ** 子组件中使用v-bind="$attrs"后可以使用一下属性，避免在父组件上重复渲染相同属性
    export default {
        inheritAttrs: false, // 避免设置到根元素上
    }

8、provide/inject(可以避免侵入调用组件的用户，一般在通用组件中使用)

    父组件：
    provide() {
        return {
            foo: 'foo'
        }
    }
    子组件
    inject: ['foo']
    或者为了避免和子组件数据重名，使用别名
    inject: {
        bar: {from: 'foo'}
    }

9、组件构造函数的获取

    Vue.extend:导入vue文件作为模板

        import notice from './Notice.vue'
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
        document.body.appendChild(vm.$el);// vm.$el获取真实在DOM

    render

        // Component为动态传入的组件
        const vm = new Vue({
            render: h => h(Component, { props })
        }).$mount() // $mount()不指定宿主元素，会创建真是DOM，但是不会追加
        document.body.appendChild(vm.$el);// vm.$el获取真是DOM
        const comp = vm.$children[0];
        comp.remove = () => {
            document.body.removeChild(vm.$el);
            vm.$destroy();
        }