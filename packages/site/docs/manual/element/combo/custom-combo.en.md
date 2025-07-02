---
title: Custom Combo
order: 4
---

G6 provides two types of [built-in combos](/en/manual/element/combo/base-combo): circular combos and rectangular combos. However, in complex business scenarios, you may need to create custom combos with specific styles, interactive effects, or behavior logic.

## Before You Start: Understanding the Basic Composition of Combos

In G6, a complete combo typically consists of the following parts:

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the combo, representing the main shape of the combo, such as a circle, rectangle, etc.
- `label`: Text label, usually used to display the name or description of the combo.
- `halo`: A graphic that displays a halo effect around the main graphic.

### Special Characteristics of Combos

Combos differ from ordinary nodes and have the following characteristics:

1. **Containment**: Combos can contain nodes and other combos, forming a hierarchical structure.
2. **Two States**: Expanded and Collapsed states.
3. **Adaptive Size**: Automatically adjusts size based on internal elements.
4. **Drag Behavior**: Supports overall dragging and dragging elements in/out.

## Ways to Customize Combos <Badge type="warning">Choose the Right Way</Badge>

There are two ways to create custom combos:

### 1. Inherit Existing Combo Types <Badge type="success">Recommended</Badge>

This is the most common way, and you can choose to inherit one of the following types:

- [`BaseCombo`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/base-combo.ts) - The most basic combo class, providing core functionality for combos.
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/circle.ts) - Circular combo.
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/rect.ts) - Rectangular combo.

**Why choose this way?**

- 📌 **Less Code**: Reuse existing combo properties and methods, focusing only on new features.
- 📌 **Fast Development**: Suitable for most project needs, quickly achieving business goals.
- 📌 **Easy Maintenance**: Clear code structure and clear inheritance relationships.

:::tip{title=Get Started Now}
If you choose to inherit from existing combo types (recommended), you can jump directly to [Create Your First Custom Combo in Three Steps](#create-your-first-custom-combo-in-three-steps) to start practicing. Most users will choose this approach!
:::

### 2. Develop from Scratch Based on the G Graphics System <Badge>Advanced Usage</Badge>

If existing combo types do not meet your needs, you can create combos from scratch based on the underlying graphics system of G.

**Why choose this way?**

- 📌 **Maximum Freedom**: Full control over every detail of the combo, achieving any complex effect.
- 📌 **Special Needs**: Highly customized scenarios that existing combo types cannot meet.
- 📌 **Performance Optimization**: Performance optimization for specific scenarios.

:::warning{title=Note}
Developing custom combos from scratch requires handling all details yourself, including graphic drawing, event response, state changes, expand/collapse logic, etc., which is quite challenging. You can directly refer to the [source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/base-combo.ts) for implementation.
:::

## Create Your First Custom Combo in Three Steps

Let's start by inheriting `BaseCombo` to implement a custom hexagon combo:

```js | ob { pin:false, inject: true }
import { Graph, register, BaseCombo, ExtensionCategory } from '@antv/g6';

// Define the path for the collapsed state button
const collapse = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x + r - 4, y],
  ];
};

// Define the path for the expanded state button
const expand = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

class HexagonCombo extends BaseCombo {
  // Get the path of the hexagon
  getKeyPath(attributes) {
    const [width, height] = this.getKeySize(attributes);
    const padding = 10;
    const size = Math.min(width, height) + padding;

    // Calculate the vertices of the hexagon
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = (size / 2) * Math.cos(angle);
      const y = (size / 2) * Math.sin(angle);
      points.push([x, y]);
    }

    // Construct the SVG path
    const path = [['M', points[0][0], points[0][1]]];
    for (let i = 1; i < 6; i++) {
      path.push(['L', points[i][0], points[i][1]]);
    }
    path.push(['Z']);

    return path;
  }

  // Get the style of the main graphic
  getKeyStyle(attributes) {
    const style = super.getKeyStyle(attributes);

    return {
      ...style,
      d: this.getKeyPath(attributes),
      fill: attributes.collapsed ? '#FF9900' : '#F04864',
      fillOpacity: attributes.collapsed ? 0.5 : 0.2,
      stroke: '#54BECC',
      lineWidth: 2,
    };
  }

  // Draw the main graphic
  drawKeyShape(attributes, container) {
    return this.upsert('key', 'path', this.getKeyStyle(attributes), container);
  }

  // Draw the expand/collapse button, using paths for finer control
  drawCollapseButton(attributes) {
    const { collapsed } = attributes;
    const [width] = this.getKeySize(attributes);
    const btnR = 8;
    const x = width / 2 + btnR;
    const d = collapsed ? expand(x, 0, btnR) : collapse(x, 0, btnR);

    // Create the clickable area and button graphic
    const hitArea = this.upsert('hit-area', 'circle', { cx: x, r: 8, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', 'path', { stroke: '#54BECC', d, cursor: 'pointer', lineWidth: 1.4 }, hitArea);
  }

  // Override the render method to add more custom graphics
  render(attributes, container) {
    super.render(attributes, container);
    this.drawCollapseButton(attributes, container);
  }

  // Use lifecycle hooks to add event listeners
  onCreate() {
    this.shapeMap['hit-area'].addEventListener('click', () => {
      const id = this.id;
      const collapsed = !this.attributes.collapsed;
      const { graph } = this.context;
      if (collapsed) graph.collapseElement(id);
      else graph.expandElement(id);
    });
  }
}

// Register the custom combo
register(ExtensionCategory.COMBO, 'hexagon-combo', HexagonCombo);

// Create a graph instance and use the custom combo
const graph = new Graph({
  container: 'container',
  height: 250,
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 100, y: 100 } },
      { id: 'node2', combo: 'combo1', style: { x: 150, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 300, y: 100 } },
      { id: 'node4', combo: 'combo2', style: { x: 350, y: 150 } },
    ],
    combos: [
      { id: 'combo1', data: { label: 'Hexagon 1' } },
      { id: 'combo2', data: { label: 'Hexagon 2' }, style: { collapsed: true } },
    ],
  },
  node: {
    style: {
      fill: '#91d5ff',
      stroke: '#1890ff',
      lineWidth: 1,
    },
  },
  combo: {
    type: 'hexagon-combo',
    style: {
      padding: 20,
      showCollapseButton: true,
      labelText: (d) => d.data?.label,
      labelPlacement: 'top',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

### Step 1: Write the Custom Combo Class

```typescript
import { BaseCombo } from '@antv/g6';
import type { BaseComboStyleProps } from '@antv/g6';

// Define button path generation functions
const collapse = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x + r - 4, y],
  ];
};

const expand = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

class HexagonCombo extends BaseCombo {
  // Get the path of the hexagon
  protected getKeyPath(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    const padding = 10;
    const size = Math.min(width, height) + padding;

    // Calculate the vertices of the hexagon
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = (size / 2) * Math.cos(angle);
      const y = (size / 2) * Math.sin(angle);
      points.push([x, y]);
    }

    // Construct the SVG path
    const path = [['M', points[0][0], points[0][1]]];
    for (let i = 1; i < 6; i++) {
      path.push(['L', points[i][0], points[i][1]]);
    }
    path.push(['Z']);

    return path;
  }

  // Get the style of the main graphic, directly using path data
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const style = super.getKeyStyle(attributes);

    return {
      ...style,
      d: this.getKeyPath(attributes),
      fill: attributes.collapsed ? '#FF9900' : '#F04864',
      fillOpacity: attributes.collapsed ? 0.5 : 0.2,
      stroke: '#54BECC',
      lineWidth: 2,
    };
  }

  // Draw the main graphic, using path type to directly pass in style objects
  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', 'path', this.getKeyStyle(attributes), container);
  }

  // Draw the collapse/expand button, using SVG paths for finer control
  protected drawCollapseButton(attributes: Required<BaseComboStyleProps>) {
    const { collapsed } = attributes;
    const [width] = this.getKeySize(attributes);
    const btnR = 8;
    const x = width / 2 + btnR;
    const d = collapsed ? expand(x, 0, btnR) : collapse(x, 0, btnR);

    // Create the clickable area and button graphic
    const hitArea = this.upsert('hit-area', 'circle', { cx: x, r: 8, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', 'path', { stroke: '#54BECC', d, cursor: 'pointer', lineWidth: 1.4 }, hitArea);
  }

  // Use lifecycle hook methods to bind events
  onCreate() {
    this.shapeMap['hit-area'].addEventListener('click', () => {
      const id = this.id;
      const collapsed = !this.attributes.collapsed;
      const { graph } = this.context;
      if (collapsed) graph.collapseElement(id);
      else graph.expandElement(id);
    });
  }
}
```

### Step 2: Register the Custom Combo

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.COMBO, 'hexagon-combo', HexagonCombo);
```

### Step 3: Apply the Custom Combo

```js
const graph = new Graph({
  // ...other configurations
  combo: {
    type: 'hexagon-combo', // Use the name registered
    style: {
      padding: 20,
      showCollapseButton: true,
      labelText: (d) => d.data?.label,
      labelPlacement: 'top',
    },
  },
  // Since we implemented the collapse/expand feature ourselves, only drag behavior is needed here
  behaviors: ['drag-element'],
});
```

🎉 Congratulations! You have created your first custom combo.

## Going Further: Understanding the Principles of Combo Drawing

### Differences Between Combos and Nodes

Although Combos inherit from `BaseNode`, there are some key differences:

1. **Adaptive Size**: Combos automatically calculate the appropriate size based on internal elements.
2. **Expand/Collapse States**: Combos have two display states and need to handle state transitions.
3. **Hierarchical Structure**: Combos can be nested, forming hierarchical relationships.
4. **Internal Element Management**: Combos need to manage the nodes and sub-combos they contain.

### Atomic Graphics

G6's Combos are drawn using atomic graphic units provided by the [G Graphics System](https://g.antv.antgroup.com/). For an introduction to atomic graphics, please refer to the [Element - Shape (Optional)](/en/manual/element/shape/overview) documentation.

All these graphics can be dynamically created or updated using `upsert()` and automatically manage graphic states and lifecycles.

### Element Base Class

Before customizing Combos, you need to understand some important properties and methods in the G6 element base class:

#### Properties

| Property   | Type                          | Description                                               |
| ---------- | ----------------------------- | --------------------------------------------------------- |
| shapeMap   | Record<string, DisplayObject> | Mapping table of all graphics under the current element   |
| animateMap | Record<string, IAnimation>    | Mapping table of all animations under the current element |

#### Methods

#### `upsert(name, Ctor, style, container, hooks)`: Graphic Creation/Update

When creating custom Combos, you will frequently use the `upsert` method. It is short for "update or insert" and is responsible for adding or updating graphics in the element:

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| Parameter | Type                                    | Description                                                                                                                                                                                                                                                                                                                    |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| key       | string                                  | Key of the graphic, corresponding to the key in `shapeMap`. Built-in keys include `'key'`, `'label'`, `'halo'`, `'icon'`, `'port'`, `'badge'`<br/> Keys should not use special symbols, and will be converted to camel case to call `getXxxStyle` and `drawXxxShape` methods (see [Element Conventions](#element-conventions)) |
| Ctor      | { new (...args: any[]): DisplayObject } | Graphic class                                                                                                                                                                                                                                                                                                                  |
| style     | Record<string, any>                     | Graphic style                                                                                                                                                                                                                                                                                                                  |
| container | DisplayObject                           | Container to mount the graphic                                                                                                                                                                                                                                                                                                 |

For example, insert a fixed-position purple circle:

```js
this.upsert(
  'element-key', // Unique identifier of the element
  'circle', // Graphic type, such as 'rect', 'circle', etc.
  { x: 100, y: 100, fill: '#a975f3' }, // Style configuration object
  container, // Parent container
);
```

Why use `upsert` instead of directly creating graphics with `container.appendChild()`? Because:

1. **Better Performance**: When state changes or data updates, it intelligently reuses existing graphics instead of deleting and recreating them, greatly improving rendering performance.
2. **Simpler Code**: No need to manually check if elements exist.
3. **Easy Management**: All graphics created through `upsert` are recorded in the node's `shapeMap`, and you can easily access them with `this.getShape(key)`.

#### `render(attributes, container)`: Main Entry for Rendering Combos

Every custom combo class must implement the `render(attributes, container)` method, which defines how the combo is "drawn". You can use various atomic graphics here to create the structure you want.

```typescript
render(style: Record<string, any>, container: Group): void;
```

| Parameter | Type                | Description   |
| --------- | ------------------- | ------------- |
| style     | Record<string, any> | Element style |
| container | Group               | Container     |

#### `getShape(name)`: Get Created Graphics

Sometimes, you need to modify the properties of a sub-graphic after creation or have interactions between sub-graphics. In this case, the `getShape` method can help you access any graphics previously created with `upsert`:

**⚠️ Note**: The order of graphics is important. If graphic B depends on the position of graphic A, make sure A is created first.

### Element Conventions

- **Use Convention Properties**

The convention properties in combos include:

- Use `this.getKeySize(attributes)` to get the size of the combo, considering the collapsed state and sub-elements.
- Use `this.getContentBBox(attributes)` to get the bounding box of the content area.
- Use `this.getComboPosition(attributes)` to get the current position of the combo, based on state and sub-elements.

- **Use `getXxxStyle` and `drawXxxShape` Pairing for Graphic Drawing**

`getXxxStyle` is used to get the graphic style, and `drawXxxShape` is used to draw the graphic. Graphics created this way support automatic animation execution.

> `Xxx` is the camel case form of the key passed to the [upsert](#methods) method.

- **Access Graph Context via `this.context`**

### Lifecycle Hooks

The following lifecycle hook functions are provided, and you can override these methods in custom combos to execute specific logic at key moments:

| Hook Function | Trigger Timing                                                     | Typical Use Cases                                                                |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `onCreate`    | After the combo is created and the entrance animation is completed | Bind interactive events, initialize combo state, add external listeners          |
| `onUpdate`    | After the combo is updated and the update animation is completed   | Update dependent data, adjust related elements, trigger linkage effects          |
| `onDestroy`   | After the combo is destroyed and the exit animation is completed   | Clean up resources, remove external listeners, execute destruction notifications |

### State Response

One of the most powerful aspects of G6 element design is the ability to separate **"state response"** from **"drawing logic"**.

You can define styles for each state in the combo configuration:

```js
combo: {
  type: 'custom-combo',
  style: {
    fill: '#f0f2f5',
    stroke: '#d9d9d9'
  },
  state: {
    selected: {
      stroke: '#1890ff',
      lineWidth: 2,
      shadowColor: 'rgba(24,144,255,0.2)',
      shadowBlur: 15,
    },
    hover: {
      fill: '#e6f7ff',
    },
  },
}
```

Method to switch states:

```js
graph.setElementState(comboId, ['selected']);
```

This state will be passed into the `render()` method's `attributes` and automatically applied to the graphics as a result of the internal system merging.

You can also customize rendering logic based on the state:

```typescript
protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
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
