---
title: Element
order: 2
---

## Overview

In G6, graph elements include **Nodes (Node)**, **Edges (Edge)**, and **Combos (Combo)**, which are the basic building blocks of a graph.

An element is composed of one or more atomic graphics, which are the smallest graphic units in G6, including [rectangles](https://g.antv.antgroup.com/en/api/basic/rect), [circles](https://g.antv.antgroup.com/en/api/basic/circle), [text](https://g.antv.antgroup.com/en/api/basic/text), [paths](https://g.antv.antgroup.com/en/api/basic/path), and so on.

For example, a node can be composed of a rectangle and some text, and an edge can be composed of a path and some text.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2ZewT4T1p_4AAAAAAAAAAAAADmJ7AQ/original" />

G6 has a rich set of built-in graph element types and also supports user-defined graph elements, allowing users to define new types of graph elements according to their needs.

## Configure Element

Unlike G6 4.x, in G6 5.x, all configurations for a single graph element are laid out flat within the same object, with no nesting. Configurations for different parts of a node are distinguished using a prefix. For example, to set the fill color and label name of a node:

```typescript
{
  node: {
    style: {
      fill: 'orange',
      labelText: 'node',
    },
  },
};
```

The advantage of adopting this approach is that during the development process, it is easier to find the corresponding options. It also facilitates the merging of configurations. If you are using the `VSCode` editor, you can see all the configurable properties of an element and search based on keywords:

<image width="800" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oY_uTK80sIoAAAAAAAAAAAAADmJ7AQ/original" />

## Node

Nodes are typically used to represent entities or abstract concepts in a graph, such as a person, a location, an organization, etc. Nodes can contain several attributes, such as the node's ID, name, type, etc.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

G6 provides the following built-in nodes:

- `Circle` for circular nodes
- `Diamond` for diamond-shaped nodes
- `Donut` for donut-shaped nodes
- `Rect` for rectangular nodes
- `Ellipse` for elliptical nodes
- `Hexagon` for hexagonal nodes
- `HTML` for HTML nodes
- `Image` for image nodes
- `Star` for star-shaped nodes
- `Triangle` for triangular nodes

You can use these nodes directly by configuring the `type`:

```typescript
// Specify the Node Type in the Data
const data = {
  nodes: [{ id: 'node-1', type: 'circle' }],
};

// Specify the Node Type in the Node Configuration
{
  node: {
    type: 'circle',
  }
}
```

Generally speaking, most nodes share the same style properties, such as using `size` to specify the node's dimensions. You can view the specific style properties for nodes at [Element - Node](/en/api/elements/nodes/base-node).

Some special nodes may have their own style properties. For example, the `HTML` node has an `innerHTML` property that is used to specify the HTML content of the node. The specific style properties can be found at [Node Style](/en/api/elements/nodes/html).

In addition to these, G6 officially provides some additional nodes that require installation before use:

`@antv/g6-extension-3d` provides 3D nodes:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ShNXTp0u3vkAAAAAAAAAAAAADmJ7AQ/original" />

- `Capsule` for capsule-shaped nodes
- `Cone` for conical nodes
- `Cube` for cubic nodes
- `Cylinder` for cylindrical nodes
- `Plane` for planar nodes
- `Sphere` for spherical nodes
- `Torus` for toroidal nodes

`@antv/g6-extension-react` provides nodes suitable for use with the React framework:

<image width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7jypQbkp00wAAAAAAAAAAAAADmJ7AQ/original" />

- `ReactNode` for React nodes
- `GNode` for nodes written with JSX syntax from `@antv/g`

### Composition of Node

The nodes provided in G6 are composed of the following parts:

<image width="250" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main shape of the node, representing the primary form of the node, such as rectangles, circles, etc.
- `label`: The text label, typically used to display the name or description of the node.
- `icon`: The icon shape, usually used to display an icon for the node, which can be an image or a text icon.
- `badge`: A badge located at the top right corner of the node by default.
- `halo`: The halo effect displayed around the main shape.
- `port`: The connection point on the node, used for connecting edges.

### Register Node

You can directly use built-in nodes, but if you want to use other nodes or create custom nodes, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomNode } from 'package-name/or/path-to-your-custom-node';

register(ExtensionCategory.NODE, 'custom-node', CustomNode);
```

### Configure Node

You can configure the node type and its style in the following ways:

1. Configure in the data:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "custom-node",
      "style": {
        // Node Style
      }
    }
  ]
}
```

2. Configure in the Node Style Mapping:

```typescript
{
  node: {
    type: 'custom-node',
    style: {
      // Node Style
    }
  }
}
```

### Custom Node

If the built-in node elements do not meet your requirements, you can customize node elements,For more details, please refer to [Custom Node](/en/manual/custom-extension/element#custom-node)。

## Edge

You can create edges between any two nodes or combos, and you may also create multiple edges between two nodes/combos to represent different relationships.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

G6 offers several built-in edge types:

- `Line` A straight line edge
- `Polyline` A polyline edge composed of straight line segments
- `Quadratic` An edge with a quadratic Bézier curve
- `Cubic` An edge with a cubic Bézier curve
- `CubicVertical` A cubic Bézier curve edge that is primarily vertical
- `CubicHorizontal` A cubic Bézier curve edge that is primarily horizontal

Configuring an edge is similar to configuring a node, where you can specify the `type` to use the desired edge style:

```typescript
// Specifying Edge Types in Data
const data = {
  edges: [{ source: 'node-1', target: 'node-2', type: 'line' }],
};

// Specifying Edge Types in Edge Configuration
{
  edge: {
    type: 'line',
  }
}
```

In G6, edges are directional by default, pointing from the source node to the target node, but the arrow can be hidden to represent undirected edges.

```typescript
{
  edge: {
    style: {
      startArrow: false,
      endArrow: false,
    },
  },
};
```

### Edge Composition

In G6, an edge is composed of the following parts:

<image height="100" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

- `key` : The primary shape of the edge, representing the main form of the edge, such as a straight line, polyline, etc.
- `label` : A text label, usually used to display the name or description of the edge
- `arrow` : A text label, usually used to display the name or description of the edge
- `halo` : A graphic that displays a halo effect around the main shape

### Register Edge

The registration method for edges is similar to that for nodes:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomEdge } from 'package-name/or/path-to-your-custom-edge';

register(ExtensionCategory.EDGE, 'custom-edge', CustomEdge);
```

### Configure Edge

You can configure the edge type and its style in the following ways:

1. Configure in the data:

```json
{
  "edges": [
    {
      "source": "node-1",
      "target": "node-2",
      "type": "custom-edge",
      "style": {
        // edge style
      }
    }
  ]
}
```

2. In the edge style mapping:

```typescript
{
  edge: {
    type: 'custom-edge',
    style: {
      // edge style
    }
  }
}
```

### Custom Edge

If the built-in edge elements do not meet your requirements, you can customize edge elements. For details, please refer to [Custom Edge](/en/manual/custom-extension/element#custom-edge).

## Combo

Combo, fully named as Combination, is a special type of element in G6 that can contain nodes and sub-combos. It is often used to represent a set relationship, such as a department containing multiple employees, a city containing multiple districts, etc.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJhpRJCcFLAAAAAAAAAAAAAADmJ7AQ/original" />

:::warning{title=note}

It is not recommended to use combos in **tree graph** because the layout method of combos does not match that of tree diagrams, which may lead to style confusion.
:::

G6 provides the following built-in combos:

- `Circle` for circular combos
- `Rect` for rectangular combos

You can use them by configuring the `type`:

```typescript
// Specify the combo Type in the Data
const data = {
  combos: [{ id: 'combo-1', type: 'circle' }],
};

// In the combo configuration, specify the combo type:
{
  combo: {
    type: 'circle',
  }
}
```

### Composition of Combo

The combos provided in G6 are composed of the following parts:

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main shape of the combo, representing the primary form of the combo.
- `halo`: The graphic that displays the halo effect around the main shape.
- `label`: The text label, usually used to display the name or description of the combo.

### Register Combo

The registration method for Combo is similar to that for nodes:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomCombo } from 'package-name/or/path-to-your-custom-combo';

register(ExtensionCategory.COMBO, 'custom-combo', CustomCombo);
```

### Configure Combo

You can configure the combo type and its style in the following ways:

1. Configure in the data:

```json
{
  "combos": [
    {
      "id": "combo-1",
      "type": "custom-combo",
      "style": {
        // combo Style
      }
    }
  ]
}
```

2. Configure in the combo style mapping:

```typescript
{
  combo: {
    type: 'custom-combo',
    style: {
      // combo Style
    }
  }
}
```

### Custom Combo

If the built-in combo elements do not meet your needs, you can customize combo elements. For more details, please refer to [Custom Combo](/en/manual/custom-extension/element#custom-combo).
