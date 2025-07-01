---
title: Hexagon Node
order: 6
---

## Overview

A hexagon is a geometric shape with six equal sides, featuring a honeycomb structure.

Applicable scenarios:

- Used to represent honeycomb networks, molecular structures, or tightly packed nodes.

- Suitable for representing network topology, molecular diagrams, or game maps.

- Commonly used in network diagrams, topology diagrams, game design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/hexagon.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/base-node)

| Attribute | Description                                                        | Type   | Default                                 | Required |
| --------- | ------------------------------------------------------------------ | ------ | --------------------------------------- | -------- |
| outerR    | Outer radius, the distance from the hexagon's center to any vertex | number | Half of the minimum of width and height |          |

## Example

### Built-in Hexagon Node Effect

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
