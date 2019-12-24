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
As stated in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) , there are two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


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
To configure different nodes with different properties, you can write the properties into the node data.
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


## Property
The [Node Common Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#common-property) are available for ModelRect node, some special properties are shown below. The property with Object type will be described after the table:

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The size of the modelRect node | Number | Array |  |
| style | The default style of modelRect node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Only takes effect on keyShape |
| linkPoints | The link points **in visual** | Object | They are invisible by default. It is usually used with the [anchorPoints](http://localhost:8000/en/docs/manual/middle/elements/nodes/defaultNode/#common-property). The differences are described in [linkPoints](#linkpoints) |
| **preRect** | **Left rect of the node** | **Object** | **Special property for modelRect** |
| **logoIcon** | **The left logo icon** | **Object** | **Special property for modelRect** |
| **stateIcon** | **The right state icon** | **Object** | **Special property for modelRect** |
| **description** | **The description text below the label** | **String** | **Special property for modelRect** |
| ~~**descriptionCfg**~~<br/>*It will be supported after V3.3* | ~~**The configuration for description text**~~ | ~~**Object**~~ | ~~**Special property for modelRect**~~ |


```javascript
    // The configuration of the logo icon in the node
    logoIcon: {
      // Whether to show the icon. false means hide the icon
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
      // Whether to show the icon. false means hide the icon
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
The [Node Common Styles](/en/docs/manual/middle/elements/nodes/defaultNode/#style) are available for Circle node.`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJeKS59n4FAAAAAAAAAAAABkARQnAQ' width=150/>
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
`labelCfg` is an object to configure the label of the node. The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x_XKQq4m3IkAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other properties for node
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


### ~~descriptionCfg~~
⚠️**Attension:** *It will be supported after V3.3.*

`descriptionCfg` is an object to configure the label of the node. The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. Besides, descriptionCfg has special attribute:

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| paddingTop | The padding from the description to the label text | Number | `0` by default |

Base on the code in [style](#style) section, we add `descriptionCfg` to `defaultNode`

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other properties for node
    descriptionCfg: {
      style: {
        fill: '#f00',
      }
    }
  }
});
// ...
```



### linkPoints
`linkPoints` is an object to configure the small circles on the 「top, bottom, left, and right」.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> It is different from `anchorPoints`:
`anchorPoints` is an 「**array**」 that indicates the actual relative positions used to specify the join position of the relevant edge of the node (refer to [anchorPoints](/en/docs/manual/middle/keyconcept/anchorpoint));
`linkPoints` is an object that indicates whether 「**render**」the four small circles, which do not connect the relevant edges. These two properties are often used together.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| top | Whether to show the top small circle | Boolean | `false` by default |
| bottom | Whether to show the bototm small circle | Boolean | `false` by default |
| left | Whether to show the left small circle | Boolean | `false` by default |
| right | Whether to show the right small circle | Boolean | `false` by default |
| size | The size of the small circles | Number | `3` by default |
| fill | The filling color of the small circles | String | `'#72CC4A'` by default |
| stroke | The stroke color of the small circles | String | `'#72CC4A'` by default |
| lineWidth | The line width of the small circles | Number | `1` by default |


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
| show | Whether to show the left rect | Boolean | `true` by default |
| width | The width of the left rect | Number | `4` by default |
| fill | The filling color of the left rect | String | `'#40a9ff'` by default |
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
| show | Whether to show the icon | Boolean | `true` by default |
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
