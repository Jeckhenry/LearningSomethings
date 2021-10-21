1、闭包：一个可以访问另一个函数作用域内变量的函数。

    产生原因：当前环境中存在指向父级作用域的引用

```
function func1() {
    var a = 1;
    function func2() {
        return a;
    }
    return func2;
}
var res = func1();
res();
或者
var func3;
function func1() {
    var a = 1;
    func3 = function() {
        return func3;
    }
}
func1();
func3();
```

2、setInterval 有两个缺点：

使用 setInterval 时，某些间隔会被跳过；
可能多个定时器会连续执行；
可以这么理解：每个 setTimeout 产生的任务会直接 push 到任务队列中；而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。

```
let timer = null
interval(func, wait){
    let interv = function(){
        func.call(null);
        if (!timer) return;
        timer=setTimeout(interv, wait);
    };
    timer= setTimeout(interv, wait);
 }

 interval(function() {}, 20);

 if (timer) {
  window.clearSetTimeout(timer);
  timer = null;
}
```

3、link 和 script 标签是同步的。

```
    script:
    <script type="application/javascript" src="" defer></script>
    <script type="application/javascript" src="" sync></script>

    1)async="async" 异步执行脚本
    2)defer="defer" 脚本在页面完成解析时执行。 如果不使用async、defer，在浏览器 继续解析之前会立即读取并执行脚本
    3)type="MIME-type" 规定脚本的MIME类型

    <script async></script>可以实现异步加载，但是会阻塞window的onload事件。可以通过preload的onload事件实现资源的异步加载。先用link preload加载资源到本地，资源加载完后通过onload事件设置回调，使用资源或执行脚本

    <link rel="preload" as="style" href="async_style.css" onload="this.rel='stylesheet';">


    <link rel="preload" as="script" href="async_script.js" onload="
    var script = document.createElement('script');
    script.src = this.href;
    document.body.appendChild(script);>

```

```
    link:
    1)dns-prefetch
        浏览器在加载网页时对网页中的域名进行解析缓存，这样，当你点击网页上的链接时就无需进行DNS解析，减少用户等待时间，提高用户体验。
    2）Prefetch
        当确定网页在未来一定会使用某资源时，可以通过prefetch提前请求资源并且缓存以供后续使用，但请求时机由浏览器决定。该请求不会中断，该方法加载优先级很低，一般用来提高下一个页面的加载速度。
    3）Preload
        对于当前页面需要使用的资源，使用preload，可能在未来使用的资源使用prefetch。preload时声明式的fetch，可以强制请求资源，不会阻塞文档的onload事件。preload和prefetch请求的资源都在HTTP缓存中。
```

4、var let const 的区别

    1）var声明的变量会挂载在window上，而let和const不会
    2）var存在变量提升，而let和const不会
    3）let和const会形成块级作用域 ‘{}’
    4）同一作用域下let和const不能重复声明，而var可以
    5）const声明必须赋值，不能用null占位；声明后不能修改，除非声明的复合数据类型，可以修改属性值

5、Array.of：将参数当作数组元素，返回一个新的数组，参数一个时返回含有一个元素的数组

Array：构造器当参数为一个时，返回指定长度的空数组

判断数组的方法：var a = []

1）a instanceof Array

2）a.constructor === Array

3）Array.prototype.isPrototypeOf(a) // Object.prototype.isPrototypeOf

4）Object.getPrototypeof(a) === Array.prototype

5）Object.toString.call(a) === '[object Array]'

6）Array.isArray

```
   if (!Array.isArray) {
       Array.isArray = function(arg) {
           return Object.toString.call(arg) === '[object Array]';
       }
   }
```

部分方法介绍:

1）shift：删除头部元素，返回删除后的元素

2）unshift：向头部追加元素，返回追加后数组长度

3）copyWithin：复制部分元素，(target, start, end)，
复制开始的位置、被复制开始的位置、被复制结束的位置

4）fill：填充元素，(ele, start, end)被填充元素，开始位置，停止填充的位置

5）includes：该方法会忽略+0 和-0，
var a = [-0, 1, 2]
a.includes(+0) // true

6）reduce/reduceRight

7）entries：

       var a = ['a', 'b', 'c']
       var b = a.entries();
       // console.log(b.next()) // {value: __, done: false}
       console.log(b.next().value);//[0, 'a']
       console.log(b.next().value);//[0, 'b']
       console.log(b.next().value);//[0, 'c']
       console.log(b.next().value);//undefined

8）find：返回满足条件的第一个值

9）findIndex：返回满足条件的第一个值的索引

10）// values 方法

    var array = ["abc", "xyz"];
    var iterator = array.values();
    console.log(iterator.next().value);//abc
    console.log(iterator.next().value);//xyz

11）// keys

    var array = ["abc", "xyz"];
    var iterator = array.keys();
    console.log(iterator.next().value);//0
    console.log(iterator.next().value);//1

    该方法没有普遍支持：
    toSource() 方法表示对象的源代码。

6、类数组对象转化为数组

    1）Array.prototype.slice.call(obj)

    2）Array.prototype.concat([], obj)

    3）Array.from(obj)

    4）[...obj]

7、数组扁平化： var arr = [1, [2, [3, [4, 5]]]];

    1）
        for (let i = 0; i < arr.length; i += 1) {
            if (Array.isArray(arr[i])) {
                arr = [...arr.slice(0, i), ...arr[i], ...arr.slice(i + 1)];
                i--;
            }
        }

    2）
    function flatten(arr) {
        return arr.reduce((prev, after) => {
            return prev.concat(Array.isArray(after) ? flatten(after) : after);
        }, []);
    }

    3）
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr)
    }

    4）
    arr.toString().split(',')

    5）
    arr.flat(depth)

    6）
    let arr = [1, [2, [3, [4, 5]]], 6];
    function flatten(arr) {
        let str = JSON.stringify(arr);
        str = str.replace(/(\[|\])/g, '');
        str = '[' + str + ']';
        return JSON.parse(str);
    }
    console.log(flatten(arr));

8、数组排序方法；

![Alt text](./image/sortImg.png 'optional title')

9、标签函数

````
标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。最后，你的函数可以返回处理好的的字符串（或者它可以返回完全不同的东西，全看标签函数的处理）。用于该标签的函数的名称可以被命名为任何名字。

    function Tag(strings, personExp，ageExp,...)
    //strings:字符串数组，这个其实就是以${}分分隔符分割得到的数组
    //personExp：模板字符串中第一个${}的值
    //ageExp：模板字符串中第二个${}的值
    //...：模板字符串中第n个${}的值

    console.log `aaa${1}bbb`
    //['aaa','bbb'] 1
    console.log `aaa${1}b${2}bb`
    //['aaa','b','bb'] 1 2
    ```

10、请你简要介绍一下 JS 中==、===以及 Object.is()的区别是什么

````

==：会发生隐式类型转换，然后比较值
===：会先比较类型，再比较值
Object.is：类似与===
以下情况，Object.is 会判断两个值相等：
两个值都是 undefined
两个值都是 null
两个值都是 true 或者都是 false
两个值是由相同个数的字符按照相同的顺序组成的字符串
两个值指向同一个对象
两个值都是数字并且
都是正零 +0
都是负零 -0
都是 NaN
都是除零和 NaN 外的其它同一个数字

if (!Object.is) {
Object.is = function() {
if (x === y) {
// +0 != -0
return x != 0 || 1 / x === 1 / y;
} else {
// NaN == NaN
return x != x && y != y;
}
}
}

```

11、请你讲一下异步加载 js 的方法有哪几种，它们的适用条件分别是什么？

```

1. 给 script 标签添加 async 或 defer 属性
2. js 构造 script 标签在需要时加载
3. ajax 获取 js 内容，构造 script 标签或直接 eval

```

12、iframe 是什么？有什么缺点？

```

iframe 也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入在现有的网页中。

缺点：
iframe 会阻塞主页面的 onload 事件，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。；

iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。，会产生很多页面，不容易管理。

iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。

代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe 会不利于搜索引擎优化（SEO）。

很多的移动设备无法完全显示框架，设备兼容性差。
iframe 框架页面会增加服务器的 http 请求，对于大型网站是不可取的。

```

13、请你简要描述一下 Ajax 中是如何解决浏览器缓存问题的

```

1）添加请求头 if-modified-since:0
2）添加请求头 cache: no-cache
3）在 URL 后添加随机数或时间戳

```

14、defer 与 async 的区别如下:

相同点: 「异步加载 (fetch)」

不同点: 「async 加载(fetch)完成后立即执行 (execution)，defer 加载完成后延迟到 DOM 解析完成后(DOMContentLoaded 之前)才会执行」

async 可能在 DOMContentLoaded 之前或者之后加载并执行；defer 在 DOMContentLoaded 之前执行。

15、requestAnimationFrame 执行动画，最大优势是能保证回调函数在屏幕每一次刷新间隔中只被执行一次，这样就不会引起丢帧，动画也就不会卡顿

16、typeof
instanceof
Object.prototype.toString.call()

17、Promise.all：全都 resolve 后返回结果，有一个 reject 就整个 reject
Promise.race：返回最快 resolve 的结果，有一个 reject 就整个 reject
Promise.allSettled：返回所有结果，包含 resolve 和 reject

18、null 作为一个基本数据类型为什么会被 typeof 运算符识别为 object 类型呢？

    这个bug是第一版Javascript留下来的，javascript中不同对象在底层都表示为二进制，而javascript 中会把二进制前三位都为0的判断为object类型，而null的二进制表示全都是0，自然前三位也是0，所以执行typeof时会返回 ‘object’。

19、for...of 和 for...in

简单的说：

for...in遍历键名（简单遍历）

for...of遍历键值

for...of: 用来遍历数组/map/set/字符串等具有迭代器对象的集合，与foreach不同的是它可以响应

break、continue、return语句。

for...in: 用来遍历普通对象，但是会遍历出原型上的属性和方法，如果不想获取原型属性和方法

可以使用hasOwnProperty判断是否是该对象的实例属性和方法，或者使用object.keys
```

20、
遍历对象属性方法：

只有 for...in 可以获取到原型上的属性

1）for...in：可以获取对象自身的和继承的可枚举属性（不包含 symbol）

2）object.keys()：返回一个数组，可以获取对象自身的（不含继承的）可枚举属性（不包含 symbol）

3）Object.getOwnPropertyNames()：返回一个数组，可以获取对象自身的所有属性（不含 symbol，

但包含不可枚举属性）

4）Reflect.ownKeys()：返回一个数组，可以获取对象自身的所有属性，不管属性名是 symbol 或字符串，也不管是否可
枚举

21、

var y = function x() { x = 2 }

在函数外访问 x 将会报错，函数内部重新赋值 x 无效，这段代码在 js 严格模式下会报错

22、TCP 慢启动

```
1）是TCP的拥塞控制机制
2）当拥塞发生时，窗口的减小是成倍（1/2）的减小，在网络恢复时，窗口的增大是缓慢的增大，所以叫做慢启动
```

23、实现 promise.all

```
let myPromiseAll = function(promises) {
    let len = promises.length;
    if (len === 0) return Promise.resolve([]);
    let res = [], count = 0;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < len; i += 1) {
            Promise.resolve(promises[i]).then(r => {
                res[i] = r;
                if (count++ === len) resolve(res);
            }).catch(err => {
                reject(err);
            });
        }
    });
}
```

26、requestAnimationFrame 和 eventloop

26、css 动画、js 动画
