---
title: Custom Edge
order: 7
---

G6 provides multiple [built-in edge](/en/manual/element/edge/base-edge) types, including [line](/en/manual/element/edge/line), [polyline](/en/manual/element/edge/polyline), [quadratic (quadratic Bézier curve edge)](/en/manual/element/edge/quadratic), [cubic (cubic Bézier curve edge)](/en/manual/element/edge/cubic), [cubic-horizontal](/en/manual/element/edge/cubic-horizontal), [cubic-vertical](/en/manual/element/edge/cubic-vertical), and more. These built-in edges can meet most basic scenario requirements.

However, in actual projects, you may encounter requirements that these basic edges cannot satisfy. In such cases, you need to create custom edges. Don't worry, it's simpler than you think!

## Before Starting: Understanding the Basic Components of an Edge

In G6, a complete edge typically consists of the following parts:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the edge, representing the primary shape of the edge, such as straight lines, polylines, etc.
- `label`: Text label, usually used to display the name or description of the edge
- `arrow`: Arrow, used to indicate the direction of the edge
- `halo`: Graphic displaying halo effects around the main graphic

## Ways to Create Custom Edges <Badge type="warning">Choose the Right Approach</Badge>

There are two main ways to create custom edges:

### 1. Inherit from Existing Edge Types <Badge type="success">Recommended</Badge>

This is the most commonly used approach. You can choose to inherit from one of the following types:

- [`BaseEdge`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) - The most basic edge class, providing core edge functionality
- [`Line`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/line.ts) - Straight line edge
- [`Polyline`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/polyline.ts) - Polyline edge
- [`Quadratic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/quadratic.ts) - Quadratic Bézier curve edge
- [`Cubic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic.ts) - Cubic Bézier curve edge
- [`CubicVertical`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-vertical.ts) - Vertical cubic Bézier curve edge
- [`CubicHorizontal`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-horizontal.ts) - Horizontal cubic Bézier curve edge

**Why choose this approach?**

- 📌 **Less code**: Reuse existing edge properties and methods, only focus on new functionality
- 📌 **Fast development**: Suitable for most project requirements, quickly achieve business goals
- 📌 **Easy maintenance**: Clear code structure, clear inheritance relationships

:::tip{title=Get Started Now}
If you choose to inherit from existing edge types (recommended), you can jump directly to [Create Your First Custom Edge in Three Steps](#create-your-first-custom-edge-in-three-steps) to start practicing. Most users will choose this approach!
:::

### 2. Build from Scratch Based on G Graphics System <Badge>Advanced Usage</Badge>

If existing edge types don't meet your requirements, you can create edges from scratch based on G's underlying graphics system.

**Why choose this approach?**

- 📌 **Maximum freedom**: Complete control over every detail of the edge, achieving any complex effects
- 📌 **Special requirements**: Highly customized scenarios that existing edge types cannot satisfy
- 📌 **Performance optimization**: Performance optimization for specific scenarios

:::warning{title=Important Notes}
Custom edges built from scratch need to handle all details by themselves, including graphic rendering, event response, state changes, etc., which is more challenging to develop. You can refer directly to the [source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) for implementation.
:::

## Create Your First Custom Edge in Three Steps

Let's start with the most basic `BaseEdge` to implement a custom straight line edge:

```js | ob { pin:false, inject: true }
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

### Step 1: Write Custom Edge Class

```typescript
import { BaseEdge } from '@antv/g6';
import type { BaseEdgeStyleProps } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  // Define edge style, can add or override default styles
  protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    // Call parent class method to get basic style, then add custom styles
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  // Implement abstract method: define edge path
  // This is an abstract method of BaseEdge, all subclasses must implement it
  protected getKeyPath(attributes) {
    // Get source node and target node
    const { sourceNode, targetNode } = this;

    // Get node position coordinates
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    // Return SVG path array, defining a straight line from start to end
    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}
```

:::success{title=Key Method Analysis}

- `getKeyStyle`: Defines the basic style of the edge, such as line width, color, etc.
- `getKeyPath`: An abstract method in `BaseEdge` that **must be implemented**, it defines the path shape of the edge
  :::

### Step 2: Register Custom Edge

Use the `register` method to register the edge type so that G6 can recognize your custom edge:

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);
```

The `register` method requires three parameters:

- Extension category: `ExtensionCategory.EDGE` indicates this is an edge type
- Type name: `my-line-edge` is the name we give to this custom edge, which will be used in configuration later
- Class definition: `MyLineEdge` is the edge class we just created

### Step 3: Apply Custom Edge

In the graph configuration, use our custom edge by setting `edge.type`:

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

## Going Further: Understanding the Principles of Edge Rendering

### Atomic Graphics

G6 nodes are drawn using atomic graphic units provided by the [G graphics system](https://g.antv.antgroup.com/). Here are common graphic elements and their uses:

| Graphic Element | Type       | Description                                                                                                                                                                                                                                                                 |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Circle          | `circle`   | Suitable for representing states, avatars, circular buttons, etc. Refer to SVG's [\<circle\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/circle) element                                                                                            |
| Ellipse         | `ellipse`  | Similar to circle, but supports scenarios with different horizontal and vertical axes. Refer to SVG's [\<ellipse\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/ellipse) element                                                                     |
| Image           | `image`    | Used to display icons, user avatars, LOGOs, etc. Refer to SVG's [\<image\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image) element                                                                                                                         |
| Line            | `line`     | Used for decoration, auxiliary connections, etc. Refer to SVG's [\<line\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) element                                                                                                                           |
| Path            | `path`     | Supports complex graphics such as arrows, arcs, curves, Bézier paths, etc. The path contains a set of commands and parameters with different semantics, [specific usage](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)                                   |
| Polygon         | `polygon`  | Supports custom graphics such as pentagrams, arrows. Refer to SVG's [\<polygon\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon) element                                                                                                                 |
| Polyline        | `polyline` | Multi-point polyline, suitable for complex connection structures. Refer to SVG's [\<polyline\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline) element                                                                                                  |
| Rectangle       | `rect`     | Most commonly used graphic, suitable as containers, cards, buttons, and other basic structures. Refer to SVG's [\<rect\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) element                                                                            |
| Text            | `text`     | Displays names, descriptions, labels, and other content. Provides simple single-line/multi-line text layout capabilities, single-line supports horizontal alignment, character spacing; multi-line supports explicit line breaks and automatic wrapping, vertical alignment |

> For more atomic graphics and detailed properties, please refer to [Element - Shape (Optional)](/en/manual/element/shape/overview)

All these graphics can be dynamically created or updated through `upsert()`, automatically managing graphic state and lifecycle.

### Element Base Class

Before starting to customize elements, you need to understand some important properties and methods in G6 element base classes:

#### Properties

| Property   | Type                          | Description                                           |
| ---------- | ----------------------------- | ----------------------------------------------------- |
| shapeMap   | Record<string, DisplayObject> | Mapping table of all graphics under current element   |
| animateMap | Record<string, IAnimation>    | Mapping table of all animations under current element |

#### Methods

#### `upsert(name, Ctor, style, container, hooks)`: Graphic Creation/Update

When creating custom elements, you will frequently use the `upsert` method. It's short for "update or insert", responsible for adding or updating graphics in elements:

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| Parameter | Type                                    | Description                                                                                                                                                                                                                                                                                                                       |
| --------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | The key of the graphic, i.e., the corresponding key in `shapeMap`. Built-in keys include `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> The key should not use special symbols, it will be converted to camelCase to call `getXxxStyle` and `drawXxxShape` methods (see [Element Conventions](#element-conventions)) |
| Ctor      | { new (...args: any[]): DisplayObject } | Graphic class                                                                                                                                                                                                                                                                                                                     |
| style     | Record<string, any>                     | Graphic style                                                                                                                                                                                                                                                                                                                     |
| container | DisplayObject                           | Container to mount the graphic                                                                                                                                                                                                                                                                                                    |

For example, inserting a purple circle at a fixed position:

```js
this.upsert(
  'element-key', // Unique identifier of the element
  'circle', // Graphic type, such as 'rect', 'circle', etc.
  { x: 100, y: 100, fill: '#a975f3' }, // Style configuration object
  container, // Parent container
);
```

Why use `upsert` instead of directly creating graphics through `container.appendChild()`? Because:

1. **Better performance**: When state changes or data updates, it intelligently reuses existing graphics instead of deleting and rebuilding, greatly improving rendering performance
2. **Simpler code**: No need to manually check if elements exist
3. **Easy management**: All graphics created through `upsert` are recorded in the node's `shapeMap`, you can easily get them through `this.getShape(key)`

#### `render(attributes, container)`: Main Entry Point for Rendering Edges

Every custom edge class must implement the `render(attributes, container)` method, which defines how the edge is "drawn". You can use various atomic graphics here to compose the structure you want.

```typescript
render(style: Record<string, any>, container: Group): void;
```

| Parameter | Type                | Description   |
| --------- | ------------------- | ------------- |
| style     | Record<string, any> | Element style |
| container | Group               | Container     |

#### `getShape(name)`: Get Created Graphics

Sometimes, you need to modify the properties of a sub-graphic after creation, or make sub-graphics interact with each other. In this case, the `getShape` method can help you get any graphic previously created through `upsert`:

**⚠️ Note**: The order of graphics is important. If graphic B depends on the position of graphic A, you must ensure A is created first

### Element Conventions

- **Use Conventional Properties**

Currently conventional element properties include:

- Get element size through `this.getSize()`
- Get edge start and end points through `const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false)` (simple mode - doesn't consider node shape, directly returns node center or nearest port center position)
- Get edge start and end points through `const [sourcePoint, targetPoint] = this.getEndpoints(attributes)` (optimized mode - default is true, considers node shape, returns connection points on node boundary)

- **Use Paired `getXxxStyle` and `drawXxxShape` Methods for Graphic Drawing**

`getXxxStyle` is used to get graphic styles, `drawXxxShape` is used to draw graphics. Graphics created this way support automatic animation execution.

> Where `Xxx` is the camelCase form of the key passed when calling the [upsert](#methods) method.

- **Access Graph Context through `this.context`**

### Lifecycle Hooks

The following lifecycle hook functions are provided, which you can override in custom edges to execute specific logic at key moments:

| Hook Function | Trigger Time                                            | Typical Usage                                                                    |
| ------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `onCreate`    | When edge creation is completed with entrance animation | Bind interaction events, initialize edge state, add external listeners           |
| `onUpdate`    | When edge update is completed with update animation     | Update dependent data, adjust related elements, trigger linkage effects          |
| `onDestroy`   | When edge completes exit animation and is destroyed     | Clean up resources, remove external listeners, execute destruction notifications |

### State Response

One of the most powerful aspects of G6 element design is the ability to separate **"state response"** from **"rendering logic"**.

You can define styles for each state in edge configuration:

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

This state will be passed to the `render()` method's `attributes`, and the merged result by the internal system will be automatically applied to the graphics.

You can also customize rendering logic based on state:

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

### Custom Path Polyline Edge

```js | ob { inject: true }
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

### Additional Labels

```js | ob { inject: true }
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
