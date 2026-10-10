---
title: "Circle Combo"
description: "Circle Combo"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/combo/CircleCombo/"
version: "5.1.1"
---

## Overview

The circular combo wraps child nodes or child combos with a circular boundary, suitable for representing equal or non-hierarchical group relationships.

Applicable scenarios:

- Suitable for representing node groups without a clear hierarchical relationship. The circular combo can reflect the equality of members, such as user groups in social networks or decentralized team structures (highlighting collaboration).

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    behaviors: ['drag-element', 'collapse-expand'],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'circle' }, 'type').disable();
  },
);
```


设置 `combo.type` 为 `circle` 以使用圆形组合。

## Style Configuration

> If the element has its specific attributes, we will list them below. For all general style attributes, see [BaseCombo](/en/manual/element/combo/BaseCombo/)

## Example

The following example shows the distribution of interest group members:



```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 600,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo2', style: { x: 150, y: 150 } },
      { id: 'node2', combo: 'combo2', style: { x: 200, y: 150 } },
      { id: 'node3', combo: 'combo3', style: { x: 300, y: 150 } },
      { id: 'node4', combo: 'combo3', style: { x: 350, y: 150 } },
      { id: 'node5', combo: 'combo4', style: { x: 230, y: 300 } },
      { id: 'node6', combo: 'combo4', style: { x: 280, y: 300 } },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '兴趣小组' } },
      { id: 'combo2', combo: 'combo1', style: { labelText: '书法' } },
      { id: 'combo3', combo: 'combo1', style: { labelText: '影视' } },
      { id: 'combo4', combo: 'combo1', style: { labelText: '游戏' } },
    ],
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  behaviors: ['drag-element', 'collapse-expand'],
  animation: true,
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
