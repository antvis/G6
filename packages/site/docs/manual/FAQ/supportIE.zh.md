---
title: 如何让 IE 支持 G6
order: 11
---

本文将介绍如何在 IE 中使用 G6。

## 解决方案

对于这类问题，我们在项目中只需要引入 `babel-polyfill` 即可，具体使用方法如下：

- 在主入门文件中引入 `babel-polyfill` ；
- 在 `bable-loader` 中加入如下代码：

```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('node_modules/@antv/g6')]
}
```

> `include` 表示哪些目录中的 .js 文件需要进行 babel-loader；exclude 表示哪些目录中的 .js 文件不要进行 babel-loader。

`include` 中的内容请根据具体项目情况设置。

更详细的请参考：<a href='https://blog.csdn.net/y491887095/article/details/81541502' target='_blank'>https://blog.csdn.net/y491887095/article/details/81541502</a>。

另外，针对 @vue/cli、umi、create-react-app 搭建的项目给出一些解决方案，**务必确保在没有引入 G6 时你的项目可以正常运行在 IE 上**。

类似如下错误。 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dIrtS6eorxUAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

### vue/cli

本 <a href='https://github.com/lxfu/vue-g6' target='_blank'>G6 Vue 案例</a> 是基于 @vue/cli(V: 4.0.5)，3.x 版本可能在写法上有些出入。@vue/cli 怎么解决依赖兼容性问题呢？<br />遇到问题首先查看 <a href='https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill' target='_blank'>Vue 官网</a> 上有没有类似的教程，从官网上我们定位到浏览器兼容性，如下 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CuVeQ5k5RloAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

从文章中我们貌似已经找到了问题的答案，我们需要新建 vue.config.js 文件（和 package.json 同一目录），在里面添加 `transpileDependencies` 选项：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EDkTRpk9TxoAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

该选项默认值是 `[]`，说明会忽略掉所有掉 node_modules 文件，不会对 node_modules 里面对文件做 Babel。我们需要做的就是把我们希望 Babel 的文件加入即可，代码如下。需要注意的是我们加入的依赖**不需要包含 node_modules ，用包名 @antv/g6**即可，因为 @vue/cli 会自动添加前缀 node_modules 。还需要注意  @antv/g6 必须和 package.json 里面的一致。安装依赖的时候首选 npm ，如果你用 yarn、cnpm 等安装，需要确保 node_modules 里面的包名没有被更改。

```javascript
module.exports = {
  transpileDependencies: ['@antv/g6'],
};
```

好了，我们打开 IE11 看看结果吧。 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yS3BRL12vyAAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

最开始的那个报错解决了，但出现了新问题。先用 Chrome 浏览器看看，发现问题是一样的。添加完 `transpileDependencies` 兼容性问题是没有了，但出了个新错误。再次查看官网，并没有相关文章，那就直接移步 issue 吧。经过一番查找，我们找到如下解决方案，在 babel.config.js 里面添加上 `sourceType: "unambiguous"` ，具体含义可以官网查阅。

```javascript
module.exports = {
  sourceType: 'unambiguous',
  presets: ['@vue/cli-plugin-babel/preset'],
};
```

再次编译：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ewAJS55iBOkAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

到此，完美解决问题。

### create-react-app

如果你使用 create-react-app(V: 3.0.0) 初始化项目，那么恭喜你，create-react-app 已经内置了依赖兼容性的处理方案，你只需要配置项目自身的兼容性问题即可。配置有多种方式，可参考 <a href='https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers' target='_blank'>这里</a> 。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aeWfSKGfgycAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

也许你想看看内部是怎么处理的，可以执行 `npm run eject` 或 `yarn run eject` 以暴露 create-react-app 的内置配置。这个操作是不可逆的。内置配置如下： <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NcvcSL90CvUAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### umi

umi 不仅内置了依赖兼容性方案，而且配置简单，如果有任何问题，你可以在答疑群里面 @云谦 老师。

```javascript
export default {
  browserslist: ['> 1%', 'last 2 versions'],
};
```
