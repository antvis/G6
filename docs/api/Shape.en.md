---
title: Shape
order: 7
---

This document shows the functions that should be implemented or rewrited when custom nodes by `G6.registerNode` or custom edges by `G6.registerEdge`. 

## Usage
The following code is an example of customizing a type of edge:
```javascript
import G6 from '@antv/g6'
G6.registerEdge('edgeName', {
  labelPosition: 'center',
  labelAutoRotate: true,
  draw(cfg, group) {
    // The other functions such as drawShape anddrawLabel can be called in draw(cfg, group)
    this.drawShape()
    const labelStyle = this.getLabelStyle(cfg)
    // ...
  },
  drawShape(cfg, group) {
    // 
  },
  getLabelStyle(cfg) {
    // Return the label's style
    return {}
  },
  update(cfg, item) {
    // Update the item according
  }
}, 'line')
```

## Properties

### labelPosition
The relative positions of label to the item. `'center'` by default.

- When registering a type of node by `registerNode`, options of `labelPosition` includes: `'top'`, `'bottom'`, `'left'`, `'right'` and `'center'`;
- When registering a type of edge by `registerEdge`, options of `labelPosition` includes: `'start'`, `'end'` and `'center'`.

### labelAutoRotate
> Takes effect only when `registerEdge`.

Whether to rotate the label according to the edge. `false` by default.

**Tips: this is an unique property for edge.**

## Draw Functions
The parameters for the four functions about draw are the same. Please refer to `draw()`.

### draw(cfg, group)
Draw the node or edge, including the label on the it. Return `keyShape` of it.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cfg | Object | true | The configurations of the node or edge. |
| group | G.Group | true | The contianer of the node or edge. |

### afterDraw(cfg, group)
This function will be called after the node or edge being drawed. It is appropriate for extending graphics or animations for built-in node or edge.

## Update Functions

### update(cfg, item)
Update the node or edge, including the label on it.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cfg | Object | true | The configurations for the node or edge. |
| item | G6.Item | true | The item instance of the node or edge. |

### afterUpdate(cfg, item)
This function will be called after the node or edge being updated.

### shouldUpdate(type)
Whether to allow the node or edge to be updated.

**Paramters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | String | true | The type of the item. Options:`'node'`, `'edge'` |

**Return**

- The type of return value: Boolean;
- Allow the node or edge to be updated if it returns `true`.

### setState(name, value, item)
After [`graph.setItemState(item, state, value)`](/en/docs/api/Graph/#setitemstateitem-state-enabled) is called, this function will do some responses.

**Paramters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | String | true | The name of the state. |
| value | Boolean | true | The value of the state. |
| item | G6.Item | true | The instance of the node or edge. |
