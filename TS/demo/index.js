"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
        // private name: string
        this.n = 4;
        this.name = name;
    }
    Dog.prototype.run = function () {
        this.song();
    };
    Dog.prototype.song = function () {
        console.log(123123);
    };
    Dog.sex = 'male';
    return Dog;
}());
var dd = new Dog('a');
console.log(dd);
console.log(Dog.sex);
var LittleDog = /** @class */ (function (_super) {
    __extends(LittleDog, _super);
    function LittleDog(name, size) {
        var _this = _super.call(this, name) || this;
        _this.size = size;
        return _this;
    }
    return LittleDog;
}(Dog));
var lDog = new LittleDog('ss', 'ss');
console.log(lDog);
LittleDog.sex = 'female';
console.log(LittleDog.sex);
console.log(Dog.sex);
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function () {
        console.log('吃东西');
    };
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super.call(this) || this;
    }
    Cat.prototype.sleep = function () {
        console.log('cat sleeping');
    };
    return Cat;
}(Animal));
var nCat = new Cat();
// nCat.sleep();
var Pig = /** @class */ (function (_super) {
    __extends(Pig, _super);
    function Pig() {
        return _super.call(this) || this;
    }
    Pig.prototype.sleep = function () {
        console.log('Pig sleeping');
    };
    return Pig;
}(Animal));
var nPig = new Pig();
// nPig.sleep();
var animals = [nCat, nPig];
animals.forEach(function (n) { return n.sleep(); });
// 类实现接口
var Elephants = /** @class */ (function () {
    function Elephants(name) {
        this.name = name;
        this.name = name;
    }
    Elephants.prototype.eat = function () { };
    return Elephants;
}());
var Auto = /** @class */ (function () {
    function Auto() {
        this.state = 1;
        // private name = ''
    }
    return Auto;
}());
var tAuto = {
    state: 1,
};
var SecAuto = /** @class */ (function () {
    function SecAuto() {
        this.state = 2;
    }
    return SecAuto;
}());
var Bus = /** @class */ (function (_super) {
    __extends(Bus, _super);
    function Bus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bus;
}(Auto));
var PP = /** @class */ (function () {
    function PP(name) {
        this.sex = 'male';
        this.age = 13;
        this.name = name;
    }
    return PP;
}());
var yp = new PP('lixx');
console.log(yp.name);
console.log(PP.sex);
/* 泛型 */
function logg(value) {
    console.log(value);
    return value;
}
logg(['1', '2']);
logg(['1', '2', '3']);
var myLog = logg;
myLog('asd');
var myLLLog = logg;
var myLLog = logg; // 声明是必须指定类型，参数只能为数字
var Ppl = /** @class */ (function () {
    function Ppl() {
    }
    Ppl.prototype.run = function (value) {
        console.log(value, value.length);
        return value;
    };
    return Ppl;
}());
// let pplo: Ppl<number> = new Ppl();
var pplo = new Ppl();
pplo.run('123');
pplo.name = '123';
var a;
var b = [1, '2', {}];
a = [1];
console.log(a.length);
var x = {
    a: 1,
    b: 2,
};
var y = {
    a: 1,
    b: 2,
    c: 3,
};
// interface H {
//     (a: number, b: number): void
// }
function fot(handler) {
    return handler;
}
var h1 = function (a) { };
fot(h1);
var h2 = function (a, b) { };
fot(h2);
var h3 = function (a, b, c) { };
// fot(h3);
var h4 = function (a, b) { };
h3 = h4;
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
var Fruit;
(function (Fruit) {
    Fruit[Fruit["Banana"] = 0] = "Banana";
    Fruit[Fruit["Orange"] = 1] = "Orange";
    Fruit["Apple"] = "apple";
})(Fruit || (Fruit = {}));
;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
;
var apple = Fruit.Apple;
var banana = Fruit[0];
console.log(apple, '===');
console.log(banana, '===', Fruit[1]);
var Type;
(function (Type) {
    Type["JavaScript"] = "JavaScript";
    Type["Java"] = "java";
})(Type || (Type = {}));
var Java = /** @class */ (function () {
    function Java() {
    }
    Java.prototype.helloJave = function () {
        console.log('helloJave');
    };
    return Java;
}());
var JavaScript = /** @class */ (function () {
    function JavaScript() {
    }
    JavaScript.prototype.helloJavaScript = function () {
        console.log('helloJavaScript');
    };
    return JavaScript;
}());
// 类型保护
function isJavaScript(lang) {
    return lang.helloJavaScript !== undefined;
}
function sayType(type, x) {
    var lang = type === Type.Java ? new Java : new JavaScript;
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
// 联合属性
var pet = {
    run: function () { },
    jump: function () { },
};
// 字面量联合类型
var q;
q = 1;
var w;
w = '1';
var t; // a将会是一个never类型，应避免这种使用
var key;
key = 'a';
var u = {
    a: 1,
    b: 2,
};
// function getValues(obj: any, keys: string[]) {
//     return keys.map(k => obj[k]);
// }
function getValues(obj, keys) {
    return keys.map(function (k) { return obj[k]; });
}
var ioo = {
    a: 1,
    b: 1,
    d: 1,
    c: 1,
};
var op;
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
var OO;
(function (OO) {
    OO[OO["bb"] = 0] = "bb";
    OO["aa"] = "aa";
})(OO || (OO = {}));
console.log(OO[0], OO.bb);
console.log(OO[1], OO.aa);
