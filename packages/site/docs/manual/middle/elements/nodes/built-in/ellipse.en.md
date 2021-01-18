---
title: Ellipse
order: 3
---

A built-in node Ellipse has the default style as below, the label is drawed on the center of it.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-K6wTriSnY8AAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

## Usage

As stated in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) , there are three methods to configure nodes: Configure nodes globally when instantiating a Graph; Configure nodes in their data; Configure nodes by `graph.node(nodeFn)`. Their priorities are:

`graph.node(nodeFn)` > Configure in data > Configure globally

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Expect for `id`, and `label` which should be assigned to every single node data, the other configurations in [The Common Property](/en/docs/manual/middle/elements/nodes/defaultNode#common-property) and in each node type (refer to doc of each node type) support to be assigned by the three ways.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'ellipse'` in the `defaultNode` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'ellipse', // The type of the node
    // ... Other configuraltions
  },
});
```

### 2 Configure in the Data

To configure different nodes with different properties, you can write the properties into the node data.

```javascript
const data = {
  nodes: [
    {
      id: 'node0',
      type: 'ellipse', // The tyep of the node
      //... // Other configurations
    },
    //... // Other nodes
  ],
  edges: [
    //... // edges
  ],
};
```

## Property

The [Node Common Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#common-property) are available for Ellipse node, some special properties are shown below. The property with Object type will be described after the table:<br />

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The size of the ellipse | Number / Array | When it is a number, the ellipse looks like a circle. When it is an array, the `size[0]` is the major diameter, the `size[1]` is the minor diameter |
| style | The default style of ellipse node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) |
| linkPoints | The link points **in visual** | Object | They are invisible by default. It is usually used with the [anchorPoints](/en/docs/manual/middle/elements/nodes/anchorpoint). The differences are described in [linkPoints](#linkpoints) |
| icon | The configurations of the icon on the ellipse node | Object | It is invisible by default |

### style

The [Node Common Styles](/en/docs/manual/middle/elements/nodes/defaultNode/#style) are available for Circle node.`style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5_yzRLNA81cAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      type: 'ellipse',
      label: 'ellipse',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // type: 'ellipse',  // The type has been assigned in the data, we do not have to define it any more
    size: [130, 80],
    style: {
      fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5,
    },
  },
});
graph.data(data);
graph.render();
```

### labelCfg

`labelCfg` is an object to configure the label of the node. The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SxAlT7QGURwAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other properties for node
    labelCfg: {
      offset: 20,
      style: {
        fill: '#9254de',
        fontSize: 18,
        // ... The style of the label
      },
    },
  },
});
// ...
```

### linkPoints

`linkPoints` is an object to configure the small circles on the 「top, bottom, left, and right」.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> It is different from `anchorPoints`: `anchorPoints` is an 「**array**」 that indicates the actual relative positions used to specify the join position of the relevant edge of the node (refer to [anchorPoints](/en/docs/manual/middle/elements/nodes/anchorpoint)); `linkPoints` is an object that indicates whether 「**render**」the four small circles, which do not connect the relevant edges. These two properties are often used together.

| Name      | Description                             | Type    | Remark                 |
| --------- | --------------------------------------- | ------- | ---------------------- |
| top       | Whether to show the top small circle    | Boolean | `false` by default     |
| bottom    | Whether to show the bototm small circle | Boolean | `false` by default     |
| left      | Whether to show the left small circle   | Boolean | `false` by default     |
| right     | Whether to show the right small circle  | Boolean | `false` by default     |
| size      | The size of the small circles           | Number  | `3` by default         |
| fill      | The filling color of the small circles  | String  | `'#72CC4A'` by default |
| stroke    | The stroke color of the small circles   | String  | `'#72CC4A'` by default |
| lineWidth | The line width of the small circles     | Number  | `1` by default         |

Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*paBYRq0PNqgAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

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
      fill: '#fff',
    },
  },
});
// ...
```

### icon

`icon` is an object to configure the icon on the node.

| Name   | Description               | Type    | Remark             |
| ------ | ------------------------- | ------- | ------------------ |
| show   | Whether to show the icon  | Boolean | `false` by default |
| width  | The width of the icon     | Number  | `16` by default    |
| height | The height of the icon    | Number  | `16` by default    |
| img    | The image url of the icon | String  |                    |

Base on the code in [style](#style) section, we add `icon` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*992OSK65NaUAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

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
      //img: '...', The image url of the icon
    },
  },
});
// ...
```
