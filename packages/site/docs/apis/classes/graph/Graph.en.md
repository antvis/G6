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

[packages/g6/src/runtime/graph.ts:1543](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1543)

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

[packages/g6/src/runtime/graph.ts:1588](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1588)

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

[packages/g6/src/runtime/graph.ts:1608](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1608)

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
| `callback?` | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`, `canceled?`: `boolean`) => `void` |

#### Returns

`ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[moveCombo](../../interfaces/graph/IGraph.en.md#movecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1631](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1631)

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

[packages/g6/src/runtime/graph.ts:100](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L100)

## Data

### addData

▸ **addData**(`itemType`, `models`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `models` | `NodeUserModel` \| `EdgeUserModel` \| `ComboUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | - |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

whether success

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[addData](../../interfaces/graph/IGraph.en.md#adddata)

#### Defined in

[packages/g6/src/runtime/graph.ts:969](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L969)

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

[packages/g6/src/runtime/graph.ts:450](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L450)

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

[packages/g6/src/runtime/graph.ts:880](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L880)

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

[packages/g6/src/runtime/graph.ts:872](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L872)

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

[packages/g6/src/runtime/graph.ts:864](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L864)

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

[packages/g6/src/runtime/graph.ts:913](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L913)

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

[packages/g6/src/runtime/graph.ts:854](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L854)

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

[packages/g6/src/runtime/graph.ts:841](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L841)

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

[packages/g6/src/runtime/graph.ts:934](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L934)

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

[packages/g6/src/runtime/graph.ts:901](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L901)

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

[packages/g6/src/runtime/graph.ts:830](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L830)

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

[packages/g6/src/runtime/graph.ts:889](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L889)

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

[packages/g6/src/runtime/graph.ts:399](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L399)

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

[packages/g6/src/runtime/graph.ts:1026](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1026)

___

### updateComboPosition

▸ **updateComboPosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more combos' positions,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined` | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateComboPosition](../../interfaces/graph/IGraph.en.md#updatecomboposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1205](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1205)

___

### updateData

▸ **updateData**(`itemType`, `models`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | 'node' \| 'edge' \| 'combo' |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | new configurations for every node/edge/combo, which has id field to indicate the specific item |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateData](../../interfaces/graph/IGraph.en.md#updatedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1116](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1116)

___

### updateNodePosition

▸ **updateNodePosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | `undefined` | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: `NodeModel` \| `EdgeModel` \| `ComboModel`, `canceled?`: `boolean`) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

`NodeModel` \| `EdgeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[updateNodePosition](../../interfaces/graph/IGraph.en.md#updatenodeposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1174](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1174)

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

[packages/g6/src/runtime/graph.ts:2181](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2181)

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

[packages/g6/src/runtime/graph.ts:1771](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1771)

___

### drawTransient

▸ **drawTransient**(`type`, `id`, `config`): `DisplayObject`<`any`, `any`\>

Draw or update a G shape or group to the transient canvas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ITEM_TYPE` \| `SHAPE_TYPE` | shape type or item type |
| `id` | `ID` | new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing |
| `config` | `Object` | - |
| `config.action` | ``"update"`` \| ``"add"`` \| ``"remove"`` | - |
| `config.onlyDrawKeyShape?` | `boolean` | - |
| `config.style` | `Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> | - |
| `config.upsertAncestors?` | `boolean` | - |

#### Returns

`DisplayObject`<`any`, `any`\>

upserted shape or group

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[drawTransient](../../interfaces/graph/IGraph.en.md#drawtransient)

#### Defined in

[packages/g6/src/runtime/graph.ts:1968](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1968)

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

[packages/g6/src/runtime/graph.ts:1760](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1760)

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

[packages/g6/src/runtime/graph.ts:1797](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1797)

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

[packages/g6/src/runtime/graph.ts:1751](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1751)

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

[packages/g6/src/runtime/graph.ts:1824](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1824)

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

[packages/g6/src/runtime/graph.ts:1918](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1918)

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

[packages/g6/src/runtime/graph.ts:1394](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1394)

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

[packages/g6/src/runtime/graph.ts:1487](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1487)

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
| `additionalFilter?` | (`item`: `NodeModel` \| `EdgeModel` \| `ComboModel`) => `boolean` | `undefined` | additional filter function |

#### Returns

`ID`[]

items that is the type and has the state

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[findIdByState](../../interfaces/graph/IGraph.en.md#findidbystate)

#### Defined in

[packages/g6/src/runtime/graph.ts:947](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L947)

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

[packages/g6/src/runtime/graph.ts:1375](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1375)

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

[packages/g6/src/runtime/graph.ts:1476](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1476)

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

[packages/g6/src/runtime/graph.ts:1466](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1466)

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

[packages/g6/src/runtime/graph.ts:1530](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1530)

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

[packages/g6/src/runtime/graph.ts:1515](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1515)

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

[packages/g6/src/runtime/graph.ts:1346](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1346)

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

[packages/g6/src/runtime/graph.ts:1433](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1433)

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

[packages/g6/src/runtime/graph.ts:1318](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1318)

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

[packages/g6/src/runtime/graph.ts:2126](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2126)

___

### canRedo

▸ **canRedo**(): `boolean`

Indicate whether there are any actions available in the redo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canRedo](../../interfaces/graph/IGraph.en.md#canredo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2095](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2095)

___

### canUndo

▸ **canUndo**(): `boolean`

Indicate whether there are any actions available in the undo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canUndo](../../interfaces/graph/IGraph.en.md#canundo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2087](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2087)

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

[packages/g6/src/runtime/graph.ts:259](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L259)

___

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[clear](../../interfaces/graph/IGraph.en.md#clear)

#### Defined in

[packages/g6/src/runtime/graph.ts:469](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L469)

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

[packages/g6/src/runtime/graph.ts:2135](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2135)

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

[packages/g6/src/runtime/graph.ts:2029](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2029)

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

[packages/g6/src/runtime/graph.ts:705](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L705)

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

[packages/g6/src/runtime/graph.ts:637](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L637)

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

[packages/g6/src/runtime/graph.ts:720](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L720)

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

[packages/g6/src/runtime/graph.ts:1741](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1741)

___

### getRedoStack

▸ **getRedoStack**(): `Command`[][]

Retrieve the current undo stack which consists of operations that were undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getRedoStack](../../interfaces/graph/IGraph.en.md#getredostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2050](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2050)

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

[packages/g6/src/runtime/graph.ts:388](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L388)

___

### getStack

▸ **getStack**(): `Record`<`string`, `Command`[][]\>

Retrieve the complete history stack

#### Returns

`Record`<`string`, `Command`[][]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getStack](../../interfaces/graph/IGraph.en.md#getstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2059](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2059)

___

### getUndoStack

▸ **getUndoStack**(): `Command`[][]

Retrieve the current redo stack which consists of operations that could be undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getUndoStack](../../interfaces/graph/IGraph.en.md#getundostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2042](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2042)

___

### getViewportCenter

▸ **getViewportCenter**(): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

#### Returns

`PointLike`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[getViewportCenter](../../interfaces/graph/IGraph.en.md#getviewportcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:486](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L486)

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

[packages/g6/src/runtime/graph.ts:587](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L587)

___

### isHistoryEnabled

▸ **isHistoryEnabled**(): `boolean`

Determine if history (redo/undo) is enabled.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[isHistoryEnabled](../../interfaces/graph/IGraph.en.md#ishistoryenabled)

#### Defined in

[packages/g6/src/runtime/graph.ts:1993](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1993)

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

[packages/g6/src/runtime/graph.ts:1683](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1683)

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

[packages/g6/src/runtime/graph.ts:2012](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2012)

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

[packages/g6/src/runtime/graph.ts:2004](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2004)

___

### redo

▸ **redo**(): `void`

Revert recent n operation(s) performed on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[redo](../../interfaces/graph/IGraph.en.md#redo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2079](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2079)

___

### resumeStacking

▸ **resumeStacking**(): `void`

Resume stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[resumeStacking](../../interfaces/graph/IGraph.en.md#resumestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2020](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2020)

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

[packages/g6/src/runtime/graph.ts:597](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L597)

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

[packages/g6/src/runtime/graph.ts:619](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L619)

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

[packages/g6/src/runtime/graph.ts:2105](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2105)

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

[packages/g6/src/runtime/graph.ts:2115](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2115)

___

### stopLayout

▸ **stopLayout**(): `void`

Some layout algorithms has many iterations which can be stopped at any time.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[stopLayout](../../interfaces/graph/IGraph.en.md#stoplayout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1733](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1733)

___

### stopTransformTransition

▸ **stopTransformTransition**(): `void`

Stop the current transition of transform immediately.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[stopTransformTransition](../../interfaces/graph/IGraph.en.md#stoptransformtransition)

#### Defined in

[packages/g6/src/runtime/graph.ts:504](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L504)

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

[packages/g6/src/runtime/graph.ts:490](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L490)

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

[packages/g6/src/runtime/graph.ts:514](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L514)

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

[packages/g6/src/runtime/graph.ts:535](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L535)

___

### undo

▸ **undo**(): `void`

Restore n operations that were last n reverted on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[undo](../../interfaces/graph/IGraph.en.md#undo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2069](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2069)

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

[packages/g6/src/runtime/graph.ts:361](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L361)

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

[packages/g6/src/runtime/graph.ts:367](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L367)

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

[packages/g6/src/runtime/graph.ts:549](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L549)

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

[packages/g6/src/runtime/graph.ts:571](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L571)

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

[packages/g6/src/runtime/graph.ts:1846](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1846)

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

[packages/g6/src/runtime/graph.ts:1899](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L1899)

## Properties

### backgroundCanvas

• **backgroundCanvas**: `Canvas`

#### Defined in

[packages/g6/src/runtime/graph.ts:78](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L78)

___

### canvas

• **canvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[canvas](../../interfaces/graph/IGraph.en.md#canvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:68](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L68)

___

### container

• **container**: `HTMLElement`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[container](../../interfaces/graph/IGraph.en.md#container)

#### Defined in

[packages/g6/src/runtime/graph.ts:70](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L70)

___

### destroyed

• **destroyed**: `boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[destroyed](../../interfaces/graph/IGraph.en.md#destroyed)

#### Defined in

[packages/g6/src/runtime/graph.ts:72](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L72)

___

### hooks

• **hooks**: `Hooks`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[hooks](../../interfaces/graph/IGraph.en.md#hooks)

#### Defined in

[packages/g6/src/runtime/graph.ts:66](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L66)

___

### rendererType

• **rendererType**: `RendererName`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[rendererType](../../interfaces/graph/IGraph.en.md#renderertype)

#### Defined in

[packages/g6/src/runtime/graph.ts:74](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L74)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.en.md).[transientCanvas](../../interfaces/graph/IGraph.en.md#transientcanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:76](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L76)

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

[packages/g6/src/runtime/graph.ts:2151](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2151)

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

[packages/g6/src/runtime/graph.ts:2167](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L2167)

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

[packages/g6/src/runtime/graph.ts:818](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L818)

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

[packages/g6/src/runtime/graph.ts:787](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L787)

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

[packages/g6/src/runtime/graph.ts:807](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L807)

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

[packages/g6/src/runtime/graph.ts:759](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L759)

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

[packages/g6/src/runtime/graph.ts:797](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L797)

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

[packages/g6/src/runtime/graph.ts:769](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/runtime/graph.ts#L769)
