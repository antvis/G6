---
title: 概述
order: 0
---

Combo 是 G6 中的一种特殊的节点，它可以包含多个节点和边，可以用来表示一个复杂的节点。

## Combo 构成

在 G6 中，Combo 通常由 `keyShape`、`labelShape`、`labelBackgroundShape`、`iconShape`、`badgeShapes` 和 `otherShapes` 构成。

- `keyShape`：Combo 的主图形，通常用于表示 Combo 的主要形状，同时也用于计算 Combo 的入射位置。

- `labelShape`：Combo 的文本标签形状，通常用于展示 Combo 的名称或描述。

- `labelBackgroundShape`：Combo 的文本标签背景形状，通常用于为文本标签提供背景色。

- `iconShape`：Combo 的图标形状，通常用于展示 Combo 的图标。

- `badgeShapes`：Combo 的徽标形状，通常用于展示 Combo 的徽标。

- `otherShapes`：Combo 的其他形状，通常用于展示 Combo 的其他信息或状态。

下面以圆形 Combo 为例，其主图形是一个[圆形](/apis/shape/circle-style-props)：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*foPeQq6rm54AAAAAAAAAAAAADmJ7AQ/original" alt="node sketch" width="400" />

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
