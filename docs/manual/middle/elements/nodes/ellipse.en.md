---
title: Ellipse
order: 3
---

A built-in node Ellipse has the default style as below, the label is drawed on the center of it.


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-K6wTriSnY8AAAAAAAAAAABkARQnAQ' width=100/>


## Usage
As stated in [Built-in Nodes](../defaultNode) , there are two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'ellipse'` in the `defaultNode` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'ellipse', // The type of the node
    // ... Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different nodes with different attributes, you can write the attributes into the node data.
```javascript
const data = {
  nodes: [{
	  id: 'node0',
    shape: 'ellipse', // The tyep of the node
    //... // Other configurations
  },
    ... // Other nodes
  ],
  edges: [
    ... // edges
  ]
}
```


## Attribute
Ellipse node has the attributes shown below. The attribute wity Object type will be described after the table:<br />

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The size of the ellipse | Number / Array | When it is a number, the ellipse looks like a circle. When it is an array, the `size[0]` is the major diameter, the `size[1]` the the minor diameter |
| style | The default style of ellipse node | Object | Correspond to the styles in Canvas |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Only takes effect on keyShape |
| linkPoints | The link points of the related edges | Object |  They are invisible by default |
| icon | The configurations of the icon on the ellipse node | Object | It is invisible by default |



### style
`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5_yzRLNA81cAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'ellipse',
    label: 'ellipse'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'ellipse',  // The shape has been assigned in the data, we do not have to define it any more
    size: [130, 80],
    style: {
      fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5
    }
  }
});
graph.data(data);
graph.render();
```


### labelCfg
`labelCfg` is an object to configure the label of the node. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SxAlT7QGURwAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // .. Other configurations for graph
  defaultNode: {
    // ... Other attributes for node
    labelCfg: {
      offset: 20,
      style: {
        fill: '#9254de',
        fontSize: 18
        // ... The style of the label
      }
    }
  }
});
// ...
```


### linkPoints
`linkPoints` is an object to configure the link points on the 「top, bottom, left, and right」.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| top | Whether show the top link point | Boolean | `false` by default |
| bottom | Whether show the bototm link point | Boolean | `false` by default |
| left | Whether show the left link point | Boolean | `false` by default |
| right | Whether show the right link point | Boolean | `false` by default |
| size | The size of the link points | Number | `3` by default |
| fill | The filling color of the link points | String | `#72CC4A` by default |
| stroke | The stroke color of the link points | String | `#72CC4A` by default |
| lineWidth | The line width of the link points | Number | `1` by default |


Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*paBYRq0PNqgAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other configurations for nodes
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff'
    }
  }
});
// ...
```


### icon
`icon` is an object to configure the icon on the node.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| show | Whether show the icon | Boolean | `false` by default |
| width | The width of the icon | Number | `16` by default |
| height | The height of the icon | Number | `16` by default |
| img | The image url of the icon | String |  |


Base on the code in [style](#style) section, we add `icon` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*992OSK65NaUAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for the graph
  defaultNode: {
    // ... Other configurations for nodes
    icon: {
      show: true
      //img: '...', The image url of the icon 
    }
  }
});
// ...
```
