---
title: DagreLayoutOptions
order: 1
---

本文展示所有分层/流程图布局的配置项。[Dagre 分层/流程图布局 DEMO](/zh/examples/net/dagreFlow/#dagre)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ESU8SrsUnlwAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*h60aQKusJRcAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## 指定节点层级

在节点数据中配置 `data.layer` 字段（从 `0` 开始计数），可以为节点指定层级。注意，`layer` 的指定不能违背图结构与层次布局原则，即每一条边的起点的 `layer` 一定小于终点的 `layer` 值。若违背该规则，则可能导致布局失败。

## begin

**类型**：`[number, number]`

**默认值**：`undefined`

**是否必须**：false

**说明**：布局的左上角对齐位置

## rankdir

**类型**：`'TB'` | `'BT'` | `'LR'` | `'RL'`

**默认值**：`'TB'`

**是否必须**：false

**说明**：布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）。

- `'TB'`：从上至下布局；
- `'BT'`：从下至上布局；
- `'LR'`：从左至右布局；
- `'RL'`：从右至左布局。

## align

**类型**：`'UL'` | `'UR'` | `'DL'` | `'DR'` | undefined

**默认值**：`'UL'`

**是否必须**：false

**说明**：节点对齐方式。U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL'：对齐到左上角；
- 'UR'：对齐到右上角；
- 'DL'：对齐到左下角；
- 'DR'：对齐到右下角；
- undefined：默认，中间对齐。

## nodeSize

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：默认取节点中的 `data.size` 值，若无此值则使用 `10`

**是否必须**：false

**说明**：每个节点的大小，用于计算每个节点占据的空间

## nodesep

**类型**：`number`

**默认值**：`50`

**是否必须**：false

**说明**：节点间距（px）。在 `rankdir` 为 `'TB'` 或 `'BT'` 时是节点的水平间距；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直方向间距。`nodesepFunc` 拥有更高的优先级

## nodesepFunc

**类型**：(`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：undefined

**是否必须**：false

**说明**：节点间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。在 `rankdir` 为 `'TB'` 或 `'BT'` 时是节点的水平间距；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直方向间距。优先级高于 `nodesep`，即若设置了 `nodesepFunc`，则 `nodesep` 不生效

**示例**：

```javascript
(nodeModel) => {
  // d 是一个节点的内部流转数据
  if (nodeModel.id === 'testId') return 100;
  return 10;
};
```

## ranksep

**类型**：`number`

**默认值**：`50`

**是否必须**：false

**说明**：层间距（px）。在 `rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距。`ranksepFunc` 拥有更高的优先级

## ranksepFunc

**类型**：(`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：`undefined`

**是否必须**：false

**说明**：层间距（px）。在 `rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距。优先级高于 `nodesep`，即若设置了 `nodesepFunc`，则 `nodesep` 不生效

**示例**：

```javascript
(nodeModel) => {
  // d 是一个节点的内部流转数据
  if (nodeModel.id === 'testId') return 100;
  return 10;
};
```

## controlPoints

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否同时计算边上的的控制点位置，仅在边配置中使用了内置折线（`type: 'polyline-edge'`） 时，或任何将自定义消费了 `data.controlPoints` 字段作为控制点位置的边时生效。本质上就是给边数据增加了 `data.controlPoints`

## preset

**类型**：

```typescript
{
  nodes: {
    x: number, // 位置
    y: number, // 位置
    layer?: number, // 指定层级
    _order?: number // 若为上一次 dagre 布局的输出，则有该字段，代表同层节点的顺序
  }[]
}
```

**默认值**：undefined

**是否必须**：false

**说明**：布局计算时参考的节点位置，一般用于切换数据时保证重新布局的连续性。在 G6 中，若是更新数据，则将自动使用已存在的布局结果数据作为输入。

## nodeOrder

**类型**：`string`[]

**默认值**：`false`

**是否必须**：false

**说明**：同层节点顺序的参考数组，存放节点 id 值。若未指定，则将按照 dagre 本身机制排列同层节点顺序。

## sortByCombo

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：建议在有 Combo 的情况下配置，同一层节点是否根据每个节点数据中的 `parentId` 进行排序，以防止 Combo 重叠

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用 web-worker 以防布局计算时间过长阻塞页面交互。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
