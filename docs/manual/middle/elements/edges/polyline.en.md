---
title: Polyline
order: 2
---

A built-in edge Polyline has the default style as below.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aRHcQZStrPgAAAAAAAAAAABkARQnAQ' width=150/>


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
    shape: 'polyline', // The type of the edge
    // ...  Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different edges with different properties, you can write the properties into the edge data.
```javascript
const data = {
  nodes: [
    // ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    shape: 'polyline',
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
Polyline edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below. The properties with object type will be described in detail after the table

```javascript
color: '#87e8de',
style: {
  offset: 20,  // The minimum distance between the bend and the source/target node
  radius: 10,  // The border radius of the bend.
  lineWidth: 2,
  stroke: '#87e8de'
},
label: 'Label text',
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
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| **style.radius** | **The border radius of the bend** | **Number** | **It is a special property for polyline edge** |
| **style.offset** | **The minimum distance between the bend and the source/target node** | **Number** | **`5` by default. It is a special property for polyline edge** |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| controlPoints | The array of the control points for the polyline | Array | If it is not assigned, G6 will calculate it by <a href='https://yuque.alibaba-inc.com/antv/blog/polyline-edges-with-border-radius' target='_blank'>A* algorithm</a> If it is assgned, the path of the polyline will be generated according to it. e.g. `[{ x: 10, y: 20 }, { x: 20, y: 25 }, ...]` |


### style
`style` is an object. The [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style) are available for polyline edge. There are two special properties in `style` for polyline edge:

-  `radius`, he border radius of the bend;
-  `offset`, The minimum distance between the bend and the source/target node, `5` by default.

The other style properties are the same as the common style property of edge. Refer to [Built-in Edges].
The following code shows how to configure the `style` globally when instantiating a Graph.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SzMGQ70SLwEAAAAAAAAAAABkARQnAQ' width=150/>
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
   shape: 'polyline',
   label: 'polyline'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'polyline',  // The shape has been assigned in the data, we do not have to define it any more
    style: {
      radius: 10,
      offset: 10,
      stroke: 'steelblue',
      lineWidth: 5
    }
  }
})
graph.data(data);
graph.render();
```


### labelCfg
`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg).
Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HT4OTobglpoAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
    	refY: -10,
      refX: 60
    }
  }
});
// ...
```
