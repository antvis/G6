---
title: Custom Edge Type Extensions
order: 2
---

In G6 5.0, there is a unified built-in and custom definition and registration logic provided. All built-in and custom edge types should inherit from the base class `BaseEdge` or an existing edge type. Depending on your requirements, you can selectively override the following functions:

## draw

Compared to version 4, version 5 of G6 has removed the `update` and `afterUpdate` methods. The goal is to reduce the cognitive load and logic control for users. In version 5, you only need to override the `draw` method and the `afterDraw` method. G6 will automatically update the graphics based on the updated attributes incrementally.

In the `draw` method, you should call `this.drawKeyShape` and `this.drawXShape(s)` methods to delegate the drawing of different shapes. The visual specification of G6 edges includes the following shapes:

- keyShape: The main shape, also known as the key shape, is a necessary component for every edge. It represents the primary visual appearance of the edge and is required for each edge;
- haloShape: The halo shape behind the main shape often has the same shape as the key shape and is displayed in certain states such as selected or active. This halo shape provides a visual effect to highlight the edge in specific states;
- labelShape: Label text shape;
- labelBackgroundShape: Background rect shape for the label;
- iconShape: Icon shape, may be text, iconfont, or image;

For shapes that are not included in the aforementioned list, you should use the `drawOtherShapes` method to draw them. Alternatively, you can define your own `drawXShape(s)` methods and call them in the `draw` method. The returned shapes can be written into an object with the shape ID as the key and the shape object as the value. This object can then be returned as the result of the `draw` method.

This approach allows you to define and draw custom shapes in addition to the predefined ones, giving you more flexibility in creating complex visual representations for your edges.

Below is an example of the `draw` method for a `line-edge` type edge. You can use it as a reference for overriding:

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

If you want to execute logic after the `draw` function is completed, for example, adjusting other related shapes based on the bounding box size of the shapes drawn in `draw`, or drawing additional shapes, you can override the `afterDraw` method. This method is not implemented in the built-in edge types but can be added in your custom edge implementation.

```typescript
public afterDraw(
  model: EdgeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
): { [otherShapeId: string]: DisplayObject } {
  // Return the shape map with the newly added shapes, where the key is the shape ID and the value is the shape object
  return {};
}
```

## drawXShape(s)

Draw X shape method, such as `drawKeyShape`, `drawAnchorShapes`, etc. The `this.upsertShape` method should be called within all `drawXShape(s)` methods to add or modify shapes. This method will check if the corresponding shape with the given ID exists in the shapeMap. If it does not exist, a new shape will be created. If it exists, it will be incrementally updated.

Parameters of `this.upsertShape(shapeType, shapeId, style, shapeMap, model)` are:

- `shapeType`:
  - Type: `'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text'`;
  - Type of the shape;
- `shapeId`:
  - Type: `string`;
  - ID of the shape, corresponds to X in drawXShape(s) , in camel case;
- `style`:
  - Type: `ShapeStyle`;
  - The styles of the shapes are typically extracted from the model object passed as the first parameter in the drawXShape(s) methods;
- `shapeMap`：
  - Type: `object`；
  - The key represents the shape ID, and the value represents the shape map object, which is the second parameter in the `drawXShape(s)` methods;
- `model`：
  - Type: `EdgeDisplayModel`;
  - The rendering data of the edge, which is the first parameter in the `drawXShape(s)` methods.

There goes the examples: `drawKeyShape`, `drawLabelShape`, `drawLabelBackgroundShape`, `drawOtherShapes`.

### Example 1: drawKeyShape

The method to draw the main key shape, `drawKeyShape`, for the `line-edge` can be implemented as follows. In a custom edge, you can modify the shape type and its corresponding configuration in the `upsertShape` method based on your requirements.

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
  // Draw the arrows
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // Draw and return the keyShape
  return this.upsertShape('line', 'keyShape', lineStyle, shapeMap, model);
}
```

If you are drawing curved or polyline edges, the key shape will be a path instead of a line. In the `drawKeyShape` method, you should calculate the path value based on the control points. Here is an example of the `drawKeyShape` method for the built-in `quadratic-edge` edge type:

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

  // Calculate the control points based on the arc position and arc angle
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
  // Draw the arrows
  this.upsertArrow('start', startArrow, others, model, lineStyle);
  this.upsertArrow('end', endArrow, others, model, lineStyle);
  // Draw and return the keyShape
  return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
}
```

`this.getControlPoints` can be overridden to customize the control point calculation logic, see [getControlPoints](#getControlPoints).

### Example 2: drawLabelShape

The `drawLabelShape` method is used to draw the text shape (labelShape) in an edge. In the built-in edge types, such as line or path, the `drawLabelShape` method calculates and converts non-direct graphical properties based on the configuration, such as `position` (the position of the text relative to the keyShape), `autoRotate` (whether the text should follow the tangent of the keyShape when rotating), and `maxWidth` (the maximum length of the text, with truncation and displaying `…` if exceeded, specified as a percentage or an absolute pixel value relative to the keyShape). It then uses the calculated style to call `this.upsertShape` to draw the line or path shape.

If you don't need to consider these configurations in your custom edge, you can ignore them and completely redefine the `drawLabelShape` method. If you do need to consider them, you can refer to the implementation in [`baseEdge`](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/edge/base.ts#L239) for guidance.

### Example 3: drawLabelBackgroundShape

The `drawLabelBackgroundShape` method is used to draw the background shape (labelBackgroundShape) behind the text shape (labelShape) in an edge. In the built-in edge types, the `drawLabelBackgroundShape` method calculates the size of the background rectangle based on the bounding box of the labelShape. This requires that the `labelShape` has already been drawn when calling this method. Therefore, when customizing the edge, you should ensure that you call `drawLabelShape` before calling `drawLabelBackgroundShape` in the draw method. If there are dependencies on the bounding box calculations between other shapes, you should also follow this logic, where only the shapes that have already been drawn can be obtained from shapeMap and their bounding boxes can be retrieved using `shape.getRenderBounds()` or `shape.getLocalBounds()`.

The built-in `drawLabelBackgroundShape` method, after calculating the styles based on the configuration and `labelShape`, uses `this.upsertShape` to draw a rect shape. You can refer to the implementation in [baseEdge](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/edge/base.ts#L356) for more details.

### Example 4: drawOtherShapes

keyShape, haloShape, labelShape, labelBackgroundShape, and iconShape are all standard shapes defined in the G6 v5 edge style specification. If you have additional shapes that are not covered by the specification in your custom edge, you can draw them using the `drawOtherShapes` method. These additional shapes can be configured in the model data under the otherShapes field when rendering:

```typescrirpt
{
  id: ID,
  source: ID,
  target: ID,
  data: {
    keyShape: ShapeStyle,
    haloShape: ShapeStyle,
    // ... Other shapes in specification
    // Extra shapes:
    otherShapes: {
      xxShape: ShapeStyle,
      yyShape: ShapeStyle,
      // ... Other extra shapes
    }
  }
}
```

To extract the corresponding fields from the `model` or pass necessary graphic style attributes to `this.upsertShape` based on custom logic, and add the shapes, you can update the drawOtherShapes method as follows:

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

In the drawKeyShape method of polyline (PolylineEdge), quadratic (QuadraticEdge), cubic (CubicEdge), cubic-horizontal (CubicHorizontalEdge), and cubic-vertical (CubicVerticalEdge) edges, the `getControlPoints` method is called to obtain the control points for calculating the path.

If you inherit from these types of edges (Extensions.PolylineEdge, Extensions.QuadraticEdge, Extensions.CubicEdge, Extensions.CubicHorizontalEdge, Extensions.CubicVerticalEdge), you can override the `getControlPoints` method to modify the control point calculation logic.

Type of `Extensions.PolylineEdge`'s `getControlPoints`:

```typescript
/**
 * Calculate the control points
 * @param model Display model
 * @param sourcePoint source point
 * @param targetPoint target point
 * @returns result control points
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

Type of `Extensions.QuadraticEdge`、`Extensions.CubicEdge`、`Extensions.CubicHorizontalEdge`、`Extensions.CubicVerticalEdge`'s `getControlPoints`:

```typescript
/**
 * calculate the control point by curvePosition|controlPoints|curveOffset
 * @param startPoint: source point position of edge
 * @param endPoint target point position of edge
 * @param percent the proportion of control points' in the segment, Range 0 to 1
 * @param controlPoints the control point position
 * @param offset the curveOffset
 * @returns control points
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

`getPath` is the member methods of `Extensions.PolylineEdge` can only be overridden when inheriting from it to implement custom edges. Due to the complexity of the automatic routing algorithm for polyline edges, this function has been extracted separately. Also, due to the complexity of the algorithm, polyline edges have slightly lower performance. If you have specific rules for drawing polyline edges and want to override the automatic routing logic, you can inherit from the built-in polyline edge and customize the `getPath` method. The function signature is as follows:

```typescript
/**
 * Get polyline path
 * @param model edge display model
 * @param points lists of given 2d points
 * @param radius radius of corner
 * @param routeCfg router config
 * @param auto whether calculate the path with A*
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
  obstacleAvoidance?: boolean;
}
```
