---
title: Element Overview
order: 1
---

## Element System

The core of G6 charts is composed of three basic elements: **Node**, **Edge**, and **Combo**. These elements are the fundamental units for building complex graphical networks.

<image width="400" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2ZewT4T1p_4AAAAAAAAAAAAADmJ7AQ/original" />

### Node

[Nodes](/en/manual/element/node/overview) represent entities or concepts in the graph, such as people, places, objects, etc. G6 provides a rich set of built-in node types:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

G6 also supports [defining nodes using React](/en/manual/element/node/react-node) or [custom nodes](/en/manual/element/node/custom-node) to meet specific needs.

### Edge

[Edges](/en/manual/element/edge/overview) represent the connections between nodes, such as friendships, transactions, etc. G6 has multiple built-in edge types:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

When built-in edges do not meet the requirements, complex connection expressions can be achieved through [custom edges](/en/manual/element/edge/custom-edge).

### Combo

[Combos](/en/manual/element/combo/overview) are special elements that can contain nodes and other combos, used to represent collections, groups, or hierarchical relationships. G6 has two built-in combo types:

- **Circle Combo**(`circle`): Suitable for compact grouping
- **Rectangle Combo**(`rect`): Suitable for regular layout grouping

<image width="450" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" />

Combos support nesting, dragging, expanding/collapsing, and other interactions, and more complex container behaviors can be achieved through [custom combos](/en/manual/element/combo/custom-combo).

## Element Composition Principle

Each element is composed of one or more basic shapes. Shapes are the smallest graphical units in G6, including [rectangle](/en/manual/element/shape/properties#rectstyleprops), [circle](/en/manual/element/shape/properties#circlestyleprops), [text](/en/manual/element/shape/properties#textstyleprops), [path](/en/manual/element/shape/properties#pathstyleprops), etc.

For example:

- A node may consist of a background shape (such as a circle) and a text label
- An edge may consist of a path, arrow, and text label
- A combo may consist of a container shape, title text, and expand/collapse button

For more information about shapes, see [Shape Overview](/en/manual/element/shape/overview) and [Shape Style Properties](/en/manual/element/shape/properties).

## Element State

[Element State](/en/manual/element/state) is a powerful mechanism for displaying visual changes of elements in different interactions or business scenarios. G6 provides a complete state management system:

- **Preset States**: `selected`, `highlight`, `active`, etc.
- **State Overlay**: Elements can have multiple states simultaneously, with styles overlaying according to priority
- **Custom States**: Any state can be defined according to business needs

<image width="500" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

## Configure Elements

G6 5.x adopts a flat configuration structure, where all element configurations are at the same level, making it easy to find and manage:

```typescript
{
  node: {
    // Default node style
    style: {
      fill: 'orange',
      labelText: 'node',
    },
    // Node styles in different states
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      }
    }
  },
  edge: {
    // Default edge style
    style: {
      stroke: '#aaa',
    },
    // Edge styles in different states
    state: {
      highlight: {
        stroke: 'red',
      }
    }
  },
  combo: {
    // Default combo style
    style: {
      fill: 'lightblue',
      stroke: 'blue',
    }
  }
};
```

There are three configuration methods, in order of priority from high to low:

1. **Dynamic configuration using instance methods**: such as `graph.setNode()`, `graph.setEdge()`, `graph.setCombo()`
2. **Global configuration when instantiating the graph**: specify configuration items in `new Graph()`
3. **Configuration in data**: set in the data objects of nodes, edges, and combos

In editors like VSCode, you can see all configurable properties of elements and search based on keywords:

<image width="800" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oY_uTK80sIoAAAAAAAAAAAAADmJ7AQ/original" />

## Extension Capabilities

G6 provides powerful extension capabilities to meet various customization needs:

- **Custom Nodes**: [Custom Node Guide](/en/manual/element/node/custom-node)
- **Custom Edges**: [Custom Edge Guide](/en/manual/element/edge/custom-edge)
- **Custom Combos**: [Custom Combo Guide](/en/manual/element/combo/custom-combo)
- **React Nodes**: [Define Nodes Using React](/en/manual/element/node/react-node)
- **3D Extension**: Use 3D nodes through `@antv/g6-extension-3d`

## Built-in Element Reference

### Node Types

- [Built-in Node Library](/en/manual/element/node/base-node)

### Edge Types

- [Built-in Edge Library](/en/manual/element/edge/base-edge)

### Combo Types

- [Built-in Combo Library](/en/manual/element/combo/base-combo)
