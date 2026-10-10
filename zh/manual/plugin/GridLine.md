---
title: "网格线 GridLine"
description: "网格线 GridLine"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/plugin/GridLine/"
version: "5.1.1"
---

## 概述

网格线插件为画布提供可视化辅助线，帮助用户精确定位和对齐图形元素，是图形绘制中不可或缺的辅助工具。

## 使用场景

网格线插件主要适用于以下场景：

- 辅助用户精确绘图和元素对齐
- 提供视觉参考，增强空间感知
- 在设计和编辑图形时构建结构化的参考系统

## 基本用法

以下是一个简单的 GridLine 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid-line', // 指定唯一标识符，便于后续动态更新
      size: 20,
      stroke: '#0001',
      follow: true,
    },
  ],
});
```

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'grid-line', key: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const LINE_STYLE = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    const options = {
      type: 'grid-line',
      border: true,
      borderLineWidth: 1,
      borderStroke: '#eee',
      borderStyle: 'solid',
      follow: false,
      lineWidth: 1,
      size: 20,
      stroke: '#eee',
    };
    const optionFolder = gui.addFolder('Gird Line Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'size', 1, 50, 1);
    optionFolder.add(options, 'lineWidth', 1, 10, 1);
    optionFolder.addColor(options, 'stroke');
    optionFolder.add(options, 'border');
    optionFolder.add(options, 'borderLineWidth', 1, 10, 1);
    optionFolder.add(options, 'borderStyle', LINE_STYLE);
    optionFolder.addColor(options, 'borderStroke');
    optionFolder.add(options, 'follow');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'grid-line',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## 配置项

| 属性            | 描述                                                                                                     | 类型                                               | 默认值      | 必选 |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------- | ---- |
| type            | 插件类型                                                                                                 | string                                             | `grid-line` | ✓    |
| key             | 插件的唯一标识，可用于获取插件实例或更新插件选项                                                         | string                                             | -           |      |
| border          | 是否显示边框                                                                                             | boolean                                            | true        |      |
| borderLineWidth | 边框线宽                                                                                                 | number                                             | 1           |      |
| borderStroke    | 边框颜色，详细属性参考 [CSS border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color) | string                                             | `#eee`      |      |
| borderStyle     | 边框样式，详细属性参考 [CSS border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | string                                             | `solid`     |      |
| follow          | 是否跟随画布移动                                                                                         | boolean \｜ \{translate ?: boolean, zoom?: boolean\} | false       |      |
| lineWidth       | 网格线宽度                                                                                               | number \| string                                   | 1           |      |
| size            | 网格单元大小，单位为像素                                                                                 | number                                             | 20          |      |
| stroke          | 网格线颜色                                                                                               | string                                             | `#eee`      |      |

### follow

`follow` 属性用于控制网格线是否跟随画布的变换操作。它支持两种配置方式：

1. **布尔值配置**：当设置为 `true` 时，网格线会同时跟随画布的平移和缩放；设置为 `false` 时则保持静态。

```js
// 同时启用跟随平移和缩放
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: true,
    },
  ],
});
```

2. **对象配置**：可以更精细地控制网格线的跟随行为。

```js
// 仅跟随平移，不跟随缩放
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: true, // 跟随平移
        zoom: false, // 不跟随缩放
      },
    },
  ],
});

// 仅跟随缩放，不跟随平移
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: false, // 不跟随平移
        zoom: true, // 跟随缩放
      },
    },
  ],
});
```

当网格线跟随缩放时，它会保持与画布内容的相对位置关系，使得对齐参考更加精准。跟随平移则让网格随着画布内容一起移动，增强空间连续性的视觉体验。

## 代码示例

### 基础网格线

最简单的方式是直接使用预设配置：

```js
const graph = new Graph({
  // 其他配置...
  plugins: ['grid-line'],
});
```

效果如下：



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas'],
  plugins: ['grid-line'],
});

graph.render();
```


### 自定义样式

您可以根据需要自定义网格线的样式：

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'grid-line',
      stroke: '#1890ff33', // 蓝色半透明网格线
      lineWidth: 2,
      size: 40, // 更大的网格单元
      borderStroke: '#1890ff', // 蓝色边框
      borderLineWidth: 2,
    },
  ],
});
```

效果如下：



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas'],
  plugins: [
    {
      type: 'grid-line',
      stroke: '#1890ff33', // 蓝色半透明网格线
      lineWidth: 2,
      size: 40, // 更大的网格
      borderStroke: '#1890ff', // 蓝色边框
      borderLineWidth: 2,
    },
  ],
});

graph.render();
```


### 跟随移动

启用 follow 选项可以让网格跟随画布移动，增强用户体验：

```js
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'grid-line',
      follow: true, // 网格跟随画布移动
    },
  ],
});
```

试着拖拽/缩放画布，观察网格的跟随效果：



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'grid-line',
      follow: true, // 网格跟随画布移动
    },
  ],
});

graph.render();
```


### 动态更新网格

使用 key 标识符可以在运行时动态更新网格属性：

```js
// 初始化配置
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid',
      size: 20,
    },
  ],
});

// 后续动态更新
graph.updatePlugin({
  key: 'my-grid',
  size: 40, // 更新网格大小
  stroke: '#ff4d4f', // 更新网格颜色
});
```

## 实际案例



```ts
import { addPanel } from '/demo-runtime.ts';

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
  behaviors: ['drag-canvas'],
  plugins: [{ key: 'grid-line', type: 'grid-line', follow: false }],
});

graph.render();

addPanel((gui) => {
  gui
    .add({ follow: false }, 'follow')
    .name('Follow')
    .onChange((value) => {
      graph.updatePlugin({
        key: 'grid-line',
        follow: value,
      });
    });
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
