---
title: HoverActivate
order: 11
---

## Overview

HoverActivate is a built-in behavior in G6 used to implement the hover activation effect on elements. When the mouse hovers over nodes or edges, it automatically triggers visual feedback such as highlighting and displaying. This behavior is an important means of enhancing data exploration in graph visualization, helping users quickly focus on target elements and obtain related information.

## Use Cases

This behavior is mainly used for:

- Quickly locating elements of interest in complex relationship graphs
- Displaying additional information of nodes through hover
- Highlighting connection paths by activating edges when analyzing relationships between nodes

## Online Experience

<embed src="@/common/api/behaviors/hover-activate.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['hover-activate'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      key: 'hover-activate-1', // Specify an identifier for the behavior for dynamic updates
    },
  ],
});
```

## Configuration Options

| Option        | Description                                 | Type                                           | Default          | Required |
| ------------- | ------------------------------------------- | ---------------------------------------------- | ---------------- | -------- |
| type          | Behavior type name                          | string                                         | `hover-activate` | ✓        |
| animation     | Whether to enable animation                 | boolean                                        | true             |          |
| enable        | Whether to enable hover feature             | boolean \| ((event: IPointerEvent) => boolean) | true             |          |
| degree        | Degree of relationship to activate elements | number \| ((event: IPointerEvent) => number);  | 0                |          |
| direction     | Specify edge direction                      | `both` \| `in` \| `out`                        | `both`           |          |
| state         | State of activated elements                 | string                                         | `active`         |          |
| inactiveState | State of inactive elements                  | string                                         | -                |          |
| onHover       | Callback when element is hovered            | (event: IPointerEvent) => void                 | -                |          |
| onHoverEnd    | Callback when hover ends                    | (event: IPointerEvent) => void                 | -                |          |

### enable

`enable` is used to control whether to enable hover highlighting of elements, and can receive a function for dynamic control

For example: Enable hover highlighting only for nodes

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## Code Examples

### Basic Hover Usage

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: ['hover-activate'],
});
```

### Node Trigger Highlight

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

### Flowchart Node Hover Next Node Highlight

```typescript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'hover-activate',
      degree: 1,
      direction: 'out',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: ['hover-activate'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```
