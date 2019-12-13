---
title: Loop
order: 6
---

A built-in edge Line has the default style as below.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sPBIR40KLOkAAAAAAAAAAABkARQnAQ' width=100/>

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> <br />loop edge is appropriate for the self-loop edges whose target node and the source node are the same. In other words, a loop edge connect a node to itself. There will be a strange result if the loop edge is applied to the edge which is not a self-loop.
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JgYrTabHWskAAAAAAAAAAABkARQnAQ' width='75' height='176' />

## Usage
As stated in [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) , there are two ways to configure the edge: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'cubic'` in the `defaultEdge` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'loop', // The type of the edge
    // ...  Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different edges with different properties, you can write the properties into the edge data.
```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node0'
    shape: 'loop',
    //... // Other configurations for edges
    style: {
      //...  // Style properties for edges
    }
  },
    //... // Other edges
  ]
}
```


## Property
Loop edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below. The properties with object type will be described in detail after the table, where `loopCfg` is the special property for loop edge.

loop 边支持以下的配置项，对于 Object 类型的配置项将在后面有详细讲解：

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| **loopCfg** | **Special property for loop edge** | **Object** |  |



### style
`style` is an object which is the same as the [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style).
The following code shows how to configure the `style` globally when instantiating a Graph.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dAV3QIY2ZxkAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    id: 'node0',
    x: 100,
    y: 100,
    size: 20
 }],
 edges: [{
   source: 'node0',
   target: 'node0',
   shape: 'loop',
   label: 'loop'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'loop',  // The shape has been assigned in the data, we do not have to define it any more
    style: {
      endArrow: true,
      stroke: '#088',
      lineWidth: 3
    }
  }
})
graph.data(data);
graph.render();

```


### labelCfg
`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg).
Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6hcBSId1XzAAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
      refY: -5,
      refX: 30
    }
  }
});
// ...
```


### loopCfg
`loopCfg` is an object that configures the direction, height, and clockwise.

- `position`: The relative position to the source/target node. Options: `top`, `top-right`, `right`,`bottom-right`, `bottom`, `bottom-left`, `left`, `top-left`. `top` by default.
- `dist`: The distance between the keyShape of the source/target node to the highest position of the loop. It is equal to the height of the source/target node by default.
- `clockwise`: Whether to draw the loop clockwisely. `true` by default

Base on the code in [style](#style) section, we add `loopCfg` to `defaultEdge`.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9dwTZvACcEAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    loopCfg: {
      position: 'left',
      dist: 100,
      clockwise: false
    }
  }
});
// ...
```
