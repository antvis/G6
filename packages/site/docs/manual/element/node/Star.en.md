---
title: Star Node
order: 10
---

## Overview

A star is a polygonal geometric shape with prominent points.

Applicable scenarios:

- Used to represent important nodes, special markers, or decorative elements.

- Suitable for representing flowcharts, network diagrams, or topology diagrams.

- Commonly used in flowcharts, network diagrams, topology diagrams, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/star.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/base-node)

| Attribute | Description                                                           | Type   | Default                            | Required |
| --------- | --------------------------------------------------------------------- | ------ | ---------------------------------- | -------- |
| innerR    | Inner radius, the distance from the star's center to the inner vertex | number | Default is 3/8 of the outer radius |

Structure Description:

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VKrvQpdqwXoAAAAAAAAAAAAAemJ7AQ/original" />

## Example

### Built-in Star Node Effect

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
