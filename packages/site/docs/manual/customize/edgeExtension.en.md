---
title: Custom Edge
order: 2
---

## Example

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// Custom edge type, inherit an existing edge type or edge base class Extensions.BaseEdge
class CustomNode extends Extensions.LineEdge {
  // Override methods, see the following section for methods that can be overridden
}

const Graph = extend(BaseGraph, {
  // Register custom edge
  edges: {
    'custom-edge': CustomEdge,
  },
});

const graph = new Graph({
  // ... Other configurations
  edge: {
    type: 'custom-edge', // Use the registered edge
  },
});
```

## Override methods

### draw

:::info
In most cases, there is no need to override the draw method. It is more common to override methods such as `drawKeyShape` and `drawLabelShape`, which will be introduced in the following section.
:::

G5 5.0 removes the `update` and `afterUpdate` methods. Now you only need to override the `draw` method and the `afterDraw` method, and G6 will automatically update the shapes incrementally based on the updated attributes.

The `draw` method draws each part of the edge by calling methods such as `this.drawKeyShape`.

Refer to the [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/line.ts#L28) method of the `line-edge` type edge for overriding.

### afterDraw

The logic executed after the `draw` function is completed can also be used to draw more shapes. The return value is the same as the `draw` method. It is not implemented in the built-in edge types.

### drawKeyShape

Draw the main shape (`keyShape`), which is required. For example, the main shape of a line edge is a straight line (`line`) and the head and tail arrows (`arrow`), and the main shape of a curved edge replaces the straight line with a curved path (`path`).

The following example overrides the `drawKeyShape` method to draw a **straight edge**:

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
  // upsert arrow
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // upsert and return shape
  return this.upsertShape('line', 'keyShape', lineStyle, shapeMap, model);
}
```

If you want to draw a curve or polyline, you should calculate the path based on the control points in `drawKeyShape`. For example, the `drawKeyShape` method of the built-in `quadratic-edge`:

```typescript
public drawKeyShape(
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) {
  const { keyShape: keyShapeStyle } = this.mergedStyles as any;
  const { startArrow, endArrow, ...others } = keyShapeStyle;

  // Calculate control points based on arc position, arc, etc.
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
  // upsert arrow
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // upsert and return shape
  return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
}
```

The `this.getControlPoints` can be overridden to customize the control point calculation logic, see [getControlPoints](#getcontrolpoints).

### drawHaloShape

Draw the main shape outline (`haloShape`), which is usually displayed in the `selected` and `active` states.

Refer to [BaseEdge.drawHaloShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L464) for overriding.

### drawLabelShape

Draw the text shape (`labelShape`)

Refer to [BaseEdge.drawLabelShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L194) for overriding.

### drawLabelBackgroundShape

Draw the background shape of the text shape (`labelBackgroundShape`)

Refer to [BaseEdge.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L311) for overriding.

### drawOtherShapes

Draw shapes other than the above parts, which can be completed in `drawOtherShapes`, such as drawing an extra circle:

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

## Member properties and methods

`BaseEdge` and its subclasses provide some member properties and methods that can be used when customizing edges.

### getControlPoints

Get the control points, usually used to calculate the path. For example, the control points of the polyline edge are the turning points, and the control points of the curved edge are the control points of the curve.

When inheriting `Extensions.PolylineEdge`, `Extensions.QuadraticEdge`, `Extensions.CubicEdge`, `Extensions.CubicHorizontalEdge`, `Extensions.CubicVerticalEdge`, you can override `getControlPoints` to modify the logic of the control points.

The `getControlPoints` type of `Extensions.PolylineEdge` is:

```typescript
(
  /** Edge rendering data */
  model: EdgeDisplayModel,
  /** Edge start point */
  sourcePoint: Point,
  /** Edge end point */
  targetPoint: Point,
) =>
/** Calculated control points */
{
  x: number;
  y: number;
  z?: number;
}[]
```

The `getControlPoints` type of `Extensions.QuadraticEdge`、`Extensions.CubicEdge`、`Extensions.CubicHorizontalEdge`、`Extensions.CubicVerticalEdge` is:

```typescript
(
  /** Edge start point */
  startPoint: Point,
  /** Edge end point */
  endPoint: Point,
  /** Percentage of the projection of the control point on the line connecting the two end points, ranging from 0 to 1 */
  percent: number,
  /** Control point configuration in data */
  controlPoints: Point[],
  /** Arc distance */
  offset: number,
) =>
/** Calculated control points */
{
  x: number;
  y: number;
  z?: number;
}[];
```

### getPath

The member method of `Extensions.PolylineEdge` can only be overridden when inheriting it to implement a custom edge. Because the automatic path-finding algorithm of the polyline is more complicated, this function is extracted separately. Also because of the complexity of the algorithm, the performance of the polyline edge is slightly worse. If there is a certain rule for drawing the polyline edge, you can inherit the built-in polyline edge and customize the `getPath` method to override the automatic path-finding logic. The function type is:

```typescript
(
  /** Edge rendering data */
  model: EdgeDisplayModel,
  /** Edge start point */
  points: Point[],
  /** Radius of the polyline turning point */
  radius: number,
  /** Edge end point */
  routeCfg?: RouterCfg,
  /** Whether to use the A* algorithm */
  auto?: boolean,
) =>
  /** Path */
  string;
```

<details>
<summary style="color: #873bf4; cursor: pointer;">RouterCfg</summary>

```ts
type RouterCfg = {
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
};
```

</details>

<embed src="../../common/PluginMergedStyles.en.md"></embed>

<embed src="../../common/PluginUpsertShape.en.md"></embed>
