[@antv/g6](../README.md) / [Exports](../modules.md) / default

# Class: default<B\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |

## Hierarchy

- `default`

  ↳ **`default`**

## Implements

- `IGraph`<`B`\>

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [canvas](default.md#canvas)
- [hooks](default.md#hooks)

### Interaction

- [addBehaviors](default.md#addbehaviors)
- [removeBehaviors](default.md#removebehaviors)
- [setMode](default.md#setmode)
- [updateBehavior](default.md#updatebehavior)

### Data

- [addData](default.md#adddata)
- [read](default.md#read)
- [removeData](default.md#removedata)
- [updateData](default.md#updatedata)

### Methods

- [changeData](default.md#changedata)
- [clear](default.md#clear)
- [getSpecification](default.md#getspecification)
- [updateSpecification](default.md#updatespecification)

### Combo

- [collapseCombo](default.md#collapsecombo)
- [createCombo](default.md#createcombo)
- [expandCombo](default.md#expandcombo)
- [uncombo](default.md#uncombo)

### Item

- [findIdByState](default.md#findidbystate)
- [getComboData](default.md#getcombodata)
- [getEdgeData](default.md#getedgedata)
- [getNodeData](default.md#getnodedata)
- [hideItem](default.md#hideitem)
- [setItemState](default.md#setitemstate)
- [showItem](default.md#showitem)

### View

- [fitCenter](default.md#fitcenter)
- [fitView](default.md#fitview)
- [focusItem](default.md#focusitem)
- [move](default.md#move)
- [moveTo](default.md#moveto)
- [zoom](default.md#zoom)
- [zoomTo](default.md#zoomto)

### Layout

- [layout](default.md#layout)

## Constructors

### constructor

• **new default**<`B`\>(`spec`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | `Specification`<`B`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[graph.ts:38](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L38)

## Properties

### canvas

• **canvas**: `Canvas`

#### Implementation of

IGraph.canvas

#### Defined in

[graph.ts:23](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L23)

___

### hooks

• **hooks**: `Hooks`

#### Implementation of

IGraph.hooks

#### Defined in

[graph.ts:21](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L21)

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

IGraph.addBehaviors

#### Defined in

[graph.ts:445](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L445)

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

IGraph.removeBehaviors

#### Defined in

[graph.ts:465](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L465)

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

IGraph.setMode

#### Defined in

[graph.ts:434](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L434)

___

### updateBehavior

▸ **updateBehavior**(`behavior`, `mode?`): `void`

Update a behavior on a mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `behavior` | `BehaviorObjectOptionsOf`<`B`\> | behavior configs, whose name indicates the behavior to be updated |
| `mode?` | `string` | mode name |

#### Returns

`void`

#### Implementation of

IGraph.updateBehavior

#### Defined in

[graph.ts:488](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L488)

## Data

### addData

▸ **addData**(`itemType`, `models`, `stack?`): `boolean`

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `models` | `EdgeUserModel` \| `NodeUserModel` \| `ComboUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | - |
| `stack?` | `boolean` | whether push this operation to stack |

#### Returns

`boolean`

whether success

#### Implementation of

IGraph.addData

#### Defined in

[graph.ts:286](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L286)

___

### read

▸ **read**(`data`): `void`

Input data and render the graph.
If there is old data, diffs and changes it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `GraphData` |

#### Returns

`void`

#### Implementation of

IGraph.read

#### Defined in

[graph.ts:126](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L126)

___

### removeData

▸ **removeData**(`itemType`, `ids`, `stack?`): `boolean`

Remove one or more node/edge/combo data from the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | - |
| `ids` | `string` \| `number` \| (`string` \| `number`)[] | - |
| `stack?` | `boolean` | whether push this operation to stack |

#### Returns

`boolean`

whether success

#### Implementation of

IGraph.removeData

#### Defined in

[graph.ts:308](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L308)

___

### updateData

▸ **updateData**(`itemType`, `models`, `stack?`): `boolean`

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | - |
| `models` | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | - |
| `stack?` | `boolean` | 本次操作是否入栈，默认为 true |

#### Returns

`boolean`

#### Implementation of

IGraph.updateData

#### Defined in

[graph.ts:331](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L331)

## Methods

### changeData

▸ **changeData**(`data`, `type?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `GraphData` | `undefined` |
| `type` | ``"replace"`` \| ``"mergeReplace"`` | `'mergeReplace'` |

#### Returns

`void`

#### Implementation of

IGraph.changeData

#### Defined in

[graph.ts:142](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L142)

___

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

IGraph.clear

#### Defined in

[graph.ts:153](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L153)

___

### getSpecification

▸ **getSpecification**(): `Specification`<`B`\>

Get the copy of specs(configurations).

#### Returns

`Specification`<`B`\>

graph specs

#### Implementation of

IGraph.getSpecification

#### Defined in

[graph.ts:115](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L115)

___

### updateSpecification

▸ **updateSpecification**(`spec`): `void`

Update the specs(configurations).

#### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | `Specification`<`B`\> |

#### Returns

`void`

#### Implementation of

IGraph.updateSpecification

#### Defined in

[graph.ts:107](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L107)

## Combo

### collapseCombo

▸ **collapseCombo**(`comboId`, `stack?`): `void`

Collapse a combo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comboId` | `string` \| `number` | combo id or item |
| `stack?` | `boolean` | - |

#### Returns

`void`

#### Implementation of

IGraph.collapseCombo

#### Defined in

[graph.ts:400](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L400)

___

### createCombo

▸ **createCombo**(`combo`, `childrenIds`, `stack?`): `void`

Create a new combo with existing child nodes and combos.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `combo` | `string` \| `ComboUserModel` | combo ID or Combo model |
| `childrenIds` | `string`[] | id array of children of the new combo |
| `stack?` | `boolean` | - |

#### Returns

`void`

#### Implementation of

IGraph.createCombo

#### Defined in

[graph.ts:384](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L384)

___

### expandCombo

▸ **expandCombo**(`comboId`, `stack?`): `void`

Expand a combo.

#### Parameters

| Name | Type |
| :------ | :------ |
| `comboId` | `string` \| `number` |
| `stack?` | `boolean` |

#### Returns

`void`

#### Implementation of

IGraph.expandCombo

#### Defined in

[graph.ts:408](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L408)

___

### uncombo

▸ **uncombo**(`comboId`, `stack?`): `void`

dissolve combo

#### Parameters

| Name | Type |
| :------ | :------ |
| `comboId` | `string` \| `number` |
| `stack?` | `boolean` |

#### Returns

`void`

#### Implementation of

IGraph.uncombo

#### Defined in

[graph.ts:392](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L392)

## Item

### findIdByState

▸ **findIdByState**(`itemType`, `state`, `additionalFilter?`): (`string` \| `number`)[]

Find items which has the state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemType` | `ITEM_TYPE` | item type |
| `state` | `string` | state name |
| `additionalFilter?` | (`item`: `EdgeModel` \| `NodeModel` \| `ComboModel`) => `boolean` | additional filter function |

#### Returns

(`string` \| `number`)[]

items that is the type and has the state

#### Implementation of

IGraph.findIdByState

#### Defined in

[graph.ts:274](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L274)

___

### getComboData

▸ **getComboData**(`condition`): `ComboModel`

Find an combo's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `string` \| `Function` | id or condition function |

#### Returns

`ComboModel`

result combo

#### Implementation of

IGraph.getComboData

#### Defined in

[graph.ts:263](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L263)

___

### getEdgeData

▸ **getEdgeData**(`condition`): `EdgeModel`

Find an edge's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `string` \| `Function` | id or condition function |

#### Returns

`EdgeModel`

result edge

#### Implementation of

IGraph.getEdgeData

#### Defined in

[graph.ts:254](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L254)

___

### getNodeData

▸ **getNodeData**(`condition`): `NodeModel`

Find a node's inner data according to id or function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `string` \| `Function` | id or condition function |

#### Returns

`NodeModel`

result node

#### Implementation of

IGraph.getNodeData

#### Defined in

[graph.ts:245](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L245)

___

### hideItem

▸ **hideItem**(`ids`): `void`

Hide the item(s).

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string` \| `number` \| (`string` \| `number`)[] |

#### Returns

`void`

#### Implementation of

IGraph.hideItem

#### Defined in

[graph.ts:361](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L361)

___

### setItemState

▸ **setItemState**(`ids`, `state`, `value`): `void`

Set state for the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string` \| `number` \| (`string` \| `number`)[] | - |
| `state` | `string` | the state name |
| `value` | `boolean` | state value |

#### Returns

`void`

#### Implementation of

IGraph.setItemState

#### Defined in

[graph.ts:372](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L372)

___

### showItem

▸ **showItem**(`ids`): `void`

Show the item(s).

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string` \| `number` \| (`string` \| `number`)[] |

#### Returns

`void`

#### Implementation of

IGraph.showItem

#### Defined in

[graph.ts:352](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L352)

## View

### fitCenter

▸ **fitCenter**(`animateCfg?`): `void`

Fit the graph center to the view center.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.fitCenter

#### Defined in

[graph.ts:223](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L223)

___

### fitView

▸ **fitView**(`padding?`, `rules?`, `animateCfg?`): `void`

Fit the graph content to the view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `padding?` | `Padding` | padding while fitting |
| `rules?` | `FitViewRules` | rules for fitting |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.fitView

#### Defined in

[graph.ts:214](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L214)

___

### focusItem

▸ **focusItem**(`ids`, `animateCfg?`): `void`

Move the graph to make the item align the view center.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string` \| `number` \| (`string` \| `number`)[] | - |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.focusItem

#### Defined in

[graph.ts:233](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L233)

___

### move

▸ **move**(`dx`, `dy`, `animateCfg?`): `void`

Move the graph with a relative vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dx` | `number` | x of the relative vector |
| `dy` | `number` | y of the relative vector |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.move

#### Defined in

[graph.ts:165](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L165)

___

### moveTo

▸ **moveTo**(`x`, `y`, `alignment`, `animateCfg?`): `void`

Move the graph and align to a point.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | position on the canvas to align |
| `y` | `number` | position on the canvas to align |
| `alignment` | `GraphAlignment` | alignment of the graph content |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.moveTo

#### Defined in

[graph.ts:178](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L178)

___

### zoom

▸ **zoom**(`ratio`, `center?`, `animateCfg?`): `void`

Zoom the graph with a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | relative ratio to zoom |
| `center?` | `Point` | zoom center |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.zoom

#### Defined in

[graph.ts:190](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L190)

___

### zoomTo

▸ **zoomTo**(`toRatio`, `center?`, `animateCfg?`): `void`

Zoom the graph to a specified ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `toRatio` | `number` | specified ratio |
| `center?` | `Point` | zoom center |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.zoomTo

#### Defined in

[graph.ts:202](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L202)

## Layout

### layout

▸ **layout**(`cfg?`, `align?`, `canvasPoint?`, `stack?`): `void`

Layout the graph (with current configurations if cfg is not assigned).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cfg?` | `LayoutCommonConfig` | layout configurations. if assigned, the layout spec of the graph will be updated in the same time |
| `align?` | `GraphAlignment` | align the result |
| `canvasPoint?` | `Point` | align the result |
| `stack?` | `boolean` | push it into stack |

#### Returns

`void`

#### Implementation of

IGraph.layout

#### Defined in

[graph.ts:422](https://github.com/antvis/G6/blob/bb82593eb8/packages/g6/src/runtime/graph.ts#L422)
