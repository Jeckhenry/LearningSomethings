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

3、link和script标签是同步的。

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

4、var    let   const的区别
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

   if (!Array.isArray) {
       Array.isArray = function(arg) {
           return Object.toString.call(arg) === '[object Array]';
       }
   }

   部分方法介绍:
   1）shift：删除头部元素，返回删除后的元素
   2）unshift：向头部追加元素，返回追加后数组长度
   3）copyWithin：复制部分元素，(target, start, end)，
   复制开始的位置、被复制开始的位置、被复制结束的位置
   4）fill：填充元素，(ele, start, end)被填充元素，开始位置，停止填充的位置
   4）includes：该方法会忽略+0和-0，
        var a = [-0, 1, 2]
        a.includes(+0) // true

   5）reduce/reduceRight
   6）entries：
       var a = ['a', 'b', 'c']
       var b = a.entries();
       // console.log(b.next()) // {value: __, done: false}
       console.log(b.next().value);//[0, 'a']
       console.log(b.next().value);//[0, 'b']
       console.log(b.next().value);//[0, 'c']
       console.log(b.next().value);//undefined

   7）find：返回满足条件的第一个值
   8）findIndex：返回满足条件的第一个值的索引
   9）// values方法
    var array = ["abc", "xyz"];
    var iterator = array.values();
    console.log(iterator.next().value);//abc
    console.log(iterator.next().value);//xyz
   10）// keys
    var array = ["abc", "xyz"];
    var iterator = array.keys();
    console.log(iterator.next().value);//0
    console.log(iterator.next().value);//1

    该方法没有普遍支持：
    toSource() 方法表示对象的源代码。

