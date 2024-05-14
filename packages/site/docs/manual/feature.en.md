---
title: Feature
order: 1
---

## 🏖️ Brand New Design Paradigm for Graphs

G6 version 5.0 has redesigned the Options paradigm. While ensuring comprehensive capabilities, it optimizes the configuration item structure to be more intuitive and easier to understand.

You only need to quickly grasp the basic [core concepts](/manual/core-concept/graph) to get started with G6 quickly and achieve graph visualization without delay.

**😰 The 4.0 Paradigm** had a complex nested structure and was less semantically capable

```typescript
{
  defaultNode: {
    size: 30,
    style: {
      fill: 'steelblue',
      stroke: '#666',
      lineWidth: 1
    },
    labelCfg: {
      style: {
        fill: '#fff',
      }
    }
  },
  nodeStateStyles: {
    hover: {
      fill: 'lightsteelblue'
    }
  },
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
  },
}
```

**😄 The 5.0 Paradigm** has a clear structure and is easy to understand

```typescript
{
  node: {
    style: {
      size: 30,
      fill: 'steelblue',
      stroke: '#666',
      lineWidth: 1
      labelFill: '#fff',
    },
    state: {
      hover: {
        fill: 'lightsteelblue'
      }
    }
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
}
```

## 🔨 Brand New API Design

G6 5.0 has redesigned its API, adopting a consistent naming convention.

## 🌲 Merging Graphs with Tree Graphs

Tree graphs are essentially a type of directed acyclic graph. G6 5.0 has integrated the design of graphs and tree graphs, reducing the cost of understanding and usage.

Now, you can directly use `Graph` to instantiate and draw tree graphs in G6, without the need to use `TreeGraph`. You simply need to specify the layout as a tree graph layout.

Additionally, G6 provides the `treeToGraphData` utility method to help you quickly convert tree graph data into graph data.

<embed src="@/docs/manual/feature-common/treeToGraphData.md"></embed>

## 🌆 Multi-Renderer Support

G6 5.0 employs the next-generation @antv/g rendering engine, which has been newly designed. It offers support for multiple renderers such as `Canvas`, `SVG`, and `WebGL`. Additionally, it supports the mixed use of different renderers on layered canvases.

```typescript
import { Renderer } from '@antv/g-webgl';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... other configurations
  // Use the WebGL renderer
  renderer: () => new Renderer(),
});
```

## 🚀 High-Performance Layouts

G6 5.0 has adopted a brand-new layout engine, with some layouts implemented in Rust, providing higher performance for layout calculations. Additionally, there is support for WebGPU acceleration in certain layouts.

> 🚀 To utilize high-performance layouts, you will need to install the `@antv/layout-wasm` package

```typescript
import { FruchtermanLayout } from '@antv/layout-gpu';
import { Graph, register, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);

const graph = new Graph({
  // ... other configurations
  layout: {
    type: 'fruchterman-gpu',
    // ... Other Layout Configurations
  },
});
```

## 🎨 Multiple Themes Mechanism

G6 5.0 comes with two built-in themes: light and dark, and allows for flexible customization based on the use case. For details, please refer to [Customize Themes](/manual/custom-extension/theme).

## 💻 Information Layering

Under Construction...

## 🌍 3D Large Graphs

Under Construction...

## 💪 Plugin Optimization and Enhancement

G6 5.0 has optimized and enhanced existing plugins, decoupling Graph from plugins, and providing richer capabilities while optimizing configurations.

Please visit [Plugins](/api/plugins/bubble-sets) to experience the capabilities of more plugins.

## 💼 Optimized Package Size

Thanks to the well-modularized design and extension registration mechanism of G6 5.0, modules that are not used will not be packaged into the final build file, reducing the package size.
