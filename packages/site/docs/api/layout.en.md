---
title: Layout
order: 6
---

## Overview of Layout

[Layout](/en/manual/layout/overview) is a crucial part of graph visualization, determining the positioning of nodes on the canvas. G6 offers a variety of layout algorithms to meet different data structures and visualization needs. Through the layout API, you can:

- Set and update the graph's layout configuration
- Execute or stop layout calculations
- Combine multiple layout strategies
- Customize layout algorithms

A suitable layout can clearly display the relationship patterns between nodes, enhancing the graph's readability and aesthetics.

## API Reference

### Graph.setLayout(layout)

Set the graph's layout algorithm and configuration.

⚠️ **Note**: Calling this function will automatically re-layout, so there's no need to call `graph.layout()` separately.

```typescript
setLayout(layout: LayoutOptions | ((prev: LayoutOptions) => LayoutOptions)): void;
```

**Parameters**

| Parameter | Description                                                                                        | Type                                                                        | Default | Required |
| --------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- | -------- |
| layout    | Layout configuration object, or a function returning a new configuration based on the previous one | [LayoutOptions](#layoutoptions) \| ((prev: LayoutOptions) => LayoutOptions) | -       | ✓        |

**Example 1**: Set a force-directed layout

```typescript
// Set a simple force-directed layout
graph.setLayout({
  type: 'force',
  preventOverlap: true, // Prevent node overlap
  nodeStrength: -50, // Repulsion between nodes, negative value for repulsion
  edgeStrength: 0.5, // Edge strength, affects edge length
});
```

**Example 2**: Update layout using a function

```typescript
// Update based on the current layout configuration
graph.setLayout((prevLayout) => {
  // If the previous layout was force-directed, adjust its parameters
  if (prevLayout.type === 'force') {
    return {
      ...prevLayout,
      preventOverlap: true,
      nodeStrength: -100, // Increase repulsion
      alphaDecay: 0.01, // Lower decay rate for more iteration time
    };
  }

  // Otherwise, switch to radial layout
  return {
    type: 'radial',
    unitRadius: 100,
    preventOverlap: true,
  };
});
```

**Example 3**: Set a combined layout

```typescript
// Set a combined layout - different nodes use different layout algorithms
graph.setLayout([
  {
    type: 'grid',
    // Filter function: only nodes with type 'main' participate in the layout
    nodeFilter: (node) => node.data.type === 'main',
    rows: 1,
  },
  {
    type: 'circle',
    nodeFilter: (node) => node.data.type === 'sub',
    radius: 100,
  },
]);
```

### Graph.getLayout()

Get the current layout configuration.

```typescript
getLayout(): LayoutOptions;
```

**Return Value**

- **Type**: [LayoutOptions](#layoutoptions)
- **Description**: The current layout configuration object

**Example**

```typescript
// Get the current layout configuration
const currentLayout = graph.getLayout();
console.log('Current layout type:', currentLayout.type);
```

### Graph.layout(layoutOptions)

Execute layout calculations. When graph data changes, call this method to trigger the layout algorithm to recalculate node positions.

```typescript
layout(layoutOptions?: LayoutOptions): Promise<void>;
```

**Parameters**

| Parameter     | Description                 | Type                                                                        | Default | Required |
| ------------- | --------------------------- | --------------------------------------------------------------------------- | ------- | -------- |
| layoutOptions | Layout configuration object | [LayoutOptions](#layoutoptions) \| ((prev: LayoutOptions) => LayoutOptions) | -       |          |

If `layoutOptions` is provided, it takes precedence over the graph's current layout configuration.

**Note**

Layout calculation is an asynchronous process, especially for complex layout algorithms like force-directed layout. This method returns a Promise, which can be used to perform subsequent operations after the layout is complete.

**Example 1**: Basic usage

```typescript
// Execute layout
await graph.layout();
console.log('Layout calculation complete');
```

**Example 2**: Re-layout after adding data

```typescript
// Add new nodes and edges
graph.addData({
  nodes: [{ id: 'newNode1' }, { id: 'newNode2' }],
  edges: [{ id: 'newEdge', source: 'existingNode', target: 'newNode1' }],
});

// Draw new nodes and edges
await graph.draw();

// Recalculate layout
await graph.layout();
```

**Example 3**: Listen to layout events

```typescript
import { GraphEvent } from '@antv/g6';

// Before layout starts
graph.on(GraphEvent.BEFORE_LAYOUT, () => {
  console.log('Layout calculation starting...');
});

// After layout completes
graph.on(GraphEvent.AFTER_LAYOUT, () => {
  console.log('Layout calculation complete');
});

// Execute layout
graph.layout();
```

### Graph.stopLayout()

Stop an ongoing layout calculation. Mainly used to stop iterative layout algorithms like force-directed layout.

```typescript
stopLayout(): void;
```

**Note**

Applicable to layouts with iterative animations, currently `force` belongs to this category. If the layout calculation takes too long, you can manually stop the iteration.

**Example 1**: Basic usage

```typescript
// Stop layout after 5 seconds
setTimeout(() => {
  graph.stopLayout();
  console.log('Layout manually stopped');
}, 5000);
```

**Example 2**: Stop layout with user interaction

```typescript
// Stop layout when the user clicks the canvas
import { CanvasEvent } from '@antv/g6';

graph.on(CanvasEvent.CLICK, () => {
  graph.stopLayout();
  console.log('User clicked canvas, layout stopped');
});
```

## Type Definitions

### LayoutOptions

Layout configuration type, can be a single layout configuration or an array of layout configurations.

```typescript
type LayoutOptions = SingleLayoutOptions | SingleLayoutOptions[];
```

### SingleLayoutOptions

Single layout configuration, can be a built-in layout configuration or a custom base layout configuration.

```typescript
type SingleLayoutOptions = BuiltInLayoutOptions | BaseLayoutOptions;
```

### BaseLayoutOptions

Basic configuration items common to all layout types.

```typescript
interface BaseLayoutOptions {
  // Layout type
  type: string;

  // Node filter function for participating in the layout
  nodeFilter?: (node: NodeData) => boolean;

  // Whether to calculate the layout before initializing elements
  preLayout?: boolean;

  // Whether invisible nodes participate in the layout (effective when preLayout is true)
  isLayoutInvisibleNodes?: boolean;

  // Enable layout animation, for iterative layouts, animation transitions occur between iterations
  animation?: boolean;

  // Whether to run the layout in a WebWorker
  enableWorker?: boolean;

  // Number of iterations for iterative layouts
  iterations?: number;

  // Other specific layout configuration items
  [key: string]: any;
}
```

### BuiltInLayoutOptions

Configuration for G6's built-in layout types, see [API - Built-in Layouts](/en/manual/layout/build-in/antv-dagre-layout) for details.
