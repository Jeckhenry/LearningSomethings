class Dog {
    constructor(private name: string) {
        this.name = name;
    }
    // private name: string
    readonly n: number = 4
    run() {
        this.song();
    }
    private song() {
        console.log(123123);
    }
    static sex: string = 'male'
}
let dd = new Dog('a');
console.log(dd);
console.log(Dog.sex);


class LittleDog extends Dog {
    constructor(name: string, size: string) {
        super(name);
        this.size = size;

    }
    size: string
}

let lDog = new LittleDog('ss', 'ss');
console.log(lDog);
LittleDog.sex = 'female'
console.log(LittleDog.sex);
console.log(Dog.sex);

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
// nCat.sleep();

class Pig extends Animal {
    constructor() {
        super();
    }
    sleep() {
        console.log('Pig sleeping');
    }
}

let nPig = new Pig();
// nPig.sleep();

let animals: Animal[] = [nCat, nPig];
animals.forEach((n) => n.sleep())


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

class PP {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    private sex = 'male'
    protected age = 13
}

let yp = new PP('lixx');
console.log(yp.name);
console.log((PP as any).sex);

/* 泛型 */
function logg<T>(value: T): T {
    console.log(value);
    return value;
}
logg<string[]>(['1', '2']);
logg(['1', '2', '3']);

// 类型别名 type
type Log = <T>(value: T) => T;
let myLog: Log = logg;
myLog('asd');

// 也可以这样定义方法，与type作用一致
interface LLog {// 声明是不需要指定参数类型
    <T>(value: T): T
}
let myLLLog: LLLog = logg;
interface LLLog<T = string> { // 提供默认数据类型
    (value: T): T
}
let myLLog: LLLog<number> = logg;// 声明是必须指定类型，参数只能为数字

// 泛型类与泛型约束
interface Length {
    length: number
}
class Ppl<T extends Length> { // 参数必须为具有length属性数据
    run(value: T): T {
        console.log(value, value.length);
        return value
    }
    name?: T
}
// let pplo: Ppl<number> = new Ppl();
let pplo = new Ppl<string>();
pplo.run('123');
pplo.name = '123';

let a: any;
let b = [1, '2', {}];
a = [1];
console.log(a.length);


// 接口兼容
interface X {
    a: number;
    b: number;
}

interface Y {
    a: number;
    b: number;
    c: number;
}
let x: X = {
    a: 1,
    b: 2,
};
let y: Y = {
    a: 1,
    b: 2,
    c: 3,
}
// x = y; // 成员少的可以兼容成员多的
// y = x; // 成员多的无法兼容成员少的

// 函数兼容，参数多的兼容少的，固定参数兼容可选参数
type Handler = (a: number, b: number) => void;
// interface H {
//     (a: number, b: number): void
// }
function fot(handler: Handler) {
    return handler;
}
let h1 = (a: number) => { }
fot(h1);

let h2 = (a: number, b: number) => { }
fot(h2);

let h3 = (a: number, b: number, c: number) => { }
// fot(h3);

let h4 = (a: number, b?: number) => { }

h3 = h4
// h1 = h4;
// h4 = h1;
// h1 = h4;
// h2 = h4;
// h3 = h4;
// h1 = h4;
// h2 = h1;
// h3 = h2;
// h3 = h1;
// console.log(h3, '===');

// class类的兼容：两个类参与兼容性对比时静态变量不参与对比；如果包含私有成员，两个类不兼容，只有父子类
//  会兼容

enum Fruit { Banana, Orange, Apple = 'apple' };
enum Color { Red, Yellow, Green };
let apple: Fruit = Fruit.Apple;
let banana: string = Fruit[0];
console.log(apple, '===');

console.log(banana, '===', Fruit[1]);

enum Type { JavaScript = 'JavaScript', Java = 'java' }
class Java {
    helloJave() {
        console.log('helloJave');
    }
    java: any
}

class JavaScript {
    helloJavaScript() {
        console.log('helloJavaScript');
    }
    javascript: any
}

// 类型保护

function isJavaScript(lang: Java | JavaScript): lang is JavaScript { // 类型谓词
    return (lang as JavaScript).helloJavaScript !== undefined;
}
function sayType(type: Type, x: string | number) {
    let lang = type === Type.Java ? new Java : new JavaScript;
    // if ((lang as JavaScript).helloJavaScript) {
    //     (lang as JavaScript).helloJavaScript();
    // } else {
    //     (lang as Java).helloJave();
    // }

    // 1、instanceof
    // if (lang instanceof Java) {
    //     lang.helloJave();
    // } else {
    //     lang.helloJavaScript();
    // }

    // 2、in
    // if ('java' in lang) {
    //     // 类型保护区块
    //     lang.helloJave();
    // } else {
    //     lang.helloJavaScript();
    // }

    // 3、typeof
    // if (typeof x === 'string') {
    //     x.length;
    // } else {
    //     x.toString();
    // }
    return lang;
}
// console.log(Type.Java);

interface Dogs {
    run(): void
}

interface Cats {
    jump(): void
}

// 联合属性
let pet: Dogs & Cats = {
    run() { },
    jump() { },
}

// 字面量联合类型
let q: 1 | 2 | 3
q = 1
let w: '1' | '2' | '3'
w = '1'

interface A {
    a: number
}
interface B {
    a: string
}
let t: A & B;// a将会是一个never类型，应避免这种使用
type C = A & B;
interface T extends A {

}

interface Obj {
    a: number;
    b: number;
}
let key: keyof Obj
key = 'a'
let u: Obj = {
    a: 1,
    b: 2,
}

// function getValues(obj: any, keys: string[]) {
//     return keys.map(k => obj[k]);
// }
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(k => obj[k]);
}

interface I {
    a: number;
    b: number;
    c: number;
}

interface O {
    a: number;
    b: number;
    d: number;
}

type ReadonlyI = Readonly<I>;
type PartialI = Partial<I & O>; // Partial<I & O>
let ioo: PartialI = {
    a: 1,
    b: 1,
    d: 1,
    c: 1,
}
type PickI = Pick<I, 'a'>;

type RecordObj = Record<'a' | 'b', O>;
let op: RecordObj
op = {
    a: {
        a: 1,
        b: 1,
        d: 1,
    },
    b: {
        a: 1,
        b: 1,
        d: 1,
    },
};
enum OO { bb, aa = 'aa' }
console.log(OO[0], OO.bb);
console.log(OO[1], OO.aa);

type TypeName<T> = T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolena' : 'oject';

type T1 = TypeName<string | number>
// let t1: T1
// t1 = 'number'

type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T;
type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>;

type T5 = Diff<'a', 'a' | 'e'> // never
type T6 = Diff<'b', 'a' | 'e'>;// 'b'
type T7 = Diff<'c', 'a' | 'e'>;// 'c'
// never | 'b' | 'c'
// 'b' | 'c'

type NotNull<T> = Diff<T, undefined | null>;
type T8 = Diff<string | number | undefined | null, undefined | null>;

type T90 = Exclude<'a' | 'b' | 'c', 'a' | 'e'>;
type T91 = NotNull<string | number | null | undefined>;
type T92 = Extract<'a' | 'b' | 'c', 'a' | 'e'>;

type T10 = ReturnType<() => ''>;


interface Pl {
    name: string
}
interface Pl {
    age: number
}
let d: Pl = {
    name: '',
    age: 10
}

type LOO = { name: string }
type LOO1 = { age: number }

type LOO2 = { hig: number } & Pl
// type LOO2 = { hig: number } & LOO

interface Pll extends Pl {
    hig: number
}
interface Plll extends LOO1 {
    hig: number
}
// let kk: Plll = {}
class KK implements LOO {
    name: string
    constructor(name: string) {
        this.name = name;
    }
}

type myString = string

