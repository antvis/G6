---
title: 自定义布局
order: 1
---

## 概述

G6 中布局分为`迭代布局`和`非迭代布局`两种，迭代布局是指布局算法会迭代多次直到收敛，非迭代布局是指布局算法只执行一次。

## 实现布局

### 非迭代布局

实现一个非迭代布局相对简单，只需要实现 `BaseLayout` 中的 `execute` 方法即可，下面是一个简单的自定义布局实现：

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

在上面的代码中，我们实现了一个简单的布局算法，将节点从左上角沿对角线排列。

<embed src="@/docs/manual/custom-extension-common/layout/non-iterative-layout.md"></embed>

:::info{title=提示}
`execute` 方法返回的是一个 GraphData 对象，里面仅需要包含元素的基本信息（如 id、source、target）以及布局新增的属性（如 x、y、边的控制点等），不需要包含其他无用的信息。
如果仅需要对节点进行布局，可以只返回节点信息，不需要返回边的信息。
:::

### 迭代布局

迭代布局的实现同样需要继承 `BaseLayout`，但是除 `execute` 外还需要实现 `tick` 和 `stop` 方法，`tick` 方法用于将布局迭代到指定轮次，`stop` 方法用于停止布局迭代。

此外，迭代布局中需要在每次迭代调用 `options.onTick` 以触发图的更新。

```typescript
type onTick = (data: GraphData) => void;
```

下面是一个简单的迭代布局实现：

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

在这个例子中，我们实现了一个简单的迭代布局算法，每 200ms 将节点的 x 坐标在 50 和 150 之间切换，并按照节点顺序在 y 方向上排列。

<embed src="@/docs/manual/custom-extension-common/layout/iterative-layout.md"></embed>

## 注册布局

通过 G6 提供的 register 方法注册即可，详见[注册布局](/manual/core-concept/layout#注册布局)

## 配置布局

可在 `options.layout` 中配置布局的类型和参数，详见[配置布局](/manual/core-concept/layout#配置布局)
