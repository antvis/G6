---
title: 如何让 IE 支持 G6
order: 3
---

最近答疑群里面有同学反馈说 G6 不支持 IE，官网上的 Demo 在 IE 上完全打不开，对于这样对问题，我们有考虑过怎么处理，最终没有选择内部处理，具体原因自行脑补。

下面针对@vue/cli、umi、create-react-app搭建的项目给出一些解决方案，**务必确保在没有引入 G6 时你的项目可以正常运行在IE上， **我相信如果项目框架是你自己搭建的，那么 IE 兼容性问题对你来说完全不是问题，**更确切的说应该是依赖的兼容性问题怎么解决**。

类似如下错误。<br />![9B7EDCB4-D317-4FB5-814D-68F58817ADD4.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572488463816-61bac7a7-9599-43b9-9871-84aa19c517f8.png#align=left&display=inline&height=462&name=9B7EDCB4-D317-4FB5-814D-68F58817ADD4.png&originHeight=462&originWidth=1974&search=&size=268517&status=done&width=1974)

## vue/cli

本[案例](https://github.com/lxfu/vue-g6)是基于@vue/cli(V: 4.0.5)，如果你的版本是3.x的话可能写法上会有出入，@vue/cli怎么解决依赖兼容性问题呢？<br />遇到问题首先想到的是官网，没错，先看看[官网](https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill)上有没有类似的教程，从官网上我们定位到浏览器兼容性，如下

![7AEAC95F-6626-476E-8C63-830852883FC6.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572487613256-21bd4477-3bf7-4f0e-a016-6cfc88694796.png#align=left&display=inline&height=1434&name=7AEAC95F-6626-476E-8C63-830852883FC6.png&originHeight=1434&originWidth=2620&search=&size=1281163&status=done&width=2620)

从文章中我们貌似已经找到了问题的答案，我们需要新建vue.config.js文件（和package.json同一目录），在里面添加transpileDependencies选项，

![6CDAA5DF-2206-4749-B5BD-C8EB3D13527D.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572487802971-7c772bc2-a319-4845-a28f-07617c9d9165.png#align=left&display=inline&height=642&name=6CDAA5DF-2206-4749-B5BD-C8EB3D13527D.png&originHeight=642&originWidth=1950&search=&size=289455&status=done&width=1950)

该选项默认值是[]，说明会忽略掉所有掉node_modules文件，不会对node_modules里面对文件做Babel，我们需要做的就是把我们希望Babel的文件加入即可，代码如下，需要注意的是我们加入的依赖**不需要包含node_modules，用包名（**@antv/g6**）即可**，因为@vue/cli会自动添加前缀node_modules。 还需要注意 @antv/g6必须和package.json里面的一致，安装依赖的时候首选npm，如果你用yarn、cnpm等安装，需要确保node_modules里面的包名没有被更改。

```javascript
module.exports = {
  transpileDependencies: ["@antv/g6"]
};
```

好了，我们打开IE11看看结果吧。<br />![DF84211F-8B5E-4100-9048-86BB445DF28E.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572488515498-453227ad-1602-4b33-a39b-8fe37ee561ad.png#align=left&display=inline&height=612&name=DF84211F-8B5E-4100-9048-86BB445DF28E.png&originHeight=612&originWidth=2192&search=&size=552053&status=done&width=2192)

最开始的那个报错解决了，但咋出现了新问题呢，别急，先用chrome浏览器看看，发现问题是一样的，添加完transpileDependencies兼容性问题是没有了，但出了个新错误。再次查看官网，并没有相关文章，那就直接移步issue吧，经过一番查找，我们找到如下解决方案，在babel.config.js里面添加上sourceType: "unambiguous"，具体含有可以官网查阅。

```javascript
module.exports = {
  sourceType: "unambiguous",
  presets: ["@vue/cli-plugin-babel/preset"]
};
```

再次编译，

![F4680A19-5EB7-43DE-97C0-E86CAB824973.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572488965455-b993c651-c934-4db9-bef7-ddb3430b52be.png#align=left&display=inline&height=920&name=F4680A19-5EB7-43DE-97C0-E86CAB824973.png&originHeight=920&originWidth=2874&search=&size=419213&status=done&width=2874)

到此，完美解决问题。


## create-react-app

如果你使用create-react-app(V: 3.0.0)初始化项目，那么恭喜你，create-react-app已经内置了依赖兼容性的处理方案，你只需要配置项目自身的兼容性问题即可，配置有多种方式，可[参考](https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers)。<br />eg:<br />![448C42C7-C55A-452E-847D-DC1C1F9955B1.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572489484918-5ee52fed-3ca9-434d-b7f9-ec153fdf6c21.png#align=left&display=inline&height=968&name=448C42C7-C55A-452E-847D-DC1C1F9955B1.png&originHeight=968&originWidth=1696&search=&size=640894&status=done&width=1696)

当然，也许你想看看内部是怎么处理的，那就执行npm run eject 或 yarn run eject吧，这样就能暴露create-react-app的内置配置了，这个操作是不可逆的。 内置配置如下<br />![EA6D3C17-BD59-45CA-9B86-F581CCF278A3.png](https://cdn.nlark.com/yuque/0/2019/png/278352/1572491425327-f74942f3-fbbe-4982-8d35-f1f0d31a0f21.png#align=left&display=inline&height=1222&name=EA6D3C17-BD59-45CA-9B86-F581CCF278A3.png&originHeight=1222&originWidth=2002&search=&size=1155793&status=done&width=2002)


## umi

如果你使用的是umi，再次恭喜你，umi不仅内置了依赖兼容性方案，而且配置简单，如果有任何问题，你可以在答疑群里面@云谦大佬。

```javascript
export default {
  browserslist: ['> 1%', 'last 2 versions'],
};
```
