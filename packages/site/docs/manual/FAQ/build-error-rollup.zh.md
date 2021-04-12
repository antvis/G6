---
title: G6 3.3.x 版本 Rollup 集成错误
order: 3
---

具体参考：[#1260](https://github.com/antvis/G6/issues/1260#issuecomment-596306823)

## 问题

当用户使用 rollup 打包 G6 3.3.x 版本时，会报以下错误：

```
error     Error: 'groupBy' is not exported by node_modules/_lodash@4.17.15@lodash/lodash.js
    at error (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:5400:30)
    at Module.error (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:9820:16)
    at handleMissingExport (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:9721:28)
    at Module.traceVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:10159:24)
    at ModuleScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:8766:39)
    at FunctionScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:3065:38)
    at ChildScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:3065:38)
    at FunctionScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:3065:38)
    at ChildScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:3065:38)
    at BlockScope.findVariable (/Users/gaoli/GitHub/GGEditor/node_modules/_rollup@1.31.1@rollup/dist/shared/node-entry.js:3065:38)
```

说明：3.2.x 版本不会出现这个问题。

## 解决方案

1. 添加 babel-plugin-lodash 插件，此插件会自动优化 lodash 的引用方式。
2. 设置 @rollup/plugin-node-resolve 插件 browser 属性为 true，修复 G 当前的问题。
