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