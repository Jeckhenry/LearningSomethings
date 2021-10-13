1、.sync的使用

    <father>
        <son :show.sync='isShow'></son>
    </father>
    
    子组件上绑定isShow，使用.sync相当于在子组件上监听了update:show方法，update:+'变量名'。
    子组件以props承接父组件数据，修改数据时使用$emit('update:show', 回调参数数);
2、slot：插槽

    1）默认插槽
    <message>
        新增成功    
    </message>

    <message>
        <template>新增成功</template>
    </message>

    默认插槽有两种方式
    2）具名插槽，使用v-slot:插槽名
    <message>
        <template v-slot:title>
            <div>测试</div>
        </template v-slot:default>
        <template>新增成功</template>
    </message>

    3）作用域插槽，一般是在插槽模板中使用变量时应用
    <message>
        <template v-slot:title>
            <div>{{ info }}</div>
        <template>新增成功</template>
    </message>
    info默认的取值作用域是父组件；如果info需要从子组件中取值，那么需要声明上下文，如下
    <message>
        <template v-slot:title='slotProps'>
            <div>{{ slotProps.info }}</div>
        <template>新增成功</template>
    </message>
    message组件中需要在name为title的slot上声明info
    <div>
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name='title' info='子组件中的取值'></slot>
    </div>

    子组件中使用插槽：
    <div>
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name='title'></slot>
    </div>

3、对组件化的理解：

    组件是可复用的Vue实例，准确讲是VueComponent的实例，继承自Vue。使用组件可以增加代码的复用性、可维护性和可测试性，也体现了高内聚低耦合的原则。

    使用场景：
    1）通用组件，具有通用性，如按钮组件、输入框组件等；
    2）业务组件，完成具体业务，如登陆，个人中心等；
    3）页面组件，如详情页、列表页。

    组件的本质：
    组件配置==>VueComponent实例=>render=>Virtual DOM => DOM
    
    组件的本质是生成虚拟DOM

4、keep-alive：组件缓存，include属性是以‘,’分割的字符串或者数组，每一个字符串是对应页面的name属性（注意：此name不是route配置中的name，而是vue文件中的name属性）。

5、Vuex实现登陆持久化
    Vuex可以使用plugins选项，plugin内export出一个方法，该方法接受store为参数，并且会在store初始化的时候调用这个方法。
    store.subscribe方法可以监听所有的mutation变化，通过不同的mutation去对数据进行localStorage的本地存储

    ```
    persist.js
    export default store => {
        if (localStorage) {
            // store初始化时将localStorage中的状态还原到Vuex中
            const user = JSON.parse(localStorage.getItem('user'));// 反///序列化
            if (user) {
                store.commit('login', user);
            }
        }

        // 用户状态发生变化，使用相应的变化更新localStorage
        store.subscribe((mutation, state) => {
            // mutation.type(执行的mutation)
            // mutation.type.startsWith('')匹配以约定字符串开头的mutation
        })
    }
    ```

    ```
    store/index.js

    import persist from './persist.js'
    export default new Vuex.store ({
        ...
        plugins: [ persist ],
        ...
    })
    ```

6、MVVM框架三要素：数据响应式、模板引擎及渲染。
    数据响应式：监听数据变化并更新视图
        Object.defineProperty()
        proxy
    模板引擎：提供描述视图的模板语法
    渲染：如何将模板渲染为html

7、Vue中的异步更新
    只要监听到数据变化，Vue就开启一个队列，并缓冲在同一事件中的所有数据变更；
    如果同一个watcher被触发多次，只会被推入到队列中一次，避免了不必要的计算和DOM操作，然后在
    下一个的事件循环tick中，Vue刷新队列，执行实际的工作。
    Vue在内部对异步队列使用原生的Promise.then、MutationObserver和setImmediate，如果都不支持，就使用
    settimeout代替。

8、Vue Mixin

    权重依次减少：
    组件选项 > 组件的mixin > 组件的mixin的mxin > 全局选项
    
    组件实例化之前需要先将全局选项和组件选项合并起来。

    1）函数叠加（data，provide）
        会将多个函数添加到一个新的函数中，并返回新函数，函数执行时会执行两个方法，如果有数据重复，权重大的优先。
    2）数组叠加（生命周期函数、watch）
        权重大的放后面，执行时先执行权重小的。
    3）原型叠加（components，filters，directives）
        两个对象合并的时候不会覆盖，权重小的，会被放到权重大的原型上。
    4）覆盖叠加（props，methods，computed，inject）
        两个对象合并，如果有重复，权重大的覆盖权重小的。
    5）直接替换（template，el，propsData）

9、Vue Directive
```
Vue.directive(name, {});

directives: {
    name: {

    }
}

自定义指令中可以使用的几个钩子:
bind：只调用一次，指令第一次绑定到元素时调用，可以进行一次性初始化设置
inserted：被绑定元素插入父节点时调用（仅保证父节点存在，不保证插入到文档中）
update：被绑定元素变化时更新（子组件可能还未更新）
componentUpdated：组件和子组件更新时触发
unbind：指令被移除时触发
```
