## JS继承方式有六种

### 第一种：原型链继承
每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，实例又包含一个指向原型对象的指针。

多个子类可以共同访问父类的方法和属性；
缺点：由于多个子类实例使用的是同一个原型对象，他们的内存空间是共享的。如果父类属性是复杂数据类型，一个子类实例更改属性值后，其他实例的该属性值都会变化。（原型属性共享问题）

```
function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3];
    this.song = function () {}
}

function Child() {
    this.type = 'child';
}
Child.prototype = new Parent1();

let child1 = new Child();
let child2 = new Child();
console.log('child1', child1.__proto__);
console.log('child2', child2.name);
console.log(Child.prototype);
/* function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3];
    this.song = function () {}
}*/
```

### 第二种：构造函数继承(借助call)
解决了原型链继承方式中共享引用数据的弊端。
缺点：只能继承父类的实例方法和属性，不能继承父类原型属性和方法。

```
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
console.log(child1);
console.log(child1.__proto__);
child1.song();// 报错
```

### 第三种方式：组合继承（第一种+第二种）
解决了子类不能继承父类原型方法和属性的问题。
缺点：会执行两次父类，浪费性能。

```
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
```