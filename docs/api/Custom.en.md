---
title: Custom Mechanism
order: 10
---

This document will introduce custom mechanism in G6, including custom node, custom edge, custom behavior, custom layout. All of them are mounted on global G6, called by `G6.registerXXX`.

## G6.registerNode(nodeName, options, extendNodeName)

When the built-in nodes cannot satisfy your requirments, custom a type of node by `G6.registerNode(nodeName, options, extendedNodeName)`.

### Parameters

| Name       | Type   | Required | Description                                                                                                                                                                |
| -------------- | ------ | -------- | ----------------------------------------------------------------- |
| nodeName       | String | true     | The unique name of the custom node.                                                                                                                                     |
| options        | Object | true     | The configurations of custom node, include functions of complete life cycles. Please refer to [Shape API](/en/docs/api/Shape).                                          |
| extendNodeName | String | false    | Specifies the inherited node type of the custom node. Declare this property if you want to extend a built-in node. [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) document. |

### Usage

```javascript
G6.registerNode(
  'nodeName',
  {
    /**
     * Draw this type of node with label
     * @param  {Object} cfg The configurations of this type of node
     * @param  {G.Group} group The container of this type of node
     * @return {G.Shape} The keyShape of the type of node. The keyShape can be obtained by node.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * Operations to be executed after drawing. No operation by default
     * @param  {Object} cfg The configurations of this type of node
     * @param  {G.Group} group The container of this tyep of node
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
  'extendedNodeName'
);
```

## G6.registerEdge(edgeName, options, extendEdgeName)

When the built-in edges cannot satisfy your requirments, custom a type of edge by `G6.registerEdge(edgeName, options, extendedEdgeName)`.

### Parameters

| Name           | Type   | Required | Description                                                                                                                                    |
| -------------- | ------ | -------- | --------------------------------------- |
| edgeName       | String | true     | The unique name of the custom edge.                                                                                                                         |
| options        | Object | true     | The configurations of custom edge, include functions of complete life cycles. Please refer to [Shape API](/en/docs/api/Shape).                |
| extendEdgeName | String | false    | Specifies the inherited node type of the custom node. Declare this property if you want to extend the a built-in edge. [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) document. |

### Usage

```javascript
G6.registerEdge(
  'edgeName',
  {
    /**
     * Draw this type of edge with label
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {G.Group} group The container of this tyep of edge
     * @return {G.Shape} The keyShape of the type of edge. The keyShape can be obtained by edge.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * Operations to be executed after drawing. No operation by default
     * @param  {Object} cfg The configurations of this type of edge
     * @param  {G.Group} group The container of this tyep of edge
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
  'extendedEdgeName'
);
```

## G6.registerBehavior(behaviorName, behavior)

When the built-in Behaviors cannot satisfy your requirments, custom a type of Behavior by `G6.registerBehavior(behaviorName, behavior)`.

### Parameters

| Name          | Type   | Required | Description                                                                                                                          |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| behaviorName | String | true     | The name of custom Behavior.                                                                                                        |
| behavior     | Object | true     | The configurations of custom Behavior. For more information, please refer to [Behavior API](/en/docs/api/Behavior). |

### Usage

```javascript
// Custom a type of Behavior
G6.registerBehavior('behaviorName', {
  // Bind the event and its callback
  getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      'edge:click': 'onEdgeClick',
    };
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} evt The handler
   */
  onClick(evt) {
    const node = evt.item;
    const graph = this.graph;
    const point = { x: evt.x, y: evt.y };
    const model = node.getModel();
    // TODO
  },
  /**
   * Handle the callback for mousemove
   * @override
   * @param  {Object} evt The handler
   */
  onMousemove(evt) {
    // TODO
  },
  /**
   * Handle the callback for :click
   * @override
   * @param  {Object} evt The handler
   */
  onEdgeClick(evt) {
    // TODO
  },
});
```

## G6.registerLayout(layoutName, layout)

When the built-in Layouts cannot satisfy your requirments, custom a type of Layout by `G6.registerLayout(layoutName, layout)`.


### Parameters

| Name       | Type   | Required | Description                                                                                                          |
| ---------- | ------ | -------- | ----------------------------------------------- |
| layoutName | String | true     | The name of the custom layout.                                                                                                |
| layout     | Object | true     | The configurations of the custom layout. For more information, please refer to [Layout API](/en/docs/manual/middle/layout). |

### Usage

```javascript
G6.registerLayout('layoutName', {
  /**
   * The default configurations will be mixed by configurations from user
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * Initialize
   * @param {Object} data The data
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
  },
  /**
   * Execute the layout
   */
  execute() {
    // TODO
  },
  /**
   * Layout with the data
   * @param {Object} data The data
   */
  layout(data) {
    const self = this;
    self.init(data);
    self.execute();
  },
  /**
   * Update the configurations of the layout, but it does not execute the layout
   * @param {Object} cfg The new configurations
   */
  updateCfg(cfg) {
    const self = this;
    Util.mix(self, cfg);
  },
  /**
   * Destroy the layout
   */
  destroy() {
    const self = this;
    self.positions = null;
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  },
});
```
