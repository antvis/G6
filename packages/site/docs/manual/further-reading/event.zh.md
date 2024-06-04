---
title: 事件
order: 0
---

## 概述

G6 中的事件系统是在 [G](https://g.antv.antgroup.com/api/event/intro) 的事件系统基础上进行了封装，提供了更多的事件类型，以及更加方便的事件绑定和解绑方法。

## 事件类型

G6 中的事件类型主要分为以下几类：

1. 图(Graph)事件
2. 画布(Canvas)事件
3. 元素(Element)事件

### 图事件

图事件是指与整个图实例相关的事件，例如图的渲染完成事件、图的更新事件等。图事件的完整列表见[GraphEvent](/api/reference/g6/graphevent)。

#### 监听图事件

图事件的监听与默认的事件监听方式一致，例如监听图的渲染完成事件：

```typescript
import { Graph, GraphEvent } from '@antv/g6';

const graph = new Graph({
  // ...
});

graph.on(GraphEvent.AFTER_RENDER, () => {
  // event handler
});
```

### 画布事件

画布事件是指与画布相关的事件，例如画布的点击事件、画布的拖拽事件等。画布事件的完整列表见[CanvasEvent](/api/reference/g6/canvasevent)。

#### 监听画布事件

例如监听画布的点击事件：

```typescript
import { Graph, CanvasEvent } from '@antv/g6';

const graph = new Graph({
  // ...
});

graph.on(CanvasEvent.CLICK, (event) => {
  // event handler
});
```

### 元素事件

元素事件主要指在元素对象上触发的事件，例如节点的拖拽事件、边的点击事件等。元素分为节点(`node`)、边(`edge`)、组合(`combo`)三类，对应的事件完整列表分别见：[NodeEvent](/api/reference/g6/nodeevent) 、[EdgeEvent](/api/reference/g6/edgeevent)、[ComboEvent](/api/reference/g6/comboevent)。

#### 监听元素事件

与画布事件类似，例如监听节点的拖拽和边的点击事件：

```ts
import { Graph, NodeEvent, EdgeEvent, ComboEvent } from '@antv/g6';

const graph = new Graph({
  // ...
});

graph.on(NodeEvent.DRAG, (event) => {
  // event handler
});

graph.on(EdgeEvent.CLICK, (event) => {
  // event handler
});

graph.on(ComboEvent.CLICK, (event) => {
  // event handler
});
```

## 事件监听与解除

G6 提供以下 API 用于事件监听和解除：

### on

添加事件监听

```typescript
const handler = (event) => {
  // event handler
};

graph.on('event_name', handler);
```

### off

移除事件监听

```typescript
graph.off('event_name', handler);
```

当不传入任何参数时，会移除所有事件监听：

```typescript
graph.off();
```

### once

添加一次性事件监听，即事件触发后会自动移除事件监听

```typescript
graph.once('event_name', handler);
```

### emit

如果你想手动触发一个事件，可以使用 `emit` 方法：

```typescript
graph.emit('event_name', {
  // event data
});
```
