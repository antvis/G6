---
title: 组合配置项
---

本文介绍组合属性配置，配置位置如下：

```js {6-10}
import { Graph } from '@antv/g6';

const graph = new Graph({
  // 其他配置...
  combo: {
    type: 'circle', // 组合类型
    style: {}, // 组合样式
    state: {}, // 状态样式
    palette: {}, // 色板配置
    animation: {}, // 动画配置
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

```typescript
const graph = new Graph({
  // 其他配置...
  combo: {
    type: 'circle',
  },
});
```

可选值有：

- `circle`：[圆形组合](/manual/element/combo/build-in/circle)
- `rect`：[矩形组合](/manual/element/combo/build-in/rect)

## Style

在此处定义组合的样式，包括颜色、大小等。

```typescript
const graph = new Graph({
  // 其他配置...
  combo: {
    style: {},
  },
});
```

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：组合的主图形，表示组合的主要形状，例如圆形、矩形等；
- `halo` ：主图形周围展示的光晕效果的图形；
- `label` ：文本标签，通常用于展示组合的名称或描述；

以下样式配置将按原子图形依次说明：

### 展开时样式

组合展开时的主图形样式

| 属性                            | 描述                                                                                                      | 类型                                                                            | 默认值    | 必选 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- | ---- |
| collapsed                       | 当前组合是否收起                                                                                          | boolean                                                                         | false     |      |
| cursor                          | 组合鼠标移入样式，[配置项](#cursor)                                                                       | string                                                                          | default   |      |
| fill                            | 组合填充色                                                                                                | string                                                                          | `#99ADD1` |      |
| fillOpacity                     | 组合填充色透明度                                                                                          | number \| string                                                                | 0.04      |      |
| increasedLineWidthForHitTesting | 当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让“细线”更容易被拾取到                 | number                                                                          | 0         |      |
| lineCap                         | 组合描边端点样式                                                                                          | `round` \| `square` \| `butt`                                                   | `butt`    |      |
| lineDash                        | 组合描边虚线样式                                                                                          | number[]                                                                        | -         |      |
| lineDashOffset                  | 组合描边虚线偏移量                                                                                        | number                                                                          | -         |      |
| lineJoin                        | 组合描边连接处样式                                                                                        | `round` \| `bevel` \| `miter`                                                   | `miter`   |      |
| lineWidth                       | 组合描边宽度                                                                                              | number                                                                          | 1         |      |
| opacity                         | 组合透明度                                                                                                | number \| string                                                                | 1         |      |
| shadowBlur                      | 组合阴影模糊度                                                                                            | number                                                                          | -         |      |
| shadowColor                     | 组合阴影颜色                                                                                              | string                                                                          | -         |      |
| shadowOffsetX                   | 组合阴影在 x 轴方向上的偏移量                                                                             | number \| string                                                                | -         |      |
| shadowOffsetY                   | 组合阴影在 y 轴方向上的偏移量                                                                             | number \| string                                                                | -         |      |
| shadowType                      | 组合阴影类型                                                                                              | `inner` \| `outer`                                                              | `outer`   |      |
| stroke                          | 组合描边色                                                                                                | string                                                                          | `#99add1` |      |
| strokeOpacity                   | 组合描边色透明度                                                                                          | number \| string                                                                | 1         |      |
| visibility                      | 组合是否可见                                                                                              | `visible` \| `hidden`                                                           | `visible` |      |
| x                               | 组合 x 坐标                                                                                               | number                                                                          | 0         |      |
| y                               | 组合 y 坐标                                                                                               | number                                                                          | 0         |      |
| z                               | 组合 z 坐标                                                                                               | number                                                                          | 0         |      |
| zIndex                          | 组合渲染层级                                                                                              | number                                                                          | 0         |      |
| `{styleProps}`                  | 更多图形配置，参考 [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) 配置项 | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -         |      |

#### Cursor

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

**示例：**

```js {5-7}
const graph = new Graph({
  // 其他配置...
  combo: {
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
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [{ id: 'combo1' }],
    },
    combo: {
      style: { fill: '#1783FF', stroke: '#000', lineWidth: 2 },
    },
  },
  { width: 240, height: 100 },
);
```

### 收起时样式

当 `collapsed` 为 `true` 时生效

| 属性                                     | 描述                                                                                                      | 类型                                                                            | 默认值                             | 必选 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- | ---- |
| collapsedCursor                          | 组合收起时的鼠标移入样式，[配置项](#cursor)                                                               | string                                                                          | 默认与展开时的 cursor 一致         |      |
| collapsedFill                            | 组合收起时的填充色                                                                                        | string                                                                          | 默认与展开时的 fill 一致           |      |
| collapsedFillOpacity                     | 组合收起时的填充色透明度                                                                                  | number \| string                                                                | 1                                  |      |
| collapsedIncreasedLineWidthForHitTesting | 组合收起时，当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让“细线”更容易被拾取到     | number                                                                          | 0                                  |      |
| collapsedLineCap                         | 组合收起时的描边端点样式                                                                                  | `round` \| `square` \| `butt`                                                   | 默认与展开时的 lineCap 一致        |      |
| collapsedLineDash                        | 组合收起时的描边虚线样式                                                                                  | number[]                                                                        | 默认与展开时的 lineDash 一致       |      |
| collapsedLineDashOffset                  | 组合收起时的描边虚线偏移量                                                                                | number                                                                          | 默认与展开时的 lineDashOffset 一致 |      |
| collapsedLineJoin                        | 组合收起时的描边连接处样式                                                                                | `round` \| `bevel` \| `miter`                                                   | 默认与展开时的 lineJoin 一致       |      |
| collapsedLineWidth                       | 组合收起时的描边宽度                                                                                      | number                                                                          | 默认与展开时的 lineWidth 一致      |      |
| collapsedMarker                          | 组合收起时是否显示标记，[配置项](#收起时标记样式collapsedMarker)                                          | boolean                                                                         | true                               |      |
| collapsedOpacity                         | 组合收起时的透明度                                                                                        | number \| string                                                                | 默认与展开时的 opacity 一致        |      |
| collapsedShadowBlur                      | 组合收起时的阴影模糊度                                                                                    | number                                                                          | 默认与展开时的 shadowBlur 一致     |      |
| collapsedShadowColor                     | 组合收起时的阴影颜色                                                                                      | string                                                                          | 默认与展开时的 shadowColor 一致    |      |
| collapsedShadowOffsetX                   | 组合收起时的阴影在 x 轴方向上的偏移量                                                                     | number \| string                                                                | 默认与展开时的 shadowOffsetX 一致  |      |
| collapsedShadowOffsetY                   | 组合收起时的阴影在 y 轴方向上的偏移量                                                                     | number \| string                                                                | 默认与展开时的 shadowOffsetY 一致  |      |
| collapsedShadowType                      | 组合收起时的阴影类型                                                                                      | `inner` \| `outer`                                                              | 默认与展开时的 shadowType 一致     |      |
| collapsedSize                            | 组合收起时的大小                                                                                          | number &#124; [number, number] &#124; [number, number, number]                  | 32                                 |      |
| collapsedStroke                          | 组合收起时的描边色                                                                                        | string                                                                          | 默认与展开时的 stroke 一致         |      |
| collapsedStrokeOpacity                   | 组合收起时的描边色透明度                                                                                  | number \| string                                                                | 默认与展开时的 strokeOpacity 一致  |      |
| collapsedVisibility                      | 组合收起时是否可见                                                                                        | `visible` \| `hidden`                                                           | 默认与展开时的 visibility 一致     |      |
| `collapsed{styleProps}`                  | 更多图形配置，参考 [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) 配置项 | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -                                  |      |

**示例：**

```js {5-7}
const graph = new Graph({
  // 其他配置...
  combo: {
    style: {
      collapsedFill: '#1783FF', // 填充色
      collapsedStroke: '#000', // 描边色
      collapsedLineWidth: 2, // 描边宽度
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [{ id: 'combo1', style: { collapsed: true } }],
    },
    combo: {
      style: { collapsedFill: '#1783FF', collapsedStroke: '#000', collapsedLineWidth: 2 },
    },
  },
  { width: 240, height: 100 },
);
```

### 收起时标记样式

当 `collapsedMarker` 为 `true` 时生效

| 属性                          | 描述                                                                                                                                                                                                                                                          | 类型                                                                                                                               | 默认值        | 必选 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- |
| collapsedMarkerType           | 组合收起时显示的标记类型 <br> - `'child-count'`: 子元素数量（包括 Node 和 Combo）<br>- `'descendant-count'`: 后代元素数量（包括 Node 和 Combo）<br>- `'node-count'`: 后代元素数量（只包括 Node）<br> - `(children: NodeLikeData[]) => string`: 自定义处理逻辑 | `child-count` &#124; `descendant-count` &#124; `node-count` &#124; ((children: NodeData &#124; ComboData[]) => string)             | `child-count` |      |
| collapsedMarkerFill           | 图标文字颜色                                                                                                                                                                                                                                                  | string                                                                                                                             | #fff          |      |
| collapsedMarkerFillOpacity    | 图标文字颜色透明度                                                                                                                                                                                                                                            | number                                                                                                                             | 1             |      |
| collapsedMarkerFontSize       | 图标字体大小                                                                                                                                                                                                                                                  | number                                                                                                                             | 12            |      |
| collapsedMarkerFontWeight     | 图标字体粗细                                                                                                                                                                                                                                                  | number &#124; string                                                                                                               | `normal`      |      |
| collapsedMarkerRadius         | 图标圆角半径                                                                                                                                                                                                                                                  | number                                                                                                                             | 0             |      |
| collapsedMarkerSrc            | 图片来源。其优先级高于 `collapsedMarkerText`                                                                                                                                                                                                                  | string                                                                                                                             | -             |      |
| collapsedMarkerText           | 图标文字                                                                                                                                                                                                                                                      | string                                                                                                                             | -             |      |
| collapsedMarkerTextAlign      | 图标文字水平对齐方式                                                                                                                                                                                                                                          | `center` \| `end` \| `left` \| `right` \| `start`                                                                                  | `center`      |      |
| collapsedMarkerTextBaseline   | 图标文字对齐基线                                                                                                                                                                                                                                              | `alphabetic` \| `bottom` \| `hanging` \| `ideographic` \| `middle` \| `top`                                                        | `middle`      |      |
| collapsedMarkerWidth          | 图标宽度                                                                                                                                                                                                                                                      | number                                                                                                                             | -             |      |
| collapsedMarkerHeight         | 图标高度                                                                                                                                                                                                                                                      | number                                                                                                                             | -             |      |
| collapsedMarkerZIndex         | 图标层级                                                                                                                                                                                                                                                      | number                                                                                                                             | 1             |      |
| `collapsedMarker{StyleProps}` | 更多图标样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)、[ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) 配置项。例如 collapsedMarkerFontSize 代表文字图标的字体大小                                               | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) | -             |      |

**示例：**

```js {5-6}
const graph = new Graph({
  // 其他配置...
  combo: {
    style: {
      collapsedMarkerFill: '#1783FF', // 填充色
      collapsedMarkerFontSize: 30, // 图标字体大小
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1' },
        { id: 'node2', combo: 'combo1' },
      ],
      combos: [{ id: 'combo1', style: { collapsed: true } }],
    },
    combo: {
      style: {
        collapsedMarkerFill: '#1783FF',
        collapsedMarkerFontSize: 30,
      },
    },
  },
  { width: 240, height: 100 },
);
```

### 标签样式

标签用于显示组合的文本信息：

| 属性                     | 描述                                                                                                                         | 类型                                                                                  | 默认值    | 必选 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------- | ---- |
| label                    | 是否显示组合标签                                                                                                             | boolean                                                                               | true      |      |
| labelCursor              | 鼠标移入组合标签时显示的样式，[配置项](#cursor)                                                                              | string                                                                                | `default` |      |
| labelFill                | 组合标签文字颜色                                                                                                             | string                                                                                | #000      |      |
| labelFillOpacity         | 组合标签文字颜色的透明度                                                                                                     | number                                                                                | 1         |      |
| labelFontFamily          | 组合标签字体族                                                                                                               | string                                                                                | -         |      |
| labelFontSize            | 组合标签字体大小                                                                                                             | number                                                                                | 12        |      |
| labelFontStyle           | 组合标签字体样式                                                                                                             | `normal` \| `italic` \| `oblique`                                                     | -         |      |
| labelFontVariant         | 组合标签字体变种                                                                                                             | `normal` \| `small-caps` \| string                                                    | -         |      |
| labelFontWeight          | 组合标签字体粗细                                                                                                             | `normal` \| `bold` \| `bolder` \| `lighter` \| number                                 | 400       |      |
| labelLeading             | 行间距                                                                                                                       | number                                                                                | 0         |      |
| labelLetterSpacing       | 组合标签字间距                                                                                                               | number \| string                                                                      | -         |      |
| labelLineHeight          | 组合标签行高                                                                                                                 | number \| string                                                                      | -         |      |
| labelMaxLines            | 组合标签最大行数                                                                                                             | number                                                                                | 1         |      |
| labelMaxWidth            | 组合标签最大宽度，[配置项](#labelmaxwidth)                                                                                   | number \| string                                                                      | `200%`    |      |
| labelOffsetX             | 组合标签在 x 轴方向上的偏移量                                                                                                | number                                                                                | 0         |      |
| labelOffsetY             | 组合标签在 y 轴方向上的偏移量                                                                                                | number                                                                                | 0         |      |
| labelPadding             | 组合标签内边距                                                                                                               | number \| number[]                                                                    | 0         |      |
| labelPlacement           | 组合标签相对于组合主图形的位置，[配置项](#labelplacement)                                                                    | string                                                                                | `bottom`  |      |
| labelText                | 组合标签文字内容                                                                                                             | string                                                                                | -         |      |
| labelTextAlign           | 组合标签文本水平对齐方式                                                                                                     | `start` \| `center` \| `middle` \| `end` \| `left` \| `right'               \| `left` |           |      |
| labelTextBaseline        | 组合标签文本基线                                                                                                             | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`           | -         |      |
| labelTextDecorationColor | 组合标签文本装饰线颜色                                                                                                       | string                                                                                | -         |      |
| labelTextDecorationLine  | 组合标签文本装饰线                                                                                                           | string                                                                                | -         |      |
| labelTextDecorationStyle | 组合标签文本装饰线样式                                                                                                       | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                 | -         |      |
| labelTextOverflow        | 组合标签文本溢出处理方式                                                                                                     | `clip` \| `ellipsis` \| string                                                        | -         |      |
| labelTextPath            | 组合标签文本路径                                                                                                             | Path                                                                                  | -         |      |
| labelWordWrap            | 组合标签是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行                                           | boolean                                                                               | false     |      |
| labelZIndex              | 组合标签渲染层级                                                                                                             | number                                                                                | 0         |      |
| `label{StyleProps}`      | 更多标签样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值。比如 labelOpacity 代表标签透明度 | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                          | -         |      |

#### LabelPlacement

可选值有：`left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

开启自动折行 `labelWordWrap` 后，超出该宽度则换行:

- string: 表示以相对于组合元素宽度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过组合宽度的一半
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

```js {5-10}
const graph = new Graph({
  // 其他配置
  combo: {
    style: {
      label: true, // 是否显示组合标签
      labelText: '组合名称', // 标签文字内容
      labelFill: '#000', // 标签文字颜色
      labelFontSize: 12, // 标签字体大小
      labelFontWeight: 'normal', // 标签字体粗细
      labelPlacement: 'bottom', // 标签相对于组合主图形的位置
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [
        {
          id: 'combo1',
          style: {
            label: true,
            labelText: '组合名称',
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

标签背景用于显示组合标签的背景：

| 属性                          | 描述                                                                                                                                           | 类型                                                         | 默认值       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| labelBackground               | 组合标签背景是否显示                                                                                                                           | boolean                                                      | false        |
| labelBackgroundCursor         | 组合标签背景鼠标移入样式，[配置项](#cursor)                                                                                                    | string                                                       | `default`    |
| labelBackgroundFill           | 组合标签背景填充色                                                                                                                             | string                                                       | #000         |
| labelBackgroundFillOpacity    | 组合标签背景透明度                                                                                                                             | number                                                       | 0.75         |
| labelBackgroundHeight         | 组合标签背景高度                                                                                                                               | string \| number                                             | -            |
| labelBackgroundLineDash       | 组合标签背景虚线配置                                                                                                                           | number \| string \|(number \| string )[]                     | -            |
| labelBackgroundLineDashOffset | 组合标签背景虚线偏移量                                                                                                                         | number                                                       | -            |
| labelBackgroundLineWidth      | 组合标签背景描边线宽                                                                                                                           | number                                                       | -            |
| labelBackgroundPadding        | 组合标签背景内间距                                                                                                                             | number \| number[]                                           | [2, 4, 2, 4] |
| labelBackgroundRadius         | 组合标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充                                 | number \| number[]                                           | 0            |
| labelBackgroundShadowBlur     | 组合标签背景阴影模糊程度                                                                                                                       | number                                                       | -            |
| labelBackgroundShadowColor    | 组合标签背景阴影颜色                                                                                                                           | string                                                       | -            |
| labelBackgroundShadowOffsetX  | 组合标签背景阴影 X 方向偏移                                                                                                                    | number                                                       | -            |
| labelBackgroundShadowOffsetY  | 组合标签背景阴影 Y 方向偏移                                                                                                                    | number                                                       | -            |
| labelBackgroundStroke         | 组合标签背景描边颜色                                                                                                                           | string                                                       | -            |
| labelBackgroundStrokeOpacity  | 组合标签背景描边透明度                                                                                                                         | number \| string                                             | 1            |
| labelBackgroundVisibility     | 组合标签背景是否可见                                                                                                                           | `visible` \| `hidden`                                        | -            |
| labelBackgroundZIndex         | 组合标签背景渲染层级                                                                                                                           | number                                                       | 1            |
| `labelBackground{StyleProps}` | 更多标签背景样式配置，参考 [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) 属性值。例如 labelBackgroundOpacity 代表标签背景透明度 | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) | -            |

**示例：**

```js {5-8}
const graph = new Graph({
  // 其他配置...
  combo: {
    style: {
      labelBackground: true, // 是否显示组合标签背景
      labelBackgroundFill: '#000', // label背景填充
      labelBackgroundRadius: 10, // label背景圆角
      labelBackgroundFillOpacity: 0.5, // label背景填充色透明度
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [
        {
          id: 'combo1',
          style: {
            label: true,
            labelText: '组合名称',
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

| 属性               | 描述                                                                                                                                           | 类型                                                                  | 默认值                       | 必选 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------- | ---- |
| halo               | 是否显示组合光晕                                                                                                                               | boolean                                                               | false                        |      |
| haloCursor         | 组合光晕鼠标移入样式，[配置项](#cursor)                                                                                                        | string                                                                | `default`                    |      |
| haloDraggable      | 组合光晕是否允许拖拽                                                                                                                           | boolean                                                               | true                         |      |
| haloDroppable      | 组合光晕是否允许接收被拖拽的元素                                                                                                               | boolean                                                               | false                        |      |
| haloFill           | 光晕填充色                                                                                                                                     | string                                                                | 与主图形的填充色 `fill` 一致 |      |
| haloFillRule       | 组合光晕填充规则                                                                                                                               | `nonzero` \| `evenodd`                                                | -                            |      |
| haloFilter         | 组合光晕滤镜                                                                                                                                   | string                                                                | -                            |      |
| haloLineWidth      | 组合光晕描边宽度                                                                                                                               | number                                                                | 12                           |      |
| haloPointerEvents  | 组合光晕效果是否响应指针事件，[配置项](#pointerevents)                                                                                         | string                                                                | `none`                       |      |
| haloStroke         | 组合光晕描边色，**此属性用于设置组合周围光晕的颜色，帮助突出显示组合**                                                                         | string                                                                | `#99add1`                    |      |
| haloStrokeOpacity  | 组合光晕描边色透明度                                                                                                                           | number                                                                | 0.25                         |      |
| haloVisibility     | 组合光晕可见性                                                                                                                                 | `visible` \| `hidden`                                                 | `visible`                    |      |
| haloZIndex         | 组合光晕渲染层级                                                                                                                               | number                                                                | -1                           |      |
| `halo{StyleProps}` | 更多光晕样式配置，参考 [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) 配置项。例如 haloFillOpacity 代表光晕填充色透明度 | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                            |      |

#### PointerEvents

可选值有：
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

**示例：**

```js {5-7}
const graph = new Graph({
  // 其他配置...
  combo: {
    style: {
      halo: true, // 是否显示组合光晕
      haloStroke: '#FF0000', // 组合光晕描边色
      haloLineWidth: 10, // 组合光晕描边宽度
    },
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', combo: 'combo1' }],
      combos: [{ id: 'combo1' }],
    },
    combo: {
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
| icon                    | 是否显示组合图标                    | boolean                                                                     | true             |
| iconFill                | 组合图标文字颜色                    | string                                                                      | -                |
| iconFontFamily          | 组合图标字体族                      | string                                                                      | -                |
| iconFontSize            | 组合图标字体大小                    | number                                                                      | 16               |
| iconFontStyle           | 组合图标字体样式                    | `normal` \| `italic` \| `oblique`                                           | `normal`         |
| iconFontVariant         | 组合图标字体变种                    | `normal` \| `small-caps` \| string                                          | `normal`         |
| iconFontWeight          | 组合图标字体粗细                    | number \| string                                                            | `normal`         |
| iconHeight              | 组合图标高度                        | number                                                                      | 主图形高度的一半 |
| iconLetterSpacing       | 组合图标文本字间距                  | number \| string                                                            | -                |
| iconLineHeight          | 组合图标文本行高                    | number \| string                                                            | -                |
| iconMaxLines            | 组合图标文本最大行数                | number                                                                      | 1                |
| iconRadius              | 组合图标圆角半径                    | number                                                                      | 0                |
| iconSrc                 | 组合图片来源。其优先级高于 iconText | string                                                                      | -                |
| iconText                | 组合图标文字                        | string                                                                      | -                |
| iconTextAlign           | 组合图标文本水平对齐方式            | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`           |
| iconTextBaseline        | 组合图标文本基线                    | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `alphabetic`     |
| iconTextDecorationColor | 组合图标文本装饰线颜色              | string                                                                      | -                |
| iconTextDecorationLine  | 组合图标文本装饰线                  | string                                                                      | -                |
| iconTextDecorationStyle | 组合图标文本装饰线样式              | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`          |
| iconTextOverflow        | 组合图标文本溢出处理方式            | `clip` \| `ellipsis` \| string                                              | `clip`           |
| iconWidth               | 组合图标宽度                        | number                                                                      | 主图形宽度的一半 |
| iconWordWrap            | 组合图标文本是否自动换行            | boolean                                                                     | -                |

**示例：**

```js {5-9}
const graph = new Graph({
  // 其他配置...
  combo: {
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
    autoFit: 'center',
    data: {
      combos: [{ id: 'combo1' }],
    },
    combo: {
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

```js {4-7}
const graph = new Graph({
  combo: {
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
