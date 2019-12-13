---
title: State
order: 6
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
graph.on('node:mouseenter', evt => {
  const { item } = evt
  graph.setItemState(item, 'hover', true)
})

graph.on('node:mouseleave', evt => {
  const { item } = evt
  graph.setItemState(item, 'hover', false)
})
```

### Behavior
Activate the selected state in custom Behavior.
```javascript
G6.registerBehavior('nodeClick', {
  getEvents() {
    return {
      'node:click': 'onClick'
    };
  },
  onClick(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const { item } = e;
    const graph = this.graph;
    graph.setItemState(item, 'selected', true)
  }
})
```


## Configure Styles for State
In last section, we call `graph.setItemState` to activate/inactivate the states on a node or an edge. But it just marks the state on the item object. To reflect these states to the visual space which is observed by the end users, we need to set the item styles for different states to response the states change.

There are two choices to define the styles of a state:

- Define the state styles in `nodeStateStyles` and `edgeStateStyles` when instantiating a Graph;
- Configure the `stateStyles` in options when customizing a node/edge.

### Configure When instantiating a Graph
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'diamond',
    style: {                // Node style on default state
      fill: 'blue'
    }
  },
  nodeStateStyles: {
    hover: {                // The node style when it is on the its hover state is true
      fill: '#d3adf7'
    },
    running: {              // The node style when it is on the its running state is true
    	stroke: 'steelblue'
    }
  }
})
```

The code above defines the styles of interaction state `hover` and bussiness state `running` by  `nodeStateStyles`, which means when the mouse `hover` a node, the filling color of the node will be changed into `'#d3adf7'`. When the `running` of a node is activated, the stroke color of the node will be changed into `'steelblue'`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Beu6QY_ETOgAAAAAAAAAAABkARQnAQ' width=150/>

Similarly, the `style` of `defaultEdge` defines the styles of the node on the default state. And  `edgeStateStyles` can be used for defined the styles on other states.

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
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1DFnTKfmfLcAAAAAAAAAAABkARQnAQ' width=150/>


## Conclusion
G6 provides the state management for simplify the states of the items. For more information about the state thinking, please refer to <a href='https://www.yuque.com/antv/g6/xiux28' target='_blank'>The Thinking of the State in G6</a>.
