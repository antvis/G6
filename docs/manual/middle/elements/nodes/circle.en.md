---
title: Circle
order: 1
---

A built-in node Circle has the default style as below, the label is drawed on the center of it.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wBnPTKsCY5YAAAAAAAAAAABkARQnAQ' width=50/>

## Usage
As stated in [Built-in Nodes](../defaultNode) , there two ways to configure the node: Configure it when instantiating a Graph globally; Configure it in the data.


### 1 Global Configure When Instantiating a Graph
Assign `shape` `'circle'` in the `defaultNode` object when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'circle', // The type of the node
    // ... Other configuraltions
  }
})
```


### 2 Configure in the Data
To configure different nodes with different attributes, you can write the attributes into the node data.
```javascript
const data = {
  nodes: [
  {
	  id: 'node0',
    shape: 'circle', // The tyep of the node
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
circle node has the attributes shown below. The attribute wity Object type will be described after the table:<br />

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The diameter of the node | Number / Array | When it is an array, the first element will take effect |
| style | The default style of circle node | Object | Correspond to the styles in Canvas |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Only takes effect on keyShape |
| linkPoints | The link points of the related edges | Object | It is invisible by default |
| icon | The configurations of the icon on the circle node | Object | It is invisible by default |



##### style
`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PKulQaVnv9IAAAAAAAAAAABkARQnAQ' width=50/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'circle',
    label: 'circle'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'circle',  // The shape has been assigned in the data, we do not have to define it any more
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


##### labelCfg
`labelCfg` is an object to configure the label of the node. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zPiMQ5vO3e4AAAAAAAAAAABkARQnAQ' width=50/>
```javascript
const data = {
	// ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other attributes for node
    labelCfg: {
    	position: 'bottom',
      offset: 10,
      style: {
        // ... The style of the label
      }
    }
  }
});
// ...
```


##### linkPoints
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


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `linkPoints` 配置项进行连入点的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rOdpQZOdQcgAAAAAAAAAAABkARQnAQ' width=50/>
```javascript
const data = {
	// ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 其他属性
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


##### 图标 icon
Object 类型。通过配置 `icon`，可以在节点上显示小图标。

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| show | 是否显示icon | Boolean | 默认为false，不显示 |
| width | icon的宽度 | Number | 默认为16 |
| height | icon的高度 | Number | 默认为16 |
| img | icon的地址 | String |  |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `icon` 配置项进行图标的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YSgMTI4UUkkAAAAAAAAAAABkARQnAQ' width=50/>
```javascript
const data = {
	// ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 其他属性
    icon: {
    	show: true,
      //img: '...', 可更换为其他图片地址
      width: 25,
      height: 25
    }
  }
});
// ...
```
