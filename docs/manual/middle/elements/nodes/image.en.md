---
title: Image
order: 7
---
## Image

A built-in node Circle has the default style as below, the label is drawed on the bottom of it.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aHqIQIXL0RMAAAAAAAAAAABkARQnAQ' width=150/>


## Usage
As stated in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) , there are two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 实例化图时全局配置
Assign `shape` to `'image'` in the `defaultNode` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'image',
    label: 'AntV Team'
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
  	img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
    shape: 'image',
    size: 200,
    label: 'AntV Team',
    labelCfg: {
      position: 'bottom'
    },
    // The configurations for clipping the image
    clipCfg: {
      show: false,
      type: 'circle',
      r: 15
    }
  },
    ... // Other nodes
  ],
  edges: [
    ... // edges
  ]
}
```


## Property
The [Node Common Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#common-property) are available for Image node, some special properties are shown below. The property with Object type will be described after the table:

```javascript
img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
size: 200,
  labelCfg: {
    position: 'bottom'
  },
  // The configurations for clipping the image
  clipCfg: {
    show: false,
    type: 'circle',
    // circle
    r: 15,
    // ellipse
    rx: 10,
    ry: 15,
    // rect
    width: 15,
    height: 15,
    // Coordinates
    x: 0,
    y: 0
  }
```

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| **img** | **The URL addgress** | **String** | **special property for image node** |
| size | The size of the node | Number | Array | When it is a number, the width and the height are the same |
| label | The text of the label | String |  |
| labelCfg | The configurations for the label | Object | The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. |
| **clipCfg** | **The configurations for clipping** | **Object** | **Do not clip by default. It is a special property for image node** |



### clipCfg

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| type | The type of shape of clipping | String | Options: `'circle'`, `'rect'`, `'ellipse'` |
| x | The x coordinate of the clipping shape | Number | 0 by default. Only takes effect when the `type` is `'circle'`, `'rect'`, or `'ellipse'` |
| y | The y coordinate of the clipping shape | Number | 0 by default. Only takes effect when the `type` is `'circle'`, `'rect'`, or `'ellipse' |
| show | Whether to clip the image | Boolean | Do not clip by default. |
| r | The radius of circle clipping | Number | Takes effect when the `type` is `'circle'` |
| width | The width of the clipping | Number | Takes effect when the `type` is `'rect'` |
| height | The height of the clipping | Number | Takes effect when the `type` is `'rect'` |
| rx | The major radius of the ellipse clipping | Number | Takes effect when the `type` is `'ellipse'` |
| ry | The minor radius of the ellipse clipping | Number | Takes effect when the `type` is `'ellipse'` |


There are default values for all the types of clipping. The following code shows how to configure the `clipCfg` when instantiating a Graph:
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'image',
    label: 'image'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'image',  // The shape has been assigned in the data, we do not have to define it any more
    clipCfg: {
      show: true,
      type: 'circle'
    }
  }
})
graph.data(data);
graph.render();
```


#### Clippling Type

##### Cicle Clipping
`circle`
When the `type` in `clipCfg` is `'circle'`:
```javascript
clipCfg: {
  show: true,
  type: 'circle',
  r: 100
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w5uESbSe430AAAAAAAAAAABkARQnAQ' width=150/>


##### Rect Clipping 
`rect`

When the `type` in `clipCfg` is `'rect'`:
```javascript
clipCfg: {
  show: true,
  type: 'rect',
  x: -50,
  y: -50,
  width: 100, 
  height: 100
}
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mpPvTKdP7cIAAAAAAAAAAABkARQnAQ' width=150/>

##### Ellipse Clipping
`ellipse`

When the `type` in `clipCfg` is `'ellipse'`:
```javascript
clipCfg: {
  show: true,
  type: 'ellipse',
  rx: 100,
  ry: 60
}
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1kn1S4vaUrwAAAAAAAAAAABkARQnAQ' width=150/>
