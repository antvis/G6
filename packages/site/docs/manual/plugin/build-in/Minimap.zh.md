---
title: Minimap 小地图
---

## 概述

Minimap（小地图）的主要作用是为用户提供以缩略图形式展示当前图内容的整体布局，可以快速定位图操作位置。

## 使用场景

Minimap（小地图）插件主要适用于以下场景：

- 提供全局视野，快速定位区域
- 导航与交互辅助，通过操作小地图可以快速定位到目标位置

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      key: 'minimap',
      type: 'minimap',
      size: [240, 160],
      renderer: new Renderer(),
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/minimap.md"></embed>

## 配置项

| 属性           | 描述                                        | 类型                                                                                                                                                                                                   | 默认值         | 必选 |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ---- |
| type           | 插件类型                                    | string                                                                                                                                                                                                 | `minimap`      | ✓    |
| key            | 插件唯一标识符，用于后续更新                | string                                                                                                                                                                                                 | -              |      |
| className      | 缩略图画布类名，传入外置容器时不生效        | string                                                                                                                                                                                                 |                |      |
| container      | 缩略图挂载的容器，无则挂载到 Graph 所在容器 | HTMLElement \| string                                                                                                                                                                                  |                |      |
| containerStyle | 缩略图的容器样式，传入外置容器时不生效      | `Partial<CSSStyleDeclaration>`                                                                                                                                                                         |                |      |
| delay          | 延迟更新时间(毫秒)，用于性能优化            | number                                                                                                                                                                                                 | 128            |      |
| filter         | 过滤器，用于过滤不必显示的元素              | (id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean                                                                                                                                      |                |      |
| maskStyle      | 遮罩的样式                                  | `Partial<CSSStyleDeclaration>`                                                                                                                                                                         |                |      |
| padding        | 内边距                                      | number \| number[]                                                                                                                                                                                     | 10             |      |
| position       | 缩略图相对于画布的位置                      | [number, number] \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center' | `right-bottom` |      |
| renderer       | 渲染器，默认使用 Canvas 渲染器              | IRenderer                                                                                                                                                                                              |                |      |
| shape          | 元素缩略图形的生成方法                      | 'key' \| ((id: string, elementType: 'node' \| 'edge' \| 'combo') => DisplayObject)                                                                                                                     | 'key'          |      |
| size           | 宽度和高度                                  | [number, number]                                                                                                                                                                                       | [240, 160]     |      |

### <Badge type="success">Required</Badge> type

> _`minimap` \| string_

此插件已内置，你可以通过 `type: 'minimap'` 来使用它。

### className

> _string_

缩略图画布类名，传入外置容器时不生效

### container

> _HTMLElement_ _\| string_

缩略图挂载的容器，无则挂载到 Graph 所在容器

### containerStyle

> _CSSStyleDeclaration_

缩略图的容器样式，传入外置容器时不生效

### delay

> _number_ **Default:** `128`

延迟更新时间(毫秒)，用于性能优化

### filter

> _(id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean_

过滤器，用于过滤不必显示的元素

### maskStyle

> _CSSStyleDeclaration_

遮罩的样式

### padding

> _number \| number[]_ **Default:** `10`

内边距

### position

> _[number, number] \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center'_ **Default:** `'right-bottom'`

缩略图相对于画布的位置

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

```js | ob { pin: false }
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
);
```

### renderer

> _IRenderer_

渲染器，默认使用 Canvas 渲染器

### shape

> _'key' \| ((id: string, elementType: 'node' \| 'edge' \| 'combo') => DisplayObject)_

**Default:** `'key'`

元素缩略图形的生成方法

- 'key' 使用元素的主图形作为缩略图形 - 也可以传入一个函数，接收元素的 id 和类型，返回一个图形

### size

> _[number, number]_ **Default:** `[240, 160]`

宽度和高度

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

```js | ob { pin: false }
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
    plugins: [{ type: 'minimap', key: 'minimap', size: [200, 120], position: 'right-bottom' }],
  },
  { width: 600, height: 300 },
);
```

## 实际案例

<Playground path="plugin/minimap/demo/basic.js" rid="minimap-basic"></Playground>
