---
title: On/Off Event
order: 9
---

### graph.on(eventName, handler)

Bind event listeners for graph.

**Parameters**

| Name      | Type     | Required | Description                                                   |
| --------- | -------- | -------- | ------------------------------------------------------------- |
| eventName | string   | true     | Name of the event, options are in [Event](/en/docs/api/Event) |
| handler   | Function | true     | The listener function                                         |

Here is the description for the objects `item` and `target` of the `handler`'s parameter `evt`:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string | true | The manipulated item |
| target | Function | true | The manipulated [Graphics Shape](/en/docs/manual/middle/elements/shape-keyshape) |

**Usage**

```javascript
const graph = new G6.Graph({
  // ...
});

// bind the node click listener for nodes of the graph
graph.on('node:click', (evt) => {
  const item = evt.item; // The manipulated node item
  const target = evt.target; // The manipulated graphics shape
  // ...
});

// bind the click listener for canvas
graph.on('click', (evt) => {
  // ...
});
```


### graph.emit(eventName, params)

Trigger some event manually. Similar to `dispatch` in DOM.

**Parameters**

| Name      | Type     | Required | Description                                                   |
| --------- | -------- | -------- | -------------------------------------------------- |
| eventName | string   | true     | Name of the event, options are in [Event](/en/docs/api/Event). And you can custom a event name to trigger, use graph.on to bind lisenter for the custom event name too |
| params   | object | true     | The parameters of this event. If you want to trigger the events in [Event Docs](/en/docs/api/Event), you might need to simulate some required [Event Parameters](en/docs/api/Event#交互事件) for different situations |

**Usage**

```javascript
const node = graph.findById('node1');
// Trigger the node click event
graph.emit('node:click', {
  item: node, // the 'clicked' node
  target: node.getKeyShape(), // the 'clicked' shape on the node. It uses the keyShape of the node here, you could assign any shapes in the graphics group (node.getContainer()) of the node
  x: 10,
  y: 10
  // ...
})

// Trigger a customo event named 'someevent', and pass some custom parameters
// listen to it by graph.on('someevent', e => {}). Notice that, you should bind the listener before emit it
graph.emit('someevent', {
  name: 'xxx',
  value: 'xxx'
});

```
### graph.off(eventName, handler)

Unbind the specific listener.

**Parameters**

| Name      | Type     | Required | Description                                                   |
| --------- | -------- | -------- | ------------------------------------------------------------- |
| eventName | string   | true     | Name of the event, options are in [Event](/en/docs/api/Event) |
| handler   | Function | true     | The listener function                                         |

The objects `item` and `target` of the `handler`'s parameter `evt` are the same as the ones described in [`graph.on(eventName, handler)`](#oneventname-handler). The `handler` should be the same object of binded `handler`.

**Usage**

```javascript
const graph = new G6.Graph({
  // ...
});

// listeners
const fn = (evt) => {
  const item = evt.item; // The manipulated node item
  const target = evt.target; // The manipulated graphics shape
  // ...
};
// bind node click listener
graph.on('node:click', fn);

// Unbind the node click listener. The fn is the same object as above
graph.off('node:click', fn);
```

### graph.off(eventName)

Unbind all the listeners for the graph.

**Parameters**

| Name      | Type   | Required | Description                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| eventName | string | true     | Name of the event, options are in [Event](/en/docs/api/Event) |

**Usage**

```javascript
const graph = new G6.Graph({
  // ...
});

// listeners
const fn1 = (evt) => {
  const item = evt.item; // the manipulated node item
  const target = evt.target; // the manipulated graphics shape
  // ...
};
const fn2 = (evt) => {
  // ...
};
// bind two listeners for nodes of the graph
graph.on('node:click', fn1);
graph.on('node:click', fn2);

// unbind all the click listeners
graph.off('node:click');
```

### graph.off()

Unbind all the event listeners of the graph. There is no parameter for this function.

**Usage**

```javascript
const graph = new G6.Graph({
  // ...
});

// listeners
const fn1 = (evt) => {
  // ...
};
const fn2 = (evt) => {
  // ...
};
// bind mouseenter listner for the nodes of the graph
graph.on('node:mouseenter', fn1);
// bind afteranimate timing listener for graph
graph.on('afteranimate', fn2);

// unbind all the events of the graph
graph.off();
```
