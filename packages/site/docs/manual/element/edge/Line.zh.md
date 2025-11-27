---
title: 直线边 Line
order: 5
---

## 概述

直线是最简单的边类型，直接连接两个节点，没有任何弯曲。

使用场景：

- 适用于简单的图，如拓扑图、流程图。

- 当需要快速绘制且无需复杂视觉效果时使用。

## 在线体验

<embed src="@/common/api/elements/edges/line.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseEdge](/manual/element/edge/base-edge)

## 示例

### 内置直线边效果

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'line',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
```
