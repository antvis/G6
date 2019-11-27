---
title: Node
order: 1
---

<<<<<<< HEAD
Node inherits from item. The functions of Item are also available for Node.
=======
Node inherit from item. The functions of item are also available for Node.
>>>>>>> feat: english version of API


## lock()
> New feature of v3.1.4.

Lock the current node. The locked node will not response the drag event any more.

Tips: the locked node still can be moved while dragging and zooming the canvas. If you want to fix the node in these two situations, please refer to (Fix the node while dragging the canvas)[/zh/docs/manual/advanced/lock-node#拖动画布时候不处理锁定的节点] and (Fix the node while zooming the canvas)[/zh/docs/manual/advanced/lock-node#拖动画布时候不处理锁定的节点] .


**Usage**

```javascript
const node = graph.findById('node')
node.lock()
```


## unlock()
<<<<<<< HEAD
> New feature of V3.1.4.
=======
> New feature of v3.1.4.
>>>>>>> feat: english version of API

Unlock the locked node.


**Usage**

```javascript
const node = graph.findById('node')
node.unlock()
```


## hasLocked()
<<<<<<< HEAD
> New feature of V3.1.4.
=======
> New feature of v3.1.4.
>>>>>>> feat: english version of API

Query the lock state of the node.


**Return**

- The type of return value: Boolean;
- The node is locked if it returns `true`, unlocked otherwise.


**Usage**

```javascript
const node = graph.findById('node')
const hasLocked = node.hasLocked()
```


## getEdges()
<<<<<<< HEAD
Get the related edges (the node is the source or the target of the edge) of the node.
=======
Get the related edges of the node.
>>>>>>> feat: english version of API


**Return**

- The type of return value: Edge[];
<<<<<<< HEAD
- Returns the set of related edge items.
=======
- Return the set of related edge items.
>>>>>>> feat: english version of API


**Usage**
```javascript
// Get the related edges
const edges = node.getEdges()
```


## getInEdges()
<<<<<<< HEAD
Get the related in-edges, whose target is the node.
=======
Get the related in-edges, whose target node is the item.
>>>>>>> feat: english version of API


**Return**

- The type of return value: Edge[];
<<<<<<< HEAD
- Returns the set of related in-edges.
=======
- Return the set of related in-edges,
>>>>>>> feat: english version of API


**Usage**
```javascript
// Get the related in-edges
const edges = node.getInEdges()
```


## getOutEdges()
<<<<<<< HEAD
Get the related out-edges, whose source is the node.
=======
Get the related out-edges, whose source node is the item.
>>>>>>> feat: english version of API


**Return**

- The type of return value: Edge[];
<<<<<<< HEAD
- Return the set of related out-edges.
=======
- Return the set of related out-edges,
>>>>>>> feat: english version of API


**Usage**
```javascript
// Get the related out-edges
const edges = node.getOutEdges()
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
const anchor = node.getAnchorPoints()
```


## getLinkPoint(point)
<<<<<<< HEAD
Get the nearest anchor point of the node to `point`.
=======
Get the nearest anchor point of the item from `point`.
>>>>>>> feat: english version of API


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
<<<<<<< HEAD
| point | Object | true | A point with x and y ouside the node.  |
=======
| point | Object | true | A point ouside the node.  |
>>>>>>> feat: english version of API



**Return**

- The type of return value: object；
<<<<<<< HEAD
- Returns (x, y) of the found anchor point. If there is no anchor point found, returns the center of the node.
=======
- Return (x, y) of the found anchor point. If there is no anchor point found, return the center of the node.
>>>>>>> feat: english version of API


**Usage**
```javascript
const point = {
	x: 100,
  y: 105
}
<<<<<<< HEAD
// Get the anchor point which is nearest to the point
=======
// Get the anchor point which is the nearest one to the point
>>>>>>> feat: english version of API
const linkPoint = node.getLinkPoint(point)
```



## getLinkPointByAnchor(index)
Get the (x, y) of the anchor point with the `index`.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| index | Number | true | The index of the anchor point. |



**Return**

- The type of return value: Object;
<<<<<<< HEAD
- Returns the (x, y) of found anchor point.
=======
- Return the (x, y) of found anchor point/
>>>>>>> feat: english version of API


**Usage**
```javascript
// Get the first anchor point of the node
const anchor = node.getLinkPointByAnchor(0)
```

## addEdge(edge)
Add the `edge` to the node.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
<<<<<<< HEAD
| edge | Edge | true | The item of the edge. |
=======
| edge | Edge | true | The item of Edge. |
>>>>>>> feat: english version of API



**Usage**
```javascript
const edge = new Edge({
	// TODO
})
node.addEdge(edge)
```


## removeEdge(edge)
Remove the `edge` from the node.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| edge | Edge | true | The item of Edge. |



**Usage**
```javascript
const edge = // TODO
node.removeEdge(edge)
```
