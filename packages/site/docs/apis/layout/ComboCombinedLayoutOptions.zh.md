---
title: ComboCombinedLayoutOptions
order: 2
---

本文展示所有 Combo 复合布局的配置项。[ComboCombined 布局 DEMO](/zh/examples/net/comboLayout/#comboCombined)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**类型**：`[number, number]`

**默认值**：画布中心

**是否必须**：false

**说明**：布局的中心

## outerLayout

**类型**：`LayoutInstance`

**默认值**：Force 布局

**是否必须**：false

**说明**：最外层的布局算法，默认为 `force`。具体参数详见被使用布局的文档。默认情况下 `force` 布局将使用以下参数：

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

**类型**：`LayoutInstance`

**默认值**：Concentric 布局

**是否必须**：false

**说明**：combo 内部的布局算法，需要使用同步的布局算法，默认为 `concentric`。具体参数详见被使用布局的文档。
默认情况下 `concentric` 布局将使用以下参数：

```javascript
innerLayout: new G6.Extensions.ConcentricLayout({
  sortBy: 'id',
});
```

## comboPadding

**类型**：`number` \| (`comboModel`: `ComboInnerModel`) => `number`

**默认值**：`10`

**是否必须**：false

**说明**：Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 Combo 内部 padding 值相同的值

```javascript
(comboModel) => {
  // d is a combo inner model
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

## nodeSize

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：`10`

**是否必须**：false

**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点数据的 `data.size` 属性计算。若即不指定，节点中也没有 `data.size`，则默认大小为 `10`

## spacing

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：`0`

**是否必须**：false

**说明**：`preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例

**示例**：

```typescript
(nodeModel: NodeInnerModel) => {
  // d is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用 web-worker 以防布局计算时间过长阻塞页面交互。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
