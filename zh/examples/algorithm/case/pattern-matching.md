---
title: "图模式匹配"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/algorithm/case/pattern-matching/"
version: "5.1.1"
---

# 图模式匹配

[运行示例](https://g6.antv.antgroup.com/zh/examples/algorithm/case/pattern-matching/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { GADDI } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const pattern = {
  nodes: [
    {
      id: 'pn0',
      cluster: 'nodeType-0',
    },
    {
      id: 'pn1',
      cluster: 'nodeType-1',
    },
    {
      id: 'pn2',
      cluster: 'nodeType-2',
    },
  ],
  edges: [
    { source: 'pn1', target: 'pn0', cluster: 'edgeType-1' },
    { source: 'pn1', target: 'pn2', cluster: 'edgeType-0' },
    { source: 'pn2', target: 'pn0', cluster: 'edgeType-2' },
  ],
};

fetch('https://assets.antv.antgroup.com/g6/gaddi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelPlacement: 'center',
          labelText: (d) => d.label,
          stroke: '#5F95FF',
          lineWidth: 1,
        },
        palette: {
          type: 'group',
          field: 'cluster',
          color: ['#5F95FF', '#61DDAA', '#65789B'],
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
        palette: {
          type: 'group',
          field: 'cluster',
          color: ['#5F95FF', '#61DDAA', '#65789B'],
        },
      },
      plugins: [
        {
          type: 'legend',
          nodeField: 'cluster',
          position: 'bottom',
        },
        {
          key: 'hull-0',
          type: 'hull',
          members: [],
        },
        {
          key: 'hull-1',
          type: 'hull',
          members: [],
        },
      ],
    });
    graph.render();

    addPanel((gui) => {
      gui.add(
        {
          match: () => {
            const matches = GADDI(data, pattern, true, undefined, undefined, 'cluster', 'cluster');
            matches.forEach((match, i) => {
              graph.updatePlugin({
                key: `hull-${i}`,
                members: match.nodes.map((node) => node.id),
              });
            });
            graph.render();
          },
        },
        'match',
      );
    });
  });
```

## src/demo-runtime.ts

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
