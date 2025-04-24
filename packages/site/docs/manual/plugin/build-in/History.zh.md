---
title: History 历史记录
---

## 概述

该插件用于实现图编辑的 **撤销（Undo）** 和 **重做（Redo）** 功能，通过记录用户操作的历史状态堆栈，支持在图交互过程中进行回溯或恢复操作。该插件为用户提供了完善的配置项和 API 。

## 使用场景

历史记录插件适用于所有涉及到图编辑的场景。

## 在线体验

<embed src="@/common/api/plugins/history.md"></embed>

## 基本用法

在图配置中添加这一插件：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  plugins: ['history'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'history',
      key: 'history-1',
      stackSize: 10,
    },
  ],
});
```

## 配置项

| 属性             | 描述                                                                                                                                                                | 类型                                               | 默认值      | 必选 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------- | ---- |
| afterAddCommand  | 当一个命令被添加到 `Undo/Redo` 队列后被调用。`revert` 为 `true` 时表示撤销操作，为 `false` 时表示重做操作                                                           | (cmd: Command, revert: boolean) => void            | -           |      |
| beforeAddCommand | 当一个命令被添加到 `Undo/Redo` 队列前被调用，如果该方法返回 `false`，那么这个命令将不会被添加到队列中。`revert` 为 `true` 时表示撤销操作，为 `false` 时表示重做操作 | (cmd: Command, revert: boolean) => boolean \| void | -           |      |
| executeCommand   | 执行命令时的回调函数                                                                                                                                                | (cmd: Command) => void                             | -           |      |
| stackSize        | 最多记录该数据长度的历史记录                                                                                                                                        | number                                             | 0（不限制） |      |

### 参数类型说明

`Command`：

```typescript
interface Command {
  current: CommandData; // 当前数据
  original: CommandData; // 原始数据
  animation: boolean; // 是否开启动画
}
interface CommandData {
  add: GraphData; // 新增的数据
  update: GraphData; // 更新的数据
  remove: GraphData; // 移除的数据
}
interface GraphData {
  nodes?: NodeData[]; // 节点数据
  edges?: EdgeData[]; // 边数据
  combos?: ComboData[]; // Combo 数据
}
```

## API 参考

history 插件提供了以下 API 供用户按需使用，调用插件方法的方式请参考[插件总览文档](/manual/plugin/overview#调用插件方法)

### History.canRedo()

判断是否可以进行**重做**操作

```typescript
canRedo(): boolean;
```

示例：

```typescript
const canRedo = historyInstance.canRedo();
```

### History.canUndo()

判断是否可以进行**撤销**操作

```typescript
canUndo(): boolean;
```

示例：

```typescript
const canUndo = historyInstance.canUndo();
```

### History.clear()

清空历史记录

```typescript
clear(): void;
```

示例：

```typescript
historyInstance.clear();
```

### History.on()

监听历史记录事件

```typescript
on(event: Loosen<HistoryEvent>, handler: (e: { cmd?: Command | null }) => void): void;
```

参数类型说明：

- HistoryEvent

  ```typescript
  enum HistoryEvent {
    UNDO = 'undo', // 当命令被撤销时
    REDO = 'redo', // 当命令被重做时
    CANCEL = 'cancel', // 当命令被取消时
    ADD = 'add', // 当命令被添加到队列时
    CLEAR = 'clear', // 当历史队列被清空时
    CHANGE = 'change', // 当历史队列发生变化时
  }
  ```

- Command

  请参考前面的 [Command](#参数类型说明) 类型说明

示例：

```typescript
historyInstance.on(HistoryEvent.UNDO, () => {
  console.log('undo Command');
});
```

### History.redo()

执行**重做**操作（返回插件实例）

```typescript
redo(): History;
```

示例：

```typescript
historyInstance.redo();
```

### History.undo()

执行**撤销**操作（返回插件实例）

```typescript
undo(): History;
```

示例：

```typescript
historyInstance.undo();
```

### History.undoAndCancel()

执行撤销且不计入历史记录（返回插件实例，注意，执行该操作会清空**重做**栈）

```typescript
undoAndCancel(): History;
```

示例：

```typescript
historyInstance.undoAndCancel();
```

## 历史记录模式

该插件支持两种历史记录模式：

### 默认模式

模式模式下，每一次触发**渲染后**（比如更新元素数据后，用户主动执行 `graph.draw()` 方法触发渲染），插件会把**渲染前**和**渲染后**的数据记录下来并作为一次操作记录入栈。

### 自定义模式

#### 场景描述

实际需求中，用户的一次图编辑操作可能涉及到**多次渲染**，比如，一次编辑操作中，首先把节点 A、B 展示出来，然后展示 A->B 的连线，这里就涉及到两次渲染（即用户需要进行两次 `graph.draw()` ），这种场景下，默认模式会入栈两次历史记录，分别是：

- 展示节点 A 和 B
- 展示 A->B 的连线

显然，实际业务中，一次操作，也应该只需一次撤销。

但这里在撤销本次操作时，用户需要调用两次 `undo` 方法，也就是需要进行两次撤销。

#### 场景支持

为了支持这样的场景，G6 提供了一个批量控制器（ `BatchController`，[可参考源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/runtime/batch.ts)），在图实例上下文中提供了这个批量控制器实例。

历史记录插件则基于这个批量控制器，来实现自定义操作记录，代码示例如下：

```typescript
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

graph.context.batch.startBatch(); // 开始批量操作
graph.addNodeData(...); // 把节点 A、B 展示出来
graph.draw(); // 第一次触发渲染
graph.addEdgeData(...); // 把 A->B 连线展示出来
graph.draw(); // 第二次触发渲染
graph.context.batch.endBatch(); // 结束批量操作
```

示例中：

- 通过调用批量控制器实例的 `startBatch` 方法，告诉历史记录插件，现在开始进行批量操作，在批量操作没有结束前，不管触发多少次渲染，都不能进行历史记录入栈（历史记录插件会把每次触发渲染的变更数据记录下来）
- 在完成最后一次数据变更后，调用 `endBatch()` 方法，历史记录插件监听到批量操作完成，则把本次批量操作作为一次历史记录入栈

最终，用户只需要进行一次 `undo` 即可撤销。

## 代码示例

下面列举一些常见的案例，并给出相应的代码参考

### 撤销、重做按钮状态

实际业务场景中，可能需要自定义画布的工具栏，也就涉及到撤销和重做按钮的启禁用状态

```typescript
const canUndo = false;
const canRedo = false;

const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});
const historyInstance = graph.getPluginInstance('history');
historyInstance.on(HistoryEvent.CHANGE, () => {
  canUndo = historyInstance.canUndo();
  canRedo = historyInstance.canRedo();
});
```

示例中通过监听 `HistoryEvent.CHANGE` 事件，这个事件在历史队列发生变化时会触发，每次发生变化后，实时判断当前是否可以进行撤销和重做操作

### 判断是否允许命令进入队列

这里实现一个简单的场景：只有移除元素的操作才允许进入历史记录队列

```typescript
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'history',
      key: 'history',
      beforeAddCommand: (cmd) => {
        return (
          cmd.current.remove?.nodes?.length > 0 ||
          cmd.current.remove?.combos?.length > 0 ||
          cmd.current.remove?.edges?.length > 0
        );
      },
    },
  ],
});
```

示例中通过配置项 [beforeAddCommand](#beforeAddCommand) 来实现，判断 `cmd.current.remove` 里面是否存在被移除的元素
