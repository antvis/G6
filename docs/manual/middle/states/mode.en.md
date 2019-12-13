---
title: Interaction Mode
order: 5
---

## What is Mode
When a user interacts with a graph, there may be different interaction modes due to different intents. For example, clicking a node in edit mode requires a pop-up window for the user to edit, and clicking a node in view mode requires selecting a node.

To address the problem above, G6 provides the interaction Mode. It is a manage mechanism for the [Behavior](/en/docs/manual/middle/states/defaultBehavior) on a graph. There can be multiple interaction modes on a graph, each interaction mode contains multiple interaction [Behavior](/en/docs/manual/middle/states/defaultBehavior)s.

For example, there are two modes on a graph: default and edit:
- default mode contains click to select node behavior and drag canvas behavior;
- edit mode contains click node to pop up an editing window behavior and drag node behavior;

Default mode takes effect by default, which means the node will be selected by clicking insteand of a editing window pops up. You can switch to edit mode by simple code, then the behaviors in the defualt mode will not take effect any more, which means the editing window will pop up when user clicks a node.

## Configure Mode
Configure the `modes` when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  modes: {
   // 支持的 behavior
   default: [ 'drag-canvas', 'zoom-canvas' ],
   edit: [ 'click-select' ]
  }
});
```

There are two modes on the graph defined above: `default` and `edit`. The `default` mode contains two [Behavior](/en/docs/manual/middle/states/defaultBehavior)s: `'drag-canvas'` and `'``zoom-canvas'` with default configurations.

## Switch Mode
The `default` mode takes effect by default. Users are allowed to drag and zoom the canvas. Swich the mode to edit mode by `graph.``setMode('edit')` to select a node by clicking.

```javascript
graph.setMode('edit');
```

Now, the graph supports clicking to select nodes. The `'drag-canvas'` and `'zoom-canvas'` behaviors in `default` do not take effect any more.

`setMode` calls the following operations inside:
- Unbind all the event listeners of current mode;
- Generate new Behaviors. Initialize the events;
- Bind event listeners to the new Behaviors.


## Edit Mode
If there are existing Behaviors ([Built-in Behavior](/en/docs/manual/middle/states/defaultBehavior) or [Custom Behavior](/en/docs/manual/advanced/custom-behavior)), You can add them to a mode by `graph.addBehaviors`, and also remove some Behaviors by `graph.removeBehaviors`:

```javascript
// Add drag-canvas with configurations from default mode
graph.addBehaviors('drag-canvas', 'default');

// Remove drag-canvas from default mode
graph.removeBehaviors('drag-canvas', 'default');

// Add drag-canvas with configurations into edit mode
graph.addBehaviors({ 
  type: 'drag-canvas',
  direction: 'x'
}, 'edit');

// Remove drag-canvas from edit mode
graph.removeBehaviors('drag-canvas', 'edit');

// Add multiple behaviors into default mode
graph.addBehaviors([ 'drag-canvas', 'zoom-canvas' ], 'default');

// Remove multiple behaviors from default mode
graph.removeBehaviors([ 'drag-canvas', 'zoom-canvas' ], 'default');
```

## Related Reading

- [Built-in Behavior](/en/docs/manual/middle/states/defaultBehavior)
- [Custom Behavior](/en/docs/manual/advanced/custom-behavior)
