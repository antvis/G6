---
title: item
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../README.zh.md) / [Modules](../modules.zh.md) / item

## Interfaces

- [CircleStyleProps](../interfaces/item/CircleStyleProps.zh.md)
- [CubeGeometryProps](../interfaces/item/CubeGeometryProps.zh.md)
- [EllipseStyleProps](../interfaces/item/EllipseStyleProps.zh.md)
- [IAnchorPositionMap](../interfaces/item/IAnchorPositionMap.zh.md)
- [ImageStyleProps](../interfaces/item/ImageStyleProps.zh.md)
- [LineStyleProps](../interfaces/item/LineStyleProps.zh.md)
- [NodeShapeStyles](../interfaces/item/NodeShapeStyles.zh.md)
- [NodeUserModelData](../interfaces/item/NodeUserModelData.zh.md)
- [PathStyleProps](../interfaces/item/PathStyleProps.zh.md)
- [PlaneGeometryProps](../interfaces/item/PlaneGeometryProps.zh.md)
- [PolygonStyleProps](../interfaces/item/PolygonStyleProps.zh.md)
- [PolylineStyleProps](../interfaces/item/PolylineStyleProps.zh.md)
- [RectStyleProps](../interfaces/item/RectStyleProps.zh.md)
- [SphereGeometryProps](../interfaces/item/SphereGeometryProps.zh.md)
- [TextStyleProps](../interfaces/item/TextStyleProps.zh.md)
- [TorusGeometryProps](../interfaces/item/TorusGeometryProps.zh.md)

## Classes

- [CircleNode](../classes/item/CircleNode.zh.md)
- [CustomEdge](../classes/item/CustomEdge.zh.md)
- [CustomNode](../classes/item/CustomNode.zh.md)
- [CustomNode3D](../classes/item/CustomNode3D.zh.md)
- [DiamondNode](../classes/item/DiamondNode.zh.md)
- [DonutNode](../classes/item/DonutNode.zh.md)
- [EllipseNode](../classes/item/EllipseNode.zh.md)
- [HexagonNode](../classes/item/HexagonNode.zh.md)
- [ModelRectNode](../classes/item/ModelRectNode.zh.md)
- [RectNode](../classes/item/RectNode.zh.md)
- [SphereNode](../classes/item/SphereNode.zh.md)
- [StarNode](../classes/item/StarNode.zh.md)
- [TriangleNode](../classes/item/TriangleNode.zh.md)

## Enumerations

- [BadgePosition](../enums/item/BadgePosition.zh.md)

## Type Aliases

### GShapeStyle

Ƭ **GShapeStyle**: [`CircleStyleProps`](../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` }

#### Defined in

[packages/g6/src/types/item.ts:49](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L49)

---

### IBadgePosition

Ƭ **IBadgePosition**: \`${BadgePosition}\`

#### Defined in

[packages/g6/src/types/item.ts:148](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L148)

---

### ShapeStyle

Ƭ **ShapeStyle**: `Partial`<[`GShapeStyle`](item.zh.md#gshapestyle) & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

#### Defined in

[packages/g6/src/types/item.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L64)
