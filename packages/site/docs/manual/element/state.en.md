---
title: Element State
order: 2
---

## What is Element State

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

Element State refers to the visual representation of elements (nodes, edges, combos) in a graph under different interaction scenarios. For example, when a user clicks on a node, the node might enter a "selected" state and change color; when the mouse hovers over an edge, the edge might enter a "highlight" state and become bold.

**Simply put, states allow elements to dynamically change their appearance based on user operations or business logic.**

### Characteristics of States

- **Multiple State Coexistence**: An element can have multiple states simultaneously, such as being both "selected" and "highlighted"
- **Style Stacking**: Styles from multiple states are stacked together, with later-set state styles having higher priority
- **Complete Customization**: Besides built-in states, you can create any custom states that meet your business requirements

## Built-in State Types

G6 provides some commonly used built-in states that you can use directly:

| State Name  | Description     | Typical Use Cases                    |
| ----------- | --------------- | ------------------------------------ |
| `selected`  | Selected state  | When user clicks to select elements  |
| `active`    | Active state    | Currently interacting element        |
| `highlight` | Highlight state | Elements that need emphasis          |
| `inactive`  | Inactive state  | Dimmed display of unfocused elements |
| `disabled`   | Disabled state  | Non-interactive elements             |

> 💡 **Tip**: These built-in states are not mandatory. You can completely define your own state names according to business requirements.

## Configuring State Styles

### Basic Configuration

Configure corresponding styles for different states when creating a graph instance:

```javascript
const graph = new Graph({
  // Node state style configuration
  node: {
    // Default style (style when no state is applied)
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      lineWidth: 1,
    },
    // Styles for various states
    state: {
      selected: {
        fill: '#95D6FB',
        stroke: '#1890FF',
        lineWidth: 2,
        shadowColor: '#1890FF',
        shadowBlur: 10,
      },
      highlight: {
        stroke: '#FF6A00',
        lineWidth: 2,
      },
      disabled: {
        fill: '#ECECEC',
        stroke: '#BFBFBF',
        opacity: 0.5,
      },
    },
  },

  // Edge state style configuration
  edge: {
    style: {
      stroke: '#E2E2E2',
      lineWidth: 1,
    },
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      },
      highlight: {
        stroke: '#FF6A00',
        lineWidth: 3,
      },
    },
  },

  // Combo state style configuration
  combo: {
    style: {
      fill: '#F0F0F0',
      stroke: '#D9D9D9',
    },
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      },
    },
  },
});
```

### Custom States

You can create any custom states that meet your business requirements:

```javascript
const graph = new Graph({
  node: {
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
    state: {
      // Custom state: error
      error: {
        fill: '#FFEBE6',
        stroke: '#FF4D4F',
        lineWidth: 2,
        lineDash: [4, 4], // Dashed border
      },
      // Custom state: success
      success: {
        fill: '#F6FFED',
        stroke: '#52C41A',
        lineWidth: 2,
      },
      // Custom state: warning
      warning: {
        fill: '#FFFBE6',
        stroke: '#FAAD14',
        lineWidth: 2,
        // Add icon
        icon: {
          show: true,
          text: '⚠️',
          fontSize: 16,
        },
      },
    },
  },
});
```

## Setting Element States

### Setting Initial States in Data

Set initial states for elements in data:

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      states: ['selected'], // Initially in selected state
    },
    {
      id: 'node2',
      states: ['disabled'], // Initially in disabled state
    },
    {
      id: 'node3',
      states: ['highlight', 'active'], // Initially has multiple states
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      states: ['highlight'], // Initial state of the edge
    },
  ],
};

graph.setData(data);
```

### Dynamic State Setting

Dynamically change element states through API:

```javascript
// Set a single state for a single element
graph.setElementState('node1', 'selected');

// Set multiple states for a single element
graph.setElementState('node2', ['highlight', 'active']);

// Batch set states for multiple elements
graph.setElementState({
  node1: ['selected'],
  node2: ['highlight'],
  edge1: ['active'],
});
```

### State Stacking Effect

When an element has multiple states, styles are stacked in order:

```javascript
// Assume a node has both selected and highlight states
graph.setElementState('node1', ['selected', 'highlight']);

// Final style = default style + selected state style + highlight state style
// If there are style conflicts, later state styles will override earlier ones
```

## Clearing Element States

### Clear All States

Restore elements to default state (no states):

```javascript
// Clear all states of a single element
graph.setElementState('node1', []);

// Batch clear states of multiple elements
graph.setElementState({
  node1: [],
  node2: [],
  edge1: [],
});
```

### Clear Specific States

If an element has multiple states, you can clear only some of them:

```javascript
// Assume node1 currently has ['selected', 'highlight', 'active'] three states
// Now only want to keep 'selected' state, clear other states
graph.setElementState('node1', ['selected']);

// Or get current states, then filter out unwanted states
const currentStates = graph.getElementState('node1');
const newStates = currentStates.filter((state) => state !== 'highlight');
graph.setElementState('node1', newStates);
```

### Clear Specific States from All Elements

```javascript
// Clear 'highlight' state from all nodes
const allNodes = graph.getNodeData();
const stateUpdates = {};

allNodes.forEach((node) => {
  const currentStates = graph.getElementState(node.id);
  const newStates = currentStates.filter((state) => state !== 'highlight');
  stateUpdates[node.id] = newStates;
});

graph.setElementState(stateUpdates);
```

## Querying Element States

### Get Element States

```javascript
// Get all states of a specified element
const states = graph.getElementState('node1');
console.log(states); // For example: ['selected', 'highlight']

// If element has no states, returns empty array
console.log(states); // []
```

### Find Elements with Specific States

```javascript
// Get all node data in 'selected' state
const selectedNodes = graph.getElementDataByState('node', 'selected');

// Get all edge data in 'highlight' state
const highlightEdges = graph.getElementDataByState('edge', 'highlight');
```

### Check if Element is in Specific State

```javascript
// Check if element is in specific state
const states = graph.getElementState('node1');
const isSelected = states.includes('selected');
const isHighlight = states.includes('highlight');

console.log('Is node selected:', isSelected);
console.log('Is node highlighted:', isHighlight);
```
