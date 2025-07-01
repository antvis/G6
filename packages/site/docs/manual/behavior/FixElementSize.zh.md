---
title: 缩放画布时固定元素大小 FixElementSize
order: 9
---

## 概述

FixElementSize 是 G6 提供的一种内置交互，用于在视图缩放过程中，**保持节点中某些元素的尺寸不随缩放变化。** 提升缩放过程中的视觉一致性与可操作性。
通过监听视口变化，自动对标记为“固定尺寸”的元素进行缩放补偿，确保它们在不同缩放级别下保持相对恒定的显示尺寸。支持全局启用，也支持按需控制具体元素或节点的适配行为。

## 使用场景

这一交互主要用于：

- 需要固定视觉大小的图形元素或嵌入式组件（按钮、标签等）

## 在线体验

<embed src="@/common/api/behaviors/fix-element-size.md"></embed>

## 基本用法

在图配置中添加这一交互

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['fix-element-size'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'fix-element-size',
      enable: true, // 开启该交互
      state: 'selected', // 要固定大小的元素状态
      reset: true, // 元素重绘时还原样式
    },
  ],
});
```

## 配置项

| 配置项      | 说明                                                                                                              | 类型                                                              | 默认值                                                                                              | 必选 |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---- |
| type        | 交互类型名称                                                                                                      | string                                                            | `fix-element-size`                                                                                  | √    |
| enable      | 是否启用该交互，[示例](#enable)                                                                                   | boolean \| ((event: [Event](/api/event#事件对象属性)) => boolean) | true                                                                                                |      |
| reset       | 元素重绘时是否还原样式                                                                                            | boolean                                                           | `false`                                                                                             |      |
| state       | 指定要固定大小的元素状态                                                                                          | string                                                            | ""                                                                                                  |      |
| node        | 节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定，[示例](#node)   | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]             |                                                                                                     |      |
| nodeFilter  | 节点过滤器，用于过滤哪些节点在缩放过程中保持固定大小                                                              | (datum: [NodeData](/manual/data#节点数据nodedata)) => boolean     | `() => true`                                                                                        |      |
| edge        | 边配置项，用于定义哪些属性在视觉上保持固定大小。默认固定 lineWidth、labelFontSize 属性，用法同[node配置项](#node) | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]             | `[ shape: 'key', fields: ['lineWidth'] ,  shape: 'halo', fields: ['lineWidth'] ,  shape: 'label' ]` |      |
| edgeFilter  | 边过滤器，用于过滤哪些边在缩放过程中保持固定大小                                                                  | (datum: [EdgeData](/manual/data#边数据edgedata)) => boolean       | `() => true`                                                                                        |      |
| combo       | Combo 配置项，用于定义哪些属性在视觉上保持固定大小。默认整个 Combo 将被固定，用法同[node配置项](#node)            | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]             |                                                                                                     |      |
| comboFilter | Combo 过滤器，用于过滤哪些 Combo 在缩放过程中保持固定大小                                                         | (datum: [ComboData](/manual/data#组合数据combodata)) => boolean   | `() => true`                                                                                        |      |

### enable

是否启用固定元素大小交互。默认在缩小画布时启用

默认在缩小画布时启用，设置 `enable: (event) => event.data.scale < 1`；如果希望在放大画布时启用，设置 `enable: (event) => event.data.scale > 1`；如果希望在放大缩小画布时都启用，设置 `enable: true`

### node

节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定

**示例**

如果在缩放过程中希望固定节点主图形的 lineWidth，可以这样配置：

```ts
{
  node: [{ shape: 'key', fields: ['lineWidth'] }];
}
```

如果在缩放过程中想保持元素标签大小不变，可以这样配置：

```ts
{
  shape: 'label';
}
```

### FixShapeConfig

| 参数   | 描述                                                                                                 | 类型                                                   | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ | ---- |
| shape  | 指定要固定大小的图形，可以是图形的类名字，或者是一个函数，该函数接收构成元素的所有图形并返回目标图形 | string \| ((shapes: DisplayObject[]) => DisplayObject) | -      | ✓    |
| fields | 指定要固定大小的图形属性字段。如果未指定，则默认固定整个图形的大小                                   | string[]                                               | -      | ✘    |

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 }, states: ['selected'] },
    { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 }, states: ['selected'] },
    { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
    { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
    { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
    { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
    { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
    { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
    { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
    { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
    { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
    { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
    { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
    { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
    { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
    { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
    { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1', states: ['selected'] },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.label,
      size: (d) => d.size,
      lineWidth: 1,
    },
  },
  edge: { style: { labelText: (d) => d.label } },
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'fix-element-size',
      type: 'fix-element-size',
      enable: (event) => event.data.scale < 1,
      state: 'selected',
      reset: true,
    },
    { type: 'click-select', key: 'click-select', multiple: true },
  ],
  autoFit: 'center',
});

graph.render();
```
