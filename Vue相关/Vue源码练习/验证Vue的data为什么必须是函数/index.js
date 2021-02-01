class P1 {
    constructor(value) {
        this.value = value;
    }
    changeValue() {
        this.value.sex = 'female';
    }
}

class P2 {
    constructor(value) {
        this.value = value;
    }
    changeValue() {

    }
}

let obj = {
    name: 'lixx',
    sex: 'male'
}
let obj1 = {
    name: 'lixx',
    sex: 'male'
}

function getObj() {
    let obj = {
        name: 'lixx',
        sex: 'male'
    }
    return obj;
}
// let pp1 = new P1(getObj());
// let pp2 = new P1(getObj());
// let pp1 = new P1(obj);
// let pp2 = new P1(obj1);

// // pp1.changeValue();
// pp2.changeValue();


// console.log(pp1.value, 'pp1');
// console.log(pp2.value, 'pp2');

class Obj {
    person = {}
    constructor(person) {
        this.person = person;
    }
    setAge() {
        this.person.age = 456
    }
}

const tmp = {
    name: 'aaaa',
    age: 12
}

const P01 = new Obj(tmp);
const P02 = new Obj({
    name: 'aaaa',
    age: 12
});
const P03 = new Obj({
    name: 'aaaa',
    age: 12
});
// P01.setAge();
// P02.setAge();
// console.log(P01);
// console.log(P02);
// console.log(P03);

// 发布订阅
class Emittter {
    constructor(name, age) {
        this.events = {}
        this.name = name;
        this.age = age;
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [callback];
        } else {
            this.events[eventName].push(callback);
        }
    }
    emit(eventName, ...rest) {
        if (!this.events[eventName]) {
            console.log('不存在......');
        }
        this.events[eventName] && this.events[eventName].forEach(fn => {
            fn.call(this, ...rest);
        });
    }
    remove(eventName) {
        delete this.events[eventName];
    }
    once(eventName, callback) {
        const fn = function () {
            callback.call(this);
            this.remove(eventName);
        }
        this.on(eventName, fn);
    }
}

const e1 = new Emittter('lixx', 27);
e1.on('sayHello', function () {
    console.log(`hello ${this.name}`);
});
e1.on('sayHello', function () {
    console.log(`hiiii ${this.name}`);
});
e1.emit('sayHello');
const e2 = new Emittter('gyl', 27);
e2.on('sayHello', function () {
    console.log(`hello ${this.name}`);
});
e2.on('sayHello', function () {
    console.log(`hiiii ${this.name}`);
});
e2.once('sayHIIIII', function () {
    console.log(`sayHIIIII ${this.name}  ${this.age}`);
});
e2.emit('sayHello');
e2.emit('sayHIIIII');
e2.emit('sayHIIIII');