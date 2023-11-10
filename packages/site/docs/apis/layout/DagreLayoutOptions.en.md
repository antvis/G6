---
title: DagreLayout
order: 2
---

This article showcases all the configuration options for the hierarchical/flowchart layout. [Dagre Hierarchical/Flowchart Layout DEMO](/en/examples/net/dagreFlow/#dagre).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ESU8SrsUnlwAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*h60aQKusJRcAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## Specify Node's Layer

You can specify the layer of nodes by configuring the `data.layer` field in the node model (counting starts from `0`). Note that the specified `layer` must follow the principles of the graph structure and hierarchical layout, which means the `layer` of the starting point of each edge must be smaller than the `layer` of the ending point. Violating this rule may cause layout failure.

## begin

**Type**: `[number, number]`

**Default**: `undefined`

**Required**: false

**Description**: The top-left alignment position of the layout.

## rankdir

**Type**: `'TB'` | `'BT'` | `'LR'` | `'RL'`

**Default**: `'TB'`

**Required**: false

**Description**: The direction of the layout. T: top; B: bottom; L: left; R: right.

- `'TB'`: Top to bottom layout;
- `'BT'`: Bottom to top layout;
- `'LR'`: Left to right layout;
- `'RL'`: Right to left layout.

## align

**Type**: `'UL'` | `'UR'` | `'DL'` | `'DR'` | undefined

**Default**: `'UL'`

**Required**: false

**Description**: The alignment of nodes. U: upper; D: down; L: left; R: right.

- `'UL'`: Align to the upper left corner;
- `'UR'`: Align to the upper right corner;
- `'DL'`: Align to the lower left corner;
- `'DR'`: Align to the lower right corner;
- `undefined`: Default, center alignment.

## nodeSize

**Type**: `number` \| `number`[] \| (`nodeModel`: `NodeModel`) => `number`

**Default**: Takes the `data.size` value from the node model by default, or uses `10` if it is not available.

**Required**: false

**Description**: The size of each node, used to calculate the space occupied by each node.

## nodesep

**Type**: `number`

**Default**: `50`

**Required**: false

**Description**: The spacing between nodes (in pixels). It represents the horizontal spacing between nodes when `rankdir` is `'TB'` or `'BT'`, and the vertical spacing between nodes when `rankdir` is `'LR'` or `'RL'`. `nodesepFunc` has a higher priority.

## nodesepFunc

**Type**: (`nodeModel`: `NodeModel`) => `number`

**Default**: undefined

**Required**: false

**Description**: The spacing between nodes (in pixels). It represents the horizontal spacing between nodes when `rankdir` is `'TB'` or `'BT'`, and the vertical spacing between nodes when `rankdir` is `'LR'` or `'RL'`. It has a higher priority than `nodesep`, which means that if `nodesepFunc` is set, `nodesep` will not take effect.

**Example**:

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'testId') return 100;
  return 10;
};
```

## ranksep

**Type**: `number`

**Default**: `50`

**Required**: false

**Description**: The spacing between layers (in pixels). It represents the vertical spacing between adjacent layers when `rankdir` is `'TB'` or `'BT'`, and the horizontal spacing between adjacent layers when `rankdir` is `'LR'` or `'RL'`. `ranksepFunc` has a higher priority.

## ranksepFunc

**Type**: (`nodeModel`: `NodeModel`) => `number`

**Default**: `undefined`

**Required**: false

**Description**: The spacing between layers (in pixels). It represents the vertical spacing between adjacent layers when `rankdir` is `'TB'` or `'BT'`, and the horizontal spacing between adjacent layers when `rankdir` is `'LR'` or `'RL'`. It takes precedence over `nodesep`, which means that if `ranksepFunc` is set, `nodesep` will not take effect.

**Example**:

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'testId') return 100;
  return 10;
};
```

## controlPoints

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to calculate the control point positions on edges. It only works when the built-in polyline (`type: 'polyline-edge'`) is used in edge configuration, or any edge that consumes `data.controlPoints` as control point positions. Essentially, it adds `data.controlPoints` to the edge data.

## preset

**Type**:

```typescript
{
  nodes: {
    x: number, // position
    y: number, // position
    layer?: number, // specify layer
    _order?: number // if it is the output of the previous dagre layout, there is this field, representing the order of the nodes in the same layer
  }[]
}
```

**Default**: undefined

**Required**: false

**Description**: The reference node positions used in layout calculation. It is generally used to ensure the continuity of re-layout when switching data. In G6, if the data is updated, the existing layout result data will be automatically used as input.

## nodeOrder

**Type**: `string`[]

**Default**: `false`

**Required**: false

**Description**: An array that serves as a reference for the order of nodes in the same layer. It stores node id values. If not specified, the nodes in the same layer will be arranged according to the mechanism of dagre itself.

## sortByCombo

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Suggested to be configured when there are Combos. Whether to sort the nodes in the same layer based on the `parentId` in each node data to avoid overlapping of Combos.

## workerEnabled

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> When `workerEnabled: true`, all parameter types of functions are not supported.
