---
title: Circle
order: 1
---

A built-in node Circle has the default style as below, the label is drawed on the center of it.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wBnPTKsCY5YAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

## Usage

As stated in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) , there are three methods to configure nodes: Configure nodes globally when instantiating a Graph; Configure nodes in their data; Configure nodes by `graph.node(nodeFn)`. Their priorities are:

`graph.node(nodeFn)` > Configure in data > Configure globally

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Expect for `id`, and `label` which should be assigned to every single node data, the other configurations in [The Common Property](/en/docs/manual/middle/elements/nodes/defaultNode#common-property) and in each node type (refer to doc of each node type) support to be assigned by the three ways.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'circle'` in the `defaultNode` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'circle', // The type of the node
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
      type: 'circle', // The tyep of the node
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

The [Node Common Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#common-property) are available for Circle node, some special properties are shown below. The property with Object type will be described after the table:<br />

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The diameter of the node | Number / Array | When it is an array, the first element will take effect |
| style | The default style of circle node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) |
| linkPoints | The link points **in visual** | Object | They are invisible by default. It is usually used with the [anchorPoints](/en/docs/manual/middle/elements/nodes/anchorpoint). The differences are described in [linkPoints](#linkpoints) |
| icon | The configurations of the icon on the circle node | Object | It is invisible by default |

### style

The [Node Common Styles](/en/docs/manual/middle/elements/nodes/defaultNode/#style) are available for Circle node. `style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PKulQaVnv9IAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      type: 'circle',
      label: 'circle',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // type: 'circle',  // The type has been assigned in the data, we do not have to define it any more
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

`labelCfg` is an object to configure the label of the node. The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zPiMQ5vO3e4AAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // ... Other properties for nodes
    labelCfg: {
      position: 'bottom',
      offset: 10,
      style: {
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

Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rOdpQZOdQcgAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

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
      size: 5,
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

Base on the code in [style](#style) section, we add `icon` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YSgMTI4UUkkAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

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
      width: 25,
      height: 25,
    },
  },
});
// ...
```
