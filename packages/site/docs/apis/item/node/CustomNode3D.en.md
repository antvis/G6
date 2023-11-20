---
title: Custom 3D node
order: 14
---

In G6, if a built-in 3D node does not meet a specific need, you can create a custom node by extending an existing node Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to the node.

Custom nodes can be created by inheriting from built-in nodes such as SphereNode. See [3D NodeType](/manual/customize/extension-cats#1-%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8Bnodes) for a graphical representation of what can be inherited.

```ts
import { Graph, Extensions, extend } from '@antv/g6';

/**
 * Create custom edges, inheriting from CircleNode
 */
class CustomNode extends Extensions.SphereNode {
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

**Type**: `draw`

<details>

<summary style="color: #873bf4; cursor: pointer">draw</summary>

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

</details>

Draw all shapes associated with a node.

### drawKeyShape

**Type**: `drawKeyShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawKeyShape</summary>

```typescript
type drawKeyShape = (model: NodeDisplayModel, shapeMap: NodeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the key shape

### drawLabelShape

**Type**: `drawLabelShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelShape</summary>

```typescript
type drawLabelShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the label shape of the node.

### drawLabelBackgroundShape

**Type**: `drawLabelBackgroundShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelBackgroundShape</summary>

```typescript
type drawLabelBackgroundShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the label background shape of the node.

### drawIconShape

**Type**: `drawIconShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawIconShape</summary>

```typescript
type drawIconShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the icon shape of the node.

### drawHaloShape

**Type**: `drawHaloShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawHaloShape</summary>

```typescript
type drawHaloShape = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the halo shape of the node.

### drawAnchorShapes

**Type**: `drawAnchorShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawAnchorShapes</summary>

```typescript
type drawAnchorShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the anchors shape of the node.

### drawBadgeShapes

**Type**: `drawBadgeShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawBadgeShapes</summary>

```typescript
type drawBadgeShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the badges shape of the node.

### drawOtherShapes

**Type**: `drawOtherShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawOtherShapes</summary>

```typescript
type drawOtherShapes = (
  model: NodeDisplayModel | ComboDisplayModel,
  shapeMap: NodeShapeMap | ComboShapeMap,
) => { [id: string]: DisplayObject };
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw other shapes(such as preRect,stateIcon) of the node.

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

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Perform additional drawing operations or add custom shapes after drawing node.

### getMergedStyles

**Type**: `getMergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">getMergedStyles</summary>

```typescript
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Merge style.

## Member Methods

Inherited shapes provide the following method calls

### upsertShape

**Type**: `upsertShape`

<details>

<summary style="color: #873bf4; cursor: pointer">upsertShape</summary>

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

</details>

Create (if not existing in shapeMap) or update a shape based on configuration.
