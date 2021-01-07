/*
    创建LVue构造函数
    在Vue2.0中每一个组件只有一个Watcher，由虚拟DOM执行更新策略
*/

// 数组响应式
// 1、替换数组原型中的7个方法
const orginalProto = Array.prototype;
const arrayProto = Object.create(orginalProto); // 备份原型，修改备份
['pop', 'push', 'shift', 'unshift', 'sort', 'reverse'].forEach((method) => {
    arrayProto[method] = function () {
        // 执行原始操作
        orginalProto[method].apply(this, arguments);
        // 覆盖操作，通知更新
        console.log('数组更新');
    }
})

function defineReactive(obj, key, val) {
    // 递归处理
    observe(val);

    // 创建一个Dep和key一一对应
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        get() {
            console.log(`getting ${key} value`, Dep.target);
            // 依赖收集
            Dep.target && dep.addDep(Dep.target);
            return val;
        },
        set(newVal) {
            console.log(`setting ${key} ${newVal}`);
            if (newVal !== val) {
                observe(newVal);
                val = newVal;
                // 通知更新
                dep.notify();
            }
        },
    });
}

function observe(obj) {
    if (typeof obj !== 'object') return;

    // 创建Observer实例
    new Observer(obj);
}

function proxy(vm, sourceKey) {
    Object.keys(vm[sourceKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key];
            },
            set(val) {
                vm[sourceKey][key] = val;
            }
        })
    })
}

class LVue {
    constructor(options) {
        // 保存选项
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data;

        // 响应化处理数据
        observe(this.$data);

        // 数据代理（可以直接this.xx使用）
        proxy(this, '$data');

        // 编译指令
        new Compiler(this.$el, this);
    }
}

// 根据对象类型决定响应化的方法
class Observer {
    constructor(value) {
        this.value = value;

        if (typeof value === 'object') {
            this.walk(value);
        }
        if (Array.isArray(value)) {
            // 覆盖原型替换7个方法；
            value.__proto__ = arrayProto;
            // 响应化数组内部元素
            for (let i = 0; i < value.length; i += 1) {
                observe(value[i]);
            }
        }
    }

    // 对象数据响应化
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }

    // 数组数据响应化----作业
    /*
        找到数组原型；覆盖能够修改数组的更新方法，使其能够通知更新
        将新的原型设置到数组实例原型上
    */
}


// 创建观察者:保存更新函数，值变化时执行更新函数
// const watchers = [];
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;
        // watchers.push(this);
        // 在Dep.target静态属性上设置为当前watcher实例
        Dep.target = this;
        this.vm[key]; // 读取触发getter
        Dep.target = null; // 收集完销毁
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key]);
    }
}

// Dep:依赖收集，管理key对应的watcher实例
class Dep {
    constructor() {
        this.deps = [];
    }
    addDep(dep) {
        this.deps.push(dep);
    }
    notify() {
        this.deps.forEach(wa => wa.update());
    }
}