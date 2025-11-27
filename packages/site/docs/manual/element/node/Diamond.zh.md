---
title: 菱形节点 Diamond
order: 3
---

## 概述

菱形是一个四边相等的几何形状，具有对角线对称性。

适用场景：

- 用于表示决策节点、条件判断或关键路径。

- 适合表示流程图中的判断节点或关键步骤。

- 常用于流程图、决策树、网络图等。

## 在线体验

<embed src="@/common/api/elements/nodes/diamond.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

## 示例

### 内置菱形节点效果

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
    type: 'diamond',
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
