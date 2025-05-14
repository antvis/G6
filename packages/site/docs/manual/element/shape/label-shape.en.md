---
title: Design and Implementation of Composite Shape
order: 3
---

G6 provides a flexible Shape mechanism, allowing developers to customize various graphics and efficiently reuse them in elements such as nodes, edges, and combos. This article uses Label as an example to explain how to customize a Shape and how to apply it in elements.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W3oqSYPZtWEAAAAAAAAAAAAAemJ7AQ/original" width="80" />

## 1. Customization and Encapsulation of Shape

### 1. Base Class Design of Shape

All Shapes inherit from `BaseShape`, which centrally manages the lifecycle (creation, update, destruction), property parsing, animation, event binding, etc. You only need to focus on implementing the `render` method.

**Core Abstraction:**

```js
import { CustomElement } from '@antv/g';

abstract class BaseShape extends CustomElement {
  // Lifecycle management, property parsing, animation, etc...
  public abstract render(attributes, container): void;
}
```

### 2. Hierarchical Structure of Composite Shape

A node usually contains multiple child Shapes, for example:

```
Node
├── keyShape (main shape)
├── label (label, auxiliary information)
│   ├── text
│   └── rect
├── icon
│   ├── text
│   └── image
├── badge
│   ├── text
│   └── rect
└── port
│   ├── circle
```

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

### 3. Implementation of Label Shape

Label is a typical composite Shape, consisting of text (Text) and an optional background (Rect). The implementation idea is as follows:

- **Property Separation**: The style properties of Label are divided into text style and background style, which are passed to Text and Rect respectively.
- **Smart Layout**: The background automatically adjusts its size and position based on the text content, padding, border radius, etc.
- **Reuse upsert**: The `upsert` method is used to automatically manage the creation, update, and destruction of child Shapes.

**Main code snippet of Label:**

```js
import { Text, Rect } from '@antv/g'; // Import atomic graphics

export class Label extends BaseShape {
  public render(attributes = this.parsedAttributes, container= this): void {
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
  }
  // ... Omitted style extraction methods
}
```

- `getTextStyle` and `getBackgroundStyle` extract the style properties for text and background respectively to avoid interference.
- The `upsert` method ensures automatic CRUD of Shapes, greatly improving reusability and robustness.

### 4. Complete Custom Shape Example

Below is an example of customizing a label with special decoration, demonstrating the complete definition, registration, and usage of a Shape:

```js
import { BaseShape, ExtensionCategory, Circle } from 'g6';
import { Text, Rect, Circle } from '@antv/g';

class FancyLabel extends BaseShape {
  render(attributes = this.parsedAttributes, container = this) {
    // Main text
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    // Background
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
    // Extra decoration: small dot on the left
    this.upsert('dot', Circle, {
      x: -8, y: 0, r: 3, fill: '#faad14',
    }, container);
  }
  // ...implement getTextStyle/getBackgroundStyle
}

// Register custom Shape
register(ExtensionCategory.SHAPE, 'fancy-label-shape', FancyLabel);

// Define custom node
class CustomCircle extends Circle {
  public drawFancyLabelShape(attributes, container) {
    this.upsert('fancy-label', 'fancy-label-shape', this.getFancyLabelStyle(attributes), container);
  }

  render(attributes = this.parsedAttributes, container) {
    super.render(attributes, container);

    this.drawFancyLabelShape(attributes, container);
  }
}

// Register custom node
register(ExtensionCategory.Node, 'fancy-label-node', CustomCircle);
```

## 2. Prefix Separation of Style Properties

In G6, elements such as nodes, edges, and combos often contain multiple child Shapes (such as main shape, label, badge, port, etc.). To ensure that the style of each child Shape does not interfere with each other, G6 adopts a **prefix separation** design for style properties.

### 1. Significance of Prefix Separation

- **Decoupling**: Each child Shape only cares about its own style properties, avoiding style pollution.
- **Easy Expansion**: Adding a new child Shape only requires defining a new prefix, without modifying the original logic.
- **Intuitive Configuration**: When configuring nodes/edges/combos, users can clearly set the style of each part.

### 2. Code Implementation

Take Label as an example:

```ts
import { RectStyleProps, TextStyleProps } from '@antv/g';

type PrefixKey<P extends string = string, K extends string = string> = `${P}${Capitalize<K>}`;

type Prefix<P extends string, T extends object> = {
  [K in keyof T as K extends string ? PrefixKey<P, K> : never]?: T[K];
};

interface LabelStyleProps extends TextStyleProps, Prefix<'background', RectStyleProps> {
  background?: boolean;
}
```

- `Prefix<'background', RectStyleProps>` means all properties starting with `background` belong to the label background style.
- During rendering, tools such as `subStyleProps` and `subObject` are used to automatically extract prefixed styles and pass them to the corresponding Shape.

**Label background style extraction example**

```js
protected getBackgroundStyle(attributes: Required<LabelStyleProps>) {
  if (attributes.background === false) return false;
  const style = this.getGraphicStyle(attributes);
  const backgroundStyle = subStyleProps<RectStyleProps>(style, 'background');
// ...Omitted layout calculation
  return backgroundStyle;
}
```

**Style configuration example**

```json
{
  "text": "label",
  "fontSize": 12,
  "fontFamily": "system-ui, sans-serif",
  "wordWrap": true,
  "maxLines": 1,
  "wordWrapWidth": 128,
  "textOverflow": "...",
  "textBaseline": "middle",
  "background": true,
  "backgroundOpacity": 0.75,
  "backgroundZIndex": -1,
  "backgroundLineWidth": 0
}
```

## 3. Relationship between Label and keyShape

- **keyShape** is the main shape of a node/edge/combo, determining interaction picking, bounding box, main style, etc.
- **Label**, icon, badge, port, etc. usually exist as auxiliary Shapes and are not used as keyShape.
- When customizing a node, you can specify the keyShape via `drawKeyShape` or similar methods. Label is only responsible for displaying text information and does not affect the main interaction control of the node.

## 4. How to Apply Custom Shape in Elements

Take nodes as an example. The node base class `BaseNode` has built-in support for multiple child Shapes (keyShape, label, icon, badge, port, halo, etc.). You only need to focus on drawing the keyShape, and other child Shapes can be automatically managed through configuration and style prefixing.

### 1. Node Rendering Process

```js
protected drawLabelShape(attributes: Required<S>, container: Group): void {
  const style = this.getLabelStyle(attributes);
  this.upsert('label', Label, style, container);
}

public render(attributes = this.parsedAttributes, container: Group = this) {
  // 1. Draw keyShape (main shape)
  this._drawKeyShape(attributes, container);
  if (!this.getShape('key')) return;

  // 2. Draw halo
  this.drawHaloShape(attributes, container);

  // 3. Draw icon
  this.drawIconShape(attributes, container);

  // 4. Draw badges
  this.drawBadgeShapes(attributes, container);

  // 5. Draw label
  this.drawLabelShape(attributes, container);

  // 6. Draw ports
  this.drawPortShapes(attributes, container);
}
```

- The style of each child Shape is automatically extracted by prefix separation and passed to the corresponding Shape instance.
- You can flexibly control the display and style of each child Shape through configuration options.

### 2. Example of Applying Label

Suppose you want to add a label with a background to a node, just configure the label-related properties in the node data:

```js
{
  label: true,
  labelText: 'I am a label',
  labelFill: '#333',
  labelFontSize: 14,
  labelBackground: true,
  labelBackgroundFill: '#fffbe6',
  labelBackgroundRadius: 6,
  labelPadding: [4, 8],
}
```

- `labelText`, `labelFill`, `labelFontSize`, etc. will be automatically extracted and passed to the text part of the Label.
- `labelBackground`, `labelBackgroundFill`, `labelBackgroundRadius`, `labelPadding`, etc. will be automatically extracted and passed to the background part of the Label.

You do not need to manually manage the creation, update, or destruction of the Label. G6 will handle it automatically.

## 5. Common Issues and Debugging Suggestions

### 1. Why is the label style not effective?

- Check whether the style property prefix is correct (such as `labelFill`, `labelBackgroundFill`).
- Make sure the `label` configuration of the node/edge/combo is `true` and `labelText` is set.
- Check if it is overridden by other styles.

### 2. How to debug the rendering of custom Shape?

- Use the browser console to view `shapeMap` and confirm whether each child Shape is created correctly.

### 3. How to make Label respond to node states (such as hover, selected)?

- Directly set node state styles in the graph configuration (recommended)

```js
const graph = new Graph({
  node: {
    style: {
      label: false,
    },
    state: {
      hover: {
        label: true,
        labelText: 'show when hovered',
      },
    },
  },
});
```

- Or listen for state changes in the implementation of Label and dynamically adjust the style. You can get the current state value through data.

---

For more details, it is recommended to read the source code [`base-shape.ts`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/shapes/base-shape.ts), [`base-node.ts`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/shapes/base-node.ts).
