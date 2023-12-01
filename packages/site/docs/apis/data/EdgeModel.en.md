---
title: EdgeModel
order: 7
---

EdgeModel is the internal edge data, which is obtained by [EdgeUserModel](./EdgeUserModel.en.md) through [transforms](./DataIntro.en.md#transforms).

<embed src="../../common/DataInnerModelTips.en.md"></embed>

<embed src="../../common/DataID.en.md"></embed>

## source <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the source node of the edge, which should correspond to an item in `nodes`. Otherwise, the edge data will not be added to the graph.

## target <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the target node of the edge, which should correspond to an item in nodes. Otherwise, the edge data will not be added to the graph.

## data <Badge type="error">Required</Badge>

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/EdgeUserModel.en.md"></embed>
