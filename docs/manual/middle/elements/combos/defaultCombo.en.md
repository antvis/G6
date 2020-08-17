---
title: Built-in Combos
order: 0
---

The built-in Combos in G6 include circle and rect types. <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UwaHSKkwoVUAAAAAAAAAAABkARQnAQ' width='250' alt='img'/>

In this document, we will briefly introduce the built-in Combos in G6, the common property, and the way to configure the combo type. To know more about each type of built-in combos in G6, please refer to the corresponding documents in this directory.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Must set the `groupByTypes` to `false` when instantiating the graph, which will result in rendering result with reasonable visual zIndex for combos.

## Types of Default Combos

The table below shows the built-in Combos and their special properties:

| Name | Description | Default |
| --- | --- | --- |
| circle | Circle Combo: <br />- `size` is a number representing the diameter<br />- The circle is centered at the combo position<br />- `color` takes effect on the stroke<br />- The label is placed on the top of the circle by default<br />- More properties are described in [circle](/en/docs/manual/middle/elements/combos/circle)<br />- <a href='/en/examples/item/defaultCombos#circle' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ijeuQoiH0JUAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| rect | Rect Combo: <br />- `size` is an array, e.g. [100, 50]<br />- The rect in centered at the combo position<br />- `color` takes effect on the stroke<br />- The label is placed on the left top of the circle by default<br />- More properties are described in [rect](/zh/docs/manual/middle/elements/combos/rect)<br />- <a href='/en/examples/item/defaultCombos#rect' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

## Common Property

| Name | Required | Type | Example | Remark |
| --- | --- | --- | --- | --- |
| id | true | String | 'comboA' | The id of the Combo, **Must** be a unique string |
| type | false | String | 'rect' | The shape type of the Combo. It can be the type of built-in Combo, or the custom Combo. `'circle'` by default |
| parentId | string | false | 'comboB' | The ID of the parent Combo |
| size | false | Number / Array | 30 or [30, 20] | The minimum size of the combo. The default value for 'circle' type Combo is 20, [20, 5] for 'rect' type |
| padding | Number / Number[] | false | 10 或 [ 10, 20, 10, 20 ] | The padding of the Combo. The default value for 'circle' type Combo is 25, [25, 20, 15, 20] for 'rect' |
| style | false | Object |  | The Combo style |
| label | false | String | 'Combo A' | The label text of the combo |
| labelCfg | false | Object |  | The configurations of the combo |

### style

`style` is an object to configure the filling color, stroke color, shadow, and so on. Here is the commonly used properties in `style`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The filling color |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width of the stroke |
| shadowColor | false | String | The shadow color |
| shadowBlur | false | Number | The blur of the shadow |
| shadowOffsetX | false | Number | The x offset of the shadow |
| shadowOffsetY | false | Number | The y offset of the shadow |
| opacity | false | Number | The alpha or transparency of the combo |
| fillOpacity | false | Number | The filling alpha or transparency of the combo |
| cursor | false | String | The type of the mouse when hovering the combo. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) |

Configure `style` globally when instantiating the Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    // ... Other properties for combos
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
| position | false | String | The relative positions to the combo. Options:  `'center'`, `'top'`, `'left'`, `'right'`, `'bottom'`. `'top'` by default |
| refX | false | Number | The label's offset along the x-axis |
| refY | false | Number | The label's offset along the y-axis |
| style | false | Object | The style property of the label |

The commonly used configurations for the `style` in the above table are:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The color of the label |
| stroke | false | String | The stroke color of the label |
| lineWidth | false | Number | The line width of the label |
| opacity | false | Number | The opacity of the label |
| fontFamily | false | Number | 文本字体 |
| fontSize | false | Number | The font size of the label |
| ... The label styles of Combo, Node and Edge are the same, summarized in [Text Shape API](/en/docs/api/nodeEdge/shapeProperties/#text) |  |  |  |

The following code shows how to configure `label` and `labelCfg` globally when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    // ... Other properties for combos
    labelCfg: {
      position: 'top',
      offset: [10, 10, 10, 10],
      style: {
        fill: '#666',
      },
    },
  },
});
```

## Configure Combos

There are three methods to configure combos: Configure combos globally when instantiating a Graph; Configure combos in their data; Configure combos by `graph.combo(comboFn)`. Their priorities are:

`graph.combo(comboFn` > Configure in data > Configure globally

That means, if there are same configurations in different ways, the way with higher priority will take effect.

### Configure Globally When Instantiating Graph

Assign `defaultCombo` to configure all the combos globally:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    type: 'circle',
    // Other properties for all the combos
  },
});
```

### Configure in Data

To configure different combos with different properties, you can write the properties into their data individually:

```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [
    ... // edges
  ],
  combos: [{
    id: 'combo0',
    size: 100,
    type: 'circle',
    ...    // Other properties for this combo
    style: {
      ...  // Style properties for this combo. Different styles for different types of combos can be refered to the subdocuments
    }
  },{
    id: 'combo1',
    size: [50, 100],
    type: 'rect',
    ...    // Other properties for this combo
    style: {
      ...  // Style properties for this combo. Different styles for different types of combos can be refered to the subdocuments
    }
  },
  // other combos
  ]
}
```

### Configure with graph.combo(comboFn)

By this way, we can configure different combos with different properties.

<br /><span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- `graph.combo(comboFn)` must be called **before calling render()**. It does not take effect otherwise;
- It has the highest priority that will rewrite the same properties configured by other ways;
- Each combo will be updated when adding or updating items. It will cost a lot when the amount of the data is large.

```javascript
// const data = ...
// const graph = ...
graph.combo((combo) => {
  return {
    id: combo.id,
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
      id: 'node1',
      label: 'Node1',
      comboId: 'rect_combo',
    },
    {
      id: 'node2',
      label: 'Node 2',
    },
  ],
  combos: [
    {
      id: 'circle_combo',
      type: 'circle',
      label: 'Circle',
    },
    {
      id: 'rect_combo',
      type: 'rect',
      label: 'Rect',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 1500,
  height: 300,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
});
graph.data(data);
graph.render();
```

The result: <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*biK0SJmQB6gAAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>

### Adjust the Properties

By writing the properties into the data, we adjust the label position, color, and styles of the combo with `'rect_combo'` as its id. Replace the following code to the code about `'rect_combo'`'s data to obtain the result.

```javascript
{
  id: 'rect_combo',
  type: 'rect',
  label: 'Rect Combo',
  labelCfg: {
    position: 'bottom',
    refX: 5,
    refY: -12,
    style: {
      fill: '#fff'
    }
  },
  style: {
    fill: '#fa8c16',
    stroke: '#000',
    lineWidth: 2
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NF3eRLJP1DkAAAAAAAAAAABkARQnAQ' width='750' height='100' alt='img'/>

## Related Reading

- [State](/en/docs/manual/middle/states/state) —— Change the styles during the interaction process.
