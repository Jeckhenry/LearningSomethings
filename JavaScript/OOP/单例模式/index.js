// 单例模式(singleton pattern)
// 1、表现形式：
//   var obj = {};
// 2、作用:
//   把描述同一件事务的属性和特征进行分组归类（存储在一个堆内存中），
//   因此避免了全局变量之间的冲突和污染
// 3、每一个命名空间都是js中object这个基类的实例，实例之间互不干扰
//   所以称为单例

var p1 = {
    name: 'lxx',
    age: 27,
}

var p2 = {
    name: 'gyl',
    age: 27,
}

// p1 p2不仅是对象名，更是命名空间（namespace）

/*
    高级单例模式：
    1、在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存）；
      在AA中创建一个堆内存，把堆内存的地址赋值给命名空间
    2、好处：可以在AA中创建很多变量，可以决定暴露哪些变量（模块化）。
    var nameSpace = (function() {
        var n = 2;
        function fn () {};
        return {
            fn: fn,
            n: n;
        }
    })();



*/

// 自执行函数中this为window

var fn = function () {
    console.log(this, '----');
}

var obj1 = {
    aa: fn,
}
obj1.aa();
fn();

var obj2 = {
    aa: function () {
        console.log(this, '=====');
    },
}
obj2.aa();