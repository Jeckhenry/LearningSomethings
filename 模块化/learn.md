### 请你讲一下对于JS中模块的理解，Commonjs、 AMD和CMD分别有什么特点？
```
CommonJs：
同步依赖规范，不能在浏览器环境中直接使用。
使用modules.exports导出，使用require导入。（模块永远是单例）
require导入会把资源缓存，多次require同一个资源，第一次之后会读取缓存。

异步模块定义（以浏览器为目标执行环境）
1）AMD：
AMD的一般策略是让模块声明自己的依赖，而运行在浏览器中模块系统化会按需获取依赖，并在依赖加载完后
立即执行依赖他们的模块。AMD推崇依赖前置，所有模块加载完成后会立即执行模块工厂函数。
define(模块名, [依赖], function(依赖) {}) // 定义
require引用
2）CMD：
CMD推崇就近依赖，使用的时候在require依赖。
define(function(require,exports,module){})
3）ES6：import/export/export default

require：运行时加载
import：编译时加载
```

