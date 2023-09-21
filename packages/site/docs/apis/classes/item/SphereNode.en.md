---
title: SphereNode
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [item](../../modules/item.en.md) / SphereNode

[item](../../modules/item.en.md).SphereNode

## Hierarchy

- [`CustomNode3D`](CustomNode3D.en.md)

  ↳ **`SphereNode`**

## Constructors

### constructor

• **new SphereNode**(`props`)

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `props` | `any` |

#### Overrides

[CustomNode3D](CustomNode3D.en.md).[constructor](CustomNode3D.en.md#constructor)

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:23](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/sphere.ts#L23)

## Methods

### afterDraw

▸ **afterDraw**(`model`, `shapeMap`, `shapesChanged?`): `Object`

Perform additional drawing operations or add custom shapes after drawing node.

#### Parameters

| Name             | Type                                      | Description                                                                   |
| :--------------- | :---------------------------------------- | :---------------------------------------------------------------------------- |
| `model`          | `NodeDisplayModel` \| `ComboDisplayModel` | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`       | `Object`                                  | The shape map that contains all of the elements to show on the node.          |
| `shapesChanged?` | `string`[]                                | An array of shape IDs that have changed and need to be updated.               |

#### Returns

`Object`

An object that contains some new shapes to be added to the node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[afterDraw](CustomNode3D.en.md#afterdraw)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:230](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L230)

---

### calculateAnchorPosition

▸ **calculateAnchorPosition**(`keyShapeStyle`): [`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.en.md)

Configures the anchor positions based on the provided keyShapeStyle and returns the configuration.
e.g for a CircleNode, it returns: `{"right":keyShapeStyle.x+keyShapeStyle.r, keyShapeStyle.y}`

#### Parameters

| Name            | Type  | Description                                                                    |
| :-------------- | :---- | :----------------------------------------------------------------------------- |
| `keyShapeStyle` | `any` | The keyShapeStyle object that contains the style information of the key shape. |

#### Returns

[`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.en.md)

The anchor position configuration as an IAnchorPositionMap object.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[calculateAnchorPosition](CustomNode3D.en.md#calculateanchorposition)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:612](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L612)

---

### draw

▸ **draw**(`model`, `shapeMap`, `diffData?`, `diffState?`): `NodeShapeMap`

Draw all elements related to the node.
You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.

#### Parameters

| Name                 | Type                                                                 | Description                                                                   |
| :------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffState?`         | `Object`                                                             | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                             |
| `diffState.previous` | `State`[]                                                            | -                                                                             |

#### Returns

`NodeShapeMap`

An object containing the keyShape and optional labelShape, iconShape, and some otherShapes properties

#### Overrides

[CustomNode3D](CustomNode3D.en.md).[draw](CustomNode3D.en.md#draw)

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/sphere.ts#L26)

---

### drawAnchorShapes

▸ **drawAnchorShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

3D node does not support anchor shapes.

#### Parameters

| Name                 | Type                                                                 |
| :------------------- | :------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   |
| `shapeMap`           | `NodeShapeMap`                                                       |
| `diffData?`          | `Object`                                                             |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) |
| `diffState?`         | `Object`                                                             |
| `diffState.current`  | `State`[]                                                            |
| `diffState.previous` | `State`[]                                                            |

#### Returns

`Object`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawAnchorShapes](CustomNode3D.en.md#drawanchorshapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:160](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L160)

---

### drawBadgeShapes

▸ **drawBadgeShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw the badges shape of the node

#### Parameters

| Name                 | Type                                                                 | Description                                                                   |
| :------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffState?`         | `Object`                                                             | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                             |
| `diffState.previous` | `State`[]                                                            | -                                                                             |

#### Returns

`Object`

The display object representing the badges shape of the node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawBadgeShapes](CustomNode3D.en.md#drawbadgeshapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:171](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L171)

---

### drawHaloShape

▸ **drawHaloShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the halo shape of the node

#### Parameters

| Name                 | Type                                                                 | Description                                                                   |
| :------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffState?`         | `Object`                                                             | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                             |
| `diffState.previous` | `State`[]                                                            | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the halo shape of the node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawHaloShape](CustomNode3D.en.md#drawhaloshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:130](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L130)

---

### drawIconShape

▸ **drawIconShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the icon shape of the 3D node

#### Parameters

| Name                 | Type                                                                 | Description                                                                      |
| :------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this 3D node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the 3D node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                               |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                                |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                                |
| `diffState?`         | `Object`                                                             | An object that contains previous and current 3D node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                                |
| `diffState.previous` | `State`[]                                                            | -                                                                                |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the icon shape of the 3D node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawIconShape](CustomNode3D.en.md#drawiconshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:120](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L120)

---

### drawKeyShape

▸ **drawKeyShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

The key function of drawing shape.
Draw the key shape of the node based on the provided model and shape map.

#### Parameters

| Name                 | Type                                                                 | Description                                                                   |
| :------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffState?`         | `Object`                                                             | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                             |
| `diffState.previous` | `State`[]                                                            | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the key shape of the node.

#### Overrides

[CustomNode3D](CustomNode3D.en.md).[drawKeyShape](CustomNode3D.en.md#drawkeyshape)

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:86](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/sphere.ts#L86)

---

### drawLabelBackgroundShape

▸ **drawLabelBackgroundShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label background shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.newState` | `State`[]                                                                                | -                                                                             |
| `diffState.oldState` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label background shape of the node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawLabelBackgroundShape](CustomNode3D.en.md#drawlabelbackgroundshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:386](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L386)

---

### drawLabelShape

▸ **drawLabelShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label shape of the 3D node

#### Parameters

| Name                 | Type                                                                 | Description                                                                      |
| :------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this 3D node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the 3D node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                               |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                                |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                                |
| `diffState?`         | `Object`                                                             | An object that contains previous and current 3D node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                                |
| `diffState.previous` | `State`[]                                                            | -                                                                                |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label shape of the 3D node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawLabelShape](CustomNode3D.en.md#drawlabelshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L37)

---

### drawOtherShapes

▸ **drawOtherShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw other shapes(such as preRect,stateIcon) of the node

#### Parameters

| Name                 | Type                                                                 | Description                                                                   |
| :------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel`                                                   | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                       | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                             | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.en.md) | -                                                                             |
| `diffState?`         | `Object`                                                             | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                            | -                                                                             |
| `diffState.previous` | `State`[]                                                            | -                                                                             |

#### Returns

`Object`

The display object representing the other shapes of the node.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[drawOtherShapes](CustomNode3D.en.md#drawothershapes)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:183](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L183)

---

### getMergedStyles

▸ **getMergedStyles**(`model`): [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.en.md)

Merge style

#### Parameters

| Name    | Type                                      | Description                                                                   |
| :------ | :---------------------------------------- | :---------------------------------------------------------------------------- |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` | The NodeDisplayModel or ComboDisplayModel to retrieve the merged styles from. |

#### Returns

[`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.en.md)

The merged styles as a NodeShapeStyles object.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[getMergedStyles](CustomNode3D.en.md#getmergedstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:113](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L113)

---

### mergeStyles

▸ **mergeStyles**(`model`): `void`

Get merged styles from `getMergedStyles` and assigns the merged styles to the 'mergedStyles' property.

#### Parameters

| Name    | Type                                      | Description                                                         |
| :------ | :---------------------------------------- | :------------------------------------------------------------------ |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` | The NodeDisplayModel or ComboDisplayModel to merge the styles from. |

#### Returns

`void`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[mergeStyles](CustomNode3D.en.md#mergestyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:104](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L104)

---

### onZoom

▸ **onZoom**(`shapeMap`, `zoom`): `void`

The listener for graph zooming.

1. show / hide some shapes while zoom level changed;
2. change the shapes' sizes to make them have same visual size while zooming, e.g. labelShape, labelBackgroundShape.

#### Parameters

| Name       | Type           | Description                                                          |
| :--------- | :------------- | :------------------------------------------------------------------- |
| `shapeMap` | `NodeShapeMap` | The shape map that contains all of the elements to show on the node. |
| `zoom`     | `number`       | The zoom level of the graph.                                         |

#### Returns

`void`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[onZoom](CustomNode3D.en.md#onzoom)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:209](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L209)

---

### updateCache

▸ **updateCache**(`shapeMap`): `void`

Call it after calling draw function to update cache about bounds and zoom levels.

#### Parameters

| Name       | Type  | Description                                                          |
| :--------- | :---- | :------------------------------------------------------------------- |
| `shapeMap` | `any` | The shape map that contains all of the elements to show on the node. |

#### Returns

`void`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[updateCache](CustomNode3D.en.md#updatecache)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:164](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L164)

---

### upsertShape

▸ **upsertShape**(`type`, `id`, `style`, `shapeMap`): `DisplayObject`<`any`, `any`\>

Create (if does not exit in shapeMap) or update the shape according to the configurations.

#### Parameters

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `type`     | `SHAPE_TYPE` \| `SHAPE_TYPE_3D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | shape's type                         |
| `id`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | unique string to indicates the shape |
| `style`    | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.en.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.en.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.en.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.en.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.en.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.en.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.en.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.en.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.en.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.en.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.en.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.en.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | style to be updated                  |
| `shapeMap` | `Object`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | the shape map of a node / combo      |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the shape.

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[upsertShape](CustomNode3D.en.md#upsertshape)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:193](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L193)

## Properties

### boundsCache

• **boundsCache**: `Object`

#### Type declaration

| Name                  | Type   |
| :-------------------- | :----- |
| `keyShapeLocal?`      | `AABB` |
| `labelShapeGeometry?` | `AABB` |

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[boundsCache](CustomNode3D.en.md#boundscache)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L44)

---

### defaultStyles

• **defaultStyles**: `Object`

#### Type declaration

| Name                      | Type                                                                                                                                            |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyShape`                | { `latitudeBands`: `number` = 32; `longitudeBands`: `number` = 32; `r`: `number` = 5; `x`: `number` = 0; `y`: `number` = 0; `z`: `number` = 0 } |
| `keyShape.latitudeBands`  | `number`                                                                                                                                        |
| `keyShape.longitudeBands` | `number`                                                                                                                                        |
| `keyShape.r`              | `number`                                                                                                                                        |
| `keyShape.x`              | `number`                                                                                                                                        |
| `keyShape.y`              | `number`                                                                                                                                        |
| `keyShape.z`              | `number`                                                                                                                                        |

#### Overrides

[CustomNode3D](CustomNode3D.en.md).[defaultStyles](CustomNode3D.en.md#defaultstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:12](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/sphere.ts#L12)

---

### device

• **device**: `any`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[device](CustomNode3D.en.md#device)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:23](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L23)

---

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[lodStrategy](CustomNode3D.en.md#lodstrategy)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:43](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L43)

---

### mergedStyles

• **mergedStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.en.md)

#### Overrides

[CustomNode3D](CustomNode3D.en.md).[mergedStyles](CustomNode3D.en.md#mergedstyles)

#### Defined in

[packages/g6/src/stdlib/item/node/sphere.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/sphere.ts#L22)

---

### setState

• **setState**: (`name`: `string`, `value`: `boolean`, `shapeMap`: { `[shapeId: string]`: `DisplayObject`; }) => `void`

#### Type declaration

▸ (`name`, `value`, `shapeMap`): `void`

Set the state for the node.

##### Parameters

| Name       | Type      | Description                                                          |
| :--------- | :-------- | :------------------------------------------------------------------- |
| `name`     | `string`  | -                                                                    |
| `value`    | `boolean` | state value                                                          |
| `shapeMap` | `Object`  | The shape map that contains all of the elements to show on the node. |

##### Returns

`void`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[setState](CustomNode3D.en.md#setstate)

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:245](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L245)

---

### themeStyles

• **themeStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.en.md)

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[themeStyles](CustomNode3D.en.md#themestyles)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:21](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L21)

---

### type

• **type**: `string`

#### Inherited from

[CustomNode3D](CustomNode3D.en.md).[type](CustomNode3D.en.md#type)

#### Defined in

[packages/g6/src/stdlib/item/node/base3d.ts:19](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base3d.ts#L19)
