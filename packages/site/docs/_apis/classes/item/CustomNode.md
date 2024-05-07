[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [item](../../modules/item.md) / CustomNode

[item](../../modules/item.md).CustomNode

## Hierarchy

- **`CustomNode`**

  ↳ [`CircleNode`](CircleNode.md)

  ↳ [`RectNode`](RectNode.md)

  ↳ [`StarNode`](StarNode.md)

  ↳ [`HexagonNode`](HexagonNode.md)

  ↳ [`TriangleNode`](TriangleNode.md)

  ↳ [`EllipseNode`](EllipseNode.md)

  ↳ [`DonutNode`](DonutNode.md)

  ↳ [`DiamondNode`](DiamondNode.md)

  ↳ [`ModelRectNode`](ModelRectNode.md)

## Constructors

### constructor

• **new CustomNode**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:86](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L86)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:554](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L554)

___

### draw

▸ `Abstract` **draw**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw all elements related to the graphic.
You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` |
| `shapeMap` | `Object` |
| `diffData?` | `Object` |
| `diffData.current` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffData.previous` | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.md) \| `ComboModelData` |
| `diffState?` | `Object` |
| `diffState.current` | `State`[] |
| `diffState.previous` | `State`[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `iconShape?` | `DisplayObject`<`any`, `any`\> |
| `keyShape` | `DisplayObject`<`any`, `any`\> |
| `labelShape?` | `DisplayObject`<`any`, `any`\> |

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:194](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L194)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:395](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L395)

___

### drawKeyShape

▸ `Abstract` **drawKeyShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

The key function of drawing shape.
Defined the basic shape of the node.

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:227](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L227)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:44](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L44)

___

### defaultStyles

• **defaultStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:40](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L40)

___

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:43](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L43)

___

### mergedStyles

• **mergedStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:42](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L42)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:217](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L217)

___

### themeStyles

• **themeStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:41](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L41)

___

### type

• **type**: `string`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:39](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/item/node/base.ts#L39)
