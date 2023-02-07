---
id: "_graph_.graph"
title: "Graph"
sidebar_label: "Graph"
---

[@antv/g6](../index.md) › [Globals](../globals.md) › ["graph"](../modules/_graph_.md) › [Graph](_graph_.graph.md)

## Type parameters

▪ **B**: *BehaviorRegistry*

## Hierarchy

* EventEmitter

  ↳ **Graph**

## Implements

* IGraph‹B›

## Index

### Constructors

* [constructor](_graph_.graph.md#constructor)

### Properties

* [hooks](_graph_.graph.md#hooks)

### Methods

* [addBehaviors](_graph_.graph.md#addbehaviors)
* [addItem](_graph_.graph.md#additem)
* [clear](_graph_.graph.md#clear)
* [collapseCombo](_graph_.graph.md#collapsecombo)
* [createCombo](_graph_.graph.md#createcombo)
* [emit](_graph_.graph.md#emit)
* [expandCombo](_graph_.graph.md#expandcombo)
* [findIdByState](_graph_.graph.md#findidbystate)
* [fitCenter](_graph_.graph.md#fitcenter)
* [fitView](_graph_.graph.md#fitview)
* [focusItem](_graph_.graph.md#focusitem)
* [getComboData](_graph_.graph.md#getcombodata)
* [getEdgeData](_graph_.graph.md#getedgedata)
* [getEvents](_graph_.graph.md#getevents)
* [getNodeData](_graph_.graph.md#getnodedata)
* [getSpecification](_graph_.graph.md#getspecification)
* [hideItem](_graph_.graph.md#hideitem)
* [layout](_graph_.graph.md#layout)
* [move](_graph_.graph.md#move)
* [moveTo](_graph_.graph.md#moveto)
* [off](_graph_.graph.md#off)
* [on](_graph_.graph.md#on)
* [once](_graph_.graph.md#once)
* [read](_graph_.graph.md#read)
* [removeBehaviors](_graph_.graph.md#removebehaviors)
* [removeItem](_graph_.graph.md#removeitem)
* [setItemState](_graph_.graph.md#setitemstate)
* [setMode](_graph_.graph.md#setmode)
* [showItem](_graph_.graph.md#showitem)
* [uncombo](_graph_.graph.md#uncombo)
* [updateBehavior](_graph_.graph.md#updatebehavior)
* [updateItem](_graph_.graph.md#updateitem)
* [updateSpecification](_graph_.graph.md#updatespecification)
* [zoom](_graph_.graph.md#zoom)
* [zoomTo](_graph_.graph.md#zoomto)

## Constructors

###  constructor

\+ **new Graph**(`spec`: Specification‹B›): *[Graph](_graph_.graph.md)*

*Defined in [src/runtime/graph.ts:26](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | Specification‹B› |

**Returns:** *[Graph](_graph_.graph.md)*

## Properties

###  hooks

• **hooks**: *Hooks*

*Defined in [src/runtime/graph.ts:19](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L19)*

## Methods

###  addBehaviors

▸ **addBehaviors**(`behaviors`: BehaviorOptionsOf‹B›[], `modes`: string | string[]): *void*

*Defined in [src/runtime/graph.ts:374](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L374)*

Add behavior(s) to mode(s).

**`group`** Interaction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`behaviors` | BehaviorOptionsOf‹B›[] | behavior names or configs |
`modes` | string &#124; string[] | mode names |

**Returns:** *void*

___

###  addItem

▸ **addItem**(`itemType`: ITEM_TYPE, `models`: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[], `stack?`: boolean): *boolean*

*Defined in [src/runtime/graph.ts:235](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L235)*

Add an item or items to the graph.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemType` | ITEM_TYPE | item type |
`models` | NodeUserModel &#124; EdgeUserModel &#124; ComboUserModel &#124; NodeUserModel[] &#124; EdgeUserModel[] &#124; ComboUserModel[] | - |
`stack?` | boolean | whether push this operation to stack |

**Returns:** *boolean*

whether success

___

###  clear

▸ **clear**(): *void*

*Defined in [src/runtime/graph.ts:102](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L102)*

Clear the graph, means remove all the items on the graph.

**Returns:** *void*

___

###  collapseCombo

▸ **collapseCombo**(`comboId`: string | number, `stack?`: boolean): *void*

*Defined in [src/runtime/graph.ts:329](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L329)*

Collapse a combo.

**`group`** Combo

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`comboId` | string &#124; number | combo id or item |
`stack?` | boolean | - |

**Returns:** *void*

___

###  createCombo

▸ **createCombo**(`combo`: string | ComboUserModel, `childrenIds`: string[], `stack?`: boolean): *void*

*Defined in [src/runtime/graph.ts:313](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L313)*

Create a new combo with existing child nodes and combos.

**`group`** Combo

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`combo` | string &#124; ComboUserModel | combo ID or Combo model |
`childrenIds` | string[] | id array of children of the new combo |
`stack?` | boolean | - |

**Returns:** *void*

___

###  emit

▸ **emit**(`evt`: string, ...`args`: any[]): *void*

*Inherited from [Graph](_graph_.graph.md).[emit](_graph_.graph.md#emit)*

Defined in node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:25

触发一个事件

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`evt` | string | - |
`...args` | any[] |   |

**Returns:** *void*

___

###  expandCombo

▸ **expandCombo**(`comboId`: string | number, `stack?`: boolean): *void*

*Defined in [src/runtime/graph.ts:337](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L337)*

Expand a combo.

**`group`** Combo

**Parameters:**

Name | Type |
------ | ------ |
`comboId` | string &#124; number |
`stack?` | boolean |

**Returns:** *void*

___

###  findIdByState

▸ **findIdByState**‹**T**›(`itemType`: ITEM_TYPE, `state`: string, `additionalFilter?`: function): *string[]*

*Defined in [src/runtime/graph.ts:223](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L223)*

Find items which has the state.

**`group`** Item

**Type parameters:**

▪ **T**: *IItem*

**Parameters:**

▪ **itemType**: *ITEM_TYPE*

item type

▪ **state**: *string*

state name

▪`Optional`  **additionalFilter**: *function*

additional filter function

▸ (`item`: IItem): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | IItem |

**Returns:** *string[]*

items that is the type and has the state

___

###  fitCenter

▸ **fitCenter**(`animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:172](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L172)*

Fit the graph center to the view center.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  fitView

▸ **fitView**(`padding?`: Padding, `rules?`: FitViewRules, `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:163](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L163)*

Fit the graph content to the view.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`padding?` | Padding | padding while fitting |
`rules?` | FitViewRules | rules for fitting |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  focusItem

▸ **focusItem**(`ids`: string | number | (string | number)[], `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:182](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L182)*

Move the graph to make the item align the view center.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ids` | string &#124; number &#124; (string &#124; number)[] | - |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  getComboData

▸ **getComboData**(`condition`: string | Function): *ICombo | undefined*

*Defined in [src/runtime/graph.ts:212](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L212)*

Find an combo's inner data according to id or function.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`condition` | string &#124; Function | id or condition function |

**Returns:** *ICombo | undefined*

result combo

___

###  getEdgeData

▸ **getEdgeData**(`condition`: string | Function): *IEdge | undefined*

*Defined in [src/runtime/graph.ts:203](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L203)*

Find an edge's inner data according to id or function.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`condition` | string &#124; Function | id or condition function |

**Returns:** *IEdge | undefined*

result edge

___

###  getEvents

▸ **getEvents**(): *Record‹string, EventType[]›*

*Inherited from [Graph](_graph_.graph.md).[getEvents](_graph_.graph.md#getevents)*

Defined in node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:32

**Returns:** *Record‹string, EventType[]›*

___

###  getNodeData

▸ **getNodeData**(`condition`: string | Function): *INode | undefined*

*Defined in [src/runtime/graph.ts:194](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L194)*

Find a node's inner data according to id or function.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`condition` | string &#124; Function | id or condition function |

**Returns:** *INode | undefined*

result node

___

###  getSpecification

▸ **getSpecification**(): *Specification‹B›*

*Defined in [src/runtime/graph.ts:80](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L80)*

Get the copy of specs(configurations).

**Returns:** *Specification‹B›*

graph specs

___

###  hideItem

▸ **hideItem**(`ids`: string | number | (string | number)[]): *void*

*Defined in [src/runtime/graph.ts:290](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L290)*

Hide the item(s).

**`group`** Item

**Parameters:**

Name | Type |
------ | ------ |
`ids` | string &#124; number &#124; (string &#124; number)[] |

**Returns:** *void*

___

###  layout

▸ **layout**(`cfg?`: LayoutCommonConfig, `align?`: GraphAlignment, `canvasPoint?`: Point, `stack?`: boolean): *void*

*Defined in [src/runtime/graph.ts:351](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L351)*

Layout the graph (with current configurations if cfg is not assigned).

**`group`** Layout

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cfg?` | LayoutCommonConfig | layout configurations. if assigned, the layout spec of the graph will be updated in the same time |
`align?` | GraphAlignment | align the result |
`canvasPoint?` | Point | align the result |
`stack?` | boolean | push it into stack |

**Returns:** *void*

___

###  move

▸ **move**(`dx`: number, `dy`: number, `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:114](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L114)*

Move the graph with a relative vector.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dx` | number | x of the relative vector |
`dy` | number | y of the relative vector |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  moveTo

▸ **moveTo**(`x`: number, `y`: number, `alignment`: GraphAlignment, `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:127](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L127)*

Move the graph and align to a point.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | number | position on the canvas to align |
`y` | number | position on the canvas to align |
`alignment` | GraphAlignment | alignment of the graph content |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  off

▸ **off**(`evt?`: string, `callback?`: Function): *this*

*Inherited from [Graph](_graph_.graph.md).[off](_graph_.graph.md#off)*

Defined in node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:31

取消监听一个事件，或者一个channel

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`evt?` | string | - |
`callback?` | Function |   |

**Returns:** *this*

___

###  on

▸ **on**(`evt`: string, `callback`: Function, `once?`: boolean): *this*

*Inherited from [Graph](_graph_.graph.md).[on](_graph_.graph.md#on)*

Defined in node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:13

监听一个事件

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`evt` | string | - |
`callback` | Function | - |
`once?` | boolean |   |

**Returns:** *this*

___

###  once

▸ **once**(`evt`: string, `callback`: Function): *this*

*Inherited from [Graph](_graph_.graph.md).[once](_graph_.graph.md#once)*

Defined in node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:19

监听一个事件一次

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`evt` | string | - |
`callback` | Function |   |

**Returns:** *this*

___

###  read

▸ **read**(`data`: GraphData): *void*

*Defined in [src/runtime/graph.ts:91](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L91)*

Input data and render the graph.
If there is old data, diffs and changes it.

**`group`** Data

**Parameters:**

Name | Type |
------ | ------ |
`data` | GraphData |

**Returns:** *void*

___

###  removeBehaviors

▸ **removeBehaviors**(`behaviorKeys`: string[], `modes`: string | string[]): *void*

*Defined in [src/runtime/graph.ts:394](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L394)*

Remove behavior(s) from mode(s).

**`group`** Interaction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`behaviorKeys` | string[] | - |
`modes` | string &#124; string[] | mode names |

**Returns:** *void*

___

###  removeItem

▸ **removeItem**(`itemType`: ITEM_TYPE, `ids`: string | number | (string | number)[], `stack?`: boolean): *boolean*

*Defined in [src/runtime/graph.ts:251](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L251)*

Remove an item or items from the graph.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemType` | ITEM_TYPE | - |
`ids` | string &#124; number &#124; (string &#124; number)[] | - |
`stack?` | boolean | whether push this operation to stack |

**Returns:** *boolean*

whether success

___

###  setItemState

▸ **setItemState**(`ids`: string | number | (string | number)[], `state`: string, `value`: boolean): *void*

*Defined in [src/runtime/graph.ts:301](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L301)*

Set state for the item.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ids` | string &#124; number &#124; (string &#124; number)[] | - |
`state` | string | the state name |
`value` | boolean | state value |

**Returns:** *void*

___

###  setMode

▸ **setMode**(`mode`: string): *void*

*Defined in [src/runtime/graph.ts:363](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L363)*

Switch mode.

**`group`** Interaction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mode` | string | mode name |

**Returns:** *void*

___

###  showItem

▸ **showItem**(`ids`: string | number | (string | number)[]): *void*

*Defined in [src/runtime/graph.ts:281](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L281)*

Show the item(s).

**`group`** Item

**Parameters:**

Name | Type |
------ | ------ |
`ids` | string &#124; number &#124; (string &#124; number)[] |

**Returns:** *void*

___

###  uncombo

▸ **uncombo**(`comboId`: string | number, `stack?`: boolean): *void*

*Defined in [src/runtime/graph.ts:321](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L321)*

dissolve combo

**`group`** Combo

**Parameters:**

Name | Type |
------ | ------ |
`comboId` | string &#124; number |
`stack?` | boolean |

**Returns:** *void*

___

###  updateBehavior

▸ **updateBehavior**(`behavior`: BehaviorObjectOptionsOf‹B›, `mode?`: string): *void*

*Defined in [src/runtime/graph.ts:417](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L417)*

Update a behavior on a mode.

**`group`** Interaction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`behavior` | BehaviorObjectOptionsOf‹B› | behavior configs, whose name indicates the behavior to be updated |
`mode?` | string | mode name |

**Returns:** *void*

___

###  updateItem

▸ **updateItem**(`itemType`: ITEM_TYPE, `models`: Partial‹NodeUserModel› | Partial‹EdgeUserModel› | Partial‹ComboUserModel | Partial‹NodeUserModel›[] | Partial‹EdgeUserModel›[] | Partial‹ComboUserModel›[]›, `stack?`: boolean): *boolean*

*Defined in [src/runtime/graph.ts:266](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L266)*

Update an item or items on the graph.

**`group`** Item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemType` | ITEM_TYPE | - |
`models` | Partial‹NodeUserModel› &#124; Partial‹EdgeUserModel› &#124; Partial‹ComboUserModel &#124; Partial‹NodeUserModel›[] &#124; Partial‹EdgeUserModel›[] &#124; Partial‹ComboUserModel›[]› | - |
`stack?` | boolean | 本次操作是否入栈，默认为 true |

**Returns:** *boolean*

___

###  updateSpecification

▸ **updateSpecification**(`spec`: Specification‹B›): *void*

*Defined in [src/runtime/graph.ts:72](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L72)*

Update the specs(configurations).

**Parameters:**

Name | Type |
------ | ------ |
`spec` | Specification‹B› |

**Returns:** *void*

___

###  zoom

▸ **zoom**(`ratio`: number, `center?`: Point, `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:139](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L139)*

Zoom the graph with a relative ratio.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ratio` | number | relative ratio to zoom |
`center?` | Point | zoom center |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*

___

###  zoomTo

▸ **zoomTo**(`toRatio`: number, `center?`: Point, `animateCfg?`: AnimateCfg): *void*

*Defined in [src/runtime/graph.ts:151](https://github.com/antvis/G6/blob/6880a3aad7/packages/g6/src/runtime/graph.ts#L151)*

Zoom the graph to a specified ratio.

**`group`** View

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`toRatio` | number | specified ratio |
`center?` | Point | zoom center |
`animateCfg?` | AnimateCfg | animation configurations |

**Returns:** *void*
