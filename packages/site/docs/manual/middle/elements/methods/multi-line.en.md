---
title: Multiple Edges between Two Nodes
order: 8
---

## Problem

For such a data below, how to display multiple edges between two nodes by G6?

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 150,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 300,
      y: 150,
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node1',
    },
  ],
};
```

The following code handles the graph easily, where we use quadratic bezier curve instead of line to draw the edges:

```javascript
const graph = new G6.Graph({
  container: GRAPH_CONTAINER,
  width: 500,
  height: 500,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
    labelCfg: {
      style: {
        fontSize: 12,
      },
    },
  },
  defaultEdge: {
    type: 'quadratic', // assign the edges to be quadratic bezier curves
    style: {
      stroke: '#e2e2e2',
    },
  },
});

graph.data(data);
graph.render();
```

The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 alt='img'/>

But what if we want to show 3 or more edges?

We use the data below for example:

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 150,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 300,
      y: 150,
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node1',
    },
    {
      source: 'node2',
      target: 'node1',
    },
  ],
};
```

We found that the code above can not handle this situation any more. The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 alt='img'/>

## Solution

### Solution 1

Refer to the [Demo](/en/examples/item/multiEdge#multiEdges) and use the util function `processParallelEdges`.

### Solution 2

To solve this problem, we utlize the [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge) of G6.

There are two tips should be taken into consideration before customize an edge:

- **We need a flag to identify whether there are more than one edges with same direction between two nodes**;
- **We need a value to control the curvature of each edge to prevent overlapping**.

Therefore, we add a property `edgeType` for each edge in its data to identify different types of edges.

The complete the code for the demo is shown below:

<iframe
    src="https://codesandbox.io/embed/cocky-bash-9hh3u?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="cocky-bash-9hh3u"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Now, the problem is solved.
