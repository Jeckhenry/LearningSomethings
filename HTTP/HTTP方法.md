## HTTP1.1规定了八种方法，单词都是大写形式。

1）<em style='color: yellow'>GET</em>

获取资源，也可以理解为读取资源或下载数据。

2）<em style='color: yellow'>HEAD</em>

返回资源的元信息，与GET返回的头信息一致，但是没有body。

3）<em style='color: yellow'>POST</em>

向资源提交数据，相当于写入或上传数据。

4）<em style='color: yellow'>PUT</em>

类似POST，但是PUT是更新（update）数据或者资源

5）<em style='color: yellow'>DELETE</em>

删除服务器资源，但此操作风险太大，一般服务器不会执行真正的删除，只是会做标记，更多的时候，服务器不处理DELETE请求。

5）<em style='color: yellow'>CONNECT</em>

是一个比较特殊的方法，要求服务器为客户端和另一台远程服务器建立一条特殊的连接隧道，这时 Web 服务器在中间充当了代理的角色

5）<em style='color: yellow'>OPTIONS</em>

方法要求服务器列出可对资源实行的操作方法，在响应头的 Allow 字段里返回。它的功能很有限，用处也不大，有的服务器（例如 Nginx）干脆就没有实现对它的支持

5）<em style='color: yellow'>TRACE</em>

方法多用于对 HTTP 链路的测试或诊断，可以显示出请求 - 响应的传输路径。它的本意是好的，但存在漏洞，会泄漏网站的信息，所以 Web 服务器通常也是禁止使用

```
安全：指方法不会对服务器上的资源产生实质上的修改。
幂等：多次执行相同的操作，结果也是相同的。

GET/HEAD是安全的。

GET/HEAD/DELETE/PUT是幂等的方法。
```
