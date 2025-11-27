---
title: Drawing and Rendering
order: 3
---

## Overview of Drawing and Rendering

G6 provides a series of drawing and rendering-related APIs to control the display process of graphical elements. In G6, drawing and rendering are two different concepts:

- **Drawing (draw)**: Responsible only for drawing graphical elements onto the canvas, without involving layout calculations.
- **Rendering (render)**: A complete rendering process, including data processing, layout calculations, and final drawing.

Understanding the differences between these APIs is crucial for optimizing performance and achieving specific effects.

## API Reference

### Graph.draw()

Draw elements without performing layout calculations.

```typescript
draw(): Promise<void>;
```

**Note**

The `draw` method only executes the drawing process of elements and does not recalculate the layout.

⚠️ **Attention**: `draw` is an asynchronous method, requiring the use of `await` or Promise chaining to ensure subsequent operations are executed after drawing is complete.

**Example 1**: Basic Usage

```typescript
// Basic usage
await graph.draw();
```

**Example 2**: Redraw after modifying node styles

```javascript
// Redraw after modifying node styles
graph.updateNodeData([
  {
    id: 'node1',
    style: {
      fill: 'red',
      stroke: 'blue',
      lineWidth: 2,
    },
  },
]);

// Only draw the updated styles without re-layout
await graph.draw();
```

**Example 3**: Batch update multiple elements and draw once

```javascript
// Update multiple nodes
graph.updateNodeData([{ id: 'node1', style: { fill: 'red' } }]);
graph.updateNodeData([{ id: 'node2', style: { fill: 'blue' } }]);

// Update edges
graph.updateEdgeData([{ id: 'edge1', style: { stroke: 'green' } }]);

// Draw after batch operations
await graph.draw();
```

**Example 4**: Use event listener to detect drawing completion

```javascript
import { GraphEvent } from '@antv/g6';

graph.on(GraphEvent.AFTER_DRAW, () => {
  console.log('Drawing complete');
});

await graph.draw();
```

### Graph.render()

Execute the complete rendering process, including data processing, layout calculations, and drawing.

```typescript
render(): Promise<void>;
```

**Note**

The `render` method executes the complete rendering process:

1. Process data updates
2. Draw elements onto the canvas
3. Execute layout algorithms

**Example 1**: Basic Usage

```typescript
// Basic usage
await graph.render();
```

**Example 2**: Render after adding new data

```typescript
graph.addData({
  nodes: [{ id: 'node3' }, { id: 'node4' }],
  edges: [{ id: 'edge2', source: 'node1', target: 'node3' }],
});
await graph.render();
```

**Example 3**: Listen to rendering events

```typescript
import { GraphEvent } from '@antv/g6';

// Before rendering starts
graph.on(GraphEvent.BEFORE_RENDER, () => {
  console.log('Rendering starts...');
  // Show loading indicator
  showLoadingIndicator();
});

// After rendering completes
graph.on(GraphEvent.AFTER_RENDER, () => {
  console.log('Rendering complete');
  // Hide loading indicator
  hideLoadingIndicator();
});

graph.render();
```

### Graph.clear()

Clear all elements on the canvas, including nodes, edges, and other graphical elements.

```typescript
clear(): Promise<void>;
```

**Note**

This method deletes all elements in the graph but retains the canvas configuration and styles. It is an asynchronous method that returns a Promise.

**Example**

```typescript
// Basic usage
await graph.clear();
```

## Usage Tips

### Choosing between draw and render

- Use `draw()` when:
  - Only the styles or states of elements are modified, without needing to recalculate positions.
  - Performance-sensitive, aiming to avoid unnecessary layout calculations.
- Use `render()` when:
  - Initializing the graph.
  - Changing layout configurations.
  - Adding or removing a large number of nodes/edges.
  - Need to recalculate positions of all elements.
