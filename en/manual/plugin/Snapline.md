---
title: "Snapline"
description: "Snapline"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/plugin/Snapline/"
version: "5.1.1"
---

## Overview

The Snapline plugin provides intelligent alignment guidelines for the canvas, automatically displaying guide lines when moving nodes and supporting automatic snapping. It helps users achieve precise alignment and is an important tool for improving efficiency and accuracy in graphic editing.

## Use Cases

The Snapline plugin is mainly suitable for the following scenarios:

- When manually adjusting node positions and precise alignment with other nodes is needed
- When dragging multiple nodes while maintaining their alignment relationships
- When creating standardized graphic layouts to ensure consistency in node spacing and positioning
- When improving node layout efficiency through automatic snapping functionality

## Basic Usage

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      key: 'my-snapline', // Specify unique identifier
      tolerance: 5, // Alignment snap threshold
      offset: 20, // Guide line extension distance
      autoSnap: true, // Enable automatic snapping
    },
  ],
});
```

## Live Demo



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node-0' },
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
      ],
      edges: [
        { source: 'node-0', target: 'node-1' },
        { source: 'node-0', target: 'node-2' },
        { source: 'node-0', target: 'node-3' },
        { source: 'node-0', target: 'node-4' },
        { source: 'node-1', target: 'node-0' },
        { source: 'node-2', target: 'node-0' },
        { source: 'node-3', target: 'node-0' },
        { source: 'node-4', target: 'node-0' },
        { source: 'node-5', target: 'node-0' },
      ],
    },
    layout: { type: 'grid' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      { type: 'grid-line', key: 'grid-line', size: 30 },
      {
        type: 'snapline',
        key: 'snapline',
        tolerance: 5,
        offset: 20,
        verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
        horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'snapline',
      tolerance: 5,
      offset: 20,
      autoSnap: true,
    };
    const optionFolder = gui.addFolder('Snapline Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'tolerance', 1, 20, 1);
    optionFolder.add(options, 'offset', 1, 50, 1);
    optionFolder.add(options, 'autoSnap');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'snapline',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## Options

| Property            | Description                                                                                                                                                                                            | Type                                      | Default                 | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ----------------------- | -------- |
| type                | Plugin type                                                                                                                                                                                            | string                                    | `'snapline'`            | ✓        |
| key                 | Plugin unique identifier                                                                                                                                                                               | string                                    | -                       |          |
| tolerance           | The alignment accuracy, that is, when the distance between the moved node and the target position is less than tolerance, the alignment line is displayed                                              | number                                    | 5                       |          |
| offset              | The extension distance of the snapline                                                                                                                                                                 | number                                    | 20                      |          |
| autoSnap            | Whether to enable automatic snapping                                                                                                                                                                   | boolean                                   | true                    |          |
| shape               | Specifies which shape on the element to use as the reference shape:<br/>- `'key'`: uses the key shape of the element as the reference shape<br/>- `Function`: receives the element and returns a shape | string \| ((node: Node) => DisplayObject) | `'key'`                 |          |
| verticalLineStyle   | Vertical snapline style                                                                                                                                                                                | BaseStyleProps                            | `{ stroke: '#1783FF' }` |          |
| horizontalLineStyle | Horizontal snapline style                                                                                                                                                                              | BaseStyleProps                            | `{ stroke: '#1783FF' }` |          |
| filter              | Filter nodes that do not need to participate in alignment                                                                                                                                              | (node: Node) => boolean                   | `() => true`            |          |

### shape

The `shape` property specifies the reference shape for elements and supports the following configurations:

```js
// Use the key shape as reference
{
  type: 'snapline',
  shape: 'key'
}

// Use custom function to return reference shape
{
  type: 'snapline',
  shape: (node) => {
    return node.getShape('custom-shape');
  }
}
```

### Snapline Style Configuration

| Property       | Description             | Type                                     | Default     |
| -------------- | ----------------------- | ---------------------------------------- | ----------- |
| stroke         | Line color              | string \| Pattern \| null                | `'#1783FF'` |
| opacity        | Overall opacity         | number \| string                         | 1           |
| strokeOpacity  | Stroke opacity          | number \| string                         | 1           |
| lineWidth      | Line width              | number \| string                         | 1           |
| lineCap        | Line end style          | `'butt'` \| `'round'` \| `'square'`      | `'butt'`    |
| lineJoin       | Line join style         | `'miter'` \| `'round'` \| `'bevel'`      | `'miter'`   |
| lineDash       | Dash line configuration | number \| string \| (string \| number)[] | -           |
| lineDashOffset | Dash line offset        | number                                   | 0           |
| shadowBlur     | Shadow blur             | number                                   | 0           |
| shadowColor    | Shadow color            | string                                   | -           |
| shadowOffsetX  | Shadow X offset         | number                                   | 0           |
| shadowOffsetY  | Shadow Y offset         | number                                   | 0           |
| cursor         | Mouse cursor style      | string                                   | `'default'` |
| zIndex         | Rendering level         | number                                   | 0           |

Example configuration:

```js
{
  type: 'snapline',
  horizontalLineStyle: {
    stroke: '#F08F56',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
  verticalLineStyle: {
    stroke: '#17C76F',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
}
```

## Code Examples

### Basic Snapline

The simplest usage:

```js
const graph = new Graph({
  plugins: ['snapline'],
});
```

### Custom Configuration

You can customize the snapline behavior according to your needs:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      tolerance: 8, // Larger snap range
      offset: 30, // Longer extension lines
      horizontalLineStyle: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
      filter: (node) => node.id !== 'node-0', // Filter nodes by id, exclude from alignment
    },
  ],
});
```

## Live Example



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'snapline',
      key: 'snapline',
      verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
      horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      autoSnap: false,
    },
  ],
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
