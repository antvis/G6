---
title: History
order: 9
---

## Overview

This plugin is used to implement the **Undo** and **Redo** functions in graph editing. By recording the historical state stack of user operations, it supports backtracking or restoring operations during graph interactions. The plugin provides users with comprehensive configuration options and APIs.

## Usage Scenarios

The history plugin is suitable for all scenarios involving graph editing.

## Online Experience

<embed src="@/common/api/plugins/history.md"></embed>

## Basic Usage

Add this plugin in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string. This method is simple but only supports default configurations and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  plugins: ['history'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and allowing dynamic updates at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'history',
      key: 'history-1',
      stackSize: 10,
    },
  ],
});
```

## Configuration Options

| Property         | Description                                                                                                                                                                                                   | Type                                                           | Default Value | Required |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- | -------- |
| afterAddCommand  | Called after a command is added to the `Undo/Redo` queue. `revert` is `true` for undo operations and `false` for redo operations                                                                              | (cmd: [Command](#command), revert: boolean) => void            | -             |          |
| beforeAddCommand | Called before a command is added to the `Undo/Redo` queue. If this method returns `false`, the command will not be added to the queue. `revert` is `true` for undo operations and `false` for redo operations | (cmd: [Command](#command), revert: boolean) => boolean \| void | -             |          |
| executeCommand   | Callback function when executing a command                                                                                                                                                                    | (cmd: [Command](#command)) => void                             | -             |          |
| stackSize        | Maximum length of history records to be recorded                                                                                                                                                              | number                                                         | 0 (unlimited) |          |

### Parameter Type Description

#### `Command`

```typescript
// Single history command
interface Command {
  current: CommandData; // Current data
  original: CommandData; // Original data
  animation: boolean; // Whether to enable animation
}
// Single history command data
interface CommandData {
  add: GraphData; // Added data
  update: GraphData; // Updated data
  remove: GraphData; // Removed data
}
// Graph data
interface GraphData {
  nodes?: NodeData[]; // Node data
  edges?: EdgeData[]; // Edge data
  combos?: ComboData[]; // Combo data
}
```

## API

The history plugin provides the following APIs for users to use as needed. For how to call plugin methods, please refer to the [Plugin Overview Document](/en/manual/plugin/overview#calling-plugin-methods)

### History.canRedo()

Determines whether a **redo** operation can be performed. If there are records in the redo stack, it returns `true`; otherwise, it returns `false`.

```typescript
canRedo(): boolean;
```

**Example:**

```typescript
const canRedo = historyInstance.canRedo();
if (canRedo) {
  console.log('Redo operation can be performed');
} else {
  console.log('Redo stack is empty, cannot redo');
}
```

### History.canUndo()

Determines whether an **undo** operation can be performed. If there are records in the undo stack, it returns `true`; otherwise, it returns `false`.

```typescript
canUndo(): boolean;
```

**Example:**

```typescript
const canUndo = historyInstance.canUndo();
if (canUndo) {
  console.log('Undo operation can be performed');
} else {
  console.log('Undo stack is empty, cannot undo');
}
```

### History.clear()

Clears the history records, including the undo and redo stacks.

```typescript
clear(): void;
```

**Example:**

```typescript
historyInstance.clear();
console.log('History records cleared');
```

### History.on()

Listens to history events, allowing users to execute custom logic when specific events occur.

```typescript
on(event: Loosen<HistoryEvent>, handler: (e: { cmd?: Command | null }) => void): void;
```

Parameter Type Description:

- HistoryEvent

  ```typescript
  enum HistoryEvent {
    UNDO = 'undo', // When a command is undone
    REDO = 'redo', // When a command is redone
    CANCEL = 'cancel', // When a command is canceled
    ADD = 'add', // When a command is added to the queue
    CLEAR = 'clear', // When the history queue is cleared
    CHANGE = 'change', // When the history queue changes
  }
  ```

- Command

  Please refer to the previous [Command](#parameter-type-description) type description

Example:

```typescript
historyInstance.on(HistoryEvent.UNDO, () => {
  console.log('Undo operation executed');
});
```

### History.redo()

Performs a **redo** operation and returns the plugin instance. If the redo stack is empty, no operation is performed.

```typescript
redo(): History;
```

**Example:**

```typescript
historyInstance.redo();
console.log('Redo operation executed');
```

### History.undo()

Performs an **undo** operation and returns the plugin instance. If the undo stack is empty, no operation is performed.

```typescript
undo(): History;
```

**Example:**

```typescript
historyInstance.undo();
console.log('Undo operation executed');
```

### History.undoAndCancel()

Performs an undo operation without recording it in the history and returns the plugin instance. Note that this operation will clear the **redo** stack.

```typescript
undoAndCancel(): History;
```

**Example:**

```typescript
historyInstance.undoAndCancel();
console.log('Undo and cancel operation executed');
```

## History Modes

This plugin supports two history modes:

### Default Mode

In default mode, every time a **render** is triggered (for example, after updating element data, the user actively executes the `graph.draw()` method to trigger rendering), the plugin records the data **before** and **after** rendering and stacks it as an operation record.

### Custom Mode

#### Scenario Description

In actual needs, a user's graph editing operation may involve **multiple renders**. For example, in one editing operation, first display nodes A and B, then display the connection from A to B. This involves two renders (i.e., the user needs to perform `graph.draw()` twice). In this scenario, the default mode will stack two history records, which are:

- Display nodes A and B
- Display the connection from A to B

Obviously, in actual business, one operation should only require one undo.

But here, when undoing this operation, the user needs to call the `undo` method twice, which means two undos are required.

#### Scenario Support

To support such scenarios, G6 provides a batch controller (`BatchController`, [refer to the source code](https://github.com/antvis/G6/blob/v5/packages/g6/src/runtime/batch.ts)), which is provided in the graph instance context.

The history plugin implements custom operation records based on this batch controller. The code example is as follows:

```typescript
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

graph.context.batch.startBatch(); // Start batch operation
graph.addNodeData(...); // Display nodes A and B
graph.draw(); // First render trigger
graph.addEdgeData(...); // Display the connection from A to B
graph.draw(); // Second render trigger
graph.context.batch.endBatch(); // End batch operation
```

In the example:

- By calling the `startBatch` method of the batch controller instance, the history plugin is informed that batch operations are now being performed. Before the batch operation ends, no matter how many renders are triggered, no history records should be stacked (the history plugin will record the change data for each render trigger).
- After completing the last data change, call the `endBatch()` method. The history plugin listens for the completion of the batch operation and stacks this batch operation as a history record.

Finally, the user only needs to perform one `undo` to undo.

## Code Examples

Below are some common cases with corresponding code references.

### Undo and Redo Button States

In actual business scenarios, you may need to customize the toolbar of the canvas, which involves the enable and disable states of the undo and redo buttons.

```typescript
const canUndo = false;
const canRedo = false;

const graph = new Graph({
  // Other configurations...
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

In the example, by listening to the `HistoryEvent.CHANGE` event, which is triggered when the history queue changes, it is determined in real-time whether undo and redo operations can be performed.

### Determine Whether a Command is Allowed to Enter the Queue

Here is a simple scenario: only the operation of removing elements is allowed to enter the history queue.

```typescript
const graph = new Graph({
  // Other configurations...
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

In the example, the configuration option [beforeAddCommand](#beforeAddCommand) is used to determine whether there are elements removed in `cmd.current.remove`.
