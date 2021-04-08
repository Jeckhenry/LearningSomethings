// call
const obj = {
    name: 'lixx',
}
const objj = {
    name: 'gyl',
}

function getName() {
    console.log([...arguments]);
    return this.name;
}
console.log('直接调用', getName());
// apply:接收参数为数组
Function.prototype.selfApply = function (context) {
    context = context ? Object.create(context) : {};
    context.fn = this;
    let args = [...arguments][1];
    args = args ? args : [];
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
// console.log('self_apply', getName.selfApply());

// bind: 接收参数以逗号分割，返回改变this的函数
Function.prototype.selfBind = function (context) {
    context = context ? Object.create(context) : {};
    let args = [...arguments].slice(1);
    const selfThis = this;
    const _this = [...arguments].slice(0, 1)[0];
    return function () {
        args = args.concat([...arguments]);
        return selfThis.call(_this, ...args);
    }
}
const bindFunc = getName.selfBind(obj, 1, 2);
console.log('self_bind', bindFunc(3, 4));

// call: 接收参数以逗号分割
Function.prototype.selfCall = function (context) {
    context = context ? Object.create(context) : {};
    context.fn = this;
    let res = context.fn([...[...arguments].slice(1)]);
    delete context.fn;
    return res;
}
console.log('self_call', getName.selfCall(objj));

// new操作符: 先获取构造函数、创建原型指向构造函数的对象，执行构造函数，this指向新对象
// 执行后如果得到object返回结果，否则返回新对象
function create() {
    const Con = [].shift.call(arguments);
    const obj = Object.create(Con.prototype);
    let ret = Con.apply(obj, arguments);
    return ret instanceof Object ? ret : obj;
}

function Car(name, color) {
    this.name = name;
    this.color = color;
}
Car.prototype.print = function () {
    console.log(this.name, this.color);
}

const myCar = create(Car, 'lixx', 'red');
console.log(myCar);
myCar.print();

(function () {
    console.log(this);
})()