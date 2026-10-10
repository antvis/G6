---
title: "径向布局 Radial"
description: "径向布局 Radial"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/layout/RadialLayout/"
version: "5.1.1"
---

## 概述

径向（Radial）布局是一种将节点以同心圆方式分层排列的图布局算法，常用于展示层级关系、社群结构等。该布局支持节点防重叠、分组排序等高级特性，适用于多种网络结构的可视化。

## 使用场景

- 展示层级结构（如组织架构、家谱等）
- 社群结构分析
- 需要突出中心节点及其辐射关系的场景
- 需要节点分组、排序的复杂网络

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
        { id: '11' },
        { id: '12' },
        { id: '13' },
        { id: '14' },
        { id: '15' },
        { id: '16' },
        { id: '17' },
        { id: '18' },
        { id: '19' },
        { id: '20' },
        { id: '21' },
        { id: '22' },
        { id: '23' },
        { id: '24' },
        { id: '25' },
        { id: '26' },
        { id: '27' },
        { id: '28' },
        { id: '29' },
        { id: '30' },
        { id: '31' },
        { id: '32' },
        { id: '33' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '5' },
        { source: '0', target: '7' },
        { source: '0', target: '8' },
        { source: '0', target: '9' },
        { source: '0', target: '10' },
        { source: '0', target: '11' },
        { source: '0', target: '13' },
        { source: '0', target: '14' },
        { source: '0', target: '15' },
        { source: '0', target: '16' },
        { source: '2', target: '3' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' },
        { source: '7', target: '13' },
        { source: '8', target: '14' },
        { source: '10', target: '22' },
        { source: '10', target: '14' },
        { source: '10', target: '12' },
        { source: '10', target: '24' },
        { source: '10', target: '21' },
        { source: '10', target: '20' },
        { source: '11', target: '24' },
        { source: '11', target: '22' },
        { source: '11', target: '14' },
        { source: '12', target: '13' },
        { source: '16', target: '17' },
        { source: '16', target: '18' },
        { source: '16', target: '21' },
        { source: '16', target: '22' },
        { source: '17', target: '18' },
        { source: '17', target: '20' },
        { source: '18', target: '19' },
        { source: '19', target: '20' },
        { source: '19', target: '33' },
        { source: '19', target: '22' },
        { source: '19', target: '23' },
        { source: '20', target: '21' },
        { source: '21', target: '22' },
        { source: '22', target: '24' },
        { source: '22', target: '26' },
        { source: '22', target: '23' },
        { source: '22', target: '28' },
        { source: '22', target: '30' },
        { source: '22', target: '31' },
        { source: '22', target: '32' },
        { source: '22', target: '33' },
        { source: '23', target: '28' },
        { source: '23', target: '27' },
        { source: '23', target: '29' },
        { source: '23', target: '30' },
        { source: '23', target: '31' },
        { source: '23', target: '33' },
        { source: '32', target: '33' },
      ],
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'radial',
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
      preventOverlap: false,
      strictRadial: true,
      sortBy: undefined,
      sortStrength: 10,
    };
    const optionFolder = gui.addFolder('Radial Layout Options');
    optionFolder.add(options, 'nodeSize', 1, 100, 1);
    optionFolder.add(options, 'unitRadius', 10, 300, 1);
    optionFolder.add(options, 'linkDistance', 10, 400, 1);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'strictRadial');
    optionFolder.add(options, 'sortStrength', 1, 100, 1);
    optionFolder.add(options, 'sortBy', [undefined, 'data', 'id']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.setLayout(
        Object.assign({}, graph.getLayout(), {
          [property]: value,
        }),
      );
      await graph.layout();
      graph.fitView();
    });
  },
);
```



## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'radial',
    nodeSize: 32,
    unitRadius: 100,
    linkDistance: 200,
  },
  // 其他配置...
});
```

## 配置项

| 属性                       | 描述                                         | 类型                                             | 默认值   | 必选 |
| -------------------------- | -------------------------------------------- | ------------------------------------------------ | -------- | ---- |
| type                       | 布局类型                                     | string                                           | `radial` | ✓    |
| center                     | 圆心坐标                                     | [number, number]                                 | -        |      |
| focusNode                  | 辐射中心节点                                 | string \| Node \| null                           | null     |      |
| height                     | 画布高度                                     | number                                           | -        |      |
| width                      | 画布宽度                                     | number                                           | -        |      |
| nodeSize                   | 节点大小（直径）                             | number \| number[] \| ((nodeData: Node) => Size) | -        |      |
| nodeSpacing                | 节点最小间距（防重叠时生效）                 | number \| (nodeData: Node) => number             | 10       |      |
| linkDistance               | 边长度                                       | number                                           | 50       |      |
| unitRadius                 | 每圈半径；为 null 时按布局空间自动计算       | number \| null                                   | 100      |      |
| maxIteration               | 最大迭代次数                                 | number                                           | 1000     |      |
| maxPreventOverlapIteration | 防重叠最大迭代次数                           | number                                           | 200      |      |
| preventOverlap             | 是否防止节点重叠                             | boolean                                          | false    |      |
| sortBy                     | 同层节点排序字段或排序函数                   | string \| ((nodeData: Node) => number \| string) | -        |      |
| sortStrength               | 同层节点排序强度                             | number                                           | 10       |      |
| strictRadial               | 是否严格每层节点在同一圆环上（防重叠时生效） | boolean                                          | true     |      |

## 代码示例

### 基本用法

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });
    graph.render();
  });
```

效果如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d3P-RK4YCDYAAAAAAAAAAAAADmJ7AQ/original" alt="基本 Radial 辐射布局" style="max-width: 600px;" />

## 实际案例

- [基本 Radial 辐射布局](/zh/examples/layout/radial/basic/)
- [防止节点重叠的严格辐射布局](/zh/examples/layout/radial/strict-prevent-overlap/)
- [防止节点重叠的非严格辐射布局](/zh/examples/layout/radial/non-strict-prevent-overlap/)
- [排序聚类](/zh/examples/layout/radial/cluster-sort/)
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
