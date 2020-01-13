---
title: Listener and Event
order: 1
---

G6 manages events by combining the [Behavior](/en/docs/manual/middle/states/defaultBehavior) and [Mode](/en/docs/manual/middle/states/mode). Besides, G6 provides lots of listeners for single events and timing, which monitor the canvas/nodes/edges and the timing of function call. These events can be categorized into the following four levels:

- The events of canvas and graphics shapes, e.g. `mousedown`, `mouseup`, `click`, `mouseenter`, `mouseleave`, and so on;
- The events on nodes/edges, e.g. `node:mousedown`, `edge:click`, and so on. It is named as `type:eventName`;
- The timing events:
  - The timing of adding/removing/modifying a node/edge, e.g. `beforeadditem`, `afteradditem`, and so on;
  - The timing of states change on node/edge: `beforerefreshitem` and `afterrefreshitem`;
  - The timing of layout change: `beforelayout` and `afterlayout`.

For more information about the events in G6, please refer to [Event API](/en/docs/api/Event).

All the events are mounted on the graph:
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
