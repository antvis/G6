---
title: Rect
order: 2
---

Built-in Rect Combo has the default style as below, the label is drawed on the left top inside. <a href='/en/examples/item/defaultCombos#rect' target='_blank'>Demo</a> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Usage

As stated in [Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo) , there are two ways to configure the combo: Configure it when instantiating a Graph globally; Configure it in the data.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Must set the `groupByTypes` to `false` when instantiating the graph, which will result in rendering result with reasonable visual zIndex for combos.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'rect'` in the `defaultCombo` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    type: 'rect', // The type of the combo
    // ... Other configuraltions
  },
});
```

### 2 Configure in the Data

To configure different combo with different properties, you can write the properties into the combo data.

```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [
    ... // edges
  ],
  combos: [
    {
      id: 'combo1',
      type: 'rect', // The tyep of the combo
      ... // Other configurations
    },
    ... // Other combos
  ]
};
```

## Property

The [Combo Common Properties](/en/docs/manual/middle/elements/combos/defaultCombo/#common-property) are available for Rect combo, some special properties are shown below. The property with Object type will be described after the table:<br />

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| size | The diameter of the combo | Number / Array | When it is an array, the first element will take effect |
| style | The default style of rect combo | Object | Refer to the [style](./rect#style) |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object | Refer to the [labelCfg](/rect#labelcfg) |
| stateStyles | The styles in different states | Object | Refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) |

### style

The [Combo Common Styles](/en/docs/manual/middle/elements/nodes/defaultNode/#style) are available for Rect combo. `style` is an object to configure the filling color, stroke, and other styles. The following code shows how to configure the `style` globally when instantiating a Graph.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VwLDQrjV9PkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  combos: [
    {
      label: 'combo_rect',
      type: 'rect',
      label: 'rect',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    // type: 'rect',  // The type has been assigned in the data, we do not have to define it any more
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

`labelCfg` is an object to configure the label of the combo. The [Combo Common Label Configurations](/en/docs/manual/middle/elements/combos/defaultCombo/#label-and-labelcfg) are available. Base on the code in [style](#style) section, we add `labelCfg` to `defaultCombo`.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qAqbSLqTWSoAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    // ... Other properties for combos
    labelCfg: {
      position: 'bottom',
      refX: -12,
      style: {
        fill: '#bae637',
        fontSize: 15,
        // ... The style of the label
      },
    },
  },
});
// ...
```
