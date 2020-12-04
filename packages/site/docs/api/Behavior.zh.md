---
title: 复合交互及其自定义 Behavior
order: 13
---

Behavior 指 G6 中的复合交互，一般 Behavior 包含一个或多个事件的监听与处理以及一系列对图中元素的操作。

Behavior 默认包含 `shouldBegin`，`shouldUpdate`，`shouldEnd` 三个回调，代表是否开始行为，是否更新元素，是否进行结束行为，当返回值为 `false` 时阻止默认行为。

所有内置 Behavior 及其参数参见 [内置的 Behavior 教程](/zh/docs/manual/middle/states/defaultBehavior)。当 [内置 Behavior](/zh/docs/manual/middle/states/defaultBehavior) 不能满足需求时，使用 `registerBehavior(behaviorName, behavior)` 方法注册自定义的交互行为。详见 [Behavior API](/zh/docs/api/Behavior)。本文将介绍如何自定义 Behavior。

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

## 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| behaviorName | String | true | 自定义 Behavior 的名称。 |
| behavior | BehaviorOption | true | 自定义 behavior 时的配置项，配置项中包括的方法及作用具体请参考：[Behavior API](/zh/docs/api/Behavior)。 |

### BehaviorOption.getEvents()

自定义 Behavior 时，定义事件及处理事件的方法。

`getEvents()` 方法中可以使用的事件请参考[Event 文档](/zh/docs/api/Event)。

**用法**

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

`onNodeClick`、`onEdgeClick` 和 `onMouseMove` 都属于自定义方法，用于处理 `node:click`、`edge:click`、`mousemove` 事件。

**参数**

| 名称 | 类型  | 是否必选 | 描述                                   |
| ---- | ----- | -------- | -------------------------------------- |
| evt  | Event | 否       | 包含事件句柄、当前操作对象及各坐标值等 |

**参数 `evt` 包括以下属性：**

| 名称             | 类型       | 描述               |
| ---------------- | ---------- | ------------------ |
| x                | Number     | 元素视口 x 坐标    |
| y                | Number     | 元素视口 y 坐标    |
| canvasX          | Number     | 元素 Canvas x 坐标 |
| canvasY          | Number     | 元素 Canvas y 坐标 |
| clientX          | Number     | 屏幕/页面 x 坐标   |
| clientY          | Number     | 屏幕/页面 y 坐标   |
| event            | MouseEvent | 事件句柄           |
| target           | Shape      | 当前对象           |
| type             | String     | 操作类型           |
| currentTarget    | Object     |                    |
| item             | Shape      | 操作的目标元素     |
| removed          | Boolean    | 是否删除/销毁      |
| timeStamp        | Number     | 时间戳             |
| bubbles          | Boolean    | 是否支持事件冒泡   |
| defaultPrevented | Boolean    | 是否阻止默认事件   |
| cancelable       | Boolean    | 是否取消           |

**用法**

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

定义自定义 Behavior 时的默认参数，会与用户传入的参数进行合并。

**提示：该方法是可选的**。

**用法**

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

是否阻止行为发生，默认返回 `true`，不阻止行为，需要在处理逻辑中自行调用。

**用法**

```javascript
G6.registerBehavior('behaviorName', {
  shouldBegin() {
    // 这里可以根据业务自定义
    return true
  }
}
```

### BehaviorOption.shouldUpdate(evt)

是否更新数据及更改视图，默认返回 `true`，允许更新，如果返回 `false`，则不更新数据和视图。

**用法**

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

是否结束行为，默认返回 `true`。
