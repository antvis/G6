---
title: CustomNode
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [item](../../modules/item.zh.md) / CustomNode

[item](../../modules/item.zh.md).CustomNode

## Hierarchy

- **`CustomNode`**

  ↳ [`CustomNode3D`](CustomNode3D.zh.md)

  ↳ [`CircleNode`](CircleNode.zh.md)

  ↳ [`RectNode`](RectNode.zh.md)

  ↳ [`StarNode`](StarNode.zh.md)

  ↳ [`HexagonNode`](HexagonNode.zh.md)

  ↳ [`TriangleNode`](TriangleNode.zh.md)

  ↳ [`EllipseNode`](EllipseNode.zh.md)

  ↳ [`DonutNode`](DonutNode.zh.md)

  ↳ [`DiamondNode`](DiamondNode.zh.md)

  ↳ [`ModelRectNode`](ModelRectNode.zh.md)

## Constructors

### constructor

• **new CustomNode**(`props`)

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `props` | `any` |

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:86](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L86)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:230](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L230)

---

### calculateAnchorPosition

▸ **calculateAnchorPosition**(`keyShapeStyle`): [`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.zh.md)

Configures the anchor positions based on the provided keyShapeStyle and returns the configuration.
e.g for a CircleNode, it returns: `{"right":keyShapeStyle.x+keyShapeStyle.r, keyShapeStyle.y}`

#### Parameters

| Name            | Type  | Description                                                                    |
| :-------------- | :---- | :----------------------------------------------------------------------------- |
| `keyShapeStyle` | `any` | The keyShapeStyle object that contains the style information of the key shape. |

#### Returns

[`IAnchorPositionMap`](../../interfaces/item/IAnchorPositionMap.zh.md)

The anchor position configuration as an IAnchorPositionMap object.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:612](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L612)

---

### draw

▸ `Abstract` **draw**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw all elements related to the node.
You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `Object`                                                                                 | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`Object`

An object containing the keyShape and optional labelShape, iconShape, and some otherShapes properties

| Name          | Type                           |
| :------------ | :----------------------------- |
| `iconShape?`  | `DisplayObject`<`any`, `any`\> |
| `keyShape`    | `DisplayObject`<`any`, `any`\> |
| `labelShape?` | `DisplayObject`<`any`, `any`\> |

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:208](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L208)

---

### drawAnchorShapes

▸ **drawAnchorShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw the anchors shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`Object`

The display object representing the anchors shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:534](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L534)

---

### drawBadgeShapes

▸ **drawBadgeShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw the badges shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`Object`

The display object representing the badges shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:632](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L632)

---

### drawHaloShape

▸ **drawHaloShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the halo shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the halo shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:494](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L494)

---

### drawIconShape

▸ **drawIconShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the icon shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the icon shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:443](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L443)

---

### drawKeyShape

▸ `Abstract` **drawKeyShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

The key function of drawing shape.
Draw the key shape of the node based on the provided model and shape map.

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the key shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:260](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L260)

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
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.newState` | `State`[]                                                                                | -                                                                             |
| `diffState.oldState` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label background shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:386](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L386)

---

### drawLabelShape

▸ **drawLabelShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label shape of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label shape of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:278](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L278)

---

### drawOtherShapes

▸ **drawOtherShapes**(`model`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw other shapes(such as preRect,stateIcon) of the node

#### Parameters

| Name                 | Type                                                                                     | Description                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `model`              | `NodeDisplayModel` \| `ComboDisplayModel`                                                | The displayed model of this node, only for drawing and not received by users. |
| `shapeMap`           | `NodeShapeMap`                                                                           | The shape map that contains all of the elements to show on the node.          |
| `diffData?`          | `Object`                                                                                 | An object that contains previous and current data.                            |
| `diffData.current`   | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffData.previous`  | [`NodeUserModelData`](../../interfaces/item/NodeUserModelData.zh.md) \| `ComboModelData` | -                                                                             |
| `diffState?`         | `Object`                                                                                 | An object that contains previous and current node's state.                    |
| `diffState.current`  | `State`[]                                                                                | -                                                                             |
| `diffState.previous` | `State`[]                                                                                | -                                                                             |

#### Returns

`Object`

The display object representing the other shapes of the node.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:795](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L795)

---

### getMergedStyles

▸ **getMergedStyles**(`model`): [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.zh.md)

Merge style

#### Parameters

| Name    | Type                                      | Description                                                                   |
| :------ | :---------------------------------------- | :---------------------------------------------------------------------------- |
| `model` | `NodeDisplayModel` \| `ComboDisplayModel` | The NodeDisplayModel or ComboDisplayModel to retrieve the merged styles from. |

#### Returns

[`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.zh.md)

The merged styles as a NodeShapeStyles object.

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:814](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L814)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:164](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L164)

---

### upsertShape

▸ **upsertShape**(`type`, `id`, `style`, `shapeMap`, `model`): `DisplayObject`<`any`, `any`\>

Create (if does not exit in shapeMap) or update the shape according to the configurations.

#### Parameters

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `type`     | `SHAPE_TYPE` \| `SHAPE_TYPE_3D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | shape's type                         |
| `id`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | unique string to indicates the shape |
| `style`    | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | style to be updated                  |
| `shapeMap` | `NodeShapeMap`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | the shape map of a node / combo      |
| `model`    | `NodeDisplayModel` \| `ComboDisplayModel`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | data model of the node / combo       |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the shape.

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:987](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L987)

## Properties

### boundsCache

• **boundsCache**: `Object`

#### Type declaration

| Name                  | Type   |
| :-------------------- | :----- |
| `keyShapeLocal?`      | `AABB` |
| `labelShapeGeometry?` | `AABB` |

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L44)

---

### defaultStyles

• **defaultStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.zh.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:40](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L40)

---

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:43](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L43)

---

### mergedStyles

• **mergedStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.zh.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L42)

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

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:245](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L245)

---

### themeStyles

• **themeStyles**: [`NodeShapeStyles`](../../interfaces/item/NodeShapeStyles.zh.md) \| `ComboShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:41](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L41)

---

### type

• **type**: `string`

#### Defined in

[packages/g6/src/stdlib/item/node/base.ts:39](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/node/base.ts#L39)
