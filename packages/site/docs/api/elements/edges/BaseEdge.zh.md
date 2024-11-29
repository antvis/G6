---
title: 边配置项
order: 0
---

本文介绍边属性配置，配置位置如下：

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line',
    style: {},
    state: {},
    palette: {},
    animation: {},
  },
});
```

| 属性      | 描述                                   | 类型                                     | 默认值 |
| --------- | -------------------------------------- | ---------------------------------------- | ------ |
| type      | 边类型，内置边类型名称或自定义边的名称 | string                                   | `line` |
| style     | 边样式，包括颜色、大小等               | [Style](#样式属性-style)                 | -      |
| state     | 定义边在不同状态下的样式               | Record<string, [Style](#样式属性-style)> | -      |
| palette   | 定义边的色板，用于根据不同数据映射颜色 | [Palette](#色板属性-palette)             | -      |
| animation | 定义边的动画效果                       | [Animation](#动画属性-animation)         | -      |

## 类型属性 type

指定边类型，内置边类型名称或自定义边的名称。默认为 `line`（直线边）。

更多内置支持边类型，可查看[边注册表](/manual/getting-started/extensions#边)。

## 样式属性 style

定义边的样式，包括颜色、大小等。

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

> 了解边的构成，请阅读 [核心概念 - 元素 - 边](/manual/core-concept/element#边)。

以下样式配置将按原子图形依次说明：

### 主图形样式 key

| 属性            | 描述                                                                                     | 类型                                                         | 默认值 |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| stroke          | 描边色                                                                                   | string                                                       | `#000` |
| lineWidth       | 描边宽度                                                                                 | number                                                       | 1      |
| lineDash        | 线条虚线的偏移量                                                                         | number                                                       | 0      |
| sourcePort      | 边起始连接的连接桩                                                                       | string                                                       | -      |
| targetPort      | 边终点连接的连接桩                                                                       | string                                                       | -      |
| isBillboard     | 3D 场景中生效，始终朝向屏幕，因此线宽不受透视投影影像                                    | boolean                                                      | true   |
| `${StyleProps}` | 更多样式配置，请参考 [PathStyleProps](https://g.antv.antgroup.com/api/basic/path) 配置值 | [PathStyleProps](https://g.antv.antgroup.com/api/basic/path) | -      |

### 标签样式 label

| 属性                           | 描述                                                                                                                                                                                                                                     | 类型                                                         | 默认值   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| label                          | 是否显示边标签                                                                                                                                                                                                                           | boolean                                                      | true     |
| labelAutoRotate                | 是否自动旋转，保持与边的方向一致                                                                                                                                                                                                         | boolean                                                      | true     |
| labelText                      | 标签文字内容                                                                                                                                                                                                                             | string                                                       | -        |
| labelFill                      | 标签文字颜色                                                                                                                                                                                                                             | string                                                       | -        |
| labelFontSize                  | 标签字体大小                                                                                                                                                                                                                             | number                                                       | 12       |
| labelFontWeight                | 标签字体粗细                                                                                                                                                                                                                             | number &#124; string                                         | `normal` |
| labelPlacement                 | 标签相对于边的位置。取值范围为 `start`、`center`、`end` 或特定比率（数字 0-1）                                                                                                                                                           | `start` &#124; `center` &#124; `end` &#124; number           | `center` |
| labelOffsetX                   | 标签在 x 轴方向上的偏移量                                                                                                                                                                                                                | number                                                       | 0        |
| labelOffsetY                   | 标签在 y 轴方向上的偏移量                                                                                                                                                                                                                | number                                                       | 0        |
| labelWordWrap                  | 是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行                                                                                                                                                               | boolean                                                      | false    |
| labelMaxWidth                  | 标签最大宽度。开启自动折行后，超出该宽度则换行<br> - string: 表示以相对于边宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过边宽度的一半 <br> - number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素 | number &#124; string                                         | `200%`   |
| labelMaxLines                  | 最大行数                                                                                                                                                                                                                                 | number                                                       | 1        |
| labelPadding                   | 标签内边距                                                                                                                                                                                                                               | number &#124; number[]                                       | 0        |
| `label${StyleProps}`           | 更多标签样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值。例如 labelFontSize 代表标签文字大小                                                                                                          | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) | -        |
| labelBackground                | 是否显示背景                                                                                                                                                                                                                             | boolean                                                      | false    |
| labelBackgroundFill            | 标签背景填充色                                                                                                                                                                                                                           | string                                                       | -        |
| labelBackgroundRadius          | 标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充                                                                                                                               | number &#124; number[]                                       | 0        |
| `labelBackground${StyleProps}` | 更多标签背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 labelBackgroundFillOpacity 代表标签背景透明度                                                                                       | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) | -        |

### 光晕样式 halo

| 属性                | 描述                                                                                                                                  | 类型                                                         | 默认值               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------- |
| halo                | 是否显示边光晕                                                                                                                        | boolean                                                      | false                |
| haloStroke          | 光晕描边色                                                                                                                            | string                                                       | 与主图形的填充色一致 |
| haloLineWidth       | 光晕描边宽度                                                                                                                          | number                                                       | 3                    |
| `halo${StyleProps}` | 更多光晕样式配置，参考 [PathStyleProps](https://g.antv.antgroup.com/api/basic/path) 配置项。例如 haloStrokeOpacity 代表光晕描边透明度 | [PathStyleProps](https://g.antv.antgroup.com/api/basic/path) | -                    |

### 徽标样式 badge

| 属性                           | 描述                                                                                                                                                                                                                      | 类型                                                         | 默认值   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| badge                          | 是否显示边徽标                                                                                                                                                                                                            | boolean                                                      | true     |
| badgePlacement                 | 徽标相对于边主图形的位置。若不指定，默认从右上角顺时针依次排放                                                                                                                                                            | `prefix` &#124; `suffix`                                     | `prefix` |
| badgeOffsetX                   | 徽标在 x 轴方向上的偏移量                                                                                                                                                                                                 | number                                                       | 0        |
| badgeOffsetY                   | 徽标在 y 轴方向上的偏移量                                                                                                                                                                                                 | number                                                       | 0        |
| badgeText                      | 文字内容                                                                                                                                                                                                                  | string                                                       | -        |
| badgeFill                      | 文字颜色                                                                                                                                                                                                                  | string                                                       | -        |
| badgeFontSize                  | 字体大小                                                                                                                                                                                                                  | number                                                       | 8        |
| badgeFontWeight                | 字体粗细                                                                                                                                                                                                                  | number &#124; string                                         | `normal` |
| badgePadding                   | 内边距                                                                                                                                                                                                                    | number &#124; number[]                                       | 0        |
| `badge${StyleProps}`           | 更多徽标文字样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值                                                                                                                            | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) | -        |
| badgeBackground                | 是否显示背景                                                                                                                                                                                                              | boolean                                                      | true     |
| badgeBackgroundFill            | 背景填充色。若不指定，优先考虑 badgePalette 按顺序分配                                                                                                                                                                    | string                                                       | -        |
| badgeBackgroundRadius          | 背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，会补足缺省的分量 <br> - string: 与 [CSS padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 属性类似，使用空格分隔 | number &#124; number[] &#124; string                         | 0        |
| `badgeBackground${StyleProps}` | 更多徽标背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 badgeBackgroundFillOpacity 代表标签背景透明度                                                                        | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) |          |

### 起始箭头样式 startArrow

| 属性             | 描述                 | 类型                                                                                                                                                               | 默认值     |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| startArrow       | 是否显示边的起始箭头 | boolean                                                                                                                                                            | false      |
| startArrowOffset | 起始箭头的偏移量     | number                                                                                                                                                             | 0          |
| startArrowSize   | 箭头大小             | number &#124; [number, number]                                                                                                                                     | 8          |
| startArrowType   | 箭头类型             | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `triangle` |

### 终点箭头样式 endArrow

| 属性           | 描述                 | 类型                                                                                                                                                               | 默认值     |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| endArrow       | 是否显示边的结束箭头 | boolean                                                                                                                                                            | false      |
| endArrowOffset | 结束箭头的偏移量     | number                                                                                                                                                             | 0          |
| endArrowSize   | 箭头大小             | number &#124; [number, number]                                                                                                                                     | 8          |
| endArrowType   | 箭头类型             | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `triangle` |

### 自环边样式 loop

| 属性                | 描述                                                                                     | 类型                                                                                                                                                                                                               | 默认值 |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| loop                | 是否启用自环边                                                                           | boolean                                                                                                                                                                                                            | true   |
| loopClockwise       | 指定是否顺时针绘制环                                                                     | boolean                                                                                                                                                                                                            | true   |
| loopDist            | 从节点 keyShape 边缘到自环顶部的距离，用于指定自环的曲率，默认为宽度或高度的最大值       | number                                                                                                                                                                                                             |        |
| loopPlacement       | 边的位置                                                                                 | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' &#124; 'left-top' &#124; 'left-bottom' &#124; 'right-top' &#124; 'right-bottom' &#124; 'top-left' &#124; 'top-right' &#124; 'bottom-left' &#124; 'bottom-right' | 'top'  |
| `loop${StyleProps}` | 更多样式配置，请参考 [PathStyleProps](https://g.antv.antgroup.com/api/basic/path) 配置值 | [PathStyleProps](https://g.antv.antgroup.com/api/basic/path)                                                                                                                                                       | -      |

## 状态样式属性 state

在一些交互行为中，比如点击选中一个边或鼠标悬停激活一个边，仅仅是在该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的图元素样式，以响应该图元素状态的变化。

G6 提供了几种内置的状态，包括选中（selected）、高亮（highlight）、激活（active）、不活跃（inactive）和禁用（disabled）。此外，它还支持自定义状态，以满足更特定的需求。对于每个状态，开发者可以定义一套样式规则，这些规则会覆盖元素的默认样式。

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ebBlTpKu2WUAAAAAAAAAAAAADmJ7AQ/original" />

例如，当边处于 `focus` 状态时，可以为其添加一个宽度为 6 且颜色为黄色的光晕。

```json
{
  "edge": {
    "state": {
      "focus": {
        "halo": true,
        "haloLineWidth": 6,
        "haloStroke": "yellow"
      }
    }
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }],
      edges: [{ source: 'node1', target: 'node2', states: ['focus'] }],
    },
    edge: {
      state: {
        focus: {
          halo: true,
          haloLineWidth: 6,
          haloStroke: 'yellow',
        },
      },
    },
    layout: {
      type: 'grid',
      cols: 2,
    },
  },
  { width: 300, height: 100 },
);
```

## 动画属性 animation

定义边的动画效果，支持下列两种配置方式：

1. 关闭边全部动画

```json
{
  "edge": {
    "animation": false
  }
}
```

2. 配置阶段动画

阶段动画是指边在进入画布、更新、离开画布时的动画效果。目前支持的阶段包括：

- `enter`: 边进入画布时的动画
- `update`: 边更新时的动画
- `exit`: 边离开画布时的动画
- `show`: 边从隐藏状态显示时的动画
- `hide`: 边隐藏时的动画
- `collapse`: 边收起时的动画
- `expand`: 边展开时的动画

你可以参考 [动画范式](/manual/core-concept/animation#动画范式) 使用动画语法来配置边，如：

```json
{
  "node": {
    "animation": {
      "update": [
        {
          "fields": ["stroke"], // 更新时只对 stroke 属性进行动画
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
  "node": {
    "animation": {
      "enter": "fade", // 使用渐变动画
      "exit": "fade" // 使用渐变动画
    }
  }
}
```

你可以传入 false 来关闭特定阶段的动画：

```json
{
  "node": {
    "animation": {
      "enter": false // 关闭边入场动画
    }
  }
}
```

## 色板属性 palette

定义边的色板，即预定义颜色池，并根据规则进行分配，将颜色映射到 `stroke` 属性。

> 有关色板的定义，请参考 [核心概念 - 色板](/manual/core-concept/palette)。

| 属性   | 描述                                                                | 类型                              | 默认值  |
| ------ | ------------------------------------------------------------------- | --------------------------------- | ------- |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` &#124; `value`            | `group` |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string &#124; ((datum) => string) | `id`    |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string &#124; string[]            | -       |
| invert | 是否反转色板                                                        | boolean                           | false   |

如将一组数据按 `direction` 字段分配节点颜色，使得同类别的节点颜色相同：

```json
{
  "edge": {
    "palette": {
      "type": "group",
      "field": "direction",
      "color": ["#F08F56", "#00C9C9"]
    }
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i + 1}` })),
      edges: [
        { source: 'node-1', target: 'node-2', data: { direction: 'out' } },
        { source: 'node-1', target: 'node-3', data: { direction: 'out' } },
        { source: 'node-1', target: 'node-4', data: { direction: 'out' } },
        { source: 'node-5', target: 'node-1', data: { direction: 'in' } },
        { source: 'node-6', target: 'node-1', data: { direction: 'in' } },
      ],
    },
    layout: {
      type: 'radial',
      unitRadius: 120,
      linkDistance: 120,
    },
    edge: {
      style: {
        endArrow: true,
      },
      palette: {
        type: 'group',
        field: 'direction',
        color: ['#F08F56', '#00C9C9'],
      },
    },
  },
  { width: 600, height: 300 },
);
```

也可以使用默认配置：

```json
{
  "edge": {
    "palette": "tableau" // tableau 为色板名，默认根据 ID 分配颜色
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i + 1}` })),
      edges: [
        { source: 'node-1', target: 'node-2', data: { direction: 'out' } },
        { source: 'node-1', target: 'node-3', data: { direction: 'out' } },
        { source: 'node-1', target: 'node-4', data: { direction: 'out' } },
        { source: 'node-5', target: 'node-1', data: { direction: 'in' } },
        { source: 'node-6', target: 'node-1', data: { direction: 'in' } },
      ],
    },
    layout: {
      type: 'radial',
      unitRadius: 120,
      linkDistance: 120,
    },
    edge: {
      style: {
        endArrow: true,
      },
      palette: 'tableau',
    },
  },
  { width: 600, height: 300 },
);
```
