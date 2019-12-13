---
title: Arc
order: 5
---

A built-in edge Arc has the default style as below.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9JBjS6bdrHMAAAAAAAAAAABkARQnAQ' width=150/>


## Usage
As stated in [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) , there are two ways to configure the edge: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'arc'` in the `defaultEdge` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'arc', // The type of the edge
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
    target: 'node1'
    shape: 'arc',
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
Arc edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below, where `curveOffset` is the special property for arc edge , controlling the size and the bending direction of the arc.

```javascript
color: '#87e8de',
curveOffset: 20,  // The distance between the center of the two endpoints and the center of the arc
style: {
  lineWidth: 2,
  stroke: '#87e8de'
},
label: 'Text of the label',
labelCfg: {
  refX: 10,  // x offset of the label
  refY: 10,  // y offset of the label
  style: {
    fill: '#595959'
  }
}
```

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| **curveOffset** | **The distance between the center of the two endpoints and the center of the arc** | **Number** | **The absolute value of `curveOffset` is the size of the arc, the sign of `curveOffset` is the bending direction of the arc. `20` by default. It is the special property for arc edge** |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |



### Special Property: curveOffset
`curveOffset` is the special property for arc edge, which controlls the size and the bending direction of the arc. The following code shows how to configure the `curveOffset` globally when instantiating a Graph.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*63NxRppr3tUAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  nodes: [{
    id: 'node0',
    x: 100,
    y: 100,
    size: 20
 },{
    id: 'node1',
    x: 200,
    y: 200,
    size: 20
 }],
 edges: [{
   source: 'node0',
   target: 'node1',
   shape: 'arc',
   label: 'arc'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  linkCenter: true,
  defaultEdge: {
    // shape: 'arc', // The shape has been assigned in the data, we do not have to define it any more
    curveOffset: -80
  }
})
graph.data(data);
graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> <br /> `linkCenter: true` is assigned to the graph in the code above to ensure the arc edges link to the center of their end nodes.


### style
`style` is an object which is the same as the [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style).
Base on the code in [curveOffset](#special-property-curveoffset) section, we add `style` to `defaultEdge`.
<br />!
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LH4lT64i304AAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    style: {
      stroke: '#088',
      lineWidth: 3
    }
  }
});
// ...
```


### labelCfg
`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg).
Base on the code in [Special Property: curveOffset](#special-property-curveoffset) section, we add `labelCfg` to `defaultEdge`.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xu0FSKNxQNUAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
      autoRotate: true,
      refY: -30,
      refX: 30
    }
  }
});
// ...
```
