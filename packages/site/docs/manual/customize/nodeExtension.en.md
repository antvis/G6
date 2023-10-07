---
title: Custom Node Type Extension
order: 1
---

In G6 5.0, there is a unified built-in and custom definition and registration logic provided. All built-in and custom node types should inherit from the base class `BaseNode` or an existing node type. Depending on your requirements, you can selectively override the following functions:

## draw

Compared to version 4, version 5 of G6 has removed the `update` and `afterUpdate` methods. The goal is to reduce the cognitive load and logic control for users. In version 5, you only need to override the `draw` method and the `afterDraw` method. G6 will automatically update the graphics based on the updated attributes incrementally.

In the `draw` method, you should call `this.drawKeyShape` and `this.drawXShape(s)` methods to delegate the drawing of different shapes. The visual specification of G6 nodes includes the following shapes:

- keyShape: The main shape, also known as the key shape, is a necessary component for every node. It represents the primary visual appearance of the node and is required for each node;
- haloShape: The halo shape behind the main shape often has the same shape as the key shape and is displayed in certain states such as selected or active. This halo shape provides a visual effect to highlight the node in specific states;
- labelShape: Label text shape;
- labelBackgroundShape: Background rect shape for the label;
- iconShape: Icon shape, may be text, iconfont, or image;
- anchorShapes: Several shapes can represent circle shapes on the edges where the node is connected. These shapes indicate the entry positions of the edges on the node;
- badgeShapes: Several shapes can represent badges, where each badge consists of a text label and a rounded rectangle background. All the badges are tiled in the badgeShapes array. Each badge shape can be created by combining a text shape and a rounded rectangle shape as its background.

For shapes that are not included in the aforementioned list, you should use the `drawOtherShapes` method to draw them. Alternatively, you can define your own `drawXShape(s)` methods and call them in the `draw` method. The returned shapes can be written into an object with the shape ID as the key and the shape object as the value. This object can then be returned as the result of the `draw` method.

This approach allows you to define and draw custom shapes in addition to the predefined ones, giving you more flexibility in creating complex visual representations for your nodes.

Below is an example of the `draw` method for a `circle-node` type node. You can use it as a reference for overriding:

```typescript
public draw(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
  diffData?: { previous: NodeModelData; current: NodeModelData },
  diffState?: { previous: State[]; current: State[] },
): NodeShapeMap {
  const { data = {} } = model;
  let shapes: NodeShapeMap = { keyShape: undefined };

  // Draw the keyShape, and store it into the map
  shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);

  // If the haloShape is configured (which represents the halo behind the keyShape and is usually displayed in certain states), and there is a corresponding drawing function, you can draw the haloShape and store it in the shape map of the node
  if (data.haloShape && this.drawHaloShape) {
    shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
  }

  // If the labelShape is configured (which represents the text shape of the node) and there is a corresponding drawing function, you can draw the labelShape and store it in the shape map
  if (data.labelShape && this.drawLabelShape) {
    shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
  }

  // If the labelBackgroundShape is configured (which represents the background box of the text shape of the node) and there is a corresponding drawing function, you can draw the labelBackgroundShape and store it in the shape map
  if (data.labelBackgroundShape && this.drawLabelBackgroundShape) {
    shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
      model,
      shapeMap,
      diffData,
    );
  }

  // If the anchorShapes are configured (which represent the circular shapes on the edges where the node is connected) and there is a corresponding drawing function, you can draw the anchorShapes and store them in the shape map
  if (data.anchorShapes && this.drawAnchorShapes) {
    const anchorShapes = this.drawAnchorShapes(
      model,
      shapeMap,
      diffData,
      diffState,
    );
    // drawAnchorShapes draws and returns multiple shapes, add each shape to the shape map individually
    shapes = {
      ...shapes,
      ...anchorShapes,
    };
  }

  // If the iconShape is configured (which represents the icon shape of the node) and there is a corresponding drawing function, you can draw the iconShape and store it in the shape map
  if (data.iconShape && this.drawIconShape) {
    shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
  }

  // If the badgeShapes are configured (which represent the badge shapes of the node) and there is a corresponding drawing function, you can draw the badgeShapes and store them in the shape map
  if (data.badgeShapes && this.drawBadgeShapes) {
    const badgeShapes = this.drawBadgeShapes(
      model,
      shapeMap,
      diffData,
      diffState,
    );
    // drawBadgeShapes draws and returns multiple shapes, add each shape to the shape map individually
    shapes = {
      ...shapes,
      ...badgeShapes,
    };
  }

  // If otherShapes are configured (which represent additional shapes that are not covered by the predefined shapes mentioned above) and there is a corresponding drawing function, you can draw the additional shapes and store them in the shape map
  if (data.otherShapes && this.drawOtherShapes) {
    // drawOtherShapes draws and returns multiple shapes, add each shape to the shape map individually
    shapes = {
      ...shapes,
      ...this.drawOtherShapes(model, shapeMap, diffData),
    };
  }
  return shapes;
}
```

## afterDraw

If you want to execute logic after the `draw` function is completed, for example, adjusting other related shapes based on the bounding box size of the shapes drawn in `draw`, or drawing additional shapes, you can override the `afterDraw` method. This method is not implemented in the built-in node types but can be added in your custom node implementation.

```typescript
public afterDraw(
  model: NodeDisplayModel | ComboDisplayModel,
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
  - Type: `NodeDisplayModel`;
  - The rendering data of the node, which is the first parameter in the `drawXShape(s)` methods.

There goes the examples: `drawKeyShape`, `drawLabelShape`, `drawLabelBackgroundShape`, `drawOtherShapes`.

### Example 1: drawKeyShape

The method to draw the main key shape, `drawKeyShape`, for the `circle-node` can be implemented as follows. In a custom node, you can modify the shape type and its corresponding configuration in the `upsertShape` method based on your requirements.

```typescript
public drawKeyShape(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
  diffData?: { previous: NodeModelData; current: NodeModelData },
  diffState?: { previous: State[]; current: State[] },
): DisplayObject {
  return this.upsertShape(
    'circle',
    'keyShape',
    this.mergedStyles.keyShape,
    shapeMap,
    model,
  );
}
```

### Example 2: drawLabelShape

The method to draw the label shape, `drawLabelShape`, for the built-in node types is implemented based on the configuration properties such as `position` (position of the label relative to the key shape), `angle` (rotation angle), and `maxWidth` (maximum length of the text before truncation with ellipsis).

If you are designing a custom node and don't need to consider these configuration properties, you can ignore them and implement the `drawLabelShape` method from scratch. However, if you need to consider these properties, you can refer to the implementation of the [`drawLabelShape` method in the baseNode](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277) for guidance.

### Example 3: drawLabelBackgroundShape

The method to draw the background box shape for the label, `drawLabelBackgroundShape`, is implemented in the built-in nodes by calculating the size of the bounding box of the `labelShape`. It is important to note that when calling this method, the `labelShape` should already be drawn. Therefore, when customizing a node, it is important to first call `drawLabelShape` and then call `drawLabelBackgroundShape` within the `draw` method.

If there are dependencies on the calculation of bounding box sizes between other shapes, you should follow a similar logic. Only the shapes that have already been drawn and exist in the `shapeMap` can be retrieved and used to obtain the bounding box using methods like `shape.getRenderBounds()` or `shape.getLocalBounds()`.

The built-in `drawLabelBackgroundShape` method calculates the style based on the configuration and `labelShape`, and then uses this.upsertShape to draw a rectangular shape ('rect'). You can refer to the [implementation in the baseNode](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383) for reference.

### Example 4: drawOtherShapes

keyShape, haloShape, labelShape, labelBackgroundShape, iconShape, badgeShapes, and anchorShapes are all shapes specified in the G6 v5 node style specification. If you have additional shapes in your custom node that are not covered by the specification, you can draw them in the `drawOtherShapes` method. These additional shapes can be configured in the `model` data under the `otherShapes` field.

```typescrirpt
{
  id: ID,
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
drawOtherShapes(model, shapeMap, diffData) {
  const { data } = model;
  const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
  return {
    markerShape: this.upsertShape(
      'path',
      'markerShape',
      {
        cursor: 'pointer',
        stroke: '#666',
        lineWidth: 1,
        fill: '#fff',
        path: data.collapsed
          ? stdLib.markers.expand(keyShapeBBox.center[0], keyShapeBBox.max[1], 8)
          : stdLib.markers.collapse(keyShapeBBox.center[0], keyShapeBBox.max[1], 8),
      },
      shapeMap,
      model,
    ),
    // ... Other extra shapes
  };
}
```
