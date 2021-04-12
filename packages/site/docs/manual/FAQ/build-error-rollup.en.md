---
title: G6 3.3.x 版本 Rollup 集成错误
order: 3
---

具体参考：[#1260](https://github.com/antvis/G6/issues/1260#issuecomment-596306823)

## Problem

You might meet the error while building your project with lastest version G6 & rollup:

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

remark：3.2.x version can build success。

## Solution

1. add `babel-plugin-lodash` plugin，this plugin will auto optimize lodash references
2. set `@rollup/plugin-node-resolve` plugin browser property to true，fixed G's problem。
