---
title: Overview
order: 0
---

## Layout Registration and Usage

This directory lists all the built-in layout algorithms in G6. In order to reduce the package size, only a few core layouts are registered by default in G6 5.0. Therefore, **before using these built-in layouts, you also need to register them in G6**. Similarly, custom layouts should also be registered as follows:

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  transforms: {
    'dagre-layout': Extensions.DagreLayout,
    'compactbox-layout': Extensions.compactBox,
  },
});

// Register before using in instantiation or subsequent API calls
const graph = new Graph({
  // ... Other configuration items
  layout: {
    type: 'dagre-layout', // The type is consistent with the key name when registering
    // ... Other layout configurations
  },
});

graph.layout({
  type: 'compactbox-layout', // The type is consistent with the key name when registering. Applicable to both tree and graph layouts
  // ... Other layout configurations
});
```

### Navigation

- **[Force Layout](./ForceLayoutOptions.zh.md)**: The recommended layout algorithm in G6 5.0 (an upgraded version of Force2 in G6 4.0), with better performance compared to other force-directed layouts.

> Force-directed layout: In a layout network, particles have attractive and repulsive forces between them. Starting from a random and unordered layout, the layout gradually evolves and tends to a balanced and stable layout. It is suitable for describing relationships between things, such as character relationships and computer network relationships.

- [Force Atlas 2 Layout](./ForceAtlas2LayoutOptions.zh.md): FA2 force-directed layout, better and more compact than force.
- [Fruchterman Layout](./FruchtermanLayoutOptions.zh.md): Fruchterman layout, a type of force-directed layout.
- [D3 Force Layout](./D3ForceLayoutOptions.zh.md): Classic force-directed layout from d3.
- [Circular Layout](./CircularLayoutOptions.zh.md): Circular layout.
- [Radial Layout](./RadialLayoutOptions.zh.md): Radial layout.
- [MDS Layout](./MDSLayoutOptions.zh.md): A dimensionality reduction algorithm for layout.
- [Dagre Layout](./DagreLayoutOptions.zh.md): Hierarchical layout.
- [Concentric Layout](./ConcentricLayoutOptions.zh.md): Concentric circle layout, with important (measured by degree by default) nodes placed in the center of the layout.
- [Grid Layout](./GridLayoutOptions.zh.md): Grid layout, with nodes arranged in order (default is data order) on the grid.
- [Combo Combined Layout](./ComboCombinedLayoutOptions.zh.md): Suitable for graphs with combos, can freely combine internal and external layouts, and can achieve good results by default. Recommended for graphs with combos.

<br />
<br />
Tree layout (can be used for both general graph layouts and tree layouts):

- [CompactBox Compact Tree Layout](./CompactBoxLayoutOptions.zh.md)
- [Dendrogram Tree Layout](./DendrogramLayoutOptions.zh.md)
- [Indented Tree Layout](./IndentedLayoutOptions.zh.md)
- [Mindmap Tree Layout](./MindmapLayoutOptions.zh.md)

## Using Layout Information from Data

The configuration options for each layout method may vary. Please refer to the API for each layout method in this directory. When instantiating a graph without specifying a layout:

- If the nodes in the data have position information (x and y), the graph will be drawn based on the given positions.

- If the nodes in the data do not have position information, the default Random Layout will be used.

If webworker is enabled (`workerEnabled: true`), some function configurations may be ignored.

## Using General Graph Layout Independently

The general graph layout is derived from @antv/layout. If you want to use it independently, you can import it directly from @antv/layout or import it from G6.Extensions and then use it after instantiation:

```javascript
import { Extensions } from '@antv/g6';
import { Graph as GraphLib } from '@antv/graphlib';

const { ForceLayout } = Extensions;

// Define the data structure using GraphLib
const graphLib = new GraphLib({
  nodes: [
    { id: 'node1', data: {} },
    { id: 'node2', data: {} },
  ],
  edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
});

const forceLayout = new ForceLayout({
  // ... some configurations
});

// If you don't want to modify the original data, use the execute method
const result = forceLayout.execute(graphLib);

// Or, if you want to modify the original data, use the assign method
const result = forceLayout.assign(graphLib);
```

Here are the API for the general graph layout:

### constructor

The constructor for the layout.

**Parameters**： `LayoutOptions` The configuration for the layout, which varies depending on the specific layout. Please refer to the documentation for each layout in this directory.

### execute

Passes in the data and performs the layout calculation without modifying the original data. The result is returned as the output.

**Type**：(`data`: `GraphLib`, `layoutOpitons`: `Partial<LayoutOptions>`) => `LayoutMapping`

**Parameters**：

- `data`: `GraphLib` is the underlying data structure of G6. As shown in the example above, it can be imported from @antv/graphlib and instantiated with the data.

- `layoutOpitons`: `LayoutOptions` The partial configuration used to update the layout parameters passed during instantiation.

**Returns**：`LayoutMapping` The type of the layout result:

```typescript
type LayoutMapping = {
  nodes: {
    id: string | number;
    data: {
      x: number;
      y: number;
      z?: number;
    };
  }[];
  edges: {
    id: string | number;
    source: string | number;
    target: string | number;
    data: object;
  }[];
};
```

### assign

Passes in the data and performs the layout calculation, modifying the original data and returning the result.

**Type**: (`data`: `GraphLib`, `layoutOpitons`: `Partial<LayoutOptions>`) => `LayoutMapping`

**Parameters**:

- `data`: `GraphLib` is the underlying data structure of G6. As shown in the example above, it can be imported from @antv/graphlib and instantiated with the data.

- `layoutOpitons`: `LayoutOptions` The partial configuration used to update the layout parameters passed during instantiation.

**Returns**：`LayoutMapping` The type of the layout result:

```typescript
type LayoutMapping = {
  nodes: {
    id: string | number;
    data: {
      x: number;
      y: number;
      z?: number;
    };
  }[];
  edges: {
    id: string | number;
    source: string | number;
    target: string | number;
    data: object;
  }[];
};
```

## Using Tree Layout Independently

In G6 5.0, the general graph layout and tree layout are now interconnected. Whether it is the data format for general graphs ([`GraphData`](../data/GraphData.zh.md)), the data format for tree graphs ([`TreeData`](../data/TreeData.zh.md)), or data with multiple trees (forest), they can all be loaded into a graph instance and then used with any general graph layout or tree layout. This is because G6 handles the conversion logic between data in the layout controller. If you want to use the tree layout independently, you should pass in data in the [`TreeData`](../data/TreeData.zh.md) structure. And only one tree can be calculated at a time. The return value structure is also [`TreeData`](../data/TreeData.zh.md).

The tree graph layout is derived from @antv/hierarchy. If you want to use it independently, you can import it directly from @antv/hierarchy or import it from G6.Extensions and then use it after instantiation.

```javascript
import { Extensions } from '@antv/g6';
import { Graph as GraphLib } from '@antv/graphlib';

const { compactBox } = Extensions;

const treeData = {
  id: 'root',
  children: [
    { id: 'child1', children: [{ id: 'child1-1' }, { id: 'child1-2' }] },
    { id: 'child2' }
  ]
}

const result = compactBox(treeData, {
  // ... options
})；

```
