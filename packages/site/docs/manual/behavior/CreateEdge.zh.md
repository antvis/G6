---
title: 创建边 CreateEdge
order: 5
---

## 概述

CreateEdge 是 G6 中用于实现画布中交互式创建边（Edge）的内置交互。用户触发交互（点击或拖拽）后，边会随鼠标移动，连接到目标节点即完成创建，若取消则自动移除。

此外，该交互支持自定义边的样式，如颜色、线条样式、箭头等，以适应不同的可视化需求。

该交互支持连接的元素为 `node` 和 `combo`。

## 使用场景

这一交互主要用于：

- 需要交互式创建节点间连接关系的可视化场景，如流程图、知识图谱等

## 在线体验

<embed src="@/common/api/behaviors/create-edge.md"></embed>

## 基本用法

在图配置中添加这一交互

```javascript
// 使用默认配置
const graph = new Graph({
  // 其他配置...
  behaviors: ['create-edge'], // 直接添加，使用默认配置
});

// 或使用自定义配置
const graph = new Graph({
  // 其他配置
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click', // 交互配置，通过点击创建边
      style: {}, // 边自定义样式
    },
  ],
});
```

## 配置项

| 配置项   | 说明                                                        | 类型                                                                                       | 默认值        | 必选 |
| -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------- | ---- |
| type     | 交互类型名称                                                | string                                                                                     | `create-edge` | √    |
| trigger  | 触发新建边的方式：`click` 表示点击触发；`drag` 表示拖拽触发 | `click` \| `drag`                                                                          | `drag`        |      |
| enable   | 是否启用该交互                                              | boolean \| ((event: [Event](/api/event#事件对象属性)) => boolean)                          | true          |      |
| onCreate | 创建边回调函数，返回边数据                                  | (edge: [EdgeData](/manual/data#边数据edgedata)) => [EdgeData](/manual/data#边数据edgedata) | -             |      |
| onFinish | 成功创建边回调函数                                          | (edge: [EdgeData](/manual/data#边数据edgedata)) => void                                    | -             |      |
| style    | 新建边的样式，[配置项](#style)                              | 见下面                                                                                     | -             |      |

### style

配置新创建边的样式，详细配置项请参考 [元素 - 边 - 通用边属性 - 样式](/manual/element/edge/base-edge#style)

```json
{
  "style": {
    "stroke": "red",
    "lineWidth": 2
  }
}
```

## 代码示例

### 基础创建边功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['create-edge'],
});
```

### 自定义创建边功能

```javascript
const graph = new Graph({
  // 其他配置,
  behaviors: [
    {
      type: 'create-edge',
      style: {
        stroke: red,
        lineWidth: 3,
      },
    },
  ],
});
```

### 使用点击创建边

```javascript
const graph = new Graph({
  // 其他配置
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
    },
  ],
});
```

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        fill: 'red',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();
```
