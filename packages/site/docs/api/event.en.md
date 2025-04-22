---
title: Event Listening
order: 11
---

## Overview of the Event System

G6 provides a powerful event mechanism that allows you to respond to various interactive behaviors occurring in the chart, such as node clicks, edge hovers, canvas drags, etc. Through the event system, you can implement complex interactive logic to enhance user experience.

### Event Categories

Events in G6 can be broadly categorized into the following types:

1. **Element Events**: Events related to nodes, edges, and Combos, such as `node:click`, `edge:mouseenter`
2. **Canvas Events**: Events related to the entire canvas, such as `canvas:drag`, `canvas:zoom`
3. **Lifecycle Events**: Events related to the chart lifecycle, such as `beforerender`, `afterrender`

### Event Naming Convention

G6 events follow the `[object]:[event]` format, for example:

- `node:click` - Node click event
- `edge:mouseenter` - Mouse enters edge event
- `canvas:drag` - Canvas drag event

## Best Practice: Using Constant Enums

G6 provides a complete set of event constant enums, and it is **strongly recommended** to use these constants instead of directly using string event names:

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent, GraphEvent } from '@antv/g6';

// Use constant enums to listen to events
graph.on(NodeEvent.CLICK, handleNodeClick);
graph.on(EdgeEvent.POINTER_OVER, handleEdgeHover);
graph.on(CanvasEvent.DRAG, handleCanvasDrag);
graph.on(GraphEvent.AFTER_RENDER, handleAfterRender);
```

**Advantages**:

- Type safety, avoiding string spelling errors
- Provides intelligent code hints and auto-completion

## API Reference

### Graph.on(eventName, callback, once)

Listen to a specified event and execute a callback function when the event is triggered.

```typescript
on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void, once?: boolean): this;
```

#### Parameters

| Parameter | Description                                            | Type               | Default | Required |
| --------- | ------------------------------------------------------ | ------------------ | ------- | -------- |
| eventName | Name of the event to listen to                         | string             | -       | ✓        |
| callback  | Callback function executed when the event is triggered | (event: T) => void | -       | ✓        |
| once      | Whether to listen only once                            | boolean            | -       |          |

#### Return Value

- **Type:** this (Graph instance)
- **Description:** Returns the graph instance itself, supporting chain calls

#### Example

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent } from '@antv/g6';

// Listen to node click event
graph.on(NodeEvent.CLICK, (evt) => {
  const { target } = evt; // Get the ID of the clicked node
  console.log(`Node ${target.id} was clicked`);

  // Get node data
  const nodeData = graph.getNodeData(target.id);
  console.log('Node data:', nodeData);

  // Modify node state
  graph.setElementState(target.id, 'selected');
});

// Listen to edge mouse enter event
graph.on(EdgeEvent.POINTER_OVER, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'highlight');
});

// Listen to canvas drag event
graph.on(CanvasEvent.DRAG, (evt) => {
  console.log('Canvas is being dragged');
});
```

### Graph.once(eventName, callback)

Listen to an event once, and automatically remove the listener after the event is triggered once.

```typescript
once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void): this;
```

#### Parameters

| Parameter | Description                                            | Type               | Default | Required |
| --------- | ------------------------------------------------------ | ------------------ | ------- | -------- |
| eventName | Name of the event to listen to                         | string             | -       | ✓        |
| callback  | Callback function executed when the event is triggered | (event: T) => void | -       | ✓        |

#### Return Value

- **Type:** this (Graph instance)
- **Description:** Returns the graph instance itself, supporting chain calls

#### Example

```typescript
import { GraphEvent, NodeEvent } from '@antv/g6';

// Listen to the chart's first load completion event, executed only once
graph.once(GraphEvent.AFTER_RENDER, () => {
  console.log('Chart rendered for the first time');
  // Execute one-time initialization operations
  highlightImportantNodes();
});

// Wait for the user to click a node for the first time and then perform operations
graph.once(NodeEvent.CLICK, (evt) => {
  console.log('User clicked a node for the first time:', evt.target.id);
  showTutorialTip('You can drag nodes to change their position');
});
```

### Graph.off()

Remove all event listeners.

```typescript
off(): this;
```

#### Return Value

- **Type:** this (Graph instance)
- **Description:** Returns the graph instance itself, supporting chain calls

#### Example

```typescript
// Remove all event listeners
graph.off();
console.log('All event listeners have been removed');
```

### Graph.off(eventName)

Remove all listeners of a specified event type.

```typescript
off(eventName: string): this;
```

#### Parameters

| Parameter | Description                 | Type   | Default | Required |
| --------- | --------------------------- | ------ | ------- | -------- |
| eventName | Name of the event to remove | string | -       | ✓        |

#### Return Value

- **Type:** this (Graph instance)
- **Description:** Returns the graph instance itself, supporting chain calls

#### Example

```typescript
import { NodeEvent } from '@antv/g6';

// Remove all node click event listeners
graph.off(NodeEvent.CLICK);
console.log('All node click event listeners have been removed');

// Remove related temporary event listeners after a certain operation mode ends
function exitEditMode() {
  // Remove all listeners in edit mode
  graph.off(NodeEvent.DRAG_END);
  graph.off(NodeEvent.DROP);
  console.log('Exited edit mode');
}
```

### Graph.off(eventName, callback)

Remove a specific callback function for a specific event.

```typescript
off(eventName: string, callback: (...args: any[]) => void): this;
```

#### Parameters

| Parameter | Description                 | Type                     | Default | Required |
| --------- | --------------------------- | ------------------------ | ------- | -------- |
| eventName | Name of the event to remove | string                   | -       | ✓        |
| callback  | Callback function to remove | (...args: any[]) => void | -       | ✓        |

#### Return Value

- **Type:** this (Graph instance)
- **Description:** Returns the graph instance itself, supporting chain calls

#### Example

```typescript
import { NodeEvent } from '@antv/g6';

// Define callback function
const handleNodeClick = (evt) => {
  console.log('Node clicked:', evt.target.id);
};

// Add listener
graph.on(NodeEvent.CLICK, handleNodeClick);

// Later, remove this specific listener at a certain point
graph.off(NodeEvent.CLICK, handleNodeClick);
console.log('Specific node click event listener has been removed');
```

## Event Constant Enums

G6 provides various event constant enums to facilitate developers in using standardized event names. Below is a detailed description of all event constants:

### Node Events (NodeEvent)

| Constant Name | Event Name          | Description                                                                   |
| ------------- | ------------------- | ----------------------------------------------------------------------------- |
| CLICK         | `node:click`        | Triggered when a node is clicked                                              |
| DBLCLICK      | `node:dblclick`     | Triggered when a node is double-clicked                                       |
| POINTER_OVER  | `node:pointerover`  | Triggered when the pointer enters a node                                      |
| POINTER_LEAVE | `node:pointerleave` | Triggered when the pointer leaves a node                                      |
| POINTER_ENTER | `node:pointerenter` | Triggered when the pointer enters a node or its child elements (non-bubbling) |
| POINTER_MOVE  | `node:pointermove`  | Triggered when the pointer moves over a node                                  |
| POINTER_OUT   | `node:pointerout`   | Triggered when the pointer leaves a node                                      |
| POINTER_DOWN  | `node:pointerdown`  | Triggered when the pointer is pressed down on a node                          |
| POINTER_UP    | `node:pointerup`    | Triggered when the pointer is released on a node                              |
| CONTEXT_MENU  | `node:contextmenu`  | Triggered when the context menu is opened on a node                           |
| DRAG_START    | `node:dragstart`    | Triggered when dragging a node starts                                         |
| DRAG          | `node:drag`         | Triggered during node dragging                                                |
| DRAG_END      | `node:dragend`      | Triggered when node dragging ends                                             |
| DRAG_ENTER    | `node:dragenter`    | Triggered when a draggable item enters a node                                 |
| DRAG_OVER     | `node:dragover`     | Triggered when a draggable item is over a node                                |
| DRAG_LEAVE    | `node:dragleave`    | Triggered when a draggable item leaves a node                                 |
| DROP          | `node:drop`         | Triggered when a draggable item is dropped on a node                          |

### Edge Events (EdgeEvent)

| Constant Name | Event Name          | Description                                                                    |
| ------------- | ------------------- | ------------------------------------------------------------------------------ |
| CLICK         | `edge:click`        | Triggered when an edge is clicked                                              |
| DBLCLICK      | `edge:dblclick`     | Triggered when an edge is double-clicked                                       |
| POINTER_OVER  | `edge:pointerover`  | Triggered when the pointer enters an edge                                      |
| POINTER_LEAVE | `edge:pointerleave` | Triggered when the pointer leaves an edge                                      |
| POINTER_ENTER | `edge:pointerenter` | Triggered when the pointer enters an edge or its child elements (non-bubbling) |
| POINTER_MOVE  | `edge:pointermove`  | Triggered when the pointer moves over an edge                                  |
| POINTER_OUT   | `edge:pointerout`   | Triggered when the pointer leaves an edge                                      |
| POINTER_DOWN  | `edge:pointerdown`  | Triggered when the pointer is pressed down on an edge                          |
| POINTER_UP    | `edge:pointerup`    | Triggered when the pointer is released on an edge                              |
| CONTEXT_MENU  | `edge:contextmenu`  | Triggered when the context menu is opened on an edge                           |
| DRAG_ENTER    | `edge:dragenter`    | Triggered when a draggable item enters an edge                                 |
| DRAG_OVER     | `edge:dragover`     | Triggered when a draggable item is over an edge                                |
| DRAG_LEAVE    | `edge:dragleave`    | Triggered when a draggable item leaves an edge                                 |
| DROP          | `edge:drop`         | Triggered when a draggable item is dropped on an edge                          |

### Combo Events (ComboEvent)

| Constant Name | Event Name           | Description                                                                    |
| ------------- | -------------------- | ------------------------------------------------------------------------------ |
| CLICK         | `combo:click`        | Triggered when a Combo is clicked                                              |
| DBLCLICK      | `combo:dblclick`     | Triggered when a Combo is double-clicked                                       |
| POINTER_OVER  | `combo:pointerover`  | Triggered when the pointer enters a Combo                                      |
| POINTER_LEAVE | `combo:pointerleave` | Triggered when the pointer leaves a Combo                                      |
| POINTER_ENTER | `combo:pointerenter` | Triggered when the pointer enters a Combo or its child elements (non-bubbling) |
| POINTER_MOVE  | `combo:pointermove`  | Triggered when the pointer moves over a Combo                                  |
| POINTER_OUT   | `combo:pointerout`   | Triggered when the pointer leaves a Combo                                      |
| POINTER_DOWN  | `combo:pointerdown`  | Triggered when the pointer is pressed down on a Combo                          |
| POINTER_UP    | `combo:pointerup`    | Triggered when the pointer is released on a Combo                              |
| CONTEXT_MENU  | `combo:contextmenu`  | Triggered when the context menu is opened on a Combo                           |
| DRAG_START    | `combo:dragstart`    | Triggered when dragging a Combo starts                                         |
| DRAG          | `combo:drag`         | Triggered during Combo dragging                                                |
| DRAG_END      | `combo:dragend`      | Triggered when Combo dragging ends                                             |
| DRAG_ENTER    | `combo:dragenter`    | Triggered when a draggable item enters a Combo                                 |
| DRAG_OVER     | `combo:dragover`     | Triggered when a draggable item is over a Combo                                |
| DRAG_LEAVE    | `combo:dragleave`    | Triggered when a draggable item leaves a Combo                                 |
| DROP          | `combo:drop`         | Triggered when a draggable item is dropped on a Combo                          |

### Canvas Events (CanvasEvent)

| Constant Name | Event Name            | Description                                                                       |
| ------------- | --------------------- | --------------------------------------------------------------------------------- |
| CLICK         | `canvas:click`        | Triggered when clicking on the canvas blank area                                  |
| DBLCLICK      | `canvas:dblclick`     | Triggered when double-clicking on the canvas blank area                           |
| POINTER_OVER  | `canvas:pointerover`  | Triggered when the pointer enters the canvas                                      |
| POINTER_LEAVE | `canvas:pointerleave` | Triggered when the pointer leaves the canvas                                      |
| POINTER_ENTER | `canvas:pointerenter` | Triggered when the pointer enters the canvas or its child elements (non-bubbling) |
| POINTER_MOVE  | `canvas:pointermove`  | Triggered when the pointer moves over the canvas                                  |
| POINTER_OUT   | `canvas:pointerout`   | Triggered when the pointer leaves the canvas                                      |
| POINTER_DOWN  | `canvas:pointerdown`  | Triggered when the pointer is pressed down on the canvas                          |
| POINTER_UP    | `canvas:pointerup`    | Triggered when the pointer is released on the canvas                              |
| CONTEXT_MENU  | `canvas:contextmenu`  | Triggered when the context menu is opened on the canvas                           |
| DRAG_START    | `canvas:dragstart`    | Triggered when dragging the canvas starts                                         |
| DRAG          | `canvas:drag`         | Triggered during canvas dragging                                                  |
| DRAG_END      | `canvas:dragend`      | Triggered when canvas dragging ends                                               |
| DRAG_ENTER    | `canvas:dragenter`    | Triggered when a draggable item enters the canvas                                 |
| DRAG_OVER     | `canvas:dragover`     | Triggered when a draggable item is over the canvas                                |
| DRAG_LEAVE    | `canvas:dragleave`    | Triggered when a draggable item leaves the canvas                                 |
| DROP          | `canvas:drop`         | Triggered when a draggable item is dropped on the canvas                          |
| WHEEL         | `canvas:wheel`        | Triggered when scrolling the mouse wheel on the canvas                            |

### Graph Lifecycle Events (GraphEvent)

| Constant Name            | Event Name               | Description                                    |
| ------------------------ | ------------------------ | ---------------------------------------------- |
| BEFORE_CANVAS_INIT       | `beforecanvasinit`       | Triggered before canvas initialization         |
| AFTER_CANVAS_INIT        | `aftercanvasinit`        | Triggered after canvas initialization          |
| BEFORE_SIZE_CHANGE       | `beforesizechange`       | Triggered before viewport size change          |
| AFTER_SIZE_CHANGE        | `aftersizechange`        | Triggered after viewport size change           |
| BEFORE_ELEMENT_CREATE    | `beforeelementcreate`    | Triggered before element creation              |
| AFTER_ELEMENT_CREATE     | `afterelementcreate`     | Triggered after element creation               |
| BEFORE_ELEMENT_UPDATE    | `beforeelementupdate`    | Triggered before element update                |
| AFTER_ELEMENT_UPDATE     | `afterelementupdate`     | Triggered after element update                 |
| BEFORE_ELEMENT_DESTROY   | `beforeelementdestroy`   | Triggered before element destruction           |
| AFTER_ELEMENT_DESTROY    | `afterelementdestroy`    | Triggered after element destruction            |
| BEFORE_ELEMENT_TRANSLATE | `beforeelementtranslate` | Triggered before element translation           |
| AFTER_ELEMENT_TRANSLATE  | `afterelementtranslate`  | Triggered after element translation            |
| BEFORE_DRAW              | `beforedraw`             | Triggered before drawing starts                |
| AFTER_DRAW               | `afterdraw`              | Triggered after drawing ends                   |
| BEFORE_RENDER            | `beforerender`           | Triggered before rendering starts              |
| AFTER_RENDER             | `afterrender`            | Triggered after rendering completes            |
| BEFORE_ANIMATE           | `beforeanimate`          | Triggered before animation starts              |
| AFTER_ANIMATE            | `afteranimate`           | Triggered after animation ends                 |
| BEFORE_LAYOUT            | `beforelayout`           | Triggered before layout starts                 |
| AFTER_LAYOUT             | `afterlayout`            | Triggered after layout ends                    |
| BEFORE_STAGE_LAYOUT      | `beforestagelayout`      | Triggered before each stage in pipeline layout |
| AFTER_STAGE_LAYOUT       | `afterstagelayout`       | Triggered after each stage in pipeline layout  |
| BEFORE_TRANSFORM         | `beforetransform`        | Triggered before viewport transformation       |
| AFTER_TRANSFORM          | `aftertransform`         | Triggered after viewport transformation        |
| BATCH_START              | `batchstart`             | Triggered when batch operation starts          |
| BATCH_END                | `batchend`               | Triggered when batch operation ends            |
| BEFORE_DESTROY           | `beforedestroy`          | Triggered before chart destruction             |
| AFTER_DESTROY            | `afterdestroy`           | Triggered after chart destruction              |
| BEFORE_RENDERER_CHANGE   | `beforerendererchange`   | Triggered before renderer change               |
| AFTER_RENDERER_CHANGE    | `afterrendererchange`    | Triggered after renderer change                |

### Container Events (ContainerEvent)

| Constant Name | Event Name | Description                                   |
| ------------- | ---------- | --------------------------------------------- |
| KEY_DOWN      | `keydown`  | Triggered when a keyboard key is pressed down |
| KEY_UP        | `keyup`    | Triggered when a keyboard key is released     |

### Common Events (CommonEvent)

These are events without prefixes and can be used to listen to global events:

| Constant Name | Event Name     | Description                                                                        |
| ------------- | -------------- | ---------------------------------------------------------------------------------- |
| CLICK         | `click`        | Triggered when any element is clicked                                              |
| DBLCLICK      | `dblclick`     | Triggered when any element is double-clicked                                       |
| POINTER_OVER  | `pointerover`  | Triggered when the pointer enters any element                                      |
| POINTER_LEAVE | `pointerleave` | Triggered when the pointer leaves any element                                      |
| POINTER_ENTER | `pointerenter` | Triggered when the pointer enters any element or its child elements (non-bubbling) |
| POINTER_MOVE  | `pointermove`  | Triggered when the pointer moves over any element                                  |
| POINTER_OUT   | `pointerout`   | Triggered when the pointer leaves any element                                      |
| POINTER_DOWN  | `pointerdown`  | Triggered when the pointer is pressed down on any element                          |
| POINTER_UP    | `pointerup`    | Triggered when the pointer is released on any element                              |
| CONTEXT_MENU  | `contextmenu`  | Triggered when the context menu is opened on any element                           |
| DRAG_START    | `dragstart`    | Triggered when dragging any element starts                                         |
| DRAG          | `drag`         | Triggered during any element dragging                                              |
| DRAG_END      | `dragend`      | Triggered when any element dragging ends                                           |
| DRAG_ENTER    | `dragenter`    | Triggered when a draggable item enters any element                                 |
| DRAG_OVER     | `dragover`     | Triggered when a draggable item is over any element                                |
| DRAG_LEAVE    | `dragleave`    | Triggered when a draggable item leaves any element                                 |
| DROP          | `drop`         | Triggered when a draggable item is dropped on any element                          |
| KEY_DOWN      | `keydown`      | Triggered when a keyboard key is pressed down                                      |
| KEY_UP        | `keyup`        | Triggered when a keyboard key is released                                          |
| WHEEL         | `wheel`        | Triggered when scrolling the mouse wheel                                           |
| PINCH         | `pinch`        | Triggered when pinching or spreading fingers on a multi-touch screen               |

## Tips for Use

### Chain Calls

G6's event API supports chain calls, allowing you to register multiple events consecutively:

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent } from '@antv/g6';

// Use constant enums + chain calls
graph.on(NodeEvent.CLICK, handleNodeClick).on(EdgeEvent.CLICK, handleEdgeClick).on(CanvasEvent.WHEEL, handleCanvasZoom);
```

### Event Delegation

You can use the event bubbling mechanism to listen to all child element events on the parent element:

```typescript
import { CommonEvent } from '@antv/g6';

// Handle all element click events uniformly
graph.on(CommonEvent.CLICK, (evt) => {
  const { targetType, target } = evt;
  if (targetType === 'node') {
    console.log('Clicked on node:', target.id);
  } else if (targetType === 'edge') {
    console.log('Clicked on edge:', target.id);
  } else {
    console.log('Clicked on canvas blank area');
  }
});
```

### Event Object Properties

Most event callback functions receive an event object containing the following common properties:

- `target` - The element that triggered the event
- `targetType` - The type of the element that triggered the event (node/edge/combo/canvas)
- `originalTarget` - The original graphic that triggered the event
- `currentTarget` - The current object that triggered the event
- `originalEvent` - The original browser event object

With these properties, you can precisely control interactive behavior.
