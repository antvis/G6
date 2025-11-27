---
title: Image Node
order: 8
---

## Overview

The image node is a rectangular area used to display images.

Applicable scenarios:

- Used to represent user avatars, product images, or icons.

- Suitable for representing social networks, product catalogs, or icon collections.

- Commonly used in social network graphs, product images, UI design, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/image.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/base-node)

| Attribute | Description                          | Type   | Default | Required |
| --------- | ------------------------------------ | ------ | ------- | -------- |
| img       | Alias for the img attribute          | string | -       |          |
| src       | Image source, i.e., image URL string | string | -       | ✓        |

## Example

### Built-in Image Node Effect

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
