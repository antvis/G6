---
title: Angular + G6 报错
order: 2
---

**本文档仅对于 Angular 9 以上版本适用**

如果你的项目是通过最新的 Angular CLI 创建，那么 G6 可以即开即用，不需要特殊设置。

如果你的项目是从老的 Angular 版本升级而来（比如我的是从 Angular 6 逐步升级），那么你大概会遇到问题。

如果你遇到类似下图的 `cannot read property 'webpackChunkAlgorithm'` 错误
![image](https://user-images.githubusercontent.com/12276316/110507994-8e108e00-80ce-11eb-9f40-653f2181e44b.png)

请参考 #2691(https://github.com/antvis/G6/issues/2691) 中的解决方案。

在 Angular 中使用 G6，需要满足以下两点：

1. 项目根目录下（与 package.json 同目录）需要有 `.browserslistrc` 文件，请注意 `browserslist` 文件无效。
2. 不开启IE支持。
