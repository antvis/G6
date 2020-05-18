---
title: Node Combo
order: 8
---

Node Combo is a new feature for V3.5. The [node group](/zh/docs/manual/middle/nodeGroup) is also available. We recommend to use Combo for node grouping. <a href='' target='_blank'>Demo</a>. 
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>


### Data Structure

To keep the stability of the structure of the source data, we do some compatible changes to introduce combos:

1. `combos` array to contains all the combos data, and each of them has the properties:

| Property | Type | Required | Example | Description |
| ----- | ---- | ---- | ---- | ---- |
| id | string | true | 'comboA' | The uinique ID for the combo. **MUST** be a unique string |
| parentId | string | false | 'comboB' | The ID of the parent combo |
| padding | Number / Number[] | 10 or [ 10, 20, 10, 20 ] | The padding inside the combo |
| label | string | false | 'combo A' | The label text of the combo |
| style | Object | false |  | The style configuration of the combo, details are in [Built-in Combo Configuration](/en/docs/manual/middle/elements/combos/defaultCombo#style) and documents of each type of combo |
| labelCfg | Object | false |  | The label configuration of the combo, details are in [Built-in Combo Configuration](/en/docs/manual/middle/elements/combos/defaultCombo#label-and-labelcfg) and documents of each type of combo |

An example for the data item for a combo

```javascript
{
  id: 'comboA',
  label: 'A',
  parentId: 'comboC'
},
```

2. Introduce `comboId` in data items of nodes to indicate the affiliation.

```javascript
{
  nodes: [
    {
      id: 'node1',
      comboId: 'comboA' // node1 belongs to comboA
    },
    {
      id: 'node2',
      comboId: 'comboB' // node2 belongs to comboB
    },
    {
      id: 'node3' // node3 belongs to no one
    },
    // ...
  ],
  edges: [
    // ...
  ],
  combos: [
    { // define comboA
      id: 'comboA',
      label: 'A',
      parentId: 'comboC'
    },
    { // define comboB
      id: 'comboB',
      parentId: 'comboB'
    },
    { // define comboC, an empty combo
      id: 'comboC'
    },
    // ...
  ]
}
```

### Render The Combo

- If `combos` array and `comboId` for node exists in the data, G6 renders the hierarchical combos automatically;
- When there is no layout configured in the graph, you'd better assign `x` and `y` in the data items of `nodes`, or they will be placed at random positions;
- Empty combo will be placed randomly.

```javascript
const data = {
  nodes: [
    {
      id: 'node6',
      comboId: 'comboC',
      label: 'rect',
      x: 100,
      y: 300,
    },
    {
      id: 'node1',
      label: 'node1',
      comboId: 'comboS',
      x: 100,
      y: 100,
    },
    {
      id: 'node9',
      label: 'node9',
      comboId: 'comboB',
      x: 300,
      y: 210,
    },
    {
      id: 'node2',
      label: 'node2',
      comboId: 'comboA',
      x: 150,
      y: 200,
    },
    {
      id: 'node3',
      label: 'node3',
      comboId: 'comboB',
      x: 300,
      y: 100,
    },
    {
      id: 'node7',
      comboId: 'comboB',
      label: 'node7',
      x: 200,
      y: 200,
    },
    {
      id: 'node10',
      label: 'node10',
      comboId: 'comboC',
      x: 300,
      y: 210,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
  ],
  combos: [
    {
      id: 'comboA',
      label: 'combo A',
      parentId: 'comboC',
    },
    {
      id: 'comboB',
      parentId: 'comboC',
    },
    {
      id: 'combo3',
      parentId: 'comboD',
    },
    {
      id: 'comboC',
    },
    {
      id: 'comboD',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
});

graph.data(data);
graph.render();
```

The result:
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ltsuTbIkG48AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

The example above uses the default [Circle Combo](/en/docs/manual/middle/elements/combos/circle), G6 also has [Rect Combo](/en/docs/manual/middle/elements/combos/rect). The configurations can be found in their docs. You can also customize a type of combo by [Custom Combo](/en/docs/manual/advanced/custom-combo) mechanism.

<br />此时，不能对分组中的节点及 Combo 进行任何操作，接下来，我们介绍可以对 Combo 进行的各种操作。

### Combo Interaction

To allow the users to interact with the combos, we implemented three built-in behaviors: `drag-combo`, `collapse-expand-combo`, and `drag-node` [Behavior](/en/docs/manual/middle/states/defaultBehavior)s.

#### drag-combo

`'drag-combo'`behavior supports dragging a combo to re-arrange its position or its hierarchy. 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0Bj-Toa2B9YAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

#### collapse-expand-combo

`'collapse-expand-combo'`behavior supports collapsing or expanding the combo by double clicking. The children will be hidden when the combo is collapsed, and the edges related to the children will link to the combo.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*X0_PSYizJ4AAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>


#### drag-node

`'drag-node'` behavior allows end users to drag the node to re-arrange the position and change the hierarchy of the node and its parent combo.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E8MCQr5OywgAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

#### Configure the Behaviors

The code below shows how to configure the behaviors onto the graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: ['drag-combo', 'collapse-expand-combo', 'drag-node'],
  }
});
```