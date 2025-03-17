---
title: Legend 图例
---

## 概述

图例（Legend）插件用于展示图中元素的分类信息，支持节点、边、组合的分类信息展示。通过图例，用户可以快速感知到图中相关元素的分类信息，也可以通过点击对应图例项来快速定位到元素，提高用户的浏览效率。

## 使用场景

这一插件主要用于：

- 通过图例快速对元素进行分类
- 通过图例快速高亮定位到对应元素

## 基本用法

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // 其他配置...
  plugins: [
    {
      type: 'legend', // 插件类型为 legend
      nodeField: 'cluster', // 用于节点分组的数组字段名称
      edgeField: 'cluster', // 用于边分组的数组字段名称
    },
  ],
});
```

## 配置项

| 属性              | 描述                                                 | 类型                                                                                        | 默认值       | 必选 |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------ | ---- |
| type              | 插件类型                                             | string                                                                                      | `legend`     | ✓    |
| key               | 插件唯一标识符，用于后续更新                         | string                                                                                      | -            |      |
| trigger           | 图例项触发对应项高亮的方式，[可选值](#trigger-属性)  | 'hover' \| 'click'                                                                          | "hover"      |      |
| position          | 图例在画布中的相对位置，[可选值](#cardinalplacement) | [CardinalPlacement](#cardinalplacement)                                                     | "bottom"     |      |
| container         | 图例挂载的容器，无则挂载到 Graph 所在容器            | HTMLElement \| string                                                                       | -            |      |
| className         | 图例画布类名，传入外置容器时不生效                   | string                                                                                      | -            |      |
| containerStyle    | 图例的容器样式，传入外置容器时不生效                 | [CSSStyleDeclaration](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration) | -            |      |
| nodeField         | 节点分类标识                                         | string \| (item: ElementDatum) => string                                                    | -            |      |
| edgeField         | 边分类标识                                           | string \| (item: ElementDatum) => string                                                    | -            |      |
| comboField        | 组合分类标识                                         | string \| (item: ElementDatum) => string                                                    | -            |      |
| orientation       | 图例项的布局方向，[可选值](#orientation-属性)        | "horizontal" \| "vertical"                                                                  | 'horizontal' |      |
| layout            | 布局方式，[可选值](#layout-属性)                     | 'flex' \| 'grid'                                                                            | "flex"       |      |
| showTitle         | 是否显示标题                                         | boolean                                                                                     | false        |
| titleText         | 标题内容                                             | string                                                                                      | ""           |
| x                 | 图例在画布中的相对的横向位置，优先级高于position     | number                                                                                      | -            |      |
| y                 | 图例在画布中的相对的纵向位置，优先级高于position     | number                                                                                      | -            |      |
| width             | 图例的宽度                                           | number                                                                                      | 240          |      |
| height            | 图例的高度                                           | number                                                                                      | 160          |      |
| itemSpacing       | 图例项的文本和对应标记之间的间距                     | number                                                                                      | 4            |      |
| rowPadding        | 图例中每行之间的间距                                 | number                                                                                      | 10           |      |
| colPadding        | 图例中每列之间的间距                                 | number                                                                                      | 10           |      |
| itemMarkerSize    | 图例项标记的大小                                     | number                                                                                      | 16           |      |
| itemLabelFontSize | 图例项文本的字体大小                                 | number                                                                                      | 16           |      |
| gridCol           | 图例项在宽度允许情况下的最大列数                     | number                                                                                      | -            |      |
| gridRow           | 图例项在高度允许情况下的最大行数                     | number                                                                                      | -            |      |

### trigger 属性

`trigger` 属性支持以下值：

- 'hover'：：鼠标移入图例项时触发
- 'click'：鼠标点击图例项时触发

### CardinalPlacement

`position` 属性支持以下值：

- `'top-left'`：左上角
- `'top-right'`：右上角
- `'bottom-left'`：左下角
- `'bottom-right'`：右下角
- `'left-top'`：左侧靠上
- `'left-bottom'`：左侧靠下
- `'right-top'`：右侧靠上
- `'right-bottom'`：右侧靠下

### orientation 属性

`orientation` 属性支持以下值：

- `horizontal`：水平方向
- `vertical`：垂直方向

### layout 属性

`layout` 属性支持以下值：

- `flex`：弹性布局
- `grid`：网格布局

## 代码示例

### 基础图例

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'legend', // 插件类型为 legend
      nodeField: 'cluster', // 用于节点分组的数组字段名称
      edgeField: 'cluster', // 用于边分组的数组字段名称
    },
  ],
});
```

### 自定义图例位置

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // 其他配置...
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      // 可以通过 position 快捷的来指定位置
      // position: "top-left",
      // 也可以通过x,y来更加灵活的控制图例的位置
      x: 20,
      y: 20,
    },
  ],
});
```

### 自定义图例项布局

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // 其他配置...
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      layout: 'flex',
      // 控制只显示一行
      gridRow: 1,
      // 控制一行显示10列，当列宽不足时会显示翻页按钮
      gridCol: 10,
    },
  ],
});
```

## 常见问题

### 1. 设置了 orientation 无效？

`orientation`主要控制布局的方向，具体展示**一行多列**还是**一列多行**，主要通过 `gridRow` 以及`gridCol`来控制，例如想要看起来像是竖向的图例项，则可以通过这样配置:

```js
   plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      layout: "flex",
      // 控制一行显示1列
      gridCol:1,
      // 控制显示最多20行
      gridRow: 20,
    },
  ],
```

这样就变成了只有一列的图例，符合视觉上的竖向排列。

### 2. 如何动态更新工具栏？

可以使用 `updatePlugin` 方法动态更新工具栏：

```js
const graph = new Graph({
  data,
  // 其他配置...
  plugins: [
    {
      type: 'legend',
      key: 'my-legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
    },
  ],
});

// 更新图例位置
graph.updatePlugin({
  key: 'my-legend',
  position: 'bottom-right',
});
```

## 实际案例

<Playground path="plugin/legend/demo/basic.js" rid="legend-basic"></Playground>
