---
title: Custom Combo
order: 3
---

In G6, if a built-in Combo does not meet a specific need, you can create a custom Combo by extending an existing Combo Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to Combo. [Custom Circle example DEMO](/zh/examples/item/customCombo#cCircle)。

Custom Combo can be created by inheriting from built-in Combo such as CircleCombo. See [ComboType](/en/manual/customize/extension-cats#3-combos) for a graphical representation of what can be inherited.

```ts
import { Graph, Extensions, extend } from '@antv/g6';

// Create custom edges, inheriting from CircleCombo
class CustomCombo extends Extensions.CircleCombo {
  // Override member method to customize the drawing logic.
}

// Extend the Graph class with the extend method to register the custom edge.
const ExtGraph = extend(Graph, {
  combos: {
    'custom-combo': CustomCombo,
  },
});

// Create a graph instance using the extended Graph class, specifying ComboType as a custom Combo
const graph = new ExtGraph({
  // ... Other configuration items
  combo: {
    type: 'custom-combo', // Specify custom Combo
    // ... See Combo-specific configuration for additional configuration items
  },
});
```

## Override methods

### draw

**Type**:

```ts
type draw = (
  displayModel: ComboDisplayModel,
  diffData?: { previous: ComboUserModelData; current: ComboUserModelData },
  diffState?: { previous: State[]; current: State[] },
  animate = true,
  onfinish: Function = () => {},
) => {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
};
```

**Description**: Draw all shapes associated with a Combo.

### drawKeyShape

**Type**:

```ts
type drawKeyShape = (model: ComboDisplayModel, shapeMap: CombohapeMap) => DisplayObject;
```

**Description**: Draw the key shape

### drawLabelShape

**类型**：

```ts
type drawLabelShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

**说明**：Draw the label shape of Combo.

### drawLabelBackgroundShape

**类型**：

```ts
type drawLabelBackgroundShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

**说明**：Draw the label background shape of Combo.

### drawIconShape

**类型**：

```ts
type drawIconShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

**说明**：Draw the icon shape of Combo.

### drawHaloShape

**类型**：

```ts
type drawHaloShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

**说明**：Draw the halo shape of Combo.

### drawAnchorShapes

**类型**：

```ts
type drawAnchorShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

**说明**：Draw the anchors shape of Combo.

### drawBadgeShapes

**类型**：

```ts
type drawBadgeShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

**说明**：Draw the badges shape of Combo.

### drawOtherShapes

**类型**：

```ts
type drawOtherShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => { [id: string]: DisplayObject };
```

**说明**：Draw other shapes(such as preRect,stateIcon) of Combo.

### afterDraw

**类型**：

```ts
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

**说明**：Perform additional drawing operations or add custom shapes after drawing Combo.

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
  shapeMap: CombohapeMap | CombohapeMap,
  model: ComboDisplayModel | ComboDisplayModel,
) => DisplayObject;
```

**Description**: Create (if not existing in shapeMap) or update a shape based on configuration.
