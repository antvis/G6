---
title: 自定义交互
order: 3
---

## 概述

自定义交互允许用户基于 G6 提供的完善的[事件机制](/api/event)，把一个或多个相关的交互行为定义为一个完整的交互，以此实现符合业务场景的交互逻辑。

### 交互的执行逻辑

通常为：

1. 监听用户交互事件

2. 根据事件更新画布或执行其他操作

例如 `DragCanvas` 交互监听指针拖拽事件，根据拖拽的距离更新相机的位置。

### 交互与插件的区别

- 交互和插件的基类都是由 G6 内部的 [BaseExtension](https://github.com/antvis/G6/blob/v5/packages/g6/src/registry/extension/index.ts) 基类派生而来，因此交互和插件的实现方式基本相同
- 但基于可视化的概念区分，交互通常用于处理用户交互事件，而插件通常用于处理画布的渲染逻辑、额外组件渲染等

:::info{title=提示}
因概念上的区分，交互实例不可获取，插件实例可获取（ [getPluginInstance](/api/plugin#graphgetplugininstancekey) ）
:::

## 什么时候需要自定义交互？

- **目的**：

  当用户在实现符合业务场景的交互逻辑时，我们通常需要配合 G6 的事件系统，对相关事件作出响应，执行需要的交互逻辑。

- **不使用自定义交互**：

  如果不使用自定义交互，用户需要在创建 Graph 实例后，通过 `graph.on` 进行一系列的事件监听和响应处理，代码逻辑处理和编排会显得异常艰难。

- **交互的优势**：

  每个交互行为都是独立的代码模块，交互系统的存在方便用户解耦业务逻辑、避免代码臃肿以及方便用户后续维护等。

- **结论**：

  > 1、当用户需要实现任何交互逻辑时，应当首先考虑自定义交互。
  >
  > 2、当内置交互无法完全满足业务需求时，用户也可以通过自定义交互（继承内置交互）进行调整和修改。
  >
  > _（如果需要内置交互支持的特性是较通用的，或者内置交互存在 Bug ，这种时候欢迎大家到 [Github](https://github.com/antvis/G6) 提 Issue 或者 PR ）_

## 实现交互

一个交互的实现相当灵活，你可以以你喜欢的风格实现你的交互。

下面是一个简单的自定义交互实现，当用户点击画布时，会在画布上添加一个节点（可通过交互配置定义所添加节点的填充颜色）：

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
    // 销毁时解绑事件
    this.unbindEvents();
    super.destroy();
  }
}
```

- 在示例代码中，我们实现了一个 `ClickAddNode` 交互，该交互在构造函数中添加了 Graph 的事件监听，当用户点击画布时，会在点击位置添加一个节点，并且支持配置所添加节点的填充颜色。
- `BaseBehavior` 是所有交互的基类，每个自定义交互都需要继承这个基类实现。

> 点击下面画布中的空白位置以添加一个节点，可切换右侧面板配置节点颜色

<embed src="@/common/manual/custom-extension/behavior/implement-behaviors.md"></embed>

:::info{title=提示}
上述示例是一个最简单的交互实现，实际开发过程中，你可能还需要处理交互的启用与禁用等逻辑。

此外，多个交互之间可能会有事件冲突，你需要小心处理这些冲突。
:::

## 注册交互

通过 G6 提供的 register 方法注册即可

```typescript
import { ExtensionCategory, register } from '@antv/g6';
import { ClickAddNode } from 'your-custom-behavior-path';

register(ExtensionCategory.BEHAVIOR, 'click-add-node', ClickAddNode);
```

## 配置交互

可在 `behaviors` 中传入交互类型名称或配置参数对象，比如上面的 ClickAddNode ，详见[配置交互](/manual/behavior/overview#配置和使用)

```typescript
const graph = new Graph({
  // 其他配置
  behaviors: [
    {
      type: 'click-add-node',
      fill: 'blue',
    },
  ],
});
```
