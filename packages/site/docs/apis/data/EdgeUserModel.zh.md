---
title: EdgeUserModel 输入数据
order: 6
---

用户输入数据中的 `edges` 部分内容。

下面是一个数据项实例：

```json
{
  "id": "edge-1",
  "source": "node-1",
  "target": "node-2",
  "data": {}
}
```

<embed src="../../common/DataID.zh.md"></embed>

## source <Badge type="error">必须</Badge>

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## target <Badge type="error">必须</Badge>

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

边数据

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/EdgeUserModel.zh.md"></embed>
