---
title: "Donut Node"
description: "Donut Node"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/node/Donut/"
version: "5.1.1"
---

## Overview

The donut node is a ring-shaped geometric figure composed of two concentric circles.

Applicable scenarios:

- Used to represent proportional data, such as completion progress and ratio analysis.

- Suitable for representing multi-layered data, such as nested ring charts.

- Commonly used in data visualization, dashboards, progress charts, etc.

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            fill: 'transparent',
            size: 60,
            donuts: [30, 30, 20, 20],
            donutPalette: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
          },
        },
      ],
    },
    node: { type: 'donut' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'donut' }, 'type').disable();

    const options = {
      size: 60,
      innerR: 50,
      donutPalette: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
    };
    const optionFolder = gui.addFolder('donut.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerR', 0, 100, 1).name('innerR(%)');
    optionFolder.add(options, 'donutPalette', ['spectral', 'tableau', ['#1783FF', '#00C9C9', '#F08F56', '#D580FF']]);

    optionFolder.onChange(({ property, value }) => {
      if (property === 'innerR') value = value + '%';
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```


设置 `node.type` 为 `donut` 以使用甜甜圈节点。

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/BaseNode/)

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



```ts

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
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
