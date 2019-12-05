---
title: Triangle
order: 5
---
## Triangle

A built-in node Triangle has the default style as below, the label is drawed on the center of it.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FY1XQZHEc6YAAAAAAAAAAABkARQnAQ' width=100/>


## Usage
As stated in [Built-in Nodes](../defaultNode) , there are two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'triangle'` in the `defaultNode` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'triangle', // The type of the node
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
    shape: 'triangle',// The tyep of the node
    //... // Other configurations
    },
    //... // Other nodes
  ],
  edges: [
    //... // edges
  ]
}
```


## Attribute
Triangle node has the attributes shown below. The spetial attribute type will be described after the table:

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The length of side of the equilateral triangle | Number | Array | When it is an array, the first value will take effect |
| **direction** | **The direction of the triangle** | **String** | **Options: `'up'`, `'down'`, `'left'`, `'right'`. `'up'` by default** |
| style | The default style of triangle node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Only takes effect on keyShape |
| linkPoints | The link points of the related edges | Object | They are invisible by default |
| icon | The configurations of the icon on the triangle node | Object | It is invisible by default |


### direction
It is a string with options: `'``up'`, `'down'`, `'left'`, and `'right'`. `'up'` by default. The following code shows how to configure the `direction` globally when instantiating a Graph.
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'triangle',
    direction: 'down'
  }
})
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HuGHTrWfGYsAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hsOBSo1sFFAAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*irgPRrU3JdEAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yxEXQK-P4nsAAAAAAAAAAABkARQnAQ' width=100/>

> The results with `'up'`, `'down'`, `'left'`, `'right'` as `direction`.



### style
`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6-qaTJkpsKYAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'triangle',
    label: 'triangle'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'triangle', // The shape has been assigned in the data, we do not have to define it any more
    direction: 'up',
    size: 100,
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
`labelCfg` is an object to configure the label of the node. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5KkKRaDXqXgAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other attributes for node
    labelCfg: {
      position: 'center',
      style: {
        fill: '#9254de',
        fontSize: 18
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
| top | Whether to show the top link point | Boolean | `false` by default |
| bottom | Whether to show the bototm link point | Boolean | `false` by default |
| left | Whether to show the left link point | Boolean | `false` by default |
| right | Whether to show the right link point | Boolean | `false` by default |
| size | The size of the link points | Number | `3` by default |
| fill | The filling color of the link points | String | `'#72CC4A'` by default |
| stroke | The stroke color of the link points | String | `'#72CC4A'` by default |
| lineWidth | The line width of the link points | Number | `1` by default |


Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aB-PT4nzU_oAAAAAAAAAAABkARQnAQ' width=100/>
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
      fill: '#fff',
      size: 5
    }
  }
});
// ...
```


### icon
`icon` is an object to configure the icon on the node.


| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| show | Whether to show the icon | Boolean | `false` by default |
| width | The width of the icon | Number | `16` by default |
| height | The height of the icon | Number | `16` by default |
| img | The image url of the icon | String | |
| **offset** | **The offset of the icon** | **Number** | **`0` by default. It is a special attribute for triangle node** |


Base on the code in [style](#style) section, we add `icon` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2w62R5ZYtVAAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
	// ... data
};
const graph = new G6.Graph({
  // ... Other configurations for the graph
  defaultNode: {
    // ... Other configurations for nodes
    icon: {
      show: true,
      width: 30,
      height: 30,
      offset: 20
      //img: '...', The image url of the icon 
    }
  }
});
// ...
```
