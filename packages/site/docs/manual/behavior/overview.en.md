---
title: Behavior Overview
order: 0
---

## What is Behavior

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

Behavior refers to the interactive operations between users and chart elements, such as dragging the canvas, selecting nodes, zooming the view, etc. Good behavior design allows users to explore and understand graph data more intuitively. **Proper configuration of behaviors is a key step in building efficient and usable charts**.

### Changes in G6 5.0 Behavior System

G6 5.0 removed the concept of "Behavior Mode" (Mode), and directly lists the required behavior behaviors in `behaviors`, simplifying the configuration. This makes behavior configuration more intuitive and easier to get started with.

```javascript {4}
import { Graph } from '@antv/g6';

const graph = new Graph({
  behaviors: ['drag-canvas', 'zoom-canvas', 'click-select'],
});
```

## Built-in Behaviors

G6 provides a variety of built-in behaviors that are **ready to use without registration**:

| Category            | Behavior Name                                                                  | Registration Type             | Function Description                                         |
| ------------------- | ------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------ |
| Navigation          |                                                                                |                               |                                                              |
|                     | [Drag Canvas](/en/manual/behavior/drag-canvas)                                 | `drag-canvas`                 | Drag the entire canvas view                                  |
|                     | [Zoom Canvas](/en/manual/behavior/zoom-canvas)                                 | `zoom-canvas`                 | Zoom the canvas view                                         |
|                     | [Scroll Canvas](/en/manual/behavior/scroll-canvas)                             | `scroll-canvas`               | Scroll the canvas using the wheel                            |
|                     | [Optimize Viewport Transform](/en/manual/behavior/optimize-viewport-transform) | `optimize-viewport-transform` | Optimize view transform performance                          |
| Selection           |                                                                                |                               |                                                              |
|                     | [Click Select](/en/manual/behavior/click-select)                               | `click-select`                | Click to select graph elements                               |
|                     | [Brush Select](/en/manual/behavior/brush-select)                               | `brush-select`                | Select elements by dragging a rectangular area               |
|                     | [Lasso Select](/en/manual/behavior/lasso-select)                               | `lasso-select`                | Freely draw an area to select elements                       |
| Editing             |                                                                                |                               |                                                              |
|                     | [Create Edge](/en/manual/behavior/create-edge)                                 | `create-edge`                 | Interactively create new edges                               |
|                     | [Drag Element](/en/manual/behavior/drag-element)                               | `drag-element`                | Drag nodes or combos                                         |
|                     | [Force-directed Drag](/en/manual/behavior/drag-element-force)                  | `drag-element-force`          | Drag nodes in force-directed layout                          |
| Data Exploration    |                                                                                |                               |                                                              |
|                     | [Collapse/Expand](/en/manual/behavior/collapse-expand)                         | `collapse-expand`             | Expand or collapse subtree nodes                             |
|                     | [Focus Element](/en/manual/behavior/focus-element)                             | `focus-element`               | Focus on specific elements and automatically adjust the view |
|                     | [Hover Activate](/en/manual/behavior/hover-activate)                           | `hover-activate`              | Highlight elements when hovering                             |
| Visual Optimization |                                                                                |                               |                                                              |
|                     | [Fix Element Size](/en/manual/behavior/fix-element-size)                       | `fix-element-size`            | Fix the element size to a specified value                    |
|                     | [Auto-adapt Label](/en/manual/behavior/auto-adapt-label)                       | `auto-adapt-label`            | Automatically adjust label position                          |

For detailed configuration of each behavior, refer to the [Built-in Behavior Documentation](/en/manual/behavior/drag-canvas).

:::warning{title=Behavior Compatibility}
Some behaviors may overlap in triggering mechanisms, such as `brush-select` and `drag-canvas` both using mouse dragging. In such cases, you can avoid conflicts by modifying the trigger key (e.g., hold `Shift` to drag and select).
:::

## Custom Behaviors

When built-in behaviors cannot meet the requirements, G6 provides powerful customization capabilities:

- Extend by inheriting built-in behaviors
- Create entirely new behavior behaviors

Unlike built-in behaviors, **custom behaviors need to be registered before use**. For detailed tutorials, refer to the [Custom Behavior](/en/manual/behavior/custom-behavior) documentation.

## Configuration and Usage

### Basic Configuration

The simplest way is to directly specify the required behaviors through the `behaviors` array when initializing the graph instance:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-canvas', 'zoom-canvas', 'click-select'],
});
```

### Configure Behavior Parameters

For behaviors that require custom parameters, you can configure properties using the `object` form:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    'drag-canvas',
    {
      type: 'zoom-canvas',
      sensitivity: 1.5, // Configure sensitivity
      key: 'zoom-behavior', // Specify a key for the behavior for subsequent updates
    },
  ],
});
```

### Dynamically Update Behaviors

G6 supports dynamically managing behavior behaviors during the runtime of the graph instance to meet complex behavior needs:

You can adjust behaviors using the [setBehaviors](/en/api/behavior#graphsetbehaviorsbehaviors) method:

```javascript
// Add new behavior
graph.setBehaviors((behaviors) => [...behaviors, 'lasso-select']);

// Remove behavior
graph.setBehaviors((behaviors) => behaviors.filter((b) => b !== 'click-select'));
```

You can update the configuration of behaviors using the [updateBehavior](/en/api/behavior#graphupdatebehaviorbehavior) method:

```javascript
// Update a single behavior
graph.updateBehavior({
  key: 'zoom-behavior',
  sensitivity: 2,
  enable: false, // Disable the behavior
});
```

:::warning{title=Note}
When using the `updateBehavior` method, you need to specify a unique `key` for the behavior during initialization.
:::

### Uninstall Behaviors

You can also uninstall behaviors using the [setBehaviors](/en/api/behavior#graphsetbehaviorsbehaviors) method by setting the behavior configuration list to empty:

```javascript
graph.setBehaviors([]);
```

For more behavior-related APIs, refer to the [Behavior API Documentation](/en/api/behavior).

## Behavior and Events

Behaviors are essentially implemented through event listening and response. Although built-in behaviors have encapsulated common behavior behaviors, you can also directly implement custom behavior logic through the event API.

### Event Listening Example

```javascript
// Use event constants (recommended)
import { NodeEvent, EdgeEvent } from '@antv/g6';

// Listen for node clicks
graph.on(NodeEvent.CLICK, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'selected');
});

// Listen for edge hover
graph.on(EdgeEvent.POINTER_OVER, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'highlight');
});
```

The event system is the foundation for implementing behaviors. Mastering the event API is crucial for understanding and extending behavior behaviors. For more event-related information, refer to the [Event Documentation](/en/api/event).
