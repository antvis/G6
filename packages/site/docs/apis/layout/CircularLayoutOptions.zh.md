---
title: Circular 环形
order: 4
---

本文展示所有环形布局配置项。[环形布局 DEMO](/zh/examples/net/circular/#circularConfigurationTranslate)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6DyT6468ZMAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1PpVQLFTaQwAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## radius

**类型**：`number`

**默认值**： 默认从节点大小与间距形成的周长计算而得

**是否必须**：false

**说明**：环形布局的半径。若设置了 `radius`，则 `startRadius` 与 `endRadius` 不生效

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

**是否必须**：false

**说明**：环形布局的中心位置

## clockwise

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否为顺时针布局

## divisions

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：节点在环上的分段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效

## ordering

**类型**：`'topology'` \| `'degree'` \| `null`

**默认值**：`null`

**是否必须**：false

**说明**：节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序

## angleRatio

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：从第一个节点到最后节点之间相隔多少个 2\*PI

## startRadius

**类型**：`number` \| `null`

**默认值**：`null`

**是否必须**：false

**说明**：螺旋状布局的起始半径

## endRadius

**类型**：`number` \| `null`

**默认值**：`null`

**是否必须**：false

**说明**：螺旋状布局的结束半径

## nodeSize

**类型**：`number` \| `number`[] \| (`nodeData`: `Node`) => `number`

**默认值**：读取节点数据中的 data.size，若无则默认值为 `10`

**是否必须**：false

**说明**： 节点占据的大小，在未指定 `radius` 时用于计算周长以得到环形布局的半径

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**： 是否启用 web-worker 以防布局计算时间过长阻塞页面交互

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
