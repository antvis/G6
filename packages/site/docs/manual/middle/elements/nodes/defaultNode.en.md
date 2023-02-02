---
title: Overview of Nodes
order: 0
---

The built-in nodes in G6 include circle, rect, ellipse, diamond, triangle, star, image, modelRect, and donut(supported after v4.2.5). <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FY3RTbDCz_8AAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NRJ7RpkMPNsAAAAAAAAAAAAAARQnAQ' width=50 alt='img'/>

In this document, we will briefly introduce the built-in nodes in G6, the common property, and the way to configure the node type. To know more about each type of built-in nodes in G6, please refer to the corresponding documents in this directory.

## Types of Default Nodes

The table below shows the built-in nodes and their special properties:

| Name | Description | Default |
| --- | --- | --- |
| circle | Circle node: <br />- `size` is a number representing the diameter<br />- The circle is centered at the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- More properties are described in [circle](/en/docs/manual/middle/elements/nodes/built-in/circle)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*H9TrTIiUEegAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| rect | Rect node: <br />- `size` is an array, e.g. [100, 50]<br />- The rect in centered at the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- More properties are described in [rect](/zh/docs/manual/middle/elements/nodes/built-in/rect)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SrlHQ5dcCoMAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| ellipse | Ellipse node: <br />- `size` is an array, representing the lengths of major diameter and minor diameter<br />- The ellipse is centered at the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- More properties are described in [ellipse](/zh/docs/manual/middle/elements/nodes/built-in/ellipse)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RjdlRbuocDIAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| diamond | Diamond node: <br />- `size` is an array, representing the width and height of the diamond<br />- The diamond is centered on the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- More properties are described in [diamond](/zh/docs/manual/middle/elements/nodes/built-in/diamond)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EjiPRJacFTEAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| triangle | Triangle node: <br />- `size` is an array, representing the length of the base and the height of the triangle<br />- The triangle is centered on the node position<br />- `color` takes effect on the stroke<br />- he label lays on the bottom of the node by default<br />- More properties are described in [triangle](/zh/docs/manual/middle/elements/nodes/built-in/triangle)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_HqXTadbhzAAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| star | Star node: <br />- `size` is a number, representing the size of the star<br />- The star is centered on the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- More properties are described in [star](/zh/docs/manual/middle/elements/nodes/built-in/star)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_euwQpARvhMAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| image | Image node: <br />- `size` is an array, representing the width and the height of the image<br />- The image is centered on the node position<br />- `img` The url of the image. It can be assigned in `style` as well<br />- `color` does not take effect<br />- The label lays on the bottom of the node by default<br />- More properties are described in [image](/zh/docs/manual/middle/elements/nodes/built-in/image)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gtNxQY2RvMwAAAAAAAAAAABkARQnAQ' width=50 alt='img'/> |
| modelRect | Card node: <br />- `size` is an array, representing the width and the height of the card<br />- The modelRect is centered on the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- If `description` exists, it will lay below the label<br />- More properties are described in [modelRect](/zh/docs/manual/middle/elements/nodes/built-in/modelRect)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqR9QKfimxUAAAAAAAAAAABkARQnAQ' width=100 alt='img'/><br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9HKrSKtmNGQAAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| donut | Circle node: <br />- `size` is a number representing the diameter<br />- The circle is centered at the node position<br />- `color` takes effect on the stroke<br />- The label is placed on the center of the circle by default<br />- Valid property `donutAttrs` should be assigned<br />- More properties are in  [Donut](/en/docs/manual/middle/elements/nodes/built-in/donut)<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NRJ7RpkMPNsAAAAAAAAAAAAAARQnAQ' width=50 alt='img'/> |

## Common Property

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| id | true | String | The ID of the node, **MUST** be a unique string |
| x | false | Number | x coordinate |
| y | false | Number | y coordinate |
| type | false | String | The shape type of the node. It can be the type of built-in Node, or the custom Node. `'circle'` by default |
| size | false | Number / Array | The size of the node |
| anchorPoints | false | Array | The interactions of the node and related edges. It can be null. `[0, 0]` represents the anchor on the left top; `[1, 1]`represents the anchor ont he right bottom |
| style | false | Object | The node style |
| label | false | String | The label text of the node |
| labelCfg | false | Object | The configurations of the label |

### style

`style` is an object to configure the filling color, stroke color, shadow, and so on. Here is the commonly used properties in `style`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The filling color |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width of the stroke |
| lineDash | false | Number[] | The lineDash of the stroke |
| shadowColor | false | String | The shadow color |
| shadowBlur | false | Number | The blur of the shadow |
| shadowOffsetX | false | Number | The x offset of the shadow |
| shadowOffsetY | false | Number | The y offset of the shadow |
| opacity | false | Number | The alpha or transparency of the node |
| fillOpacity | false | Number | The filling alpha or transparency of the node |
| cursor | false | String | The type of the mouse when hovering the node. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) |

Configure `style` globally when instantiating the Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // ... Other properties for nodes
    style: {
      fill: '#steelblue',
      stroke: '#eaff8f',
      lineWidth: 5,
      // ... Other style properties
    },
  },
});
```

### label and labelCfg

`label` is a string which indicates the content of the label. <br />`labelCfg` is an object to configure the label. The commonly used configurations of `labelCfg`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| position | false | String | The relative positions to the node. Options:  `'center'`, `'top'`, `'left'`, `'right'`, `'bottom'`. `'center'` by default |
| offset | false | Number | The offset value of the label. When the `position` is `'bottom'`, the value is the top offset of the node; When the `position` is `'left'`, the value is the right offset of the node; it is similar with other `position`. |
| style | false | Object | The style property of the label |

The commonly used configurations for the `style` in the above table are:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The color of the label |
| stroke | false | String | The stroke color of the label |
| lineWidth | false | Number | The line width of the label |
| opacity | false | Number | The opacity of the label |
| fontFamily | false | String | The font family |
| fontSize | false | Number | The font size of the label |
| ... The label styles of node and edge are the same, summarized in [Text Shape API](/en/docs/api/shapeProperties/#text) |  |  |  |

The following code shows how to configure `label` and `labelCfg` globally when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // ... Other properties for nodes
    label: 'node-label',
    labelCfg: {
      position: 'bottom',
      offset: 10,
      style: {
        fill: '#666',
      },
    },
  },
});
```

## Configure Nodes

There are three methods to configure nodes: Configure nodes globally when instantiating a Graph; Configure nodes in their data; Configure nodes by `graph.node(nodeFn)`. Their priorities are:

`graph.node(nodeFn)` > Configure in data > Configure globally

That means, if there are same configurations in different ways, the way with higher priority will take effect.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Expect for `id`, and `label` which should be assigned to every single node data, the other configurations in [The Common Property](#common-property) and in each node type (refer to doc of each node type) support to be assigned by the three ways.

### Configure Globally When Instantiating Graph

Assign `defaultNode` to configure all the nodes globally:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'circle',
    // Other properties for all the nodes
  },
});
```

### Configure in Data

To configure different nodes with different properties, you can write the properties into their data individually:

```javascript
const data = {
  nodes: [
    {
      id: 'node0',
      size: 100,
      type: 'rect',
      // ...    // Other properties for this node
      style: {
        // ...  // Style properties for this node. Different styles for different types of nodes can be refered to the subdocuments
      },
    },
    {
      id: 'node1',
      size: [50, 100],
      type: 'ellipse',
      // ...    // Other properties for this node
      style: {
        // ...  // Style properties for this node. Different styles for different types of nodes can be refered to the subdocuments
      },
    },
    // ... // Other nodes
  ],
  edges: [
    // ... // edges
  ],
};
```

### Configure with graph.node(nodeFn)

By this way, we can configure different nodes with different properties.

<br /><span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- `graph.node(nodeFn)` must be called **before calling render()**. It does not take effect otherwise;
- It has the highest priority that will override the same properties configured by other ways;
- Each node will be updated when adding or updating items. It will cost a lot when the amount of the data is large.

```javascript
// const data = ...
// const graph = ...
graph.node((node) => {
  return {
    id: node.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

## Example

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      type: 'circle',
      label: 'circle',
    },
    {
      x: 200,
      y: 100,
      type: 'rect',
      label: 'rect',
    },
    {
      id: 'node-ellipse',
      x: 330,
      y: 100,
      type: 'ellipse',
      label: 'ellipse',
    },
    {
      id: 'node-diamond',
      x: 460,
      y: 100,
      type: 'diamond',
      label: 'diamond',
    },
    {
      id: 'node-triangle',
      x: 560,
      y: 100,
      //size: 80,
      type: 'triangle',
      label: 'triangle',
    },
    {
      id: 'node-star',
      x: 660,
      y: 100,
      //size: [60, 30],
      type: 'star',
      label: 'star',
    },
    {
      x: 760,
      y: 100,
      size: 50,
      type: 'image',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      label: 'image',
    },
    {
      id: 'node-modelRect',
      x: 900,
      y: 100,
      type: 'modelRect',
      label: 'modelRect',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 1500,
  height: 300,
});
graph.data(data);
graph.render();
```

The result: <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6FzARrXBsUEAAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>

- The label of the triangle and image node are layed on the bottom, and the others are layed on the center by default.

### Adjust the Properties

By writing the properties into the data, we adjust the label position, color, and styles of the node with `'node-ellipse'` as its id. Replace the following code to the code about `'node-ellipse'`'s data to obtain the result.

```javascript
{
  id: 'node-ellipse',
  x: 330,
  y: 100,
  type: 'ellipse',
  size: [60, 30],
  label: 'ellipse',
  labelCfg: {
    position: 'bottom',
    offset: 5
  },
  style: {
    fill: '#fa8c16',
    stroke: '#000',
    lineWidth: 2
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fQ9yRYlo6zwAAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>

Then, we add some description for the node with `'node-modelRect'` as its `id`:

```
{
  id: 'node-modelRect',
  x: 900,
  y: 100,
  description: '描述文本xxxxxxxxxxx',
  type: 'modelRect',
  label: 'modelRect'
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OnuCTYqfXKgAAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>

## Related Reading

- [State](/en/docs/manual/middle/states/state) —— Change the styles during the interaction process.
