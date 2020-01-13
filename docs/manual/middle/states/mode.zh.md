---
title: 交互模式 Mode
order: 5
---

## 什么是 Mode
用户在交互一张图时，可能由于意图不同而存在不同的交互模式，例如在编辑模式下点击节点需要弹出窗口让用户编辑，在查看模式下点击节点需要选中节点。

为了解决上述问题，G6 提供了交互模式 Mode，它是图上交互行为 [Behavior](/zh/docs/manual/middle/states/defaultBehavior) 的管理机制。一个图上可以有存在多种交互模式，每个交互模式包含多种交互行为 [Behavior](/zh/docs/manual/middle/states/defaultBehavior)。

例如，存在 default 和 edit 两种 mode（交互模式）:
- default 模式中包含点击选中节点行为和拖拽画布行为;
- edit 模式中包含点击节点弹出编辑框行为和拖拽节点行为。

默认情况下，该图对 default 模式中的行为见效，即点击节点时节点被选中而不是弹出编辑框。用户可以通过简单的命令切换该图的行为模式到 edit 模式，则 default 模式中的行为失效，edit 交互模式中的行为起效，即点击节点将弹出编辑框。

## 配置 Mode
在实例化图时配置 `modes` 属性：
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  modes: {
   // 支持的 behavior
   default: [ 'drag-canvas', 'zoom-canvas' ],
   edit: [ 'click-select' ]
  }
});
```

以上是模式定义的一个例子。在图上定义了两个模式，分别是 `default`，`edit`。其中 `default` 包含两个 [Behavior](/zh/docs/manual/middle/states/defaultBehavior)：`'drag-canvas'` 和 '`zoom-canvas'`，都使用行为的默认参数。

## 切换 Mode
默认时 graph 会使用 `default` 模式 ，可以拖动和缩放画布，当需要点击选中节点时，可以通过 `graph.setMode('edit')` 来切换到 `edit` 的 Mode 。

```javascript
graph.setMode('edit');
```

此时 graph 便支持了点击选中节点，`default` 模式下的拖拽画布 `'drag-canvas'`、放缩画布行为 `'zoom-canvas'` 失效。

在调用了 `setMode` 方法后，G6 内部进行了以下操作：

- 解绑目前图模式的所有事件监听；
- 生成新的 Behavior ，进行事件初始化；
- 绑定新的行为对应的事件监听。


## 编辑已有的 Mode
如果有已经定义好的 Behavior （[内置 Behavior](/zh/docs/manual/middle/states/defaultBehavior) 或 [自定义 Behavior](/zh/docs/manual/advanced/custom-behavior)），需要把它添加到某个模式下，可以通过 `graph.addBehaviors` 方法；需要从某个模式中移除一些 Behavior，可以使用 `graph.removeBehaviors` 方法。如下示例：
```javascript
// 向 default 模式中添加名为 drag-canvas 的行为，并使用行为的默认配置
graph.addBehaviors('drag-canvas', 'default');

// 从 default 模式中移除名为 drag-canvas 的行为
graph.removeBehaviors('drag-canvas', 'default');

// 向 edit 模式中添加名为 drag-canvas 的行为，并定义个性化配置
graph.addBehaviors({ 
  type: 'drag-canvas',
  direction: 'x'
}, 'edit');

// 从 edit 模式中移除名为 drag-canvas 的行为
graph.removeBehaviors('drag-canvas', 'edit');

// 一次向 default 模式中添加多个行为
graph.addBehaviors([ 'drag-canvas', 'zoom-canvas' ], 'default');

// 一次从 default 模式中移除多个行为
graph.removeBehaviors([ 'drag-canvas', 'zoom-canvas' ], 'default');
```

## 相关阅读

- [内置交互行为 Behavior](/zh/docs/manual/middle/states/defaultBehavior)
- [自定义交互行为 Behavior](/zh/docs/manual/advanced/custom-behavior)
