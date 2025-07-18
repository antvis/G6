---
title: Combo Overview
order: 0
---

## What is a Combo

A Combo, short for Combination, is a special type of graph element in G6 that can contain nodes and sub-combos, similar to the concept of "groups" or "containers." It is typically used to represent set relationships, such as a department containing multiple employees or a city containing multiple regions.

<image width="450" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" />

:::warning{title=Note}
It is not recommended to use Combos in **tree graphs**. The layout mechanism of tree graphs is incompatible with that of Combos, which can lead to node misalignment or style confusion.
:::

G6 has built-in Combos including `circle` (circular combo) and `rect` (rectangular combo), as shown in the images below:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kbk1S5pzSY0AAAAAAAAAAAAADmJ7AQ/original" width="200" />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PKtgSZzmb3YAAAAAAAAAAAAADmJ7AQ/original" width="200" />

## Data Structure

When defining a Combo, you need to add a `combos` field to the graph's data object. Each Combo is an object with the following structure:

| Attribute | Description                                                                                            | Type           | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------- | ------- | -------- |
| id        | Unique identifier of the combo                                                                         | string         | -       | ✓        |
| type      | Combo type, name of built-in combo type or custom combo name, such as `circle` or `rect`               | string         | -       |          |
| data      | Combo data, used to store custom data of the combo, accessible via callback functions in style mapping | object         | -       |          |
| style     | Combo style                                                                                            | object         | -       |          |
| states    | Initial states of the combo                                                                            | string[]       | -       |          |
| combo     | Parent combo ID. If there is no parent combo, it is null                                               | string \| null | -       |          |

An example of a data item in the `combos` array:

```json
{
  "id": "combo1",
  "type": "circle",
  "data": { "groupName": "Group A" },
  "style": { "fill": "lightblue", "stroke": "blue", "collapsed": true },
  "states": [],
  "combo": null
}
```

To assign a node to a Combo, you can add a `combo` field to the node data:

```json
{
  "nodes": [{ "id": "node1", "combo": "comboA" }], // node1 belongs to comboA
  "combos": [{ "id": "comboA" }] // define comboA
}
```

## Configuration Methods

There are three ways to configure Combos, listed in order of priority from highest to lowest:

- Use `graph.setCombo()` for dynamic configuration
- Global configuration during graph instantiation
- Dynamic properties in data

These configuration methods can be used simultaneously. When there are identical configuration items, the method with higher priority will override the one with lower priority.

### Using `graph.setCombo()`

You can dynamically set the style mapping logic of Combos using `graph.setCombo()` after the graph instance is created.

This method must be called before `graph.render()` to take effect and has the highest priority.

```js
graph.setCombo({
  style: {
    type: 'circle',
    style: { fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### Global Configuration During Graph Instantiation

You can configure Combo style mapping globally during graph instantiation. This configuration will apply to all Combos.

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  // Specify combo type and combo style type in the combo configuration
  combo: {
    type: 'circle',
    style: { fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### Dynamic Configuration in Data

If you need different configurations for different Combos, you can write the configuration into the Combo data. This configuration method can be directly written into the data in the form of the following code:

```typescript
// Specify combo type and combo style type in the data
const data = {
  combos: [
    {
      id: 'combo-1',
      type: 'circle',
      style: { size: 100, stroke: 'orange' },
    },
  ],
};
```

### Adjusting Priority

If you want the configuration in the data to have a higher priority than the global configuration, you can take the following approach:

```js
const data = {
  combos: [
    {
      id: 'combo-1',
      type: 'circle',
      style: { size: 100, stroke: 'orange' },
    },
  ],
};

const graph = new Graph({
  combo: {
    type: (d) => d.type || 'rect',
    style: {
      stroke: (d) => d.style.stroke || 'blue',
    },
  },
});
```

## Example

```js | ob { inject: true }
import { Graph, register, Rect, ExtensionCategory } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      combo: 'combo1',
      style: { x: 245, y: 200 },
    },
    {
      id: 'node2',
      combo: 'combo1',
      style: { x: 210, y: 250 },
    },
    {
      id: 'node3',
      combo: 'combo1',
      style: { x: 280, y: 245 },
    },
    {
      id: 'node4',
      combo: 'combo2',
      style: { x: 400, y: 165 },
    },
    {
      id: 'node5',
      combo: 'combo2',
      style: { x: 450, y: 162 },
    },
    {
      id: 'node6',
      combo: 'combo3',
      style: { x: 425, y: 300 },
    },
    {
      id: 'node7',
      combo: 'combo3',
      style: { x: 360, y: 332 },
    },
  ],
  edges: [],
  combos: [
    {
      id: 'combo1',
      combo: 'combo3',
      data: { label: 'Combo A' },
    },
    {
      id: 'combo2',
      combo: 'combo3',
      data: { label: 'Combo B' },
    },
    {
      id: 'combo3',
      data: { label: 'Combo C' },
    },
    {
      id: 'combo4',
      data: { label: 'Combo D' },
      style: { x: 58, y: 248 },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  height: 450,
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelPlacement: 'center',
      labelFill: '#fff',
      labelFontSize: 10,
    },
  },
  combo: {
    type: 'circle',
    style: {
      padding: 2,
      labelText: (d) => d.data.label,
      labelPlacement: 'top',
    },
  },
  behaviors: [
    'collapse-expand',
    {
      type: 'drag-element',
      dropEffect: 'link',
    },
  ],
});

graph.render();
```

## Combo Interaction

Simply rendering a Combo does not provide much practical value; it is only when a series of interactive operations are supported that the value of Combos can be maximized.

In G6, we have built-in interactions such as `drag-element` and `collapse-expand`.

#### drag-element

Supports dragging nodes and Combos. During the dragging of a Combo, the positions of nodes and edges within the Combo will dynamically change. After dragging is complete, the relative positions of the Combo and nodes remain unchanged. You can also change the affiliation of the Combo during dragging by setting `dropEffect: 'link'`.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rJiHQahxgj4AAAAAAAAAAAAAemJ7AQ/original" width="400" />

#### collapse-expand

Supports double-clicking a Combo to collapse and expand it. After collapsing a Combo, all nodes within the Combo are hidden. If there are connections between external nodes and nodes within the Combo, all connections will connect to the Combo.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PfnsSZSkRagAAAAAAAAAAAAAemJ7AQ/original" width="400" />

## Custom Combos

When built-in Combos cannot meet your needs, G6 provides powerful customization capabilities:

- Extend built-in Combos
- Create new Combo types

Unlike Combos, custom Combos need to be registered before use. For detailed tutorials, please refer to the [Custom Combo](/en/manual/element/combo/custom-combo) documentation.
