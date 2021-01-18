---
title: 操作栈
order: 13
---

## pushStack(action, data, stackType)

入栈操作。

实现 undo 功能，可参考[这里](https://github.com/antvis/G6/blob/master/packages/plugin/src/toolBar/index.ts#L208)

实现 redo 功能，可参考[这里](https://github.com/antvis/G6/blob/master/packages/plugin/src/toolBar/index.ts#L295)

**参数**

| 名称      | 类型    | 是否必选 | 描述                      |
| --------- | ------- | -------- | ------------------------- | --------------------- |
| action    | string  | false    | 操作类型，默认值为 update |
| data      | unknown | false    | 入栈的数据                |
| stackType | 'redo'  | 'undo'   | false                     | 入栈类型，默认为 redo |

## getUndoStack()

获取 undo 栈。

## getRedoStack()

获取 redo 栈。

## getStackData()

获取栈中的数据。

返回值类型为：

```
{
  undoStack: StackData[];
  redoStack: StackData[];
};
```

## clearStack()

清空栈中的数据。
