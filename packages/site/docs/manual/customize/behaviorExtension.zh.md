---
title: 自定义交互
order: 3
---

交互是 G6 中的一个重要概念，它是指用户与画布或图形进行交互的过程。G6 内置了一些交互，例如拖拽、缩放、框选、鼠标 hover 等。同时，G6 也支持用户自定义交互。

通过继承 [Behavior](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/types/behavior.ts#L11) 类来自定义交互。

```ts
import { Behavior } from '@antv/g6';

class CustomBehavior extends Behavior {
  // 覆写方法
  // 类方法
}
```

## 覆写方法

### getEvents <Badge type="warning">必选</Badge>

**类型**：`() => { [key in string]: string }`

获取交互的事件监听器

## 示例

这里给出一个自定义交互例子，当鼠标双击画布时，将画布内容缩放到合适大小。

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
  // 启用 clickFitView 交互
  modes: {
    default: ['clickFitView'],
  },
});
```
