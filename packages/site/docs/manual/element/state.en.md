---
title: Element State
order: 2
---

## Overview

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

State refers to the condition in which an element exists, such as **selected, hovered, activated**, etc. States allow elements to display different styles in different conditions, helping users to understand the information in the graph more intuitively.

Key features include:

- **Multiple States Coexist**: An element can have multiple states simultaneously, such as being both "selected" and "highlighted"
- **Style Cascading**: Styles of multiple states will overlay according to priority, with later applied state styles overriding earlier ones
- **Flexible Customization**: In addition to preset states, users can define any custom states according to business needs

## Preset State Types

G6 provides several common state types:

- `selected`: Selected state, usually used to indicate elements chosen by the user
- `active`: Active state, usually used to indicate currently interactive active elements
- `highlight`: Highlight state, usually used to emphasize specific elements
- `inactive`: Inactive state, usually used to fade out non-focused elements
- `disable`: Disabled state, usually used to indicate non-interactive elements

> **Note**: When an element has no state set, it is in the "default state". Preset states are not mandatory, and users can define their own state types as needed.

## Configuration and Usage

### Configure State Styles

Currently, G6 supports configuring state styles in style mapping, for example:

```javascript
const graph = new Graph({
  // Other configurations...
  node: {
    // Default state style
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      lineWidth: 1,
    },
    // Styles for each state
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
      disable: {
        fill: '#ECECEC',
        stroke: '#BFBFBF',
        opacity: 0.5,
      },
    },
  },

  // Default styles and state styles for edges
  edge: {
    style: {
      /* Default style */
    },
    state: {
      selected: {
        /* Selected state style */
      },
      highlight: {
        /* Highlight state style */
      },
      // Other states...
    },
  },

  // Default styles and state styles for combos
  combo: {
    style: {
      /* Default style */
    },
    state: {
      selected: {
        /* Selected state style */
      },
      // Other states...
    },
  },
});
```

### Set Element State

Before rendering, you can configure the initial state of elements in the data:

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      states: ['selected'], // This node is initially in the selected state
      // Other node attributes...
    },
    {
      id: 'node2',
      states: ['disabled'], // This node is initially in the disabled state
      // Other node attributes...
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      states: ['highlight'], // This edge is initially in the highlight state
      // Other edge attributes...
    },
  ],
};
```

A more common scenario is dynamically changing the state of elements through user interaction:

```javascript
// Example 1: Set a single node to the selected state
graph.setElementState('node1', 'selected');

// Example 2: Set multiple states simultaneously
graph.setElementState('node2', ['highlight', 'active']);

// Example 3: Batch set states for multiple elements
graph.setElementState({
  node1: ['selected'],
  node2: ['highlight'],
  edge1: ['active'],
});

// Example 4: Remove states (revert to default state)
graph.setElementState('node1', []);
```

### Query Element State

G6 provides multiple APIs to get states or determine if an element is in a certain state:

```javascript
// Get all states of a specified element (returns an array of states)
const states = graph.getElementState('node1');
console.log(states); // Example: ['selected', 'highlight']
```

> When an element is only in the **default state**, the return value of `getElementState` is `[]`.

```javascript
// Get all node data in a specified state
const selectedNodes = graph.getElementDataByState('node', 'selected');
```

## State Priority and Style Overlay

When an element is in multiple states, the priority of the states is determined by the order in the state array. For example, if a node is in both `['selected', 'highlight']` states, the final state style is:

> Final Style = Default State Style + Selected State Style + Highlight State Style

If there is a conflict in styles of different states (e.g., both set the `fill` attribute), the style of the later state will override the earlier one.

### Custom State

You can create custom states according to business needs:

```javascript
const graph = new Graph({
  // Other configurations...
  node: {
    style: {
      /* Default style */
    },
    state: {
      // Custom state: warning
      warning: {
        fill: '#FFF7E6',
        stroke: '#FA8C16',
        lineWidth: 2,
        lineDash: [4, 4],
      },
      // Custom state: encrypted
      encrypted: {
        fill: '#E6F7FF',
        stroke: '#1890FF',
        icon: {
          show: true,
          img: 'https://path/to/lock-icon.png',
          width: 16,
          height: 16,
        },
      },
    },
  },
});
```

Apply custom states:

```javascript
graph.setElementState('node1', 'warning');
graph.setElementState('node2', 'encrypted');
```
