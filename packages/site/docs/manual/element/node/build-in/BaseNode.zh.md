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

- `circle`：[圆形节点](/manual/element/node/build-in/circle)
- `diamond`：[菱形节点](/manual/element/node/build-in/diamond)
- `donut`：[甜甜圈节点](/manual/element/node/build-in/donut)
- `ellipse`：[椭圆节点](/manual/element/node/build-in/ellipse)
- `hexagon`：[六边形节点](/manual/element/node/build-in/hexagon)
- `html`：[HTML 节点](/manual/element/node/build-in/html)
- `image`：[图片节点](/manual/element/node/build-in/image)
- `rect`：[矩形节点](/manual/element/node/build-in/rect)
- `star`：[星形节点](/manual/element/node/build-in/star)
- `triangle`：[三角形节点](/manual/element/node/build-in/triangle)

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

| 属性                            | 描述                                                                                      | 类型                          | 默认值    | 必选 |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------- | --------- | ---- |
| collapsed                       | 当前节点/组合是否展开                                                                     | boolean                       | false     |      |
| cursor                          | 节点鼠标移入样式，[配置项](#cursor)                                                       | string                        | default   |      |
| fill                            | 节点填充色                                                                                | string                        | `#1783FF` |      |
| fillOpacity                     | 节点填充色透明度                                                                          | number \| string              | 1         |      |
| increasedLineWidthForHitTesting | 当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让“细线”更容易被拾取到 | number                        | 0         |      |
| lineCap                         | 节点描边端点样式                                                                          | `round` \| `square` \| `butt` | `butt`    |      |
| lineDash                        | 节点描边虚线样式                                                                          | number[]                      | -         |      |
| lineDashOffset                  | 节点描边虚线偏移量                                                                        | number                        | -         |      |
| lineJoin                        | 节点描边连接处样式                                                                        | `round` \| `bevel` \| `miter` | `miter`   |      |
| lineWidth                       | 节点描边宽度                                                                              | number                        | 1         |      |
| opacity                         | 节点透明度                                                                                | number \| string              | 1         |      |
| shadowBlur                      | 节点阴影模糊度                                                                            | number                        | -         |      |
| shadowColor                     | 节点阴影颜色                                                                              | string                        | -         |      |
| shadowOffsetX                   | 节点阴影在 x 轴方向上的偏移量                                                             | number \| string              | -         |      |
| shadowOffsetY                   | 节点阴影在 y 轴方向上的偏移量                                                             | number \| string              | -         |      |
| shadowType                      | 节点阴影类型                                                                              | `inner` \| `outer`            | `outer`   |      |
| size                            | 节点大小，快捷设置节点宽高，[配置项](#size)                                               | number \| number[]            | 32        |      |
| stroke                          | 节点描边色                                                                                | string                        | `#000`    |      |
| strokeOpacity                   | 节点描边色透明度                                                                          | number \| string              | 1         |      |
| transform                       | transform 属性允许你旋转、缩放、倾斜或平移给定节点                                        | string                        | -         |      |
| transformOrigin                 | 旋转与缩放中心，也称作变换中心                                                            | string                        | -         |      |
| visibility                      | 节点是否可见                                                                              | `visible` \| `hidden`         | `visible` |      |
| x                               | 节点 x 坐标                                                                               | number                        | 0         |      |
| y                               | 节点 y 坐标                                                                               | number                        | 0         |      |
| z                               | 节点 z 坐标                                                                               | number                        | 0         |      |
| zIndex                          | 节点渲染层级                                                                              | number                        | 0         |      |

#### Size

节点大小，快捷设置节点宽高，支持三种配置方式：

- number：表示节点宽高相同为指定值
- [number, number]：表示节点宽高分别为数组元素依次表示节点的宽度、高度
- [number, number, number]：表示节点宽高分别为数组元素依次表示节点的宽度、高度以及深度

#### Cursor

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

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

| 属性                     | 描述                                                                               | 类型                                                                        | 默认值    | 必选 |
| ------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | ---- |
| label                    | 是否显示节点标签                                                                   | boolean                                                                     | true      |      |
| labelCursor              | 鼠标移入节点标签时显示的样式，[配置项](#cursor)                                    | string                                                                      | `default` |      |
| labelFill                | 节点标签文字颜色                                                                   | string                                                                      | -         |      |
| labelFontFamily          | 节点标签字体族                                                                     | string                                                                      | -         |      |
| labelFontSize            | 节点标签字体大小                                                                   | number                                                                      | 12        |      |
| labelFontStyle           | 节点标签字体样式                                                                   | `normal` \| `italic` \| `oblique`                                           | -         |      |
| labelFontVariant         | 节点标签字体变种                                                                   | `normal` \| `small-caps` \| string                                          | -         |      |
| labelFontWeight          | 节点标签字体粗细                                                                   | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -         |      |
| labelLeading             | 行间距                                                                             | number                                                                      | 0         |      |
| labelLetterSpacing       | 节点标签字间距                                                                     | number \| string                                                            | -         |      |
| labelLineHeight          | 节点标签行高                                                                       | number \| string                                                            | -         |      |
| labelMaxLines            | 节点标签最大行数                                                                   | number                                                                      | 1         |      |
| labelMaxWidth            | 节点标签最大宽度，[配置项](#labelmaxwidth)                                         | number \| string                                                            | `200%`    |      |
| labelOffsetX             | 节点标签在 x 轴方向上的偏移量                                                      | number                                                                      | 0         |      |
| labelOffsetY             | 节点标签在 y 轴方向上的偏移量                                                      | number                                                                      | 0         |      |
| labelPadding             | 节点标签内边距                                                                     | number \| number[]                                                          | 0         |      |
| labelPlacement           | 节点标签相对于节点主图形的位置，[配置项](#labelplacement)                          | string                                                                      | `bottom`  |      |
| labelText                | 节点标签文字内容                                                                   | string                                                                      | -         |      |
| labelTextAlign           | 节点标签文本水平对齐方式                                                           | `start` \| `center` \| `middle` \| `end` \| `left` \| `right'               | `left`    |      |
| labelTextBaseline        | 节点标签文本基线                                                                   | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |      |
| labelTextDecorationColor | 节点标签文本装饰线颜色                                                             | string                                                                      | -         |      |
| labelTextDecorationLine  | 节点标签文本装饰线                                                                 | string                                                                      | -         |      |
| labelTextDecorationStyle | 节点标签文本装饰线样式                                                             | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |      |
| labelTextOverflow        | 节点标签文本溢出处理方式                                                           | `clip` \| `ellipsis` \| string                                              | -         |      |
| labelTextPath            | 节点标签文本路径                                                                   | Path                                                                        | -         |      |
| labelWordWrap            | 节点标签是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行 | boolean                                                                     | false     |      |
| labelZIndex              | 节点标签渲染层级                                                                   | number                                                                      | 0         |      |

#### LabelPlacement

可选值有：`left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

开启自动折行 `labelWordWrap` 后，超出该宽度则换行:

- string: 表示以相对于节点宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过节点宽度的一半
- number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素

比如，设置多行标签文字：

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

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

| 属性                          | 描述                                                                                                           | 类型                                     | 默认值    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| labelBackground               | 节点标签背景是否显示                                                                                           | boolean                                  | false     |
| labelBackgroundCursor         | 节点标签背景鼠标移入样式，[配置项](#cursor)                                                                    | string                                   | `default` |
| labelBackgroundFill           | 节点标签背景填充色                                                                                             | string                                   | -         |
| labelBackgroundFillOpacity    | 节点标签背景透明度                                                                                             | number                                   | 1         |
| labelBackgroundHeight         | 节点标签背景高度                                                                                               | string \| number                         | -         |
| labelBackgroundLineDash       | 节点标签背景虚线配置                                                                                           | number \| string \|(number \| string )[] | -         |
| labelBackgroundLineDashOffset | 节点标签背景虚线偏移量                                                                                         | number                                   | -         |
| labelBackgroundLineWidth      | 节点标签背景描边线宽                                                                                           | number                                   | -         |
| labelBackgroundRadius         | 节点标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充 | number \| number[]                       | 0         |
| labelBackgroundShadowBlur     | 节点标签背景阴影模糊程度                                                                                       | number                                   | -         |
| labelBackgroundShadowColor    | 节点标签背景阴影颜色                                                                                           | string                                   | -         |
| labelBackgroundShadowOffsetX  | 节点标签背景阴影 X 方向偏移                                                                                    | number                                   | -         |
| labelBackgroundShadowOffsetY  | 节点标签背景阴影 Y 方向偏移                                                                                    | number                                   | -         |
| labelBackgroundStroke         | 节点标签背景描边颜色                                                                                           | string                                   | -         |
| labelBackgroundStrokeOpacity  | 节点标签背景描边透明度                                                                                         | number \| string                         | 1         |
| labelBackgroundVisibility     | 节点标签背景是否可见                                                                                           | `visible` \| `hidden`                    | -         |
| labelBackgroundZIndex         | 节点标签背景渲染层级                                                                                           | number                                   | 1         |

**示例：**

```js {4-7}
const graph = new Graph({
  node: {
    style: {
      labelBackground: true, // 是否显示节点标签背景
      labelBackgroundFill: '#000', // label背景填充
      labelBackgroundRadius: 10, // label背景圆角
      labelBackgroundFillOpacity: 0.5, // label背景透明度
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

| 属性              | 描述                                                                   | 类型                   | 默认值                       | 必选 |
| ----------------- | ---------------------------------------------------------------------- | ---------------------- | ---------------------------- | ---- |
| halo              | 节点光晕是否显示                                                       | boolean                | false                        |      |
| haloCursor        | 节点光晕鼠标移入样式，[配置项](#cursor)                                | strig                  | `default`                    |      |
| haloDraggable     | 节点光晕是否允许拖拽                                                   | boolean                | true                         |      |
| haloDroppable     | 节点光晕是否允许接收被拖拽的元素                                       | boolean                | true                         |      |
| haloFillRule      | 节点光晕填充规则                                                       | `nonzero` \| `evenodd` | -                            |      |
| haloFilter        | 节点光晕滤镜                                                           | string                 | -                            |      |
| haloLineWidth     | 节点光晕描边宽度                                                       | number                 | 3                            |      |
| haloPointerEvents | 节点光晕效果是否响应指针事件，[配置项](#pointerevents)                 | string                 | `none`                       |      |
| haloStroke        | 节点光晕描边色，**此属性用于设置节点周围光晕的颜色，帮助突出显示节点** | string                 | 与主图形的填充色 `fill` 一致 |      |
| haloStrokeOpacity | 节点光晕描边色透明度                                                   | number                 | 0.25                         |      |
| haloVisibility    | 节点光晕可见性                                                         | `visible` \| `hidden`  | `visible`                    |      |
| haloZIndex        | 节点光晕渲染层级                                                       | number                 | -1                           |      |

#### PointerEvents

可选值有：
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

**示例：**

```js {4-6}
const graph = new Graph({
  node: {
    style: {
      halo: true, // 是否显示节点光晕
      haloStroke: '#FF0000', // 节点光晕描边色
      haloLineWidth: 10, // 节点光晕描边宽度
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
          },
        },
      ],
    },
    node: {
      style: {
        halo: true,
        haloStroke: '#FF0000',
        haloLineWidth: 10,
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 图标样式

| 属性                    | 描述                                | 类型                                                                        | 默认值           |
| ----------------------- | ----------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| icon                    | 是否显示节点图标                    | boolean                                                                     | true             |
| iconFill                | 节点图标文字颜色                    | string                                                                      | -                |
| iconFontFamily          | 节点图标字体族                      | string                                                                      | -                |
| iconFontSize            | 节点图标字体大小                    | number                                                                      | 16               |
| iconFontStyle           | 节点图标字体样式                    | `normal` \| `italic` \| `oblique`                                           | `normal`         |
| iconFontVariant         | 节点图标字体变种                    | `normal` \| `small-caps` \| string                                          | `normal`         |
| iconFontWeight          | 节点图标字体粗细                    | number \| string                                                            | `normal`         |
| iconHeight              | 节点图标高度                        | number                                                                      | 主图形高度的一半 |
| iconLetterSpacing       | 节点图标文本字间距                  | number \| string                                                            | -                |
| iconLineHeight          | 节点图标文本行高                    | number \| string                                                            | -                |
| iconMaxLines            | 节点图标文本最大行数                | number                                                                      | 1                |
| iconRadius              | 节点图标圆角半径                    | number                                                                      | 0                |
| iconSrc                 | 节点图片来源。其优先级高于 iconText | string                                                                      | -                |
| iconText                | 节点图标文字                        | string                                                                      | -                |
| iconTextAlign           | 节点图标文本水平对齐方式            | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`           |
| iconTextBaseline        | 节点图标文本基线                    | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `alphabetic`     |
| iconTextDecorationColor | 节点图标文本装饰线颜色              | string                                                                      | -                |
| iconTextDecorationLine  | 节点图标文本装饰线                  | string                                                                      | -                |
| iconTextDecorationStyle | 节点图标文本装饰线样式              | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`          |
| iconTextOverflow        | 节点图标文本溢出处理方式            | `clip` \| `ellipsis` \| string                                              | `clip`           |
| iconWidth               | 节点图标宽度                        | number                                                                      | 主图形宽度的一半 |
| iconWordWrap            | 节点图标文本是否自动换行            | boolean                                                                     | -                |

**示例：**

```js {4-8}
const graph = new Graph({
  node: {
    style: {
      iconText: '文本', // 图标文本
      iconFill: '#FF0000', // 图标文本颜色
      iconFontSize: 14, // 图标文本大小
      iconFontWeight: 'bold', // 图标文本粗细
      iconFontStyle: 'italic', // 图标文本样式
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
          },
        },
      ],
    },
    node: {
      style: {
        iconText: '文本',
        iconFill: '#FF0000',
        iconFontSize: 14,
        iconFontWeight: 'bold',
        iconFontStyle: 'italic',
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 徽标样式

| 属性         | 描述               | 类型                                  | 默认值                            |
| ------------ | ------------------ | ------------------------------------- | --------------------------------- |
| badge        | 节点是否显示徽标   | boolean                               | true                              |
| badgePalette | 节点徽标的背景色板 | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| badges       | 节点徽标设置       | [BadgeStyleProps](#badgestyleprops)[] | -                                 |

#### BadgeStyleProps

| 属性                     | 描述                                                                                                                                                                                                                              | 类型                                                                                                                                                                   | 默认值       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| background               | 节点徽标是否显示背景                                                                                                                                                                                                              | boolean                                                                                                                                                                | true         |
| backgroundCursor         | 节点徽标背景鼠标移入样式，[配置项](#cursor)                                                                                                                                                                                       | string                                                                                                                                                                 | `default`    |
| backgroundFill           | 节点徽标背景填充色。若不指定，优先考虑 badgePalette 按顺序分配                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| backgroundFillOpacity    | 节点徽标背景填充透明度                                                                                                                                                                                                            | number                                                                                                                                                                 | 1            |
| backgroundFilter         | 节点徽标背景滤镜                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| backgroundHeight         | 节点徽标背景高度                                                                                                                                                                                                                  | number \| string                                                                                                                                                       | -            |
| backgroundLineDash       | 节点徽标背景虚线配置                                                                                                                                                                                                              | number \| string \|(number \| string )[]                                                                                                                               | -            |
| backgroundLineDashOffset | 节点徽标背景虚线偏移量                                                                                                                                                                                                            | number                                                                                                                                                                 | -            |
| backgroundLineWidth      | 节点徽标背景描边线宽                                                                                                                                                                                                              | number                                                                                                                                                                 | -            |
| backgroundRadius         | 节点徽标背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，会补足缺省的分量 <br> - string: 与 [CSS padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 属性类似，使用空格分隔 | number \| number[] \| string                                                                                                                                           | 0            |
| backgroundShadowBlur     | 节点徽标背景阴影模糊程度                                                                                                                                                                                                          | number                                                                                                                                                                 | -            |
| backgroundShadowColor    | 节点徽标背景阴影颜色                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| backgroundShadowOffsetX  | 节点徽标背景阴影 X 方向偏移                                                                                                                                                                                                       | number                                                                                                                                                                 | -            |
| backgroundShadowOffsetY  | 节点徽标背景阴影 Y 方向偏移                                                                                                                                                                                                       | number                                                                                                                                                                 | -            |
| backgroundStroke         | 节点徽标背景描边颜色                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| backgroundStrokeOpacity  | 节点徽标背景描边透明度                                                                                                                                                                                                            | number \| string                                                                                                                                                       | 1            |
| backgroundVisibility     | 节点徽标背景是否可见                                                                                                                                                                                                              | `visible` \| `hidden`                                                                                                                                                  | -            |
| backgroundZIndex         | 节点徽标背景渲染层级                                                                                                                                                                                                              | number                                                                                                                                                                 | -            |
| fill                     | 节点徽标文字颜色                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| fontFamily               | 节点徽标字体族                                                                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| fontSize                 | 节点徽标字体大小                                                                                                                                                                                                                  | number                                                                                                                                                                 | 8            |
| fontStyle                | 节点徽标字体样式                                                                                                                                                                                                                  | `normal` \| `italic` \| `oblique`                                                                                                                                      | `normal`     |
| fontVariant              | 节点徽标字体变种                                                                                                                                                                                                                  | `normal` \| `small-caps` \| string                                                                                                                                     | `normal`     |
| fontWeight               | 节点徽标字体粗细                                                                                                                                                                                                                  | number \| string                                                                                                                                                       | `normal`     |
| lineHeight               | 节点徽标行高                                                                                                                                                                                                                      | string \| number                                                                                                                                                       | -            |
| lineWidth                | 节点徽标行宽                                                                                                                                                                                                                      | string \| number                                                                                                                                                       | -            |
| maxLines                 | 节点徽标文本最大行数                                                                                                                                                                                                              | number                                                                                                                                                                 | 1            |
| offsetX                  | 节点徽标在 x 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                                                                                                 | 0            |
| offsetY                  | 节点徽标在 y 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                                                                                                 | 0            |
| padding                  | 节点徽标内边距                                                                                                                                                                                                                    | number \| number[]                                                                                                                                                     | 0            |
| placement                | 节点徽标相对于节点主图形的位置。若不指定，默认从右上角顺时针依次排放                                                                                                                                                              | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | -            |
| text                     | 节点徽标文字内容                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| textAlign                | 节点徽标文本水平对齐方式                                                                                                                                                                                                          | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`                                                                                                          | `left`       |
| textBaseline             | 节点徽标文本基线                                                                                                                                                                                                                  | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`                                                                                            | `alphabetic` |
| textDecorationColor      | 节点徽标文本装饰线颜色                                                                                                                                                                                                            | string                                                                                                                                                                 | -            |
| textDecorationLine       | 节点徽标文本装饰线                                                                                                                                                                                                                | string                                                                                                                                                                 | -            |
| textDecorationStyle      | 节点徽标文本装饰线样式                                                                                                                                                                                                            | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                                                                                                  | `solid`      |
| textOverflow             | 节点徽标文本溢出处理方式                                                                                                                                                                                                          | `clip` \| `ellipsis` \| string                                                                                                                                         | `clip`       |
| visibility               | 节点徽标是否可见                                                                                                                                                                                                                  | `visible` \| `hidden`                                                                                                                                                  | -            |
| wordWrap                 | 节点徽标文本是否自动换行                                                                                                                                                                                                          | boolean                                                                                                                                                                | -            |
| zIndex                   | 节点徽标渲染层级                                                                                                                                                                                                                  | number                                                                                                                                                                 | 3            |

例如，给一个节点添加三个不同含义的徽标：

```js {6-8}
const graph = new Graph({
  node: {
    style: {
      badge: true, // 是否显示徽标
      badges: [
        { text: 'A', placement: 'right-top' },
        { text: 'Important', placement: 'right' },
        { text: 'Notice', placement: 'right-bottom' },
      ],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'], // 徽标的背景色板
      badgeFontSize: 7, // 徽标字体大小
    },
  },
});
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

| 属性  | 描述                                 | 类型                                | 默认值 | 必选 |
| ----- | ------------------------------------ | ----------------------------------- | ------ | ---- |
| port  | 节点是否显示连接桩                   | boolean                             | true   |      |
| ports | 节点连接桩配置项，支持配置多个连接桩 | [PortStyleProps](#portstyleprops)[] |        |      |

#### PortStyleProps

| 属性              | 描述                                                                                                                                                                               | 类型                                                                                                                                                                                                   | 默认值    | 必选 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- |
| key               | 节点连接桩的键值，默认为节点连接桩的索引                                                                                                                                           | string                                                                                                                                                                                                 | -         |      |
| placement         | 节点连接桩相对于节点主图形的位置                                                                                                                                                   | `left` \| `right` \| `top` \| `bottom` \| `center` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| [number, number] | -         | ✓    |
| r                 | 节点连接桩半径 <br> - 如果设置为 undefined，则连接桩被视为一个点，不在画布上显示但存在，边会优先连接到最近的连接桩 <br> - 如果设置为数字，则连接桩被视为一个圆，圆的半径由此处指定 | number                                                                                                                                                                                                 | -         |      |
| linkToCenter      | 边是否连接到节点连接桩的中心 <br> - 若为 true，则边连接到节点连接桩的中心 <br> - 若为 false，则边连接到节点连接桩的边缘                                                            | boolean                                                                                                                                                                                                | false     |      |
| cursor            | 节点连接桩鼠标移入样式，[配置项](#cursor)                                                                                                                                          | string                                                                                                                                                                                                 | `default` |      |
| fill              | 节点连接桩填充颜色                                                                                                                                                                 | string                                                                                                                                                                                                 | -         |      |
| fillOpacity       | 节点连接桩填充透明度                                                                                                                                                               | number                                                                                                                                                                                                 | 1         |      |
| isBillboard       | 节点连接桩是否为Billboard 效果                                                                                                                                                     | boolean                                                                                                                                                                                                | -         |      |
| isSizeAttenuation | 节点连接桩是否启用大小衰减                                                                                                                                                         | boolean                                                                                                                                                                                                | -         |      |
| lineDash          | 节点连接桩描边虚线配置                                                                                                                                                             | number \| string \|(number \| string )[]                                                                                                                                                               | -         |
| lineDashOffset    | 节点连接桩描边虚线偏移量                                                                                                                                                           | number                                                                                                                                                                                                 | -         |      |
| lineWidth         | 节点连接桩描边线宽                                                                                                                                                                 | number                                                                                                                                                                                                 | -         |      |
| shadowBlur        | 节点连接桩阴影模糊程度                                                                                                                                                             | number                                                                                                                                                                                                 | -         |      |
| shadowColor       | 节点连接桩阴影颜色                                                                                                                                                                 | string                                                                                                                                                                                                 | -         |      |
| shadowOffsetX     | 节点连接桩阴影 X 方向偏移                                                                                                                                                          | number                                                                                                                                                                                                 | -         |      |
| shadowOffsetY     | 节点连接桩阴影 Y 方向偏移                                                                                                                                                          | number                                                                                                                                                                                                 | -         |      |
| stroke            | 节点连接桩描边颜色                                                                                                                                                                 | string                                                                                                                                                                                                 | -         |      |
| strokeOpacity     | 节点连接桩描边透明度                                                                                                                                                               | number \| string                                                                                                                                                                                       | 1         |      |
| visibility        | 节点连接桩是否可见                                                                                                                                                                 | `visible` \| `hidden`                                                                                                                                                                                  | `visible` |      |
| zIndex            | 节点连接桩渲染层级                                                                                                                                                                 | number                                                                                                                                                                                                 | 2         |      |

例如，给一个节点显示添加四个连接桩：

```js {6-9}
const graph = new Graph({
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
});
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

```js {4-7}
const graph = new Graph({
  node: {
    state: {
      focus: {
        lineWidth: 3, // 描边宽度
        stroke: 'orange', // 描边颜色
      },
    },
  },
});
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

你可以参考 [动画范式](/manual/animation/animation#动画范式) 使用动画语法来配置节点，如：

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

| 属性   | 描述                                                                | 类型                          | 默认值  |
| ------ | ------------------------------------------------------------------- | ----------------------------- | ------- |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string \| string[]            | -       |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string \| ((datum) => string) | `id`    |
| invert | 是否反转色板                                                        | boolean                       | false   |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` \| `value`            | `group` |

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
