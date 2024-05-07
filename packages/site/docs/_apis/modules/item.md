[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / item

## Interfaces

- [CircleStyleProps](../interfaces/item/CircleStyleProps.md)
- [CubeGeometryProps](../interfaces/item/CubeGeometryProps.md)
- [EllipseStyleProps](../interfaces/item/EllipseStyleProps.md)
- [IAnchorPositionMap](../interfaces/item/IAnchorPositionMap.md)
- [ImageStyleProps](../interfaces/item/ImageStyleProps.md)
- [LineStyleProps](../interfaces/item/LineStyleProps.md)
- [NodeShapeStyles](../interfaces/item/NodeShapeStyles.md)
- [NodeUserModelData](../interfaces/item/NodeUserModelData.md)
- [PathStyleProps](../interfaces/item/PathStyleProps.md)
- [PlaneGeometryProps](../interfaces/item/PlaneGeometryProps.md)
- [PolygonStyleProps](../interfaces/item/PolygonStyleProps.md)
- [PolylineStyleProps](../interfaces/item/PolylineStyleProps.md)
- [RectStyleProps](../interfaces/item/RectStyleProps.md)
- [SphereGeometryProps](../interfaces/item/SphereGeometryProps.md)
- [TextStyleProps](../interfaces/item/TextStyleProps.md)
- [TorusGeometryProps](../interfaces/item/TorusGeometryProps.md)

## Classes

- [CircleNode](../classes/item/CircleNode.md)
- [CustomNode](../classes/item/CustomNode.md)
- [DiamondNode](../classes/item/DiamondNode.md)
- [DonutNode](../classes/item/DonutNode.md)
- [EllipseNode](../classes/item/EllipseNode.md)
- [HexagonNode](../classes/item/HexagonNode.md)
- [ModelRectNode](../classes/item/ModelRectNode.md)
- [RectNode](../classes/item/RectNode.md)
- [SphereNode](../classes/item/SphereNode.md)
- [StarNode](../classes/item/StarNode.md)
- [TriangleNode](../classes/item/TriangleNode.md)

## Enumerations

- [BadgePosition](../enums/item/BadgePosition.md)

## Type Aliases

### GShapeStyle

Ƭ **GShapeStyle**: [`CircleStyleProps`](../interfaces/item/CircleStyleProps.md) & [`RectStyleProps`](../interfaces/item/RectStyleProps.md) & [`EllipseStyleProps`](../interfaces/item/EllipseStyleProps.md) & [`PolygonStyleProps`](../interfaces/item/PolygonStyleProps.md) & [`LineStyleProps`](../interfaces/item/LineStyleProps.md) & [`PolylineStyleProps`](../interfaces/item/PolylineStyleProps.md) & [`TextStyleProps`](../interfaces/item/TextStyleProps.md) & [`ImageStyleProps`](../interfaces/item/ImageStyleProps.md) & [`PathStyleProps`](../interfaces/item/PathStyleProps.md) & [`SphereGeometryProps`](../interfaces/item/SphereGeometryProps.md) & [`CubeGeometryProps`](../interfaces/item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../interfaces/item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  }

#### Defined in

[packages/g6/src/types/item.ts:49](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L49)

___

### IBadgePosition

Ƭ **IBadgePosition**: \`${BadgePosition}\`

#### Defined in

[packages/g6/src/types/item.ts:148](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L148)

___

### ShapeStyle

Ƭ **ShapeStyle**: `Partial`<[`GShapeStyle`](item.md#gshapestyle) & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

#### Defined in

[packages/g6/src/types/item.ts:64](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L64)
