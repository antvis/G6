---
title: read /save/ load Data
order: 1
---

Load the data for graph.

### graph.data(_data_)

<description> _Object_ **required** </description>

Graph data, it should be an object containing an array of nodes and an array of edges. |

**Usage**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph is an instance of Graph
graph.data(data);
```

### graph.save()

Get the graph data.

**Return**

- Type of the return value: Object;
- The return value has all the nodes and edges as below:

```javascript
{
	nodes: [],
  edges: [],
  groups: [],
}
```

**Usage**

```javascript
graph.save();
```

### graph.read(data)

Read the data and render the graph. It is equal to combining graph.data(data) and graph.render().

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Object | true | Graph data, it should be an object containing an array of nodes and an array of edges. |

**Usage**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph is an instance of Graph
graph.read(data);
```

### graph.changeData(data, stack)

Change the data source, and render the graph according to the new data. If there is `layout` configured on the graph, the new data will be placed according to the layout algorithm. If you do not want to layout the new data with origin layout algorithm, call `graph.destroyLayout`, ref to [destroyLayout](#destroyLayout).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Object | false | Graph data, it should be an object containing an array of nodes and an array of edges. If it is not assigned, the graph will be re-rendered with the current data on the graph |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph is an instance of Graph
graph.changeData(data);

// If there is no parameter, the graph will be re-rendered with the current data on the graph
graph.changeData();
```

### destroyLayout()

Destroy the layout algorithm. After that, the `changeData` will not place the new nodes with origin layout configurations.

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();
graph.destroyLayout();
// If there is no position info in data2, the new nodes will be placed according to position initing problem. If the position info exists, the new node will be placed according to its position info
graph.changeData(data2);
```
