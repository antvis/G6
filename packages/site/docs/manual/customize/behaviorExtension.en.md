---
title: Custom Behavior
order: 3
---

Interaction is an important concept in G6, which refers to the process of user interaction with the canvas or graphics. G6 has built-in some interactions, such as drag and drop, zoom, box selection, mouse hover, etc. At the same time, G6 also supports user-defined interactions.

Custom interactions by inheriting the [Behavior](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/types/behavior.ts#L11) class.

```ts
import { Behavior } from '@antv/g6';

class CustomBehavior extends Behavior {
  // Override method
  // Class method
}
```

## Override method

### getEvents <Badge type="warning">Required</Badge>

**Type**: `() => { [key in string]: string }`

Get the event listener for the interaction

## Example

Here is an example of a custom interaction. When the mouse double-clicks the canvas, the canvas content is scaled to the appropriate size.

```ts
import { Graph as BaseGraph, Behavior, extend } from '@antv/g6';

class ClickFitView extends Behavior {
  getEvents() {
    return {
      'canvas:dblclick': this.fitView,
    };
  }

  fitView() {
    this.graph.fitView();
  }
}

const Graph = extend(BaseGraph, {
  behaviors: {
    clickFitView: ClickFitView,
  },
});

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 500,
  // Enable clickFitView interaction
  modes: {
    default: ['clickFitView'],
  },
});
```
