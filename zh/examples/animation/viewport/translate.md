---
title: "视口平移"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/animation/viewport/translate/"
version: "5.1.1"
---

# 视口平移

[运行示例](https://g6.antv.antgroup.com/zh/examples/animation/viewport/translate/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        Up: () => graph.translateBy([0, -50], animation),
        Down: () => graph.translateBy([0, 50], animation),
        Left: () => graph.translateBy([-50, 0], animation),
        Right: () => graph.translateBy([50, 0], animation),
      };
      gui.add(config, 'Up').name('⬆️ Up');
      gui.add(config, 'Down').name('⬇️ Down');
      gui.add(config, 'Left').name('⬅️ Left');
      gui.add(config, 'Right').name('➡️ Right');
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
