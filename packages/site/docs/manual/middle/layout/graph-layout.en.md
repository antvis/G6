---
title: Graph Layout
order: 0
---

## Introduction

Graph layouts are the algorithms arranging the node positions to obtain a understandable visualizaiton. According to the differences of data strucutre, the layouts can be categorized into: general graph layout and tree graph layout. There are several layout algorithms for them respectively. By utilizing the built-in layouts, [Translating the layouts and their configurations, translating the data](/en/docs/manual/middle/layout/layout-mechanism) can be achieved. Besides, G6 provides the [Web-Worker](/en/docs/manual/middle/layout/webworker) for general graph layout in case layout calculation takes too long to block page interaction.

Besides, G6 supports [Custom Layout](/en/docs/manual/middle/layout/custom-layout) mechanism for users to design their own layout algorithm.

In fact, 'layout' is a free mechanism in G6. The built-in layouts only calculate and manipulate the `x` and `y` in node data. In other word, users can assign `x` and `y` to nodes by any other ways including the algorithms from the third-party libraries. Once G6 find the `x` and `y` information on data, it will render the graph according to it.

In this ducoment, we will introduce the layout algorithms in detail.

## G6 Layouts Overview

- [Random Layout](#random): Randomizes the node postions;
- [GForce Layout](#gforce): Classical force-directed layout supports GPU parallel computing, supported by G6 4.0;
- [Force Layout](#force): Classical force-directed layout imported from d3;
- [Fruchterman Layout](#fruchterman): A kind of force-directed layout;
- [Circular Layout](#circular): Arranges the nodes on a circle;
- [Radial Layout](#radial): Arranges the nodes around a focus node radially;
- [MDS Layout](#mds): Multidemensional Scaling;
- [Dagre Layout](#dagre): Arranges the nodes hierarchically;
- [Concentric Layout](#concentric): Arranges the nodes on concentric circles;
- [Grid Layout](#grid): Arranges the nodes on grid.
- [Combo Force Layout](#combo-force)：_New feature of V3.5_ Designed for graph with combos.

## Configure the Graph

Configure `layout` to the Graph instance to assign the layout methods and their configurations. The following code assigns the layout with `type: 'force'`, which means the classical force-directed layout algorithm. The configurations `preventOverlap: true` and `nodeSize: 30` are assigned to prevent node overlappings, where the `nodeSize` is used for collide detection. More layout configurations can be found in the following sections.

```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations for the graph
  layout: {
    // Object, the layout configuration. Random layout by default
    type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // workerEnabled: true, // Whether enable webworker
    // gpuEnabled: true // Whether enable GPU version. supported by G6 4.0, and only support gForce and fruchterman layout
    // ...                    // Other configurations for the layout
  },
});
```

Different layout algorithms have different configurations. For all the general graph layout algorithms in G6, you can enable the web-worker by configure `workerEnabled: true` in the `layout` configuration above. With web-worker, layout algorithms performed on large data with high cost will not block the web page.

When the `layout` is not assigned:

- If there is position information with `x` and `y` in node data, G6 renders the graph with them;
- If the position information does not exist in the node data, Random Layout will take effect by default.

## Layouts for Graph

General graph layout API: [General Graph Layout API](/en/docs/api/graphLayout/guide).

### Random

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M5FySIdhX4oAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

<br />**Description**: Randomizes the node positions. <br />**API**: [Random API](/en/docs/api/graphLayout/random) <br />**Configuration**:

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| width | Number | 300 | The width of the graph |  |
| height | Number | 300 | The height of the graph |  |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### GForce

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=500 alt='img'/>

<br /> **Description**: GForce implements the classical force-directed layout algorithm by G6 4.0. It supports assign different masses and center gravities for different nodes freedomly. More importantly, it supports GPU parallel acceleration. <br /> **API**: [GForce API](/en/docs/api/graphLayout/gforce) <br /> **Configuration**:

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number / Function | Example 1: `50` <br />Example 2:<br />d => {<br />  // d is an edge<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 1 | The edge length. It can be a function to define the different edge lengths for different edges (Example 2) |
| nodeStrength | Number / Function | Exmaple 1: -30 <br />Exmaple 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} / 1000 | 1000 | The strength of node force. Positive value means repulsive force, negative value means attractive force (it is different from 'force')(As example 2) |
| edgeStrength | Number / Function | Example 1: 1 <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | 200 | The strength of edge force. Calculated according to the degree of nodes by default (As Example 2) |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned |
| nodeSize | Array / Number | 20 | undefined | The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /><br /> | Number / Function | Example 1 : 10<br />Example 2 : <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2) |
| minMovement | Number | 0.1 | 0.5 | When the average movement of nodes in one iteration is smaller than `minMovement`, terminate the layout |
| maxIteration | Number | 500 | 1000 | The max number of iterations. If the average movement do not reach `minMovement` but the iteration number is over `maxIteration`, terminate the layout |
| damping | Number | 0.99 | 0.9 | Range [0, 1], affect the speed of decreasing node moving speed. Large the number, slower the decreasing |
| maxSpeed | Number | 10 | 1000 | The max speed in each iteration |
| coulombDisScale | Number | 0.003 | 0.005 | A parameter for repulsive force between nodes. Large the number, larger the repulsion |
| getMass | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | It is a callback returns the mass of each node. If it is not assigned, the degree of each node will takes effect. The usage is similar to `nodeSpacing` |
| getCenter | Function | (d, degree) => {<br />  // d is a node, degree is the degree of the node<br />  if (d.degree === 0') {<br />    return [100, 100, 10]; // x, y, strength<br />  }<br />  return [210, 150, 5]; // x, y, strength<br />} | undefined | It is a callback returns gravity center and the gravity strength for each node |
| gravity | Number | 20 | 10 | The gravity strength to the `center` for all the nodes. Larger the number, more compact the nodes |
| onTick | Function |  | undefined | The callback function of each iteration |
| onLayoutEnd | Function |  | undefined | The callback function after layout |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |
| gpuEnabled | Boolean | true / false | false | Whether to enable the GPU parallel computing, supported by G6 4.0. If the machine or browser does not support GPU computing, it will be degraded to CPU computing automatically.  |

### Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oDbHRJc5td8AAAAAAAAAAABkARQnAQ' width='500' alt='img'/>graphLayout/guide

<br /> **Description**: Classical force-directed layout algorithm. <br /> **API**: [Force API](/en/docs/api/graphLayout/force) <br /> **Configuration**: Corresponds to the configurations in force-directed algorithm in d3.js

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number / Function | Example 1: `50` <br />Example 2:<br />d => {<br />  // d is an edge<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | The edge length. It can be a function to define the different edge lengths for different edges (Example 2) |
| nodeStrength | Number / Function | Example 1: `-30` <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} | null | The strength of node force. Positive value means attractive force, negative value means repulsive force (Example 2) |
| edgeStrength | Number | Example 1: 1 <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | The strength of edge force, ranges from 0 to 1. Calculated according to the degree of nodes by default (Example 2) |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the `nodeSize` and size in data are both undefiend, `nodeSize` will be assigned to 10 by default |
| nodeSize | Array / Number | 20 | undefined | The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /><br /> | Number / Function | Example 1: 10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| alphaDecay | Number | 0.03 | 0.028 | The decay ratio of alpha for convergence. THe range is [0, 1]. 0.028 corresponds to 300 times iteration |
| alphaMin | Number | 0.03 | 0.001 | The threshold to stop the iteration |
| alpha | Number | 0.1 | 0.3 | The current alpha of convergence |
| collideStrength | Number | 0.8 | 1 | The strength of force for preventing node overlappings. The range is [0, 1] |
| clustering | Boolean | false | false | Whether run the force layout with clustering |
| clusterNodeStrength | Number | -1 | -0.8 | The force between nodes. It will be repulsive force while it is negative |
| clusterEdgeStrength | Number | 0.1 | 0.2 | The force along the edge |
| clusterEdgeDistance | Number | 100 | 50 | The edge length between the clusters |
| clusterNodeSize | Number | 10 | 15 | The node size(diameter) for clustering |
| clusterFociStrength | Number | 0.8 | 0.5 | The force for the clustering foci |
| forceSimulation | Object |  | null | Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect |
| onTick | Function |  | {} | The callback function of each iteration |
| onLayoutEnd | Function |  | {} | The callback function after layout |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### Fruchterman

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DibyQYaI2qYAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

<br />**Description**: Fruchterman is a kind of force-directed layout. <br />**API**: [Fruchterman API](/en/docs/api/graphLayout/fruchterman) <br />**Configuration**:

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| maxIteration | Number | 1000 | 1000 | The maximum interation number |
| gravity | Number | 10 | 10 | The gravity, which affects the compactness of the layout |
| speed | Number | 1 | 1 | The moving speed in each iteration. Large value might lead to violent swing |
| clustering | Boolean | false | false | Whether to layout by clustering |
| clusterGravity | Number | 30 | 10 | The gravity of each clusterm which affects the compactness of each cluster |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |
| gpuEnabled | Boolean | true / false | false | Whether to enable the GPU parallel computing, supported by G6 4.0 |

### Circular

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s_29Rbja9lkAAAAAAAAAAABkARQnAQ' width='200'  alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qw1ES7nYvr8AAAAAAAAAAABkARQnAQ' width='200' alt='img' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mCXwQYRV8IkAAAAAAAAAAABkARQnAQ' width='200' alt='img' />

<br />**Description**: Arranges the nodes on a circle. <br />**API**: [Circular API](/en/docs/api/graphLayout/circular) <br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| radius | Number | 50 | null | The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect. |
| startRadius | Number | 10 | null | The start radius of spiral layout |
| endRadius | Number | 100 | null | The end radius of spiral layout |
| clockwise | Boolean | true | true | Whether to layout clockwisely |
| divisions | Number | 3 | 1 | The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0` |
| ordering | String | null | 'topology' | 'degree' | null | The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order. |
| angleRatio | Number | 1 | 1 | How many 2\*PIs Between the first node and the last node |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### Radial

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FZIpRKpJo_MAAAAAAAAAAABkARQnAQ' width='200' alt='img' />

<br />**Description**: Arranges the nodes to concentrics centered at a focus node according to their shortest path length to the focus node. <br />**API**: [Radial API](/en/docs/api/graphLayout/radial) <br />**Configuration**:

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | 50 | 50 | The edge length |
| maxIteration | Number | 1000 | 1000 | The max iteration number. |
| focusNode | String / Object | 'node1' | null | The focus node of the radial layout. The first node of the data is the default value. It can be the id of a node or the node item. |
| unitRadius | Number | 10 | 100 | The separation between adjacent circles. If `unitRadius` is not assigned, the layout will fill the canvas automatically. |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. |
| maxPreventOverlapIteration | Number | 500 | 200 | The maximum iteration number of preventing node overlappings |
| nodeSize | Number | 10 | 10 | The diameter of the node. It is used for preventing node overlappings. <br />: <br />The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /> | Number / Function | Example 1: 10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cFq4QbXVx7sAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| strictRadial | Boolean | true | false | Whether to layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`. Refer to [Radial-strictRadial API](/en/docs/api/graphLayout/radial#layoutcfgstrictradial)<br />- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely <br />- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.<br /> |
| sortBy | String | 'data' / 'cluster' | undefined | Sort the nodes of the same level. `undefined` by default, which means place the nodes with connections as close as possible; `'data'` means place the node according to the ordering in data, the closer the nodes in data ordering, the closer the nodes will be placed. `sortBy` also can be assigned to any name of property in nodes data, such as `'cluster'`, `'name'` and so on (make sure the property exists in the data) |
| sortStrength | Number | 10 | 10 | The strength to sort the nodes in the same circle. Larger number means place the nodes with smaller distance of `sortBy` more closely. Takes effect only when `sortBy` is not `undefined` |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### MDS

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6OPTT7bz5sUAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**Description**: MDS (Multidimensional scaling) is used for project high dimensional data onto low dimensional space.<br />**API**: [MDS API](/en/docs/api/graphLayout/mds)<br />**Configuration**:

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | 50 | 50 | The edge length |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### Dagre

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RQEORY5A_LoAAAAAAAAAAABkARQnAQ' width=250 alt='img'/><br />**Description**: An hierarchical layout.<br />**API**: [Dagre API](/en/docs/api/graphLayout/dagre)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' / 'BT' / 'LR' / 'RL' | 'TB' | The layout direction. T: top; B: bottom; L: left; R: right |
| align | String | 'UL' / 'UR' / 'DL' / 'DR' / undefined | undefined | The alignment of the nodes. `undefined` by default, align to the center. U: upper; D: down; L: left; R: right |
| nodesep | Number | 40 | 50 | The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes |
| ranksep | Number | 40 | 50 | The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels |
| nodesepFunc<br /><br /> | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect |
| ranksepFunc<br /><br /> | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect |
| controlPoints | Boolean | true | true | Whether to keep the control points of layout |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |
| sortByCombo | Boolean | true / false | false | Whether to sort the nodes in a level according to the `comboId` in their data. Enable `sortByCombo` to avoid combo overlappings |

### Concentric

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ux0-SYBy6Y8AAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />Tips: Concentric layout in G6 refers to <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>, we obey the MIT license <br />**Description**: Arranges the nodes on several concentric circles.<br />**API**: [Concentric API](/en/docs/api/graphLayout/concentric)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| nodeSize | Number | 30 | 30 | The diameter of the node. It is used for preventing node overlappings |
| minNodeSpacing | Number | 10 | 10 | The minimum separation between adjacent circles |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default |
| sweep | Number | Math.PI | undefined | How many radians should be between the first and last node (defaults to full circle). If it is undefined, 2 _ Math.PI _ (1 - 1 / | level.nodes | ) will be used, where level.nodes is nodes set of each level, | level.nodes | is the number of nodes of the level |
| equidistant | Boolean | false | false | Whether levels have an equal radial distance between them, may cause bounding box overflow |
| startAngle | Number | 3.14 | 3 / 2 \* Math.PI | Where nodes start in radians |
| clockwise | Boolean | false | false | Place the nodes in clockwise or not |
| maxLevelDiff | Number | 0.5 | undefined | The sum of concentric values in each level. If it is undefined, maxValue / 4 will take place, where maxValue is the max value of ordering properties. For example, if `sortBy='degree'`, maxValue is the max degree value of all the nodes |
| sortBy | String | 'property1' / 'weight' / ... | undefined | Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree<br /> |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### Grid

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5U3_TZVolpEAAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />Tips: Concentric layout in G6 refers to <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>, we obey the MIT license.<br />**Description**: Orders the nodes according to the configurations and arranged them onto grid.<br />**API**: [Grid API](/en/docs/api/graphLayout/grid)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| begin | Array | [ 0, 0 ] | [ 0, 0 ] | 网格开始位置(左上角) |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default |
| preventOverlapPadding | Number | 10 | 10 | The minimum padding between nodes to prevent node overlappings. Takes effect when `preventOverlap` is `true` |
| nodeSize | Number | 30 | 30 | The diameter of the node. It is used for preventing node overlappings. |
| condense | Boolean | false | false | Wheter to utilize the minimum space of the canvas. `false` means utilizing the full space, `true` means utilizing the minimum space. |
| rows | Number | 5 | undefined | The row number of the grid. If `rows` is undefined, the algorithm will calculate it according to the space and node numbers automatically |
| cols | Number | 5 | undefined | The column number of the grid. If `cols` is undefined, the algorithm will calculate it according to the space and node numbers automatically |
| sortBy | String | 'property1' / 'weight' / ... | 'degree' | The ordering method for nodes. Smaller the index in the ordered array, more center the node will be placed. If `sortBy` is undefined, the algorithm order the nodes according to their degrees |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

### Combo Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=300 alt='img' /><br />**API**：[Combo Force API](/en/docs/api/graphLayout/comboForce)<br />**Parameters**：

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| maxIteration | Number | 100 | 100 | The maximum iteration number |
| linkDistance | Number / Function | e.g. 1: 50 <br />e.g. 2:<br />d => {<br />  // d is an edge<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 10 | The edge length |
| nodeStrength | Number / Function | e.g. 1: 10 <br />e.g. 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 30;<br />} / null | 30 | The strength of node force |
| edgeStrength | Number / Function | e.g. 1: 1 <br />e.g. 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | 0.2 | The strength of edge force |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings and combo overlappings. If it is assign `true`, `preventNodeOverlap` and `preventComboOverlap` will be set to `true`. See the API of `preventNodeOverlap` and `preventComboOverlap` for more detail |
| preventNodeOverlap | Boolean | false | true | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned |
| preventComboOverlap | Boolean | false | true | Whether to prevent combo overlappings |
| collideStrength | Number | 0.1 | undefined | The unified strength of force for preventing node overlappings and combo overlappings. The range is [0, 1]. If it is not undefined, the `nodeCollideStrength` and `comboCollideStrength` will be set to the same value |
| nodeCollideStrength | Number | 0.4 | 0.5 | The strength of force for preventing node overlappings. The range is [0, 1] |
| comboCollideStrength | Number | 0.4 | 0.5 | The strength of force for preventing combo overlappings. The range is [0, 1] |
| nodeSize | Array / Number | 10 | 10 | The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /><br /> | Number / Function | e.g. 1 : 10<br />e.g. 2 : <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />Takes effect when `preventNodeOverlap` or `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| comboSpacing<br /><br /> | Number / Function | e.g. 1 : 10<br />e.g. 2 : <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | Takes effect when `preventComboOverlap` or `preventOverlap` is `true`. It is the minimum distance between combos to prevent combo overlappings. It can be a function to define different distances for different combos (example 2)<br /> |
| comboPadding<br /><br /> | Number / Function | e.g. 1 : 10<br />e.g. 2 : <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | The padding value inside each combo. It is not about rendering, only used for force calculation<br /> |
| alphaDecay | Number | 0.03 | 0.028 | The decay ratio of alpha for convergence. The range is [0, 1]. 0.028 corresponds to 300 iterations |
| alphaMin | Number | 0.03 | 0.001 | The threshold to stop the iteration |
| alpha | Number | 0.1 | 1 | The current alpha of convergence |
| onTick | Function |  | {} | The callback function of each iteration |
| onLayoutEnd | Function |  | {} | The callback function after layout |
| gravity | Number |  | 10 | The gravity, which will affect the compactness of the layout |
| comboGravity | Number |  | 30 | The gravity of each combo, which will affect the compactness of each combo |
| optimizeRangeFactor | Number |  | 1 | When the distance between two nodes is larger than `optimizeRangeFactor * width`, the forces between them will not be calculated any more. A proper value for `optimizeRangeFactor` will lead to less calculation to optimize the performance of the layout |
| depthAttractiveForceScale | Number |  | 0.5 | The scale for adjusting the strength of attractive force between nodes with different depths. The range is [0, 1]. Lager the depth difference, smaller the attractive force strength |
| depthRepulsiveForceScale | Number |  | 2 | The scale for adjusting the strength of repulsive force between nodes with different depths. The range is [1, Infinity]. Lager the depth difference, larger the attractive force strength |
| velocityDecay | Number | 0.2 | 0.6 | The decay speed of the moving velocity of nodes for each iteration |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |
