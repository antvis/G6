---
title: Palette - 色板
order: 7
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

:::warning{title=注意}
在注册色板过程中并不会区分离散色板和连续色板，使用色板过程中需要自行保证色板类型和数据类型的一致性。
:::

### 内置色板

目前 G6 内置了 5 套常用的离散色板，用户可以直接使用：

- spectral

<div style="display: flex; width: 600px; height: 20px;"><style>div{flex-grow:1}</style><div style="background: rgb(158, 1, 66);"></div><div style="background: rgb(213, 62, 79);"></div><div style="background: rgb(244, 109, 67);"></div><div style="background: rgb(253, 174, 97);"></div><div style="background: rgb(254, 224, 139);"></div><div style="background: rgb(255, 255, 191);"></div><div style="background: rgb(230, 245, 152);"></div><div style="background: rgb(171, 221, 164);"></div><div style="background: rgb(102, 194, 165);"></div><div style="background: rgb(50, 136, 189);"></div><div style="background: rgb(94, 79, 162);"></div></div>

- tableau

<div style="display: flex; width: 600px; height: 20px;"><style>div{flex-grow:1}</style><div style="background: rgb(78, 121, 167);"></div><div style="background: rgb(242, 142, 44);"></div><div style="background: rgb(225, 87, 89);"></div><div style="background: rgb(118, 183, 178);"></div><div style="background: rgb(89, 161, 79);"></div><div style="background: rgb(237, 201, 73);"></div><div style="background: rgb(175, 122, 161);"></div><div style="background: rgb(255, 157, 167);"></div><div style="background: rgb(156, 117, 95);"></div><div style="background: rgb(186, 176, 171);"></div></div>

- oranges

<div style="display: flex; width: 600px; height: 20px;"><style>div{flex-grow:1}</style><div style="background: rgb(255, 245, 235);"></div><div style="background: rgb(254, 230, 206);"></div><div style="background: rgb(253, 208, 162);"></div><div style="background: rgb(253, 174, 107);"></div><div style="background: rgb(253, 141, 60);"></div><div style="background: rgb(241, 105, 19);"></div><div style="background: rgb(217, 72, 1);"></div><div style="background: rgb(166, 54, 3);"></div><div style="background: rgb(127, 39, 4);"></div></div>

- greens

<div style="display: flex; width: 600px; height: 20px;"><style>div{flex-grow:1}</style><div style="background: rgb(247, 252, 245);"></div><div style="background: rgb(229, 245, 224);"></div><div style="background: rgb(199, 233, 192);"></div><div style="background: rgb(161, 217, 155);"></div><div style="background: rgb(116, 196, 118);"></div><div style="background: rgb(65, 171, 93);"></div><div style="background: rgb(35, 139, 69);"></div><div style="background: rgb(0, 109, 44);"></div><div style="background: rgb(0, 68, 27);"></div></div>

- blues

<div style="display: flex; width: 600px; height: 20px;"><style>div{flex-grow:1}</style><div style="background: rgb(247, 251, 255);"></div><div style="background: rgb(222, 235, 247);"></div><div style="background: rgb(198, 219, 239);"></div><div style="background: rgb(158, 202, 225);"></div><div style="background: rgb(107, 174, 214);"></div><div style="background: rgb(66, 146, 198);"></div><div style="background: rgb(33, 113, 181);"></div><div style="background: rgb(8, 81, 156);"></div><div style="background: rgb(8, 48, 107);"></div></div>

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

<embed src="@/docs/manual/core-concept-common/palette/default-config.md"></embed>

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

<embed src="@/docs/manual/core-concept-common/palette/standard-config.md"></embed>

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

<embed src="@/docs/manual/core-concept-common/palette/continuous-palette.md"></embed>

:::warning{title=注意}
内置连续色板不支持指定值域范围，如果有更复杂的颜色映射需求，可以在样式映射中自定义
:::

## 自定义色板

如果内置色板无法满足需求，可以自定义色板，具体请参考[自定义色板](/manual/custom-extension/palette)。

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
