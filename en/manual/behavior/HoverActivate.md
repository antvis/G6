---
title: "HoverActivate"
description: "HoverActivate"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/HoverActivate/"
version: "5.1.1"
---

## Overview

HoverActivate is a built-in behavior in G6 used to implement the hover activation effect on elements. When the mouse hovers over nodes or edges, it automatically triggers visual feedback such as highlighting and displaying. This behavior is an important means of enhancing data exploration in graph visualization, helping users quickly focus on target elements and obtain related information.

## Use Cases

This behavior is mainly used for:

- Quickly locating elements of interest in complex relationship graphs
- Displaying additional information of nodes through hover
- Highlighting connection paths by activating edges when analyzing relationships between nodes

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 } },
        { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 } },
        { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
        { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
        { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
        { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
        { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
        { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
        { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
        { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
        { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
        { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
        { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
        { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
        { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
        { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
        { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
      ],
      edges: [
        { source: 'node0', target: 'node1', label: '0-1' },
        { source: 'node0', target: 'node2', label: '0-2' },
        { source: 'node0', target: 'node3', label: '0-3' },
        { source: 'node0', target: 'node4', label: '0-4' },
        { source: 'node0', target: 'node5', label: '0-5' },
        { source: 'node1', target: 'node6', label: '1-6' },
        { source: 'node1', target: 'node7', label: '1-7' },
        { source: 'node2', target: 'node8', label: '2-8' },
        { source: 'node2', target: 'node9', label: '2-9' },
        { source: 'node2', target: 'node10', label: '2-10' },
        { source: 'node2', target: 'node11', label: '2-11' },
        { source: 'node2', target: 'node12', label: '2-12' },
        { source: 'node2', target: 'node13', label: '2-13' },
        { source: 'node3', target: 'node14', label: '3-14' },
        { source: 'node3', target: 'node15', label: '3-15' },
        { source: 'node3', target: 'node16', label: '3-16' },
      ],
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'hover-activate', type: 'hover-activate' }],
    autoFit: 'center',
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'hover-activate',
      type: 'hover-activate',
      animation: true,
      enable: true,
      degree: 1,
      direction: 'both',
    };
    const optionFolder = gui.addFolder('Hover Activate Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 10, 1);
    optionFolder.add(options, 'direction', {
      both: ['both'],
      in: ['in'],
      out: ['out'],
    });

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'hover-activate',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['hover-activate'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      key: 'hover-activate-1', // Specify an identifier for the behavior for dynamic updates
    },
  ],
});
```

## Configuration Options

| Option        | Description                                 | Type                                           | Default          | Required |
| ------------- | ------------------------------------------- | ---------------------------------------------- | ---------------- | -------- |
| type          | Behavior type name                          | string                                         | `hover-activate` | ✓        |
| animation     | Whether to enable animation                 | boolean                                        | true             |          |
| enable        | Whether to enable hover feature             | boolean \| ((event: IPointerEvent) => boolean) | true             |          |
| degree        | Degree of relationship to activate elements | number \| ((event: IPointerEvent) => number);  | 0                |          |
| direction     | Specify edge direction                      | `both` \| `in` \| `out`                        | `both`           |          |
| state         | State of activated elements                 | string                                         | `active`         |          |
| inactiveState | State of inactive elements                  | string                                         | -                |          |
| onHover       | Callback when element is hovered            | (event: IPointerEvent) => void                 | -                |          |
| onHoverEnd    | Callback when hover ends                    | (event: IPointerEvent) => void                 | -                |          |

### enable

`enable` is used to control whether to enable hover highlighting of elements, and can receive a function for dynamic control

For example: Enable hover highlighting only for nodes

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## Code Examples

### Basic Hover Usage

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: ['hover-activate'],
});
```

### Node Trigger Highlight

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

### Flowchart Node Hover Next Node Highlight

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      degree: 1,
      direction: 'out',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## Practical Example



```ts

import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: ['hover-activate'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
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
