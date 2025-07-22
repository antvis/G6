---
title: 标题 Title
order: 15
---

## 概述

Title（标题）表明了这张图的名称，传达图的简略内容

## 基本用法

以下是一个简单的 Title 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      key: 'title',
      type: 'title',
      title: '这是一个标题',
      subTitle: '这是一个副标题',
    },
  ],
});
```

## 配置项

| 属性      | 描述                         | 类型                          | 默认值  | 必选 |
| --------- | ---------------------------- | ----------------------------- | ------- | ---- |
| type      | 插件类型                     | string                        | `title` | ✓    |
| key       | 插件唯一标识符，用于后续更新 | string                        | -       |      |
| title     | 标题内容，或标题配置项       | string                        | -       | ✓    |
| subtitle  | 副标题内容，或标题配置项     | string                        | -       |      |
| spacing   | 主标题、副标题之间的上下间距 | number                        | 8       |      |
| className | 标题画布类名                 | string                        | -       |      |
| align     | 标题相对于画布的位置         | `left` \| `center` \| `right` | `left`  |      |

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      type: 'title',
      title: '这是一个标题这是一个标题',
      subtitle: '这是一个副标题',
    },
  ],
  node: {
    palette: 'spectral',
    style: {
      labelText: '你好',
    },
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```
