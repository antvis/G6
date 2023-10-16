---
title: 自定义边类型扩展
order: 2
---

G6 5.0 提供了内置、自定义统一的定义和注册逻辑。所有内置、自定义的边类型，应当继承边的基类 `BaseEdge` 或已有的边类型。根据需要，选择性复写以下函数：

## draw

相比于 v4 版本，v5 去除了 `update` 和 `afterUpdate` 方法，目标是减少用户对函数的理解成本和逻辑控制。在 v5，只需要复写 `draw` 方法和 `afterDraw` 方法，G6 将自动根据更新的属性增量更新图形。

draw 方法中，应当调用 `this.drawKeyShape` 以及 `this.drawXShape` 方法交由不同的方法绘制各个图形。G6 边视觉规范中的图形有：

- keyShape: 主图形，每个边必须有；
- haloShape: 主图形背后的光晕图形，一般形状和 keyShape 一致，在某些状态（如 selected，active 等）状态下显示；
- labelShape: label 文本图形；
- labelBackgroundShape: label 文本背景框图形；
- iconShape: 图标图形。

而不在上述列表中的图形，应当通过 `drawOtherShapes` 来绘制。当然你也可以定义自己的 `drawXShape(s)`，并在 `draw` 方法中调用，将返回的图形写入到一个 key 是图形 id，value 是图形的图形对象中，并作为 `draw` 方法的返回值。

下面是 `line-edge` 类型边的 `draw` 方法，可参考进行复写：

```typescript
public draw(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
  diffData?: { previous: EdgeModelData; current: EdgeModelData },
  diffState?: { previous: State[]; current: State[] },
): EdgeShapeMap {
  const { data = {} } = model;

  let shapes: EdgeShapeMap = { keyShape: undefined };

  shapes.keyShape = this.drawKeyShape(
    model,
    sourcePoint,
    targetPoint,
    shapeMap,
    diffData,
  );

  if (data.haloShape) {
    shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
  }

  if (data.labelShape) {
    shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
  }

  // labelBackgroundShape
  if (data.labelBackgroundShape) {
    shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
      model,
      shapeMap,
      diffData,
    );
  }

  if (data.iconShape) {
    shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
  }

  // otherShapes
  if (data.otherShapes) {
    shapes = {
      ...shapes,
      ...this.drawOtherShapes(model, shapeMap, diffData),
    };
  }

  return shapes;
}
```

## afterDraw

在 `draw` 函数完成之后执行的逻辑，例如根据 `draw` 中已绘制的图形的包围盒大小，调整其他相关的图形。也可以用于绘制更多的图形，返回值如同 `draw` 方法，是新增图形的 map。在内置的边类型中，没有对它进行实现。

```typescript
public afterDraw(
  model: EdgeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
): { [otherShapeId: string]: DisplayObject } {
  // 返回新增图形的 map，key 是图形 id，value 是图形。
  return {};
}
```

## drawXShape(s)

绘制 X 图形的方法，例如 `drawKeyShape`、`drawAnchorShapes` 等，下面将举例。所有的 drawXShape(s) 应当调用 `this.upsertShape` 新增/修改图形，该方法将检测传入的 shapeMap 中是否已有对应 id 的图形，若不存在则新建，若存在则增量更新。

`this.upsertShape(shapeType, shapeId, style, shapeMap, model)` 的参数如下：

- `shapeType`：
  - 类型：`'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text'`；
  - 图形类型名称；
- `shapeId`：
  - 类型：`string`；
  - 图形 id，一般和 drawXShape(s) 中的 X 对应（小驼峰式），后续都将使用该 id 进行检索；
- `style`：
  - 类型：`ShapeStyle`；
  - 图形的样式，一般在 `drawXShape(s)` 中从其第一个参数渲染数据 `model` 中解析出来；
- `shapeMap`：
  - 类型：`object`；
  - key 为图形 id，value 为图形的 map 对象，即 `drawXShape(s)` 的第二个参数。
- `model`：
  - 类型：`EdgeDisplayModel` 类型；
  - 边的渲染数据，即 `drawXShape(s)` 的第一个参数。

下面举例 `drawKeyShape`、`drawLabelShape`、`drawLabelBackgroundShape`、`drawOtherShapes`。

### 例 1: drawKeyShape

绘制主图形 keyShape 的方法，`line-edge` 的 `drawKeyShape` 实现如下，理论上在自定义边中根据需要更改 upsertShape 的图形类型和对应配置即可：

```typescript
public drawKeyShape(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
  diffData?: { previous: EdgeModelData; current: EdgeModelData },
  diffState?: { previous: State[]; current: State[] },
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

上面绘制直线边的 keyShape 是 `line` 图形，只需要起点和终点的坐标。若是曲线或折线，则 keyShape 是 `path`，`drawKeyShape` 中应当根据控制点，计算 `path` 值。例如内置的 `quadratic-edge` 的 `drawKeyShape` 方法：

```typescript
public drawKeyShape(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
  diffData?: { previous: EdgeModelData; current: EdgeModelData },
  diffState?: { previous: State[]; current: State[] },
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

其中，`this.getControlPoints` 可以进行复写，从而自定义控制点计算逻辑，见 [getControlPoints](#getControlPoints)。

### 例 2: drawLabelShape

绘制文本图形 labelShape 的方法，内置边的 `drawLabelShape` 根据配置中的 `position` （文本相对于 keyShape 的位置）、`autoRotate`（是否跟随 keyShape 切线旋转）、`maxWidth`（文本的最长长度，超过则截断并显示 `…`，值相对于 keyShape 的百分比或绝对的像素值）等非直接图形样式的属性，进行了计算转换为图形样式，使用计算后的样式调用 `this.upsertShape` 绘制 `line` 或 `path` 图形。若自定义边中无需考虑这些配置，可以忽略并完全重新 `drawLabelShape`。若需要考虑，则可以参考 [`baseEdge` 的实现](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/edge/base.ts#L239)。

### 例 3: drawLabelBackgroundShape

绘制文本图形的背景框图形 labelBackgroundShape 的方法，内置的 `drawLabelBackgroundShape` 将根据 `labelShape` 的包围盒大小，计算背景框矩形的大小。这要求了调用本方法时，`labelShape` 应当已经被绘制。因此自定义的时候也应当注意在 `draw` 方法中先调用 `drawLabelShape` 再调用 `drawLabelBackgroundShape`。若其他图形之间存在包围盒大小计算的依赖，也应当参考这一逻辑，只有已经被绘制的图形才能从 `shapeMap` 中取得并使用 `shape.getRenderBounds()` 或 `shape.getLocalBounds()` 获得包围盒。

内置的 `drawLabelBackgroundShape` 根据配置和 `labelShape` 进行了样式的计算后，使用 `this.upsertShape` 绘制 `rect` 图形，可参考[`baseEdge` 的实现](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/edge/base.ts#L356)。

### 例 4: drawOtherShapes

keyShape、haloShape、labelShape、labelBackgroundShape、iconShape 都是 G6 v5 节点样式规范中的图形。若自定义节点中有规范之外的图形，可以在 `drawOtherShapes` 绘制，它们在渲染数据 `model` 中的配置也将被包在 `otherShapes` 字段下：

```typescrirpt
{
  id: ID,
  source: ID,
  target: ID,
  data: {
    keyShape: ShapeStyle,
    haloShape: ShapeStyle,
    // ... 其他规范内的图形
    // 额外的图形：
    otherShapes: {
      xxShape: ShapeStyle,
      yyShape: ShapeStyle,
      // ... 其他额外图形
    }
  }
}
```

从 `model` 中取出对应的字段，或根据自定义的逻辑，传给 `this.upsertShape` 必要的图形样式属性，增加图形，并返回新增图形的 map，例如：

```typescript
public drawOtherShapes(
  model: EdgeDisplayModel,
  shapeMap: EdgeShapeMap,
  diffData?: { oldData: EdgeModelData; newData: EdgeModelData },
) {
  return {
    extraShape: upsertShape(
      'circle',
      'extraShape',
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

## getControlPoints

仅在折线、曲线边的 `drawKeyShape` 方法中，将调用改方法获取控制点，从而计算路径。当继承 Extensions.PolylineEdge、Extensions.QuadraticEdge、Extensions.CubicEdge、Extensions.CubicHorizontalEdge、Extensions.CubicVerticalEdge 时，可以通过复写 `getControlPoints` 来修改控制点的逻辑。
`Extensions.PolylineEdge` 的 `getControlPoints` 类型为：

```typescript
/**
 * 计算控制点
 * @param model 渲染数据
 * @param sourcePoint 边的起点
 * @param targetPoint 边的终点
 * @returns 计算后的控制点
 */
type getControlPoints =(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
): {
  x: number;
  y: number;
  z?: number;
}[]
```

`Extensions.QuadraticEdge`、`Extensions.CubicEdge`、`Extensions.CubicHorizontalEdge`、`Extensions.CubicVerticalEdge` 的 `getControlPoints` 类型为：

```typescript
/**
 * 根据 curvePosition|controlPoints|curveOffset 计算控制点
 * @param startPoint 边的起点
 * @param endPoint 边的终点
 * @param percent 控制点的投影在两端点连线上的百分比，范围 0 到 1
 * @param controlPoints 数据中控制点配置
 * @param offset 弧度距离
 * @returns 计算后的控制点
 */
type getControlPoints = (
  startPoint: Point,
  endPoint: Point,
  percent: number,
  contrPointolPoints: Point[],
  offset: number,
) => {
  x: number;
  y: number;
  z?: number;
}[];
```

## getPath

`Extensions.PolylineEdge` 的成员方法，仅在继承它来实现自定义边时可复写。由于折线的自动寻径算法比较复杂，因此单独抽出了这个函数。也由于算法复杂性，折线边的性能稍差。如果有确定的折线边绘制规则，可以通过继承内置折线边，自定义 `getPath` 方法覆盖自动寻径的逻辑。函数类型为：

```typescript
/**
 * 获取路径
 * @param model 边的渲染数据
 * @param points 起点和终点
 * @param radius 折线拐点的弧度
 * @param routeCfg 折线弯折的配置，类型见下面
 * @param auto 是否使用 A* 算法
 * @returns
 */
type getPath = (
  model: EdgeDisplayModel,
  points: Point[],
  radius: number,
  routeCfg?: RouterCfg,
  auto?: boolean,
) => string;

interface RouterCfg {
  name: 'orth' | 'er';
  /** Spacing between lines and points */
  offset?: number;
  /** Grid size */
  gridSize?: number;
  /** Maximum allowable rotation angle (radian) */
  maxAllowedDirectionChange?: number;
  /** Allowed edge directions */
  directions?: any[];
  /** Penalties */
  penalties?: {};
  /** Determine if use simple router for polyline when no obstacles */
  simple?: boolean;
  /** Function to calculate the distance between two points */
  distFunc?: (p1: PolyPoint, p2: PolyPoint) => number;
  /** Simplified function to find path */
  fallbackRoute?: (p1: PolyPoint, p2: PolyPoint, startNode?: Node, endNode?: Node, cfg?: RouterCfg) => PolyPoint[];
  /** Maximum loops */
  maximumLoops?: number;
  /**
   * Whether to automatically avoid other nodes (obstacles) on the path
   * Defaults to false.
   */
  enableObstacleAvoidance?: boolean;
}
```
