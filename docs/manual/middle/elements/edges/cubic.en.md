---
title: Cubic
order: 4
---

A built-in edge Cubic has the default style as below.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rcLiTa6Ih3AAAAAAAAAAAABkARQnAQ' width=150/>


## Usage
As stated in [Built-in Edges](../defaultEdge) , there are two ways to configure the edge: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'cubic'` in the `defaultEdge` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'cubic', // The type of the edge
    // ...  Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different edges with different attributes, you can write the attributes into the edge data.
```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    shape: 'cubic',
    //... // Other configurations for edges
    style: {
      //...  // Style attributes for edges
    }
  },
    //... // Other edges
  ]
}
```


## Attribute
Cubic edge has the attributes shown below. The attributes with object type will be described in detail after the table

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |



### style
`style` is an object which is the same as the common style attribute of edge. Refer to [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge)。
The following code shows how to configure the `style` globally when instantiating a Graph.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Do6IQouIA9AAAAAAAAAAAABkARQnAQ' width=150/>
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
   shape: 'cubic',
   label: 'cubic'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'cubic',  // The shape has been assigned in the data, we do not have to define it any more
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
`labelCfg` is an object which is the same as the common attribute of edge. Refer to [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge)。
Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ySTVQ7MrMtgAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other attributes for edges
    labelCfg: {
      autoRotate: true,
      refY: 10,
      refX: 40
    }
  }
});
// ...
```
