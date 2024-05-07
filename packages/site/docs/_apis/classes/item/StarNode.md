[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [item](../../modules/item.md) / StarNode

[item](../../modules/item.md).StarNode

## Hierarchy

- [`CustomNode`](CustomNode.md)

  ↳ **`StarNode`**

## Constructors

### constructor

• **new StarNode**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Overrides

[CustomNode](CustomNode.md).[constructor](CustomNode.md#constructor)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:23](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L23)

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

[CustomNode](CustomNode.md).[afterDraw](CustomNode.md#afterdraw)

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

#### Overrides

[CustomNode](CustomNode.md).[calculateAnchorPosition](CustomNode.md#calculateanchorposition)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:155](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L155)

___

### draw

▸ **draw**(`model`, `shapeMap`, `diffData?`, `diffState?`): `NodeShapeMap`

Draw all elements related to the graphic.
You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.

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

[CustomNode](CustomNode.md).[draw](CustomNode.md#draw)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:28](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L28)

___

### drawAnchorShapes

▸ **drawAnchorShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw the anchors of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

[CustomNode](CustomNode.md).[drawAnchorShapes](CustomNode.md#drawanchorshapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:476](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L476)

___

### drawBadgeShapes

▸ **drawBadgeShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw the badges of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

[CustomNode](CustomNode.md).[drawBadgeShapes](CustomNode.md#drawbadgeshapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:569](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L569)

___

### drawHaloShape

▸ **drawHaloShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the halo of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

[CustomNode](CustomNode.md).[drawHaloShape](CustomNode.md#drawhaloshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:441](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L441)

___

### drawIconShape

▸ **drawIconShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the icon of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

[CustomNode](CustomNode.md).[drawIconShape](CustomNode.md#drawiconshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:395](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L395)

___

### drawKeyShape

▸ **drawKeyShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

The key function of drawing shape.
Defined the basic shape of the node.

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

[CustomNode](CustomNode.md).[drawKeyShape](CustomNode.md#drawkeyshape)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:102](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L102)

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

[CustomNode](CustomNode.md).[drawLabelBackgroundShape](CustomNode.md#drawlabelbackgroundshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:343](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L343)

___

### drawLabelShape

▸ **drawLabelShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

[CustomNode](CustomNode.md).[drawLabelShape](CustomNode.md#drawlabelshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:240](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L240)

___

### drawOtherShapes

▸ **drawOtherShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw other shapes(such as preRect,stateIcon) of the node

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `NodeShapeMap` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

#### Inherited from

[CustomNode](CustomNode.md).[drawOtherShapes](CustomNode.md#drawothershapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:727](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L727)

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

[CustomNode](CustomNode.md).[getMergedStyles](CustomNode.md#getmergedstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:105](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L105)

___

### getStarPath

▸ **getStarPath**(`outerR`, `innerR`): (`string` \| (`string` \| `number`)[])[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `outerR` | `number` |
| `innerR` | `number` |

#### Returns

(`string` \| (`string` \| `number`)[])[]

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:123](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L123)

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

[CustomNode](CustomNode.md).[mergeStyles](CustomNode.md#mergestyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:102](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L102)

___

### onZoom

▸ **onZoom**(`shapeMap`, `zoom`): `void`

The listener for graph zooming.
1. show / hide some shapes while zoom level changed;
2. change the shapes' sizes to make them have same visual size while zooming, e.g. labelShape, labelBackgroundShape.

#### Parameters

| Name | Type |
| :------ | :------ |
| `shapeMap` | `NodeShapeMap` |
| `zoom` | `number` |

#### Returns

`void`

#### Inherited from

[CustomNode](CustomNode.md).[onZoom](CustomNode.md#onzoom)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:746](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L746)

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

[CustomNode](CustomNode.md).[updateCache](CustomNode.md#updatecache)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:155](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L155)

___

### upsertShape

▸ **upsertShape**(`type`, `id`, `style`, `shapeMap`, `model`): `DisplayObject`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `SHAPE_TYPE` \| `SHAPE_TYPE_3D` |
| `id` | `string` |
| `style` | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> |
| `shapeMap` | `NodeShapeMap` |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |

#### Returns

`DisplayObject`<`any`, `any`\>

#### Inherited from

[CustomNode](CustomNode.md).[upsertShape](CustomNode.md#upsertshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:900](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L900)

## Properties

### boundsCache

• **boundsCache**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `keyShapeLocal?` | `AABB` |
| `labelShapeGeometry?` | `AABB` |

#### Inherited from

[CustomNode](CustomNode.md).[boundsCache](CustomNode.md#boundscache)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:44](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L44)

___

### defaultStyles

• **defaultStyles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `keyShape` | { `innerR`: `number` ; `outerR`: `number` ; `x`: `number` = 0; `y`: `number` = 0 } |
| `keyShape.innerR` | `number` |
| `keyShape.outerR` | `number` |
| `keyShape.x` | `number` |
| `keyShape.y` | `number` |

#### Overrides

[CustomNode](CustomNode.md).[defaultStyles](CustomNode.md#defaultstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:14](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L14)

___

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Inherited from

[CustomNode](CustomNode.md).[lodStrategy](CustomNode.md#lodstrategy)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:43](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L43)

___

### mergedStyles

• **mergedStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md)

#### Overrides

[CustomNode](CustomNode.md).[mergedStyles](CustomNode.md#mergedstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/star.ts:22](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/star.ts#L22)

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

[CustomNode](CustomNode.md).[setState](CustomNode.md#setstate)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:217](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L217)

___

### themeStyles

• **themeStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md) \| `ComboShapeStyles`

#### Inherited from

[CustomNode](CustomNode.md).[themeStyles](CustomNode.md#themestyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:41](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L41)

___

### type

• **type**: `string`

#### Inherited from

[CustomNode](CustomNode.md).[type](CustomNode.md#type)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:39](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L39)
