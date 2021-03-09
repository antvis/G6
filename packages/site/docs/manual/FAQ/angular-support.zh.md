## 本文档仅对于Angular 9以上版本适用
如果你的项目是通过最新的Angular CLI创建,那么大概率G6可以即开即用,不会遇到什么问题,也不需要特殊设置.

如果你的项目是从老的Angular版本升级而来(比如我的是从Angular 6逐步升级),那么你大概会遇到问题.

如果你遇到类似下图的 `cannot read property 'webpackChunkAlgorithm'` 错误
![image](https://user-images.githubusercontent.com/12276316/110507994-8e108e00-80ce-11eb-9f40-653f2181e44b.png)

请看 https://github.com/antvis/G6/issues/2691 解决

基本上要在Angular中使用G6需要满足以下两点:
1. 项目根目录下(与package.json同目录) 需要有`.browserslistrc`文件, 请注意`browserslist`文件无效.
2. **不**开启IE支持
