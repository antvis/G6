[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [graph](../../modules/graph.md) / Graph

[graph](../../modules/graph.md).Graph

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` |

## Hierarchy

- `default`

  ↳ **`Graph`**

## Implements

- [`IGraph`](../../interfaces/graph/IGraph.md)<`B`, `T`\>

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

[IGraph](../../interfaces/graph/IGraph.md).[addCombo](../../interfaces/graph/IGraph.md#addcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1544](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1544)

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

[IGraph](../../interfaces/graph/IGraph.md).[collapseCombo](../../interfaces/graph/IGraph.md#collapsecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1589](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1589)

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

[IGraph](../../interfaces/graph/IGraph.md).[expandCombo](../../interfaces/graph/IGraph.md#expandcombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1609](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1609)

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

[IGraph](../../interfaces/graph/IGraph.md).[moveCombo](../../interfaces/graph/IGraph.md#movecombo)

#### Defined in

[packages/g6/src/runtime/graph.ts:1632](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1632)

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
| `spec` | [`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[packages/g6/src/runtime/graph.ts:101](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L101)

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

[IGraph](../../interfaces/graph/IGraph.md).[addData](../../interfaces/graph/IGraph.md#adddata)

#### Defined in

[packages/g6/src/runtime/graph.ts:970](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L970)

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

[IGraph](../../interfaces/graph/IGraph.md).[changeData](../../interfaces/graph/IGraph.md#changedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:451](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L451)

___

### getAllCombosData

▸ **getAllCombosData**(): `ComboModel`[]

Get all the combos' inner data

#### Returns

`ComboModel`[]

all combos' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getAllCombosData](../../interfaces/graph/IGraph.md#getallcombosdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:881](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L881)

___

### getAllEdgesData

▸ **getAllEdgesData**(): `EdgeModel`[]

Get all the edges' inner data

#### Returns

`EdgeModel`[]

all edges' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getAllEdgesData](../../interfaces/graph/IGraph.md#getalledgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:873](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L873)

___

### getAllNodesData

▸ **getAllNodesData**(): `NodeModel`[]

Get all the nodes' inner data

#### Returns

`NodeModel`[]

all nodes' inner data on the graph

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getAllNodesData](../../interfaces/graph/IGraph.md#getallnodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:865](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L865)

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

[IGraph](../../interfaces/graph/IGraph.md).[getComboChildrenData](../../interfaces/graph/IGraph.md#getcombochildrendata)

#### Defined in

[packages/g6/src/runtime/graph.ts:914](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L914)

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

[IGraph](../../interfaces/graph/IGraph.md).[getComboData](../../interfaces/graph/IGraph.md#getcombodata)

#### Defined in

[packages/g6/src/runtime/graph.ts:855](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L855)

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

[IGraph](../../interfaces/graph/IGraph.md).[getEdgeData](../../interfaces/graph/IGraph.md#getedgedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:842](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L842)

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

[IGraph](../../interfaces/graph/IGraph.md).[getNearEdgesForNode](../../interfaces/graph/IGraph.md#getnearedgesfornode)

#### Defined in

[packages/g6/src/runtime/graph.ts:935](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L935)

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

[IGraph](../../interfaces/graph/IGraph.md).[getNeighborNodesData](../../interfaces/graph/IGraph.md#getneighbornodesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:902](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L902)

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

[IGraph](../../interfaces/graph/IGraph.md).[getNodeData](../../interfaces/graph/IGraph.md#getnodedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:831](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L831)

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

[IGraph](../../interfaces/graph/IGraph.md).[getRelatedEdgesData](../../interfaces/graph/IGraph.md#getrelatededgesdata)

#### Defined in

[packages/g6/src/runtime/graph.ts:890](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L890)

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

[IGraph](../../interfaces/graph/IGraph.md).[read](../../interfaces/graph/IGraph.md#read)

#### Defined in

[packages/g6/src/runtime/graph.ts:400](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L400)

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

[IGraph](../../interfaces/graph/IGraph.md).[removeData](../../interfaces/graph/IGraph.md#removedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1027](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1027)

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

[IGraph](../../interfaces/graph/IGraph.md).[updateComboPosition](../../interfaces/graph/IGraph.md#updatecomboposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1206](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1206)

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

[IGraph](../../interfaces/graph/IGraph.md).[updateData](../../interfaces/graph/IGraph.md#updatedata)

#### Defined in

[packages/g6/src/runtime/graph.ts:1117](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1117)

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

[IGraph](../../interfaces/graph/IGraph.md).[updateNodePosition](../../interfaces/graph/IGraph.md#updatenodeposition)

#### Defined in

[packages/g6/src/runtime/graph.ts:1175](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1175)

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

[IGraph](../../interfaces/graph/IGraph.md).[destroy](../../interfaces/graph/IGraph.md#destroy)

#### Defined in

[packages/g6/src/runtime/graph.ts:2187](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2187)

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

[IGraph](../../interfaces/graph/IGraph.md).[addBehaviors](../../interfaces/graph/IGraph.md#addbehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1772](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1772)

___

### drawTransient

▸ **drawTransient**(`type`, `id`, `config`, `canvas?`): `DisplayObject`<`any`, `any`\>

Draw or update a G shape or group to the transient canvas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ITEM_TYPE` \| `SHAPE_TYPE` | shape type or item type |
| `id` | `ID` | new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing |
| `config` | `Object` | - |
| `config.action` | ``"update"`` \| ``"add"`` \| ``"remove"`` | - |
| `config.onlyDrawKeyShape?` | `boolean` | - |
| `config.style` | `Partial`<[`CircleStyleProps`](../../interfaces/item/CircleStyleProps.md) & [`RectStyleProps`](../../interfaces/item/RectStyleProps.md) & [`EllipseStyleProps`](../../interfaces/item/EllipseStyleProps.md) & [`PolygonStyleProps`](../../interfaces/item/PolygonStyleProps.md) & [`LineStyleProps`](../../interfaces/item/LineStyleProps.md) & [`PolylineStyleProps`](../../interfaces/item/PolylineStyleProps.md) & [`TextStyleProps`](../../interfaces/item/TextStyleProps.md) & [`ImageStyleProps`](../../interfaces/item/ImageStyleProps.md) & [`PathStyleProps`](../../interfaces/item/PathStyleProps.md) & [`SphereGeometryProps`](../../interfaces/item/SphereGeometryProps.md) & [`CubeGeometryProps`](../../interfaces/item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../../interfaces/item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\> | - |
| `config.upsertAncestors?` | `boolean` | - |
| `canvas?` | `Canvas` | - |

#### Returns

`DisplayObject`<`any`, `any`\>

upserted shape or group

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[drawTransient](../../interfaces/graph/IGraph.md#drawtransient)

#### Defined in

[packages/g6/src/runtime/graph.ts:1973](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1973)

___

### getMode

▸ **getMode**(): `string`

Get current mode.

#### Returns

`string`

mode name

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getMode](../../interfaces/graph/IGraph.md#getmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1761](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1761)

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

[IGraph](../../interfaces/graph/IGraph.md).[removeBehaviors](../../interfaces/graph/IGraph.md#removebehaviors)

#### Defined in

[packages/g6/src/runtime/graph.ts:1798](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1798)

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

[IGraph](../../interfaces/graph/IGraph.md).[setMode](../../interfaces/graph/IGraph.md#setmode)

#### Defined in

[packages/g6/src/runtime/graph.ts:1752](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1752)

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

[IGraph](../../interfaces/graph/IGraph.md).[updateBehavior](../../interfaces/graph/IGraph.md#updatebehavior)

#### Defined in

[packages/g6/src/runtime/graph.ts:1825](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1825)

___

### updatePlugin

▸ **updatePlugin**(`plugin`): `void`

Update a plugin of the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | `Plugin` \| { `[cfg: string]`: `unknown`; `key`: `string` ; `type`: `string`  } | plugin configs, whose key indicates the behavior to be updated |

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[updatePlugin](../../interfaces/graph/IGraph.md#updateplugin)

#### Defined in

[packages/g6/src/runtime/graph.ts:1919](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1919)

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

[IGraph](../../interfaces/graph/IGraph.md).[backItem](../../interfaces/graph/IGraph.md#backitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1395](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1395)

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

[IGraph](../../interfaces/graph/IGraph.md).[clearItemState](../../interfaces/graph/IGraph.md#clearitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1488](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1488)

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

[IGraph](../../interfaces/graph/IGraph.md).[findIdByState](../../interfaces/graph/IGraph.md#findidbystate)

#### Defined in

[packages/g6/src/runtime/graph.ts:948](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L948)

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

[IGraph](../../interfaces/graph/IGraph.md).[frontItem](../../interfaces/graph/IGraph.md#frontitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1376](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1376)

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

[IGraph](../../interfaces/graph/IGraph.md).[getItemAllStates](../../interfaces/graph/IGraph.md#getitemallstates)

#### Defined in

[packages/g6/src/runtime/graph.ts:1477](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1477)

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

[IGraph](../../interfaces/graph/IGraph.md).[getItemState](../../interfaces/graph/IGraph.md#getitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1467](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1467)

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

[IGraph](../../interfaces/graph/IGraph.md).[getItemVisible](../../interfaces/graph/IGraph.md#getitemvisible)

#### Defined in

[packages/g6/src/runtime/graph.ts:1531](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1531)

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

[IGraph](../../interfaces/graph/IGraph.md).[getRenderBBox](../../interfaces/graph/IGraph.md#getrenderbbox)

#### Defined in

[packages/g6/src/runtime/graph.ts:1516](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1516)

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

[IGraph](../../interfaces/graph/IGraph.md).[hideItem](../../interfaces/graph/IGraph.md#hideitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1347](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1347)

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

[IGraph](../../interfaces/graph/IGraph.md).[setItemState](../../interfaces/graph/IGraph.md#setitemstate)

#### Defined in

[packages/g6/src/runtime/graph.ts:1434](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1434)

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

[IGraph](../../interfaces/graph/IGraph.md).[showItem](../../interfaces/graph/IGraph.md#showitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:1319](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1319)

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

[IGraph](../../interfaces/graph/IGraph.md).[batch](../../interfaces/graph/IGraph.md#batch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2132](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2132)

___

### canRedo

▸ **canRedo**(): `boolean`

Indicate whether there are any actions available in the redo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[canRedo](../../interfaces/graph/IGraph.md#canredo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2101](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2101)

___

### canUndo

▸ **canUndo**(): `boolean`

Indicate whether there are any actions available in the undo stack.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[canUndo](../../interfaces/graph/IGraph.md#canundo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2093](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2093)

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

[IGraph](../../interfaces/graph/IGraph.md).[changeRenderer](../../interfaces/graph/IGraph.md#changerenderer)

#### Defined in

[packages/g6/src/runtime/graph.ts:260](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L260)

___

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[clear](../../interfaces/graph/IGraph.md#clear)

#### Defined in

[packages/g6/src/runtime/graph.ts:470](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L470)

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

[IGraph](../../interfaces/graph/IGraph.md).[clearStack](../../interfaces/graph/IGraph.md#clearstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2141](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2141)

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

[IGraph](../../interfaces/graph/IGraph.md).[emit](../../interfaces/graph/IGraph.md#emit)

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

[IGraph](../../interfaces/graph/IGraph.md).[executeWithoutStacking](../../interfaces/graph/IGraph.md#executewithoutstacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2035](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2035)

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

[IGraph](../../interfaces/graph/IGraph.md).[fitCenter](../../interfaces/graph/IGraph.md#fitcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:706](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L706)

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

[IGraph](../../interfaces/graph/IGraph.md).[fitView](../../interfaces/graph/IGraph.md#fitview)

#### Defined in

[packages/g6/src/runtime/graph.ts:638](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L638)

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

[IGraph](../../interfaces/graph/IGraph.md).[focusItem](../../interfaces/graph/IGraph.md#focusitem)

#### Defined in

[packages/g6/src/runtime/graph.ts:721](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L721)

___

### getEvents

▸ **getEvents**(): `Record`<`string`, `EventType`[]\>

#### Returns

`Record`<`string`, `EventType`[]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getEvents](../../interfaces/graph/IGraph.md#getevents)

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

[packages/g6/src/runtime/graph.ts:1742](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1742)

___

### getRedoStack

▸ **getRedoStack**(): `Command`[][]

Retrieve the current undo stack which consists of operations that were undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getRedoStack](../../interfaces/graph/IGraph.md#getredostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2056](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2056)

___

### getSpecification

▸ **getSpecification**(): [`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\>

Get the copy of specs(configurations).

#### Returns

[`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\>

graph specs

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getSpecification](../../interfaces/graph/IGraph.md#getspecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:389](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L389)

___

### getStack

▸ **getStack**(): `Record`<`string`, `Command`[][]\>

Retrieve the complete history stack

#### Returns

`Record`<`string`, `Command`[][]\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getStack](../../interfaces/graph/IGraph.md#getstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2065](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2065)

___

### getUndoStack

▸ **getUndoStack**(): `Command`[][]

Retrieve the current redo stack which consists of operations that could be undone

#### Returns

`Command`[][]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getUndoStack](../../interfaces/graph/IGraph.md#getundostack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2048](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2048)

___

### getViewportCenter

▸ **getViewportCenter**(): `PointLike`

Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].

#### Returns

`PointLike`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getViewportCenter](../../interfaces/graph/IGraph.md#getviewportcenter)

#### Defined in

[packages/g6/src/runtime/graph.ts:487](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L487)

___

### getZoom

▸ **getZoom**(): `number`

Return the current zoom level of camera.

#### Returns

`number`

current zoom

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getZoom](../../interfaces/graph/IGraph.md#getzoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:588](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L588)

___

### isHistoryEnabled

▸ **isHistoryEnabled**(): `boolean`

Determine if history (redo/undo) is enabled.

#### Returns

`boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[isHistoryEnabled](../../interfaces/graph/IGraph.md#ishistoryenabled)

#### Defined in

[packages/g6/src/runtime/graph.ts:1999](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1999)

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

[IGraph](../../interfaces/graph/IGraph.md).[layout](../../interfaces/graph/IGraph.md#layout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1684](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1684)

___

### off

▸ **off**(`evt?`, `callback?`): [`Graph`](Graph.md)<`B`, `T`\>

取消监听一个事件，或者一个channel

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | `string` |
| `callback?` | `Function` |

#### Returns

[`Graph`](Graph.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[off](../../interfaces/graph/IGraph.md#off)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:31

___

### on

▸ **on**(`evt`, `callback`, `once?`): [`Graph`](Graph.md)<`B`, `T`\>

监听一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |
| `once?` | `boolean` |

#### Returns

[`Graph`](Graph.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[on](../../interfaces/graph/IGraph.md#on)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@antv+event-emitter@0.1.3/node_modules/@antv/event-emitter/lib/index.d.ts:13

___

### once

▸ **once**(`evt`, `callback`): [`Graph`](Graph.md)<`B`, `T`\>

监听一个事件一次

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |

#### Returns

[`Graph`](Graph.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[once](../../interfaces/graph/IGraph.md#once)

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

[IGraph](../../interfaces/graph/IGraph.md).[pauseStacking](../../interfaces/graph/IGraph.md#pausestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2018](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2018)

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

[IGraph](../../interfaces/graph/IGraph.md).[pushStack](../../interfaces/graph/IGraph.md#pushstack)

#### Defined in

[packages/g6/src/runtime/graph.ts:2010](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2010)

___

### redo

▸ **redo**(): `void`

Revert recent n operation(s) performed on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[redo](../../interfaces/graph/IGraph.md#redo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2085](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2085)

___

### resumeStacking

▸ **resumeStacking**(): `void`

Resume stacking operation.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[resumeStacking](../../interfaces/graph/IGraph.md#resumestacking)

#### Defined in

[packages/g6/src/runtime/graph.ts:2026](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2026)

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

[IGraph](../../interfaces/graph/IGraph.md).[rotate](../../interfaces/graph/IGraph.md#rotate)

#### Defined in

[packages/g6/src/runtime/graph.ts:598](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L598)

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

[IGraph](../../interfaces/graph/IGraph.md).[rotateTo](../../interfaces/graph/IGraph.md#rotateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:620](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L620)

___

### startBatch

▸ **startBatch**(): `void`

Begin a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[startBatch](../../interfaces/graph/IGraph.md#startbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2111](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2111)

___

### stopBatch

▸ **stopBatch**(): `void`

End a batch operation.
Any operations performed between `startBatch` and `stopBatch` are grouped together.
treated as a single operation when undoing or redoing.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[stopBatch](../../interfaces/graph/IGraph.md#stopbatch)

#### Defined in

[packages/g6/src/runtime/graph.ts:2121](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2121)

___

### stopLayout

▸ **stopLayout**(): `void`

Some layout algorithms has many iterations which can be stopped at any time.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[stopLayout](../../interfaces/graph/IGraph.md#stoplayout)

#### Defined in

[packages/g6/src/runtime/graph.ts:1734](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1734)

___

### stopTransformTransition

▸ **stopTransformTransition**(): `void`

Stop the current transition of transform immediately.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[stopTransformTransition](../../interfaces/graph/IGraph.md#stoptransformtransition)

#### Defined in

[packages/g6/src/runtime/graph.ts:505](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L505)

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

[IGraph](../../interfaces/graph/IGraph.md).[transform](../../interfaces/graph/IGraph.md#transform)

#### Defined in

[packages/g6/src/runtime/graph.ts:491](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L491)

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

[IGraph](../../interfaces/graph/IGraph.md).[translate](../../interfaces/graph/IGraph.md#translate)

#### Defined in

[packages/g6/src/runtime/graph.ts:515](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L515)

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

[IGraph](../../interfaces/graph/IGraph.md).[translateTo](../../interfaces/graph/IGraph.md#translateto)

#### Defined in

[packages/g6/src/runtime/graph.ts:536](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L536)

___

### undo

▸ **undo**(): `void`

Restore n operations that were last n reverted on the graph.

#### Returns

`void`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[undo](../../interfaces/graph/IGraph.md#undo)

#### Defined in

[packages/g6/src/runtime/graph.ts:2075](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2075)

___

### updateSpecification

▸ **updateSpecification**(`spec`): [`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\>

Update the specs(configurations).

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | [`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\> |

#### Returns

[`Specification`](../../interfaces/graph/Specification.md)<`B`, `T`\>

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[updateSpecification](../../interfaces/graph/IGraph.md#updatespecification)

#### Defined in

[packages/g6/src/runtime/graph.ts:362](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L362)

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

[IGraph](../../interfaces/graph/IGraph.md).[updateTheme](../../interfaces/graph/IGraph.md#updatetheme)

#### Defined in

[packages/g6/src/runtime/graph.ts:368](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L368)

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

[IGraph](../../interfaces/graph/IGraph.md).[zoom](../../interfaces/graph/IGraph.md#zoom)

#### Defined in

[packages/g6/src/runtime/graph.ts:550](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L550)

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

[IGraph](../../interfaces/graph/IGraph.md).[zoomTo](../../interfaces/graph/IGraph.md#zoomto)

#### Defined in

[packages/g6/src/runtime/graph.ts:572](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L572)

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

[IGraph](../../interfaces/graph/IGraph.md).[addPlugins](../../interfaces/graph/IGraph.md#addplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1847](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1847)

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

[IGraph](../../interfaces/graph/IGraph.md).[removePlugins](../../interfaces/graph/IGraph.md#removeplugins)

#### Defined in

[packages/g6/src/runtime/graph.ts:1900](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L1900)

## Properties

### backgroundCanvas

• **backgroundCanvas**: `Canvas`

#### Defined in

[packages/g6/src/runtime/graph.ts:79](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L79)

___

### canvas

• **canvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[canvas](../../interfaces/graph/IGraph.md#canvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:69](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L69)

___

### container

• **container**: `HTMLElement`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[container](../../interfaces/graph/IGraph.md#container)

#### Defined in

[packages/g6/src/runtime/graph.ts:71](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L71)

___

### destroyed

• **destroyed**: `boolean`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[destroyed](../../interfaces/graph/IGraph.md#destroyed)

#### Defined in

[packages/g6/src/runtime/graph.ts:73](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L73)

___

### hooks

• **hooks**: `Hooks`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[hooks](../../interfaces/graph/IGraph.md#hooks)

#### Defined in

[packages/g6/src/runtime/graph.ts:67](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L67)

___

### rendererType

• **rendererType**: `RendererName`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[rendererType](../../interfaces/graph/IGraph.md#renderertype)

#### Defined in

[packages/g6/src/runtime/graph.ts:75](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L75)

___

### transientCanvas

• **transientCanvas**: `Canvas`

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[transientCanvas](../../interfaces/graph/IGraph.md#transientcanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:77](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L77)

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

[IGraph](../../interfaces/graph/IGraph.md).[collapse](../../interfaces/graph/IGraph.md#collapse)

#### Defined in

[packages/g6/src/runtime/graph.ts:2157](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2157)

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

[IGraph](../../interfaces/graph/IGraph.md).[expand](../../interfaces/graph/IGraph.md#expand)

#### Defined in

[packages/g6/src/runtime/graph.ts:2173](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L2173)

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

[IGraph](../../interfaces/graph/IGraph.md).[getCanvasByClient](../../interfaces/graph/IGraph.md#getcanvasbyclient)

#### Defined in

[packages/g6/src/runtime/graph.ts:819](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L819)

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

[IGraph](../../interfaces/graph/IGraph.md).[getCanvasByViewport](../../interfaces/graph/IGraph.md#getcanvasbyviewport)

#### Defined in

[packages/g6/src/runtime/graph.ts:788](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L788)

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

[IGraph](../../interfaces/graph/IGraph.md).[getClientByCanvas](../../interfaces/graph/IGraph.md#getclientbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:808](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L808)

___

### getSize

▸ **getSize**(): `number`[]

Get the size of the graph canvas.

#### Returns

`number`[]

[width, height]

#### Implementation of

[IGraph](../../interfaces/graph/IGraph.md).[getSize](../../interfaces/graph/IGraph.md#getsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:760](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L760)

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

[IGraph](../../interfaces/graph/IGraph.md).[getViewportByCanvas](../../interfaces/graph/IGraph.md#getviewportbycanvas)

#### Defined in

[packages/g6/src/runtime/graph.ts:798](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L798)

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

[IGraph](../../interfaces/graph/IGraph.md).[setSize](../../interfaces/graph/IGraph.md#setsize)

#### Defined in

[packages/g6/src/runtime/graph.ts:770](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/runtime/graph.ts#L770)
