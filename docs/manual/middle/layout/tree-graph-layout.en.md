---
title: TreeGraph Layout
order: 1
---

## Introduction

Graph layouts are the algorithms arranging the node positions to obtain a understandable visualizaiton. According to the differences of data strucutre, the layouts can be categorized into: general graph layout and tree graph layout. There are several layout algorithms for them respectively. By utilizing the built-in layouts, [Translating the layouts and their configurations, translating the data](#layout-transformation-mechanism) can be achieved. Besides, G6 provides the [Web-Worker](#web-worker) for general graph layout in case layout calculation takes too long to block page interaction.

Besides, G6 supports [Custom Layout](/en/docs/manual/advanced/custom-layout) mechanism for users to design their own layout algorithm.

In fact, 'layout' is a free mechanism in G6. The built-in layouts only calculate and manipulate the `x` and `y` in node data. In other word, users can assign `x` and `y` to nodes by any other ways including the algorithms from the third-party libraries. Once G6 find the `x` and `y` information on data, it will render the graph according to it.

In order to handle the tree data structure, G6 extends Graph to TreeGraph. Refer to: [TreeGraph API](/en/docs/api/layout/TreeGraph). TreeGraph is appropriate for visualizing hierarchy data. In this ducoment, we will introduce the TreeGraph layout algorithms in detail.

## TreeGraph Layouts Overview

- [CompactBox Layout](#compactbox);
- [Dendrogram Layout](#dendrogram): Arrange the leaves on the same level;
- [Intended Layout](#intended);
- [Mindmap Layout](#mindmap).


## Configure the TreeGraph

Similar to Graph, assign `layout` to Graph instance to set the layout for a TreeGraph. The [Expand/Collapse](/en/docs/manual/middle/states/defaultBehavior/#collapse-expand) behavior can be assigned to the TreeGraph by `modes`.

```javascript
const graph = new G6.TreeGraph({
  container: 'mountNode',
  modes: {
    default: [
      {
        // Assign the collapse/expand behavior
        type: 'collapse-expand',
      },
      'drag-canvas',
    ],
  },
  // Assign the layout
  layout: {
    type: 'dendrogram', // Layout type
    direction: 'LR', // Layout direction is from the left to the right. Options: 'H' / 'V' / 'LR' / 'RL' / 'TB' / 'BT'
    nodeSep: 50, // The distance between nodes
    rankSep: 100, // The distance between adjacent levels
  },
});
```

## Layouts for TreeGraph

### compactBox

**Description**: CompactBox is the default layout for TreeGraph. It will consider the bounding box of each node when layout.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FltbQZAa-nMAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**API**: [CompactBox API](/en/docs/api/layout/TreeGraph/#compactbox)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | The direction of layout. <br />- TB —— Root is on the top, layout from the top to the bottom<br />- BT —— Root is on the bottom, layout from the bottom to the top<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SuygR5RZRH0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iJPBTJkTqssAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />(Left)TB. (Right)BT.<br />- LR —— Root is on the left, layout from the left to the right<br />- RL —— Root is on the right, layout from the right to the left<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YrtaQIKLC4IAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>             <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3fJsTYzHRHcAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> <br />(Left)LR. (Right)RL. <br />- H —— Root is on the middle, layout in horizontal symmetry.<br />- V —— Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*812BT4Ep15MAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>          <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GXdZSIBOllsAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> (Left)H. (Right)V. |
| getId | Function | (d) => {<br />  // d is a node<br />  return d.id + 'node';<br />} | undefined | Sets the id for each node |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | he width of each node |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | undefined | The vertical separation of nodes |
| getHGap | Function | (d) => {<br />// d is a node<br />  return 50;<br />} | undefined | The horizontal separation of nodes |
| radial | Boolean | true | false | If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0plfTrg12FkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

### dendrogram

**Description**: Arranges all the leaves on the same level. It is appropriate for hierarchical clustering. It does not consider the node size, which will be regarded as 1 px.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XehWSKAWdrwAAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />**API**: [Dendrogram API](/en/docs/api/layout/TreeGraph/#dendrogram)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | The direction of layout. <br />- TB —— Root is on the top, layout from the top to the bottom<br />- BT —— Root is on the bottom, layout from the bottom to the top<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CN4JRZ-ws8EAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r0c_ToY56xkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> (Left)TB. (Right)BT. <br />- LR —— Root is on the left, layout from the left to the right<br />- RL —— Root is on the right, layout from the right to the left<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fvNVS73Mk40AAAAAAAAAAABkARQnAQ' width=70 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZfGGSoyO6UoAAAAAAAAAAABkARQnAQ' width=70 alt='img'/><br />> (Left)LR. (Right)RL. <br />- H —— Root is on the middle, layout in horizontal symmetry.<br />- V —— Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lVDyTKOI8o4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N_MmT7ZT1PIAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> (Left)H. (Right)V. |
| nodeSep | Number | 50 | 0 | Node separation |
| rankSep | Number | 100 | 0 | Level separation |
| radial | Boolean | true | false | Wheter layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`: <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2WUNTb6kp3MAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

### indented

**Description**: Indented layout represents the hierarchy by indent between them. Each node will take a row/column. It is appropriate for file directory.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zuBlR4oBIE0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

**API**: [Indented API](/en/docs/api/layout/TreeGraph/#indented)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' / 'RL' / 'H' | 'LR' | layout direction<br />'LR' —— Root is on the left, layout from the left to the right(left image below)<br />'RL' —— Root is on the right, layout from the right to the left(center image below)<br />'H' —— Root is on the middle, layout in horizontal symmetry(right image below)<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Hn9wT6j1tEMAAAAAAAAAAABkARQnAQ' alt='indented1' width='80' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dXx3QrjSsgsAAAAAAAAAAABkARQnAQ' alt='indented2' width='60' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ULkFQqi04moAAAAAAAAAAABkARQnAQ' alt='indented3' width='120' /> |
| indent | Number | 80 | 20 | Colunm separation |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | The width of each node |
| getSide | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} | undefined | The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it |

### mindmap

**Description**: Mindmap arranged the nodes with same depth on the same level. Different from compactBox, it does not consider the size of nodes while doing layout.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sRi6Q6Qrm-oAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**API**: [Mindmap API](/en/docs/api/layout/TreeGraph/#mindmap)<br />**Configuration**:

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'H' / 'V' | 'H' | layout direction<br />- H: Root is on the middle, layout in horizontal symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EXdUT4xCVV4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />- V: Root is on the middle, layout in vertical symmetry.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yOpETr8s_-kAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | The height of each node |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | The width of each node |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | 18 | The vertical separation of nodes |
| getHGap | Function | (d) => {<br />  // d is a node<br />  return 50;<br />} | 18 | The horizontal separation of nodes |
| getSide | String | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} / 'right' | The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it |
