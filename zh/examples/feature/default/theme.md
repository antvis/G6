---
title: "主题切换"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/feature/default/theme/"
version: "5.1.1"
---

# 主题切换

[运行示例](https://g6.antv.antgroup.com/zh/examples/feature/default/theme/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const themes = {
  '🌞 Light': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#fff' }],
  },
  '🌚 Dark': {
    theme: 'dark',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#000' }],
  },
  '🌎 Blue': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'blues',
        invert: true,
      },
    },
    plugins: [{ type: 'background', background: '#f3faff' }],
  },
  '🌕 Yellow': {
    background: '#fcf9f1',
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
    plugins: [{ type: 'background', background: '#fcf9f1' }],
  },
};

fetch('https://assets.antv.antgroup.com/g6/20000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      padding: 20,
      autoFit: 'view',
      theme: 'light',
      data,
      node: {
        style: { size: 4 },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
      plugins: [{ type: 'background', background: '#fff' }],
    });

    graph.render();

    addPanel((gui) => {
      gui.add({ theme: '🌞 Light' }, 'theme', Object.keys(themes)).onChange((theme) => {
        graph.setOptions(themes[theme]);
        graph.draw();
      });
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
