---
title: EdgeModel
order: 8
---

EdgeModel represents the edge data that is internally passed through the `EdgeUserModel` and transformed on the graph instance. You consume this data anywhere afterwards. Each edge item extends from [EdgeUserModel](./EdgeUserModel.zh.md) and is defined as follows after expansion:

```typescript
interface EdgeModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeModelData; // = EdgeModelData
}
```

## id <Badge type="error">Required</Badge>

The unique ID of the edge. Once the node is created, the ID cannot be modified.

**Type**: `string | number`

## source <Badge type="error">Required</Badge>

The ID of the source node of the edge, which should correspond to an item in `nodes`. Otherwise, the edge data will not be added to the graph.

**Type**: `string | number`

## target <Badge type="error">Required</Badge>

The ID of the target node of the edge, which should correspond to an item in nodes. Otherwise, the edge data will not be added to the graph.

**Type**: `string | number`

## data <Badge type="error">Required</Badge>

The data in InnerModelData is the result of UserModelData transformed through a series of transform functions on the Graph instance. The business data may have been converted, filtered, and merged.

<embed src="../../common/DataAttrTips.en.md"></embed>

### type

The rendering type of the edge, which can be a registered edge type on the graph, with the built-in and default registered types being `'line-edge'` and `'loop-edge'`. The default value is `'line-edge'`.

**Type**: `string`;

### visible

Whether the edge is displayed by default.

**Type**: `boolean`;

### color

The theme color of the main shape (keyShape) of the edge, with a value in hexadecimal string format. This is provided for convenient simple configuration, and more style configurations should be configured in the edge mapper of the Graph instance for the keyShape and various shape styles.

**Type**: `string`;

### label

The text content of the `labelShape` of the edge. This is provided for convenient simple configuration, and more style configurations should be configured in the edge mapper of the Graph instance for the text value or other shape styles of the `labelShape`.

**Type**: `string`;

### badge

**Type**: `Badge`

<embed src="../../common/Badge.en.md"></embed>

The configuration of the badge on the edge, with the built-in badge being drawn after the text. More style configurations should be configured in the edge mapper of the Graph instance for the shape styles of the `badgeShapes`.

<embed src="../../common/DataIcon.en.md"></embed>

### sourceAnchor

The `anchorPoints` on the source node indicate the allowed positions where related edges can connect, and is an array. The `sourceAnchor` of the edge indicates which anchor point to connect to when the edge connects to the starting point, corresponding to the index of the corresponding position in the `anchorPoints` of the source node.

**Type**: `number`;

### targetAnchor

The `anchorPoints` on the target node indicate the allowed positions where related edges can connect, and is an array. The `targetAnchor` of the edge indicates which anchor point to connect to when the edge connects to the ending point, corresponding to the index of the corresponding position in the `anchorPoints` of the target node.

**Type**: `number`;
