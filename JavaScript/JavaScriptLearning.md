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