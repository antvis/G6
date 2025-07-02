---
title: 边通用配置项
order: 1
---

本文介绍内置边通用属性配置。

## EdgeOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line', // 边类型
    style: {}, // 边样式
    state: {}, // 状态样式
    palette: {}, // 色板配置
    animation: {}, // 动画配置
  },
});
```

| 属性      | 描述                                   | 类型                    | 默认值 | 必选 |
| --------- | -------------------------------------- | ----------------------- | ------ | ---- |
| type      | 边类型，内置边类型名称或自定义边的名称 | [Type](#type)           | `line` |      |
| style     | 边样式配置，包括颜色、粗细等           | [Style](#style)         | -      |      |
| state     | 不同状态下的样式配置                   | [State](#state)         | -      |      |
| palette   | 定义边的色板，用于根据不同数据映射颜色 | [Palette](#palette)     | -      |      |
| animation | 定义边的动画效果                       | [Animation](#animation) | -      |      |

## Type

指定边类型，内置边类型名称或自定义边的名称。默认为 `line`（直线边）。**⚠️ 注意**：这里决定了主图形的形状。

```js {3}
const graph = new Graph({
  edge: {
    type: 'polyline',
  },
});
```

**⚠️ 动态配置说明**：`type` 属性同样支持动态配置，可以根据边数据动态选择边类型：

```js
const graph = new Graph({
  edge: {
    // 静态配置
    type: 'line',

    // 动态配置 - 箭头函数形式
    type: (datum) => datum.data.edgeType || 'line',

    // 动态配置 - 普通函数形式（可访问 graph 实例）
    type: function (datum) {
      console.log(this); // graph 实例
      return datum.data.importance > 5 ? 'polyline' : 'line';
    },
  },
});
```

可选值有：

- `line`：[直线边](/manual/element/edge/line)
- `polyline`：[折线边](/manual/element/edge/polyline)
- `cubic`：[三次贝塞尔曲线边](/manual/element/edge/cubic)
- `cubic-horizontal`：[水平三次贝塞尔曲线边](/manual/element/edge/cubic-horizontal)
- `cubic-vertical`：[垂直三次贝塞尔曲线边](/manual/element/edge/cubic-vertical)
- `quadratic`：[二次贝塞尔曲线边](/manual/element/edge/quadratic)

## Style

定义边的样式，包括颜色、粗细等。

```js {3}
const graph = new Graph({
  edge: {
    style: {},
  },
});
```

**⚠️ 动态配置说明**：以下所有样式属性都支持动态配置，即可以传入函数来根据边数据动态计算属性值：

```js
const graph = new Graph({
  edge: {
    style: {
      // 静态配置
      stroke: '#1783FF',

      // 动态配置 - 箭头函数形式
      lineWidth: (datum) => (datum.data.isImportant ? 3 : 1),

      // 动态配置 - 普通函数形式（可访问 graph 实例）
      lineDash: function (datum) {
        console.log(this); // graph 实例
        return datum.data.type === 'dashed' ? [5, 5] : [];
      },

      // 嵌套属性也支持动态配置
      labelText: (datum) => `边: ${datum.id}`,
      endArrow: (datum) => datum.data.hasArrow,
    },
  },
});
```

其中 `datum` 参数为边数据对象 (`EdgeData`)，包含边的所有数据信息。

一个完整的边由以下几部分构成：

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：边的主图形，表示边的主要路径，例如直线、曲线等；
- `label` ：文本标签，通常用于展示边的名称或描述；
- `badge` ：边上的徽标；
- `halo` ：主图形周围展示的光晕效果的图形；
- `startArrow` ：边起始端的箭头；
- `endArrow` ：边结束端的箭头。

以下样式配置将按原子图形依次说明：

### 主图形样式

主图形是边的核心部分，定义了边的基本路径和外观。以下是常见的配置场景：

#### 基础样式配置

设置边的基本外观：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#5B8FF9', // 蓝色边
      lineWidth: 2, // 边宽度
    },
  },
});

graph.render();
```

#### 虚线样式

创建带虚线样式的边：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#F5222D',
      lineWidth: 2,
      lineDash: [6, 4], // 虚线样式
      lineDashOffset: 0,
    },
  },
});

graph.render();
```

#### 阴影效果

为边添加阴影效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#722ED1',
      lineWidth: 3,
      shadowColor: 'rgba(114, 46, 209, 0.3)',
      shadowBlur: 8,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    },
  },
});

graph.render();
```

以下为完整的主图形样式配置：

| 属性                            | 描述                                                                                      | 类型                  | 默认值    | 必选 |
| ------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- | --------- | ---- |
| cursor                          | 边鼠标移入样式，[配置项](#cursor)                                                         | string                | `default` |      |
| increasedLineWidthForHitTesting | 当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让"细线"更容易被拾取到 | number                | 0         |      |
| lineDash                        | 边虚线样式                                                                                | number[]              | -         |      |
| lineDashOffset                  | 边虚线偏移量                                                                              | number                | 0         |      |
| lineWidth                       | 边宽度                                                                                    | number                | 1         |      |
| opacity                         | 边透明度                                                                                  | number \| string      | 1         |      |
| pointerEvents                   | 边如何响应指针事件，[配置项](#pointerevents)                                              | string                | `auto`    |      |
| shadowBlur                      | 边阴影模糊度                                                                              | number                | -         |      |
| shadowColor                     | 边阴影颜色                                                                                | string                | -         |      |
| shadowOffsetX                   | 边阴影在 x 轴方向上的偏移量                                                               | number \| string      | -         |      |
| shadowOffsetY                   | 边阴影在 y 轴方向上的偏移量                                                               | number \| string      | -         |      |
| shadowType                      | 边阴影类型                                                                                | `inner` \| `outer`    | `outer`   |      |
| sourcePort                      | 边起始连接的连接桩                                                                        | string                | -         |      |
| stroke                          | 边颜色                                                                                    | string                | `#000`    |      |
| strokeOpacity                   | 边颜色透明度                                                                              | number \| string      | 1         |      |
| targetPort                      | 边终点连接的连接桩                                                                        | string                | -         |      |
| transform                       | transform 属性允许你旋转、缩放、倾斜或平移给定边                                          | string                | -         |      |
| transformOrigin                 | 旋转与缩放中心，也称作变换中心                                                            | string                | -         |      |
| visibility                      | 边是否可见                                                                                | `visible` \| `hidden` | `visible` |      |
| zIndex                          | 边渲染层级                                                                                | number                | 1         |      |

#### PointerEvents

`pointerEvents` 属性控制图形如何响应交互事件，可参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)。

可选值有：`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

简而言之，`stroke` 和 `visibility` 都可以独立或组合影响拾取判定行为。目前支持以下关键词：

- **`auto`**：默认值，等同于 `visiblepainted`
- **`none`**：永远不会成为响应事件的目标
- **`visiblepainted`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形描边区域触发同时 `stroke` 取非 `none` 的值
- **`visiblestroke`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形描边区域触发，不受 `stroke` 取值的影响
- **`visible`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形描边区域触发，不受 `stroke` 取值的影响
- **`painted`**：满足以下条件才会响应事件：
  - 在图形描边区域触发同时 `stroke` 取非 `none` 的值
  - 不受 `visibility` 取值的影响
- **`stroke`**：满足以下条件才会响应事件：
  - 在图形描边区域触发，不受 `stroke` 取值的影响
  - 不受 `visibility` 取值的影响
- **`all`**：只要进入图形的描边区域就会响应事件，不会受 `stroke`、`visibility` 的取值影响

**使用示例：**

```js
// 示例1：只有描边区域响应事件
const graph = new Graph({
  edge: {
    style: {
      stroke: '#000',
      lineWidth: 2,
      pointerEvents: 'stroke', // 只有描边响应事件
    },
  },
});

// 示例2：完全不响应事件
const graph = new Graph({
  edge: {
    style: {
      pointerEvents: 'none', // 边不响应任何事件
    },
  },
});
```

#### Cursor

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

### 标签样式

标签用于显示边的文本信息，支持多种样式配置和布局方式。以下是常见的使用场景：

#### 基础文本标签

最简单的文本标签配置：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: '边标签',
      labelFill: '#262626',
      labelFontSize: 12,
      labelPlacement: 'center',
    },
  },
});

graph.render();
```

#### 多行文本标签

当文本较长时，可以设置自动换行：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: '这是一个很长的边标签需要换行显示',
      labelWordWrap: true,
      labelMaxWidth: '200%',
      labelMaxLines: 2,
      labelTextOverflow: 'ellipsis',
      labelFill: '#434343',
      labelPlacement: 'center',
      labelTextAlign: 'center',
    },
  },
});

graph.render();
```

#### 带背景的标签

为标签添加背景，提高可读性：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: '重要连接',
      labelBackground: true,
      labelBackgroundFill: 'rgba(250, 140, 22, 0.1)',
      labelBackgroundRadius: 6,
      labelPadding: [4, 8],
      labelFill: '#D4380D',
      labelFontWeight: 'bold',
      labelPlacement: 'center',
    },
  },
});

graph.render();
```

#### 自动旋转标签

标签可以自动旋转以保持与边方向一致：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 30 } },
      { id: 'node2', style: { x: 180, y: 90 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: '自动旋转',
      labelAutoRotate: true, // 自动旋转
      labelFill: '#1890FF',
      labelFontWeight: 'bold',
      labelPlacement: 'center',
    },
  },
});

graph.render();
```

以下为完整的标签样式配置：

| 属性                     | 描述                                                                             | 类型                                                                        | 默认值    | 必选 |
| ------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | ---- |
| label                    | 边标签是否显示                                                                   | boolean                                                                     | true      |      |
| labelAutoRotate          | 边标签是否自动旋转，保持与边的方向一致                                           | boolean                                                                     | true      |      |
| labelCursor              | 鼠标移入边标签时显示的样式，[配置项](#cursor)                                    | string                                                                      | `default` |      |
| labelFill                | 边标签文字颜色                                                                   | string                                                                      | -         |      |
| labelFontFamily          | 边标签字体族                                                                     | string                                                                      | -         |      |
| labelFontSize            | 边标签字体大小                                                                   | number                                                                      | 12        |      |
| labelFontStyle           | 边标签字体样式                                                                   | `normal` \| `italic` \| `oblique`                                           | -         |      |
| labelFontVariant         | 边标签字体变种                                                                   | `normal` \| `small-caps` \| string                                          | -         |      |
| labelFontWeight          | 边标签字体粗细                                                                   | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -         |      |
| labelLeading             | 行间距                                                                           | number                                                                      | 0         |      |
| labelLetterSpacing       | 边标签字间距                                                                     | number \| string                                                            | -         |      |
| labelLineHeight          | 边标签行高                                                                       | number \| string                                                            | -         |      |
| labelMaxLines            | 边标签最大行数                                                                   | number                                                                      | 1         |      |
| labelMaxWidth            | 边标签最大宽度，[配置项](#labelmaxwidth)                                         | number \| string                                                            | `200%`    |      |
| labelOffsetX             | 边标签在 x 轴方向上的偏移量                                                      | number                                                                      | 0         |      |
| labelOffsetY             | 边标签在 y 轴方向上的偏移量                                                      | number                                                                      | 0         |      |
| labelPadding             | 边标签内边距                                                                     | number \| number[]                                                          | 0         |      |
| labelPlacement           | 边标签相对于边的位置，[配置项](#labelplacement)                                  | string \| number                                                            | `center`  |      |
| labelText                | 边标签文字内容                                                                   | `string` \| `(datum) => string`                                             | -         |      |
| labelTextAlign           | 边标签文本水平对齐方式                                                           | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`    |      |
| labelTextBaseline        | 边标签文本基线                                                                   | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |      |
| labelTextDecorationColor | 边标签文本装饰线颜色                                                             | string                                                                      | -         |      |
| labelTextDecorationLine  | 边标签文本装饰线                                                                 | string                                                                      | -         |      |
| labelTextDecorationStyle | 边标签文本装饰线样式                                                             | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |      |
| labelTextOverflow        | 边标签文本溢出处理方式                                                           | `clip` \| `ellipsis` \| string                                              | -         |      |
| labelTextPath            | 边标签文本路径                                                                   | Path                                                                        | -         |      |
| labelWordWrap            | 边标签是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行 | boolean                                                                     | false     |      |
| labelZIndex              | 边标签渲染层级                                                                   | number                                                                      | 0         |      |

#### LabelPlacement

边标签相对于边的位置，可以设置为：

- `start`：标签位于边的起始位置
- `center`：标签位于边的中心位置（默认）
- `end`：标签位于边的结束位置
- `number`：取值范围为 0-1，表示标签在边上的具体位置比例，0 为起始位置，1 为结束位置

#### LabelMaxWidth

开启自动折行 `labelWordWrap` 后，超出该宽度则换行:

- string: 表示以相对于边长度的百分比形式定义最大宽度。例如 `50%` 表示标签宽度不超过边长度的一半
- number: 表示以像素值为单位定义最大宽度。例如 100 表示标签的最大宽度为 100 像素

比如，设置多行标签文字：

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

### 标签背景样式

标签背景用于显示边标签的背景：

| 属性                          | 描述                                                                                                         | 类型                                     | 默认值    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | --------- |
| labelBackground               | 边标签背景是否显示                                                                                           | boolean                                  | false     |
| labelBackgroundCursor         | 边标签背景鼠标移入样式，[配置项](#cursor)                                                                    | string                                   | `default` |
| labelBackgroundFill           | 边标签背景填充色                                                                                             | string                                   | -         |
| labelBackgroundFillOpacity    | 边标签背景透明度                                                                                             | number                                   | 1         |
| labelBackgroundHeight         | 边标签背景高度                                                                                               | string \| number                         | -         |
| labelBackgroundLineDash       | 边标签背景虚线配置                                                                                           | number \| string \|(number \| string )[] | -         |
| labelBackgroundLineDashOffset | 边标签背景虚线偏移量                                                                                         | number                                   | -         |
| labelBackgroundLineWidth      | 边标签背景描边线宽                                                                                           | number                                   | -         |
| labelBackgroundRadius         | 边标签背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，不足则自动补充 | number \| number[]                       | 0         |
| labelBackgroundShadowBlur     | 边标签背景阴影模糊程度                                                                                       | number                                   | -         |
| labelBackgroundShadowColor    | 边标签背景阴影颜色                                                                                           | string                                   | -         |
| labelBackgroundShadowOffsetX  | 边标签背景阴影 X 方向偏移                                                                                    | number                                   | -         |
| labelBackgroundShadowOffsetY  | 边标签背景阴影 Y 方向偏移                                                                                    | number                                   | -         |
| labelBackgroundStroke         | 边标签背景描边颜色                                                                                           | string                                   | -         |
| labelBackgroundStrokeOpacity  | 边标签背景描边透明度                                                                                         | number \| string                         | 1         |
| labelBackgroundVisibility     | 边标签背景是否可见                                                                                           | `visible` \| `hidden`                    | -         |
| labelBackgroundZIndex         | 边标签背景渲染层级                                                                                           | number                                   | 1         |

### 光晕样式

光晕是围绕边主图形显示的效果，通常用于高亮显示或表示边的特殊状态。

#### 基础光晕效果

为边添加基本的光晕效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      lineWidth: 2,
      halo: true,
      haloStroke: '#1890FF',
      haloLineWidth: 6,
      haloStrokeOpacity: 0.3,
    },
  },
});

graph.render();
```

以下为完整的光晕样式配置：

| 属性              | 描述                                                 | 类型                   | 默认值                         | 必选 |
| ----------------- | ---------------------------------------------------- | ---------------------- | ------------------------------ | ---- |
| halo              | 边光晕是否显示                                       | boolean                | false                          |      |
| haloCursor        | 边光晕鼠标移入样式，[配置项](#cursor)                | string                 | `default`                      |      |
| haloDraggable     | 边光晕是否允许拖拽                                   | boolean                | true                           |      |
| haloDroppable     | 边光晕是否允许接收被拖拽的元素                       | boolean                | true                           |      |
| haloFillRule      | 边光晕填充规则                                       | `nonzero` \| `evenodd` | -                              |      |
| haloFilter        | 边光晕滤镜                                           | string                 | -                              |      |
| haloLineWidth     | 边光晕描边宽度                                       | number                 | 3                              |      |
| haloPointerEvents | 边光晕效果是否响应指针事件，[配置项](#pointerevents) | string                 | `none`                         |      |
| haloStroke        | 边光晕描边色，**此属性用于设置边周围光晕的颜色**     | string                 | 与主图形的描边色 `stroke` 一致 |      |
| haloStrokeOpacity | 边光晕描边色透明度                                   | number                 | 0.25                           |      |
| haloVisibility    | 边光晕可见性                                         | `visible` \| `hidden`  | `visible`                      |      |
| haloZIndex        | 边光晕渲染层级                                       | number                 | -1                             |      |

### 箭头样式

边支持在起始端和结束端添加箭头，用于表示边的方向性。

#### 基础箭头

为边的结束端添加基本箭头：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#1890FF',
      lineWidth: 2,
      endArrow: true, // 结束端箭头
      endArrowType: 'vee', // 箭头类型
      endArrowSize: 10, // 箭头大小
    },
  },
});

graph.render();
```

#### 双向箭头

为边的两端都添加箭头：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#52C41A',
      lineWidth: 2,
      startArrow: true, // 起始端箭头
      startArrowType: 'circle',
      startArrowSize: 8,
      endArrow: true, // 结束端箭头
      endArrowType: 'triangle',
      endArrowSize: 10,
    },
  },
});

graph.render();
```

#### 自定义箭头样式

自定义箭头的颜色和类型：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#722ED1',
      lineWidth: 3,
      endArrow: true,
      endArrowType: 'diamond', // 菱形箭头
      endArrowSize: 12,
      endArrowFill: '#FF4D4F', // 红色箭头填充
      endArrowStroke: '#722ED1', // 箭头描边颜色
      endArrowStrokeOpacity: 0.8,
    },
  },
});

graph.render();
```

#### 起始箭头样式配置

| 属性                    | 描述                                      | 类型                                                                                 | 默认值             | 必选 |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | ------------------ | ---- |
| startArrow              | 边起始箭头是否显示                        | boolean                                                                              | false              |      |
| startArrowCursor        | 边起始箭头鼠标移入样式，[配置项](#cursor) | string                                                                               | `default`          |      |
| startArrowFill          | 边起始箭头填充颜色                        | string                                                                               | 默认与边的颜色一致 |      |
| startArrowFillOpacity   | 边起始箭头填充透明度                      | number                                                                               | 1                  |      |
| startArrowOffset        | 边起始箭头的偏移量                        | number                                                                               | 0                  |      |
| startArrowSize          | 边起始箭头大小                            | number \| [number, number]                                                           | 10                 |      |
| startArrowStroke        | 边起始箭头描边颜色                        | string                                                                               | 默认与边的颜色一致 |      |
| startArrowStrokeOpacity | 边起始箭头描边透明度                      | number                                                                               | 1                  |      |
| startArrowType          | 边起始箭头类型                            | `triangle` \| `circle` \| `diamond` \| `vee` \| `rect` \| `triangleRect` \| `simple` | `vee`              |      |

#### 结束箭头样式配置

| 属性                  | 描述                                      | 类型                                                                                 | 默认值             | 必选 |
| --------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | ------------------ | ---- |
| endArrow              | 边结束箭头是否显示                        | boolean                                                                              | false              |      |
| endArrowCursor        | 边结束箭头鼠标移入样式，[配置项](#cursor) | string                                                                               | `default`          |      |
| endArrowFill          | 边结束箭头填充颜色                        | string                                                                               | 默认与边的颜色一致 |      |
| endArrowFillOpacity   | 边结束箭头填充透明度                      | number                                                                               | 1                  |      |
| endArrowOffset        | 边结束箭头的偏移量                        | number                                                                               | 0                  |      |
| endArrowSize          | 边结束箭头大小                            | number \| [number, number]                                                           | 10                 |      |
| endArrowStroke        | 边结束箭头描边颜色                        | string                                                                               | 默认与边的颜色一致 |      |
| endArrowStrokeOpacity | 边结束箭头描边透明度                      | number                                                                               | 1                  |      |
| endArrowType          | 边结束箭头类型                            | `triangle` \| `circle` \| `diamond` \| `vee` \| `rect` \| `triangleRect` \| `simple` | `vee`              |      |

### 自环边样式

自环边是指起始节点和结束节点为同一个节点的特殊边。

#### 基础自环边

创建基本的自环边：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  data: {
    nodes: [{ id: 'node1', style: { x: 100, y: 50 } }],
    edges: [{ source: 'node1', target: 'node1' }],
  },
  edge: {
    style: {
      stroke: '#1890FF',
      lineWidth: 2,
      endArrow: true,
      loopPlacement: 'top', // 自环位置
      loopDist: 30, // 自环大小
    },
  },
});

graph.render();
```

#### 多个自环边

为同一节点创建多个不同位置的自环边：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 120,
  data: {
    nodes: [{ id: 'node1', style: { x: 100, y: 60 } }],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node1' },
      { id: 'edge2', source: 'node1', target: 'node1' },
      { id: 'edge3', source: 'node1', target: 'node1' },
    ],
  },
  edge: {
    style: {
      lineWidth: 2,
      endArrow: true,
      loopPlacement: (datum) => {
        const placements = ['top', 'right', 'bottom'];
        return placements[parseInt(datum.id.slice(-1)) - 1];
      },
      loopDist: 25,
      stroke: (datum) => {
        const colors = ['#1890FF', '#52C41A', '#722ED1'];
        return colors[parseInt(datum.id.slice(-1)) - 1];
      },
    },
  },
});

graph.render();
```

以下为完整的自环边样式配置：

| 属性          | 描述                                           | 类型                                                                                                                                                                   | 默认值                 | 必选 |
| ------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---- |
| loop          | 是否启用自环边                                 | boolean                                                                                                                                                                | true                   |      |
| loopClockwise | 指定是否顺时针绘制环                           | boolean                                                                                                                                                                | true                   |      |
| loopDist      | 从节点边缘到自环顶部的距离，用于指定自环的曲率 | number                                                                                                                                                                 | 默认为节点尺寸的最大值 |      |
| loopPlacement | 自环边的位置                                   | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | `top`                  |      |

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

例如，当边处于 `focus` 状态时，可以为其添加一个宽度为 6 且颜色为橙色的光晕。

```js {4-9}
const graph = new Graph({
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'orange',
        haloStrokeOpacity: 0.6,
      },
    },
  },
});
```

效果如下图所示：

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 100,
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    edges: [{ source: 'node1', target: 'node2', states: ['focus'] }],
  },
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'orange',
      },
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
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
  "edge": {
    "animation": {
      "update": [
        {
          "fields": ["stroke"], // 更新时只对 stroke 属性进行动画
          "duration": 1000, // 动画持续时间
          "easing": "linear" // 缓动函数
        }
      ]
    }
  }
}
```

也可以使用内置的动画效果：

```json
{
  "edge": {
    "animation": {
      "enter": "fade", // 使用渐变动画
      "update": "path-in", // 使用路径动画
      "exit": "fade" // 使用渐变动画
    }
  }
}
```

你可以传入 false 来关闭特定阶段的动画：

```json
{
  "edge": {
    "animation": {
      "enter": false // 关闭边入场动画
    }
  }
}
```

## Palette

定义边的色板，即预定义边颜色池，并根据规则进行分配，将颜色映射到 `stroke` 属性。

> 有关色板的定义，请参考 [色板](/manual/theme/palette)。

| 属性   | 描述                                                                | 类型                          | 默认值  |
| ------ | ------------------------------------------------------------------- | ----------------------------- | ------- |
| color  | 色板颜色。如果色板注册过，可以直接指定其注册名，也接受一个颜色数组  | string \| string[]            | -       |
| field  | 指定元素数据中的分组字段。若不指定，默认取 id 作为分组字段          | string \| ((datum) => string) | `id`    |
| invert | 是否反转色板                                                        | boolean                       | false   |
| type   | 指定当前色板类型。<br> - `group`: 离散色板 <br> - `value`: 连续色板 | `group` \| `value`            | `group` |

如将一组数据按 `direction` 字段分配边颜色，使得同类别的边颜色相同：

```json
{
  "edge": {
    "palette": {
      "type": "group",
      "field": "direction",
      "color": ["#F08F56", "#00C9C9", "#D580FF"]
    }
  }
}
```

效果如下图所示：

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
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

graph.render();
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

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
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
});

graph.render();
```
