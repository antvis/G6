---
title: Custom Layout
order: 3
---

## Overview

In G6, layouts are divided into two types: 'iterative layout' and 'non-iterative layout'. An iterative layout refers to a layout algorithm that iterates multiple times until convergence, while a non-iterative layout refers to a layout algorithm that executes only once.

## Implement Layout

### Non-Iterative Layout

Implementing a non-iterative layout is relatively straightforward; you only need to implement the `execute` method in `BaseLayout`. Below is a simple implementation of a custom layout:

```typescript
import { BaseLayout } from '@antv/g6';
import type { GraphData } from '@antv/g6';

class DiagonalLayout extends BaseLayout {
  id = 'diagonal-layout';

  async execute(data: GraphData): Promise<GraphData> {
    const { nodes = [] } = data;
    return {
      nodes: nodes.map((node, index) => ({
        id: node.id,
        style: {
          x: 50 * index + 25,
          y: 50 * index + 25,
        },
      })),
    };
  }
}
```

In the code above, we implemented a simple layout algorithm that arranges nodes along a diagonal line starting from the top-left corner.

<embed src="@/common/manual/custom-extension/layout/non-iterative-layout.md"></embed>

:::info{title=info}

The `execute` method returns a GraphData object, which only needs to contain the basic information of the elements (such as id, source, target) and the properties added by the layout (such as x, y, control points of edges, etc.), and does not need to contain other unnecessary information.
If you only need to layout the nodes, you can return only the node information and do not need to return the edge information.
:::

### Iterative Layout

The implementation of an iterative layout also requires inheriting from `BaseLayout`, but in addition to `execute`, you also need to implement the `tick` and `stop` methods. The `tick` method is used to iterate the layout to a specified number of rounds, and the `stop` method is used to stop the layout iteration.

In addition, in iterative layouts, you need to call `options.onTick` each time the layout iterates to trigger the graph update.

```typescript
type onTick = (data: GraphData) => void;
```

Below is a simple implementation of an iterative layout:

```typescript
import { BaseLayout } from '@antv/g6';
import type { GraphData, BaseLayoutOptions } from '@antv/g6';

interface TickTockLayoutOptions extends BaseLayoutOptions {
  onTick: (data: GraphData) => void;
}

class TickTockLayout extends BaseLayout<TickTockLayoutOptions> {
  public id = 'custom-layout';

  private tickCount = 0;

  private data?: GraphData;

  private timer?: number;

  private resolve?: () => void;

  private promise?: Promise<void>;

  async execute(data: GraphData, options: TickTockLayoutOptions): Promise<GraphData> {
    const { onTick } = { ...this.options, ...options };

    this.tickCount = 0;
    this.data = data;

    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.timer = window.setInterval(() => {
      onTick(this.simulateTick());
      if (this.tickCount === 10) this.stop();
    }, 200);

    await this.promise;

    return this.simulateTick();
  }

  simulateTick = () => {
    const x = this.tickCount++ % 2 === 0 ? 50 : 150;

    return {
      nodes: (this?.data?.nodes || []).map((node, index) => ({
        id: node.id,
        style: { x, y: (index + 1) * 30 },
      })),
    };
  };

  tick = () => {
    return this.simulateTick();
  };

  stop = () => {
    clearInterval(this.timer);
    this.resolve?.();
  };
}
```

In this example, we have implemented a simple iterative layout algorithm that toggles the x-coordinate of the nodes between 50 and 150 every 200 milliseconds and arranges them in order along the y-axis according to the sequence of the nodes.

<embed src="@/common/manual/custom-extension/layout/iterative-layout.md"></embed>

## Register Layout

You can register through the `register` method provided by G6. For more details, please refer to [Register Layout](/en/manual/core-concept/layout#register-layout)

## Configure Layout

The type and parameters of the layout can be configured in `options.layout`. For more details, please refer to [Configure Layout](/en/manual/core-concept/layout#configure-layout)
