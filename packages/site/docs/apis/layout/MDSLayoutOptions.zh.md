---
title: MDS 高维数据降维
order: 12
---

本文展示所有 MDS 高维数据降为布局配置项。[MDS 布局 DEMO](/zh/examples/net/mdsLayout/#basicMDS)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*myM6T6R_d34AAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

圆形布局的中心位置

## linkDistance

**类型**：`number | (model: EdgeModel) => number`

**默认值**：`200`

边的理想长度，可以理解为边作为弹簧在不受力下的长度

<embed src="../../common/LayoutWorkerEnabled.zh.md"></embed>

