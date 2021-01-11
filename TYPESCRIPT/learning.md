1、类：类的成员属性都是实例的属性，类的成员方法都是原型方法。
    ts中类中的属性必须有初始值，即在constructor中进行赋值，也可将属性变为可选值

    class Dog {
        constructor(name: string) {
            this.name = name; // 必须赋值
        }
        name: string
        readonly n: number = 4
        run() {}
    }

    class Dog {
        constructor(name: string) {
            
        }
        name?: string // 可选属性不需要在构造函数中初始化
        run() {}
    }

    成员属性为private时只能被类使用；当constructor为private时，该类不能被继承，不能被实例化。
    protected：只能在类及子类中使用。该属性用于constructor时表示声明类一个基类，不呢个被实例化。
    readonly：只读属性必须被初始化。
    static：静态属性，只能通过类名调用。

    以上属性在构造函数的参数上也可以使用。constructor(private name: string)
    eg:
    class Dog {
        constructor(private name: string) {
            this.name = name;
        }
        // private name: string
    }

抽象类：抽象共性、多态
abstract class Animal {
    eat() {
        console.log('吃东西');
    }
    abstract sleep(): void
}

class Cat extends Animal {
    constructor() {
        super();
    }
    sleep() {
        console.log('cat sleeping');
    }
}

let nCat = new Cat();
nCat.sleep();

class Pig extends Animal {
    constructor() {
        super();
    }
    sleep() {
        console.log('Pig sleeping');
    }
}

let nPig = new Pig();
nPig.sleep();

let animals: Animal[] = [nCat, nPig];// 多态的体现
animals.forEach((n) => n.sleep())

