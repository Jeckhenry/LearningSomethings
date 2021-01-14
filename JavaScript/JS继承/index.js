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