---
title: Graph
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [graph](../../modules/graph.zh.md) / Graph

[graph](../../modules/graph.zh.md).Graph

## Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `B`  | extends `BehaviorRegistry` |
| `T`  | extends `ThemeRegistry`    |

## Hierarchy

- `default`

  ↳ **`Graph`**

## Implements

- [`IGraph`](../../interfaces/graph/IGraph.zh.md)<`B`, `T`\>

## Combo

### addCombo

▸ **addCombo**(`model`, `childrenIds`): `ComboModel`

Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.

#### Parameters

| Name          | Type             | Description     |
| :------------ | :--------------- | :-------------- |
| `model`       | `ComboUserModel` | combo user data |
| `childrenIds` | `ID`[]           | -               |

#### Returns

`ComboModel`

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[addCombo](../../interfaces/graph/IGraph.zh.md#addcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1544](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1544)

---

### collapseCombo

▸ **collapseCombo**(`comboIds`): `void`

Collapse a combo.

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `comboIds` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[collapseCombo](../../interfaces/graph/IGraph.zh.md#collapsecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1589](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1589)

---

### expandCombo

▸ **expandCombo**(`comboIds`): `void`

Expand a combo.

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `comboIds` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[expandCombo](../../interfaces/graph/IGraph.zh.md#expandcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1609](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1609)

---

### moveCombo

▸ **moveCombo**(`ids`, `dx`, `dy`, `upsertAncestors?`, `callback?`): `ComboModel`[]

Move one or more combos a distance (dx, dy) relatively,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name               | Type                                                                                    |
| :----------------- | :-------------------------------------------------------------------------------------- |
| `ids`              | `ID` \| `ID`[]                                                                          |
| `dx`               | `number`                                                                                |
| `dy`               | `number`                                                                                |
| `upsertAncestors?` | `boolean`                                                                               |
| `callback?`        | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`, `canceled?`: `boolean`) => `void` |

#### Returns

`ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[moveCombo](../../interfaces/graph/IGraph.zh.md#movecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1632](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1632)

## Constructors

### constructor

• **new Graph**<`B`, `T`\>(`spec`)

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `B`  | extends `BehaviorRegistry` |
| `T`  | extends `ThemeRegistry`    |

#### Parameters

| Name   | Type                                                                     |
| :----- | :----------------------------------------------------------------------- |
| `spec` | [`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[packages/g6/src/runtime/graph.ts:101](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L101)

## Data

### addData

▸ **addData**(`itemType`, `models`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name       | Type                                                                                                                   | Description |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- | :---------- |
| `itemType` | `ITEM_TYPE`                                                                                                            | item type   |
| `models`   | `NodeUserModel` \| `EdgeUserModel` \| `ComboUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | -           |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[addData](../../interfaces/graph/IGraph.zh.md#adddata)

#### Defined in

[packages/g6/src/runtime/graph.ts:970](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L970)

---

### changeData

▸ **changeData**(`data`, `type?`): `Promise`<`void`\>

Change graph data.

#### Parameters

| Name   | Type                            | Default value    | Description                                                                                                                                                       |
| :----- | :------------------------------ | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | `DataConfig`                    | `undefined`      | new data                                                                                                                                                          |
| `type` | `"replace"` \| `"mergeReplace"` | `'mergeReplace'` | the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[changeData](../../interfaces/graph/IGraph.zh.md#changedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:451](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L451)

---

### getAllCombosData

▸ **getAllCombosData**(): `ComboModel`[]

Get all the combos' inner data

#### Returns

`ComboModel`[]

all combos' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getAllCombosData](../../interfaces/graph/IGraph.zh.md#getallcombosdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:881](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L881)

---

### getAllEdgesData

▸ **getAllEdgesData**(): `EdgeModel`[]

Get all the edges' inner data

#### Returns

`EdgeModel`[]

all edges' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getAllEdgesData](../../interfaces/graph/IGraph.zh.md#getalledgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:873](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L873)

---

### getAllNodesData

▸ **getAllNodesData**(): `NodeModel`[]

Get all the nodes' inner data

#### Returns

`NodeModel`[]

all nodes' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getAllNodesData](../../interfaces/graph/IGraph.zh.md#getallnodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:865](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L865)

---

### getComboChildrenData

▸ **getComboChildrenData**(`comboId`): (`NodeModel` \| `ComboModel`)[]

Get the children's data of a combo.

#### Parameters

| Name      | Type | Description |
| :-------- | :--- | :---------- |
| `comboId` | `ID` | combo id    |

#### Returns

(`NodeModel` \| `ComboModel`)[]

children's data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getComboChildrenData](../../interfaces/graph/IGraph.zh.md#getcombochildrendata)

#### Defined in

[packages/g6/src/runtime/graph.ts:914](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L914)

---

### getComboData

▸ **getComboData**(`condition`): `ComboModel`

Find an combo's inner data according to id or function.

#### Parameters

| Name        | Type               | Description              |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`ComboModel`

result combo's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getComboData](../../interfaces/graph/IGraph.zh.md#getcombodata)

#### Defined in

[packages/g6/src/runtime/graph.ts:855](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L855)

---

### getEdgeData

▸ **getEdgeData**(`condition`): `EdgeModel`

Find an edge's inner data according to id or function.

#### Parameters

| Name        | Type               | Description              |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`EdgeModel`

result edge's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getEdgeData](../../interfaces/graph/IGraph.zh.md#getedgedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:842](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L842)

---

### getNearEdgesForNode

▸ **getNearEdgesForNode**(`nodeId`): `EdgeModel`[]

Retrieve the nearby edges for a given node using quadtree collision detection.

#### Parameters

| Name     | Type | Description |
| :------- | :--- | :---------- |
| `nodeId` | `ID` | node id     |

#### Returns

`EdgeModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getNearEdgesForNode](../../interfaces/graph/IGraph.zh.md#getnearedgesfornode)

#### Defined in

[packages/g6/src/runtime/graph.ts:935](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L935)

---

### getNeighborNodesData

▸ **getNeighborNodesData**(`nodeId`, `direction?`): `NodeModel`[]

Get one-hop node ids from a start node.

#### Parameters

| Name        | Type                          | Default value | Description          |
| :---------- | :---------------------------- | :------------ | :------------------- |
| `nodeId`    | `ID`                          | `undefined`   | id of the start node |
| `direction` | `"both"` \| `"in"` \| `"out"` | `'both'`      | -                    |

#### Returns

`NodeModel`[]

one-hop nodes' data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getNeighborNodesData](../../interfaces/graph/IGraph.zh.md#getneighbornodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:902](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L902)

---

### getNodeData

▸ **getNodeData**(`condition`): `NodeModel`

Find a node's inner data according to id or function.

#### Parameters

| Name        | Type               | Description              |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`NodeModel`

result node's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getNodeData](../../interfaces/graph/IGraph.zh.md#getnodedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:831](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L831)

---

### getRelatedEdgesData

▸ **getRelatedEdgesData**(`nodeId`, `direction?`): `EdgeModel`[]

Get one-hop edge ids from a start node.

#### Parameters

| Name        | Type                          | Default value | Description          |
| :---------- | :---------------------------- | :------------ | :------------------- |
| `nodeId`    | `ID`                          | `undefined`   | id of the start node |
| `direction` | `"both"` \| `"in"` \| `"out"` | `'both'`      | -                    |

#### Returns

`EdgeModel`[]

one-hop edges' data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getRelatedEdgesData](../../interfaces/graph/IGraph.zh.md#getrelatededgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:890](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L890)

---

### read

▸ **read**(`data`): `Promise`<`void`\>

Input data and render the graph.
If there is old data, diffs and changes it.

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `data` | `DataConfig` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[read](../../interfaces/graph/IGraph.zh.md#read)

#### Defined in

[packages/g6/src/runtime/graph.ts:400](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L400)

---

### removeData

▸ **removeData**(`itemType`, `ids`): `void`

Remove one or more node/edge/combo data from the graph.

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `itemType` | `ITEM_TYPE`    |
| `ids`      | `ID` \| `ID`[] |

#### Returns

`void`

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[removeData](../../interfaces/graph/IGraph.zh.md#removedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1027](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1027)

---

### updateComboPosition

▸ **updateComboPosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more combos' positions,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name               | Type                                                                                                                           | Default value | Description                                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------ |
| `models`           | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined`   | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean`                                                                                                                      | `undefined`   | -                                                                                                 |
| `disableAnimate`   | `boolean`                                                                                                                      | `false`       | -                                                                                                 |
| `callback?`        | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`) => `void`                                                                | `undefined`   | -                                                                                                 |
| `stack?`           | `boolean`                                                                                                                      | `undefined`   | -                                                                                                 |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateComboPosition](../../interfaces/graph/IGraph.zh.md#updatecomboposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1206](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1206)

---

### updateData

▸ **updateData**(`itemType`, `models`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name       | Type                                                                                                                                                                                           | Description                                                                                    |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `itemType` | `ITEM_TYPE`                                                                                                                                                                                    | 'node' \| 'edge' \| 'combo'                                                                    |
| `models`   | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | new configurations for every node/edge/combo, which has id field to indicate the specific item |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateData](../../interfaces/graph/IGraph.zh.md#updatedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1117](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1117)

---

### updateNodePosition

▸ **updateNodePosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

#### Parameters

| Name               | Type                                                                                                                           | Default value | Description                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------------------------------------------------------------- |
| `models`           | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined`   | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean`                                                                                                                      | `undefined`   | -                                                                                                |
| `disableAnimate`   | `boolean`                                                                                                                      | `false`       | -                                                                                                |
| `callback?`        | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`, `canceled?`: `boolean`) => `void`                                        | `undefined`   | -                                                                                                |
| `stack?`           | `boolean`                                                                                                                      | `undefined`   | -                                                                                                |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateNodePosition](../../interfaces/graph/IGraph.zh.md#updatenodeposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1175](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1175)

## Graph Instance

### destroy

▸ **destroy**(`callback?`): `void`

Destroy the graph instance and remove the related canvases.

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `callback?` | `Function` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[destroy](../../interfaces/graph/IGraph.zh.md#destroy)

#### Defined in

[packages/g6/src/runtime/graph.ts:2192](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2192)

## Interaction

### addBehaviors

▸ **addBehaviors**(`behaviors`, `modes`): `void`

Add behavior(s) to mode(s).

#### Parameters

| Name        | Type                                                     | Description               |
| :---------- | :------------------------------------------------------- | :------------------------ |
| `behaviors` | `BehaviorOptionsOf`<`B`\> \| `BehaviorOptionsOf`<`B`\>[] | behavior names or configs |
| `modes`     | `string` \| `string`[]                                   | mode names                |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[addBehaviors](../../interfaces/graph/IGraph.zh.md#addbehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1772](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1772)

---

### drawTransient

▸ **drawTransient**(`type`, `id`, `config`, `canvas?`): `DisplayObject`<`any`, `any`\>

Draw or update a G shape or group to the transient canvas.

#### Parameters

| Name                       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description                                                                                                    |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `type`                     | `ITEM_TYPE` \| `SHAPE_TYPE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | shape type or item type                                                                                        |
| `id`                       | `ID`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing |
| `config`                   | `Object`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -                                                                                                              |
| `config.action`            | `"update"` \| `"add"` \| `"remove"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | -                                                                                                              |
| `config.onlyDrawKeyShape?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                              |
| `config.style`             | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.zh.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.zh.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.zh.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.zh.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.zh.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.zh.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.zh.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.zh.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.zh.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.zh.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.zh.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.zh.md) & { `interactive?`: `boolean` } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\> | -                                                                                                              |
| `config.upsertAncestors?`  | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                              |
| `canvas?`                  | `Canvas`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -                                                                                                              |

#### Returns

`DisplayObject`<`any`, `any`\>

upserted shape or group

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[drawTransient](../../interfaces/graph/IGraph.zh.md#drawtransient)

#### Defined in

[packages/g6/src/runtime/graph.ts:1978](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1978)

---

### getMode

▸ **getMode**(): `string`

Get current mode.

#### Returns

`string`

mode name

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getMode](../../interfaces/graph/IGraph.zh.md#getmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1761](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1761)

---

### removeBehaviors

▸ **removeBehaviors**(`behaviorKeys`, `modes`): `void`

Remove behavior(s) from mode(s).

#### Parameters

| Name           | Type                   | Description |
| :------------- | :--------------------- | :---------- |
| `behaviorKeys` | `string`[]             | -           |
| `modes`        | `string` \| `string`[] | mode names  |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[removeBehaviors](../../interfaces/graph/IGraph.zh.md#removebehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1798](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1798)

---

### setMode

▸ **setMode**(`mode`): `void`

Switch mode.

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `mode` | `string` | mode name   |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[setMode](../../interfaces/graph/IGraph.zh.md#setmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1752](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1752)

---

### updateBehavior

▸ **updateBehavior**(`behavior`, `mode?`): `void`

Update a behavior on a mode.

#### Parameters

| Name       | Type                      | Description                                                       |
| :--------- | :------------------------ | :---------------------------------------------------------------- |
| `behavior` | `BehaviorOptionsOf`<`B`\> | behavior configs, whose name indicates the behavior to be updated |
| `mode?`    | `string`                  | mode name                                                         |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateBehavior](../../interfaces/graph/IGraph.zh.md#updatebehavior)

#### Defined in

[packages/g6/src/runtime/graph.ts:1825](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1825)

---

### updatePlugin

▸ **updatePlugin**(`plugin`): `void`

Update a plugin of the graph.

#### Parameters

| Name     | Type                                                                           | Description                                                    |
| :------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------- |
| `plugin` | `Plugin` \| { `[cfg: string]`: `unknown`; `key`: `string` ; `type`: `string` } | plugin configs, whose key indicates the behavior to be updated |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updatePlugin](../../interfaces/graph/IGraph.zh.md#updateplugin)

#### Defined in

[packages/g6/src/runtime/graph.ts:1924](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1924)

## Item

### backItem

▸ **backItem**(`ids`): `void`

Make the item(s) to the back.

#### Parameters

| Name  | Type           |
| :---- | :------------- |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[backItem](../../interfaces/graph/IGraph.zh.md#backitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1395](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1395)

---

### clearItemState

▸ **clearItemState**(`ids`, `states?`): `void`

Clear all the states for item(s).

#### Parameters

| Name      | Type           | Description                                                                |
| :-------- | :------------- | :------------------------------------------------------------------------- |
| `ids`     | `ID` \| `ID`[] | the id(s) for the item(s) to be clear                                      |
| `states?` | `string`[]     | the states' names, all the states wil be cleared if states is not assigned |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[clearItemState](../../interfaces/graph/IGraph.zh.md#clearitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1488](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1488)

---

### findIdByState

▸ **findIdByState**(`itemType`, `state`, `value?`, `additionalFilter?`): `ID`[]

Find items which has the state.

#### Parameters

| Name                | Type                                                              | Default value | Description                |
| :------------------ | :---------------------------------------------------------------- | :------------ | :------------------------- |
| `itemType`          | `ITEM_TYPE`                                                       | `undefined`   | item type                  |
| `state`             | `string`                                                          | `undefined`   | state name                 |
| `value`             | `string` \| `boolean`                                             | `true`        | -                          |
| `additionalFilter?` | (`item`: `NodeModel` \| `EdgeModel` \| `ComboModel`) => `boolean` | `undefined`   | additional filter function |

#### Returns

`ID`[]

items that is the type and has the state

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[findIdByState](../../interfaces/graph/IGraph.zh.md#findidbystate)

#### Defined in

[packages/g6/src/runtime/graph.ts:948](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L948)

---

### frontItem

▸ **frontItem**(`ids`): `void`

Make the item(s) to the front.

#### Parameters

| Name  | Type           |
| :---- | :------------- |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[frontItem](../../interfaces/graph/IGraph.zh.md#frontitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1376](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1376)

---

### getItemAllStates

▸ **getItemAllStates**(`id`): `string`[]

Get all the state names with value true for an item.

#### Parameters

| Name | Type | Description         |
| :--- | :--- | :------------------ |
| `id` | `ID` | the id for the item |

#### Returns

`string`[]

the state names with value true

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getItemAllStates](../../interfaces/graph/IGraph.zh.md#getitemallstates)

#### Defined in

[packages/g6/src/runtime/graph.ts:1477](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1477)

---

### getItemState

▸ **getItemState**(`id`, `state`): `string` \| `boolean`

Get the state value for an item.

#### Parameters

| Name    | Type     | Description         |
| :------ | :------- | :------------------ |
| `id`    | `ID`     | the id for the item |
| `state` | `string` | -                   |

#### Returns

`string` \| `boolean`

the state value

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getItemState](../../interfaces/graph/IGraph.zh.md#getitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1467](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1467)

---

### getItemVisible

▸ **getItemVisible**(`id`): `boolean`

Get the visibility for a node / edge / combo.

#### Parameters

| Name | Type | Description                        |
| :--- | :--- | :--------------------------------- |
| `id` | `ID` | the id for the node / edge / combo |

#### Returns

`boolean`

visibility for the item, false for invisible or unexistence for the item

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getItemVisible](../../interfaces/graph/IGraph.zh.md#getitemvisible)

#### Defined in

[packages/g6/src/runtime/graph.ts:1531](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1531)

---

### getRenderBBox

▸ **getRenderBBox**(`id`, `onlyKeyShape?`, `isTransient?`): `false` \| `AABB`

Get the rendering bbox for a node / edge / combo, or the graph (when the id is not assigned).

#### Parameters

| Name           | Type      | Default value | Description                                                       |
| :------------- | :-------- | :------------ | :---------------------------------------------------------------- |
| `id`           | `ID`      | `undefined`   | the id for the node / edge / combo, undefined for the whole graph |
| `onlyKeyShape` | `boolean` | `false`       | -                                                                 |
| `isTransient`  | `boolean` | `false`       | -                                                                 |

#### Returns

`false` \| `AABB`

rendering bounding box. returns false if the item is not exist

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getRenderBBox](../../interfaces/graph/IGraph.zh.md#getrenderbbox)

#### Defined in

[packages/g6/src/runtime/graph.ts:1516](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1516)

---

### hideItem

▸ **hideItem**(`ids`, `disableAnimate?`): `void`

Hide the item(s).

#### Parameters

| Name             | Type           | Default value |
| :--------------- | :------------- | :------------ |
| `ids`            | `ID` \| `ID`[] | `undefined`   |
| `disableAnimate` | `boolean`      | `false`       |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[hideItem](../../interfaces/graph/IGraph.zh.md#hideitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1347](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1347)

---

### setItemState

▸ **setItemState**(`ids`, `states`, `value`): `void`

Set state for the item.

#### Parameters

| Name     | Type                   | Description |
| :------- | :--------------------- | :---------- |
| `ids`    | `ID` \| `ID`[]         | -           |
| `states` | `string` \| `string`[] | -           |
| `value`  | `boolean`              | state value |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[setItemState](../../interfaces/graph/IGraph.zh.md#setitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1434](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1434)

---

### showItem

▸ **showItem**(`ids`, `disableAnimate?`): `void`

Show the item(s).

#### Parameters

| Name             | Type           | Default value |
| :--------------- | :------------- | :------------ |
| `ids`            | `ID` \| `ID`[] | `undefined`   |
| `disableAnimate` | `boolean`      | `false`       |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[showItem](../../interfaces/graph/IGraph.zh.md#showitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1319](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1319)

## Methods

### historyBatch

▸ **historyBatch**(`callback`): `void`

Execute a provided function within a batched context
All operations performed inside callback will be treated as a composite operation
more convenient way without manually invoking `startHistoryBatch` and `stopHistoryBatch`.

#### Parameters

| Name       | Type         | Description                                            |
| :--------- | :----------- | :----------------------------------------------------- |
| `callback` | () => `void` | The func containing operations to be batched together. |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[historyBatch](../../interfaces/graph/IGraph.zh.md#historyBatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2137](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2137)

---

### canRedo

▸ **canRedo**(): `boolean`

Indicate whether there are any actions available in the redo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[canRedo](../../interfaces/graph/IGraph.zh.md#canredo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2106](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2106)

---

### canUndo

▸ **canUndo**(): `boolean`

Indicate whether there are any actions available in the undo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[canUndo](../../interfaces/graph/IGraph.zh.md#canundo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2098](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2098)

---

### changeRenderer

▸ **changeRenderer**(`type`): `void`

Change the renderer at runtime.

#### Parameters

| Name   | Type  | Description   |
| :----- | :---- | :------------ |
| `type` | `any` | renderer name |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[changeRenderer](../../interfaces/graph/IGraph.zh.md#changerenderer)

#### Defined in

[packages/g6/src/runtime/graph.ts:260](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L260)

---

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[clear](../../interfaces/graph/IGraph.zh.md#clear)

#### Defined in

[packages/g6/src/runtime/graph.ts:470](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L470)

---

### clearStack

▸ **clearStack**(`stackType?`): `void`

Clear history stack

#### Parameters

| Name         | Type                 | Description     |
| :----------- | :------------------- | :-------------- |
| `stackType?` | `"redo"` \| `"undo"` | undo/redo stack |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[clearStack](../../interfaces/graph/IGraph.zh.md#clearstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2146](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2146)

---

### emit

▸ **emit**(`evt`, `...args`): `void`

触发一个事件

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `evt`     | `string` |
| `...args` | `any`[]  |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[emit](../../interfaces/graph/IGraph.zh.md#emit)

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:25

---

### executeWithNoStack

▸ **executeWithNoStack**(`callback`): `void`

Execute a callback without allowing any stacking operations.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `callback` | () => `void` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[executeWithNoStack](../../interfaces/graph/IGraph.zh.md#executewithoutstacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2040](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2040)

---

### fitCenter

▸ **fitCenter**(`effectTiming?`): `Promise`<`void`\>

Fit the graph center to the view center.

#### Parameters

| Name            | Type                                                                                            | Description              |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------- |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[fitCenter](../../interfaces/graph/IGraph.zh.md#fitcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:706](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L706)

---

### fitView

▸ **fitView**(`options?`, `effectTiming?`): `Promise`<`void`\>

Fit the graph content to the view.

#### Parameters

| Name              | Type                                                                                            | Description              |
| :---------------- | :---------------------------------------------------------------------------------------------- | :----------------------- |
| `options?`        | `Object`                                                                                        | -                        |
| `options.padding` | `Padding`                                                                                       | padding while fitting    |
| `options.rules`   | `FitViewRules`                                                                                  | rules for fitting        |
| `effectTiming?`   | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[fitView](../../interfaces/graph/IGraph.zh.md#fitview)

#### Defined in

[packages/g6/src/runtime/graph.ts:638](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L638)

---

### focusItem

▸ **focusItem**(`id`, `effectTiming?`): `Promise`<`void`\>

Move the graph to make the item align the view center.

#### Parameters

| Name            | Type                                                                                            | Description              |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------- |
| `id`            | `ID` \| `ID`[]                                                                                  | -                        |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[focusItem](../../interfaces/graph/IGraph.zh.md#focusitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:721](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L721)

---

### getEvents

▸ **getEvents**(): `Record`<`string`, `EventType`[]\>

#### Returns

`Record`<`string`, `EventType`[]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getEvents](../../interfaces/graph/IGraph.zh.md#getevents)

#### Inherited from

EventEmitter.getEvents

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:32

---

### getLayoutCurrentAnimation

▸ **getLayoutCurrentAnimation**(): `Animation`

#### Returns

`Animation`

#### Defined in

[packages/g6/src/runtime/graph.ts:1742](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1742)

---

### getRedoStack

▸ **getRedoStack**(): `Command`[][]

Retrieve the current undo stack which consists of operations that were undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getRedoStack](../../interfaces/graph/IGraph.zh.md#getredostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2061](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2061)

---

### getSpecification

▸ **getSpecification**(): [`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\>

Get the copy of specs(configurations).

#### Returns

[`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\>

graph specs

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getSpecification](../../interfaces/graph/IGraph.zh.md#getspecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:389](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L389)

---

### getStack

▸ **getStack**(): `Record`<`string`, `Command`[][]\>

Retrieve the complete history stack

#### Returns

`Record`<`string`, `Command`[][]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getStack](../../interfaces/graph/IGraph.zh.md#getstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2070](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2070)

---

### getUndoStack

▸ **getUndoStack**(): `Command`[][]

Retrieve the current redo stack which consists of operations that could be undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getUndoStack](../../interfaces/graph/IGraph.zh.md#getundostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2053](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2053)

---

### getViewportCenter

▸ **getViewportCenter**(): `PointLike`

Return the center of viewport, e.g. for a 500 \* 500 canvas, its center is [250, 250].

#### Returns

`PointLike`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getViewportCenter](../../interfaces/graph/IGraph.zh.md#getviewportcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:487](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L487)

---

### getZoom

▸ **getZoom**(): `number`

Return the current zoom level of camera.

#### Returns

`number`

current zoom

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getZoom](../../interfaces/graph/IGraph.zh.md#getzoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:588](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L588)

---

### isHistoryEnabled

▸ **isHistoryEnabled**(): `boolean`

Determine if history (redo/undo) is enabled.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[isHistoryEnabled](../../interfaces/graph/IGraph.zh.md#ishistoryenabled)

#### Defined in

[packages/g6/src/runtime/graph.ts:2004](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2004)

---

### layout

▸ **layout**(`options?`, `disableAnimate?`): `Promise`<`void`\>

Layout the graph (with current configurations if cfg is not assigned).

#### Parameters

| Name             | Type            | Default value |
| :--------------- | :-------------- | :------------ |
| `options?`       | `LayoutOptions` | `undefined`   |
| `disableAnimate` | `boolean`       | `false`       |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[layout](../../interfaces/graph/IGraph.zh.md#layout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1684](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1684)

---

### off

▸ **off**(`evt?`, `callback?`): [`Graph`](Graph.zh.md)<`B`, `T`\>

取消监听一个事件，或者一个 channel

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `evt?`      | `string`   |
| `callback?` | `Function` |

#### Returns

[`Graph`](Graph.zh.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[off](../../interfaces/graph/IGraph.zh.md#off)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:31

---

### on

▸ **on**(`evt`, `callback`, `once?`): [`Graph`](Graph.zh.md)<`B`, `T`\>

监听一个事件

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `evt`      | `string`   |
| `callback` | `Function` |
| `once?`    | `boolean`  |

#### Returns

[`Graph`](Graph.zh.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[on](../../interfaces/graph/IGraph.zh.md#on)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:13

---

### once

▸ **once**(`evt`, `callback`): [`Graph`](Graph.zh.md)<`B`, `T`\>

监听一个事件一次

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `evt`      | `string`   |
| `callback` | `Function` |

#### Returns

[`Graph`](Graph.zh.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[once](../../interfaces/graph/IGraph.zh.md#once)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:19

---

### pauseStack

▸ **pauseStack**(): `void`

Pause stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[pauseStack](../../interfaces/graph/IGraph.zh.md#pausestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2023](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2023)

---

### pushStack

▸ **pushStack**(`cmd`, `stackType`, `isNew?`): `void`

Push the operation(s) onto the specified stack

#### Parameters

| Name        | Type                 | Description           |
| :---------- | :------------------- | :-------------------- |
| `cmd`       | `Command`[]          | commands to be pushed |
| `stackType` | `"redo"` \| `"undo"` | undo/redo stack       |
| `isNew?`    | `boolean`            |                       |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[pushStack](../../interfaces/graph/IGraph.zh.md#pushstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2015](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2015)

---

### redo

▸ **redo**(): `void`

Revert recent n operation(s) performed on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[redo](../../interfaces/graph/IGraph.zh.md#redo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2090](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2090)

---

### resumeStack

▸ **resumeStack**(): `void`

Resume stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[resumeStack](../../interfaces/graph/IGraph.zh.md#resumestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2031](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2031)

---

### rotate

▸ **rotate**(`angle`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph with a relative angle.

#### Parameters

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `angle`         | `number`                                                                                        |
| `origin?`       | `PointLike`                                                                                     |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[rotate](../../interfaces/graph/IGraph.zh.md#rotate)

#### Defined in

[packages/g6/src/runtime/graph.ts:598](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L598)

---

### rotateTo

▸ **rotateTo**(`angle`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph to an absolute angle.

#### Parameters

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `angle`         | `number`                                                                                        |
| `origin?`       | `PointLike`                                                                                     |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[rotateTo](../../interfaces/graph/IGraph.zh.md#rotateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:620](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L620)

---

### startHistoryBatch

▸ **startHistoryBatch**(): `void`

Begin a historyBatch operation.
Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[startHistoryBatch](../../interfaces/graph/IGraph.zh.md#startbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2116](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2116)

---

### stopHistoryBatch

▸ **stopHistoryBatch**(): `void`

End a historyBatch operation.
Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[stopHistoryBatch](../../interfaces/graph/IGraph.zh.md#stopbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2126](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2126)

---

### stopLayout

▸ **stopLayout**(): `void`

Some layout algorithms has many iterations which can be stopped at any time.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[stopLayout](../../interfaces/graph/IGraph.zh.md#stoplayout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1734](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1734)

---

### stopTransformTransition

▸ **stopTransformTransition**(): `void`

Stop the current transition of transform immediately.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[stopTransformTransition](../../interfaces/graph/IGraph.zh.md#stoptransformtransition)

#### Defined in

[packages/g6/src/runtime/graph.ts:505](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L505)

---

### transform

▸ **transform**(`options`, `effectTiming?`): `Promise`<`void`\>

Transform the graph with a CSS-Transform-like syntax.

#### Parameters

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `options`       | `GraphTransformOptions`                                                                         |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[transform](../../interfaces/graph/IGraph.zh.md#transform)

#### Defined in

[packages/g6/src/runtime/graph.ts:491](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L491)

---

### translate

▸ **translate**(`distance`, `effectTiming?`): `Promise`<`void`\>

Move the graph with a relative distance under viewport coordinates.

#### Parameters

| Name            | Type                                                                                            | Description              |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------- |
| `distance`      | `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number` }\>                                | -                        |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[translate](../../interfaces/graph/IGraph.zh.md#translate)

#### Defined in

[packages/g6/src/runtime/graph.ts:515](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L515)

---

### translateTo

▸ **translateTo**(`destination`, `effectTiming?`): `Promise`<`void`\>

Move the graph to destination under viewport coordinates.

#### Parameters

| Name            | Type                                                                                            | Description                             |
| :-------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `destination`   | `Point`                                                                                         | destination under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations                |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[translateTo](../../interfaces/graph/IGraph.zh.md#translateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:536](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L536)

---

### undo

▸ **undo**(): `void`

Restore n operations that were last n reverted on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[undo](../../interfaces/graph/IGraph.zh.md#undo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2080](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2080)

---

### updateSpecification

▸ **updateSpecification**(`spec`): [`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\>

Update the specs(configurations).

#### Parameters

| Name   | Type                                                                     |
| :----- | :----------------------------------------------------------------------- |
| `spec` | [`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\> |

#### Returns

[`Specification`](../../interfaces/graph/Specification.zh.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateSpecification](../../interfaces/graph/IGraph.zh.md#updatespecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:362](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L362)

---

### updateTheme

▸ **updateTheme**(`theme`): `void`

Update the theme specs (configurations).

#### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `theme` | `ThemeOptionsOf`<`T`\> |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[updateTheme](../../interfaces/graph/IGraph.zh.md#updatetheme)

#### Defined in

[packages/g6/src/runtime/graph.ts:368](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L368)

---

### zoom

▸ **zoom**(`ratio`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph with a relative ratio.

#### Parameters

| Name            | Type                                                                                            | Description                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------- |
| `ratio`         | `number`                                                                                        | relative ratio to zoom             |
| `origin?`       | `Point`                                                                                         | origin under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations           |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[zoom](../../interfaces/graph/IGraph.zh.md#zoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:550](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L550)

---

### zoomTo

▸ **zoomTo**(`zoom`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph to a specified ratio.

#### Parameters

| Name            | Type                                                                                            | Description              |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------- |
| `zoom`          | `number`                                                                                        | specified ratio          |
| `origin?`       | `PointLike`                                                                                     | zoom center              |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[zoomTo](../../interfaces/graph/IGraph.zh.md#zoomto)

#### Defined in

[packages/g6/src/runtime/graph.ts:572](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L572)

## Plugin

### addPlugins

▸ **addPlugins**(`pluginCfgs`): `void`

Add plugin(s) to graph.

#### Parameters

| Name         | Type                                                                                   |
| :----------- | :------------------------------------------------------------------------------------- |
| `pluginCfgs` | (`string` \| { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` })[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[addPlugins](../../interfaces/graph/IGraph.zh.md#addplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1847](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1847)

---

### removePlugins

▸ **removePlugins**(`pluginKeys`): `void`

Remove plugin(s) from graph.

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `pluginKeys` | (`string` \| `Plugin`)[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[removePlugins](../../interfaces/graph/IGraph.zh.md#removeplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1900](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L1900)

## Properties

### backgroundCanvas

• **backgroundCanvas**: `Canvas`

#### Defined in

[packages/g6/src/runtime/graph.ts:79](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L79)

---

### canvas

• **canvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[canvas](../../interfaces/graph/IGraph.zh.md#canvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:69](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L69)

---

### container

• **container**: `HTMLElement`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[container](../../interfaces/graph/IGraph.zh.md#container)

#### Defined in

[packages/g6/src/runtime/graph.ts:71](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L71)

---

### destroyed

• **destroyed**: `boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[destroyed](../../interfaces/graph/IGraph.zh.md#destroyed)

#### Defined in

[packages/g6/src/runtime/graph.ts:73](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L73)

---

### hooks

• **hooks**: `Hooks`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[hooks](../../interfaces/graph/IGraph.zh.md#hooks)

#### Defined in

[packages/g6/src/runtime/graph.ts:67](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L67)

---

### rendererType

• **rendererType**: `RendererName`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[rendererType](../../interfaces/graph/IGraph.zh.md#renderertype)

#### Defined in

[packages/g6/src/runtime/graph.ts:75](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L75)

---

### transientCanvas

• **transientCanvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[transientCanvas](../../interfaces/graph/IGraph.zh.md#transientcanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:77](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L77)

## Tree

### collapse

▸ **collapse**(`ids`, `disableAnimate?`, `stack?`): `void`

Collapse sub tree(s).

#### Parameters

| Name             | Type           | Default value | Description                                        |
| :--------------- | :------------- | :------------ | :------------------------------------------------- |
| `ids`            | `ID` \| `ID`[] | `undefined`   | Root id(s) of the sub trees.                       |
| `disableAnimate` | `boolean`      | `false`       | Whether disable the animations for this operation. |
| `stack?`         | `boolean`      | `undefined`   | Whether push this operation to stack.              |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[collapse](../../interfaces/graph/IGraph.zh.md#collapse)

#### Defined in

[packages/g6/src/runtime/graph.ts:2162](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2162)

---

### expand

▸ **expand**(`ids`, `disableAnimate?`, `stack?`): `void`

Expand sub tree(s).

#### Parameters

| Name             | Type           | Default value | Description                                        |
| :--------------- | :------------- | :------------ | :------------------------------------------------- |
| `ids`            | `ID` \| `ID`[] | `undefined`   | Root id(s) of the sub trees.                       |
| `disableAnimate` | `boolean`      | `false`       | Whether disable the animations for this operation. |
| `stack?`         | `boolean`      | `undefined`   | Whether push this operation to stack.              |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[expand](../../interfaces/graph/IGraph.zh.md#expand)

#### Defined in

[packages/g6/src/runtime/graph.ts:2178](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L2178)

## View

### getCanvasByClient

▸ **getCanvasByClient**(`clientPoint`): `Point`

Get the rendering coordinate according to the browser coordinate.

#### Parameters

| Name          | Type    |
| :------------ | :------ |
| `clientPoint` | `Point` |

#### Returns

`Point`

rendering coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getCanvasByClient](../../interfaces/graph/IGraph.zh.md#getcanvasbyclient)

#### Defined in

[packages/g6/src/runtime/graph.ts:819](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L819)

---

### getCanvasByViewport

▸ **getCanvasByViewport**(`viewportPoint`): `Point`

Get the rendering coordinate according to the canvas dom (viewport) coordinate.

#### Parameters

| Name            | Type    |
| :-------------- | :------ |
| `viewportPoint` | `Point` |

#### Returns

`Point`

canvas dom (viewport) coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getCanvasByViewport](../../interfaces/graph/IGraph.zh.md#getcanvasbyviewport)

#### Defined in

[packages/g6/src/runtime/graph.ts:788](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L788)

---

### getClientByCanvas

▸ **getClientByCanvas**(`canvasPoint`): `Point`

Get the browser coordinate according to the rendering coordinate.

#### Parameters

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

#### Returns

`Point`

browser coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getClientByCanvas](../../interfaces/graph/IGraph.zh.md#getclientbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:808](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L808)

---

### getSize

▸ **getSize**(): `number`[]

Get the size of the graph canvas.

#### Returns

`number`[]

[width, height]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getSize](../../interfaces/graph/IGraph.zh.md#getsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:760](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L760)

---

### getViewportByCanvas

▸ **getViewportByCanvas**(`canvasPoint`): `Point`

Get the canvas dom (viewport) coordinate according to the rendering coordinate.

#### Parameters

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

#### Returns

`Point`

rendering coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[getViewportByCanvas](../../interfaces/graph/IGraph.zh.md#getviewportbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:798](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L798)

---

### setSize

▸ **setSize**(`size`): `void`

Set the size for the graph canvas.

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `size` | `number`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.zh.md).[setSize](../../interfaces/graph/IGraph.zh.md#setsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:770](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/runtime/graph.ts#L770)
