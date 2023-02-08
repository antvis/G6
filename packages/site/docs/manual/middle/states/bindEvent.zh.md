---
title: 监听和绑定事件
order: 0
---

除了 [内置交互行为  Behavior](/zh/docs/manual/middle/states/default-behavior) 和 [交互模式 Mode](/zh/docs/manual/middle/states/mode) 搭配的事件管理方式外，G6 提供了直接的单个事件、时机的监听方法，可以监听画布、节点、边、以及各函数被调用的时机等。如果要了解 G6 支持的所有事件，请参考 [Event API](/zh/docs/api/Event)。**G6 上所有的事件都需要在 graph 上监听**。这些事件可以分为以下六个层次：

1. 全局事件

只要在画布上范围内发生均会被触发，如 `mousedown`，`mouseup`，`click`，`mouseenter`，`mouseleave` 等。

```javascript
graph.on('click', (ev) => {
  const shape = ev.target;
  const item = ev.item;
  if (item) {
    const type = item.getType();
  }
});
```

2. canvas 事件

只在 canvas 空白处被触发，如 `canvas:mousedown`，`canvas:click` 等，以`canvas:eventName` 为事件名称。

```javascript
graph.on('canvas:click', (ev) => {
  const shape = ev.target;
  const item = ev.item;
  if (item) {
    const type = item.getType();
  }
});
```

3. 节点/边/combo 上的事件

例如 `node:mousedown`，`edge:click`, `combo:click` 等，以 `type:eventName` 为事件名称。

```javascript
graph.on('node:click', (ev) => {
  const node = ev.item; // 被点击的节点元素
  const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
  // ... do sth
});

graph.on('edge:click', (ev) => {
  const edge = ev.item; // 被点击的边元素
  const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
  // ... do sth
});

graph.on('combo:click', (ev) => {
  const combo = ev.item; // 被点击 combo 元素
  const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
  // ... do sth
});
```

4. 图形上的事件

指定图形上的事件，如 `circle-shape:mousedown`，`circle-shape:click` 等，以 `shapeName:eventName` 为事件名称。可用于绑定节点/边/combo 中对局部图形做出响应的场景。效果类似上文 `graph.on('node:click', fn)` 中通过 `target` 信息作出不同响应。

关于图形的 name：
 - 内置节点/边/combo 上每个图形的名称在开发过程中可以通过 `graph.on('node:click', (ev) => console.log(ev.target.get('name')))` 得知；
 - 自定义节点/边/combo 中通过 addShape 增加的图形，可添加与 attrs 平级的 name 字段指定任意（**注意：同元素类型中需要是唯一的**）字符串作为 name。

下面例子为图中所有 name 为 circle-shape 的图形绑定了 click 事件监听：

```javascript
graph.on('circle-shape:click', (ev) => {
  const shape = ev.target; // 被点击的图形
  // ... do sth
});
```

5. 时机事件

时机事件指渲染、视口变换、元素增删改、数据变换等时机。所有时机事件详见 [G6 的时机事件列表](/zh/docs/api/Event#回调参数)。如：`beforeadditem`，`afteradditem`  等：
  - 节点/边/Combo 状态改变时的事件：`beforerefreshitem` 与 `afterrefreshitem`；
  - 布局时机：`beforelayout` 与 `afterlayout`。

下面例子为 graph 绑定了渲染完成时机的监听。时机事件中，afterrender、afterlayout 一类事件必须在 `graph.render()` 或 `graph.read()` 之前绑定，方可监听到首次渲染、布局完成后的相关事件。

```javascript
graph.on('afterrender', (ev) => {
  // ... do sth
});
```

6. 自定义事件

G6 允许用户自定义任意事件，可在任意位置通过 `graph.emit(customEventName: string, event: IG6GraphEvent)` 触发一个事件，第一个参数为自定义事件名称。在触发前，通过 `graph.on(customEventName: string, callback: Function)` 进行监听。例如：


```javascript
graph.on('some-custom-event-name', (ev) => {
  // ... do sth
});
graph.emit('some-custom-event-name', {
  // some params
})
```