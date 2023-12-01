---
title: ComboDisplayModel
order: 11
---

ComboDisplayModel is the rendering data of Combo, which is obtained by [ComboModel](./ComboModel.en.md) through [data mapping](./DataIntro.en.md#mappers). ComboDisplayModel can only be accessed by G6.

<embed src="../../common/DataID.en.md"></embed>

## data <Badge type="error">Required</Badge>

The data in ComboDisplayModelData is the result of mapping the ComboModel data through the mapper configuration specified on the graph instance ([specification.combo](../graph/Specification.en.md#combo)). It should contain all the contents of ComboModel along with additional shape style configurations.

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

<embed src="../../common/DataAnimates.en.md"></embed>

### keyShape

**Type**: `ShapeStyle`

The style configuration of the key shape of the Combo

> The key shape of `'circle-combo'` is ['circle'](/apis/shape/circle-style-props); the key shape of `'rect-combo'` is ['rect'](/apis/shape/rect-style-props).

<embed src="../../common/DataHaloShape.en.md"></embed>

<embed src="../../common/DataLabelShape.en.md"></embed>

<embed src="../../common/DataLabelBackgroundShape.en.md"></embed>

<embed src="../../common/DataBadgeShapes.en.md"></embed>

<embed src="../../common/DataAnchorShapes.en.md"></embed>

<embed src="../../common/DataOtherShapes.en.md"></embed>

:::info
The following attributes are inherited from [ComboModel](./ComboModel.en.md)
:::

<embed src="../../common/ComboUserModel.en.md"></embed>
