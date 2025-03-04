---
title: 自定义交互
order: 2
---

## 概述

交互的执行逻辑通常为：1. 监听用户交互事件 2. 根据事件更新画布或执行其他操作。例如 `DragCanvas` 交互监听指针拖拽事件，根据拖拽的距离更新相机的位置。

交互和插件的基类都是由 G6 内部的 `BaseExtension` 基类派生而来，因此交互和插件的实现方式基本相同，但基于可视化的概念区分，交互通常用于处理用户交互事件，而插件通常用于处理画布的渲染逻辑、额外组件渲染等。

## 实现交互

一个交互的实现相当灵活，你可以以你喜欢的风格实现你的交互。

下面是一个简单的自定义交互实现，当用户点击画布时，会在画布上添加一个节点：

```typescript
import { BaseBehavior, CanvasEvent } from '@antv/g6';
import type { BaseBehaviorOptions, RuntimeContext, IPointerEvent } from '@antv/g6';

interface ClickAddNodeOptions extends BaseBehaviorOptions {}

class ClickAddNode extends BaseBehavior<ClickAddNodeOptions> {
  constructor(context: RuntimeContext, options: ClickAddNodeOptions) {
    super(context, options);

    const { graph } = this.context;
    graph.on(CanvasEvent.CLICK, (event: IPointerEvent) => {
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

在示例代码中，我们基于 `BaseBehavior` 实现了一个 `ClickAddNode` 交互，该交互在构造函数中添加了 Graph 的事件监听，当用户点击画布时，会在点击位置添加一个节点。

> 点击下面画布中的空白位置以添加一个节点

<embed src="@/docs/manual/custom-extension-common/behavior/implement-behaviors.md"></embed>

:::info{title=提示}
上述示例是一个最简单的交互实现，实际开发过程中，你还需要处理监听事件的销毁、交互的启用与禁用等逻辑。

此外，多个交互之间可能会有事件冲突，你需要小心处理这些冲突。
:::

## 注册交互

通过 G6 提供的 register 方法注册即可，详见[注册交互](/manual/core-concept/behavior#注册交互)

## 配置交互

可在 `behaviors` 中传入交互类型名称或配置参数对象，详见[配置交互](/manual/core-concept/behavior#配置交互)
