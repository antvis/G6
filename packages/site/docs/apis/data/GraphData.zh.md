---
title: GraphData
order: 1
---

图数据（GraphData）是 Graph 接收的数据类型之一，包含节点、边、群组 的集合。

一个图数据的示例如下：

```json
{
  "nodes": [
    { "id": "node-1", "data": { "parentId": "combo-1" } },
    { "id": "node-2", "data": { "parentId": "combo-1" } }
  ],
  "edges": [{ "id": "edge-1", "source": "node-1", "target": "node-2" }],
  "combos": [{ "id": "combo-1", "data": {} }]
}
```

## 属性

### nodes <Badge type="error">必须</Badge>

**类型**：`NodeUserModel`

- [NodeUserModel](./NodeUserModel.zh.md)

节点集

### edges <Badge type="error">必须</Badge>

**类型**：`EdgeUserModel`

- [EdgeUserModel](./EdgeUserModel.zh.md)

边集

### combos

**类型**：`ComboUserModel`

- [ComboUserModel](./ComboUserModel.zh.md)

群组集
