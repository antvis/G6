---
title: TreeData
order: 2
---

树是一种特殊的图，即不存在环的图。树数据（TreeData）不显式定义边，而是通过嵌套的 `children` 隐式表示边，即父子节点之间存在一条边。

一个树数据的示例如下：

```json
{
  "id": "root",
  "data": {},
  "children": [
    {
      "id": "node-1",
      "data": {},
      "children": [
        {
          "id": "node-1-1",
          "data": {},
          "children": [
            {
              "id": "node-1-1-1",
              "data": {},
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

G6 5.0 可以读取 `TreeData`、`TreeData[]`，即**树**和**森林**。

## 属性

### id <Badge type="error">必须</Badge>

**类型**：`string | number`

节点的唯一 ID。节点创建后，ID 不可修改

### data <Badge type="error">必须</Badge>

**类型**：[NodeUserModelData](./NodeUserModel.zh.md#nodeusermodeldatatype)

节点数据

### children

**类型**：`TreeData`

当前节点的子节点数组
