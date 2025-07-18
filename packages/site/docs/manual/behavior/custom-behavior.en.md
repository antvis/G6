---
title: Custom Behavior
order: 16
---

## Overview

Custom behavior allows users to define one or more related interaction behaviors as a complete interaction based on the comprehensive [event mechanism](/en/api/event) provided by G6, thereby achieving interaction logic that fits business scenarios.

### Execution Logic of Behavior

Typically:

1. Listen for user interaction events

2. Update the canvas or perform other operations based on the events

For example, the `DragCanvas` behavior listens for pointer drag events and updates the camera position based on the drag distance.

### Difference Between Behavior and Plugin

- Both behavior and plugin base classes are derived from the [BaseExtension](https://github.com/antvis/G6/blob/v5/packages/g6/src/registry/extension/index.ts) base class within G6, so the implementation methods for behavior and plugin are basically the same.
- However, based on the concept of visualization, behavior is usually used to handle user interaction events, while plugins are usually used to handle canvas rendering logic, additional component rendering, etc.

:::info{title=Tip}
Due to conceptual distinctions, behavior instances cannot be obtained, while plugin instances can be obtained ([getPluginInstance](/en/api/plugin#graphgetplugininstancekey)).
:::

## When to Use Custom Behavior?

- **Purpose**:

  When users need to implement interaction logic that fits business scenarios, we usually need to cooperate with G6's event system to respond to related events and execute the required interaction logic.

- **Without Custom Behavior**:

  If custom behavior is not used, users need to perform a series of event listening and response processing through `graph.on` after creating a Graph instance, making code logic processing and orchestration extremely difficult.

- **Advantages of Behavior**:

  Each behavior is an independent code module, and the existence of the behavior system facilitates users to decouple business logic, avoid code bloat, and facilitate subsequent maintenance.

- **Conclusion**:

  > 1. When users need to implement any interaction logic, they should first consider custom behavior.
  > 2. When built-in behavior cannot fully meet business needs, users can also adjust and modify through custom behavior (inheriting built-in behavior).
  >
  > _(If the features supported by built-in behavior are more general, or if there are bugs in built-in behavior, you are welcome to submit issues or PRs on [Github](https://github.com/antvis/G6))_

## Implementing Behavior

The implementation of a behavior is quite flexible, and you can implement your behavior in your preferred style.

Below is a simple custom behavior implementation. When the user clicks on the canvas, a node is added to the canvas (the fill color of the added node can be defined through behavior configuration):

```typescript
import type { BaseBehaviorOptions, RuntimeContext, IPointerEvent } from '@antv/g6';
import { BaseBehavior, CanvasEvent } from '@antv/g6';

interface ClickAddNodeOptions extends BaseBehaviorOptions {
  fill: string;
}

export class ClickAddNode extends BaseBehavior<ClickAddNodeOptions> {
  static defaultOptions: Partial<ClickAddNodeOptions> = {
    fill: 'red',
  };
  constructor(context: RuntimeContext, options: ClickAddNodeOptions) {
    super(context, Object.assign({}, ClickAddNode.defaultOptions, options));
    this.bindEvents();
  }
  private bindEvents() {
    const { graph } = this.context;
    graph.on(CanvasEvent.CLICK, this.addNode);
  }
  private addNode = (event: IPointerEvent) => {
    const { graph } = this.context;
    const { layerX, layerY } = event.nativeEvent as PointerEvent;
    graph.addNodeData([
      {
        id: 'node-' + Date.now(),
        style: { x: layerX, y: layerY, fill: this.options.fill },
      },
    ]);
    graph.draw();
  };
  private unbindEvents() {
    const { graph } = this.context;
    graph.off(CanvasEvent.CLICK, this.addNode);
  }
  public destroy() {
    // Unbind events when destroyed
    this.unbindEvents();
    super.destroy();
  }
}
```

- In the example code, we implemented a `ClickAddNode` behavior, which adds an event listener to the Graph in the constructor. When the user clicks on the canvas, a node is added at the click position, and the fill color of the added node can be configured.
- `BaseBehavior` is the base class for all behaviors, and each custom behavior needs to inherit this base class.

> Click on the blank area of the canvas below to add a node, and switch the right panel to configure the node color.

<embed src="@/common/manual/custom-extension/behavior/implement-behaviors.md"></embed>

:::info{title=Tip}
The above example is the simplest behavior implementation. In actual development, you may also need to handle logic such as enabling and disabling behaviors.

In addition, there may be event conflicts between multiple behaviors, and you need to handle these conflicts carefully.
:::

## Registering Behavior

Register through the register method provided by G6

```typescript
import { ExtensionCategory, register } from '@antv/g6';
import { ClickAddNode } from 'your-custom-behavior-path';

register(ExtensionCategory.BEHAVIOR, 'click-add-node', ClickAddNode);
```

## Configuring Behavior

You can pass in the behavior type name or configuration parameter object in `behaviors`, such as the above ClickAddNode. See [Configuring Behavior](/en/manual/behavior/overview#配置和使用) for details.

```typescript
const graph = new Graph({
  // Other configurations
  behaviors: [
    {
      type: 'click-add-node',
      fill: 'blue',
    },
  ],
});
```
