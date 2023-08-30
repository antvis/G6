[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / IGraph

# Interface: IGraph<B, T\>

[types](../modules/types.md).IGraph

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` = `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` = `ThemeRegistry` |

## Hierarchy

- `default`

  ↳ **`IGraph`**

## Implemented by

- [`Graph`](../classes/graph-Graph.md)

## Indexable

▪ [x: `string`]: `any`

## Combo

### addCombo

• **addCombo**: (`model`: [`ComboUserModel`](../modules/types.md#combousermodel), `childrenIds`: `ID`[], `stack?`: `boolean`) => [`ComboModel`](../modules/types.md#combomodel)

#### Type declaration

▸ (`model`, `childrenIds`, `stack?`): [`ComboModel`](../modules/types.md#combomodel)

Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`ComboUserModel`](../modules/types.md#combousermodel) | combo user data |
| `childrenIds` | `ID`[] | - |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

[`ComboModel`](../modules/types.md#combomodel)

whether success

#### Defined in

[types/graph.ts:554](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L554)

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

[types/graph.ts:564](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L564)

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

[types/graph.ts:571](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L571)

## Data

### addData

• **addData**: (`itemType`: `ITEM_TYPE`, `model`: [`EdgeUserModel`](../modules/types.md#edgeusermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel) \| [`ComboUserModel`](../modules/types.md#combousermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel)[] \| [`EdgeUserModel`](../modules/types.md#edgeusermodel)[] \| [`ComboUserModel`](../modules/types.md#combousermodel)[], `stack?`: `boolean`) => [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (`itemType`, `model`, `stack?`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Add one or more node/edge/combo data to the graph.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `model` | [`EdgeUserModel`](../modules/types.md#edgeusermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel) \| [`ComboUserModel`](../modules/types.md#combousermodel) \| [`NodeUserModel`](../modules/types.md#nodeusermodel)[] \| [`EdgeUserModel`](../modules/types.md#edgeusermodel)[] \| [`ComboUserModel`](../modules/types.md#combousermodel)[] | user data |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

whehter success

#### Defined in

[types/graph.ts:177](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L177)

___

### changeData

• **changeData**: (`data`: [`GraphData`](types-GraphData.md), `type`: ``"replace"`` \| ``"mergeReplace"``) => `void`

#### Type declaration

▸ (`data`, `type`): `void`

Change graph data.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`GraphData`](types-GraphData.md) | new data |
| `type` | ``"replace"`` \| ``"mergeReplace"`` | the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old) |

##### Returns

`void`

#### Defined in

[types/graph.ts:148](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L148)

___

### getAllCombosData

• **getAllCombosData**: () => [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (): [`ComboModel`](../modules/types.md#combomodel)[]

Get all the combos' inner data

##### Returns

[`ComboModel`](../modules/types.md#combomodel)[]

all combos' inner data on the graph

#### Defined in

[types/graph.ts:99](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L99)

___

### getAllEdgesData

• **getAllEdgesData**: () => [`EdgeModel`](../modules/types.md#edgemodel)[]

#### Type declaration

▸ (): [`EdgeModel`](../modules/types.md#edgemodel)[]

Get all the edges' inner data

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

all edges' inner data on the graph

#### Defined in

[types/graph.ts:93](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L93)

___

### getAllNodesData

• **getAllNodesData**: () => [`NodeModel`](../modules/types.md#nodemodel)[]

#### Type declaration

▸ (): [`NodeModel`](../modules/types.md#nodemodel)[]

Get all the nodes' inner data

##### Returns

[`NodeModel`](../modules/types.md#nodemodel)[]

all nodes' inner data on the graph

#### Defined in

[types/graph.ts:87](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L87)

___

### getComboData

• **getComboData**: (`condition`: `Function` \| `ID`) => [`ComboModel`](../modules/types.md#combomodel)

#### Type declaration

▸ (`condition`): [`ComboModel`](../modules/types.md#combomodel)

Find a combo's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

[`ComboModel`](../modules/types.md#combomodel)

result combo's inner data

#### Defined in

[types/graph.ts:81](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L81)

___

### getEdgeData

• **getEdgeData**: (`condition`: `Function` \| `ID`) => [`EdgeModel`](../modules/types.md#edgemodel)

#### Type declaration

▸ (`condition`): [`EdgeModel`](../modules/types.md#edgemodel)

Find an edge's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel)

result edge's inner data

#### Defined in

[types/graph.ts:74](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L74)

___

### getNeighborNodesData

• **getNeighborNodesData**: (`nodeId`: `ID`, `direction?`: ``"both"`` \| ``"in"`` \| ``"out"``) => [`NodeModel`](../modules/types.md#nodemodel)[]

#### Type declaration

▸ (`nodeId`, `direction?`): [`NodeModel`](../modules/types.md#nodemodel)[]

Get one-hop node ids from a start node.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | id of the start node |
| `direction?` | ``"both"`` \| ``"in"`` \| ``"out"`` | - |

##### Returns

[`NodeModel`](../modules/types.md#nodemodel)[]

one-hop node ids

#### Defined in

[types/graph.ts:116](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L116)

___

### getNodeData

• **getNodeData**: (`condition`: `Function` \| `ID`) => [`NodeModel`](../modules/types.md#nodemodel)

#### Type declaration

▸ (`condition`): [`NodeModel`](../modules/types.md#nodemodel)

Find a node's inner data according to id or function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `Function` \| `ID` | id or condition function |

##### Returns

[`NodeModel`](../modules/types.md#nodemodel)

result node's inner data

#### Defined in

[types/graph.ts:67](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L67)

___

### getRelatedEdgesData

• **getRelatedEdgesData**: (`nodeId`: `ID`, `direction?`: ``"both"`` \| ``"in"`` \| ``"out"``) => [`EdgeModel`](../modules/types.md#edgemodel)[]

#### Type declaration

▸ (`nodeId`, `direction?`): [`EdgeModel`](../modules/types.md#edgemodel)[]

Get one-hop edge ids from a start node.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | id of the start node |
| `direction?` | ``"both"`` \| ``"in"`` \| ``"out"`` | - |

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

one-hop edge ids

#### Defined in

[types/graph.ts:106](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L106)

___

### moveCombo

• **moveCombo**: (`ids`: `ID`[], `dx`: `number`, `dy`: `number`, `upsertAncestors?`: `boolean`, `callback?`: (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void`, `stack?`: `boolean`) => [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (`ids`, `dx`, `dy`, `upsertAncestors?`, `callback?`, `stack?`): [`ComboModel`](../modules/types.md#combomodel)[]

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
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

[`ComboModel`](../modules/types.md#combomodel)[]

#### Defined in

[types/graph.ts:278](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L278)

___

### read

• **read**: (`data`: [`GraphData`](types-GraphData.md)) => `void`

#### Type declaration

▸ (`data`): `void`

Input data and render the graph.
If there is old data, diffs and changes it.

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`GraphData`](types-GraphData.md) |

##### Returns

`void`

#### Defined in

[types/graph.ts:140](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L140)

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

[types/graph.ts:201](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L201)

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

[types/graph.ts:466](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L466)

___

### updateComboPosition

• **updateComboPosition**: (`models`: `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `void`, `stack?`: `boolean`) => [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more combos' positions, it is achieved by move the succeed nodes.
Do not update other styles which leads to better performance than updating positions by updateData.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | new configurations with x and y for every combo, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | - |
| `disableAnimate?` | `boolean` | - |
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

[`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Defined in

[types/graph.ts:258](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L258)

___

### updateData

• **updateData**: (`itemType`: `ITEM_TYPE`, `model`: `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\>, `stack?`: `boolean`) => [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (`itemType`, `model`, `stack?`): [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more node/edge/combo data on the graph.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | - |
| `model` | `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`EdgeUserModel`](../modules/types.md#edgeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | update configs |
| `stack?` | `boolean` | whether push this operation to stack |

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`EdgeModel`](../modules/types.md#edgemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Defined in

[types/graph.ts:209](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L209)

___

### updateNodePosition

• **updateNodePosition**: (`models`: `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void`, `stack?`: `boolean`) => [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Type declaration

▸ (`models`, `upsertAncestors?`, `disableAnimate?`, `callback?`, `stack?`): [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

Update one or more nodes' positions,
do not update other styles which leads to better performance than updating positions by updateData.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\> \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel) \| `Partial`<[`NodeUserModel`](../modules/types.md#nodeusermodel)\>[] \| `Partial`<[`ComboUserModel`](../modules/types.md#combousermodel)\>[]\> | new configurations with x and y for every node, which has id field to indicate the specific item |
| `upsertAncestors?` | `boolean` | - |
| `disableAnimate?` | `boolean` | - |
| `callback?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel), `canceled?`: `boolean`) => `void` | - |
| `stack?` | `boolean` | whether push this operation into graph's stack, true by default |

##### Returns

[`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel) \| [`NodeModel`](../modules/types.md#nodemodel)[] \| [`ComboModel`](../modules/types.md#combomodel)[]

#### Defined in

[types/graph.ts:236](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L236)

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

[types/graph.ts:39](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L39)

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

[types/graph.ts:622](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L622)

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

[types/graph.ts:605](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L605)

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

[types/graph.ts:587](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L587)

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

[types/graph.ts:613](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L613)

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

[types/graph.ts:487](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L487)

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

[types/graph.ts:524](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L524)

___

### findIdByState

• **findIdByState**: (`itemType`: `ITEM_TYPE`, `state`: `string`, `value?`: `string` \| `boolean`, `additionalFilter?`: (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `boolean`) => `ID`[]

#### Type declaration

▸ (`itemType`, `state`, `value?`, `additionalFilter?`): `ID`[]

Find items which has the state.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `state` | `string` | state name |
| `value?` | `string` \| `boolean` | state value, true by default |
| `additionalFilter?` | (`model`: [`EdgeModel`](../modules/types.md#edgemodel) \| [`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel)) => `boolean` | additional filter function |

##### Returns

`ID`[]

items that is the type and has the state

#### Defined in

[types/graph.ts:163](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L163)

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

[types/graph.ts:480](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L480)

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

[types/graph.ts:516](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L516)

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

[types/graph.ts:509](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L509)

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

[types/graph.ts:473](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L473)

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

[types/graph.ts:496](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L496)

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

[types/graph.ts:634](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L634)

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

[types/graph.ts:648](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L648)

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

[types/graph.ts:656](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L656)

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

[types/graph.ts:594](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L594)

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

[types/graph.ts:746](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L746)

___

### canRedo

• **canRedo**: () => `void`

#### Type declaration

▸ (): `void`

Indicate whether there are any actions available in the redo stack.

##### Returns

`void`

#### Defined in

[types/graph.ts:724](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L724)

___

### canUndo

• **canUndo**: () => `void`

#### Type declaration

▸ (): `void`

Indicate whether there are any actions available in the undo stack.

##### Returns

`void`

#### Defined in

[types/graph.ts:719](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L719)

___

### canvas

• **canvas**: `Canvas`

#### Defined in

[types/graph.ts:27](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L27)

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

[types/graph.ts:58](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L58)

___

### clear

• **clear**: () => `void`

#### Type declaration

▸ (): `void`

Clear the graph, means remove all the items on the graph.

##### Returns

`void`

#### Defined in

[types/graph.ts:153](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L153)

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

[types/graph.ts:753](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L753)

___

### container

• **container**: `HTMLElement`

#### Defined in

[types/graph.ts:30](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L30)

___

### destroyed

• **destroyed**: `boolean`

#### Defined in

[types/graph.ts:29](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L29)

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

[types/graph.ts:687](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L687)

___

### getComboChildrenData

• **getComboChildrenData**: (`comboId`: `ID`) => ([`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel))[]

#### Type declaration

▸ (`comboId`): ([`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel))[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `comboId` | `ID` |

##### Returns

([`NodeModel`](../modules/types.md#nodemodel) \| [`ComboModel`](../modules/types.md#combomodel))[]

#### Defined in

[types/graph.ts:132](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L132)

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

[types/graph.ts:542](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L542)

___

### getNearEdgesForNode

• **getNearEdgesForNode**: (`nodeId`: `ID`) => [`EdgeModel`](../modules/types.md#edgemodel)[]

#### Type declaration

▸ (`nodeId`): [`EdgeModel`](../modules/types.md#edgemodel)[]

Retrieve the nearby edges for a given node using quadtree collision detection.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `ID` | target node's id |

##### Returns

[`EdgeModel`](../modules/types.md#edgemodel)[]

edges

#### Defined in

[types/graph.ts:125](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L125)

___

### getRedoStack

• **getRedoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current undo stack which consists of operations that were undone

##### Returns

`void`

#### Defined in

[types/graph.ts:696](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L696)

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

[types/graph.ts:531](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L531)

___

### getSpecification

• **getSpecification**: () => [`Specification`](types-Specification.md)<`B`, `T`\>

#### Type declaration

▸ (): [`Specification`](types-Specification.md)<`B`, `T`\>

Get the copy of specs(configurations).

##### Returns

[`Specification`](types-Specification.md)<`B`, `T`\>

graph specs

#### Defined in

[types/graph.ts:52](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L52)

___

### getStack

• **getStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the complete history stack

##### Returns

`void`

#### Defined in

[types/graph.ts:702](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L702)

___

### getUndoStack

• **getUndoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current redo stack which consists of operations that could be undone

##### Returns

`void`

#### Defined in

[types/graph.ts:691](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L691)

___

### getViewportCenter

• **getViewportCenter**: () => `PointLike`

#### Type declaration

▸ (): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

##### Returns

`PointLike`

#### Defined in

[types/graph.ts:381](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L381)

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

[types/graph.ts:319](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L319)

___

### hooks

• **hooks**: `Hooks`

#### Defined in

[types/graph.ts:26](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L26)

___

### isHistoryEnabled

• **isHistoryEnabled**: () => `void`

#### Type declaration

▸ (): `void`

Determine if history (redo/undo) is enabled.

##### Returns

`void`

#### Defined in

[types/graph.ts:667](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L667)

___

### layout

• **layout**: (`options?`: [`LayoutOptions`](../modules/types.md#layoutoptions), `disableAnimate?`: `boolean`) => `Promise`<`void`\>

#### Type declaration

▸ (`options?`, `disableAnimate?`): `Promise`<`void`\>

Layout the graph (with current configurations if cfg is not assigned).

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`LayoutOptions`](../modules/types.md#layoutoptions) |
| `disableAnimate?` | `boolean` |

##### Returns

`Promise`<`void`\>

#### Defined in

[types/graph.ts:577](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L577)

___

### pauseStacking

• **pauseStacking**: () => `void`

#### Type declaration

▸ (): `void`

Pause stacking operation.

##### Returns

`void`

#### Defined in

[types/graph.ts:678](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L678)

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

[types/graph.ts:674](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L674)

___

### redo

• **redo**: () => `void`

#### Type declaration

▸ (): `void`

Restore the operation that was last n reverted on the graph.

##### Returns

`void`

#### Defined in

[types/graph.ts:714](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L714)

___

### rendererType

• **rendererType**: `RendererName`

#### Defined in

[types/graph.ts:31](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L31)

___

### resumeStacking

• **resumeStacking**: () => `void`

#### Type declaration

▸ (): `void`

Resume stacking operation.

##### Returns

`void`

#### Defined in

[types/graph.ts:682](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L682)

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

[types/graph.ts:348](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L348)

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

[types/graph.ts:359](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L359)

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

[types/graph.ts:731](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L731)

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

[types/graph.ts:738](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L738)

___

### stopLayout

• **stopLayout**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[types/graph.ts:578](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L578)

___

### stopTransformTransition

• **stopTransformTransition**: () => `void`

#### Type declaration

▸ (): `void`

Stop the current transition of transform immediately.

##### Returns

`void`

#### Defined in

[types/graph.ts:377](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L377)

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

[types/graph.ts:370](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L370)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Defined in

[types/graph.ts:28](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L28)

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

[types/graph.ts:298](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L298)

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

[types/graph.ts:311](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L311)

___

### undo

• **undo**: () => `void`

#### Type declaration

▸ (): `void`

Revert the last n operation(s) on the graph.

##### Returns

`void`

#### Defined in

[types/graph.ts:708](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L708)

___

### updateSpecification

• **updateSpecification**: (`spec`: [`Specification`](types-Specification.md)<`B`, `T`\>) => [`Specification`](types-Specification.md)<`B`, `T`\>

#### Type declaration

▸ (`spec`): [`Specification`](types-Specification.md)<`B`, `T`\>

Update the specs (configurations).

##### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](types-Specification.md)<`B`, `T`\> |

##### Returns

[`Specification`](types-Specification.md)<`B`, `T`\>

#### Defined in

[types/graph.ts:43](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L43)

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

[types/graph.ts:47](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L47)

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

[types/graph.ts:326](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L326)

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

[types/graph.ts:337](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L337)

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

[types/graph.ts:763](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L763)

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

[types/graph.ts:772](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L772)

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

[types/graph.ts:403](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L403)

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

[types/graph.ts:390](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L390)

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

[types/graph.ts:410](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L410)

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

[types/graph.ts:457](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L457)

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

[types/graph.ts:433](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L433)

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

[types/graph.ts:449](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L449)

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

[types/graph.ts:419](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L419)

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

[types/graph.ts:441](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L441)

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

[types/graph.ts:425](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/graph.ts#L425)
