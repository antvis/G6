---
title: MDS 高维数据降维
order: 12
---

本文展示所有 MDS 高维数据降为布局配置项。[MDS 布局 DEMO](/zh/examples/net/mdsLayout/#basicMDS)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*myM6T6R_d34AAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

**是否必须**：false

**说明**：圆形布局的中心位置

## linkDistance

**类型**：`number` \| (`model`: `EdgeModel`) => `number`

**默认值**：`200`

**是否必须**：false

**说明**：边的理想长度，可以理解为边作为弹簧在不受力下的长度

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用 web-worker 以防布局计算时间过长阻塞页面交互。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
