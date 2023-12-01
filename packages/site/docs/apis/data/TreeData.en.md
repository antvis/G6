---
title: TreeData
order: 2
---

A tree is a special graph, that is, a graph without a cycle. Tree data (TreeData) does not explicitly define edges, but implicitly represents edges through nested `children`, that is, there is an edge between parent and child nodes.

An example of a tree data is as follows:

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

G6 5.0 can read `TreeData`, `TreeData[]`, that is, **tree** and **forest**.

## Properties

<embed src="../../common/DataID.en.md"></embed>

### data <Badge type="error">Required</Badge>

**Type**: [NodeUserModelData](./NodeUserModelData.en.md);

The data of the node

### children

**Type**: `TreeData`

The array of child nodes of the current node
