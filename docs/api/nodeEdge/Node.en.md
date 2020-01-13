---
title: Node
order: 1
---

Node inherits from item. The functions of Item are also available for Node.


## lock()

Lock the current node. The locked node will not response the drag event any more.

Tips: the locked node still can be moved while dragging and zooming the canvas. If you want to fix the node in these two situations, please refer to [Fix the Locked Node While Dragging](/en/docs/manual/advanced/lock-node#fix-the-locked-node-while-dragging) and [Fix the Locked Node while Zooming](/en/docs/manual/advanced/lock-node#fix-the-locked-node-while-zooming) to register a custom Behavior.


**Usage**

```javascript
const node = graph.findById('node');
node.lock();
```


## unlock()

Unlock the locked node.


**Usage**

```javascript
const node = graph.findById('node');
node.unlock();
```


## hasLocked()

Query the lock state of the node.


**Return**

- The type of return value: Boolean;
- The node is locked if it returns `true`, unlocked otherwise.


**Usage**

```javascript
const node = graph.findById('node');
const hasLocked = node.hasLocked();
```


## getEdges()
Get the related edges (the node is the source or the target of the edge) of the node.


**Return**

- The type of return value: Edge[];
- Returns the set of related edge items.


**Usage**
```javascript
// Get the related edges
const edges = node.getEdges();
```


## getInEdges()
Get the related in-edges, whose target is the node.


**Return**

- The type of return value: Edge[];
- Returns the set of related in-edges.


**Usage**
```javascript
// Get the related in-edges
const edges = node.getInEdges();
```


## getOutEdges()
Get the related out-edges, whose source is the node.


**Return**

- The type of return value: Edge[];
- Return the set of related out-edges.


**Usage**
```javascript
// Get the related out-edges
const edges = node.getOutEdges();
```


## getAnchorPoints()
Get all the anchor points of the node.


**Return**

- The type of return value: Array;
- The data structure of the return value:
```javascript
[
      0: {
        x: 100, 
        y: 105,
        index: 0
      },
      1: {
        x: 200, 
        y: 105,
        index: 1
      }
]
```


**Usage**
```javascript
// Get the anchor points of the node
const anchor = node.getAnchorPoints();
```


## getLinkPoint(point)
Get the nearest anchor point of the node to `point`.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| point | Object | true | A point with x and y ouside the node.  |



**Return**

- The type of return value: Object；
- Returns (x, y) of the found anchor point. If there is no anchor point found, returns the center of the node.


**Usage**
```javascript
const point = {
	x: 100,
  y: 105
};
// Get the anchor point which is nearest to the point
const linkPoint = node.getLinkPoint(point);
```



## getLinkPointByAnchor(index)
Get the (x, y) of the anchor point with the `index`.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| index | Number | true | The index of the anchor point. |



**Return**

- The type of return value: Object;
- Returns the (x, y) of found anchor point.


**Usage**
```javascript
// Get the first anchor point of the node
const anchor = node.getLinkPointByAnchor(0);
```

## addEdge(edge)
Add the `edge` to the node.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| edge | Edge | true | The item of the edge. |



**Usage**
```javascript
const edge = new Edge({
	// TODO
});
node.addEdge(edge);
```


## removeEdge(edge)
Remove the `edge` from the node.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| edge | Edge | true | The item of Edge. |



**Usage**
```javascript
const edge = graph.findById('edge1'); 
node.removeEdge(edge);
```
