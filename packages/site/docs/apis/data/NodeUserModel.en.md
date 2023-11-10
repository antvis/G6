---
title: NodeUserModel
order: 3
---

The data part of each node model in the user input data is explained as follows.

```typescript
interface NodeUserModel {
  id: string | number;
  data: NodeUserModelData;
}
```

## id

- **Required**: True;
- **Type**: `string|number`;

The unique ID of the node. Once the node is created, the ID cannot be changed.

## data

- **Required**: True;
- **Type**: [`NodeUserModelData`](#nodeusermodeldatatype);

The data of the node, excluding the ID. It is recommended to store business data. If data conversion is needed, it can be done through the transform function configured in the Graph instance, see [Specification.transforms](../graph/Specification.en.md#transforms). The converted data becomes the internal data that circulates within the graph. All subsequent accesses will be based on this internal data. For rendering-related data, it can be mapped using the node mapper of the Graph instance, see [Specification.node](../graph/Specification.en.md#node) The input of this mapper is the internal data, and the generated display data is only consumed by the renderer. Users will not obtain it anywhere.

### NodeUserModelData.type

- **Required**: False;
- **Type**: `string`;

Type: string The rendering type of the node. It can be a node type that has been registered with the graph class. Built-in and default registered types include `'circle-node'`, `'rect-node'`, and `'image-node'`.

### NodeUserModelData.x

- **Required**: False;
- **Type**: `number`;

Type: number The x-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### NodeUserModelData.y

- **Required**: False;
- **Type**: `number`;

The y-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### NodeUserModelData.z

- **Required**: False;
- **Type**: `number`;

For 2D graphs, there is no need to specify the z value. If it is specified, it may cause the node to be invisible under the WebGL renderer. In 3D graphs, the z value is required and represents the z-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### NodeUserModelData.visible

- **Required**: False;
- **Type**: `boolean`;

Whether the node is displayed by default.

### NodeUserModelData.color

- **Required**: False;
- **Type**: `string`;

The main color of the primary shape (keyShape) of the node, expressed as a hexadecimal string. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the keyShape and various graphic styles are configured.

### NodeUserModelData.label

- **Required**: False;
- **Type**: `string`;

The text content of the label shape of the node. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the text value of the labelShape or other graphic styles are configured.

### NodeUserModelData.badges

- **Required**: False;
- **Type**:

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // required when type is 'text'
  text?: string, // required when type is 'icon'
}[];
```

The configuration of the badges around the node. The possible positions `BadgePosition` are as follows. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the graphic styles of the badgeShapes are configured.

```typescript
BadgePosition: 'rightTop' |
  'right' |
  'rightBottom' |
  'bottomRight' |
  'bottom' |
  'bottomLeft' |
  'leftBottom' |
  'left' |
  'leftTop' |
  'topLeft' |
  'top' |
  'topRight';
```

### NodeUserModelData.icon

- **Required**: False;
- **Type**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // required when type is 'text'
  text?: string, // required when type is 'icon'
}
```

The configuration of the central icon of the node. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the graphic styles of the iconShape are configured.

### NodeUserModelData.anchorPoints

- **Required**: False;
- **Type**: `number[][]`;

The positions where the edges are connected to the node. If not configured, the edges will automatically find the nearest positions on the edge of the node for connection. For example, `[[0,0.5],[1,0.5]]`, where the numbers indicate the percentage position relative to the primary shape (keyShape) of the node in the x or y direction. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the graphic styles of the anchorShapes are configured.

### NodeUserModelData.parentId

- **Required**: False;
- **Type**: `string | number`;

In a graph with combos, it indicates the ID of the combo to which the node belongs.

### NodeUserModelData.isRoot

- **Required**: False;
- **Type**: `boolean`;

If you want to display the data as a tree diagram and use tree layout at the same time, specify whether this node is one of the root nodes of the tree.

### NodeUserModelData.preventPolylineEdgeOverlap

- **Required**: False;
- **Type**: `boolean`;

Whether to treat this node as an obstacle and make it avoid the `'polyline-edge'` type of edges. The default value is `false`.
