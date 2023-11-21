---
title: 自定义边
order: 8
---

在 G6 中，如果内置边不能满足特定需求，可以通过扩展已有的边类型来创建自定义边。这允许您利用 G6 强大的内置功能的同时，为边添加特有的逻辑和样式。

可以通过继承内置的边（例如 LineEdge），来创建自定义边。可继承图形参见： [边类型](/manual/customize/extension-cats#2-边类型edges)

## 示例

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// 自定义边类型，继承一个已有的边类型或边基类 Extensions.BaseEdge
class CustomNode extends Extensions.LineEdge {
  // 覆写方法，可覆写的类方法见下文
}

const Graph = extend(BaseGraph, {
  // 注册自定义边
  edges: {
    'custom-edge': CustomEdge,
  },
});

const graph = new Graph({
  // ... 其他配置
  edge: {
    type: 'custom-edge', // 使用注册的节点
  },
});
```

## 覆写方法

### draw

:::info{title=提示}
大多数情况下并不需要覆写 draw 方法，更常用的做法是覆写 `drawKeyShape`、`drawLabelShape` 等方法，这些方法将在下文介绍。
:::

**类型**：`draw`

<details>

<summary style="color: #873bf4; cursor: pointer">draw</summary>

```typescript
type draw = (
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: { [shapeId: string]: DisplayObject },
) => {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
};
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

G5 5.0 移除了 `update` 和 `afterUpdate` 方法。现在只需要复写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法通过调用 `this.drawKeyShape` 等方法分别绘制边各部分。

你可以参考 `line-edge` 类型边的 [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/line.ts#L28) 方法进行覆写。

### afterDraw

**类型**：`afterDraw`

<details>

<summary style="color: #873bf4; cursor: pointer">afterDraw</summary>

```typescript
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

在 `draw` 函数完成之后执行的逻辑，也可以用于绘制更多的图形，返回值和 `draw` 方法一致。在内置的节点类型中，没有对它进行实现。

### drawKeyShape

**类型**：`drawKeyShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawKeyShape</summary>

```typescript
type drawKeyShape = (
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) => DisplayObject;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制主图形(`keyShape`)，该图形是必须的，例如直线边的主图形是一条直线(`line`) 以及首尾箭头(`arrow`)，曲线边的主图形则将直线换成了曲线路径(`path`)。

### drawLabelShape

**类型**：`drawLabelShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelShape</summary>

```typescript
type drawLabelShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制文本图形（`labelShape`）

若需要覆写，则可以参考 [BaseEdge.drawLabelShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L194)

### drawLabelBackgroundShape

**类型**：`drawLabelBackgroundShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelBackgroundShape</summary>

```typescript
type drawLabelBackgroundShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制文本图形的背景框图形（`labelBackgroundShape`）

若需要覆写，则可以参考 [BaseEdge.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L311)

### drawIconShape

**类型**：`drawIconShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawIconShape</summary>

```typescript
type drawIconShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制边的图标图形

### drawHaloShape

**类型**：`drawHaloShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawHaloShape</summary>

```typescript
type drawHaloShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制主图形轮廓图形(`haloShape`)，通常在 `selected`, `active` 状态下显示。

若需要覆写，则可以参考 [BaseEdge.drawHaloShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L464)

### drawOtherShapes

**类型**：`drawOtherShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawOtherShapes</summary>

```typescript
type drawOtherShapes = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => { [id: string]: DisplayObject };
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

绘制边的其他图形。自定义边中的其他图形应当定义和配置在 `otherShapes` 中。

### getMergedStyles

**类型**：`getMergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">getMergedStyles</summary>

```typescript
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

将 display model 数据中定义的样式与边的默认和主题样式合并

## 成员属性及方法

继承的图形提供下列方法调用

### getControlPoints

**类型**：`getControlPoints`

<details>

<summary style="color: #873bf4; cursor: pointer">getControlPoints</summary>

`Extensions.PolylineEdge` 的 `getControlPoints` 类型为：

```typescript
 (
  /** 边的渲染数据 */
  model: EdgeDisplayModel,
  /** 边的起点 */
  sourcePoint: Point,
  /** 边的终点 */
  targetPoint: Point,
) => /** 计算后的控制点 */
{
  x: number;
  y: number;
  z?: number;
}[];
```

`Extensions.QuadraticEdge`、`Extensions.CubicEdge`、`Extensions.CubicHorizontalEdge`、`Extensions.CubicVerticalEdge` 的 `getControlPoints` 类型为：

```typescript
(
  /** 边的起点 */
  startPoint: Point,
  /** 边的终点 */
  endPoint: Point,
  /** 控制点的投影在两端点连线上的百分比，范围 0 到 1 */
  percent: number,
  /** 数据中控制点配置 */
  controlPoints: Point[],
  /** 弧度距离 */
  offset: number,
) =>
/** 计算后的控制点 */
{
  x: number;
  y: number;
  z?: number;
}[];
```

</details>

获取控制点，通常用于计算路径。例如折线边的控制点是拐点，曲线边的控制点是曲线的控制点。

当继承 Extensions.PolylineEdge、Extensions.QuadraticEdge、Extensions.CubicEdge、Extensions.CubicHorizontalEdge、Extensions.CubicVerticalEdge 时，可以通过复写 `getControlPoints` 来修改控制点的逻辑。

### getPath

**类型**：`getPath`

<details>

<summary style="color: #873bf4; cursor: pointer">draw</summary>

```typescript
(
  /** 边的渲染数据 */
  model: EdgeDisplayModel,
  /** 起点和终点 */
  points: Point[],
  /** 折线拐点的弧度 */
  radius: number,
  /** 折线弯折的配置 */
  routeCfg?: RouterCfg,
  /** 是否使用 A* 算法 */
  auto?: boolean,
) =>
  /** 路径 */
  string;
```

<details>

<summary style="color: #873bf4; cursor: pointer;">RouterCfg</summary>

```ts
type RouterCfg = {
  name: 'orth' | 'er';
  /** 线与点之间的间距 */
  offset?: number;
  /** 网格大小 */
  gridSize?: number;
  /** 最大旋转角度（弧度） */
  maxAllowedDirectionChange?: number;
  /** 允许的边的方向 */
  directions?: any[];
  /** 起点和终点的权重 */
  penalties?: {};
  /** 是否使用简单的折线拐点寻径算法 */
  simple?: boolean;
  /** 计算两点之间距离的函数 */
  distFunc?: (p1: PolyPoint, p2: PolyPoint) => number;
  /** 简化的寻径函数 */
  fallbackRoute?: (p1: PolyPoint, p2: PolyPoint, startNode?: Node, endNode?: Node, cfg?: RouterCfg) => PolyPoint[];
  /** 最大循环次数 */
  maximumLoops?: number;
  /** 是否自动避开障碍物，默认为 false */
  enableObstacleAvoidance?: boolean;
};
```

</details>

</details>

`Extensions.PolylineEdge` 的成员方法，仅在继承它来实现自定义边时可复写。由于折线的自动寻径算法比较复杂，因此单独抽出了这个函数。也由于算法复杂性，折线边的性能稍差。如果有确定的折线边绘制规则，可以通过继承内置折线边，自定义 `getPath` 方法覆盖自动寻径的逻辑。

<embed src="../../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../../common/PluginUpsertShape.zh.md"></embed>

### upsertArrow

**类型**：`upsertArrow`

<details>

<summary style="color: #873bf4; cursor: pointer">upsertArrow</summary>

```typescript
type upsertArrow = (
  position: 'start' | 'end',
  arrowConfig: boolean | ArrowStyle,
  bodyStyle: ShapeStyle,
  model: EdgeDisplayModel,
  resultStyle: ShapeStyle,
) => void;
```

其中，相关的数据类型定义参考 [EdgeDisplayModel 渲染数据](../../data/EdgeDisplayModel.zh.md)。

</details>

在边的指定位置添加或更新箭头标记
