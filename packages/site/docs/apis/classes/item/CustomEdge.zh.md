---
title: CustomEdge
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [item](../../modules/item.zh.md) / CustomEdge

[item](../../modules/item.zh.md).CustomEdge

## Constructors

### constructor

• **new CustomEdge**(`props`)

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `props` | `any` |

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:88](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L88)

## Methods

### afterDraw

▸ **afterDraw**(`model`, `shapeMap`, `shapesChanged?`): `Object`

Perform additional drawing operations or add custom shapes after drawing edge.

#### Parameters

| Name             | Type               | Description                                                                   |
| :--------------- | :----------------- | :---------------------------------------------------------------------------- |
| `model`          | `EdgeDisplayModel` | The displayed model of this edge, only for drawing and not received by users. |
| `shapeMap`       | `Object`           | The shape map that contains all of the elements to show on the edge.          |
| `shapesChanged?` | `string`[]         | An array of shape IDs that have changed and need to be updated.               |

#### Returns

`Object`

An object that contains some new shapes to be added to the edge.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:210](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L210)

---

### draw

▸ `Abstract` **draw**(`model`, `sourcePoint`, `targetPoint`, `shapeMap`, `diffData?`, `diffState?`): `Object`

Draw all elements related to the edge.
You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.

#### Parameters

| Name                 | Type                | Description                                                                   |
| :------------------- | :------------------ | :---------------------------------------------------------------------------- |
| `model`              | `EdgeDisplayModel`  | The displayed model of this edge, only for drawing and not received by users. |
| `sourcePoint`        | `Point`             | -                                                                             |
| `targetPoint`        | `Point`             | -                                                                             |
| `shapeMap`           | `Object`            | The shape map that contains all of the elements to show on the edge.          |
| `diffData?`          | `Object`            | An object that contains previous and current data.                            |
| `diffData.current`   | `EdgeUserModelData` | -                                                                             |
| `diffData.previous`  | `EdgeUserModelData` | -                                                                             |
| `diffState?`         | `Object`            | An object that contains previous and current edge's state.                    |
| `diffState.current`  | `State`[]           | -                                                                             |
| `diffState.previous` | `State`[]           | -                                                                             |

#### Returns

`Object`

An object containing the keyShape and optional labelShape, iconShape, and some otherShapes properties

| Name          | Type                           |
| :------------ | :----------------------------- |
| `iconShape?`  | `DisplayObject`<`any`, `any`\> |
| `keyShape`    | `DisplayObject`<`any`, `any`\> |
| `labelShape?` | `DisplayObject`<`any`, `any`\> |

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:189](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L189)

---

### drawHaloShape

▸ **drawHaloShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the halo shape of the edge

#### Parameters

| Name                 | Type                | Description                                                                   |
| :------------------- | :------------------ | :---------------------------------------------------------------------------- |
| `model`              | `EdgeDisplayModel`  | The displayed model of this edge, only for drawing and not received by users. |
| `shapeMap`           | `EdgeShapeMap`      | The shape map that contains all of the elements to show on the edge.          |
| `diffData?`          | `Object`            | An object that contains previous and current data.                            |
| `diffData.current`   | `EdgeUserModelData` | -                                                                             |
| `diffData.previous`  | `EdgeUserModelData` | -                                                                             |
| `diffState?`         | `Object`            | An object that contains previous and current edge's state.                    |
| `diffState.current`  | `State`[]           | -                                                                             |
| `diffState.previous` | `State`[]           | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the halo shape of the edge.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:509](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L509)

---

### drawIconShape

▸ **drawIconShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the icon shape of the edge

#### Parameters

| Name                 | Type                | Description                                                                   |
| :------------------- | :------------------ | :---------------------------------------------------------------------------- |
| `model`              | `EdgeDisplayModel`  | The displayed model of this edge, only for drawing and not received by users. |
| `shapeMap`           | `EdgeShapeMap`      | The shape map that contains all of the elements to show on the edge.          |
| `diffData?`          | `Object`            | An object that contains previous and current data.                            |
| `diffData.current`   | `EdgeUserModelData` | -                                                                             |
| `diffData.previous`  | `EdgeUserModelData` | -                                                                             |
| `diffState?`         | `Object`            | An object that contains previous and current edge's state.                    |
| `diffState.current`  | `State`[]           | -                                                                             |
| `diffState.previous` | `State`[]           | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the icon shape of the edge.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:417](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L417)

---

### drawLabelBackgroundShape

▸ **drawLabelBackgroundShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label background shape of the edge

#### Parameters

| Name                 | Type                | Description                                                                   |
| :------------------- | :------------------ | :---------------------------------------------------------------------------- |
| `model`              | `EdgeDisplayModel`  | The displayed model of this edge, only for drawing and not received by users. |
| `shapeMap`           | `EdgeShapeMap`      | The shape map that contains all of the elements to show on the edge.          |
| `diffData?`          | `Object`            | An object that contains previous and current data.                            |
| `diffData.current`   | `EdgeUserModelData` | -                                                                             |
| `diffData.previous`  | `EdgeUserModelData` | -                                                                             |
| `diffState?`         | `Object`            | An object that contains previous and current edge's state.                    |
| `diffState.current`  | `State`[]           | -                                                                             |
| `diffState.previous` | `State`[]           | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label background shape of the edge.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:353](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L353)

---

### drawLabelShape

▸ **drawLabelShape**(`model`, `shapeMap`, `diffData?`, `diffState?`): `DisplayObject`<`any`, `any`\>

Draw the label shape of the edge

#### Parameters

| Name                 | Type                | Description                                                                   |
| :------------------- | :------------------ | :---------------------------------------------------------------------------- |
| `model`              | `EdgeDisplayModel`  | The displayed model of this edge, only for drawing and not received by users. |
| `shapeMap`           | `EdgeShapeMap`      | The shape map that contains all of the elements to show on the edge.          |
| `diffData?`          | `Object`            | An object that contains previous and current data.                            |
| `diffData.current`   | `EdgeUserModelData` | -                                                                             |
| `diffData.previous`  | `EdgeUserModelData` | -                                                                             |
| `diffState?`         | `Object`            | An object that contains previous and current edge's state.                    |
| `diffState.current`  | `State`[]           | -                                                                             |
| `diffState.previous` | `State`[]           | -                                                                             |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the label shape of the edge.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:239](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L239)

---

### getMergedStyles

▸ **getMergedStyles**(`model`): `EdgeShapeStyles`

Merge style

#### Parameters

| Name    | Type               | Description                                              |
| :------ | :----------------- | :------------------------------------------------------- |
| `model` | `EdgeDisplayModel` | The EdgeDisplayModel to retrieve the merged styles from. |

#### Returns

`EdgeShapeStyles`

The merged styles as a EdgeShapeStyles object.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:114](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L114)

---

### mergeStyles

▸ **mergeStyles**(`model`): `void`

Get merged styles from `getMergedStyles` and assigns the merged styles to the 'mergedStyles' property.

#### Parameters

| Name    | Type               | Description                                    |
| :------ | :----------------- | :--------------------------------------------- |
| `model` | `EdgeDisplayModel` | The EdgeDisplayModel to merge the styles from. |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:105](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L105)

---

### onZoom

▸ **onZoom**(`shapeMap`, `zoom`): `void`

The listener for graph zooming.

1. show / hide some shapes while zoom level changed;
2. change the shapes' sizes to make them have same visual size while zooming, e.g. labelShape, labelBackgroundShape.

#### Parameters

| Name       | Type           | Description                                                          |
| :--------- | :------------- | :------------------------------------------------------------------- |
| `shapeMap` | `EdgeShapeMap` | The shape map that contains all of the elements to show on the edge. |
| `zoom`     | `number`       | The zoom level of the graph.                                         |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:539](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L539)

---

### setNodeMap

▸ **setNodeMap**(`nodeMap`): `void`

Update all visible nodes on the canvas to be aware of obstacles. Called in item's draw func.

#### Parameters

| Name      | Type                    | Description                                                                             |
| :-------- | :---------------------- | :-------------------------------------------------------------------------------------- |
| `nodeMap` | `Map`<`ID`, `default`\> | The Map object representing the node map, where keys are node IDs and values are nodes. |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:642](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L642)

---

### setSourcePoint

▸ **setSourcePoint**(`point`): `void`

Update the source point { x, y } for the edge. Called in item's draw func.

#### Parameters

| Name    | Type    | Description  |
| :------ | :------ | :----------- |
| `point` | `Point` | source point |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:626](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L626)

---

### setTargetPoint

▸ **setTargetPoint**(`point`): `void`

Update the target point { x, y } for the edge. Called in item's draw func.

#### Parameters

| Name    | Type    | Description  |
| :------ | :------ | :----------- |
| `point` | `Point` | target point |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:634](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L634)

---

### updateCache

▸ **updateCache**(`shapeMap`): `void`

Call it after calling draw function to update cache about bounds and zoom levels.

#### Parameters

| Name       | Type  | Description                                                          |
| :--------- | :---- | :------------------------------------------------------------------- |
| `shapeMap` | `any` | The shape map that contains all of the elements to show on the edge. |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:147](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L147)

---

### upsertArrow

▸ **upsertArrow**(`position`, `arrowConfig`, `bodyStyle`, `model`, `resultStyle`): `void`

Adds or updates an arrow marker on the specified position of an edge.

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description                                                                                                                                                               |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `position`    | `"start"` \| `"end"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The position where the arrow marker should be added or updated. Can be either 'start' or 'end'.                                                                           |
| `arrowConfig` | `boolean` \| `ArrowStyle`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | The configuration for the arrow marker. Can be a boolean indicating whether to use the default arrow configuration, or an ArrowStyle object with custom arrow properties. |
| `bodyStyle`   | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | The style of the edge body.                                                                                                                                               |
| `model`       | `EdgeDisplayModel`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The EdgeDisplayModel that contains the data and style information for the edge.                                                                                           |
| `resultStyle` | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | The style object where the arrow marker properties will be added or updated.                                                                                              |

#### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:655](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L655)

---

### upsertShape

▸ **upsertShape**(`type`, `id`, `style`, `shapeMap`, `model`): `DisplayObject`<`any`, `any`\>

Create (if does not exit in shapeMap) or update the shape according to the configurations.

#### Parameters

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `type`     | `SHAPE_TYPE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | shape's type                         |
| `id`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | unique string to indicates the shape |
| `style`    | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | style to be updated                  |
| `shapeMap` | `Object`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | the shape map of a edge              |
| `model`    | `EdgeDisplayModel`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | data model of the edge               |

#### Returns

`DisplayObject`<`any`, `any`\>

The display object representing the shape.

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:709](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L709)

## Properties

### boundsCache

• **boundsCache**: `Object`

#### Type declaration

| Name                             | Type     |
| :------------------------------- | :------- |
| `labelBackgroundShapeGeometry?`  | `AABB`   |
| `labelBackgroundShapeTransform?` | `string` |
| `labelShapeGeometry?`            | `AABB`   |
| `labelShapeTransform?`           | `string` |

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:52](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L52)

---

### defaultStyles

• **defaultStyles**: `EdgeShapeStyles` = `{}`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:39](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L39)

---

### labelPosition

• **labelPosition**: `Object`

#### Type declaration

| Name        | Type      |
| :---------- | :-------- |
| `isRevert`  | `boolean` |
| `transform` | `string`  |
| `x`         | `number`  |
| `y`         | `number`  |

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:46](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L46)

---

### lodStrategy

• `Optional` **lodStrategy**: `LodStrategyObj`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:45](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L45)

---

### mergedStyles

• **mergedStyles**: `EdgeShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:41](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L41)

---

### nodeMap

• **nodeMap**: `Map`<`ID`, `default`\>

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L44)

---

### setState

• **setState**: (`name`: `string`, `value`: `boolean`, `shapeMap`: { `[shapeId: string]`: `DisplayObject`; }) => `void`

#### Type declaration

▸ (`name`, `value`, `shapeMap`): `void`

Set the state for the edge.

##### Parameters

| Name       | Type      | Description                                                          |
| :--------- | :-------- | :------------------------------------------------------------------- |
| `name`     | `string`  | -                                                                    |
| `value`    | `boolean` | state value                                                          |
| `shapeMap` | `Object`  | The shape map that contains all of the elements to show on the edge. |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:225](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L225)

---

### sourcePoint

• **sourcePoint**: `Point`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L42)

---

### targetPoint

• **targetPoint**: `Point`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:43](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L43)

---

### themeStyles

• **themeStyles**: `EdgeShapeStyles`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:40](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L40)

---

### type

• **type**: `string`

#### Defined in

[packages/g6/src/stdlib/item/edge/base.ts:38](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/item/edge/base.ts#L38)
