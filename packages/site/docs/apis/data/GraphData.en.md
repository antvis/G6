---
title: GraphData
order: 1
---

Graph data (GraphData) is one of the data types received by Graph, which contains a collection of nodes, edges, and combos.

An example of a graph data is as follows:

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

## Properties

### nodes <Badge type="error">Required</Badge>

**Type**: `NodeUserModel[]`

- [NodeUserModel](./NodeUserModel.en.md)

Nodes collection

### edges <Badge type="error">Required</Badge>

**Type**: `EdgeUserModel`

- [EdgeUserModel](./EdgeUserModel.en.md)

Edges collection

### combos

**Type**: `ComboUserModel`

- [ComboUserModel](./ComboUserModel.en.md)

Combos collection
