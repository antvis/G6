---
title: Layout Overview
order: 1
---

## Overview

Graph layout refers to the process of arranging the elements in a graph according to certain rules, such as force-directed layouts based on the electrostatic model, sequential arrangement in grid layouts, and tree layouts based on hierarchical structures, etc.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WIhlToluHaEAAAAAAAAAAAAADmJ7AQ/original" />

## Layout Type

G6 provides a variety of layout algorithms, allowing users to select the appropriate layout algorithm based on their needs:

<!-- TODO to be verified if the links are correct -->

- [AntVDagreLayout](/en/api/layouts/antv-dagre-layout): A layout based on dagre customization
- [CircularLayout](/en/api/layouts/circular-layout): Circular layout
- [ComboCombinedLayout](/en/api/layouts/combo-combined-layout): A layout suitable for scenarios with combos
- [ConcentricLayout](/en/api/layouts/concentric-layout): Concentric circle layout
- [D3Force3DLayout](/en/api/layouts/d3-force3-d-layout): A [3D force-directed](https://github.com/vasturiano/d3-force-3d) layout
- [D3ForceLayout](/en/api/layouts/d3-force-layout): A force-directed layout based on [D3](https://d3js.org/d3-force)
- [DagreLayout](/en/api/layouts/dagre-layout): A layout based on [dagre](https://github.com/dagrejs/dagre)
- [FishboneLayout](/en/api/layouts/fishbone): Fishbone layout
- [ForceAtlas2Layout](/en/api/layouts/force-atlas2-layout): A layout based on [ForceAtlas2](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679)
- [ForceLayout](/en/api/layouts/force-layout): Force-directed layout
- [FruchtermanLayout](/en/api/layouts/fruchterman-layout): A layout based on [Fruchterman](https://www.sciencedirect.com/topics/computer-science/reingold-layout)
- [GridLayout](/en/api/layouts/grid-layout): Grid layout
- [MDSLayout](/en/api/layouts/mds-layout): A layout algorithm for high-dimensional data dimensionality reduction
- [RadialLayout](/en/api/layouts/radial-layout): Radial layout
- [RandomLayout](/en/api/layouts/random-layout): Random layout
- [SnakeLayout](/en/api/layouts/snake): Snake layout
- [CompactBoxLayout](/en/api/layouts/compact-box-layout): Compact tree layout
- [DendrogramLayout](/en/api/layouts/dendrogram-layout): Dendrogram layout
- [MindmapLayout](/en/api/layouts/mindmap-layout): Mind map layout
- [IndentedLayout](/en/api/layouts/indented-layout): Indented tree layout

Among them, `CompactBox Layout`, `Dendrogram Layout`, `Mindmap Layout`, and `Indented Layout` are types of tree layouts, suitable for graphs with tree-like structures.

## Register Layout

You can directly use the built-in layouts, but if you want to use other layouts, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomLayout } from 'package-name/or/path-to-your-custom-layout';

register(ExtensionCategory.LAYOUT, 'custom-layout', CustomLayout);
```

## Configure Layout

You can specify the graph's layout algorithm through the `layout` option, for example:

```typescript
{
  layout: {
    // Specify the layout algorithm to be used
    type: 'force',
    // Layout Algorithm Options
    gravity: 10
    // ...
  }
}
```

You can also update the layout configuration after instantiating the graph using `graph.setLayout`.

## Layout Acceleration

G6 provides accelerated versions of some layout algorithms, including: executing layout algorithms in a Web Worker, providing [WASM](https://webassembly.org/) versions of layout algorithms, and GPU-accelerated layout algorithms. They can be used in the following ways:

### Executing Layout Algorithms in a Web Worker

All built-in layout algorithms in G6, except for tree layouts, support execution in a Web Worker. Simply set `enableWorker` to `true`:

```typescript
{
  layout: {
    type: 'force',
    enableWorker: true,
    // ...
  }
}
```

### Use WASM Version Layout Algorithms

The layout algorithms that currently support WASM versions are: `Fruchterman Layout`, `ForceAtlas Layout`, `Force Layout`, `Dagre Layout`.

First, install `@antv/layout-wasm`:

```bash
npm install @antv/layout-wasm --save
```

Import and Register the Layout Algorithm:

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';

register(ExtensionCategory.LAYOUT, 'fruchterman-wasm', FruchtermanLayout);
```

Initialize the Thread:

```typescript
const supported = await supportsThreads();
const threads = await initThreads(supported);
```

Initialize the Graph and Pass in Layout Configuration:

```typescript
const graph = new Graph({
  // ... other configurations
  layout: {
    type: 'fruchterman-wasm',
    threads,
    // ... other configurations
  },
});
```

### Use GPU-Accelerated Layout

The layout algorithms that currently support GPU acceleration are: `Fruchterman Layout` and `GForce Layout`.

First, install `@antv/layout-gpu`:

```bash
npm install @antv/layout-gpu --save
```

Import and Register the Layout Algorithm:

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);
```

Initialize the Graph and Pass in Layout Configuration:

```typescript
const graph = new Graph({
  // ... other configurations
  layout: {
    type: 'fruchterman-gpu',
    // ... other configurations
  },
});
```

## Execute Layout

Usually, after calling `graph.render()`, G6 will automatically execute the layout algorithm.

If you need to manually execute the layout algorithm, G6 provides the following APIs:

- [layout](/en/api/graph/method#graphlayout): Execute the layout algorithm
- [setLayout](/en/api/graph/method#graphsetlayoutlayout): Set the layout algorithm
- [stopLayout](/en/api/graph/method#graphstoplayout): Stop the layout algorithm

## Custom Layout

If the built-in layout algorithms do not meet your requirements, you can create a custom layout algorithm. For details, please refer to [Custom Layout](/en/manual/custom-extension/layout).
