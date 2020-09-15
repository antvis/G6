---
title: Event
order: 8
---

The events in this chapter can be binded or unbinded to graph by [graph.on](/en/docs/api/Graph/#oneventname-handler) and [graph.off](/en/docs/api/Graph/#offeventname-handler).

The parameters of callbacks for common events, Node events, and Edge events are described in [Behavior API](/en/docs/api/Behavior).

## Interaction Events

Listen to the interaction events such as `click`, `mousemove` by the following way:

```
graph.on(eventName, evt => {
  // some operations
})
```

Where, the event object `evt` has the properties:

- `type`: The type of the event
- `name`: The name of the event
- `x`: The x coordinate on the canvas
- `y`: The y coordinate on the canvas
- `clientX`: The x coordinate about the client
- `clientY`: The y coordinate about the client
- `canvasX`: The x coordinate about parent DOM of the canvas
- `canvasY`: The y coordinate about parent DOM of the canvas

（The differences between x/y, clientX/clientY, and canvasX/canvasY can be found in [Coordinate Systems in G6](/en/docs/manual/advanced/coordinate-system)）

- `item`: The item being manipulated, which can be a node, an edge, or a Combo）
- `target`: The target [Shape](/zh/docs/manual/middle/elements/shape/shape-keyshape) on the `item` being manupulated, or the canvas instance
- `bubbles`: Whether bubbles
- `defaultPrevented`: Whether prevent the original event
- `originalEvent`: The original client event object. where the `button` can be used to distinguish the left/middle/right button of the mouse on some events like `click` or `dblclick`
- `timeStamp`: The time stamp the event triggered
- `propagationStopped`: Wheher stop the propogation
- `propagationPath`: The triggering path

`eventName` can be refered to the following parts.

### Common Interaction Event

| Event Name | Description |
| --- | --- |
| click | Activated by clicking the **left button** of mouse or Enter button. |
| dblclick | Activated by double clicking the **left button** of mouse. |
| mouseenter | Activated when mouse enters an item. **This is not a bubbled event**, which means this event will not be activated when the mouse moves to the descendant items. |
| mousemove | Activated while the mouse is moving inside an item. It cannot be activated by keyboard. |
| mouseout | Activated while the mouse moves out of an item. |
| mouseover | Activated when the mouse moves over an item. |
| mouseleave | Activated when the mouse leaves an item. **This is not a bubbled event**, which means this event will not be activated when the mouse leaves the descendant items. |
| mousedown | Activated when the left or right button is clicked down. It cannot be activated by keyboard. |
| mouseup | Activated when the left or right button is released. It cannot be activated by keyboard. |
| contextmenu | Open the context menu when user clicks the right button of mouse. [Demo](/en/examples/tool/contextMenu). |
| dragstart | Activated when user begins to drag. This event is applied on a dragged item. |
| drag | Activated during the dragging process. This event is applied on a dragged item. |
| dragend | Activated when user stops dragging. This event is applied on a dragged item. |
| dragenter | Activated when user drags an item into a target item. This event is applied on a dragged item. |
| dragleave | Activated when user drags an item out of a target item. This event is applied on the target item. |
| drop | Activated when user drops an item on a target item. This event is applied on the target item. |
| keydown | Activated when user presses down a button on keyboard. |
| keyup | Activated when user releases a button on keyboard. |
| wheel | Activated when user scroll the wheel. |
| touchstart | Activated when a finger touches the screen. If there are fingers on the screen already, it will be activated too. |
| touchmove | Activated during the processes of finger moving on the screen. Call `preventDefault()` to prevent scrolling. |
| touchend | Activated when a finger leaves the screen. |

### Node Interaction Event

| Event Name | Description |
| --- | --- |
| node:click | Activated when user clicks the **left button** of the mouse on the node. |
| node:dblclick | Activated when user double clicks the **left button** of the mouse on the node. |
| node:mouseenter | Activated when the mouse enters the node. |
| node:mousemove | Activated while the mouse is moving inside the node. It cannot be activated by keyboard. |
| node:mouseout | Activated while the mouse moves out of the node. |
| node:mouseover | Activated when the mouse moves over the node. |
| node:mouseleave | Activated when the mouse leaves the node. |
| node:mousedown | Activated when the left or right button is clicked down on the node. It cannot be activated by keyboard. |
| node:mouseup | Activated when the left or right button is released on the node. It cannot be activated by keyboard. |
| node:dragstart | Activated when user begins to drag the node. This event is applied on the dragged node. |
| node:drag | Activated during the dragging process on the node. This event is applied on the dragged node. |
| node:dragend | Activated when user stops dragging on the node. This event is applied on the dragged node. |
| node:dragenter | Activated when user drags an item into a target node item. This event is applied on the target node item. |
| node:dragleave | Activated when user drags an item out of a target node item. This event is applied on the target node item. |
| node:dragover | Activated when user drags an item over a target node item. This event is applied on the target node item |
| node:drop | Activated when user drops an item on a target item. This event is applied on the target item. |
| node:contextmenu | Open the context menu when user clicks the right button of mouse on the node. [Demo](/en/examples/tool/contextMenu). |

### Edge Interaction Event

| Event Name | Description |
| --- | --- |
| edge:click | Activated when user clicks the **left button** of the mouse on the edge. |
| edge:dblclick | Activated when user double clicks the **left button** of the mouse on the edge. |
| edge:mouseenter | Activated when the mouse enters the edge. |
| edge:mousemove | Activated while the mouse is moving inside the edge. It cannot be activated by keyboard. |
| edge:mouseout | Activated while the mouse moves out of the edge. |
| edge:mouseover | Activated when the mouse moves over the edge. |
| edge:mouseleave | Activated when the mouse leaves the edge. |
| edge:mousedown | Activated when the left or right button is clicked down on the edge. It cannot be activated by keyboard. |
| edge:mouseup | Activated when the left or right button is released on the edge. It cannot be activated by keyboard. |
| edge:dragenter | Activated when user drags an item into a target edge item. This event is applied on the target edge item. |
| edge:dragleave | Activated when user drags an item out of a target edge item. This event is applied on the target edge item. |
| edge:dragover | Activated when user drags an item over a target edge item. This event is applied on the target edge item |
| edge:drop | Activated when user drops an item on a target edge item. This event is applied on the target edge item. |
| edge:contextmenu | Open the context menu when user clicks the right button of mouse on the edge. [Demo](/en/examples/tool/contextMenu). |

### Combo Interaction Event

Combo inherit all the interaction events of Node.

## Canvas Interaction Event

| Event Name | Description |
| --- | --- |
| canvas:click | Activated when user clicks the **left button** of the mouse on the canvas. |
| canvas:dblclick | Activated when user double clicks the **left button** of the mouse on the canvas. |
| canvas:mouseenter | Activated when the mouse enters the canvas. |
| canvas:mousemove | Activated while the mouse is moving inside the canvas. It cannot be activated by keyboard. |
| canvas:mouseout | Activated while the mouse moves out of the canvas. |
| canvas:mouseover | Activated when the mouse moves over the canvas. |
| canvas:mouseleave | Activated when the mouse leaves the canvas. |
| canvas:mousedown | Activated when the left or right button is clicked down on the canvas. It cannot be activated by keyboard. |
| canvas:mouseup | Activated when the left or right button is released on the canvas. It cannot be activated by keyboard. |
| canvas:contextmenu | Open the context menu when user clicks the right button of mouse on the canvas. |
| canvas:dragstart | Activated when user begins to drag the canvas. This event is applied on the dragged canvas. [Demo](/en/examples/tool/contextMenu). |
| canvas:drag | Activated during the dragging process on the canvas. This event is applied on the dragged canvas. |
| canvas:dragend | Activated when user stops dragging on the canvas. This event is applied on the dragged canvas. |
| canvas:dragenter | Activated when user drags the canvas into a target item. This event is applied on the target item. |
| canvas:dragleave | Activated when user drags the canvas out of a target item. This event is applied on the target item. |
| canvas:drop | Activated when user drags and drops an item on the canvas. |

## Timing Events

Before and after being called some functions, G6 exports the timing events. These timing events can be listened by the following way:

```
graph.on(timingEventName, evt => {
  // some operations
})
```

`timingEventName` is shown below:

| Event Name | Description |
| --- | --- |
| beforeadditem | Activated before `add` / `addItem` being called. |
| afteradditem | Activated after `add` / `addItem` being called. |
| beforeremoveitem | Activated before `remove` / `removeItem` being called. |
| afterremoveitem | Activated after `remove` / `removeItem` being called. |
| beforeupdateitem | Activated before `update` / `updateItem` being called. |
| afterupdateitem | Activated after `update` / `updateItem` being called. |
| beforeitemvisibilitychange | Activated before `showItem` / `hideItem` being called. |
| afteritemvisibilitychange | Activated after `showItem` / `hideItem` being called. |
| beforeitemstatechange | Activated before `setItemState` being called. |
| afteritemstatechange | Activated after `setItemState` being called. |
| beforeitemrefresh | Activated before `refreshItem` being called. |
| afteritemrefresh | Activated after `refreshItem` being called. |
| beforeitemstatesclear | Activated before `clearItemStates` being called. |
| afteritemstatesclear | Activated after `clearItemStates` being called. |
| beforemodechange | Activated before `setMode` / `addBehaviors` / `removeBehaviors` being called. |
| aftermodechange | Activated after `setMode` / `addBehaviors` / `removeBehaviors` being called. |
| beforelayout | Activated before graph layout. `render` will layout the graph, so `render` will activate this event as well. |
| afterlayout | Activated after graph layout being done. `render` will layout the graph, so `render` will activate this event as well. |
| graphstatechange | Activated after `graph.updateItemState` being called. |
| afteractivaterelations | Activated while activating a node by `'activate-relations'` Behavior which is assigned to the the instance of Graph. |
| nodeselectchange | Activated while the selected items are changed by `'brush-select'`, `'click-select'` or `'lasso-select'` Behavior which is assigned to the instance of Graph. |
| beforecreateedge | Activated before an edge is created by the built-in behavior `create-edge` |
| aftercreateedge | Activated after an edge is created by the built-in behavior `create-edge` |
| itemcollapsed | Activated while a node is clicked to collapse or expand by `'collapse-expand'` Behavior which is assigned to the instance of TreeGraph. |
| tooltipchange | Activated after the show/hide state is changed by `'tooltip'` or `'edge-tooltip'` Behavior which is assigned to the instance of Graph. |
| wheelzoom | Activated after the canvas being zoomed by `'zoom-canvas'` Behavior which is assigned to the instance of Graph. |

### Callback Parameters

The callback paramters are different from custom events.

#### beforeadditem

| Name  | Type   | Description                             |
| ----- | ------ | --------------------------------------- |
| type  | String | The type of the item to be added.       |
| model | Object | The data model of the item to be added. |

#### afteradditem

| Name  | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| item  | Item   | The added item.                   |
| model | Object | The data model of the added item. |

#### beforeremoveitem / afterremoveitem

| Name | Type | Description       |
| ---- | ---- | ----------------- |
| item | Item | The removed item. |

#### beforeupdateitem / afterupdateitem

| Name  | Type   | Description                               |
| ----- | ------ | ----------------------------------------- |
| item  | Item   | The updated item.                         |
| model | Object | The data model of the item to be updated. |

#### beforeitemvisibilitychange / afteritemvisibilitychange

| Name    | Type    | Description                                                             |
| ------- | ------- | ----------------------------------------------------------------------- |
| item    | Item    | The manipulated item.                                                   |
| visible | Boolean | Whether the item is visible. `true` for visible, `false` for invisible. |

#### beforeitemstatechange / afteritemstatechange

| Name    | Type    | Description                                                           |
| ------- | ------- | --------------------------------------------------------------------- |
| item    | Item    | The manipulated item.                                                 |
| state   | String  | The state name.                                                       |
| enabled | Boolean | Wheter the state is enabled. `true` for enabled, `false` for unabled. |

#### beforeitemstatesclear / afteritemstatesclear

| Name   | Type           | Description               |
| ------ | -------------- | ------------------------- |
| item   | Item           | The manipulated item.     |
| states | Array / String | The states to be cleared. |

#### beforemodechange / aftermodechange

| Name | Type   | Description               |
| ---- | ------ | ------------------------- |
| mode | String | The name of current mode. |

#### beforeitemrefresh / afteritemrefresh

| Name | Type | Description           |
| ---- | ---- | --------------------- |
| item | Item | The manipulated item. |

#### beforelayout / afterlayout

No parameters.

#### afteractivaterelations

| Name   | Type   | Description                   |
| ------ | ------ | ----------------------------- |
| item   | Item   | The manipulated item.         |
| action | String | The name of the manipulation. |

#### graphstatechange

| Name   | Type   | Description                   |
| ---- | ---- | -------------------- |
| states | Object | The items with different states, e.g. `{ hover: [Node, Node], selected: [ Node ] }` |

#### afteractivaterelations

| Name   | Type   | Description                   |
| ------ | ------ | -------------------- |
| item   | Item   | The manipulated item currently |
| action | String | The current action name           |

#### nodeselectchange

| Name          | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| target        | Item   | The manipulated item.                                          |
| selectedItems | Object | All selected items, formed as `{ nodes: [...], edges: [...]}`. |

#### beforecreateedge / aftercreateedge

`beforecreateedge` has no parameters. The parameters of `aftercreateedge` are:

| Name      | Type    | Description                                                       |
| ------------- | ------ | ---------------------------------------------------------------- |
| edge        | Item   | The created edge                                             |


#### itemcollapsed

| Name      | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| item      | Item    | The manipulated item.                                             |
| collapsed | Boolean | The collapsed state of the manipulated item after this operation. |

#### tooltipchange

| Name   | Type   | Description                                     |
| ------ | ------ | ----------------------------------------------- |
| item   | Item   | The manipulated item.                           |
| action | String | The `'show'` or `'hide'` state of this tooltip. |

#### wheelzoom

| Name | Type | Description |
| --- | --- | --- |
| deltaX | Number | The x-axis direction of the wheel scroll, value is `1`, `0`, or `-1`, where `0` means no scrolling on this direction. |
| deltaY | Number | The y-axis direction of the wheel scroll, value is `1`, `0`, or `-1`, where `0` means no scrolling on this direction. |
| ... Other parameters of wheel event. |  |  |
