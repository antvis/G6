---
title: Register Node and Edge
order: 6
---

This document shows the functions that should be implemented or rewrited when custom nodes by `G6.registerNode` or custom edges by `G6.registerEdge`.

## G6.registerNode(nodeName, options, extendedNodeName)

When the built-in nodes cannot satisfy your requirments, custom a type of node by `G6.registerNode(nodeName, options, extendedNodeName)`.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| nodeName | String | true | The unique name of the custom node. |
| options | Object | true | The configurations of custom node, include functions of complete life cycles. Please refer to [Shape Doc](/en/docs/manual/middle/elements/shape/shape-keyshape) and [Custom Item API](/en/docs/api/CustomItem). |
| extendedNodeName | String | false | Specifies the inherited node type of the custom node. Declare this property if you want to extend a built-in node. [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) document. |

### Usage

```javascript
G6.registerNode(
  'nodeName',
  {
    /**
     * Draw this type of node with label
     * @param  {Object} cfg The configurations of this type of node
     * @param  {G.Group} group Graphics group, the container of the shapes of the node
     * @return {G.Shape} The keyShape of the type of node. The keyShape can be obtained by node.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * Operations to be executed after drawing. No operation by default
     * @param  {Object} cfg The configurations of this type of node
     * @param  {G.Group} group Graphics group, the container of the shapes of the node
     */
    afterDraw(cfg, group) {},
    /**
     * Update the node with label
     * @override
     * @param  {Object} cfg The configurations of this type of node
     * @param  {Node} node The node
     */
    update(cfg, node) {},
    /**
     * Operations to be executed after updating.
     * @override
     * @param  {Object} cfg The configurations of this type of node
     * @param  {Node} node The node
     */
    afterUpdate(cfg, node) {},
    /**
     * After graph.setItemState(item, state, value) is called, this function will do some responses.
     * @param  {String} name The name of state
     * @param  {Object} value The value of the state
     * @param  {Node} node The node
     */
    setState(name, value, node) {},
    /**
     * Get the anchor points
     * @param  {Object} cfg The configurations of this type of node
     * @return {Array|null} The array of anchor points. There is no anchor points if it is null.
     */
    getAnchorPoints(cfg) {},
  },
  'extendedNodeName',
);
```

## G6.registerEdge(edgeName, options, extendedEdgeName)

When the built-in edges cannot satisfy your requirments, custom a type of edge by `G6.registerEdge(edgeName, options, extendedEdgeName)`.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| edgeName | String | true | The unique name of the custom edge. |
| options | Object | true | The configurations of custom edge, include functions of complete life cycles. Please refer to [Shape Doc](/en/docs/manual/middle/elements/shape/shape-keyshape) and [Custom Item API](/en/docs/api/CustomItem). |
| extendedEdgeName | String | false | Specifies the inherited node type of the custom node. Declare this property if you want to extend the a built-in edge. [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) document. |

### Usage

```javascript
G6.registerEdge(
  'edgeName',
  {
    /**
     * Draw this type of edge with label
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {G.Group} group Graphics group, the container of the shapes of the edge
     * @return {G.Shape} The keyShape of the type of edge. The keyShape can be obtained by edge.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * Operations to be executed after drawing. No operation by default
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {G.Group} group Graphics group, the container of the shapes of the edge
     */
    afterDraw(cfg, group) {},
    /**
     * Update the edge with label
     * @override
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {Edge} edge The edge
     */
    update(cfg, edge) {},
    /**
     * Operations to be executed after updating.
     * @override
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {Edge} edge The edge
     */
    afterUpdate(cfg, edge) {},
    /**
     * After [`graph.setItemState(item, state, value)`] is called, this function will do some responses.
     * @param  {String} name The name of state
     * @param  {Object} value The value of the state
     * @param  {Edge} edge The edge
     */
    setState(name, value, edge) {},
  },
  'extendedEdgeName',
);
```

## G6.registerCombo(comboName, options, extendedComboName)

When the built-in combos cannot satisfy your requirments, custom a type of combo by `G6.registerCombo(comboName, options, extendedComboName)`.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| comboName | String | true | The unique name of the custom combo. |
| options | Object | true | The configurations of custom combo, include functions of complete life cycles. Please refer to [Shape Doc](/en/docs/manual/middle/elements/shape/shape-keyshape) and [Custom Item API](/en/docs/api/CustomItem). |
| extendedComboName | String | false | Specifies the inherited combo type of the custom combo. Declare this property if you want to extend a built-in combo. [Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo) document. |

### Usage

```javascript
G6.registerCombo(
  'comboName',
  {
    /**
     * Draw this type of combo with label
     * @param  {Object} cfg The configurations of this type of combo
     * @param  {G.Group} group Graphics group, the container of the shapes in the combo
     * @return {G.Shape} The keyShape of the type of combo. The keyShape can be obtained by combo.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * Operations to be executed after drawing. No operation by default
     * @param  {Object} cfg The configurations of this type of combo
     * @param  {G.Group} group Graphics group, the container of the shapes in the combo
     */
    afterDraw(cfg, group) {},
    /**
     * Update the combo with label
     * @override
     * @param  {Object} cfg The configurations of this type of combo
     * @param  {Combo} combo The combo
     */
    update(cfg, combo) {},
    /**
     * Operations to be executed after updating.
     * @override
     * @param  {Object} cfg The configurations of this type of combo
     * @param  {Combo} combo The combo
     */
    afterUpdate(cfg, combo) {},
    /**
     * After graph.setItemState(item, state, value) is called, this function will do some responses.
     * @param  {String} name The name of state
     * @param  {Object} value The value of the state
     * @param  {Combo} combo The combo
     */
    setState(name, value, combo) {},
    /**
     * Get the anchor points
     * @param  {Object} cfg The configurations of this type of combo
     * @return {Array|null} The array of anchor points. There is no anchor points if it is null.
     */
    getAnchorPoints(cfg) {},
  },
  'extendedComboName',
);
```

## Usage

The following code is an example of customizing a type of edge:

```javascript
import G6 from '@antv/g6';
G6.registerEdge(
  'edgeName',
  {
    labelPosition: 'center',
    labelAutoRotate: true,
    draw(cfg, group) {
      // The other functions such as drawShape anddrawLabel can be called in draw(cfg, group)
      this.drawShape();
      const labelStyle = this.getLabelStyle(cfg);
      // ...
    },
    drawShape(cfg, group) {
      //
    },
    getLabelStyle(cfg) {
      // Return the label's style
      return {};
    },
    update(cfg, item) {
      // Update the item according
    },
  },
  'line',
);
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

| Name  | Type    | Required | Description                             |
| ----- | ------- | -------- | --------------------------------------- |
| cfg   | Object  | true     | The configurations of the node or edge. |
| group | G.Group | true     | The contianer of the node or edge.      |

### afterDraw(cfg, group)

This function will be called after the node or edge being drawed. It is appropriate for extending graphics or animations for built-in node or edge.

This [demo](/en/examples/scatter/edge) shows how to add animations in afterDraw. The API about shape's animate can be refered to the [Animate API of G](https://g.antv.vision/en/docs/api/general/element/#%E5%8A%A8%E7%94%BB%E6%96%B9%E6%B3%95) which is the rendering engine of G6.

## Update Functions

### update(cfg, item)

Update the node or edge, including the label on it.

**Parameters**

| Name | Type    | Required | Description                              |
| ---- | ------- | -------- | ---------------------------------------- |
| cfg  | Object  | true     | The configurations for the node or edge. |
| item | G6.Item | true     | The item instance of the node or edge.   |

### afterUpdate(cfg, item)

This function will be called after the node or edge being updated.

This [demo](/en/examples/scatter/edge) shows how to add animations. The API about shape's animate can be refered to the [Animate API of G](https://g.antv.vision/en/docs/api/general/element/#%E5%8A%A8%E7%94%BB%E6%96%B9%E6%B3%95) which is the rendering engine of G6.

### shouldUpdate(type)

Whether to allow the node or edge to be updated.

**Paramters**

| Name | Type   | Required | Description                                      |
| ---- | ------ | -------- | ------------------------------------------------ |
| type | String | true     | The type of the item. Options:`'node'`, `'edge'` |

**Return**

- The type of return value: Boolean;
- Allow the node or edge to be updated if it returns `true`.

### setState(name, value, item)

After [`graph.setItemState(item, state, value)`](/en/docs/api/Graph/#setitemstateitem-state-enabled) is called, this function will do some responses.

**Paramters**

| Name  | Type    | Required | Description                       |
| ----- | ------- | -------- | --------------------------------- |
| name  | String  | true     | The name of the state.            |
| value | Boolean | true     | The value of the state.           |
| item  | G6.Item | true     | The instance of the node or edge. |
