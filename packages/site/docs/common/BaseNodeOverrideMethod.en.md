### draw

:::info
In most cases, there is no need to override the draw method. It is more common to override methods such as `drawKeyShape` and `drawLabelShape`, which will be introduced in the following section.
:::

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

G5 5.0 removes the `update` and `afterUpdate` methods. Now you only need to override the `draw` method and the `afterDraw` method, and G6 will automatically update the shapes incrementally based on the updated attributes.

The `draw` method draws each part of the edge by calling methods such as `this.drawKeyShape`.

Refer to the [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/node/circle.ts#L25) method of the `circle-node` type node for overriding.

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

The logic executed after the `draw` function is completed can also be used to draw more shapes. The return value is the same as the `draw` method. It is not implemented in the built-in edge types.

### drawKeyShape

**Type**: `drawKeyShape`

<details>

<summary style="color: #873bf4; cursor: pointer">drawKeyShape</summary>

```typescript
type drawKeyShape = (model: NodeDisplayModel, shapeMap: NodeShapeMap) => DisplayObject;
```

For more detailed data configuration, refer to [NodeDisplayModel](../../data/NodeDisplayModel.en.md) or [ComboDisplayModel](../../data/ComboDisplayModel.en.md).

</details>

Draw the main shape (`keyShape`), which is required. For example, the main shape of a circle node is a circle (`circle`), and the main shape of a rectangular node is a rectangle (`rect`).

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

Draw the text shape (`labelShape`)

Refer to [BaseNode.drawLabelShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277)。 for overriding.

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

Draw the background shape of the text shape (`labelBackgroundShape`)

Refer to [BaseNode.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383)。 for overriding.

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

Draw the icon shape of the text shape (`iconShape`)

Refer to [BaseNode.drawLabelIconShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L440) for overriding.

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

Draw the main shape outline (`haloShape`), which is usually displayed in the `selected` and `active` states.

Refer to [BaseNode.drawHaloShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L491) for overriding.

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

Draw the port shape (`anchorShapes`)

Refer to [BaseNode.drawAnchorShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L531) for overriding.

> ⚠️ Note: `drawAnchorShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

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

Draw the badge shape (`badgeShapes`)

Refer to [BaseNode.drawBadgeShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L629) for overriding.

> ⚠️ Note: `drawBadgeShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

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

Draw shapes other than the above parts, which can be completed in `drawOtherShapes`, such as drawing an extra circle:

> ⚠️ Note: `drawOtherShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

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
