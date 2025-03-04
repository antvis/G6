---
title: State
order: 3
---

## Overview

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

Status (State) refers to the condition of an <u>element</u>, such as **selected**, **hovered**, **active**, etc. States allow elements to display different styles in different conditions, helping users to more intuitively understand the information in the graph.

## State Type

In G6, the types of states are represented as an array of strings (`string[]`), meaning that an element can be in multiple states at the same time. For example, a node can be in both the **selected** and **hovered** states.

The predefined states in G6 include:

- `selected`: Selected state
- `active`: Active state
- `highlight`: Highlighted state
- `inactive`: Inactive state
- `disable`: Disabled state

:::warning{title=note}

- **Default State** is the initial state of an element. When an element has no states, it is in the default state.
- The preset states are not mandatory; they are merely common types of states. Users can define more state types according to their own needs.
  :::

## Set Element State

### State Style

Currently, G6 supports configuring state styles within style mappings, for example:

```typescript
{
  node: {
    style: {/** Default State Style */},
    state: {
      selected: {/** Selected State Style */},
      [State name]: {/** State Style */}
    }
  },
  edge: {
    style: {/** Default State Style */},
    state: {
      selected: {/** Selected State Style */},
      [State name]: {/** State Style */}
    }
  },
  combo: {
    style: {/** Default State Style */},
    state: {
      selected: {/** Selected State Style */},
      [State name]: {/** State Style */}
    }
  }
}
```

### Toggle State

Before rendering, you can configure the state of elements in the data:

```typescript
const data = {
  nodes: [
    {
      id: 'node-1',
      states: ['selected'],
    },
    {
      id: 'node-2',
      states: ['disabled'],
    },
  ],
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      states: ['highlight'],
    },
  ],
};
```

Or, after rendering, you can toggle the state of elements through the API:

```typescript
// Set node 'node-1' to the selected state
graph.setElementState('node-1', 'selected');

// Set node 'node-2' to both the selected and disabled states
graph.setElementState('node-2', ['selected', 'disabled']);

// Set both 'node-1' and 'node-2' to the highlighted state
graph.setElementState({
  'node-1': ['highlight'],
  'node-2': ['highlight'],
});
```

### Get State

G6 provides multiple APIs for retrieving states, or for determining whether an element is in a certain state:

```typescript
// Retrieve all states of 'node-1'.
graph.getElementState('node-1');
```

> When an element is only in the **default state**, the `getElementState` method returns an empty array `[]`.

```typescript
// Retrieve all selected nodes.
graph.getElementDataByState('node', 'selected');
```

### Remove State

To remove the state of an element, you can also use the `setElementState` method to achieve this:

```typescript
// Remove all states from `node-1` (restore to the default state)
graph.setElementState('node-1', []);
```

## State Priority

When an element is in multiple states, the priority of the states is determined by the order of the state values. For example, if a node's state value is: `['selected', 'highlight']`, then the final state style will be:

> <i>Final style = Default state style + Selected state style + Highlight state style</i>

The style of the latter state will override the style of the former state.

## Custom State

To customize states, simply add them to the style mapping, for example:

```typescript
{
  node: {
    // Custom state name: 'custom-state'
    state: {
       'custom-state': {/** Custom State Style */}
    }
  },
}
```

Toggle State:

```typescript
graph.setElementState('node-1', 'custom-state');
```
