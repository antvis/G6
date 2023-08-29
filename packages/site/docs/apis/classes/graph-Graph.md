[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [graph](../modules/graph.md) / Graph

# Class: Graph<B, T\>

[graph](../modules/graph.md).Graph

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` |

## Hierarchy

- `default`

  ↳ **`Graph`**

## Implements

- [`IGraph`](../interfaces/types-IGraph.md)<`B`, `T`\>

## Combo

### addCombo

▸ **addCombo**(`model`, `childrenIds`): [`ComboModel`](../modules/types.md#combomodel)

Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`ComboUserModel`](../modules/types.md#combousermodel) | combo user data |
| `childrenIds` | `ID`[] | - |

#### Returns

[`ComboModel`](../modules/types.md#combomodel)

whether success

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[addCombo](../interfaces/types-IGraph.md#addcombo)

#### Defined in

[runtime/graph.ts:1516](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1516)

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

[IGraph](../interfaces/types-IGraph.md).[collapseCombo](../interfaces/types-IGraph.md#collapsecombo)

#### Defined in

[runtime/graph.ts:1561](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1561)

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

[IGraph](../interfaces/types-IGraph.md).[expandCombo](../interfaces/types-IGraph.md#expandcombo)

#### Defined in

[runtime/graph.ts:1581](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1581)

___

### moveCombo

▸ **moveCombo**(`ids`, `dx`, `dy`, `upsertAncestors?`, `callback?`): [`ComboModel`](../modules/types.md#combomodel)[]

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
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void` |

#### Returns

[`ComboModel`](../modules/types.md#combomodel)[]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[moveCombo](../interfaces/types-IGraph.md#movecombo)

#### Defined in

[runtime/graph.ts:1604](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1604)

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
| `spec` | [`Specification`](../interfaces/types-Specification.md)<`B`, `T`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[runtime/graph.ts:106](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L106)

## Data

### addData

▸ **addData**(`itemType`, `models`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `models` | [`EdgeUserModel`](../modules/types.md#edgeusermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel) \| [`ComboUserModel`](../modules/types.md#combousermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel)[] \| [`EdgeUserModel`](../modules/types.md#edgeusermodel)[] \| [`ComboUserModel`](../modules/types.md#combousermodel)[] | - |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

whether success

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[addData](../interfaces/types-IGraph.md#adddata)

#### Defined in

[runtime/graph.ts:942](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L942)

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

[IGraph](../interfaces/types-IGraph.md).[changeData](../interfaces/types-IGraph.md#changedata)

#### Defined in

[runtime/graph.ts:436](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L436)

___

### getAllCombosData

▸ **getAllCombosData**(): [`ComboModel`](../modules/types.md#combomodel)[]

Get all the combos' inner data

#### Returns

[`ComboModel`](../modules/types.md#combomodel)[]

all combos' inner data on the graph

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getAllCombosData](../interfaces/types-IGraph.md#getallcombosdata)

#### Defined in

[runtime/graph.ts:866](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L866)

___

### getAllEdgesData

▸ **getAllEdgesData**(): [`EdgeModel`](../modules/types.md#edgemodel)[]

Get all the edges' inner data

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

all edges' inner data on the graph

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getAllEdgesData](../interfaces/types-IGraph.md#getalledgesdata)

#### Defined in

[runtime/graph.ts:858](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L858)

___

### getAllNodesData

▸ **getAllNodesData**(): [`NodeModel`](../modules/types.md#nodemodel)[]

Get all the nodes' inner data

#### Returns

[`NodeModel`](../modules/types.md#nodemodel)[]

all nodes' inner data on the graph

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getAllNodesData](../interfaces/types-IGraph.md#getallnodesdata)

#### Defined in

[runtime/graph.ts:850](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L850)

___

### getComboChildrenData

▸ **getComboChildrenData**(`comboId`): ([`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel))[]

Get the children's data of a combo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comboId` | `ID` | combo id |

#### Returns

([`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel))[]

children's data array

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getComboChildrenData](../interfaces/types-IGraph.md#getcombochildrendata)

#### Defined in

[runtime/graph.ts:899](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L899)

___

### getComboData

▸ **getComboData**(`condition`): [`ComboModel`](../modules/types.md#combomodel)

Find an combo's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

[`ComboModel`](../modules/types.md#combomodel)

result combo's inner data

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getComboData](../interfaces/types-IGraph.md#getcombodata)

#### Defined in

[runtime/graph.ts:840](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L840)

___

### getEdgeData

▸ **getEdgeData**(`condition`): [`EdgeModel`](../modules/types.md#edgemodel)

Find an edge's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel)

result edge's inner data

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getEdgeData](../interfaces/types-IGraph.md#getedgedata)

#### Defined in

[runtime/graph.ts:827](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L827)

___

### getNeighborNodesData

▸ **getNeighborNodesData**(`nodeId`, `direction?`): [`NodeModel`](../modules/types.md#nodemodel)[]

Get one-hop node ids from a start node.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `nodeId` | `ID` | `undefined` | id of the start node |
| `direction` | ``"both"`` \| ``"in"`` \| ``"out"`` | `'both'` | - |

#### Returns

[`NodeModel`](../modules/types.md#nodemodel)[]

one-hop nodes' data array

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getNeighborNodesData](../interfaces/types-IGraph.md#getneighbornodesdata)

#### Defined in

[runtime/graph.ts:887](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L887)

___

### getNodeData

▸ **getNodeData**(`condition`): [`NodeModel`](../modules/types.md#nodemodel)

Find a node's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

#### Returns

[`NodeModel`](../modules/types.md#nodemodel)

result node's inner data

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getNodeData](../interfaces/types-IGraph.md#getnodedata)

#### Defined in

[runtime/graph.ts:816](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L816)

___

### getRelatedEdgesData

▸ **getRelatedEdgesData**(`nodeId`, `direction?`): [`EdgeModel`](../modules/types.md#edgemodel)[]

Get one-hop edge ids from a start node.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `nodeId` | `ID` | `undefined` | id of the start node |
| `direction` | ``"both"`` \| ``"in"`` \| ``"out"`` | `'both'` | - |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

one-hop edges' data array

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getRelatedEdgesData](../interfaces/types-IGraph.md#getrelatededgesdata)

#### Defined in

[runtime/graph.ts:875](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L875)

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

[IGraph](../interfaces/types-IGraph.md).[read](../interfaces/types-IGraph.md#read)

#### Defined in

[runtime/graph.ts:405](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L405)

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

[IGraph](../interfaces/types-IGraph.md).[removeData](../interfaces/types-IGraph.md#removedata)

#### Defined in

[runtime/graph.ts:999](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L999)

___

### updateComboPosition

▸ **updateComboPosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more combos' positions,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | `undefined` | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[updateComboPosition](../interfaces/types-IGraph.md#updatecomboposition)

#### Defined in

[runtime/graph.ts:1178](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1178)

___

### updateData

▸ **updateData**(`itemType`, `models`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | 'node' \| 'edge' \| 'combo' |
| `models` | `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | new configurations for every node/edge/combo, which has id field to indicate the specific item |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[updateData](../interfaces/types-IGraph.md#updatedata)

#### Defined in

[runtime/graph.ts:1089](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1089)

___

### updateNodePosition

▸ **updateNodePosition**(`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | `undefined` | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | `undefined` | - |
| `disableAnimate` | `boolean` | `false` | - |
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void` | `undefined` | - |
| `stack?` | `boolean` | `undefined` | - |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[updateNodePosition](../interfaces/types-IGraph.md#updatenodeposition)

#### Defined in

[runtime/graph.ts:1147](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1147)

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

[IGraph](../interfaces/types-IGraph.md).[destroy](../interfaces/types-IGraph.md#destroy)

#### Defined in

[runtime/graph.ts:2139](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2139)

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

[IGraph](../interfaces/types-IGraph.md).[addBehaviors](../interfaces/types-IGraph.md#addbehaviors)

#### Defined in

[runtime/graph.ts:1729](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1729)

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

[IGraph](../interfaces/types-IGraph.md).[drawTransient](../interfaces/types-IGraph.md#drawtransient)

#### Defined in

[runtime/graph.ts:1926](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1926)

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

[IGraph](../interfaces/types-IGraph.md).[removeBehaviors](../interfaces/types-IGraph.md#removebehaviors)

#### Defined in

[runtime/graph.ts:1755](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1755)

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

[IGraph](../interfaces/types-IGraph.md).[setMode](../interfaces/types-IGraph.md#setmode)

#### Defined in

[runtime/graph.ts:1718](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1718)

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

[IGraph](../interfaces/types-IGraph.md).[updateBehavior](../interfaces/types-IGraph.md#updatebehavior)

#### Defined in

[runtime/graph.ts:1782](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1782)

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

[IGraph](../interfaces/types-IGraph.md).[updatePlugin](../interfaces/types-IGraph.md#updateplugin)

#### Defined in

[runtime/graph.ts:1876](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1876)

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

[IGraph](../interfaces/types-IGraph.md).[backItem](../interfaces/types-IGraph.md#backitem)

#### Defined in

[runtime/graph.ts:1367](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1367)

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

[IGraph](../interfaces/types-IGraph.md).[clearItemState](../interfaces/types-IGraph.md#clearitemstate)

#### Defined in

[runtime/graph.ts:1460](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1460)

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
| `additionalFilter?` | (`item`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `boolean` | `undefined` | additional filter function |

#### Returns

`ID`[]

items that is the type and has the state

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[findIdByState](../interfaces/types-IGraph.md#findidbystate)

#### Defined in

[runtime/graph.ts:920](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L920)

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

[IGraph](../interfaces/types-IGraph.md).[frontItem](../interfaces/types-IGraph.md#frontitem)

#### Defined in

[runtime/graph.ts:1348](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1348)

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

[IGraph](../interfaces/types-IGraph.md).[getItemAllStates](../interfaces/types-IGraph.md#getitemallstates)

#### Defined in

[runtime/graph.ts:1449](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1449)

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

[IGraph](../interfaces/types-IGraph.md).[getItemState](../interfaces/types-IGraph.md#getitemstate)

#### Defined in

[runtime/graph.ts:1439](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1439)

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

[IGraph](../interfaces/types-IGraph.md).[getItemVisible](../interfaces/types-IGraph.md#getitemvisible)

#### Defined in

[runtime/graph.ts:1503](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1503)

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

[IGraph](../interfaces/types-IGraph.md).[getRenderBBox](../interfaces/types-IGraph.md#getrenderbbox)

#### Defined in

[runtime/graph.ts:1488](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1488)

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

[IGraph](../interfaces/types-IGraph.md).[hideItem](../interfaces/types-IGraph.md#hideitem)

#### Defined in

[runtime/graph.ts:1319](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1319)

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

[IGraph](../interfaces/types-IGraph.md).[setItemState](../interfaces/types-IGraph.md#setitemstate)

#### Defined in

[runtime/graph.ts:1406](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1406)

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

[IGraph](../interfaces/types-IGraph.md).[showItem](../interfaces/types-IGraph.md#showitem)

#### Defined in

[runtime/graph.ts:1291](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1291)

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

[IGraph](../interfaces/types-IGraph.md).[batch](../interfaces/types-IGraph.md#batch)

#### Defined in

[runtime/graph.ts:2084](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2084)

___

### canRedo

▸ **canRedo**(): `boolean`

Indicate whether there are any actions available in the redo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[canRedo](../interfaces/types-IGraph.md#canredo)

#### Defined in

[runtime/graph.ts:2053](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2053)

___

### canUndo

▸ **canUndo**(): `boolean`

Indicate whether there are any actions available in the undo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[canUndo](../interfaces/types-IGraph.md#canundo)

#### Defined in

[runtime/graph.ts:2045](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2045)

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

[IGraph](../interfaces/types-IGraph.md).[changeRenderer](../interfaces/types-IGraph.md#changerenderer)

#### Defined in

[runtime/graph.ts:265](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L265)

___

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[clear](../interfaces/types-IGraph.md#clear)

#### Defined in

[runtime/graph.ts:455](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L455)

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

[IGraph](../interfaces/types-IGraph.md).[clearStack](../interfaces/types-IGraph.md#clearstack)

#### Defined in

[runtime/graph.ts:2093](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2093)

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

[IGraph](../interfaces/types-IGraph.md).[executeWithoutStacking](../interfaces/types-IGraph.md#executewithoutstacking)

#### Defined in

[runtime/graph.ts:1987](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1987)

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

[IGraph](../interfaces/types-IGraph.md).[fitCenter](../interfaces/types-IGraph.md#fitcenter)

#### Defined in

[runtime/graph.ts:691](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L691)

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

[IGraph](../interfaces/types-IGraph.md).[fitView](../interfaces/types-IGraph.md#fitview)

#### Defined in

[runtime/graph.ts:623](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L623)

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

[IGraph](../interfaces/types-IGraph.md).[focusItem](../interfaces/types-IGraph.md#focusitem)

#### Defined in

[runtime/graph.ts:706](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L706)

___

### getLayoutCurrentAnimation

▸ **getLayoutCurrentAnimation**(): `Animation`

#### Returns

`Animation`

#### Defined in

[runtime/graph.ts:1708](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1708)

___

### getNearEdgesForNode

▸ **getNearEdgesForNode**(`nodeId`): [`EdgeModel`](../modules/types.md#edgemodel)[]

Retrieve the nearby edges for a given node using quadtree collision detection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | node id |

#### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getNearEdgesForNode](../interfaces/types-IGraph.md#getnearedgesfornode)

#### Defined in

[runtime/graph.ts:907](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L907)

___

### getRedoStack

▸ **getRedoStack**(): `Command`[][]

Retrieve the current undo stack which consists of operations that were undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getRedoStack](../interfaces/types-IGraph.md#getredostack)

#### Defined in

[runtime/graph.ts:2008](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2008)

___

### getSpecification

▸ **getSpecification**(): [`Specification`](../interfaces/types-Specification.md)<`B`, `T`\>

Get the copy of specs(configurations).

#### Returns

[`Specification`](../interfaces/types-Specification.md)<`B`, `T`\>

graph specs

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getSpecification](../interfaces/types-IGraph.md#getspecification)

#### Defined in

[runtime/graph.ts:394](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L394)

___

### getStack

▸ **getStack**(): `Record`<`string`, `Command`[][]\>

Retrieve the complete history stack

#### Returns

`Record`<`string`, `Command`[][]\>

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getStack](../interfaces/types-IGraph.md#getstack)

#### Defined in

[runtime/graph.ts:2017](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2017)

___

### getUndoStack

▸ **getUndoStack**(): `Command`[][]

Retrieve the current redo stack which consists of operations that could be undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getUndoStack](../interfaces/types-IGraph.md#getundostack)

#### Defined in

[runtime/graph.ts:2000](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2000)

___

### getViewportCenter

▸ **getViewportCenter**(): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

#### Returns

`PointLike`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getViewportCenter](../interfaces/types-IGraph.md#getviewportcenter)

#### Defined in

[runtime/graph.ts:472](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L472)

___

### getZoom

▸ **getZoom**(): `number`

Return the current zoom level of camera.

#### Returns

`number`

current zoom

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getZoom](../interfaces/types-IGraph.md#getzoom)

#### Defined in

[runtime/graph.ts:573](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L573)

___

### isHistoryEnabled

▸ **isHistoryEnabled**(): `boolean`

Determine if history (redo/undo) is enabled.

#### Returns

`boolean`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[isHistoryEnabled](../interfaces/types-IGraph.md#ishistoryenabled)

#### Defined in

[runtime/graph.ts:1951](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1951)

___

### layout

▸ **layout**(`options?`, `disableAnimate?`): `Promise`<`void`\>

Layout the graph (with current configurations if cfg is not assigned).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options?` | [`LayoutOptions`](../modules/types.md#layoutoptions) | `undefined` |
| `disableAnimate` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[layout](../interfaces/types-IGraph.md#layout)

#### Defined in

[runtime/graph.ts:1656](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1656)

___

### pauseStacking

▸ **pauseStacking**(): `void`

Pause stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[pauseStacking](../interfaces/types-IGraph.md#pausestacking)

#### Defined in

[runtime/graph.ts:1970](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1970)

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

[IGraph](../interfaces/types-IGraph.md).[pushStack](../interfaces/types-IGraph.md#pushstack)

#### Defined in

[runtime/graph.ts:1962](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1962)

___

### redo

▸ **redo**(): `void`

Revert recent n operation(s) performed on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[redo](../interfaces/types-IGraph.md#redo)

#### Defined in

[runtime/graph.ts:2037](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2037)

___

### resumeStacking

▸ **resumeStacking**(): `void`

Resume stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[resumeStacking](../interfaces/types-IGraph.md#resumestacking)

#### Defined in

[runtime/graph.ts:1978](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1978)

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

[IGraph](../interfaces/types-IGraph.md).[rotate](../interfaces/types-IGraph.md#rotate)

#### Defined in

[runtime/graph.ts:583](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L583)

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

[IGraph](../interfaces/types-IGraph.md).[rotateTo](../interfaces/types-IGraph.md#rotateto)

#### Defined in

[runtime/graph.ts:605](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L605)

___

### startBatch

▸ **startBatch**(): `void`

Begin a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[startBatch](../interfaces/types-IGraph.md#startbatch)

#### Defined in

[runtime/graph.ts:2063](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2063)

___

### stopBatch

▸ **stopBatch**(): `void`

End a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[stopBatch](../interfaces/types-IGraph.md#stopbatch)

#### Defined in

[runtime/graph.ts:2073](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2073)

___

### stopLayout

▸ **stopLayout**(): `void`

Some layout algorithms has many iterations which can be stopped at any time.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[stopLayout](../interfaces/types-IGraph.md#stoplayout)

#### Defined in

[runtime/graph.ts:1700](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1700)

___

### stopTransformTransition

▸ **stopTransformTransition**(): `void`

Stop the current transition of transform immediately.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[stopTransformTransition](../interfaces/types-IGraph.md#stoptransformtransition)

#### Defined in

[runtime/graph.ts:490](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L490)

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

[IGraph](../interfaces/types-IGraph.md).[transform](../interfaces/types-IGraph.md#transform)

#### Defined in

[runtime/graph.ts:476](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L476)

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

[IGraph](../interfaces/types-IGraph.md).[translate](../interfaces/types-IGraph.md#translate)

#### Defined in

[runtime/graph.ts:500](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L500)

___

### translateTo

▸ **translateTo**(`destination`, `effectTiming?`): `Promise`<`void`\>

Move the graph to destination under viewport coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `PointLike` | destination under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[translateTo](../interfaces/types-IGraph.md#translateto)

#### Defined in

[runtime/graph.ts:521](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L521)

___

### undo

▸ **undo**(): `void`

Restore n operations that were last n reverted on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[undo](../interfaces/types-IGraph.md#undo)

#### Defined in

[runtime/graph.ts:2027](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2027)

___

### updateSpecification

▸ **updateSpecification**(`spec`): [`Specification`](../interfaces/types-Specification.md)<`B`, `T`\>

Update the specs(configurations).

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](../interfaces/types-Specification.md)<`B`, `T`\> |

#### Returns

[`Specification`](../interfaces/types-Specification.md)<`B`, `T`\>

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[updateSpecification](../interfaces/types-IGraph.md#updatespecification)

#### Defined in

[runtime/graph.ts:367](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L367)

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

[IGraph](../interfaces/types-IGraph.md).[updateTheme](../interfaces/types-IGraph.md#updatetheme)

#### Defined in

[runtime/graph.ts:373](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L373)

___

### zoom

▸ **zoom**(`ratio`, `origin?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph with a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | relative ratio to zoom |
| `origin?` | `PointLike` | origin under viewport coordinates. |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[zoom](../interfaces/types-IGraph.md#zoom)

#### Defined in

[runtime/graph.ts:535](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L535)

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

[IGraph](../interfaces/types-IGraph.md).[zoomTo](../interfaces/types-IGraph.md#zoomto)

#### Defined in

[runtime/graph.ts:557](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L557)

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

[IGraph](../interfaces/types-IGraph.md).[addPlugins](../interfaces/types-IGraph.md#addplugins)

#### Defined in

[runtime/graph.ts:1804](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1804)

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

[IGraph](../interfaces/types-IGraph.md).[removePlugins](../interfaces/types-IGraph.md#removeplugins)

#### Defined in

[runtime/graph.ts:1857](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L1857)

## Properties

### backgroundCanvas

• **backgroundCanvas**: `Canvas`

#### Defined in

[runtime/graph.ts:84](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L84)

___

### canvas

• **canvas**: `Canvas`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[canvas](../interfaces/types-IGraph.md#canvas)

#### Defined in

[runtime/graph.ts:74](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L74)

___

### container

• **container**: `HTMLElement`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[container](../interfaces/types-IGraph.md#container)

#### Defined in

[runtime/graph.ts:76](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L76)

___

### destroyed

• **destroyed**: `boolean`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[destroyed](../interfaces/types-IGraph.md#destroyed)

#### Defined in

[runtime/graph.ts:78](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L78)

___

### hooks

• **hooks**: `Hooks`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[hooks](../interfaces/types-IGraph.md#hooks)

#### Defined in

[runtime/graph.ts:72](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L72)

___

### rendererType

• **rendererType**: `RendererName`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[rendererType](../interfaces/types-IGraph.md#renderertype)

#### Defined in

[runtime/graph.ts:80](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L80)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[transientCanvas](../interfaces/types-IGraph.md#transientcanvas)

#### Defined in

[runtime/graph.ts:82](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L82)

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

[IGraph](../interfaces/types-IGraph.md).[collapse](../interfaces/types-IGraph.md#collapse)

#### Defined in

[runtime/graph.ts:2109](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2109)

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

[IGraph](../interfaces/types-IGraph.md).[expand](../interfaces/types-IGraph.md#expand)

#### Defined in

[runtime/graph.ts:2125](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L2125)

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

[IGraph](../interfaces/types-IGraph.md).[getCanvasByClient](../interfaces/types-IGraph.md#getcanvasbyclient)

#### Defined in

[runtime/graph.ts:804](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L804)

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

[IGraph](../interfaces/types-IGraph.md).[getCanvasByViewport](../interfaces/types-IGraph.md#getcanvasbyviewport)

#### Defined in

[runtime/graph.ts:773](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L773)

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

[IGraph](../interfaces/types-IGraph.md).[getClientByCanvas](../interfaces/types-IGraph.md#getclientbycanvas)

#### Defined in

[runtime/graph.ts:793](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L793)

___

### getSize

▸ **getSize**(): `number`[]

Get the size of the graph canvas.

#### Returns

`number`[]

[width, height]

#### Implementation of

[IGraph](../interfaces/types-IGraph.md).[getSize](../interfaces/types-IGraph.md#getsize)

#### Defined in

[runtime/graph.ts:745](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L745)

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

[IGraph](../interfaces/types-IGraph.md).[getViewportByCanvas](../interfaces/types-IGraph.md#getviewportbycanvas)

#### Defined in

[runtime/graph.ts:783](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L783)

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

[IGraph](../interfaces/types-IGraph.md).[setSize](../interfaces/types-IGraph.md#setsize)

#### Defined in

[runtime/graph.ts:755](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/runtime/graph.ts#L755)
