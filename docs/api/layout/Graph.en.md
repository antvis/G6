---
title: Graph Layout
order: 1
---
## Random

Random is the default layout in G6. It will take effect when `layout` is not assigned to the Graph instance and there is no position information in node data.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G5_uRodUTaYAAAAAAAAAAABkARQnAQ' width=430 />

### Configuration
#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

#### width
**Type**: Number<br />**Default**: The width of the graph<br />**Required**: false<br />**Description**: The width of the layout

#### height
**Type**: Number<br />**Default**: The height of the graph<br />**Required**: false<br />**Description**: The height of the layout

#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.

### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'random',
    width: 300,
    height: 300
  }
});
```

## MDS

MDS (Multidimensional scaling) is used for project high dimensional data onto low dimensional space.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aUS7TJR2NHcAAAAAAAAAAABkARQnAQ' width=600 />

### Configuration
#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

#### linkDistance
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length

#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.

### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'mds',
    workerEnabled: true       // Whether to activate web-worker
  }
});
```

## Force

Force is the classical force-dicrected layout algorithm, which corresponds to force-directed layout in d3.js.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Nt45Q6nnK2wAAAAAAAAAAABkARQnAQ' width=600 />

### Configuration

#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout


#### linkDistance
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length


#### nodeStrength
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of node force. Positive value means attractive force, negative value means repulsive force


#### edgeStrength
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of edge force. Calculated according to the degree of nodes by default


#### preventOverlap
**Type**: Number<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned.

#### collideStrength
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The strength of force for preventing node overlappings. The range is [0, 1]


#### nodeSize
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default

#### nodeSpacing
**Type**: Number / Function
<br />**Default**: 0
<br />**Required**: false 
<br />**Example**: Example 1:  10
<br />Example 2:  

```javascript
d => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
}
```

<br />**Description**: 
Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)

#### alpha
**Type**: Number<br />**Default**: 0.3<br />**Required**: false<br />**Description**: The current alpha of convergence


#### alphaDecay
**Type**: Number<br />**Default**: 0.028<br />**Required**: false<br />**Description**: The decay ratio of alpha for convergence. The range is [0, 1]. 0.028 corresponds to 300 iterations


#### alphaMin
**Type**: Number<br />**Default**: 0.001<br />**Required**: false<br />**Description**: The threshold to stop the iteration


#### forceSimulation
**Type**: Object<br />**Default**: null<br />**Required**: false<br />**Description**: Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect


#### onTick
**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function of each iteration


#### onLayoutEnd
**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
    center: [ 200, 200 ],     // The center of the graph by default
    linkDistance: 50,         // Edge length
    nodeStrength: 30,
    edgeStrength: 0.1,
    collideStrength: 0.8,
    nodeSize: 30,
    alpha: 0.3,
    alphaDecay: 0.028,
    alphaMin: 0.01,
    forceSimulation: null,
    onTick: () => {
      console.log('ticking');
    },
    onLayoutEnd: () => {
      console.log('force layout done');
    }
  }
});
```

## Fruchterman

Fruchterman is a kind of force-directed layout. G6 implements it according to the paper
<a href='http://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf' target='_blank'>Graph Drawing by Force-directed Placement</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jK3ITYqVJnQAAAAAAAAAAABkARQnAQ' width=600 />

### Configuration

#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout


#### maxIteration
**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The maximum iteration number


#### gravity
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity, which will affect the compactness of the layout


#### speed
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The moving speed of each iteraction. Large value of the speed might lead to violent swing


#### clustering
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to layout by cluster


#### clusterGravity
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity of each cluster, which will affect the compactness of each cluster. Takes effect only when `clustering` is `true`


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'fruchterman',
    center: [ 200, 200 ],     // The center of the graph by default
    gravity: 20,
    speed: 2,
    clustering: true,
    clusterGravity: 30,
    maxIteration: 2000,
    workerEnabled: true       // Whether to activate web-worker
  }
});
```

## Circular

Circular layout arranges the node on a circle. By tuning the configurations, user can adjust the node ordering method, division number, radial layout, and so on. G6 implements it according to the paper: 
<a href='https://www.sciencedirect.com/science/article/pii/S1570866705000031' target='_blank'>A framework and algorithms for circular drawings of graphs</a>.

 <br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-3idTK1xa6wAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_nLORItzM5QAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6J6BRIjmXKAAAAAAAAAAAABkARQnAQ' width=270 />


### Configuration

#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout


#### radius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect.


#### startRadius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The start radius of spiral layout


#### endRadius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The end radius of spiral layout


#### clockwise
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout clockwisely


#### divisions
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0`


#### ordering
**Type**: String<br />**Default**: false<br />**Options**: null | 'topology' | 'degree'<br />**Required**: false<br />**Description**: The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order.


#### angleRatio
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: How many 2*PIs Between the first node and the last node


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'circular',
    center: [ 200, 200 ],  // The center of the graph by default
    radius: null,
    startRadius: 10,
    endRadius: 100,
    clockwise: false,
    divisions: 5,
    ordering: 'degree',
    angleRatio: 1
  }
});
```

## Radial

Radial layout arranges the nodes to concentrics centered at a focus node according to their shortest path length to the focus node. G6 implements it according to the paper: 
<a href='http://emis.ams.org/journals/JGAA/accepted/2011/BrandesPich2011.15.1.pdf' target='_blank'>More Flexible Radial Layout</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GAFjRJeAoAsAAAAAAAAAAABkARQnAQ' width=450 />

### Configuration

#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout.


#### linkDistance
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length.


#### maxIteration
**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max iteration number.


#### focusNode
**Type**: String | Object<br />**Default**: null<br />**Required**: false<br />**Description**: The focus node of the radial layout. The first node of the data is the default value. It can be the id of a node or the node item.


#### unitRadius
**Type**: Number<br />**Default**: 100<br />**Required**: false<br />**Description**: The separation between adjacent circles. If `unitRadius` is not assigned, the layout will fill the canvas automatically.


#### preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned.


#### nodeSize
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings


#### nodeSpacing
**Type**: Number / Function
<br />**Default**: 0
<br />**Required**: false 
<br />**Example**: Example 1:  10
<br />Example 2:  

```javascript
d => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
}
```

<br />**Description**: 
Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)


#### maxPreventOverlapIteration
**Type**: Number<br />**Default**: 200<br />**Required**: false<br />**Description**: The maximum iteration number of preventing node overlappings


#### strictRadial
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`

- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely
- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 />

> （Left）preventOverlap = false.（Center）preventOverlap = false, strictRadial = true. (Right)preventOverlap = false, strictRadial = false.



#### sortBy
**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: Sort the nodes of the same level. `undefined` by default, which means place the nodes with connections as close as possible; `'data'` means place the node according to the ordering in data, the closer the nodes in data ordering, the closer the nodes will be placed. `sortBy` also can be assigned to any name of property in nodes data, such as `'cluster'`, `'name'` and so on (make sure the property exists in the data)



#### sortStrength
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The strength to sort the nodes in the same circle. Larger number means place the nodes with smaller distance of `sortBy` more closely. Takes effect only when `sortBy` is not `undefined`


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'radial',
    center: [ 200, 200 ],     // The center of the graph by default
    linkDistance: 50,         // The edge length
    maxIteration: 1000,
    focusNode: 'node11',
    unitRadius: 100,
    preventOverlap: true,     // nodeSize or size in data is required for preventOverlap: true
    nodeSize: 30,
    strictRadial: false,
    workerEnabled: true       // Whether to activate web-worker
  }
});
```

## Dagre

Dagre is an hierarchical layout.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=600 />

### Configuration

#### rankdir
**Type**: String<br />**Options**: 'TB' | 'BT' | 'LR' | 'RL'<br />**Default**: 'TB'<br />**Required**: false<br />**Description**: The layout direction. T:top; B:bottom; L:left; R:right.

- 'TB':Layout the graph from the top to the bottom;
- 'BT':Layout the graph from the bottom to the top;
- 'LR':Layout the graph from the top left the right;
- 'RL':Layout the graph from the top right the left.

<br />


#### align
**Type**: String<br />**Options**: 'UL' | 'UR' | 'DL' | 'DR'<br />**Default**: 'UL'<br />**Required**: false<br />**Description**: The alignment of the nodes. U: upper; D: down; L: left; R: right

- 'UL': aligns the nodes to the upper left;
- 'UR': aligns the nodes to the upper right;
- 'DL': aligns the nodes to the down left;
- 'DR': aligns the nodes to the upper right.


#### nodesep
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes


#### ranksep
**Type**: Function<br />**Default**: undefined<br />**Required**: false<br />**Description**: The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels


#### nodesepFunc
**Type**: Function<br />**Default**: undefined<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100
  return 10;
}
```
<br />**Required**: false<br />**Description**: The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect


#### ranksepFunc
**Type**: Number<br />**Default**: 50<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100
  return 10;
}
```
<br />**Required**: false<br />**Description**: The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect


#### controlPoints
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to keep the control points of layout


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'dagre',
    rankdir: 'LR',           // The center of the graph by default
    align: 'DL',
    nodesep: 20,
    ranksep: 50,
    controlPoints: true
  }
});
```

## Concentric

Concentric arranges the nodes on several concentric circles. By tuning the parameters, users could order the nodes according to some property of node data, degree by default. Larger the value, more center the node will be placed.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QpyPTbBpO2AAAAAAAAAAAABkARQnAQ' width=600 />


### Configuration

#### center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout


#### preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default


#### nodeSize
**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings


#### minNodeSpacing
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The minimum separation between adjacent circles


#### sweep
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**:  How many radians should be between the first and last node (defaults to full circle). If it is undefined, 2 * Math.PI * (1 - 1 / |level.nodes|) will be used, where level.nodes is nodes set of each level, |level.nodes| is the number of nodes of the level


#### equidistant
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether levels have an equal radial distance between them, may cause bounding box overflow


#### startAngle
**Type**: Number<br />**Default**: 3 / 2 * Math.PI<br />**Required**: false<br />**Description**: Where nodes start in radians


#### clockwise
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Place the nodes in clockwise or not


#### maxLevelDiff
**Type**: Number<br />**默认值:**undefined<br />**Required**: false<br />**Description**: The sum of concentric values in each level. If it is undefined, maxValue / 4 will take place, where maxValue is the max value of ordering properties. For example, if `sortBy` is `'degree'`, maxValue is the max degree value of all the nodes


#### sortBy
**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'concentric',
    center: [ 200, 200 ],     // The center of the graph by default
    linkDistance: 50,         // The edge length
    preventOverlap: true,     // nodeSize or size in data is required for preventOverlap: true
    nodeSize: 30,
    sweep: 10,
    equidistant: false,
    startAngle: 0,
    clockwise: false,
    maxLevelDiff: 10,
    sortBy: 'degree',
    workerEnabled: true       // Whether to activate web-worker
  }
});
```

## Grid

Grid orders the nodes according to the configurations and arranged them onto grid.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Oh6mRLVEBBIAAAAAAAAAAABkARQnAQ' width=650 />

### Configuration

#### begin
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: [ 0, 0 ]<br />**Required**: false<br />**Description**: The place where the grid begin (left top)


#### preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default


#### nodeSize
**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings.


#### preventOverlapPadding
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The minimum padding between nodes to prevent node overlappings. Takes effect when `preventOverlap` is `true`


#### condense
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheter to utilize the minimum space of the canvas. `false` means utilizing the full space, `true` means utilizing the minimum space.


#### rows
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The row number of the grid. If `rows` is undefined, the algorithm will calculate it according to the space and node numbers automatically


#### cols
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The column number of the grid. If `cols` is undefined, the algorithm will calculate it according to the space and node numbers automatically


#### sortBy
**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: The ordering method for nodes. Smaller the index in the ordered array, more center the node will be placed. If `sortBy` is undefined, the algorithm order the nodes according to their degrees


#### workerEnabled
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction


### Function
The same as the superclass Layout, users do not need to concern about the function calling, which will be controlled by G6.


### Usage
Configure `layout` to the graph instance. If `layout` is not configured and there is no position information in node data, Random layout will take effect.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'grid',
    begin: [ 0, 0 ],
    preventOverlap: true,     // nodeSize or size in data is required for preventOverlap: true
    preventOverlapPdding: 20,
    nodeSize: 30,
    condense: false,
    rows: 5,
    cols: 5,
    sortBy: 'degree'
  }
});
```
