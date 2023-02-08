---
title: Listener and Event
order: 0
---

G6 manages events by combining the [Behavior](/en/docs/manual/middle/states/default-behavior) and [Mode](/en/docs/manual/middle/states/mode). Besides, G6 provides lots of listeners for single events and timing, which monitor the canvas/nodes/edges and the timing of function call. For more information about the events in G6, please refer to [Event API](/en/docs/api/Event). **All the events are mounted on the graph.** These events can be categorized into the following six levels:

1. Global Events

The global events will be triggered when it happens on the canvas DOM scope, e.g. `mousedown`, `mouseup`, `click`, `mouseenter`, `mouseleave`, and so on;

```javascript
graph.on('click', (ev) => {
  const shape = ev.target;
  const item = ev.item;
  if (item) {
    const type = item.getType();
  }
});
```

2. Canvas Events

The canvas events will be triggered when it is happens on the blank area on the canvas, e.g. `canvas:mousedown`, `canvas:click`, and so on;

```javascript
graph.on('canvas:click', (ev) => {
  const shape = ev.target;
  const item = ev.item;
  if (item) {
    const type = item.getType();
  }
});
```

3. Item Events

The events on nodes/edges/combos, e.g. `node:mousedown`, `edge:click`, `combo:click`, and so on. It is named as `type:eventName`.

```javascript
graph.on('node:click', (ev) => {
  const node = ev.item; // clicked node
  const shape = ev.target; // clicked shape, you could do different things for different shapes to achieve local response on an item
  // ... do sth
});

graph.on('edge:click', (ev) => {
  const edge = ev.item; // clicked edge
  const shape = ev.target; // clicked shape, you could do different things for different shapes to achieve local response on an item
  // ... do sth
});

graph.on('combo:click', (ev) => {
  const combo = ev.item; // clicked combo
  const shape = ev.target; // clicked shape, you could do different things for different shapes to achieve local response on an item
  // ... do sth
});
```

4. Shape Events

The events on rendering shapes of Node/Ede/Combo item, e.g. `circle-shape:mousedown`, `circle-shape:click` and so on. It is named as `shapeName:eventName`. It can be used for local response, similar to response according to the `target` in `graph.on('node:click', fn)`.

About the shape's 'name':
 - For buit-in Node/Edge/Combo type, you could know the `name` value by `graph.on('node:click', (ev) => console.log(ev.target.get('name')))` during developping.
 - For custom Node/Edge/Combo type, assign `name` which is in the same level of `attrs` for `addShape` when custom items. **The value of `name` must be unique in a Node/Edge/Combo type.**

The following demo binds click event listener for all the shapes named `circle-shape`:

```javascript
graph.on('circle-shape:click', (ev) => {
  const shape = ev.target; // clicked shape
  // ... do sth
});
```

5. Timing Events

Timing Events are those happens before and after rendering, viewport changing, item adding/modifying/removing, data changing and so on. All the timing events are listed in [The Timing Events in G6](/en/docs/api/Event#timing-events). E.g. `beforeadditem`,`afteradditem` and so on:
  - Before and node/edge/combo state changing: `beforerefreshitem` 与 `afterrefreshitem`;
  - Before and after layout: `beforelayout` and `afterlayout`.

The following demo binds a listener to handle layout finished. Notice that the listeners for events like `'afterlayout'` or `'afterrender'` should be binded before `graph.render()` or `graph.read()` to catch the events happen at first rendering.

```javascript
graph.on('afterrender', (ev) => {
  // ... do sth
});
```

6. Custom Events

G6 allows user to emit and handle any custom events, whichi is emiited by `graph.emit(customEventName: string, event: IG6GraphEvent)` anywhere. The first parameter is the custom event name, which can be any string. Before calling `emit`, bind listener for it `graph.on(customEventName: string, callback: Function)`. For example:


```javascript
graph.on('some-custom-event-name', (ev) => {
  // ... do sth
});
graph.emit('some-custom-event-name', {
  // some params
})
```