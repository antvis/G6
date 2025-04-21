---
title: Graph Options
order: 7
---

## Overview of Graph Options

The [options](/en/manual/graph/option) of a G6 graph instance control various aspects of the graph, including canvas settings, viewport properties, data, layout, styles, interaction behaviors, plugins, and more. By configuring these options appropriately, you can flexibly customize the appearance and behavior of the graph.

Options can be specified when creating a graph instance or dynamically modified at runtime through the API. Some basic configurations (such as devicePixelRatio, container) require destroying and recreating the graph instance to take effect after modification.

## API Reference

### Graph.getOptions()

Retrieve all configuration options of the current graph.

```typescript
getOptions(): GraphOptions;
```

**Return Value**

- **Type**: [GraphOptions](/en/manual/graph/option)
- **Description**: Complete configuration options of the current graph

**Example**

```typescript
// Retrieve the current graph's options
const options = graph.getOptions();
console.log('Current graph options:', options);

// Retrieve specific options
console.log('Current canvas width:', options.width);
console.log('Current layout options:', options.layout);
```

### Graph.setOptions(options)

Update the graph's configuration options.

```typescript
setOptions(options: GraphOptions): void;
```

**Parameters**

| Parameter | Description               | Type                                    | Default | Required |
| --------- | ------------------------- | --------------------------------------- | ------- | -------- |
| options   | New configuration options | [GraphOptions](/en/manual/graph/option) | -       | ✓        |

**Note**

⚠️ **Attention**: To update basic properties like devicePixelRatio, container, etc., you need to destroy the current graph instance and recreate it. Most other configurations can be dynamically updated.

**Example 1**: Basic Usage

```typescript
// Update graph configuration
graph.setOptions({
  width: 1000, // Update width
  height: 800, // Update height
  autoFit: true, // Enable auto-fit
  animation: true, // Enable animation
});
```

**Example 2**: Update Theme

```typescript
// Update graph theme configuration
graph.setOptions({
  theme: {
    type: 'dark', // Switch to dark theme
    // Custom theme configuration
    node: {
      palette: ['#1AAF8B', '#F8E71C', '#8B572A', '#7ED321'],
    },
    edge: {
      palette: ['#F5A623', '#F8E71C', '#8B572A', '#7ED321'],
    },
  },
});
```

**Example 3**: Update Layout Configuration

```typescript
// Update layout configuration
graph.setOptions({
  layout: {
    type: 'force', // Switch to force-directed layout
    preventOverlap: true,
    nodeStrength: -50,
    edgeStrength: 0.7,
  },
});
```

**Example 4**: Update Default Node and Edge Configuration

```typescript
// Update default style configuration for nodes and edges
graph.setOptions({
  node: {
    style: {
      fill: '#91d5ff',
      stroke: '#40a9ff',
      lineWidth: 1,
      radius: 10,
    },
  },
  edge: {
    style: {
      stroke: '#91d5ff',
      lineWidth: 2,
      endArrow: true,
    },
  },
});
```

## Type Definitions

### GraphOptions

```typescript
type GraphOptions = {
  // Whether to enable zooming
  enableZoom?: boolean;

  // Whether to enable dragging
  enableDrag?: boolean;

  // Default style for nodes
  defaultNodeStyle?: {
    fill: string;
    stroke: string;
  };

  // Additional configuration options for the graph
  [configKey: string]: any;
};
```
