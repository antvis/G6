---
title: 概述
order: -1
---

## 插件开发

参见 [自定义插件](/manual/customize/plugin-extension) 进行开发。

## 插件注册与使用

```ts
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';
import CustomPlugin from './path/to/custom-plugin';

const Graph = extend(BaseGraph, {
  plugins: {
    'custom-plugin': CustomPlugin, // 注册自定义插件
    'built-in-plugin': Extensions.Minimap, // 注册内置插件，例如 minimap
  },
});

const graph = new Graph({
  // ... 其他配置项
  plugins: [
    'custom-plugin', // 使用自定义插件，使用默认配置项
    {
      type: 'built-in-plugin',
      key: 'minimap',
      // ... 插件配置项
    },
  ],
});
```
