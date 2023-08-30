---
title: Graph
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [graph](../../modules/graph.en.md) / Graph

[graph](../../modules/graph.en.md).Graph

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` |

## Hierarchy

- `default`

  ↳ **`Graph`**

## Implements

- [`IGraph`](../../interfaces/graph/IGraph.en.md)<`B`, `T`\>

## Combo

### addCombo

▸ **addCombo**(`model`, `childrenIds`): `ComboModel`

Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | `ComboUserModel` | combo user data |
| `childrenIds` | `ID`[] | - |

#### Returns

`ComboModel`

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[addCombo](../../interfaces/graph/IGraph.en.md#addcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1549](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1549)

___

### collapseCombo

▸ **collapseCombo**(`comboIds`): `void`

Collapse a combo.

#### Parameters

| Name | Type |
| :------ | :------ |
| `comboIds` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[collapseCombo](../../interfaces/graph/IGraph.en.md#collapsecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1594](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1594)

___

### expandCombo

▸ **expandCombo**(`comboIds`): `void`

Expand a combo.

#### Parameters

| Name | Type |
| :------ | :------ |
| `comboIds` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[expandCombo](../../interfaces/graph/IGraph.en.md#expandcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1614](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1614)

___

### moveCombo

▸ **moveCombo**(`ids`, `dx`, `dy`, `upsertAncestors?`, `callback?`): `ComboModel`[]

Move one or more combos a distance (dx, dy) relatively,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `ID` \| `ID`[] |
| `dx` | `number` |
| `dy` | `number` |
| `upsertAncestors?` | `boolean` |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void` |

#### Returns

`ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[moveCombo](../../interfaces/graph/IGraph.en.md#movecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1637](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1637)

## Constructors

### constructor

• **new Graph**<`B`, `T`\>(`spec`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[packages/g6/src/runtime/graph.ts:106](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L106)

## Data

### addData

▸ **addData**(`itemType`, `models`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `models` | `NodeUserModel` \| `ComboUserModel` \| `EdgeUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | - |

#### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[addData](../../interfaces/graph/IGraph.en.md#adddata)

#### Defined in

[packages/g6/src/runtime/graph.ts:975](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L975)

___

### changeData

▸ **changeData**(`data`, `type?`): `Promise`<`void`\>

Change graph data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `DataConfig` | `undefined` | new data |
| `type` | ``"replace"`` \| ``"mergeReplace"`` | `'mergeReplace'` | the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[changeData](../../interfaces/graph/IGraph.en.md#changedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:456](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L456)

___

### getAllCombosData

▸ **getAllCombosData**(): `ComboModel`[]

Get all the combos' inner data

#### Returns

`ComboModel`[]

all combos' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getAllCombosData](../../interfaces/graph/IGraph.en.md#getallcombosdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:886](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L886)

___

### getAllEdgesData

▸ **getAllEdgesData**(): `EdgeModel`[]

Get all the edges' inner data

#### Returns

`EdgeModel`[]

all edges' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getAllEdgesData](../../interfaces/graph/IGraph.en.md#getalledgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:878](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L878)

___

### getAllNodesData

▸ **getAllNodesData**(): `NodeModel`[]

Get all the nodes' inner data

#### Returns

`NodeModel`[]

all nodes' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getAllNodesData](../../interfaces/graph/IGraph.en.md#getallnodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:870](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L870)

___

### getComboChildrenData

▸ **getComboChildrenData**(`comboId`): (`NodeModel` \| `ComboModel`)[]

Get the children's data of a combo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comboId` | `ID` | combo id |

#### Returns

(`NodeModel` \| `ComboModel`)[]

children's data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getComboChildrenData](../../interfaces/graph/IGraph.en.md#getcombochildrendata)

#### Defined in

[packages/g6/src/runtime/graph.ts:919](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L919)

___

### getComboData

▸ **getComboData**(`condition`): `ComboModel`

Find an combo's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`ComboModel`

result combo's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getComboData](../../interfaces/graph/IGraph.en.md#getcombodata)

#### Defined in

[packages/g6/src/runtime/graph.ts:860](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L860)

___

### getEdgeData

▸ **getEdgeData**(`condition`): `EdgeModel`

Find an edge's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`EdgeModel`

result edge's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getEdgeData](../../interfaces/graph/IGraph.en.md#getedgedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:847](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L847)

___

### getNearEdgesForNode

▸ **getNearEdgesForNode**(`nodeId`): `EdgeModel`[]

Retrieve the nearby edges for a given node using quadtree collision detection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | node id |

#### Returns

`EdgeModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getNearEdgesForNode](../../interfaces/graph/IGraph.en.md#getnearedgesfornode)

#### Defined in

[packages/g6/src/runtime/graph.ts:940](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L940)

___

### getNeighborNodesData

▸ **getNeighborNodesData**(`nodeId`, `direction?`): `NodeModel`[]

Get one-hop node ids from a start node.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `nodeId` | `ID` | `undefined` | id of the start node |
| `direction` | ``"both"`` \| ``"in"`` \| ``"out"`` | `'both'` | - |

#### Returns

`NodeModel`[]

one-hop nodes' data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getNeighborNodesData](../../interfaces/graph/IGraph.en.md#getneighbornodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:907](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L907)

___

### getNodeData

▸ **getNodeData**(`condition`): `NodeModel`

Find a node's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

`NodeModel`

result node's inner data

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getNodeData](../../interfaces/graph/IGraph.en.md#getnodedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:836](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L836)

___

### getRelatedEdgesData

▸ **getRelatedEdgesData**(`nodeId`, `direction?`): `EdgeModel`[]

Get one-hop edge ids from a start node.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `nodeId` | `ID` | `undefined` | id of the start node |
| `direction` | ``"both"`` \| ``"in"`` \| ``"out"`` | `'both'` | - |

#### Returns

`EdgeModel`[]

one-hop edges' data array

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getRelatedEdgesData](../../interfaces/graph/IGraph.en.md#getrelatededgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:895](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L895)

___

### read

▸ **read**(`data`): `Promise`<`void`\>

Input data and render the graph.
If there is old data, diffs and changes it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `DataConfig` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[read](../../interfaces/graph/IGraph.en.md#read)

#### Defined in

[packages/g6/src/runtime/graph.ts:405](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L405)

___

### removeData

▸ **removeData**(`itemType`, `ids`): `void`

Remove one or more node/edge/combo data from the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemType` | `ITEM_TYPE` |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[removeData](../../interfaces/graph/IGraph.en.md#removedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1032](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1032)

___

### updateComboPosition

▸ **updateComboPosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more combos' positions,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined` | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateComboPosition](../../interfaces/graph/IGraph.en.md#updatecomboposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1211](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1211)

___

### updateData

▸ **updateData**(`itemType`, `models`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | 'node' \| 'edge' \| 'combo' |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | new configurations for every node/edge/combo, which has id field to indicate the specific item |

#### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateData](../../interfaces/graph/IGraph.en.md#updatedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1122](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1122)

___

### updateNodePosition

▸ **updateNodePosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined` | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateNodePosition](../../interfaces/graph/IGraph.en.md#updatenodeposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1180](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1180)

## Graph Instance

### destroy

▸ **destroy**(`callback?`): `void`

Destroy the graph instance and remove the related canvases.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | `Function` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[destroy](../../interfaces/graph/IGraph.en.md#destroy)

#### Defined in

[packages/g6/src/runtime/graph.ts:2187](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2187)

## Interaction

### addBehaviors

▸ **addBehaviors**(`behaviors`, `modes`): `void`

Add behavior(s) to mode(s).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behaviors` | `BehaviorOptionsOf`<`B`\>[] | behavior names or configs |
| `modes` | `string` \| `string`[] | mode names |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[addBehaviors](../../interfaces/graph/IGraph.en.md#addbehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1777](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1777)

___

### drawTransient

▸ **drawTransient**(`type`, `id`, `config`): `DisplayObject`<`any`, `any`\>

Draw or update a G shape or group to the transient canvas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `SHAPE_TYPE` \| `ITEM_TYPE` | shape type or item type |
| `id` | `ID` | new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing |
| `config` | `Object` | - |
| `config.action` | ``"update"`` \| ``"remove"`` \| ``"add"`` | - |
| `config.onlyDrawKeyShape?` | `boolean` | - |
| `config.style` | `Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> | - |
| `config.upsertAncestors?` | `boolean` | - |

#### Returns

`DisplayObject`<`any`, `any`\>

upserted shape or group

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[drawTransient](../../interfaces/graph/IGraph.en.md#drawtransient)

#### Defined in

[packages/g6/src/runtime/graph.ts:1974](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1974)

___

### getMode

▸ **getMode**(): `string`

Get current mode.

#### Returns

`string`

mode name

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getMode](../../interfaces/graph/IGraph.en.md#getmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1766](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1766)

___

### removeBehaviors

▸ **removeBehaviors**(`behaviorKeys`, `modes`): `void`

Remove behavior(s) from mode(s).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behaviorKeys` | `string`[] | - |
| `modes` | `string` \| `string`[] | mode names |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[removeBehaviors](../../interfaces/graph/IGraph.en.md#removebehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1803](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1803)

___

### setMode

▸ **setMode**(`mode`): `void`

Switch mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mode` | `string` | mode name |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[setMode](../../interfaces/graph/IGraph.en.md#setmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1757](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1757)

___

### updateBehavior

▸ **updateBehavior**(`behavior`, `mode?`): `void`

Update a behavior on a mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `BehaviorOptionsOf`<`B`\> | behavior configs, whose name indicates the behavior to be updated |
| `mode?` | `string` | mode name |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateBehavior](../../interfaces/graph/IGraph.en.md#updatebehavior)

#### Defined in

[packages/g6/src/runtime/graph.ts:1830](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1830)

___

### updatePlugin

▸ **updatePlugin**(`plugin`): `void`

Update a plugin of the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | `Object` | plugin configs, whose key indicates the behavior to be updated |
| `plugin.key` | `string` | - |
| `plugin.type` | `string` | - |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updatePlugin](../../interfaces/graph/IGraph.en.md#updateplugin)

#### Defined in

[packages/g6/src/runtime/graph.ts:1924](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1924)

## Item

### backItem

▸ **backItem**(`ids`): `void`

Make the item(s) to the back.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[backItem](../../interfaces/graph/IGraph.en.md#backitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1400](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1400)

___

### clearItemState

▸ **clearItemState**(`ids`, `states?`): `void`

Clear all the states for item(s).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the id(s) for the item(s) to be clear |
| `states?` | `string`[] | the states' names, all the states wil be cleared if states is not assigned |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[clearItemState](../../interfaces/graph/IGraph.en.md#clearitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1493](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1493)

___

### findIdByState

▸ **findIdByState**(`itemType`, `state`, `value?`, `additionalFilter?`): `ID`[]

Find items which has the state.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | `undefined` | item type |
| `state` | `string` | `undefined` | state name |
| `value` | `string` \| `boolean` | `true` | - |
| `additionalFilter?` | (`item`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `boolean` | `undefined` | additional filter function |

#### Returns

`ID`[]

items that is the type and has the state

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[findIdByState](../../interfaces/graph/IGraph.en.md#findidbystate)

#### Defined in

[packages/g6/src/runtime/graph.ts:953](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L953)

___

### frontItem

▸ **frontItem**(`ids`): `void`

Make the item(s) to the front.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[frontItem](../../interfaces/graph/IGraph.en.md#frontitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1381](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1381)

___

### getItemAllStates

▸ **getItemAllStates**(`id`): `string`[]

Get all the state names with value true for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the item |

#### Returns

`string`[]

the state names with value true

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getItemAllStates](../../interfaces/graph/IGraph.en.md#getitemallstates)

#### Defined in

[packages/g6/src/runtime/graph.ts:1482](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1482)

___

### getItemState

▸ **getItemState**(`id`, `state`): `string` \| `boolean`

Get the state value for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the item |
| `state` | `string` | - |

#### Returns

`string` \| `boolean`

the state value

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getItemState](../../interfaces/graph/IGraph.en.md#getitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1472](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1472)

___

### getItemVisible

▸ **getItemVisible**(`id`): `boolean`

Get the visibility for a node / edge / combo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the node / edge / combo |

#### Returns

`boolean`

visibility for the item, false for invisible or unexistence for the item

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getItemVisible](../../interfaces/graph/IGraph.en.md#getitemvisible)

#### Defined in

[packages/g6/src/runtime/graph.ts:1536](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1536)

___

### getRenderBBox

▸ **getRenderBBox**(`id`, `onlyKeyShape?`, `isTransient?`): ``false`` \| `AABB`

Get the rendering bbox for a node / edge / combo, or the graph (when the id is not assigned).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `ID` | `undefined` | the id for the node / edge / combo, undefined for the whole graph |
| `onlyKeyShape` | `boolean` | `false` | - |
| `isTransient` | `boolean` | `false` | - |

#### Returns

``false`` \| `AABB`

rendering bounding box. returns false if the item is not exist

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getRenderBBox](../../interfaces/graph/IGraph.en.md#getrenderbbox)

#### Defined in

[packages/g6/src/runtime/graph.ts:1521](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1521)

___

### hideItem

▸ **hideItem**(`ids`, `disableAnimate?`): `void`

Hide the item(s).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | `undefined` |
| `disableAnimate` | `boolean` | `false` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[hideItem](../../interfaces/graph/IGraph.en.md#hideitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1352](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1352)

___

### setItemState

▸ **setItemState**(`ids`, `states`, `value`): `void`

Set state for the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | - |
| `states` | `string` \| `string`[] | - |
| `value` | `boolean` | state value |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[setItemState](../../interfaces/graph/IGraph.en.md#setitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1439](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1439)

___

### showItem

▸ **showItem**(`ids`, `disableAnimate?`): `void`

Show the item(s).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | `undefined` |
| `disableAnimate` | `boolean` | `false` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[showItem](../../interfaces/graph/IGraph.en.md#showitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1324](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1324)

## Methods

### batch

▸ **batch**(`callback`): `void`

Execute a provided function within a batched context
All operations performed inside callback will be treated as a composite operation
more convenient way without manually invoking `startBatch` and `stopBatch`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `void` | The func containing operations to be batched together. |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[batch](../../interfaces/graph/IGraph.en.md#batch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2132](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2132)

___

### canRedo

▸ **canRedo**(): `boolean`

Indicate whether there are any actions available in the redo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canRedo](../../interfaces/graph/IGraph.en.md#canredo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2101](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2101)

___

### canUndo

▸ **canUndo**(): `boolean`

Indicate whether there are any actions available in the undo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canUndo](../../interfaces/graph/IGraph.en.md#canundo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2093](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2093)

___

### changeRenderer

▸ **changeRenderer**(`type`): `void`

Change the renderer at runtime.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `any` | renderer name |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[changeRenderer](../../interfaces/graph/IGraph.en.md#changerenderer)

#### Defined in

[packages/g6/src/runtime/graph.ts:265](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L265)

___

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[clear](../../interfaces/graph/IGraph.en.md#clear)

#### Defined in

[packages/g6/src/runtime/graph.ts:475](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L475)

___

### clearStack

▸ **clearStack**(`stackType?`): `void`

Clear history stack

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stackType?` | ``"redo"`` \| ``"undo"`` | undo/redo stack |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[clearStack](../../interfaces/graph/IGraph.en.md#clearstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2141](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2141)

___

### emit

▸ **emit**(`evt`, `...args`): `void`

触发一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `...args` | `any`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[emit](../../interfaces/graph/IGraph.en.md#emit)

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:25

___

### executeWithoutStacking

▸ **executeWithoutStacking**(`callback`): `void`

Execute a callback without allowing any stacking operations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[executeWithoutStacking](../../interfaces/graph/IGraph.en.md#executewithoutstacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2035](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2035)

___

### fitCenter

▸ **fitCenter**(`effectTiming?`): `Promise`<`void`\>

Fit the graph center to the view center.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[fitCenter](../../interfaces/graph/IGraph.en.md#fitcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:711](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L711)

___

### fitView

▸ **fitView**(`options?`, `effectTiming?`): `Promise`<`void`\>

Fit the graph content to the view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | - |
| `options.padding` | `Padding` | padding while fitting |
| `options.rules` | `FitViewRules` | rules for fitting |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[fitView](../../interfaces/graph/IGraph.en.md#fitview)

#### Defined in

[packages/g6/src/runtime/graph.ts:643](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L643)

___

### focusItem

▸ **focusItem**(`id`, `effectTiming?`): `Promise`<`void`\>

Move the graph to make the item align the view center.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` \| `ID`[] | - |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[focusItem](../../interfaces/graph/IGraph.en.md#focusitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:726](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L726)

___

### getEvents

▸ **getEvents**(): `Record`<`string`, `EventType`[]\>

#### Returns

`Record`<`string`, `EventType`[]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getEvents](../../interfaces/graph/IGraph.en.md#getevents)

#### Inherited from

EventEmitter.getEvents

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:32

___

### getLayoutCurrentAnimation

▸ **getLayoutCurrentAnimation**(): `Animation`

#### Returns

`Animation`

#### Defined in

[packages/g6/src/runtime/graph.ts:1747](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1747)

___

### getRedoStack

▸ **getRedoStack**(): `Command`[][]

Retrieve the current undo stack which consists of operations that were undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getRedoStack](../../interfaces/graph/IGraph.en.md#getredostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2056](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2056)

___

### getSpecification

▸ **getSpecification**(): [`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\>

Get the copy of specs(configurations).

#### Returns

[`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\>

graph specs

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getSpecification](../../interfaces/graph/IGraph.en.md#getspecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:394](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L394)

___

### getStack

▸ **getStack**(): `Record`<`string`, `Command`[][]\>

Retrieve the complete history stack

#### Returns

`Record`<`string`, `Command`[][]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getStack](../../interfaces/graph/IGraph.en.md#getstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2065](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2065)

___

### getUndoStack

▸ **getUndoStack**(): `Command`[][]

Retrieve the current redo stack which consists of operations that could be undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getUndoStack](../../interfaces/graph/IGraph.en.md#getundostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2048](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2048)

___

### getViewportCenter

▸ **getViewportCenter**(): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

#### Returns

`PointLike`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getViewportCenter](../../interfaces/graph/IGraph.en.md#getviewportcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:492](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L492)

___

### getZoom

▸ **getZoom**(): `number`

Return the current zoom level of camera.

#### Returns

`number`

current zoom

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getZoom](../../interfaces/graph/IGraph.en.md#getzoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:593](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L593)

___

### isHistoryEnabled

▸ **isHistoryEnabled**(): `boolean`

Determine if history (redo/undo) is enabled.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[isHistoryEnabled](../../interfaces/graph/IGraph.en.md#ishistoryenabled)

#### Defined in

[packages/g6/src/runtime/graph.ts:1999](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1999)

___

### layout

▸ **layout**(`options?`, `disableAnimate?`): `Promise`<`void`\>

Layout the graph (with current configurations if cfg is not assigned).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options?` | `LayoutOptions` | `undefined` |
| `disableAnimate` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[layout](../../interfaces/graph/IGraph.en.md#layout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1689](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1689)

___

### off

▸ **off**(`evt?`, `callback?`): [`Graph`](Graph.en.md)<`B`, `T`\>

取消监听一个事件，或者一个channel

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | `string` |
| `callback?` | `Function` |

#### Returns

[`Graph`](Graph.en.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[off](../../interfaces/graph/IGraph.en.md#off)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:31

___

### on

▸ **on**(`evt`, `callback`, `once?`): [`Graph`](Graph.en.md)<`B`, `T`\>

监听一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |
| `once?` | `boolean` |

#### Returns

[`Graph`](Graph.en.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[on](../../interfaces/graph/IGraph.en.md#on)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:13

___

### once

▸ **once**(`evt`, `callback`): [`Graph`](Graph.en.md)<`B`, `T`\>

监听一个事件一次

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |

#### Returns

[`Graph`](Graph.en.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[once](../../interfaces/graph/IGraph.en.md#once)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:19

___

### pauseStacking

▸ **pauseStacking**(): `void`

Pause stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[pauseStacking](../../interfaces/graph/IGraph.en.md#pausestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2018](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2018)

___

### pushStack

▸ **pushStack**(`cmd`, `stackType`, `isNew?`): `void`

Push the operation(s) onto the specified stack

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `Command`[] | commands to be pushed |
| `stackType` | ``"redo"`` \| ``"undo"`` | undo/redo stack |
| `isNew?` | `boolean` |  |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[pushStack](../../interfaces/graph/IGraph.en.md#pushstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2010](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2010)

___

### redo

▸ **redo**(): `void`

Revert recent n operation(s) performed on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[redo](../../interfaces/graph/IGraph.en.md#redo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2085](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2085)

___

### resumeStacking

▸ **resumeStacking**(): `void`

Resume stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[resumeStacking](../../interfaces/graph/IGraph.en.md#resumestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2026](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2026)

___

### rotate

▸ **rotate**(`angle`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph with a relative angle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |
| `origin?` | `PointLike` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[rotate](../../interfaces/graph/IGraph.en.md#rotate)

#### Defined in

[packages/g6/src/runtime/graph.ts:603](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L603)

___

### rotateTo

▸ **rotateTo**(`angle`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph to an absolute angle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |
| `origin?` | `PointLike` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[rotateTo](../../interfaces/graph/IGraph.en.md#rotateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:625](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L625)

___

### startBatch

▸ **startBatch**(): `void`

Begin a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[startBatch](../../interfaces/graph/IGraph.en.md#startbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2111](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2111)

___

### stopBatch

▸ **stopBatch**(): `void`

End a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[stopBatch](../../interfaces/graph/IGraph.en.md#stopbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2121](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2121)

___

### stopLayout

▸ **stopLayout**(): `void`

Some layout algorithms has many iterations which can be stopped at any time.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[stopLayout](../../interfaces/graph/IGraph.en.md#stoplayout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1739](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1739)

___

### stopTransformTransition

▸ **stopTransformTransition**(): `void`

Stop the current transition of transform immediately.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[stopTransformTransition](../../interfaces/graph/IGraph.en.md#stoptransformtransition)

#### Defined in

[packages/g6/src/runtime/graph.ts:510](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L510)

___

### transform

▸ **transform**(`options`, `effectTiming?`): `Promise`<`void`\>

Transform the graph with a CSS-Transform-like syntax.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GraphTransformOptions` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[transform](../../interfaces/graph/IGraph.en.md#transform)

#### Defined in

[packages/g6/src/runtime/graph.ts:496](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L496)

___

### translate

▸ **translate**(`distance`, `effectTiming?`): `Promise`<`void`\>

Move the graph with a relative distance under viewport coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number`  }\> | - |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[translate](../../interfaces/graph/IGraph.en.md#translate)

#### Defined in

[packages/g6/src/runtime/graph.ts:520](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L520)

___

### translateTo

▸ **translateTo**(`destination`, `effectTiming?`): `Promise`<`void`\>

Move the graph to destination under viewport coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `Point` | destination under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[translateTo](../../interfaces/graph/IGraph.en.md#translateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:541](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L541)

___

### undo

▸ **undo**(): `void`

Restore n operations that were last n reverted on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[undo](../../interfaces/graph/IGraph.en.md#undo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2075](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2075)

___

### updateSpecification

▸ **updateSpecification**(`spec`): [`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\>

Update the specs(configurations).

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\> |

#### Returns

[`Specification`](../../interfaces/graph/Specification.en.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateSpecification](../../interfaces/graph/IGraph.en.md#updatespecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:367](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L367)

___

### updateTheme

▸ **updateTheme**(`theme`): `void`

Update the theme specs (configurations).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `ThemeOptionsOf`<`T`\> |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateTheme](../../interfaces/graph/IGraph.en.md#updatetheme)

#### Defined in

[packages/g6/src/runtime/graph.ts:373](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L373)

___

### zoom

▸ **zoom**(`ratio`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph with a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | relative ratio to zoom |
| `origin?` | `Point` | origin under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[zoom](../../interfaces/graph/IGraph.en.md#zoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:555](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L555)

___

### zoomTo

▸ **zoomTo**(`zoom`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph to a specified ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `zoom` | `number` | specified ratio |
| `origin?` | `PointLike` | zoom center |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[zoomTo](../../interfaces/graph/IGraph.en.md#zoomto)

#### Defined in

[packages/g6/src/runtime/graph.ts:577](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L577)

## Plugin

### addPlugins

▸ **addPlugins**(`pluginCfgs`): `void`

Add plugin(s) to graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginCfgs` | (`string` \| { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  })[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[addPlugins](../../interfaces/graph/IGraph.en.md#addplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1852](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1852)

___

### removePlugins

▸ **removePlugins**(`pluginKeys`): `void`

Remove plugin(s) from graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginKeys` | `string`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[removePlugins](../../interfaces/graph/IGraph.en.md#removeplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1905](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L1905)

## Properties

### backgroundCanvas

• **backgroundCanvas**: `Canvas`

#### Defined in

[packages/g6/src/runtime/graph.ts:84](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L84)

___

### canvas

• **canvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canvas](../../interfaces/graph/IGraph.en.md#canvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:74](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L74)

___

### container

• **container**: `HTMLElement`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[container](../../interfaces/graph/IGraph.en.md#container)

#### Defined in

[packages/g6/src/runtime/graph.ts:76](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L76)

___

### destroyed

• **destroyed**: `boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[destroyed](../../interfaces/graph/IGraph.en.md#destroyed)

#### Defined in

[packages/g6/src/runtime/graph.ts:78](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L78)

___

### hooks

• **hooks**: `Hooks`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[hooks](../../interfaces/graph/IGraph.en.md#hooks)

#### Defined in

[packages/g6/src/runtime/graph.ts:72](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L72)

___

### rendererType

• **rendererType**: `RendererName`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[rendererType](../../interfaces/graph/IGraph.en.md#renderertype)

#### Defined in

[packages/g6/src/runtime/graph.ts:80](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L80)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[transientCanvas](../../interfaces/graph/IGraph.en.md#transientcanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:82](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L82)

## Tree

### collapse

▸ **collapse**(`ids`, `disableAnimate?`, `stack?`): `void`

Collapse sub tree(s).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | `undefined` | Root id(s) of the sub trees. |
| `disableAnimate` | `boolean` | `false` | Whether disable the animations for this operation. |
| `stack?` | `boolean` | `undefined` | Whether push this operation to stack. |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[collapse](../../interfaces/graph/IGraph.en.md#collapse)

#### Defined in

[packages/g6/src/runtime/graph.ts:2157](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2157)

___

### expand

▸ **expand**(`ids`, `disableAnimate?`, `stack?`): `void`

Expand sub tree(s).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | `undefined` | Root id(s) of the sub trees. |
| `disableAnimate` | `boolean` | `false` | Whether disable the animations for this operation. |
| `stack?` | `boolean` | `undefined` | Whether push this operation to stack. |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[expand](../../interfaces/graph/IGraph.en.md#expand)

#### Defined in

[packages/g6/src/runtime/graph.ts:2173](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L2173)

## View

### getCanvasByClient

▸ **getCanvasByClient**(`clientPoint`): `Point`

Get the rendering coordinate according to the browser coordinate.

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientPoint` | `Point` |

#### Returns

`Point`

rendering coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getCanvasByClient](../../interfaces/graph/IGraph.en.md#getcanvasbyclient)

#### Defined in

[packages/g6/src/runtime/graph.ts:824](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L824)

___

### getCanvasByViewport

▸ **getCanvasByViewport**(`viewportPoint`): `Point`

Get the rendering coordinate according to the canvas dom (viewport) coordinate.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewportPoint` | `Point` |

#### Returns

`Point`

canvas dom (viewport) coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getCanvasByViewport](../../interfaces/graph/IGraph.en.md#getcanvasbyviewport)

#### Defined in

[packages/g6/src/runtime/graph.ts:793](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L793)

___

### getClientByCanvas

▸ **getClientByCanvas**(`canvasPoint`): `Point`

Get the browser coordinate according to the rendering coordinate.

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvasPoint` | `Point` |

#### Returns

`Point`

browser coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getClientByCanvas](../../interfaces/graph/IGraph.en.md#getclientbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:813](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L813)

___

### getSize

▸ **getSize**(): `number`[]

Get the size of the graph canvas.

#### Returns

`number`[]

[width, height]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getSize](../../interfaces/graph/IGraph.en.md#getsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:765](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L765)

___

### getViewportByCanvas

▸ **getViewportByCanvas**(`canvasPoint`): `Point`

Get the canvas dom (viewport) coordinate according to the rendering coordinate.

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvasPoint` | `Point` |

#### Returns

`Point`

rendering coordinate

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getViewportByCanvas](../../interfaces/graph/IGraph.en.md#getviewportbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:803](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L803)

___

### setSize

▸ **setSize**(`size`): `void`

Set the size for the graph canvas.

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number`[] |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[setSize](../../interfaces/graph/IGraph.en.md#setsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:775](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/runtime/graph.ts#L775)
