---
title: Opeartion Stack
order: 13
---

## pushStack(action, data, stackType)
Push operation。

Implemented the undo function, refer to [here](https://github.com/antvis/G6/blob/master/src/plugins/toolBar/index.ts#L184)

Implemented the redo function, refer to[here](https://github.com/antvis/G6/blob/master/src/plugins/toolBar/index.ts#L271)

**参数**

| Name | Type | Required | Description |
| ------ | ------ | -------- | -------- |
| action | string | false     | operation type，the value of 'update' by default |
| data | unknown | false     | Stacked data |
| stackType | 'redo' | 'undo' | false     | push operation type，the value of 'redo' by default |

## getUndoStack()

get undo stack。

## getRedoStack()

get redo stack。

## getStackData()
get the data in stack。

The return value type：

```
{
  undoStack: StackData[];
  redoStack: StackData[];
};
```

## clearStack()
Clear the data in stack。