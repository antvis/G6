---
title: Event
order: 0
---

## Overview

The event system in G6 is encapsulated based on the event system of [G](https://g.antv.antgroup.com/en/api/event/intro), providing a wider range of event types and more convenient methods for event binding and unbinding.

## Event Types

The event types in G6 are mainly divided into the following categories:

1. Graph events
2. Canvas events
3. Element events

### Graph Events

Graph events refer to events associated with the entire graph instance, such as the graph's rendering completion event, the graph's update event, etc. The complete list of graph events can be found at [GraphEvent](/en/api/reference/g6/graphevent).

#### Listening to Graph Events

Listening to graph events is consistent with the default event listening method. For example, to listen to the graph's rendering completion event:

```typescript
import { Graph, GraphEvent } from '@antv/g6';

const graph = new Graph({
  // ...
});

graph.on(GraphEvent.AFTER_RENDER, () => {
  // event handler
});
```

### Canvas Events

Canvas events refer to events associated with the canvas, such as the canvas's click event, the canvas's drag event, etc. The complete list of canvas events can be found at [CanvasEvent](/en/api/reference/g6/canvasevent).

#### Listening to Canvas Events

For example, to listen to the canvas's click event:

```typescript
import { Graph, CanvasEvent } from '@antv/g6';

const graph = new Graph({
  // ...
});

graph.on(CanvasEvent.CLICK, (event) => {
  // event handler
});
```

### Element Events

Element events primarily refer to events that are triggered on element objects, such as a node's drag event, an edge's click event, etc. Elements are categorized into three types: nodes (`node`), edges (`edge`), and combos (`combo`). The complete list of corresponding events can be found at: [NodeEvent](/en/api/reference/g6/nodeevent), [EdgeEvent](/en/api/reference/g6/edgeevent), [ComboEvent](/en/api/reference/g6/comboevent).

#### Listening to Element Events

Similar to canvas events, for example, to listen to a node's drag event and an edge's click event:

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

## Event Listening and Unlistening

G6 provides the following APIs for event listening and unlistening:

### on

Add an event listener

```typescript
const handler = (event) => {
  // event handler
};

graph.on('event_name', handler);
```

### off

Remove an event listener

```typescript
graph.off('event_name', handler);
```

When no arguments are passed, it will remove all event listeners:

```typescript
graph.off();
```

### once

Add a one-time event listener, which means the event listener will be automatically removed after the event is triggered

```typescript
graph.once('event_name', handler);
```

### emit

If you want to manually trigger an event, you can use the `emit` method:

```typescript
graph.emit('event_name', {
  // event data
});
```
