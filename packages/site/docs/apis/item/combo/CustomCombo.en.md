---
title: Custom Combo
order: 3
---

In G6, if a built-in Combo does not meet a specific need, you can create a custom Combo by extending an existing Combo Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to Combo. [Custom Circle example DEMO](/zh/examples/item/customCombo#cCircle)。

Custom Combo can be created by inheriting from built-in Combo such as CircleCombo. See [ComboType](/en/manual/customize/extension-cats#3-combos) for a graphical representation of what can be inherited.

```typescript
import { Graph, Extensions, extend } from '@antv/g6';

/**
 * Create custom edges, inheriting from CircleCombo
 */
class CustomCombo extends Extensions.CircleCombo {
  /**
   * Override member method to customize the drawing logic.
   */
}

/**
 * Extend the Graph class with the extend method to register the custom edge.
 */
const ExtGraph = extend(Graph, {
  combos: {
    'custom-combo': CustomCombo,
  },
});

/**
 * Create a graph instance using the extended Graph class, specifying ComboType as a custom Combo
 */
const graph = new ExtGraph({
  /**
   * ... Other configuration items
   */
  combo: {
    /**
     * Specify custom Combo
     */
    type: 'custom-combo',
    /**
     * ... See Combo-specific configuration for additional configuration items
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

</details>

Draw all shapes associated with a Combo.

### drawKeyShape

**Type**: `drawKeyShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawKeyShape</summary>

```typescript
type drawKeyShape = (model: ComboDisplayModel, shapeMap: CombohapeMap) => DisplayObject;
```

</details>

Draw the key shape

### drawLabelShape

**Type**: `drawLabelShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelShape</summary>

```typescript
type drawLabelShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

</details>

Draw the label shape of Combo.

### drawLabelBackgroundShape

**Type**: `drawLabelBackgroundShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawLabelBackgroundShape</summary>

```typescript
type drawLabelBackgroundShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

</details>

Draw the label background shape of Combo.

### drawIconShape

**Type**: `drawIconShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawIconShape</summary>

```typescript
type drawIconShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

</details>

Draw the icon shape of Combo.

### drawHaloShape

**Type**: `drawHaloShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawHaloShape</summary>

```typescript
type drawHaloShape = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => DisplayObject;
```

</details>

Draw the halo shape of Combo.

### drawAnchorShapes

**Type**: `drawAnchorShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawAnchorShapes</summary>

```typescript
type drawAnchorShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

</details>

Draw the anchors shape of Combo.

### drawBadgeShapes

**Type**: `drawBadgeShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawBadgeShapes</summary>

```typescript
type drawBadgeShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => {
  [shapeId: string]: DisplayObject;
};
```

</details>

Draw the badges shape of Combo.

### drawOtherShapes

**Type**: `drawOtherShapes`

<details>

<summary style="color: #873bf4; cursor: pointer">drawOtherShapes</summary>

```typescript
type drawOtherShapes = (
  model: ComboDisplayModel | ComboDisplayModel,
  shapeMap: CombohapeMap | CombohapeMap,
) => { [id: string]: DisplayObject };
```

</details>

Draw other shapes(such as preRect,stateIcon) of Combo.

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

</details>

Perform additional drawing operations or add custom shapes after drawing Combo.

### getMergedStyles

**Type**: `getMergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">getMergedStyles</summary>

```typescript
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

</details>

Merge style.

## Member Methods

Inherited shapes provide the following method calls

### upsertShape

**Type**: `upsertShape`

<details>

<summary style="color: #873bf4; cursor: pointer">upsertShape</summary>

```typescript
type upsertShape = (
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  id: string,
  style: ShapeStyle,
  shapeMap: CombohapeMap | CombohapeMap,
  model: ComboDisplayModel | ComboDisplayModel,
) => DisplayObject;
```

</details>

Create (if not existing in shapeMap) or update a shape based on configuration.
