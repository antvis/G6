---
title: TreeGraph
order: 2
---

If you are going to visualize a tree, TreeGraph of G6 is more appropriate than Graph. The main differences between `G6.TreeGraph` and `G6.Graph` are data structure and built-in layout algorithms:

- Data structure: In G6, the tree data has nested structure. Edges are implicit in it. Each node data has `id` and `children` properties at least:

```javascript
const data = {
  id: 'root',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};
```

- Tree layout algorithms:
  - Tree layout algorithms do not modify the source data. it generates a new data instead. And the source data will be a property of the new data. This mechanism will reduce the complexity of transformation from nested data to nodes and edges in graph.
  - The layout will be re-calculated after adding / deleting / expanding / collapsing nodes on the tree.

## Initialize

### G6.TreeGraph

**Configurations**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| layout | Object | null | _V3.0.4 supports configurations for TreeGraph layout_. Before V3.0.4, the layout is formatted as a function. We recommend developers to use configurations now. |
| animate | Boolean | true | Whether to activate animation for relayout. |

**Usage**

```javascript
const treeGraph = new G6.TreeGraph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange(item, collapsed) {
          const icon = item.get('group').findByClassName('collapse-icon');
          if (collapsed) {
            icon.attr('symbol', EXPAND_ICON);
          } else {
            icon.attr('symbol', COLLAPSE_ICON);
          }
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  layout: {
    type: 'dendrogram',
    direction: 'LR', // H / V / LR / RL / TB / BT
    nodeSep: 50,
    rankSep: 100,
    radial: true,
  },
});
```

## Configurations of Layout

There are four layout algorithms for tree in G6: dendrogram, compactBox, mindmap, and indeted.

### Common Configurations

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | String | dendrogram | The type of layout. Options: `'dendrogram'`, `'compactBox'`, `'mindmap'`, and `'indeted'`. |
| direction | String | LR | The direction of layout. Options: `'LR'` , `'RL'` , `'TB'` , `'BT'` , `'H'` , and `'V'`.<br />L: Left; R: right; T: top; B: bottom; H: horizontal; V: vertical. |
| getChildren | Function |  | Return all the children nodes of the current node. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When`type='indeted'`, `direction` can only be `'LR'`, `'RL'`, and `'H'`.

### dendrogram

**dendrogram Sketch**

Different results with different `direction` values.

| LR | RL | H |
| --- | --- | --- |
| <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width='180' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qVbeR4oq4lYAAAAAAAAAAABkARQnAQ' width='180' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OHetRqedHOkAAAAAAAAAAABkARQnAQ' width='250' height='100'> |

| TB | BT | V |
| --- | --- | --- |
| <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*P_OETZsj17cAAAAAAAAAAABkARQnAQ' width='100' height='150'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*n6sFS57g424AAAAAAAAAAABkARQnAQ' width='100' height='150'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CyVbQ5q_0_cAAAAAAAAAAABkARQnAQ' width='100' height='180'> |

**Configurations of dendrogram**

| Name         | Type    | Required | Description                                      |
| ------------ | ------- | -------- | ------------------------------------------------ |
| nodeSep      | Number  | 20       | The separation between nodes in the same level.  |
| rankSep      | Number  | 200      | The separation between nodes in adjacent levels. |
| nodeSize     | Number  | 20       | The node size.                                   |
| subTreeSep   | Number  | 10       | The separation between sub trees.                |
| isHorizontal | Boolean | true     | Whether to layout the tree in horizontal.        |

### compactBox

**compactBox Sketch**

Different effects for different `direction` values.

| LR | RL | H |
| --- | --- | --- |
| <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width='230' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AHfiQ7IfWJwAAAAAAAAAAABkARQnAQ' width='230' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ygp0RaTxjp8AAAAAAAAAAABkARQnAQ' width='230' height='100'> |

| TB | BT | V |
| --- | --- | --- |
| <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sj6qSqrBvpIAAAAAAAAAAABkARQnAQ' width='230' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4tDzSpYiq-cAAAAAAAAAAABkARQnAQ' width='230' height='100'> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Mj0WSaTKzSsAAAAAAAAAAABkARQnAQ' width='230' height='100'> |

**compactBox Configurations**

| Name      | Type     | Required | Description                                   |
| --------- | -------- | -------- | --------------------------------------------- |
| getId     | Function |          | Set the id for nodes.                         |
| getHeight | Function | 36       | Set the heights of nodes.                     |
| getWidth  | Function | 18       | Set the widths of nodes.                      |
| getVGap   | Function | 18       | Set the vertical separations between nodes.   |
| getHGap   | Function | 18       | Set the horizontal separations between nodes. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> `getWidth`, `getHeight`, `getVGap`, and `getHGap` will not change the node size:

```javascript
/*
 * Gaps: filling space between nodes
 * (x, y) ----------------------
 * |            vgap            |
 * |    --------------------    h
 * | h |                    |   e
 * | g |                    |   i
 * | a |                    |   g
 * | p |                    |   h
 * |   ---------------------    t
 * |                            |
 *  -----------width------------
 */
```

**🦁It is the same for indented and mindmap.**

### indented

**indented Sketch**

Different results with different `direction` values.

| LR | RL | H |
| --- | --- | --- |
| <img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/png/178530/1560910055783-3783faed-29f0-4e34-9076-df951aa6ea10.png#align=left&display=inline&percent=0&size=0&status=done' width='150' height='100'> | <img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/png/178530/1560910055615-54aaca32-7de4-471e-8600-611854094b90.png#align=left&display=inline&percent=0&size=0&status=done' width='150' height='100'> | <img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/png/178530/1560910055676-86d316d8-9487-4b3d-99a4-27b4a8c091c0.png#align=left&display=inline&percent=0&size=0&status=done' width='230' height='100'> |

**Configurations of indented**

| Name      | Type     | Required | Description                                |
| --------- | -------- | -------- | ------------------------------------------ |
| indent    | Number   | 20       | The indent to parrent node.                |
| getVGap   | Function | 18       | Set the vertical sparations between nodes. |
| getHeight | Function | 36       | Set the heights of nodes.                  |

### mindmap

**mindmap Sketch**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width='350'>

**Configurations of mindmap**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| getId | Function |  | Set the id of nodes. |
| getHeight | Function | 36 | Set the heights of nodes. |
| getWidth | Function | 18 | Set the widths of nodes. |
| getSide | Function |  | Specify the nodes to be layed on the left or the right of the root. |
| getSubTreeSep | Function | 0 | Set the height separations between nodes. |
| getVGap | Function | 18 | Set the vertical separations between nodes. |
| getHGap | Function | 18 | Set the horizontal separations between nodes. |

## Update

### addChild(data, parent)

Add sub tree to the parent node.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> G6 will use the `data` object as the model of the newly added item, and the `data` might be modified. If you do not want it to be modified, use the deep cloned `data` instead.


**Parameters**

| Name   | Type   | Required | Description          |
| ------ | ------ | -------- | -------------------- |
| data   | Object | true     | The data of subtree. |
| parent | Node   | String   | true                 | The id or instance of parent node. |

**Usage**

```javascript
const data = {
  id: 'sub1',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};

treeGraph.addChild(data, 'root')
```

### updateChild(data, parent)

Incrementally update the children data of the parent.

**Parameters**

| Name   | Type   | Required | Description           |
| ------ | ------ | -------- | --------------------- |
| data   | Object | true     | The data of subtreee. |
| parent | Node   | String   | false                 | The id or instance of parent node. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When the `parent` is null, this operation will update the graph fully.

**Usage**

```javascript
const data = {
  id: 'sub1',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};

treeGraph.updateChild(data, 'root')
```

### removeChild(id)

Remove the subtree started from a child node with the id.

**Parameters**

| Name | Type   | Required | Description                          |
| ---- | ------ | -------- | ------------------------------------ |
| id   | String | true     | The id of the subtree to be removed. |

**Usage**

```javascript
treeGraph.removeChild('sub');
```

## Layout

### changeLayout(layout)

Change the layout.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| layout | Object | false | The new layout configurations. If the `layout` is null, the layout will not be changed. |

**Usage**

```javascript
const layout = {
  type: 'mindmap',
  dirction: 'H',
  getSubTreeSep: () => 20,
  getVGap: () => 25,
  getHeight: () => 30,
  getWidth: () => 30,
};
treeGraph.changeLayout(layout);
```

### refreshLayout(fitView)

Refresh the layout. Usually, it is called after changing data.

**Parameters**

| Name    | Type    | Required | Description                                  |
| ------- | ------- | -------- | -------------------------------------------- |
| fitView | Boolean | false    | Whether to fit view after refreshing layout. |

**Usage**

```javascript
treeGraph.refreshLayout(true);
```

## Search

### findDataById(id, target)

Find data model according to the id.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | String | true | The id of the item. |
| target | Object | false | Search from the target. If the target is null, this operation will search from the root node. |

**Return**

- The type of return value: Object;
- The return value is the data model of the found node.

**Usage**

```javascript
const target = {
	id: 'sub1',
  children: [...]
}

// Search the node with id 'sub1.1' from target
const subData = treeGraph.findDataById('sub1.1', target)

// Search the node with id 'sub1.1' from root node
const subData = treeGraph.findDataById('sub1.1')
```
