[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [item](../../modules/item.md) / NodeShapeStyles

[item](../../modules/item.md).NodeShapeStyles

## Hierarchy

- `ItemShapeStyles`

  ↳ **`NodeShapeStyles`**

## Properties

### anchorShapes

• `Optional` **anchorShapes**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> & { `[key: number]`: [`ShapeStyle`](../../modules/item.md#shapestyle) & { `color?`: `string` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `position?`: [`BadgePosition`](../../enums/item/BadgePosition.md) ; `size?`: `number` ; `textColor?`: `string`  }; `color?`: `string` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `size?`: `number` ; `textColor?`: `string`  }

#### Defined in

[packages/g6/src/types/node.ts:156](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/node.ts#L156)

___

### animates

• `Optional` **animates**: `IAnimates`

#### Inherited from

ItemShapeStyles.animates

#### Defined in

[packages/g6/src/types/item.ts:169](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L169)

___

### badgeShapes

• `Optional` **badgeShapes**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> & { `[key: number]`: [`ShapeStyle`](../../modules/item.md#shapestyle) & { `color?`: `string` ; `position?`: [`IBadgePosition`](../../modules/item.md#ibadgeposition) ; `textColor?`: `string`  }; `color?`: `string` ; `palette?`: `string`[] ; `textColor?`: `string`  }

Style of the badges to show on the node.

#### Defined in

[packages/g6/src/types/node.ts:136](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/node.ts#L136)

___

### group

• `Optional` **group**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

#### Inherited from

ItemShapeStyles.group

#### Defined in

[packages/g6/src/types/item.ts:165](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L165)

___

### haloShape

• `Optional` **haloShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

#### Inherited from

ItemShapeStyles.haloShape

#### Defined in

[packages/g6/src/types/item.ts:164](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L164)

___

### iconShape

• `Optional` **iconShape**: `Partial`<[`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> & { `lod?`: `number` ; `offsetX?`: `number` ; `offsetY?`: `number`  }\>

#### Inherited from

ItemShapeStyles.iconShape

#### Defined in

[packages/g6/src/types/item.ts:155](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L155)

___

### keyShape

• `Optional` **keyShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

#### Inherited from

ItemShapeStyles.keyShape

#### Defined in

[packages/g6/src/types/item.ts:154](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L154)

___

### labelBackgroundShape

• `Optional` **labelBackgroundShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> & { `padding?`: `number` \| `number`[]  }

The background style of the label

#### Defined in

[packages/g6/src/types/node.ts:130](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/node.ts#L130)

___

### labelShape

• `Optional` **labelShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.md) & [`RectStyleProps`](RectStyleProps.md) & [`EllipseStyleProps`](EllipseStyleProps.md) & [`PolygonStyleProps`](PolygonStyleProps.md) & [`LineStyleProps`](LineStyleProps.md) & [`PolylineStyleProps`](PolylineStyleProps.md) & [`TextStyleProps`](TextStyleProps.md) & [`ImageStyleProps`](ImageStyleProps.md) & [`PathStyleProps`](PathStyleProps.md) & [`SphereGeometryProps`](SphereGeometryProps.md) & [`CubeGeometryProps`](CubeGeometryProps.md) & [`PlaneGeometryProps`](PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> & { `angle?`: `number` ; `maxWidth?`: `string` \| `number` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `position?`: ``"center"`` \| ``"left"`` \| ``"right"`` \| ``"top"`` \| ``"bottom"``  }

Style of the text to show on the node.

#### Defined in

[packages/g6/src/types/node.ts:100](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/node.ts#L100)

___

### otherShapes

• `Optional` **otherShapes**: `Object`

#### Index signature

▪ [shapeId: `string`]: [`ShapeStyle`](../../modules/item.md#shapestyle)

#### Inherited from

ItemShapeStyles.otherShapes

#### Defined in

[packages/g6/src/types/item.ts:166](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/item.ts#L166)
