[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [item](../../modules/item.md) / SphereNode

[item](../../modules/item.md).SphereNode

## Hierarchy

- `BaseNode3D`

  ↳ **`SphereNode`**

## Constructors

### constructor

• **new SphereNode**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Overrides

BaseNode3D.constructor

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:23](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/sphere.ts#L23)

## Methods

### afterDraw

▸ **afterDraw**(`model`, `shapeMap`, `shapesChanged?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `Object` |
| `shapesChanged?` | `string`[] |

#### Returns

`Object`

#### Inherited from

BaseNode3D.afterDraw

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:209](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L209)

___

### calculateAnchorPosition

▸ **calculateAnchorPosition**(`keyShapeStyle`): [`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.md)

Configure anchor position by keyShapeStyle. return the configuration.
e.g CircleNode `return {"right":keyShapeStyle.x+keyShapeStyle.r, keyShapeStyle.y}`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyShapeStyle` | `any` |

#### Returns

[`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.md)

anchorpositionMap

#### Inherited from

BaseNode3D.calculateAnchorPosition

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:554](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L554)

___

### draw

▸ **draw**(`model`, `shapeMap`, `diffData?`, `diffState?`): `NodeShapeMap`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`NodeShapeMap`

#### Overrides

BaseNode3D.draw

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:26](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/sphere.ts#L26)

___

### drawAnchorShapes

▸ **drawAnchorShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

3D node does not support anchor shapes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

BaseNode3D.drawAnchorShapes

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:153](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L153)

___

### drawBadgeShapes

▸ **drawBadgeShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

BaseNode3D.drawBadgeShapes

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:164](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L164)

___

### drawHaloShape

▸ **drawHaloShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

BaseNode3D.drawHaloShape

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:123](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L123)

___

### drawIconShape

▸ **drawIconShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

BaseNode3D.drawIconShape

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:113](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L113)

___

### drawKeyShape

▸ **drawKeyShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Overrides

BaseNode3D.drawKeyShape

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:86](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/sphere.ts#L86)

___

### drawLabelBackgroundShape

▸ **drawLabelBackgroundShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label background of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.newState` | `State`[] |
| `diffState.oldState` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

BaseNode3D.drawLabelBackgroundShape

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:343](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L343)

___

### drawLabelShape

▸ **drawLabelShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

BaseNode3D.drawLabelShape

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:30](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L30)

___

### drawOtherShapes

▸ **drawOtherShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

BaseNode3D.drawOtherShapes

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:176](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L176)

___

### getMergedStyles

▸ **getMergedStyles**(`model`): [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |

#### Returns

[`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md)

#### Inherited from

BaseNode3D.getMergedStyles

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:105](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L105)

___

### mergeStyles

▸ **mergeStyles**(`model`): `void`

Merge default style with the style Customized by users

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |

#### Returns

`void`

#### Inherited from

BaseNode3D.mergeStyles

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:102](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L102)

___

### onZoom

▸ **onZoom**(`shapeMap`, `zoom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shapeMap` | `NodeShapeMap` |
| `zoom` | `number` |

#### Returns

`void`

#### Inherited from

BaseNode3D.onZoom

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:195](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L195)

___

### updateCache

▸ **updateCache**(`shapeMap`): `void`

Call it after calling draw function to update cache about bounds and zoom levels.

#### Parameters

| Name | Type |
| :------ | :------ |
| `shapeMap` | `any` |

#### Returns

`void`

#### Inherited from

BaseNode3D.updateCache

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:155](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L155)

___

### upsertShape

▸ **upsertShape**(`type`, `id`, `style`, `shapeMap`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `SHAPE_TYPE` \| `SHAPE_TYPE_3D` |
| `id` | `string` |
| `style` | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> |
| `shapeMap` | `Object` |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

BaseNode3D.upsertShape

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:186](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L186)

## Properties

### boundsCache

• **boundsCache**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `keyShapeLocal?` | `AABB` |
| `labelShapeGeometry?` | `AABB` |

#### Inherited from

BaseNode3D.boundsCache

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:44](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L44)

___

### defaultStyles

• **defaultStyles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `keyShape` | { `latitudeBands`: `number` = 32; `longitudeBands`: `number` = 32; `r`: `number` = 5; `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } |
| `keyShape.latitudeBands` | `number` |
| `keyShape.longitudeBands` | `number` |
| `keyShape.r` | `number` |
| `keyShape.x` | `number` |
| `keyShape.y` | `number` |
| `keyShape.z` | `number` |

#### Overrides

BaseNode3D.defaultStyles

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:12](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/sphere.ts#L12)

___

### device

• **device**: `any`

#### Inherited from

BaseNode3D.device

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:23](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L23)

___

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Inherited from

BaseNode3D.lodStrategy

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:43](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L43)

___

### mergedStyles

• **mergedStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md)

#### Overrides

BaseNode3D.mergedStyles

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:22](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/sphere.ts#L22)

___

### setState

• **setState**: (`name`: `string`, `value`: `boolean`, `shapeMap`: { `[shapeId: string]`: `DisplayObject`;  }) => `void`

#### Type declaration

▸ (`name`, `value`, `shapeMap`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `boolean` |
| `shapeMap` | `Object` |

##### Returns

`void`

#### Inherited from

BaseNode3D.setState

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:217](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L217)

___

### themeStyles

• **themeStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md)

#### Inherited from

BaseNode3D.themeStyles

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:21](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L21)

___

### type

• **type**: `string`

#### Inherited from

BaseNode3D.type

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:19](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base3d.ts#L19)
