---
title: History
---

History is a built-in components in G6.

## Usage

### API

#### isHistoryEnabled

Determine if history (redo/undo) is enabled.

```ts
isHistoryEnabled: () => void;
```

#### pushStack

Push the operation(s) onto the specified stack.

```ts
pushStack: (cmd: Command[], stackType: StackType) => void;
```

**Parameters:**

`cmd`: An array of commands to be pushed onto the stack.
`stackType`: The type of stack (undo/redo) to push the commands onto.

#### pauseStack

Pause stacking operation.

```ts
pauseStack: () => void;
```

#### resumeStack

Resume stacking operation.

```ts
resumeStack: () => void;
```

#### executeWithNoStack

Execute a callback without allowing any stacking operations.

```ts
executeWithNoStack: (callback: () => void) => void;
```

Parameters:
callback: The callback function to be executed without stacking operations.

#### getUndoStack

Retrieve the current undo stack which consists of operations that could be undone.

```ts
getUndoStack: () => void;
```


#### getRedoStack

Retrieve the current redo stack which consists of operations that were undone.

```ts
getRedoStack: () => void;
```


#### getStack

Retrieve the complete history stack.

```ts
getStack: () => void;
```


#### undo

Revert the last n operation(s) on the graph.

```ts
undo: () => void;
```


#### redo

Restore the operation that was last n reverted on the graph.

```ts
redo: () => void;
```


#### canUndo

Indicate whether there are any actions available in the undo stack.

```ts
canUndo: () => void;
```

#### canRedo

Indicate whether there are any actions available in the redo stack.

```ts
canRedo: () => void;
```

#### startHistoryBatch

Begin a historyBatch operation. Any operations performed between startHistoryBatch and stopHistoryBatch are grouped together and treated as a single operation when undoing or redoing.

```ts
startHistoryBatch: () => void;
```

#### stopHistoryBatch

End a historyBatch operation. Any operations performed between startHistoryBatch and stopHistoryBatch are grouped together and treated as a single operation when undoing or redoing.

```ts
stopHistoryBatch: () => void;
```

#### historyBatch

Execute a provided function within a batched context. All operations performed inside the callback will be treated as a composite operation, providing a more convenient way without manually invoking startHistoryBatch and stopHistoryBatch.

```ts
historyBatch: (callback: () => void) => void;
```

**Parameters:**
*callback*: The function containing operations to be batched together.

#### cleanHistory

Execute a provided function within a batched context. All operations performed inside the callback will be treated as a composite operation, providing a more convenient way without manually invoking startHistoryBatch and stopHistoryBatch.

```ts
cleanHistory: (stackType?: StackType) => void;
```

**Parameters:**
*stackType (optional)*: The type of stack (undo/redo) to be cleaned. If not provided, all stacks will be cleaned.

