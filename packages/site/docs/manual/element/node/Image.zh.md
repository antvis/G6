---
title: 图片节点 Image
order: 8
---

## 概述

图片节点是一个矩形区域，用于显示图像。

适用场景：

- 用于表示用户头像、产品图片或图标。

- 适合表示社交网络、产品目录或图标集合。

- 常用于社交网络图、产品图、UI 设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/image.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/base-node)

| 属性 | 描述                       | 类型   | 默认值 | 必选 |
| ---- | -------------------------- | ------ | ------ | ---- |
| img  | 该属性为 img 的别名        | string | -      |      |
| src  | 图片来源，即图片地址字符串 | string | -      | ✓    |

## 示例

### 内置图片节点效果

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
    type: 'image',
    style: {
      size: 40,
      labelText: (d) => d.id,
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      haloStroke: '#227eff',
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
    state: {
      inactive: {
        fillOpacity: 0.5,
      },
      disabled: {
        fillOpacity: 0.2,
      },
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```
