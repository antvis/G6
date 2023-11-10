---
title: Graph Methods
order: 1
---

## Graph Configurations (Specification)

### getSpecification

Get a copy of the current graph configuration spec.

• **Type**: () => [`Specification`](Specification.zh.md)<`B`, `T`\>

### updateSpecification

Update the current graph configuration spec.

• **Type**: (`spec`: [`Specification`](Specification.zh.md)<`B`, `T`\>) => [`Specification`](Specification.zh.md)<`B`, `T`\>

• **Parameters**: The incremental configuration to update.

### updateTheme

Update the theme section in the current graph configuration spec.

• **Type**: (`theme`: `ThemeOptionsOf`<`T`\>) => `void`

• **Parameters**: The theme configuration to update.

### updateMapper

Update the mapper for nodes/edges/combos and re-render the related items.

• **Type**: (`type`, `mapper`): `void`

• **Parameters**:

| Name     | Type                                          | Description                |
| :------- | :-------------------------------------------- | :------------------------- |
| `type`   | `ITEM_TYPE`                                   | The type of item to update |
| `mapper` | `NodeMapper` \| `EdgeMapper` \| `ComboMapper` | The updated mapper         |

### updateStateConfig

Update the state style configuration for nodes/edges/combos and re-render the items in the corresponding states.

• **Type**: (`itemType`, `stateConfig`, `updateType?`): `void`

• **Parameters**:

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default value    | Description                                                                                                      |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `itemType`    | `ITEM_TYPE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`      | The type of items to update                                                                                      |
| `stateConfig` | { `[stateName: string]`: (`data`: [`NodeInnerModel`](../data/NodeInnerModel.en.md)) => [`NodeDisplayModel`](../data/NodeDisplayModel.en.md) \| `NodeShapesEncode`; } \| { `[stateName: string]`: (`data`: [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)) => [`EdgeDisplayModel`](../data/EdgeDisplayModel.en.md) \| `EdgeShapesEncode`; } \| { `[stateName: string]`: (`data`: [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => [`ComboDisplayModel`](../data/ComboDisplayModel.en.md) \| `ComboShapesEncode`; } | `undefined`      | The updated state style configuration                                                                            |
| `updateType`  | `"replace"` \| `"mergeReplace"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `'mergeReplace'` | `'replace'` means replacing directly, `'mergeReplace'` means merging with the original mapper and then replacing |

## Data

### read

Read and render the data for the first time.

• **Type**: (`data`: [`GraphData`](GraphData.zh.md)) => `void`

• **Parameters**:

| Name   | Type                           |
| :----- | :----------------------------- |
| `data` | [`GraphData`](GraphData.zh.md) |

### addData

Add data of a specific type.

• **Type**:

```typescript
 (itemType: ITEM_TYPE, model: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[]) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[]
```

• **Parameters**:
| Name | Type | Description |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `itemType` | `ITEM_TYPE` | The type of items to add. This means that only one type of item can be added at a time. It is recommended to add nodes first and then add edges to avoid adding edges when the corresponding nodes do not exist |
| `model` | [`NodeUserModel`](../data/NodeUserModel.en.md) \| [`EdgeUserModel`](../data/EdgeUserModel.en.md) \| [`ComboUserModel`](../data/ComboUserModel.en.md) \| [`NodeUserModel`](../data/NodeUserModel.en.md)[] \| [`EdgeUserModel`](../data/EdgeUserModel.en.md)[] \| [`ComboUserModel`](../data/ComboUserModel.en.md)[] | The user data to add, which can be a single data or an array |

• **Returns**: The added data

### changeData

Replace the data completely. There are two ways to replace the data: `"replace"` means completely discarding the original data and using the new data; `"mergeReplace"` means that if the new data contains nodes/edges/combos with certain ids that already exist in the canvas, the original data will be merged with the corresponding data and then replaced by the new data.

• **Type**:

```typescript
(data: GraphData, type: "replace" | "mergeReplace") => void
```

• **Parameters**:
| Name | Type | Description |
| :----- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [`GraphData`](GraphData.zh.md) | The new data |
| `type` | `"replace"` \| `"mergeReplace"` | The way to replace the data. `"replace"` means completely discarding the original data and using the new data; `"mergeReplace"` means that if the new data contains nodes/edges/combos with certain ids that already exist in the canvas, |

### updateData

Update partial data of a specific type.

• **Type**:

```typescript
(itemType: ITEM_TYPE, model: Partial<NodeUserModel> | Partial<EdgeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[]
```

• **Parameters**:

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                       | Description                                                                 |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `itemType` | `ITEM_TYPE`                                                                                                                                                                                                                                                                                                                                                                                | The type of data to update. Only one type of data can be updated at a time. |
| `model`    | `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\> \| `Partial`<[`EdgeUserModel`](../data/EdgeUserModel.en.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\>[] \| `Partial`<[`EdgeUserModel`](../data/EdgeUserModel.en.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\>[]\> | The data to update. It can be a single item or an array.                    |

• **Returns**: Updated data

[`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md) \| [`NodeInnerModel`](../data/NodeInnerModel.en.md)[] \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)[] \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)[]

### removeData

Remove one or more items of the same type.

• **Type**: (`itemType`: `ITEM_TYPE`, `id`: `ID` \| `ID`[]) => `void`

• **Parameters**:
| Name | Type | Description |
| :--------- | :------------- | :----------------------------------- |
| `itemType` | `ITEM_TYPE` | The type of data to remove. `'node'` \| `'edge'` \| `'combo'` |
| `id` | `ID` \| `ID`[] | The id or ids of the data to remove |

### getAllNodesData

Get all node data (inner model).

• **Type**: () => [`NodeInnerModel`](../data/NodeInnerModel.en.md)[]

### getAllEdgesData

Get all edge data (inner model).

• **Type**: () => [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)[]

### getAllCombosData

Get all combo data (inner model).

• **Type**: () => [`ComboInnerModel`](../data/ComboInnerModel.en.md)[]

### getNodeData

Get node data (inner model) with the specified id or condition.

• **Type**: (`condition`: `Function` \| `ID`) => [`NodeInnerModel`](../data/NodeInnerModel.en.md)

• **Parameters**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | The id or condition function of the node. The condition function takes the inner model of the node as its parameter |

### getEdgeData

Get edge data (inner model) with the specified id or condition.

• **Type**: (`condition`: `Function` \| `ID`) => [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)

• **Parameters**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | The id or condition function of the edge. The condition function takes the inner model of the edge as its parameter |

### getComboData

Get combo data (inner model) with the specified id or condition.

• **Type**: (`condition`: `Function` \| `ID`) => [`ComboInnerModel`](../data/ComboInnerModel.en.md)

• **Parameters**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | The id or condition function of the combo. The condition function takes the inner model of the combo as its parameter. |

### getNeighborNodesData

Get the one-hop neighbor node data (inner model) of the specified node.

• **Type**: (`nodeId`: `ID`, `direction?`: `"both"` \| `"in"` \| `"out"`) => [`NodeInnerModel`](../data/NodeInnerModel.en.md)[]

• **Parameters**:
| Name | Type | Description |
| :----------- | :---------------------------- | :------------------- |
| `nodeId` | `ID` | The id of the source node |
| `direction?` | `"both"` \| `"in"` \| `"out"` | The type/direction of the neighbors, including all neighbors ("both"), neighbors pointing to the source node ("in"), neighbors starting from the source node ("out")|

• **Returns**: `NodeModel[]`, The neighbor node data (inner model).

### getRelatedEdgesData

Get the one-hop neighbor edge data (inner model) of the specified node.

• **Type**: (`nodeId`: `ID`, `direction?`: `"both"` \| `"in"` \| `"out"`) => [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)[]

• **Parameters**:
| Name | Type | Description |
| :----------- | :---------------------------- | :------------------- |
| `nodeId` | `ID` | The id of the source node |
| `direction?` | `"both"` \| `"in"` \| `"out"` | The type/direction of the neighbors, including all neighbors ("both"), neighbors pointing to the source node ("in"), neighbors starting from the source node ("out") |

• **Returns**: `EdgeModel[]`, The neighbor edge data (inner model).

### getNearEdgesData

Get the edge data (inner model) related to the specified node.

• **Type**: (`nodeId`: `ID`) => [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)[]

• **Parameters**:
| Name | Type | Description |
| :------- | :--- | :--------------- |
| `nodeId` | `ID` | The id of begin node |

• **Returns**: `EdgeModel[]`, the data model (inner model) of the nearby edges.

### updateNodePosition

Update the position of a single or multiple nodes. This API does not update other styles passed in, in order to achieve better performance in position updates.

• **Type**:

```javascript
 (models: Partial<NodeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<ComboUserModel>[]>, upsertAncestors?: boolean, disableAnimate?: boolean, callback?: (model: NodeModel | EdgeModel | ComboModel, canceled?: boolean) => void) => NodeModel | ComboModel | NodeModel[] | ComboModel[]
```

• **Parameters**:

| Name               | Type                                                                                                                                                                                                                                                         | Description                                                                                                                                                        |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `models`           | `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\>[]\> | The configuration options for updating, each data contains the node id and data, including x and y information                                                     |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                                                                                    | Whether to update ancestor combo at the same time                                                                                                                  |
| `disableAnimate?`  | `boolean`                                                                                                                                                                                                                                                    | Whether to disable animation                                                                                                                                       |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md), `canceled?`: `boolean`) => `void`                                                      | Callback function after the position update is complete. The rendering of position update may be asynchronous, and this callback can be used for post-update logic |

### clear

Clear the graph content, i.e., remove all items.

• **Type**: () => `void`

## Renderer

### changeRenderer

Switch the renderer at runtime.

• **Type**: (`type`: `RendererName`) => `void`

• **Parameters**:
| Name | Type | Description |
| :----- | :------------- | :------------ |
| `type` | `RendererName` | The name of the renderer, which can be 'canvas', 'webgl', 'svg', or 'webgl-3d'. When using 'webgl-3d', the corresponding interaction and item types should be used. |

## Item

### findIdByState

Get a list of item IDs with the specified state and type.

• **Type**: (`itemType`: `ITEM_TYPE`, `state`: `string`, `value?`: `string` \| `boolean`, `additionalFilter?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => `boolean`) => `ID`[]

• **Parameters**:

| Name                | Type                                                                                                                                                                               | Description                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `itemType`          | `ITEM_TYPE`                                                                                                                                                                        | The type of the item                                                        |
| `state`             | `string`                                                                                                                                                                           | The name of the state                                                       |
| `value?`            | `string` \| `boolean`                                                                                                                                                              | The value of the state, defaults to `true`                                  |
| `additionalFilter?` | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => `boolean` | Additional filter, parameter is data that satisfies the state (inner model) |

• **Returns**: `ID`[], a list of item IDs that meet the conditions.

### getItemAllStates

Get all the state names with a value of `true` for the specified item.

• **Type**: (`id`: `ID`) => `string`[]

• **Parameters**:

| Name | Type | Description             |
| :--- | :--- | :---------------------- |
| `id` | `ID` | The specified item's id |

• **Returns**: `string[]`, a list of state names.

### getItemState

Get the value of a specified state for a specified item.

• **Type**: (`id`: `ID`, `state`: `string`) => `string` \| `boolean`

• **Parameters**:

| Name    | Type     | Description              |
| :------ | :------- | :----------------------- |
| `id`    | `ID`     | The specified item ID    |
| `state` | `string` | The specified state name |

• **Returns**: `string \| boolean`, the value of the specified state for the specified item.

### setItemState

Set the state of a single or multiple items.

• **Type**: (`ids`: `ID` \| `ID`[], `state`: `string`, `value`: `boolean`) => `void`

• **Parameters**:

| Name    | Type           | Description                          |
| :------ | :------------- | :----------------------------------- |
| `ids`   | `ID` \| `ID`[] | The ID or IDs of the items to be set |
| `state` | `string`       | The state name to be set             |
| `value` | `boolean`      | The value of the state               |

### clearItemState

Clear the state of specified single or multiple items.

• **Type**: (`ids`: `ID` \| `ID`[], `states?`: `string`[]) => `void`

• **Parameters**:

| Name      | Type           | Description                               |
| :-------- | :------------- | :---------------------------------------- |
| `ids`     | `ID` \| `ID`[] | The ID or IDs of the items to be cleared  |
| `states?` | `string`[]     | Optional list of item names to be cleared |

### showItem

Show a single or multiple items. Corresponds to [hideItem](#hideitem).

• **Type**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **Parameters**:

| Name              | Type           | Description                                       |
| :---------------- | :------------- | :------------------------------------------------ |
| `ids`             | `ID` \| `ID`[] | The ID or IDs of the items to be shown            |
| `disableAnimate?` | `boolean`      | Whether to disable animation, defaults to `false` |

### hideItem

Hide a single or multiple items. Corresponds to [showItem](#showitem).

• **Type**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **Parameters**:

| Name              | Type           | Description                                       |
| :---------------- | :------------- | :------------------------------------------------ |
| `ids`             | `ID` \| `ID`[] | The ID or IDs of the items to be hidden           |
| `disableAnimate?` | `boolean`      | Whether to disable animation, defaults to `false` |

### getItemVisible

Get the visibility of a specified item.

• **Type**: (`id`: `ID`) => `boolean`

• **Parameters**:

| Name | Type | Description |
| :--- | :--- | :---------- |
| `id` | `ID` | The item ID |

### frontItem

Move the specified single or multiple items to the front layer. Note that the layer of nodes is always higher than that of edges.

• **Type**: (`ids`: `ID` \| `ID`[]) => `void`

• **Parameters**:

| Name  | Type           | Description                               |
| :---- | :------------- | :---------------------------------------- |
| `ids` | `ID` \| `ID`[] | The ID or IDs of the items to be adjusted |

### backItem

Move the specified single or multiple items to the back layer. Note that the layer of nodes is always higher than that of edges.

• **Type**: (`ids`: `ID` \| `ID`[]) => `void`

• **Parameters**:

| Name  | Type           | Description                               |
| :---- | :------------- | :---------------------------------------- |
| `ids` | `ID` \| `ID`[] | The ID or IDs of the items to be adjusted |

## Combo

### addCombo

Add a new combo and update the specified child nodes by moving them from the original parent combo to the new combo. Essentially, it is addData, but with some adjustments to the Combo hierarchy tree based on the added combo data.

• **Type**: (`model`: [`ComboUserModel`](../data/ComboUserModel.en.md), `childrenIds`: `ID`[]) => [`ComboInnerModel`](../data/ComboInnerModel.en.md)

• **Parameters**:

| Name          | Type                                             | Description            |
| :------------ | :----------------------------------------------- | :--------------------- |
| `model`       | [`ComboUserModel`](../data/ComboUserModel.en.md) | Combo data (user data) |
| `childrenIds` | `ID`[]                                           | List of child node IDs |

• **Returns**: [`ComboInnerModel`](../data/ComboInnerModel.en.md), the newly added Combo data (inner model).

### collapseCombo

Collapse the specified single or multiple combos. Corresponds to [expandCombo](#expandCombo).

• **Type**: (`comboIds`: `ID` \| `ID`[]) => `void`

• **Parameters**:

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `comboIds` | The ID or IDs of the combos to be collapsed |

### expandCombo

Expand the specified single or multiple combos. Corresponds to [collapseCombo](#collapseCombo).

• **Type**: (`comboIds`: `ID` \| `ID`[]) => `void`

• **Parameters**:

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `comboIds` | The ID or IDs of the combos to be expanded |

### moveCombo

Move a single or multiple combos by a relative distance (dx, dy). This API will not update other styles to improve the performance of updating the position. In fact, since the position of a combo is determined by the distribution and position of its internal child items, this API actually updates the position of the successor items of the specified combo to affect the combo and achieve the purpose of moving the combo, rather than directly updating the position of the combo.

• **Type**: (`ids`: `ID`[], `dx`: `number`, `dy`: `number`, `upsertAncestors?`: `boolean`, `callback?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md), `canceled?`: `boolean`) => `void`) => [`ComboInnerModel`](../data/ComboInnerModel.en.md)[]

• **Parameters**:

| Name               | Type                                                                                                                                                                                                    | Description                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------- |
| `ids`              | `ID`[]                                                                                                                                                                                                  | The ID or IDs of the combos to be updated        |
| `dx`               | `number`                                                                                                                                                                                                | The relative distance to move on the x-axis      |
| `dy`               | `number`                                                                                                                                                                                                | The relative distance to move on the y-axis      |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                               | 是 Whether to update the ancestor combos as well |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md), `canceled?`: `boolean`) => `void` | Callback function after the update is complete   |

• **Returns**: `ComboModel[]`, the updated Combo data (inner model).

### updateComboPosition

Updates the position of one or more Combos to a specified position (x, y). Similar to the corresponding API [updateNodePosition](#updatenodeposition) for nodes.

• **Type**: (`models`: `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => `void`) => [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md) \| [`NodeInnerModel`](../data/NodeInnerModel.en.md)[] \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)[]

• **Parameters**:

| Name               | Type                                                                                                                                                                                                                                                           | Description                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `models`           | `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.en.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.en.md)\>[]\> | An object with the Combo id and data to be updated, and the data contains the new `x` and `y` information |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                                                                                      | Whether to update the ancestor Combos at the same time                                                    |
| `disableAnimate?`  | `boolean`                                                                                                                                                                                                                                                      | Whether to disable animation                                                                              |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => `void`                                                                                | The callback function after the update is completed                                                       |

• **Returns**: [`ComboInnerModel`](../data/ComboInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md)[], the updated Combo data (inner model).

### getComboChildrenData

Gets the data of the child items (nodes/combos) of a Combo (inner model).

• **Type**: (`comboId`: `ID`) => ([`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md))[]

• **Parameters**:

| Name      | Type     |
| :-------- | :------- |
| `comboId` | Combo id |

• **Returns**: ([`NodeInnerModel`](../data/NodeInnerModel.en.md) \| [`ComboInnerModel`](../data/ComboInnerModel.en.md))[] the data of the children (inner model).

## Layout

### layout

Performs layout. If no parameters are passed, the layout is re-executed according to the layout configuration in the spec of the graph instance. If parameters are passed, the layout configuration of the graph is updated and the layout is re-executed.

• **Type**: (`options?`: `LayoutOptions`, `disableAnimate?`: `boolean`) => `Promise`<`void`\>

• **Parameters**:

| Name              | Type            | Description                                                                  |
| :---------------- | :-------------- | :--------------------------------------------------------------------------- |
| `options?`        | `LayoutOptions` | Layout configuration                                                         |
| `disableAnimate?` | `boolean`       | Whether to disable the interpolation animation after the layout is completed |

• **Returns**: `Promise`<`void`\>, the layout may be executed asynchronously, and the Promise of the layout execution is returned.

### stopLayout

Stops the layout. It is suitable for layouts with iterative animations, such as `'force'`, which stops the iteration of force-directed layout. It is generally used to manually stop iterative animations when the layout iteration time is too long, for example, by calling it in the click event listener of the canvas/node.

• **Type**: () => `void`

## Interactions and Events

### on

Listens to an event.

• **Type**: (`evtName`, `listener`: (`evt`: `IG6GraphEvent`) => `void`): `void`

• **Parameters**:

| Name       | Type                                                                    | Description           |
| :--------- | :---------------------------------------------------------------------- | :-------------------- |
| `evtName`  | `string`                                                                | The name of the event |
| `listener` | (`evt`: [`IG6GraphEvent`](../behaviors//IG6GraphEvent.zh.md)) => `void` | The listener function |

### once

Listens to an event only once, and once it is completed, it is destroyed.

• **Type**: (`evtName`, `listener`: (`evt`: `IG6GraphEvent`) => `void`): `void`

• **Parameters**:

| Name       | Type                                                                    | Description           |
| :--------- | :---------------------------------------------------------------------- | :-------------------- |
| `evtName`  | `string`                                                                | The name of the event |
| `listener` | (`evt`: [`IG6GraphEvent`](../behaviors//IG6GraphEvent.zh.md)) => `void` | The listener function |

### off

Cancels a listener or all listeners under an event name.

• **Type**: (`evtName`: `string`, `listener?`: (`evt: IG6GraphEvent`) => `void`): `void`

• **Parameters**:

| Name        | Type       | Description                                                                       |
| :---------- | :--------- | :-------------------------------------------------------------------------------- |
| `evtName`   | `string`   | The name of the event                                                             |
| `listener?` | `Function` | The listener handle. If not specified, cancels all listeners related to `evtName` |

### emit

Triggers an event.

• **Type**: (`evtName`, `param`: `any`): `void`

• **Parameters**:

| Name      | Type     | Description                                                                                                                                                                                                                                                                                  |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `evtName` | `string` | The name of the event to trigger. Besides triggering interaction events manually, you can also trigger any custom event by specifying any string as `evtName` and then listen to the corresponding event name through `graph.on` to achieve the purpose of custom events and their listeners |
| `param`   | `any`    | The parameter associated with the triggered event. The content may vary depending on the event type                                                                                                                                                                                          |

### getMode

G6 graph provides different interaction mode configurations, which can be understood as interaction groups. Different interactions are configured under different modes to quickly switch between different interaction groups. For example, in read-only mode, you can only drag and zoom the canvas. In edit mode, you can create edges, etc. Use [`setMode`](#setmode) to switch between interaction modes and [`getMode`](#getmode to get the current interaction mode.

• **Type**: () => `string`

### setMode

G6 graph provides different interaction mode configurations, which can be understood as interaction groups. Different interactions are configured under different modes to quickly switch between different interaction groups. For example, in read-only mode, you can only drag and zoom the canvas. In edit mode, you can create edges, etc. Use [`setMode`](#setmode) to switch between interaction modes and [`getMode`](#getmode) to get the current interaction mode.

• **Type**: (`mode`: `string`) => `void`

| Name   | Type     | Description                                                                                          |
| :----- | :------- | :--------------------------------------------------------------------------------------------------- |
| `mode` | `string` | The mode name, corresponding to the key in the modes object in the graph instance configuration spec |

### addBehaviors

Adds one or more interactions to the specified mode (default mode by default).

• **Type**: (`behaviors`: `BehaviorOptionsOf`<`B`\> \| `BehaviorOptionsOf`<`B`\>[], `modes`: `string` \| `string`[]) => `void`

• **Parameters**:

| Name        | Type                                                     | Description                                                                              |
| :---------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `behaviors` | `BehaviorOptionsOf`<`B`\> \| `BehaviorOptionsOf`<`B`\>[] | Configuration of one or more interactions                                                |
| `modes`     | `string` \| `string`[]                                   | The interaction mode(s) to which the interaction(s) will be added. Default is `default`. |

### removeBehaviors

Removes an interaction from the specified mode (default mode by `default`).

• **Type**: (`behaviorKeys`: `string`[], `modes`: `string` \| `string`[]) => `void`

• **Parameters**:

| Name           | Type                   | Description                                                                                                                                                                                                                                               |
| :------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `behaviorKeys` | `string`[]             | The key(s) of the interaction(s) in the configuration to be removed. If there is a need to remove or update interactions, a unique key must be given in the configuration so that the corresponding interaction can be found for deletion or modification |
| `modes`        | `string` \| `string`[] | The interaction mode from which the specified interaction(s) will be removed                                                                                                                                                                              |

### updateBehavior

Updates the configuration of an interaction.

• **Type**: (`behavior`: `BehaviorOptionsOf`<`B`\>, `mode?`: `string`) => `void`

• **Parameters**:

| Name       | Type                      | Description                                                                                                                                                                                                                                                                             |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `behavior` | `BehaviorOptionsOf`<`B`\> | The configuration of the interaction to be updated, with a corresponding key in the configuration. If there is a need to remove or update interactions, a unique key must be given in the configuration so that the corresponding interaction can be found for deletion or modification |
| `mode?`    | `string`                  | The name of the interaction mode                                                                                                                                                                                                                                                        |

### drawTransient

Draws a temporary shape, typically used to update temporary shapes during interactions to avoid unnecessary performance overhead of updating shapes in the main graph layer. The principle of using a temporary canvas to improve interaction performance is as follows:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VkT7T4Qzt2gAAAAAAAAAAAAADmJ7AQ/original" />

• **Type**: (`type`: `ITEM_TYPE` \| `SHAPE_TYPE`, `id`: `ID`, `config`: `any`, `canvas?`: `Canvas`) => `DisplayObject`<`any`, `any`\>

• **Parameters**:

| Name     | Type                        | Description                                                                                                                                                                                         |
| :------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`   | `ITEM_TYPE` \| `SHAPE_TYPE` | The type of the shape or item, such as the shape type name of `'circle'`, `'line'`, or the item type of `'node'`, `'edge'`, `'combo'` to copy existing items to the temporary layer                 |
| `id`     | `ID`                        | The id of the temporary shape for later retrieval. If copying a node/edge/Combo on the current canvas, specify the id of the corresponding item                                                     |
| `config` | `any`                       | The configuration of the shape style, such as size, color, etc. Applicable for drawing temporary shapes instead of copying items, as copying items will directly use the styles of the copied items |

• **Returns**: `DisplayObject`<`any`, `any`\>, the drawn shape object. If copying items, it will return a shape group containing all related shapes.

## View

### zoom

Zooms the graph by a **relative** zoom ratio and a zoom center.

• **Type**: (`ratio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                                                                |
| :-------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ratio`         | `number`                                                                                        | The relative zoom ratio                                                                                                                                    |
| `center?`       | `Point`                                                                                         | The zoom center                                                                                                                                            |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. If an empty object is specified, the default animation parameters will be used. If not specified, no animation will be performed. |

• **Returns**: `Promise`<`void`\>, since zooming with animation is performed asynchronously, it returns a Promise.

### zoomTo

Zooms the graph to a **specified** zoom ratio and a zoom center.

• **Type**: (`toRatio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                                                               |
| :-------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toRatio`       | `number`                                                                                        | The specified absolute zoom ratio                                                                                                                         |
| `center?`       | `Point`                                                                                         | The zoom center                                                                                                                                           |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. If an empty object is specified, the default animation parameters will be used. If not specified, no animation will be performed |

• **Returns**: `Promise`<`void`\>, since zooming with animation is performed asynchronously, it returns a Promise.

### getZoom

Gets the current zoom ratio of the graph.

• **Type**: () => `number`

### translate

给 Moves the graph canvas by a relative distance (`dx`, `dy`).

• **Type**: (`distance`: `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number` }\>, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `distance`      | `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number` }\>                                | **Relative** distance of movement                                                                                       |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed |

• **Returns**: `Promise`<`void`\>, since animated translation is asynchronous, the function returns a Promise.

### translateTo

Moves the content to the specified **absolute** target position (x, y).

• **Type**: (`point`: `PointLike`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `point`         | `PointLike`                                                                                     | Absolute target position                                                                                                |
|                 |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed |

• **Returns**: `Promise`<`void`\>, since animated translation is asynchronous, the function returns a Promise.

### fitCenter

Moves the content to align the center of the content with the center of the current viewport. No scaling is performed.

• **Type**: (`effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed |

• **Returns**: `Promise`<`void`\>, since animated fitting is asynchronous, the function returns a Promise.

### fitView

Moves and scales the content to fit the current viewport size.

• **Type**: (`options?`: { `padding`: `Padding` ; `rules`: `FitViewRules` }, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name              | Type                                                                                            | Description                                                                                                             |
| :---------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `options?`        | `object`                                                                                        | Parameters for fitting the viewport                                                                                     |
| `options.padding` | `Padding`                                                                                       | Spacing around the content to make room for                                                                             |
| `options.rules`   | `FitViewRules`                                                                                  | Rules for fitting the viewport, see below for the types                                                                 |
| `effectTiming?`   | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed |

`FitViewRules`'s type is as follows:

| Name                            | Type                       | Description                                                                                                                                                       |
| :------------------------------ | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onlyOutOfViewport?`            | `boolean`                  | Only performs fitting if the content is out of the viewport                                                                                                       |
| `onlyZoomAtLargerThanViewport?` | `boolean`                  | Only performs fitting if the content is larger than the viewport                                                                                                  |
|                                 |
| `direction?`                    | `'x'` \| `'y'` \| `'both'` | Restricts the scaling direction during fitting. Default is `'both'`                                                                                               |
| `ratioRule?`                    | `'max'` \| `'min'`         | Determines whether to scale based on the larger or smaller ratio in the horizontal and vertical directions                                                        |
| `boundsType?`                   | `'render'` \| `'layout'`   | Fits based on rendered bounding boxes or layout positions. Default is `'render',` `'layout'` is used when layout calculations are completed but rendering updates |

• **Returns**: `Promise`<`void`\>, due to the asynchronous nature of animated fitting, the function returns a Promise.

### focusItem

Translate the canvas to align the specified single or multiple items (average center) to the center of the current viewport.

• **Type**: (`id`: `ID` \| `ID`[], `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **Parameters**:

| Name            | Type                                                                                            | Description                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `id`            | `ID` \| `ID`[]                                                                                  | ID of single or multiple items                                                                                          |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed |

• **Returns**: `Promise`<`void`\>, since the animated translation is asynchronous, the function returns a Promise.

### stopTransformTransition

Stops all translation and scale-related animations.

• **Type**: () => `void`

### getSize

Get the current size of the canvas container.

• **Type**: () => `number`[]

• **Parameters**: `number`[], represents [width, height]

### setSize

Set the size of the current canvas container.

• **Type**: (`size`: `number`[]) => `void`

• **Parameters**:

| Name   | Type       |
| :----- | :--------- |
| `size` | `number`[] |

### getViewportCenter

Get the coordinates of the center point of the current viewport. For example, for a 500 \* 500 container, it will return the center value { x: 250, y: 250 }.

• **Type**: () => `PointLike`

• **Returns**: `PointLike`, which is `{ x: number, y: number }`

### getCanvasByClient

Convert the given browser coordinates to drawing coordinates on the canvas.

• **Type**: (`ClientPoint`: `Point`) => `Point`

• **Parameters**:

| Name          | Type    |
| :------------ | :------ |
| `ClientPoint` | `Point` |

### getCanvasByViewport

Convert the given viewport DOM coordinates to drawing coordinates on the canvas.

• **Type**: (`viewportPoint`: `Point`) => `Point`

• **Parameters**:

| Name            | Type    |
| :-------------- | :------ |
| `viewportPoint` | `Point` |

### getClientByCanvas

Convert the drawing coordinates on the canvas to browser coordinates.

• **Type**: (`canvasPoint`: `Point`) => `Point`

• **Parameters**:

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

### getViewportByCanvas

Convert the drawing coordinates on the canvas to viewport DOM coordinates.

• **Type**: (`canvasPoint`: `Point`) => `Point`

• **Parameters**:

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

### getRenderBBox

Get the bounding box of the specified element. If no element is specified, it represents the overall bounding box of all the currently rendered content.

• **Type**: (`id`: `ID`, `onlyKeyShape?`: `boolean`, `isTransient?`: `boolean`) => `false` \| `AABB`

• **Parameters**:

| Name            | Type      | Description                                                                                                                                                   |
| :-------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`            | `ID`      | ID of the specified element to get the bounding box. If no element is specified, it represents the overall bounding box of all the currently rendered content |
| `onlyKeyShape?` | `boolean` | Whether to only calculate the bounding box of the main keyShape                                                                                               |
| `isTransient?`  | `boolean` | Calculate the bounding box of transient shapes                                                                                                                |

• **Returns**: `false` \| `AABB`. Returns `false` if there is no corresponding element

## Tree Operations

### collapse

Collapse one or multiple subtrees. Corresponds to expanding with [expand](#expand).

• **Type**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **Parameters**:

| Name              | Type           | Description                       |
| :---------------- | :------------- | :-------------------------------- |
| `ids`             | `ID` \| `ID`[] | IDs of root nodes of the subtrees |
| `disableAnimate?` | `boolean`      | Whether to disable animation      |

### expand

Expand one or multiple subtrees. Corresponds to collapsing with [collapse](#collapse).

• **Type**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **Parameters**:

| Name              | Type           | Description                       |
| :---------------- | :------------- | :-------------------------------- |
| `ids`             | `ID` \| `ID`[] | IDs of root nodes of the subtrees |
| `disableAnimate?` | `boolean`      | Whether to disable animation      |

## History Stack

### isHistoryEnabled

### getRedoStack

### getUndoStack

### getStack

### pushStack

### pauseStack

### resumeStack

### startHistoryBatch

### stopHistoryBatch

### executeWithNoStack

### undo

### redo

### cleanHistory

## Free Plugins

### addPlugins

Add free plugins to the graph instance.

• **Type**: (`pluginCfgs`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }[]) => `void`

• **Parameters**:

| Name         | Type                                                                     |
| :----------- | :----------------------------------------------------------------------- |
| `pluginCfgs` | { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }[] |

### removePlugins

Remove plugins from the graph instance. If you want to remove or update a plugin, you should configure a unique key for the plugin to facilitate retrieval during deletion or modification.

• **Type**: (`pluginKeys`: `string`[]) => `void`

• **Parameters**:

| Name         | Type       | Description                   |
| :----------- | :--------- | :---------------------------- |
| `pluginKeys` | `string`[] | Keys of plugins to be removed |

### updatePlugin

Update a specific plugin. If you want to remove or update a plugin, you should configure a unique key for the plugin to facilitate retrieval during deletion or modification.

• **Type**: (`pluginCfg`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }) => `void`

• **Parameters**:

| Name             | Type     | Description                                                                                                 |
| :--------------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| `pluginCfg`      | `Object` | Updated parameters                                                                                          |
| `pluginCfg.key`  | `string` | Unique ID used for retrieval, should be configured when configuring or adding a plugin                      |
| `pluginCfg.type` | `string` | Type name of the plugin, other configurations in `pluginCfg` are the configurations that need to be updated |

## Download

### downloadFullImage

Download an image that contains all the graph content.

• **Type**: (`name?`, `type?`, `imageConfig?`): `void`

• **Parameters**:

| Name                   | Type                   | Description                                 |
| :--------------------- | :--------------------- | :------------------------------------------ |
| `name?`                | `string`               | Name of the downloaded image                |
| `type?`                | `DataURLType`          | Image format type, default is `'image/png'` |
| `imageConfig?`         | `Object`               | Image configuration                         |
| `imageConfig.padding?` | `number` \| `number`[] | Padding around the image when downloading   |

### downloadImage

Download the contents in the window as an image.

• **Type**: (`name?`, `type?`): `void`

• **Parameters**:

| Name    | Type          | Description                                 |
| :------ | :------------ | :------------------------------------------ |
| `name?` | `string`      | Name of the downloaded image                |
| `type?` | `DataURLType` | Image format type, default is `'image/png'` |

### toFullDataURL

Generate the URL of an image that contains all the graph content.

• **Type**: (`type?`, `imageConfig?`): `Promise`<`unknown`\>

• **Parameters**:

| Name                   | Type                   | Description                                 |
| :--------------------- | :--------------------- | :------------------------------------------ |
| `type?`                | `DataURLType`          | Image format type, default is `'image/png'` |
| `imageConfig?`         | `Object`               | Image configuration                         |
| `imageConfig.padding?` | `number` \| `number`[] | Padding around the image when downloading   |

• **Returns**: `Promise`<`string`\>

### toDataURL

Generate the URL of the current window content as an image.

• **Type**: (`type?`): `Promise`<`string`\>

• **Parameters**:

| Name    | Type          | Description                                 |
| :------ | :------------ | :------------------------------------------ |
| `type?` | `DataURLType` | Image format type, default is `'image/png'` |

• **Returns**: `Promise`<`string`\>

## Graph Instance

### setCursor

Set the cursor style. However, the cursor style on the element has a higher priority.

• **Type**: (`cursor`): `void`

• **Parameters**:

| Name     | Type     |
| :------- | :------- |
| `cursor` | `Cursor` |

### destroy

Destroy the current graph instance.

• **Type**: (`callback?`: `Function`) => `void`

• **Parameters**:

| Name        | Type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `callback?` | `Function` | Callback function after destruction |
