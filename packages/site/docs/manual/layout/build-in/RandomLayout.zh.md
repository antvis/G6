---
title: Random 随机布局
---

## 概述

**随机布局（Random Layout）** 是一种基于简单规则的布局方式，其核心逻辑是为每个节点在指定布局区域（由布局中心点、宽度和高度定义）内生成随机坐标（完全随机，无节点防碰撞）。

## 使用场景

随机布局的使用场景非常局限，只推荐以下场景使用：

- **数据初步展示**:

  在开发初期调试数据加载逻辑或需要快速验证数据结构的情况下，可使用随机布局先行验证

业务最终交付推荐使用更能体现业务价值的布局方式，比如 [AntVDagreLayout](/manual/layout/build-in/antv-dagre-layout) 、[ForceLayout](/manual/layout/build-in/force-layout) 或者[自定义布局](/manual/layout/custom-layout)等。

## 基本用法

其余均使用默认配置（布局宽高默认是整个画布容器）

```js
const graph = new Graph({
  // 其他配置
  layout: {
    type: 'random',
  },
});
```

## 配置项

| 属性   | 描述       | 类型                                         | 默认值                           | 必选 |
| ------ | ---------- | -------------------------------------------- | -------------------------------- | ---- |
| type   | 布局类型   | random                                       | -                                | ✓    |
| center | 布局的中心 | [number, number] \| [number, number, number] | [`布局宽度` / 2, `布局高度` / 2] |      |
| height | 布局的高度 | number                                       | 画布高度                         |      |
| width  | 布局的宽度 | number                                       | 画布宽度                         |      |

## 示例

```js | ob { pin: false}
createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: Array.from({ length: 50 }).map((_, i) => ({
        id: `${i}`,
      })),
    },
    node: {
      style: {
        labelText: (d) => d.id,
      }
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    layout: {
      type: 'random'
    },
  },
  { width: 600, height: 300 },
);
```