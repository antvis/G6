---
title: Custom node
order: 13
---

In G6, if a built-in node does not meet a specific need, you can create a custom node by extending an existing node Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to the node.

Custom nodes can be created by inheriting from built-in nodes such as CircleNode. See [NodeType](/manual/customize/extension-cats#1-%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8Bnodes) for a graphical representation of what can be inherited.

```typescript
import { Graph, Extensions, extend } from '@antv/g6';

/** Create custom edges, inheriting from CircleNode */
class CustomNode extends Extensions.CircleNode {
  /**
   * Override member method to customize the drawing logic.
   */
}

/**
 * Extend the Graph class with the extend method to register the custom edge.
 */
const ExtGraph = extend(Graph, {
  nodes: {
    'custom-node': CustomNode,
  },
});

/**
 * Create a graph instance using the extended Graph class, specifying the nodeType as a custom node
 */
const graph = new ExtGraph({
  /**
   * ... Other configuration items
   */
  node: {
    type: 'custom-node',
    /**
     * Specify custom node
     */
    /**
     * ... See node-specific configuration for additional configuration items
     */
  },
});
```

## Override methods

### draw

**Type**:

```typescript
type draw = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
) => {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
};
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**: Draw all shapes associated with a node.

### drawKeyShape

**Type**:

```typescript
type drawKeyShape = (model: NodeDisplayModel, shapeMap: NodeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**: Draw the key shape

### drawLabelShape

**Type**：

```typescript
type drawLabelShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the label shape of the node.

### drawLabelBackgroundShape

**Type**：

```typescript
type drawLabelBackgroundShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the label background shape of the node.

### drawIconShape

**Type**：

```typescript
type drawIconShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the icon shape of the node.

### drawHaloShape

**Type**：

```typescript
type drawHaloShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the halo shape of the node.

### drawAnchorShapes

**Type**：

```typescript
type drawAnchorShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the anchors shape of the node.

### drawBadgeShapes

**Type**：

```typescript
type drawBadgeShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw the badges shape of the node.

### drawOtherShapes

**Type**：

```typescript
type drawOtherShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => { [id: string]: DisplayObject };
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Draw other shapes(such as preRect,stateIcon) of the node.

### afterDraw

**Type**：

```typescript
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Perform additional drawing operations or add custom shapes after drawing node.

### getMergedStyles

**Type**：

```typescript
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

**Description**：Merge style.

## Member Methods

Inherited shapes provide the following method calls

### upsertShape

**Type**:

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text' | 'group';

type SHAPE_TYPE_3D = 'sphere' | 'cube' | 'plane';

type upsertShape = (
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  id: string,
  style: ShapeStyle,
  shapeMap: NodeShapeMap | ComboShapeMap,
  model: NodeDisplayModel | ComboDisplayModel,
) => DisplayObject;
```

**Description**: Create (if not existing in shapeMap) or update a shape based on configuration.
