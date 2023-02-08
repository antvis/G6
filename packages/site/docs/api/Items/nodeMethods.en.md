---
title: node.*
order: 1
---

Node inherits from item. The functions of Item are also available for Node. This document will only introduce the common functions for Node class. All the built-in nodes can be found in [Built-in Nodes Doc](/en/docs/manual/middle/elements/nodes/default-node) and [demo](/en/examples/item/defaultNodes), Custom Node can be found in [Custom Node Doc](/en/docs/manual/middle/elements/nodes/custom-node) and [demo](/en/examples/item/customNode).

### node.lock()

Lock the current node. The locked node will not response the drag event any more.

Tips: the locked node still can be moved while dragging and zooming the canvas. If you want to fix the node in these two situations, please refer to [Fix the Locked Node While Dragging](/en/docs/manual/middle/elements/methods/lock-node#fix-the-locked-node-while-dragging) and [Fix the Locked Node while Zooming](/en/docs/manual/middle/elements/methods/lock-node#fix-the-locked-node-while-zooming) to register a custom Behavior.

**Usage**

```javascript
const node = graph.findById('node');
node.lock();
```

### node.unlock()

Unlock the locked node.

**Usage**

```javascript
const node = graph.findById('node');
node.unlock();
```

### node.hasLocked()

Query the lock state of the node.

**Return**

- The type of return value: Boolean;
- The node is locked if it returns `true`, unlocked otherwise.

**Usage**

```javascript
const node = graph.findById('node');
const hasLocked = node.hasLocked();
```

### node.getNeighbors(type)

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | 'source' / 'target' / undefined | false | The type of the neighbors, 'source': only return the source nodes; 'target': only return the target nodes, undefined: return all of the neighbors |

**Return**

- Type of the return value: Array;
- Return a list of node items.

**Usage**

```javascript
const neighbors = node.getNeighbors('source');
```

### node.getEdges()

Get the related edges (the node is the source or the target of the edge) of the node.

**Return**

- The type of return value: Edge[];
- Returns the set of related edge items.

**Usage**

```javascript
// Get the related edges
const edges = node.getEdges();
```

### node.getInEdges()

Get the related in-edges, whose target is the node.

**Return**

- The type of return value: Edge[];
- Returns the set of related in-edges.

**Usage**

```javascript
// Get the related in-edges
const edges = node.getInEdges();
```

### node.getOutEdges()

Get the related out-edges, whose source is the node.

**Return**

- The type of return value: Edge[];
- Return the set of related out-edges.

**Usage**

```javascript
// Get the related out-edges
const edges = node.getOutEdges();
```

### node.getAnchorPoints()

Get all the anchor points of the node.

**Return**

- The type of return value: Array;
- The data structure of the return value:

```javascript
[
  [100, 105],
  [200, 105]
];
```

**Usage**

```javascript
// Get the anchor points of the node
const anchor = node.getAnchorPoints();
```

### node.getLinkPoint(point)

Get the nearest anchor point of the node to `point`.

**Parameters**

| Name  | Type   | Required | Description                           |
| ----- | ------ | -------- | ------------------------------------- |
| point | Object | true     | A point with x and y ouside the node. |

**Return**

- The type of return value: Object；
- Returns (x, y) of the found anchor point. If there is no anchor point found, returns the center of the node.

**Usage**

```javascript
const point = {
  x: 100,
  y: 105,
};
// Get the anchor point which is nearest to the point
const linkPoint = node.getLinkPoint(point);
```

### node.getLinkPointByAnchor(index)

Get the (x, y) of the anchor point with the `index`.

**Parameters**

| Name  | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| index | Number | true     | The index of the anchor point. |

**Return**

- The type of return value: Object;
- Returns the (x, y) of found anchor point.

**Usage**

```javascript
// Get the first anchor point of the node
const anchor = node.getLinkPointByAnchor(0);
```

### node.addEdge(edge)

Add the `edge` to the node.

**Parameters**

| Name | Type | Required | Description           |
| ---- | ---- | -------- | --------------------- |
| edge | Edge | true     | The item of the edge. |

**Usage**

```javascript
const edge = new Edge({
  // TODO
});
node.addEdge(edge);
```

### node.removeEdge(edge)

Remove the `edge` from the node.

**Parameters**

| Name | Type | Required | Description       |
| ---- | ---- | -------- | ----------------- |
| edge | Edge | true     | The item of Edge. |

**Usage**

```javascript
const edge = graph.findById('edge1');
node.removeEdge(edge);
```
