/*
    编译器
    递归遍历DOM树
    判断节点类型，如果是文本，判断是否是插值类型（{{}}）
    如果是元素，判断是否是指令或者事件，然后递归子元素
*/
class Compiler {
    constructor(el, vm) {
        // el: 宿主元素
        // vm: LVue实例
        this.$vm = vm;
        this.$el = document.querySelector(el);

        if (this.$el) {
            this.compile(this.$el);
        }

    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            // 判断是否是元素
            if (this.isElement(node)) {
                console.log(`编译元素：${node.nodeName}`);
                this.compileElement(node);
            } else if (this.isInterPosition(node)) {
                // 是否是插值绑定
                // console.log(`编译插值绑定：${node}`, RegExp.$1);
                this.compileText(node);
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }

    // 判断是否是元素
    isElement(node) {
        return node.nodeType === 1;
    }

    // 判断是否是插值绑定
    isInterPosition(node) {
        // 首先是文本nodeType === 3
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    // 公共编译函数
    update(node, exp, dir) {
        // 指令对应的更新函数dirUpdater
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp]);
        // 更新处理
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val);
        });
    }

    // 编译插值绑定
    compileText(node) {
        // 第二个参数代表key
        this.update(node, RegExp.$1.trim(), 'text');
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    // 编译节点
    compileElement(node) {
        /*
            元素是节点
            需要遍历其属性集合
        */
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // l-html = 'msg'
            const attrName = attr.name; // l-html
            const attrValue = attr.value; // msg
            if (this.isDirective(attrName)) {
                // 是指令
                const dir = attrName.slice(2);
                this[dir] && this[dir](node, attrValue);
            }
        })
    }

    //判断是否是指令
    isDirective(attrName) {
        return attrName.indexOf('l-') === 0;
    }

    // 编译l-text
    text(node, exp) {
        // node.textContent = this.$vm[exp];
        this.update(node, exp, 'text');
    }

    // 编译l-html
    html(node, exp) {
        // node.innerHTML = this.$vm[value];
        this.update(node, exp, 'html');
    }

    htmlUpdater(node, value) {
        node.innerHTML = value;
    }
}