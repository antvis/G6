---
title: 三角形节点 Triangle
order: 11
---

## 概述

三角形是一个三边几何形状，具有明确的方向性。

适用场景：

- 用于表示方向性节点、警告或提示。

- 适合表示流程图中的方向指示或层级关系。

- 常用于流程图、网络图、拓扑图等。

## 在线体验

<embed src="@/common/api/elements/nodes/triangle.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

| 属性      | 描述         | 类型                                | 默认值 | 必选 |
| --------- | ------------ | ----------------------------------- | ------ | ---- |
| direction | 三角形的方向 | `up` \| `left` \| `right` \| `down` | `up`   |

## 示例

### 内置三角形节点效果

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
    type: 'triangle',
    style: {
      size: 40,
      direction: (d) => (d.id === 'ports' ? 'left' : undefined),
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
