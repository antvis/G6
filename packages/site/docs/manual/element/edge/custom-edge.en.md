---
title: Custom Edge
order: 10
---

G6 provides various [built-in edge](/en/manual/element/edge/build-in/base-edge) types, such as straight edges, polyline edges, Bezier curve edges, etc. However, in actual projects, you may need to create custom edges with specific styles or interactive effects.

## Before You Start: Understanding the Basic Composition of Edges

In G6, a complete edge usually consists of the following parts:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the edge, representing the main shape of the edge, such as a straight line, polyline, etc.
- `label`: Text label, usually used to display the name or description of the edge.
- `arrow`: Arrow, used to indicate the direction of the edge.
- `halo`: A graphic that displays a halo effect around the main graphic.

## Ways to Customize Edges <Badge type="warning">Choose the Right Way</Badge>

Creating custom edges is similar to customizing nodes, and there are mainly two ways:

### 1. Inherit Existing Edge Types <Badge type="success">Recommended</Badge>

This is the most common way, and you can choose to inherit one of the following types:

- [`BaseEdge`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) - The most basic edge class, providing core functions of edges
- [`Line`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/line.ts) - Straight line edge
- [`Polyline`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/polyline.ts) - Polyline edge
- [`Quadratic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/quadratic.ts) - Quadratic Bezier curve edge
- [`Cubic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic.ts) - Cubic Bezier curve edge
- [`CubicVertical`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-vertical.ts) - Vertical cubic Bezier curve edge
- [`CubicHorizontal`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-horizontal.ts) - Horizontal cubic Bezier curve edge

**Why choose this way?**

- 📌 **Less code**: Reuse existing node properties and methods, only focus on new features
- 📌 **Fast development**: Suitable for most project needs, quickly achieve business goals
- 📌 **Easy maintenance**: Clear code structure, clear inheritance relationship

### 2. Develop from Scratch Based on G Graphics System <Badge>Advanced Usage</Badge>

If none of the existing edge types meet your needs, you can create edges from scratch based on the underlying graphics system of G.

**Why choose this way?**

- 📌 **Maximum freedom**: Fully control every detail of the edge, achieve any complex effect
- 📌 **Special needs**: Highly customized scenarios that existing edge types cannot meet
- 📌 **Performance optimization**: Performance optimization for specific scenarios

:::warning{title=Note}
Custom edges developed from scratch need to handle all details by themselves, including graphic drawing, event response, state changes, etc., which is more difficult to develop. You can directly refer to the [source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) for implementation.
:::

## Three Steps to Create Your First Custom Edge

Let's start with the most basic `BaseEdge` to implement a custom straight edge:

```js | ob { pin:false, autoMount: true }
import { Graph, register, BaseEdge, ExtensionCategory } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  getKeyStyle(attributes) {
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  getKeyPath(attributes) {
    const { sourceNode, targetNode } = this;
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 50 } },
      { id: 'node2', style: { x: 300, y: 120 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },
  edge: {
    type: 'my-line-edge',
    style: {
      zIndex: 3,
    },
  },
});

graph.render();
```

### Step 1: Write a Custom Edge Class

```typescript
import { BaseEdge } from '@antv/g6';
import type { BaseEdgeStyleProps } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  // Define the style of the edge, you can add or override the default style
  protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    // Call the parent class method to get the basic style, then add custom style
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  // Implement abstract method: define the path of the edge
  // This is an abstract method of BaseEdge, all subclasses must implement it
  protected getKeyPath(attributes) {
    // Get the source node and target node
    const { sourceNode, targetNode } = this;

    // Get the position coordinates of the nodes
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    // Return an SVG path array, defining a straight line from the start point to the end point
    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}
```

:::success{title=Key Method Analysis}

- `getKeyStyle`: Define the basic style of the edge, such as line width, color, etc.
- `getKeyPath`: An abstract method in `BaseEdge`, **must be implemented**, it defines the path shape of the edge
  :::

### Step 2: Register the Custom Edge

Use the `register` method to register the edge type so that G6 can recognize your custom edge:

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);
```

The `register` method requires three parameters:

- Extension category: `ExtensionCategory.EDGE` indicates that this is an edge type
- Type name: `my-line-edge` is the name we give to this custom edge, which will be used in the configuration later
- Class definition: `MyLineEdge` is the edge class we just created

### Step 3: Apply the Custom Edge

In the graph configuration, use `edge.type` to use our custom edge:

```js
const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 100 } },
      { id: 'node2', style: { x: 300, y: 150 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },
  edge: {
    type: 'my-line-edge',
    style: {
      zIndex: 3,
    },
  },
});

graph.render();
```

🎉 Congratulations! You have created your first custom edge.

## Going Further: Understanding the Principles of Edge Drawing

### Atomic Graphics

The nodes of G6 are drawn by the graphic atomic units provided by the [G Graphics System](https://g.antv.antgroup.com/). The following are common graphic elements and their uses:

| Graphic Element | Type       | Description                                                                                                                                                                                                                                                      |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Circle          | `circle`   | Suitable for representing states, avatars, circular buttons, etc. Refer to the SVG [<circle>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) element                                                                                           |
| Ellipse         | `ellipse`  | Similar to circle, but supports different horizontal and vertical axes. Refer to the SVG [<ellipse>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse) element                                                                                   |
| Image           | `image`    | Used to display icons, user avatars, logos, etc. Refer to the SVG [<image>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image) element                                                                                                              |
| Line            | `line`     | Used for decoration, auxiliary connection, etc. Refer to the SVG [<line>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) element                                                                                                                 |
| Path            | `path`     | Supports complex graphics, such as arrows, arcs, curves, Bezier paths, etc. Paths contain a set of commands and parameters with different semantics, [usage details](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)                            |
| Polygon         | `polygon`  | Supports custom graphics, such as stars, arrows. Refer to the SVG [<polygon>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon) element                                                                                                          |
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

| Parameter | Type                                    | Description                                                                                                                                                                                                                                                                                                                      |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | The key of the graphic, i.e., the corresponding key in `shapeMap`. Built-in keys include `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> The key should not use special symbols, it will be converted to camel case to call `getXxxStyle` and `drawXxxShape` methods (see [Element Convention](#element-convention)) |
| Ctor      | { new (...args: any[]): DisplayObject } | Graphic class                                                                                                                                                                                                                                                                                                                    |
| style     | Record<string, any>                     | Graphic style                                                                                                                                                                                                                                                                                                                    |
| container | DisplayObject                           | Container to mount the graphic                                                                                                                                                                                                                                                                                                   |

For example, insert a purple circle at a fixed position:

```js
this.upsert(
  'element-key', // Unique identifier of the element
  'circle', // Graphic type, such as 'rect', 'circle', etc.
  { x: 100, y: 100, fill: '#a975f3' }, // Style configuration object
  container, // Parent container
);
```

Why use `upsert` instead of directly creating graphics through `container.appendChild()`? Because:

1. **Better performance**: When the state changes or data updates, it will intelligently reuse existing graphics instead of deleting and recreating, greatly improving rendering performance
2. **Simpler code**: No need to manually determine whether the element exists
3. **Easy management**: All graphics created through `upsert` will be recorded in the node's `shapeMap`, and you can easily get it through `this.getShape(key)`

#### `render(attributes, container)`: Main Entry for Rendering Edges

Each custom edge class must implement the `render(attributes, container)` method, which defines how the edge is "drawn". You can use various atomic graphics here to compose the structure you want.

```typescript
render(style: Record<string, any>, container: Group): void;
```

| Parameter | Type                | Description   |
| --------- | ------------------- | ------------- |
| style     | Record<string, any> | Element style |
| container | Group               | Container     |

#### `getShape(name)`: Get Created Graphics

Sometimes, you need to modify the properties of a sub-graphic after creation, or make sub-graphics interact with each other. At this time, the `getShape` method can help you get any graphics previously created through `upsert`:

**⚠️ Note**: The order of graphics is important. If graphic B depends on the position of graphic A, A must be created first

### Element Convention

- **Use Convention Properties**

Currently, the convention element properties include:

- Get the size of the element through `this.getSize()`
- Get the start and end points of the edge through `const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false)` (simple mode - does not consider node shape, directly returns the center point of the node or the center position of the nearest connection pile)
- Get the start and end points of the edge through `const [sourcePoint, targetPoint] = this.getEndpoints(attributes)` (optimized mode - default is true, considers node shape, returns the connection point on the node boundary)

- **Use the paired method of `getXxxStyle` and `drawXxxShape` for graphic drawing**

`getXxxStyle` is used to get the graphic style, and `drawXxxShape` is used to draw the graphic. Graphics created in this way support automatic animation execution.

> Among them, `Xxx` is the camel case form of the key passed in when calling the [upsert](#method) method.

- **Access the Graph Context through `this.context`**

### Lifecycle Hooks

The following lifecycle hook functions are provided, and you can override these methods in custom edges to execute specific logic at key moments:

| Hook Function | Trigger Timing                                                   | Typical Use                                                                      |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `onCreate`    | When the edge is created and the entrance animation is completed | Bind interactive events, initialize edge state, add external listeners           |
| `onUpdate`    | When the edge is updated and the update animation is completed   | Update dependent data, adjust related elements, trigger linkage effects          |
| `onDestroy`   | When the edge is destroyed after the exit animation is completed | Clean up resources, remove external listeners, execute destruction notifications |

### State Response

The most powerful point in the design of G6 elements is that **"state response"** can be separated from **"drawing logic"**.

You can define styles for each state in the edge configuration:

```js
edge: {
  type: 'custom-edge',
  style: { stroke: '#eee' },
  state: {
    selected: {
      stroke: '#f00',
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
graph.setElementState(edgeId, ['selected']);
```

This state will be passed into the `render()` method's `attributes`, and the result merged by the internal system will be automatically applied to the graphics.

You can also customize the rendering logic based on the state:

```typescript
protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
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

## From Simple to Complex

### Custom Polyline Edge with Custom Path

```js | ob { autoMount: true }
import { Graph, register, BaseEdge, ExtensionCategory } from '@antv/g6';

class MyPolylineEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}

register(ExtensionCategory.EDGE, 'my-polyline-edge', MyPolylineEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 50, ports: [{ key: 'right', placement: [1, 0.5] }] } },
      { id: 'node-1', style: { x: 250, y: 150, ports: [{ key: 'left', placement: [0, 0.5] }] } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'my-polyline-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

### Extra Labels

```js | ob { autoMount: true }
import { Graph, Line, register, BaseEdge, ExtensionCategory, subStyleProps } from '@antv/g6';

class LabelEdge extends Line {
  render(attributes, container) {
    super.render(attributes);
    this.drawEndLabel(attributes, container, 'start');
    this.drawEndLabel(attributes, container, 'end');
  }

  drawEndLabel(attributes, container, type) {
    const key = type === 'start' ? 'startLabel' : 'endLabel';
    const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === 'start' ? 15 : -15,
      fontSize: 16,
      fill: 'gray',
      textBaseline: 'middle',
      textAlign: type,
    };
    const style = subStyleProps(attributes, key);
    const text = style.text;
    this.upsert(`label-${type}`, 'text', text ? { ...fontStyle, ...style } : false, container);
  }
}

register(ExtensionCategory.EDGE, 'extra-label-edge', LabelEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100 } },
      { id: 'node-1', style: { x: 300, y: 100 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'extra-label-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
      startLabelText: 'start',
      endLabelText: 'end',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```
