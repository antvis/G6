---
title: History
order: 1
---

- [History](/en/examples/tool/history/#history)

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### enableStack

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable stack

### stackCfg

**Type**: `StackCfg`

**Default**: `{}`

**Required**: true

**Description**: Stack configuration

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

**Description**: Get stack

### getRedoStack

**Type**: `() => Command[][];`

**Description**: Get redo stack

### getUndoStack

**Type**: `() => Command[][];`

**Description**: Get undo stack

### historyBatch

**Type**: `(callback: () => void) => void;`

**Description**: Execute the provided function in a historyBatch mode

### notify

**Type**: `(graph: IGraph, eventName: string, ...data: any[]) => void;`

### push

**Type**: `(commands: Command[], stackType: StackType = 'undo', isNew = true) => void;`

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

---

```ts
type StackType = 'redo' | 'undo';

type Command = {
  redo: (graph: IGraph) => void;
  undo: (graph: IGraph) => void;
};
```

<embed src="../../common/StackCfg.en.md"></embed>
