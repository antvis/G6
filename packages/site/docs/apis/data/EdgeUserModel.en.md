---
title: EdgeUserModel
order: 4
---

In the user input data, each edge model has the following type specifications.

```typescript
interface EdgeUserModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeUserModelData;
}
```

## id <Badge type="error">Required</Badge>

**Type**: `string | number`

The unique ID of the edge. Once the edge is created, the ID cannot be changed.

## source <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## target <Badge type="error">Required</Badge>

**Type**: `string | number`

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## data <Badge type="error">Required</Badge>

The data of the edge, excluding the ID, source ID, and target ID. It is recommended to store business data. If data conversion is needed, it can be done through the transform function configured in the Graph instance, see [Specification.transforms](../graph/Specification.en.md#transforms). The converted data becomes the internal data that circulates within the graph. All subsequent accesses will be based on this internal data. For rendering-related data, it can be mapped using the edge mapper of the Graph instance, see [Specification.node](../graph/Specification.en.md#edge). The input of this mapper is the internal data, and the generated display data is only consumed by the renderer. Users will not obtain it anywhere.

<embed src="../../common/DataAttrTips.en.md"></embed>

### type

**Type**: `string`;

The rendering type of the edge. It can be a pre-registered edge type in the graph, with `'line-edge'` and `'loop-edge'` being the built-in and default options.

### visible

**Type**: `boolean`;

Whether the edge is visible by default.

### color

**Type**: `string`;

The main color of the key shape (main shape) of the edge. It is a hexadecimal string. This is provided for simple configuration purposes. More style configurations for the key shape and other shapes should be configured in the edge mapper of the graph instance.

### label

**Type**: `string`;

The text content of the label shape on the edge. This is provided for simple configuration purposes. More style configurations for the label shape should be configured in the edge mapper of the graph instance.

### badge

**Type**: `Badge`

<embed src="../../common/Badge.en.md"></embed>

The configuration of the badge on the edge. The built-in badge is drawn after the text. More style configurations for the badge shapes should be configured in the edge mapper of the graph instance.

<embed src="../../common/DataIcon.en.md"></embed>

### sourceAnchor

**Type**: `number`;

The `anchorPoints` on the source node indicate the positions where the related edges can connect. It is an array. The `sourceAnchor` of the edge indicates which anchor point to connect when connecting to the source node. It corresponds to the index of the corresponding position in the `anchorPoints` array of the source node.

### targetAnchor

**Type**: `number`;

The `anchorPoints` on the target node indicate the positions where the related edges can connect. It is an array. The `targetAnchor` of the edge indicates which anchor point to connect when connecting to the target node. It corresponds to the index of the corresponding position in the `anchorPoints` array of the target node.
