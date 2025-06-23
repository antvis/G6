---
title: Html
---

## Overview

The HTML node is a custom rectangular area used to display HTML content.

Applicable scenarios:

- Used to represent complex custom nodes, such as tables, charts, or rich text.

- Suitable for representing custom visual elements or interactive components.

- Commonly used in custom charts, UI design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/html.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/build-in/base-node)

| Attribute | Description                                                                                                               | Type                    | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| dx        | Horizontal offset. The HTML container defaults to the top-left corner as the origin, and dx is used for horizontal offset | number                  | 0       |          |
| dy        | Vertical offset. The HTML container defaults to the top-left corner as the origin, and dy is used for vertical offset     | number                  | 0       |          |
| innerHTML | HTML content, can be a string or `HTMLElement`                                                                            | string \| `HTMLElement` | 0       | ✓        |

## Example

### Built-in HTML Node Effect

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
