---
title: Event
order: 12
---

The events in this chapter can be binded or unbinded to graph by [graph.on](/en/docs/api/graphFunc/on_off#graphoneventname-handler) and [graph.off](/en/docs/api/graphFunc/on_off#graphoffeventname-handler).

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
| beforerender | Emitted before `graph.render` / `graph.read` being called. |
| afterrender | Emitted after `graph.render` / `graph.read` being called. |
| beforeadditem | Emitted before `graph.add` / `graph.addItem` being called. |
| afteradditem | Emitted after `graph.add` / `graph.addItem` being called. |
| beforeremoveitem | Emitted before `graph.remove` / `graph.removeItem` being called. |
| afterremoveitem | Emitted after `graph.remove` / `graph.removeItem` being called. |
| beforeupdateitem | Emitted before `graph.update` / `graph.updateItem` being called. |
| afterupdateitem | Emitted after `graph.update` / `graph.updateItem` being called. |
| beforeitemvisibilitychange | Emitted before `graph.showItem` / `graph.hideItem` being called. |
| afteritemvisibilitychange | Emitted after `graph.showItem` / `graph.hideItem` being called. |
| beforeitemstatechange | Emitted before `graph.setItemState` being called. |
| afteritemstatechange | Emitted after `graph.setItemState` being called. |
| beforeitemrefresh | Emitted before `graph.refreshItem` being called. |
| afteritemrefresh | Emitted after `graph.refreshItem` being called. |
| beforeitemstatesclear | Emitted before `graph.clearItemStates` being called. |
| afteritemstatesclear | Emitted after `graph.clearItemStates` being called. |
| beforemodechange | Emitted before `graph.setMode` / `graph.addBehaviors` / `graph.removeBehaviors` being called. |
| aftermodechange | Emitted after `graph.setMode` / `graph.addBehaviors` / `graph.removeBehaviors` being called. |
| beforelayout | Emitted before graph layout. `graph.render` will layout the graph, so `graph.render` will activate this event as well. |
| afterlayout | Emitted after graph layout being done. `graph.render` will layout the graph, so `graph.render` will activate this event as well. |
| beforegraphrefreshposition | Emitted before `graph.refreshPositions` beging called |
| aftergraphrefreshposition | Emitted after `graph.refreshPositions` beging called |
| beforegraphrefresh | Emitted before `graph.refresh` beging called |
| aftergraphrefresh | Emitted after `graph.refresh` beging called |
| beforeanimate | Emitted before global animation |
| afteranimate | Emitted after global animation |
| beforecreateedge | Emitted before an edge is created by the built-in behavior `create-edge` |
| aftercreateedge | Emitted after an edge is created by the built-in behavior `create-edge` |
| beforecollapseexpandcombo | Emitted before an combo is collapsed or expanded, the parameter `action` indicates collapse or expand |
| aftercollapseexpandcombo | Emitted after an combo is collapsed or expanded, the parameter `action` indicates collapse or expand |
| graphstatechange | Emitted after `graph.updateItemState` being called. |
| afteractivaterelations | Emitted while activating a node by `'activate-relations'` Behavior which is assigned to the the instance of Graph. |
| nodeselectchange | Emitted while the selected items are changed by `'brush-select'`, `'click-select'` or `'lasso-select'` Behavior which is assigned to the instance of Graph. |
| itemcollapsed | Emitted while a node is clicked to collapse or expand by `'collapse-expand'` Behavior which is assigned to the instance of TreeGraph. |
| tooltipchange | Emitted after the show/hide state is changed by `'tooltip'` or `'edge-tooltip'` Behavior which is assigned to the instance of Graph. |
| wheelzoom | Emitted after the canvas is zoomed by `'zoom-canvas'` Behavior which is assigned to the instance of Graph. |
| viewportchange | Emitted after the canvas is translated by `graph.moveTo`, `graph.translate`, and `graph.zoom`. |
| dragnodeend | Emitted while drag node end by `'drag-node'` Behavior. |
| stackchange | Emitted while the redo or undo stacks are changed. |

**Timing Events in the Plugins**

TimeBar plugin:

| Event Name | Description |
| --- | --- |
| valuechange | Emitted when the value range of the timebar is chaged. |
| timebarstartplay | Emitted when the timeline starts to play. |
| timebarendplay | Emitted when the timeline ends playing. |

Tooltip:

| Event Name | Description |
| --- | --- |
| tooltipchange | Emitted when the Tooltip is changed. |

### Callback Parameters

The callback paramters are different from custom events.

#### beforerender / afterrender

No parameters.

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

#### beforeremoveitem / afterremoveitem

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

| Name | Type | Description |
| --- | --- | --- |
| states | Object | The items with different states, e.g. `{ hover: [Node, Node], selected: [ Node ] }` |

#### afteractivaterelations

| Name   | Type   | Description                    |
| ------ | ------ | ------------------------------ |
| item   | Item   | The manipulated item currently |
| action | String | The current action name        |

#### nodeselectchange

| Name          | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| target        | Item   | The manipulated item.                                          |
| selectedItems | Object | All selected items, formed as `{ nodes: [...], edges: [...]}`. |

#### beforecreateedge / aftercreateedge

`beforecreateedge` has no parameters. The parameters of `aftercreateedge` are:

| Name | Type | Description      |
| ---- | ---- | ---------------- |
| edge | Item | The created edge |

#### beforecollapseexpandcombo / aftercollapseexpandcombo

| Name | Type | Description      |
| ---- | ---- | ---------------- |
| action | string | The action, `'collapse'` or `'expand'` |
| combo | Item | The manipulated combo |

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

#### viewportchange

| Name   | Type                          | Description                                          |
| ------ | ----------------------------- | ---------------------------------------------------- |
| action | 'translate' / 'move' / 'zoom' | The action of view port changing.                    |
| matrix | Array                         | The matrix of the graph after the view port changed. |

#### dragnodeend

| Name | Type | Description |
| --- | --- | --- |
| items | Item[] | The manipulated items. |
| targetItem | null/Node/Combo | The position where the node is placed after dragging, the default is null, that is, placed on the canvas. |

#### stackchange

| Name      | Type     | Description     |
| --------- | -------- | --------------- |
| redoStack | Object[] | The redo stack. |
| undoStack | Object[] | The undo stack. |

#### valuechange

| Name      | Type     | Description     |
| --------- | -------- | -------- |
| value | number[] | The current value range, `value[0]` is the start and `value[1]` is the end. |

#### timelinestart / timelineend

No parameters.

#### tooltipchange

| Name      | Type     | Description     |
| --------- | -------- | -------- |
| item | Item | The item the tooltip related to (a node or an edge). |
| action | 'show' / 'hide' | The current action. |