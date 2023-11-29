---
title: NodeModel 内部数据
order: 6
---

NodeModel 为内部流转的节点数据，由 NodeUserModel 经过[数据转换](/apis/data/data-intro#transforms-数据转换)后得到。

## id <Badge type="error">必须</Badge>

节点的唯一 ID，节点创建后，ID 不可被修改。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

InnerModelData 中的数据已经是 UserModelData 处理后的结果。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/NodeUserModel.zh.md"></embed>
