---
title: IGraph
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [graph](../../modules/graph.en.md) / IGraph

[graph](../../modules/graph.en.md).IGraph

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` = `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` = `ThemeRegistry` |

## Hierarchy

- `default`

  ↳ **`IGraph`**

## Implemented by

- [`Graph`](../../classes/graph/Graph.en.md)

## Indexable

▪ [x: `string`]: `any`

## Combo

### addCombo

• **addCombo**: (`model`: `ComboUserModel`, `childrenIds`: `ID`[], `stack?`: `boolean`) => `ComboModel`

#### Type declaration

▸ (`model`, `childrenIds`, `stack?`): `ComboModel`

Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | `ComboUserModel` | combo user data |
| `childrenIds` | `ID`[] | - |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

`ComboModel`

whether success

#### Defined in

[packages/g6/src/types/graph.ts:554](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L554)

___

### collapseCombo

• **collapseCombo**: (`comboIds`: `ID` \| `ID`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`comboIds`, `stack?`): `void`

Collapse a combo.

##### Parameters

| Name | Type |
| :------ | :------ |
| `comboIds` | `ID` \| `ID`[] |
| `stack?` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:564](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L564)

___

### expandCombo

• **expandCombo**: (`comboIds`: `ID` \| `ID`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`comboIds`, `stack?`): `void`

Expand a combo.

##### Parameters

| Name | Type |
| :------ | :------ |
| `comboIds` | `ID` \| `ID`[] |
| `stack?` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:571](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L571)

## Data

### addData

• **addData**: (`itemType`: `ITEM_TYPE`, `model`: `NodeUserModel` \| `ComboUserModel` \| `EdgeUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[], `stack?`: `boolean`) => `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Type declaration

▸ (`itemType`, `model`, `stack?`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Add one or more node/edge/combo data to the graph.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `model` | `NodeUserModel` \| `ComboUserModel` \| `EdgeUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | user data |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

whehter success

#### Defined in

[packages/g6/src/types/graph.ts:177](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L177)

___

### changeData

• **changeData**: (`data`: [`GraphData`](GraphData.en.md), `type`: ``"replace"`` \| ``"mergeReplace"``) => `void`

#### Type declaration

▸ (`data`, `type`): `void`

Change graph data.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`GraphData`](GraphData.en.md) | new data |
| `type` | ``"replace"`` \| ``"mergeReplace"`` | the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old) |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:148](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L148)

___

### getAllCombosData

• **getAllCombosData**: () => `ComboModel`[]

#### Type declaration

▸ (): `ComboModel`[]

Get all the combos' inner data

##### Returns

`ComboModel`[]

all combos' inner data on the graph

#### Defined in

[packages/g6/src/types/graph.ts:99](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L99)

___

### getAllEdgesData

• **getAllEdgesData**: () => `EdgeModel`[]

#### Type declaration

▸ (): `EdgeModel`[]

Get all the edges' inner data

##### Returns

`EdgeModel`[]

all edges' inner data on the graph

#### Defined in

[packages/g6/src/types/graph.ts:93](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L93)

___

### getAllNodesData

• **getAllNodesData**: () => `NodeModel`[]

#### Type declaration

▸ (): `NodeModel`[]

Get all the nodes' inner data

##### Returns

`NodeModel`[]

all nodes' inner data on the graph

#### Defined in

[packages/g6/src/types/graph.ts:87](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L87)

___

### getComboData

• **getComboData**: (`condition`: `Function` \| `ID`) => `ComboModel`

#### Type declaration

▸ (`condition`): `ComboModel`

Find a combo's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

`ComboModel`

result combo's inner data

#### Defined in

[packages/g6/src/types/graph.ts:81](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L81)

___

### getEdgeData

• **getEdgeData**: (`condition`: `Function` \| `ID`) => `EdgeModel`

#### Type declaration

▸ (`condition`): `EdgeModel`

Find an edge's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

`EdgeModel`

result edge's inner data

#### Defined in

[packages/g6/src/types/graph.ts:74](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L74)

___

### getNeighborNodesData

• **getNeighborNodesData**: (`nodeId`: `ID`, `direction?`: ``"both"`` \| ``"in"`` \| ``"out"``) => `NodeModel`[]

#### Type declaration

▸ (`nodeId`, `direction?`): `NodeModel`[]

Get one-hop node ids from a start node.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | id of the start node |
| `direction?` | ``"both"`` \| ``"in"`` \| ``"out"`` | - |

##### Returns

`NodeModel`[]

one-hop node ids

#### Defined in

[packages/g6/src/types/graph.ts:116](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L116)

___

### getNodeData

• **getNodeData**: (`condition`: `Function` \| `ID`) => `NodeModel`

#### Type declaration

▸ (`condition`): `NodeModel`

Find a node's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

`NodeModel`

result node's inner data

#### Defined in

[packages/g6/src/types/graph.ts:67](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L67)

___

### getRelatedEdgesData

• **getRelatedEdgesData**: (`nodeId`: `ID`, `direction?`: ``"both"`` \| ``"in"`` \| ``"out"``) => `EdgeModel`[]

#### Type declaration

▸ (`nodeId`, `direction?`): `EdgeModel`[]

Get one-hop edge ids from a start node.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | id of the start node |
| `direction?` | ``"both"`` \| ``"in"`` \| ``"out"`` | - |

##### Returns

`EdgeModel`[]

one-hop edge ids

#### Defined in

[packages/g6/src/types/graph.ts:106](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L106)

___

### moveCombo

• **moveCombo**: (`ids`: `ID`[], `dx`: `number`, `dy`: `number`, `upsertAncestors?`: `boolean`, `callback?`: (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void`, `stack?`: `boolean`) => `ComboModel`[]

#### Type declaration

▸ (`ids`, `dx`, `dy`, `upsertAncestors?`, `callback?`, `stack?`): `ComboModel`[]

Move one or more combos a distance (dx, dy) relatively,
do not update other styles which leads to better performance than updating positions by updateData.
In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID`[] | - |
| `dx` | `number` | - |
| `dy` | `number` | - |
| `upsertAncestors?` | `boolean` | - |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

`ComboModel`[]

#### Defined in

[packages/g6/src/types/graph.ts:278](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L278)

___

### read

• **read**: (`data`: [`GraphData`](GraphData.en.md)) => `void`

#### Type declaration

▸ (`data`): `void`

Input data and render the graph.
If there is old data, diffs and changes it.

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`GraphData`](GraphData.en.md) |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:140](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L140)

___

### removeData

• **removeData**: (`itemType`: `ITEM_TYPE`, `id`: `ID` \| `ID`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`itemType`, `id`, `stack?`): `void`

Remove one or more node/edge/combo data from the graph.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | - |
| `id` | `ID` \| `ID`[] | - |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

`void`

whehter success

#### Defined in

[packages/g6/src/types/graph.ts:201](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L201)

___

### showItem

• **showItem**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `disableAnimate?`): `void`

Show the item(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the item id(s) to be shown |
| `disableAnimate?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:466](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L466)

___

### updateComboPosition

• **updateComboPosition**: (`models`: `Partial`<`ComboUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `void`, `stack?`: `boolean`) => `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

#### Type declaration

▸ (`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

Update one or more combos' positions, it is achieved by move the succeed nodes.
Do not update other styles which leads to better performance than updating positions by updateData.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | `Partial`<`ComboUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | - |
| `disableAnimate?` | `boolean` | - |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

`NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

#### Defined in

[packages/g6/src/types/graph.ts:258](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L258)

___

### updateData

• **updateData**: (`itemType`: `ITEM_TYPE`, `model`: `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\>, `stack?`: `boolean`) => `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Type declaration

▸ (`itemType`, `model`, `stack?`): `NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more node/edge/combo data on the graph.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | - |
| `model` | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | update configs |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

`NodeModel` \| `ComboModel` \| `EdgeModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Defined in

[packages/g6/src/types/graph.ts:209](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L209)

___

### updateNodePosition

• **updateNodePosition**: (`models`: `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void`, `stack?`: `boolean`) => `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

#### Type declaration

▸ (`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | - |
| `disableAnimate?` | `boolean` | - |
| `callback?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`, `canceled?`: `boolean`) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

`NodeModel` \| `ComboModel` \| `NodeModel`[] \| `ComboModel`[]

#### Defined in

[packages/g6/src/types/graph.ts:236](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L236)

## Graph Instance

### destroy

• **destroy**: (`callback?`: `Function`) => `void`

#### Type declaration

▸ (`callback?`): `void`

Destroy the graph instance and remove the related canvases.

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | `Function` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:39](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L39)

## Interaction

### drawTransient

• **drawTransient**: (`type`: `SHAPE_TYPE` \| `ITEM_TYPE`, `id`: `ID`, `config`: `any`) => `DisplayObject`<`any`, `any`\>

#### Type declaration

▸ (`type`, `id`, `config`): `DisplayObject`<`any`, `any`\>

Draw or update a G shape or group to the transient canvas.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `SHAPE_TYPE` \| `ITEM_TYPE` | shape type or item type |
| `id` | `ID` | new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing |
| `config` | `any` | - |

##### Returns

`DisplayObject`<`any`, `any`\>

upserted shape or group

#### Defined in

[packages/g6/src/types/graph.ts:628](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L628)

___

### getMode

• **getMode**: () => `string`

#### Type declaration

▸ (): `string`

Get current mode.

##### Returns

`string`

mode name

#### Defined in

[packages/g6/src/types/graph.ts:593](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L593)

___

### removeBehaviors

• **removeBehaviors**: (`behaviorKeys`: `string`[], `modes`: `string` \| `string`[]) => `void`

#### Type declaration

▸ (`behaviorKeys`, `modes`): `void`

Remove behavior(s) from mode(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behaviorKeys` | `string`[] | - |
| `modes` | `string` \| `string`[] | mode names |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:611](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L611)

___

### setMode

• **setMode**: (`mode`: `string`) => `void`

#### Type declaration

▸ (`mode`): `void`

Switch mode.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mode` | `string` | mode name |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:587](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L587)

___

### updateBehavior

• **updateBehavior**: (`behavior`: `BehaviorOptionsOf`<`B`\>, `mode?`: `string`) => `void`

#### Type declaration

▸ (`behavior`, `mode?`): `void`

Update a behavior on a mode.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `BehaviorOptionsOf`<`B`\> | behavior configs, whose name indicates the behavior to be updated |
| `mode?` | `string` | mode name |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:619](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L619)

## Item

### backItem

• **backItem**: (`ids`: `ID` \| `ID`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `stack?`): `void`

Make the item(s) to the back.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the item id(s) to back |
| `stack?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:487](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L487)

___

### clearItemState

• **clearItemState**: (`ids`: `ID` \| `ID`[], `states?`: `string`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `states?`, `stack?`): `void`

Clear all the states for item(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the id(s) for the item(s) to be clear |
| `states?` | `string`[] | the states' names, all the states wil be cleared if states is not assigned |
| `stack?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:524](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L524)

___

### findIdByState

• **findIdByState**: (`itemType`: `ITEM_TYPE`, `state`: `string`, `value?`: `string` \| `boolean`, `additionalFilter?`: (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `boolean`) => `ID`[]

#### Type declaration

▸ (`itemType`, `state`, `value?`, `additionalFilter?`): `ID`[]

Find items which has the state.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `state` | `string` | state name |
| `value?` | `string` \| `boolean` | state value, true by default |
| `additionalFilter?` | (`model`: `NodeModel` \| `ComboModel` \| `EdgeModel`) => `boolean` | additional filter function |

##### Returns

`ID`[]

items that is the type and has the state

#### Defined in

[packages/g6/src/types/graph.ts:163](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L163)

___

### frontItem

• **frontItem**: (`ids`: `ID` \| `ID`[], `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `stack?`): `void`

Make the item(s) to the front.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the item id(s) to front |
| `stack?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:480](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L480)

___

### getItemAllStates

• **getItemAllStates**: (`id`: `ID`) => `string`[]

#### Type declaration

▸ (`id`): `string`[]

Get all the state names with value true for an item.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the item |

##### Returns

`string`[]

the state names with value true

#### Defined in

[packages/g6/src/types/graph.ts:516](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L516)

___

### getItemState

• **getItemState**: (`id`: `ID`, `state`: `string`) => `string` \| `boolean`

#### Type declaration

▸ (`id`, `state`): `string` \| `boolean`

Get the state value for an item.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the item |
| `state` | `string` | - |

##### Returns

`string` \| `boolean`

the state value

#### Defined in

[packages/g6/src/types/graph.ts:509](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L509)

___

### hideItem

• **hideItem**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `disableAnimate?`): `void`

Hide the item(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the item id(s) to be hidden |
| `disableAnimate?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:473](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L473)

___

### setItemState

• **setItemState**: (`ids`: `ID` \| `ID`[], `state`: `string`, `value`: `boolean`, `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `state`, `value`, `stack?`): `void`

Set state for the item(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | the id(s) for the item(s) to be set |
| `state` | `string` | the state name |
| `value` | `boolean` | state value |
| `stack?` | `boolean` | - |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:496](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L496)

## Methods

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

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:25

___

### getEvents

▸ **getEvents**(): `Record`<`string`, `EventType`[]\>

#### Returns

`Record`<`string`, `EventType`[]\>

#### Inherited from

EventEmitter.getEvents

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:32

___

### off

▸ **off**(`evt?`, `callback?`): [`IGraph`](IGraph.en.md)<`B`, `T`\>

取消监听一个事件，或者一个channel

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | `string` |
| `callback?` | `Function` |

#### Returns

[`IGraph`](IGraph.en.md)<`B`, `T`\>

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:31

___

### on

▸ **on**(`evt`, `callback`, `once?`): [`IGraph`](IGraph.en.md)<`B`, `T`\>

监听一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |
| `once?` | `boolean` |

#### Returns

[`IGraph`](IGraph.en.md)<`B`, `T`\>

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:13

___

### once

▸ **once**(`evt`, `callback`): [`IGraph`](IGraph.en.md)<`B`, `T`\>

监听一个事件一次

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |

#### Returns

[`IGraph`](IGraph.en.md)<`B`, `T`\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:19

## Plugin

### addPlugins

• **addPlugins**: (`pluginCfgs`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  }[]) => `void`

#### Type declaration

▸ (`pluginCfgs`): `void`

Add plugin(s) to graph.

##### Parameters

| Name | Type |
| :------ | :------ |
| `pluginCfgs` | { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  }[] |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:640](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L640)

___

### removePlugins

• **removePlugins**: (`pluginKeys`: `string`[]) => `void`

#### Type declaration

▸ (`pluginKeys`): `void`

Remove plugin(s) from graph.

##### Parameters

| Name | Type |
| :------ | :------ |
| `pluginKeys` | `string`[] |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:654](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L654)

___

### updatePlugin

• **updatePlugin**: (`pluginCfg`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  }) => `void`

#### Type declaration

▸ (`pluginCfg`): `void`

Update one plugin of the graph.

##### Parameters

| Name | Type |
| :------ | :------ |
| `pluginCfg` | `Object` |
| `pluginCfg.key` | `string` |
| `pluginCfg.type` | `string` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:662](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L662)

## Properties

### addBehaviors

• **addBehaviors**: (`behaviors`: `BehaviorOptionsOf`<`B`\>[], `modes`: `string` \| `string`[]) => `void`

#### Type declaration

▸ (`behaviors`, `modes`): `void`

Add behavior(s) to mode(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behaviors` | `BehaviorOptionsOf`<`B`\>[] | behavior names or configs |
| `modes` | `string` \| `string`[] | mode names |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:600](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L600)

___

### batch

• **batch**: (`callback`: () => `void`) => `void`

#### Type declaration

▸ (`callback`): `void`

Execute a provided function within a batched context
All operations performed inside callback will be treated as a composite operation
more convenient way without manually invoking `startBatch` and `stopBatch`.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `void` | The func containing operations to be batched together. |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:752](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L752)

___

### canRedo

• **canRedo**: () => `void`

#### Type declaration

▸ (): `void`

Indicate whether there are any actions available in the redo stack.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:730](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L730)

___

### canUndo

• **canUndo**: () => `void`

#### Type declaration

▸ (): `void`

Indicate whether there are any actions available in the undo stack.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:725](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L725)

___

### canvas

• **canvas**: `Canvas`

#### Defined in

[packages/g6/src/types/graph.ts:27](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L27)

___

### changeRenderer

• **changeRenderer**: (`type`: `RendererName`) => `void`

#### Type declaration

▸ (`type`): `void`

Change the renderer at runtime.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `RendererName` | renderer name |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:58](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L58)

___

### clear

• **clear**: () => `void`

#### Type declaration

▸ (): `void`

Clear the graph, means remove all the items on the graph.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:153](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L153)

___

### clearStack

• **clearStack**: (`stackType?`: ``"redo"`` \| ``"undo"``) => `void`

#### Type declaration

▸ (`stackType?`): `void`

Execute a provided function within a batched context
All operations performed inside callback will be treated as a composite operation
more convenient way without manually invoking `startBatch` and `stopBatch`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `stackType?` | ``"redo"`` \| ``"undo"`` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:759](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L759)

___

### container

• **container**: `HTMLElement`

#### Defined in

[packages/g6/src/types/graph.ts:30](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L30)

___

### destroyed

• **destroyed**: `boolean`

#### Defined in

[packages/g6/src/types/graph.ts:29](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L29)

___

### executeWithoutStacking

• **executeWithoutStacking**: (`callback`: () => `void`) => `void`

#### Type declaration

▸ (`callback`): `void`

Execute a callback without allowing any stacking operations.

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:693](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L693)

___

### getComboChildrenData

• **getComboChildrenData**: (`comboId`: `ID`) => (`NodeModel` \| `ComboModel`)[]

#### Type declaration

▸ (`comboId`): (`NodeModel` \| `ComboModel`)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `comboId` | `ID` |

##### Returns

(`NodeModel` \| `ComboModel`)[]

#### Defined in

[packages/g6/src/types/graph.ts:132](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L132)

___

### getItemVisible

• **getItemVisible**: (`id`: `ID`) => `boolean`

#### Type declaration

▸ (`id`): `boolean`

Get the visibility for a node / edge / combo.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the node / edge / combo |

##### Returns

`boolean`

visibility for the item, false for invisible or unexistence for the item

#### Defined in

[packages/g6/src/types/graph.ts:542](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L542)

___

### getNearEdgesForNode

• **getNearEdgesForNode**: (`nodeId`: `ID`) => `EdgeModel`[]

#### Type declaration

▸ (`nodeId`): `EdgeModel`[]

Retrieve the nearby edges for a given node using quadtree collision detection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | target node's id |

##### Returns

`EdgeModel`[]

edges

#### Defined in

[packages/g6/src/types/graph.ts:125](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L125)

___

### getRedoStack

• **getRedoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current undo stack which consists of operations that were undone

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:702](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L702)

___

### getRenderBBox

• **getRenderBBox**: (`id`: `ID`, `onlyKeyShape?`: `boolean`, `isTransient?`: `boolean`) => ``false`` \| `AABB`

#### Type declaration

▸ (`id`, `onlyKeyShape?`, `isTransient?`): ``false`` \| `AABB`

Get the rendering bbox for a node / edge / combo, or the graph (when the id is not assigned).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | the id for the node / edge / combo, undefined for the whole graph |
| `onlyKeyShape?` | `boolean` | - |
| `isTransient?` | `boolean` | - |

##### Returns

``false`` \| `AABB`

rendering bounding box. returns false if the item is not exist

#### Defined in

[packages/g6/src/types/graph.ts:531](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L531)

___

### getSpecification

• **getSpecification**: () => [`Specification`](Specification.en.md)<`B`, `T`\>

#### Type declaration

▸ (): [`Specification`](Specification.en.md)<`B`, `T`\>

Get the copy of specs(configurations).

##### Returns

[`Specification`](Specification.en.md)<`B`, `T`\>

graph specs

#### Defined in

[packages/g6/src/types/graph.ts:52](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L52)

___

### getStack

• **getStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the complete history stack

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:708](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L708)

___

### getUndoStack

• **getUndoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current redo stack which consists of operations that could be undone

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:697](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L697)

___

### getViewportCenter

• **getViewportCenter**: () => `PointLike`

#### Type declaration

▸ (): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

##### Returns

`PointLike`

#### Defined in

[packages/g6/src/types/graph.ts:381](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L381)

___

### getZoom

• **getZoom**: () => `number`

#### Type declaration

▸ (): `number`

Return the current zoom level of camera.

##### Returns

`number`

current zoom

#### Defined in

[packages/g6/src/types/graph.ts:319](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L319)

___

### hooks

• **hooks**: `Hooks`

#### Defined in

[packages/g6/src/types/graph.ts:26](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L26)

___

### isHistoryEnabled

• **isHistoryEnabled**: () => `void`

#### Type declaration

▸ (): `void`

Determine if history (redo/undo) is enabled.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:673](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L673)

___

### layout

• **layout**: (`options?`: `LayoutOptions`, `disableAnimate?`: `boolean`) => `Promise`<`void`\>

#### Type declaration

▸ (`options?`, `disableAnimate?`): `Promise`<`void`\>

Layout the graph (with current configurations if cfg is not assigned).

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `LayoutOptions` |
| `disableAnimate?` | `boolean` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:577](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L577)

___

### pauseStacking

• **pauseStacking**: () => `void`

#### Type declaration

▸ (): `void`

Pause stacking operation.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:684](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L684)

___

### pushStack

• **pushStack**: (`cmd`: `Command`[], `stackType`: ``"redo"`` \| ``"undo"``) => `void`

#### Type declaration

▸ (`cmd`, `stackType`): `void`

Push the operation(s) onto the specified stack

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `Command`[] | commands to be pushed |
| `stackType` | ``"redo"`` \| ``"undo"`` | undo/redo stack |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:680](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L680)

___

### redo

• **redo**: () => `void`

#### Type declaration

▸ (): `void`

Restore the operation that was last n reverted on the graph.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:720](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L720)

___

### rendererType

• **rendererType**: `RendererName`

#### Defined in

[packages/g6/src/types/graph.ts:31](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L31)

___

### resumeStacking

• **resumeStacking**: () => `void`

#### Type declaration

▸ (): `void`

Resume stacking operation.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:688](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L688)

___

### rotate

• **rotate**: (`angle`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`angle`, `center?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph with a relative angle in clockwise.

##### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |
| `center?` | `Point` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:348](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L348)

___

### rotateTo

• **rotateTo**: (`toAngle`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`toAngle`, `center?`, `effectTiming?`): `Promise`<`void`\>

Rotate the graph to an absolute angle in clockwise.

##### Parameters

| Name | Type |
| :------ | :------ |
| `toAngle` | `number` |
| `center?` | `Point` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:359](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L359)

___

### startBatch

• **startBatch**: () => `void`

#### Type declaration

▸ (): `void`

Begin a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:737](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L737)

___

### stopBatch

• **stopBatch**: () => `void`

#### Type declaration

▸ (): `void`

End a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:744](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L744)

___

### stopLayout

• **stopLayout**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:578](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L578)

___

### stopTransformTransition

• **stopTransformTransition**: () => `void`

#### Type declaration

▸ (): `void`

Stop the current transition of transform immediately.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:377](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L377)

___

### transform

• **transform**: (`options`: `GraphTransformOptions`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`options`, `effectTiming?`): `Promise`<`void`\>

Transform the graph with a CSS-Transform-like syntax.

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GraphTransformOptions` |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:370](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L370)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Defined in

[packages/g6/src/types/graph.ts:28](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L28)

___

### translate

• **translate**: (`distance`: `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number`  }\>, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`distance`, `effectTiming?`): `Promise`<`void`\>

Move the graph with a relative vector.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number`  }\> | - |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:298](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L298)

___

### translateTo

• **translateTo**: (`point`: `PointLike`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`point`, `effectTiming?`): `Promise`<`void`\>

Move the graph and align to a point.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `PointLike` | position on the canvas to align |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:311](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L311)

___

### undo

• **undo**: () => `void`

#### Type declaration

▸ (): `void`

Revert the last n operation(s) on the graph.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:714](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L714)

___

### updateSpecification

• **updateSpecification**: (`spec`: [`Specification`](Specification.en.md)<`B`, `T`\>) => [`Specification`](Specification.en.md)<`B`, `T`\>

#### Type declaration

▸ (`spec`): [`Specification`](Specification.en.md)<`B`, `T`\>

Update the specs (configurations).

##### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](Specification.en.md)<`B`, `T`\> |

##### Returns

[`Specification`](Specification.en.md)<`B`, `T`\>

#### Defined in

[packages/g6/src/types/graph.ts:43](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L43)

___

### updateTheme

• **updateTheme**: (`theme`: `ThemeOptionsOf`<`T`\>) => `void`

#### Type declaration

▸ (`theme`): `void`

Update the theme specs (configurations).

##### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `ThemeOptionsOf`<`T`\> |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:47](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L47)

___

### zoom

• **zoom**: (`ratio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`ratio`, `center?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph with a relative ratio.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | relative ratio to zoom |
| `center?` | `Point` | zoom center |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:326](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L326)

___

### zoomTo

• **zoomTo**: (`toRatio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`toRatio`, `center?`, `effectTiming?`): `Promise`<`void`\>

Zoom the graph to a specified ratio.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `toRatio` | `number` | specified ratio |
| `center?` | `Point` | zoom center |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:337](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L337)

## Tree

### collapse

• **collapse**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`, `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `disableAnimate?`, `stack?`): `void`

Collapse sub tree(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | Root id(s) of the sub trees. |
| `disableAnimate?` | `boolean` | Whether disable the animations for this operation. |
| `stack?` | `boolean` | Whether push this operation to stack. |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:769](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L769)

___

### expand

• **expand**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`, `stack?`: `boolean`) => `void`

#### Type declaration

▸ (`ids`, `disableAnimate?`, `stack?`): `void`

Expand sub tree(s).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `ID` \| `ID`[] | Root id(s) of the sub trees. |
| `disableAnimate?` | `boolean` | Whether disable the animations for this operation. |
| `stack?` | `boolean` | Whether push this operation to stack. |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:778](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L778)

## View

### fitCenter

• **fitCenter**: (`effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`effectTiming?`): `Promise`<`void`\>

Fit the graph center to the view center.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:403](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L403)

___

### fitView

• **fitView**: (`options?`: { `padding`: `Padding` ; `rules`: `FitViewRules`  }, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`options?`, `effectTiming?`): `Promise`<`void`\>

Fit the graph content to the view.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | - |
| `options.padding` | `Padding` | padding while fitting |
| `options.rules` | `FitViewRules` | rules for fitting |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:390](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L390)

___

### focusItem

• **focusItem**: (`id`: `ID` \| `ID`[], `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\>) => `Promise`<`void`\>

#### Type declaration

▸ (`id`, `effectTiming?`): `Promise`<`void`\>

Move the graph to make the item align the view center.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` \| `ID`[] | - |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> | animation configurations |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/g6/src/types/graph.ts:410](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L410)

___

### getCanvasByClient

• **getCanvasByClient**: (`ClientPoint`: `Point`) => `Point`

#### Type declaration

▸ (`ClientPoint`): `Point`

Get the rendering coordinate according to the browser coordinate.

##### Parameters

| Name | Type |
| :------ | :------ |
| `ClientPoint` | `Point` |

##### Returns

`Point`

rendering coordinate

#### Defined in

[packages/g6/src/types/graph.ts:457](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L457)

___

### getCanvasByViewport

• **getCanvasByViewport**: (`viewportPoint`: `Point`) => `Point`

#### Type declaration

▸ (`viewportPoint`): `Point`

Get the rendering coordinate according to the canvas dom (viewport) coordinate.

##### Parameters

| Name | Type |
| :------ | :------ |
| `viewportPoint` | `Point` |

##### Returns

`Point`

canvas dom (viewport) coordinate

#### Defined in

[packages/g6/src/types/graph.ts:433](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L433)

___

### getClientByCanvas

• **getClientByCanvas**: (`canvasPoint`: `Point`) => `Point`

#### Type declaration

▸ (`canvasPoint`): `Point`

Get the browser coordinate according to the rendering coordinate.

##### Parameters

| Name | Type |
| :------ | :------ |
| `canvasPoint` | `Point` |

##### Returns

`Point`

browser coordinate

#### Defined in

[packages/g6/src/types/graph.ts:449](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L449)

___

### getSize

• **getSize**: () => `number`[]

#### Type declaration

▸ (): `number`[]

Get the size of the graph canvas.

##### Returns

`number`[]

[width, height]

#### Defined in

[packages/g6/src/types/graph.ts:419](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L419)

___

### getViewportByCanvas

• **getViewportByCanvas**: (`canvasPoint`: `Point`) => `Point`

#### Type declaration

▸ (`canvasPoint`): `Point`

Get the canvas dom (viewport) coordinate according to the rendering coordinate.

##### Parameters

| Name | Type |
| :------ | :------ |
| `canvasPoint` | `Point` |

##### Returns

`Point`

rendering coordinate

#### Defined in

[packages/g6/src/types/graph.ts:441](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L441)

___

### setSize

• **setSize**: (`size`: `number`[]) => `void`

#### Type declaration

▸ (`size`): `void`

Set the size for the graph canvas.

##### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number`[] |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:425](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/graph.ts#L425)
