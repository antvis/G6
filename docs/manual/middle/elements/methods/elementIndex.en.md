---
title: The Visual Level of Node and Edge
order: 4
---

The visual levels (zIndex) of nodes and edges are refered to their [Graphics Group](/en/docs/manual/middle/elements/shape/graphics-group) (hereinafter referred to as Shape). (<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> The Graphics Group is different from the [Node Combo](/en/docs/manual/middle/discard/nodeGroup), the differences are described in [Graphics Group](/en/docs/manual/middle/elements/shape/graphics-group)).

In [Graphics Group](/en/docs/manual/middle/elements/shape/graphics-group), we stated: All the nodes instances in a Graph is grouped by a Group named `nodeGroup`, all the edges instances are grouped by `edgeGroup`. And the visual level (zIndex) of `nodeGroup` is higher than `edgeGroup`, which means all the nodes will be drawed on the top of all the edges.

Sometimes, we want to draw the edges on the top. For example, highlighting a node and its related edges. In this situation, you can configure `groupByTypes` of the graph to false and call `toFront()` and `toBack()` to order the nodes or edges.

The expected effect is: the related nodes and edges are drawed on the top of others when the mouse enters a node; Restore the visual levels (zIndex) when the mouse moves out of the node. <a href='https://codepen.io/Yanyan-Wang/pen/GRRNzGN' target='_blank'>Complete Code of the Demo</a>. <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uWGAR5-w-TcAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

There are 3 steps to implement the expected effect:

- Step 1: Configure`groupByTypes` to `false` when instantiating a Graph;
- Step 2: Place the nodes to the top of edges;
- Step 3: Change the visual levels in the listener function of mouse entering.

## Prerequisite Code

The following code imports G6, defines the data, instantiates the Graph, renders the graph. We will modify this code to implement the expected effect.

```javascript
// The source data
const data = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 200,
      size: 20,
    },
    {
      id: 'node2',
      x: 150,
      y: 150,
      size: 20,
    },
    {
      id: 'node3',
      x: 150,
      y: 250,
      size: 20,
    },
    {
      id: 'node4',
      x: 150,
      y: 200,
      size: 20,
    },
  ],
  edges: [
    {
      id: 'edge0',
      source: 'node0',
      target: 'node1',
    },
    {
      id: 'edge1',
      source: 'node2',
      target: 'node3',
    },
  ],
};

// Instantiate the graph
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Make the edge thicker for demonstration
  defaultEdge: {
    style: {
      lineWidth: 2,
    },
  },
});

// Load the data
graph.data(data);
// Render the graph
graph.render();
```

## Step 1 Configure the Graph

`groupByTypes` is a configuration of Graph with `true` as default value. That means that all the nodes are grouped in a Group named `nodeGroup`, all the edges are groupd in `edgeGroup`, and `nodeGroup` is on the top of `edgeGroup`. Assign `false` to `groupByTypes` to cancel the `nodeGroup` and `edgeGroup`. And all the nodes and edges will be grouped in one Group. The visual level (zIndex) in determined by their generation order.

### Configuration

| Name         | Type    | Default | Description                                             |
| ------------ | ------- | ------- | ------------------------------------------------------- |
| groupByTypes | Boolean | true    | Whether nodes and edges are grouped in different Group. |

### Usage

Modify the code about instantiating the Graph in Prerequisite Code. Add `groupByTypes` with `false`:

```javascript
const graph = new G6.Graph({
  // ...  // Other configurations
  groupByTypes: false,
});
```

We obtain this result now:<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cbiwTZ5dwP0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Step 2 Place the Nodes on the Top

Due to the `groupByTypes` with `false` and edges are generated after nodes, the edges are on the top of the nodes in the figure above, which is a little strange. To draw the nodes on the top, we call `toFront()` for each node after `graph.render()`.

### Description for Functions

```javascript
// Shift the node instance nodeItem to the front
nodeItem.toFront();
// Shift the node instance nodeItem to the back
nodeItem.toBack();
// Shift the edge instance edgeItem to the front
edgeItem.toFront();
// Shift the edge instance edgeItem to the back
edgeItem.toBack();
```

### Usage

```javascript
// const graph = ...
graph.data(data);
graph.render();
// Get all the node instances of the graph
const nodes = graph.getNodes();
// Traverse the nodes, and shift them to the front
nodes.forEach((node) => {
  node.toFront();
});
// Repaint the graph after shifting
graph.paint();
```

<br />Now, all the nodes are drawed on the top of edges:<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8TnuS7pkUfwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Step 3 Change the Visual Levels in the Listener Function of Mouse Entering

When the mouse enters a node, the related nodes and edges will be shifted to the front. And they will be restored after mouse leaving.

### Description for Functions

Listen the mouse entering and leaving by the following four functions:

```javascript
// Mouse enters a node
graph.on('node:mouseenter', (ev) => {
  // ...
});

// Mouse leaves a node
graph.on('node:mouseleave', (ev) => {
  // ...
});

// Mouse enters an edge
graph.on('edge:mouseenter', (ev) => {
  // ...
});

// Mouse leaves an edge
graph.on('edge:mouseleave', (ev) => {
  // ...
});
```

### Usage

```javascript
// Mouse enters an edge
graph.on('edge:mouseenter', (ev) => {
  // Get the target of the entering event
  const edge = ev.item;
  // The source node of the edge
  const source = edge.getSource();
  // The target node of the edge
  const target = edge.getTarget();
  // Shift the edge to the front, and then shift the end nodes to the front
  edge.toFront();
  source.toFront();
  target.toFront();
  // Attention: the following code must be called to repaint the graph
  graph.paint();
});

graph.on('edge:mouseleave', (ev) => {
  // Get all the edge instances of the graph
  const edges = graph.getEdges();
  // Travers the edges, shift them to the back to restore
  edges.forEach((edge) => {
    edge.toBack();
  });
  // Attention: the following code must be called to repaint the graph
  graph.paint();
});

graph.on('node:mouseenter', (ev) => {
  // Get the target of the entering event
  const node = ev.item;
  // Get the related edges of the node
  const edges = node.getEdges();
  // Travers the related edges, shift them to the front, and then shift the end nodes to the front
  edges.forEach((edge) => {
    edge.toFront();
    edge.getSource().toFront();
    edge.getTarget().toFront();
  });
  // Attention: the following code must be called to repaint the graph
  graph.paint();
});

graph.on('node:mouseleave', (ev) => {
  // Get all the edge instances of the graph
  const edges = graph.getEdges();
  // Travers the edges, shift them to the back to restore
  edges.forEach((edge) => {
    edge.toBack();
  });
  // Attention: the following code must be called to repaint the graph
  graph.paint();
});
```
