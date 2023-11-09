---
title: ComboCombined
order: 3
---

This document showcases all the configuration options for the Combo combined layout. [ComboCombined Layout DEMO](/en/examples/net/comboLayout/#comboCombined).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**Type**: `[number, number]`

**Default**: The center of the canvas.

**Required**: false

**Description**: The center of the layout.

## outerLayout

**Type**: `LayoutInstance`

**Default**: Force layout instance

**Required**: false

**Description**:The outer layout algorithm, default to force. See the documentation of the used layout for specific parameters. By default, the force layout uses the following parameters:

```javascript
outerLayout: new G6.Extensions.ForceLayout({
  gravity: 1,
  factor: 2,
  linkDistance: (edge: EdgeInnerModel, source: NodeInnerModel, target: NodeInnerModel) => {
    const nodeSize = ((source.data.size?.[0] || 30) + (target.data.size?.[0] || 30)) / 2;
    return Math.min(nodeSize * 1.5, 700);
  },
});
```

## innerLayout

**Type**: `LayoutInstance`

**Default**: Concentric layout instance

**Required**: false

**Description**: The inner layout algorithm for the combo. It needs to use a synchronous layout algorithm, default to concentric. See the documentation of the used layout for specific parameters. By default, the concentric layout uses the following parameters:

```javascript
innerLayout: new G6.Extensions.ConcentricLayout({
  sortBy: 'id',
});
```

## comboPadding

**Type**: `number` \| (`comboModel`: `ComboInnerModel`) => `number`

**Default**: `10`

**Required**: false

**Description**: The padding value inside the combo, not used for rendering, only used for force calculation. It is recommended to set it to the same value as the combo's internal padding on the view. Example:

```javascript
(comboModel) => {
  // comboModel is a combo inner model
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

## nodeSize

**Type**: `number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**Default**: `10`

**Required**: false

**Description**: The size of the node (diameter) used for collision detection. If not specified, it is calculated based on the `data.size` property in the node model. If neither is specified, the default size is `10`.

## spacing

**Type**: `number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**Default**: `0`

**Required**: false

**Description**: `preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例

**示例**：

```typescript
(nodeModel: NodeInnerModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## workerEnabled

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> When `workerEnabled: true`, all parameter types of functions are not supported.
