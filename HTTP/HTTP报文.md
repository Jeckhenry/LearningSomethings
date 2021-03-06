### HTTP协议的核心部分：报文内容

-----

### TCP/UDP报文结构
```
TCP协议会在实际传输的数据前附加一个20字节的头部数据，存储TCP协议必须的额外信息，例如发送方的端口号、接收方的端口号、包序号、标志位等。
```
---
### HTTP协议头部数据
```
HTTP协议也会在实际传输的数据前附加额外数据，不过与TCP/UDP不同的是，它附加的是纯文本数据，所以头数据都是ASCII码的文本。

HTTP协议的请求报文和响应报文的结构基本相同，由三部分组成：
1、起始行（start line）：描述请求或响应的基本信息；
2、头部字段集合（header）：key-value形式详细的说明报文；
3、消息正文（entity）：实际传输的数据，不一定是纯文本，也可以是图片、视频等二进制文件。

起始行与头部经常合称为请求头/响应头，消息正文又称为实体，为了与header对应，实体又称为body。

HTTP协议规定报文必须有header，不必须有body，header后有一个空行CRLF，十六进制的0D0A（0D表示回车，0A表示换行）。

报文示例：
---
GET / HTTP/1.1    起始行（请求行）
Host: 127.0.0.1   头部
Connection: keep-alive  头部
...
                   CRLF
body内容
---

GET / HTTP/1.1 CRLF
请求行组成： 请求方法（GET/POST） 请求URI    协议版本    CRLF（表示结束）

HTTP1.1  200  OK
状态行（响应行）组成：协议版本  状态码   状态码文字补充

头字段规范：
1）字段名不区分大小写，但首字母大写的可读性更好；
2）字段名里不能出现空格，可以使用‘-’连接，但不能使用‘_’；
3）字段名后直接根‘:’，不能加空格，eg： host : 127.0.0.1是错误报文；
4）Host字段告诉服务器哪台主机处理，是HTTP/1.1协议里规定必须出现的字段
```


1:如果拼 HTTP 报文的时候，在头字段后多加了一个 CRLF，导致出现了一个空行，会发生什么？
在header 下面第一个空行以后都会被当作body 体

2:讲头字段时说“:”后的空格可以有多个，那为什么绝大多数情况下都只使用一个空格呢？
头部多一个空格就会多一个传输的字节，去掉无用的信息，保证传输的头部字节数尽量小


## 本地缓存一般包括强缓存和协商缓存两种形式。

nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。

<em style='color: red'>强缓存</em>是指浏览器在加载资源时，根据请求头的 expires 和 cache-control 判断是否命中客户端缓存。如果命中，则直接从缓存读取资源，不会发请求到服务器，反之还需要走完整的资源请求流程。

<em style='color: red'>协商缓存</em>是指，浏览器会先发送一个请求到服务器，通过 last-modified/if-modified-since 和 etag/if-none-match 验证资源是否命中客户端缓存。如果命中，服务器会将这个请求返回，但不会返回这个资源的数据，依然是从缓存中读取资源。 如果没有命中，无论是资源过期或者没有相关资源，都需要向服务器发起请求，等待服务器返回这个资源。

## 部分请求头字段

### 几个HTTP常用的类别<em style='color: red'>MIME-TYPE(content-type)</em>：

1）text：即文本格式的可读数据，例如text/html表示超文本文档，text/plain表示纯文本，text/css表示样式表；

2）image：即图像文件，有image/jpg、image/png、image/gif等；

3）audio/video：音频和视频数据，例如audio/mpeg，video/mp4等；

4）application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有application/json、application/pdf、application/javascript等；
如果实在不知道什么数据类型，就用application/octet-stream。

### <em style='color: red'>Encoding-type（编码格式）</em>: gzip、deflate、br.

### Http头字段

Accept: text/html,application/xml,image/png; // 客户端可以理解的MIMI type，可以使用多种类型，使用‘,’分割。（请求头）

Content-type: text/html; // 响应头中标识数据类型。（<em style='color: red'>此字段响应头和请求头中都可以使用，只要请求数据中有body，就可以使用）</em>

Accept-Encoding: gzip, deflate, br; // 客户端支持的压缩格式，没有此字段说明客户端不支持压缩

Content-Encoding: gzip; // 实际使用的压缩格式，没有此字段表示数据没有被压缩。

Accept-Language: zh-CN, zh, en;// 客户端可理解的自然语言

Content-Language: en;// 实际使用的自然语言

Accept-charset: utf-8, gbk;// 客户端支持的字符集

Content-type: text/html; charset=utf-8 // 实际的字符集

可以使用q来表示权重

eg: Accept: text/html, application/xml;q=0.9, */*;q=0


Vary: Accept-Encoding,User-Agent,Accept // 服务器在内容协商时使用的参考字段








