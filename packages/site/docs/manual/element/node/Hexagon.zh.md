---
title: 六边形节点 Hexagon
order: 6
---

## 概述

六边形是一个六边相等的几何形状，具有蜂窝状结构。

适用场景：

- 用于表示蜂窝网络、分子结构或紧密排列的节点。

- 适合表示网络拓扑、分子图或游戏地图。

- 常用于网络图、拓扑图、游戏设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/hexagon.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

| 属性   | 描述                                     | 类型   | 默认值                   | 必选 |
| ------ | ---------------------------------------- | ------ | ------------------------ | ---- |
| outerR | 外半径，是指从六边形中心到任意顶点的距离 | number | 默认为宽高的最小值的一半 |      |

## 示例

### 内置六边形节点效果

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'hexagon',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      outerR: 30, // 外半径
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```
