1、Vue初始化时的优先级

    render > template > el
    使用template时，会首先校验是否是字符串并且时以#开头的；如果不是就校验是否是node（template.nodeType）。

<em style="color: red;font-size: 16px;">
Vue入口文件主要是为了覆写mount，完成模板解析和编译工作。
</em>

2、Vue在初始化时是自上而下的，在挂载时是自下而上的。