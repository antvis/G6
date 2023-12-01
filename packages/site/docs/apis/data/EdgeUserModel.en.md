---
title: EdgeUserModel
order: 6
---

The `edges` part of the user input data.

An example of a data item:

```json
{
  "id": "edge-1",
  "source": "node-1",
  "target": "node-2",
  "data": {}
}
```

<embed src="../../common/DataID.en.md"></embed>

## source <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## target <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## data <Badge type="error">Required</Badge>

The edge data.

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/EdgeUserModel.en.md"></embed>
