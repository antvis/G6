---
title: 概述
order: -1
---

## 交互开发

参见 [自定义交互](/manual/customize/behavior-extension) 进行开发。

## 交互注册与使用

```ts
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';
import CustomBehavior from './path/to/custom-behavior';

const Graph = extend(BaseGraph, {
  behaviors: {
    'custom-behavior': CustomBehavior, // 注册自定义交互
    'built-in-behavior': Extensions.ActivateRelations, // 注册内置交互，例如 activate relations
  },
});

const graph = new Graph({
  // ... 其他配置项
  modes: {
    default: [
      'custom-behavior', // 使用自定义交互，使用默认配置项
      {
        type: 'built-in-behavior',
        key: 'activate-relations',
        // ... 交互配置项
      },
    ],
  },
});
```
