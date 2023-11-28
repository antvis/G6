---
title: NodeModel
order: 6
---

NodeModel represents the internal data of a node that flows within the graph instance. It is derived from [`NodeUserModel`](./NodeUserModel.zh.md) through calculations performed on the graph instance. This data is consumed in any subsequent usage. Each node item inherits from [`NodeUserModel`](./NodeUserModel.zh.md) and is defined as follows:

```typescript
interface NodeModel {
  id: string | number;
  data: NodeModelData; // = NodeModelData
}
```

## id

The unique ID of the node. Once the node is created, the ID cannot be modified.

- **Required**: True;
- **Type**: `string|number`

## data

The data in InnerModelData is the result of applying a series of transforms on UserModelData through the graph instance. The business data may have been transformed, filtered, or merged.

- **Required**: True;
- **Type**: `NodeModelData`, Same as [`NodeUserModelData`](./NodeUserModel.zh.md#nodeusermodeldatatype), defined as follows:

### NodeModelData.type

The rendering type of the node. It can be a registered node type of the graph class. The built-in and default registered types are `'circle-node'`, `'rect-node'`, and `'image-node'`. `'circle-node'` by default.

- **Required**: False;
- **Type**: `string`;

### NodeModelData.x

The x-axis position of the node. If the node position is not specified and the `layout` is not configured for the graph instance, the node may be rendered in the top-left corner of the canvas.

- **Required**: False;
- **Type**: `number`;

### NodeModelData.y

The y-axis position of the node. If the node position is not specified and the `layout` is not configured for the graph instance, the node may be rendered in the top-left corner of the canvas.

- **Required**: False;
- **Type**: `number`;

### NodeModelData.z

For 2D graphs, the z-value does not need to be specified. If specified, it may cause nodes to be invisible under the WebGL renderer. In 3D graphs, the z-value is required and represents the node's z-axis position. If the node position is not specified and the `layout` is not configured for the graph instance, the node may be rendered in the top-left corner of the canvas.

- **Required**: False;
- **Type**: `number`;

### NodeModelData.visible

Whether the node is visible by default.

- **Required**: False;
- **Type**: `boolean`;

### NodeModelData.color

The theme color of the main graph (keyShape) of the node, represented as a hexadecimal string. This is provided for convenient simple configuration, and more style configurations should be done in the node mapper of the graph instance, configuring the keyShape and various graphical styles.

- **Required**: False;
- **Type**: `string`;

### NodeModelData.label

The text content of the labelShape of the node. This is provided for convenient simple configuration, and more style configurations should be done in the node mapper of the graph instance, configuring the text value of the labelShape or other graphical styles.

- **Required**: False;
- **Type**: `string`;

### NodeModelData.badges

The configuration of badges around the node. The configurable positions `BadgePosition` are as follows. This is provided for convenient simple configuration, and more style configurations should be done in the node mapper of the graph instance, configuring the graphical styles of badgeShapes.

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

### NodeModelData.icon

The configuration of the central icon of the node. This is provided for convenient simple configuration, and more style configurations should be done in the node mapper of the graph instance, configuring the graphical styles of the iconShape.

- **Required**: False;
- **Type**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // required when type is 'text'
  text?: string, // required when type is 'icon'
}
```

### NodeModelData.anchorPoints

The positions at which the edges are connected to the node, also known as the entry points of the edges. If not configured, the edges will automatically find the nearest positions on the node's edge for connection. For example, `[[0,0.5],[1,0.5]]`, where the numbers represent the percentage positions relative to the node's main graph (keyShape) in the x or y direction. This is provided for convenient simple configuration, and more style configurations should be done in the node mapper of the graph instance, configuring the graphical styles of anchorShapes.

- **Required**: False;
- **Type**: `number[][]`;

### NodeModelData.parentId

For graphs with combos, it represents the ID of the combo to which the node belongs.

- **Required**: False;
- **Type**: `string | number`;

### NodeModelData.isRoot

If you want to display this data as a tree graph and use a tree layout, specify whether this node is one of the root nodes of the tree.

- **Required**: False;
- **Type**: `boolean`;

### NodeModelData.preventPolylineEdgeOverlap

Whether to treat this node as an obstacle for avoiding `'polyline-edge'` type edges. The default value is `false`.

- **Required**: False;
- **Type**: `boolean`;
