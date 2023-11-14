---
title: Custom node
order: 13
---

In G6, if a built-in node does not meet a specific need, you can create a custom node by extending an existing node Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to the node.

Custom nodes can be created by inheriting from built-in nodes such as CircleNode. See [NodeType](/manual/customize/extension-cats#1-%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8Bnodes) for a graphical representation of what can be inherited.

```ts
import { Graph, Extensions, extend } from '@antv/g6';

// Create custom edges, inheriting from CircleNode
class CustomNode extends Extensions.CircleNode {
  // Override member method to customize the drawing logic.
}

// Extend the Graph class with the extend method to register the custom edge.
const ExtGraph = extend(Graph, {
  nodes: {
    'custom-node': CustomNode,
  },
});

// Create a graph instance using the extended Graph class, specifying the nodeType as a custom node
const graph = new ExtGraph({
  // ... Other configuration items
  node: {
    type: 'custom-node', // Specify custom node
    // ... See node-specific configuration for additional configuration items
  },
});
```

## Override methods

### draw

**Type**:

```ts
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

**Description**: Draw all shapes associated with a node.

### drawKeyShape

**Type**:

```ts
type drawKeyShape = (model: NodeDisplayModel, shapeMap: NodeShapeMap) => DisplayObject;
```

**Description**: Draw the key shape

### drawLabelShape

**类型**：

```ts
type drawLabelShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

**说明**：Draw the label shape of the node.

### drawLabelBackgroundShape

**类型**：

```ts
type drawLabelBackgroundShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

**说明**：Draw the label background shape of the node.

### drawIconShape

**类型**：

```ts
type drawIconShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

**说明**：Draw the icon shape of the node.

### drawHaloShape

**类型**：

```ts
type drawHaloShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

**说明**：Draw the halo shape of the node.

### drawAnchorShapes

**类型**：

```ts
type drawAnchorShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

**说明**：Draw the anchors shape of the node.

### drawBadgeShapes

**类型**：

```ts
type drawBadgeShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

**说明**：Draw the badges shape of the node.

### drawOtherShapes

**类型**：

```ts
type drawOtherShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => { [id: string]: DisplayObject };
```

**说明**：Draw other shapes(such as preRect,stateIcon) of the node.

### afterDraw

**类型**：

```ts
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

**说明**：Perform additional drawing operations or add custom shapes after drawing node.

### getMergedStyles

**类型**：

```ts
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

**说明**：Merge style.

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
