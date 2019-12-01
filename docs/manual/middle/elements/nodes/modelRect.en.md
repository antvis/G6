---
title: ModelRect
order: 8
---

A built-in node modelRect has the default style as below, the label is drawed on the center of it.
<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XZiKQbvTSS0AAAAAAAAAAABkARQnAQ' width='223' height='102' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tCcvRrNkAgUAAAAAAAAAAABkARQnAQ' width='223' height='98' />


<br />**Tips：** There will be no description when there is no `description` in the data.


## Usage
As stated in [Built-in Nodes](../defaultNode) , there are two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` to `'modelRect'` in the `defaultNode` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'modelRect',
    // Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different nodes with different attributes, you can write the attributes into the node data.
```javascript
const data = {
  nodes: [{
	  id: 'node0',
    shape: 'modelRect',
    ... // Other configurations
    },
    ... // Other nodes
  ],
  edges: [
    ... // edges
  ]
}
```


## Attribute
ModelRect node has the attributes shown below. The attribute with Object type will be described after the table:

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The size of the modelRect node | Number | Array |  |
| style | The default style of modelRect node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Only takes effect on keyShape |
| linkPoints | The link points of the related edges | Object | They are invisible by default |
| **preRect** | **Left rect of the node** | **Object** | **Special attribute for modelRect** |
| **logoIcon** | **The left logo icon** | **Object** | **Special attribute for modelRect** |
| **stateIcon** | **The right state icon** | **Object** | **Special attribute for modelRect** |


```javascript
    // The configuration of the logo icon in the node
    logoIcon: {
      // Whether show the icon. false means hide the icon
      show: true,
      x: 0,
      y: 0,
      // the image url of icon
      img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
      width: 16,
      height: 16,
      // Adjust the left/right offset of the icon
      offset: 0
    },
    // The configuration of the state icon in the node
    stateIcon: {
      // Whether show the icon. false means hide the icon
      show: true,
      x: 0,
      y: 0,
      // the image url of icon
      img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
      width: 16,
      height: 16,
      // Adjust the left/right offset of the icon
      offset: -5
    }
```


### style
`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJeKS59n4FAAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'modelRect',
    label: 'modelRect'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'modelRect',  // The shape has been assigned in the data, we do not have to define it any more
    size: [200, 80],
    style: {
      fill: '#f0f5ff',
      stroke: '#adc6ff',
      lineWidth: 2
    }
  }
});
graph.data(data);
graph.render();
```


### labelCfg
`labelCfg` is an object to configure the label of the node. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x_XKQq4m3IkAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other attributes for node
    labelCfg: {
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
| top | Whether show the top link point | Boolean | `false` by default |
| bottom | Whether show the bototm link point | Boolean | `false` by default |
| left | Whether show the left link point | Boolean | `false` by default |
| right | Whether show the right link point | Boolean | `false` by default |
| size | The size of the link points | Number | `3` by default |
| fill | The filling color of the link points | String | `'#72CC4A'` by default |
| stroke | The stroke color of the link points | String | `'#72CC4A'` by default |
| lineWidth | The line width of the link points | Number | `1` by default |


Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Tp2WQ70bCGgAAAAAAAAAAABkARQnAQ' width=150/>
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


### preRect
`preRect` configures the left rect of the rectModel node.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| show | Whether show the left rect | Boolean | `true` by default |
| width | The width of the left rect | Number | `4` by default |
| fill | The filling color the the left rect | String | `'#40a9ff'` by default |
| radius | The border radius of the left rect | Number | `2` by default |


Base on the code in [style](#style) section, we add `icon` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yh43Sa3LeVcAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for the graph
  defaultNode: {
    // ... Other configurations for nodes
    preRect: {
      // false means hiding it
      show: true,
      fill: '#f759ab',
      width: 8
    },
  }
});
// ...
```


### logoIcon / stateIcon
`logoIcon` and `stateIcon` configure the left and right logo of the modelRect node. The configurations of them are the same.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| show | Whether show the icon | Boolean | `true` by default |
| img | The url of the icon image | String | <br />- The default image for `logoIcon` is <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KpqSS4INnRUAAAAAAAAAAABkARQnAQ' width=25/><br />- The default image for  `stateIcon` is <img src='https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg' width=25/><br /> |
| width | The width of the icon | Number | `16` by default |
| height | The height of the icon | Number | `16` by default |
| offset | Adjust the left/right offset of the icon | Number | <br />- The dfualt `offset` of the left `logoIcon` is `0`<br />- The dfualt `offset` of the  right `stateIcon` is `-5`<br /> |


Base on the code in [style](#style) section, we add `logoIcon` and `stateIcon` to `defaultNode` to hide the left icon and change the image for right icon.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pBsqR7McSiYAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for the graph
  defaultNode: {
    // ... Other configurations for nodes
    logoIcon: {
      show: false
    },
    stateIcon: {
      show: true,
      img: 'https://gw.alipayobjects.com/zos/basement_prod/c781088a-c635-452a-940c-0173663456d4.svg'
    }
  }
});
// ...
```
