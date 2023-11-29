---
title: ComboCombined
order: 3
---

This document showcases all the configuration options for the Combo combined layout. [ComboCombined Layout DEMO](/en/examples/net/comboLayout/#comboCombined).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**Type**: `[number, number]`

**Default**: The center of the canvas.

The center of the layout.

## outerLayout

**Type**: `LayoutInstance`

**Default**: Force layout instance

**Description**:The outer layout algorithm, default to force. See the documentation of the used layout for specific parameters. By default, the force layout uses the following parameters:

```javascript
outerLayout: new G6.Extensions.ForceLayout({
  gravity: 1,
  factor: 2,
  linkDistance: (edge: EdgeModel, source: NodeModel, target: NodeModel) => {
    const nodeSize = ((source.data.size?.[0] || 30) + (target.data.size?.[0] || 30)) / 2;
    return Math.min(nodeSize * 1.5, 700);
  },
});
```

## innerLayout

**Type**: `LayoutInstance`

**Default**: Concentric layout instance

The inner layout algorithm for the combo. It needs to use a synchronous layout algorithm, default to concentric. See the documentation of the used layout for specific parameters. By default, the concentric layout uses the following parameters:

```javascript
innerLayout: new G6.Extensions.ConcentricLayout({
  sortBy: 'id',
});
```

## comboPadding

**Type**: `number | (comboModel: ComboModel) => number`

**Default**: `10`

The padding value inside the combo, not used for rendering, only used for force calculation. It is recommended to set it to the same value as the combo's internal padding on the view. Example:

```javascript
(comboModel) => {
  // comboModel is a combo inner model
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<embed src="../../common/LayoutNodeSize.en.md"></embed>

## spacing

<embed src="../../common/LayoutSizeOrSpacing.en.md"></embed>

**Default**: `0`

`preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例

**示例**：

```typescript
(nodeModel: NodeModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<embed src="../../common/LayoutWorkerEnabled.en.md"></embed>
