---
title: Edge
order: 1
---

Edge inherit from item. The functions of item are also available for Edge.


## setSource(source)
Set the source item (node) of the edge.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| source | Node | true | The item of source node. |


**Usage**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = new Node({
  // TODO
})

edge.setSource(node)
```


## setTarget(target)
Set the target item (node) of the edge.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| target | Node | true | The item of target node. |


**Usage**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = new Node({
  // TODO
})

edge.setTarget(node)
```


## getSource()
Get the current source item (node) of the edge.


**Return**

- The type of return value: Node;
- Return the item of source node.


**Usage**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getSource()
```


## getTarget()
Get the current target item (node) of the edge.


**Return**

- The type of return value: Node;
- Return the item of target node.


**Usage**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getTarget()
```
