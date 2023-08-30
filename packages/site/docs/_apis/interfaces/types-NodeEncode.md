[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / NodeEncode

# Interface: NodeEncode

[types](../modules/types.md).NodeEncode

## Hierarchy

- `NodeShapesEncode`

  ↳ **`NodeEncode`**

## Properties

### anchorShapes

• `Optional` **anchorShapes**: `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>[]\> \| `ShapeAttrEncode`[]

#### Inherited from

NodeShapesEncode.anchorShapes

#### Defined in

[types/node.ts:156](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L156)

___

### animates

• `Optional` **animates**: `IAnimates`

#### Defined in

[types/node.ts:161](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L161)

___

### badgeShapes

• `Optional` **badgeShapes**: `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>[]\> \| `ShapeAttrEncode`[]

#### Inherited from

NodeShapesEncode.badgeShapes

#### Defined in

[types/node.ts:157](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L157)

___

### iconShape

• `Optional` **iconShape**: `ShapeAttrEncode` \| `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>\>

#### Inherited from

NodeShapesEncode.iconShape

#### Defined in

[types/item.ts:89](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/item.ts#L89)

___

### keyShape

• `Optional` **keyShape**: `ShapeAttrEncode` \| `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>\>

#### Inherited from

NodeShapesEncode.keyShape

#### Defined in

[types/item.ts:88](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/item.ts#L88)

___

### labelBackgroundShape

• `Optional` **labelBackgroundShape**: `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>[]\> \| `ShapeAttrEncode`[]

#### Inherited from

NodeShapesEncode.labelBackgroundShape

#### Defined in

[types/node.ts:155](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L155)

___

### labelShape

• `Optional` **labelShape**: `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>\> \| `NodeLabelShapeAttrEncode`

#### Inherited from

NodeShapesEncode.labelShape

#### Defined in

[types/node.ts:154](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L154)

___

### otherShapes

• `Optional` **otherShapes**: `Object`

#### Index signature

▪ [shapeId: `string`]: { `[shapeAtrr: string]`: `unknown` \| `Encode`<`unknown`\>; `animates`: `IAnimates` \| `Encode`<`IAnimates`\>  }

#### Inherited from

NodeShapesEncode.otherShapes

#### Defined in

[types/item.ts:90](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/item.ts#L90)

___

### type

• `Optional` **type**: `string` \| `Encode`<`string`\>

#### Defined in

[types/node.ts:160](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L160)
