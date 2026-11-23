---
title: "最短路径"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/algorithm/case/shortest-path/"
version: "5.1.1"
---

# 最短路径

[运行示例](https://g6.antv.antgroup.com/zh/examples/algorithm/case/shortest-path/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { findShortestPath } from '@antv/algorithm';
import { CanvasEvent, Graph } from '@antv/g6';

const format = ({ nodes, edges }) => {
  return {
    nodes: nodes.map((node) => ({
      ...node,
      style: {
        x: node.x,
        y: node.y,
      },
    })),
    edges,
  };
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then(format)
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      node: {
        style: {
          size: 12,
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', { type: 'click-select', multiple: true }],
      autoFit: 'view',
    });

    graph.render();

    const resetStates = () => {
      graph.setElementState(Object.fromEntries([...data.nodes, ...data.edges].map((element) => [element.id, []])));
    };

    graph.on(CanvasEvent.CLICK, () => {
      resetStates();
    });

    addPanel((gui) => {
      gui.add(
        {
          Help: () => {
            alert("Press 'shift' to select source and target nodes \n按住 'shift' 选取起点和终点");
          },
        },
        'Help',
      );
      gui.add(
        {
          Search: () => {
            const nodes = graph.getElementDataByState('node', 'selected');
            if (nodes.length !== 2) {
              alert('Please select 2 nodes!\n请选择两个节点！');
              return;
            }
            const [source, target] = nodes;
            const { length, path } = findShortestPath(data, source.id, target.id);
            if (length === Infinity) {
              alert('No path found!\n未找到路径！');
              return;
            }

            const states = {};
            data.nodes.forEach(({ id }) => {
              if (path.includes(id)) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            data.edges.forEach(({ id, source, target }) => {
              const sourceIndex = path.indexOf(source);
              const targetIndex = path.indexOf(target);
              if (sourceIndex === -1 || targetIndex === -1) return;
              if (Math.abs(sourceIndex - targetIndex) === 1) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            graph.setElementState(states);
            graph.frontElement(path);
          },
        },
        'Search',
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
