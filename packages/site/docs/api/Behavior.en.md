---
title: Behavior and RegisterBehavior
order: 13
---

Behavior is the compound interactions in G6. In general, a Behavior includes one or more event listeners and a set of item operations.

By default, Behavior has three callbacks: `shouldBegin`, `shouldUpdate`, and `shouldEnd`, representing the beginning of the behavior, whether to update the items, the ending of the behavior respectively. If they return `false`, the default behavior will be prevented.

This document is going to introduce how to customize a behavior. The infomation about the built-in behaviors can be found in the [Built-in Behaviors](/en/docs/manual/middle/states/defaultBehavior). When the [built-in Behaviors](/en/docs/manual/middle/states/defaultBehavior) cannot satisfy your requirments, custom a type of Behavior by `G6.registerBehavior(behaviorName, behavior)`. See [Behavior API](/en/docs/api/Behavior) for detail.

```ts
// highlight-start
G6.registerBehavior(behaviorName: string, behavior: BehaviorOption)
// highlight-end

// Custom a type of Behavior
G6.registerBehavior('behaviorName', {
  // Bind the event and its callback
  getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      'edge:click': 'onEdgeClick',
    };
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} evt The handler
   */
  onClick(evt) {
    const node = evt.item;
    const graph = this.graph;
    const point = { x: evt.x, y: evt.y };
    const model = node.getModel();
    // TODO
  },
  /**
   * Handle the callback for mousemove
   * @override
   * @param  {Object} evt The handler
   */
  onMousemove(evt) {
    // TODO
  },
  /**
   * Handle the callback for :click
   * @override
   * @param  {Object} evt The handler
   */
  onEdgeClick(evt) {
    // TODO
  },
});
```

## Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| behaviorName | String | true | The name of custom Behavior. |
| behavior | BehaviorOption | true | The configurations of custom Behavior. For more information, please refer to [Behavior API](/en/docs/api/Behavior). |

### BehaviorOption.getEvents()

Define and handle events when user customize a Behavior.

The usage of `getEvents()` can be refered to [Event](/en/docs/api/Event)。

**Usage**

```javascript
G6.registerBehavior('behaviorName', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'edge:click': 'onEdgeClick',
      'mousemove': 'onMouseMove'
    }
  }
}
```

### BehaviorOption.onNodeClick(evt)

`onNodeClick`, `onEdgeClick`, and `onMouseMove` are custom events for handling `node:click`, `edge:click`, and `mousemove`.

**Parameters**

| Name | Type  | Required | Description                                              |
| ---- | ----- | -------- | -------------------------------------------------------- |
| evt  | Event | false    | contains event handler, current target, and coordinates. |

**The parameter `evt` contains:**

| Name             | Type       | Description                                |
| ---------------- | ---------- | ------------------------------------------ |
| x                | Number     | x coordinate of view port.                 |
| y                | Number     | y coordinate of view port.                 |
| canvasX          | Number     | x coordinate of the canvas.                |
| canvasY          | Number     | y coordinate of the canvas.                |
| clientX          | Number     | x coordinate of the client / screen.       |
| clientY          | Number     | y coordinate of the client / screen.       |
| event            | MouseEvent | Event handler.                             |
| target           | Shape      | The target.                                |
| type             | String     | Operation type.                            |
| currentTarget    | Object     |                                            |
| item             | Shape      | The target item.                           |
| removed          | Boolean    | Whether the target is removed / destroyed. |
| timeStamp        | Number     | The time stamp.                            |
| bubbles          | Boolean    | Whether it is a bubbled event.             |
| defaultPrevented | Boolean    | Whether to prevent the default event.      |
| cancelable       | Boolean    | Whether it is cancelable.                  |

**Usage**

```javascript
G6.registerBehavior('behaviorName', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'edge:click': 'onEdgeClick',
      mousemove: 'onMouseMove',
    };
  },
  onNodeClick(evt) {
    // TODO
  },
  onEdgeClick(evt) {
    // TODO
  },
  onMouseMove(evt) {
    // TODO
  },
});
```

### BehaviorOption.getDefaultCfg()

Default configurations while customing a Behavior. The configurations will be mixed by the configurations from user.

**Tips: This function is not required**.

**Usage**

```javascript
G6.registerBehavior('behaviorName', {
  getDefaultCfg() {
    return {
      trigger: 'click' // mouseneter or click
    }
  }
}
```

### BehaviorOption.shouldBegin(evt)

Whether to prevent the behavior. Return `true` by default, which means do not prevent the behavior. User should call it by themselves.

**Usage**

```javascript
G6.registerBehavior('behaviorName', {
  shouldBegin() {
    // Customize it according to your scenario
    return true;
  },
});
```

### BehaviorOption.shouldUpdate(evt)

Whether to update the data and the view. Returns `true` by default, which means allow updating.

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  modes: {
    default: [
      'drag-canvas',
      {
        type: 'self-behavior',
        shouldUpdate: (e) => {
          if (e.target.type !== 'text') {
            return false;
          }
          return true;
        },
      },
    ],
  },
});
```

### BehaviorOption.shouldEnd(evt)

Whether to end the behavior. Returns `true` by default.
