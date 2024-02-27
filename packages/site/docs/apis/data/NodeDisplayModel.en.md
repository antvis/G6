---
title: NodeDisplayModel
order: 5
---

NodeDisplayModel is the rendering data of Node, which is obtained by [NodeModel](./NodeModel.en.md) through [data mapping](./DataIntro.en.md#mappers). NodeDisplayModel can only be accessed by G6.

<embed src="../../common/DataID.en.md"></embed>

## data <Badge type="error">Required</Badge>

NodeDisplayModelData adds graphic style configuration on the basis of [NodeModel](./NodeModel.en.md).

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

<embed src="../../common/DataAnimates.en.md"></embed>

### keyShape

**Type**: `ShapeStyle`

> Which varies depending on the main shape. For example, the main shape of `'circle-node'` is `'circle'`, refer to [Circle Graphic Style](/en/apis/shape/circle-style-props); the main shape of `'image-node'` is `'image'`, refer to [Image Graphic Style](/en/apis/shape/image-style-props).

Configuration of the main shape style of the node. The main shape of a node represents the primary shape of the node and is also used to calculate the position where edges connect.

<embed src="../../common/DataIconShape.en.md"></embed>

<embed src="../../common/DataHaloShape.en.md"></embed>

<embed src="../../common/DataLabelShape.en.md"></embed>

<embed src="../../common/DataLabelBackgroundShape.en.md"></embed>

<embed src="../../common/DataBadgeShapes.en.md"></embed>

<embed src="../../common/DataAnchorShapes.en.md"></embed>

<embed src="../../common/DataOtherShapes.en.md"></embed>

:::info
The following attributes are inherited from [NodeModel](./NodeModel.en.md)
:::

<embed src="../../common/NodeUserModel.en.md"></embed>
