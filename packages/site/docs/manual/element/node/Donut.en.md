---
title: Donut Node
order: 4
---

## Overview

The donut node is a ring-shaped geometric figure composed of two concentric circles.

Applicable scenarios:

- Used to represent proportional data, such as completion progress and ratio analysis.

- Suitable for representing multi-layered data, such as nested ring charts.

- Commonly used in data visualization, dashboards, progress charts, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/donut.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/base-node)

| Attribute           | Description                         | Type                                    | Default   | Required |
| ------------------- | ----------------------------------- | --------------------------------------- | --------- | -------- |
| donutFill           | Fill color                          | string                                  | `#1783FF` |          |
| donutFillOpacity    | Fill color opacity                  | number \| string                        | 1         |          |
| donutLineCap        | Stroke end style                    | `round` \| `square` \| `butt`           | `butt`    |          |
| donutLineDash       | Stroke dash style                   | number[]                                | -         |          |
| donutLineDashOffset | Stroke dash offset                  | number                                  | -         |          |
| donutLineJoin       | Stroke join style                   | `round` \| `bevel` \| `miter`           | `miter`   |          |
| donutLineWidth      | Stroke width                        | number                                  | 1         |          |
| donutOpacity        | Opacity                             | number \| string                        | 1         |          |
| donutPalette        | Color or palette name               | string \| string[]                      | `tableau` |          |
| donuts              | Donut data                          | number[] \| [DonutRound](#donutround)[] | -         |          |
| donutShadowBlur     | Shadow blur                         | number                                  | -         |          |
| donutShadowColor    | Shadow color                        | string                                  | -         |          |
| donutShadowOffsetX  | Shadow offset in x-axis direction   | number \| string                        | -         |          |
| donutShadowOffsetY  | Shadow offset in y-axis direction   | number \| string                        | -         |          |
| donutShadowType     | Shadow type                         | `inner` \| `outer`                      | `outer`   |          |
| donutStroke         | Stroke color                        | string                                  | `#000`    |          |
| donutStrokeOpacity  | Stroke color opacity                | number \| string                        | 1         |          |
| donutVisibility     | Visibility of the shape             | `visible` \| `hidden`                   | `visible` |          |
| innerR              | Inner ring radius, percentage or px | string \| number                        | 50%       |          |

### DonutRound

| Attribute      | Description                       | Type                          | Default   | Required |
| -------------- | --------------------------------- | ----------------------------- | --------- | -------- |
| color          | Color                             | string                        | -         |          |
| fill           | Fill color                        | string                        | `#1783FF` |          |
| fillOpacity    | Fill color opacity                | number \| string              | 1         |          |
| lineCap        | Stroke end style                  | `round` \| `square` \| `butt` | `butt`    |          |
| lineDash       | Stroke dash style                 | number[]                      | -         |          |
| lineDashOffset | Stroke dash offset                | number                        | -         |          |
| lineJoin       | Stroke join style                 | `round` \| `bevel` \| `miter` | `miter`   |          |
| lineWidth      | Stroke width                      | number                        | 1         |          |
| opacity        | Opacity                           | number \| string              | 1         |          |
| shadowBlur     | Shadow blur                       | number                        | -         |          |
| shadowColor    | Shadow color                      | string                        | -         |          |
| shadowOffsetX  | Shadow offset in x-axis direction | number \| string              | -         |          |
| shadowOffsetY  | Shadow offset in y-axis direction | number \| string              | -         |          |
| shadowType     | Shadow type                       | `inner` \| `outer`            | `outer`   |          |
| stroke         | Stroke color                      | string                        | `#000`    |          |
| strokeOpacity  | Stroke color opacity              | number \| string              | 1         |          |
| value          | Value for ratio calculation       | number                        | -         | ✓        |
| visibility     | Visibility of the shape           | `visible` \| `hidden`         | `visible` |          |

## Example

### Built-in Donut Node Effect

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default', index: 0 },
    { id: 'halo', index: 1 },
    { id: 'badges', index: 2 },
    { id: 'ports', index: 3 },
    {
      id: 'active',
      states: ['active'],
      index: 4,
    },
    {
      id: 'selected',
      states: ['selected'],
      index: 5,
    },
    {
      id: 'highlight',
      states: ['highlight'],
      index: 6,
    },
    {
      id: 'inactive',
      states: ['inactive'],
      index: 7,
    },
    {
      id: 'disabled',
      states: ['disabled'],
      index: 8,
    },
  ],
};
const graph = new Graph({
  container: 'container',
  animation: false,
  data,
  node: {
    type: 'donut',
    style: {
      size: 80,
      fill: '#DB9D0D',
      innerR: 20,
      donuts: (item) => {
        const { index } = item;
        if (index === 0) return [1, 2, 3]; // donuts数据类型为number[]时，根据值的大小决定环的占比

        if (index === 1) {
          return [
            { value: 50, color: 'red' },
            { value: 150, color: 'green' },
            { value: 100, color: 'blue' },
          ];
        }

        if (index === 4) {
          return [
            { value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 },
            { value: 250, stroke: '#fff', lineWidth: 1 },
            { value: 200, stroke: '#fff', lineWidth: 1 },
          ];
        }

        return [100, 200, 100, 200];
      },
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
