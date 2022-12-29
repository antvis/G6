---
title: Vite + G6 报错
order: 3
---

> 感谢来自 GitHub 用户 @wooodchen 的解决方案

如果你在使用 Vite + G6 构建时遇到类似下图的错误
![image](https://user-images.githubusercontent.com/20942938/121661253-98c82e00-cad6-11eb-9d5c-e5827db62ed9.png)

请参考 [GitHub Issue #2961](https://github.com/antvis/G6/issues/2961) 中的解决方案。

需要插件 `rollup-plugin-node-rosolve` 和 `rollup-plugin-commonjs`。虽然不能消除提示，但可以使用。
在 `vite.config.js` 中如下配置

```javascript
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// ...
export default defineConfig({
  plugin: [
    ...,
    resolve(),
    commonjs(),
    ...
  ]
})
```

[#3284](https://github.com/antvis/G6/issues/3284) 提出另一解决方案，供参考：

```javascript
build: {
  commonjsOptions: {
    ignoreTryCatch: false,
  },
},
```
