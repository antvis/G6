---
title: "色板"
description: "色板"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/theme/palette/"
version: "5.1.1"
---

## 概述

色板(Palette)是指一组预定义的颜色集合，用于帮助用户更方便的选择颜色。在 G6 中，色板是一种常见的配置项，用户可以通过色板来配置节点、边、连线等元素的颜色。

色板分为`离散色板`和`连续色板`两种类型。

离散色板是一组颜色数组，用于将元素中的离散值映射到不同的颜色上，例如节点的类型、边的关系等。下面是一个简单的离散色板示例：

```typescript
['#5B8FF9', '#61DDAA', '#F6BD16', '#F6903D', '#F08BB4'];
```

连续色板是一个插值器，输入 0~1 的值，返回对应的颜色，用于将元素中的连续值映射到不同的颜色上，例如节点的度数、边的权重等。下面是一个简单的连续色板示例：

```typescript
(value: number) => `rgb(${value * 255}, 0, 0)`;
```

## 注册色板

你可以直接使用内置色板，如果想使用其他色板，需要先进行注册：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomPalette } from 'package-name/or/path-to-your-custom-palette';

register(ExtensionCategory.PALETTE, 'custom-palette', CustomPalette);
```

:::warning\{title=注意\}
在注册色板过程中并不会区分离散色板和连续色板，使用色板过程中需要自行保证色板类型和数据类型的一致性。
:::

### 内置色板

目前 G6 内置了 5 套常用的离散色板，用户可以直接使用：

- spectral



- tableau



- oranges



- greens



- blues



## 配置色板

目前开放色板配置的地方主要以元素为主，以节点为例：

### 离散色板

1. 默认配置，直接配置 `palette` 的值为色板名，会默认为每个节点分配不同的颜色

```typescript
{
  node: {
    palette: 'spectral', // spectral 为色板名
  }
}
```



```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 100,
  data: {
    nodes: new Array(30).fill(0).map((_, i) => ({ id: `node-${i}` })),
  },
  layout: { type: 'grid', cols: 10, rows: 3 },
  node: {
    palette: 'spectral',
  },
});

graph.render();
```



> 当元素数量超过色板颜色数量时，会循环使用色板中的颜色

2. 标准配置，离散色板配置属性包括：`type: 'group'`，`field`，`color`，`invert`

其中 `type: 'group'` 显式指定了当前色板类型为离散色板；`field` 指定元素数据中的分组字段；`color` 为色板名；`invert` 为是否反转色板。

给定一组示例数据：

```json
{
  "nodes": [
    { "id": "node-1", "data": { "category": "A" } },
    { "id": "node-2", "data": { "category": "B" } },
    { "id": "node-3", "data": { "category": "C" } },
    { "id": "node-4", "data": { "category": "A" } },
    { "id": "node-5", "data": { "category": "B" } },
    { "id": "node-6", "data": { "category": "C" } }
  ]
}
```

数据中 `node-1`，`node-4` 属于 A 类别，`node-2`，`node-5` 属于 B 类别，`node-3`，`node-6` 属于 C 类别。

通过以下方式配置节点的颜色，使得同类别的节点颜色相同：

```typescript
{
  node: {
    palette: {
      type: 'group', // 指定色板类型为分类色板
      field: 'category', // 指定数据中的分组字段
      color: 'tableau', // 使用 tableau 色板
    }
  }
}
```



```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 50,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C'][i % 3] } })),
  },
  layout: { type: 'grid', cols: 6 },
  node: {
    palette: {
      type: 'group',
      field: 'category',
      color: 'tableau',
    },
  },
});

graph.render();
```



### 连续色板

连续色板只支持标准方式配置，配置属性包括：`type: 'value'`，`field`，`color`，`invert`。

给定一组示例数据：

```json
{
  "nodes": [
    { "id": "node-1", "data": { "value": 0 } },
    { "id": "node-2", "data": { "value": 20 } },
    { "id": "node-3", "data": { "value": 40 } },
    { "id": "node-4", "data": { "value": 60 } },
    { "id": "node-5", "data": { "value": 80 } },
    { "id": "node-6", "data": { "value": 100 } }
  ]
}
```

现在创建一个插值器，将最大值映射为红色(`rgb(255, 0, 0)`)，最小值映射为黑色(`rgb(0, 0, 0)`)：

```typescript
(value) => `rgb(${value * 255}, 0, 0)`;
```

通过以下配置使得节点的颜色根据数据中的 `value` 字段的值映射到不同的颜色：

```typescript
{
  node: {
    palette: {
      type: 'value', // 指定色板类型为连续色板
      field: 'value', // 指定数据中的数值字段
      color: (value) => `rgb(${value * 255}, 0, 0)`, // 使用插值器
    }
  }
}
```



```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 50,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { value: (i + 1) * 20 } })),
  },
  layout: { type: 'grid', cols: 6 },
  node: {
    palette: {
      type: 'value',
      field: 'value',
      color: (value) => `rgb(${value * 255}, 0, 0)`,
    },
  },
});

graph.render();
```



:::warning\{title=注意\}
内置连续色板不支持指定值域范围，如果有更复杂的颜色映射需求，可以在样式映射中自定义
:::

## 自定义色板

如果内置色板无法满足需求，可以自定义色板，具体请参考[自定义色板](/zh/manual/theme/custom-palette/)。

## 优先级

色板会基于元素类型生成样式，对于节点和组合，会将颜色映射到 `fill` 属性；对于边，会将颜色映射到 `stroke` 属性。

如果同时配置了色板和样式映射，样式映射会覆盖色板颜色。下面的例子中，节点的颜色始终为红色：

```typescript
{
  node: {
    style: {
      fill: 'red',
    },
    palette: 'spectral',
  }
}
```
