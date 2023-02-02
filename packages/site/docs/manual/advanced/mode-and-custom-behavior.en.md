---
title: Using multiple modes
order: 7
---

In this chapter, we will introduce the interactions in G6 by adding nodes and edges. You nee to be familiar with the following before reading this chapter:

- [Custom Behavior](/en/docs/manual/middle/states/custom-behavior);
- [Mode](/en/docs/manual/middle/states/mode).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y1qkTKqhQXkAAAAAAAAAAABkARQnAQ' alt='setmode' width=400 />

<br />The final result in shown above. The complete code: <a href='https://codepen.io/Yanyan-Wang/pen/qBBNaye' target='_blank'>Adding Items</a><br />There are three mode options in the drop-down menu on the upper left.

- Switch to the default interactive mode when the "Default" button is selected: The dragged node will move with the mouse; The node will be selected by clicking;
- Switch to the addNode interactive mode when the "Add Node" button is selected: Add a node by clicking canvas; Select a node by clicking node;
- Switch to the addEdge interactive mode when the "Add Edge" button is selected: Add an edge by clicking the end nodes in order.

**The reason for using multiple modes:**<br /> The same mouse operation has different meanings in different scenarios. For example:

- Canceling the selected state by clicking the canvas V.S. Adding new node on the clicked position on the canvas. Both these two requirements are binded to the event of clicking the canvas;
- Selecting a node by clicking it V.S. Adding an edge by clicking two end nodes. Both these two requirements are binded to the event of clicking the node.

To distinguish the meanings of these operations, we utilize the interaction modes on a graph for different scenarios .<br />

## Prerequisite Code

Here goes the basic HTML code for this chapter. We will add new codes incrementally to enable new functions. This prerequisite code defines the drop-down menu and the source `data`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Interactively Add</title>
  </head>
  <body>
    <!-- The drop-down menu on the upper left -->
    <select id="selector">
      <option value="default">Default</option>
      <option value="addNode">Add Node</option>
      <option value="addEdge">Add Edge</option>
    </select>
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script>
      // Source data
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
          {
            id: 'node3',
            x: 300,
            y: 300,
          },
        ],
        edges: [
          {
            id: 'edge1',
            target: 'node2',
            source: 'node1',
          },
        ],
      };
    </script>
  </body>
</html>
```

## Configure the Interaction Mode

The following code instantiates the Graph, and configure the interaction `modes`, including `default` Mode, `addNode` Mode, and `addEdge` Mode. There are several interaction Behaviors inside each Mode, where `'drag-node'` and `'click-select'` are the built-in Behaviors of G6. `'click-add-node'` and `'click-add-edge'` are the custom Behavior to be defined.

```javascript
// const data = ...
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  // The set of interaction Modes
  modes: {
    // Default mode
    default: ['drag-node', 'click-select'],
    // The Mode of adding nodes
    addNode: ['click-add-node', 'click-select'],
    // The Mode of adding edges
    addEdge: ['click-add-edge', 'click-select'],
  },
  // The node styles in different states
  nodeStateStyles: {
    // The node styles in selected state, corresponds to the built-in click-select behavior
    selected: {
      stroke: '#666',
      lineWidth: 2,
      fill: 'steelblue'
    }
});

graph.data(data);
graph.render();

// Listen to the change of the drop-down menu to swith the interaction Mode
document.getElementById('selector').addEventListener('change', e => {
  const value = e.target.value;
  // Switch the interaction Mode
  graph.setMode(value);
});
```

#### Add a Node

When user select the 'Add Node' button in the menu, the Mode will be switched to the addNode, which includes two Behaviors: `'click-add-node'` and `'click-select'`. The `'click-add-node'` is registered by `G6.registerBehavior`. P.S. the name of `'click-add-node'` can be assigned to any one you like.

```javascript
// The count of the added nodes, it will be used to generate unique id for added node
let addedNodeCount = 0;
// Register the custom Behavior of adding a node by clicking
G6.registerBehavior('click-add-node', {
  // Bind the events and response functions for this custom Behavior
  getEvents() {
    return {
      'canvas:click': 'onClick', // The event to be listned is canvas:click. The response function is onClick
    };
  },
  // The click event
  onClick(ev) {
    const graph = this.graph;
    // Add a new node on the canvas
    const node = this.graph.addItem('node', {
      x: ev.canvasX,
      y: ev.canvasY,
      id: `node-${addedNodeCount}`, // Generate a unique id
    });
    addedNodeCount++;
  },
});
```

#### Add a Node

To add an edge between two end nodes, the users need to switch to the `addEdge` Mode, which includes two behaviors: `'click-add-edge'` and `'click-select'`. The `'click-add-edge'` is registered by `G6.registerBehavior`. P.S. the name of `'click-add-edge'` can be assigned to any one you like.

```javascript
// Register the custom Behavior of adding a edge by clicking
G6.registerBehavior('click-add-edge', {
  // Bind the events and response functions for this custom Behavior
  getEvents() {
    return {
      'node:click': 'onClick', // The event to be listned is node:click. The response function is onClick
      mousemove: 'onMousemove', // The event to be listned is mousemove. The response function is onMousemove
      'edge:click': 'onEdgeClick', // The event to be listned is edge:click. The response function is onEdgeClick
    };
  },
  // The response function for 'node:click' defined in getEvents
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    // The position of the node where the mouse is currently clicking on
    const point = { x: ev.x, y: ev.y };
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id,
      });

      this.edge = null;
      this.addingEdge = false;
    } else {
      // Add a new edge to the graph with the currently clicked node's position as the end point
      this.edge = graph.addItem('edge', {
        source: model.id,
        target: point,
      });
      this.addingEdge = true;
    }
  },
  // The response function for mousemove defined in getEvents
  onMousemove(ev) {
    // The current position of the mouse
    const point = { x: ev.x, y: ev.y };
    if (this.addingEdge && this.edge) {
      // Update the end point of the edge to be the current position of the mouse
      this.graph.updateItem(this.edge, {
        target: point,
      });
    }
  },
  // The response function for 'edge:click' defined in getEvents
  onEdgeClick(ev) {
    const currentEdge = ev.item;
    // The click event while dragging
    if (this.addingEdge && this.edge == currentEdge) {
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
    }
  },
});
```

## Complete COde

<a href='https://codepen.io/Yanyan-Wang/pen/qBBNaye' target='_blank'>Adding Items</a>.
