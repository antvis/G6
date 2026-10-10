---
title: "Fisheye"
description: "Fisheye"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/plugin/Fisheye/"
version: "5.1.1"
---

## Overview

The Fisheye plugin is designed for focus+context exploration scenarios. It can magnify the area of interest while ensuring that the context and the relationship between the context and the focus center are not lost. It is an important visualization exploration tool.

## Use Cases

- Highlight certain areas during presentations
- Magnify details locally without losing the overall view

## Basic Usage

Below is a simple example of initializing the Fisheye plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'drag', // Move fisheye by dragging
      d: 1.5, // Set distortion factor
      r: 120, // Set fisheye radius
      showDPercent: true, // Show distortion degree
    },
  ],
});
```

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        // 上部节点
        { id: 'Myriel', style: { x: 197, y: 58 } },
        { id: 'Napoleon', style: { x: 147, y: 22 } },
        { id: 'Mlle.Baptistine', style: { x: 225, y: 141 } },
        { id: 'Mme.Magloire', style: { x: 255, y: 120 } },
        { id: 'CountessdeLo', style: { x: 151, y: -3 } },
        { id: 'Geborand', style: { x: 136, y: 41 } },
        { id: 'Champtercier', style: { x: 227, y: 8 } },
        { id: 'Cravatte', style: { x: 172, y: -10 } },
        { id: 'Count', style: { x: 172, y: 12 } },
        { id: 'OldMan', style: { x: 198, y: -6 } },
        // 中上部节点
        { id: 'Labarre', style: { x: 266, y: 203 } },
        { id: 'Marguerite', style: { x: 265, y: 171 } },
        { id: 'Mme.deR', style: { x: 299, y: 133 } },
        { id: 'Isabeau', style: { x: 282, y: 191 } },
        { id: 'Gervais', style: { x: 334, y: 148 } },
        { id: 'Simplice', style: { x: 286, y: 227 } },
        { id: 'Scaufflaire', style: { x: 250, y: 231 } },
        { id: 'Woman1', style: { x: 375, y: 202 } },
        { id: 'Judge', style: { x: 370, y: 139 } },
        { id: 'Champmathieu', style: { x: 404, y: 216 } },
        // 中部主要节点
        { id: 'Valjean', style: { x: 322, y: 221 } },
        { id: 'Fantine', style: { x: 337, y: 187 } },
        { id: 'Cosette', style: { x: 343, y: 248 } },
        { id: 'Javert', style: { x: 368, y: 263 } },
        { id: 'Thenardier', style: { x: 317, y: 300 } },
        { id: 'Mme.Thenardier', style: { x: 283, y: 267 } },
        { id: 'Eponine', style: { x: 268, y: 365 } },
        { id: 'Gavroche', style: { x: 393, y: 380 } },
        { id: 'Marius', style: { x: 336, y: 350 } },
        { id: 'Enjolras', style: { x: 376, y: 371 } },
        // 右侧和右上节点
        { id: 'Gribier', style: { x: 437, y: 160 } },
        { id: 'Jondrette', style: { x: 510, y: 327 } },
        { id: 'Mme.Burgon', style: { x: 466, y: 368 } },
        { id: 'Brevet', style: { x: 399, y: 183 } },
        { id: 'Chenildieu', style: { x: 425, y: 194 } },
        { id: 'Cochepaille', style: { x: 419, y: 148 } },
        { id: 'Child1', style: { x: 361, y: 387 } },
        { id: 'Child2', style: { x: 415, y: 432 } },
        { id: 'Brujon', style: { x: 330, y: 394 } },
        { id: 'Mme.Hucheloup', style: { x: 394, y: 450 } },
        // 中部其他节点
        { id: 'Favourite', style: { x: 284, y: 153 } },
        { id: 'Dahlia', style: { x: 303, y: 170 } },
        { id: 'Zephine', style: { x: 286, y: 94 } },
        { id: 'Tholomyes', style: { x: 359, y: 158 } },
        { id: 'Listolier', style: { x: 308, y: 80 } },
        { id: 'Fameuil', style: { x: 329, y: 89 } },
        { id: 'Blacheville', style: { x: 351, y: 95 } },
        { id: 'Perpetue', style: { x: 234, y: 195 } },
        { id: 'Woman2', style: { x: 304, y: 254 } },
        { id: 'MotherInnocent', style: { x: 350, y: 214 } },
        // 下部节点
        { id: 'Pontmercy', style: { x: 375, y: 307 } },
        { id: 'Boulatruelle', style: { x: 260, y: 279 } },
        { id: 'Anzelma', style: { x: 234, y: 303 } },
        { id: 'Gillenormand', style: { x: 338, y: 286 } },
        { id: 'Magnon', style: { x: 277, y: 317 } },
        { id: 'Mlle.Gillenormand', style: { x: 257, y: 306 } },
        { id: 'Mme.Pontmercy', style: { x: 307, y: 318 } },
        { id: 'Mlle.Vaubois', style: { x: 197, y: 325 } },
        { id: 'Lt.Gillenormand', style: { x: 294, y: 296 } },
        { id: 'Toussaint', style: { x: 306, y: 277 } },
        { id: 'Gueulemer', style: { x: 344, y: 323 } },
        { id: 'Babet', style: { x: 367, y: 319 } },
        { id: 'Claquesous', style: { x: 303, y: 347 } },
        { id: 'Montparnasse', style: { x: 322, y: 330 } },
        // 最下部节点
        { id: 'Combeferre', style: { x: 397, y: 416 } },
        { id: 'Prouvaire', style: { x: 309, y: 426 } },
        { id: 'Feuilly', style: { x: 314, y: 456 } },
        { id: 'Courfeyrac', style: { x: 332, y: 435 } },
        { id: 'Bahorel', style: { x: 343, y: 466 } },
        { id: 'Bossuet', style: { x: 305, y: 382 } },
        { id: 'Joly', style: { x: 371, y: 415 } },
        { id: 'Grantaire', style: { x: 370, y: 466 } },
        { id: 'MotherPlutarch', style: { x: 424, y: 461 } },
      ],
      edges: [
        // 主要连接
        { id: 'e1', source: 'Valjean', target: 'Javert' },
        { id: 'e2', source: 'Valjean', target: 'Cosette' },
        { id: 'e3', source: 'Javert', target: 'Thenardier' },
        { id: 'e4', source: 'Cosette', target: 'Marius' },
        { id: 'e5', source: 'Eponine', target: 'Marius' },
        { id: 'e6', source: 'Enjolras', target: 'Marius' },
        { id: 'e7', source: 'Gavroche', target: 'Enjolras' },
        { id: 'e8', source: 'Valjean', target: 'Fantine' },
        { id: 'e9', source: 'Cosette', target: 'Thenardier' },
        { id: 'e10', source: 'Eponine', target: 'Thenardier' },
        // 上部连接
        { id: 'e11', source: 'Myriel', target: 'Napoleon' },
        { id: 'e12', source: 'Myriel', target: 'Mlle.Baptistine' },
        { id: 'e13', source: 'Mlle.Baptistine', target: 'Mme.Magloire' },
        { id: 'e14', source: 'CountessdeLo', target: 'Myriel' },
        { id: 'e15', source: 'Geborand', target: 'Myriel' },
        // 中部连接
        { id: 'e16', source: 'Favourite', target: 'Tholomyes' },
        { id: 'e17', source: 'Dahlia', target: 'Favourite' },
        { id: 'e18', source: 'Zephine', target: 'Favourite' },
        { id: 'e19', source: 'Tholomyes', target: 'Listolier' },
        { id: 'e20', source: 'Fameuil', target: 'Blacheville' },
        // 下部连接
        { id: 'e21', source: 'Combeferre', target: 'Enjolras' },
        { id: 'e22', source: 'Prouvaire', target: 'Combeferre' },
        { id: 'e23', source: 'Feuilly', target: 'Courfeyrac' },
        { id: 'e24', source: 'Bahorel', target: 'Bossuet' },
        { id: 'e25', source: 'Joly', target: 'Grantaire' },
        // 额外的中部连接
        { id: 'e26', source: 'Gueulemer', target: 'Thenardier' },
        { id: 'e27', source: 'Babet', target: 'Gueulemer' },
        { id: 'e28', source: 'Claquesous', target: 'Montparnasse' },
        { id: 'e29', source: 'Brujon', target: 'Babet' },
        { id: 'e30', source: 'Child1', target: 'Gavroche' },
        // 新增更多连接
        { id: 'e31', source: 'Valjean', target: 'Simplice' },
        { id: 'e32', source: 'Fantine', target: 'Simplice' },
        { id: 'e33', source: 'Javert', target: 'Simplice' },
        { id: 'e34', source: 'Marius', target: 'Gillenormand' },
        { id: 'e35', source: 'Cosette', target: 'Gillenormand' },
        { id: 'e36', source: 'Marius', target: 'Lt.Gillenormand' },
        { id: 'e37', source: 'Gillenormand', target: 'Lt.Gillenormand' },
        { id: 'e38', source: 'Cosette', target: 'Toussaint' },
        { id: 'e39', source: 'Javert', target: 'Toussaint' },
        { id: 'e40', source: 'Valjean', target: 'Toussaint' },
        // 随机添加更多连接
        ...Array.from({ length: 50 }, (_, i) => ({
          // 从40增加到50个随机连接
          id: `edge-${i + 41}`,
          source: [
            'Valjean',
            'Javert',
            'Cosette',
            'Marius',
            'Enjolras',
            'Fantine',
            'Thenardier',
            'Eponine',
            'Gavroche',
            'Gueulemer',
            'Babet',
            'Claquesous',
            'Favourite',
            'Tholomyes',
            'Simplice',
          ][Math.floor(Math.random() * 15)],
          target: [
            'Favourite',
            'Dahlia',
            'Tholomyes',
            'Combeferre',
            'Prouvaire',
            'Feuilly',
            'Courfeyrac',
            'Bahorel',
            'Bossuet',
            'Montparnasse',
            'Brujon',
            'Child1',
            'Simplice',
            'Toussaint',
            'Gillenormand',
          ][Math.floor(Math.random() * 15)],
        })),
      ],
    },
    autoFit: 'view',
    node: {
      style: {
        size: (datum) => datum.id.length * 2 + 10,
        label: false,
        labelText: (datum) => datum.id,
        labelBackground: true,
        icon: false,
        iconFontFamily: 'iconfont',
        iconText: '\ue6f6',
        iconFill: '#fff',
      },
      palette: {
        type: 'group',
        field: (datum) => datum.id,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'fisheye',
        key: 'fisheye',
        r: 120,
        d: 1.5,
        nodeStyle: {
          label: true,
          icon: true,
        },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const TRIGGER_OPTIONS = ['pointermove', 'drag', 'click'];
    const SCALE_OPTIONS = ['wheel', 'drag', '-'];

    const options = {
      type: 'fisheye',
      trigger: 'pointermove',
      r: 120,
      d: 1.5,
      maxR: 200,
      minR: 50,
      maxD: 5,
      minD: 0.5,
      scaleRBy: '-',
      scaleDBy: '-',
      showDPercent: true,
      preventDefault: true,
    };

    const optionFolder = gui.addFolder('Fisheye Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', TRIGGER_OPTIONS);
    optionFolder.add(options, 'r', 50, 200, 10);
    optionFolder.add(options, 'd', 0.5, 5, 0.1);
    optionFolder.add(options, 'scaleRBy', SCALE_OPTIONS);
    optionFolder.add(options, 'scaleDBy', SCALE_OPTIONS);
    optionFolder.add(options, 'showDPercent');
    optionFolder.add(options, 'preventDefault');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'fisheye',
        [property]: value === '-' ? undefined : value,
      });
      graph.render();
    });
  },
);
```



## Configuration Options

| Property       | Description                                                                                                                                                                                                                   | Type                                                                                                                                                                    | Default Value                               | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- |
| type           | Plugin type                                                                                                                                                                                                                   | string                                                                                                                                                                  | `fisheye`                                   | ✓        |
| key            | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                                                             | string                                                                                                                                                                  | -                                           |          |
| trigger        | Method to move the fisheye:<br/>- `pointermove`: The fisheye always follows the mouse movement <br/>- `click`: Move the fisheye to the click position when clicking on the canvas <br/>- `drag`: Move the fisheye by dragging | `pointermove` \| `drag` \| `click`                                                                                                                                      | `pointermove`                               |          |
| r              | Radius of the fisheye                                                                                                                                                                                                         | number                                                                                                                                                                  | 120                                         |          |
| maxR           | Maximum adjustable radius of the fisheye                                                                                                                                                                                      | number                                                                                                                                                                  | Half of the smaller dimension of the canvas |          |
| minR           | Minimum adjustable radius of the fisheye                                                                                                                                                                                      | number                                                                                                                                                                  | 0                                           |          |
| d              | Distortion factor                                                                                                                                                                                                             | number                                                                                                                                                                  | 1.5                                         |          |
| maxD           | Maximum adjustable distortion factor of the fisheye                                                                                                                                                                           | number                                                                                                                                                                  | 5                                           |          |
| minD           | Minimum adjustable distortion factor of the fisheye                                                                                                                                                                           | number                                                                                                                                                                  | 0                                           |          |
| scaleRBy       | Method to adjust the fisheye radius:<br/>- `'wheel'`: Adjust by wheel <br/>- `'drag'`: Adjust by dragging                                                                                                                     | `wheel` \| `drag`                                                                                                                                                       | -                                           |          |
| scaleDBy       | Method to adjust the fisheye distortion factor:<br/>- `'wheel'`: Adjust by wheel <br/>- `'drag'`: Adjust by dragging                                                                                                          | `wheel` \| `drag`                                                                                                                                                       | -                                           |          |
| showDPercent   | Whether to show the distortion factor value in the fisheye                                                                                                                                                                    | boolean                                                                                                                                                                 | true                                        |          |
| style          | Style of the fisheye, [configuration options](#style)                                                                                                                                                                         | object                                                                                                                                                                  | -                                           |          |
| nodeStyle      | Style of nodes in the fisheye                                                                                                                                                                                                 | [NodeStyle](/en/manual/element/node/BaseNode/#style) \| ((datum: [NodeData](/en/manual/data/#节点数据nodedata)) => [NodeStyle](/en/manual/element/node/BaseNode/#style)) | `{ label: true }`                           |          |
| preventDefault | Whether to prevent default events                                                                                                                                                                                             | boolean                                                                                                                                                                 | true                                        |          |

### style

Circular style properties for configuring the appearance of the fisheye.

| Property      | Description        | Type                          | Default Value |
| ------------- | ------------------ | ----------------------------- | ------------- |
| fill          | Fill color         | string \| Pattern \| null     | `#ccc`        |
| stroke        | Stroke color       | string \| Pattern \| null     | `#000`        |
| opacity       | Overall opacity    | number \| string              | -             |
| fillOpacity   | Fill opacity       | number \| string              | 0.1           |
| strokeOpacity | Stroke opacity     | number \| string              | -             |
| lineWidth     | Line width         | number \| string              | 2             |
| lineCap       | Line cap style     | `butt` \| `round` \| `square` | -             |
| lineJoin      | Line join style    | `miter` \| `round` \| `bevel` | -             |
| shadowColor   | Shadow color       | string                        | -             |
| shadowBlur    | Shadow blur degree | number                        | -             |
| shadowOffsetX | Shadow X offset    | number                        | -             |
| shadowOffsetY | Shadow Y offset    | number                        | -             |

For complete style properties, refer to [Element - Node - Built-in Node - General Style Properties - style](/en/manual/element/node/BaseNode/#style)

### Zoom Control

`scaleRBy` and `scaleDBy` can be used to control the adjustment method of the fisheye's radius and distortion factor respectively:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      // Adjust radius by wheel
      scaleRBy: 'wheel',
      // Adjust distortion factor by dragging
      scaleDBy: 'drag',
      // Set range for radius and distortion factor
      minR: 50,
      maxR: 200,
      minD: 1,
      maxD: 3,
    },
  ],
});
```

Note: When `trigger`, `scaleRBy`, and `scaleDBy` are all set to `'drag'`, the priority order is `trigger` > `scaleRBy` > `scaleDBy`, and only the highest priority configuration item will bind the drag event. Similarly, if `scaleRBy` and `scaleDBy` are both set to `'wheel'`, only `scaleRBy` will bind the wheel event.

## Code Examples

### Basic Usage

The simplest configuration method:

```js
const graph = new Graph({
  plugins: ['fisheye'],
});
```

### Custom Styles

You can customize the appearance and behavior of the fisheye:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      r: 150,
      d: 2,
      style: {
        fill: '#2f54eb', // Fill color of the fisheye area
        fillOpacity: 0.2, // Opacity of the fill area
        stroke: '#1d39c4', // Color of the fisheye border
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
        shadowColor: '#1d39c4', // Shadow color
        shadowBlur: 10, // Shadow blur radius
        shadowOffsetX: 0, // Horizontal shadow offset
        shadowOffsetY: 0, // Vertical shadow offset
        cursor: 'pointer', // Cursor style when hovering
      },
      nodeStyle: {
        // Basic node style
        size: 40, // Node size
        fill: '#d6e4ff', // Node fill color
        stroke: '#2f54eb', // Node border color
        lineWidth: 2, // Node border width
        shadowColor: '#2f54eb', // Node shadow color
        shadowBlur: 5, // Node shadow blur radius
        cursor: 'pointer', // Cursor style when hovering

        // Label style
        label: true, // Show label
        labelFontSize: 14, // Label font size
        labelFontWeight: 'bold', // Label font weight
        labelFill: '#1d39c4', // Label text color
        labelBackground: true, // Show label background
        labelBackgroundFill: '#fff', // Label background fill color
        labelBackgroundStroke: '#1d39c4', // Label background border color
        labelBackgroundOpacity: 0.8, // Label background opacity
        labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top, right, bottom, left]

        // Icon style
        icon: true, // Show icon
        iconFontFamily: 'iconfont', // Icon font
        iconText: '\ue6f6', // Icon Unicode
        iconFill: '#1d39c4', // Icon color
        iconSize: 16, // Icon size
        iconFontWeight: 'normal', // Icon font weight
      },
    },
  ],
});
```

The effect is as follows:



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  data: {
    nodes: [
      { id: 'node-1', style: { x: 150, y: 100 } },
      { id: 'node-2', style: { x: 250, y: 100 } },
      { id: 'node-3', style: { x: 200, y: 180 } },
      { id: 'node-4', style: { x: 120, y: 180 } },
      { id: 'node-5', style: { x: 280, y: 180 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
      { id: 'edge-3', source: 'node-2', target: 'node-3' },
      { id: 'edge-4', source: 'node-3', target: 'node-4' },
      { id: 'edge-5', source: 'node-3', target: 'node-5' },
    ],
  },
  node: {
    style: {
      size: 30,
      fill: '#e6f7ff',
      stroke: '#1890ff',
      lineWidth: 1,
      label: false,
      icon: false,
    },
  },
  edge: {
    style: {
      stroke: '#91d5ff',
      lineWidth: 1,
    },
  },
  plugins: [
    {
      type: 'fisheye',
      key: 'fisheye',
      r: 100,
      d: 2,
      style: {
        fill: '#2f54eb', // Fill color of the fisheye area
        fillOpacity: 0.2, // Opacity of the fill area
        stroke: '#1d39c4', // Color of the fisheye border
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
        shadowColor: '#1d39c4', // Shadow color
        shadowBlur: 10, // Shadow blur radius
        shadowOffsetX: 0, // Horizontal shadow offset
        shadowOffsetY: 0, // Vertical shadow offset
        cursor: 'pointer', // Cursor style when hovering
      },
      nodeStyle: {
        // Basic node style
        size: 40, // Node size
        fill: '#d6e4ff', // Node fill color
        stroke: '#2f54eb', // Node border color
        lineWidth: 2, // Node border width
        shadowColor: '#2f54eb', // Node shadow color
        shadowBlur: 5, // Node shadow blur radius
        cursor: 'pointer', // Cursor style when hovering

        // Label style
        label: true, // Show label
        labelFontSize: 14, // Label font size
        labelFontWeight: 'bold', // Label font weight
        labelFill: '#1d39c4', // Label text color
        labelBackground: true, // Show label background
        labelBackgroundFill: '#fff', // Label background fill color
        labelBackgroundStroke: '#1d39c4', // Label background border color
        labelBackgroundOpacity: 0.8, // Label background opacity
        labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top, right, bottom, left]

        // Icon style
        icon: true, // Show icon
        iconFontFamily: 'iconfont', // Icon font
        iconText: '\ue6f6', // Icon Unicode
        iconFill: '#1d39c4', // Icon color
        iconSize: 16, // Icon size
        iconFontWeight: 'normal', // Icon font weight
      },
    },
  ],
});

graph.render();
```


## Practical Examples



```ts

import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
    });
    graph.render();
  });
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
