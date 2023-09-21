---
title: NodeShapeStyles
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [item](../../modules/item.en.md) / NodeShapeStyles

[item](../../modules/item.en.md).NodeShapeStyles

## Hierarchy

- `ItemShapeStyles`

  ↳ **`NodeShapeStyles`**

## Properties

### anchorShapes

• `Optional` **anchorShapes**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> & { `[key: number]`: [`ShapeStyle`](../../modules/item.en.md#shapestyle) & { `color?`: `string` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `position?`: [`BadgePosition`](../../enums/item/BadgePosition.en.md) ; `size?`: `number` ; `textColor?`: `string` }; `color?`: `string` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `size?`: `number` ; `textColor?`: `string` }

#### Defined in

[packages/g6/src/types/node.ts:156](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L156)

---

### animates

• `Optional` **animates**: `IAnimates`

#### Inherited from

ItemShapeStyles.animates

#### Defined in

[packages/g6/src/types/item.ts:169](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L169)

---

### badgeShapes

• `Optional` **badgeShapes**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> & { `[key: number]`: [`ShapeStyle`](../../modules/item.en.md#shapestyle) & { `color?`: `string` ; `position?`: [`IBadgePosition`](../../modules/item.en.md#ibadgeposition) ; `textColor?`: `string` }; `color?`: `string` ; `palette?`: `string`[] ; `textColor?`: `string` }

Style of the badges to show on the node.

#### Defined in

[packages/g6/src/types/node.ts:136](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L136)

---

### group

• `Optional` **group**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

#### Inherited from

ItemShapeStyles.group

#### Defined in

[packages/g6/src/types/item.ts:165](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L165)

---

### haloShape

• `Optional` **haloShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

#### Inherited from

ItemShapeStyles.haloShape

#### Defined in

[packages/g6/src/types/item.ts:164](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L164)

---

### iconShape

• `Optional` **iconShape**: `Partial`<[`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> & { `lod?`: `number` ; `offsetX?`: `number` ; `offsetY?`: `number` }\>

#### Inherited from

ItemShapeStyles.iconShape

#### Defined in

[packages/g6/src/types/item.ts:155](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L155)

---

### keyShape

• `Optional` **keyShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

#### Inherited from

ItemShapeStyles.keyShape

#### Defined in

[packages/g6/src/types/item.ts:154](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L154)

---

### labelBackgroundShape

• `Optional` **labelBackgroundShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> & { `padding?`: `number` \| `number`[] }

The background style of the label

#### Defined in

[packages/g6/src/types/node.ts:130](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L130)

---

### labelShape

• `Optional` **labelShape**: `Partial`<[`CircleStyleProps`](CircleStyleProps.en.md) & [`RectStyleProps`](RectStyleProps.en.md) & [`EllipseStyleProps`](EllipseStyleProps.en.md) & [`PolygonStyleProps`](PolygonStyleProps.en.md) & [`LineStyleProps`](LineStyleProps.en.md) & [`PolylineStyleProps`](PolylineStyleProps.en.md) & [`TextStyleProps`](TextStyleProps.en.md) & [`ImageStyleProps`](ImageStyleProps.en.md) & [`PathStyleProps`](PathStyleProps.en.md) & [`SphereGeometryProps`](SphereGeometryProps.en.md) & [`CubeGeometryProps`](CubeGeometryProps.en.md) & [`PlaneGeometryProps`](PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> & { `angle?`: `number` ; `maxWidth?`: `string` \| `number` ; `offsetX?`: `number` ; `offsetY?`: `number` ; `offsetZ?`: `number` ; `position?`: `"center"` \| `"left"` \| `"right"` \| `"top"` \| `"bottom"` }

Style of the text to show on the node.

#### Defined in

[packages/g6/src/types/node.ts:100](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L100)

---

### otherShapes

• `Optional` **otherShapes**: `Object`

#### Index signature

▪ [shapeId: `string`]: [`ShapeStyle`](../../modules/item.en.md#shapestyle)

#### Inherited from

ItemShapeStyles.otherShapes

#### Defined in

[packages/g6/src/types/item.ts:166](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/item.ts#L166)
