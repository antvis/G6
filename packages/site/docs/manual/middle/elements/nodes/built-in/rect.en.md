---
title: Rect
order: 2
---

A built-in node Rect has the default style as below, the label is drawed on the center of it.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*k2nBTozK6XsAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

## Usage

As stated in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) , there are three methods to configure nodes: Configure nodes globally when instantiating a Graph; Configure nodes in their data; Configure nodes by `graph.node(nodeFn)`. Their priorities are:

`graph.node(nodeFn)` > Configure in data > Configure globally

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Expect for `id`, and `label` which should be assigned to every single node data, the other configurations in [The Common Property](/en/docs/manual/middle/elements/nodes/defaultNode#common-property) and in each node type (refer to doc of each node type) support to be assigned by the three ways.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'rect'` in the `defaultNode` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'rect',
    // Other configuraltions
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
      type: 'rect',
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

The [Node Common Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#common-property) are available for Rect node, some special properties are shown below. The property with Object type will be described after the table:

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The size of the ellipse | Number / Array | When it is a number, the width and height are the same. |
| style | The default style of rect node | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| stateStyles | The styles in different states | Object | Refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) |
| linkPoints | The link points **in visual** | Object | They are invisible by default. It is usually used with the [anchorPoints](/en/docs/manual/middle/elements/nodes/anchorpoint). The differences are described in [linkPoints](#linkpoints) |

### style

The [Node Common Styles](/en/docs/manual/middle/elements/nodes/defaultNode/#style) are available for Circle node.`style` is an object to configure the filling color, stroke, and other styles.

| Name        | Description                  | Type   | Remark                                     |
| ----------- | ---------------------------- | ------ | ------------------------------------------ |
| radius      | The border radius            | Number | Rectangle with no border radius by default |
| stroke      | The color of the stroke      | String |                                            |
| lineWidth   | The line width of the stroke | Number | `1` by default                             |
| fill        | The filling color            | String |                                            |
| fillOpacity | The opacity                  | Number | `1` by default                             |

The following code shows how to configure the `style` globally when instantiating a Graph.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EFtLTp134y8AAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      type: 'rect',
      label: 'rect',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 300,
  defaultNode: {
    // type: 'rect', // The type has been assigned in the data, we do not have to define it any more
    style: {
      fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5,
      radius: 10,
    },
  },
});
graph.data(data);
graph.render();
```

### labelCfg

`labelCfg` is an object to configure the label of the node. The [Node Common Label Configurations](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) are available. Base on the code in [style](#style) section, we add `labelCfg` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bAjNR7yF1uIAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

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
        fontSize: 18,
      },
      position: 'bottom',
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

Base on the code in [style](#style) section, we add `linkPoints` to `defaultNode`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vsLASZHBX88AAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultNode: {
    // Other configurations for nodes
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
