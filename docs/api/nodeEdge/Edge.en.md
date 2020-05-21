---
title: Edge
order: 2
---

Edge inherits from item. The functions of Item are also available for Edge. This document will only introduce the common functions for Edge class. All the built-in edges can be found in [Built-in Edges Doc](/en/docs/manual/middle/elements/edges/defaultEdge) and [demo](/en/examples/item/defaultEdges), Custom Edge can be found in [Custom Edge Doc](/en/docs/manual/advanced/custom-edge) and [demo](/en/examples/item/customEdge).

## setSource(source)

Set the source item (node) of the edge.

**Parameters**

| Name   | Type | Required | Description              |
| ------ | ---- | -------- | ------------------------ |
| source | Node | true     | The item of source node. |

**Usage**

```javascript
const edge = new Edge({
  // TODO
});

const node = new Node({
  // TODO
});

edge.setSource(node);
```

## setTarget(target)

Set the target item (node) of the edge.

**Parameters**

| Name   | Type | Required | Description              |
| ------ | ---- | -------- | ------------------------ |
| target | Node | true     | The item of target node. |

**Usage**

```javascript
const edge = new Edge({
  // TODO
});

const node = new Node({
  // TODO
});

edge.setTarget(node);
```

## getSource()

Get the current source item (node) of the edge.

**Return**

- The type of return value: Node;
- Returns the item of source node.

**Usage**

```javascript
const edge = new Edge({
  // TODO
});

const node = edge.getSource();
```

## getTarget()

Get the current target item (node) of the edge.

**Return**

- The type of return value: Node;
- Returns the item of target node.

**Usage**

```javascript
const edge = new Edge({
  // TODO
});

const node = edge.getTarget();
```
