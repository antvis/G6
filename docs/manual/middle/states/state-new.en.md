---
title: Take Use of State Mechanism
order: 7
---

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> State with multiple values, mutually exclusive state, updating styles for sub shapes are supported after V3.4.

### Background

State of item (Node/Edge) build the fast relationships between 「interactions/data changes」 and 「changes of item styles」.

e.g.: the 'hover' state of a node is activated when the mouse enters the node, and the style of the node is changed to response the interaction; 'hover' state is inactivated when the mouse leave the node, and the style of the node is resumed.

In actual scene, state has lots of implicity recommand and complexity.

### Challenges

- **Configure the target state quickly**: Assign a new state and clear all the existing states on a node;
- **State with multiple values**: e.g. the 'bodyState' of a node representing a person has four values 'healthy', 'suspect', 'ill', and 'dead';
- **Mutually exclusive state**: e.g. 'healthy', 'suspect', 'ill', and 'dead' for 'bodyState' are mutually exclusive to each other, any two of them will not exist on a person in the same time;
- **Update the styles for all the sub shapes on a node or an edge**: e.g. a node consist of a rect, a text and a icon image. When the state of the node is chagned, styles of all the shapes can be changed to response it; Modify the state configurations: modify the style configurations for a state easily.

### Program

To address the issues above, we have the following functions for states in G6 3.4:

- Define a state with unified method;
- Set state value with `setItemState` function;
- Update state value with `updateItem` function;
- Cancel state with `clearItemStates` function.

### Define a State

#### Global State

The global state in G6 is defined by `nodeStateStyles` and `edgeStateStyles` on the graph instance.

```javascript
const graph = new G6.Graph({
  container,
  width,
  height,
  nodeStateStyles: {
    hover: {
      fill: 'red',
      'keyShape-name': {
        fill: 'red',
      },
    },
  },
  edgeStateStyles: {},
});
```

The state style of [keyShape](https://g6.antv.vision/zh/docs/manual/middle/elements/shape-keyshape/#keyshape) can be defined in `nodeStateStyles` or `edgeStateStyles` directly. You can also define the styles in the object with the key equals to the `name` of the keyShape.

#### State for Single Node/Edge

Expect set the global styles for items(nodes/edges), you can also define different styles for different items by assgin `stateStyles` in `graph.node(fn)` / `graph.edge(fn)` function.

```javascript
graph.node((node) => {
  return {
    ...node,
    stateStyles: {},
  };
});

const data = {
  nodes: [
    {
      id: 'node',
      stateStyles: {},
    },
  ],
};
```

#### State Styles for Sub Shape

In general, an item(node/edge) consists several a keyShape and some sub shapes. Before V3.4, state styles are only available for keyShape, which means users need to define state styles for other sub shapes in `setState` function when custom a node or an item type.

G6 3.4 supports state styles for sub shapes. They can also be defined by two ways as [Global State](/#global-state) and State for [Single Node/Edge](/#state-for-single-nodeedge). Now we show how to define the global state styles for sub shapes as an example.

```javascript
const graph = new G6.Graph({
  container,
  width,
  height,
  nodeStateStyles: {
    selected: {
      'sub-element': {
        fill: 'green',
      },
      'text-element': {
        stroke: 'red',
      },
    },
  },
  edgeStateStyles: {},
});
```

In [Global State](/#global-state), we recommand define the keyShape's state styles by an object with key equals to the `name` of the keyShape. Similary, you can define the state styles for any sub shape with an object with key equals to its `name`.

As the shown in the above code, we define the state styles for two sub shapes with `name`s `'sub-element'` and `'text-element'` respectively. When we set the state for an item by calling `graph.setItemState(item, 'selected', true)`, the styles of the sub shapes named `'sub-element'` and `'text-element'` will be updated as well.

```javascript
// Calling the following code, the styles of sub-element and text-element will be changed
graph.setItemState(item, 'selected', true);
```

Besides, G6 also supports `updateItem` function to update the state styles for an item.

### Set State

G6 V3.4 supports state with multiple values and binary values:

> Binary: the value can be `true` or `false`, means the state is activated or inactivated respectivly; Multiple value: e.g. a node represents a person with 'bodyState', which has four values: 'healthy', 'suspect', 'ill', 'dead'.

#### Binary State

Binary state is commonly used in interactions, e.g. hover, selected, etc. When a node is selected, the selected state is activated with true value; the selected state is inactivated with false when the node is deselected.

Set the binary state by calling `graph.setItemState(item, 'selected', true)`.

```javascript
const graph = new G6.Graph({
  //...
  nodeStateStyles: {
    selected: {
      fill: 'red',
    },
  },
});

graph.setItemState(item, 'selected', true);
```

#### State with Multiple Values

State with multiple values exists in complex actual cases, e.g. the 'bodyState' of a node representing a person has four values 'healthy', 'suspect', 'ill', and 'dead'. The binary state can not satisfy such situation.

```javascript
const graph = new Graph({
  // ... Other configurations
  // The state styles in different states
  nodeStateStyles: {
    // bodyState with multiple values and matually exclusive
    'bodyState:healthy': {
      // the state styles for the keyShape
      fill: 'green',
    },
    'bodyState:suspect': {},
    'bodyState:ill': {},
  },
});

graph.setItemState(item, 'bodyState', 'healthy');
```

#### Matually Exclusive State

State with multiple values also solves the matually exclusive problem. We now use the same example as above, `bodyState` has four values: `healthy`, `suspect`, `ill`, `dead`.

```javascript
// Matually exclusive state
graph.setItemState(item, 'bodyState', 'healthy');
// Call the following code, the value of bodyState will be changed to dead，
// and item.hasState('bodyState:healthy') will return false
graph.setItemState(item, 'bodyState', 'dead');
```

After calling the code above, the value of the item's `bodyState` is `dead`.

### Update the Configurations for State Styles

Before V3.3, G6 does not support modification on the configurations for state styles. And `updateItem` can only be used to update the default style for keyShape. With V3.4, `updateItem` supports updating the default styles and state styles for keyShape and other sub shapes.

#### Update Default Styles

You can update the default styles for keyShape and sub shapes by assigning the object with the key equals the `name` of the sub shape in `style` of the `updateItem`'s second parameter.

```javascript
// Update item with the default style of keyShape and other sub shapes
graph.updateItem(item, {
  style: {
    // for keyShape's fill, stroke, and opacity
    fill: 'green',
    stroke: 'green',
    opacity: 0.5,
    // the styles for the sub shape named 'node-text'
    'node-text': {
      stroke: 'yellow',
    },
  },
});
```

#### Update State Styles

`updateItem` also can be used to update the state styles for keyShape and sub shapes with `stateStyles`.

```javascript
graph.updateItem(item, {
  style: {
    stroke: 'green',
    'node-text': {
      stroke: 'yellow',
    },
  },
  stateStyles: {
    hover: {
      opacity: 0.1,
      'node-text': {
        stroke: 'blue',
      },
    },
  },
});
graph.setItemState(item, 'hover', true);
```

There might be two situations when calling `updateItem`:

- The state style to be updated is already activated on an item, `item.hasState('hover') === true`: the style will be changed immediately after calling `updateItem`;
- The state style to be updated is not active on an item, `item.hasState('hover') === false`: The style will be changed after calling `graph.setItemState(item, 'hover', true)`.

### Cancel States

`graph.clearItemStates` can be used to cancel one or more states set by `graph.setItemState`.

```javascript
graph.setItemState(item, 'bodyState', 'healthy');
graph.setItemState(item, 'selected', true);
graph.setItemState(item, 'active', true);

// Cancel a single state
graph.clearItemStates(item, 'selected');
graph.clearItemStates(item, ['selected']);

// Cancel multiple states
graph.clearItemStates(item, ['bodyState:healthy', 'selected', 'active']);
```

### State Priority

G6 does not explicitly provide the state priority mechanism. But the `hasState` function which is used to get the value of a state, helps users to control the priority by themselves. e.g.:

```javascript
// Activate the 'active' state of the item to be true
graph.setItemState(item, 'active', true);

// returns the value of 'active' state
const hasActived = item.hasState('active');

// If the value of 'active' state is false, the 'hover' state can be set to true
if (!hasActived) {
  graph.setItemState(item, 'hover', true);
}
```
