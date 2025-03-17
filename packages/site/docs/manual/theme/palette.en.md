---
title: Palette
order: 3
---

## Overview

A palette refers to a set of predefined color collections that help users more conveniently select colors. In G6, a palette is a common option that allows users to configure the colors of elements such as nodes, edges, and links through the palette.

Palettes are divided into two types: `discrete palette` and `continuous palette`.

A discrete palette is an array of colors used to map discrete values within elements to different colors, such as the type of nodes, the relationship of edges, etc. Below is a simple example of a discrete palette:

```typescript
['#5B8FF9', '#61DDAA', '#F6BD16', '#F6903D', '#F08BB4'];
```

A continuous palette is an interpolator that takes a value between 0 and 1 and returns the corresponding color. It is used to map continuous values within elements to different colors, such as the degree of nodes, the weight of edges, etc. Below is a simple example of a continuous palette:

```typescript
(value: number) => `rgb(${value * 255}, 0, 0)`;
```

## Register Palette

You can directly use the built-in palettes, but if you want to use other palettes, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomPalette } from 'package-name/or/path-to-your-custom-palette';

register(ExtensionCategory.PALETTE, 'custom-palette', CustomPalette);
```

:::warning{title=note}

During the process of registering a palette, there is no distinction made between discrete and continuous palettes. It is necessary to ensure the consistency between the palette type and the data type when using the palette.
:::

### Built-in Palettes

Currently, G6 has 5 sets of commonly used discrete palettes that users can directly utilize:

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

## Configure Palette

Currently, the configuration of palettes is mainly focused on elements, taking nodes as an example:

### Discrete Palette

1. Default Configuration: By directly setting the value of `palette` to the name of the palette, each node will be assigned a different color by default

```typescript
{
  node: {
    palette: 'spectral', // spectral is the Palette Name
  }
}
```

<embed src="@/common/manual/core-concept/palette/default-config.md"></embed>

> When the number of elements exceeds the number of colors in the palette, the colors in the palette will be reused in a cyclic manner.

2. Standard Configuration: The attributes for configuring a discrete palette include: `type: 'group'`, `field`, `color`, `invert`.

Among them, `type: 'group'` explicitly specifies that the current palette type is a discrete palette; `field` designates the field for grouping in the element data; `color` is the name of the palette; `invert` indicates whether to invert the palette.

Given a set of example data:

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

In the data, `node-1` and `node-4` belong to category A, `node-2` and `node-5` belong to category B, `node-3` and `node-6` belong to category C.

Configure the color of the nodes in such a way that nodes of the same category have the same color:

```typescript
{
  node: {
    palette: {
      type: 'group', // Specify the palette type as a categorical palette.
      field: 'category', // Specify the grouping field in the data.
      color: 'tableau', // Use a Tableau-like palette.
    }
  }
}
```

<embed src="@/common/manual/core-concept/palette/standard-config.md"></embed>

### Continuous Palette

A continuous palette only supports standard configuration methods, with configuration properties including: `type: 'value'`, `field`, `color`, `invert`.

Given a set of example data:

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

Now, create an interpolator that maps the maximum value to red (`rgb(255, 0, 0)`) and the minimum value to black (`rgb(0, 0, 0)`):

```typescript
(value) => `rgb(${value * 255}, 0, 0)`;
```

Configure the following so that the color of the nodes is mapped to different colors based on the value of the `value` field in the data:

```typescript
{
  node: {
    palette: {
      type: 'value', // Specify the palette type as a continuous palette
      field: 'value', // Specify the numerical field in the data
      color: (value) => `rgb(${value * 255}, 0, 0)`, // Use an interpolator
    }
  }
}
```

<embed src="@/common/manual/core-concept/palette/continuous-palette.md"></embed>

:::warning{title=note}

The built-in continuous palette does not support specifying a value range. If there is a need for more complex color mapping, it can be customized within the style mapping.
:::

## Custom Palette

If the built-in palette does not meet your requirements, you can customize the palette. For details, please refer to [Custom Palette](/en/manual/custom-extension/palette).

## Priority

The palette generates styles based on the type of element. For nodes and combos, the color is mapped to the `fill` attribute; for edges, the color is mapped to the `stroke` attribute.

If both a palette and a style mapping are configured, the style mapping will override the palette colors. In the following example, the color of the nodes is always red:

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
