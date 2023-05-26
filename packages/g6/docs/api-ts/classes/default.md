[@antv/g6](../README.md) / [Exports](../modules.md) / default

# Class: default<B\>

## Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `B`  | extends `BehaviorRegistry` |

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
- [destroyed](default.md#destroyed)
- [hooks](default.md#hooks)

### Interaction

- [addBehaviors](default.md#addbehaviors)
- [removeBehaviors](default.md#removebehaviors)
- [setMode](default.md#setmode)
- [updateBehavior](default.md#updatebehavior)

### Data

- [addData](default.md#adddata)
- [changeData](default.md#changedata)
- [getAllCombosData](default.md#getallcombosdata)
- [getAllEdgesData](default.md#getalledgesdata)
- [getAllNodesData](default.md#getallnodesdata)
- [getComboData](default.md#getcombodata)
- [getEdgeData](default.md#getedgedata)
- [getNodeData](default.md#getnodedata)
- [read](default.md#read)
- [removeData](default.md#removedata)
- [updateData](default.md#updatedata)

### Methods

- [clear](default.md#clear)
- [getSpecification](default.md#getspecification)
- [updateSpecification](default.md#updatespecification)

### Item

- [clearItemState](default.md#clearitemstate)
- [findIdByState](default.md#findidbystate)
- [hideItem](default.md#hideitem)
- [setItemState](default.md#setitemstate)
- [showItem](default.md#showitem)

### Combo

- [collapseCombo](default.md#collapsecombo)
- [createCombo](default.md#createcombo)
- [expandCombo](default.md#expandcombo)
- [uncombo](default.md#uncombo)

### Graph Instance

- [destroy](default.md#destroy)

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

| Name | Type                       |
| :--- | :------------------------- |
| `B`  | extends `BehaviorRegistry` |

#### Parameters

| Name   | Type                  |
| :----- | :-------------------- |
| `spec` | `Specification`<`B`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[graph.ts:55](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L55)

## Properties

### canvas

• **canvas**: `Canvas`

#### Implementation of

IGraph.canvas

#### Defined in

[graph.ts:38](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L38)

---

### destroyed

• **destroyed**: `boolean`

#### Implementation of

IGraph.destroyed

#### Defined in

[graph.ts:40](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L40)

---

### hooks

• **hooks**: `Hooks`

#### Implementation of

IGraph.hooks

#### Defined in

[graph.ts:36](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L36)

## Interaction

### addBehaviors

▸ **addBehaviors**(`behaviors`, `modes`): `void`

Add behavior(s) to mode(s).

#### Parameters

| Name        | Type                        | Description               |
| :---------- | :-------------------------- | :------------------------ |
| `behaviors` | `BehaviorOptionsOf`<`B`\>[] | behavior names or configs |
| `modes`     | `string` \| `string`[]      | mode names                |

#### Returns

`void`

#### Implementation of

IGraph.addBehaviors

#### Defined in

[graph.ts:576](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L576)

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

IGraph.removeBehaviors

#### Defined in

[graph.ts:596](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L596)

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

IGraph.setMode

#### Defined in

[graph.ts:565](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L565)

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

IGraph.updateBehavior

#### Defined in

[graph.ts:621](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L621)

## Data

### addData

▸ **addData**(`itemType`, `models`, `stack?`): `EdgeModel` \| `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Add one or more node/edge/combo data to the graph.

#### Parameters

| Name       | Type                                                                                                                   | Description                          |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `itemType` | `ITEM_TYPE`                                                                                                            | item type                            |
| `models`   | `EdgeUserModel` \| `NodeUserModel` \| `ComboUserModel` \| `NodeUserModel`[] \| `EdgeUserModel`[] \| `ComboUserModel`[] | -                                    |
| `stack?`   | `boolean`                                                                                                              | whether push this operation to stack |

#### Returns

`EdgeModel` \| `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

whether success

#### Implementation of

IGraph.addData

#### Defined in

[graph.ts:350](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L350)

---

### changeData

▸ **changeData**(`data`, `type?`): `void`

Change graph data.

#### Parameters

| Name   | Type                            | Default value    | Description                                                                                                                                                       |
| :----- | :------------------------------ | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | `GraphData`                     | `undefined`      | new data                                                                                                                                                          |
| `type` | `"replace"` \| `"mergeReplace"` | `'mergeReplace'` | the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old) |

#### Returns

`void`

#### Implementation of

IGraph.changeData

#### Defined in

[graph.ts:170](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L170)

---

### getAllCombosData

▸ **getAllCombosData**(): `ComboModel`[]

Get all the combos' inner data

#### Returns

`ComboModel`[]

all combos' inner data on the graph

#### Implementation of

IGraph.getAllCombosData

#### Defined in

[graph.ts:319](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L319)

---

### getAllEdgesData

▸ **getAllEdgesData**(): `EdgeModel`[]

Get all the edges' inner data

#### Returns

`EdgeModel`[]

all edges' inner data on the graph

#### Implementation of

IGraph.getAllEdgesData

#### Defined in

[graph.ts:311](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L311)

---

### getAllNodesData

▸ **getAllNodesData**(): `NodeModel`[]

Get all the nodes' inner data

#### Returns

`NodeModel`[]

all nodes' inner data on the graph

#### Implementation of

IGraph.getAllNodesData

#### Defined in

[graph.ts:303](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L303)

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

IGraph.getComboData

#### Defined in

[graph.ts:294](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L294)

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

IGraph.getEdgeData

#### Defined in

[graph.ts:283](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L283)

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

IGraph.getNodeData

#### Defined in

[graph.ts:273](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L273)

---

### read

▸ **read**(`data`): `void`

Input data and render the graph.
If there is old data, diffs and changes it.

#### Parameters

| Name   | Type        |
| :----- | :---------- |
| `data` | `GraphData` |

#### Returns

`void`

#### Implementation of

IGraph.read

#### Defined in

[graph.ts:146](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L146)

---

### removeData

▸ **removeData**(`itemType`, `ids`, `stack?`): `void`

Remove one or more node/edge/combo data from the graph.

#### Parameters

| Name       | Type           | Description                          |
| :--------- | :------------- | :----------------------------------- |
| `itemType` | `ITEM_TYPE`    | -                                    |
| `ids`      | `ID` \| `ID`[] | -                                    |
| `stack?`   | `boolean`      | whether push this operation to stack |

#### Returns

`void`

whether success

#### Implementation of

IGraph.removeData

#### Defined in

[graph.ts:392](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L392)

---

### updateData

▸ **updateData**(`itemType`, `models`, `stack?`): `EdgeModel` \| `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

Update one or more node/edge/combo data on the graph.

#### Parameters

| Name       | Type                                                                                                                                                                                           | Description                   |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `itemType` | `ITEM_TYPE`                                                                                                                                                                                    | -                             |
| `models`   | `Partial`<`NodeUserModel`\> \| `Partial`<`EdgeUserModel`\> \| `Partial`<`ComboUserModel` \| `Partial`<`NodeUserModel`\>[] \| `Partial`<`EdgeUserModel`\>[] \| `Partial`<`ComboUserModel`\>[]\> | -                             |
| `stack?`   | `boolean`                                                                                                                                                                                      | 本次操作是否入栈，默认为 true |

#### Returns

`EdgeModel` \| `NodeModel` \| `ComboModel` \| `NodeModel`[] \| `EdgeModel`[] \| `ComboModel`[]

#### Implementation of

IGraph.updateData

#### Defined in

[graph.ts:417](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L417)

## Methods

### clear

▸ **clear**(): `void`

Clear the graph, means remove all the items on the graph.

#### Returns

`void`

#### Implementation of

IGraph.clear

#### Defined in

[graph.ts:182](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L182)

---

### getSpecification

▸ **getSpecification**(): `Specification`<`B`\>

Get the copy of specs(configurations).

#### Returns

`Specification`<`B`\>

graph specs

#### Implementation of

IGraph.getSpecification

#### Defined in

[graph.ts:135](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L135)

---

### updateSpecification

▸ **updateSpecification**(`spec`): `void`

Update the specs(configurations).

#### Parameters

| Name   | Type                  |
| :----- | :-------------------- |
| `spec` | `Specification`<`B`\> |

#### Returns

`void`

#### Implementation of

IGraph.updateSpecification

#### Defined in

[graph.ts:127](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L127)

## Item

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

IGraph.clearItemState

#### Defined in

[graph.ts:496](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L496)

---

### findIdByState

▸ **findIdByState**(`itemType`, `state`, `additionalFilter?`): `ID`[]

Find items which has the state.

#### Parameters

| Name                | Type                                                              | Description                |
| :------------------ | :---------------------------------------------------------------- | :------------------------- |
| `itemType`          | `ITEM_TYPE`                                                       | item type                  |
| `state`             | `string`                                                          | state name                 |
| `additionalFilter?` | (`item`: `EdgeModel` \| `NodeModel` \| `ComboModel`) => `boolean` | additional filter function |

#### Returns

`ID`[]

items that is the type and has the state

#### Implementation of

IGraph.findIdByState

#### Defined in

[graph.ts:330](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L330)

---

### hideItem

▸ **hideItem**(`ids`): `void`

Hide the item(s).

#### Parameters

| Name  | Type           |
| :---- | :------------- |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

IGraph.hideItem

#### Defined in

[graph.ts:468](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L468)

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

IGraph.setItemState

#### Defined in

[graph.ts:479](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L479)

---

### showItem

▸ **showItem**(`ids`): `void`

Show the item(s).

#### Parameters

| Name  | Type           |
| :---- | :------------- |
| `ids` | `ID` \| `ID`[] |

#### Returns

`void`

#### Implementation of

IGraph.showItem

#### Defined in

[graph.ts:459](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L459)

## Combo

### collapseCombo

▸ **collapseCombo**(`comboId`, `stack?`): `void`

Collapse a combo.

#### Parameters

| Name      | Type      | Description      |
| :-------- | :-------- | :--------------- |
| `comboId` | `ID`      | combo id or item |
| `stack?`  | `boolean` | -                |

#### Returns

`void`

#### Implementation of

IGraph.collapseCombo

#### Defined in

[graph.ts:528](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L528)

---

### createCombo

▸ **createCombo**(`combo`, `childrenIds`, `stack?`): `void`

Create a new combo with existing child nodes and combos.

#### Parameters

| Name          | Type                         | Description                           |
| :------------ | :--------------------------- | :------------------------------------ |
| `combo`       | `string` \| `ComboUserModel` | combo ID or Combo model               |
| `childrenIds` | `string`[]                   | id array of children of the new combo |
| `stack?`      | `boolean`                    | -                                     |

#### Returns

`void`

#### Implementation of

IGraph.createCombo

#### Defined in

[graph.ts:512](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L512)

---

### expandCombo

▸ **expandCombo**(`comboId`, `stack?`): `void`

Expand a combo.

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `comboId` | `ID`      |
| `stack?`  | `boolean` |

#### Returns

`void`

#### Implementation of

IGraph.expandCombo

#### Defined in

[graph.ts:536](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L536)

---

### uncombo

▸ **uncombo**(`comboId`, `stack?`): `void`

dissolve combo

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `comboId` | `ID`      |
| `stack?`  | `boolean` |

#### Returns

`void`

#### Implementation of

IGraph.uncombo

#### Defined in

[graph.ts:520](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L520)

## Graph Instance

### destroy

▸ **destroy**(): `void`

Destroy the graph instance and remove the related canvases.

#### Returns

`void`

#### Implementation of

IGraph.destroy

#### Defined in

[graph.ts:640](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L640)

## View

### fitCenter

▸ **fitCenter**(`animateCfg?`): `void`

Fit the graph center to the view center.

#### Parameters

| Name          | Type         | Description              |
| :------------ | :----------- | :----------------------- |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.fitCenter

#### Defined in

[graph.ts:252](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L252)

---

### fitView

▸ **fitView**(`padding?`, `rules?`, `animateCfg?`): `void`

Fit the graph content to the view.

#### Parameters

| Name          | Type           | Description              |
| :------------ | :------------- | :----------------------- |
| `padding?`    | `Padding`      | padding while fitting    |
| `rules?`      | `FitViewRules` | rules for fitting        |
| `animateCfg?` | `AnimateCfg`   | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.fitView

#### Defined in

[graph.ts:243](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L243)

---

### focusItem

▸ **focusItem**(`ids`, `animateCfg?`): `void`

Move the graph to make the item align the view center.

#### Parameters

| Name          | Type           | Description              |
| :------------ | :------------- | :----------------------- |
| `ids`         | `ID` \| `ID`[] | -                        |
| `animateCfg?` | `AnimateCfg`   | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.focusItem

#### Defined in

[graph.ts:262](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L262)

---

### move

▸ **move**(`dx`, `dy`, `animateCfg?`): `void`

Move the graph with a relative vector.

#### Parameters

| Name          | Type         | Description              |
| :------------ | :----------- | :----------------------- |
| `dx`          | `number`     | x of the relative vector |
| `dy`          | `number`     | y of the relative vector |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.move

#### Defined in

[graph.ts:194](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L194)

---

### moveTo

▸ **moveTo**(`x`, `y`, `alignment`, `animateCfg?`): `void`

Move the graph and align to a point.

#### Parameters

| Name          | Type             | Description                     |
| :------------ | :--------------- | :------------------------------ |
| `x`           | `number`         | position on the canvas to align |
| `y`           | `number`         | position on the canvas to align |
| `alignment`   | `GraphAlignment` | alignment of the graph content  |
| `animateCfg?` | `AnimateCfg`     | animation configurations        |

#### Returns

`void`

#### Implementation of

IGraph.moveTo

#### Defined in

[graph.ts:207](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L207)

---

### zoom

▸ **zoom**(`ratio`, `center?`, `animateCfg?`): `void`

Zoom the graph with a relative ratio.

#### Parameters

| Name          | Type         | Description              |
| :------------ | :----------- | :----------------------- |
| `ratio`       | `number`     | relative ratio to zoom   |
| `center?`     | `Point`      | zoom center              |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.zoom

#### Defined in

[graph.ts:219](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L219)

---

### zoomTo

▸ **zoomTo**(`toRatio`, `center?`, `animateCfg?`): `void`

Zoom the graph to a specified ratio.

#### Parameters

| Name          | Type         | Description              |
| :------------ | :----------- | :----------------------- |
| `toRatio`     | `number`     | specified ratio          |
| `center?`     | `Point`      | zoom center              |
| `animateCfg?` | `AnimateCfg` | animation configurations |

#### Returns

`void`

#### Implementation of

IGraph.zoomTo

#### Defined in

[graph.ts:231](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L231)

## Layout

### layout

▸ **layout**(`cfg?`, `align?`, `canvasPoint?`, `stack?`): `void`

Layout the graph (with current configurations if cfg is not assigned).

#### Parameters

| Name           | Type                 | Description                                                                                       |
| :------------- | :------------------- | :------------------------------------------------------------------------------------------------ |
| `cfg?`         | `LayoutCommonConfig` | layout configurations. if assigned, the layout spec of the graph will be updated in the same time |
| `align?`       | `GraphAlignment`     | align the result                                                                                  |
| `canvasPoint?` | `Point`              | align the result                                                                                  |
| `stack?`       | `boolean`            | push it into stack                                                                                |

#### Returns

`void`

#### Implementation of

IGraph.layout

#### Defined in

[graph.ts:549](https://github.com/antvis/G6/blob/abc619f898/packages/g6/src/runtime/graph.ts#L549)
