/* 原型链继承 */
/*
function Parent1(name) {
    this.name = name;
    this.play = [1, 2, 3];
    this.song = function () {}
}

function Child() {
    this.type = 'child';
}
Child.prototype = new Parent1('lixx');

let child1 = new Child();
// let child2 = new Child();
// child1.name = 'gyl';
// console.log('child1', child1.name);
// console.log('child2', child2.name);
console.log(child1.__proto__);
console.log(Child.prototype.constructor);
*/

/* 构造函数继承 */

/*
function Parent() {
    this.name = 'parent';
    this.play = [1, 2, 3];
}
Parent.prototype.song = function () {}

function Child() {
    Parent.call(this);
    this.type = 'child';
}

let child1 = new Child();
console.log(child1.__proto__); // 实例有指向原型对象的指针
console.log(Child.prototype); // 构造函数有原型对象
console.log(Child.prototype.constructor); // 构造函数有原型对象
console.log(Child.prototype.__proto__); // 原型对象有指向构造函数的指针
*/

/* 组合继承 */
/*
function Parent() {
    this.name = 'parent';
    this.play = [1, 2, 3];
}
Parent.prototype.song = function () {
    console.log('song.......');
}

function Child() {
    Parent.call(this); // 解决实例共享数据的问题
    this.type = 'child';
}
Child.prototype = new Parent(); // 继承父类的原型属性和方法
Child.prototype.constructor = Child; // 手动挂载构造函数，指向自己
let child = new Child();
console.log(Child.prototype.constructor);
console.log(child.__proto__.constructor);
child.song();
*/

/* 原型式继承 */
/*
let parent1 = {
    name: 'lixx',
    hobbies: [1, 2, 3],
    getNmae: function () {
        return this.name;
    }
}

let child1 = Object.create(parent1);
child1.name = 'gyl';
child1.hobbies.push(44);

let child2 = Object.create(parent1);
child2.name = 'lixx';
child2.hobbies.push(55);

console.log(child1.name);
console.log(child1.name === child1.getNmae());

console.log(child2.name);
console.log(child2.name === child2.getNmae());

console.log(child1.hobbies);
console.log(child2.hobbies);

let child3 = Object.create({}, {
    a: {
        value: 'lixx',
        enumerable: true,
        writable: true,
        configurable: true, // 可以被删除、修改
    },
    b: {
        value: 'gyl',
        enumerable: true,
        writable: true,
        configurable: true,
    },
});
console.log(child3);
*/

/* 寄生式继承 */
/*
let parent = {
    name: 'lixx',
    hobiees: [1, 2, 3],
    getName: function () {
        return this.name;
    }
};

function cloneObj(obj) {
    let clone = Object.create(obj);
    clone.getHobiees = function () {
        return this.hobiees;
    };
    return clone;
}

let child1 = cloneObj(parent);
child1.name = 'gyl';
console.log(child1);
console.log(child1.getName());
console.log(child1.getHobiees());
// console.log(child1.__proto__.name);
*/

/* 寄生组合式继承 */
/*
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3];
}
Parent.prototype.song = function () {
    console.log('sing...');
}
Parent.prototype.jjl = [456];
// console.log(Parent.prototype, (new Parent).__proto__, Parent.prototype.__proto__);

function clone(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Child(name, type = 'child1') {
    Parent.call(this, name);
    this.type = type;
}
clone(Parent, Child);

let child1 = new Child('lixx', 'child');
child1.play.push(23);
child1.jjl.push(234);
console.log('child1', child1.jjl); // [456, 234]
child1.song();

let child2 = new Child('gyl');
console.log('child2', child2.jjl); // [456, 234]
*/

/* ES6实现继承（extends） */
// class Parent {
//     constructor(name) {
//         this.name = name;
//     }
//     getName() {
//         return this.name;
//     }
//     song() {
//         console.log('sing...');
//     }
// }

// class Child extends Parent {
//     constructor(name, age = 20) {
//         super(name);
//         this.age = age;
//     }
// }

// let child = new Child('lixx');
// console.log(child);
// console.log(child.getName());
// child.song();

// function Parent() {
//     this.name = 'lixx';
// }
// Parent.prototype.age = 123;
// Parent.prototype.song = function () {
//     console.log('sing...');
// }

// function Child() {
//     this.type = 'child';
// }
// Child.prototype = new Parent;
// let c1 = new Child;
// Parent.prototype.dance = function () {
//     console.log('dancing...');
// }
// // console.log(c1.name, c1.age);
// // c1.song();
// // c1.dance();
// // console.log(c1.__proto__);

// function Child1() {
//     Parent.call(this);
//     this.type = 'child';
// }
// let c2 = new Child1;
// console.log(c2.name);
// console.log(c2.__proto__);

// function Child2() {
//     Parent.call(this);
//     this.type = 'child';
// }
// Child2.prototype = new Parent;
// Child2.prototype.constructor = Child2;
// let c3 = new Child2;
// // console.log(c3);
// // c3.song();
// // c3.dance();


// let p1 = {
//     name: 'lixx',
//     hobiees: [1, 2, 3],
//     getName() {
//         return this.name;
//     },
// };
// let c4 = Object.create(p1);
// // console.log(c4.getName());

// function clone(oriObj) {
//     let clone = Object.create(oriObj);
//     clone.getHobiees = function () {
//         return this.hobiees;
//     }
//     return clone;
// }
// let c5 = clone(p1, p1);
// console.log(c5.getHobiees());

// const dd = null
// console.log(dd);

function Parent(name) {
    this.name = name;
}
Parent.how = function () {
    console.log('parent howing.....');
}
Parent.prototype.sing = function () {
    console.log(`${this.name} is singing.....`);
}

function Child(name, sex) {
    Parent.call(this, name);
    this.sex = sex;
}
Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;
Child.prototype.dance = function () {
    console.log(`${this.name} is dancing`);
    console.log(this.constructor.how, '******');
}
// 子类上有创建自身的方法
Child.prototype.create = function () {
    return new this.constructor();
}

const myChild = new Child('lxx', 'male');
// console.log(Object.getPrototypeOf(myChild));
console.log(myChild);
// console.log(Child);
// myChild.dance();
// // myChild.sing();
// console.log(myChild.create().create());

// const child2 = new Child('lxx', 'male');
// console.log(child2);
function selfNew() {
    // const obj = Object.create(p.prototype);
    // let res = p.call(obj, ...[].slice.call(arguments, 1));
    // return res instanceof Object ? res : obj;
    const Con = [].shift.call(arguments);
    const obj = Object.create(Con.prototype);
    let ret = Con.apply(obj, arguments);
    return ret instanceof Object ? ret : obj;
}
const myChild2 = selfNew(Child, 'gyl', 'female');
console.log(myChild2, '***0000----');

// const myChild3 = Child('aa', 'll');
// console.log(name, sex);