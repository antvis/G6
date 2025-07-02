---
title: 组合通用配置项
order: 1
---

本文介绍内置组合通用属性配置。

## ComboOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  combo: {
    type: 'circle', // 组合类型
    style: {}, // 组合样式
    state: {}, // 状态样式
    palette: {}, // 色板配置
    animation: {}, // 动画配置
  },
});
```

| 属性      | 描述                                         | 类型                    | 默认值   | 必选 |
| --------- | -------------------------------------------- | ----------------------- | -------- | ---- |
| type      | 组合类型，内置组合类型名称或自定义组合的名称 | [Type](#type)           | `circle` |      |
| style     | 组合样式配置，包括颜色、大小等               | [Style](#style)         | -        |      |
| state     | 不同状态下的样式配置                         | [State](#state)         | -        |      |
| palette   | 定义组合的色板，用于根据不同数据映射颜色     | [Palette](#palette)     | -        |      |
| animation | 定义组合的动画效果                           | [Animation](#animation) | -        |      |

## Type

指定组合类型，内置组合类型名称或自定义组合的名称。默认为 `circle`(圆形)。**⚠️ 注意**：这里决定了主图形的形状。

```js {3}
const graph = new Graph({
  combo: {
    type: 'circle',
  },
});
```

**⚠️ 动态配置说明**：`type` 属性同样支持动态配置，可以根据组合数据动态选择组合类型：

```js
const graph = new Graph({
  combo: {
    // 静态配置
    type: 'circle',

    // 动态配置 - 箭头函数形式
    type: (datum) => datum.data.comboType || 'circle',

    // 动态配置 - 普通函数形式（可访问 graph 实例）
    type: function (datum) {
      console.log(this); // graph 实例
      return datum.data.category === 'important' ? 'rect' : 'circle';
    },
  },
});
```

可选值有：

- `circle`：[圆形组合](/manual/element/combo/circle)
- `rect`：[矩形组合](/manual/element/combo/rect)

## Style

定义组合的样式，包括颜色、大小等。

```js {3}
const graph = new Graph({
  combo: {
    style: {},
  },
});
```

**⚠️ 动态配置说明**：以下所有样式属性都支持动态配置，即可以传入函数来根据组合数据动态计算属性值：

```js
const graph = new Graph({
  combo: {
    style: {
      // 静态配置
      fill: '#1783FF',

      // 动态配置 - 箭头函数形式
      stroke: (datum) => (datum.data.isActive ? '#FF0000' : '#000000'),

      // 动态配置 - 普通函数形式（可访问 graph 实例）
      lineWidth: function (datum) {
        console.log(this); // graph 实例
        return datum.data.importance > 5 ? 3 : 1;
      },

      // 嵌套属性也支持动态配置
      labelText: (datum) => `组合: ${datum.id}`,
      badges: (datum) => datum.data.tags.map((tag) => ({ text: tag })),
    },
  },
});
```

其中 `datum` 参数为组合数据对象 (`ComboData`)，包含组合的所有数据信息。

一个完整的组合由以下几部分构成：

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：组合的主图形，表示组合的主要形状，例如圆形、矩形等；
- `label` ：文本标签，通常用于展示组合的名称或描述；
- `halo` ：主图形周围展示的光晕效果的图形；
- `badge` ：默认位于组合右上角的徽标；

以下样式配置将按原子图形依次说明：

### 主图形样式

主图形是组合的核心部分，定义了组合的基本形状和外观。以下是常见的配置场景：

#### 基础样式配置

设置组合的基本外观：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#5B8FF9', // 蓝色填充
      stroke: '#1A1A1A', // 深色描边
      lineWidth: 2,
      fillOpacity: 0.2,
    },
  },
});

graph.render();
```

#### 透明度和阴影效果

为组合添加透明度和阴影效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#61DDAA',
      fillOpacity: 0.15,
      shadowColor: 'rgba(97, 221, 170, 0.4)',
      shadowBlur: 12,
      shadowOffsetX: 2,
      shadowOffsetY: 4,
      stroke: '#F0F0F0',
      lineWidth: 1,
    },
  },
});

graph.render();
```

#### 虚线边框样式

创建带虚线边框的组合：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#FFF1F0',
      fillOpacity: 0.1,
      stroke: '#F5222D',
      lineWidth: 2,
      lineDash: [6, 4],
      lineCap: 'round',
    },
  },
});

graph.render();
```

以下为完整的主图形样式配置：

| 属性                            | 描述                                                                                      | 类型                          | 默认值    | 必选 |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------- | --------- | ---- |
| collapsed                       | 当前组合是否折叠                                                                          | boolean                       | false     |      |
| cursor                          | 组合鼠标移入样式，[配置项](#cursor)                                                       | string                        | default   |      |
| fill                            | 组合填充色                                                                                | string                        | `#99ADD1` |      |
| fillOpacity                     | 组合填充色透明度                                                                          | number \| string              | 0.04      |      |
| increasedLineWidthForHitTesting | 当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让"细线"更容易被拾取到 | number                        | 0         |      |
| lineCap                         | 组合描边端点样式                                                                          | `round` \| `square` \| `butt` | `butt`    |      |
| lineDash                        | 组合描边虚线样式                                                                          | number[]                      | -         |      |
| lineDashOffset                  | 组合描边虚线偏移量                                                                        | number                        | -         |      |
| lineJoin                        | 组合描边连接处样式                                                                        | `round` \| `bevel` \| `miter` | `miter`   |      |
| lineWidth                       | 组合描边宽度                                                                              | number                        | 1         |      |
| opacity                         | 组合透明度                                                                                | number \| string              | 1         |      |
| pointerEvents                   | 组合如何响应指针事件，[配置项](#pointerevents)                                            | string                        | `auto`    |      |
| shadowBlur                      | 组合阴影模糊度                                                                            | number                        | -         |      |
| shadowColor                     | 组合阴影颜色                                                                              | string                        | -         |      |
| shadowOffsetX                   | 组合阴影在 x 轴方向上的偏移量                                                             | number \| string              | -         |      |
| shadowOffsetY                   | 组合阴影在 y 轴方向上的偏移量                                                             | number \| string              | -         |      |
| shadowType                      | 组合阴影类型                                                                              | `inner` \| `outer`            | `outer`   |      |
| size                            | 组合大小，快捷设置组合宽高，[配置项](#size)                                               | number \| number[]            | -         |      |
| stroke                          | 组合描边色                                                                                | string                        | `#99ADD1` |      |
| strokeOpacity                   | 组合描边色透明度                                                                          | number \| string              | 1         |      |
| transform                       | transform 属性允许你旋转、缩放、倾斜或平移给定组合                                        | string                        | -         |      |
| transformOrigin                 | 旋转与缩放中心，也称作变换中心                                                            | string                        | -         |      |
| visibility                      | 组合是否可见                                                                              | `visible` \| `hidden`         | `visible` |      |
| x                               | 组合 x 坐标                                                                               | number                        | 0         |      |
| y                               | 组合 y 坐标                                                                               | number                        | 0         |      |
| z                               | 组合 z 坐标                                                                               | number                        | 0         |      |
| zIndex                          | 组合渲染层级                                                                              | number                        | 0         |      |

#### Size

组合大小，快捷设置组合宽高，支持三种配置方式：

- number：表示组合宽高相同为指定值
- [number, number]：表示组合宽高分别为数组元素依次表示组合的宽度、高度
- [number, number, number]：表示组合宽高分别为数组元素依次表示组合的宽度、高度以及深度

#### PointerEvents

`pointerEvents` 属性控制图形如何响应交互事件，可参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)。

可选值有：`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

简而言之，`fill`、`stroke` 和 `visibility` 都可以独立或组合影响拾取判定行为。目前支持以下关键词：

- **`auto`**：默认值，等同于 `visiblepainted`
- **`none`**：永远不会成为响应事件的目标
- **`visiblepainted`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形填充区域触发同时 `fill` 取非 `none` 的值；或者在图形描边区域触发同时 `stroke` 取非 `none` 的值
- **`visiblefill`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形填充区域触发，不受 `fill` 取值的影响
- **`visiblestroke`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形描边区域触发，不受 `stroke` 取值的影响
- **`visible`**：满足以下条件才会响应事件：
  - `visibility` 设置为 `visible`，即图形为可见的
  - 在图形填充或者描边区域触发，不受 `fill` 和 `stroke` 取值的影响
- **`painted`**：满足以下条件才会响应事件：
  - 在图形填充区域触发同时 `fill` 取非 `none` 的值；或者在图形描边区域触发同时 `stroke` 取非 `none` 的值
  - 不受 `visibility` 取值的影响
- **`fill`**：满足以下条件才会响应事件：
  - 在图形填充区域触发，不受 `fill` 取值的影响
  - 不受 `visibility` 取值的影响
- **`stroke`**：满足以下条件才会响应事件：
  - 在图形描边区域触发，不受 `stroke` 取值的影响
  - 不受 `visibility` 取值的影响
- **`all`**：只要进入图形的填充和描边区域就会响应事件，不会受 `fill`、`stroke`、`visibility` 的取值影响

**使用示例：**

```js
// 示例1：只有描边区域响应事件
const graph = new Graph({
  combo: {
    style: {
      fill: 'none',
      stroke: '#000',
      lineWidth: 2,
      pointerEvents: 'stroke', // 只有描边响应事件
    },
  },
});

// 示例2：完全不响应事件
const graph = new Graph({
  combo: {
    style: {
      pointerEvents: 'none', // 组合不响应任何事件
    },
  },
});
```

#### Cursor

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

### 收起时样式

当组合处于收起状态时（`collapsed` 为 `true`），可以为其配置特殊的样式。收起时的样式属性以 `collapsed` 为前缀。

#### 基础收起样式

为收起状态的组合设置不同的外观：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
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
      collapsedFill: '#1783FF',
      collapsedStroke: '#000',
      collapsedLineWidth: 2,
      collapsedSize: 40,
      collapsedMarkerFill: '#fff',
      collapsedMarkerFontSize: 12,
    },
  },
});

graph.render();
```

以下为收起时样式的完整配置：

| 属性                                     | 描述                                                                                                  | 类型                          | 默认值                             | 必选 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------- | ---- |
| collapsedCursor                          | 组合收起时的鼠标移入样式，[配置项](#cursor)                                                           | string                        | 默认与展开时的 cursor 一致         |      |
| collapsedFill                            | 组合收起时的填充色                                                                                    | string                        | 默认与展开时的 fill 一致           |      |
| collapsedFillOpacity                     | 组合收起时的填充色透明度                                                                              | number \| string              | 1                                  |      |
| collapsedIncreasedLineWidthForHitTesting | 组合收起时，当 lineWidth 较小时，可交互区域也随之变小，有时我们想增大这个区域，让"细线"更容易被拾取到 | number                        | 0                                  |      |
| collapsedLineCap                         | 组合收起时的描边端点样式                                                                              | `round` \| `square` \| `butt` | 默认与展开时的 lineCap 一致        |      |
| collapsedLineDash                        | 组合收起时的描边虚线样式                                                                              | number[]                      | 默认与展开时的 lineDash 一致       |      |
| collapsedLineDashOffset                  | 组合收起时的描边虚线偏移量                                                                            | number                        | 默认与展开时的 lineDashOffset 一致 |      |
| collapsedLineJoin                        | 组合收起时的描边连接处样式                                                                            | `round` \| `bevel` \| `miter` | 默认与展开时的 lineJoin 一致       |      |
| collapsedLineWidth                       | 组合收起时的描边宽度                                                                                  | number                        | 默认与展开时的 lineWidth 一致      |      |
| collapsedMarker                          | 组合收起时是否显示标记，[配置项](#收起时标记样式)                                                     | boolean                       | true                               |      |
| collapsedOpacity                         | 组合收起时的透明度                                                                                    | number \| string              | 默认与展开时的 opacity 一致        |      |
| collapsedShadowBlur                      | 组合收起时的阴影模糊度                                                                                | number                        | 默认与展开时的 shadowBlur 一致     |      |
| collapsedShadowColor                     | 组合收起时的阴影颜色                                                                                  | string                        | 默认与展开时的 shadowColor 一致    |      |
| collapsedShadowOffsetX                   | 组合收起时的阴影在 x 轴方向上的偏移量                                                                 | number \| string              | 默认与展开时的 shadowOffsetX 一致  |      |
| collapsedShadowOffsetY                   | 组合收起时的阴影在 y 轴方向上的偏移量                                                                 | number \| string              | 默认与展开时的 shadowOffsetY 一致  |      |
| collapsedShadowType                      | 组合收起时的阴影类型                                                                                  | `inner` \| `outer`            | 默认与展开时的 shadowType 一致     |      |
| collapsedSize                            | 组合收起时的大小                                                                                      | number \| [number, number]    | 32                                 |      |
| collapsedStroke                          | 组合收起时的描边色                                                                                    | string                        | 默认与展开时的 stroke 一致         |      |
| collapsedStrokeOpacity                   | 组合收起时的描边色透明度                                                                              | number \| string              | 默认与展开时的 strokeOpacity 一致  |      |
| collapsedVisibility                      | 组合收起时是否可见                                                                                    | `visible` \| `hidden`         | 默认与展开时的 visibility 一致     |      |

### 收起时标记样式

当 `collapsedMarker` 为 `true` 时显示的标记，用于显示收起组合内包含的元素数量。

#### 自定义标记内容

可以自定义收起标记显示的内容：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1' },
      { id: 'node2', combo: 'combo1' },
      { id: 'node3', combo: 'combo1' },
    ],
    combos: [{ id: 'combo1', style: { collapsed: true } }],
  },
  combo: {
    style: {
      collapsedMarkerType: 'child-count',
      collapsedMarkerFill: '#1783FF',
      collapsedMarkerFontSize: 14,
      collapsedMarkerFontWeight: 'bold',
    },
  },
});

graph.render();
```

以下为收起时标记样式的完整配置：

| 属性                        | 描述                                                                                                                                                                                                                                                          | 类型                                                                                                   | 默认值        | 必选 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- | ---- |
| collapsedMarkerType         | 组合收起时显示的标记类型 <br> - `'child-count'`: 子元素数量（包括 Node 和 Combo）<br>- `'descendant-count'`: 后代元素数量（包括 Node 和 Combo）<br>- `'node-count'`: 后代元素数量（只包括 Node）<br> - `(children: NodeLikeData[]) => string`: 自定义处理逻辑 | `child-count` \| `descendant-count` \| `node-count` \| ((children: NodeData \| ComboData[]) => string) | `child-count` |      |
| collapsedMarkerFill         | 标记文字颜色                                                                                                                                                                                                                                                  | string                                                                                                 | #fff          |      |
| collapsedMarkerFillOpacity  | 标记文字颜色透明度                                                                                                                                                                                                                                            | number                                                                                                 | 1             |      |
| collapsedMarkerFontSize     | 标记字体大小                                                                                                                                                                                                                                                  | number                                                                                                 | 12            |      |
| collapsedMarkerFontWeight   | 标记字体粗细                                                                                                                                                                                                                                                  | number \| string                                                                                       | `normal`      |      |
| collapsedMarkerRadius       | 标记圆角半径                                                                                                                                                                                                                                                  | number                                                                                                 | 0             |      |
| collapsedMarkerSrc          | 图片来源。其优先级高于 `collapsedMarkerText`                                                                                                                                                                                                                  | string                                                                                                 | -             |      |
| collapsedMarkerText         | 标记文字                                                                                                                                                                                                                                                      | string                                                                                                 | -             |      |
| collapsedMarkerTextAlign    | 标记文字水平对齐方式                                                                                                                                                                                                                                          | `center` \| `end` \| `left` \| `right` \| `start`                                                      | `center`      |      |
| collapsedMarkerTextBaseline | 标记文字对齐基线                                                                                                                                                                                                                                              | `alphabetic` \| `bottom` \| `hanging` \| `ideographic` \| `middle` \| `top`                            | `middle`      |      |
| collapsedMarkerWidth        | 标记宽度                                                                                                                                                                                                                                                      | number                                                                                                 | -             |      |
| collapsedMarkerHeight       | 标记高度                                                                                                                                                                                                                                                      | number                                                                                                 | -             |      |
| collapsedMarkerZIndex       | 标记层级                                                                                                                                                                                                                                                      | number                                                                                                 | 1             |      |

### 徽标样式

徽标是组合上显示的小标记，通常用于展示状态、数量或其他辅助信息。支持多个徽标同时显示，并可自定义位置。

#### 单个徽标

为组合添加一个简单的徽标：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      badges: [
        { text: 'NEW' }, // 默认显示在上方
      ],
    },
  },
});

graph.render();
```

#### 多个徽标

为组合添加多个不同位置的徽标：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
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

graph.render();
```

#### 自定义徽标样式

完全自定义徽标的外观：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      badges: [
        {
          text: '99+',
          placement: 'right-top',
          backgroundFill: '#FF4D4F', // 红色背景
          fill: '#fff', // 白色文字
          fontSize: 10,
          padding: [2, 6],
          backgroundRadius: 8,
        },
      ],
    },
  },
});

graph.render();
```

以下为完整的徽标样式配置：

| 属性         | 描述               | 类型                                  | 默认值                            |
| ------------ | ------------------ | ------------------------------------- | --------------------------------- |
| badge        | 组合是否显示徽标   | boolean                               | true                              |
| badgePalette | 组合徽标的背景色板 | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| badges       | 组合徽标设置       | [BadgeStyleProps](#badgestyleprops)[] | -                                 |

#### BadgeStyleProps

| 属性                     | 描述                                                                                                                                                                                                                              | 类型                                                                                                                                                                   | 默认值       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| background               | 组合徽标是否显示背景                                                                                                                                                                                                              | boolean                                                                                                                                                                | true         |
| backgroundCursor         | 组合徽标背景鼠标移入样式，[配置项](#cursor)                                                                                                                                                                                       | string                                                                                                                                                                 | `default`    |
| backgroundFill           | 组合徽标背景填充色。若不指定，优先考虑 badgePalette 按顺序分配                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| backgroundFillOpacity    | 组合徽标背景填充透明度                                                                                                                                                                                                            | number                                                                                                                                                                 | 1            |
| backgroundFilter         | 组合徽标背景滤镜                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| backgroundHeight         | 组合徽标背景高度                                                                                                                                                                                                                  | number \| string                                                                                                                                                       | -            |
| backgroundLineDash       | 组合徽标背景虚线配置                                                                                                                                                                                                              | number \| string \|(number \| string )[]                                                                                                                               | -            |
| backgroundLineDashOffset | 组合徽标背景虚线偏移量                                                                                                                                                                                                            | number                                                                                                                                                                 | -            |
| backgroundLineWidth      | 组合徽标背景描边线宽                                                                                                                                                                                                              | number                                                                                                                                                                 | -            |
| backgroundRadius         | 组合徽标背景圆角半径 <br> - number: 统一设置四个圆角半径 <br> - number[]: 分别设置四个圆角半径，会补足缺省的分量 <br> - string: 与 [CSS padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 属性类似，使用空格分隔 | number \| number[] \| string                                                                                                                                           | 0            |
| backgroundShadowBlur     | 组合徽标背景阴影模糊程度                                                                                                                                                                                                          | number                                                                                                                                                                 | -            |
| backgroundShadowColor    | 组合徽标背景阴影颜色                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| backgroundShadowOffsetX  | 组合徽标背景阴影 X 方向偏移                                                                                                                                                                                                       | number                                                                                                                                                                 | -            |
| backgroundShadowOffsetY  | 组合徽标背景阴影 Y 方向偏移                                                                                                                                                                                                       | number                                                                                                                                                                 | -            |
| backgroundStroke         | 组合徽标背景描边颜色                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| backgroundStrokeOpacity  | 组合徽标背景描边透明度                                                                                                                                                                                                            | number \| string                                                                                                                                                       | 1            |
| backgroundVisibility     | 组合徽标背景是否可见                                                                                                                                                                                                              | `visible` \| `hidden`                                                                                                                                                  | -            |
| fill                     | 组合徽标文字颜色                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| fontFamily               | 组合徽标字体族                                                                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| fontSize                 | 组合徽标字体大小                                                                                                                                                                                                                  | number                                                                                                                                                                 | 8            |
| fontStyle                | 组合徽标字体样式                                                                                                                                                                                                                  | `normal` \| `italic` \| `oblique`                                                                                                                                      | `normal`     |
| fontVariant              | 组合徽标字体变种                                                                                                                                                                                                                  | `normal` \| `small-caps` \| string                                                                                                                                     | `normal`     |
| fontWeight               | 组合徽标字体粗细                                                                                                                                                                                                                  | number \| string                                                                                                                                                       | `normal`     |
| lineHeight               | 组合徽标行高                                                                                                                                                                                                                      | string \| number                                                                                                                                                       | -            |
| lineWidth                | 组合徽标行宽                                                                                                                                                                                                                      | string \| number                                                                                                                                                       | -            |
| maxLines                 | 组合徽标文本最大行数                                                                                                                                                                                                              | number                                                                                                                                                                 | 1            |
| offsetX                  | 组合徽标在 x 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                                                                                                 | 0            |
| offsetY                  | 组合徽标在 y 轴方向上的偏移量                                                                                                                                                                                                     | number                                                                                                                                                                 | 0            |
| padding                  | 组合徽标内边距                                                                                                                                                                                                                    | number \| number[]                                                                                                                                                     | 0            |
| placement                | 组合徽标相对于组合主图形的位置。若不指定，默认从右上角顺时针依次排放                                                                                                                                                              | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | -            |
| text                     | 组合徽标文字内容                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| textAlign                | 组合徽标文本水平对齐方式                                                                                                                                                                                                          | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`                                                                                                          | `left`       |
| textBaseline             | 组合徽标文本基线                                                                                                                                                                                                                  | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`                                                                                            | `alphabetic` |
| textDecorationColor      | 组合徽标文本装饰线颜色                                                                                                                                                                                                            | string                                                                                                                                                                 | -            |
| textDecorationLine       | 组合徽标文本装饰线                                                                                                                                                                                                                | string                                                                                                                                                                 | -            |
| textDecorationStyle      | 组合徽标文本装饰线样式                                                                                                                                                                                                            | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                                                                                                  | `solid`      |
| textOverflow             | 组合徽标文本溢出处理方式                                                                                                                                                                                                          | `clip` \| `ellipsis` \| string                                                                                                                                         | `clip`       |
| visibility               | 组合徽标是否可见                                                                                                                                                                                                                  | `visible` \| `hidden`                                                                                                                                                  | -            |
| wordWrap                 | 组合徽标文本是否自动换行                                                                                                                                                                                                          | boolean                                                                                                                                                                | -            |
| zIndex                   | 组合徽标渲染层级                                                                                                                                                                                                                  | number                                                                                                                                                                 | 3            |

### 标签样式

标签用于显示组合的文本信息，支持丰富的文本样式配置和灵活的位置布局。

#### 基础标签配置

为组合添加基本的文本标签：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: '销售部门', // 标签文字内容
      labelFill: '#1A1A1A', // 标签文字颜色
      labelFontSize: 14, // 标签字体大小
      labelPlacement: 'bottom', // 标签位置：底部
    },
  },
});

graph.render();
```

#### 多行文本标签

配置支持多行显示的标签：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: '这是一个支持多行显示的组合标签文本内容',
      labelWordWrap: true, // 开启文本换行
      labelMaxWidth: 100, // 最大宽度 100px
      labelMaxLines: 3, // 最多显示 3 行
      labelTextAlign: 'center', // 文本居中对齐
      labelFontSize: 12,
    },
  },
});

graph.render();
```

#### 自定义样式标签

创建具有特殊样式的标签：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: 'IMPORTANT',
      labelFill: '#FF4D4F', // 红色文字
      labelFontSize: 16,
      labelFontWeight: 'bold', // 粗体
      labelFontStyle: 'italic', // 斜体
      labelTextDecorationLine: 'underline', // 下划线
      labelLetterSpacing: 2, // 字间距
      labelPlacement: 'top',
    },
  },
});

graph.render();
```

以下为完整的标签样式配置：

| 属性                     | 描述                                                                                                                         | 类型                                                                        | 默认值    | 必选 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | ---- |
| label                    | 是否显示组合标签                                                                                                             | boolean                                                                     | true      |      |
| labelCursor              | 鼠标移入组合标签时显示的样式，[配置项](#cursor)                                                                              | string                                                                      | `default` |      |
| labelFill                | 组合标签文字颜色                                                                                                             | string                                                                      | #000      |      |
| labelFillOpacity         | 组合标签文字颜色的透明度                                                                                                     | number                                                                      | 1         |      |
| labelFontFamily          | 组合标签字体族                                                                                                               | string                                                                      | -         |      |
| labelFontSize            | 组合标签字体大小                                                                                                             | number                                                                      | 12        |      |
| labelFontStyle           | 组合标签字体样式                                                                                                             | `normal` \| `italic` \| `oblique`                                           | -         |      |
| labelFontVariant         | 组合标签字体变种                                                                                                             | `normal` \| `small-caps` \| string                                          | -         |      |
| labelFontWeight          | 组合标签字体粗细                                                                                                             | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | 400       |      |
| labelLeading             | 行间距                                                                                                                       | number                                                                      | 0         |      |
| labelLetterSpacing       | 组合标签字间距                                                                                                               | number \| string                                                            | -         |      |
| labelLineHeight          | 组合标签行高                                                                                                                 | number \| string                                                            | -         |      |
| labelMaxLines            | 组合标签最大行数                                                                                                             | number                                                                      | 1         |      |
| labelMaxWidth            | 组合标签最大宽度，[配置项](#labelmaxwidth)                                                                                   | number \| string                                                            | `200%`    |      |
| labelOffsetX             | 组合标签在 x 轴方向上的偏移量                                                                                                | number                                                                      | 0         |      |
| labelOffsetY             | 组合标签在 y 轴方向上的偏移量                                                                                                | number                                                                      | 0         |      |
| labelPadding             | 组合标签内边距                                                                                                               | number \| number[]                                                          | 0         |      |
| labelPlacement           | 组合标签相对于组合主图形的位置，[配置项](#labelplacement)                                                                    | string                                                                      | `bottom`  |      |
| labelText                | 组合标签文字内容                                                                                                             | string                                                                      | -         |      |
| labelTextAlign           | 组合标签文本水平对齐方式                                                                                                     | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`    |      |
| labelTextBaseline        | 组合标签文本基线                                                                                                             | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |      |
| labelTextDecorationColor | 组合标签文本装饰线颜色                                                                                                       | string                                                                      | -         |      |
| labelTextDecorationLine  | 组合标签文本装饰线                                                                                                           | string                                                                      | -         |      |
| labelTextDecorationStyle | 组合标签文本装饰线样式                                                                                                       | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |      |
| labelTextOverflow        | 组合标签文本溢出处理方式                                                                                                     | `clip` \| `ellipsis` \| string                                              | -         |      |
| labelTextPath            | 组合标签文本路径                                                                                                             | Path                                                                        | -         |      |
| labelWordWrap            | 组合标签是否开启自动折行。开启 labelWordWrap 后，超出 labelMaxWidth 的部分自动换行                                           | boolean                                                                     | false     |      |
| labelZIndex              | 组合标签渲染层级                                                                                                             | number                                                                      | 0         |      |
| `label{StyleProps}`      | 更多标签样式配置，参考 [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) 属性值。比如 labelOpacity 代表标签透明度 | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                | -         |      |

#### LabelPlacement

标签相对于组合主图形的位置，可选值有：

- `center`：标签位于组合中心
- `top`、`bottom`、`left`、`right`：标签位于组合的上、下、左、右方
- `top-left`、`top-right`、`bottom-left`、`bottom-right`：标签位于组合的四个角
- `left-top`、`left-bottom`、`right-top`、`right-bottom`：标签位于组合边的端点

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

### 标签背景样式

标签背景为标签文字提供背景装饰，可以提升标签的可读性和视觉效果。

#### 基础背景样式

为标签添加简单的背景：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: '重要组合',
      labelFill: '#fff', // 白色文字
      labelBackground: true, // 启用背景
      labelBackgroundFill: '#1783FF', // 蓝色背景
      labelBackgroundPadding: [4, 8], // 内边距：垂直4px，水平8px
      labelBackgroundRadius: 4, // 圆角半径
    },
  },
});

graph.render();
```

#### 渐变背景效果

创建带渐变效果的标签背景：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: 'VIP组合',
      labelFill: '#fff',
      labelFontWeight: 'bold',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', // 渐变背景
      labelBackgroundPadding: [6, 12],
      labelBackgroundRadius: 20, // 大圆角
      labelBackgroundShadowColor: 'rgba(0,0,0,0.2)',
      labelBackgroundShadowBlur: 4,
      labelBackgroundShadowOffsetY: 2,
    },
  },
});

graph.render();
```

#### 描边背景样式

创建只有描边的标签背景：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: '边框标签',
      labelFill: '#1783FF',
      labelBackground: true,
      labelBackgroundFill: 'transparent', // 透明背景
      labelBackgroundStroke: '#1783FF', // 蓝色描边
      labelBackgroundLineWidth: 2, // 描边宽度
      labelBackgroundPadding: [4, 8],
      labelBackgroundRadius: 8,
    },
  },
});

graph.render();
```

以下为完整的标签背景样式配置：

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

### 光晕样式

光晕效果用于突出显示组合，通常在鼠标悬停、选中或激活状态下使用，为组合周围添加发光效果。

#### 基础光晕效果

为组合添加简单的光晕效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      halo: true, // 启用光晕
      haloStroke: '#1783FF', // 蓝色光晕
      haloLineWidth: 8, // 光晕宽度
      haloStrokeOpacity: 0.3, // 光晕透明度
    },
  },
});

graph.render();
```

#### 彩色光晕效果

创建彩色渐变的光晕效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      halo: true,
      haloStroke: '#FF4D4F', // 红色光晕
      haloLineWidth: 12, // 较粗的光晕
      haloStrokeOpacity: 0.5,
      haloFilter: 'blur(2px)', // 模糊滤镜效果
    },
  },
});

graph.render();
```

#### 动态光晕效果

在状态切换时使用光晕效果：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      // 默认状态下不显示光晕
      halo: false,
    },
    state: {
      // 悬停状态显示橙色光晕
      hover: {
        halo: true,
        haloStroke: '#FF7A00',
        haloLineWidth: 10,
        haloStrokeOpacity: 0.4,
      },
      // 选中状态显示绿色光晕
      selected: {
        halo: true,
        haloStroke: '#52C41A',
        haloLineWidth: 6,
        haloStrokeOpacity: 0.6,
      },
    },
  },
});

graph.render();
```

以下为完整的光晕样式配置：

| 属性               | 描述                                                                                                                                           | 类型                                                                  | 默认值                       | 必选 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------- | ---- |
| halo               | 是否显示组合光晕                                                                                                                               | boolean                                                               | false                        |      |
| haloCursor         | 组合光晕鼠标移入样式，[配置项](#cursor)                                                                                                        | string                                                                | `default`                    |      |
| haloDraggable      | 组合光晕是否允许拖拽                                                                                                                           | boolean                                                               | true                         |      |
| haloDroppable      | 组合光晕是否允许接收被拖拽的元素                                                                                                               | boolean                                                               | false                        |      |
| haloFill           | 光晕填充色                                                                                                                                     | string                                                                | 与主图形的填充色 `fill` 一致 |      |
| haloFillRule       | 组合光晕填充规则                                                                                                                               | `nonzero` \| `evenodd`                                                | -                            |      |
| haloFilter         | 组合光晕滤镜效果，如 'blur(2px)' 可创建模糊效果                                                                                                | string                                                                | -                            |      |
| haloLineWidth      | 组合光晕描边宽度，控制光晕的粗细程度                                                                                                           | number                                                                | 12                           |      |
| haloPointerEvents  | 组合光晕效果是否响应指针事件，[配置项](#pointerevents)                                                                                         | string                                                                | `none`                       |      |
| haloStroke         | 组合光晕描边色，**此属性用于设置组合周围光晕的颜色，帮助突出显示组合**                                                                         | string                                                                | `#99add1`                    |      |
| haloStrokeOpacity  | 组合光晕描边色透明度，建议使用 0.2-0.6 的值以获得自然的光晕效果                                                                                | number                                                                | 0.25                         |      |
| haloVisibility     | 组合光晕可见性                                                                                                                                 | `visible` \| `hidden`                                                 | `visible`                    |      |
| haloZIndex         | 组合光晕渲染层级，通常设置为负值以确保光晕在组合主图形下方                                                                                     | number                                                                | -1                           |      |
| `halo{StyleProps}` | 更多光晕样式配置，参考 [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) 配置项。例如 haloFillOpacity 代表光晕填充色透明度 | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                            |      |

**光晕使用建议：**

1. **性能考虑**：光晕效果会增加渲染负担，建议在必要时才启用
2. **颜色搭配**：光晕颜色应与组合主色调协调，避免过于突兀
3. **透明度设置**：合理的透明度（0.2-0.6）可以创造自然的光晕效果
4. **状态应用**：光晕通常用于 hover、selected、active 等交互状态

### 图标样式

图标用于在组合中显示文字或图片内容，通常位于组合的中心位置，可以用来表示组合的类型或功能。

#### 文字图标

使用文字作为组合的图标：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      iconText: 'A', // 显示字母 A
      iconFill: '#1783FF', // 蓝色文字
      iconFontSize: 24, // 大字体
      iconFontWeight: 'bold', // 粗体
    },
  },
});

graph.render();
```

#### 图片图标

使用图片作为组合的图标：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#1890FF',
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
    },
  },
});

graph.render();
```

#### 彩色文字图标

创建带有特殊样式的文字图标：

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      iconText: '部门',
      iconFill: '#FF4D4F', // 红色文字
      iconFontSize: 16,
      iconFontWeight: 'bold',
      iconFontStyle: 'italic', // 斜体
      iconTextDecorationLine: 'underline', // 下划线
      iconLetterSpacing: 1, // 字间距
    },
  },
});

graph.render();
```

以下为完整的图标样式配置：

| 属性                    | 描述                                                                         | 类型                                                                        | 默认值           |
| ----------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| icon                    | 是否显示组合图标                                                             | boolean                                                                     | true             |
| iconCursor              | 组合图标鼠标移入样式，[配置项](#cursor)                                      | string                                                                      | `default`        |
| iconFill                | 组合图标文字颜色                                                             | string                                                                      | -                |
| iconFillOpacity         | 组合图标文字颜色透明度                                                       | number                                                                      | 1                |
| iconFontFamily          | 组合图标字体族                                                               | string                                                                      | -                |
| iconFontSize            | 组合图标字体大小                                                             | number                                                                      | 16               |
| iconFontStyle           | 组合图标字体样式                                                             | `normal` \| `italic` \| `oblique`                                           | `normal`         |
| iconFontVariant         | 组合图标字体变种                                                             | `normal` \| `small-caps` \| string                                          | `normal`         |
| iconFontWeight          | 组合图标字体粗细                                                             | number \| string                                                            | `normal`         |
| iconHeight              | 组合图标高度，当使用图片图标时用于控制图片尺寸                               | number                                                                      | 主图形高度的一半 |
| iconLetterSpacing       | 组合图标文本字间距                                                           | number \| string                                                            | -                |
| iconLineHeight          | 组合图标文本行高                                                             | number \| string                                                            | -                |
| iconMaxLines            | 组合图标文本最大行数                                                         | number                                                                      | 1                |
| iconOffsetX             | 组合图标在 x 轴方向上的偏移量                                                | number                                                                      | 0                |
| iconOffsetY             | 组合图标在 y 轴方向上的偏移量                                                | number                                                                      | 0                |
| iconOpacity             | 组合图标透明度                                                               | number                                                                      | 1                |
| iconRadius              | 组合图标圆角半径（仅对矩形图标有效）                                         | number                                                                      | 0                |
| iconSrc                 | 组合图片来源。其优先级高于 iconText，支持本地图片和网络图片                  | string                                                                      | -                |
| iconText                | 组合图标文字内容，支持文字、Unicode 字符等                                   | string                                                                      | -                |
| iconTextAlign           | 组合图标文本水平对齐方式                                                     | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `center`         |
| iconTextBaseline        | 组合图标文本基线                                                             | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `middle`         |
| iconTextDecorationColor | 组合图标文本装饰线颜色                                                       | string                                                                      | -                |
| iconTextDecorationLine  | 组合图标文本装饰线，如下划线、删除线等                                       | string                                                                      | -                |
| iconTextDecorationStyle | 组合图标文本装饰线样式                                                       | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`          |
| iconTextOverflow        | 组合图标文本溢出处理方式                                                     | `clip` \| `ellipsis` \| string                                              | `clip`           |
| iconVisibility          | 组合图标是否可见                                                             | `visible` \| `hidden`                                                       | `visible`        |
| iconWidth               | 组合图标宽度，当使用图片图标时用于控制图片尺寸                               | number                                                                      | 主图形宽度的一半 |
| iconWordWrap            | 组合图标文本是否自动换行                                                     | boolean                                                                     | false            |
| iconZIndex              | 组合图标渲染层级                                                             | number                                                                      | 1                |
| `icon{StyleProps}`      | 更多图标样式配置，参考图标的具体类型配置项。例如 iconStroke 代表图标描边颜色 | -                                                                           | -                |

**图标使用建议：**

1. **优先级**：`iconSrc`（图片）的优先级高于 `iconText`（文字），如果同时设置，会优先显示图片
2. **尺寸控制**：建议根据组合大小合理设置图标尺寸，避免图标过大或过小影响视觉效果
3. **性能优化**：使用文字图标性能更好，图片图标需要额外的网络请求和渲染开销
4. **样式一致性**：在同一个图中的组合图标样式应保持一致，提升整体视觉效果
5. **可访问性**：确保图标颜色与背景有足够的对比度，便于用户识别

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

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
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
});

graph.render();
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

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 100,
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
});

graph.render();
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

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 100,
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
});

graph.render();
```
