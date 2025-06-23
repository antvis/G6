---
title: Html HTML
---

## 概述

HTML 节点是一个自定义的矩形区域，用于显示 HTML 内容。

适用场景：

- 用于表示复杂的自定义节点，如表格、图表或富文本。

- 适合表示自定义的可视化元素或交互组件。

- 常用于自定义图表、UI 设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/html.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/manual/element/node/build-in/base-node)

| 属性      | 描述                                                            | 类型                        | 默认值 | 必选 |
| --------- | --------------------------------------------------------------- | --------------------------- | ------ | ---- |
| dx        | 横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移 | number                      | 0      |      |
| dy        | 纵向偏移量。HTML 容器默认以左上角为原点，通过 dy 来进行横向偏移 | number                      | 0      |      |
| innerHTML | HTML 内容，可以为字符串或者 `HTMLElement`                       | string &#124; `HTMLElement` | 0      | ✓    |

## 示例

### 内置HTML节点效果

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const ICON_MAP = {
  error: '&#10060;',
  overload: '&#9889;',
  running: '&#9989;',
};

const COLOR_MAP = {
  error: '#f5222d',
  overload: '#faad14',
  running: '#52c41a',
};

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', data: { location: 'East', status: 'error', ip: '192.168.1.2' } },
      { id: 'node-2', data: { location: 'West', status: 'overload', ip: '192.168.1.3' } },
      { id: 'node-3', data: { location: 'South', status: 'running', ip: '192.168.1.4' } },
    ],
  },
  node: {
    type: 'html',
    style: {
      size: [240, 80],
      dx: -120,
      dy: -40,
      innerHTML: (d) => {
        const {
          data: { location, status, ip },
        } = d;
        const color = COLOR_MAP[status];

        return `
<div 
  style="
    width:100%; 
    height: 100%; 
    background: ${color}bb; 
    border: 1px solid ${color};
    color: #fff;
    user-select: none;
    display: flex; 
    padding: 10px;
    "
>
  <div style="display: flex;flex-direction: column;flex: 1;">
    <div style="font-weight: bold;">
      ${location} Node
    </div>
    <div>
      status: ${status} ${ICON_MAP[status]}
    </div>
  </div>
  <div>
    <span style="border: 1px solid white; padding: 2px;">
      ${ip}
    </span>
  </div>
</div>`;
      },
    },
  },
  layout: {
    type: 'grid',
  },
  behaviors: ['drag-element', 'zoom-canvas'],
});

graph.render();
```
