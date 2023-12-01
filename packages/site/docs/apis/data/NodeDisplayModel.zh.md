---
title: NodeDisplayModel 渲染数据
order: 5
---

NodeDisplayModel（节点的渲染数据）是 [NodeModel](./NodeModel.zh.md) 经过[数据映射](./DataIntro.zh.md#transforms-数据转换)后的结果，该数据仅能被 G6 访问。

<embed src="../../common/DataID.zh.md"></embed>

## data <Badge type="error">必须</Badge>

基于 [NodeModel](./NodeModel.zh.md) 的内容额外加上了图形样式配置。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.zh.md"></embed>

<embed src="../../common/DataAnimates.zh.md"></embed>

### keyShape

**类型**：`ShapeStyleProps`

> `'circle-node'` 的主图形是 ['circle'](/apis/shape/circle-style-props)；`'image-node'` 的主图形是 ['image'](/apis/shape/image-style-props)

节点主图形的样式配置。节点的主图形表达了节点的主要形状。还用于计算边的连入位置。

<embed src="../../common/DataIconShape.zh.md"></embed>

<embed src="../../common/DataHaloShape.zh.md"></embed>

<embed src="../../common/DataLabelShape.zh.md"></embed>

<embed src="../../common/DataLabelBackgroundShape.zh.md"></embed>

<embed src="../../common/DataBadgeShapes.zh.md"></embed>

<embed src="../../common/DataAnchorShapes.zh.md"></embed>

<embed src="../../common/DataOtherShapes.zh.md"></embed>

:::info{title=提示}
下列属性继承自 [NodeModel](./NodeModel.zh.md)
:::

<embed src="../../common/NodeUserModel.zh.md"></embed>
