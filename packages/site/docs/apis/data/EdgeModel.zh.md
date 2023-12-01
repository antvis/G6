---
title: EdgeModel 内部数据
order: 7
---

EdgeModel 为内部流转的边数据，由 [EdgeUserModel](./EdgeUserModel.zh.md) 经过[数据转换](./DataIntro.zh.md#transforms-数据转换)后得到。

<embed src="../../common/DataInnerModelTips.zh.md"></embed>

<embed src="../../common/DataID.zh.md"></embed>

## source <Badge type="error">必须</Badge>

**类型**：`string | number`

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## target <Badge type="error">必须</Badge>

**类型**：`string | number`

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## data <Badge type="error">必须</Badge>

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/EdgeUserModel.zh.md"></embed>
