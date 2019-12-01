---
title: Built-in Edges
order: 0
---

There are 9 built-in edges in G6:

- line: straight line without control points;
- polyline: polyline with one or more control points;
- arc;
- quadratic: quadratic bezier curve;
- cubic: cubic bezier curve;
- cubic-vertical：vertical cubic bezier curve. The user can not assign the control point for this type of edge;
- cubic-horizontal: horizontal cubic bezier curve. The user can not assign the control point for this type of edge;
- loop: self-loop edge.

<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*H6Y5SrPstw4AAAAAAAAAAABkARQnAQ' width='750' height='120' />

## Types of Default Nodes
The table below shows the built-in edges and their special attributes:

| Name | Description |  |
| --- | --- | --- |
| line | A straight line connected two end nodes: <br />- controlPoints do not take effect<br />- Refer to attributes of line for more information<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-LM-RJnlI20AAAAAAAAAAABkARQnAQ' width=100/> |
| polyline | A polyline with one or more control points: <br />- controlPoints is the set of all the control points of polyline. If it is not assigned, G6 will calculate it by [A* Algorithm](https://yuque.alibaba-inc.com/antv/blog/polyline-edges-with-border-radius)<br />- Refer to attributes of polyline for more information<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q2pIQ6h622IAAAAAAAAAAABkARQnAQ' width=100/> |
| arc | An arc connects two end nodes: <br />- controlPoints do not take effects<br />- control the bending and direction by `curveOffset`<br />- Refer to attributes of arc for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SmS8QZjTlEkAAAAAAAAAAABkARQnAQ' width=100/> |
| quadratic | A quadratic bezier curve with one control point: <br />- The curve will be bended on the center if the `controlPoints` is not defined <br />- Refer to attributes of quadratic for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IADsTq4eH50AAAAAAAAAAABkARQnAQ' width=100/> |
| cubic | A cubic bezier curve with two control points: <br />- The curve will be bended on the position of 1/3 and 2/3 if the `controlPoints` is not defined<br />- Refer to attributes of cubic for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ldiCT7xnrM4AAAAAAAAAAABkARQnAQ' width=100/> |
| cubic-vertical | The vertical cubic bezier curve. The user can not assign the control point for this type of edge | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WtNPRKSZv1kAAAAAAAAAAABkARQnAQ' width=100/> |
| cubic-horizontal | The horizontal cubic bezier curve. The user can not assign the control point for this type of edge | <img src='' width=100/> |
| loop | Self-loop edge. Refer to attributes of loop for more informatio | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iNiVRIsov4MAAAAAAAAAAABkARQnAQ' width=100/> |

## The Common Attribute

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| id | false | String | The id of the node |
| source | true | String | Number | The id of the source node |
| target | true | String | The id of the target node |
| shape | false | String | The shape of the node, `'line'` by default |
| sourceAnchor | false | Number | The index of link points on the source node. The link point is the intersection of the edge and related node |
| targetAnchor | false | Number | The index of link points on the target node. The link point is the intersection of the edge and related node |
| style | false | Object | The edge style |
| label | false | String | The label text of the edge |
| labelCfg | false | Object | The configurations of the label |


#### style
`style` is an object to configure the stroke color, shadow, and so on. Here is the commonly used attributes in `style`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width |
| lineAppendWidth | false | Number | The width of the response area for interaction. In other words, when the edge is too thin to be hitted by mouse, enlarge the value of `lineWidth` to widen the response area |
| endArrow | false | Boolean | Whether show the end arrow |
| strokeOpacity | false | Number | The stroke opacity |
| shadowColor | false | String | The color of the shadow |
| shadowBlur | false | Number | The blur degree of the shadow |
| shadowOffsetX | false | Number | The x offset of the shadow |
| shadowOffsetX | false | Number | The y offset of the shadow |
| ... |  |  |  |


Configure `style` globally when instantiating the Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... Other attributes for edges
    style: {
      stroke: '#eaff8f',
      lineWidth: 5,
      // ... Other style attributes
    }
  }
})
```

#### label and labelCfg
`label` is a string which indicates the content of the label. <br />`labelCfg` is an object to configure the label. The commonly used configurations of `labelCfg`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| refX | false | Number | x offset of the label |
| refY | false | Number | y offset of the label |
| position | false | String | The relative position to the edge. Options: `'start'`, `'middle'`, and `'end'`. `'middle'` by default |
| autoRotate | false | Boolean | Whether activate ratating according to the edge automatically. `false` by default |
| style | false | Object | The style attribute of the label |


The commonly used configurations for the `style` in the above table are:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The color of the label |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width of the stroke |
| opacity | false | Number | The opacity |
| font | false | String | The font |
| fontSize | false | Number | The font size |
| ... |  |  |  |


The following code shows how to configure `label` and `labelCfg` globally when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... Other attributes for nodes
    label: 'edge-label',
    labelCfg: {
    	refY: -10,
      refX: 60
    }
  }
})
```

## Configure Edges
There are three methods to configure edges: Configure edges globally when instantiating a Graph; Configure edges in their data; Configure edges by `graph.edge(edgeFn)`. Their priorities are: 

`graph.edge(edgeFn)` > Configure in data > Configure globally

That means, if there are same configurations in different ways, the way with higher priority will take effect.

### Configure Globally When Instantiating Graph
Assign `defaultEdge` to configure all the nodes globally:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'line',
    // Other attributes for all the nodes
  }
})
```

### Configure in Data
To configure different nodes with different attributes, you can write the attributes into their data individually:
```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    shape: 'polyline',
    // ...    // Other attributes for this edge
    style: {
      // ...  // Style attributes for this edge
    }
  },{
    source: 'node1',
    target: 'node2'
    shape: 'cubic',
    // ...    // Other attributes for this edge
    style: {
      // ...  // Style attributes for this edge
    }
  },
    // ... // edges
  ]
}
```

### Configure with graph.edge(edgeFn)
By this way, we can configure different nodes with different attributes.<br />

⚠️**Attention:** 

- `graph.edge(edgeFn)` must be called **before calling render()**. It does not take effect otherwise;
- It has the highest priority that will rewrite the same attributes configured by other ways;
- Each edge will be updated when adding or updating items. It will cost a lot when the amount of the data is large.
```javascript
// const data = ...
// const graph = ...
graph.edge((edge) => {
  return {
    id: edge.id,
    shape: 'polyline',
    style: {
      fill: 'steelblue'
    }
  }
});

graph.data(data);
graph.render();
```

## Example
```javascript
const data = {
  nodes: [
    {id: '1', x: 50, y: 50, size: 20},
    {id: '2', x: 150, y: 50, size: 20},
    {id: '3', x: 200, y: 50, size: 20},
    {id: '4', x: 300, y: 130, size: 20},
    {id: '5', x: 350, y: 50, size: 20},
    {id: '6', x: 450, y: 50, size: 20},
    {id: '7', x: 500, y: 50, size: 20},
    {id: '8', x: 600, y: 50, size: 20},
    {id: '9', x: 650, y: 50, size: 20},
    {id: '10', x: 750, y: 50, size: 20},
    {id: '11', x: 800, y: 50, size: 20},
    {id: '12', x: 900, y: 150, size: 20},
    {id: '13', x: 950, y: 50, size: 20},
    {id: '14', x: 1050, y: 150, size: 20},
    {id: '15', x: 1100, y: 50, size: 20},
  ],
  edges: [
    {source: '1', target: '2', shape: 'line', label: 'line'},
    {source: '3', target: '4', shape: 'polyline', label: 'polyline'},
    {source: '5', target: '6', shape: 'arc', label: 'arc'},
    {source: '7', target: '8', shape: 'quadratic', label: 'quadratic'},
    {source: '9', target: '10', shape: 'cubic', label: 'cubic'},
    {source: '11', target: '12', shape: 'cubic-vertical', label: 'cubic-vertical'},
    {source: '13', target: '14', shape: 'cubic-horizontal', label: 'cubic-horizontal'},
    {source: '15', target: '15', shape: 'loop', label: 'loop'}
  ]
}

const graph = new G6.Graph({
	container: 'mountNode',
  width: 1500,
  height: 300,
  linkCenter: true      // edges connect the nodes' center
});
graph.data(data);
graph.render();
```

The result: <br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LcCzSqTqifwAAAAAAAAAAABkARQnAQ' width='750' height='120' />

### Adjust the Attributes
可以在边上添加文本，修改边的样式。下面演示将配置写入数据的方式配置边。使用下面代码替换上面代码中的 9-10、11-12 两条边数据，修改这两条边的样式和其文本。
```javascript
// 使 9-10 的 cubic 边文本下移 15 像素
{
  source: '9', 
  target: '10', 
  shape: 'cubic',
  label: 'cubic',
  labelCfg: {
    refY: -15 // refY 默认是顺时针方向向下，所以需要设置负值
  }
},
// 设置 11-12 的 cubic-vertical 边的颜色、虚线、粗细，并设置文本样式、随边旋转
{
  source: '11', 
  target: '12',
  shape: 'cubic-vertical',
  color: '#722ed1',     // 边颜色
  size: 5,              // 边粗细
  style: {
  	lineDash: [2, 2]    // 虚线边
  },
  label: 'cubic-vertical',
  labelCfg: {
  	position: 'center', // 其实默认就是 center，这里写出来便于理解
    autoRotate: true,   // 使文本随边旋转
    style: {
      stroke: 'white',  // 给文本添加白边和白色背景
    	lineWidth: 5,     // 文本白边粗细
      fill: '#722ed1',  // 文本颜色
    }
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GxR3RaD4kH8AAAAAAAAAAABkARQnAQ' width='750' height='120' />

## 相关阅读

- [状态 State](../../states/state) —— 交互过程中的样式变化。
