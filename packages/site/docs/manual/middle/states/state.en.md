---
title: State
order: 4
---

## What is State

The **State** in G6 is the state of an item (node/edge), including **Interaction State** and **Bussiness State**.

In G6, the way to configure interaction state and business state is the same. For some users who only use G6 to develop of a certain requirement, and do not want to understand G6 in depth, there is no need to distinguish the difference between the interactive state and the business state. You can define and use the states in the same way without understanding cost.

### Interaction State

The interaction state is closely related to specific interaction actions, such as the user using a mouse to select a node, or hover an edge.

G6 handles interactive states by default.

### Bussiness State

Business state refers to the states customized according to the user's business needs. Business state is not related to interaction actions, and is strongly related to specific business logic. It can also be understood as being strongly data-driven. Such as the execution status of a task, the approval state of an application, etc., different data values ​​represent different business states. Business state has nothing to do with user interaction, but it is handled in the same way as interaction state in G6.

## When to Use State

The principle of judging whether or not to use state comes from the perspective of interaction and business:

- Some interactions need to change the style and properties of nodes or edges;
- The content presented to the user will change based on the data (eg 1 for success, 0 for failure).

If one of these conditions is met, state should be used.

## Using state

After defining the state, you can activate it by **`graph.setItemState`**, which can be called in the listeners like `graph.on` or the custom Behavior, or any place as you wish.

### graph.on

Activate the hover state in the event listeners.

```javascript
graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});
```

### Behavior

Activate the selected state in custom Behavior.

```javascript
G6.registerBehavior('nodeClick', {
  getEvents() {
    return {
      'node:click': 'onClick',
    };
  },
  onClick(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const { item } = e;
    const graph = this.graph;
    graph.setItemState(item, 'selected', true);
  },
});
```

## Configure Styles for State

In last section, we call `graph.setItemState` to activate/inactivate the states on a node or an edge. But it just marks the state on the item object. To reflect these states to the visual space which is observed by the end users, we need to set the item styles for different states to response the states change.

There are three ways to define the styles of a state:

- Define the state styles in `nodeStateStyles` and `edgeStateStyles` when instantiating a Graph;
- Define `stateStyles` in the data of a node or an edge;
- Configure the `stateStyles` in options when customizing a node/edge.

The value of a state can be a boolean or string (multi-value). And you can configure styles for different sub-shapes by assigning the shape name. Refer to the examples below.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ NOTICE: </strong></span>

- Multi-value and state styles for sub-shapes are supported by v3.4 and later versions.
- The state styles for sub-shapes are only available for the sub-shapes which are the chilren of the root graphics group of a node/edge, but not other descendant shapes grouped by nested sub-graphics-groups. The sub-shapes in the built-in nodes/edges are all the children of the root graphics group of a node/edge. If you are customizing a node/edge type, this rule should be noticed.

The format of `nodeStateStyles`, `edgeStateStyles`, and `stateStyles` are shown below:

```javascript
{
    // the style of the boolean state 'hover' when it is true
  hover: {
    // the keyShape style
    fill: '#d3adf7',
    // the style for the shape with name 'node-label'
    'node-label': {
      fontSize: 15
    },
  },
  // the style of the boolean state 'running' when it is true
  running: {
    // the keyShape style
    stroke: 'steelblue',
  },
  // state with multi-value and sub-shapes styles are supported by v3.4 and later version
  // multi-value state 'bodyState', the style for the value is 'health'
  'bodyState:health': {
    // the keyShape style
    fill: 'green',
    // ... other keyShape styles
    // the style for the shape with name 'shape-name1'
    'shape-name1': {
      stroke: '#ccc'
      // ... other styles for the shape with name 'shape-name1'
    },
    // the style for the shape with name 'shape-name2'
    'shape-name2': {
      fill: 'red'
      // ... other styles for the shape with name 'shape-name2'
    }
  },
  // multi-value state 'bodyState', the style for the value is 'suspect'
  'bodyState:suspect': {
    // ...
  },
  // multi-value state 'bodyState', the style for the value is 'ill'
  'bodyState:ill': {
    // ...
  }
  // ... other state styles
}
```
### Configure When instantiating a Graph

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'diamond',
    style: {
      // Node style on default state
      fill: 'blue',
    },
  },
  nodeStateStyles: {
    hover: {
      // The node style when it is on the its hover state is true
      fill: '#d3adf7',
    },
    running: {
      // The node style when it is on the its running state is true
      stroke: 'steelblue',
    },
  },
});
```

The code above defines the styles of interaction state `hover` and bussiness state `running` by `nodeStateStyles`, which means when the mouse `hover` a node, the filling color of the node will be changed into `'#d3adf7'`; the shape with `name` `node-labe` of the node is also changed. When the `running` of a node is activated, the stroke color of the node will be changed into `'steelblue'`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Beu6QY_ETOgAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

(Supported by v3.4 and later versions) The example above also assign the state styles for `'bodyState'`, which is a multi-value state. When the `'bodyState'` is `'health'` for a node, the keyShape style and the style for the shapes with `name` `'shape-name1'` and `'shape-name2'` will be changed.

Similarly, the `style` of `defaultEdge` defines the styles of the node on the default state. And `edgeStateStyles` can be used for defined the styles on other states.


### Configure the State Styles in the Data of a Node/Edge

You can use this way to configure different state styles for different nodes and edges.

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      styles: {
        // default styles
      },
      stateStyles: {
        //... see the example above
      },
      // ...
    },
    {
      id: 'node2',
      styles: {
        // default styles
      },
      stateStyles: {
        //... see the example above
      },
      // ... other configurations
    },
    // ...
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      styles: {
        // default styles
      },
      stateStyles: {
        //... see the example above
      },
      // ... other configurations
    },
    //...
  ],
};
```


### Configure Styles When Customizing Node

The following code defines the styles for interaction states `hover` and `selected` by `stateStyles`. When user hovers anode, the opacity of the node will reduce to 0.8. When user clicks the ndoe, the line width of the stroke will widen to 3.

```javascript
G6.registerNode('customShape', {
  // The configurations of the custom node
  options: {
    size: 60,
    style: {
      lineWidth: 1
    },
    stateStyles: {
      // The style of the node when the mouse hovers the node
      hover: {
        fillOpacity: 0.8
      },
      // The style of the node when the node is selected
      selected: {
        lineWidth: 3
      }
    }
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1DFnTKfmfLcAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>


## Updating the Configurations for State Styles

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ NOTICE: </strong></span> Updating state styles are supported by v3.4 and later versions.

Updating the state styles means modifying the configurations for one state styles configured in [Configure Styles for State](#Configure-Styles-for-State). E.g. the example below shows how to modify the default styles and state styles for a node or an edge instance. Similary, you could also use the format shown in [Configure Styles for State](#Configure-Styles-for-State) to modify the state styles for multi-value states.

```javascript
graph.updateItem(item, {
  // modify the default styles
  style: {
    stroke: 'green',
    // modify the styles for the sub-shape with name 'node-label'
    'node-label': {
      stroke: 'yellow',
    },
  },
  stateStyles: {
    // modify the styles for hover
    hover: {
      opacity: 0.1,
      // modify the hover style for the sub-shape with name  'node-label'
      'node-text': {
        stroke: 'blue',
      },
    },
  },
});
```

There might be two situations when you calling `graph.updateItem`:

- The state for the item is activated, that is `item.hasState('hover') === true`: the modified hover style will takes effect immediately;
- The state for the item is inactivated, that is `item.hasState('hover') === false`: the modified hover style will take effect after calling `graph.setItemState(item, 'hover', true)`.

## Cancel/Inactivate the State

We suggest you to call `graph.clearItemStates` to cancel the state setted by `graph.setItemState`. `graph.clearItemStates` can be used for cancel one or several states.

```javascript
graph.setItemState(item, 'bodyState', 'health');
graph.setItemState(item, 'selected', true);
graph.setItemState(item, 'active', true);
// cancel one state
graph.clearItemStates(item, 'selected');
graph.clearItemStates(item, ['selected']);
// cancel multiple states
graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
```

## State Priority

States conflict sometimes. State priority is necessary for this situation. G6 does not support explicit methods for setting state priorities. The rule is: the latter the state is setted (by `graph.setItemState`), the higher the priority. User could get the activate/inactivate state by `hasState`, and then decide whether to activate another state. In other word, it is controlled by the user. E.g. in most graph visualization app, the node will be highlighted when the mouse hovering the node. And usually we hope the node's 'active' state not to be covered by hover state. That is to say, the priority of 'active' state is higher than 'hover' state.

```javascript
// Set the node to be 'active'
graph.setItemState(item, 'active', true);
// Hover the node
const hasActived = item.hasState('active');
// Set the node to be 'hover' only if the node has no 'active' state
if (!hasActived) {
  graph.setItemState(item, 'hover', true);
}
```


## Conclusion

G6 provides the state management for simplify the states of the items. For more information about the state thinking, please refer to <a href='https://www.yuque.com/antv/g6/xiux28' target='_blank'>The Thinking of the State in G6</a>.
