---
title: 监听和绑定事件
order: 1
---

除了 [内置交互行为 Behavior](/zh/docs/manual/middle/states/defaultBehavior) 和 [交互模式 Mode](/zh/docs/manual/middle/states/mode) 搭配的事件管理方式外，G6 提供了直接的单个事件、时机的监听方法，可以监听画布、节点、边、以及各函数被调用的时机等。这些事件可以分为以下四个层次：

- 画布、图形层次的事件，`mousedown`，`mouseup`，`click`，`mouseenter`，`mouseleave` 等；
- 节点/边 上的事件，`node:mousedown`，`edge:click` 等，以 `type:eventName` 为事件名称；
- 时机事件：
  - 节点/边增删改时的事件, 例如：`beforeadditem`，`afteradditem` 等；
  - 节点/边状态改变时的事件：`beforerefreshitem` 与 `afterrefreshitem`；
  - 布局时机：`beforelayout` 与 `afterlayout`。

如果要了解 G6 支持的所有事件，请参考 [Event API](/zh/docs/api/Event)。

G6 上所有的事件都需要在 graph 上监听。
```javascript
graph.on('click', ev => {
  const shape = ev.target;
  const item = ev.item;
  if (item) {
  	const type = item.getType();
  }
});

graph.on('node:click', ev => {
  const shape = ev.target;
  const node = ev.item;
});
```
