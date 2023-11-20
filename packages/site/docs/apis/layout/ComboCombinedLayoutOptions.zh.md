---
title: ComboCombined 复合
order: 3
---

本文展示所有 Combo 复合布局的配置项。[ComboCombined 布局 DEMO](/zh/examples/net/comboLayout/#comboCombined)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**类型**：`[number, number]`

**默认值**：画布中心

布局的中心

## outerLayout

**类型**：`LayoutInstance`

**默认值**：Force 布局

最外层的布局算法，默认为 `force`。具体参数详见被使用布局的文档。默认情况下 `force` 布局将使用以下参数：

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

**类型**：`LayoutInstance`

**默认值**：Concentric 布局

combo 内部的布局算法，需要使用同步的布局算法，默认为 `concentric`。具体参数详见被使用布局的文档。
默认情况下 `concentric` 布局将使用以下参数：

```javascript
innerLayout: new G6.Extensions.ConcentricLayout({
  sortBy: 'id',
});
```

## comboPadding

**类型**：`number | (comboModel: ComboModel) => number`

**默认值**：`10`

Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 Combo 内部 padding 值相同的值

```javascript
(comboModel) => {
  // d is a combo inner model
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<embed src="../../common/LayoutNodeSize.zh.md"></embed>

## spacing

<embed src="../../common/LayoutSizeOrSpacing.zh.md"></embed>

**默认值**：`0`

`preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例

**Example**:

```typescript
(nodeModel: NodeModel) => {
  // d is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<embed src="../../common/LayoutWorkerEnabled.zh.md"></embed>
