---
title: 自定义边
order: 2
---

## 示例

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// 自定义变类型，继承一个已有的边类型或边基类 Extensions.BaseEdge
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

G5 5.0 移除了 `update` 和 `afterUpdate` 方法。现在只需要复写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法通过调用 `this.drawKeyShape` 等方法分别绘制边各部分。

你可以参考 `line-edge` 类型边的 [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/line.ts#L28) 方法进行覆写。

### afterDraw

在 `draw` 函数完成之后执行的逻辑，也可以用于绘制更多的图形，返回值和 `draw` 方法一致。在内置的节点类型中，没有对它进行实现。

### drawKeyShape

绘制主图形(`keyShape`)，该图形是必须的，例如直线边的主图形是一条直线(`line`) 以及首尾箭头(`arrow`)，曲线边的主图形则将直线换成了曲线路径(`path`)。

覆写 `drawKeyShape` 方法绘制**直线边**的示例如下：

```typescript
public drawKeyShape(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) {
  const { keyShape: keyShapeStyle } = this.mergedStyles;
  const { startArrow, endArrow, ...others } = keyShapeStyle;
  const lineStyle = {
    ...others,
    x1: sourcePoint.x,
    y1: sourcePoint.y,
    z1: sourcePoint.z || 0,
    x2: targetPoint.x,
    y2: targetPoint.y,
    z2: targetPoint.z || 0,
    isBillboard: true,
  };
  // 绘制箭头
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // 绘制并返回图形
  return this.upsertShape('line', 'keyShape', lineStyle, shapeMap, model);
}
```

若要绘制曲线或折线，`drawKeyShape` 中应当根据控制点，计算路径。例如内置的 `quadratic-edge` 的 `drawKeyShape` 方法：

```typescript
public drawKeyShape(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) {
  const { keyShape: keyShapeStyle } = this.mergedStyles as any;
  const { startArrow, endArrow, ...others } = keyShapeStyle;

  // 根据弧度位置、弧度等信息计算控制点
  const controlPoint = this.getControlPoints(
    sourcePoint,
    targetPoint,
    keyShapeStyle.curvePosition,
    keyShapeStyle.controlPoints,
    keyShapeStyle.curveOffset,
  )[0];
  const lineStyle = {
    ...others,
    path: [
      ['M', sourcePoint.x, sourcePoint.y],
      ['Q', controlPoint.x, controlPoint.y, targetPoint.x, targetPoint.y],
    ],
  };
  // 绘制箭头
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // 绘制并返回图形
  return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
}
```

其中，`this.getControlPoints` 可以进行复写，从而自定义控制点计算逻辑，见 [getControlPoints](#getcontrolpoints)。

### drawHaloShape

绘制主图形轮廓图形(`haloShape`)，通常在 `selected`, `active` 状态下显示。

若需要覆写，则可以参考 [BaseEdge.drawHaloShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L464)

### drawLabelShape

绘制文本图形（`labelShape`）

若需要覆写，则可以参考 [BaseEdge.drawLabelShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L194)

### drawLabelBackgroundShape

绘制文本图形的背景框图形（`labelBackgroundShape`）

若需要覆写，则可以参考 [BaseEdge.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L311)

### drawOtherShapes

绘制上述内容之外的图形，可以在 `drawOtherShapes` 中完成，例如额外创建一个圆形：

```typescript
public drawOtherShapes(
  model: EdgeDisplayModel,
  shapeMap: EdgeShapeMap,
) {
  return {
    extraShape: upsertShape(
      'circle',
      'other-circle-shape',
      {
        r: 4,
        fill: '#0f0',
        x: -20,
        y: 0,
      },
      shapeMap,
    ),
  };
}
```

## 成员属性及方法

### getControlPoints

获取控制点，通常用于计算路径。例如折线边的控制点是拐点，曲线边的控制点是曲线的控制点。

当继承 Extensions.PolylineEdge、Extensions.QuadraticEdge、Extensions.CubicEdge、Extensions.CubicHorizontalEdge、Extensions.CubicVerticalEdge 时，可以通过复写 `getControlPoints` 来修改控制点的逻辑。

`Extensions.PolylineEdge` 的 `getControlPoints` 类型为：

```typescript
(
  /** 边的渲染数据 */
  model: EdgeDisplayModel,
  /** 边的起点 */
  sourcePoint: Point,
  /** 边的终点 */
  targetPoint: Point,
) =>
/** 计算后的控制点 */
{
  x: number;
  y: number;
  z?: number;
}[]
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

### getPath

`Extensions.PolylineEdge` 的成员方法，仅在继承它来实现自定义边时可复写。由于折线的自动寻径算法比较复杂，因此单独抽出了这个函数。也由于算法复杂性，折线边的性能稍差。如果有确定的折线边绘制规则，可以通过继承内置折线边，自定义 `getPath` 方法覆盖自动寻径的逻辑。函数类型为：

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

<embed src="../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../common/PluginUpsertShape.zh.md"></embed>
