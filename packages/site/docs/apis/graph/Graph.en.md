---
title: Graph Methods
order: 1
---

## Graph Configurations (Specification)

### getSpecification

**Type**: `() => Specification<B, T>`

- [Specification](Specification.en.md)

Get a copy of the current graph configuration spec

### updateSpecification

**Type**: `(spec: Specification<B, T>) => Specification<B, T>`

- [Specification](Specification.en.md)

Update the current graph configuration spec

### updateTheme

**Type**: `(theme: ThemeOptionsOf<T>) => void`

Update the theme section in the current graph configuration spec

### updateMapper

**Type**: `(type: ITEM_TYPE, mapper: NodeMapper | EdgeMapper | ComboMapper) => void`

Update the mapper for nodes/edges/combos and re-render the related items

### updateStateConfig

**Type**: `UpdateStateConfig`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateStateConfig
  </summary>

```ts
type UpdateStateConfig = (
  /** The type of items to update */
  itemType: ITEM_TYPE,
  /** The updated state style configuration */
  stateConfig:
    | { [stateName: string]: (data: NodeModel) => NodeDisplayModel | NodeShapesEncode }
    | { [stateName: string]: (data: EdgeModel) => EdgeDisplayModel | EdgeShapesEncode }
    | { [stateName: string]: (data: ComboModel) => ComboDisplayModel | ComboShapesEncode },
  /** 'replace' means replacing directly, 'mergeReplace' means merging with the original mapper and then replacing */
  updateType?: 'replace' | 'mergeReplace',
) => void;
```

</details>

Update the state style configuration for nodes/edges/combos and re-render the items in the corresponding states

## Data

### read

**Type**: `(data: GraphData) => void`

- [GraphData](GraphData.en.md)

Read and render the data for the first time

### addData

**Type**: `AddData`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    AddData
  </summary>

```typescript
type AddData = (
  /** The type of items to add. This means that only one type of item can be added at a time. It is recommended to add nodes first and then add edges to avoid adding edges when the corresponding nodes do not exist */
  itemType: ITEM_TYPE,
  /** The user data to add, which can be a single data or an array */
  model: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[],
) => /** The added data */
NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
```

</details>

Add data of a specific type

### changeData

**Type**: `(data: GraphData, type: 'replace' | 'mergeReplace') => void`

Replace the data completely

- `'replace'`: completely discarding the original data and using the new data

- `'mergeReplace'`: if the new data contains nodes/edges/combos with certain ids that already exist in the canvas, the original data will be merged with the corresponding data and then replaced by the new data

### updateData

**Type**: `UpdateData`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateData
  </summary>

```typescript
type UpdateData = (
  /** The type of items to update. Only one type of item can be updated at a time */
  itemType: ITEM_TYPE,
  /** The data to update. It can be a single item or an array */
  model:
    | Partial<NodeUserModel>
    | Partial<EdgeUserModel>
    | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>,
) => /** The updated data */
NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
```

</details>

- [NodeModel](../data/NodeModel.en.md)

- [NodeUserModel](../data/NodeUserModel.en.md)

- [EdgeModel](../data/EdgeModel.en.md)

- [EdgeUserModel](../data/EdgeUserModel.en.md)

- [ComboModel](../data/ComboModel.en.md)

- [ComboUserModel](../data/ComboUserModel.en.md)

Update partial data of a specific type

### removeData

**Type**: `(itemType: ITEM_TYPE, id: ID | ID[]) => void`

Remove one or more items of the same type

### getAllNodesData

**Type**: `() => NodeModel[]`

- [NodeModel](../data/NodeModel.en.md)

Get all node data (inner model)

### getAllEdgesData

**Type**: `() => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.en.md)

Get all edge data (inner model)

### getAllCombosData

**Type**: `() => ComboModel[]`

- [ComboModel](../data/ComboModel.en.md)

Get all combo data (inner model)

### getNodeData

**Type**: `(condition: Function | ID) => NodeModel`

- [NodeModel](../data/NodeModel.en.md)

Get node data (inner model) with the specified id or condition

### getEdgeData

**Type**: `(condition: Function | ID) => EdgeModel`

- [EdgeModel](../data/EdgeModel.en.md)

Get edge data (inner model) with the specified id or condition

### getComboData

**Type**: `(condition: Function | ID) => ComboModel`

- [ComboModel](../data/ComboModel.en.md)

Get combo data (inner model) with the specified id or condition

### getNeighborNodesData

**Type**: `(nodeId: ID, direction?: 'both' | 'in' | 'out') => NodeModel[]`

- [NodeModel](../data/NodeModel.en.md)

Get the one-hop neighbor node data (inner model) of the specified node

### getRelatedEdgesData

**Type**: `(nodeId: ID, direction?: 'both' | 'in' | 'out') => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.en.md)

Get the one-hop neighbor edge data (inner model) of the specified node

### getNearEdgesData

**Type**: `(nodeId: ID) => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.en.md)

Get the edge data (inner model) related to the specified node

### updateNodePosition

**Type**: `UpdateNodePosition`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateNodePosition
  </summary>

```ts
type UpdateNodePosition = (
  /** The configuration options for updating, each data contains the node id and data, including x and y information */
  models: Partial<NodeUserModel> | Partial<NodeUserModel>[],
  /** Whether to update ancestor combo at the same time */
  upsertAncestors?: boolean,
  /** Whether to disable animation */
  disableAnimate?: boolean,
  /** Callback function after the position update is complete. The rendering of position update may be asynchronous, and this callback can be used for post-update logic */
  callback?: (model: NodeModel, canceled?: boolean) => void,
) => NodeModel | NodeModel[];
```

</details>

- [NodeModel](../data/NodeModel.en.md)

- [NodeUserModel](../data/NodeUserModel.en.md)

Update the position of a single or multiple nodes. This API does not update other styles passed in, in order to achieve better performance in position updates

### clear

**Type**: `() => void`

Clear the graph content.

## Renderer

### changeRenderer

**Type**: `(type: 'canvas' | 'webgl' | 'svg' | 'webgl-3d') => void`

Switch the renderer at runtime.

## Item

### findIdByState

**Type**: `(itemType: ITEM_TYPE, state: string, value?: string | boolean, additionalFilter?: (model: NodeModel | EdgeModel | ComboModel) => boolean) => ID[]`

- [NodeModel](../data/NodeModel.en.md)

- [EdgeModel](../data/EdgeModel.en.md)

- [ComboModel](../data/ComboModel.en.md)

Get a list of item IDs with the specified state and type

### getItemAllStates

**Type**: `(id: ID) => string[]`

Get all the state names with a value of `true` for the specified item

### getItemState

**Type**: `(id: ID, state: string) => string | boolean`

Get the value of a specified state for a specified item

### setItemState

**Type**: `(ids: ID | ID[], state: string, value: boolean) => void`

Set the state of a single or multiple items

### clearItemState

**Type**: `(ids: ID | ID[], states?: string[]) => void`

Clear the state of specified single or multiple items

### showItem

**Type**: `(ids: ID | ID[], disableAnimate?: boolean) => void`

Show a single or multiple items. Corresponds to [hideItem](#hideitem)

### hideItem

**Type**: `(ids: ID | ID[], disableAnimate?: boolean) => void`

Hide a single or multiple items. Corresponds to [showItem](#showitem)

### getItemVisible

**Type**: `(id: ID) => boolean`

Get the visibility of a specified item

### frontItem

**Type**: `(ids: ID | ID[]) => void`

Move the specified single or multiple items to the front layer. Note that the layer of nodes is always higher than that of edges

### backItem

**Type**: `(ids: ID | ID[]) => void`

Move the specified single or multiple items to the back layer. Note that the layer of nodes is always higher than that of edges

## Combo

### addCombo

**Type**: `(model: ComboUserModel, childrenIds: ID[]) => ComboModel`

- [ComboModel](../data/ComboModel.en.md)

- [ComboUserModel](../data/ComboUserModel.en.md)

Add a new combo and update the specified child nodes by moving them from the original parent combo to the new combo

Essentially, it is addData, but with some adjustments to the Combo hierarchy tree based on the added combo data

### collapseCombo

**Type**: `(comboIds: ID | ID[]) => void`

Collapse the specified single or multiple combos. Corresponds to [expandCombo](#expandCombo)

### expandCombo

**Type**: `(comboIds: ID | ID[]) => void`

Expand the specified single or multiple combos. Corresponds to [collapseCombo](#collapseCombo)

### moveCombo

**Type**: `MoveCombo`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    MoveCombo
  </summary>

```ts
type MoveCombo = (
  /** The ID or IDs of the combos to be updated */
  ids: ID[],
  /** The relative distance to move on the x-axis */
  dx: number,
  /** The relative distance to move on the y-axis */
  dy: number,
  /** Whether to update the ancestor combos as well */
  upsertAncestors?: boolean,
  /** Callback function after the update is complete */
  callback?: (model: ComboModel, canceled?: boolean) => void,
) => /** The updated Combo data (inner model) */
ComboModel[];
```

</details>

- [ComboModel](../data/ComboModel.en.md)

Move a single or multiple combos by a relative distance (dx, dy).

This API will not update other styles to improve the performance of updating the position. In fact, since the position of a combo is determined by the distribution and position of its internal child items, this API actually updates the position of the successor items of the specified combo to affect the combo and achieve the purpose of moving the combo, rather than directly updating the position of the combo

### updateComboPosition

**Type**: `UpdateComboPosition`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateComboPosition
  </summary>

```ts
type UpdateComboPosition = (
  /** The configuration options for updating, each data contains the combo id and data, including x and y information */
  models: Partial<ComboUserModel | Partial<ComboUserModel>[]>,
  /** Whether to update ancestor combo at the same time */
  upsertAncestors?: boolean,
  /** Whether to disable animation */
  disableAnimate?: boolean,
  /** Callback function after the position update is complete.  */
  callback?: (model: ComboModel) => void,
) => /** The updated Combo data (inner model) */
ComboModel | ComboModel[];
```

</details>

- [ComboModel](../data/ComboModel.en.md)

- [ComboUserModel](../data/ComboUserModel.en.md)

Update the position of a single or multiple combos to the specified position (x, y). Similar to the corresponding API [updateNodePosition](#updatenodeposition) for nodes

### getComboChildrenData

**Type**: `(comboId: ID) => ComboModel[]`

- [ComboModel](../data/ComboModel.en.md)

Gets the data of the child items (nodes/combos) of a Combo (inner model)

## Layout

### layout

**Type**: `(options?: LayoutOptions, disableAnimate?: boolean) => Promise<void>`

Performs layout

- If no parameters are passed, the layout is re-executed according to the layout configuration in the spec of the graph instance.

- If parameters are passed, the layout configuration of the graph is updated and the layout is re-executed

### stopLayout

**Type**: `() => void`

Stops the layout

It is suitable for layouts with iterative animations, such as `'force'`, which stops the iteration of force-directed layout. It is generally used to manually stop iterative animations when the layout iteration time is too long, for example, by calling it in the click event listener of the canvas/node

## Interactions and Events

### on

**Type**: `(eventName: string, listener: (event: IG6GraphEvent) => void) => void`

<embed src='../../common/IG6GraphEvent.en.md'></embed>

Listens to an event

### once

**Type**: `(eventName: string, listener: (event: IG6GraphEvent) => void) => void`

<embed src='../../common/IG6GraphEvent.en.md'></embed>

Listens to an event only once, and once it is completed, it is destroyed

### off

**Type**: `(eventName: string, listener?: (event: IG6GraphEvent) => void) => void`

Cancels a listener or all listeners under an event name

### emit

**Type**: `(eventName, param: any) => void`

Triggers an event

### getMode

**Type**: `() => string`

Get the current [interaction](/en/manual/tutorial/behavior) mode

### setMode

**Type**: `(mode: string) => void`

Set the current [interaction](/en/manual/tutorial/behavior) mode

### addBehaviors

**Type**: `(behaviors: BehaviorOptionsOf<B> | BehaviorOptionsOf<B>[], modes: string | string[]) => void`

Adds one or more interactions to the specified mode (default mode by default)

### removeBehaviors

**Type**: `(behaviorKeys: string[], modes: string | string[]) => void`

Removes an interaction from the specified mode (default mode by `default`)

### updateBehavior

**Type**: `(behavior: BehaviorOptionsOf<B>, mode?: string) => void`

Updates the configuration of an interaction

### drawTransient

**Type**: `(type: ITEM_TYPE | SHAPE_TYPE, id: ID, config: any, canvas?: Canvas) => DisplayObject<any, any>`

Draws a temporary shape, typically used to update temporary shapes during interactions to avoid unnecessary performance overhead of updating shapes in the main graph layer

The principle of using a temporary canvas to improve interaction performance is as follows:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VkT7T4Qzt2gAAAAAAAAAAAAADmJ7AQ/original' />

## View

### zoom

**Type**: `Zoom`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    Zoom
  </summary>

```ts
type Zoom = (
  /** The relative zoom ratio */
  ratio: number,
  /** The zoom center */
  center?: Point,
  /** Animation configuration. If an empty object is specified, the default animation parameters will be used. If not specified, no animation will be performed */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Zooms the graph by a **relative** zoom ratio and a zoom center

### zoomTo

**Type**: `(toRatio: number, center?: Point, effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>) => Promise<void>`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    ZoomTo
  </summary>

```ts
type ZoomTo = (
  /** The absolute zoom ratio */
  toRatio: number,
  /** The zoom center */
  center?: Point,
  /** Animation configuration. If an empty object is specified, the default animation parameters will be used. If not specified, no animation will be performed */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Zooms the graph to a **absolute** zoom ratio and a zoom center

### getZoom

**Type**: `() => number`

Gets the current zoom ratio of the graph

### translate

**Type**: `Translate`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    Translate
  </summary>

```ts
type Translate = (
  /** Relative distance of movement */
  distance: Partial<{ dx: number; dy: number; dz: number }>,
  /** Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Move canvas in the x and y directions by the specified distance

### translateTo

**Type**: `TranslateTo`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    TranslateTo
  </summary>

```ts
type TranslateTo = (
  /** Absolute target position */
  point: PointLike,
  /** Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Move the canvas to the specified **absolute** target position (x, y)

### fitCenter

**Type**: `FitCenter`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FitCenter
  </summary>

```ts
type FitCenter = (
  /** Animation configuration. Specify an empty object to use default parameters. If not specified, no animation is performed */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Moves the content to align the center of the content with the center of the current viewport. No scaling is performed

### fitView

**Type**: `FitView`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FitView
  </summary>

```ts
type FitView = (
  options?: {
    /** Padding of viewport */
    padding: Padding;
    /** Rules for fitting the viewport, see below for the types */
    rules: FitViewRules;
  },
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;

type FitViewRules = {
  /** Only performs fitting if the content is out of the viewport */
  onlyOutOfViewport?: boolean;
  /** Only performs fitting if the content is larger than the viewport */
  onlyZoomAtLargerThanViewport?: boolean;
  /** Restricts the scaling direction during fitting. Default is 'both' */
  direction?: 'x' | 'y' | 'both';
  /** Determines whether to scale based on the larger or smaller ratio in the horizontal and vertical directions */
  ratioRule?: 'max' | 'min';
  /** Fits based on rendered bounding boxes or layout positions. Default is 'render', 'layout' is used when layout calculations are completed but rendering updates */
  boundsType?: 'render' | 'layout';
};
```

</details>

Moves and scales the content to fit the current viewport size

### focusItem

**Type**: `FocusItem`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FocusItem
  </summary>

```ts
type FocusItem = (
  id: ID | ID[],
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

Translate the canvas to align the specified single or multiple items (average center) to the center of the current viewport

### stopTransformTransition

**Type**: `() => void`

Stops all translation and scale-related animations

### getSize

**Type**: `() => [number, number]`

Get the current size of the canvas container

### setSize

**Type**: `(size: [number, number]) => void`

Set the size of the current canvas container

### getViewportCenter

**Type**: `() => { x: number, y: number }`

Get the coordinates of the center point of the current viewport. For example, for a 500 \* 500 container, it will return the center value { x: 250, y: 250 }

### getCanvasByClient

**Type**: `(ClientPoint: Point) => Point`

Convert the given browser coordinates to drawing coordinates on the canvas

### getCanvasByViewport

**Type**: `(viewportPoint: Point) => Point`

Convert the given viewport DOM coordinates to drawing coordinates on the canvas

### getClientByCanvas

**Type**: `(canvasPoint: Point) => Point`

Convert the drawing coordinates on the canvas to browser coordinates

### getViewportByCanvas

**Type**: `(canvasPoint: Point) => Point`

Convert the drawing coordinates on the canvas to viewport DOM coordinates

### getRenderBBox

**Type**: `(id: ID, onlyKeyShape?: boolean, isTransient?: boolean) => false | AABB`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    GetRenderBBox
  </summary>

```ts
type GetRenderBBox = (
  /** ID of the specified element to get the bounding box. If no element is specified, it represents the overall bounding box of all the currently rendered content */
  id: ID,
  /** Whether to only calculate the bounding box of the main keyShape */
  onlyKeyShape?: boolean,
  /** Calculate the bounding box of transient shapes */
  isTransient?: boolean,
) => /** Returns false if there is no corresponding element */
false | AABB;
```

</details>

Get the bounding box of the specified element

## Tree Operations

### collapse

**Type**: `(ids: ID | ID[], disableAnimate?: boolean) => void`

Collapse one or multiple subtrees

### expand

**Type**: `(ids: ID | ID[], disableAnimate?: boolean) => void`

Expand one or multiple subtrees

## History Stack

### isHistoryEnabled

**Type**: `() => void`

Determine if history (redo/undo) is enabled

### getRedoStack

**Type**: `() => void`

Retrieve the current undo stack which consists of operations that were undone

### getUndoStack

**Type**: `() => void`

Retrieve the current redo stack which consists of operations that could be undone

### getStack

**Type**: `() => void`

Retrieve the complete history stack

### pushStack

**Type**: `(cmd: Command[], stackType: 'redo' | 'undo') => void`

Push the operation(s) onto the specified stack

### pauseStack

**Type**: `() => void`

Pause stacking operation

### resumeStack

**Type**: `() => void`

Resume stacking operation

### startHistoryBatch

**Type**: `() => void`

Begin a historyBatch operation

Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
treated as a single operation when undoing or redoing

### stopHistoryBatch

**Type**: `() => void`

Stop a historyBatch operation.

### executeWithNoStack

**Type**: `(callback: () => void) => void`

Execute a callback without allowing any stacking operations

### undo

**Type**: `() => void`

Revert the last operation on the graph

### redo

**Type**: `() => void`

Restore the last operation on the graph

### cleanHistory

**Type**: `(stackType?: 'redo' | 'undo') => void`

Clear history stack

## Free Plugins

### addPlugins

**Type**: `AddPlugins`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AddPlugins
  </summary>

```ts
type AddPlugins = (pluginCfgs: { [cfgName: string]: unknown; key: string; type: string }[]) => void;
```

</details>

Add free plugins to the graph instance

### removePlugins

**Type**: `(pluginKeys: string[]) => void`

Remove plugins from the graph instance. If you want to remove or update a plugin, you should configure a unique key for the plugin to facilitate retrieval during deletion or modification.

### updatePlugin

**Type**: `(pluginCfg: { [cfgName: string]: unknown; key: string ; type: string }) => void`

Update a specific plugin. If you want to remove or update a plugin, you should configure a unique key for the plugin to facilitate retrieval during deletion or modification.

## Download

### downloadFullImage

**Type**: `(name?: string, type: DataURLType = 'image/png', imageConfig: { padding: number | number[] }) => void`

Download an image that contains all the graph content

### downloadImage

**Type**: `(name?: string, type: DataURLType = 'image/png') => void`

Download the contents in the window as an image

### toFullDataURL

**Type**: `(type: DataURLType = 'image/png', imageConfig: { padding: number | number[] }) => Promise<string>`

Generate the URL of an image that contains all the graph content

### toDataURL

**Type**: `(type: DataURLType = 'image/png') => Promise<string>`

Generate the URL of the current window content as an image

## Graph Instance

### setCursor

**Type**: `(cursor: Cursor) => void`

Set the cursor style. However, the cursor style on the element has a higher priority

### destroy

**Type**: `(callback?: Function) => void`

Destroy the current graph instance
