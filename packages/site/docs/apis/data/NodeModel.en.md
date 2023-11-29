---
title: NodeModel
order: 6
---

NodeModel is the node data that flows internally, which is obtained by NodeUserModel through [data transforms](/en/apis/data/data-intro#transforms-数据转换).

## id <Badge type="error">Required</Badge>

The unique ID of the node. Once the node is created, the ID cannot be modified.

**Type**: `string | number`

## data <Badge type="error">Required</Badge>

The data in InnerModelData has been processed by UserModelData.

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/NodeUserModel.en.md"></embed>
