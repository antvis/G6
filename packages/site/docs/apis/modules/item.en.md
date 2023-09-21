---
title: item
---

[Overview - v5.0.0-beta.10](../README.en.md) / [Modules](../modules.en.md) / item

## Interfaces

- [CircleStyleProps](../interfaces/item/CircleStyleProps.en.md)
- [CubeGeometryProps](../interfaces/item/CubeGeometryProps.en.md)
- [EllipseStyleProps](../interfaces/item/EllipseStyleProps.en.md)
- [IAnchorPositionMap](../interfaces/item/IAnchorPositionMap.en.md)
- [ImageStyleProps](../interfaces/item/ImageStyleProps.en.md)
- [LineStyleProps](../interfaces/item/LineStyleProps.en.md)
- [NodeShapeStyles](../interfaces/item/NodeShapeStyles.en.md)
- [NodeUserModelData](../interfaces/item/NodeUserModelData.en.md)
- [PathStyleProps](../interfaces/item/PathStyleProps.en.md)
- [PlaneGeometryProps](../interfaces/item/PlaneGeometryProps.en.md)
- [PolygonStyleProps](../interfaces/item/PolygonStyleProps.en.md)
- [PolylineStyleProps](../interfaces/item/PolylineStyleProps.en.md)
- [RectStyleProps](../interfaces/item/RectStyleProps.en.md)
- [SphereGeometryProps](../interfaces/item/SphereGeometryProps.en.md)
- [TextStyleProps](../interfaces/item/TextStyleProps.en.md)
- [TorusGeometryProps](../interfaces/item/TorusGeometryProps.en.md)

## Classes

- [CircleNode](../classes/item/CircleNode.en.md)
- [CustomEdge](../classes/item/CustomEdge.en.md)
- [CustomNode](../classes/item/CustomNode.en.md)
- [CustomNode3D](../classes/item/CustomNode3D.en.md)
- [DiamondNode](../classes/item/DiamondNode.en.md)
- [DonutNode](../classes/item/DonutNode.en.md)
- [EllipseNode](../classes/item/EllipseNode.en.md)
- [HexagonNode](../classes/item/HexagonNode.en.md)
- [ModelRectNode](../classes/item/ModelRectNode.en.md)
- [RectNode](../classes/item/RectNode.en.md)
- [SphereNode](../classes/item/SphereNode.en.md)
- [StarNode](../classes/item/StarNode.en.md)
- [TriangleNode](../classes/item/TriangleNode.en.md)

## Enumerations

- [BadgePosition](../enums/item/BadgePosition.en.md)

## Type Aliases

### GShapeStyle

Ƭ **GShapeStyle**: [`CircleStyleProps`](../interfaces/item/CircleStyleProps.en.md) & [`RectStyleProps`](../interfaces/item/RectStyleProps.en.md) & [`EllipseStyleProps`](../interfaces/item/EllipseStyleProps.en.md) & [`PolygonStyleProps`](../interfaces/item/PolygonStyleProps.en.md) & [`LineStyleProps`](../interfaces/item/LineStyleProps.en.md) & [`PolylineStyleProps`](../interfaces/item/PolylineStyleProps.en.md) & [`TextStyleProps`](../interfaces/item/TextStyleProps.en.md) & [`ImageStyleProps`](../interfaces/item/ImageStyleProps.en.md) & [`PathStyleProps`](../interfaces/item/PathStyleProps.en.md) & [`SphereGeometryProps`](../interfaces/item/SphereGeometryProps.en.md) & [`CubeGeometryProps`](../interfaces/item/CubeGeometryProps.en.md) & [`PlaneGeometryProps`](../interfaces/item/PlaneGeometryProps.en.md) & { `interactive?`: `boolean` }

#### Defined in

[packages/g6/src/types/item.ts:49](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L49)

---

### IBadgePosition

Ƭ **IBadgePosition**: \`${BadgePosition}\`

#### Defined in

[packages/g6/src/types/item.ts:148](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L148)

---

### ShapeStyle

Ƭ **ShapeStyle**: `Partial`<[`GShapeStyle`](item.en.md#gshapestyle) & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

#### Defined in

[packages/g6/src/types/item.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L64)
