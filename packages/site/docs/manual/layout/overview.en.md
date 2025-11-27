---
title: Layout Overview
order: 0
---

## Overview

Graph layout refers to the process of arranging elements in a graph according to certain rules, such as force-directed layout based on charge elasticity models, grid layout with sequential arrangement, and tree layout based on hierarchical structures.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WIhlToluHaEAAAAAAAAAAAAADmJ7AQ/original" />

## Layout Types

G6 provides a variety of layout algorithms, allowing users to choose the appropriate one based on their needs:

- [AntVDagreLayout](/en/manual/layout/antv-dagre-layout): Custom layout based on dagre
- [CircularLayout](/en/manual/layout/circular-layout): Circular layout
- [ComboCombinedLayout](/en/manual/layout/combo-combined-layout): Layout suitable for combinations
- [ConcentricLayout](/en/manual/layout/concentric-layout): Concentric layout
- [D3Force3DLayout](/en/manual/layout/d3-force3-d-layout): [3D Force-directed](https://github.com/vasturiano/d3-force-3d) layout
- [D3ForceLayout](/en/manual/layout/d3-force-layout): Force-directed layout based on [D3](https://d3js.org/d3-force)
- [DagreLayout](/en/manual/layout/dagre-layout): [dagre](https://github.com/dagrejs/dagre) layout
- [FishboneLayout](/en/manual/layout/fishbone): Fishbone layout
- [ForceAtlas2Layout](/en/manual/layout/force-atlas2-layout): [ForceAtlas2](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679) layout
- [ForceLayout](/en/manual/layout/force-layout): Force-directed layout
- [FruchtermanLayout](/en/manual/layout/fruchterman-layout): [Fruchterman](https://www.sciencedirect.com/topics/computer-science/reingold-layout) layout
- [GridLayout](/en/manual/layout/grid-layout): Grid layout
- [MDSLayout](/en/manual/layout/mds-layout): High-dimensional data dimensionality reduction layout
- [RadialLayout](/en/manual/layout/radial-layout): Radial layout
- [RandomLayout](/en/manual/layout/random-layout): Random layout
- [SnakeLayout](/en/manual/layout/snake): Snake layout
- [CompactBoxLayout](/en/manual/layout/compact-box-layout): Compact tree layout
- [DendrogramLayout](/en/manual/layout/dendrogram-layout): Dendrogram layout
- [MindmapLayout](/en/manual/layout/mindmap-layout): Mindmap layout
- [IndentedLayout](/en/manual/layout/indented-layout): Indented tree layout

Among them, `CompactBox Layout`, `Dendrogram Layout`, `Mindmap Layout`, and `Indented Layout` are types of tree layouts suitable for tree-structured graphs.

## Register Layout

You can directly use built-in layouts, but if you want to use other layouts, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomLayout } from 'package-name/or/path-to-your-custom-layout';

register(ExtensionCategory.LAYOUT, 'custom-layout', CustomLayout);
```

## Configure Layout

The `layout` configuration item can specify the graph's layout algorithm, for example:

```typescript
{
  layout: {
    // Specify the layout algorithm to use
    type: 'force',
    // Configuration items for the layout algorithm
    gravity: 10
    // ...
  }
}
```

You can also use `graph.setLayout` to update the layout configuration after the graph is instantiated.

## Layout Acceleration

G6 provides accelerated versions for some layout algorithms, including executing layout algorithms in Web Workers, providing [WASM](https://webassembly.org/) versions of layout algorithms, and GPU-accelerated layout algorithms. They can be used as follows:

### Execute Layout Algorithms in Web Workers

Except for tree layouts, all built-in layout algorithms in G6 support execution in Web Workers. Simply set `enableWorker` to `true`:

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

Currently supported WASM version layout algorithms include: `Fruchterman Layout`, `ForceAtlas Layout`, `Force Layout`, `Dagre Layout`.

First, install `@antv/layout-wasm`:

```bash
npm install @antv/layout-wasm --save
```

Import and register the layout algorithm:

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';

register(ExtensionCategory.LAYOUT, 'fruchterman-wasm', FruchtermanLayout);
```

Initialize threads:

```typescript
const supported = await supportsThreads();
const threads = await initThreads(supported);
```

Initialize the graph and pass in the layout configuration:

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

Currently supported GPU-accelerated layout algorithms include: `Fruchterman Layout`, `GForce Layout`.

First, install `@antv/layout-gpu`:

```bash
npm install @antv/layout-gpu --save
```

Import and register the layout algorithm:

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);
```

Initialize the graph and pass in the layout configuration:

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

- [layout](/api/layout#graphlayoutlayoutoptions): Execute layout algorithm
- [setLayout](/api/layout#graphsetlayoutlayout): Set layout algorithm
- [stopLayout](/api/layout#graphstoplayout): Stop layout algorithm

## Custom Layout

If the built-in layout algorithms cannot meet your needs, you can customize layout algorithms. For details, please refer to [Custom Layout](/manual/layout/custom-layout).
