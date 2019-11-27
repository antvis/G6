---
title: Event
order: 6
---

Common events, Node events, Edge events, and callback for canvas events are described in [Behavior](./Behavior).

## Common Event

| Event Name | Description |
| --- | --- |
| click | Activated by clicking the **left button** of mouse or Enter button. |
| dblclick | Activated by double clicking the **left button** of mouse. |
| mouseenter | Activated when mouse enter an item. **This is not a bubbled event**, which means this event will not be activated when the mouse move to the descendant items. |
| mousemove | Activated while the mouse move inside an item. It cannot be activated by keyboard. |
| mouseout | Activated while the mouse move out of an item. |
| mouseover | Activated when the mouse move over an item. |
| mouseleave | Activated when the mouse leave an item. **This is not a bubbled event**, which means this event will not be activated when the mouse leave the descendant items. |
| mousedown | Activated when the left or right button is clicked down. It cannot be activated by keyboard. |
| mouseup | Activated when the left or right button is released. It cannot be activated by keyboard. |
| contextmenu | Open the context menu when user click the right button of mouse. |
| dragstart | Activated when user begin to drag. This event is applied on a dragged item. |
| drag | Activated during the dragging process. This event is applied on a dragged item. |
| dragend | Activated when user stop dragging. This event is applied on a dragged item. |
| dragenter | Activated when drag an item into a target item. This event is applied on a dragged item.  |
| dragleave | Activated when drag an item out of a target item. This event is applied on the target item. |
| drop | Activated when drop an item on a target item. This event is applied on the target item. |
| keydown | Activated when press down a button on keyboard. |
| keyup | Activated when release a button on keyboard. |
| touchstart | Activated when a finger touch the screen. If there is a finger on the screen already, it will be activated too. |
| touchmove | Activated during the process of finger moving on the scr3een. Call preventDefault() to prevent scrolling. |
| touchend | Activated when a finger leave the screen. |


## Node Event

| Event Name | Description |
| --- | --- |
| node:click | Activated when user click the **left button** of the mouse on the node. |
| node:dblclick | Activated when user double click the **left button** of the mouse on the node. |
| node:mouseenter | Activated when the mouse enter the node. |
| node:mousemove | Activated while the mouse move inside the node. It cannot be activated by keyboard. |
| node:mouseout | Activated while the mouse move out of the node. |
| node:mouseover | Activated when the mouse move over the node. |
| node:mouseleave | Activated when the mouse leave the node. |
| node:mousedown | Activated when the left or right button is clicked down on the node. It cannot be activated by keyboard. |
| node:mouseup | Activated when the left or right button is released on the node. It cannot be activated by keyboard. |
| node:contextmenu | Open the context menu when user click the right button of mouse on the node. |
| node:dragstart | Activated when user begin to drag the node. This event is applied on the dragged node. |
| node:drag | Activated during the dragging process on the node. This event is applied on the dragged node. |
| node:dragend | Activated when user stop dragging on the node. This event is applied on the dragged node. |
| node:dragenter | Activated when drag the node into a target item. This event is applied on the dragged node. |
| node:dragleave | Activated when drag the node out of a target item. This event is applied on the target item. |
| node:drop | Activated when drop an item on a target item. This event is applied on the target item. |


## Edge Event

| Event Name | Description |
| --- | --- |
| edge:click | Activated when user click the **left button** of the mouse on the edge. |
| edge:dblclick | Activated when user double click the **left button** of the mouse on the edge. |
| edge:mouseenter | Activated when the mouse enter the edge. |
| edge:mousemove | Activated while the mouse move inside the edge. It cannot be activated by keyboard. |
| edge:mouseout | Activated while the mouse move out of the edge. |
| edge:mouseover | Activated when the mouse move over the edge. |
| edge:mouseleave | Activated when the mouse leave the edge. |
| edge:mousedown | Activated when the left or right button is clicked down on the edge. It cannot be activated by keyboard. |
| edge:mouseup | Activated when the left or right button is released on the edge. It cannot be activated by keyboard. |
| edge:contextmenu | Open the context menu when user click the right button of mouse on the edge. |


## Canvas Event

| Event Name | Description |
| --- | --- |
| canvas:click | Activated when user click the **left button** of the mouse on the canvas. |
| canvas:dblclick | Activated when user double click the **left button** of the mouse on the canvas. |
| canvas:mouseenter | Activated when the mouse enter the canvas. |
| canvas:mousemove | Activated while the mouse move inside the canvas. It cannot be activated by keyboard. |
| canvas:mouseout | Activated while the mouse move out of the canvas. |
| canvas:mouseover | Activated when the mouse move over the canvas. |
| canvas:mouseleave | Activated when the mouse leave the canvas. |
| canvas:mousedown | Activated when the left or right button is clicked down on the canvas. It cannot be activated by keyboard. |
| canvas:mouseup | Activated when the left or right button is released on the canvas. It cannot be activated by keyboard. |
| canvas:contextmenu | Open the context menu when user click the right button of mouse on the canvas. |
| canvas:dragstart | Activated when user begin to drag the canvas. This event is applied on the dragged canvas. |
| canvas:drag | Activated during the dragging process on the canvas. This event is applied on the dragged canvas. |
| canvas:dragend | Activated when user stop dragging on the canvas. This event is applied on the dragged canvas. |
| canvas:dragenter | Activated when drag the canvas into a target item. This event is applied on the target item. |
| canvas:dragleave | Activated when drag the canvas out of a target item. This event is applied on the target item. |


## The Timing of Listener
Before and after being called some functions, G6 exports the timing events.

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
| beforelayout | Activated before graph layout. `render` will layout the graph, so `render` will also activate this event. |
| afterlayout | Activated after graph layout being done. `render` will layout the graph, so `render` will also activate this event.  |


The callback paramters are different for custom events.

### beforeadditem

| Name | Type | Description |
| --- | --- | --- |
| type | String | The type of the item to be added. |
| model | Object | The data model of the item to be added. |


### afteradditem

| Name | Type | Description |
| --- | --- | --- |
| item | Item | Type type of the added item. |
| model | Object | The data model of the added item. |


### beforeremoveitem / afterremoveitem

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be deleted. |


### beforeupdateitem / afterupdateitem

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be updated. |
| model | Object | The data model of the item to be updated. |


### beforeitemvisibilitychange / afteritemvisibilitychange

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be manipulated. |
| visible | Boolean | Whether the item is visible. `true` for visible, `false` for invisible. |


### beforeitemstatechange / afteritemstatechange

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be manipulated. |
| state | String | The state name. |
| enabled | Boolean | Wheter the state is enabled. `true` for enabled, `false` for unabled. |


### beforeitemstatesclear / afteritemstatesclear

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be manipulated. |
| states | Array / String | The states to be cleared. |


### beforeitemrefresh / afteritemrefresh

| Name | Type | Description |
| --- | --- | --- |
| item | Item | The item to be manipulated. |
