---
title: 径向布局 Radial
order: 19
---

## 概述

径向（Radial）布局是一种将节点以同心圆方式分层排列的图布局算法，常用于展示层级关系、社群结构等。该布局支持节点防重叠、分组排序等高级特性，适用于多种网络结构的可视化。

## 使用场景

- 展示层级结构（如组织架构、家谱等）
- 社群结构分析
- 需要突出中心节点及其辐射关系的场景
- 需要节点分组、排序的复杂网络

## 在线体验

<embed src="@/common/api/layouts/radial.md"></embed>

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'radial',
    nodeSize: 32,
    unitRadius: 100,
    linkDistance: 200,
  },
  // 其他配置...
});
```

## 配置项

| 属性                       | 描述                                         | 类型                                 | 默认值   | 必选 |
| -------------------------- | -------------------------------------------- | ------------------------------------ | -------- | ---- |
| type                       | 布局类型                                     | string                               | `radial` | ✓    |
| center                     | 圆心坐标                                     | [number, number]                     | -        |      |
| focusNode                  | 辐射中心节点                                 | string \| Node \| null               | null     |      |
| height                     | 画布高度                                     | number                               | -        |      |
| width                      | 画布宽度                                     | number                               | -        |      |
| nodeSize                   | 节点大小（直径）                             | number                               | -        |      |
| nodeSpacing                | 节点最小间距（防重叠时生效）                 | number \| (nodeData: Node) => number | 10       |      |
| linkDistance               | 边长度                                       | number                               | 50       |      |
| unitRadius                 | 每圈半径                                     | number \| null                       | 100      |      |
| maxIteration               | 最大迭代次数                                 | number                               | 1000     |      |
| maxPreventOverlapIteration | 防重叠最大迭代次数                           | number                               | 200      |      |
| preventOverlap             | 是否防止节点重叠                             | boolean                              | false    |      |
| sortBy                     | 同层节点排序字段                             | string                               | -        |      |
| sortStrength               | 同层节点排序强度                             | number                               | 10       |      |
| strictRadial               | 是否严格每层节点在同一圆环上（防重叠时生效） | boolean                              | true     |      |

## 代码示例

### 基本用法

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });
    graph.render();
  });
```

效果如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d3P-RK4YCDYAAAAAAAAAAAAADmJ7AQ/original" alt="基本 Radial 辐射布局" style="max-width: 600px;" />

## 实际案例

- [基本 Radial 辐射布局](/examples/layout/radial/#basic)
- [防止节点重叠的严格辐射布局](/examples/layout/radial/#strict-prevent-overlap)
- [防止节点重叠的非严格辐射布局](/examples/layout/radial/#non-strict-prevent-overlap)
- [排序聚类](/examples/layout/radial/#cluster-sort)
