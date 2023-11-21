---
title: Custom Edge
order: 8
---

In G6, if a built-in edge does not meet a specific need, you can create a custom edge by extending an existing edge Type. This allows you to leverage the powerful built-in functionality of G6 while adding unique logic and style to the edge.

Custom edges can be created by inheriting from built-in edges, such as LineEdge. For inheritable graphics, see: [Edge Type](/en/manual/customize/extension-cats#2-边Typeedges).

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

## Override method

### draw

:::info
In most cases, there is no need to override the draw method. It is more common to override methods such as `drawKeyShape` and `drawLabelShape`, which will be introduced in the following section.
:::

**Type**: `draw`

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

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

G5 5.0 removes the `update` and `afterUpdate` methods. Now you only need to override the `draw` method and the `afterDraw` method, and G6 will automatically update the shapes incrementally based on the updated attributes.

The `draw` method draws each part of the edge by calling methods such as `this.drawKeyShape`.

Refer to the [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/line.ts#L28) method of the `line-edge` type edge for overriding.

### afterDraw

**Type**: `afterDraw`

<details>

<summary style="color: #873bf4; cursor: pointer">afterDraw</summary>

```typescript
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

The logic executed after the `draw` function is completed can also be used to draw more shapes. The return value is the same as the `draw` method. It is not implemented in the built-in edge types.

### drawKeyShape

**Type**: `drawKeyShape`

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

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draw the main shape (`keyShape`), which is required.

### drawLabelShape

**Type**: `drawLabelShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelShape</summary>

```typescript
type drawLabelShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draw the text shape (`labelShape`)

Refer to [BaseEdge.drawLabelShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L194) for overriding.

### drawLabelBackgroundShape

**Type**: `drawLabelBackgroundShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelBackgroundShape</summary>

```typescript
type drawLabelBackgroundShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draw the background shape of the text shape (`labelBackgroundShape`)

Refer to [BaseEdge.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L311) for overriding.

### drawIconShape

**Type**: `drawIconShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawIconShape</summary>

```typescript
type drawIconShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draw the icon shape of the edge.

### drawHaloShape

**Type**: `drawHaloShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawHaloShape</summary>

```typescript
type drawHaloShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draw the main shape outline (`haloShape`), which is usually displayed in the `selected` and `active` states.

Refer to [BaseEdge.drawHaloShape](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/edge/base.ts#L464) for overriding.

### drawOtherShapes

**Type**: `drawOtherShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawOtherShapes</summary>

```typescript
type drawOtherShapes = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => { [id: string]: DisplayObject };
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Draws other shapes of the edge. Other shapes in a custom edge should be defined and configured in `otherShapes`.

### getMergedStyles

**Type**: `getMergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">getMergedStyles</summary>

```typescript
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

将 display model 数据中定义的样式与边的默认和主题样式合并

## Member properties and methods

`BaseEdge` and its subclasses provide some member properties and methods that can be used when customizing edges.

### getControlPoints

**Type**: `getControlPoints`

<details>

<summary style="color: #873bf4; cursor: pointer">getControlPoints</summary>

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

</details>

Get the control points, usually used to calculate the path. For example, the control points of the polyline edge are the turning points, and the control points of the curved edge are the control points of the curve.

When inheriting `Extensions.PolylineEdge`, `Extensions.QuadraticEdge`, `Extensions.CubicEdge`, `Extensions.CubicHorizontalEdge`, `Extensions.CubicVerticalEdge`, you can override `getControlPoints` to modify the logic of the control points.

### getPath

**Type**: `getPath`

<details>

<summary style="color: #873bf4; cursor: pointer">getPath</summary>

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

</details>

The member method of `Extensions.PolylineEdge` can only be overridden when inheriting it to implement a custom edge. Because the automatic path-finding algorithm of the polyline is more complicated, this function is extracted separately. Also because of the complexity of the algorithm, the performance of the polyline edge is slightly worse. If there is a certain rule for drawing the polyline edge, you can inherit the built-in polyline edge and customize the `getPath` method to override the automatic path-finding logic.

<embed src="../../../common/PluginMergedStyles.en.md"></embed>

<embed src="../../../common/PluginUpsertShape.en.md"></embed>

### upsertArrow

**Type**: `upsertArrow`

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

For more detailed data configuration, refer to [EdgeDisplayModel](../../data/EdgeDisplayModel.en.md).

</details>

Add or update an arrow marker at the specified position on the edge.
