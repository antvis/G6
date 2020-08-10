---
title: graph.find*
order: 10
---

### graph.find(type, fn)

Find single item according to a rule.

**Parameters**

| Name | Type     | Required | Description                                    |
| ---- | -------- | -------- | ---------------------------------------------- |
| type | string   | true     | Type of the item. Options: `'node'`, `'edge'`. |
| fn   | Function | true     | Rule for searching.                            |

**Return**

- Type of the return value: Object;
- If there are items that match the rule, return the first one. Return `undefined` otherwise.

**Usage**

```javascript
const findNode = graph.find('node', (node) => {
  return node.get('model').x === 100;
});
```

### graph.findById(id)

Find an item by id.

**Parameters**

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| id   | string | true     | 元素 ID     |

**Return**

- Type of the return value: Object;
- If there are items that match the rule, return the first one. Return `undefined` otherwise.

**Usage**

```javascript
const node = graph.findById('node');
```

### graph.findAll(type, fn)

Find all the items that match the rule.

**Parameters**

| Name | Type     | Required | Description                                        |
| ---- | -------- | -------- | -------------------------------------------------- |
| type | string   | true     | The type of the item. Options: `'node'`, `'edge'`. |
| fn   | Function | true     | Rule for searching.                                |

**Return**

- Type of the return value: Array;
- If there are items that match the rule, return all of them. Return `undefined` otherwise.

**Usage**

```javascript
const nodes = graph.findAll('node', (node) => {
  return node.get('model').x;
});
```

### graph.findAllByState(type, state)

Find all the items whose value of state is true.

**Parameters**

| Name  | Type   | Required | Description                                        |
| ----- | ------ | -------- | -------------------------------------------------- |
| type  | string | true     | The type of the item. Options: `'node'`, `'edge'`. |
| state | string | true     | State for searching.                               |

**Return**

- Type of the return value: Array;
- Return all the items that match the state.

**Usage**

```javascript
// Find all the items whose 'selected' state is true
const nodes = graph.findAllByState('node', 'selected');
```
