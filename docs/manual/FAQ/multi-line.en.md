---
title: Multiple Edges between Two Nodes
order: 4
---

## Problem
For such a data below, how to link two nodes with multiple edges?

```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 150,
    label: 'node1',
  }, {
    id: 'node2',
    x: 300,
    y: 150,
    label: 'node2'
  }],
  edges: [{
    	source: 'node1',
    	target: 'node2'
  	},
   {
   	 source: 'node2',
     target: 'node1'
  	}
  ]
};

```

The following code handles the graph easily:

```javascript
const graph = new G6.Graph({
  container: GRAPH_CONTAINER,
  width: 500,
  height: 500,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
    labelCfg: {
      style: {
        fontSize: 12
      }
    }
  },
  defaultEdge: {
    shape: 'quadratic',
    style: {
      stroke: '#e2e2e2'
    }
  }
});

graph.data(data);
graph.render();
```

The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 />


But what if we want to show 3 or more edges?

We use the data below for example:

```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 150,
    label: 'node1',
  }, {
    id: 'node2',
    x: 300,
    y: 150,
    label: 'node2'
  }],
  edges: [{
    	source: 'node1',
    	target: 'node2'
  	},
   {
   	 source: 'node2',
    	target: 'node1'
  	},
    {
   	 source: 'node2',
    	target: 'node1'
  	}
  ]
};
```

We found that the code above can not handle this situation any more. The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 />

## Solution

To solve this problem, we utlize the [Custom Edge](/en/docs/manual/advanced/custom-edge) of G6.

There are two tips should be taken into consideration before customize an edge:

- **We need a flag to identify whether there are more than one edges with same direction between two nodes**;
- **We need a value to control the curvature of each edge to prevent overlapping**.

Therefore, we add a property `edgeType` for each edge in its data to identify different types of edges.

The complete the code for the demo is shown below:

<iframe
     src="https://codesandbox.io/embed/restless-breeze-fhief?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="restless-breeze-fhief"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Now, the prolem is solved.
