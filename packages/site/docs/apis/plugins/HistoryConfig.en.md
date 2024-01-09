---
title: History
order: 1
---

- [History](/en/examples/tool/history/#history)

## Configurations

### enableStack

**Type**: `boolean`

**Default**: `false`

Whether to enable stack

### stackCfg <Badge type="error">Required</Badge>

**Type**: `StackCfg`

<embed src="../../common/StackCfg.en.md"></embed>

**Default**: `{}`

Stack configuration

## API

### canRedo

**Type**: `() => boolean;`

**Description**: Can redo

### canUndo

**Type**: `() => boolean;`

**Description**: Can undo

### clear

**Type**: `() => void;`

**Description**: Clear stack

### clearRedoStack

**Type**: `() => void;`

**Description**: Clear redo stack

### clearUndoStack

**Type**: `() => void;`

**Description**: Clear undo stack

### isEnable

**Type**: `() => boolean;`

**Description**: Is stack enabled

### getStack

**Type**: `() => Record<string, Command[][]>;`

<embed src="../../common/PluginHistoryCommand.en.md"></embed>

**Description**: Get stack

### getRedoStack

**Type**: `() => Command[][];`

<embed src="../../common/PluginHistoryCommand.en.md"></embed>

**Description**: Get redo stack

### getUndoStack

**Type**: `() => Command[][];`

<embed src="../../common/PluginHistoryCommand.en.md"></embed>

**Description**: Get undo stack

### historyBatch

**Type**: `(callback: () => void) => void;`

**Description**: Execute the provided function in a historyBatch mode

### notify

**Type**: `(graph: Graph, eventName: string, ...data: any[]) => void;`

### push

**Type**: `(commands: Command[], stackType: StackType = 'undo', isNew = true) => void;`

<embed src="../../common/PluginHistoryCommand.en.md"></embed>

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    StackType
  </summary>

```ts
type StackType = 'redo' | 'undo';
```

</details>

**Description**: Push stack

**Description**: Notify event

### redo

**Type**: `() => void;`

**Description**: Redo

### undo

**Type**: `() => void;`

**Description**: Undo

### startHistoryBatch

**Type**: `() => void;`

**Description**: Start history batch

### stopHistoryBatch

**Type**: `() => void;`

**Description**: Stop history batch

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
