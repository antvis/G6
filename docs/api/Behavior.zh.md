---
title: Behavior
order: 5
---

Behavior指G6中的复合交互，一般Behavior包含一个或多个事件的监听与处理以及一系列对图中元素的操作。

Behavior默认包含shouldBegin，shouldUpdate，shouldEnd三个回调，代表是否开始行为，是否更新元素，是否进行结束行为，当返回值为false时阻止默认行为。

## 用法
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
}
```

## getEvents()
自定义Behavior时，定义事件及处理事件的方法。

getEvents()方法中可以使用的事件请参考[Event文档](./Event)。

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

## onNodeClick(evt)
`onNodeClick`、`onEdgeClick`和`onMouseMove`都属于自定义方法，用于处理`node:click`、`edge:click`、`mousemove`等事件。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| evt | Event | 否 | 包含事件句柄、当前操作对象及各坐标值等 |

**参数evt包括以下属性：**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| x | number | 元素视口x坐标 |
| y | number | 元素视口y坐标 |
| canvasX | number | 元素Canvas x坐标 |
| canvasY | number | 元素Canvas y坐标 |
| clientX | number | 屏幕/页面x坐标 |
| clientY | number | 屏幕/页面y坐标 |
| event | MouseEvent | 事件句柄 |
| target | Shape | 当前对象 |
| type | string | 操作类型 |
| currentTarget | object |  |
| item | Shape | 操作的目标元素 |
| removed | boolean | 是否删除/销毁 |
| timeStamp | number | 时间戳 |
| bubbles | boolean | 是否支持事件冒泡 |
| defaultPrevented | boolean | 是否阻止默认事件 |
| cancelable | boolean | 是否取消 |


**用法**
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
}
```

## getDefaultCfg()
定义自定义Behavior时的默认参数，会与用户传入的参数进行合并。

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

## shouldBegin(evt)
是否阻止行为发生，默认返回true，不阻止行为，需要在处理逻辑中自行调用。

**用法**
```javascript
G6.registerBehavior('behaviorName', {
  shouldBegin() {
    // 这里可以根据业务自定义
    return true
  }
}
```

## shouldUpdate(evt)
是否更新数据及更改视图，默认返回true，允许更新，如果返回false，则不更新数据和视图。

**用法**
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
是否结束行为，默认返回true。
