---
title: Custom Node
order: 1
---

## Example

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// Custom node type, inherit an existing node type or node base class Extensions.BaseNode
class CustomNode extends Extensions.CircleNode {
  // Override methods, see the following section for methods that can be overridden
}

const Graph = extend(BaseGraph, {
  // Register custom node
  nodes: {
    'custom-node': CustomNode,
  },
});

const graph = new Graph({
  // ... Other configurations
  node: {
    type: 'custom-node', // Use the registered node
  },
});
```

## Override methods

### draw

:::info
In most cases, there is no need to override the draw method. It is more common to override methods such as `drawKeyShape` and `drawLabelShape`, which will be introduced in the following section.
:::

G5 5.0 removes the `update` and `afterUpdate` methods. Now you only need to override the `draw` method and the `afterDraw` method, and G6 will automatically update the shapes incrementally based on the updated attributes.

The `draw` method draws each part of the edge by calling methods such as `this.drawKeyShape`.

Refer to the [draw](https://github.com/antvis/G6/blob/6be8f9810ec3b9310371f37de1a2591f14db67f1/packages/g6/src/stdlib/item/node/circle.ts#L25) method of the `circle-node` type node for overriding.

### afterDraw

The logic executed after the `draw` function is completed can also be used to draw more shapes. The return value is the same as the `draw` method. It is not implemented in the built-in edge types.

### drawKeyShape

Draw the main shape (`keyShape`), which is required. For example, the main shape of a circle node is a circle (`circle`), and the main shape of a rectangular node is a rectangle (`rect`).

A simple example of overriding the `drawKeyShape` method is as follows:

```typescript
public drawKeyShape(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
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

### drawHaloShape

Draw the main shape outline (`haloShape`), which is usually displayed in the `selected` and `active` states.

Refer to [BaseNode.drawHaloShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L491) for overriding.

### drawLabelShape

Draw the text shape (`labelShape`)

Refer to [BaseNode.drawLabelShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L277)。 for overriding.

### drawLabelBackgroundShape

Draw the background shape of the text shape (`labelBackgroundShape`)

Refer to [BaseNode.drawLabelBackgroundShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L383)。 for overriding.

### drawLabelIconShape

Draw the icon shape of the text shape (`iconShape`)

Refer to [BaseNode.drawLabelIconShape](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L440) for overriding.

### drawAnchorShapes

Draw the port shape (`anchorShapes`)

Refer to [BaseNode.drawAnchorShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L531) for overriding.

> ⚠️ Note: `drawAnchorShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

### drawBadgeShapes

Draw the badge shape (`badgeShapes`)

Refer to [BaseNode.drawBadgeShapes](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/stdlib/item/node/base.ts#L629) for overriding.

> ⚠️ Note: `drawBadgeShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

### drawOtherShapes

Draw shapes other than the above parts, which can be completed in `drawOtherShapes`, such as drawing an extra circle:

For example, create an extra text:

```typescript
drawOtherShapes(model, shapeMap) {
  const { data } = model;
  const text = data.otherShapes.text;
  return {
    textShape: this.upsertShape(
      'text',
      'other-text-shape',
      {
        text,
        fontSize: 12
      },
      shapeMap,
      model,
    ),
    // ... Other extra shapes
  };
}
```

> ⚠️ Note: `drawOtherShapes` returns a shape map, where the key is the id of the shape and the value is the shape object.

#### Use G2 charts as custom nodes

By using `drawOtherShapes`, you can render many custom shapes, which are all based on `@antv/g` drawing. Therefore, you can use the shapes of any graphics library based on `@antv/g` as the shapes of custom nodes. For example, you can use the charts built by `@antv/g2` as the shapes of custom nodes. Here is a simple example:

```typescript
import { stdlib, renderToMountedElement } from '@antv/g2';

/** stdlib is the standard tool library of G2 */
const G2Library = { ...stdlib() };

// Here is the drawOtherShapes method of the custom node
drawOtherShapes(model, shapeMap) {
  // Create a group
  const group = this.upsertShape(
    'group',
    'g2-chart-group',
    {},
    shapeMap,
    model,
  );
  // Make the group respond to events
  group.isMutationObserved = true;
  // When the group is mounted to the canvas, render the G2 chart
  group.addEventListener('DOMNodeInsertedIntoDocument', () => {
    // Render the G2 chart to the group
    renderToMountedElement(
      {
        // Here fill in the G2 Specification
      },
      {
        group,
        library: G2Library,
      },
    );
  });
  return {
    'g2-chart-group': group,
  };
}
```

For more information about using G2 charts, please refer to [G2 website](https://g2.antv.antgroup.com/).

G6 5.0 also provides relevant examples:

- [G2 Bar Chart Node](/zh/examples/item/customNode/#g2BarChart)
- [G2 Lattice Node](/zh/examples/item/customNode/#g2LatticeChart)
- [G2 Active Node](/zh/examples/item/customNode/#g2ActiveChart)

## Member properties and methods

`BaseNode` and its subclasses provide some member properties and methods for easily adding or updating shapes.

<embed src="../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../common/PluginUpsertShape.zh.md"></embed>
