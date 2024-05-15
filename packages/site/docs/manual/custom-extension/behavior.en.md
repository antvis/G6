---
title: Custom Behavior
order: 2
---

## Overview

The execution logic for interactions typically involves: 1. Listening for user interaction events, 2. Updating the canvas or performing other operations based on the events. For example, the `DragCanvas` interaction listens for pointer drag events and updates the position of the camera based on the distance dragged.

Interactions and plugins are both derived from G6's internal `BaseExtension` base class, so the implementation methods for interactions and plugins are essentially the same. However, based on the concept of visualization, interactions are usually used to handle user interaction events, while plugins are typically used to handle canvas rendering logic, rendering of additional components, etc.

## Implement Interaction

The implementation of an interaction is quite flexible, and you can implement your interaction in the style you prefer.

Below is a simple implementation of a custom interaction that adds a node to the canvas when the user clicks on it:

```typescript
import { BaseBehavior, CanvasEvent } from '@antv/g6';
import type { BaseBehaviorOptions, RuntimeContext, IPointerEvent } from '@antv/g6';

interface ClickAddNodeOptions extends BaseBehaviorOptions {}

class ClickAddNode extends BaseBehavior<ClickAddNodeOptions> {
  constructor(context: RuntimeContext, options: ClickAddNodeOptions) {
    super(context, options);

    const { graph } = this.context;
    graph.on(`canvas:${CanvasEvent.CLICK}`, (event: IPointerEvent) => {
      const { layerX, layerY } = event.nativeEvent as PointerEvent;
      graph.addNodeData([
        {
          id: 'node-' + Date.now(),
          style: { x: layerX, y: layerY },
        },
      ]);
      graph.draw();
    });
  }
}
```

In the example code, we implemented an interaction called `ClickAddNode` based on `BaseBehavior`. This interaction adds an event listener to the Graph in its constructor. When the user clicks on the canvas, a node will be added at the clicked position.

> Click on an empty space in the canvas below to add a node

<embed src="@/docs/manual/custom-extension-common/behavior/implement-interactions.md"></embed>

:::info{title=info}

The above example is the simplest implementation of an interaction. In actual development, you will also need to handle the destruction of event listeners, enabling and disabling interactions, and other logic.

In addition, there may be event conflicts between multiple interactions, and you will need to carefully manage these conflicts.
:::

## Register Interaction

You can register interactions through the registration method provided by G6. For more details, see [Register Interaction](/en/manual/core-concept/behavior#register-interaction).

## Configure Interaction

You can pass the name of the interaction type or a configuration parameters object in the `behaviors`. For more details, see [Configure Interaction](/en/manual/core-concept/behavior#configure-interaction)
