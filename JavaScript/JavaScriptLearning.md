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

26、css 动画、js 动画、

```
css动画：
优点：
1）浏览器可以对动画进行优化，（调用硬件加速）
2）代码相对简单，性能调优方向固定
3）对于祯速表现不好的浏览器，css可以做到自然降级，js需要额外实现
缺点：
1）运行过程控制弱，无法暂停，也不能添加特定节点的回调函数
2）复杂动画代码量大

js动画：
优点：
1）动画控制力强，可以实现暂停、播放、回放、终止、取消等
2）动画效果更加丰富，比如闪烁效果
3）css3有兼容问题，但js基本没有
缺点：
1）js在主线程运行，而主线程还有其他需要运行的脚本、样式计算、布局、绘制等任务，
可能会出现阻塞，出现丢帧
2）代码复杂度高于css

总结：简单、不需要中间控制的动画用css，复杂、需要添加复杂交互的用js
```

27、前端性能优化

```
1）浏览器DNS缓存和DNS-prefetch
2）HTTP优化：减少HTTP请求；利用CDN；避免重定向
3）webpack：exclude/include避免不必要的转译；happypack开启多进程编译
    按需加载；开启GZIP压缩；
4）优化js：使用async和defer，延迟js文件的执行；避免对象和数组的深层查找
5）避免频繁操作样式，最好一次性重写style属性；避免使用计算样式
6）图片懒加载；Vue组件懒加载
```

28、如何减少白屏时间？？
参照输入URL地址后执行了什么
DNS优化，webview中可以在APP启动后创建一个不可见的webview，将常用的静态资源路径写入，进行DNS解析
并放入缓存

29、闭包的场景、作用
获取其他作用域中的变量，避免变量污染

计数器；
循环赋值
回调函数
IIIF立执行函数

30、CDN：回流
    CDN回流是CDN领域的一个专业名词，指的是CDN缓存服务器向源站请求资源的行为。
    CDN缓存服务器一般不向源站直接请求，只有在用户请求的资源不存在于缓存服务器或者
    资源过期的时候才会向源站发起请求。

31、ajax、fetch和axios的区别

    1）ajax，指的是XMLHTTPREQUEST对象，如果多个请求之间有先后关系，就会出现回调地狱

    2）axios是基于Promise用于浏览器和nodejs的HTTP客户端，本质上也是对XHR对象的封装，只不过

    他是Promise的版本，符合最新的规范。具有以下特征：

        （1）从浏览器中创建XMLHTTPRequest

        （2）支持Promise API

        （3）客户端支持防止CSRF

            防止CSRF，就是让我们的每个请求，都携带一个从cookie中得倒的key，根据同源策略，

            假冒的网站是拿不到我们cookie中的key的，这样后台就可以轻松辨别这个请求是否是用户

            在假冒网站上的误导输入，从而采取正确的策略。

        （4）提供了一些并发请求的接口

        （5）拦截、转换请求和响应

        （6）取消请求

        （7）自动转换JSON数据
    
    3）fetch，是ajax的替代品，实在es6出现的，使用了promise对象。fetch是原生js，没有使用XHR对象。

        优点：写法更方便；支持async/await

        缺点：

        （1）fetch只针对网络请求报错，对400、500都当作请求成功返回，不会reject，只有网络请求失败时才会reject；

        （2）默认不带cookie，需要添加配置项，fetch(url, { credentials: 'include' })

        （3）fetch无法中断请求，不支持超时控制，使用settimeout、promise.reject并不能阻止请求过程继续运行，造成了流量浪费

### 如何实现超时、中断

    超时：可以使用promise.race和一个promise实例实现

    中止：AbortController

```
let controller = new AbortController();
let signal = controller.signal;
 
let timeoutPromise = (timeout) => {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
   resolve(new Response("timeout", { status: 504, statusText: "timeout " }));
   controller.abort();
  }, timeout);
 });
}
let requestPromise = (url) => {
 return fetch(url, {
  signal: signal
 });
};
Promise.race([timeoutPromise(1000), requestPromise("https://www.baidu.com")])
 .then(resp => {
  console.log(resp);
 })
 .catch(error => {
  console.log(error);
 });
```

        （4）无法原生监测请求进度，而XHR可以

            axios监听进度：

                onUploadProgress: (progress) {
                    progress.loaded / progress.total
                }

            XHR监听进度：

                onprogress(this: XHR, progressEvent)事件

### axios并发请求：

    axios.all方法

    注意点：axios.all和promise.all是一个道理；axios.all不在axios的构造函数上，所以实例无法调用，如果使用axios.all

    就不能使用封装的axios，封装的axios没有这个方法。


32、git reset和git revert的区别

    1）git reset：回退之前的某一个版本，目标版本之后的都不要了

    git reset --hard commit_id （不加--hard，被抛弃版本的文件还在，加上之后被抛弃版本的文件会被删除）

    git push -f

    2）git revert：反做某一个版本，会在当前版本丢掉目标版本（会保留目标版本）的内容，并生成一个新的版本

    git revert -n 版本号

    3）取消某一个commit

    git log：找到要删除的commit的前一个commit，复制ID

    git rebase -i commit_id：将不需要的commit前的命令改为drop，保存退出即可

    或者，记录当前commit_id（A），找到需要取消的commit的前一个ID（B）
    git reset --hard B
    git cherry-pick A

    git rebase -i HEAD~2 合并最近的两个commit。（squash：使用提交，但融合到前一个提交；fixup：使用提交，但丢弃说明日志）

    4）本地缓存（前提必须是git 已经追踪的文件，即必须是git add之后的）

    git stash save "" ：保存缓存

    git stash show ：查看做了哪些改动

    git stash list：查看有哪些缓存

    git stash pop：恢复缓存的目录，并删除对应缓存

    git stash apply：应用缓存，但并不删除

    git stash drop stash@{num}：删除某个缓存

    git stash clear

    5）git log和git reflog的区别

    git log：只能查看当前分支的commit，并且回退之后commit历史丢失，无法查看

    git reflog：commit不分分支，加-n可以限制条数

35、VueRouter的两种模式：本质上是改变浏览器的历史记录

### history: H5新特性，允许前端更改URL地址而不重新发起请求（将URL替换并且不刷新页面）

    pushState(state, title, url);
    火狐浏览器要把state存在本地磁盘，所以state最大是640K，超出会引发异常，需要使用本地存储

    通过监听popState方法（可以监听到用户点击浏览器的前进、后退按钮，手动调用history的foward、back、go，但是无法监听到
    pushState和replaceState）实现组件替。

    浏览器在刷新时会按照真实路径发送请求，如果是前端设置的路由URL，那么服务器有可能就不存在对应资源，就会返回404，
    所以线上部署时必须后端配合，例如nginx只需如下配合

```
try_files $uri /index.html
```
    优点：美观，符合URL规范

    缺点：

    1）需要服务器支持重定向的功能，否则一刷新页面就有可能出现404

    2）兼容性不如hash，利用了HTML5中的history特性，需要特定浏览器支持



### hash:#后的路径发生改变，浏览器不会重新发起请求，而是会触发hashchange事件

    优点：

    1）#后的值改变，不会向服务器重新请求，完全属于前端路由；

    2）兼容性好，浏览器都支持

    3）只需要前端配置路由表即可

    缺点：hash值前有#，不符合URL规范，也不美观

35、VueRouter中的push之后，组件销毁了吗，a、b两个页面的生命周期经历了哪些

    页面跳转后A回销毁

    生命周期：
    B(beforecreate)->B(created)->B(beforemount)->A(beforedestroy)->A(destroyed)->B(mounted)

36、flex布局

    align-self:可以设置单个元素的样式

    flex-grow:默认0，存在多余空间也不放大

    felx-shrink:默认为1，如果空间不足，将缩小

    flex-basis:在分配多余空间之前项目占据主轴空间大小，默认auto，即项目自身大小

    flex: 1,代表  1 1 0px

37、数据类型判断

    typeof 1 === 'number'

    typeof 'a' === 'string'

    typeof true === 'boolean'

    typeof [] === 'object'

    typeof {} === 'object'

    typeof undefined === 'undefined'

    typeof null === 'object'

    typeof console.log === 'function'

    typeof Symbol(1) === 'symbol'

    {} instanceof Object 会报错，({}) instanceof  Object不会报错，结果true

38、mvvm和mvc区别

    mvvm：model/view/viewmodel

    mvc：model/view/controller

    mvc中数据和视图的同步需要通过controller层进行控制，数据是单向流转的，并且需要我们手动操作DOM，
    而MVVM中的viewmodel实现了view和model的自动同步，也就是model属性改变的时候不需要手动操作DOM
    去改变视图，而是改变属性后该属性对应的视图也会改变。

39、事件环机制：settimeout一进入队列后就会开始计时，长时间的阻塞操作会影响settimeout的执行顺序

console.log(1);
setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
        console.log(3);
    })
    console.log(8);
}, 20)
for (let i=0; i<100000000; i++) {}
new Promise((resolve, reject) => {
    console.log(4);
    resolve(5);
}).then((data) => {
    console.log(data);
})
setTimeout(() => {
    console.log(6);
},10)
console.log(7)

40、深拷贝和浅拷贝

    浅拷贝：

        1）Object.assign    Object.assign(target, {})

            * Object.assign不会拷贝对象的继承属性
            * 不会拷贝不可枚举的属性
            * 会拷贝Symbol类型的属性
        
        2）扩展运算符： let obj = {...obj2};

        3）concat拷贝

        4）slice拷贝

        5）手动实现一个浅拷贝

            const shallowClone = function(target) {
                if (typeof target === 'object' && target !== null) {
                    const cloneTarget = Array.isArray(target) ? [] : {};
                    for (let prop in target) {
                        if (target.hasOwnProperty(prop)) {
                            cloneTarget[prop] = target[prop];
                        }
                    }
                    return cloneTarget;
                } else {
                    return targte;
                }
            }
    深拷贝：

        1）JSON.parse(JSON.stringify());

            * 拷贝的对象的值中如果有function、undefined、symbol这几种类型，序列化后字符串中
                会丢失这几个键值对
            * 拷贝Date引用类型会变成字符串
            * 无法拷贝不可枚举的属性
            * 无法拷贝原型链
            * 拷贝RegExp引用类型会变成空对象
            * 对象中含有NaN、Infinity、-Infinity，JSON序列化后会变成null
            * 无法拷贝对象的循环引用

        2）
        const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
        const deepClone = function (obj, hash = new WeakMap()) {
            if (obj.constructor === Date) 
            return new Date(obj)       // 日期对象直接返回一个新的日期对象
            if (obj.constructor === RegExp)
            return new RegExp(obj)     //正则对象直接返回一个新的正则对象
            //如果循环引用了就用 weakMap 来解决
            if (hash.has(obj)) return hash.get(obj)
            let allDesc = Object.getOwnPropertyDescriptors(obj)
            //遍历传入参数所有键的特性
            //继承原型链
            let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
            hash.set(obj, cloneObj)
            for (let key of Reflect.ownKeys(obj)) { 
                cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
            }
            return cloneObj
        }


41、// 通过arr得出newArr

const arr = ["Project/imgs/activity@2x.png", "Project/imgs/activity_111@3x.png", "Project/imgs/activity_222.png"];

const newArr = ["activity", "activity_111", "activity_222"];

42、px、rem、em、vw/vh

    px：像素缩写，相对于屏幕分辨率而言

    em：相对长度单位，参考父元素font-size，如果父元素未设置，就按浏览器默认字体（一般是16px）

    rem：相对于浏览器跟字体的相对单位

    vw：浏览器视口宽/100

    vh：浏览器视口高/100

    vmin：浏览器视口宽和高中小的那个/100

    vmax：浏览器视口宽和高中大的那个/100

    vm：浏览器视口宽和高中小的那个/100

    如何使 1rem=10px？？？？？设置HTML{font-size：62.5%；}即可

    如果父元素没有设置高，子元素高度设置百分比无效，按自身实际高度

    元素绝对定位后，百分比设置宽高，是按照document.documentElement.width/height来设置的

43、观察者模式和发布订阅者模式

    观察者模式：目标和观察者直接进行交互，

    发布订阅者模式：目标和观察者之间有一个调度中心，也就实现了目标和观察者之间的解耦，比如发布者发布了很多消息，但是

    不想所有订阅者都收到消息，这个时候调度中心就可以单独处理。

    例如
    Vue中的数据响应式变化是观察者模式，每一个响应式属性都有一个Dep，Dep中存放了依赖这个属性的watcher，如果数据变化了，

    Dep就通知观察者watcher去调用更新方法

    Vue中的事件总线是发布订阅者模式

    document.addeventListener类似观察者模式

44、工厂模式：通过不同的参数调用不同的构造函数

当我们创建的对象或组件涉及到了很高的复杂度。

当我们需要根据所处的环境生成不同的对象实例时。

当我们处理含有相同属性的对象或组件时。

当创建的对象是其他对象的实例，而且要求它们有一致的API接口时。有利于解耦。

45、如何实现一个v-model

    是v-on和v-bind的语法糖，相当于<input v-bind='person' v-on.input='person = event.targte.value'>

46、webpack中css和js打包是如何分包的？？？？

mini-css-extract-plugin

47

async function async1() {
    console.log(1)
    await new Promise((resolve) => {
        console.log(2)
        resolve()
    }).then(r => {
        console.log(3);
    })
}
console.log(4);
async1()
setTimeout(() => {
    console.log(5)
}, 0)
console.log(6);

// 4  1  2  6  3 5

48、cookie、session、token

49、vue实现一个指令、过滤器？？？？？？？

    指令：
    1）全局： 

        Vue.directive(name, {
            bind/inserted/update/componentUpdated/unbind: function(el, binding, vnode, oldVnode) {
                // binding:  { name, value, oldValue, expression, arg, modifiers }
            }
        })
    2）局部：
        directives: {}

    过滤器：
    1）全局：

        Vue.filter(name, function(value) {})
    
    2）局部：

        filters: {}

50、es6 class的装饰器？？？

    1）可以装饰class
        // target:类本身
        function decorate(target) {
            target.name = 'll';// 静态属性
            target.prototype.age = 10;// 实例属性
        }

        @decorate // 直接就调用了。不需要加()
        class Person{}
    2）装饰类属性

        function decorate(target, name, descriptor) {
            // target:类
            // name: 属性名
            // descriptor:属性描述 
                // { value, enumerable, writable,configurable }
        }

    3）为什么不能对函数使用装饰器？

        函数存在函数提升。如果必须对函数进行装饰，可以使用浩高阶函数。

        function doSomethin() {}

        function decorate(wrapper) {
            return function() {
                console.log('before);
                const result = wrapper.apply(this, arguments);
                console.log('after');
                return result;
            }
        }

51、高阶函数

52、Object.defineProperty

    如果只设置了getter，没有设置setter，然后赋值，宽松模式下不会报错，严格模式下会报错

    只设置setter，不会报错，只是值会返回undefined

    var a = {}
    var name = 123
    Object.defineProperty(a, 'name', {
        get() {
            return name
        },
        // set(value) {
        //     name = value
        // }
    })
    a.name = 345
    console.log(a.name)

    Cannot set property name of #<Object> which has only a getter

53、

// add(add1, add2, add3, add4)
const add = function() {
    const arr = Array.prototype.slice.call(arguments);
    const result = arr.reduce((acc, cur) => cur(acc), null)
    return result;
}

54、Vue.extends

    继承父类Vue，合并选项，初始化props，初始化computed


55、promise.finally

    Promise.prototype.finally = function(onFinally) {
        return this.then(
            // onfulfilled
            res => Promise.resolve(onFinally()).then(() => res),
            // onRejected
            err => Promise.resolve(onFinally()).then(() => {throw err})
        );
    }

56、vue computed watcher nextick

57、webpack、publicPath、path、

    配置@代表src

vue.component   vue.extend

set的方法