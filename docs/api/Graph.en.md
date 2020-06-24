---
title: Graph
order: 1
redirect_from:
  - /en/docs/api
---

Graph is the carrier of G6. All the operations about events, behaviors, items are mounted on the instance of Graph.

The life cycle of an instance of Graph is: Initialize -> Load data -> Render -> Update -> Destroy.

## Initialize

### G6.Graph

**Configurations**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container | string | HTMLElement | The DOM container of graph, it can be the id of a DOM element or the an HTML node. |
| width | Number | undefined | The width of the canvas for graph with the unit 'px'. |
| height | Number | undefined | The height of the canvas for graph with the unit 'px'. |
| fitView | Boolean | false | Whether to fit the canvas to the view port. |
| fitViewPadding | Array | Number | Takes effect only when `fitView: true`. It is the padding between canvas and the border of view port.<br />- It can be a value, e.g. `fitViewPadding: 20`, which means the padding to the top, left, right, bottom are the same.<br />- Or an array, e.g. `fitViewPadding: [ 20, 40, 50, 20 ]`, the four values in the array indicate the padding to the top, right, bottom, left respectively. |
| fitCenter | Boolean | false | *Supported by v3.5.1.* Whether to translate the graph to align its center with the canvas. Its priority is lower than `fitView` |
| groupByTypes | Boolean | true | Whether to group the nodes and edges separately. When it is false, all the items (including nodes and edges) are in the same group, and the order/zindex of them are determined according to the order of their generation. When you are using Combo, **MUST** set `groupByTypes` to `false` |
| autoPaint | Boolean | true | Whether to paint the graph automatically while item updated or view port changed. In order to enhance the performance, we recommend to turn off `antoPaint` when you are doing bulk operation on nodes or edges. This can be refered to [`setAutoPaint()`](#setautopaintauto). |
| modes | Object |  | The interaction modes of this graph. Please refer to [Interaction Mode](/en/docs/manual/middle/states/mode) for detail。 |
| nodeStateStyles | Object | {} | The node styles on different states, e.g. hover, selected. It is a new feature of G6 3.1. |
| edgeStateStyles | Object | {} | The edge styles on different states, e.g. hover, selected. It is a new feature of G6 3.1. |
| comboStateStyles | Object | {} | The combo styles on different states, e.g. hover, selected. It is a new feature of G6 3.5. |
| defaultNode | Object | {} | Default node configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. |
| defaultEdge | Object | {} | Default edge configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. |
| defaultCombo | Object | {} | Default combo configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. It is a new feature of G6 3.5. |
| plugins | Array | [] | Plugins for graph. Please refer to [Plugin](/en/docs/manual/tutorial/plugins##plugin) for detail. |
| animate | Boolean | false | Wheter activate the global animation. Which will take effect while changing layouts, changing data, and other global operations. |
| animateCfg | Object |  | The configurations for global animation. Takes effect only when `animate: true`. For more detail about animateCfg, see [Basic Animation Docs](/en/docs/manual/advanced/animation#animatecfg). |
| animateCfg.<br />onFrame | Function | null | The callback function for every frame of animation. The path of custom animation for node can be defined here. The nodes will move linearly when `onFrame` is null. |
| animateCfg.<br />duration | Number | 500 | Duration of animation with unit millisecond. |
| animateCfg.<br />easing | string | easeLinear | The easing function name of animation. Please refer to ease in d3. |
| minZoom | Number | 0.2 | The minimum zoom ratio. |
| maxZoom | Number | 10 | The maximum zoom ratio. |
| groupType | string | circle | Group type for nodes. Options: `'circle'` or `'rect'`. |
| groupStyle | Object |  | Group style for nodes, please refer to [Node Group](/en/docs/manual/middle/nodeGroup) for detail. |
| layout | Object |  | Configurations for layout. The `type` in it is the name of layout method with the options: `'random'`, `'radial'`, `'mds'`, `'circular'`, `'fruchterman'`, `'force'`, `'dagre'`, `'concentric'`, `'grid'`. For more configurations for different layout methods, please refer to [Layout API](/en/docs/api/layout/Layout). |
| renderer | string | 'canvas' / 'svg' | Render the graph with Canvas or SVG. It is supported expecting V3.3.x |
| enabledStack | boolean | false | Whether to enable stack，thar is, whether to support redo & undo operating, the configuration item V3.6 and above support. |
| maxStep | number | 10 | the max step of redo & undo, Only works if the enabledStack is true，the configuration item V3.6 and above support. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> In G6 3.1, we added two new configurations for graph: `nodeStateStyles` and `edgeStateStyles`. In the same time, we deleted `nodeStyle` and `edgeStyle` . To upgrate, replace `nodeStyle` with `nodeStateStyles`, and replace `edgeStyle` with `edgeStateStyles`, and keep the sub-configuration inside them.

**Usage**

Place the configurations in the paramter as below to instantiate a graph:

```javascript
const graph = new G6.Graph({
  container: '',
  width: 500,
  height: 500,
  modes: {
    default: ['drag-canvas'],
  },
  layout: {
    type: 'radial',
    unitRadius: 50,
    center: [500, 300],
  },
});
```

## Load Data

### data(data)

Load the data for graph.

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
graph.data(data);
```

## Render

### render()

Render the graph with data onto the canvas.

**Usage**

```javascript
graph.render();
```

### renderCustomGroup(data, groupType)

Render a node group according to the data.

**Parameters**

| Name      | Type   | Required | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| data      | Object | true     | The data to be rendered                             |
| groupType | string | true     | Type of node group. Options: `'circle'` or `'rect'` |

**Usage**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      groupId: 'group1',
      label: 'node1',
    },
    {
      id: 'node2',
      groupId: 'group1',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: 'My Group 1',
        stroke: '#444',
        offsetX: -20,
        offsetY: 30,
      },
    },
  ],
};

// graph is an instance of Graph
graph.renderCustomGroup(data, 'circle');
```

### read(data)

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

### changeData(data, stack)

Change the data source, and render the graph according to the new data.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Object | false | Graph data, it should be an object containing an array of nodes and an array of edges. If it is not assigned, the graph will be re-rendered with the current data on the graph |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

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


### collapseCombo(combo)
Collapse a Combo.

**Parameters**

| Name | Type | Required | Description |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo| true    | The ID of the combo or the combo item to be collapsed |

**Usage**
```
graph.collapseCombo('combo1')
```

### expandCombo(combo)
Expand a Combo.

**Parameters**

| Name | Type | Required | Description |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true    | The ID of the combo or the combo item to be expanded |

**Usage**
```
graph.expandCombo('combo1')
```

### collapseExpandCombo(combo)
Expand the `combo` if it is collapsed. Collapse the `combo` if it is expanded.

**Parameters**

| Name | Type | Required | Description |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo  | true   | The ID of the combo or the combo item to be collapsed or expanded |

**Usage**
```
graph.collapseExpandCombo('combo1')
```

### createCombo(combo, elements)
Create a new combo with existing nodes or combos to be its children.

**Parameters**

| Name | Type | Required | Description |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo  | true   | The ID or the configuration of the combo to be created |
| elements | string[]     | The IDs of the existing nodes or combos to be the children of the newly created combo |

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

### uncombo(combo)
Ungroup the combo, which deletes the combo itself, and appends the children of the combo to its parent(if it exists).

**Parameters**

| Name | Type | Required | Description |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true | The ID of the item or the combo item to be updated |

**Usage**

```
graph.uncombo('combo1')
```


### collapseGroup(groupId)

Collapse the group with groupId. After collapsing, the nodes and edges inside the group will be hided, the edges linking inside nodes and outside nodes will be linked to the group.

**Parameters**

| Name    | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| groupId | string | true     | The id of the group. |

**Usage**

```javascript
graph.collapseGroup('groupId');
```

### expandGroup(groupId)

Expand the group to show the inside nodes and edges, and the edges linking inside nodes and outside nodes will be restored.

**Parameters**

| Name    | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| groupId | string | true     | The id of the group. |

**Usage**

```javascript
graph.expandGroup('groupId');
```

## Update

### addItem(type, model, stack)

Add item(node, edge, or group) to the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> G6 will use the `model` object as the model of the newly added item, and the `model` might be modified. If you do not want it to be modified, use the deep cloned `model` instead.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | string | true | The type of the item. Options: `'node'`, `'edge'`, and `'group'`. |
| model | Object | true | The data model of the item, refer to [Item Model Properties](/en/docs/api/nodeEdge/itemProperties). When `type: 'group'`, refer to [Create Node Group](/en/docs/manual/advanced/create-node-group) |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

**Usage**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

graph.addItem('node', model);

// Here is the model example for type = 'group'
const model = {
  groupId: 'xxx000999',
  nodes: ['123', '23'],
  type: 'rect',
  zIndex: 0,
  title: {
    text: 'group name',
  },
};

graph.addItem('group', model);
```

### add(type, model, stack)

The same as addItem(type, model).

### updateItem(item, model, stack)

Update the item with new data model.
If there are combos in the graph, after calling updateItem to update the position of a node, call [updateCombo(combo)](/en/docs/api/Graph#updatecombocombo) to update the sizes and positions of the related combos.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The ID or the instance of the item |
| cfg  | Object          | false    | New data model, refer to [Item Model Properties](/en/docs/api/nodeEdge/itemProperties) |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

**Usage**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

// Find the item instance by id
const item = graph.findById('node');
graph.updateItem(item, model);
```

### update(item, model, stack)

The same as updateItem(item, model).


### updateCombos()
Update the sizes and positions of all the combos according to the bboxes of its children.


**Usage**

```javascript
// Update all the combos
graph.updateCombos();
```



### updateCombo(combo)
Update the positions and sizes of the combo and all of its ancestors.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| combo | string / ICombo | true    | The ID or the instance of the combo |

**Usage**

```javascript

// Update a node's position
const node1 = graph.findById('node1');
graph.updateItem(node1, {
  x: 100,
  y: 100
});

// the combo who contains the node
const comboId = node1.getModel().comboId;

// Update the combo and all its ancestors who contains node1
graph.updateCombo(comboId);
```



### updateComboTree(item, parentId)
Update the hierarchy structure of the combo, such as move a combo into another one.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | ------- | -------- | ------------ |
| item | string / INode / ICombo     | The ID or the item of the node/combo to be updated |
| parentId | string | undefined     | The ID of the new parent combo, undefined means updating the item with no parent |

**Usage**

```
// move combo1 out of its parent combo. combo1 will be in the same hierarchy level as its old parent.
graph.updateComboTree('combo1')

// move combo1 into combo2. combo1 will be the child of combo2.
graph.updateComboTree('combo1', 'combo2')
```



### removeItem(item, stack)

Remove the item. When the item is the id of a group, this operation will delete the corresponding group.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('node');
graph.removeItem(item);
```

### remove(item, stack)

The same as removeItem(item)。

### refresh()

Refresh the canvas when the **existing** data items' configurations is changed in the source data.

Attention: If there are some new nodes/edges/combos to be added or some nodes/edges/combos to be removed, use [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) or [graph.changeData](./Graph#changedatadata) instead.

**Usage**

```javascript
graph.refresh();
```

### refreshItem(item)

Refresh the item.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('node');
graph.refreshItem(item);
```

### refreshPositions()

When the positions of nodes in their data models are changed, refresh the canvas to paint the nodes with new positions. It will update the edges in the same time.

**Usage**

```javascript
graph.refreshPositions();
```

### paint()

Repaint the canvas. Use it after changing the item's style or state.

**Usage**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

### setAutoPaint(auto)

Whether to repaint the canvas automatically after updating or deleting items.

**Parameters**

| Name | Type    | Required | Description                                  |
| ---- | ------- | -------- | -------------------------------------------- |
| auto | Boolean | true     | Whether to repaint the canvas automatically. |

**Usage**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

## Layout

There are several basic layout algorithms in G6 3.1. For more information, please refer to [Layout API](/en/docs/api/layout/Layout)。

### layout()

Re-layout the graph with current layout configurations in graph.

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
  },
  modes: {
    default: ['drag-node'],
  },
});

graph.data({
  nodes: data.nodes,
  edges: data.edges.map((edge, i) => {
    edge.id = 'edge' + i;
    return Object.assign({}, edge);
  }),
});

graph.render();

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

graph.on('node:dragstart', e => {
  // Relayout when dragging the node
  graph.layout();
  refreshDragedNodePosition(e);
});

graph.on('node:drag', e => {
  refreshDragedNodePosition(e);
});

graph.on('node:dragend', e => {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});
```

### updateLayout(cfg)

Update the layout configurations.

1. If there is `type` in `cfg`, `type` is a string and it is different from current layout method, `updateLayout(cfg)` will change the layout method and relayout;
1. If there is no `type` in `cfg`, `updateLayout(cfg)` will relayout with current layout method and new layout configurations.

**Parameters**

| Name | Type   | Required | Description                   |
| ---- | ------ | -------- | ----------------------------- |
| cfg  | Object | true     | Configurations of new layout. |

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

// configure the layout while instantializing the graph, and update the layout in somewhere you want.
graph.updateLayout({
  radius: 200,
  startAngle: Math.PI / 4,
  endAngle: Math.PI,
  divisions: 5,
  ordering: 'degree',
});
```

## Destroy

### clear()

Clear all the items in the canvas. This function is used for reseting the data source and re-rendering the graph.

**Usage**

```javascript
graph.clear();
```

### destroy()

Destroy the graph.

**Usage**

```javascript
graph.destroy();
```

## State

### showItem(item, stack)

Show the item. If the item is a node, the related edges will be shown in the same time. Different from that, [item.show()](/en/docs/api/nodeEdge/Item#show) only show the node item itself.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.showItem(item);

// equal to
graph.showItem('nodeId');
```

### hideItem(item, stack)

Hide the item. If the item is a node, the related edges will be hidden in the same time. Different from that, [item.hide()](/en/docs/api/nodeEdge/Item#hide) only hide the node item itself.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |
| stack | boolean | false | Whether push into the operator to the undo & redo stack, When enableStack is set to true when new Graph, it will be automatically pushed into the stack by default. If it is not needed, set this parameter to false. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.hideItem(item);

// Equal to
graph.hideItem('nodeId');
```

### setItemState(item, state, enabled)

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

### clearItemStates(item, states)

Clear the states of the item. This function could clear multiple states in the same time.

**Parameters**

| Name   | Type            | Required | Description                         |
| ------ | --------------- | -------- | ----------------------------------- |
| item   | string / Object | true     | The id or the instance of the item. |
| states | string / Array / null     | false                               | It can be a single state value, an array, or null. When it is null, this operation will clear all state of the item. |

**Usage**

```javascript
// Clear single state 'a' of the node
graph.clearItemStates(node, 'a');

// Clear multiple states of the node
graph.clearItemStates(node, ['a', 'b']);

// Clear all the states of the node
graph.clearItemStates(node);
```

### node(nodeFn)

Set the style and other configurations for each node.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| nodeFn | Function | true     | Return the configurations for each node. |

**Usage**

```javascript
graph.node(node => {
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

### edge(edgeFn)

Set the style and other configurations for each edge.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| edgeFn | Function | true     | Return the configurations for each edge. |

**Usage**

```javascript
graph.edge(edge => {
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



### combo(comboFn)

Set the style and other configurations for each combo.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------- |
| comboFn | Function | true     | Return the configurations for each combo. |

**Usage**

```javascript
graph.combo(combo => {
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


## Interaction

### addBehaviors(behaviors, modes)

Add interaction behaviors to a mode or multiple modes.

**Parameters**

| Name      | Type           | Required | Description                             |
| --------- | -------------- | -------- | --------------------------------------- |
| behaviors | string / Array | true     | The name(s) of behavior(s) to be added. |
| modes     | string / Array | true     | The name(s) of mode(s)                  |

**Usage**

```javascript
// Add single behavior 'click-select' to a single mode 'default'
graph.addBehaviors('click-select', 'default');

// Add multiple behaviors to single mode 'default'
graph.addBehaviors(['brush-select', 'click-select'], 'default');

// Add single behavior 'brush-select' to multiple modes
graph.addBehaviors('brush-select', ['default', 'select']);

// Add multiple behaviors to multiple modes
graph.addBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### removeBehaviors(behaviors, modes)

Remove behavior(s) from mode(s).

**Parameters**

| Name      | Type           | Required | Description                               |
| --------- | -------------- | -------- | ----------------------------------------- |
| behaviors | string / Array | true     | The name(s) of behavior(s) to be removed. |
| modes     | string / Array | true     | The name(s) of mode(s).                   |

**Usage**

```javascript
// remove single behavior 'click-select' from single mode 'default'
graph.removeBehaviors('click-select', 'default');

// remove multiple behaviors from single mode 'default'
graph.removeBehaviors(['brush-select', 'click-select'], 'default');

// remove single behavior 'brush-select' from multiple modes
graph.removeBehaviors('brush-select', ['default', 'select']);

// remove multiple behaviors from multiple modes
graph.removeBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### setMode(mode)

Switch the interaction mode of graph. For example, switch from edit mode to read-only mode.

**Parameters**

| Name | Type   | Required | Description           |
| ---- | ------ | -------- | --------------------- |
| mode | string | true     | The name of the mode. |

**Usage**

```javascript
const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [...],
      custom: [...]
    }
})

graph.setMode('custom')
```

### getCurrentMode()

Get the current mode.

**Return**

- Type of return value: string;
- The return value indicates the current mode.

**Usage**

```javascript
// The return value is the current interaction mode
const mode = graph.getCurrentMode();
```



### on(eventName, handler)

Bind event listeners for graph.

**Parameters**

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | Name of the event, options are in [Event](/en/docs/api/Event) |
| handler | Function | true     | The listener function |

Here is the description for the objects `item` and `target` of the `handler`'s parameter `evt`:

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ---------- |
| item | string | true     | The manipulated item |
| target | Function | true     | The manipulated [Graphics Shape](/en/docs/manual/middle/elements/shape-keyshape) |



**Usage**

```javascript

const graph = new G6.Graph({
  // ...
})

// bind the node click listener for nodes of the graph
graph.on('node:click', evt => {
  const item = evt.item; // The manipulated node item
  const target = evt.target; // The manipulated graphics shape
  // ...
});

// bind the click listener for canvas
graph.on('click', evt => {
  // ...
});
```



### off(eventName, handler)

Unbind the specific listener.

**Parameters**

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | Name of the event, options are in [Event](/en/docs/api/Event) |
| handler | Function | true     | The listener function |

The objects `item` and `target` of the `handler`'s parameter `evt` are the same as the ones described in [`graph.on(eventName, handler)`](#oneventname-handler). The `handler` should be the same object of binded `handler`.



**Usage**

```javascript

const graph = new G6.Graph({
  // ...
})

// listeners
const fn = evt => {
  const item = evt.item; // The manipulated node item
  const target = evt.target; // The manipulated graphics shape
  // ...
}
// bind node click listener
graph.on('node:click', fn);

// Unbind the node click listener. The fn is the same object as above
graph.off('node:click', fn);
```



### off(eventName)

Unbind all the listeners for the graph.

**Parameters**

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | Name of the event, options are in [Event](/en/docs/api/Event) |



**Usage**

```javascript

const graph = new G6.Graph({
  // ...
})

// listeners
const fn1 = evt => {
  const item = evt.item; // the manipulated node item
  const target = evt.target; // the manipulated graphics shape
  // ...
}
const fn2 = evt => {
  // ...
}
// bind two listeners for nodes of the graph
graph.on('node:click', fn1);
graph.on('node:click', fn2);

// unbind all the click listeners
graph.off('node:click');
```


### off()

Unbind all the event listeners of the graph. There is no parameter for this function.

**Usage**

```javascript

const graph = new G6.Graph({
  // ...
})

// listeners
const fn1 = evt => {
  // ...
}
const fn2 = evt => {
  // ...
}
// bind mouseenter listner for the nodes of the graph
graph.on('node:mouseenter', fn1);
// bind afteranimate timing listener for graph
graph.on('afteranimate', fn2);

// unbind all the events of the graph
graph.off();
```


### getZoom()

Get the current zoom ratio.

**Return**

- Type of return value: Number;
- The return value indicates the current zoom ratio of view port. The default value is 1.

**Usage**

```javascript
// The return value indicates the current zoom ratio
const zoom = graph.getZoom();
```

### zoom(ratio, center)

Change the zoom ratio. The parameter ratio is the related ratio about the current canvas.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| ratio | Number | true | Zoom ratio. |
| center | Object | false | Zoom at the `center` with `x` and `y`. If the `center` is ignored, this operation will zoom the graph with the current graph center. |

**Usage**

```javascript
// Zoom at center (100, 100) with ratio 3
graph.zoom(3, { x: 100, y: 100 });

// Zoom at graph center with ratio 0.5
graph.zoom(0.5);
```

### zoomTo(toRatio, center)

Zoom the canvas at the center to a fixed ratio.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| toRatio | Number | true | Fixed zoom ratio. |
| center | Object | false | Zoom at the `center` with `x` and `y`. If the `center` is ignored, this operation will zoom the graph with the current graph center. |

**Usage**

```javascript
// Zoom at center (100, 100) with ratio 3
graph.zoomTo(3, { x: 100, y: 100 });

// Zoom at graph center with ratio 0.5
graph.zoomTo(0.5);
```

### focusItem(item, animate, animateCfg)

Move the graph to center at the item. This operation can be used as easing animation after searching a node.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |
| animate | boolean | false     | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false     | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/advanced/animation#animatecfg). If it is not assigned, animates following the graph's `animateCfg`.  |

**Usage**

```javascript
graph.focusItem(item);

// focus with animation
graph.focusItem(item, true);

// focus with animation and animation's configuration
graph.focusItem(item, true, {
  easing: 'easeCubic',
  duration: 400
});
```

### changeSize(width, height)

Change the size of the canvas.

**Parameters**

| Name   | Type   | Required | Description               |
| ------ | ------ | -------- | ------------------------- |
| width  | Number | true     | The width of the canvas.  |
| height | Number | true     | The height of the canvas. |

**Usage**

```javascript
graph.changeSize(600, 350);
```

### translate(dx, dy)

Move the canvas with **relative displacement**.

**Parameters**

| Name | Type   | Required | Description                               |
| ---- | ------ | -------- | ----------------------------------------- |
| dx   | Number | true     | Displacement in the horizontal direction. |
| dy   | Number | true     | Displacement in the vertical direction.   |

**Usage**

```javascript
graph.translate(100, 100);
```

### moveTo(x, y)

Move the canvas to a **fixed position**.

**Parameters**

| Name | Type   | Required | Description                               |
| ---- | ------ | -------- | ----------------------------------------- |
| x    | Number | true     | Displacement in the horizontal direction. |
| y    | Number | true     | Displacement in the vertical direction.   |

**Usage**

```javascript
graph.moveTo(200, 300);
```

### fitView(padding)

Fit the graph to the view port.

**Parameters**

| Name    | Type           | Required | Description                                |
| ------- | -------------- | -------- | ------------------------------------------ |
| padding | Number / Array | false    | The padding of [top, right, bottom, left]. |

**Usage**

```javascript
// When padding is a number, top = right = bottom = left = 20
graph.fitView(20);

// Equal to graph.fitView(20)
graph.fitView([20]);

// When padding is an array with 2 values, top = bottom = 20, right = left = 10
graph.fitView([20, 10]);

// When padding is an array with four values
graph.fitView([20, 10, 20, 15]);
```


### fitCenter()

*Supported by v3.5.1.* Translate the graph to align its center with the canvas.

**Usage**

```javascript
// Call the following function after rendering and animation
graph.fitCenter();
```



## Search

### find(type, fn)

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
const findNode = graph.find('node', node => {
  return node.get('model').x === 100;
});
```

### findById(id)

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

### findAll(type, fn)

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
const nodes = graph.findAll('node', node => {
  return node.get('model').x;
});
```

### findAllByState(type, state)

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

## Data

### save()

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

### getNodes()

Get all the node items in the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> it returns the items but not data models.

**Return**

- Type of the return value: Array;
- Return the node items in the graph.

**Usage**

```javascript
const nodes = graph.getNodes();
```

### getEdges()

Get all the edge items in the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> it returns the items but not data models.

**Return**

- Type of the return value: Array;
- Return the edge items in the graph.

**Usage**

```javascript
const edges = graph.getEdges();
```


### getCombos()
Get all the combo items in the graph.

**Return**

- Type of the return value: Array;
- Return the combo items in the graph.

**Usage**

```javascript
const combos = graph.getCombos();
```

### getComboChildren(combo)
Get the children of the `combo`.

**Parameters**

| Name    | Type   | Required | Description   |
| ------- | ------ | -------- | ----------- |
| combo | string / ICombo | true     | The ID or of the combo or the combo item |

**Return**

- Type of the return value: Object. Formated as:
```javascript
{
    nodes: INode[],
    edges: ICombo[]
}
```
- Return the children (sub nodes and combos) of the `combo`.

**Usage**

```
const elements: { 
  nodes: INode[], 
  combos: ICombo[] 
} = graph.getComboChildren('combo1')
```


## Coordinate Transformation

In this part, we will describe the methods about transformation between view port, canvas, and client coordinates. The relationships between them are shown below:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M_xPSqLZYawAAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

### getPointByClient(clientX, clientY)

Transform client/screen coordinates into view port coordinates.

**Parameters**

| Name    | Type   | Required | Description                    |
| ------- | ------ | -------- | ------------------------------ |
| clientX | Number | true     | x coordinate of client/screen. |
| clientY | Number | true     | y coordinate of client/screen. |

**Return**

- Type of the return value: Object;
- Includes x and y.

**Usage**

```javascript
const point = graph.getPointByClient(e.clientX, e.clientY);
console.log('The x and y of view port are: ', point.x, point.y);
```

### getClientByPoint(x, y)

Transform view port coordinates into client/screen coordinates.

**Parameters**

| Name | Type   | Required | Description                |
| ---- | ------ | -------- | -------------------------- |
| x    | Number | true     | x coordinate of view port. |
| y    | Number | true     | y coordinate of view port. |

**Return**

- Type of the return value: Object;
- Includes `x` and `y`.

**Usage**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('The x and y of client/screen are: ', point.x, point.y);
```

### getPointByCanvas(canvasX, canvasY)

Transform canvas coordinates into view port coordinates.

**Parameters**

| Name    | Type   | Required | Description                 |
| ------- | ------ | -------- | --------------------------- |
| canvasX | Number | true     | The x coordinate of canvas. |
| canvasY | Number | true     | The y coordinate of canvas. |

**Return**

- Type of the return value: Object;
- Include x and y.

**Usage**

```javascript
const point = graph.getPointByCanvas(100, 200);
console.log('The x and y of view port: ', point.x, point.y);
```

### getCanvasByPoint(x, y)

Transform view port coordinates into canvas coordinates.

**Parameters**

| Name | Type   | Required | Description                    |
| ---- | ------ | -------- | ------------------------------ |
| x    | Number | true     | The x coordinate of view port. |
| y    | Number | true     | The y coordinate of view port. |

**Return**

- Type of the return value: Object;
- Includes x and y.

**Usage**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('The x and y coordinates of canvas: ', point.x, point.y);
```

## Animation

### positionsAnimate()

Update the node positions according to the data model animatively. The `animateCfg` of the graph will be the animation configurations.

### stopAnimate()

Stop the animation on the canvas.

**Usage**

```javascript
graph.stopAnimate();
```

### isAnimating()

Return if the graph is animating.



## Calculation

### getNodeDegree(node, degreeType)

Get the in-degree, out-degree, degree, or all of the three kinds of degree.

**Parameter**

| Name   | Type   | Required | Description             |
| ---- | ------ | -------- | ---------- |
| node | string / INode  | true     | Node's ID or item |
| degreeType | `'in'` \ `'out'` \ `'total'` \ `'all'` | false     | The degree type. If it is assigned to `'in'`, returns the in-degree; `'out'` returns out-degree; `'total'` returns total degree; `'all'` returns an object contains three kinds of the degree: `{ inDegree, outDegree, degree}`; If it is not assigned, returns total degree as default |


**Usage**

```javascript
graph.getNodeDegree('node1', 'in');
```

## Download

### downloadFullImage(name, type, imageConfig)

Export the whole graph as an image, whatever (a part of) the graph is out of the screen.

**Parameters**

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------- |
| name | String | false     | The name of the image. 'graph' by default. |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| imageConfig | Object | false     | The configuration for the exported image, detials are shown below |

where the `imageConfig` is the configuration for exported image:

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------- |
| backgroundColor | String | false     | The background color of the image. If it is not assigned, the background will be transparent. |
| padding | Number / Number[] | false     | The top, right, bottom, right paddings of the exported image. When its type is number, the paddings around the graph are the same |

**Usage**

```javascript
graph.downloadFullImage('tree-graph', {
  backgroundColor: '#ddd',
  padding: [30, 15, 15, 15]
});
```

### downloadImage(name, type, backgroundColor)

Export the canvas as an image.

**Parameters**

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------------------- |
| name | String | false     | The name of the image. 'graph' by default |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| backgroundColor | String | false     | The background color of the image. If it is not assigned, the background will be transparent. |

**Usage**

```javascript
graph.downloadImage();
```

### toDataURL(type, backgroundColor)

Generate url of the image of the graph inside the view port.

**Parameters**

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------- |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| backgroundColor | String | false     | The background color of the image. If it is not assigned, the background will be transparent. |

**Return**

- Type of the return value: string;
- The return value is the image url.

**Usage**

```javascript
const dataURL = graph.toDataURL();
```



### toFullDataURL(callback, type, backgroundColor)

Generate url of the image of the whole graph including the part out of the view port.

**Parameters**

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------- |
| callback | Function | true | The callback function after finish generating the dataUrl of the full graph 
Asynchronously |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| imageConfig | Object | false     | The configuration for the exported image, detials are shown below |

where the `imageConfig` is the configuration for exported image:

| Name | Type   | Required | Description            |
| ---- | ------ | -------- | ---------- |
| backgroundColor | String | false     | The background color of the image. If it is not assigned, the background will be transparent. |
| padding | Number / Number[] | false     | The top, right, bottom, right paddings of the exported image. When its type is number, the paddings around the graph are the same |


No return value, you can process the result in the callback function as shown below:


**Usage**

```javascript
graph.toFullDataUrl(
  // The first parameter: callback, required
  (res) => {
    // ... something
    console.log(res); // e.g. print the result
  },
  // The second and third parameter is not required
  'image/jpeg',
  imageConfig: {
    backgroundColor: '#fff',
    padding: 10
  }

)
```



## Others

### addPlugin(plugin)

Add plugin to graph.

**Parameters**

| Name   | Type   | Required | Description             |
| ------ | ------ | -------- | ----------------------- |
| plugin | Object | true     | Instance of the plugin. |

**Usage**

```javascript
import { Minimap } from '@antv/g6';
const miniMap = new Minimap({
  size: [200, 100],
  className: 'minimap'
})

graph.addPlugin(miniMap);
```

### removePlugin(plugin)

Remove the plugin from graph.

**Parameters**

| Name   | Type   | Required | Description                 |
| ------ | ------ | -------- | --------------------------- |
| plugin | Object | true     | The Instance of the plugin. |

**Usage**

```javascript
// use removePlugin to remove plugin instance added by addPlugin
graph.removePlugin(miniMap);
```

### get(key)

Get an property of graph by key.

**Parameters**

| Name | Type   | Required | Description          |
| ---- | ------ | -------- | -------------------- |
| key  | string | true     | Key of the property. |

**Usage**

```javascript
// get the group
const group = graph.get('group');

// get the canvas instance
const canvas = graph.get('canvas');

// get the value of autoPaint
const autoPaint = graph.get('autoPaint');
```

### set(key, val)

Set the value to an property.

**Parameters**

| Name | Type                    | Required | Description                |
| ---- | ----------------------- | -------- | -------------------------- |
| key  | string                  | true     | The key of the property.   |
| val  | string / Object / Array | true     | The value of the property. |

**Usage**

```javascript
// Set capture to false
graph.set('capture', false);

// Set customGroup to group
graph.set('customGroup', group);

// Set nodeIdList to [1, 3, 5]
graph.set('nodeIdList', [1, 3, 5]);
```



### getContainer()

Get the DOM container of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getContainer()
```


### getGroup()

Get the root [graphics group](/en/docs/manual/advanced/keyconcept/graphics-group) of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getGroup()
```


### getMinZoom()

Get the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

No parameter

**Usage**

```javascript
graph.getMinZoom()
```


### setMinZoom(ratio)

Set the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

| Name | Type                    | Required | Description                |
| ---- | ----------------------- | -------- | -------- |
| ratio  | number                  | true     | The minimum zoom ratio value |


**Usage**

```javascript
graph.setMinZoom(0.001)
```



### getMaxZoom()

Get the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getMaxZoom()
```


### setMaxZoom(ratio)

Set the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

| Name | Type                    | Required | Description                |
| ---- | ----------------------- | -------- | -------- |
| ratio  | number                  | true     | The maximum zoom ratio value |


**Usage**

```javascript
graph.setMaxZoom(1000)
```


### getWidth()

Get the current width of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getWidth()
```



### getHeight()

Get the current height of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getHeight()
```

