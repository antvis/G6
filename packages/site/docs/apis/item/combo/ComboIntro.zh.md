---
title: 概述
order: 0
---

## Combo 的注册和使用

本目录列举了 G6 内置的所有 Combo。G6 默认注册了 `circle-combo` 和 `rect-combo`。此外，自定义 Combo 需注册：

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  combos: {
    'custom-combo': CustomCombo,
  },
});

/**
 * 注册后方可在实例化或后续 API 调用中使用
 */
const graph = new Graph({
  /**
   * ...其他配置项
   */
  combo: {
    /**
     * type 与注册时命名的 key 一致
     */
    type: 'custom-combo',
    /**
     * ... 节点的其他配置项
     */
  },
});
```

## 导航

- [Circle Combo](./CircleCombo.zh.md)：圆形 Combo；
- [Rect Combo](./RectCombo.zh.md)：矩形 Combo；
- [Custom Combo](./CustomCombo.zh.md)：自定义 Combo
