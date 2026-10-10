---
title: "小地图 Minimap"
description: "小地图 Minimap"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/plugin/Minimap/"
version: "5.1.1"
---

## 概述

Minimap（小地图）的主要作用是为用户提供以缩略图形式展示当前图内容的整体布局，可以快速定位图操作位置。

**⚠️ 需要注意**，Minimap 插件当前不兼容 React Node 渲染机制，在需要使用 Minimap 功能的场景中，建议通过 [内置节点](/zh/manual/element/node/overview/) 或者[自定义节点](/zh/manual/element/node/custom-node/) 实现节点渲染。

## 使用场景

Minimap（小地图）插件主要适用于以下场景：

- 提供全局视野，快速定位区域
- 导航与交互辅助，通过操作小地图可以快速定位到目标位置

## 基本用法

以下是一个简单的 Minimap 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      key: 'minimap',
      type: 'minimap',
      size: [240, 160],
    },
  ],
});
```

## 在线体验

minimap.md



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: Array.from({ length: 50 }).map((_, i) => ({
        id: `node-${i}`,
        x: Math.random() * 500,
        y: Math.random() * 300,
      })),
      edges: Array.from({ length: 100 }).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 50)}`,
        target: `node-${Math.floor(Math.random() * 50)}`,
      })),
    },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'minimap', key: 'minimap', size: [240, 160], position: 'right-bottom' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'minimap',
      width: 240,
      height: 160,
      shape: 'key',
      padding: 10,
      position: 'right-bottom',
      maskStyleBorder: '1px solid #ddd',
      maskStyleBackground: 'rgba(0, 0, 0, 0.1)',
      containerStyleBorder: '1px solid #ddd',
      containerStyleBackground: '#fff',
      delay: 128,
    };
    const optionFolder = gui.addFolder('Minimap Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder
      .add(options, 'width', 100, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          size: [value, options.height],
        });
        graph.render();
      });
    optionFolder
      .add(options, 'height', 100, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          size: [options.width, value],
        });
        graph.render();
      });
    optionFolder
      .add(options, 'shape', ['key'])
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          shape: value,
        });
        graph.render();
      });
    optionFolder
      .add(options, 'padding', 0, 50, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          padding: value,
        });
        graph.render();
      });
    optionFolder
      .add(options, 'position', ['right-bottom', 'left-bottom', 'right-top', 'left-top'])
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          position: value,
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'maskStyleBorder')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          maskStyle: { ...options.maskStyle, border: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'maskStyleBackground')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          maskStyle: { ...options.maskStyle, background: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'containerStyleBorder')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          containerStyle: { ...options.containerStyle, border: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'containerStyleBackground')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          containerStyle: { ...options.containerStyle, background: value },
        });
        graph.render();
      });
    optionFolder
      .add(options, 'delay', 0, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          delay: value,
        });
        graph.render();
      });

    // Update the maskStyle and containerStyle in the options object
    Object.defineProperty(options, 'maskStyle', {
      get: () => ({
        border: options.maskStyleBorder,
        background: options.maskStyleBackground,
      }),
      set: (value) => {
        options.maskStyleBorder = value.border;
        options.maskStyleBackground = value.background;
      },
    });

    Object.defineProperty(options, 'containerStyle', {
      get: () => ({
        border: options.containerStyleBorder,
        background: options.containerStyleBackground,
      }),
      set: (value) => {
        options.containerStyleBorder = value.border;
        options.containerStyleBackground = value.background;
      },
    });
  },
);
```



## 配置项

| 属性           | 描述                                        | 类型                                                                                                                                                                                                   | 默认值         | 必选 |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ---- |
| type           | 插件类型                                    | string                                                                                                                                                                                                 | `minimap`      | ✓    |
| key            | 插件唯一标识符，用于后续更新                | string                                                                                                                                                                                                 | -              |      |
| className      | 缩略图画布类名，传入外置容器时不生效        | string                                                                                                                                                                                                 |                |      |
| container      | 缩略图挂载的容器，无则挂载到 Graph 所在容器 | HTMLElement \| string                                                                                                                                                                                  |                |      |
| containerStyle | 缩略图的容器样式，传入外置容器时不生效      | Partial\&lt;CSSStyleDeclaration\&gt;                                                                                                                                                                         |                |      |
| delay          | 延迟更新时间(毫秒)，用于性能优化            | number                                                                                                                                                                                                 | 128            |      |
| filter         | 过滤器，用于过滤不必显示的元素              | (id: string, elementType: `node` \| `edge` \| `combo`) => boolean                                                                                                                                      |                |      |
| maskStyle      | 遮罩的样式                                  | Partial\&lt;CSSStyleDeclaration\&gt;                                                                                                                                                                         |                |      |
| padding        | 内边距                                      | number \| number[]                                                                                                                                                                                     | 10             |      |
| position       | 缩略图相对于画布的位置                      | [number, number] \| `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| `center` | `right-bottom` |      |
| renderer       | 渲染器，默认使用 Canvas 渲染器              | IRenderer                                                                                                                                                                                              |                |      |
| shape          | 元素缩略图形的生成方法                      | `key` \| ((id: string, elementType: `node` \| `edge` \| `combo`, element: DisplayObject) => DisplayObject)                                                                                             | `key`          |      |
| size           | 宽度和高度                                  | [number, number]                                                                                                                                                                                       | [240, 160]     |      |

### containerStyle

设置缩略图的容器样式，传入外置容器时不生效。继承了所有 CSS 样式属性（CSSStyleDeclaration），你可以使用任何合法的 CSS 属性来配置缩略图容器的样式。

以下是一些常用配置：

| 属性         | 描述         | 类型   | 默认值           | 必选 |
| ------------ | ------------ | ------ | ---------------- | ---- |
| border       | 容器边框样式 | string | `1px solid #ddd` | ✓    |
| background   | 容器背景颜色 | string | `#fff`           | ✓    |
| borderRadius | 容器圆角大小 | string | -                |      |
| boxShadow    | 容器阴影效果 | string | -                |      |
| padding      | 容器内边距   | string | -                |      |
| margin       | 容器外边距   | string | -                |      |
| opacity      | 透明度       | string | -                |      |

### maskStyle

指定遮罩的样式。继承了所有 CSS 样式属性（CSSStyleDeclaration），你可以使用任何合法的 CSS 属性来配置缩略图容器的样式。

以下是一些常用配置：

| 属性         | 描述         | 类型   | 默认值               | 必选 |
| ------------ | ------------ | ------ | -------------------- | ---- |
| border       | 容器边框样式 | string | `1px solid #ddd`     | ✓    |
| background   | 容器背景颜色 | string | `rgba(0, 0, 0, 0.1)` | ✓    |
| borderRadius | 容器圆角大小 | string | -                    | -    |
| boxShadow    | 容器阴影效果 | string | -                    | -    |
| padding      | 容器内边距   | string | -                    | -    |
| margin       | 容器外边距   | string | -                    | -    |
| opacity      | 透明度       | string | -                    | -    |

### position

缩略图相对于画布的位置，缩略图位置配置支持数组形式和预设值形式。

- 数组形式 [number, number] 表示相对位置，取值范围为 0~1。举例：[0, 0] 代表画布左上角，[1, 1] 代表画布右下角。
- 预设值形式用于设定缩略图所在画布固定方位，可选值有：`left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| `center`

```js
const graph = new Graph({
  plugins:[
    {
      ... // 其他配置
      key: 'minimap',
      type: 'minimap',
      position: 'right-bottom'  // 这里进行修改minimap所在位置
    }
  ]
})
```

效果如下：



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: Array.from({ length: 50 }).map((_, i) => ({
      id: `node-${i}`,
      x: Math.random() * 500,
      y: Math.random() * 300,
    })),
    edges: Array.from({ length: 100 }).map((_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 50)}`,
      target: `node-${Math.floor(Math.random() * 50)}`,
    })),
  },
  node: { style: { fill: '#7e3feb' } },
  edge: { style: { stroke: '#8b9baf' } },
  layout: { type: 'force' },
  behaviors: ['drag-canvas'],
  plugins: [{ type: 'minimap', key: 'minimap', size: [240, 160], position: 'right-bottom' }],
});

graph.render();
```


### size

设置小地图的宽度和高度，默认值为 [240, 160]

```js
const graph = new Graph({
  plugins:[
    {
      ... // 其他配置
      key: 'minimap',
      type: 'minimap',
      size: [200, 120]  // minimap的宽度和高度的设置
    }
  ]
})
```

效果如下：



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: Array.from({ length: 50 }).map((_, i) => ({
      id: `node-${i}`,
      x: Math.random() * 500,
      y: Math.random() * 300,
    })),
    edges: Array.from({ length: 100 }).map((_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 50)}`,
      target: `node-${Math.floor(Math.random() * 50)}`,
    })),
  },
  node: { style: { fill: '#7e3feb' } },
  edge: { style: { stroke: '#8b9baf' } },
  layout: { type: 'force' },
  behaviors: ['drag-canvas'],
  plugins: [{ type: 'minimap', key: 'minimap', size: [200, 120], position: 'right-bottom' }],
});

graph.render();
```


## 实际案例



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      type: 'minimap',
      size: [240, 160],
    },
  ],
  node: {
    palette: 'spectral',
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
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
