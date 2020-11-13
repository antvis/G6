---
title: State of Item
order: 7
---

### graph.setItemState(item, state, enabled)

Set the item's state.

v3.4 and futher versions support multiple values for a state, refer to [Take Use of State Mechanism](/en/docs/manual/middle/states/state-new).

This function will emit events `beforitemstatechange` and `afteritemstatechange`.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| state | string | true | The value of state. State can be comstomized as selected, hover, actived, and so on. |
| enabled | Boolean | true | Whether to activate the state. |

**Usage**

```javascript
// boolean values for state 'selected'
graph.setItemState('node1', 'selected', true);

// multiple values for state 'body'
graph.setItemState('node1', 'body', 'health');
graph.setItemState('node2', 'body', 'ill');
```

### graph.clearItemStates(item, states)

Clear the states of the item. This function could clear multiple states in the same time.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| states | string / Array / null  | false | It can be a single state value, an array, or null. When it is null, this operation will clear all state of the item. |

**Usage**

```javascript
// Clear single state 'a' of the node
graph.clearItemStates(node, 'a');

// Clear multiple states of the node
graph.clearItemStates(node, ['a', 'b']);

// Clear all the states of the node
graph.clearItemStates(node);
```
