/*
    创建LVue构造函数
*/
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`getting ${key} value`);
            return val;
        },
        set(newVal) {
            console.log(`setting ${key} ${newVal}`);
            if (typeof newVal === 'object') {
                observe(newVal);
            }
            if (newVal !== val) {
                val = newVal;
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
    }

    // 对象数据响应化
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }

    // 数组数据响应化----作业
}