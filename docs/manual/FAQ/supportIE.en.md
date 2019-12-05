---
title: Use G6 with IE
order: 3
---

## Problem

Recently, we received some feedbacks about usage of G6 in IE. Some users found there are some display problems when using G6 in IE. 


## Solution

们在项目中只需要引入 `babel-polyfill` 即可，具体使用方法如下：
- 在主入门文件中引入 `babel-polyfill` ；
- 在 `bable-loader` 中加入如下代码：

```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('node_modules/@antv/g6')]
}
```

> include 表示哪些目录中的 .js 文件需要进行 babel-loader；exclude 表示哪些目录中的 .js 文件不要进行 babel-loader。


include 中的内容请根据具体项目情况设置。

更详细的请参考：https://blog.csdn.net/y491887095/article/details/81541502。


另外，针对@vue/cli、umi、create-react-app搭建的项目给出一些解决方案，**务必确保在没有引入 G6 时你的项目可以正常运行在IE上**。

类似如下错误。
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dIrtS6eorxUAAAAAAAAAAABkARQnAQ' width=800 />

### vue/cli

本[案例](https://github.com/lxfu/vue-g6)是基于@vue/cli(V: 4.0.5)，如果你的版本是3.x的话可能写法上会有出入，@vue/cli怎么解决依赖兼容性问题呢？<br />遇到问题首先想到的是官网，没错，先看看[官网](https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill)上有没有类似的教程，从官网上我们定位到浏览器兼容性，如下
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CuVeQ5k5RloAAAAAAAAAAABkARQnAQ' width=850 />

从文章中我们貌似已经找到了问题的答案，我们需要新建vue.config.js文件（和package.json同一目录），在里面添加transpileDependencies选项：
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EDkTRpk9TxoAAAAAAAAAAABkARQnAQ' width=850 />


该选项默认值是[]，说明会忽略掉所有掉node_modules文件，不会对node_modules里面对文件做Babel，我们需要做的就是把我们希望Babel的文件加入即可，代码如下，需要注意的是我们加入的依赖**不需要包含node_modules，用包名（**@antv/g6**）即可**，因为@vue/cli会自动添加前缀node_modules。 还需要注意 @antv/g6必须和package.json里面的一致，安装依赖的时候首选npm，如果你用yarn、cnpm等安装，需要确保node_modules里面的包名没有被更改。

```javascript
module.exports = {
  transpileDependencies: ["@antv/g6"]
};
```

好了，我们打开IE11看看结果吧。
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yS3BRL12vyAAAAAAAAAAAABkARQnAQ' width=850 />


最开始的那个报错解决了，但咋出现了新问题呢，别急，先用chrome浏览器看看，发现问题是一样的，添加完transpileDependencies兼容性问题是没有了，但出了个新错误。再次查看官网，并没有相关文章，那就直接移步issue吧，经过一番查找，我们找到如下解决方案，在babel.config.js里面添加上sourceType: "unambiguous"，具体含有可以官网查阅。

```javascript
module.exports = {
  sourceType: "unambiguous",
  presets: ["@vue/cli-plugin-babel/preset"]
};
```

再次编译，
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ewAJS55iBOkAAAAAAAAAAABkARQnAQ' width=850 />

到此，完美解决问题。


### create-react-app

如果你使用create-react-app(V: 3.0.0)初始化项目，那么恭喜你，create-react-app已经内置了依赖兼容性的处理方案，你只需要配置项目自身的兼容性问题即可，配置有多种方式，可参考[这里]。(https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers)。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aeWfSKGfgycAAAAAAAAAAABkARQnAQ' width=850 />

当然，也许你想看看内部是怎么处理的，那就执行npm run eject 或 yarn run eject吧，这样就能暴露create-react-app的内置配置了，这个操作是不可逆的。 内置配置如下：
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NcvcSL90CvUAAAAAAAAAAABkARQnAQ' width=850 />


### umi

如果你使用的是umi，再次恭喜你，umi不仅内置了依赖兼容性方案，而且配置简单，如果有任何问题，你可以在答疑群里面@云谦大佬。

```javascript
export default {
  browserslist: ['> 1%', 'last 2 versions'],
};
```

```
