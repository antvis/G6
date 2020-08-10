---
title: graph.show[hide]Item(item, stack)
order: 10
---

### graph.showItem(item, stack)

Show the item. If the item is a node, the related edges will be shown in the same time. Different from that, [item.show()](/en/docs/api/nodeEdge/Item#show) only show the node item itself.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.showItem(item);

// equal to
graph.showItem('nodeId');
```

### graph.hideItem(item, stack)

Hide the item. If the item is a node, the related edges will be hidden in the same time. Different from that, [item.hide()](/en/docs/api/nodeEdge/Item#hide) only hide the node item itself.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.hideItem(item);

// Equal to
graph.hideItem('nodeId');
```
