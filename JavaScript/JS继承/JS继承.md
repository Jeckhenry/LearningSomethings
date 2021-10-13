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

### 第四种：原型式继承
Object.create方法接收两个参数，一是作为新对象原型的对象，二是为新对象定义额外属性的对象。
缺点：只能对简单数据类型进行拷贝，引用数据类型的属性值会存在篡改的情况。

```
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
```

### 第五种：寄生式继承
使用原型式继承可以获得一份目标对象的浅拷贝，然后利用浅拷贝的能力进行增强，添加一些额外的方法，这种方式叫做寄生式继承。（类似于工厂模式）
缺点：对于引用类型数据内存共享的问题没有解决。
优点：可以新增一些属性和方法，来增强对象。

```
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
```

### 第六种：寄生组合式继承


```
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3];
}
Parent.how = function() { // 父类的实例方法
    console.log('howing....');
}
Parent.prototype.song = function () {
    console.log('sing...');
}
Parent.prototype.jjl = [456];
// console.log(Parent.prototype, (new Parent).__proto__, Parent.prototype.__proto__);

function clone(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child; 
    // 例如子类上有创建自身的方法时需要重新把构造函数指回子类；如果需要访问父类的实例方法和属性也不需要更改指向
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
```

## ES6实现继承，关键字extends
事实上在转化为ES5后也是采用了寄生组合式继承。

```
class Parent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    song() {
        console.log('sing...');
    }
}

class Child extends Parent {
    constructor(name, age = 20) {
        super(name);
        this.age = age;
    }
}

let child = new Child('lixx');
console.log(child);
console.log(child.getName());
child.song();
```

## 区别

1）ES6 class中所有的方法都是不可枚举的

2）ES6的class类必须用new命令操作，而ES5的构造函数不用new也可以执行

3）ES6的class类不存在变量提升，必须先定义，再使用

4）ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面。
   ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
   然后再用子类的构造函数修改this。

