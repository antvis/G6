---
title: 组合配置项
---

本文介绍组合属性配置，配置位置如下：

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  combo: {
    type: 'circle',
    style: {},
    state: {},
    palette: {},
    animation: {},
  },
});
```

## ComboOptions

| 属性      | 描述                                         | 类型                    | 默认值   | 必选 |
| --------- | -------------------------------------------- | ----------------------- | -------- | ---- |
| type      | 组合类型，内置组合类型名称或自定义组合的名称 | [Type](#type)           | `circle` |      |
| style     | 组合样式，包括颜色、大小等                   | [Style](#style)         | -        |      |
| state     | 定义组合在不同状态下的样式                   | [State](#state)         | -        |      |
| palette   | 定义组合的色板，用于根据不同数据映射颜色     | [Palette](#palette)     | -        |      |
| animation | 定义组合的动画效果                           | [Animation](#animation) | -        |      |

## Type

指定组合类型，内置组合类型名称或自定义组合的名称。默认为 `circle`（圆形组合）。

| 支持的值 | 描述       | DEMO                                                |
| -------- | ---------- | --------------------------------------------------- |
| `circle` | 圆形 Combo | [DEMO](/manual/element/combo/build-in/circle-combo) |
| `rect`   | 矩形 Combo | [DEMO](/manual/element/combo/build-in/rect-combo)   |

## Style

在此处定义组合的样式，包括颜色、大小等。

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：组合的主图形，表示组合的主要形状；
- `halo` ：主图形周围展示的光晕效果的图形；
- `label` ：文本标签，通常用于展示组合的名称或描述；

以下样式配置将按原子图形依次说明：

### 展开时样式 key

| 属性           | 描述                                                                                                                                               | 类型                                                                            | 默认值 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------ |
| x              | x 坐标                                                                                                                                             | number                                                                          | 0      |
| y              | y 坐标                                                                                                                                             | number                                                                          | 0      |
| z              | z 坐标                                                                                                                                             | number                                                                          | 0      |
| padding        | 组合的内边距，只在展开状态下生效。展开时组合的大小由自子元素集合的的包围盒以及 padding 共同决定                                                    | number &#124; number[]                                                          | 0      |
| fill           | 填充色                                                                                                                                             | string                                                                          | `#fff` |
| stroke         | 描边色                                                                                                                                             | string                                                                          | `#000` |
| lineWidth      | 描边宽度                                                                                                                                           | number                                                                          | 1      |
| `{StyleProps}` | 更多图形配置，参考 [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) 配置项。例如 fillOpacity 代表主图形填充色透明度 | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -      |

### 收起时样式 collapsed

| 属性                    | 描述                                                                                                                                               | 类型                                                                            | 默认值 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------ |
| collapsed               | 当前组合是否展开                                                                                                                                   | boolean                                                                         | false  |
| collapsedSize           | 组合收起后的默认大小                                                                                                                               | number &#124; [number, number] &#124; [number, number, number]                  | 32     |
| collapseFill            | 填充色                                                                                                                                             | string                                                                          | `#fff` |
| collapsedStroke         | 描边色                                                                                                                                             | string                                                                          | `#000` |
| collapsedLineWidth      | 描边宽度                                                                                                                                           | number                                                                          | 1      |
| `collapsed{StyleProps}` | 更多图形配置，参考 [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) 配置项。例如 fillOpacity 代表主图形填充色透明度 | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -      |

### 收起时标记样式 collapsedMarker

| 属性                          | 描述                                                                                                                                                                                                                                                          | 类型                                                                                                                               | 默认值   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| collapsedMarker               | 组合收起时是否显示标记                                                                                                                                                                                                                                        | boolean                                                                                                                            | false    |
| collapsedMarkerType           | 组合收起时显示的标记类型 <br> - `'child-count'`: 子元素数量（包括 Node 和 Combo）<br>- `'descendant-count'`: 后代元素数量（包括 Node 和 Combo）<br>- `'node-count'`: 后代元素数量（只包括 Node）<br> - `(children: NodeLikeData[]) => string`: 自定义处理逻辑 | `child-count` &#124; `descendant-count` &#124; `node-count` &#124; ((children: NodeData &#124; ComboData[]) => string)             |          |
| collapsedMarkerSrc            | 图片来源。其优先级高于 collapsedMarkerText                                                                                                                                                                                                                    | string                                                                                                                             | -        |
| collapsedMarkerWidth          | 图片宽度                                                                                                                                                                                                                                                      | number                                                                                                                             | -        |
| collapsedMarkerHeight         | 图标高度                                                                                                                                                                                                                                                      | number                                                                                                                             | -        |
| collapsedMarkerRadius         | 图标圆角半径                                                                                                                                                                                                                                                  | number                                                                                                                             | 0        |
| collapsedMarkerText           | 图标文字                                                                                                                                                                                                                                                      | string                                                                                                                             | -        |
| collapsedMarkerFill           | 图标文字颜色                                                                                                                                                                                                                                                  | string                                                                                                                             | -        |
| collapsedMarkerFontSize       | 图标字体大小                                                                                                                                                                                                                                                  | number                                                                                                                             | 16       |
| collapsedMarkerFontWeight     | 图标字体粗细                                                                                                                                                                                                                                                  | number &#124; string                                                                                                               | `normal` |
| `collapsedMarker{StyleProps}` | 更多图标样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)、[ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) 配置项。例如 collapsedMarkerFontSize 代表文字图标的字体大小                                               | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) | -        |

### 标签样式 label

| 属性                          | 描述                                                                                                                                                                                                                                         | 类型                                                                                                                                                                                                                               | 默认值   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label                         | 是否显示组合标签                                                                                                                                                                                                                             | boolean                                                                                                                                                                                                                            | true     |
| labelText                     | 标签文字内容                                                                                                                                                                                                                                 | string                                                                                                                                                                                                                             | -        |
| labelFill                     | 标签文字颜色                                                                                                                                                                                                                                 | string                                                                                                                                                                                                                             | -        |
| labelFontSize                 | 标签字体大小                                                                                                                                                                                                                                 | number                                                                                                                                                                                                                             | 12       |
| labelFontWeight               | 标签字体粗细                                                                                                                                                                                                                                 | number &#124; string                                                                                                                                                                                                               | `normal` |
| labelPlacement                | 标签相对于组合主图形的位置                                                                                                                                                                                                                   | `left` &#124; `right` &#124; `top` &#124; `bottom` &#124; `left-top` &#124; `left-bottom` &#124; `right-top` &#124; `right-bottom` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; `bottom-right` &#124; `center` | `bottom` |
| labelOffsetX                  | 标签在 x 轴方向上的偏移量                                                                                                                                                                                                                    | number                                                                                                                                                                                                                             | 0        |
| labelOffsetY                  | 标签在 y 轴方向上的偏移量                                                                                                                                                                                                                    | number                                                                                                                                                                                                                             | 0        |
| labelWordWrap                 | 是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行                                                                                                                                                                   | boolean                                                                                                                                                                                                                            | false    |
| labelMaxWidth                 | 标签最大宽度。开启自动折行后，超出该宽度则换行<br> - string: 表示以相对于组合宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过组合宽度的一半 <br> - number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素 | number &#124; string                                                                                                                                                                                                               | `200%`   |
| labelMaxLines                 | 最大行数                                                                                                                                                                                                                                     | number                                                                                                                                                                                                                             | 1        |
| labelPadding                  | 标签内边距                                                                                                                                                                                                                                   | number &#124; number[]                                                                                                                                                                                                             | 0        |
| `label{StyleProps}`           | 更多标签样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值。例如 labelFontSize 代表标签文字大小                                                                                                              | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                                                                                                                                                                       | -        |
| labelBackground               | 是否显示背景                                                                                                                                                                                                                                 | boolean                                                                                                                                                                                                                            | false    |
| labelBackgroundFill           | 标签背景填充色                                                                                                                                                                                                                               | string                                                                                                                                                                                                                             | -        |
| labelBackgroundRadius         | 标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充                                                                                                                                   | number &#124; number[]                                                                                                                                                                                                             | 0        |
| `labelBackground{StyleProps}` | 更多标签背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 labelBackgroundFillOpacity 代表标签背景透明度                                                                                           | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)                                                                                                                                                                       | -        |

### 光晕样式 halo

| 属性               | 描述                                                                                                                                           | 类型                                                                  | 默认值               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------- |
| halo               | 是否显示组合光晕                                                                                                                               | boolean                                                               | false                |
| haloFill           | 光晕填充色                                                                                                                                     | string                                                                | 与主图形的填充色一致 |
| haloStroke         | 光晕描边色                                                                                                                                     | string                                                                | 与主图形的填充色一致 |
| haloLineWidth      | 光晕描边宽度                                                                                                                                   | number                                                                | 3                    |
| `halo{StyleProps}` | 更多光晕样式配置，参考 [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) 配置项。例如 haloFillOpacity 代表光晕填充色透明度 | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                    |

## State

在一些交互行为中，比如点击选中一个组合或鼠标悬停激活一个边，仅仅是在该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的图元素样式，以响应该图元素状态的变化。

G6 提供了几种内置的状态，包括选中（selected）、高亮（highlight）、激活（active）、不活跃（inactive）和禁用（disabled）。此外，它还支持自定义状态，以满足更特定的需求。对于每个状态，开发者可以定义一套样式规则，这些规则会覆盖元素的默认样式。

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Iv_dS5XR2TcAAAAAAAAAAAAADmJ7AQ/original" />

数据结构如下：

```typescript
type ComboState = {
  [state: string]: ComboStyle;
};
```

例如，当组合处于 `focus` 状态时，可以为其添加一个宽度为 3 且颜色为橙色的描边。

```json
{
  "combo": {
    "state": {
      "focus": {
        "lineWidth": 3,
        "stroke": "orange",
        "fill": "orange",
        "fillOpacity": 0.2
      }
    }
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [{ id: 'combo1', states: ['focus'] }],
    },
    combo: {
      state: {
        focus: {
          lineWidth: 3,
          stroke: 'orange',
          fill: 'orange',
          fillOpacity: 0.2,
        },
      },
    },
  },
  { width: 200, height: 100 },
);
```

## Animation

定义组合的动画效果，支持下列两种配置方式：

1. 关闭组合全部动画

```json
{
  "combo": {
    "animation": false
  }
}
```

2. 配置阶段动画

阶段动画是指组合在进入画布、更新、离开画布时的动画效果。目前支持的阶段包括：

- `enter`: 组合进入画布时的动画
- `update`: 组合更新时的动画
- `exit`: 组合离开画布时的动画
- `show`: 组合从隐藏状态显示时的动画
- `hide`: 组合隐藏时的动画
- `collapse`: 组合收起时的动画
- `expand`: 组合展开时的动画

你可以参考 [动画范式](/manual/animation/animation#动画范式) 使用动画语法来配置组合，如：

```json
{
  "combo": {
    "animation": {
      "update": [
        {
          "fields": ["x", "y"], // 更新时只对 x 和 y 属性进行动画
          "duration": 1000, // 动画持续时间
          "easing": "linear" // 缓动函数
        }
      ],
  }
}
```

也可以使用内置的动画效果：

```json
{
  "combo": {
    "animation": {
      "enter": "fade", // 使用渐变动画
      "update": "translate", // 使用平移动画
      "exit": "fade" // 使用渐变动画
    }
  }
}
```

你可以传入 false 来关闭特定阶段的动画：

```json
{
  "combo": {
    "animation": {
      "enter": false // 关闭组合入场动画
    }
  }
}
```

## Palette

定义组合的色板，即预定义组合颜色池，并根据规则进行分配，将颜色映射到 `fill` 属性。

> 有关色板的定义，请参考 [色板](/manual/theme/palette)。

| 属性   | 描述                                                                | 类型                              | 默认值  |
| ------ | ------------------------------------------------------------------- | --------------------------------- | ------- |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` &#124; `value`            | `group` |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string &#124; ((datum) => string) | `id`    |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string &#124; string[]            | -       |
| invert | 是否反转色板                                                        | boolean                           | false   |

如将一组数据按 `category` 字段分配组合颜色，使得同类别的组合颜色相同：

```json
{
  "combo": {
    "palette": {
      "type": "group",
      "field": "category",
      "color": ["#1783FF", "#F08F56", "#D580FF", "#00C9C9", "#7863FF"]
    }
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      combos: new Array(8)
        .fill(0)
        .map((_, i) => ({ id: `combo-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
    },
    layout: { type: 'grid', cols: 8 },
    combo: {
      style: { fillOpacity: 0.4 },
      palette: {
        type: 'group',
        field: 'category',
        color: ['#1783FF', '#F08F56', '#D580FF', '#00C9C9', '#7863FF'],
      },
    },
  },
  { width: 600, height: 100 },
);
```

也可以使用默认配置：

```json
{
  "combo": {
    "palette": "tableau" // tableau 为色板名，默认根据 ID 分配颜色
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      combos: new Array(8)
        .fill(0)
        .map((_, i) => ({ id: `combo-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
    },
    layout: { type: 'grid', cols: 8 },
    combo: {
      style: { fillOpacity: 0.4 },
      palette: 'tableau',
    },
  },
  { width: 600, height: 100 },
);
```
