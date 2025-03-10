---
title: 节点通用配置项
order: 0
---

本文介绍内置节点通用属性配置。

## NodeOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  node: {
    type: 'circle', // 节点类型
    style: {}, // 节点样式
    state: {}, // 状态样式
    palette: {}, // 色板配置
    animation: {}, // 动画配置
  },
});
```

| 属性      | 描述                                         | 类型                    | 默认值   | 必选 |
| --------- | -------------------------------------------- | ----------------------- | -------- | ---- |
| type      | 节点类型，内置节点类型名称或自定义节点的名称 | [Type](#type)           | `circle` |      |
| style     | 节点样式配置，包括颜色、大小等               | [Style](#style)         | -        |      |
| state     | 不同状态下的样式配置                         | [State](#state)         | -        |      |
| palette   | 定义节点的色板，用于根据不同数据映射颜色     | [Palette](#palette)     | -        |      |
| animation | 定义节点的动画效果                           | [Animation](#animation) | -        |      |

## Type

指定节点类型，内置节点类型名称或自定义节点的名称。默认为 `circle`(圆形)。**⚠️ 注意**：这里决定了主图形的形状。

```js {3}
const graph = new Graph({
  node: {
    type: 'circle',
  },
});
```

可选值有：

- `circle`：[圆形节点](/manual/element/node/build-in/circle-node)
- `diamond`：[菱形节点](/manual/element/node/build-in/diamond-node)
- `donut`：[甜甜圈节点](/manual/element/node/build-in/donut-node)
- `ellipse`：[椭圆节点](/manual/element/node/build-in/ellipse-node)
- `hexagon`：[六边形节点](/manual/element/node/build-in/hexagon-node)
- `html`：[HTML 节点](/manual/element/node/build-in/html-node)
- `image`：[图片节点](/manual/element/node/build-in/image-node)
- `rect`：[矩形节点](/manual/element/node/build-in/rect-node)
- `star`：[星形节点](/manual/element/node/build-in/star-node)
- `triangle`：[三角形节点](/manual/element/node/build-in/triangle-node)

## Style

定义节点的样式，包括颜色、大小等。

```js {3}
const graph = new Graph({
  node: {
    style: {},
  },
});
```

一个完整的节点由以下几部分构成：

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：节点的主图形，表示节点的主要形状，例如矩形、圆形等；
- `label` ：文本标签，通常用于展示节点的名称或描述；
- `icon` ：图标图形，通常用于展示节点的图标，可以是图片或者文本图标；
- `badge` ：默认位于节点右上角的徽标；
- `halo` ：主图形周围展示的光晕效果的图形；
- `port` ：节点上的连接点，用于连接边。

以下样式配置将按原子图形依次说明：

### 主图形样式

主图形是节点的核心部分，定义了节点的基本形状和外观：

| 属性           | 描述                                        | 类型                          | 默认值    | 必选 |
| -------------- | ------------------------------------------- | ----------------------------- | --------- | ---- |
| x              | 节点 x 坐标                                 | number                        | 0         |      |
| y              | 节点 y 坐标                                 | number                        | 0         |      |
| z              | 节点 z 坐标                                 | number                        | 0         |      |
| size           | 节点大小，快捷设置节点宽高，[配置项](#size) | number \| number[]            | 32        |      |
| collapsed      | 当前节点/组合是否展开                       | boolean                       | false     |      |
| opacity        | 节点透明度                                  | number \| string              | 1         |      |
| fill           | 节点填充色                                  | string                        | `#1783FF` |      |
| fillOpacity    | 节点填充色透明度                            | number \| string              | 1         |      |
| stroke         | 节点描边色                                  | string                        | `#000`    |      |
| strokeOpacity  | 节点描边色透明度                            | number \| string              | 1         |      |
| lineWidth      | 节点描边宽度                                | number                        | 1         |      |
| lineCap        | 节点描边端点样式                            | `round` \| `square` \| `butt` | `butt`    |      |
| lineJoin       | 节点描边连接处样式                          | `round` \| `bevel` \| `miter` | `miter`   |      |
| lineDash       | 节点描边虚线样式                            | number[]                      | -         |      |
| lineDashOffset | 节点描边虚线偏移量                          | number                        | -         |      |
| shadowType     | 节点阴影类型                                | `inner` \| `outer`            | `outer`   |      |
| shadowColor    | 节点阴影颜色                                | string                        | -         |      |
| shadowBlur     | 节点阴影模糊度                              | number                        | -         |      |
| shadowOffsetX  | 节点阴影在 x 轴方向上的偏移量               | number \| string              | -         |      |
| shadowOffsetY  | 节点阴影在 y 轴方向上的偏移量               | number \| string              | -         |      |
| visibility     | 节点是否可见                                | `visible` \| `hidden`         | `visible` |      |

#### Size

节点大小，快捷设置节点宽高，支持三种配置方式：

- number：表示节点宽高相同为指定值
- [number, number]：表示节点宽高分别为数组元素依次表示节点的宽度、高度
- [number, number, number]：表示节点宽高分别为数组元素依次表示节点的宽度、高度以及深度

**示例：**

```js {4-6}
const graph = new Graph({
  node: {
    style: {
      fill: '#1783FF', // 填充色
      stroke: '#000', // 描边色
      lineWidth: 2, // 描边宽度
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [{ id: 'node1', style: { x: 120, y: 40 } }],
    },
    node: {
      style: { fill: '#1783FF', stroke: '#000', lineWidth: 2 },
    },
  },
  { width: 240, height: 100 },
);
```

### 标签样式

标签用于显示节点的文本信息：

| 属性                     | 描述                                                                               | 类型                                                                        | 默认值   | 必选 |
| ------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- | ---- |
| label                    | 是否显示节点标签                                                                   | boolean                                                                     | true     |      |
| labelFill                | 节点标签文字颜色                                                                   | string                                                                      | -        |      |
| labelFontFamily          | 节点标签字体族                                                                     | string                                                                      | -        |      |
| labelFontSize            | 节点标签字体大小                                                                   | number                                                                      | 12       |      |
| labelFontStyle           | 节点标签字体样式                                                                   | `normal` \| `italic` \| `oblique`                                           | -        |      |
| labelFontVariant         | 节点标签字体变种                                                                   | `normal` \| `small-caps` \| string                                          | -        |      |
| labelFontWeight          | 节点标签字体粗细                                                                   | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -        |      |
| labelLetterSpacing       | 节点标签字间距                                                                     | number \| string                                                            | -        |      |
| labelLineHeight          | 节点标签行高                                                                       | number \| string                                                            | -        |      |
| labelMaxLines            | 节点标签最大行数                                                                   | number                                                                      | 1        |      |
| labelMaxWidth            | 节点标签最大宽度，[配置项](#labelmaxwidth)                                         | number \| string                                                            | `200%`   |      |
| labelOffsetX             | 节点标签在 x 轴方向上的偏移量                                                      | number                                                                      | 0        |      |
| labelOffsetY             | 节点标签在 y 轴方向上的偏移量                                                      | number                                                                      | 0        |      |
| labelPadding             | 节点标签内边距                                                                     | number \| number[]                                                          | 0        |      |
| labelPlacement           | 节点标签相对于节点主图形的位置，[配置项](#labelplacement)                          | string                                                                      | `bottom` |      |
| labelText                | 节点标签文字内容                                                                   | string                                                                      | -        |      |
| labelTextAlign           | 节点标签文本水平对齐方式                                                           | `start` \| `center` \| `middle` \| `end` \| `left` \| `right'               | -        |      |
| labelTextBaseline        | 节点标签文本基线                                                                   | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom' | -        |      |
| labelTextDecorationColor | 节点标签文本装饰线颜色                                                             | string                                                                      | -        |      |
| labelTextDecorationLine  | 节点标签文本装饰线                                                                 | string                                                                      | -        |      |
| labelTextDecorationStyle | 节点标签文本装饰线样式                                                             | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -        |      |
| labelTextOverflow        | 节点标签文本溢出处理方式                                                           | `clip` \| `ellipsis` \| string                                              | -        |      |
| labelTextPath            | 节点标签文本路径                                                                   | Path                                                                        | -        |      |
| labelWordWrap            | 是否开启节点标签自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行 | boolean                                                                     | false    |      |

#### LabelPlacement

可选值有：`left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

开启自动折行 `labelWordWrap` 后，超出该宽度则换行:

- string: 表示以相对于节点宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过节点宽度的一半
- number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素

**示例：**

```js {4-10}
const graph = new Graph({
  node: {
    style: {
      label: true, // 是否显示节点标签
      labelText: '节点名称', // 标签文字内容
      labelFill: '#000', // 标签文字颜色
      labelFontSize: 12, // 标签字体大小
      labelFontWeight: 'normal', // 标签字体粗细
      labelPlacement: 'bottom', // 标签相对于节点主图形的位置
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            x: 120,
            y: 40,
            label: true,
            labelText: '节点名称',
            labelFill: '#000',
            labelFontSize: 12,
            labelFontWeight: 'normal',
            labelPlacement: 'bottom',
          },
        },
      ],
    },
  },
  { width: 240, height: 100 },
);
```

### 标签背景样式

标签背景用于显示节点标签的背景：

| 属性                          | 描述                                                                                                                                                       | 类型                                                         | 默认值 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| labelBackground               | 是否显示节点标签背景                                                                                                                                       | boolean                                                      | false  |
| labelBackgroundFill           | 节点标签背景填充色                                                                                                                                         | string                                                       | -      |
| labelBackgroundRadius         | 节点标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充                                             | number &#124; number[]                                       | 0      |
| `labelBackground{StyleProps}` | 更多节点标签背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 labelBackgroundFillOpacity 代表节点标签背景透明度 | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) | -      |

**示例：**

```js {4-7}
const graph = new Graph({
  node: {
    style: {
      labelBackground: true,
      labelBackgroundFill: '#000',
      labelBackgroundRadius: 10,
      labelBackgroundFillOpacity: 0.5,
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            x: 120,
            y: 40,
            label: true,
            labelText: '节点名称',
            labelFill: '#000',
            labelFontSize: 12,
            labelFontWeight: 'normal',
            labelPlacement: 'bottom',
            labelBackground: true,
            labelBackgroundFill: '#000',
            labelBackgroundRadius: 10,
            labelBackgroundFillOpacity: 0.5,
          },
        },
      ],
    },
  },
  { width: 240, height: 100 },
);
```

### 光晕样式

| 属性               | 描述                                                                                                                                           | 类型                                                                  | 默认值               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------- |
| halo               | 是否显示节点光晕                                                                                                                               | boolean                                                               | false                |
| haloFill           | 光晕填充色                                                                                                                                     | string                                                                | 与主图形的填充色一致 |
| haloStroke         | 光晕描边色                                                                                                                                     | string                                                                | 与主图形的填充色一致 |
| haloLineWidth      | 光晕描边宽度                                                                                                                                   | number                                                                | 3                    |
| `halo{StyleProps}` | 更多光晕样式配置，参考 [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) 配置项。例如 haloFillOpacity 代表光晕填充色透明度 | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                    |

### 图标样式

| 属性               | 描述                                                                                                                                                                                                 | 类型                                                                                                                               | 默认值           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| icon               | 是否显示节点图标                                                                                                                                                                                     | boolean                                                                                                                            | true             |
| iconSrc            | 图片来源。其优先级高于 iconText                                                                                                                                                                      | string                                                                                                                             | -                |
| iconWidth          | 图片宽度                                                                                                                                                                                             | number                                                                                                                             | 主图形宽度的一半 |
| iconHeight         | 图标高度                                                                                                                                                                                             | number                                                                                                                             | 主图形高度的一半 |
| iconRadius         | 图标圆角半径                                                                                                                                                                                         | number                                                                                                                             | 0                |
| iconText           | 图标文字                                                                                                                                                                                             | string                                                                                                                             | -                |
| iconFill           | 图标文字颜色                                                                                                                                                                                         | string                                                                                                                             | -                |
| iconFontSize       | 图标字体大小                                                                                                                                                                                         | number                                                                                                                             | 16               |
| iconFontWeight     | 图标字体粗细                                                                                                                                                                                         | number &#124; string                                                                                                               | `normal`         |
| `icon{StyleProps}` | 更多图标样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)、[ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) 配置项。例如 iconFontSize 代表文字图标的字体大小 | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) | -                |

### 徽标样式

| 属性                 | 描述                                                                                                | 类型                                  | 默认值                            |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------- |
| badge                | 是否显示节点徽标                                                                                    | boolean                               | true                              |
| badges               | 设置徽标                                                                                            | [BadgeStyleProps](#badgestyleprops)[] | -                                 |
| badgePalette         | 徽标的背景色板                                                                                      | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| `badge{StyleProps} ` | 徽标通用样式配置，会被独立应用于每一个徽标元素中。若在badges 中有特定的样式定义，其优先级将高于此处 | [BadgeStyleProps](#badgestyleprops)   | -                                 |

#### BadgeStyleProps

| 属性                     | 描述                                                                                                                                                                                                                      | 类型                                                                                                                                                                                                               | 默认值   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| placement                | 徽标相对于节点主图形的位置。若不指定，默认从右上角顺时针依次排放                                                                                                                                                          | `left` &#124; `right` &#124; `top` &#124; `bottom` &#124; `left-top` &#124; `left-bottom` &#124; `right-top` &#124; `right-bottom` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; `bottom-right` | -        |
| offsetX                  | 徽标在 x 轴方向上的偏移量                                                                                                                                                                                                 | number                                                                                                                                                                                                             | 0        |
| offsetY                  | 徽标在 y 轴方向上的偏移量                                                                                                                                                                                                 | number                                                                                                                                                                                                             | 0        |
| text                     | 文字内容                                                                                                                                                                                                                  | string                                                                                                                                                                                                             | -        |
| fill                     | 文字颜色                                                                                                                                                                                                                  | string                                                                                                                                                                                                             | -        |
| fontSize                 | 字体大小                                                                                                                                                                                                                  | number                                                                                                                                                                                                             | 8        |
| fontWeight               | 字体粗细                                                                                                                                                                                                                  | number &#124; string                                                                                                                                                                                               | `normal` |
| padding                  | 内边距                                                                                                                                                                                                                    | number &#124; number[]                                                                                                                                                                                             | 0        |
| `{StyleProps}`           | 更多文字样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值                                                                                                                                | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                                                                                                                                                       | -        |
| background               | 是否显示背景                                                                                                                                                                                                              | boolean                                                                                                                                                                                                            | true     |
| backgroundFill           | 背景填充色。若不指定，优先考虑 badgePalette 按顺序分配                                                                                                                                                                    | string                                                                                                                                                                                                             | -        |
| backgroundRadius         | 背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，会补足缺省的分量 <br> - string: 与 [CSS padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 属性类似，使用空格分隔 | number &#124; number[] &#124; string                                                                                                                                                                               | 0        |
| `background{StyleProps}` | 更多背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 labelBackgroundFillOpacity 代表标签背景透明度                                                                            | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)                                                                                                                                                       | -        |

例如，给一个节点添加三个不同含义的徽标：

```json
{
  "node": {
    "style": {
      "badge": true,
      "badges": [
        { "text": "A", "placement": "right-top" },
        { "text": "Important", "placement": "right" },
        { "text": "Notice", "placement": "right-bottom" }
      ],
      "badgePalette": ["#7E92B5", "#F4664A", "#FFBE3A"],
      "badgeFontSize": 7
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
      nodes: [{ id: 'node1', states: ['focus'] }],
    },
    node: {
      style: {
        badge: true,
        badges: [
          { text: 'A', placement: 'right-top' },
          { text: 'Important', placement: 'right' },
          { text: 'Notice', placement: 'right-bottom' },
        ],
        badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
        badgeFontSize: 7,
      },
    },
  },
  { width: 200, height: 100 },
);
```

### 连接桩样式

| 属性               | 描述                                                                                          | 类型                                | 默认值 |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------------------------- | ------ |
| port               | 是否显示连接桩                                                                                | boolean                             | true   |
| ports              | 连接桩配置项，支持配置多个连接桩                                                              | [PortStyleProps](#portstyleprops)[] |        |
| `port{StyleProps}` | 更多连接桩样式配置，请参考 [PortStyleProps](#portstyleprops)。例如 portR 代表圆形连接桩的半径 | [PortStyleProps](#portstyleprops)   | -      |

#### PortStyleProps

| 属性           | 描述                                                                                                                                                                           | 类型                                                             | 默认值 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------ |
| r              | 连接桩半径 <br> - 如果设置为 undefined，则连接桩被视为一个点，不在画布上显示但存在，边会优先连接到最近的连接桩 <br> - 如果设置为数字，则连接桩被视为一个圆，圆的半径由此处指定 | number                                                           | -      |
| linkToCenter   | 边是否连接到连接桩的中心 <br> - 若为 true，则边连接到连接桩的中心 <br> - 若为 false，则边连接到连接桩的边缘                                                                    | boolean                                                          | false  |
| `{StyleProps}` | 更多连接桩样式配置，请参考 [CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle)                                                                                    | [CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle) | -      |

例如，给一个节点显示添加四个连接桩：

```json
{
  "node": {
    "style": {
      "port": true,
      "ports": [
        { "key": "top", "placement": "top", "fill": "#7E92B5" },
        { "key": "right", "placement": "right", "fill": "#F4664A" },
        { "key": "bottom", "placement": "bottom", "fill": "#FFBE3A" },
        { "key": "left", "placement": [0, 0.5], "fill": "#D580FF" }
      ],
      "portR": 3,
      "portLineWidth": 1,
      "portStroke": "#fff"
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
      nodes: [{ id: 'node1', states: ['focus'] }],
    },
    node: {
      style: {
        port: true,
        ports: [
          { key: 'top', placement: 'top', fill: '#7E92B5' },
          { key: 'right', placement: 'right', fill: '#F4664A' },
          { key: 'bottom', placement: 'bottom', fill: '#FFBE3A' },
          { key: 'left', placement: [0, 0.5], fill: '#D580FF' },
        ],
        portR: 3,
        portLineWidth: 1,
        portStroke: '#fff',
      },
    },
  },
  { width: 200, height: 100 },
);
```

## State

在一些交互行为中，比如点击选中一个节点或鼠标悬停激活一个边，仅仅是在该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的图元素样式，以响应该图元素状态的变化。

G6 提供了几种内置的状态，包括选中（selected）、高亮（highlight）、激活（active）、不活跃（inactive）和禁用（disabled）。此外，它还支持自定义状态，以满足更特定的需求。对于每个状态，开发者可以定义一套样式规则，这些规则会覆盖元素的默认样式。

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t2qvRp92itkAAAAAAAAAAAAADmJ7AQ/original" />

数据结构如下：

```typescript
type NodeState = {
  [state: string]: NodeStyle;
};
```

例如，当节点处于 `focus` 状态时，可以为其添加一个宽度为 3 且颜色为橙色的描边。

```json
{
  "node": {
    "state": {
      "focus": {
        "lineWidth": 3,
        "stroke": "orange"
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
      nodes: [{ id: 'node1', states: ['focus'] }],
    },
    node: {
      state: {
        focus: {
          lineWidth: 3,
          stroke: 'orange',
        },
      },
    },
  },
  { width: 200, height: 100 },
);
```

## Animation

定义节点的动画效果，支持下列两种配置方式：

1. 关闭节点全部动画

```json
{
  "node": {
    "animation": false
  }
}
```

2. 配置阶段动画

阶段动画是指节点在进入画布、更新、离开画布时的动画效果。目前支持的阶段包括：

- `enter`: 节点进入画布时的动画
- `update`: 节点更新时的动画
- `exit`: 节点离开画布时的动画
- `show`: 节点从隐藏状态显示时的动画
- `hide`: 节点隐藏时的动画
- `collapse`: 节点收起时的动画
- `expand`: 节点展开时的动画

你可以参考 [动画范式](/manual/animation/overview#动画范式) 使用动画语法来配置节点，如：

```json
{
  "node": {
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
  "node": {
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
  "node": {
    "animation": {
      "enter": false // 关闭节点入场动画
    }
  }
}
```

## Palette

定义节点的色板，即预定义节点颜色池，并根据规则进行分配，将颜色映射到 `fill` 属性。

> 有关色板的定义，请参考 [色板](/manual/theme/palette)。

| 属性   | 描述                                                                | 类型                              | 默认值  |
| ------ | ------------------------------------------------------------------- | --------------------------------- | ------- |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` &#124; `value`            | `group` |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string &#124; ((datum) => string) | `id`    |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string &#124; string[]            | -       |
| invert | 是否反转色板                                                        | boolean                           | false   |

如将一组数据按 `category` 字段分配节点颜色，使得同类别的节点颜色相同：

```json
{
  "node": {
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
      nodes: new Array(10)
        .fill(0)
        .map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
    },
    layout: { type: 'grid', cols: 10 },
    node: {
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
  "node": {
    "palette": "tableau" // tableau 为色板名，默认根据 ID 分配颜色
  }
}
```

效果如下图所示：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(10)
        .fill(0)
        .map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
    },
    layout: { type: 'grid', cols: 10 },
    node: {
      palette: 'tableau',
    },
  },
  { width: 600, height: 100 },
);
```
