---
title: 边通用配置项
order: 0
---

本文介绍边属性配置，配置位置如下：

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line', // 边类型配置
    style: {}, // 边样式配置
    state: {}, // 边状态样式
    palette: {}, // 边色板配置
    animation: {}, // 边动画配置
  },
});
```

## EdgeOptions

| 属性      | 描述                                   | 类型                    | 默认值 | 必选 |
| --------- | -------------------------------------- | ----------------------- | ------ | ---- |
| type      | 边类型，内置边类型名称或自定义边的名称 | [Type](#type)           | `line` |      |
| style     | 边样式，包括颜色、大小等               | [Style](#style)         | -      |      |
| state     | 定义边在不同状态下的样式               | [State](#state)         | -      |      |
| palette   | 定义边的色板，用于根据不同数据映射颜色 | [Palette](#palette)     | -      |      |
| animation | 定义边的动画效果                       | [Animation](#animation) | -      |      |

## Type

指定边类型，内置边类型名称或自定义边的名称。默认为 `line`（直线边）。

```js {3}
const graph = new Graph({
  edge: {
    type: 'polyline', // 边类型配置
  },
});
```

可选值有：

- `cubic-horizontal`：[水平三次贝塞尔曲线](/manual/element/edge/build-in/cubic-horizontal)
- `cubic-vertical`：[垂直三次贝塞尔曲线](/manual/element/edge/build-in/cubic-vertical)
- `cubic`：[三次贝塞尔曲线](/manual/element/edge/build-in/cubic)
- `line`：[直线](/manual/element/edge/build-in/line)
- `polyline`：[折线](/manual/element/edge/build-in/polyline)
- `quadratic`：[二次贝塞尔曲线](/manual/element/edge/build-in/quadratic)

## Style

定义边的样式，包括颜色、大小等。

```js {3}
const graph = new Graph({
  edge: {
    style: {},
  },
});
```

一个完整的边由以下几部分构成：

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

> 了解边的构成，请阅读 [元素 - 边](/manual/element/edge/overview#边构成)。

以下样式配置将按原子图形依次说明：

### 主图形样式 key

| 属性                            | 描述                                                  | 默认值                               | 类型      |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------ | --------- |
| class                           | 边的className                                         | string                               | -         |
| cursor                          | 边的鼠标移入样式，[配置项](#cursor)                   | string                               | `default` |
| fill                            | 边的区域填充色                                        | string                               | -         |
| fillRule                        | 边的内部填充规则                                      | `nonzero` &#124; `evenodd`           | -         |
| filter                          | 边的阴影的滤镜效果                                    | string                               | -         |
| increasedLineWidthForHitTesting | 边的宽度过小时，可以用来增大交互区域                  | string &#124; number                 | -         |
| isBillboard                     | 3D 场景中生效，始终朝向屏幕，因此线宽不受透视投影影像 | true                                 | boolean   |
| lineDash                        | 边虚线样式                                            | 0                                    | number    |
| lineDashOffset                  | 边虚线偏移量                                          | number                               | 0         |
| lineWidth                       | 边的宽度                                              | 1                                    | number    |
| opacity                         | 边整体的透明度                                        | number                               | 1         |
| pointerEvents                   | 边是否响应指针事件，[配置项](#pointerevents)          | string                               | -         |
| shadowBlur                      | 边的阴影模糊效果                                      | number                               | -         |
| shadowColor                     | 边的阴影颜色                                          | string                               | -         |
| shadowOffsetX                   | 边的阴影X轴偏移                                       | number                               | -         |
| shadowOffsetY                   | 边的阴影Y轴偏移                                       | number                               | -         |
| shadowType                      | 边的阴影类型                                          | `inner` &#124; `outer` &#124; `both` | -         |
| sourcePort                      | 边起始连接的连接桩                                    | -                                    | string    |
| stroke                          | 边的颜色                                              | `#000`                               | string    |
| strokeOpacity                   | 边的颜色透明度                                        | number                               | 1         |
| targetPort                      | 边终点连接的连接桩                                    | -                                    | string    |
| transform                       | transform 属性允许你旋转、缩放、倾斜或平移给定边      | string                               | -         |
| transformOrigin                 | 旋转与缩放中心，也称作变换中心                        | string                               | -         |
| visibility                      | 边是否可见                                            | `visible` &#124; `hidden`            | `visible` |
| zIndex                          | 边的渲染层级                                          | number                               | 1         |

#### PointerEvents

可选值有：
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

#### Cursor

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 标签样式 label

| 属性                          | 描述                                                                                                                                                                                                                                       | 类型                                                                              | 默认值     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------- |
| label                         | 边标签是否显示                                                                                                                                                                                                                             | boolean                                                                           | true       |
| labelAutoRotate               | 边标签是否自动旋转，保持与边的方向一致                                                                                                                                                                                                     | boolean                                                                           | true       |
| labelBackground               | 边标签是否显示背景                                                                                                                                                                                                                         | boolean                                                                           | false      |
| labelBackgroundClass          | 边标签背景className                                                                                                                                                                                                                        | string                                                                            | -          |
| labelBackgroundCursor         | 边标签背景鼠标移入样式，[配置项](#cursor)                                                                                                                                                                                                  | string                                                                            | `default`  |
| labelBackgroundFill           | 边标签背景填充色                                                                                                                                                                                                                           | string                                                                            | -          |
| labelBackgroundFillOpacity    | 边标签背景透明度                                                                                                                                                                                                                           | number                                                                            | 1          |
| labelBackgroundHeight         | 边标签背景高度                                                                                                                                                                                                                             | string \| number                                                                  | -          |
| labelBackgroundLineDash       | 边标签背景虚线配置                                                                                                                                                                                                                         | number &#124; string &#124;(number &#124; string )[]                              | -          |
| labelBackgroundLineDashOffset | 边标签背景虚线偏移量                                                                                                                                                                                                                       | number                                                                            | -          |
| labelBackgroundLineWidth      | 边标签背景描边线度                                                                                                                                                                                                                         | number                                                                            | -          |
| labelBackgroundRadius         | 边标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充                                                                                                                               | number &#124; number[]                                                            | 0          |
| labelBackgroundShadowBlur     | 边标签背景阴影模糊程度                                                                                                                                                                                                                     | number                                                                            | -          |
| labelBackgroundShadowColor    | 边标签背景阴影颜色                                                                                                                                                                                                                         | string                                                                            | -          |
| labelBackgroundShadowOffsetX  | 边标签背景阴影 X 方向偏移                                                                                                                                                                                                                  | number                                                                            | -          |
| labelBackgroundShadowOffsetY  | 边标签背景阴影 Y 方向偏移                                                                                                                                                                                                                  | number                                                                            | -          |
| labelBackgroundStroke         | 边标签背景描边颜色                                                                                                                                                                                                                         | string                                                                            | -          |
| labelBackgroundStrokeOpacity  | 边标签背景描边透明度                                                                                                                                                                                                                       | number &#124; string                                                              | 1          |
| labelBackgroundVisibility     | 边标签背景是否可见                                                                                                                                                                                                                         | `visible` &#124; `hidden`                                                         | -          |
| labelBackgroundZIndex         | 边标签背景渲染层级                                                                                                                                                                                                                         | number                                                                            | -          |
| labelClass                    | 边标签className                                                                                                                                                                                                                            | string                                                                            | -          |
| labelCursor                   | 边标签鼠标移入样式，[配置项](#cursor)                                                                                                                                                                                                      | string                                                                            | `default`  |
| labelFill                     | 边标签文字颜色                                                                                                                                                                                                                             | string                                                                            | -          |
| labelFillOpacity              | 边标签文字颜色透明度                                                                                                                                                                                                                       | string                                                                            | 1          |
| labelFillRule                 | 边标签文字填充规则                                                                                                                                                                                                                         | `nonzero` &#124; `evenodd`                                                        | -          |
| labelFilter                   | 边标签文字滤镜                                                                                                                                                                                                                             | string                                                                            | -          |
| labelFontFamily               | 边标签文字字体族                                                                                                                                                                                                                           | `system-ui, sans-serif`                                                           | -          |
| labelFontSize                 | 边标签字体大小                                                                                                                                                                                                                             | number                                                                            | 12         |
| labelFontStyle                | 边标签文字字体样式                                                                                                                                                                                                                         | `normal` &#124; `italic` &#124; `oblique`                                         | -          |
| labelFontVariant              | 边标签文字字体变种                                                                                                                                                                                                                         | `normal` &#124; `small-caps`                                                      | -          |
| labelFontWeight               | 边标签字体粗细                                                                                                                                                                                                                             | number &#124; string                                                              | `normal`   |
| labelLeading                  | 边标签文字行间距                                                                                                                                                                                                                           | number                                                                            | -          |
| labelLetterSpacing            | 边标签文字字间距                                                                                                                                                                                                                           | number                                                                            | -          |
| labelMaxLines                 | 边标签文字最大行数                                                                                                                                                                                                                         | number                                                                            | 1          |
| labelMaxWidth                 | 边标签最大宽度。开启自动折行后，超出该宽度则换行<br> - string: 表示以相对于边宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过边宽度的一半 <br> - number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素 | number &#124; string                                                              | `80%`      |
| labelOffsetX                  | 标签在 x 轴方向上的偏移量                                                                                                                                                                                                                  | number                                                                            | 4          |
| labelOffsetY                  | 边标签在 y 轴方向上的偏移量                                                                                                                                                                                                                | number                                                                            | 0          |
| labelOpacity                  | 边标签整体透明度                                                                                                                                                                                                                           | number                                                                            | 1          |
| labelPadding                  | 边标签内边距                                                                                                                                                                                                                               | number &#124; number[]                                                            | 0          |
| labelPlacement                | 边标签相对于边的位置。取值范围为 `start`、`center`、`end` 或特定比率（数字 0-1）                                                                                                                                                           | `start` &#124; `center` &#124; `end` &#124; number                                | `center`   |
| labelText                     | 边标签文字内容                                                                                                                                                                                                                             | string                                                                            | -          |
| labelTextAlign                | 边标签文字对齐方式                                                                                                                                                                                                                         | `start` &#124; `center` &#124; `middle` &#124; `end` &#124; `left` &#124; `right' | `left`     |
| labelTextBaseLine             | 边标签文字基线                                                                                                                                                                                                                             | `top` &#124; `hanging` &#124; `middle` &#124; `alphabetic` &#124; `ideographic`   | `middle`   |
| labelTextDecorationColor      | 边标签文字装饰线颜色                                                                                                                                                                                                                       | string                                                                            | -          |
| labelTextDecorationLine       | 边标签文字装饰线                                                                                                                                                                                                                           | string                                                                            | -          |
| labelTextDecorationStyle      | 边标签文字装饰线样式                                                                                                                                                                                                                       | `solid` &#124; `double` &#124; `dotted` &#124; `dashed` &#124; `wavy`             | -          |
| labelTextOverflow             | 边标签文字溢出处理方式                                                                                                                                                                                                                     | `clip` &#124; `ellipsis` &#124; string                                            | `ellipsis` |
| labelVisibility               | 边标签是否可见                                                                                                                                                                                                                             | `visible` &#124; `hidden`                                                         | `visible`  |
| labelWordWrap                 | 边标签是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行                                                                                                                                                           | boolean                                                                           | false      |
| labelZIndex                   | 边标签渲染层级                                                                                                                                                                                                                             | number                                                                            | -          |

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
      label: true, // 开启边标签展示
      labelText: 'labelText', // 边标签文字
      labelPlacement: 'center', // 边标签相对于边的位置
      labelFill: '#FF0000', // 边标签文字颜色
      labelOffsetY: 20, // 边标签在y轴方向上的偏移量
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
        label: true, // 开启边标签展示
        labelText: 'labelText', // 边标签文字
        labelPlacement: 'center', // 边标签相对于边的位置
        labelFill: '#FF0000', // 边标签文字颜色
        labelOffsetY: 20, // 边标签在y轴方向上的偏移量
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 光晕样式 halo

| 属性              | 描述                                                 | 类型                                                 | 默认值               |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------- | -------------------- |
| halo              | 边光晕是否显示                                       | boolean                                              | false                |
| haloClass         | 边光晕className                                      | string                                               | -                    |
| haloCursor        | 边光晕鼠标移入样式，[配置项](#cursor)                | strig                                                | `default`            |
| haloDraggable     | 边光晕是否允许拖拽                                   | boolean                                              | -                    |
| haloDroppable     | 边光晕是否允许接收被拖拽的元素                       | boolean                                              | false                |
| haloFillRule      | 边光晕填充规则                                       | `nonzero` &#124; `evenodd`                           | -                    |
| haloFilter        | 边光晕滤镜                                           | string                                               | -                    |
| haloLineDash      | 边光晕描边虚线样式                                   | number &#124; string &#124; (number &#124; string)[] | 0                    |
| haloLineWidth     | 边光晕描边宽度                                       | number                                               | 3                    |
| haloPointerEvents | 边光晕效果是否响应指针事件，[配置项](#pointerevents) | string                                               | `none`               |
| haloStroke        | 边光晕描边色                                         | string                                               | 与主图形的填充色一致 |
| haloStrokeOpacity | 边光晕描边色透明度                                   | number                                               | 0.25                 |
| haloVisibility    | 边光晕可见性                                         | `visible` &#124; `hidden`                            | `visible`            |
| haloZIndex        | 边光晕渲染层级                                       | number                                               | -1                   |

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
      label: true, // 开启边标签展示
      labelText: 'labelText', // 边标签文字
      labelPlacement: 'center', // 边标签相对于边的位置
      labelFill: '#FF0000', // 边标签文字颜色
      labelOffsetY: 20, // 边标签在y轴方向上的偏移量
      halo: true, // 边光晕开启
      haloStroke: '#000', // 边光晕颜色
      haloStrokeOpacity: 0.2, // 边光晕透明度
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
        label: true, // 开启边标签展示
        labelText: 'labelText', // 边标签文字
        labelPlacement: 'center', // 边标签相对于边的位置
        labelFill: '#FF0000', // 边标签文字颜色
        labelOffsetY: 20, // 边标签在y轴方向上的偏移量
        halo: true, // 边光晕开启
        haloStroke: '#000', // 边光晕颜色
        haloStrokeOpacity: 0.2, // 边光晕透明度
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 徽标样式 badge

| 属性                          | 描述                                                                                                                                                                                                                            | 类型                                                                                            | 默认值       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| badge                         | 边徽标是否显示                                                                                                                                                                                                                  | boolean                                                                                         | true         |
| badgeBackground               | 边徽标是否显示背景                                                                                                                                                                                                              | boolean                                                                                         | true         |
| badgeBackgroundClass          | 边徽标背景clssName                                                                                                                                                                                                              | string                                                                                          | -            |
| badgeBackgroundCursor         | 边徽标背景鼠标移入样式，[配置项](#cursor)                                                                                                                                                                                       | string                                                                                          | `default`    |
| badgeBackgroundFill           | 边徽标背景填充色。若不指定，优先考虑 badgePalette 按顺序分配                                                                                                                                                                    | string                                                                                          | -            |
| badgeBackgroundFillOpacity    | 边徽标背景填充透明度                                                                                                                                                                                                            | number                                                                                          | 1            |
| badgeBackgroundFilter         | 边徽标背景滤镜                                                                                                                                                                                                                  | string                                                                                          | -            |
| badgeBackgroundHeight         | 边徽标背景高度                                                                                                                                                                                                                  | number &#124; string                                                                            | -            |
| badgeBackgroundLineDash       | 边徽标背景虚线配置                                                                                                                                                                                                              | number &#124; string &#124;(number &#124; string )[]                                            | -            |
| badgeBackgroundLineDashOffset | 边徽标背景虚线偏移量                                                                                                                                                                                                            | number                                                                                          | -            |
| badgeBackgroundLineWidth      | 边徽标背景描边线宽                                                                                                                                                                                                              | number                                                                                          | -            |
| badgeBackgroundOpacity        | 边徽标渲背景透明度                                                                                                                                                                                                              | number                                                                                          | 1            |
| badgeBackgroundRadius         | 边徽标背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，会补足缺省的分量 <br> - string: 与 [CSS padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 属性类似，使用空格分隔 | number &#124; number[] &#124; string                                                            | `50%`        |
| badgeBackgroundShadowBlur     | 边徽标背景阴影模糊程度                                                                                                                                                                                                          | number                                                                                          | -            |
| badgeBackgroundShadowColor    | 边徽标背景阴影颜色                                                                                                                                                                                                              | string                                                                                          | -            |
| badgeBackgroundShadowOffsetX  | 边徽标背景阴影 X 方向偏移                                                                                                                                                                                                       | number                                                                                          | -            |
| badgeBackgroundShadowOffsetY  | 边徽标背景阴影 Y 方向偏移                                                                                                                                                                                                       | number                                                                                          | -            |
| badgeBackgroundStroke         | 边徽标背景描边颜色                                                                                                                                                                                                              | string                                                                                          | -            |
| badgeBackgroundStrokeOpacity  | 边徽标背景描边透明度                                                                                                                                                                                                            | number &#124; string                                                                            | 1            |
| badgeBackgroundVisibility     | 边徽标背景是否可见                                                                                                                                                                                                              | `visible` &#124; `hidden`                                                                       | `visible`    |
| badgeBackgroundZIndex         | 边徽标背景渲染层级                                                                                                                                                                                                              | number                                                                                          | -            |
| badgeFill                     | 边徽标文字颜色                                                                                                                                                                                                                  | string                                                                                          | -            |
| badgeFontSize                 | 边徽标字体大小                                                                                                                                                                                                                  | number                                                                                          | 10           |
| badgeFontVariant              | 边徽标字体变种                                                                                                                                                                                                                  | `normal` &#124; `small-caps` &#124; string                                                      | `normal`     |
| badgeFontWeight               | 边徽标字体粗细                                                                                                                                                                                                                  | number &#124; string                                                                            | `normal`     |
| badgeLineHeight               | 边徽标行高                                                                                                                                                                                                                      | string &#124; number                                                                            | -            |
| badgeLineWidth                | 边徽标行宽                                                                                                                                                                                                                      | string &#124; number                                                                            | -            |
| badgeMaxLines                 | 边徽标文本最大行数                                                                                                                                                                                                              | number                                                                                          | 1            |
| badgeOffsetX                  | 边徽标在 x 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                          | 0            |
| badgeOffsetY                  | 边徽标在 y 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                          | 0            |
| badgePadding                  | 边徽标内边距                                                                                                                                                                                                                    | number &#124; number[]                                                                          | [2, 4, 2, 4] |
| badgePlacement                | 边徽标相对于边主图形的位置                                                                                                                                                                                                      | `prefix` &#124; `suffix`                                                                        | `suffix`     |
| badgeText                     | 边徽标文字内容                                                                                                                                                                                                                  | string                                                                                          | -            |
| badgeTextAlign                | 边徽标文本水平对齐方式                                                                                                                                                                                                          | `start` &#124; `center` &#124; `middle` &#124; `end` &#124; `left` &#124; `right`               | `left`       |
| badgeTextBaseline             | 边徽标文本基线                                                                                                                                                                                                                  | `top` &#124; `hanging` &#124; `middle` &#124; `alphabetic` &#124; `ideographic` &#124; `bottom` | `alphabetic` |
| badgeTextDecorationColor      | 边徽标文本装饰线颜色                                                                                                                                                                                                            | string                                                                                          | -            |
| badgeTextDecorationLine       | 边徽标文本装饰线                                                                                                                                                                                                                | string                                                                                          | -            |
| badgeTextDecorationStyle      | 边徽标文本装饰线样式                                                                                                                                                                                                            | `solid` &#124; `double` &#124; `dotted` &#124; `dashed` &#124; `wavy`                           | `solid`      |
| badgeTextOverflow             | 边徽标文本溢出处理方式                                                                                                                                                                                                          | `clip` &#124; `ellipsis` &#124; string                                                          | `clip`       |
| badgeVisibility               | 边徽标是否可见                                                                                                                                                                                                                  | `visible` &#124; `hidden`                                                                       | -            |
| badgeWordWrap                 | 边徽标文本是否自动换行，开启后超过badgeWordWrapWidth即会换行                                                                                                                                                                    | boolean                                                                                         | -            |
| badgeWordWrapWidth            | 边徽标文本换行宽度                                                                                                                                                                                                              | number                                                                                          | -            |
| badgeZIndex                   | 边徽标渲染层级                                                                                                                                                                                                                  | number                                                                                          | 1            |

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
      label: true, // 开启边标签展示
      labelText: 'labelText', // 边标签文字
      labelPlacement: 'center', // 边标签相对于边的位置
      labelFill: '#FF0000', // 边标签文字颜色
      labelOffsetY: 20, // 边标签在y轴方向上的偏移量
      halo: true, // 边光晕开启
      haloStroke: '#000', // 边光晕颜色
      haloStrokeOpacity: 0.2, // 边光晕透明度
      badgeText: 'badge', // 边徽标文本
      badgeFill: 'green', // 边徽标文本颜色
      badgeOffsetX: -20, // 边徽标在x轴方向上的偏移量
      badgeBackground: true, // 边徽标背景开启
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
        label: true, // 开启边标签展示
        labelText: 'labelText', // 边标签文字
        labelPlacement: 'center', // 边标签相对于边的位置
        labelFill: '#FF0000', // 边标签文字颜色
        labelOffsetY: 20, // 边标签在y轴方向上的偏移量
        halo: true, // 边光晕开启
        haloStroke: '#000', // 边光晕颜色
        haloStrokeOpacity: 0.2, // 边光晕透明度
        badgeText: 'badge', // 边徽标文本
        badgeFill: 'green', // 边徽标文本颜色
        badgeOffsetX: -20, // 边徽标在x轴方向上的偏移量
        badgeBackground: true, // 边徽标背景开启
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 起始箭头样式 startArrow

| 属性                                      | 描述                                                                                   | 类型                                                                                                                                                               | 默认值             |
| ----------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| startArrow                                | 边起始箭头是否显示                                                                     | boolean                                                                                                                                                            | false              |
| startArrowClass                           | 边起始箭头className                                                                    | string                                                                                                                                                             | -                  |
| startArrowCursor                          | 边起始箭头鼠标移入样式，[配置项](#cursor)                                              | string                                                                                                                                                             | `default`          |
| startArrowFill                            | 边起始箭头填充颜色                                                                     | string                                                                                                                                                             | 默认与边的颜色一致 |
| startArrowFillOpacity                     | 边起始箭头整体透明度                                                                   | number                                                                                                                                                             | 1                  |
| startArrowFillRule                        | 边起始箭头填充规则                                                                     | `nonzero` &#124; `evenodd`                                                                                                                                         | -                  |
| startArrowFilter                          | 边起始箭头滤镜                                                                         | string                                                                                                                                                             | -                  |
| startArrowIncreasedLineWidthForHitTesting | 边起始箭头大小较小时，可交互区域也随之变小，我们可以增大这个区域，让箭头更容易被拾取到 | number                                                                                                                                                             | 0                  |
| startArrowLineDash                        | 边起始箭头描边虚线配置                                                                 | number                                                                                                                                                             | 0                  |
| startArrowLineDashOffset                  | 边起始箭头描边虚线偏移量                                                               | number                                                                                                                                                             | 0                  |
| startArrowLineJoin                        | 边起始箭头描边连接处样式                                                               | `round` &#124; `bevel` &#124; `miter`                                                                                                                              | `round`            |
| startArrowOffset                          | 边起始箭头的偏移量                                                                     | number ｜0 ｜                                                                                                                                                      |
| startArrowOpacity                         | 边起始箭头透明度                                                                       | number                                                                                                                                                             | 1                  |
| startArrowShadowBlur                      | 边起始箭头阴影模糊程度                                                                 | number                                                                                                                                                             | -                  |
| startArrowShadowColor                     | 边起始箭头阴影颜色                                                                     | string                                                                                                                                                             | -                  |
| startArrowShadowOffsetX                   | 边起始箭头阴影X轴偏移量                                                                | number                                                                                                                                                             | 0                  |
| startArrowShadowOffsetY                   | 边起始箭头阴影Y轴偏移量                                                                | number                                                                                                                                                             | 0                  |
| startArrowSize                            | 边起始箭头大小                                                                         | number &#124; [number, number]                                                                                                                                     | -                  |
| startArrowSrc                             | 边起始箭头图片地址（传入图片地址即可以图片代替箭头）                                   | string                                                                                                                                                             | -                  |
| startArrowStroke                          | 边起始箭头描边颜色                                                                     | string                                                                                                                                                             | 默认与边的颜色一致 |
| startArrowStrokeOpacity                   | 边起始箭头描边透明度                                                                   | number                                                                                                                                                             | 1                  |
| startArrowTransform                       | 边起始箭头的旋转、缩放、倾斜或平移配置                                                 | string                                                                                                                                                             | -                  |
| startArrowTransformOrigin                 | 边起始箭头旋转与缩放中心，也称作变换中心                                               | string                                                                                                                                                             | center             |
| startArrowType                            | 边起始箭头类型                                                                         | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `vee`              |
| startArrowZIndex                          | 边起始箭头渲染层级                                                                     | number                                                                                                                                                             | -                  |

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
      label: true, // 开启边标签展示
      labelText: 'labelText', // 边标签文字
      labelPlacement: 'center', // 边标签相对于边的位置
      labelFill: '#FF0000', // 边标签文字颜色
      labelOffsetY: 20, // 边标签在y轴方向上的偏移量
      halo: true, // 边光晕开启
      haloStroke: '#000', // 边光晕颜色
      haloStrokeOpacity: 0.2, // 边光晕透明度
      badgeText: 'badge', // 边徽标文本
      badgeFill: 'green', // 边徽标文本颜色
      badgeOffsetX: -20, // 边徽标在x轴方向上的偏移量
      badgeBackground: true, // 边徽标背景开启
      startArrow: true, // 边起始箭头开启
      startArrowFill: 'yellow', // 边起始箭头填充颜色
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
        label: true, // 开启边标签展示
        labelText: 'labelText', // 边标签文字
        labelPlacement: 'center', // 边标签相对于边的位置
        labelFill: '#FF0000', // 边标签文字颜色
        labelOffsetY: 20, // 边标签在y轴方向上的偏移量
        halo: true, // 边光晕开启
        haloStroke: '#000', // 边光晕颜色
        haloStrokeOpacity: 0.2, // 边光晕透明度
        badgeText: 'badge', // 边徽标文本
        badgeFill: 'green', // 边徽标文本颜色
        badgeOffsetX: -20, // 边徽标在x轴方向上的偏移量
        badgeBackground: true, // 边徽标背景开启
        startArrow: true, // 边起始箭头开启
        startArrowFill: 'yellow', // 边起始箭头填充颜色
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 终点箭头样式 endArrow

| 属性                                    | 描述                                                                                   | 类型                                                                                                                                                               | 默认值             |
| --------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| endArrow                                | 边终点箭头是否显示                                                                     | boolean                                                                                                                                                            | false              |
| endArrowClass                           | 边终点箭头className                                                                    | string                                                                                                                                                             | -                  |
| endArrowCursor                          | 边终点箭头鼠标移入样式，[配置项](#cursor)                                              | string                                                                                                                                                             | `default`          |
| endArrowFill                            | 边终点箭头填充颜色                                                                     | string                                                                                                                                                             | 默认与边的颜色一致 |
| endArrowFillOpacity                     | 边终点箭头整体透明度                                                                   | number                                                                                                                                                             | 1                  |
| endArrowFillRule                        | 边终点箭头填充规则                                                                     | `nonzero` &#124; `evenodd`                                                                                                                                         | -                  |
| endArrowFilter                          | 边终点箭头滤镜                                                                         | string                                                                                                                                                             | -                  |
| endArrowIncreasedLineWidthForHitTesting | 边终点箭头大小较小时，可交互区域也随之变小，我们可以增大这个区域，让箭头更容易被拾取到 | number                                                                                                                                                             | 0                  |
| endArrowLineDash                        | 边终点箭头描边虚线配置                                                                 | number                                                                                                                                                             | 0                  |
| endArrowLineDashOffset                  | 边终点箭头描边虚线偏移量                                                               | number                                                                                                                                                             | 0                  |
| endArrowLineJoin                        | 边终点箭头描边连接处样式                                                               | `round` &#124; `bevel` &#124; `miter`                                                                                                                              | `round`            |
| endArrowOffset                          | 边终点箭头的偏移量                                                                     | number                                                                                                                                                             | 0                  |
| endArrowOpacity                         | 边终点箭头透明度                                                                       | number                                                                                                                                                             | 1                  |
| endArrowShadowBlur                      | 边终点箭头阴影模糊程度                                                                 | number                                                                                                                                                             | -                  |
| endArrowShadowColor                     | 边终点箭头阴影颜色                                                                     | string                                                                                                                                                             | -                  |
| endArrowShadowOffsetX                   | 边终点箭头阴影X轴偏移量                                                                | number                                                                                                                                                             | 0                  |
| endArrowShadowOffsetY                   | 边终点箭头阴影Y轴偏移量                                                                | number                                                                                                                                                             | 0                  |
| endArrowSize                            | 边终点箭头大小                                                                         | number &#124; [number, number]                                                                                                                                     | -                  |
| endArrowSrc                             | 边终点箭头图片地址（传入图片地址即可以图片代替箭头）                                   | string                                                                                                                                                             | -                  |
| endArrowStroke                          | 边终点箭头描边颜色                                                                     | string                                                                                                                                                             | 默认与边的颜色一致 |
| endArrowStrokeOpacity                   | 边终点箭头描边透明度                                                                   | number                                                                                                                                                             | 1                  |
| endArrowTransform                       | 边终点箭头的旋转、缩放、倾斜或平移配置                                                 | string                                                                                                                                                             | -                  |
| endArrowTransformOrigin                 | 边终点箭头旋转与缩放中心，也称作变换中心                                               | string                                                                                                                                                             | center             |
| endArrowType                            | 边终点箭头类型                                                                         | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `vee`              |
| endArrowZIndex                          | 边终点箭头渲染曾经                                                                     | number                                                                                                                                                             | -                  |

**示例：**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // 边颜色
      lineWidth: 2, // 边的宽度
      label: true, // 开启边标签展示
      labelText: 'labelText', // 边标签文字
      labelPlacement: 'center', // 边标签相对于边的位置
      labelFill: '#FF0000', // 边标签文字颜色
      labelOffsetY: 20, // 边标签在y轴方向上的偏移量
      halo: true, // 边光晕开启
      haloStroke: '#000', // 边光晕颜色
      haloStrokeOpacity: 0.2, // 边光晕透明度
      badgeText: 'badge', // 边徽标文本
      badgeFill: 'green', // 边徽标文本颜色
      badgeOffsetX: 20, // 边徽标在x轴方向上的偏移量
      badgePlacement: 'prefix', // 边徽标相对于边的位置
      badgeBackground: true, // 边徽标背景开启
      endArrow: true, // 边终点箭头开启
      endArrowFill: 'yellow', // 边终点箭头填充颜色
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        stroke: '#FF0000', // 边颜色
        lineWidth: 2, // 边的宽度
        label: true, // 开启边标签展示
        labelText: 'labelText', // 边标签文字
        labelPlacement: 'center', // 边标签相对于边的位置
        labelFill: '#FF0000', // 边标签文字颜色
        labelOffsetY: 20, // 边标签在y轴方向上的偏移量
        halo: true, // 边光晕开启
        haloStroke: '#000', // 边光晕颜色
        haloStrokeOpacity: 0.2, // 边光晕透明度
        badgeText: 'badge', // 边徽标文本
        badgeFill: 'green', // 边徽标文本颜色
        badgeOffsetX: 20, // 边徽标在x轴方向上的偏移量
        badgePlacement: 'prefix', // 边徽标相对于边的位置
        badgeBackground: true, // 边徽标背景开启
        endArrow: true, // 边终点箭头开启
        endArrowFill: 'yellow', // 边终点箭头填充颜色
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 自环边样式 loop

| 属性          | 描述                                                     | 类型                                                                                                                                                                                                               | 默认值                   |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| loop          | 是否启用自环边                                           | boolean                                                                                                                                                                                                            | true                     |
| loopClockwise | 指定是否顺时针绘制环                                     | boolean                                                                                                                                                                                                            | true                     |
| loopDist      | 从节点 keyShape 边缘到自环顶部的距离，用于指定自环的曲率 | number                                                                                                                                                                                                             | 默认为宽度或高度的最大值 |
| loopPlacement | 边的位置                                                 | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' &#124; 'left-top' &#124; 'left-bottom' &#124; 'right-top' &#124; 'right-bottom' &#124; 'top-left' &#124; 'top-right' &#124; 'bottom-left' &#124; 'bottom-right' | 'top'                    |

**示例：**

```js {4-6}
const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [
      { source: 'node1', target: 'node1', id: 'left' },
      { source: 'node2', target: 'node2', id: 'right' },
    ],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      loopPlacement: (d) => d.id, // 根据边的 配置 设置自环的位置
      endArrow: true, // 边终点箭头开启
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
        { id: 'node1', style: { x: 60, y: 40 } },
        { id: 'node2', style: { x: 180, y: 40 } },
      ],
      edges: [
        { source: 'node1', target: 'node1', id: 'left' },
        { source: 'node2', target: 'node2', id: 'right' },
      ],
    },
    node: {
      style: { fill: '#1783FF' },
    },
    edge: {
      style: {
        loopPlacement: (d) => d.id, // 根据边的 配置 设置自环的位置
        endArrow: true, // 边终点箭头开启
      },
    },
  },
  { width: 240, height: 100 },
);
```

## State

在一些交互行为中，比如点击选中一个边或鼠标悬停激活一个边，仅仅是在该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的图元素样式，以响应该图元素状态的变化。

G6 提供了几种内置的状态，包括选中（selected）、高亮（highlight）、激活（active）、不活跃（inactive）和禁用（disabled）。此外，它还支持自定义状态，以满足更特定的需求。对于每个状态，开发者可以定义一套样式规则，这些规则会覆盖元素的默认样式。

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ebBlTpKu2WUAAAAAAAAAAAAADmJ7AQ/original" />

数据结构如下：

```typescript
type EdgeState = {
  [state: string]: EdgeStyle;
};
```

例如，当边处于 `focus` 状态时，可以为其添加一个宽度为 6 且颜色为黄色的光晕。

```js {8-11}
const graph = new Graph({
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
});
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

## Animation

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

你可以参考 [动画范式](/manual/animation/animation#动画范式) 使用动画语法来配置边，如：

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

## Palette

定义边的色板，即预定义颜色池，并根据规则进行分配，将颜色映射到 `stroke` 属性。

> 有关色板的定义，请参考 [色板](/manual/theme/palette)。

| 属性   | 描述                                                                | 类型                              | 默认值  |
| ------ | ------------------------------------------------------------------- | --------------------------------- | ------- |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` &#124; `value`            | `group` |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string &#124; ((datum) => string) | `id`    |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string &#124; string[]            | -       |
| invert | 是否反转色板                                                        | boolean                           | false   |

如将一组数据按 `direction` 字段分配节点颜色，使得同类别的节点颜色相同：

```js {23}
const graph = new Graph({
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
});
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
