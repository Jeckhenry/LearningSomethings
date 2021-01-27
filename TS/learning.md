1、类：类的成员属性都是实例的属性，类的成员方法都是原型方法。
    ts中类中的属性必须有初始值，即在constructor中进行赋值，也可将属性变为可选值
```
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
```

成员属性为private时只能被类使用；当constructor为private时，该类不能被继承，不能被实例化。
protected：只能在类及子类中使用。该属性用于constructor时表示声明类一个基类，不能被实例化。
readonly：只读属性必须被初始化。
static：静态属性，只能通过类名调用。

以上属性在构造函数的参数上也可以使用。constructor(private name: string)
```
eg:
class Dog {
    constructor(private name: string) {
        this.name = name;
    }
    // private name: string
}
```

抽象类：抽象共性、多态
```
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
```

类实现接口：接口中的必须属性在类中必须全部声明。接口只能约束类中的公有（public）成员。
并且不能约束构造函数。
```
interface samlEle {
    name: string;
    eat(): void;
    sex?: string;
}

// 类实现接口
class Elephants implements samlEle {
    constructor(public name: string) {
        this.name = name;
    }
    eat() { }
}
```

接口可以继承接口，接口也可以继承类（接口抽象类的成员，只有类的成员结构，没有具体的成员实现）。
类的子类也可以实现接口
```
class Auto {
    state = 1
    // private name = ''
}
interface AutoInterface extends Auto { }

let tAuto: AutoInterface = {
    state: 1,
}

class SecAuto implements AutoInterface {
    state = 2
}

class Bus extends Auto implements AutoInterface { }
```

<p style='color: red;'>** 如果接口继承的类中有私有属性（private）和受保护属性（protected），那么只能由类的子类实现接口</p>

2、交叉类型和联合类型
    交叉类型：&连接，取并集。

3、索引类型 keyof T

4、映射类型
    Readonly<>:将属性改为只读

    Partial<>: 将属性改为可选属性

    Pick<I, 'a' | 'b'>:获取部分属性

    以上都是同派类型

    Record<'a' | 'b'(类型), (已知类型)>: 非同派类型

5、条件类型
    T extends U ? x : y;

    (A | B) extends U ? x : y
    相当于 A extends U ? x : y | B extends U ? x : y