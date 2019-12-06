---
title: Behavior
order: 5
---

Behavior is the compound interactions in G6. In general, a Behavior includes one or more event listeners and a set of item operations.

By default, Behavior has three callbacks: `shouldBegin`, `shouldUpdate`, and `shouldEnd`, representing the beginning of the behavior, whether to update the items, the ending of the behavior respectively. If they return `false`, the default behavior will be prevented.

## Usage
```javascript
G6.registerBehavior('behaviorName', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'edge:click': 'onEdgeClick',
      'mousemove': 'onMouseMove'
    }
  },
  onNodeClick(evt) {
  	// TODO
  },
  onEdgeClick(evt) {
  	// TODO
  },
  onMouseMove(evt) {
  	// TODO
  }
});
```

## getEvents()
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

## onNodeClick(evt)
`onNodeClick`, `onEdgeClick`, and `onMouseMove` are custom events for handling `node:click`, `edge:click`, and `mousemove`.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| evt | Event | false | contains event handler, current target, and coordinates. |

**The parameter `evt` contains:**

| Name | Type | Description |
| --- | --- | --- |
| x | Number | x coordinate of view port. |
| y | Number | y coordinate of view port. |
| canvasX | Number | x coordinate of the canvas. |
| canvasY | Number | y coordinate of the canvas. |
| clientX | Number | x coordinate of the client / screen. |
| clientY | Number | y coordinate of the client / screen. |
| event | MouseEvent | Event handler. |
| target | Shape | The target. |
| type | String | Operation type. |
| currentTarget | Object |  |
| item | Shape | The target item. |
| removed | Boolean | Whether the target is removed / destroyed. |
| timeStamp | Number | The time stamp. |
| bubbles | Boolean | Whether it is a bubbled event. |
| defaultPrevented | Boolean | Whether to prevent the default event. |
| cancelable | Boolean | Whether it is cancelable. |


**Usage**
```javascript
G6.registerBehavior('behaviorName', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'edge:click': 'onEdgeClick',
      'mousemove': 'onMouseMove'
    }
  },
  onNodeClick(evt) {
  	// TODO
  },
  onEdgeClick(evt) {
  	// TODO
  },
  onMouseMove(evt) {
  	// TODO
  }
});
```

## getDefaultCfg()
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

## shouldBegin(evt)
Whether to prevent the behavior. Return `true` by default, which means do not prevent the behavior. User should call it by themselves.

**Usage**
```javascript
G6.registerBehavior('behaviorName', {
  shouldBegin() {
    // Customize it according to your scenario
    return true;
  }
});
```

## shouldUpdate(evt)
Whether to update the data and the view. Returns `true` by default, which means allow updating. 

**Usage**
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  pixelRatio: 2,
  modes: {
    default: [ 'drag-canvas', {
      type: 'self-behavior',
      shouldUpdate: e => {
        if (e.target.type !== 'text') {
          return false;
        }
        return true;
      }
    }]
  }
});
```

## shouldEnd(evt)
Whether to end the behavior. Returns `true` by default.
