---
title: "Rect Combo"
description: "Rect Combo"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/combo/RectCombo/"
version: "5.1.1"
---

## Overview

The rectangular combo organizes content with right-angle boundaries, supporting strict hierarchical structures.

Applicable scenarios:

- **System Architecture Diagrams**: Such as service layering within system architecture, and subdivisions within each layer.
- **Geographical Area Division**: Such as cities containing multiple areas, where the rectangular combo can intuitively display administrative boundaries or functional divisions.

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
    combo: { type: 'rect' },
    behaviors: ['collapse-expand'],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'rect' }, 'type').disable();
  },
);
```


设置 `combo.type` 为 `rect` 以使用矩形组合。

## Style Configuration

> If the element has its specific attributes, we will list them below. For all general style attributes, see [BaseCombo](/en/manual/element/combo/BaseCombo/)

## Example

The following example is a simple microservice architecture service layer:



```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo2', style: { x: 100, y: 100, labelText: '微服务1' } },
      { id: 'node2', combo: 'combo2', style: { x: 200, y: 100, labelText: '微服务2' } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 200, labelText: '微服务3' } },
      { id: 'node4', combo: 'combo2', style: { x: 200, y: 200, labelText: '微服务4' } },
      { id: 'node5', combo: 'combo3', style: { x: 300, y: 100, labelText: '第三方登录' } },
      { id: 'node6', combo: 'combo3', style: { x: 300, y: 150, labelText: '任务调度' } },
      { id: 'node7', combo: 'combo3', style: { x: 300, y: 200, labelText: '消息服务' } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node3', target: 'node4' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '服务层' } },
      { id: 'combo2', combo: 'combo1', style: { labelText: '业务微服务' } },
      { id: 'combo3', combo: 'combo1', style: { labelText: '集成模块' } },
    ],
  },
  node: {
    type: 'rect',
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  combo: {
    type: 'rect',
    style: {
      padding: 16,
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
