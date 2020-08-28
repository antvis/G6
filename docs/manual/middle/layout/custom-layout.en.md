---
title: Custom Layout
order: 5
---

G6 provides abundant commonly used built-in layouts for Graph and TreeGraph respectively. The usage can be found in: [Utilizing Layout](/en/docs/manual/middle/layout), [Layout API](/en/docs/api/layout/Layout). Custom layout mechanism of G6 allows the users to design their own type of layout to meet their special requirements.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️Attention:</strong> </span> The TreeGraph does not support custom layout temporarily.

In this document, we will introduce the custom layout by registering a layout for Bigraph.

## The API of Cumstom Layout

```javascript
/**
 * Register a Layout
 * @param {string} type The layout type is must assigned to an unique string
 * @param {object} layout The layout method
 */
Layout.registerLayout = function(type, {
  /**
   * The default configurations of the custom layout. It will be mixed by the configurations from users
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * Initialize
   * @param {object} data data
   */
  init(data) {},
  /**
   * Execute the layout
   */
  execute() {},
  /**
   * Layout with the data
   * @param {object} data 数据
   */
  layout(data) {},
  /**
   * Update the layout configurations, but do not execute the layout
   * @param {object} cfg The new configurations
   */
  updateCfg(cfg) {},
  /**
   * Destroy
   */
  destroy() {},
});
```

## Custom Layout

Now, we are going to register a layout for Bigraph. Bigraph is the graph with nodes divided into two parts. There will be no edges between the nodes which are belong to the same part. In the custom layout, we sort the nodes according to their topology to reduce the edge crossings.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FksvTrdkqXgAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

The data of the Bigraph is shown below, where the nodes are divided into `'part1'` and `'part2'` by the property `cluster`.

```javascript
const data = {
  nodes: [
    { id: '0', label: 'A', cluster: 'part1' },
    { id: '1', label: 'B', cluster: 'part1' },
    { id: '2', label: 'C', cluster: 'part1' },
    { id: '3', label: 'D', cluster: 'part1' },
    { id: '4', label: 'E', cluster: 'part1' },
    { id: '5', label: 'F', cluster: 'part1' },
    { id: '6', label: 'a', cluster: 'part2' },
    { id: '7', label: 'b', cluster: 'part2' },
    { id: '8', label: 'c', cluster: 'part2' },
    { id: '9', label: 'd', cluster: 'part2' },
  ],
  edges: [
    { source: '0', target: '6' },
    { source: '0', target: '7' },
    { source: '0', target: '9' },
    { source: '1', target: '6' },
    { source: '1', target: '9' },
    { source: '1', target: '7' },
    { source: '2', target: '8' },
    { source: '2', target: '9' },
    { source: '2', target: '6' },
    { source: '3', target: '8' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '5', target: '9' },
  ],
};
```

### Requirements Analysis

To reduce the edge crossings, we sort the nodes in `part1` and `part2` respectively. The process is:

- Step 1: Assign the index from 0 randomly for the nodes in `'part1'` and `'part2'` respectively;
- Step 2: Traverse the nodes in `'part1'`. For each node A:
  - Find the set of related nodes of A (connect to A directly) in `'part2'` ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-WOhQIGg9l8AAAAAAAAAAABkARQnAQ). Sum up the indexes of the nodes in ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-WOhQIGg9l8AAAAAAAAAAABkARQnAQ), and divided it by the number of elements in ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-WOhQIGg9l8AAAAAAAAAAABkARQnAQ). Replace the index of A by the result: ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VfXiSK1f02cAAAAAAAAAAABkARQnAQ)
- Step 3: Tranverse the nodes in `'part2'`. For each node A(Similar to the Step 2):
  - Find the set of related nodes of B (connect to B directly) in `'part1'` ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GqZiSKI-nB8AAAAAAAAAAABkARQnAQ). Sum up the indexes of the nodes in ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GqZiSKI-nB8AAAAAAAAAAABkARQnAQ), and divided it by the number of elements in ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GqZiSKI-nB8AAAAAAAAAAABkARQnAQ). Replace the index of A by the result: ![](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-8b2Spfb4HIAAAAAAAAAAABkARQnAQ)
- Step 4: Sort the nodes in `part1` and `part2` respectively according to their indexed. The result order determine the postions of the nodes in the final layout.

## Implementation

The following code below register a layout named `'bigraph-layout'` for Bigraph. The complete code can be found in: <a href='/en/examples/net/layoutMechanism#customBigraph' target='_blank'>Cusom Layout-Bigraph</a>. The usage of custom layout is the same as built-in layouts: configure the `layout` to the graph when instantiating. Refer to: [Utilizing Layout](/en/docs/manual/middle/layout).

```javascript
G6.registerLayout('bigraph-layout', {
  // Default configurations
  getDefaultCfg: function getDefaultCfg() {
    return {
      center: [0, 0], // The center of the layout
      biSep: 100, // The separation of these two parts
      nodeSep: 20, // The separation between nodes in the same part
      direction: 'horizontal', // The direction of the two parts
      nodeSize: 20, // The node size
    };
  },
  // Execute the layout
  execute: function execute() {
    var self = this;
    var center = self.center;
    var biSep = self.biSep;
    var nodeSep = self.nodeSep;
    var nodeSize = self.nodeSize;
    var part1Pos = 0,
      part2Pos = 0;
    // Layout the graph in horizontally
    if (self.direction === 'horizontal') {
      part1Pos = center[0] - biSep / 2;
      part2Pos = center[0] + biSep / 2;
    }
    var nodes = self.nodes;
    var edges = self.edges;
    var part1Nodes = [];
    var part2Nodes = [];
    var part1NodeMap = new Map();
    var part2NodeMap = new Map();
    // Separate the nodes and init the positions
    nodes.forEach(function (node, i) {
      if (node.cluster === 'part1') {
        part1Nodes.push(node);
        part1NodeMap.set(node.id, i);
      } else {
        part2Nodes.push(node);
        part2NodeMap.set(node.id, i);
      }
    });

    // Sort the nodes in part1
    part1Nodes.forEach(function (p1n) {
      var index = 0;
      var adjCount = 0;
      edges.forEach(function (edge) {
        var sourceId = edge.source;
        var targetId = edge.target;
        if (sourceId === p1n.id) {
          index += part2NodeMap.get(targetId);
          adjCount++;
        } else if (targetId === p1n.id) {
          index += part2NodeMap.get(sourceId);
          adjCount++;
        }
      });
      index /= adjCount;
      p1n.index = index;
    });
    part1Nodes.sort(function (a, b) {
      return a.index - b.index;
    });

    // Sort the nodes in part2
    part2Nodes.forEach(function (p2n) {
      var index = 0;
      var adjCount = 0;
      edges.forEach(function (edge) {
        var sourceId = edge.source;
        var targetId = edge.target;
        if (sourceId === p2n.id) {
          index += part1NodeMap.get(targetId);
          adjCount++;
        } else if (targetId === p2n.id) {
          index += part1NodeMap.get(sourceId);
          adjCount++;
        }
      });
      index /= adjCount;
      p2n.index = index;
    });
    part2Nodes.sort(function (a, b) {
      return a.index - b.index;
    });

    // Place the ndoes
    var hLength = part1Nodes.length > part2Nodes.length ? part1Nodes.length : part2Nodes.length;
    var height = hLength * (nodeSep + nodeSize);
    var begin = center[1] - height / 2;
    if (self.direction === 'vertical') {
      begin = center[0] - height / 2;
    }
    part1Nodes.forEach(function (p1n, i) {
      if (self.direction === 'horizontal') {
        p1n.x = part1Pos;
        p1n.y = begin + i * (nodeSep + nodeSize);
      } else {
        p1n.x = begin + i * (nodeSep + nodeSize);
        p1n.y = part1Pos;
      }
    });
    part2Nodes.forEach(function (p2n, i) {
      if (self.direction === 'horizontal') {
        p2n.x = part2Pos;
        p2n.y = begin + i * (nodeSep + nodeSize);
      } else {
        p2n.x = begin + i * (nodeSep + nodeSize);
        p2n.y = part2Pos;
      }
    });
  },
});
```
