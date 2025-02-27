---
title: Options 配置项
order: 0
---

> 阅读本节前，请确保你已经了解了 [核心概念 - 图](/manual/core-concept/graph) 章节。

## autoFit

> _{ type: 'view'; options?:_ [FitViewOptions](#fitviewoptions)<!-- -->_; animation?:_ [ViewportAnimationEffectTiming](#viewportanimationeffecttiming)<!-- -->_; } \| { type: 'center'; animation?:_ [ViewportAnimationEffectTiming](#viewportanimationeffecttiming)<!-- -->_; } \| 'view' \| 'center'_

是否自动适应画布。⚠️ **注意**：每次执行 `render` 时，都会根据 `autoFit` 进行自适应。

两种基本自适应模式：

- `'view'` - 自动缩放，确保所有内容都在视图内可见
- `'center'` - 内容居中显示，但不改变缩放比例

还可通过对象形式实现更精细的自适应控制：

```javascript
const graph = new Graph({
  autoFit: {
    type: 'view', // 自适应类型：'view' 或 'center'
    options: {
      // 仅适用于 'view' 类型
      when: 'overflow', // 何时适配：'overflow'(仅当内容溢出时) 或 'always'(总是适配)
      direction: 'x', // 适配方向：'x'、'y' 或 'both'
    },
    animation: {
      // 自适应动画效果
      duration: 1000, // 动画持续时间(毫秒)
      easing: 'ease-in-out', // 动画缓动函数
    },
  },
});
```

#### FitViewOptions

| 属性      | 类型                       | 默认值     | 描述                                                                                                           |
| --------- | -------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| when      | `'overflow`' \| `'always'` | `'always'` | 在以下情况下进行适配 <br/> - `'overflow'` 仅当图内容超出视口时进行适配 <br/> - `'always'` 总是进行适配         |
| direction | `'x`' \| `'y`' \| `'both'` | `'both'`   | 仅对指定方向进行适配 <br/> - `'x'` 仅适配 x 方向 <br/> - `'y'` 仅适配 y 方向 <br/> - `'both'` 适配 x 和 y 方向 |

#### ViewportAnimationEffectTiming

```typescript
type ViewportAnimationEffectTiming =
  | boolean // true 启用默认动画，false 禁用动画
  | {
      easing?: string; // 动画缓动函数：'ease-in-out'、'ease-in'、'ease-out'、'linear'
      duration?: number; // 动画持续时间(毫秒)
    };
```

## autoResize

> _boolean_ **默认值:** `false`

是否自动调整画布大小。

基于 `window.onresize` 事件实现。当浏览器窗口大小变化时，画布将自动调整大小以适应容器。

## background

> _string_

画布背景色。

该颜色作为导出图片时的背景色。可以使用任何有效的 CSS 颜色值，如十六进制、RGB、RGBA 等。

## canvas

> [CanvasConfig](#canvasconfig)

画布配置。GraphOptions 下相关配置项（如 `container`、`width`、`height`、`devicePixelRatio`、`background`、`cursor`）为快捷配置项，会被转换为 canvas 配置项。

#### CanvasConfig

| 属性             | 类型                                                                           | 描述                                                   |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| container        | string \| HTMLElement                                                          | 画布容器                                               |
| devicePixelRatio | number                                                                         | 设备像素比                                             |
| width            | number                                                                         | 画布宽度                                               |
| height           | number                                                                         | 画布高度                                               |
| cursor           | string                                                                         | 指针样式，与 [GraphOptions.cursor](#cursor) 配置相同   |
| background       | string                                                                         | 画布背景色                                             |
| renderer         | (layer: `'background'` \| `'main'` \| `'label'` \| `'transient'`) => IRenderer | 渲染器，与 [GraphOptions.renderer](#renderer) 配置相同 |
| enableMultiLayer | true                                                                           | 是否启用多图层。非动态参数，仅在初始化时生效           |

## container

> _string \|_ _HTMLElement_ _\|_ Canvas

画布容器，可以是以下三种赋值之一：

- DOM 元素的 ID 字符串，如 `'container'`
- HTML 元素对象，如 `document.getElementById('container')`
- Canvas 实例，如 `new Canvas(options)`，其中 `options` 为 [CanvasConfig](#canvasconfig) 类型。

## cursor

> string

指针样式，控制鼠标悬停在画布上时的光标形状。可以使用任何有效的 CSS cursor 值。

支持的值有： `'auto'`、`'default'`、`'none'`、`'context-menu'`、`'help'`、`'pointer'`、`'progress'`、`'wait'`、`'cell'`、`'crosshair'`、`'text'`、`'vertical-text'`、`'alias'`、`'copy'`、`'move'`、`'no-drop'`、`'not-allowed'`、`'grab'`、`'grabbing'`、`'all-scroll'`、`'col-resize'`、`'row-resize'`、`'n-resize'`、`'e-resize'`、`'s-resize'`、`'w-resize'`、`'ne-resize'`、`'nw-resize'`、`'se-resize'`、`'sw-resize'`、`'ew-resize'`、`'ns-resize'`、`'nesw-resize'`、`'nwse-resize'`、`'zoom-in'`、`'zoom-out'`。

这里的 Cursor 值参考 [MDN - cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)。

## devicePixelRatio

> _number_

设备像素比。

用于高清屏的设备像素比，默认为 [window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)。

## width

> _number_

画布宽度。如果未设置，则会自动获取容器宽度。

## height

> _number_

画布高度。如果未设置，则会自动获取容器高度。

## renderer

> _(layer: 'background' \| 'main' \| 'label' \| 'transient') =&gt;_ _IRenderer_

手动指定渲染器

G6 采用了分层渲染的方式，分为 `background`、`main`、`label`、`transient` 四层，用户可以通过该配置项分别设置每层画布的渲染器。

**示例**: 使用 SVG 渲染器进行渲染

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // 方式一：直接传入渲染器
  renderer: SVGRenderer,
  // 方式二：传入渲染器实例
  renderer: new SVGRenderer(),
  // 方式三：动态设置
  renderer: () => new SVGRenderer(),
});
```

## padding

> _number \| number[]_

画布内边距

通常在自适应时，会根据内边距进行适配。可以是单个数值（四边相同）或者数组形式（按顺序指定上、右、下、左的内边距）。

**示例：**

```javascript
// 单个数值
const graph1 = new Graph({
  padding: 20, // 四边均为 20 像素的内边距
});

// 数组形式
const graph2 = new Graph({
  padding: [20, 40, 20, 40], // 上、右、下、左的内边距
});
```

## rotation

> _number_ **默认值:** `0`

旋转角度（以弧度为单位）

## x

> _number_

视口 x 坐标，设置视口的初始水平位置。

## y

> _number_

视口 y 坐标，设置视口的初始垂直位置。

## zoom

> _number_ **默认值:** `1`

设置视口的初始缩放级别，1 表示 100%（原始大小）。

## zoomRange

> _[number, number]_ **默认值:** `[0.01, 10]`

缩放范围，限制用户可以缩放的最小和最大比例。

## animation

> _boolean \| [AnimationEffectTiming](#animationeffecttiming)_

启用或关闭全局动画

为动画配置项时，会启用动画，并将该动画配置作为全局动画的基础配置。

**示例：**

```javascript
// 简单启用
const graph1 = new Graph({
  animation: true,
});

// 详细配置
const graph2 = new Graph({
  animation: {
    duration: 500, // 动画持续时间（毫秒）
    easing: 'ease-in-out', // 缓动函数
  },
});
```

## data

> [GraphData](#graphdata)

数据。

#### GraphData

| 属性   | 类型                      | 描述     |
| ------ | ------------------------- | -------- |
| nodes  | [NodeData](#nodedata)[]   | 节点数据 |
| edges  | [EdgeData](#edgedata)[]   | 边数据   |
| combos | [ComboData](#combodata)[] | 组合数据 |

#### NodeData

| 属性                                  | 类型           | 描述                                                                                         |
| ------------------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| <Badge type="success">必填</Badge> id | string         | 节点的唯一标识符，用于区分不同的节点                                                         |
| type                                  | string         | 节点类型，内置节点类型名称或者自定义节点的名称                                               |
| data                                  | Object         | 节点数据，用于存储节点的自定义数据，例如节点的名称、描述等。可以在样式映射中通过回调函数获取 |
| style                                 | Object         | 节点样式，包括位置、大小、颜色等视觉属性                                                     |
| states                                | string[]       | 节点初始状态，如选中、激活、悬停等                                                           |
| combo                                 | string \| null | 所属的组合 ID，用于组织节点的层级关系，如果没有则为 null                                     |
| children                              | string[]       | 子节点 ID 集合，仅在树图场景下使用                                                           |

#### EdgeData

| 属性                                      | 类型     | 描述                                                                     |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------ |
| <Badge type="success">必填</Badge> source | string   | 边起始节点 ID                                                            |
| <Badge type="success">必填</Badge> target | string   | 边目标节点 ID                                                            |
| id                                        | string   | 边的唯一标识符。若不指定，`id` 将根据规则 `${source}-${target}` 自动生成 |
| type                                      | string   | 边类型，内置边类型名称或者自定义边的名称                                 |
| data                                      | Object   | 边数据，用于存储边的自定义数据，可以在样式映射中通过回调函数获取         |
| style                                     | Object   | 边样式，包括线条颜色、宽度、箭头等视觉属性                               |
| states                                    | string[] | 边初始状态                                                               |

#### ComboData

| 属性                                  | 类型           | 描述                                                                 |
| ------------------------------------- | -------------- | -------------------------------------------------------------------- |
| <Badge type="success">必填</Badge> id | string         | 组合的唯一标识符                                                     |
| type                                  | string         | 组合类型，内置组合类型名称或者自定义组合名称                         |
| data                                  | Object         | 组合数据，用于存储组合的自定义数据，可以在样式映射中通过回调函数获取 |
| style                                 | Object         | 组合样式                                                             |
| states                                | string[]       | 组合初始状态                                                         |
| combo                                 | string \| null | 组合的父组合 ID。如果没有父组合，则为 null                           |

**示例：**

```javascript
const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 100 } },
      { id: 'node2', style: { x: 200, y: 200 } },
    ],
    edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
    combos: [{ id: 'combo1', style: { x: 150, y: 150 } }],
  },
});
```

- 阅读 [核心概念 - 数据](/manual/core-concept/data) 深入了解图数据，包括不限于数据格式、如何操作数据等。

## node

> [NodeOptions](#nodeoptions)

节点配置项。

#### NodeOptions

| 属性      | 类型                                                                      | 描述                                         | 默认值   |
| --------- | ------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| type      | string                                                                    | 节点类型，内置节点类型名称或自定义节点的名称 | `circle` |
| style     | [NodeStyle](/api/elements/nodes/base-node#样式属性-style)                 | 节点样式，包括颜色、大小等                   | -        |
| state     | Record<string, [Style](/api/elements/nodes/base-node#状态样式属性-state)> | 定义节点在不同状态下的样式                   | -        |
| palette   | [Palette](/api/elements/nodes/base-node#色板属性-palette)                 | 定义节点的色板，用于根据不同数据映射颜色     | -        |
| animation | [Animation](/api/elements/nodes/base-node#动画属性-animation)             | 定义节点的动画效果                           | -        |

详见 [API - Node](/api/elements/nodes/base-node)

**示例：**

```javascript
const graph = new Graph({
  node: {
    type: 'circle', // 节点类型
    style: {
      fill: '#e6f7ff', // 填充色
      stroke: '#91d5ff', // 边框色
      lineWidth: 1, // 边框宽度
      r: 20, // 半径
      labelText: (d) => d.id, // 标签文本
    },
    // 节点状态样式
    state: {
      hover: {
        lineWidth: 2,
        stroke: '#69c0ff',
      },
      selected: {
        fill: '#bae7ff',
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
  },
});
```

## edge

> [EdgeOptions](#edgeoptions)

边配置项

#### EdgeOptions

| 属性      | 类型                                                                      | 描述                                   | 默认值 |
| --------- | ------------------------------------------------------------------------- | -------------------------------------- | ------ |
| type      | string                                                                    | 边类型，内置边类型名称或自定义边的名称 | `line` |
| style     | [Style](/api/elements/edges/base-edge#样式属性-style)                     | 边样式，包括颜色、大小等               | -      |
| state     | Record<string, [Style](/api/elements/edges/base-edge#状态样式属性-state)> | 定义边在不同状态下的样式               | -      |
| palette   | [Palette](/api/elements/edges/base-edge#色板属性-palette)                 | 定义边的色板，用于根据不同数据映射颜色 | -      |
| animation | [Animation](/api/elements/edges/base-edge#动画属性-animation)             | 定义边的动画效果                       | -      |

详见 [API - Edge](/api/elements/edges/base-edge)

**示例：**

```javascript
const graph = new Graph({
  edge: {
    type: 'polyline', // 边类型
    style: {
      stroke: '#91d5ff', // 边的颜色
      lineWidth: 2, // 边的宽度
      endArrow: true, // 是否有箭头
    },
    // 边的状态样式
    state: {
      selected: {
        stroke: '#1890ff',
        lineWidth: 3,
      },
    },
  },
});
```

## combo

> [ComboOptions](#combooptions)

组合配置项

| 属性      | 类型                                                                        | 描述                                         | 默认值   |
| --------- | --------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| type      | string                                                                      | 组合类型，内置组合类型名称或自定义组合的名称 | `circle` |
| style     | [Style](/api/elements/combos/base-combo#样式属性-style)                     | 组合样式，包括颜色、大小等                   | -        |
| state     | Record<string, [Style](/api/elements/combos/base-combo#状态样式属性-state)> | 定义组合在不同状态下的样式                   | -        |
| palette   | [Palette](/api/elements/combos/base-combo#色板属性-palette)                 | 定义组合的色板，用于根据不同数据映射颜色     | -        |
| animation | [Animation](/api/elements/combos/base-combo#动画属性-animation)             | 定义组合的动画效果                           | -        |

详见 [API - Combo](/api/elements/combos/base-combo)

**示例：**

```javascript
const graph = new Graph({
  combo: {
    type: 'circle', // 组合类型
    style: {
      fill: '#f0f0f0', // 背景色
      stroke: '#d9d9d9', // 边框色
      lineWidth: 1, // 边框宽度
    },
    // 组合状态样式
    state: {
      selected: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
  },
});
```

## layout

> _CustomLayoutOptions \| CustomLayoutOptions[]_

布局配置项，可以是对象（普通布局）或数组（流水线布局）。

**示例**:

```javascript
const graph = new Graph({
  container: 'container',
  layout: {
    type: 'force', // 力导向布局
    preventOverlap: true, // 防止节点重叠
    nodeStrength: -50, // 节点之间的斥力
    edgeStrength: 0.5, // 边的弹性系数
    iterations: 200, // 迭代次数
    animation: true, // 启用布局动画
  },
});
```

## theme

> _false \| 'light' \| 'dark' \| string_

设置图表的主题，可以是内置的 `'light'`、`'dark'` 主题，也可以是自定义主题的名称。设为 `false` 则不使用任何主题。

## behaviors

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =&gt;CustomExtensionOptions))[]_

配置图表的交互行为，可以是字符串（使用默认配置）、对象（自定义配置）或函数（动态配置、函数内可访问图实例）。

**示例：**

```javascript
const graph = new Graph({
  behaviors: [
    'drag-canvas', // 使用默认配置启用画布拖拽
    'zoom-canvas', // 使用默认配置启用画布缩放
    {
      type: 'drag-element', // 自定义配置拖拽元素
      key: 'drag-node-only',
      enable: (event) => event.targetType === 'node', // 只允许拖拽节点
    },
    function () {
      console.log(this); // 输出 graph 实例
      return {
        type: 'hover-activate',
      };
    },
  ],
});
```

- 查看 [核心概念 - 交互](/manual/core-concept/behavior) 深入了解交互原理
- 浏览 [API - 交互](/api/behaviors/auto-adapt-label) 获取所有内置交互列表及其配置选项

## plugins

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =&gt;CustomExtensionOptions))[]_

设置图表的插件，可以是字符串（使用默认配置）、对象（自定义配置）或函数（动态配置、函数内可访问图实例）。

**示例：**

```javascript
const graph = new Graph({
  container: 'container',
  plugins: [
    'minimap', // 启用小地图，使用默认配置
    {
      type: 'grid', // 启用网格背景
      key: 'grid-plugin',
      line: {
        stroke: '#d9d9d9',
        lineWidth: 1,
      },
    },
    {
      type: 'toolbar', // 启用工具栏
      key: 'graph-toolbar',
      position: 'top-right', // 位置
    },
  ],
});
```

- 查看 [核心概念 - 插件](/manual/core-concept/plugin) 深入了解插件原理
- 浏览 [API - 插件](/api/plugins/background) 获取所有内置插件列表及其配置项

## transforms

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =&gt;CustomExtensionOptions))[]_

配置数据处理，用于在渲染前对数据进行处理，不会影响原始数据。可以是字符串（使用默认配置）、对象（自定义配置）或函数（动态配置、函数内可访问图实例）。

**示例：**

```javascript
const graph = new Graph({
  transforms: [
    'process-parallel-edges', // 处理平行边，使用默认配置
    {
      type: 'map-node-size', // 根据节点数据映射节点大小
      field: 'value', // 使用 value 字段的值
      max: 50, // 最大半径
      min: 20, // 最小半径
    },
  ],
});
```

- 浏览 [API - 数据处理](/api/transforms/map-node-size) 获取所有内置数据处理列表及其配置项

#### CustomExtensionOptions

```typescript
interface CustomExtensionOption extends Record<string, any> {
  /** 拓展类型 */
  type: string;
  /** 拓展 key，即唯一标识 */
  key?: string;
}
```
