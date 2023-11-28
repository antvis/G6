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

## id

- **Required**: True;
- **Type**:`string|number`

The unique ID of the edge. Once the edge is created, the ID cannot be changed.

## source

- **Required**: True;
- **Type**:`string|number`

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## target

- **Required**: True;
- **Type**:`string|number`

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

## data

- **Required**: True;
- **Type**:[`EdgeUserModelData`](#edgeusermodeldatatype)

The data of the edge, excluding the ID, source ID, and target ID. It is recommended to store business data. If data conversion is needed, it can be done through the transform function configured in the Graph instance, see [Specification.transforms](../graph/Specification.en.md#transforms). The converted data becomes the internal data that circulates within the graph. All subsequent accesses will be based on this internal data. For rendering-related data, it can be mapped using the edge mapper of the Graph instance, see [Specification.node](../graph/Specification.en.md#edge). The input of this mapper is the internal data, and the generated display data is only consumed by the renderer. Users will not obtain it anywhere.

### EdgeUserModelData.type

- **Required**: False;
- **Type**: `string`;

The rendering type of the edge. It can be a pre-registered edge type in the graph, with `'line-edge'` and `'loop-edge'` being the built-in and default options.

### EdgeUserModelData.visible

- **Required**: False;
- **Type**: `boolean`;

Whether the edge is visible by default.

### EdgeUserModelData.color

- **Required**: False;
- **Type**: `string`;

The main color of the key shape (main shape) of the edge. It is a hexadecimal string. This is provided for simple configuration purposes. More style configurations for the key shape and other graphics should be configured in the edge mapper of the graph instance.

### EdgeUserModelData.label

- **Required**: False;
- **Type**: `string`;

The text content of the label shape on the edge. This is provided for simple configuration purposes. More style configurations for the label shape should be configured in the edge mapper of the graph instance.

### EdgeUserModelData.badge

- **Required**: False;
- **Type**:

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // Required if type is 'text'
  text?: string, // Required if type is 'icon'
};
```

The configuration of the badge on the edge. The built-in badge is drawn after the text. More style configurations for the badge shapes should be configured in the edge mapper of the graph instance.

### EdgeUserModelData.icon

- **Required**: False;
- **Type**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // Required if type is 'text'
  text?: string, // Required if type is 'icon'
}
```

The configuration of the icon on the edge. The built-in icon is drawn after the text. This is provided for simple configuration purposes. More style configurations for the icon shape should be configured in the edge mapper of the graph instance.

### EdgeUserModelData.sourceAnchor

- **Required**: False;
- **Type**: `number`;

The `anchorPoints` on the source node indicate the positions where the related edges can connect. It is an array. The `sourceAnchor` of the edge indicates which anchor point to connect when connecting to the source node. It corresponds to the index of the corresponding position in the `anchorPoints` array of the source node.

### EdgeUserModelData.targetAnchor

- **Required**: False;
- **Type**: `number`;

The `anchorPoints` on the target node indicate the positions where the related edges can connect. It is an array. The `targetAnchor` of the edge indicates which anchor point to connect when connecting to the target node. It corresponds to the index of the corresponding position in the `anchorPoints` array of the target node.
