---
title: Custom Node
order: 12
---

G6 provides a series of [built-in nodes](/en/manual/element/node/base-node), including [circle (Circle Node)](/en/manual/element/node/circle), [diamond (Diamond Node)](/en/manual/element/node/diamond), [donut (Donut Node)](/en/manual/element/node/donut), [ellipse (Ellipse Node)](/en/manual/element/node/ellipse), [hexagon (Hexagon Node)](/en/manual/element/node/hexagon), [html (HTML Node)](/en/manual/element/node/html), [image (Image Node)](/en/manual/element/node/image), [rect (Rectangle Node)](/en/manual/element/node/rect), [star (Star Node)](/en/manual/element/node/star), and [triangle (Triangle Node)](/en/manual/element/node/triangle). These built-in nodes can meet most basic scenario requirements.

However, in actual projects, you may encounter needs that these basic nodes cannot satisfy. In such cases, you need to create custom nodes. Don't worry, this is simpler than you might think!

## Ways to Create Custom Nodes <Badge type="warning">Choose the Right Approach</Badge>

There are mainly two approaches to creating custom nodes:

### 1. Inherit from Existing Node Types <Badge type="success">Recommended</Badge>

This is the most commonly used approach, where you can choose to inherit from one of the following types:

- [`BaseNode`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) - The most basic node class, providing core node functionality
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/circle.ts) - Circle node
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/rect.ts) - Rectangle node
- [`Ellipse`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/ellipse.ts) - Ellipse node
- [`Diamond`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/diamond.ts) - Diamond node
- [`Triangle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/triangle.ts) - Triangle node
- [`Star`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/star.ts) - Star node
- [`Image`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/image.ts) - Image node
- [`Donut`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/donut.ts) - Donut node
- [`Hexagon`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/hexagon.ts) - Hexagon node

**Why choose this approach?**

- 📌 **Less Code**: Reuse properties and methods of existing nodes, only focus on new features
- 📌 **Rapid Development**: Suitable for most project needs, quickly achieve business goals
- 📌 **Easy Maintenance**: Clear code structure with well-defined inheritance relationships

:::tip{title=Get Started Now}
If you choose to inherit from existing node types (recommended), you can jump directly to [Create Your First Custom Node in Three Steps](#create-your-first-custom-node-in-three-steps) to start practicing. Most users will choose this approach!
:::

### 2. Build from Scratch Based on G Graphics System <Badge>Advanced Usage</Badge>

If existing node types don't meet your requirements, you can create nodes from scratch based on G's underlying graphics system.

**Why choose this approach?**

- 📌 **Maximum Freedom**: Complete control over every detail of the node, achieving any complex effects
- 📌 **Special Requirements**: Highly customized scenarios that existing node types cannot satisfy
- 📌 **Performance Optimization**: Performance optimization for specific scenarios

:::warning{title=Important Notes}
Custom nodes built from scratch require handling all details yourself, including graphics rendering, event response, state changes, etc., with higher development difficulty. You can refer directly to the [source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) for implementation.
:::

## Create Your First Custom Node in Three Steps

Let's start with a simple example - creating a **rectangle node with main and subtitle**:

```js | ob { pin:false, inject: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

// Step 1: Create custom node class
class DualLabelNode extends Rect {
  // Subtitle style
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // Place below the main title
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
    // 1. Render basic rectangle and main title
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
          subtitle: 'Your First Custom Node', // Subtitle
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

Inherit from G6's `Rect` (rectangle node) and add a subtitle:

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// Create custom node, inheriting from Rect
class DualLabelNode extends Rect {
  // Subtitle style
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // Place below the main title
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
    // 1. Render basic rectangle and main title
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
- Type name: `dual-label-node` is the name we give to this custom node, which will be used in configuration later
- Class definition: `DualLabelNode` is the node class we just created

### Step 3: Apply Custom Node

Use the custom node in graph configuration:

```js
const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: 'Node A', // Main title
          subtitle: 'Your First Custom Node', // Subtitle
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

🎉 Congratulations! You have created your first custom node. It looks simple, but this process contains the core concept of custom nodes: **inherit from a basic node type**, then **override the `render` method** to add custom content.

## Understanding Data Flow: How to Access Data in Custom Nodes

Before creating complex custom nodes, understanding how data flows into custom nodes is very important. G6 provides multiple ways to access data for custom nodes:

### Method 1: Through `attributes` Parameter (Recommended)

The first parameter `attributes` of the `render` method contains processed style attributes, including data-driven styles:

```js
class CustomNode extends Rect {
  render(attributes, container) {
    // attributes contains all style attributes, including data-driven styles
    console.log('All properties of current node:', attributes);

    // If customData: (d) => d.data.someValue is defined in style
    // Then you can access it through attributes.customData
    const customValue = attributes.customData;

    super.render(attributes, container);
  }
}
```

### Method 2: Through `this.context.graph` to Access Raw Data

When you need to access the node's raw data, you can get it through the graph instance:

```js
class CustomNode extends Rect {
  // Convenient data access method
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  render(attributes, container) {
    // Get complete node data
    const nodeData = this.nodeData;
    console.log('Complete node data:', nodeData);

    // Get business data from data field
    const businessData = this.data;
    console.log('Business data:', businessData);

    super.render(attributes, container);
  }
}
```

### Complete Data Flow Process

Let's understand how data flows from graph data to custom nodes through a specific example:

```js | ob { inject: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class DataFlowNode extends Rect {
  // Method 2: Get raw data through graph
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  render(attributes, container) {
    // Method 1: Get processed styles from attributes
    console.log('Get from attributes:', {
      iconUrl: attributes.iconUrl,
      userName: attributes.userName,
    });

    // Method 2: Get from raw data
    console.log('Get from raw data:', {
      icon: this.data.icon,
      name: this.data.name,
      role: this.data.role,
    });

    // Render basic rectangle
    super.render(attributes, container);

    // Use data to render custom content
    if (attributes.iconUrl) {
      this.upsert(
        'icon',
        'image',
        {
          x: -25,
          y: -12,
          width: 20,
          height: 20,
          src: attributes.iconUrl,
        },
        container,
      );
    }

    if (attributes.userName) {
      this.upsert(
        'username',
        'text',
        {
          x: 10,
          y: 0,
          text: attributes.userName,
          fontSize: 10,
          fill: '#666',
          textAlign: 'center',
          textBaseline: 'middle',
        },
        container,
      );
    }
  }
}

register(ExtensionCategory.NODE, 'data-flow-node', DataFlowNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'user1',
        style: { x: 100, y: 100 },
        // This is the node's business data
        data: {
          name: 'Zhang San',
          role: 'Developer',
          icon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
      },
    ],
  },
  node: {
    type: 'data-flow-node',
    style: {
      size: [80, 40],
      fill: '#f0f9ff',
      stroke: '#0ea5e9',
      lineWidth: 1,
      radius: 4,
      // Map data from data field to style attributes
      iconUrl: (d) => d.data.icon, // This becomes attributes.iconUrl
      userName: (d) => d.data.name, // This becomes attributes.userName
      // Main title uses role information
      labelText: (d) => d.data.role,
      labelFontSize: 12,
      labelFill: '#0369a1',
    },
  },
});

graph.render();
```

:::tip{title=Data Flow Summary}

1. **Graph Data Definition**: Define business data in `data.nodes[].data`
2. **Style Mapping**: Use functions in `node.style` to map data to style attributes
3. **Node Access**: Access data in custom nodes through `attributes` or `this.context.graph`
4. **Rendering Usage**: Use the obtained data to render custom graphics
   :::

## From Simple to Complex: Gradually Building Feature-Rich Nodes

Let's gradually increase the complexity and functionality of nodes through practical examples.

### Example 1: User Card Node with Icon and Badge

This example shows how to create a user card node containing avatar, name, and status badge:

```js | ob { inject: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

class UserCardNode extends Rect {
  get nodeData() {
    return this.context.graph.getNodeData(this.id);
  }

  get data() {
    return this.nodeData.data || {};
  }

  // Avatar style
  getAvatarStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 20,
      y: -height / 2 + 15,
      width: 30,
      height: 30,
      src: attributes.avatarUrl || '',
      radius: 15, // Circular avatar
    };
  }

  drawAvatarShape(attributes, container) {
    if (!attributes.avatarUrl) return;

    const avatarStyle = this.getAvatarStyle(attributes);
    this.upsert('avatar', 'image', avatarStyle, container);
  }

  // Status badge style
  getBadgeStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const status = this.data.status || 'offline';
    const colorMap = {
      online: '#52c41a',
      busy: '#faad14',
      offline: '#8c8c8c',
    };

    return {
      x: width / 2 - 8,
      y: -height / 2 + 8,
      r: 4,
      fill: colorMap[status],
      stroke: '#fff',
      lineWidth: 2,
    };
  }

  drawBadgeShape(attributes, container) {
    const badgeStyle = this.getBadgeStyle(attributes);
    this.upsert('badge', 'circle', badgeStyle, container);
  }

  // Username style
  getUsernameStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 55,
      y: -height / 2 + 20,
      text: attributes.username || '',
      fontSize: 14,
      fill: '#262626',
      fontWeight: 'bold',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawUsernameShape(attributes, container) {
    if (!attributes.username) return;

    const usernameStyle = this.getUsernameStyle(attributes);
    this.upsert('username', 'text', usernameStyle, container);
  }

  // Role label style
  getRoleStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 55,
      y: -height / 2 + 35,
      text: attributes.userRole || '',
      fontSize: 11,
      fill: '#8c8c8c',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawRoleShape(attributes, container) {
    if (!attributes.userRole) return;

    const roleStyle = this.getRoleStyle(attributes);
    this.upsert('role', 'text', roleStyle, container);
  }

  render(attributes, container) {
    // Render basic rectangle
    super.render(attributes, container);

    // Add various components
    this.drawAvatarShape(attributes, container);
    this.drawBadgeShape(attributes, container);
    this.drawUsernameShape(attributes, container);
    this.drawRoleShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'user-card-node', UserCardNode);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      {
        id: 'user1',
        style: { x: 100, y: 100 },
        data: {
          name: 'Zhang Xiaoming',
          role: 'Frontend Engineer',
          status: 'online',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
        },
      },
    ],
  },
  node: {
    type: 'user-card-node',
    style: {
      size: [140, 50],
      fill: '#ffffff',
      stroke: '#d9d9d9',
      lineWidth: 1,
      radius: 6,
      // Data mapping
      avatarUrl: (d) => d.data.avatar,
      username: (d) => d.data.name,
      userRole: (d) => d.data.role,
    },
  },
});

graph.render();
```

### Example 2: Node with Clickable Action Button

Add a blue button to the node that triggers events (prints logs or executes callbacks) when clicked.

```js | ob { inject: true }
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
      cursor: 'pointer', // Mouse pointer becomes hand
    };
  }

  drawButtonShape(attributes, container) {
    const btnStyle = this.getButtonStyle(attributes, container);
    const btn = this.upsert('button', 'rect', btnStyle, container);

    // Add click event to button
    if (!btn.__clickBound) {
      btn.addEventListener('click', (e) => {
        // Prevent event bubbling to avoid triggering node click event
        e.stopPropagation();

        // Execute business logic
        console.log('Button clicked on node:', this.id);

        // If there's a callback function in data, call it
        if (typeof attributes.onButtonClick === 'function') {
          attributes.onButtonClick(this.id, this.data);
        }
      });
      btn.__clickBound = true; // Mark as bound to avoid duplicate binding
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

### Example 3: Node Responding to State Changes (Click to Change Color)

Common interactions require nodes and edges to provide feedback through style changes, such as when the mouse moves over a node, clicking to select nodes/edges, or activating interactions on edges through interaction. All these require changing the styles of nodes and edges. There are two ways to achieve this effect:

1. Get the current state from `data.states` and handle state changes in the custom node class;
2. Separate interaction state from raw data and node drawing logic, only update the node.

We recommend users use the second approach to implement node state adjustments, which can be achieved through the following steps:

1. Implement custom node;
2. Configure node state styles in graph configuration;
3. Set node state through the `graph.setElementState()` method.

Based on rect, extend a hole shape with default white fill color that turns orange when clicked. The sample code to achieve this effect is as follows:

```js | ob { inject: true }
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
