---
title: Custom Node
order: 3
---

G6 provides a series of [built-in nodes](/en/manual/element/node/build-in/base-node), including [circle](/en/manual/element/node/build-in/circle), [diamond](/en/manual/element/node/build-in/diamond), [donut](/en/manual/element/node/build-in/donut), [ellipse](/en/manual/element/node/build-in/ellipse), [hexagon](/en/manual/element/node/build-in/hexagon), [html](/en/manual/element/node/build-in/html), [image](/en/manual/element/node/build-in/image), [rect](/en/manual/element/node/build-in/rect), [star](/en/manual/element/node/build-in/star), and [triangle](/en/manual/element/node/build-in/triangle). These built-in nodes can meet most basic scene requirements.

However, in actual projects, you may encounter needs that these basic nodes cannot meet. In this case, you need to create custom nodes. Don't worry, it's simpler than you think!

## Before You Start: Understanding the Basic Composition of Nodes

In G6, a complete node is usually composed of multiple parts, like building blocks, these parts are combined to form a feature-rich node.

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

Main components:

- `key`: The main shape of the node, such as basic shapes like rectangles and circles
- `label`: Text label, usually used to display the name or description of the node
- `icon`: Icon, showing the type or status of the node
- `badge`: Badge, a small mark located at the corner of the node
- `halo`: Halo effect displayed around the main shape of the node
- `port`: Connection point, a point where edges can connect

## Ways to Customize Nodes <Badge type="warning">Choose the Right Way</Badge>

There are mainly two ways to create custom nodes:

### 1. Inherit Existing Node Types <Badge type="success">Recommended</Badge>

This is the most common way, you can choose to inherit one of the following types:

- [`BaseNode`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) - The most basic node class, providing core functions of nodes
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/circle.ts) - Circle node
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/rect.ts) - Rectangle node
- [`Ellipse`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/ellipse.ts) - Ellipse node
- [`Diamond`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/diamond.ts) - Diamond node
- [`Triangle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/triangle.ts) - Triangle node
- [`Star`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/star.ts) - Star node
- [`Image`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/image.ts) - Image node
- [`Donut`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/donut.ts) - Donut node
- [`Hexagon`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/hexagon.ts) - Hexagon node

**Why choose this way?**

- 📌 **Less code**: Reuse existing node properties and methods, just focus on adding new features
- 📌 **Fast development**: Suitable for most project needs, quickly achieve business goals
- 📌 **Easy to maintain**: Clear code structure, clear inheritance relationship

### 2. Develop from Scratch Based on G Graphics System <Badge>Advanced Usage</Badge>

If existing node types do not meet the needs, you can create nodes from scratch based on the underlying graphics system of G.

**Why choose this way?**

- 📌 **Maximum freedom**: Fully control every detail of the node, achieve any complex effect
- 📌 **Special needs**: Highly customized scenarios that existing node types cannot meet
- 📌 **Performance optimization**: Performance optimization for specific scenarios

:::warning{title=Note}
Custom nodes developed from scratch need to handle all details by themselves, including graphic drawing, event response, state changes, etc., which is more difficult to develop. You can directly refer to the [source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) for implementation.
:::

## Three Steps to Create Your First Custom Node

Let's start with a simple example - create a **rectangle node with a main and subtitle**:

```js | ob { pin:false, autoMount: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

// Step 1: Create a custom node class
class DualLabelNode extends Rect {
  // Subtitle style
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // Placed below the main title
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#666',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  // Draw subtitle
  drawSubtitleShape(attributes, container) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert('subtitle', 'text', subtitleStyle, container);
  }

  // Render method
  render(attributes = this.parsedAttributes, container) {
    // 1. Render the basic rectangle and main title
    super.render(attributes, container);

    // 2. Add subtitle
    this.drawSubtitleShape(attributes, container);
  }
}

// Step 2: Register custom node
register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);

// Step 3: Use custom node
const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: 'Node A', // Main title
          subtitle: 'Your first custom node', // Subtitle
        },
      },
    ],
  },
  node: {
    type: 'dual-label-node',
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 5,
      // Main title style
      labelText: (d) => d.data.title,
      labelFill: '#222',
      labelFontSize: 14,
      labelFontWeight: 500,
      // Subtitle
      subtitle: (d) => d.data.subtitle,
    },
  },
});

graph.render();
```

### Step 1: Write Custom Node Class

Inherit G6's `Rect` (rectangle node) and add a subtitle:

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// Create custom node, inheriting from Rect
class DualLabelNode extends Rect {
  // Subtitle style
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // Placed below the main title
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#666',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  // Draw subtitle
  drawSubtitleShape(attributes, container) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert('subtitle', 'text', subtitleStyle, container);
  }

  // Render method
  render(attributes = this.parsedAttributes, container) {
    // 1. Render the basic rectangle and main title
    super.render(attributes, container);

    // 2. Add subtitle
    this.drawSubtitleShape(attributes, container);
  }
}
```

### Step 2: Register Custom Node

Use the `register` method to register the node type so that G6 can recognize your custom node:

```js
register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);
```

The `register` method requires three parameters:

- Extension category: `ExtensionCategory.NODE` indicates this is a node type
- Type name: `dual-label-node` is the name we give to this custom node, which will be used in the configuration later
- Class definition: `DualLabelNode` is the node class we just created

### Step 3: Apply Custom Node

Use the custom node in the graph configuration:

```js
const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: 'Node A', // Main title
          subtitle: 'Your first custom node', // Subtitle
        },
      },
    ],
  },
  node: {
    type: 'dual-label-node',
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 8,
      // Main title style
      labelText: (d) => d.data.title,
      labelFill: '#222',
      labelFontSize: 14,
      labelFontWeight: 500,
      // Subtitle
      subtitle: (d) => d.data.subtitle,
    },
  },
});

graph.render();
```

🎉 Congratulations! You have created your first custom node. It looks simple, but this process contains the core idea of custom nodes: **inherit a basic node type**, then **override the `render` method** to add custom content.

## Going Further: Understanding the Principles of Node Drawing

Creating custom nodes in G6 is essentially drawing various graphics on the Canvas. We use a series of "atomic graphics" as basic building blocks, like different shapes in Lego blocks.

### Atomic Graphics

G6 nodes are drawn using graphic atomic units provided by the [G Graphics System](https://g.antv.antgroup.com/). Here are common graphic elements and their uses:

| Graphic Element | Type       | Description                                                                                                                                                                                                                                                      |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Circle          | `circle`   | Suitable for representing states, avatars, circular buttons, etc. Refer to the SVG [<circle>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) element                                                                                           |
| Ellipse         | `ellipse`  | Similar to circle, but supports different horizontal and vertical axes. Refer to the SVG [<ellipse>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse) element                                                                                   |
| Image           | `image`    | Used to display icons, user avatars, logos, etc. Refer to the SVG [<image>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image) element                                                                                                              |
| Line            | `line`     | Used for decoration, auxiliary connections, etc. Refer to the SVG [<line>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) element                                                                                                                |
| Path            | `path`     | Supports complex graphics such as arrows, arcs, curves, Bezier paths, etc. Paths contain a set of commands and parameters with different semantics, [usage details](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)                             |
| Polygon         | `polygon`  | Supports custom graphics such as stars, arrows. Refer to the SVG [<polygon>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon) element                                                                                                           |
| Polyline        | `polyline` | Multi-point polyline, suitable for complex connection structures. Refer to the SVG [<polyline>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline) element                                                                                       |
| Rectangle       | `rect`     | The most commonly used graphic, suitable as a container, card, button, etc. Refer to the SVG [<rect>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) element                                                                                     |
| Text            | `text`     | Displays names, descriptions, labels, etc. Provides simple single-line/multi-line text layout capabilities, single-line supports horizontal alignment, character spacing; multi-line supports explicit line breaks and automatic line breaks, vertical alignment |

> For more atomic graphics and detailed properties, please refer to [Element - Graphics (Optional)](/en/manual/element/shape/overview)

All these graphics can be dynamically created or updated through `upsert()` and automatically manage graphic states and lifecycles.

### Element Base Class

Before customizing elements, you need to understand some important properties and methods in the G6 element base class:

#### Properties

| Property   | Type                          | Description                                               |
| ---------- | ----------------------------- | --------------------------------------------------------- |
| shapeMap   | Record<string, DisplayObject> | Mapping table of all graphics under the current element   |
| animateMap | Record<string, IAnimation>    | Mapping table of all animations under the current element |

#### Methods

#### `upsert(name, Ctor, style, container, hooks)`: Graphic Creation/Update

When creating custom elements, you will frequently use the `upsert` method. It is an abbreviation for "update or insert", responsible for adding or updating graphics in elements:

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| Parameter | Type                                    | Description                                                                                                                                                                                                                                                                                                                     |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | The key of the graphic, corresponding to the key in `shapeMap`. Built-in keys include `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> The key should not use special symbols, it will be converted to camel case to call `getXxxStyle` and `drawXxxShape` methods (see [Element Conventions](#element-conventions)) |
| Ctor      | { new (...args: any[]): DisplayObject } | Graphic class                                                                                                                                                                                                                                                                                                                   |
| style     | Record<string, any>                     | Graphic style                                                                                                                                                                                                                                                                                                                   |
| container | DisplayObject                           | Container to mount the graphic                                                                                                                                                                                                                                                                                                  |

For example, insert a fixed-position purple circle:

```js
this.upsert(
  'element-key', // Unique identifier of the element
  'circle', // Graphic type, such as 'rect', 'circle', etc.
  { x: 100, y: 100, fill: '#a975f3' }, // Style configuration object
  container, // Parent container
);
```

Why use `upsert` instead of directly creating graphics through `container.appendChild()`? Because:

1. **Better performance**: When node states change or data updates, it intelligently reuses existing graphics instead of deleting and recreating, greatly improving rendering performance
2. **Simpler code**: No need to manually determine whether the element exists
3. **Easy to manage**: All graphics created through `upsert` will be recorded in the node's `shapeMap`, you can easily get it through `this.getShape(key)`

#### `render(attributes, container)`: Main Entry for Rendering Nodes

Each custom node class must implement the `render(attributes, container)` method, which defines how the node is "drawn". You can use various atomic graphics here to create the structure you want.

```typescript
render(style: Record<string, any>, container: Group): void;
```

| Parameter | Type                | Description   |
| --------- | ------------------- | ------------- |
| style     | Record<string, any> | Element style |
| container | Group               | Container     |

#### `getShape(name)`: Get Created Graphics

Sometimes, you need to modify the properties of a sub-graphic after creation, or have interactions between sub-graphics. At this time, the `getShape` method can help you get any graphics previously created through `upsert`:

**⚠️ Note**: The order of graphics is important, if graphic B depends on the position of graphic A, A must be created first

### Element Conventions

- **Use Convention Properties**

Currently, the convention element properties include:

- Get the size of the element through `this.getSize()`

- **Use `getXxxStyle` and `drawXxxShape` pairing to draw graphics**

`getXxxStyle` is used to get the graphic style, and `drawXxxShape` is used to draw the graphic. Graphics created in this way support automatic animation execution.

> Where `Xxx` is the camel case form of the key passed when calling the [upsert](#methods) method.

- **Access Graph Context through `this.context`**

### Lifecycle Hooks

The following lifecycle hook functions are provided, you can override these methods in custom nodes to execute specific logic at key moments:

| Hook Function | Trigger Timing                                                    | Typical Use                                                                      |
| ------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `onCreate`    | After the node is created and the entrance animation is completed | Bind interaction events, initialize node states, add external listeners          |
| `onUpdate`    | After the node is updated and the update animation is completed   | Update dependent data, adjust related elements, trigger linkage effects          |
| `onDestroy`   | After the node is destroyed and the exit animation is completed   | Clean up resources, remove external listeners, execute destruction notifications |

### State Response

The most powerful point in the design of G6 elements is the ability to separate **"state response"** from **"drawing logic"**.

You can define styles for each state in the node configuration:

```js
node: {
  type: 'custom-node',
  style: { fill: '#fff' },
  state: {
    selected: {
      fill: '#f00',
    },
    hover: {
      lineWidth: 3,
      stroke: '#1890ff',
    },
  },
}
```

Method to switch states:

```js
graph.setElementState(nodeId, ['selected']);
```

This state will be passed into the `render()` method's `attributes`, and the result merged by the internal system will be automatically applied to the graphics.

You can also customize the rendering logic based on the state:

```typescript
protected getKeyStyle(attributes: Required<BaseNodeStyleProps>) {
  const style = super.getKeyStyle(attributes);

  // Adjust style based on state
  if (attributes.states?.includes('selected')) {
    return {
      ...style,
      stroke: '#1890ff',
      lineWidth: 2,
      shadowColor: 'rgba(24,144,255,0.2)',
      shadowBlur: 15,
    };
  }

  return style;
}
```

## From Simple to Complex: Gradually Build Feature-Rich Nodes

Let's gradually increase the complexity and functionality of nodes through practical examples.

### Node with Icon and Label

Place an icon and label text in the upper left corner of the node.

> 👇 Step Description:
>
> 1. Inherit Rect node
> 2. Add icon (image)
> 3. Add label (text)

```js | ob { autoMount: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class IconNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data;
  }

  getCustomIconStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const { icon } = this.data;
    return {
      x: -width / 2 + 4, // 15px from the left
      y: -height / 2 + 4,
      width: 20,
      height: 20,
      src: icon,
    };
  }

  drawCustomIconShape(attributes, container) {
    const iconStyle = this.getCustomIconStyle(attributes);

    this.upsert('custom-icon', 'image', iconStyle, container);
  }

  getCustomLabelStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const { label } = this.data;
    return {
      x: -width / 2 + 26, // 10px to the right of the icon
      y: -height / 2 + 14,
      text: label || '',
      fontSize: 10,
      fill: '#333',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawCustomLabelShape(attributes, container) {
    const labelStyle = this.getCustomLabelStyle(attributes);

    this.upsert('custom-label', 'text', labelStyle, container);
  }

  render(attributes, container) {
    // Render basic rectangle
    super.render(attributes, container);

    // Add icon
    this.drawCustomIconShape(attributes, container);

    // Add label (to the right of the icon)
    this.drawCustomLabelShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'custom-icon-node', IconNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          label: 'AntV',
        },
      },
    ],
  },
  node: {
    type: 'custom-icon-node',
    style: {
      size: [120, 60],
      fill: '#fff',
      stroke: '#873bf4',
      lineWidth: 2,
      radius: 2,
      labelText: 'G6',
      labelPlacement: 'middle',
      labelFontSize: 16,
      labelOffsetY: 6,
    },
  },
});

graph.render();
```

### Node with Clickable Button

Add a blue button to the node, which triggers an event (logs or executes a callback) when clicked.

```js | ob { autoMount: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class ClickableNode extends Rect {
  getButtonStyle(attributes) {
    return {
      x: 40,
      y: -10,
      width: 20,
      height: 20,
      radius: 10,
      fill: '#1890ff',
      cursor: 'pointer', // Mouse pointer becomes a hand
    };
  }

  drawButtonShape(attributes, container) {
    const btnStyle = this.getButtonStyle(attributes, container);
    const btn = this.upsert('button', 'rect', btnStyle, container);

    // Add click event to the button
    if (!btn.__clickBound) {
      btn.addEventListener('click', (e) => {
        // Prevent event bubbling to avoid triggering the node's click event
        e.stopPropagation();

        // Execute business logic
        console.log('Button clicked on node:', this.id);

        // If there is a callback function in the data, call it
        if (typeof attributes.onButtonClick === 'function') {
          attributes.onButtonClick(this.id, this.data);
        }
      });
      btn.__clickBound = true; // Mark event as bound to avoid duplicate binding
    }
  }

  render(attributes, container) {
    super.render(attributes, container);

    // Add a button
    this.drawButtonShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'clickable-node', ClickableNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
      },
    ],
  },
  node: {
    type: 'clickable-node', // Specify using our custom node
    style: {
      size: [60, 30],
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 5,
      onButtonClick: (id, data) => {},
    },
  },
});

graph.render();
```

### Node Responding to State Changes (Color Change on Click)

Common interactions require nodes and edges to provide feedback through style changes, such as moving the mouse over a node, clicking to select a node/edge, activating interactions on the edge, etc., all require changing the style of nodes and edges. There are two ways to achieve this effect:

1. Get the current state from `data.states` and handle state changes in the custom node class;
2. Separate interaction states from the original data and drawing node logic, only updating the node.

We recommend users use the second method to achieve node state adjustment, which can be achieved in the following way:

1. Implement custom nodes;
2. Configure node state styles in the graph configuration;
3. Use the `graph.setElementState()` method to set node states.

Extend a hole graphic based on rect, with a default fill color of white, which turns orange when clicked. The sample code to achieve this effect is as follows:

```js | ob { autoMount: true }
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 1. Define node class
class SelectableNode extends Rect {
  getHoleStyle(attributes) {
    return {
      x: 20,
      y: -10,
      radius: 10,
      width: 20,
      height: 20,
      fill: attributes.holeFill,
    };
  }

  drawHoleShape(attributes, container) {
    const holeStyle = this.getHoleStyle(attributes, container);

    this.upsert('hole', 'rect', holeStyle, container);
  }

  render(attributes, container) {
    super.render(attributes, container);

    this.drawHoleShape(attributes, container);
  }
}

// 2. Register node
register(ExtensionCategory.NODE, 'selectable-node', SelectableNode, true);

// 3. Create graph instance
const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  },
  node: {
    type: 'selectable-node',
    style: {
      size: [120, 60],
      radius: 6,
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      holeFill: '#fff',
    },
    state: {
      // Mouse selected state
      selected: {
        holeFill: 'orange',
      },
    },
  },
});

// 4. Add node interaction
graph.on('node:click', (evt) => {
  const nodeId = evt.target.id;

  graph.setElementState(nodeId, ['selected']);
});

graph.render();
```
