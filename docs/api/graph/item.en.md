---
title: node/edge/combos
order: 10
---

### graph.node(nodeFn)

Set the style and other configurations for each node.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| nodeFn | Function | true     | Return the configurations for each node. |

**Usage**

```javascript
graph.node((node) => {
  return {
    id: node.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.edge(edgeFn)

Set the style and other configurations for each edge.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| edgeFn | Function | true     | Return the configurations for each edge. |

**Usage**

```javascript
graph.edge((edge) => {
  return {
    id: edge.id,
    type: 'cubic-horizontal',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.combo(comboFn)

Set the style and other configurations for each combo.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name    | Type     | Required | Description                               |
| ------- | -------- | -------- | ----------------------------------------- |
| comboFn | Function | true     | Return the configurations for each combo. |

**Usage**

```javascript
graph.combo((combo) => {
  return {
    id: combo.id,
    type: 'rect',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.collapseCombo(combo)

Collapse a Combo.

**Parameters**

| Name  | Type            | Required | Description                                           |
| ----- | --------------- | -------- | ----------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the combo or the combo item to be collapsed |

**Usage**

```
graph.collapseCombo('combo1')
```

### graph.expandCombo(combo)

Expand a Combo.

**Parameters**

| Name  | Type            | Required | Description                                          |
| ----- | --------------- | -------- | ---------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the combo or the combo item to be expanded |

**Usage**

```
graph.expandCombo('combo1')
```

### graph.collapseExpandCombo(combo)

Expand the `combo` if it is collapsed. Collapse the `combo` if it is expanded.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| combo | string / ICombo | true | The ID of the combo or the combo item to be collapsed or expanded |

**Usage**

```
graph.collapseExpandCombo('combo1')
```

### graph.createCombo(combo, elements)

Create a new combo with existing nodes or combos to be its children.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| combo | string / ICombo | true | The ID or the configuration of the combo to be created |
| elements | string[] | The IDs of the existing nodes or combos to be the children of the newly created combo |

**Usage**

```
// The first parameter is the id of the combo to be created
graph.createCombo('combo1', ['node1', 'node2', 'combo2'])

// The first parameter is the configuration of the combo to be created
graph.createCombo({
  id: 'combo1',
  style: {
    fill: '#f00'
  }
}, ['node1', 'node2', 'combo2'])
```

### graph.uncombo(combo)

Ungroup the combo, which deletes the combo itself, and appends the children of the combo to its parent(if it exists).

**Parameters**

| Name  | Type            | Required | Description                                        |
| ----- | --------------- | -------- | -------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the item or the combo item to be updated |

**Usage**

```
graph.uncombo('combo1')
```

### graph.collapseGroup(groupId)

Collapse the group with groupId. After collapsing, the nodes and edges inside the group will be hided, the edges linking inside nodes and outside nodes will be linked to the group.

**Parameters**

| Name    | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| groupId | string | true     | The id of the group. |

**Usage**

```javascript
graph.collapseGroup('groupId');
```

### graph.expandGroup(groupId)

Expand the group to show the inside nodes and edges, and the edges linking inside nodes and outside nodes will be restored.

**Parameters**

| Name    | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| groupId | string | true     | The id of the group. |

**Usage**

```javascript
graph.expandGroup('groupId');
```
