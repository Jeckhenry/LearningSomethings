1、.sync的使用
    ```
    <father>
        <son :show.sync='isShow'></son>
    </father>
    ```
    子组件上绑定isShow，使用.sync相当于在子组件上监听了update:show方法，update:+'变量名'。
    子组件以props承接父组件数据，修改数据时使用$emit('update:show', 回调参数数);
2