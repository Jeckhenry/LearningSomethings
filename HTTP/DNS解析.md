## DNS解析过程

浏览器缓存 > 操作系统缓存 > 本地hosts文件 > 本地DNS服务器（非权威域名服务器）> 根域名服务器 > 顶级域名服务器 > 权威域名服务器

```
    IP协议将MAC地址包装成四位数字，域名系统将IP地址包装成有实际意义的、好记的名字

    域名可以用来重定向、负载均衡。（一个域名可以对应多个IP地址）
```