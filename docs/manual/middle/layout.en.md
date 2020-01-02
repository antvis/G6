---
title: Utilizing Layout
order: 7
---

## Introduction
Graph layouts are the algorithms arranging the node positions to obtain a understandable visualizaiton. According to the differences of data strucutre, the layouts can be categorized into: general graph layout and tree graph layout. There are several layout algorithms for them respectively. By utilizing the built-in layouts, [Translating the layouts and their configurations, translating the data](#layout-transformation-mechanism) can be achieved. Besides, G6 provides the web-worker for general graph layout in case layout calculation takes too long to block page interaction.

Besides, G6 supports [Custom Layout](/en/docs/manual/advanced/custom-layout) mechanism for users to design their own layout algorithm.

In fact, 'layout' is a free mechanism in G6. The built-in layouts only calculate and manipulate the `x` and `y` in node data. In other word, users can assign `x` and `y` to nodes by any other ways including the algorithms from the third-party libraries. Once G6 find the `x` and `y` information on data, it will render the graph according to it.

In this ducoment, we will introduce the layout algorithms in detail.

## G6 Layouts Overview

### Graph

- [Random Layout](#random): Randomizes the node postions;
- [Force Layout](#force): Classical force-directed layout;
- [Fruchterman Layout](#fruchterman): A kind of force-directed layout;
- [Circular Layout](#circular): Arranges the nodes on a circle;
- [Radial Layout](#radial): Arranges the nodes around a focus node radially;
- [MDS Layout](#mds): Multidemensional Scaling;
- [Dagre Layout](#dagre): Arranges the nodes hierarchically;
- [Concentric Layout](#concentric): Arranges the nodes on concentric circles;
- [Grid Layout](#grid): Arranges the nodes on grid.

### TreeGraph

- [CompactBox Layout](#compactbox);
- [Dendrogram Layout](#dendrogram): Arrange the leaves on the same level;
- [Intended Layout](#intended);
- [Mindmap Layout](#mindmap).

## Graph

### Configure the Graph
Configure `layout` to the Graph instance to assign the layout methods and their configurations. The following code assigns the layout with `type: 'force'`, which means the classical force-directed layout algorithm. The configurations `preventOverlap: true` and `nodeSize: 30` are assigned to prevent node overlappings, where the `nodeSize` is used for collide detection. More layout configurations can be found in the following sections.

```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations for the graph
  layout: {                   // Object, the layout configuration. Random layout by default
  	type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // ...                    // Other configurations for the layout
  }
});
```

Different layout algorithms have different configurations. For all the general graph layout algorithms in G6, you can enable the web-worker by configure `workerEnabled: true` in the `layout` configuration above. With web-worker, layout algorithms performed on large data with high cost will not block the web page.

When the `layout` is not assigned:

- If there is position information with `x` and `y` in node data, G6 renders the graph with them;
- If the position information does not exist in the node data, Random Layout will take effect by default.

### Layouts for Graph
General graph layout API: [General Graph Layout API](/en/docs/api/layout/Graph).

#### Random
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M5FySIdhX4oAAAAAAAAAAABkARQnAQ' width='400'/>

<br />**Description**: Randomizes the node positions.
<br />**API**: [Random API](/en/docs/api/layout/Graph#random)
<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| width | Number | 300 | The width of the graph |  |
| height | Number | 300 | The height of the graph |  |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

#### Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oDbHRJc5td8AAAAAAAAAAABkARQnAQ' width='500' />

<br /> **Description**: Classical force-directed layout algorithm.
<br /> **API**: [Force API](/en/docs/api/layout/Graph#force)
<br /> **Configuration**: Corresponds to the configurations in force-directed algorithm in d3.js

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number / Function | Example 1: `50` <br />Example 2:<br />d => {<br />  // d is an edge<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | The edge length. It can be a function to define the different edge lengths for different edges (Example 2) |
| nodeStrength | Number / Function | Example 1: `-30` <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} | null | The strength of node force. Positive value means attractive force, negative value means repulsive force (Example 2) |
| edgeStrength | Number | Example 1: 1 <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | The strength of edge force. Calculated according to the degree of nodes by default (Example 2) |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the `nodeSize` and size in data are both undefiend, `nodeSize` will be assigned to 10 by default |
| nodeSize | Array / Number | 20 | undefined | The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /><br /> | Number / Function | Example 1:  10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| alphaDecay | Number | 0.03 | 0.028 | The decay ratio of alpha for convergence. THe range is [0, 1]. 0.028 corresponds to 300 times iteration|
| alphaMin | Number | 0.03 | 0.001 | The threshold to stop the iteration |
| alpha | Number | 0.1 | 0.3 | The current alpha of convergence |
| collideStrength | Number | 0.8 | 1 | The strength of force for preventing node overlappings. The range is [0, 1] |
| forceSimulation | Object |  | null | Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect |
| onTick | Function |  | {} | The callback function of each iteration |
| onLayoutEnd | Function |  | {} | The callback function after layout |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |

#### Fruchterman

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DibyQYaI2qYAAAAAAAAAAABkARQnAQ' width='400' />

<br />**Description**: Fruchterman is a kind of force-directed layout.
<br />**API**: [Fruchterman API](/en/docs/api/layout/Graph#fruchterman)
<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| maxIteration | Number | 1000 | 1000 | The maximum interation number |
| gravity | Number | 10 | 10 | The gravity, which affects the compactness of the layout |
| speed | Number | 1 | 1 | The moving speed in each iteration. Large value might lead to violent swing |
| clustering | Boolean | false | false | Whether to layout by clustering |
| clusterGravity | Number | 30 | 10 | The gravity of each clusterm which affects the compactness of each cluster |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### Circular

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s_29Rbja9lkAAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qw1ES7nYvr8AAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mCXwQYRV8IkAAAAAAAAAAABkARQnAQ' width='200' />

<br />**Description**: Arranges the nodes on a circle.
<br />**API**: [Circular API](/en/docs/api/layout/Graph#circular)
<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| radius | Number | 50 | null | The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect. |
| startRadius | Number | 10 | null | The start radius of spiral layout |
| endRadius | Number | 100 | null | The end radius of spiral layout |
| clockwise | Boolean | true | true | Whether to layout clockwisely |
| divisions | Number | 3 | 1 | The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0` |
| ordering | String | null | 'topology' | 'degree' | null | The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order. |
| angleRatio | Number | 1 | 1 | How many 2*PIs Between the first node and the last node |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### Radial

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FZIpRKpJo_MAAAAAAAAAAABkARQnAQ' width='200' />

<br />**Description**: Arranges the nodes to concentrics centered at a focus node according to their shortest path length to the focus node.
<br />**API**: [Radial API](/en/docs/api/layout/Graph#radial)
<br />**Configuration**: 

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
| nodeSpacing<br /> | Number / Function | Example 1:  10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cFq4QbXVx7sAAAAAAAAAAABkARQnAQ' width=150/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| strictRadial | Boolean | true | false | Whether to layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`. Refer to [Radial-strictRadial API](/en/docs/api/layout/Graph/#strictradial)<br />- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely <br />- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.<br /> |
| sortBy | String | 'data' / 'cluster' | undefined | Sort the nodes of the same level. `undefined` by default, which means place the nodes with connections as close as possible; `'data'` means place the node according to the ordering in data, the closer the nodes in data ordering, the closer the nodes will be placed. `sortBy` also can be assigned to any name of property in nodes data, such as `'cluster'`, `'name'` and so on (make sure the property exists in the data) |
| sortStrength | Number | 10 | 10 | The strength to sort the nodes in the same circle. Larger number means place the nodes with smaller distance of `sortBy` more closely. Takes effect only when `sortBy` is not `undefined` |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### MDS
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6OPTT7bz5sUAAAAAAAAAAABkARQnAQ' width=400/><br />**Description**: MDS (Multidimensional scaling) is used for project high dimensional data onto low dimensional space.<br />**API**: [MDS API](/en/docs/api/layout/Graph/#mds)<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | 50 | 50 | The edge length |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### Dagre
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RQEORY5A_LoAAAAAAAAAAABkARQnAQ' width=250/><br />**Description**: An hierarchical layout.<br />**API**: [Dagre API](/en/docs/api/layout/Graph#dagre)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' / 'BT' / 'LR' / 'RL' | 'TB' | The layout direction. T: top; B: bottom; L: left; R: right |
| align | String | 'UL' / 'UR' / 'DL' / 'DR' | 'UL' | The alignment of the nodes. U: upper; D: down; L: left; R: right |
| nodesep | Number | 40 | 50 | The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes |
| ranksep | Number | 40 | 50 | The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels |
| nodesepFunc<br /><br /> | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect |
| ranksepFunc<br /><br /> | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect |
| controlPoints | Boolean | true | true | Whether to keep the control points of layout |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### Concentric
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ux0-SYBy6Y8AAAAAAAAAAABkARQnAQ' width=300/><br />Tips: Concentric layout in G6 refers to <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>, we obey the MIT license <br />**Description**: Arranges the nodes on several concentric circles.<br />**API**: [Concentric API](/en/docs/api/layout/Graph#concentric)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| nodeSize | Number | 30 | 30 | The diameter of the node. It is used for preventing node overlappings |
| minNodeSpacing | Number | 10 | 10 | The minimum separation between adjacent circles |
| preventOverlap | Boolean | false | false | Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default |
| sweep | Number | Math.PI | undefined | How many radians should be between the first and last node (defaults to full circle). If it is undefined, 2 * Math.PI * (1 - 1 / |level.nodes|) will be used, where level.nodes is nodes set of each level, |level.nodes| is the number of nodes of the level |
| equidistant | Boolean | false | false | Whether levels have an equal radial distance between them, may cause bounding box overflow |
| startAngle | Number | 3.14 | 3 / 2 * Math.PI | Where nodes start in radians |
| clockwise | Boolean | false | false | Place the nodes in clockwise or not |
| maxLevelDiff | Number | 0.5 | undefined | The sum of concentric values in each level. If it is undefined, maxValue / 4 will take place, where maxValue is the max value of ordering properties. For example, if `sortBy='degree'`, maxValue is the max degree value of all the nodes |
| sortBy | String | 'property1' / 'weight' / ... | undefined | Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree<br /> |
| workerEnabled | Boolean | true / false | false | Whether to enable the web-worker in case layout calculation takes too long to block page interaction |


#### Grid
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5U3_TZVolpEAAAAAAAAAAABkARQnAQ' width=300/><br />Tips: Concentric layout in G6 refers to <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>, we obey the MIT license.<br />**Description**: Orders the nodes according to the configurations and arranged them onto grid.<br />**API**: [Grid API](/en/docs/api/layout/Graph#grid)<br />**Configuration**: 

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


## TreeGraph
In order to handle the tree data structure, G6 extends Graph to TreeGraph. Refer to: [TreeGraph API](/en/docs/api/layout/TreeGraph). TreeGraph is appropriate for visualizing hierarchy data.

### Configure the TreeGraph
Similar to Graph, assign `layout` to Graph instance to set the layout for a TreeGraph. The [Expand/Collapse](/en/docs/manual/middle/states/defaultBehavior/#collapse-expand) behavior can be assigned to the TreeGraph by `modes`.
```javascript
const graph = new G6.TreeGraph({
    container: 'mountNode',
    modes: {
      default: [{
        // Assign the collapse/expand behavior
        type: 'collapse-expand'
      }, 'drag-canvas']
    },
    // Assign the layout
    layout: {
      type: 'dendrogram',	// Layout type
      direction: 'LR',    // Layout direction is from the left to the right. Options: 'H' / 'V' / 'LR' / 'RL' / 'TB' / 'BT'
        nodeSep: 50,			// The distance between nodes
        rankSep: 100			// The distance between adjacent levels
    }
  });
```

### Layouts for TreeGraph
#### compactBox
**Description**: CompactBox is the default layout for TreeGraph. It will consider the bounding box of each node when layout.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FltbQZAa-nMAAAAAAAAAAABkARQnAQ' width=400/><br />**API**: [CompactBox API](/en/docs/api/layout/TreeGraph/#compactbox)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | The direction of layout. <br />- TB —— Root is on the top, layout from the top to the bottom<br />- BT —— Root is on the bottom, layout from the bottom to the top<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SuygR5RZRH0AAAAAAAAAAABkARQnAQ' width=150/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iJPBTJkTqssAAAAAAAAAAABkARQnAQ' width=150/><br />(Left)TB. (Right)BT.<br />- LR —— Root is on the left, layout from the left to the right<br />- RL —— Root is on the right, layout from the right to the left<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YrtaQIKLC4IAAAAAAAAAAABkARQnAQ' width=150/>             <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3fJsTYzHRHcAAAAAAAAAAABkARQnAQ' width=150/> <br />(Left)LR. (Right)RL. <br />- H —— Root is on the middle, layout in horizontal symmetry.<br />- V —— Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*812BT4Ep15MAAAAAAAAAAABkARQnAQ' width=150/>          <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GXdZSIBOllsAAAAAAAAAAABkARQnAQ' width=150/><br />> (Left)H. (Right)V. |
| getId | Function | (d) => {<br />  // d is a node<br />  return d.id + 'node';<br />} | undefined | Sets the id for each node |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | he width of each node |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | undefined | The vertical separation of nodes |
| getHGap | Function | (d) => {<br />// d is a node<br />  return 50;<br />} | undefined | The horizontal separation of nodes |
| radial | Boolean | true | false | If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0plfTrg12FkAAAAAAAAAAABkARQnAQ' width=150/> |


#### dendrogram
**Description**: Arranges all the leaves on the same level. It is appropriate for hierarchical clustering. It does not consider the node size, which will be regarded as 1 px.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XehWSKAWdrwAAAAAAAAAAABkARQnAQ' width=300/><br />**API**: [Dendrogram API](/en/docs/api/layout/TreeGraph/#dendrogram)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | The direction of layout. <br />- TB —— Root is on the top, layout from the top to the bottom<br />- BT —— Root is on the bottom, layout from the bottom to the top<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CN4JRZ-ws8EAAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r0c_ToY56xkAAAAAAAAAAABkARQnAQ' width=150/><br />> (Left)TB. (Right)BT. <br />- LR —— Root is on the left, layout from the left to the right<br />- RL —— Root is on the right, layout from the right to the left<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fvNVS73Mk40AAAAAAAAAAABkARQnAQ' width=70/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZfGGSoyO6UoAAAAAAAAAAABkARQnAQ' width=70/><br />> (Left)LR. (Right)RL. <br />- H —— Root is on the middle, layout in horizontal symmetry.<br />- V —— Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lVDyTKOI8o4AAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N_MmT7ZT1PIAAAAAAAAAAABkARQnAQ' width=150/><br />> (Left)H. (Right)V. |
| nodeSep | Number | 50 | 0 | Node separation |
| rankSep | Number | 100 | 0 | Level separation |
| radial | Boolean | true | false | Wheter layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`: <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2WUNTb6kp3MAAAAAAAAAAABkARQnAQ' width=150/> |


#### indented
**Description**: Indented layout represents the hierarchy by indent between them. Each node will take a row/column. It is appropriate for file directory.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zuBlR4oBIE0AAAAAAAAAAABkARQnAQ' width=150/>

**API**: [Indented API](/en/docs/api/layout/TreeGraph/#indented)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' / 'RL' / 'H' | 'LR' | layout direction<br />'LR' ——  Root is on the left, layout from the left to the right(left image below)<br />'RL' —— Root is on the right, layout from the right to the left(center image below)<br />'H' —— Root is on the middle, layout in horizontal symmetry(right image below)<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Hn9wT6j1tEMAAAAAAAAAAABkARQnAQ' alt='indented1' width='80' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dXx3QrjSsgsAAAAAAAAAAABkARQnAQ' alt='indented2' width='60' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ULkFQqi04moAAAAAAAAAAABkARQnAQ' alt='indented3' width='120' /> |
| indent | Number | 80 | 20 | Colunm separation |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | The width of each node |
| getSide | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} | undefined | The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it |


#### mindmap
**Description**: Mindmap arranged the nodes with same depth on the same level. Different from compactBox, it does not consider the size of nodes while doing layout.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sRi6Q6Qrm-oAAAAAAAAAAABkARQnAQ' width=400/><br />**API**: [Mindmap API](/en/docs/api/layout/TreeGraph/#mindmap)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'H' / 'V' | 'H' | layout direction<br />- H: Root is on the middle, layout in horizontal symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EXdUT4xCVV4AAAAAAAAAAABkARQnAQ' width=150/><br />- V: Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yOpETr8s_-kAAAAAAAAAAABkARQnAQ' width=150/> |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | The width of each node |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | 18 | The vertical separation of nodes |
| getHGap | Function | (d) => {<br />  // d is a node<br />  return 50;<br />} | 18 | The horizontal separation of nodes |
| getSide | String | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} / 'right' | The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it |


## Layout Transformation Mechanism
G6 provides two layout transformations: 

- `updateLayout(params)`: Layout methods and configurations transformation;
- `changeData()`: Data transformation.

### Layout Methods and Configuration Transformation
**Interface Definition:**
```javascript
/**
 * Change the layout or its configurations
 * @param {String | object} cfg New layout configurations
 * If the cfg is a String or an object with the property type, and the type is different from the current layout method, the layout method will be changed into the new one;
 * Only change the configurations for the current layout otherwise
 */
updateLayout(cfg);
```

**Change the Layout Method:** <br />If the `cfg` is a `String` or an object with property `type`, and the type is different from the current layout method, the layout method will be changed into the new one;

**Change the Configurations Only:** <br />If the `cfg` is an object without property `type`, or the `type` is the same as the current layout method, only the configurations for the current layout will be changed.

### Data Transformation
**Interface Definition:**
```javascript
/**
 * Change the source data, render the graph with new data
 * @param {object} data source data
 * @return {object} this
 */
changeData(data);
```

### Transformation Example
#### Expected Effect
In the first stage, the graph is arranged by random layout. Transform to force layout with node overlappings after 2000ms, force layout without node overlappings after 4000ms, change data to `data2` after 6000ms.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6k-iQ405hEEAAAAAAAAAAABkARQnAQ' width=600/>
#### Complete Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tutorial Layout Demo</title>
</head>
<body>
    <div id="mountNode"></div>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
    <script>
      const data = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' }
        ], edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' },
          { source: '1', target: '2' },
          { source: '1', target: '3' }
        ]
      };

      const data2 = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' }
        ], edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' }
        ]
      };

      const graph = new G6.Graph({
        container: 'mountNode',  // String | HTMLElement, Required, the id of the container or the container object
        width: 300,              // Number, Required, The width of the graph
        height: 300,             // Number, Required, The height of the graph
        animate: true            // Boolean, whether to activate the animation while changing the layout
      });

      // Load data and render
      graph.data(data);
      graph.render();

      // Transform to force layout with node overlappings in 2000 ms
      setTimeout(() => {
        graph.updateLayout('force');
      }, 8000);

      // Transform to force layout without node overlappings in 4000 ms
      setTimeout(() => {
        graph.updateLayout({
          type: 'force',               // Layout name
          preventOverlap: true,        // Whether to prevent the node overlappings
          nodeSize: 40,                // The node size for collide detection
          linkDistance: 100            // The edge length
        });
      }, 10000);

      // Change the data to data2 in 6000 ms
      setTimeout(() => {
        graph.changeData(data2);
      }, 12000);
		</script>
	</body>
</html>
```

## Subgraph Layout

At present, the subgraph layout mechanism is independent to the graph layout. You can instantiate the layout method and load the data of subgraph onto the layout instance. This mechanism allows users to utilize G6's layout algorithms to calculate the node positions, and render the graph with another rendering engine.

### Usage
```javascript
// Instantiate the Layout
const subgraphLayout = new G6.Layout['force']({
  center: [ 500, 450 ]
});

// Initialize the layout with sugbraph data
subgraphLayout.init({
  'nodes': subGraphNodes,
  'edges': subGraphEdges
});

// Execute the layout
subgraphLayout.execute();

// Update the node positions after subgraph layout
graph.positionsAnimate();
```
