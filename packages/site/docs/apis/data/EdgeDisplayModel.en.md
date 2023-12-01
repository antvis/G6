---
title: EdgeDisplayModel
order: 8
---

EdgeDisplayModel is the rendering data of Edge, which is obtained by [EdgeModel](./EdgeModel.en.md) through [data mapping](./DataIntro.en.md#mappers). EdgeDisplayModel can only be accessed by G6.

<embed src="../../common/DataID.en.md"></embed>

## source <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## target <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## data <Badge type="error">Required</Badge>

The data in EdgeDisplayModelData is the result of the EdgeModel being mapped through the mapper ([specification.edge](../graph/Specification.en.md#edge)) configured on the Graph instance. It should store all the contents of the EdgeModel, as well as many shape style configurations.

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

<embed src="../../common/DataAnimates.en.md"></embed>

### keyShape

The style configuration of the key shape of the edge. The key shape of the edge is the overall path shape of the edge.

**Type**: `ShapeStyle`, the shape style configuration of the key shape depends on the different main shapes. For example, the key shape of `'line-edge'` is `'line'`, please refer to [LineStyleProps](/en/apis/shape/line-style-props); the key shape of `'cubic-edge'` is `'path'`, please refer to [PathStyleProps](/en/apis/shape/path-style-props).

<embed src="../../common/DataIconShape.en.md"></embed>

<embed src="../../common/DataHaloShape.en.md"></embed>

<embed src="../../common/DataLabelShape.en.md"></embed>

<embed src="../../common/DataLabelBackgroundShape.en.md"></embed>

<embed src="../../common/DataOtherShapes.en.md"></embed>

:::info
The following attributes are inherited from [EdgeModel](./EdgeModel.en.md)
:::

<embed src="../../common/EdgeUserModel.en.md"></embed>
