---
title: 五角形节点 Star
order: 10
---

## 概述

星形是一个多角几何形状，具有突出的角。

适用场景：

- 用于表示重要节点、特殊标记或装饰性元素。

- 适合表示流程图、网络图或拓扑图。

- 常用于流程图、网络图、拓扑图等。

## 在线体验

<embed src="@/common/api/elements/nodes/star.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

| 属性   | 描述                                 | 类型   | 默认值             | 必选 |
| ------ | ------------------------------------ | ------ | ------------------ | ---- |
| innerR | 内半径，是指从星形中心到内顶点的距离 | number | 默认为外半径的 3/8 |

结构说明：

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VKrvQpdqwXoAAAAAAAAAAAAAemJ7AQ/original" />

## 示例

### 内置五角形节点效果

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
    type: 'star',
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
