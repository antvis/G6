---
title: Custom Edge
order: 8
---

In G6, if a built-in edge does not meet a specific need, you can create a custom edge by extending an existing edge Type. This allows you to leverage the powerful built-in functionality of G6 while adding unique logic and style to the edge.

Custom edges can be created by inheriting from built-in edges, such as LineEdge. For inheritable graphics, see: [Edge Type](/en/manual/customize/extension-cats#2-边Typeedges).

```ts
import { Graph, Extensions, extend } from '@antv/g6';

// Create a custom edge, inheriting from LineEdge
class CustomEdge extends Extensions.LineEdge {
  // Override member methods for custom drawing logic
}

// Use `extend` method to extend the Graph class and register the custom edge
const ExtGraph = extend(Graph, {
  edges: {
    'custom-edge': CustomEdge,
  },
});

// Use extended Graph class to create a graph instance
const graph = new ExtGraph({
  // ...其他配置项
  edge: {
    type: 'custom-edge', // Specify the custom edge
    // Other configuration options for the edge are detailed in the specific edge configuration
  },
});
```

## Override method

### draw

**Type**:

```ts
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

**Description**: Draw all elements related to the edge.

### drawKeyShape

**Type**:

```ts
type drawKeyShape = (
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) => DisplayObject;
```

**Description**: Draw the key shape of the edge.

### drawLabelShape

**Type**:

```ts
type drawLabelShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**Description**: Draw the label shape of the edge.

### drawLabelBackgroundShape

**Type**:

```ts
type drawLabelBackgroundShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**Description**: Draw the label background shape of the edge.

### drawIconShape

**Type**:

```ts
type drawIconShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**Description**: Draw the icon shape of the edge.

### drawHaloShape

**Type**:

```ts
type drawHaloShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**Description**: Draw the halo shape of the edge.

### drawOtherShapes

**Type**:

```ts
type drawOtherShapes = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => { [id: string]: DisplayObject };
```

**Description**: Draws other shapes of the edge. Other shapes in a custom edge should be defined and configured in `otherShapes`.

### afterDraw

**Type**:

```ts
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

**Description**: Perform additional drawing operations or add custom shapes after drawing edge.

### getMergedStyles

**Type**:

```ts
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

**Description**: 将 display model 数据中定义的样式与边的默认和主题样式合并

## Member Methods

Inherited shapes provide the following method calls

### upsertShape

**Type**:

```ts
type upserShape = (
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  id: string,
  style: ShapeStyle,
  shapeMap: NodeShapeMap | ComboShapeMap,
  model: NodeDisplayModel | ComboDisplayModel,
) => DisplayObject;
```

**Description**: Create (if not existing in shapeMap) or update a shape based on configuration.

### upsertArrow

**Type**:

```ts
type upsertArrow = (
  position: 'start' | 'end',
  arrowConfig: boolean | ArrowStyle,
  bodyStyle: ShapeStyle,
  model: EdgeDisplayModel,
  resultStyle: ShapeStyle,
) => void;
```

**Description**: Add or update an arrow marker at the specified position on the edge.

---

- [EdgeDisplayModel](/apis/data/edge-display-model)
