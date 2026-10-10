---
title: "五角形节点 Star"
description: "五角形节点 Star"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/element/node/Star/"
version: "5.1.1"
---

## 概述

星形是一个多角几何形状，具有突出的角。

适用场景：

- 用于表示重要节点、特殊标记或装饰性元素。

- 适合表示流程图、网络图或拓扑图。

- 常用于流程图、网络图、拓扑图等。

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }] },
    node: { type: 'star' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'star' }, 'type').disable();

    const options = {
      size: 40,
      innerR: 0,
    };
    const optionFolder = gui.addFolder('star.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerR', 0, 100);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```


设置 `node.type` 为 `star` 以使用星形节点。

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseNode](/zh/manual/element/node/BaseNode/)

| 属性   | 描述                                 | 类型   | 默认值             | 必选 |
| ------ | ------------------------------------ | ------ | ------------------ | ---- |
| innerR | 内半径，是指从星形中心到内顶点的距离 | number | 默认为外半径的 3/8 |

结构说明：

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VKrvQpdqwXoAAAAAAAAAAAAAemJ7AQ/original" />

## 示例

### 内置五角形节点效果



```ts

import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'star',
    style: {
      size: 40,
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
